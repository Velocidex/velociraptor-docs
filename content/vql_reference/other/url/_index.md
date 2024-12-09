---
title: url
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## url
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
scheme|The scheme to use|string
host|The host component|string
path|The path component|string
fragment|The fragment|string
query|A dict representing a query string|Any
parse|A url to parse|string

### Description

Construct a URL or parse one.

This function parses or constructs URLs. A URL may be constructed from
scratch by providing all the components or it may be parsed from an
existing URL.

The returned object is a [golang
URL](https://golang.org/pkg/net/url/#URL) and can be serialized again
using its `String` method.

This function is important when constructing parameters for certain
accessors which receive a URL. For example the `zip` accessor requires
its file names to consist of URLs. The Zip accessor interprets the URL
in the following way:

- The scheme is the delegate accessor to use.
- The path is the delegate accessor's filename
- The fragment is used by the zip accessor to retrieve the zip member itself.

In this case it is critical to properly escape each level - it is not
possible in the general case to simply append strings. You need to use
the `url()` function to build the proper url.


