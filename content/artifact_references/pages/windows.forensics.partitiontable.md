---
title: Windows.Forensics.PartitionTable
hidden: true
tags: [Client Artifact]
---

Parses the raw disk for partition tables.

This artifact also applies magic() check to indicate the type of
partition stored. If a partition contains NTFS filesystems, the
artifact will also list the top level directory. This allows a quick
overview of what type of partition this is (e.g. System OS or data
drive).

Currently handles only GPT (Most common) and Primary Dos partition
tables


<pre><code class="language-yaml">
name: Windows.Forensics.PartitionTable
description: |
  Parses the raw disk for partition tables.

  This artifact also applies magic() check to indicate the type of
  partition stored. If a partition contains NTFS filesystems, the
  artifact will also list the top level directory. This allows a quick
  overview of what type of partition this is (e.g. System OS or data
  drive).

  Currently handles only GPT (Most common) and Primary Dos partition
  tables

parameters:
  - name: ImagePath
    default: &quot;\\\\?\\GLOBALROOT\\Device\\Harddisk0\\DR0&quot;
    description: Raw Device for main disk containing partition table to parse.
  - name: SectorSize
    type: int
    default: 512

export: |
    LET MBRProfile = &#x27;&#x27;&#x27;[
        [&quot;MBRHeader&quot;, 0, [
         [&quot;Magic&quot;, 0x1FE, &quot;uint16&quot;],
         [&quot;PrimaryPartitions&quot;, 0x1BE, Array, {
            type: &quot;PrimaryPartition&quot;,
            count: 4,
         }],
        ]],
        [&quot;PrimaryPartition&quot;, 16, [
         [&quot;boot&quot;, 0, &quot;uint8&quot;],
         [&quot;ptype&quot;, 4, &quot;Enumeration&quot;, {
             type: &quot;uint8&quot;,
             map: {
                 &quot;Unused&quot;: 0,
                 &quot;Dos Extended&quot;: 0x05,
                 &quot;Win95 Extended&quot;: 0x0f,
                 &quot;GPT Safety Partition&quot;: 0xee,
                 &quot;NTFS / exFAT&quot;: 7,
                 &quot;Hibernation&quot;: 0x12,
                 &quot;Linux&quot;: 0x83,
                 &quot;Linux Swap&quot;: 0x82,
                 &quot;Linux Extended&quot;: 0x85,
             }}],
         [&quot;start_sec&quot;, 8, &quot;uint32&quot;],
         [&quot;size_sec&quot;, 12, &quot;uint32&quot;],
        ]],
        [&quot;GPTHeader&quot;, 0, [
         [&quot;signature&quot;, 0, &quot;String&quot;, {
             length: 8,
         }],
         [&quot;version&quot;, 4, &quot;uint32&quot;],
         [&quot;tab_start_lba&quot;, 72, &quot;uint64&quot;],
         [&quot;tab_num&quot;, 80, &quot;uint32&quot;],
         [&quot;tab_size&quot;, 84, &quot;uint32&quot;],
         [&quot;entries&quot;, 0, &quot;Profile&quot;, {
            type: &quot;Array&quot;,
            offset: &quot;x=&gt;x.tab_start_lba * 512&quot;,
            type_options: {
             type: &quot;GPTEntry&quot;,
             count: &quot;x=&gt;x.tab_num&quot;,
            }}]
        ]],
        [&quot;GPTEntry&quot;, 128, [
          [&quot;Offset&quot;, 0, &quot;Value&quot;, {
              value: &quot;x=&gt;x.StartOf&quot;,
          }],
          [&quot;type_guid&quot;, 0, GUID],
          [&quot;id_guid&quot;, 16, GUID],
          [&quot;start_lba&quot;, 32, &quot;uint64&quot;],
          [&quot;end_lba&quot;, 40, &quot;uint64&quot;],
          [&quot;flag&quot;, 48, &quot;uint64&quot;],
          [&quot;name&quot;, 56, &quot;String&quot;, {
              encoding: &quot;utf16&quot;
          }]
        ]],
        [&quot;GUID&quot;, 16, [
          [&quot;__D1&quot;, 0, &quot;uint32&quot;],
          [&quot;__D2&quot;, 2, &quot;uint16&quot;],
          [&quot;__D3&quot;, 4, &quot;uint16&quot;],
          [&quot;__D4&quot;, 6, &quot;String&quot;, {&quot;term&quot;: &quot;&quot;, &quot;length&quot;: 2}],
          [&quot;__D5&quot;, 8, &quot;String&quot;, {&quot;term&quot;: &quot;&quot;, &quot;length&quot;: 6}],
          [&quot;Value&quot;, 0, &quot;Value&quot;, {
            &quot;value&quot;: &quot;x=&gt;format(format=&#x27;{%08x-%04x-%04x-%02x-%02x}&#x27;, args=[x.__D1, x.__D2, x.__D3, x.__D4, x.__D5])&quot;
          }]
        ]]
        ]
        &#x27;&#x27;&#x27;

sources:
  - query: |
        LET GPTHeader &lt;= parse_binary(filename=ImagePath,
           accessor=&quot;raw_file&quot;,
           profile=MBRProfile,
           struct=&quot;GPTHeader&quot;,
           offset=SectorSize)

        LET PrimaryPartitions &lt;= parse_binary(filename=ImagePath,
           accessor=&quot;raw_file&quot;,
           profile=MBRProfile,
           struct=&quot;MBRHeader&quot;,
           offset=0)

        -- Display GPT - this is by far the most common one on modern
        -- systems.
        LET GPT = SELECT * FROM if(condition=GPTHeader.signature =~ &quot;EFI&quot;,
        then={
          SELECT start_lba * SectorSize AS StartOffset,
                 end_lba * SectorSize AS EndOffset,
                 humanize(bytes=(end_lba - start_lba) * SectorSize) AS Size,
                 name
          FROM foreach(row=GPTHeader.entries)
          WHERE start_lba &gt; 0
        })

        -- Display primary partitions
        LET PARTS = SELECT start_sec * SectorSize AS StartOffset,
           ( start_sec + size_sec ) * SectorSize AS EndOffset,
            humanize(bytes=size_sec * SectorSize) AS Size,
            ptype AS name
        FROM foreach(row=PrimaryPartitions.PrimaryPartitions)
        WHERE start_sec &gt; 0

        SELECT StartOffset, EndOffset, Size, name, {
              SELECT OSPath.Path AS OSPath
              FROM glob(globs=&quot;/*&quot;,
                        accessor=&quot;raw_ntfs&quot;,
                        root=pathspec(
                          DelegateAccessor=&quot;offset&quot;,
                          DelegatePath=pathspec(
                            DelegateAccessor=&quot;raw_file&quot;,
                            DelegatePath=ImagePath,
                            Path=format(format=&quot;%d&quot;, args=StartOffset))))
                 } AS TopLevelDirectory,
            magic(accessor=&quot;data&quot;, path=read_file(
              accessor=&quot;raw_file&quot;,
              filename=ImagePath,
              offset=StartOffset, length=10240)) AS Magic
        FROM chain(a=PARTS, b=GPT)

</code></pre>

