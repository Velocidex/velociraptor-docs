---
title: Linux.Sys.Maps
hidden: true
tags: [Client Artifact]
---

A running binary may link other binaries into its address
space. These shared objects contain exported functions which may be
used by the binary.

This artifact parses the /proc/<pid>/maps to emit all mapped files
into the process.


<pre><code class="language-yaml">
name: Linux.Sys.Maps
description: |
  A running binary may link other binaries into its address
  space. These shared objects contain exported functions which may be
  used by the binary.

  This artifact parses the /proc/&lt;pid&gt;/maps to emit all mapped files
  into the process.

precondition: SELECT OS From info() where OS = &#x27;linux&#x27;

parameters:
  - name: processRegex
    description: A regex applied to process names.
    default: .
    type: regex

sources:
  - query: |
      LET processes = SELECT Pid, Name, Username
        FROM pslist()
        WHERE Name =~ processRegex

      SELECT Pid, Name, Username,
               &quot;0x&quot; + Record.Start AS StartHex,
               &quot;0x&quot; + Record.End AS EndHex,
               Record.Perm AS Perm,
               atoi(string=&quot;0x&quot; + Record.Size) AS Size,
               &quot;0x&quot; + Record.Size AS SizeHex,
               Record.Filename AS Filename,
               if(condition=Record.Deleted, then=TRUE, else=FALSE) AS Deleted
      FROM foreach(
          row=processes,
          query={
            SELECT parse_string_with_regex(
                    string=Line,
                    regex=&quot;(?P&lt;Start&gt;^[^-]+)-(?P&lt;End&gt;[^\\s]+)\\s+(?P&lt;Perm&gt;[^\\s]+)\\s+(?P&lt;Size&gt;[^\\s]+)\\s+[^\\s]+\\s+(?P&lt;PermInt&gt;[^\\s]+)\\s+(?P&lt;Filename&gt;.+?)(?P&lt;Deleted&gt; \\(deleted\\))?$&quot;) AS Record,
                  Pid, Name, Username
            FROM parse_lines(
               filename=format(format=&quot;/proc/%d/maps&quot;, args=[Pid]),
               accessor=&#x27;file&#x27;
            )
          })

</code></pre>

