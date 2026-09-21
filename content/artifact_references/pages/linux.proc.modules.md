---
title: Linux.Proc.Modules
description: "Parses `/proc/modules` to enumerate loaded kernel modules with their\ndetails.\n"
type: docs-no-toc
hidden: true
sitemap:
  disable: true
tags: [Client Artifact]
build:
  list: never
---

Parses `/proc/modules` to enumerate loaded kernel modules with their
details.


---

````yaml
name: Linux.Proc.Modules
description: |
  Parses `/proc/modules` to enumerate loaded kernel modules with their
  details.

parameters:
  - name: ProcModules
    default: /proc/modules

sources:
  - precondition: |
      SELECT OS From info() where OS = 'linux'

    query: |
        SELECT Name,
          atoi(string=Size) As Size,
          atoi(string=UseCount) As UseCount,
          parse_string_with_regex(regex='''(?P<UsedBy>.*),''', string=UsedBy).UsedBy AS UsedBy,
          Status, 
          Address
        FROM split_records(
           filenames=ProcModules,
           regex='\\s+',
           columns=['Name', 'Size', 'UseCount', 'UsedBy', 'Status', 'Address'])
````


