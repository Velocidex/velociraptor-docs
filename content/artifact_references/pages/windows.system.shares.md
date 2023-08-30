---
title: Windows.System.Shares
hidden: true
tags: [Client Artifact]
---

This artifact will extract network shares per machine.


<pre><code class="language-yaml">
name: Windows.System.Shares
author: &#x27;Matt Green - @mgreen27&#x27;
description: |
   This artifact will extract network shares per machine.

type: CLIENT

parameters:
  - name: NameRegex
    description: Regex filter for share name. e.g Admin\$ for Admin$
    default: .
    type: regex
  - name: PathRegex
    description: Regex filter for local path. e.g C:\\Windows$ for Admin$
    default: .
    type: regex

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query: |
        SELECT Name, Path, Caption, Status,MaximumAllowed,AllowMaximum,InstallDate
        FROM wmi(query=&#x27;SELECT * FROM Win32_Share&#x27;,namespace=&#x27;root/cimv2&#x27;)
        WHERE Name =~ NameRegex AND Path =~ PathRegex
</code></pre>

