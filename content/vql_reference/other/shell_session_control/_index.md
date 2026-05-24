---
title: shell_session_control
index: true
noTitle: true
sitemap:
   disable: true
no_edit: true
description: |
  Control a previously created shell session.
---



<div class="vql_item"></div>


## shell_session_control
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|The name of the shell session.|string
stdin|Write this string to the session stdin.|string
close_stdin|If specified we close the stdin of the session. This will usually terminate the session gracefully.|bool
kill|If specified we kill the session.|bool

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">EXECVE</span>

### Description

Control a previously created shell session.

