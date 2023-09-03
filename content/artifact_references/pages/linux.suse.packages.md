---
title: Linux.SuSE.Packages
hidden: true
tags: [Client Artifact]
---

Parse list of installed packages from zypper output


<pre><code class="language-yaml">
name: Linux.SuSE.Packages
author: Hilko Bengen &lt;bengen@hilluzination.de&gt;
description: |
  Parse list of installed packages from zypper output

sources:
  - precondition: |
      SELECT OS From info() WHERE OS = 'linux'

    query: |
      LET zypper_output = SELECT *
        FROM execve(
          length=1000000,
          argv=["zypper", "--xmlout", "search", "--installed-only", "--details", "--type=package"])
      
      LET xml = parse_xml(
          file=str(str=zypper_output.Stdout),
          accessor="data")
      
      SELECT *
      FROM foreach(
        row=xml.stream.`search-result`.`solvable-list`.solvable,
        query={
          SELECT Attrname AS Package,
                 Attredition AS Version,
                 Attrarch AS Architecture,
                 Attrrepository AS Repository
          FROM _value
        })

</code></pre>

