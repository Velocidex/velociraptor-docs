---
title: "VQL Fundamentals"
date: 2021-06-11T05:55:46Z
draft: false
weight: 30
---

We have previously seen that VQL is a central feature in
Velociraptor. In fact Velociraptor can be thought of as essentially a
VQL evaluation engine, so VQL is central to understanding and
extending Velociraptor.


## Why a query language?

The need for a query language arose from our experience of previous
DFIR frameworks. In practice, endpoint analysis tools must be very
flexible in order to adapt to new indicators or protect against new
threats. While it is always possible to develop new capability in
code, deploying a new very of the agent is not always easy and can not
be done quickly.

A query language helps to accelerate the time from learning about a
new IOC or thinking of a novel detection idea to wide detection across
a large number of hosts. Typically a DFIR investigator can go from
learning of a new type of indicator, writing relevant VQL queries,
packaging in an artifact and hunting for the artifact across the
entire deployment in a matter of minutes!

Additionally, the VQL artifacts may be shared with the community and
facilitate a medium of exchange of DFIR specific knowledge of
indicators and detection techniques.

## Running VQL queries - Notebooks

When learning VQL it is best to practice in an environment that makes
it easy to debug and iterate through the VQL, while interactively
testing each query.

You can read more about notebooks [here](notebooks). For the rest of
this chapter we will assume you created a notebook and are typing VQL
into the cell.

## Basic Syntax

VQL's syntax is heavily inspired by SQL with the same basic `SELECT
.. FROM .. WHERE` sentence structure. However, VQL is much simpler
than SQL, ignoring more complex SQL syntax such as `JOIN`, `HAVING`
etc. Instead similar functionality is provided in VQL by way of
plugins, and not built in syntax. This keeps the syntax simple and
concise.

Let's consider the basic syntax of a VQL query.

![Basic syntax](vql_structure.png)

The query starts with a SELECT keyword, followed by a list of `Column
Selectors` then the `FROM` keyword and a `VQL Plugin` potentially
taking arguments. Finally we have a `WHERE` keyword followed by a
filter expression.

### Plugins

While VQL syntax is similar to SQL, SQL was designed to work on static
tables in a database. In VQL, the data sources are not actually static
tables on disk - they are provided by code that runs to generate
rows. `VQL Plugins` are producers of rows and are positioned after the
`FROM` clause.

Like all code, VQL plugins may use parameters to customize and control
their operations. VQL Syntax requires all arguments to be provided by
name (these are called keyword arguments). Depending on the specific
plugins, some arguments are required while some are optional.

{{% notice tip %}}

While you can always consult the reference on VQL plugins, the best
source of help is to type `?` in the notebook interace to view the
list of possible completions. Completions are context sensitive so
after the `FROM` keyword, all suggestions are for VQL plugins (since
plugins must follow the `FROM` keyword). Similarly typing `?` inside
the plugin arguments list shows the possible arguments expected, their
type and if they are required or optional.

![VQL Plugin Completions](completion.png)

![VQL Plugin Completions](completion2.png)

{{% /notice %}}

### Life of a query

In order to understand how VQL works, let's follow a single row through the query.

![Life of a query](life_of_a_query.png)

1. Velociraptor's VQL engine starts off by calling the plugin passing
   any relevant arguments into it. The plugin will generate one or
   more rows and send a row at a time into the query for further
   processing.

2. The column expression in the query will now receive the
   row. However, instead of evaluating the column expression
   immediately, VQL wraps the column expression in a `Lazy
   Evaluator`. Lazy evaluators allow the actual evaluation of the
   column expression to be delayed until a later time.

3. Next VQL takes the lazy expressions and uses them to evaluate the
   filter condition - which will determine if the row is to be
   eliminated or passed on.

4. In this example, the filter condition (`X=1`) must evaluate the
   value of X and therefore will trigger the Lazy Evaluator.

5. Assuming X is indeed 1, the filter will return TRUE and the row
   will be emitted from the query.

### Lazy Evaluation

In the above description we can see that a lot of effort was put into
the VQL engine in order to postpone evaluation as late as
possible. This is a recurring theme in VQL which always tries to
postpone evaluation. Why is this done?

The main reason for delaying evaluation as much as possible is to
avoid performing unnecessary work. There is no point in evaluating a
column value if the entire row will be filtered out!

Understanding lazy evaluation is critical to writing efficient VQL
queries. Let's examine how this work using a series of
experiments. For these experiments we will use the `log()` VQL
function, which simply produces a log message when evaluated.

```sql
-- Case 1: One row and one log message
SELECT OS, log(message="I Ran!") AS Log
FROM info()

