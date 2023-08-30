---
title: Windows.Sys.AppcompatShims
hidden: true
tags: [Client Artifact]
---

Application Compatibility shims are a way to persist malware. This
table presents the AppCompat Shim information from the registry in a
nice format.


<pre><code class="language-yaml">
name: Windows.Sys.AppcompatShims
description: |
  Application Compatibility shims are a way to persist malware. This
  table presents the AppCompat Shim information from the registry in a
  nice format.

reference:
  - http://files.brucon.org/2015/Tomczak_and_Ballenthin_Shims_for_the_Win.pdf

parameters:
  - name: shimKeys
    default: &gt;-
      HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\InstalledSDB\*
  - name: customKeys
    default: &gt;-
      HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Custom\*\*

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;
    query: |
        LET installed_sdb &lt;=
           SELECT Key, Key.Name as SdbGUID, DatabasePath,
                  DatabaseType, DatabaseDescription,
                  -- Convert windows file time to unix epoch.
                  (DatabaseInstallTimeStamp / 10000000) - 11644473600 AS DatabaseInstallTimeStamp
           FROM read_reg_key(
             globs=split(string=shimKeys, sep=&quot;,[\\s]*&quot;),
             accessor=&quot;registry&quot;)

        LET result = SELECT * from foreach(
          row={
            SELECT regex_replace(
               source=OSPath,
               replace=&quot;$1&quot;,
               re=&quot;^.+\\\\([^\\\\]+)\\\\[^\\\\]+$&quot;) as Executable,
              regex_replace(
               source=Name,
               replace=&quot;$1&quot;,
               re=&quot;(\\{[^}]+\\}).*$&quot;) as SdbGUIDRef,
               Name as ExeName
            FROM glob(
              globs=split(string=customKeys, sep=&quot;,[\\s]*&quot;),
              accessor=&quot;registry&quot;)
          },
          query={
            SELECT Executable, DatabasePath, DatabaseType,
                   DatabaseDescription, DatabaseInstallTimeStamp, SdbGUID
            FROM installed_sdb
            WHERE SdbGUID = SdbGUIDRef
          })

        SELECT * from result

</code></pre>

