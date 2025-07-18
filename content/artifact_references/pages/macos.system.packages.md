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
    default: "100000000"

implied_permissions:
  - EXECVE

sources:
  - precondition: |
      SELECT OS From info() where OS = 'darwin'
    query: |
        LET packages = SELECT parse_json(data=Stdout) AS Json
          FROM execve(argv=[
            "system_profiler", "-json", "SPApplicationsDataType"
          ], length=Length)

        SELECT  _name AS Name,
                get(field="version") AS Version,
                path AS Path,
                lastModified AS LastModified,
                obtained_from AS ObtainedFrom,
                get(field="signed_by") AS SignedBy,
                arch_kind AS _Architecture
        FROM foreach(
           row=packages[0].Json.SPApplicationsDataType)

</code></pre>

