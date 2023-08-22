---
title: parse_csv
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_csv
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|CSV files to open|list of OSPath (required)
accessor|The accessor to use|string
auto_headers|If unset the first row is headers|bool
separator|Comma separator (default ',')|string
comment|The single character that should be considered a comment|string
columns|The columns to use|list of string

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Parses events from a CSV file.

Parses records from a CSV file. We expect the first row of the CSV
file to contain column names.  This parser specifically supports
Velociraptor's own CSV dialect and so it is perfect for post
processing already existing CSV files.

The types of each value in each column is deduced based on
Velociraptor's standard encoding scheme. Therefore types are properly
preserved when read from the CSV file.

For example, downloading the results of a hunt in the GUI will produce
a CSV file containing artifact rows collected from all clients.  We
can then use the `parse_csv()` plugin to further filter the CSV file,
or to stack using group by.

### Example

The following stacks the result from a
`Windows.Applications.Chrome.Extensions` artifact:

```vql
SELECT count(items=User) As TotalUsers, Name
FROM parse_csv(filename="All Windows.Applications.Chrome.Extensions.csv")
Order By TotalUsers
Group By Name
```


