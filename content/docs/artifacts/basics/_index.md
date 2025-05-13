---
menutitle: "Basic Fields"
title: "Basic Artifact Fields"
date: 2025-01-25
draft: false
weight: 5
summary: |
  The most commonly used artifact fields and how to use them.
last_reviewed: 2025-04-30
---

> Understanding the most commonly used artifact fields is crucial for working
> with artifacts. This section outlines the most commonly used artifact fields
> and explains how to use them.

## Summary

| Field Name         | Description                               | Searchable? | YAML Data Type |
|--------------------|-------------------------------------------|:------------:|:-------------:|
| [name]({{< relref "#-name-" >}}) | Artifact's unique identifier. Required | Yes | string |
| [aliases]({{< relref "#-aliases-" >}}) | Allows for multiple names to be used for the same artifact. | Yes | sequence |
| [type]({{< relref "#-type-" >}}) | Artifact category (e.g., CLIENT or SERVER). | Filterable | string |
| [description]({{< relref "#-description-" >}}) | Prose describing the artifact’s purpose and usage. | Yes | string |
| [author]({{< relref "#-author-" >}}) | Records the artifact's author. | No | string |
| [reference]({{< relref "#-reference-" >}}) | Links to external resources or further information. | No | sequence |
| [parameters]({{< relref "#-parameters-" >}}) | Parameters to be provided to the artifact. | No | sequence |
| [sources]({{< relref "#-sources-" >}}) | Describes how the artifact produces data. | No | sequence |

{{% notice info "Field names are case-sensitive!" %}}

This is due to YAML keys being case-sensitive, e.g. the fields "Name" and "name" would be treated as different
keys in a YAML document. All artifact field names are lowercase, by convention.

{{% /notice %}}

### [ name ]

The only field that is required for an artifact is its `name`. Of course we will
usually want our artifacts to have more than just a name, although there are
[special cases]({{< ref "/docs/artifacts/event_queues/" >}})
where not much else is required.

Artifact names must be unique.

**Naming rules**

1. The artifact's name can only consist of alphabetic characters (upper or
   lowercase), digits, and the characters `_` (underscore) and `.` (dot).

2. The name cannot contain `-`, spaces, or any other special characters.

3. In addition, the artifact name and the parts of an artifacts name (which are
   separated by a `.`) cannot start with a digit.

**Naming conventions**

As you'll see, most of the current artifacts tend to use CamelCase, although
this is just a convention that has developed organically. You are free to use
your own naming convention for your own artifacts.

By default when you create a new artifact in the [artifact editor](), it will
add the prefix `Custom.` to the name. This convention is usually helpful, but
if you choose not to use it then that's fine too.
If you [filter for custom artifacts]({{< ref "/docs/artifacts/gui/" >}})
on the Artifacts screen, then you will still see all the custom ones regardless
of their name.

Artifacts imported from the [Artifact Exchange]({{< ref "/exchange/" >}}) will,
by default, have the prefix `Exchange.` added to them. But again this is
completely optional (it's implemented through the import artifact's VQL
actually), and all imported artifacts are internally marked as being custom
artifacts anyway.

**How artifact names translate to file and folder structure on disk**

Each artifact is stored as a YAML file on disk in the datastore folder. The
`root` org's custom artifacts are stored in the folder `artifact_definitions` in the
root of the datastore. Custom artifacts for orgs are stored in their own
`artifact_definitions` folders for each org.

For example, with the following 3 artifacts...

```text
Custom.Artifact.Name
Custom.Windows.LastUser
Lab01.MyArtifact
```

we will have the following file and folders in the `artifact_definitions`
directory on disk:

```text
artifact_definitions
├── Custom
│   ├── Artifact
│   │   └── Name.yaml
│   └── Windows
│       └── LastUser.yaml
└── Lab01
    └── MyArtifact.yaml
```

When reading custom artifacts, for example when using the `--definitions` CLI
flag or when using `artifact_definitions_directory` in the config, then the
folder structure and file names don't matter - Velociraptor will read all
*.yaml (or .yml) files and get the artifact name from the `name` field. However
if you edit such artifacts and then save them, the saved copy will be stored in
the datastore using the structure as described above.

The name is case-sensitive. That is `Custom.MyArtifact` and `custom.myartifact`
will be saved as 2 distinct artifacts on disk and will appear separately in the
GUI.

