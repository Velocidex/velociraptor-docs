---
title: execve
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## execve
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
argv|Argv to run the command with.|list of string (required)
sep|The separator that will be used to split the stdout into rows.|string
length|Size of buffer to capture output per row.|int64
env|Environment variables to launch with.|LazyExpr
cwd|If specified we change to this working directory first.|string

Required Permissions: 
<i class="linkcolour label pull-right label-success">EXECVE</i>

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