-- Case 2: No rows and no log messages
SELECT OS, log(message="I Ran!") AS Log
FROM info()
WHERE OS = "Unknown"

-- Case 3: Log message but no rows
SELECT OS, log(message="I Ran!") AS Log
FROM info()
WHERE Log AND OS = "Unknown"

-- Case 4: No rows and no log messages
SELECT OS, log(message="I Ran!") AS Log
FROM info()
WHERE OS = "Unknown" AND Log
```

Let's consider case 1 above, the row will be emitted by the query and
therefore the log function will be evaluated producing a log message.

Case 2 adds a condition which should eliminate the row. **Because the
row is eliminated VQL is able to skip evaluation of the log()
function!** No log message will be produced.

Cases 3 and 4 illustrate VQL's evaluation order of `AND` terms - from
left to right with an early exit.

We can use this property to control when expensive functions are
evaluated e.g. `hash()` or `upload()`.

### What is a Scope?

Scope is a concept common in many languages, and it is also central in
VQL.  A scope is a bag of names that is used to resolve symbols,
functions and plugins in the query.

For example, consider the query

```sql
SELECT OS FROM info()
```

VQL sees “info” as a plugin and looks in the scope to get the real
implementation of the plugin.

Scopes can nest - this means that in different parts of the query a
new child scope is used to evaluate the query. The child scope is
constructed by layering a new set of names over the top of the
previous set. When VQL tries to resolve a name, it looks up the scope
in reverse order going from layer to layer until the symbol is
resolved.

Take the following query for example,

![Scope lookup](scope.png)

VQL evaluates the `info()` plugin which emits a single row. Then VQL
creates a child scope, with the row at the bottom level. Whe VQL tries
to resolve the symbol OS from the column expression, it walks the
scope stack in reverse, checking if the symbol `OS` exists in the
lower layer. If not the next layer is checked and so on.

{{% notice warning %}}

Columns produced by a plugin are added to the child scope and
therefore **mask** the same symbol name from parent scopes. This can
sometimes unintentionally hide variables of the same name which are
defined at a parent scope. If you find this happens to your query you
can rename easlier symbol using the `AS` keyword to avoid this
problem.  For example:

```sql
SELECT Pid, Name, {
   SELECT Name FROM pslist(pid=Ppid)
} AS ParentName
FROM pslist()
```

In this query the symbol `Name` in the outer query will be resolved
from the rows emitted by `pslist()` but the second `Name` will be
resolved from the row emitted by `pslist(pid=Ppid)` - or in other
words, the parent's name.

{{% /notice %}}

### String constants

Strings denoted by `"` or `'` can escape special characters using the
`\\`. For example, `"\\n"` means a new line. This is useful but it
also means that backslashes need to be escaped. This is sometimes
inconvenient, especially when dealing with Windows paths (that
contains alot of backslashes).

Therefore, Velociraptor also offers a Multiline raw string which is
denoted by `'''` (three single quotes). Within this type of string no
escaping is possible, and the all characters are treated literally -
including new lines. You can use `'''` to denote multi line strings.

### Subqueries

VQL Subqueries can be specified as a column expression or as an
arguments. Subqueries are delimited by `{` and `}`. Subqueries are
also Lazily evaluated, and will only be evaluated when necessary.

### Arrays

An array may be defined either by `(` and `)` or `[` and `]`. Since it
can be confusing to tell regular parenthesis from an array with a
single element, VQL also allows a trailing comma to indicate a single
element array. For example `(1, )` means an array with one member,
whereas `(1)` means a single value of 1.

