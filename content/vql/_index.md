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




Running VQL queries
Velociraptor is a query engine. There are a number of ways we can evaluate queries
Command line (velociraptor query)
Command line via an artifact (velociraptor artifacts collect)
Client/Server across the network (schedule artifact collection in GUI)
Inside the notebook
5
SELECT * FROM info()

Command line VQL
The VQL query is provided directly on the command line - need to escape quotes!

6
Use the -v flag to log messages to console

Command line Artifact
7
Use an editor to write a local artifact file

Client/Server artifact collection
8
Use the GUI to add a custom artifact. You can then collect the artifact at any time

Client/Server artifact collection
9

The notebook - an interactive document
10
Notebook consist of cells. Click the cell to see its controls.

11
VQL cells evaluate the VQL into a table and write any error messages or logs under the table.

Completes plugin names
12

Suggests plugin args
Type ? to show all relevant completions. It also shows documentation for each option.
13

14
Create a local server
It is possible to use the notebook to learn and experiment with artifacts.

Create a local server on your windows system.

We will use this server's notebook feature to learn about windows artifacts

Run Velociraptor on your machine
Download Velociraptor from GitHub (.msi or .exe)

"C:\program files\Velociraptor\Velociraptor.exe" gui
15

16

17
The "gui" command creates an instant temporary server/client with self signed SSL and a hard coded admin/password.

18

19

20
Add VQL Cell
Write Query and click Save button. GUI will autosuggest to help with the query.
VQL queries are just tables with rows and columns.

What is VQL?
21
SELECT X, Y, Z FROM plugin(arg=1) WHERE X = 1
Column Selectors
VQL Plugin with Args
Filter Condition

Plugins
Plugins are generators of rows
Plugins accept keyword arguments
Arguments are strongly typed.
Some arguments are required, some are optional - check the reference to see what is available (VQL will complain!).
Arguments can be other queries (or stored queries)
A row is a map of keys (string) and values (objects)
Values can have many types
Strings, bytes, int64, float64, dicts, arrays
22

Life of a query
23
SELECT X FROM plugin(arg=1) WHERE X = 1
Row
Evaluate the plugin to produce a row
Row
Wrap the row with a lazy evaluator for each column. Place the column in the filter scope.
X
Row
X
= 1
Evaluate the filter clause. If it is true the row will be emitted to the result set.
{“x”: 1}
Emit row to result set (JSON)
Plugin
Column Expression
Filter
Result Set

Lazy Evaluators
Since many VQL functions can be expensive or have side effects it is critical to understand when they will be evaluated (i.e. when they will run).

A good function is the log() function which outputs a log when it gets evaluated.
24

Exercise
25
Evaluating the log() function returns true and logs the message in the query log.


Log function is not evaluated for filtered rows
When the Log variable is mentioned in the filter condition, it will be evaluated only if necessary!
We can use this property to control when expensive functions are evaluated
e.g. hash(), upload()
26

What is a Scope?
A scope is a bag of names that is used to resolve variables, functions and plugins in the query.





VQL sees “info” as a plugin and looks in the scope to get the real implementation
27
SELECT OS FROM info()
Scope

info: InfoPlugin()
….

Nested Scopes
Scopes can nest - this allows sub-scopes to mask names of parent scopes.

VQL will walk the scope stack in reverse to resolve a name.
28
SELECT OS FROM info()
Parent Scope
Sub Scope + Row
OS

Scope exercise
When a symbol is not found, Velociraptor will emit a warning and dump the current scope’s nesting level.

Depending on where in the query the lookup failed, you will get different scopes!

The top level scope can be populated via the “environment” (--env flag) or artifact parameters
29

Scope exercise
Query can refer to query environment variables. On the commandline these are injected via the --env flag.
30

31

