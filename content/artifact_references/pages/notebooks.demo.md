---
title: Notebooks.Demo
description: "Demonstrates notebook functionality with sample VQL and tool\nreferences.\n"
hidden: true
sitemap:
  disable: true
tags: [notebook]
build:
  list: never
---

Demonstrates notebook functionality with sample VQL and tool
references.


---

````yaml

name: Notebooks.Demo
description: |
  Demonstrates notebook functionality with sample VQL and tool
  references.

type: NOTEBOOK

# We can include tools in notebook templates, just like artifacts.
tools:
  - name: Autorun_amd64
    url: https://live.sysinternals.com/tools/autorunsc64.exe
    serve_locally: true

parameters:
  - name: StartDate
    type: timestamp
  - name: AnInteger
    type: int
    default: "5"

sources:
  - notebook:
    - type: vql
      name: Example Query with tool reference
      template: |
        SELECT StartDate, AnInteger, Tool_Autorun_amd64_URL
        FROM scope()
````


