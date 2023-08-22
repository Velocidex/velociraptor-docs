---
title: patch
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## patch
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
item|The item to path|Any (required)
patch|A JSON Patch to apply|Any
merge|A merge-patch to apply|Any

### Description

Patch a JSON object with a json patch or merge.

The function allows for modifications of objects by way of
applying a json patch. You can read more about JSON patching here
https://github.com/evanphx/json-patch.

I practice you can use this to update server settings - for
example, consider the client event monitoring state.

```vql
SELECT get_client_monitoring() FROM scope()
```
```json
[
  {
    "get_client_monitoring": {
      "artifacts": [
        "Generic.Client.Stats"
      ]
    }
  }
]
```

Suppose we wish to add a new artifact, we can patch it with the json:
```json
[{"op": "add", "path": "/artifacts/0", "value": "Windows.Events.DNSQueries"}]
```

This can then be immediately pushed to `set_client_monitoring()`
to update the monitoring state.

```vql
SELECT set_client_monitoring(value=patch(
       item=get_client_monitoring(),
       patch=[dict(op="add", path="/artifacts/0", value="Windows.Events.DNSQueries")]))
FROM scope()
```


