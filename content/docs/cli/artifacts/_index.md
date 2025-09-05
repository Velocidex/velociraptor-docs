---
menutitle: "artifacts"
title: 'The "artifacts" command group'
date: 2025-05-13
last_reviewed: 2025-07-06
draft: false
weight: 20
summary: "Commands for working with artifacts"
---

Artifacts can be managed and used on the command line, using the `artifacts`
CLI command group. There may be circumstances where you don't have access to the
GUI, or don't want to or need to use it, such as when
[performing a local investigation]({{< ref "/docs/deployment/#command-line-investigation-tool" >}})
on a machine.

When using the CLI, you can also make custom artifacts available by pointing the
binary to a folder containing their definitions using the `--definitions` flag.
This will load the custom artifacts and allow the `artifacts` commands to
include them as well.

If you want these commands work with your server's artifact repository (as
defined in your server config), they will need access to the server's datastore,
and therefore need to read the `server.config.yaml` in order to find the
datastore. This means that these commands will need to be run with the
`--config` (or `-c`) flag.

If you do not specify `--config` then you will be working with the built-in
artifact repository only - that is, the default artifacts compiled into the
binary and possibly also custom artifacts if you are using a binary that has an
embedded config (such as an offline collector).

----

### [ artifacts list ]

```text
artifacts list [<flags>] [<regex>]
    Print all artifacts

    -d, --[no-]details ...  Show more details (Use -d -dd for even more)

Args:
  [<regex>]  Regex of names to match.
```

You can use the `artifacts list` command to see the full list of artifacts that
Velociraptor knows about. This is also a helpful command if you don't know, or
have maybe forgotten, the exact name of an artifact when using the
`artifacts collect` command.

This command is very similar to running a query in a notebook using data from
the `artifact_definitions` plugin.

The regex expression argument is case-sensitive. To make it case-insensitive
prefix your expression with the `(?i)` modifier.

##### Examples

```sh
$ velociraptor artifacts list "(?i).+services"
Linux.Sys.Services
Windows.System.CriticalServices
Windows.System.Services
```

By default the command does not show artifact details. The `-d` flag will cause
the artifact content to be displayed. This is very similar to using the
`artifacts show` command, except that it supports regex.


```sh
$ velociraptor artifacts list Windows.System.Services -d
name: Windows.System.Services
description: |
  List Service details.

parameters:
  - name: servicesKeyGlob
    default: HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\
    ...
```

The `-dd` flag will display the normal artifact content _plus_ it's compiled VQL
form.

----

### [ artifacts show ]

```text
artifacts show <name>
    Show an artifact

Args:
  <name>  Name to show.
```

The purpose of the `artifacts show` command is to view the contents of a
_specific_ Velociraptor artifact. This allows you to inspect the definition of
an artifact, including its VQL query and parameters, directly from the command
line.

Wildcards and regex are _not_ supported. The command expects an exact artifact
name.

##### Example

```sh
$ velociraptor artifacts show Windows.System.Services
name: Windows.System.Services
description: |
  List Service details.

parameters:
  - name: servicesKeyGlob
    default: HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\
    ...
```

----

### [ artifacts collect ]

```text
artifacts collect [<flags>] <artifact_name>...
    Collect all artifacts

    --output=""           When specified we create a zip file and store all output in it.
    --timeout=0           Time collection out after this many seconds.
    --progress_timeout=0  If specified we terminate the colleciton if no progress is made in this many seconds.
    --cpu_limit=0         A number between 0 to 100 representing maximum CPU utilization.
    --output_level=5      Compression level for zip output.
    --[no-]require_admin  Ensure the user is an admin
    --password=""         When specified we encrypt zip file with this password.
    --format=json         Output format to use (text,json,csv,jsonl).
    --args=ARGS ...       Artifact args (e.g. --args Foo=Bar).
    --hard_memory_limit=HARD_MEMORY_LIMIT
                          If we reach this memory limit in bytes we exit.

Args:
  <artifact_name>  The artifact name to collect.
```

The `artifacts collect` command allows you to run Velociraptor artifacts from
the command line, each of which can contain one or more packaged VQL queries.
This is often used for artifact testing, automated collections via scripts, or
for "server-less" triage operations, potentially from a disk image.

This is essentially a wrapper around the VQL
[collect() plugin]({{< ref "/vql_reference/other/collect/" >}}),
with the CLI arguments being passed as arguments to this plugin.

```vql
SELECT *
FROM collect(artifacts=Artifacts,
             output=Output,
             level=Level,
             timeout=Timeout,
             progress_timeout=ProgressTimeout,
             cpu_limit=CpuLimit,
             password=Password,
             args=Args,
             format=Format)
```

#### Basic Syntax

