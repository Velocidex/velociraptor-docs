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

precondition: SELECT OS From info() where OS = 'linux'

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
               "0x" + Record.Start AS StartHex,
               "0x" + Record.End AS EndHex,
               Record.Perm AS Perm,
               atoi(string="0x" + Record.Size) AS Size,
               "0x" + Record.Size AS SizeHex,
               Record.Filename AS Filename,
               if(condition=Record.Deleted, then=TRUE, else=FALSE) AS Deleted
      FROM foreach(
          row=processes,
          query={
            SELECT parse_string_with_regex(
                    string=Line,
                    regex="(?P&lt;Start&gt;^[^-]+)-(?P&lt;End&gt;[^\\s]+)\\s+(?P&lt;Perm&gt;[^\\s]+)\\s+(?P&lt;Size&gt;[^\\s]+)\\s+[^\\s]+\\s+(?P&lt;PermInt&gt;[^\\s]+)\\s+(?P&lt;Filename&gt;.+?)(?P&lt;Deleted&gt; \\(deleted\\))?$") AS Record,
                  Pid, Name, Username
            FROM parse_lines(
               filename=format(format="/proc/%d/maps", args=[Pid]),
               accessor='file'
            )
          })

</code></pre>

