---
title: execve
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## execve
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
argv|Argv to run the command with.|list of string (required)
sep|The separator that will be used to split the stdout into rows.|string
length|Size of buffer to capture output per row.|int64
env|Environment variables to launch with.|LazyExpr
cwd|If specified we change to this working directory first.|string

Required Permissions: 
<span class="linkcolour label label-success">EXECVE</span>

### Description

This plugin launches an external command and captures its STDERR,
STDOUT and return code. The command's stdout is split using the `sep`
parameter as required.

This plugin is mostly useful for running arbitrary code on the
client. If you do not want to allow arbitrary code to run, you can
disable this by setting the `prevent_execve` flag in the client's
config file. Be aware than many artifacts require running external
commands to collect their output though.

We do not actually transfer the external program to the system
automatically. If you need to run programs which are not usually
installed (e.g. Sysinternal's autoruns.exe) you will need to use
Velociraptor's external tools feature to deliver and manage the
tools on the client.

https://docs.velociraptor.app/docs/extending_vql/#using-external-tools

NOTE: The plugin receives an array of arguments which are passed
to the `execve()` system call as an array (on Windows they are
properly escaped into a command line). This means that you do not
need to escape or quote any special characters in the command.

We noticed people often do this or variations on it:
```vql
LET PathToCacls = "C:/Program Files"
LET CommandLine <= "cacls.exe " + '"' + PathToCacls + '"'
SELECT * FROM execve(argv=["powershell", "-c", CommandLine])
```

While this appears to work it is incorrect, fragile and
susceptible to a simple shell injection (for example if the
`PathToCacls` contains quotes).

As a rule we prefer to not run commands through the shell at all
since it is not needed and unsafe. The correct approach is always
to split the `argv` into an array of distinct arguments:

```vql
LET PathToCacls = "C:/Program Files"
SELECT * FROM execve(argv=["cacls.exe", PathToCacls])
```

This calls the program directly and is not susceptible to escaping
or quoting issues (since there is no shell involved). Additionally
it does not invoke powershell which means that any execution
artifacts are not trampled by this VQL.


