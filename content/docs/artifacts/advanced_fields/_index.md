---
menutitle: "Advanced Fields"
title: "Advanced Artifact Fields"
date: 2025-05-20
draft: false
weight: 11
summary: |
  Artifact fields that provide more advanced functionality.
last_reviewed: 2025-02-20
---

These are less frequently used fields which deal with more advanced artifact
functionality.

### Summary

| Field Name         | Description                               |
|--------------------|-------------------------------------------|
| [column_types]({{< relref "#-column_types-" >}}) | Defines specific GUI formatting for selected results columns. | No | sequence |
| [resources]({{< relref "#-resources-" >}}) | Defines various resource limits that apply when the artifact is collected. |
| [required_permissions]({{< relref "#-required_permissions-" >}}) | . |
| [implied_permissions]({{< relref "#-implied_permissions-" >}}) | . |
| [impersonate]({{< relref "#-impersonate-" >}}) | . |
| [resources]({{< relref "#-resources-" >}}) | . |
| [tools]({{< relref "#-tools-" >}}) | Tools are external files that Velociraptor ensures are available to running artifacts. |
| [precondition]({{< relref "#-precondition-" >}}) | . |
| [imports]({{< relref "#-imports-" >}}) | A list of other artifacts' export VQL to preload prior to this artifact. |
| [export]({{< relref "#-export-" >}}) | VQL that this artifact exports. |
| [reports]({{< relref "#-reports-" >}}) | A list of reports to potentially post-process this artifact. |


{{% notice info "Field names are case-sensitive!" %}}

Due to YAML keys being case-sensitive (that is, the fields "Name" and "name"
would be treated as different keys in a YAML document), all artifact field names
are case-sensitive and, by convention, also lowercase.

{{% /notice %}}


## Fields

| [column_types]({{< relref "#-column_types-" >}}) | Defines specific GUI formatting for selected results columns. | No | sequence |
| [resources]({{< relref "#-resources-" >}}) | Defines various resource limits that apply when the artifact is collected. |
| [required_permissions]({{< relref "#-required_permissions-" >}}) | A list of required permissions to collect this artifact. |
| [implied_permissions]({{< relref "#-implied_permissions-" >}}) | . |
| [impersonate]({{< relref "#-impersonate-" >}}) | Run the artifact as a different user. |
| [tools]({{< relref "#-tools-" >}}) | Tools are external files that Velociraptor ensures are available to running artifacts. |
| [precondition]({{< relref "#-precondition-" >}}) | A VQL expression to be evaluated prior to using this artifact. |
| [imports]({{< relref "#-imports-" >}}) | A list of other artifacts' export VQL to preload prior to this artifact. |
| [export]({{< relref "#-export-" >}}) | VQL that this artifact exports. |
| [reports]({{< relref "#-reports-" >}}) | A list of reports to potentially post process this artifact. |

---

### [ column_types ]

The `column_types` field allows you to customize how specific columns (i.e.
fields returned by a queries in an artifact) are displayed in the artifact's
results tables in the GUI. That is, this field allows you to define formatting
for specific columns that are returned by the artifact.

If the column type is not specified for a particular field then Velociraptor
will try to guess the appropriate display format based on the data itself.

---

### [ resources ]

---

### [ required_permissions ]

A list of required permissions to collect this artifact.

---

### [ implied_permissions ]

// A list of permissions implied by this artifact. This is used by
// the artifact writer to declare what additional permissions the
// artifact provides over the permissions provided by the user.
//
// On the client, artifacts do not run with ACL enforced,
// therefore they can do anything, including actions which the
// user launching the artifact does not have. For example, the
// user may have the investigator role which does not have
// EXECVE. However, when launching this artifact on the client,
// the artifact will be able to run actions requiring the EXEVE
// permission (because there is no ACL enforcement on the client).
//
// Therefore we say this artifact implies the user has EXECVE -
// this is safe if the aritfact takes steps to ensure the user
// does not have arbitrary control over what to execute (for
// example, if the artifact launches a tool with restricted
// command line args).
//
// This field is only used to ensure the static analysis engine
// that the implied permission is properly controlled.

---

### [ impersonate ]

// If this is specified, we run this artifact as the named user,
// with that user's ACL token. This is similar to the Unix suid
// mechanism or the Windows impersonation mechanism in that it
// allows artifact writers to craft a curated set of powerful
// artifacts that can be run by low privileged users in a
// controlled way.

---

### [ tools ]

// An optional list of tool descriptions. These are only used to
// initialize Velociraptor if there is no previous tool
// definition. It will not override existing tools. The user may
// override the tool name in order to control where it will be
// downloaded from.

---

### [ precondition ]

A VQL expression to be evaluated prior to using this artifact.

---

### [ imports ]

---

### [ export ]

---

### [ reports ]

Deprecated. Reports have been replaced by notebooks.
