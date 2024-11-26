---
title: array
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## array
<span class='vql_type label label-warning pull-right page-header'>Function</span>


### Description

Create an array.

This function is the array constructor. It can be used to build an
array from a number of args (Note that since VQL always uses
keyword args you need to give each arg a name but this name is
actually ignored in this function):

```vql
array(a=1, b=2) -> [1, 2]
```

The function does not flatten the arguments so providing lists as
parameters will form a nested list:

```vql
array(a=[1,2]) -> [ [1, 2] ]
```

You can use the `_` argument to build the array from another
object:

```vql
array(_=[1, 2]) -> [1, 2]
```

You can use a subquery to built the object from another
query. This is called `materializing` the query because the query
will be expanded into memory (be careful about materializing a
very large query here!)

Note that materializing a query will give a list of dicts() since
each row in a query is a dict.

```vql
array(_={ SELECT User FROM Artifact.Windows.System.Users() }) -> [{"User": "Bob"}, {"User": "Fred"}]
```

To collapse to a simple list of users, simply reference the User
field:

```vql
array(_={ SELECT User FROM Artifact.Windows.System.Users() }).User -> ["Bob", "Fred"]
```

This works because the `.` operator on a list, creates another
list with the `.` operator applying on each member.


