---
title: "Metadata"
date: 2024-12-18
draft: false
weight: 30
---

Client metadata is an arbitrary key/value store that holds user defined
information per client.

Metadata is accessed and edited on the client overview page.

Metadata is conceptually similar to
[client labels]({{< ref "/docs/clients/labels/" >}}) in that they data
structures which exist on the server only, are used to organize and manage
clients, and are completely user-defined. Metadata and labels differ in that
metadata fields can store arbitrary values while labels _are_ values.

## Indexed Metadata

You can store arbitrary values in client metadata fields but this information is
not indexed, thus making searches on it slow (using VQL each client's metadata
blob needs to be opened, read and matched).

This setting allows you to define _some_ fields in the client metadata that will
be indexed. These fields should not be too large so as to keep the index size
smallish so it is recommended to use only small strings. Once fields are defined
here, the extra data can be searched in the GUI search bar using a verb such as
`<field_name>:match`.

For example, if we specify the following in the server configuration:

```yaml
indexed_client_metadata:
  - department
  - owner
```

Then a search for `department:accounting` will match all clients where the key
`department` and contains the value `accounting` in their client metadata.



### Searching metadata

GUI


### Accessing metadata via VQL

VQL


