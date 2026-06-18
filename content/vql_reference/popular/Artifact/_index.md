---
title: Artifact
index: true
noTitle: true
sitemap:
   disable: true
no_edit: true
description: |
  This is the special plugin which automatically runs other
  artifacts inline.

  The `Artifact` plugin is more similar to a module in e.g. Python,
  except it does not need to be imported as it is present in any VQL
  query.

  Dereferencing the `Artifact` plugin with "." will yield runners
  for the named artifact.

  For example, the following query:

  ```vql
  SELECT * FROM Artifact.Generic.Client.Info()
  ```

  Will run the `Generic.Client.Info` artifact inline and produce
  rows available to the VQL above.

  This allows artifacts to be nested and call other artifacts.

---



<div class="vql_item"></div>


## Artifact
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>


### Description

This is the special plugin which automatically runs other
artifacts inline.

The `Artifact` plugin is more similar to a module in e.g. Python,
except it does not need to be imported as it is present in any VQL
query.

Dereferencing the `Artifact` plugin with "." will yield runners
for the named artifact.

For example, the following query:

```vql
SELECT * FROM Artifact.Generic.Client.Info()
```

Will run the `Generic.Client.Info` artifact inline and produce
rows available to the VQL above.

This allows artifacts to be nested and call other artifacts.


