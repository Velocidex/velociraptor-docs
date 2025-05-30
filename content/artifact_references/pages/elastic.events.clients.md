---
title: Elastic.Events.Clients
hidden: true
tags: [Server Event Artifact]
---

This server monitoring artifact will watch a selection of client or
server monitoring artifacts for new events and push those to an
elastic index.

NOTE: You must ensure you are collecting these artifacts from the
clients by adding them to the "Client Events" GUI, or for server
artifacts, the "Server Events" GUI.


<pre><code class="language-yaml">
name: Elastic.Events.Upload
aliases:
- Elastic.Events.Clients

description: |
  This server monitoring artifact will watch a selection of client or
  server monitoring artifacts for new events and push those to an
  elastic index.

  NOTE: You must ensure you are collecting these artifacts from the
  clients by adding them to the "Client Events" GUI, or for server
  artifacts, the "Server Events" GUI.

type: SERVER_EVENT

parameters:
  - name: ElasticAddresses
    default: http://127.0.0.1:9200/
  - name: Username
  - name: Password
  - name: APIKey
  - name: ClientArtifactsToWatch
    type: artifactset
    artifact_type: CLIENT_EVENT
    default: |
      Artifact
      Windows.Detection.PsexecService
      Windows.Events.ProcessCreation
      Windows.Events.ServiceCreation
  - name: ServerArtifactsToWatch
    type: artifactset
    artifact_type: SERVER_EVENT
    default: |
      Artifact
      Server.Audit.Logs
  - name: DisableSSLSecurity
    type: bool
    description: Disable SSL certificate verification
  - name: Threads
    type: int
    description: Number of threads to upload with
  - name: ChunkSize
    type: int
    description: Batch this many rows for each upload.
  - name: CloudID
    description: The cloud id if needed
  - name: RootCA
    description: |
      A root CA certificate in PEM for trusting TLS protected Elastic
      servers.

sources:
  - query: |
      LET artifacts_to_watch = SELECT * FROM chain(
        a={SELECT Artifact FROM ClientArtifactsToWatch},
        b={SELECT Artifact FROM ServerArtifactsToWatch})
      WHERE NOT Artifact =~ "Elastic.Events.Upload"
        AND log(message="Uploading artifact " + Artifact + " to Elastic")

      LET s = scope()

      LET events = SELECT * FROM foreach(
          row=artifacts_to_watch,
          async=TRUE,   // Required for event queries in foreach()
          query={
             SELECT *, "Artifact_" + Artifact as _index,
                    Artifact,
                    client_info(client_id=s.ClientId || "server").os_info.hostname AS Hostname,
                    timestamp(epoch=now()) AS timestamp
             FROM watch_monitoring(artifact=Artifact)
          })

      SELECT * FROM elastic_upload(
          query=events,
          threads=Threads,
          chunk_size=ChunkSize,
          addresses=split(string=ElasticAddresses, sep=","),
          index="velociraptor",
          password=Password,
          username=Username,
          cloud_id=CloudID,
          api_key=APIKey,
          root_ca=RootCA,
          disable_ssl_security=DisableSSLSecurity,
          type="ClientEvents")

</code></pre>

