---
title: Frequently Used ✨
weight: 10
linkTitle: Frequently Used
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  These are the functions and plugins that are the most frequently used in
  [Velociraptor's built-in artifacts](/artifact_references/) and the
  [Community Exchange artifacts](/exchange/). So we can infer that these are
  the most "popular" and therefore probably the most useful ones for everyday
  artifact writing.
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
|Plugin/Function|Type|Description|
|-|-|-|
|[Artifact](artifact)|Plugin|This is the special plugin which automatically runs other|
|[atoi](atoi)|Function|Convert a string to an integer|
|[basename](basename)|Function|Return the basename of the path|
|[chain](chain)|Plugin|Chain the output of several queries into the same table|
|[column_filter](column_filter)|Plugin|Select columns from another query using regex|
|[count](count)|Function|Counts the items|
|[dict](dict)|Function|Construct a dict from arbitrary keyword args|
|[execve](execve)|Plugin|This plugin launches an external command and captures its STDERR,|
|[expand](expand)|Function|Expand the path using the environment|
|[filter](filter)|Function|Filters an array by regex or condition|
|[flatten](flatten)|Plugin|Flatten the columns in query|
|[foreach](foreach)|Plugin|Executes 'query' once for each row in the 'row' query|
|[format](format)|Function|Format one or more items according to a format string|
|[get](get)|Function|Gets the member field from the item|
|[glob](glob)|Plugin|Retrieve files based on a list of glob expressions|
|[http_client](http_client)|Plugin|Make a http request|
|[humanize](humanize)|Function|Format items in human readable way|
|[if](if)|Function|Conditional execution of query|
|[if](if)|Plugin|Conditional execution of query|
|[info](info)|Plugin|Get information about the running host|
|[int](int)|Function|Truncate to an integer|
|[items](items)|Function|Iterate over dict members producing _key and _value columns|
|[items](items)|Plugin|Enumerate all members of the item (similar to Python's items() method)|
|[join](join)|Function|Join all the args on a separator|
|[len](len)|Function|Returns the length of an object|
|[log](log)|Function|Log a message to the query log stream|
|[lowcase](lowcase)|Function|Returns the lowercase version of a string|
|[memoize](memoize)|Function|Memoize a query into memory|
|[netstat](netstat)|Plugin|Collect network information|
|[now](now)|Function|Returns the current time in seconds since epoch|
|[plist](plist)|Function|Parse plist file|
|[process_tracker_get](process_tracker_get)|Function|Get a single process from the global tracker|
|[process_tracker_pslist](process_tracker_pslist)|Plugin|List all processes from the process tracker|
|[pslist](pslist)|Plugin|Enumerate running processes|
|[range](range)|Plugin|Iterate over range|
|[read_file](read_file)|Function|Read a file into a string|
|[read_file](read_file)|Plugin|Read files in chunks|
|[regex_transform](regex_transform)|Function|Search and replace a string with multiple regex|
|[scope](scope)|Function|return the scope|
|[scope](scope)|Plugin|The scope plugin returns the current scope as a single row|
|[set](set)|Function|Sets the member field of the item|
|[sigma](sigma)|Plugin|Evaluate sigma rules|
|[split](split)|Function|Splits a string into an array based on a regexp separator|
|[stat](stat)|Function|Get file information|
|[str](str)|Function|Returns the string representation of the provided data|
|[substr](substr)|Function|Create a substring from a string|
|[switch](switch)|Plugin|Conditional execution of multiple queries in order|
|[tempdir](tempdir)|Function|Create a temporary directory|
|[tempfile](tempfile)|Function|Create a temporary file and write some data into it|
|[timestamp](timestamp)|Function|Convert from different types to a time|
|[to_dict](to_dict)|Function|Construct a dict from a query|
|[unzip](unzip)|Plugin|Unzips a file into a directory|
|[upload](upload)|Function|Upload a file to the upload service|
