---
title: Basic VQL
weight: 10
linktitle: Basic VQL
index: true
no_edit: true
no_children: true
---

VQL provides a basic set of functions and plugins allowing
queries to manipulate data and implement logic. This page details
those plugins which are considered foundational to the VQL
language and therefore may be useful in all types of artifacts.

{{% notice note %}}
VQL plugins are not the same as VQL functions. A plugin is the subject
of the VQL query - i.e. plugins always follow the `FROM` keyword,
while functions (which return a single value instead of a sequence of
rows) are only present in column specification (e.g. after `SELECT`)
or in condition clauses (i.e. after the `WHERE` keyword).
{{% /notice %}}
|Plugin/Function|<span class='vql_type'>Type</span>|Description|
|-|-|-|
|[array](array)|<span class='vql_type'>Function</span>|Create an array|
|[atexit](atexit)|<span class='vql_type'>Function</span>|Install a query to run when the query is unwound|
|[atoi](atoi)|<span class='vql_type'>Function</span>|Convert a string to an integer|
|[base64decode](base64decode)|<span class='vql_type'>Function</span>|Decodes a base64 encoded string|
|[base64encode](base64encode)|<span class='vql_type'>Function</span>|Encodes a string into base64|
|[basename](basename)|<span class='vql_type'>Function</span>|Return the basename of the path|
|[batch](batch)|<span class='vql_type'>Plugin</span>|Batches query rows into multiple arrays|
|[cache](cache)|<span class='vql_type'>Function</span>|Creates a cache object|
|[column_filter](column_filter)|<span class='vql_type'>Plugin</span>|Select columns from another query using regex|
|[copy](copy)|<span class='vql_type'>Function</span>|Copy a file|
|[count](count)|<span class='vql_type'>Function</span>|Counts the items|
|[dict](dict)|<span class='vql_type'>Function</span>|Construct a dict from arbitrary keyword args|
|[dirname](dirname)|<span class='vql_type'>Function</span>|Return the directory path|
|[encode](encode)|<span class='vql_type'>Function</span>|Encodes a string as as different type|
|[enumerate](enumerate)|<span class='vql_type'>Function</span>|Collect all the items in each group by bin|
|[environ](environ)|<span class='vql_type'>Function</span>|Get an environment variable|
|[expand](expand)|<span class='vql_type'>Function</span>|Expand the path using the environment|
|[filter](filter)|<span class='vql_type'>Function</span>|Filters an array by regex or condition|
|[format](format)|<span class='vql_type'>Function</span>|Format one or more items according to a format string|
|[generate](generate)|<span class='vql_type'>Function</span>|Create a named generator that receives rows from the query|
|[get](get)|<span class='vql_type'>Function</span>|Gets the member field from item|
|[getpid](getpid)|<span class='vql_type'>Function</span>|Returns the current pid of the Velociraptor process|
|[humanize](humanize)|<span class='vql_type'>Function</span>|Format items in human readable way|
|[if](if)|<span class='vql_type'>Function</span>|Conditional execution of query|
|[items](items)|<span class='vql_type'>Function</span>|Iterate over dict members producing _key and _value columns|
|[items](items)|<span class='vql_type'>Plugin</span>|Enumerate all members of the item (similar to Python's items() method)|
|[join](join)|<span class='vql_type'>Function</span>|Join all the args on a separator|
|[killkillkill](killkillkill)|<span class='vql_type'>Function</span>|Kills the client and forces a restart - this is very aggressive!|
|[len](len)|<span class='vql_type'>Function</span>|Returns the length of an object|
|[log](log)|<span class='vql_type'>Function</span>|Log the message and return TRUE|
|[lowcase](lowcase)|<span class='vql_type'>Function</span>|Returns the lowercase version of a string|
|[max](max)|<span class='vql_type'>Function</span>|Finds the largest item in the aggregate|
|[memoize](memoize)|<span class='vql_type'>Function</span>|Memoize a query into memory|
|[min](min)|<span class='vql_type'>Function</span>|Finds the smallest item in the aggregate|
|[now](now)|<span class='vql_type'>Function</span>|Returns current time in seconds since epoch|
|[path_join](path_join)|<span class='vql_type'>Function</span>|Build a path by joining all components|
|[path_split](path_split)|<span class='vql_type'>Function</span>|Split a path into components|
|[query](query)|<span class='vql_type'>Function</span>|Launch a subquery and materialize it into a list of rows|
|[rand](rand)|<span class='vql_type'>Function</span>|Selects a random number|
|[range](range)|<span class='vql_type'>Plugin</span>|Iterate over range|
|[read_file](read_file)|<span class='vql_type'>Function</span>|Read a file into a string|
|[regex_transform](regex_transform)|<span class='vql_type'>Function</span>|Search and replace a string with multiple regex|
|[relpath](relpath)|<span class='vql_type'>Function</span>|Return the relative path of |
|[scope](scope)|<span class='vql_type'>Function</span>|return the scope|
|[serialize](serialize)|<span class='vql_type'>Function</span>|Encode an object as a string (csv or json)|
|[set](set)|<span class='vql_type'>Function</span>|Sets the member field of the item|
|[sleep](sleep)|<span class='vql_type'>Function</span>|Sleep for the specified number of seconds|
|[slice](slice)|<span class='vql_type'>Function</span>|Slice an array|
|[split](split)|<span class='vql_type'>Function</span>|Splits a string into an array based on a regexp separator|
|[str](str)|<span class='vql_type'>Function</span>|Returns the string representation of provided data|
|[strip](strip)|<span class='vql_type'>Function</span>|Strip prefix and/or suffix from a string|
|[substr](substr)|<span class='vql_type'>Function</span>|Create a substring from a string|
|[sum](sum)|<span class='vql_type'>Function</span>|Sums the items|
|[tempdir](tempdir)|<span class='vql_type'>Function</span>|Create a temporary directory|
|[timestamp](timestamp)|<span class='vql_type'>Function</span>|Convert from different types to a time|
|[to_dict](to_dict)|<span class='vql_type'>Function</span>|Construct a dict from a query|
|[unhex](unhex)|<span class='vql_type'>Function</span>|Apply hex decoding to the string|
|[unzip](unzip)|<span class='vql_type'>Plugin</span>|Unzips a file into a directory|
|[upcase](upcase)|<span class='vql_type'>Function</span>|Returns an uppercase version of the string|
|[upload_sftp](upload_sftp)|<span class='vql_type'>Function</span>|Upload files to SFTP|
|[upload_webdav](upload_webdav)|<span class='vql_type'>Function</span>|Upload files to a WebDAV server|
|[url](url)|<span class='vql_type'>Function</span>|Construct a URL or parse one|
|[utf16](utf16)|<span class='vql_type'>Function</span>|Parse input from utf16|
|[utf16_encode](utf16_encode)|<span class='vql_type'>Function</span>|Encode a string to utf16 bytes|
|[uuid](uuid)|<span class='vql_type'>Function</span>|Generate a UUID|
|[version](version)|<span class='vql_type'>Function</span>|Gets the version of a VQL plugin or function|
