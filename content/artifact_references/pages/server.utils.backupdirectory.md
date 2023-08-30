---
title: Server.Utils.BackupDirectory
hidden: true
tags: [Server Event Artifact]
---

This server monitoring artifact will automatically export and
backup selected collected artifacts to a directory on the server.


<pre><code class="language-yaml">
name: Server.Utils.BackupDirectory
description: |
   This server monitoring artifact will automatically export and
   backup selected collected artifacts to a directory on the server.

type: SERVER_EVENT

parameters:
   - name: ArtifactNameRegex
     default: &quot;.&quot;
     description: A regular expression to select which artifacts to upload
     type: regex

   - name: BackupDirectoryPath
     description: A directory on the server to receive the uploaded files.

   - name: RemoveDownloads
     type: bool
     description: If set, remove the flow export files after upload

required_permissions:
  - SERVER_ADMIN

sources:
  - query: |
      LET completions = SELECT *,
         client_info(client_id=ClientId).os_info.fqdn AS Fqdn,
         create_flow_download(client_id=ClientId,
             flow_id=FlowId, wait=TRUE) AS FlowDownload
      FROM watch_monitoring(artifact=&quot;System.Flow.Completion&quot;)
      WHERE Flow.artifacts_with_results =~ ArtifactNameRegex

      SELECT upload_directory(
         output=BackupDirectoryPath,
         name=format(format=&quot;Host %v %v %v.zip&quot;,
                     args=[Fqdn, FlowId, timestamp(epoch=now())]),
         accessor=&quot;fs&quot;,
         file=FlowDownload) AS Upload
      FROM completions
      WHERE Upload OR
        if(condition=RemoveDownloads,
           then=rm(filename=file_store(path=FlowDownload)))

</code></pre>

