---
title: Experimental Functionality
weight: 60
linktitle: Experimental
index: true
---

Velociraptor is evolving quickly. We sometime implement
functionality which may not remain in Velociraptor. This page
documents some of the experimental features. If you find them
useful, please let us know!

## js
<span class='vql_type pull-right'>Function</span>

Compile and run javascript code.

Arg | Description | Type
----|-------------|-----
js|The body of the javascript code.|string (required)
key|If set use this key to cache the JS VM.|string


## js_call
<span class='vql_type pull-right'>Function</span>

Compile and run javascript code.

Arg | Description | Type
----|-------------|-----
func|JS function to call.|string (required)
args|Positional args for the function.|Any
key|If set use this key to cache the JS VM.|string

