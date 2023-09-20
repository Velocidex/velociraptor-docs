---
title: Server.Utils.BackupS3
hidden: true
tags: [Server Event Artifact]
---

This server monitoring artifact will automatically zip and backup
any collected artifacts to s3.

You will need to provide credentials to upload to the bucket. The
credentials can be given as parameters or they will be taken from
the server metadata (as DefaultBucket, DefaultRegion,
S3AccessKeyId, S3AccessSecret)

Thanks to @shortxstack and @Recon_InfoSec


<pre><code class="language-yaml">
name: Server.Utils.BackupS3
description: |
   This server monitoring artifact will automatically zip and backup
   any collected artifacts to s3.

   You will need to provide credentials to upload to the bucket. The
   credentials can be given as parameters or they will be taken from
   the server metadata (as DefaultBucket, DefaultRegion,
   S3AccessKeyId, S3AccessSecret)

   Thanks to @shortxstack and @Recon_InfoSec

type: SERVER_EVENT

parameters:
   - name: ArtifactNameRegex
     default: "."
     description: A regular expression to select which artifacts to upload
     type: regex

   - name: Bucket
     description: The bucket to upload to (blank to use server metadata)
   - name: Region
   - name: CredentialsKey
   - name: CredentialsSecret

   - name: RemoveDownloads
     type: bool
     description: If set, remove the flow export files after upload

sources:
  - query: |
      -- Allow these settings to be set by the artifact parameter or the server metadata.
      LET bucket &lt;= if(condition=Bucket, then=Bucket,
           else=server_metadata().DefaultBucket)
      LET credentialskey &lt;= if(condition=CredentialsKey, then=CredentialsKey,
           else=server_metadata().S3AccessKeyId)
      LET region &lt;= if(condition=Region, then=Region,
           else=server_metadata().DefaultRegion)
      LET credentialssecret &lt;= if(condition=CredentialsSecret,
              then=CredentialsSecret, else=server_metadata().S3AccessSecret)

      LET completions = SELECT *,
         client_info(client_id=ClientId).os_info.fqdn AS Fqdn,
         create_flow_download(client_id=ClientId,
             flow_id=FlowId, wait=TRUE) AS FlowDownload
      FROM watch_monitoring(artifact="System.Flow.Completion")
      WHERE Flow.artifacts_with_results =~ ArtifactNameRegex

      SELECT upload_s3(
         bucket=bucket,
         credentialskey=credentialskey,
         credentialssecret=credentialssecret,
         region=region,
         file=FlowDownload,
         accessor="fs",
         name=format(format="Host %v %v %v.zip",
                     args=[Fqdn, FlowId, timestamp(epoch=now())])) AS Upload
      FROM completions
      WHERE Upload OR
        if(condition=RemoveDownloads,
           then=rm(filename=file_store(path=FlowDownload)))

</code></pre>

