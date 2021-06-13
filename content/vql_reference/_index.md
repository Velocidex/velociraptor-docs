---
title: "VQL Reference"
menutitle: VQL Reference
date: 2021-06-12T05:12:26Z
draft: false
weight: 60
pre: <i class="fas fa-book"></i>
head: <hr>
---


The Velociraptor Query language (VQL) is an expressive language
designed for querying endpoint state. It was developed as a way to
flexibly adapt new IOCs on endpoints without needing to rebuild or
deploy new endpoints.

VQL is simple to use and simple to understand. Although it draws its
inspiration from SQL, VQL does not support complex operations such as
join. Unlike SQL, which can only query static tables of data, VQL
queries `plugins` which are provided parameters. This allows VQL
plugins to customize their output based on arguments provided to them.

The basic structure of a VQL query is:

```sql
SELECT Column1, Column2, Column3 FROM plugin(arg=1) WHERE Column1 = "X"
```

In the above we term the clause between the `SELECT` and `FROM` clause
the "Column Specification". The clause between the `FROM` and `WHERE`
is termed the `plugin clause` while the terms after the `WHERE` are
termed the `filter clause`.

## Column Specification

The column specification is a comma delimited list of expressions
which may consist of operations or VQL functions. The expressions
operate on each row returned from the plugin. Each expression
specifies a single Column to add to the transformed row. Alternatively
the Column Specification may consist of "*" indicating no
transformation shall be applied to the rows returned from the plugin.

A column expression may also use the keyword `AS` to define an alias
for the expression (i.e. define a new name for the column).

For example the following will return a row with a column names "Now"
containing the string representation of the current time:

```sql
SELECT timestamp(epoch=now()) AS Now FROM scope()
```

## Plugin

The plugin clause specifies a VQL plugin to run. VQL plugins are the
data source for the VQL query and generate a sequence of rows. They
also take keyword args.

{{% notice note %}}

Plugins must take keyword args (i.e. keyword=value). Positional args
are currently not supported. You will receive a syntax error if no
keyword is provided.

{{% /notice %}}

The names of the args are defined by the plugin itself which also
defines which arg is required and which are simply optional. The
references below explain the meaning of each arg for the different
plugins.

Args also have a type and must receive the correct type. For example,
providing a string to an arg which requires an integer will result in
that arg being ignored. The VQL statement will not be aborted though!
Such a syntax error will simply result in the plugin returning no rows
and a log message generated.
