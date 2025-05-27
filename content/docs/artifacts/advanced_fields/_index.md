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

Specifies a list of permissions that a user must possess before the server will
allow them to schedule or collect the artifact. This check is performed by the
server when a user attempts to launch an individual collection or hunt that
includes the artifact.

The purpose of `required_permissions` is to restrict access to artifacts
that can perform sensitive or potentially dangerous operations. Artifact authors
determine which artifacts require additional permissions and add this field
accordingly. For instance, artifacts that allow running arbitrary commands on an
endpoint often require the `EXECVE` permission. Users who lack the required
permissions cannot launch the collection of that artifact. This helps in
enforcing a least privilege model by preventing users with lower roles, such as
Investigator, from running potentially harmful artifacts if they do not have the
necessary permissions.

It's important to note that the required_permissions check is only performed on
the artifact being launched. It does not apply to any dependent artifacts that
the launched artifact might call. This design is deliberate, allowing
administrators to create "wrapper artifacts" or curated versions of dangerous
artifacts that can be used safely by lower-privilege users.

A user with the `ARTIFACT_WRITER` permission can modify the artifact definition
itself. This capability allows them to potentially bypass the
required_permissions model by removing or changing the required permissions on
the artifact.

For more information see the
[Artifact Security]({{< ref "/docs/artifacts/security/" >}})
and
[Roles and Permissions]({{< ref "/docs/deployment/security/#roles-and-permissions" >}})
sections.

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

For scenarios where you need to allow lower-privileged users to perform specific
tasks that typically require higher permissions (like `EXECVE` for quarantine
actions), the `impersonate` directive within an artifact's definition allows
users with limited permissions (e.g., `COLLECT_BASIC`) to launch the artifact,
which then executes the privileged actions under the impersonated user's
authority, effectively granting permission only for that specific artifact's
operation. This provides a way to safely delegate specific higher-privilege
tasks without granting the launching user broad permissions like `EXECVE` which
could provide full server shell access. You can also mark the artifact as
"basic" using `artifact_set_metadata()` to allow users with `COLLECT_BASIC`
permission to see and collect it.

This is similar to the Unix suid mechanism or the Windows impersonation
mechanism in that it allows artifact writers to craft a curated set of powerful
artifacts that can be run by low privileged users in a controlled way.

---

### [ tools ]

A list of third-party tool definitions, which will be used by the artifact.
These can be executables _or any other file_ that the client will need when it
runs the VQL in the artifact's sources.

If the full tool definition is provided in another artifact, and therefore
already know to the server, then you may only need to provide the tool's name
and optionally its version in subsequent artifact definitions.



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
