---
title: Linux.Detection.AnomalousFiles
hidden: true
tags: [Client Artifact]
---

Detects anomalous files in a Linux filesystem.

An anomalous file is considered one that matches at least one criteria:

- Hidden (prefixed with a dot);

- Large, with a size over a specified limit; or

- With SUID bit set.


<pre><code class="language-yaml">
name: Linux.Detection.AnomalousFiles

description: |
  Detects anomalous files in a Linux filesystem.

  An anomalous file is considered one that matches at least one criteria:

  - Hidden (prefixed with a dot);

  - Large, with a size over a specified limit; or

  - With SUID bit set.

author: George-Andrei Iosif (@iosifache)

type: CLIENT

parameters:
  - name: MaxNormalSize
    description: Size (in bytes) above which a file is considered large
    type: int
    default: 10485760
  - name: PathsToSearch
    description: Paths to search, separated by comma
    type: str
    default: &quot;/home/**,tmp/**&quot;

sources:
  - precondition: |
      SELECT OS
      FROM info()
      WHERE OS = &#x27;linux&#x27;

    query: |
      SELECT Fqdn AS Host,
             OSPath,
             substr(str=Name, start=0, end=1) = &quot;.&quot; AS IsHidden,
             Size,
             Size &gt; MaxNormalSize AS IsLarge,
             Mode.String AS Mode,
             Mode =~ &quot;^u&quot; as HasSUID
      FROM glob(globs=split(string=PathsToSearch, sep_string=&quot;,&quot;))
      WHERE IsHidden OR IsLarge OR HasSUID

</code></pre>

