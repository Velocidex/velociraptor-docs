---
title: "Artifacts"
date: 2021-06-12T05:20:45Z
draft: false
weight: 30
---

Velociraptor allows packaging VQL queries inside mini-programs called
`Artifacts`. An artifact is simply a structured YAML file containing a
query, with a name attached to it. This allows Velociraptor users to
search for the query by name or description and simply run the query
on the endpoint without necessaily needing to understand or type the
query into the UI.

Therefore Artifacts can be thought of as VQL modules.

Usually an artifact is geared towards collecting a single type of
information from the endpoint. For example consider the following
artifact:

```yaml
name: Custom.Artifact.Name
description: |
   This is the human readable description of the artifact.

type: CLIENT

parameters:
   - name: FirstParameter
     default: Default Value of first parameter

sources:
  - name: MySource
    precondition:
      SELECT OS From info() where OS = 'windows' OR OS = 'linux' OR OS = 'darwin'

    query: |
      SELECT * FROM info()
      LIMIT 10
```

The Artifact contains a number of important parameters:

1. Name: The artifact contains a name. By convention the name is
   segmented by dots in a hierarchy. The Name appears in the GUI and
   can be searched on.
2. Description: Artifacts contain a human readable description. The
   description field is also searchable in the GUI and so should
   contain relevant keywords that make the artifact more discoverable.
3. Type: The type of the Artifact. Since Velociraptor uses VQL in many
   different contexts, the type of the artifact hints to the GUI where
   the artifact is meant to run. For example, a CLIENT artifact is
   meant to be run on the endpoint, while a SERVER artifact is meant
   to be run on the server. The artifact type is only relevant for the
   GUI.
4. Parameters: An artifact may declare parameters, in which case they
   may be set by the GUI user to customize the artifact collection.
5. Sources: The artifact may define a number of VQL sources to
   generate result tables. Each source generates a single table. If
   more than one source is given, they must all have unique names.
6. Precondition: A source may define a precondition query. This query
   will be run prior to collecting the source. If it returns no rows
   then the collection will be skipped. Preconditions make it safe to
   collect artifacts from all hosts (e.g. in a hunt), and ensure that
   only artifacts that make sense to collect are actually run.
7. Query: The query that will be used to collect that source. Note
   that since each source **must** produce a single table, the query
   should have exactly one `SELECT` clause and it must be at the end
   of the query potentially following any `LET` queries.

## Parameters

Artifact parameters allow the user to customize the collection in a
controlled way - without needing to edit the VQL. The GUI will present
a form that allows the user to update the parameters prior to each
collection.

Parameters may define a type. This type will be used to hint to the
GUI how to render the form element. The type also determines how the
parameter is sent to the client and ensures the parameter appears as
that type in the query.

Prior to launching the query on the endpoint, Velociraptor will
populate the scope with the parameters. This allows the VQL query to
directly access the parameters.

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
