---
title: Elastic.Flows.Upload
hidden: true
tags: [Server Event Artifact]
---

This server side event monitoring artifact waits for new artifacts
to be collected from endpoints and automatically uploads those to an
elastic server.

We use the artifact name as the name of the index. This allows users
to adjust the index size/lifetime according to the artifact it is
holding.


<pre><code class="language-yaml">
name: Elastic.Flows.Upload
description: |
  This server side event monitoring artifact waits for new artifacts
  to be collected from endpoints and automatically uploads those to an
  elastic server.

  We use the artifact name as the name of the index. This allows users
  to adjust the index size/lifetime according to the artifact it is
  holding.

type: SERVER_EVENT

parameters:
  - name: ArtifactNameRegex
    default: .
    type: regex
    description: Only upload these artifacts to elastic
  - name: elasticAddresses
    default: http://127.0.0.1:9200/
  - name: Username
  - name: Password
  - name: APIKey
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
      LET completions = SELECT * FROM watch_monitoring(
             artifact=&quot;System.Flow.Completion&quot;)
             WHERE Flow.artifacts_with_results =~ ArtifactNameRegex

      LET documents = SELECT * FROM foreach(row=completions,
          query={
             SELECT * FROM foreach(
                 row=Flow.artifacts_with_results,
                 query={
                     SELECT *, _value AS Artifact,
                            client_info(client_id=ClientId).os_info.hostname AS Hostname,
                            timestamp(epoch=now()) AS timestamp,
                            ClientId, Flow.session_id AS FlowId,
                            &quot;artifact_&quot; + regex_replace(source=_value,
                               re=&#x27;[/.]&#x27;, replace=&#x27;_&#x27;) as _index
                     FROM source(
                        client_id=ClientId,
                        flow_id=Flow.session_id,
                        artifact=_value)
                 })
          })

      SELECT * FROM elastic_upload(
            query=documents,
            threads=Threads,
            chunk_size=ChunkSize,
            addresses=split(string=elasticAddresses, sep=&quot;,&quot;),
            index=&quot;velociraptor&quot;,
            password=Password,
            username=Username,
            cloud_id=CloudID,
            api_key=APIKey,
            root_ca=RootCA,
            disable_ssl_security=DisableSSLSecurity,
            type=&quot;artifact&quot;)

</code></pre>

