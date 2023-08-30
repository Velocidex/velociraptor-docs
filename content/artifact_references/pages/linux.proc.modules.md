---
title: Linux.Proc.Modules
hidden: true
tags: [Client Artifact]
---

Module listing via /proc/modules.

<pre><code class="language-yaml">
name: Linux.Proc.Modules
description: Module listing via /proc/modules.
parameters:
  - name: ProcModules
    default: /proc/modules

sources:
  - precondition: |
      SELECT OS From info() where OS = &#x27;linux&#x27;

    query: |
        SELECT Name,
          atoi(string=Size) As Size,
          atoi(string=UseCount) As UseCount,
          parse_string_with_regex(regex=&#x27;&#x27;&#x27;(?P&lt;UsedBy&gt;.*),&#x27;&#x27;&#x27;, string=UsedBy).UsedBy AS UsedBy,
          Status, 
          Address
        FROM split_records(
           filenames=ProcModules,
           regex=&#x27;\\s+&#x27;,
           columns=[&#x27;Name&#x27;, &#x27;Size&#x27;, &#x27;UseCount&#x27;, &#x27;UsedBy&#x27;, &#x27;Status&#x27;, &#x27;Address&#x27;])

</code></pre>

