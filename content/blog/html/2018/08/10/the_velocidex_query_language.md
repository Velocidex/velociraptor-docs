---
date: 2018-08-10T04:10:06Z
description:  |
  Velociraptor is powered by VQL and VQL is the killer feature which
  makes it so powerful. But what exactly is VQL? This section is a quick
  overview of VQL.

title: Velocidex Query Language (VQL)
url: /blog/html/2018/08/10/the_velocidex_query_language.html
categories: ["Blog"]
hidden: true
---


VQL Overview
============

VQL is only loosely based around SQL in the sense that the general
statement structure is similar. However, VQL is a very simple dialect.
Like SQL, a VQL query produces a table of results with specific columns
and multiple rows. Unlike SQL, the data inside each cell is not limited
to simple primitive types (like string, integer etc). In fact any JSON
serializable object can be generated in a table\'s cell. It is not
uncommon to generate an entire JSON object with additional fields in
each row for a single column.

The basic structure of a VQL statement is:

``` {.sourceCode .sql}
SELECT Column1, Column2, Column3 from plugin(arg=value) WHERE Column1 > 5
```

There are three main parts: Column selectors, Plugin and Filter
Conditions.

Plugins
-------

The VQL plugin is VQL\'s data source. Plugins are specific pieces of
code which may accept arguments and generate a sequence of rows. VQL\'s
strength is that these plugins are very easy to write and can be added
to Velociraptor in order to add extra functionality.

Unlike SQL, VQL plugins take keyword arguments. This allows Velociraptor
plugins to be easily customizable and adaptable. For example, a plugin
may list all chrome extensions, and receive an argument pointing it to
the user\'s home directory so it can flexibly be applied to different
situations. The ability to provide arguments to plugins encourages
writing more generic plugins which can be reused in multiple situations.

::: {.note}
::: {.admonition-title}
Note
:::

