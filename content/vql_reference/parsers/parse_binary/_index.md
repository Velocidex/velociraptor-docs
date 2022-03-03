---
title: parse_binary
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_binary
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|Binary file to open.|OSPath (required)
accessor|The accessor to use|string
profile|Profile to use (see https://github.com/Velocidex/vtypes).|string
struct|Name of the struct in the profile to instantiate.|string (required)
offset|Start parsing from this offset|int64

### Description

Parse a binary file into a data structure using a profile.

This plugin extract binary data from strings. It works by applying
a profile to the binary string and generating an object from
that. Profiles are a json structure describing the binary format. For
example a profile might be:

```json
[
  ["StructName", 10, [
     ["field1", 2, "unsigned int"],
     ["field2", 6, "unsigned long long"],
   ]]]
]
```

The profile is compiled and overlaid on top of the offset specified,
then the object is emitted with its required fields.

You can read more about profiles here https://github.com/Velocidex/vtypes


