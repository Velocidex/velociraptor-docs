---
title: scope
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## scope
<span class='vql_type label label-warning pull-right page-header'>Accessor</span>


### Description

Present the content of a scope variable as a file.

Similar to the `data` accessor, this makes a string appears as the
file contents. However, instead of the filename itself containing
the file content, the filename refers to the name of a variable in
the current scope that contains the data.

This is useful when the binary data is not unicode safe and can
not be properly represented by JSON. Sometimes the filename is
echoed in various log messages and with the `data` accessor this
will echo some binary data into the logs.

### Example

```vql
LET MyData <= "This is a test string"

SELECT read_file(accessor="scope", filename="MyData") FROM scope()
```


