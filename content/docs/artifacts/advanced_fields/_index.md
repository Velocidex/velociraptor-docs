---
menutitle: "Advanced Fields"
title: "Advanced Artifact Fields"
date: 2025-05-20
draft: false
weight: 11
summary: |
  Artifact fields that provide more advanced functionality.
last_reviewed: 2025-05-26
---

These are less frequently used fields which deal with more advanced artifact
functionality.

### Summary

| Field Name         | Description                               |
|--------------------|-------------------------------------------|
| [column_types]({{< relref "#-column_types-" >}}) | Defines specific GUI formatting for selected results columns. | No | sequence |
| [precondition]({{< relref "#-precondition-" >}}) | A VQL expression to be evaluated prior to using this artifact. |
| [export]({{< relref "#-export-" >}}) | VQL that this artifact exports. |
| [imports]({{< relref "#-imports-" >}}) | A list of other artifacts' export VQL to preload prior to this artifact. |
| [resources]({{< relref "#-resources-" >}}) | Resource limits that apply when the artifact is collected. |
| [tools]({{< relref "#-tools-" >}}) | Tools are external files that Velociraptor ensures are available to running artifacts. |
| [impersonate]({{< relref "#-impersonate-" >}}) | Run the artifact as a different user. |
| [implied_permissions]({{< relref "#-implied_permissions-" >}}) | Projected permissions which the artifact will use on the client. |
| [required_permissions]({{< relref "#-required_permissions-" >}}) | A list of permissions required to collect this artifact. |
| [reports]({{< relref "#-reports-" >}}) | A list of reports to potentially post-process this artifact. (deprecated) |

{{% notice info "Field names are case-sensitive!" %}}

Due to YAML keys being case-sensitive (the fields "Name" and "name" would be
treated as different keys in a YAML document), all artifact field names are
case-sensitive and, by convention, also lowercase.

{{% /notice %}}


## Fields



---

### [ column_types ]

The `column_types` field allows you to customize how specific columns (i.e.
fields returned by a queries in an artifact) are displayed in the artifact's
results tables in the GUI. That is, this field allows you to define formatting
for specific columns that are returned by the artifact.

This is not mandatory but helps the GUI understand the data better, allowing it
to render types like timestamps appropriately or display binary data with a hex
viewer if the column type is specified as binary.

If the column type is not specified for a particular field then Velociraptor
will try to infer or guess the appropriate display format based on the data
in the first row of the query results.

The GUI's display can be impacted by rows with varying fields, potentially
truncating columns if they don't appear in the initial rows viewed.

---

### [ resources ]

You can define default resource limits directly within the artifact's YAML
definition using the `resources` section. This allows tailoring resource control
per artifact. These defaults are then populated in the GUI when a collection is
created.

When you create a new collection or hunt, you can specify resource limits in the
"Specify Resources" tab. Settings made in the GUI override the limits defined in
the artifact itself.

If you define `resources` in your artifact, you only need to specify the subkeys
relevant to the resources you want to limit. Default values will apply to any
subkeys not specified and, as mentioned above, users still have the opportunity
to overide these limits in the GUI before collecting the artifact.

The following resource limit settings are currently available in artifact
definitions:

- `timeout`
- `ops_per_second`
- `cpu_limit`
- `iops_limit`
- `max_rows`
- `max_upload_bytes`
- `max_batch_wait`
- `max_batch_rows`
- `max_batch_rows_buffer`

---

### [ required_permissions ]

A list of permissions required to collect this artifact.

Commonly used:

- EXECVE
- MACHINE_STATE
- SERVER_ADMIN
- IMPERSONATION



---

### [ implied_permissions ]

A list of permissions implied by this artifact. This is used by the artifact
writer to declare what additional permissions the artifact provides on the
client, which may be beyond the permissions which the user has on the server.

On the client, artifacts do not run with ACL enforced, therefore they can do
anything, including actions which the user launching the artifact does not have.
For example, the user may have the investigator role which does not have EXECVE.
However, when launching this artifact on the client, the artifact will be able
to run actions requiring the EXEVE permission (because there is no ACL
enforcement on the client).

Therefore we say this artifact implies the user has EXECVE - this is safe if the
aritfact takes steps to ensure the user does not have arbitrary control over
what to execute (for example, if the artifact launches a tool with restricted
command line args).

This field is only used by the static analysis engine to ensure that the implied
permission is properly controlled.

---

### [ impersonate ]

If this is specified, we run this artifact as the named user,
with that user's ACL token. This is similar to the Unix suid
mechanism or the Windows impersonation mechanism in that it
allows artifact writers to craft a curated set of powerful
artifacts that can be run by low privileged users in a
controlled way.

---

### [ tools ]

An optional list of tool descriptions. These are only used to
initialize Velociraptor if there is no previous tool
definition. It will not override existing tools. The user may
override the tool name in order to control where it will be
downloaded from.

---

### [ precondition ]

A VQL query to be evaluated prior to using this artifact.


See [preconditions]() for further details of how this field works.

---

### [ imports ]

---

### [ export ]

---

### [ reports ]

Deprecated. Reports have been deprecated in favour of
[notebooks]({{< ref "/docs/notebooks/" >}}).
