---
title: Frequently Used ✨
weight: 10
linktitle: Frequently Used
index: true
no_edit: true
no_children: true
---

These are the functions and plugins that are the most frequently used in
[Velociraptor's built-in artifacts](/artifact_references/) and the
[Community Exchange artifacts](/exchange/). So we can infer that these are
the most "popular" and therefore probably the most useful ones for everyday
artifact writing.

VQL provides a vast array of functions and plugins allowing queries to
manipulate data and implement logic. Many are suitable for specific use
cases, however most on this page are considered foundational to the VQL
language. They are the general purpose VQL "workhorses", which is why they
are frequently used in the existing artifacts.

If you are new to VQL then this is a good place to start and become
acquainted with the commonly used functions and plugins.
|Plugin/Function|<span class='vql_type'>Type</span>|Description|
|-|-|-|
|[atoi](atoi)|<span class='vql_type'>Function</span>|Convert a string to an integer|
|[basename](basename)|<span class='vql_type'>Function</span>|Return the basename of the path|
|[chain](chain)|<span class='vql_type'>Plugin</span>|Chain the output of several queries into the same table|
|[column_filter](column_filter)|<span class='vql_type'>Plugin</span>|Select columns from another query using regex|
|[count](count)|<span class='vql_type'>Function</span>|Counts the items|
|[dict](dict)|<span class='vql_type'>Function</span>|Construct a dict from arbitrary keyword args|
|[execve](execve)|<span class='vql_type'>Plugin</span>|This plugin launches an external command and captures its STDERR,|
|[expand](expand)|<span class='vql_type'>Function</span>|Expand the path using the environment|
|[filter](filter)|<span class='vql_type'>Function</span>|Filters an array by regex or condition|
|[flatten](flatten)|<span class='vql_type'>Plugin</span>|Flatten the columns in query|
|[foreach](foreach)|<span class='vql_type'>Plugin</span>|Executes 'query' once for each row in the 'row' query|
|[format](format)|<span class='vql_type'>Function</span>|Format one or more items according to a format string|
|[get](get)|<span class='vql_type'>Function</span>|Gets the member field from the item|
|[glob](glob)|<span class='vql_type'>Plugin</span>|Retrieve files based on a list of glob expressions|
|[http_client](http_client)|<span class='vql_type'>Plugin</span>|Make a http request|
|[humanize](humanize)|<span class='vql_type'>Function</span>|Format items in human readable way|
|[if](if)|<span class='vql_type'>Function</span>|Conditional execution of query|
|[if](if)|<span class='vql_type'>Plugin</span>|Conditional execution of query|
|[info](info)|<span class='vql_type'>Plugin</span>|Get information about the running host|
|[int](int)|<span class='vql_type'>Function</span>|Truncate to an integer|
|[items](items)|<span class='vql_type'>Function</span>|Iterate over dict members producing _key and _value columns|
|[items](items)|<span class='vql_type'>Plugin</span>|Enumerate all members of the item (similar to Python's items() method)|
|[join](join)|<span class='vql_type'>Function</span>|Join all the args on a separator|
|[len](len)|<span class='vql_type'>Function</span>|Returns the length of an object|
|[log](log)|<span class='vql_type'>Function</span>|Log a message to the query log stream|
|[lowcase](lowcase)|<span class='vql_type'>Function</span>|Returns the lowercase version of a string|
|[memoize](memoize)|<span class='vql_type'>Function</span>|Memoize a query into memory|
|[netstat](netstat)|<span class='vql_type'>Plugin</span>|Collect network information|
|[now](now)|<span class='vql_type'>Function</span>|Returns the current time in seconds since epoch|
|[plist](plist)|<span class='vql_type'>Function</span>|Parse plist file|
|[process_tracker_get](process_tracker_get)|<span class='vql_type'>Function</span>|Get a single process from the global tracker|
|[process_tracker_pslist](process_tracker_pslist)|<span class='vql_type'>Plugin</span>|List all processes from the process tracker|
|[pslist](pslist)|<span class='vql_type'>Plugin</span>|Enumerate running processes|
|[range](range)|<span class='vql_type'>Plugin</span>|Iterate over range|
|[read_file](read_file)|<span class='vql_type'>Function</span>|Read a file into a string|
|[read_file](read_file)|<span class='vql_type'>Plugin</span>|Read files in chunks|
|[regex_transform](regex_transform)|<span class='vql_type'>Function</span>|Search and replace a string with multiple regex|
|[scope](scope)|<span class='vql_type'>Function</span>|return the scope|
|[scope](scope)|<span class='vql_type'>Plugin</span>|The scope plugin returns the current scope as a single row|
|[set](set)|<span class='vql_type'>Function</span>|Sets the member field of the item|
|[sigma](sigma)|<span class='vql_type'>Plugin</span>|Evaluate sigma rules|
|[split](split)|<span class='vql_type'>Function</span>|Splits a string into an array based on a regexp separator|
|[stat](stat)|<span class='vql_type'>Function</span>|Get file information|
|[str](str)|<span class='vql_type'>Function</span>|Returns the string representation of provided data|
|[substr](substr)|<span class='vql_type'>Function</span>|Create a substring from a string|
|[switch](switch)|<span class='vql_type'>Plugin</span>|Conditional execution of multiple queries in order|
|[tempdir](tempdir)|<span class='vql_type'>Function</span>|Create a temporary directory|
|[tempfile](tempfile)|<span class='vql_type'>Function</span>|Create a temporary file and write some data into it|
|[timestamp](timestamp)|<span class='vql_type'>Function</span>|Convert from different types to a time|
|[to_dict](to_dict)|<span class='vql_type'>Function</span>|Construct a dict from a query|
|[unzip](unzip)|<span class='vql_type'>Plugin</span>|Unzips a file into a directory|
|[upload](upload)|<span class='vql_type'>Function</span>|Upload a file to the upload service|