VQL Syntax
Strings denoted by " or ' (escape special characters)
Multiline raw string is denoted by '''  (three single quotes)

Subquery delimited by {}

Arrays delimited by () or []
You can use (XXX, ) to keep an array distinct from (XXX)
32

The foreach plugin
VQL does not have a JOIN operator, instead we have the foreach() plugin.

This plugin runs one query (given by the rows arg), then for each row emitted, it builds a new scope in which to evaluate another query (given by the query arg).
33

34

35
SELECT * FROM foreach(
    row={
        SELECT Exe FROM pslist(pid=getpid())
    },
    query={
        SELECT ModTime, Size, FullPath FROM stat(filename=Exe)
    })


Note how “Exe” is resolved from the produced row since the query is evaluated within the nested scope.

36
Foreach on steroids!
Normally foreach iterates over each row one at a time.
The foreach() plugin also takes the workers parameter. If this is larger than 1, foreach() will use multiple threads.

This allows to parallelize the query!

Exercise: Hash all files
SELECT FullPath, hash(path=FullPath)
FROM glob(globs="C:/Windows/system32/*")
WHERE NOT IsDir

37

Faster hashing!
38


Convert the previous query to a multi-threaded query using foreach.

Solution
39

40
LET expressions
A stored query is a lazy evaluator of a query which we can store in the scope.
Where-ever the stored query is used it will be evaluated on demand.

LET expressions are more readable
LET myprocess = SELECT Exe FROM pslist(pid=getpid())

LET mystat = SELECT ModTime, Size, FullPath
        FROM stat(filename=Exe)

SELECT * FROM foreach(row=myprocess, query=mystat)

Note these are 3 different queries sharing the same scope!
41

LET expressions are lazy
Calling pslist() by itself will return all processes.
The foreach query will quit after 5 rows due to the limit clause
This cancels the query as soon as we have enough rows!
Early exit for expensive plugins
42

Materialized LET expressions
Sometimes we do not want a lazy expression! VQL calls a query that is expanded in memory materialized

Slow approach:

43

Materialized LET expressions
Materialize the query with <= operator

Faster approach:

All the rows are
expanded into
memory

44

Materialized LET expressions
Memoize means to remember the results of a query in advance

Fastest:

45

Local functions
LET expressions can declare parameters.

This is useful for refactoring functions into their own queries.

The callsite still uses named args to populate the scope.
46

Protocols - VQL operators
VQL syntax is inspired by Python :-)
Objects within VQL are strongly typed but dynamic
Operators interact with objects via “Protocols”
This means that different objects may do different things for different operators - usually they make sense
If a protocol is not found, VQL substitutes a NULL - VQL does not abort the query!
47

Protocol exercise
Enable --trace_vql together with the -v flag to see a full analysis of the VQL query.
48

Plugin reference
VQL is a glue language
It is quite capable but it is not designed to be able to implement arbitrary algorithms
It relies on VQL plugins and functions to do the heavy lifting while VQL combines high level logic
There is a plugin reference on the web site
Distinction between plugin and funcion
Search for plugins
Note required args and their types
49

50

51
Reference in machine readable YAML is in the GitHub tree.

52
Writing VQL for fun and profit!

53
Learn by example: wmi shell
A common attacker technique is to run remote command shell.

Try it yourself:
wmic process call create cmd.exe

Let's write an artifact that detects cmd.exe launched from WMI
wmic process call create cmd.exe

Start small - list processes
54

See the raw output
55
The Raw JSON shows us what data is available for further VQL processing.

Refine - Filter by name
56
The regular expression match operator is =~
SELECT * FROM pslist()
WHERE Name =~ 'cmd.exe'
LIMIT 5



Subquery - find parent process
57

SELECT *, {
   SELECT * FROM pslist(pid=Ppid)
} As Parent
FROM pslist()
WHERE Name =~ 'cmd.exe'
LIMIT 5



Processes spawned by WMI
58

SELECT Name, Pid, Username, CommandLine, {
   SELECT Name, Pid FROM pslist(pid=Ppid)
} As Parent
FROM pslist()
WHERE Name =~ 'cmd.exe' AND Parent.Name =~ "Wmi"
LIMIT 5



Exercise: Enrich netstat
Show extra information on all listening processes, including:
Binary path on disk
User that launched the process
Linked DLLs
Manufacturer if available
Compile time

59

Step 1: Identify listening processes
60

Step 2: Lookup the process from Pid
61

Step 3: Lookup binary information
LET listening = SELECT Pid,
       format(format='%v:%v',
              args=[Laddr.IP, Laddr.Port]) AS Laddr
  FROM netstat() WHERE Status = 'LISTEN'

SELECT Username, Exe, Pid, CreateTime,
       peinfo.VersionInformation AS VersionInformation,
       peinfo.TimeDateStamp AS CompileTime, Laddr
FROM foreach(row=listening, query={
    SELECT Username, Exe, Pid, CreateTime,
           parse_pe(file=Exe) AS peinfo,
           Laddr
    FROM pslist(pid=Pid)
})
62

63

64
Artifacts: VQL modules

Artifacts are VQL modules
VQL is very powerful but it is hard to remember and type a query each time.

An Artifact is a way to document and reuse VQL queries
Artifacts are geared towards collection of a single type of information

Artifacts accept parameters with default values.
65

66

67
Main parts of an artifact
Name: We can select artifacts by their name
Description: Human readable context around the purpose
Parameters: A set of parameters with default values which users can override (Note - All parameters are passed as strings)
Sources: Each source represents a single result table. Artifacts may have many sources in which case sources are named.
Query: Velociraptor runs the entire query using the same scope. The last query MUST be a SELECT and the others MUST be LET.

68

69
Parameters
Artifact parameters are sent to the client as strings
The client automatically parses them into a VQL type depending on the parameter's type specification.
The GUI uses type specification to render an appropriate UI


Parameter types
Currently these are supported:
int, integer: The parameter is an integer
timestamp: The parameter is a timestamp
csv: Parameter appears as a list of dicts formatted as a CSV
json: Parameter is a JSON encoded dict
json_array: The parameter is a list of dicts encoded as a JSON blob (similar to csv)
bool: The parameter is a boolean (TRUE/YES/Y/OK)

70

71
Exercise: Create an artifact
Convert our previous VQL to an artifact. Developing artifacts is easy to do:
Go to the View Artifacts screen
Select Add new artifact
Modify the template, paste your VQL in it.
When you save the artifact the artifact will be ready for collection.



72
Make a WMI Subprocess artifact
We generally want to make artifacts reusable:

Artifacts take parameters that users can customized when collecting
The parameters should have obvious defaults
Artifacts have precondition queries that determine if the artifact will run on the endpoint.
Description field is searchable so make it discoverable...

73
name: Custom.Windows.Detection.WmiSubprocess
description: |
   Detect processes spawned from WMI

# Can be CLIENT, CLIENT_EVENT, SERVER, SERVER_EVENT
type: CLIENT

parameters:
   - name: ProcessName
     default: cmd.exe

sources:
  - precondition:
      SELECT OS From info() where OS = 'windows' OR OS = 'linux' OR OS = 'darwin'

    query: |
        SELECT Name, Pid, Username, CommandLine, {
         SELECT Name, Pid FROM pslist(pid=Ppid)
        } As Parent
        FROM pslist()
        WHERE Name =~ ProcessName AND Parent.Name =~ "Wmi"



74
Your artifact is ready to collect
Let's create a hunt to find all currently running command shells from wmi across our entire deployment.

Find out in seconds...
75

Artifact writing tips
Use the notebook to write VQL on the target platform.
Start small - one query at a time
Inspect the result, figure out what information is available - refine
Use LET stored queries generously.
You can essentially comment out queries by using LET - eg.
    LET X = SELECT * FROM pslist()
    LET Y = SELECT * FROM netstat()
    SELECT * FROM X
76
Will not run since Y is lazy

Artifact writing tips
Use the log() VQL function to provide print debugging.
Use format(format="%T %v", args=[X, X]) to learn about a value's type and value
77

Calling artifacts from VQL
You can call other artifacts from your own VQL using the
“Artifact.<artifact name>” plugin notation.
Args to the Artifact() plugin are passed as artifact parameters.

78
When calling artifacts types are not converted. Make sure you pass the expected types

VQL and times
Inside the VQL query, variables have strong types. Usually a type is a dict but sometimes it is a something else (Use format="%T")
Timestamps are given as time.Time types. They have some common methods. VQL can call any method that does not take args:
Unix, UnixNano - number of seconds since the epoch
Day, Minute, Month etc - convert time to days minutes etc.
Timestamps compare to strings...

When times are serialized to JSON they get ISO format strings in UTC.
79

VQL and times
To convert to a time type use the timestamp() VQL function
Takes an epoch or string arg - can be a string or int - tries to do the right thing.

Use the now() function to get the current epoch offset


80

Exercise: Identify recent accounts
Write an artifact to identify local accounts logged in since February

81
Use the timestamp() function to parse times from seconds, strings, winfiletime etc.

Format time


Format time like 4 February 2021 10:23:00


82

83

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
