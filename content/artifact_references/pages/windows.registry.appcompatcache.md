---
title: Windows.Registry.AppCompatCache
hidden: true
tags: [Client Artifact]
---

This artifact parses AppCompatCache (shimcache) from target hives.

AppCompatCache, also known as Shimcache, is a component of the Application
Compatibility Database, which was created by Microsoft and used by the Windows
operating system to identify application compatibility issues. This helps
developers troubleshoot legacy functions and contains data related to Windows
features.

Note: the appcompatcache plugin does not currently support execution flag in
Windows 7 and 8/8.1 Systems.


<pre><code class="language-yaml">
name: Windows.Registry.AppCompatCache
author: Matt Green - @mgreen27
description: |
  This artifact parses AppCompatCache (shimcache) from target hives.

  AppCompatCache, also known as Shimcache, is a component of the Application
  Compatibility Database, which was created by Microsoft and used by the Windows
  operating system to identify application compatibility issues. This helps
  developers troubleshoot legacy functions and contains data related to Windows
  features.

  Note: the appcompatcache plugin does not currently support execution flag in
  Windows 7 and 8/8.1 Systems.

reference:
  - https://www.mandiant.com/resources/caching-out-the-val

parameters:
  - name: AppCompatCacheKey
    default: HKEY_LOCAL_MACHINE/System/ControlSet*/Control/Session Manager/AppCompatCache/AppCompatCache

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

export: |
    LET AppCompatCacheParser &lt;= &#x27;&#x27;&#x27;[
    [&quot;HeaderWin10&quot;, &quot;x=&gt;x.HeaderSize&quot;, [
      [&quot;HeaderSize&quot;, 0, &quot;unsigned int&quot;],
      [&quot;Entries&quot;, &quot;x=&gt;x.HeaderSize&quot;, Array, {
          type: &quot;Entry&quot;,
          sentinel: &quot;x=&gt;x.Size = 0&quot;,
          count: 10000,
      }]
    ]],
    [&quot;HeaderWin8&quot;, 128, [
      [&quot;Entries&quot;, 128, Array, {
          type: &quot;EntryWin8&quot;,
          sentinel: &quot;x=&gt;x.EntrySize = 0&quot;,
          count: 10000,
      }]
    ]],

    [&quot;EntryWin8&quot;, &quot;x=&gt;x.EntrySize + 12&quot;, [
      [&quot;Signature&quot;, 0, &quot;String&quot;, {
         length: 4,
      }],
      [&quot;EntrySize&quot;, 8, &quot;unsigned int&quot;],
      [&quot;PathSize&quot;, 12, &quot;uint16&quot;],
      [&quot;Path&quot;, 14, &quot;String&quot;, {
          length: &quot;x=&gt;x.PathSize&quot;,
          encoding: &quot;utf16&quot;,
      }],
      [&quot;LastMod&quot;, &quot;x=&gt;x.PathSize + 14 + 10&quot;, &quot;WinFileTime&quot;]
    ]],

    [&quot;Entry&quot;, &quot;x=&gt;x.Size + 12&quot;, [
      [&quot;Signature&quot;, 0, &quot;String&quot;, {
         length: 4,
      }],
      [&quot;Size&quot;, 8, &quot;unsigned int&quot;],
      [&quot;PathSize&quot;, 12, &quot;uint16&quot;],
      [&quot;Path&quot;, 14, &quot;String&quot;, {
          length: &quot;x=&gt;x.PathSize&quot;,
          encoding: &quot;utf16&quot;,
      }],
      [&quot;LastMod&quot;, &quot;x=&gt;x.PathSize + 14&quot;, &quot;WinFileTime&quot;],
      [&quot;DataSize&quot;, &quot;x=&gt;x.PathSize + 14 + 8&quot;, &quot;uint32&quot;],
      [&quot;Data&quot;, &quot;x=&gt;x.PathSize + 14 + 8 + 4&quot; , &quot;String&quot;, {
          length: &quot;x=&gt;x.DataSize&quot;,
      }],

      # The last byte of the Data block is 1 for execution
      [&quot;Execution&quot;, &quot;x=&gt;x.PathSize + 14 + 8 + 4 + x.DataSize - 4&quot;, &quot;uint32&quot;]
    ]],

    # This is the Win7 parser but we dont use it right now.
    [&quot;HeaderWin7x64&quot;, 128, [
      [&quot;Signature&quot;, 0, &quot;uint32&quot;],
      [&quot;Entries&quot;, 128, &quot;Array&quot;, {
          count: 10000,
          sentinel: &quot;x=&gt;x.PathSize = 0&quot;,
          type: EntryWin7x64,
      }]
    ]],
    [&quot;EntryWin7x64&quot;, 48, [
      [&quot;PathSize&quot;, 0, &quot;uint16&quot;],
      [&quot;PathOffset&quot;, 8, &quot;uint32&quot;],
      [&quot;Path&quot;, &quot;x=&gt;x.PathOffset - x.StartOf&quot;, &quot;String&quot;, {
          encoding: &quot;utf16&quot;,
          length: &quot;x=&gt;x.PathSize&quot;,
      }],
      [&quot;LastMod&quot;, 16, &quot;WinFileTime&quot;]
    ]]

    ]&#x27;&#x27;&#x27;

    LET AppCompatCacheWin10(Blob) = parse_binary(
        accessor=&quot;data&quot;,
        filename=Blob,
        profile=AppCompatCacheParser,
        struct=&quot;HeaderWin10&quot;)

    LET AppCompatCacheWin8(Blob) = parse_binary(
        accessor=&quot;data&quot;,
        filename=Blob,
        profile=AppCompatCacheParser,
        struct=&quot;HeaderWin8&quot;)

    LET AppCompatCache(Blob) = SELECT *
    FROM foreach(
      row=if(
        condition=AppCompatCacheWin10(Blob=Blob).HeaderSize IN (52, 48),
        then=AppCompatCacheWin10(Blob=Blob).Entries,
        else=AppCompatCacheWin8(Blob=Blob).Entries))


