---
title: watch_syslog
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## watch_syslog
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|A list of log files to parse.|list of OSPath
accessor|The accessor to use.|string
buffer_size|Maximum size of line buffer.|int
query|If specified we run this query periodically to watch for new files. Rows must have an OSPath column.|StoredQuery

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Watch a syslog file and stream events from it.

When the plugin starts watching, it seeks to the end of the file
and forwards any new lines from it.

This plugin will tail a line delimited text file and emit rows for
each new line that appears in the file (It does not have to be a
syslog file, as many programs log into a line delimited text
file).

You can specify a set of non-existent files in the `filename` arg
and the plugin will wait for the files to appear, then stream
their content. When new files appear, the plugin will also dump
their entire file content to ensure no lines are missed.

Sometimes it is not known in advance what the filename is, so in
this case you can specify the query parameter to search for new
files to watch periodically. If a new file appears, this plugin
will dump all its existing lines then seek to the end of the file
and continue dumping any new lines (So no lines should be missed).

## Example:

```vql
SELECT OSPath, Line
FROM watch_syslog(query={
    SELECT OSPath FROM glob(globs='/var/log/logfile*.log')
})
```


