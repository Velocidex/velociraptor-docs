---
title: Windows.Remediation.ScheduledTasks
hidden: true
tags: [Client Artifact]
---

Remove malicious task from the Windows scheduled task list.

Danger: You need to make sure to test this before running.


<pre><code class="language-yaml">
name: Windows.Remediation.ScheduledTasks
description: |
   Remove malicious task from the Windows scheduled task list.

   Danger: You need to make sure to test this before running.

type: CLIENT

required_permissions:
  - EXECVE

parameters:
 - name: script
   default: |
     Unregister-ScheduledTask -TaskName &quot;%s&quot; -Confirm:$false
 - name: TasksPath
   default: c:/Windows/System32/Tasks/**
 - name: ArgumentRegex
   default: ThisIsAUniqueName
   type: regex
 - name: CommandRegEx
   default: ThisIsAUniqueName
   type: regex
 - name: PowerShellExe
   default: &quot;C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe&quot;
 - name: ReallyDoIt
   type: bool
   default: N

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query: |
      LET task_paths = SELECT Name, OSPath
        FROM glob(globs=TasksPath)
        WHERE NOT IsDir

      LET parse_task = select OSPath, Name, parse_xml(
               accessor=&#x27;data&#x27;,
               file=regex_replace(
                    source=utf16(string=Data),
                    re=&#x27;&lt;[?].+?&gt;&#x27;,
                    replace=&#x27;&#x27;)) AS XML
      FROM read_file(filenames=OSPath)

      LET tasks = SELECT OSPath, Name,
            XML.Task.Actions.Exec.Command as Command,
            XML.Task.Actions.Exec.Arguments as Arguments,
            XML.Task.Actions.ComHandler.ClassId as ComHandler,
            XML.Task.Principals.Principal.UserId as UserId,
            XML as _XML
      FROM foreach(row=task_paths, query=parse_task)
      WHERE (Arguments =~ ArgumentRegex AND Command =~ CommandRegEx)  AND
      log(message=&quot;Removing task &quot; + Name)

      SELECT * FROM foreach(row=tasks,
        query={
          SELECT * FROM if(condition= ReallyDoIt=&#x27;Y&#x27;,
            then={
              SELECT OSPath, Name, Command, Arguments, ComHandler, UserId, _XML
              FROM execve(argv=[PowerShellExe,
                 &quot;-ExecutionPolicy&quot;, &quot;Unrestricted&quot;, &quot;-encodedCommand&quot;,
                    base64encode(string=utf16_encode(
                    string=format(format=script, args=[Name])))
              ])
            }, else={
              SELECT OSPath, Name, Command, Arguments, ComHandler, UserId, _XML
              FROM scope()
            })
        })

</code></pre>

