---
title: index
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## index
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|A VQL Query to parse and execute.|StoredQuery (required)
mapping|A dict to describe field mapping.|ordereddict.Dict
default_analyzer|The default analyzer to use.|string
output|The file path to create the index on.|string (required)

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_WRITE</span>

### Description

Create a local index from a query.

This plugin uses [Bleve](https://blevesearch.com/) to build an
on-disk full text index of the query. The index can be searched
with `index_search()`.

In order to build the index, the fields must be analyzed. The
analyzer breaks the text into tokens which are then indexed. The
process depends on the nature of the data.

The mappings can dictate how this process is done:

- `text`: This is the default analyzer - it considers the text to
  be English text and breaks it into words, applies suffixes etc.
- `number`: The field is considered to be a number
- `date`: The field is considered to be a date and parsed into a standard form.
- `bool`: The field is considered a bool (true or false)
- `ip`: The field is parsed as an IP.

If no field mappings are specified we treat all fields as text.

For example:
```
LET DataStream = SELECT OSPath, read_file(filename=OSPath) AS Data
FROM glob(globs="/etc/*")
WHERE NOT IsDir AND NOT IsLink

SELECT * FROM index(query=DataStream, output=IndexPath)
```

Once the index is created it can be searched. For example:
```
SELECT *
FROM index_search(path=IndexPath, fields="Data", search="syslog")
```