### The scope() plugin

VQL is strict about the syntax of a VQL statement. Each statement must
have a plugin specified, however sometimes we dont really want to
select from any plugin at all.

The default noop plugin is called `scope()` and simply returns the
current scope as a single row. If you even need to write a query but
do not want to actually run a plugin, use `scope()` as a noop
plugin. For example

```sql
-- Returns one row with Value=4
SELECT 2 + 2 AS Value
FROM scope()
```

## The Foreach plugin

VQL is modeled on basic SQL since SQL is a familiar language for new
users to pick up. However, SQL quickly becomes more complex with very
subtle syntax that only experienced SQL users use regularly. One of
the more complex aspects of SQL is the `JOIN` operator which typically
comes in multiple flavors with subtle differences (INNER JOIN, OUTER
JOIN, CROSS JOIN etc).

While these make sense for SQL since they affect the way indexes are
used in the query, VQL does not have table indexes, nor does it have
any tables. Therefore the `JOIN` operator is meaningless for
Velociraptor. To keep VQL simple and accessible, we specifically did
not implement a `JOIN` operator.

Instead of a `JOIN` operator, VQL has the `foreach()` plugin, which is
probably the most commonly used plugin in VQL queries. The `foreach()`
plugin takes two arguments:

1. The `row` parameter is a subquery that provides rows

2. The `query` parameter is a subquery that will be evaluated on a
   subscope containing each row that is emitted by the `row` argument.

Consider the following query.

```sql
SELECT * FROM foreach(
    row={
        SELECT Exe FROM pslist(pid=getpid())
    },
    query={
        SELECT ModTime, Size, FullPath FROM stat(filename=Exe)
    })
```

Note how `Exe` is resolved from the produced row since the query is
evaluated within the nested scope.

Foreach is useful when we want to run a query on the output of another
query.

### Foreach on steroids!

Normally foreach iterates over each row one at a time.  The
`foreach()` plugin also takes the workers parameter. If this is larger
than 1, `foreach()` will use multiple threads and evaluate the `query`
query in each worker thread.

This allows to parallelize the query!

For example consider the following query, which retrieves all the
files in the System32 directory and calculates their hash.

```sql
SELECT FullPath, hash(path=FullPath)
FROM glob(globs="C:/Windows/system32/*")
WHERE NOT IsDir
```

As each row is emitted from the `glob()` plugin with a filename of a
file, the `hash()` function is evaluated on it and the hash is
calculated.

However this is linear, since each hash is calculated before the next
hash is started - hence only one hash is calculated at once.

This example is very suitable for parallelization because globling for
all files is quite fast, but the slow part is hashing the
files. Therefore, if we delegate the hashing to multiple threads, we
can make more effective use of the CPU.

```sql
SELECT * FROM foreach(
row={
   SELECT FullPath
   FROM glob(globs="C:/Windows/system32/*")
   WHERE NOT IsDir
}, query={
   SELECT FullPath, hash(path=FullPath)
   FROM scope()
}, worker=10)

```

## LET expressions

We have previously seen how subqueries may be used in various parts of
the query, such as in a column specifier or as an argument to a
plugin. While subqueries are convenient, they can become unweildy when
nested too deeply. VQL offers an alternative to subqueries called
`Stored Queries`.

A stored query is a lazy evaluator of a query which we can store in
the scope.  Whereever the stored query is used it will be evaluated on
demand. Consider the example below, where for each process, we
evaluate the `stat()` plugin on the executable to check the
modification time of the executable file.

```sql
LET myprocess = SELECT Exe FROM pslist()

LET mystat = SELECT ModTime, Size, FullPath
        FROM stat(filename=Exe)

SELECT * FROM foreach(row=myprocess, query=mystat)
```

{{% notice note %}}

A Stored Query is simply a query that is stored into a variable. It is
not actually evaluated at the point of definition. At the point where
the query is referred, that is where evaluation occurs. The scope at
which the query is evaluated is derived from the point of reference!

