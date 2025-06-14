---
title: parse_lines
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_lines
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
filename|A list of log files to parse.|list of OSPath (required)
accessor|The accessor to use.|string
buffer_size|Maximum size of line buffer.|int

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Parse a file separated into lines.

Many programs write text based logs separated by line feeds - for
example `Apache`, `nginx` or `IIS`. You can parse these files with
this plugin.

The plugin reads a line at the time and emits the line as a `Line`
column. To determine when the line ends, the plugin will read
ahead up to buffer size bytes and search for the next line
feed. By default this is 64kb but you can change it using the
`buffer_size` parameter. The Line will have the linefeed removed.

Note that this plugin will automatically detect when the file is
compressed using `gzip` and automatically decompress the file for
reading. This makes it suitable to use on a mix of compressed and
uncompressed files (typically older log files are compressed and
rotated).

On Windows, some programs insert the UTF16 BOM marker at the start
of the file. This plugin will strip this marker automatically but
will not convert the line to a regular UTF8 string - you will need
to call the `utf16()` on the line to do so explicitly.

Most users need to further parse the emitted line using for
example `grok()` or `parse_string_with_regex()`


