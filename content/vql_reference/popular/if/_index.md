---
title: if
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## if
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
condition||Any (required)
then||types.LazyAny
else||types.LazyAny

### Description

Conditional execution of query

This function evaluates a condition. Note that the values used in the
`then` or `else` clause are evaluated lazily. They may be expressions
that involve stored queries (i.e. queries stored using the `LET`
keyword). These queries will not be evaluated if they are not needed.

This allows a query to cheaply branch. For example, if a parameter is
given, then perform hash or upload to the server.




<div class="vql_item"></div>


## if
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
condition||Any (required)
then||StoredQuery (required)
else||StoredQuery

### Description

Conditional execution of query

This function evaluates a condition. Note that the values used in the
`then` or `else` clause should be queries which are evaluated lazily.

These values may be expressions that involve stored queries
(i.e. queries stored using the `LET` keyword). These queries will
not be evaluated if they are not needed.

This allows a query to cheaply branch. For example, if a parameter is
given, then perform hash or upload to the server. See the
`Windows.Search.FileFinder` for an example of how `if()` is used.

NOTE: Unlike the VQL function variant of `if()`, when the values
provided to the `then` or `else` parameters are expressions which
are **not** queries, they are converted to queries by
materializing them. This will cause those to be evaluated
immediately before calling the if() plugin.

For example:
```sql
SELECT * FROM if(condition=FALSE, then=log(message="I ran!"))
```

Will evaluate the log message despite the condition being
FALSE. This happens because Velociraptor will convert the function
call into a materialized query before passing it to the if()
plugin.

The correct way to call the if() plugin is with queries:
```sql
SELECT * FROM if(condition=FALSE,
then={
   SELECT log(message="I ran!") FROM scope()
})
```

Or use stored queries

```sql
LET LogQuery = SELECT log(message="I ran!") FROM scope()

SELECT * FROM if(condition=FALSE, then=LogQuery)
```


