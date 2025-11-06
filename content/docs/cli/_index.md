---
menutitle: "CLI"
title: "The Velociraptor CLI"
date: 2025-05-14
last_reviewed: 2025-07-14
draft: false
weight: 80
---

Velociraptor offers many features via it's command line interface (CLI).

In addition to functioning as a client or server, the binary also provides
several utility functions that are accessible on the command line, which in many
cases are CLI equivalents of functions that are available in VQL.

You can also do investigation of the local system using the CLI alone, as
described [here]({{< ref "/docs/deployment/#command-line-investigation-tool" >}}),
[here]({{< ref "/docs/cli/artifacts/#-artifacts-collect-" >}}) and
[here]({{< ref "/docs/cli/query/" >}}).

{{% notice info "Be aware of filesystem permissions when working on the command line" %}}

When installed as a service, Velociraptor's datastore directory is owned by the
service account named `velociraptor` and accessible to the `velociraptor` user
group. New users often aren't aware of this fact and run CLI commands on the
server which accidentally create files in the datastore using their own user
account or the `root` account. These files are subsequently inaccessible to the
Velociraptor service which may then fail to start.

Some CLI commands work directly with files in the datastore, which can result in
them being inadvertently owned by your user account. You can avoid creating
permissions problems by switching to the `velociraptor` user. On most Linux
systems this can be done with the command `sudo -u velociraptor bash`.

{{% /notice %}}

## General command syntax

Velociraptor's CLI commands generally consist of a command and optionally a
subcommand, using a subject-verb syntax. For example `config show`.

There are [global flags]({{< ref "/docs/cli/flags/" >}}) that can be used with
any command, and also flags that are specific to each command and
subcommand.

## How to get help for commands

You can use the `-h` flag or the `help` command with all Velociraptor commands
to see available options and usage details.

- `velociraptor <command> -h` or
- `velociraptor help <command>`
will provide help for a command or command group.

For subcommands:

- `velociraptor <command> <subcommand> -h` or
- `velociraptor help <command> <subcommand>`
will provide help for a specific subcommand.

You can print a short listing of help for all commands by using the `-h`
flag:
- `velociraptor -h`

You can print a more verbose listing of help for all commands by using the
`--help-long` flag:
- `velociraptor --help-long`

A huge number of command line flags and environment variables are supported -
too many to show in the standard help listing. To see all of these, set the
environment variable `DEBUG=1` before running the help command:

`DEBUG=1 velociraptor -h`

## How to get VQL help

For those situations where you're working in a bunker without internet access.

#### [ vql list ]

Prints the reference documentation for all VQL plugins, functions and accessors
in Markdown format.

Can be piped through [Glow](https://github.com/charmbracelet/glow) to page it
and pretty-print it.

For example:

```sh
velociraptor vql list | glow -p
```
![](glow.png)

#### [ vql export ]

Prints the reference documentation for all VQL plugins, functions and accessors
in YAML format.

The output can be piped through [yq](https://github.com/mikefarah/yq) to filter,
transform, or pretty-print it.

For example:

```sh
velociraptor vql export | yq -P '.[] | select(.type == "Function") | select(.name == "stat")'
```
![](yq.png)

## Autoexec mode and post args

Velociraptor has the ability to embed config and files in its binary when using
[the `config repack` command]({{< ref "/docs/cli/config/#-config-repack-" >}}).
When the binary is run without any CLI commands it first checks whether it has
an embedded config and if it does then it loads it. A special section in the
config, named `autoexec.argv`, tells the binary what command line (including
flags) to execute. The embedded config can also store custom artifacts.
This is how [offline collectors]({{< ref "/docs/deployment/offline_collections/" >}})
work.

- When the binary is run ***with*** CLI commands it executes them, and ignores
  the `autoexec.argv` spec (if the embedded config contains one).

- When the binary is run ***without*** any CLI commands, and it has an
  `autoexec.argv` spec which it can execute, then it does so.

But what if you want it to load the autoexec section but change it's behavior
with additional CLI flags?

For that special case we have a special CLI pseudo-flag: `--`

This special flag separates the CLI arguments into pre and post args. Post
args will be appended to any that are in the embedded autoexec command line,
while still allowing the autoexec spec to load and execute it's commands (if it
has any).

As a concrete example, suppose we have created an offline collector named
`velociraptor_collector.exe`. If we just run it without any args it does it's
offline collector business and we can't change how it runs. If we run it with
any CLI arguments then it's just a normal binary, since the offline collector
behaviour is skipped due to the presence of a command.

If we run it with the `config show` command we can inspect the embedded config
and see that it contains the following `autoexec.argv` section:

```yaml
autoexec:
  argv:
  - artifacts
  - collect
  - Collector
  - -v
  - --require_admin
```

But what if we want it to slightly modify the autoexec behaviour by adding
`--nobanner` and `--prompt` to the autoexec command line because we decided (for
arbitrary reasons) that we want to hide the Velociraptor banner and also have it
pause for user acknowledgement at the end of the collection?

We can do this by adding `-- --nobanner --prompt` to the command line.

```sh
velociraptor_collector.exe -- --nobanner --prompt
```

Because the command line doesn't include any commands, the embedded config will
still be loaded and the `autoexec.argv` command line will be executed. However
it now appends our new flags to the command line, which is equivalent to having
this in the autoexec section:

```yaml
autoexec:
  argv:
  - artifacts
  - collect
  - Collector
  - -v
  - --require_admin
  - --nobanner
  - --prompt
```

The above would look like this on the command line:

```sh
velociraptor_collector.exe artifacts collect Collector -v --require_admin --nobanner --prompt
```

This modifies the offline collector behaviour slightly but it otherwise
continues according to the embedded spec.

Autoexec mode can be used in a lot of novel ways besides the usual offline
collector use case. So this method of tweaking the command line allows you to
use any of the global or command-specific
[CLI flags]({{< ref "/docs/cli/flags/" >}})

Note that it if a flag is specified in `autoexec.argv` then it can't be negated
or overridden. You can only add flags that have not already been used.


## Learn about the commands available in the CLI

{{% children description=true %}}