The general syntax for the command is `velociraptor artifacts collect ArtifactName`.

You need to specify the exact name of the artifact you want to collect -
wildcards are not supported.

#### Specifying Parameters/Arguments

Many artifacts accept parameters to customize their collection. You can pass
these using the `--args` flag, followed by the parameter name and value in the
format `ParameterName=Value`, for example:

`velociraptor artifacts collect ArtifactName --args Parameter1=Value`.

For artifacts requiring multiple parameters, you can repeat the `--args` flag:

`velociraptor artifacts collect ArtifactName --args param=value --args param2=value2`

Handling shell escaping for arguments can be tricky from the command line,
especially with the Windows command prompt, although using PowerShell might make
it easier. Arguments are always passed as strings.

#### Saving Output

By default, collecting an artifact using `artifacts collect` without specifying
an output means the output from all sources within the artifact will be emitted
together on stdout. It is possible to pipe the stdout to a file (using `>`),
however it is often better to specify an output file using the `--output` flag.
Using `--output` will create a zip file containing the collected data. For
example, outputting to a zip:

`velociraptor artifacts collect MacOS.System.QuarantineEvents --output /tmp/output.zip`

The output zip file is a standardized Velociraptor collection container which
can be imported to a server, or mounted using the `fuse container` command.

#### Collecting Multiple Artifacts

Generally, `artifacts collect` is used to collect one artifact at a time.
Collecting multiple artifacts is possible but not recommended due to the
complexity and potential pitfalls of specifying parameters for multiple
artifacts with potentially conflicting names. The recommended way to collect
multiple artifacts in a single operation is by building an offline collector.

#### Collecting Custom Artifacts

You can use `artifacts collect` to collect custom artifacts. If your custom
artifact definition is in a YAML file that is not in the default artifact
definition paths, then you can use the `--definitions` flag pointing to the
directory containing your custom YAML file. When collecting, you should use the
name declared inside the artifact's YAML definition, not the filename itself.

For example: `velociraptor --definitions=. artifacts collect Custom.MyTestQuery`

#### Using with an Offline Collector binary

If you have a pre-built offline collector binary, it is essentially a
Velociraptor binary with an embedded configuration. You can still use this
binary to collect additional artifacts via the command line using `artifacts
collect`, just as you would with a regular Velociraptor binary. If you provide
command line arguments, the binary will execute the command you requested
instead of running its default embedded configuration.

If your offline collector binary has embedded custom artifacts then these are
also available to the `artifacts collect` command.

---

### [ artifacts reformat ]

```text
artifacts reformat <paths>...
    Reformat a set of artifacts

Args:
  <paths>  Paths to artifact yaml files
```

Reads one of more artifact definitions as YAML files, and reformats the VQL
sections in them using Velociraptor's internal VQL formatter.

This command is mostly intended for automated build environments and CI
pipelines, where consistent formatting across many artifacts is required. The
reformatting ensures that VQL queries are consistently formatted, making them
easier to read, maintain, and debug.

The reformatting will generally validate the artifact's YAML structure and VQL
syntax, however it does not do extensive checks. For more thorough artifact
checking please use the `artifacts verify` command described below.

This command _requires_ a server config.

{{% notice warning %}}

The reformatted VQL is **inserted back into the original YAML file**, replacing
the old VQL while preserving the rest of the structure! Make sure you have
backup copies of your artifacts before applying `reformat` to them, just in case
you're dissatisfied with the resultant formatting.

{{% /notice %}}


##### Example

```sh
velociraptor --config server.config.yaml artifacts reformat *.yaml -v
```

In the output you will see `Reformatted <artifact_name>.yaml: OK` for each
matched artifact.

----

### [ artifacts verify ]

```text
artifacts verify [<flags>] <paths>...
    Verify a set of artifacts

    --[no-]builtin  Allow overriding of built in artifacts

Args:
  <paths>  Paths to artifact yaml files
```

Performs static analysis on artifacts. Its purpose is to flag issues within
artifact definitions, such as invalid arguments. The command will not update or
fix the target artifacts, but will report any issues found in them.

This command is mostly intended for automated build environments, for CI
(Continuous Integration) testing and review pipelines. It allows for the
programmatic checking or "linting" of artifact definitions, including validation
of VQL syntax, on the command line. While the Graphical User Interface (GUI)
editor also performs linting, the `artifacts verify` command provides a way to
do this outside the GUI environment.

With failing artifacts the command sets errorlevel=1, which can be acted on by
automation scripts.

The same static analysis can be done via VQL using the
[verify]({{< ref "/vql_reference/other/verify/" >}}) function.

##### Example

```sh
velociraptor artifacts verify ./**/*.yaml -v
```

