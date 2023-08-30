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
    default: "%{DATA:Package}%{SPACE} %{DATA:Version}%{SPACE} %{GREEDYDATA:Repository}"

sources:
  - precondition: |
      SELECT OS From info() where OS = 'linux'

    query: |
        SELECT * FROM foreach(row={
          SELECT grok(grok=DNFGrokExpression, data=Stdout) AS Parsed
          FROM execve(argv=["dnf", "--quiet", "list", "installed"], sep="\n")
          WHERE count() > 2
        }, column="Parsed")

</code></pre>

