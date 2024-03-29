---
title: System.VFS.Export
hidden: true
tags: [Server Artifact]
---

Exports parts of the VFS in a server side collection.


<pre><code class="language-yaml">
name: System.VFS.Export
description: |
  Exports parts of the VFS in a server side collection.

type: SERVER

parameters:
  - name: Path
    description: |
      A vfs path under which to search for file (NOTE: VFS paths start
      with the accessor name).
  - name: Components
    type: json_array
    default: '[]'
    description: |
      The top level to recurse from. NOTE: The first element in the
      list must be the accessor name.
  - name: ClientId
    description: The client id to apply the artifact on
  - name: FileGlob
    default: '**'
    description: |
      Only match the following files (default all of them) under the
      Path

sources:
  - query: |
      LET components &lt;= Components || pathspec(parse=Path).Components
      SELECT Name, OSPath, Size, IsDir,
             Data.DownloadInfo.flow_id AS FlowId,
             if(condition=Data.DownloadInfo.flow_id,
                then=upload(accessor="vfs", file=OSPath)) AS Upload
      FROM glob(globs=FileGlob, root=components, accessor="vfs")
      WHERE NOT IsDir

</code></pre>

