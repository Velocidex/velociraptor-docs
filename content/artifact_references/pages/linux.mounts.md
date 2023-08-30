---
title: Linux.Mounts
hidden: true
tags: [Client Artifact]
---

List mounted filesystems by reading /proc/mounts

<pre><code class="language-yaml">
name: Linux.Mounts
description: List mounted filesystems by reading /proc/mounts

parameters:
  - name: ProcMounts
    default: /proc/mounts

precondition: |
   SELECT OS From info() where OS = &#x27;linux&#x27;

sources:
  - query: |
      SELECT Device, Mount, FSType, split(string=Opts, sep=&quot;,&quot;) As Options
      FROM parse_records_with_regex(
         file=ProcMounts,
         regex=&#x27;(?m)^(?P&lt;Device&gt;[^ ]+) (?P&lt;Mount&gt;[^ ]+) (?P&lt;FSType&gt;[^ ]+) &#x27;+
             &#x27;(?P&lt;Opts&gt;[^ ]+)&#x27;)


reports:
  - type: CLIENT
    template: |
      # Mounted filesystems

      {{ Query &quot;SELECT * FROM source()&quot; | Table }}

</code></pre>

