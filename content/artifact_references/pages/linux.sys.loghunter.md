---
title: Linux.Sys.LogHunter
hidden: true
tags: [Client Artifact]
---

This artifact enables grep of Linux, MacOS and Windows logs.
Parameters include SearchRegex and WhitelistRegex as regex terms.
I have also included a Path exclusion regex to improve result output
and automatically skip hitting notorious locations like /proc.

NOTE: nosymlink feature of glob is set so unexpected results may occur if
targetting includes symlink files.


<pre><code class="language-yaml">
name: Linux.Sys.LogHunter
author: &quot;Matt Green - @mgreen27&quot;
description: |
  This artifact enables grep of Linux, MacOS and Windows logs.
  Parameters include SearchRegex and WhitelistRegex as regex terms.
  I have also included a Path exclusion regex to improve result output
  and automatically skip hitting notorious locations like /proc.

  NOTE: nosymlink feature of glob is set so unexpected results may occur if
  targetting includes symlink files.

parameters:
  - name: TargetFiles
    default: &#x27;/var/log/**&#x27;
  - name: SearchRegex
    description: &quot;Regex of strings to search in log line.&quot;
    default: &#x27; POST &#x27;
    type: regex
  - name: FilterRegex
    description: &quot;Regex of strings to leave out of output.&quot;
    default:
    type: regex
  - name: ExcludeDirectoryRegex
    type: regex
    description: &quot;Does not descend into directories that match this Regex.&quot;
    default: &quot;^/(shared|proc|snap)&quot;
  - name: ExcludePathRegex
    description: &quot;Regex of paths to exclude from scanning.&quot;
    default: &#x27;\.journal$&#x27;
    type: regex

sources:
  - query: |
      LET RecursionCB &lt;= if(condition= ExcludeDirectoryRegex,
         then=&quot;x =&gt; NOT x.OSPath =~ ExcludeDirectoryRegex&quot;,
         else=&quot;x =&gt; NOT x.OSPath =~ &#x27;^/proc&#x27; &quot;)

      LET files = SELECT OSPath
        FROM glob(globs=TargetFiles,
            nosymlink=TRUE,
            recursion_callback=RecursionCB)
        WHERE NOT IsDir AND NOT OSPath =~ ExcludePathRegex
          AND log(message=&quot;Scanning %v&quot;, args=OSPath)

      LET hits = SELECT * FROM foreach(row=files,
          query={
              SELECT OSPath, Line FROM parse_lines(filename=OSPath)
              WHERE Line =~ SearchRegex
          })

      SELECT * FROM if(condition=FilterRegex,
        then={
           SELECT * FROM hits
           WHERE NOT Line =~ FilterRegex
        },
        else={
           SELECT * FROM hits
        })

</code></pre>

