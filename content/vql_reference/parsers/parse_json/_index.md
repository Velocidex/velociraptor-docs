---
title: parse_json
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_json
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
data|Json encoded string.|string (required)
schema|Json schema to use for validation.|list of string

### Description

Parse a JSON string into an object.

Note that when VQL dereferences fields in a dict it returns a Null for
those fields that do not exist. Thus there is no error in actually
accessing missing fields, the column will just return nil.

## Validating against a JSON schema.

A JSON schema allows us to define a required structure on the JSON
object and reject it if it does not validate.  See
https://json-schema.org/docs for an introduction to JSON schemas.

If the JSON object does not validate the provided schema, several
log messages will be emitted at level ERROR and an empty object
returned. This would normally cause the artifact collection to
fail.


