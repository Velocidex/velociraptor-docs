---
title: MacOS.System.Packages
hidden: true
tags: [Client Artifact]
---

Parse packages installed on Macs


<pre><code class="language-yaml">
name: MacOS.System.Packages
description: |
  Parse packages installed on Macs
parameters:
  - name: Length
    description: Size (in bytes) of output that will be returned
    type: int
    default: &quot;100000000&quot;
sources:
  - precondition: |
      SELECT OS From info() where OS = &#x27;darwin&#x27;
    query: |
        LET packages = SELECT parse_json(data=Stdout) AS Json 
          FROM execve(argv=[
            &quot;system_profiler&quot;, &quot;-json&quot;, &quot;SPApplicationsDataType&quot;
          ], length=Length)

        SELECT  _name AS Name,
                get(field=&quot;version&quot;) AS Version, 
                path AS Path, 
                lastModified AS LastModified, 
                obtained_from AS ObtainedFrom,
                get(field=&quot;signed_by&quot;) AS SignedBy,
                arch_kind AS _Architecture
        FROM foreach(
           row=packages[0].Json.SPApplicationsDataType)

</code></pre>

