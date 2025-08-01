---
title: parse_binary
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_binary
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|Binary file to open.|OSPath (required)
accessor|The accessor to use|string
profile|Profile to use (see [https://github.com/Velocidex/vtypes](https://github.com/Velocidex/vtypes).|string
struct|Name of the struct in the profile to instantiate.|string (required)
offset|Start parsing from this offset|int64

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

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

Please refer to [Binary
Parsing](https://docs.velociraptor.app/docs/forensic/binary/) for
a background in parsing binary data for forensic purposes and for
instructions on how to construct profiles like the example above.

More detailed information about profiles and their implementation
can be found in the [vfilter](https://github.com/Velocidex/vtypes)
module documentation.


