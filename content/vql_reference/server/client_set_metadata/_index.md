---
title: client_set_metadata
index: true
noTitle: true
sitemap:
   disable: true
no_edit: true
description: |
  Sets client metadata.

  Client metadata is a set of free form key-value pairs, i.e. a dict.

  When updating metadata the result is the same as adding 2 dicts.
  For existing keys, the value is overwritten.

  Setting a metadata key with a `NULL` value deletes that entry.

  ### Example

  ```vql
  SELECT client_set_metadata(client_id=client_id, metadata=dict(department="Lab02"))
  FROM clients()
  WHERE os_info.hostname =~ "TRAINING"
  ```

  ### Ensuring atomicity

  This function is atomic and race free only if the field that is
  modified does not depend on other client metadata. Generally avoid
  the get/modify/set pattern as this is not thread safe. It is OK to
  set a field if you are sure that another artifact will not update
  the same field at the same time.

  If you depend on a previous value in the client metadata you
  should use the modify callback method. The callback is a lambda
  which receives the metadata dict under lock and returns a modified
  dict.

  The following example implements a counter.

  ```vql
  LET _ <= client_set_metadata(client_id=ClientId,
        modify="x=>x + dict(Foo=int(int=x.Foo || 0) + 1)")

  SELECT client_metadata(client_id=ClientId) AS MD
  FROM scope()
  ```

  ### See also

  - [client_metadata]({{< ref "/vql_reference/server/client_metadata/" >}}):
    Returns client metadata from the datastore.

---



<div class="vql_item"></div>


## client_set_metadata
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
client_id||string (required)
metadata|A dict containing metadata. If not specified we use kwargs.|ordereddict.Dict
modify|A modification callback lambda. This performs an atomic mutation on the client metadata..|Lambda
`**`|Free Form Args|

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">COLLECT_CLIENT</span>
<span class="permission_list linkcolour label label-important">SERVER_ADMIN</span>

### Description

Sets client metadata.

Client metadata is a set of free form key-value pairs, i.e. a dict.

When updating metadata the result is the same as adding 2 dicts.
For existing keys, the value is overwritten.

Setting a metadata key with a `NULL` value deletes that entry.

### Example

```vql
SELECT client_set_metadata(client_id=client_id, metadata=dict(department="Lab02"))
FROM clients()
WHERE os_info.hostname =~ "TRAINING"
```

### Ensuring atomicity

This function is atomic and race free only if the field that is
modified does not depend on other client metadata. Generally avoid
the get/modify/set pattern as this is not thread safe. It is OK to
set a field if you are sure that another artifact will not update
the same field at the same time.

If you depend on a previous value in the client metadata you
should use the modify callback method. The callback is a lambda
which receives the metadata dict under lock and returns a modified
dict.

The following example implements a counter.

```vql
LET _ <= client_set_metadata(client_id=ClientId,
      modify="x=>x + dict(Foo=int(int=x.Foo || 0) + 1)")

SELECT client_metadata(client_id=ClientId) AS MD
FROM scope()
```

### See also

- [client_metadata]({{< ref "/vql_reference/server/client_metadata/" >}}):
  Returns client metadata from the datastore.


