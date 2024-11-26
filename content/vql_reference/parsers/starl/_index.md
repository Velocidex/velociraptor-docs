---
title: starl
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## starl
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
code|The body of the starlark code.|string (required)
key|If set use this key to cache the Starlark code block.|string
globals|Dictionary of values to feed into Starlark environment|Any

### Description

Compile a starlark code block - returns a module usable in VQL

Starl allows python like code to be used with VQL. This helps when
we need some small functions with more complex needs. We can use a
more powerful language to create small functions to transform
certain fields etc.

### Example

In the following example we define a Starl code block and compile
it into a module. VQL code can then reference any functions
defined within it directly.

```vql
LET MyCode <= starl(code='''
load("math.star", "math")

def Foo(X):
  return math.sin(X)

''')

SELECT MyCode.Foo(X=32)
FROM scope()
```


