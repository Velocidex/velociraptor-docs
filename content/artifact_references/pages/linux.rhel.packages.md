---
title: Linux.RHEL.Packages
hidden: true
tags: [Client Artifact]
---

Parse packages installed from dnf or yum


<pre><code class="language-yaml">
name: Linux.RHEL.Packages
description: |
  Parse packages installed from dnf or yum

implied_permissions:
  - EXECVE

sources:
  - precondition: |
      SELECT OS From info() where OS = 'linux'

    query: |
        LET Data &lt;= SELECT * FROM switch(
            a={ SELECT Stdout FROM execve(argv=["dnf", "--quiet", "list", "installed"], length=10000000) WHERE Stdout },
            b={ SELECT Stdout FROM execve(argv=["yum", "--quiet", "list", "installed"], length=10000000) WHERE Stdout },
            c={SELECT "" AS Stdout FROM scope() WHERE log(level="ERROR",message="Could not retrieve package list") })

        // Sometimes lines overflow to the next line, correct for that
        LET Normalized &lt;= regex_replace(source=Data[0].Stdout, re='''(?sm)\n\s''', replace="")
        LET Parsed = SELECT parse_string_with_regex(string=Line, regex='''([^\s]+)\s+([^\s]+)\s+([^\s]+)''') AS Parsed
        FROM parse_lines(accessor="data", filename=Normalized)

        SELECT Parsed.g1 AS Package, Parsed.g2 AS Version, Parsed.g3 AS Repository
        FROM Parsed
        WHERE Repository =~ "^@"

</code></pre>

