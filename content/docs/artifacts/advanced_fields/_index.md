---
menutitle: "Advanced Fields"
title: "Advanced Artifact Fields"
date: 2025-05-20
draft: false
weight: 120
summary: |
  Artifact fields that provide advanced functionality.
last_reviewed: 2025-02-20
---



### Summary

These fields are

| Field Name         | Description                               |
|--------------------|-------------------------------------------|
| [column_types]({{< relref "#-column_types-" >}}) | Defines specific GUI formatting for selected results columns. | No | sequence |
| [resources]({{< relref "#-resources-" >}}) | Defines various resource limits that apply when the artifact is collected. |
| [implied_permissions]({{< relref "#-implied_permissions-" >}}) | . |
| [required_permissions]({{< relref "#-required_permissions-" >}}) | . |

{{% notice info "Field names are case-sensitive!" %}}

Due to YAML keys being case-sensitive (that is, the fields "Name" and "name"
would be treated as different keys in a YAML document), all artifact field names
are case-sensitive and, by convention, also lowercase.

{{% /notice %}}


## Fields

### [ column_types ]

The `column_types` field allows you to customize how specific columns (i.e.
fields returned by a queries in an artifact) are displayed in the artifact's
results tables in the GUI. That is, this field allows you to define formatting
for specific columns that are returned by the artifact.

If the column type is not specified for a particular field then Velociraptor
will try to guess the appropriate display format based on the data itself.




### [ resources ]

### [ required_permissions ]

### [ implied_permissions ]
