---
title: Linux.RHEL.Packages
hidden: true
tags: [Client Artifact]
---

Parse packages installed from dnf


<pre><code class="language-yaml">
name: Linux.RHEL.Packages
description: |
  Parse packages installed from dnf

parameters:
  - name: DNFGrokExpression
    description: A Grok expression to parse the output from `dns list installed`
    default: &quot;%{DATA:Package}%{SPACE} %{DATA:Version}%{SPACE} %{GREEDYDATA:Repository}&quot;

sources:
  - precondition: |
      SELECT OS From info() where OS = &#x27;linux&#x27;

    query: |
        SELECT * FROM foreach(row={
          SELECT grok(grok=DNFGrokExpression, data=Stdout) AS Parsed
          FROM execve(argv=[&quot;dnf&quot;, &quot;--quiet&quot;, &quot;list&quot;, &quot;installed&quot;], sep=&quot;\n&quot;)
          WHERE count() &gt; 2
        }, column=&quot;Parsed&quot;)

</code></pre>