sources:
  - query: |
      -- first find all ControlSet Keys in scope
      LET AppCompatKeys &lt;= SELECT OSPath FROM glob(globs=AppCompatCacheKey, accessor=&#x27;registry&#x27;)

      -- when greater than one key we need to extract results and order later
      LET results &lt;= SELECT
            ModificationTime,
            Name as Path,
            ControlSet,
            Key
          FROM foreach(
              row={
                 SELECT OSPath FROM glob(accessor=&#x27;registry&#x27;,
                     globs=AppCompatCacheKey)
              }, query={
                  SELECT OSPath AS Key, Path AS Name,
                     LastMod AS ModificationTime,
                     OSPath[2] as ControlSet
                  FROM AppCompatCache(Blob=read_file(
                      accessor=&#x27;registry&#x27;, filename=OSPath))
            })

      -- find position of entry for each ControlSet. Lower numbers more recent
      LET ControlSetPosition(cs) = SELECT *, count() - 1 as Position
        FROM results WHERE ControlSet = cs
      LET position = SELECT ControlSetPosition(cs=ControlSet) as Results
            FROM foreach(
                row={
                    SELECT ControlSet, count(items=ControlSet) as Entries
                    FROM results GROUP BY ControlSet
                })

      LET mutli_controlset = SELECT *
        FROM foreach(
                row=position.Results,
                query={
                    SELECT * FROM foreach(row=_value)
                })

      -- output results
      SELECT
        Position,
        ModificationTime,
        Path,
        ControlSet,
        Key
      FROM if(condition= len(list=AppCompatKeys.OSPath)=1,
        then={
            SELECT *, count() - 1 as Position FROM results
        },
        else= mutli_controlset )

</code></pre>

