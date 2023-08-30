---
title: Windows.Memory.Acquisition
hidden: true
tags: [Client Artifact]
---

Acquires a full memory image. We download winpmem and use it to
acquire a full memory image.

NOTE: This artifact usually transfers a lot of data. You should
increase the default timeout to allow it to complete.


<pre><code class="language-yaml">
name: Windows.Memory.Acquisition
description: |
  Acquires a full memory image. We download winpmem and use it to
  acquire a full memory image.

  NOTE: This artifact usually transfers a lot of data. You should
  increase the default timeout to allow it to complete.

tools:
  - name: WinPmem64
    github_project: Velocidex/WinPmem
    github_asset_regex: winpmem_mini_x64.+exe
    serve_locally: true

precondition: SELECT OS From info() where OS = &#x27;windows&#x27; AND Architecture = &quot;amd64&quot;

sources:
  - query: |
      SELECT * FROM foreach(
          row={
            SELECT OSPath, tempfile(extension=&quot;.raw&quot;, remove_last=TRUE) AS Tempfile
            FROM Artifact.Generic.Utils.FetchBinary(ToolName=&quot;WinPmem64&quot;)
          },
          query={
            SELECT Stdout, Stderr,
                   if(condition=Complete,
                      then=upload(file=Tempfile, name=&quot;PhysicalMemory.raw&quot;)) As Upload
            FROM execve(argv=[OSPath, Tempfile], sep=&quot;\r\n&quot;)
        })

</code></pre>

