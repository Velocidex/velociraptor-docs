---
menutitle: "Column Types"
title: 'Defining Column Types'
date: 2025-05-15
draft: false
weight: 120
summary: 'Understanding the "column_types" field.'
last_reviewed: 2025-05-15
---

The `column_types` field allows you to customize how specific columns (i.e.
fields returned by a queries in an artifact) are displayed in the artifact's
results tables in the GUI. That is, this field allows you to define formatting
for specific columns that are returned by the artifact.

If the column type is not specified for a particular field then Velociraptor
will try to guess the appropriate display format based on the data itself.


