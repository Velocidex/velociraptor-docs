---
title: eval
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## eval
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
func|Lambda function to evaluate e.g. x=>1+1 where x will be the current scope.|Lambda (required)

### Description

Evaluate a vql lambda function on the current scope.

This allows you to use a string as a VQL function - the string
will be parsed at runtime as a VQL expression and then evaluated.

You can access previously defined variables or functions within
the scope.

Note that when eval calls the function, the current scope will be
passed as the first parameter to the lambda.

### Example

```vql
LET AddTwo(x) = x + 2

SELECT eval(func="x=>AddTwo(x=1)") AS Three FROM scope()
```