For example in the query above, `mystat` simply stores the query
itself. Velociraptor will then re-evaluate the `mystat` query for each
row given by `myprocess` as part of the `foreach()` plugin operation.

{{% /notice %}}

### LET expressions are lazy

We have previously seen VQL goes out of its way to do as little work
as possible.

Consider the following query

```sql
LET myhashes = SELECT FullPath, hash(path=FullPath)
FROM glob(globs="C:/Windows/system32/*")

SELECT * FROM myhashes
LIMIT 5
```

The `myhashes` stored query hashes all files in System32 (many
thousands of files). However, this query is used in a second query
with a `LIMIT` clause.

When the query emits 5 rows in total, the entire query is cancelled
(since we do not need any more data) which in turn aborts the
`myhashes` query. Therefore, VQL is able to exit early from any query
without having to wait for the query to complete.

This is possible because VQL queries are **asynchronous** - we do
**not** calcaulte the entire result set of `myhashes` **before** using
`myhashes` in another query, we simply pass the query itself and
forward each row as needed.

### Materialized LET expressions

We saw before that a stored query does not in itself evaluate the
query. Instead whenever the query is referenced, the query will be
evaluated afresh.

Sometimes this is not what we want to do. For example consider a query
which takes a few seconds to run, but its output is not expected to
change quickly. In that case, we actually want to cache the results of
the query in memory and simply access it as an array.

Expanding a query into an array in memory is termed `Materializing`
the query.

For example, consider the following query that lists all sockets on
the machine, and attempts to resolve the process id to a process name
using the `pslist()` plugin.

```sql
LET process_lookup = SELECT Pid AS ProcessPid, Name FROM pslist()

SELECT Laddr, Status, Pid, {
   SELECT Name FROM process_lookup
   WHERE Pid = ProcessPid
} AS ProcessName
FROM netstat()
```

This query will be very slow because the `process_lookup` stored query
will be re-evaluated for each row returned from netstat (i.e. for each
socket).

However we do not expect the process listing to change that quickly!
It would make more sense to have the process listing cached in memory
for the entire length of the query. It is not expected to change over
the few seconds the query will run.

Therefore we wish to `Materialize` the query

```sql
LET process_lookup <= SELECT Pid AS ProcessPid, Name FROM pslist()

SELECT Laddr, Status, Pid, {
   SELECT Name FROM process_lookup
   WHERE Pid = ProcessPid
} AS ProcessName
FROM netstat()
```

The only difference between this query and the previous one is that
the `LET` clause uses `<=` instead of `=`. The `<=` is the materialize
operator - it tells VQL to expand the query in place into an array
which is then assigned to the variable `process_lookup`.

Subsequent accesses to `process_lookup` simply access an in-memory
array of pid and name for all processes and **do not** need to run
`pslist()` again.

## Local functions

We have seen how `LET` expressions may store queries into a variable,
and have the queries evaluated in a subscope at the point of use.

A `LET` expression can also declare explicit passing of
variables.

Consider the following example which is identical to the example
above:

```sql
LET myprocess = SELECT Exe FROM pslist()

LET mystat(Exe) = SELECT ModTime, Size, FullPath
        FROM stat(filename=Exe)

SELECT * FROM foreach(row=myprocess, query={
  SELECT * FROM mystat(Exe=Exe)
})
```

This time `mystat` is declares as a `VQL Local Plugin` that
takes arguments. Therefore we now pass it an parameter explicitly and
it behaves as a plugin.

Similarly we can define a `VQL Local Function`.

```sql
LET MyFunc(X) = X + 5

-- Return 11
SELECT MyFunc(X=6) FROM scope()
```

{{% notice tip %}}

Remember the difference between a VQL plugin and a VQL function is
that a plugin returns multiple rows and therefore needs to appear
between the FROM and WHERE clauses. A function simply takes several
values and transforms them into a single value.

{{% /notice %}}

Scope lifetime and tempfile()
The tempfile() function creates a temporary file and automatically removes it when the scope is destroyed.
Correct usage:
84

Scope lifetime and tempfile()
Incorrect usage:
85