The `name` field _is_ searched when using the search filter on the Artifacts
screen.

### [ aliases ]

Aliases are other names by which the same artifact is known.

For example, if we have an artifact named `Generic.Detection.Yara.Glob` which
can be used on any platform, then we might like to have an alias for each
platform so that this artifact will be included in the results when anyone does
a search for "Windows.Detection.*".

```yaml
name: Generic.Detection.Yara.Glob

aliases:
  - Windows.Detection.Yara.Glob
  - Linux.Detection.Yara.Glob
  - MacOS.Detection.Yara.Glob
```

The above example will show as 4 separate artifacts in the Artifacts screen.
Selecting one of the aliases and editing it will edit the single underlying
artifact. Only the original named artifact is saved on disk.

This field is a [YAML sequence](https://www.tutorialspoint.com/yaml/yaml_sequence_styles.htm)
(list) because an artifact can have several aliases.

The `aliases` field _is_ searched when using the search filter on the Artifacts
screen.

### [ type ]

Artifact types:

CLIENT, CLIENT_EVENT, SERVER, SERVER_EVENT, INTERNAL, NOTEBOOK

If the artifact `type` field is not specified then it's assumed to be the
default type: `CLIENT`.

`SERVER` artifacts are used for:
- administrative tasks, e.g. creating new orgs
- housekeeping tasks, e.g. pruning old clients and cleaning up associated data
  that's taking up space on disk.

The artifact types are also available as [search filters]({{< ref "/docs/artifacts/gui/" >}})
on the Artifacts screen.

## Informational fields

There are a few informational fields that are used to hold descriptive
"metadata" about the artifact. Because these fields are purely for human
consumption they are optional but still highly recommended as they allow other
users to understand the purpose, usage, and origin of the artifact. For
artifacts shared with the community it is helpful to be able to contact an
artifact's author to report bugs or discuss issues.


### [ description ]

The `description` field is used to include prose describing the purpose of the
artifact and any other usage information that might need to be brought to the
attention of users.

This field supports most [CommonMark markdown](https://commonmark.org/help/)
formatting, for example headings, bold/italic text, lists, tables, etc. However
when rendering the markdown some sanitization is applied for security reasons,
so it's possible that not all markdown elements will be rendered in the GUI.

The `description` field _is_ searched when using the search filter on the
Artifacts screen.

See [Artifact Writing Tips]({{< ref "/docs/artifacts/tips/#artifact-descriptions" >}}) for some
suggestions on writing good descriptions for your artifacts.

### [ author ]

The `author` field is _not_ searched when using the search filter on the
Artifacts screen.

### [ reference ]

The `reference` field accepts an sequence (list) of one or more strings. These
strings are parsed as markdown in the GUI, so if you add a raw URL it will be
rendered as a clickable hyperlink.

![References are displayed in the artifact viewer](references.png)

Since the strings are rendered as markdown, you can also use markdown's link
syntax - `[My Example](https://example.com)` - to make your links prettier.

This field is typically used for links to websites that the artifact author
thinks are helpful or relevant further reading. However you could use the
`reference` field to store other data such as links plus additional contextual
information for each item, or MITRE ATT&CK® ID tags, or [more complex
markdown](https://www.markdownguide.org/basic-syntax/) which can include
headings, paragraphs, tables. But the most common use case for this field is
just simple links to internet resources.

Since the field is a YAML sequence, this is how you would specify it:

```yaml
reference:
  - https://golearn.here
  - https://nowgohere.2learn.com - with some **extra** info
  - |
    And items can contain \
    multiline strings too.
```

We also accept the field name `references` (with an s on the end) which is an
alias for this field, however it is not recommended as the contents will not be
shown in the GUI.

The `reference` field is _not_ searched when using the search filter on the
Artifacts screen.

### [ parameters ]

The `parameters` field is _not_ searched when using the search filter on the
Artifacts screen.

For a more detailed discussion of `parameters` see the
[Parameters]({{< ref "/docs/artifacts/parameters/" >}}) section.

### [ sources ]

The `sources` field is _not_ searched when using the search filter on the
Artifacts screen.

For a more detailed discussion of `sources` see the
[Sources]({{< ref "/docs/artifacts/sources/" >}}) section.