VQL plugins currently only accept keyword arguments. It is a syntax
error to pass args without naming them - glob(\"/bin/\*\") is not valid
syntax, it should be glob(globs=\"/bin/\*\")
:::

It is important to appreciate that Plugins generate data dynamically.
The data is not stored in a database table first! Plugins may begin
generating data immediately and the VQL query will begin processing this
data, even if the total amount of data is very large. The Plugin\'s data
is not stored in memory all at once! This allows for plugins to produce
an unbounded number of rows and the query will proceed until the
required number of results is achieved.

Plugins may also be cancelled when the query completes, even if the
plugin itself is not exhausted.

Column selectors
----------------

The Column selectors are a group of expressions specifying which columns
will be produced in the output table. As mentioned previously, the
values produced in each column are not limited to simple types -it is
common to produce entire JSON objects (and even additional tables),
lists of values etc.

The column selectors specify a transformation to be performed on the
output of the plugin in producing the query\'s columns. The simplest
transformation is a single \"\*\", which means no transformation at all
(i.e. relay to the output table exactly the output of the plugin).

Since plugins may produce any object (for example, a JSON object with
nested fields), VQL column specifications can dereference nested fields
within the produced data.

``` {.sourceCode .sql}
SELECT Sys.Mtim.Sec from glob(globs="/bin/*")
```

Specifying only selected columns can limit the number of columns
produced and make the output more useful by removing unneeded fields.
For example the following will produce a result table with two columns
named FullPath and SIze and a row per file found in the /bin/ directory:

``` {.sourceCode .sql}
SELECT FullPath, Size from glob(globs="/bin/*")
```

Column specifications can consist of arbitrary expressions - for example
addition, comparisons:

``` {.sourceCode .sql}
SELECT FullPath + '.bindir', Size from glob(globs="/bin/*") WHERE Size < 1000
```

In this case it is often useful to add a Column Alias (Note that column
aliases can also be used in the WHERE clause):

``` {.sourceCode .sql}
SELECT FullPath + '.bindir' as Santized, Size from glob(globs="/bin/*")
```

VQL Functions provide a way to extend VQL expressions. Unlike full
plugins they do not produce a sequence of rows, but simply produce a
single value (which can be an arbitrary o function formats a timestamp
as a string. This is useful since many plugins produce times in seconds
since epoch time:

``` {.sourceCode .sql}
SELECT FullPath, timestamp(epoch=Sys.Mtim.Sec) as mtimefrom glob(globs="/bin/*")
```

::: {.note}
::: {.admonition-title}
Note
:::

Some VQL functions have side effects, or are more expensive to run. It
is important to understand that VQL transforms the columns emitted from
a plugin BEFORE it applies filtering conditions. This is needed in order
to allow for column transformations to participate in the filter
condition (via the alias).

Due to this order of operations the following query will upload all
files, ignoring the WHERE condition because the upload() function will
be evaluated on each row, even if the WHERE clause causes the row to be
ignored:

``` {.sourceCode .sql}
SELECT FullPath, upload(path=FullPath)
 from glob(globs="/bin/*")
      WHERE Name =~ "bash"
```

To upload only the files matching the expression, the query must be
split into two - the first query applies the filtering condition and the
second query does the upload:

``` {.sourceCode .sql}
LET files = SELECT FullPath from glob(globs="/bin/*")
    WHERE Name =~ "bash"
SELECT FullPath, upload(path=FullPath) from files
```
:::

VQL Subselects
--------------

Unlike SQL, VQL does not have a join operator. SQL is designed to work
with databases, and databases have multiple strategies for optimizing
query execution (like adding table indexes, query planners etc).
Traditionally, SQL authors prefers joins over subselects because in a
real database JOIN operations are more optimized to use the database\'s
indexes and query optimizer. However JOIN operations are arguably harder
to read and it is hard to predict the order at where operations will be
run (e.g. which table will use an index and which will use a row scan).

Since VQL has no indexes nor does it have a query optimizer,
implementing JOIN operations does not make sense. Instead, VQL
implements subselects and multi-statement queries and using these tools
it is possible for VQL authors to precisely control the query execution
plan so it is most efficient.

In this sense VQL authors are left to specify the most efficient course
of query execution themselves instead of relying on a query optimizer.
This is normally done by dividing the query into smaller queries and
combining their results in the best order.

Consider the following query that attempts to search small files for the
keyword \"foobar\":

``` {.sourceCode .sql}
SELECT FullPath from glob(globs="/bin/*") where
   grep(path=FullPath, keywords=["foobar"]) and Size < 1000
```

Velociraptor will execute the following steps:

1.  Run the glob() plugin to produce all the files in the /bin/
    directory
2.  Transform each row to produce the FullPath.
3.  Evaluate the Filter condition on each row. The filter condition
    requires running the grep() plugin on each file looking for the
    keyword and evaluating if the SIze of the file is less than 1000.
4.  If both conditions are TRUE then Velociraptor will emit the row into
    the result table.

It is obvious that this is an inefficient query because each and every
file will be searched for the keyword regardless of its size. However,
there is no point even trying if the file size is not less than 1000
bytes!

The problem here is that there are two conditions which both must be
true - but each condition has a different cost associated with it.
Clearly the grep() condition is more expensive since it requires opening
the file and reading it completely. The Size condition is extremely
cheap since it is just an integer comparison.

However, VQL is not aware of the relative cost of the two conditions -it
does not know that grep() is inherently an expensive operation since to
VQL it just looks like another function. Although VQL does some
shortcutting (for example it will cancel the grep() function if Size \>=
1000) this shortcut cancellation may arrive too late to stop grep() from
doing a significant amount of work. The VQL author must be aware of the
relative costs of the different operations and how the query should be
structured for maximum efficiency.

What we would really like is for VQL to evaluate the cheap condst, and
only for those files smaller than 1000 bytes, evaluate the grep()
condition. This allows us to eliminate most files immediately (since
most files are larger than 1000 bytes) such that we only bother to
grep() very few files.

This can be achieved by splitting the query into two and chaining them
together:

``` {.sourceCode .sql}
LET file = select * from glob(globs="/bin/*") WHERE Size < 1000

SELECT FullPath from file WHERE grep(
   path=FullPath, keywords=["foobar"])
```

The LET keyword allows us to define a \"stored query\". A Stored Query
is a query which is assigned into a variable name - you can think of the
statement as running the entire query and storing the output into a
single variable.

The second query then takes the result of this query and applies further
transformations and filtering on it. By ensuring that the cheap
conditions are evaluated in the stored query, we can ensure that the
number of rows stored in the LET expression is smaller than the total
number of rows produced by the glob() plugin, and therefore the grep()
function will be applied on few rows.

::: {.note}
::: {.admonition-title}
Note
:::

You can think of stored queries as running in multiple steps: First the
LET query is executed, then all its rows are stored in the files
variable, while the second query reads each row and applies its own
filtering on it. In reality though, the LET query is lazy in its
evaluation and will only produce results when required. Velociraptor
does not store the entire result table of the LET query in memory at
once! It is quite safe therefore to run a very large query in the LET
clause without fear of memory overrun.
:::

Escaping parameters
-------------------

VQL queries often need to take user input. For example consider the
query:

``` {.sourceCode .sql}
SELECT FullPath from glob(globs="/bin/*")
```

We might want to allow the user to specify the glob expression and
create the query programmatically. While it is possible to ensure user
input is escaped this is inefficient and tedious.

VQL queries have an \"Environment\". The Environment is essentially the
evaluation scope of the query - in other words it contains all the
values which can be accessed by name. For example when we call a VQL
function like timestamp(), it is placed in the evaluation scope. It is
possible to place anything in the environment (or the evaluation scope)
and in particular, user parameters can also be placed there. In this
case there is no need to escape user input as it is treated as a part of
the environment and not the query. For example placing PATH=\"/bin/\*\"
into the environment, will allow the following query to run
successfully:

``` {.sourceCode .sql}
SELECT FullPath from glob(globs=PATH)
```

You should always try to write VQL queries referring to parameters in
the environment because this makes them reusable - the scope parameters
become inputs to your query and the query becomes a reusable function.
