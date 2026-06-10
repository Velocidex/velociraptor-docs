---
title: shell_session
index: true
noTitle: true
sitemap:
   disable: true
no_edit: true
description: |
  Recreate or retrieve a shell session handle.
---



<div class="vql_item"></div>


## shell_session
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
argv|Argv to run the command with.|list of string (required)
env|Environment variables to launch with.|ordereddict.Dict
cwd|If specified we change to this working directory first.|string
secret|The name of a secret to use.|string
name|The name of the shell session. If the session already exists, we just return a handle to it.|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">EXECVE</span>

### Description

Recreate or retrieve a shell session handle.

