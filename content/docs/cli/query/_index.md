---
menutitle: "query"
title: 'The "query" command'
date: 2025-07-05
draft: false
weight: 70
summary: Run VQL queries on the command line.
---

Run VQL queries on the command line.

The `query` command is useful for developing and testing VQL queries
independently of the client-server infrastructure components. While VQL query
development is typically done in [notebooks]({{< ref "/docs/notebooks/" >}}),
you might sometimes want to test a query directly on a particular system, for
example when troubleshooting a query-related issue that isn't easily
reproducible on other machines.

The `query` command is also also used when
[running API queries on the command line]({{< ref "/docs/server_automation/server_api/#using-the-shell-for-automation" >}}).
When used with the `--api_config` flag, the query is sent to the server and runs
on the server.

---

### [ query ]

```text
query [<flags>] <queries>...
    Run a VQL query

    -f, --[no-]from_files  Args are actually file names which will contain the VQL query
        --timeout=0        Time collection out after this many seconds.
        --org="root"       The Org ID to target with this query
        --cpu_limit=0      A number between 0 to 100 representing maximum CPU utilization.
        --format=json      Output format to use (text,json,csv,jsonl).
        --dump_dir=""      Directory to dump output files.
        --output=""        A file to store the output.
        --env=ENV ...      Environment for the query.
        --scope_file=""    Load scope from here. Creates a new file if file not found
        --[no-]do_not_update_scope_file
                           Do not update the scope file with the new scope

Args:
  <queries>  The VQL Query to run.
```

</br>

#### Usefulness as a tool for local investigations

It's possible to perform ad-hoc local investigations on a small number of
machines using the `query` command (and/or the `artifacts collect` command),
although this is rarely done due to it not being a scalable approach. For more
information see
[Deployment > Command line investigation tool]({{< ref "/docs/deployment/#command-line-investigation-tool" >}}).

For investigating a system locally, if you don't want to use the command line
you can consider running an
[Instant Velociraptor]({{< ref "/docs/deployment/#instant-velociraptor-as-a-local-investigation-tool" >}})
instance which gives you access to the local system via an integrated client,
and the benefit of a local GUI.

#### Differences between the "query" and "artifacts collect" commands

The purpose of both of these commands is to run VQL queries. So it helps to
understand the key differences when deciding which one is better suited to your
goals.

| **The `query` command** |  | **The `artifacts collect` command** |
|---|---|---|
| Runs an ad-hoc VQL query. |  | Runs one or more predefined artifacts. |
| Does not support artifact features (unless calling an artifact<br>in the query). |  | Supports all the features offered by Velociraptor artifacts, such as:<br>- multiple sources<br>- preconditions<br>- export and imports |
| Can run queries locally or against the server (via the API). |  | Queries contained in the specified artifacts are run locally. |
| Can include multiple SELECT statements. |  | Can include multiple SELECT statements via separate `sources` but<br>each source can only have one SELECT statement. |

Artifacts can actually be run via the `query` command too by using the
`Artifacts` plugin. See below for an example which does this.

As with the `artifacts collect` command, if you want to use custom artifacts
then the location of these artifacts can be specified with the `--definitions`
flag.

#### Specifying queries in a file

When specifying queries on the command line these need to be in quotes (single
or double). This can easily lead to quoting issues because most non-trivial
queries will use quotes within the VQL itself.

To avoid such quoting difficulties and to allow for more complex queries you can
store the queries in a text file, and then specify the file with the `-f` flag.

For example:

```vql
velociraptor query -f "D:/query.txt"
```
where `query.txt` contains your query.

Note that this can include multiple queries, as is also allowed on the command
line, but the results will be combined which could be confusing.

#### Event queries

Since the `query` command accepts any query, there is no distinction made
between non-terminating "event queries" and ones that do run and complete. This
means that you can use the command to inspect and test the output from
Velociraptor's
[event plugins]({{< ref "/vql_reference/event/" >}}).

For example:

```vql
velociraptor query "SELECT * FROM watch_usn(device='C:\\')"
```
will allow you to observe/test the output from the `watch_usn()` plugin in real
time.

#### Storing query output and files

The `--output` flag allows you to write the query results to a file. Combine
this with the `--format` flag if you want the output in a format other than
JSONL (which is the default format).

By default the query output is emitted to Stdout. This means that, as an
alternative to using the `--output` flag, you could use the `>` or `>>`
operators to redirect to a file, or you could pipe the output to other CLI tools
(for example `jq` to transform or prettify it).

If your query uses the `upload()` function to collect files then Velociraptor
will need to know where to put the "uploaded" files because there is no server
that it can upload to. We specify a directory for these files using the
`--dump_dir` flag. The parent directory structure of the collected files is
reproduced relative to the dump directory.

For example:

```sh
velociraptor -v query "SELECT * FROM Artifact.Generic.Utils.DeadDiskRemapping(ImagePath='/path/to/image.dd', Hostname='Some Host')" --dump_dir .
```
will generate an "upload" file named `remapping.yaml` and dump it to the current working directory (`.`).
