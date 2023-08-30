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
      SELECT OS From info() WHERE OS = &#x27;linux&#x27;

    query: |
      LET zypper_output = SELECT *
        FROM execve(
          length=1000000,
          argv=[&quot;zypper&quot;, &quot;--xmlout&quot;, &quot;search&quot;, &quot;--installed-only&quot;, &quot;--details&quot;, &quot;--type=package&quot;])
      
      LET xml = parse_xml(
          file=str(str=zypper_output.Stdout),
          accessor=&quot;data&quot;)
      
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