VQL control structures
86

Looping over rows
VQL does not have a JOIN operator - we use the foreach plugin

SELECT * FROM foreach(
    row={ <sub query goes here> },
    query={ <sub query goes here >})

The query subquery will be run on each row emitted by the row subquery.
87

Looping over arrays
Sometimes arrays are present in column data. We can iterate over these using the foreach plugin

SELECT * FROM foreach(
    row=<An iterable type>,
    query={ <sub query goes here >})

if row is an array the value will be assigned to "_value" as a special placeholder.

88

Conditional: if plugin and function
The if() plugin and function allows branching in VQL.

SELECT * FROM if(
    condition=<sub query or value>,
    then={ <sub query goes here >},
    else={ <sub query goes here >})

If the condition is a query it is true if it returns any rows. Then we evaluate the then subquery or the else subquery.

89
As usual VQL is lazy - this means that branches that are not taken are essentially free!

Conditional: switch plugin
The switch() plugin and function allows multiple branching in VQL.

SELECT * FROM switch(
    a={ <sub query >},
    b={ <sub query >},
    c={ <sub query >})

Evaluate all subqueries in order and when any of them returns rows stop.

90
As usual VQL is lazy - this means that branches that are not taken are essentially free!

Conditional: chain plugin
The chain() plugin allows multiple queries to be combined.

SELECT * FROM chain(
    a={ <sub query >},
    b={ <sub query >},
    c={ <sub query >})

Evaluate all subqueries in order and append all the rows together.

91

Aggregate functions
92
An aggregate VQL function is a function that keeps state between evaluations.
State is kept in an Aggregate Context
Aggregate functions are used to calculate values that consider multiple rows.

Some aggregate functions
count(), sum(), enumerate(), rate()

Example: Count
93
The count() function keeps track of the last number in its aggregate context.

We can get the row count in that column.

94
GROUP BY clause
The GROUP BY clause causes VQL to create groups of same value rows.
Each group shares the same aggregate context - but this is different from other groups.
Groups keep only the last row in that group.

Aggregate functions Groups
SELECT X, count() AS Count
FROM …
GROUP BY X
95
X
Y
1
2
2
5
1
7
Bins
X=1 (Y=2, Y=7)
X=2 (Y=5)

Example: Count all rows
The count all rows of a particular value:

SELECT count() AS Count FROM ….
WHERE ….
GROUP BY 1

This works because it creates a single aggregate context (since 1 is always the same value for all rows) and puts all the rows in it.
96

Stacking
Count the number of rows of the same value
97

98

Event queries and asynchronous VQL
99

VQL: Event Queries
Normally a VQL query returns a result set and then terminates.
However some VQL plugins can run indefinitely or for a long time.
These are called Event VQL plugins since they can be used to generate events.
An Event query does not complete on its own - it simply returns partial results until cancelled.


VQL plugin
Query
Rows
Partial Result Sets
Wait time
Max rows
VQL: Event Queries
101

Playing with event queries
Selecting from clock()

Click the stop button to cancel the query.
102

Client monitoring architecture
103
The client maintains a set of VQL Event Queries
All run in parallel.
When any of these produce rows, the client streams them to the server which writes them to the filestore.
If the client is offline, these will be queued in the client’s local file buffer.

Client
Event Queries
Server
Monitoring Flow
Server Filestore
Client monitoring architecture
104
Server Updates client’s event queries when the GUI is updated
Local client buffer
Events are streamed when the client is online

Example event query
105
Watch the System event log and then clear it. Wait for couple minutes.

Conclusions
106
VQL is the engine behind Velociraptor!
This module covered the language in great details
We learned about the difference between VQL plugins and functions.
We understood how the scope is used between the different VQL query clauses
We learned about stored queries as a way of pre-compiling a query to be accessed on demand later.

Conclusions
107
We saw how VQL is lazy and will perform the least amount of work necessary to evaluate the query
We can use this property to control query cost and side effects.
We learned about some of the most useful VQL plugins (foreach(), switch(), if())

We learned about event queries and how to use asynchronous VQL queries.
