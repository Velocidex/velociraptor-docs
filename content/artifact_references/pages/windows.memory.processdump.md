---
title: Windows.Memory.ProcessDump
hidden: true
tags: [Client Artifact]
---

Dump process memory and upload to the server.

Previously named Windows.Triage.ProcessMemory


<pre><code class="language-yaml">
name: Windows.Memory.ProcessDump
description: |
  Dump process memory and upload to the server.

  Previously named Windows.Triage.ProcessMemory

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
  - name: ProcessRegex
    default: notepad
    type: regex
  - name: PidRegex
    default: .
    type: regex
  - name: VelociraptorCompatible
    type: bool
    description: |
      If specified we upload a Velociraptor Compatible sparse file
      upload instead of a crash dump. This makes it easier to run
      postprocessing using Velociraptor

sources:
  - query: |
        LET processes = SELECT Name as ProcessName, CommandLine, Pid
            FROM pslist()
            WHERE Name =~ ProcessRegex
              AND str(str=Pid) =~ PidRegex

        LET Regions(Pid) = SELECT dict(Offset=Address, Length=Size) AS Sparse
          FROM vad(pid=Pid)
          WHERE Protection =~ &quot;r&quot;

        LET UploadDump(Pid, ProcessName, CommandLine) =
          SELECT * FROM if(condition= VelociraptorCompatible,
          then={
             SELECT ProcessName, CommandLine, Pid,
                    upload(accessor=&quot;sparse&quot;,
                           file=pathspec(
                              Path=serialize(item=Regions(Pid=Pid).Sparse),
                              DelegateAccessor=&quot;process&quot;,
                              DelegatePath=format(format=&quot;/%d&quot;, args=Pid)),
                              name=pathspec(Path=format(format=&quot;%d.dd&quot;, args=Pid))) AS ProcessMemory
             FROM scope()
          }, else={
            SELECT ProcessName, CommandLine, Pid, OSPath,
                   upload(file=OSPath) as CrashDump
            FROM proc_dump(pid=Pid)
          })

        SELECT * FROM foreach(
          row=processes,
          query={
             SELECT * FROM UploadDump(Pid=Pid, ProcessName = ProcessName, CommandLine = CommandLine)
          })

</code></pre>

