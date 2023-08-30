---
title: Generic.Forensic.HashLookup
hidden: true
tags: [Server Event Artifact]
---

This artifact is a server event artifact that collects hashes from
various sources into a central location. It is possible to follow
this artifact (e.g. with an external program using the API) to
lookup the hashes with an external service.

You can also send hashes to this artifact yourself using the
`send_event()` vql Function. For example, the following will add
hashes from the results of another artifact.

```vql
SELECT *, send_event(
    artifact="Generic.Forensic.HashLookup",
    row=dict(SHA256=Sha256, ClientId=ClientId))
FROM source()
```


<pre><code class="language-yaml">
name: Generic.Forensic.HashLookup
description: |
  This artifact is a server event artifact that collects hashes from
  various sources into a central location. It is possible to follow
  this artifact (e.g. with an external program using the API) to
  lookup the hashes with an external service.

  You can also send hashes to this artifact yourself using the
  `send_event()` vql Function. For example, the following will add
  hashes from the results of another artifact.

  ```vql
  SELECT *, send_event(
      artifact=&quot;Generic.Forensic.HashLookup&quot;,
      row=dict(SHA256=Sha256, ClientId=ClientId))
  FROM source()
  ```

type: SERVER_EVENT

sources:
  - query: |
      // You can add more queries to this chain to automatically
      // collect more hashes.
      SELECT ClientId, SHA256 FROM chain(
      a={
        SELECT * FROM foreach(
          row={
            SELECT ClientId, FlowId
            FROM watch_monitoring(artifact=&quot;System.Flow.Completion&quot;)
            WHERE Flow.artifacts_with_results =~ &quot;System.VFS.DownloadFile&quot;
          }, query={
            SELECT ClientId, Sha256 AS SHA256
            FROM source(
              artifact=&quot;System.VFS.DownloadFile&quot;,
              client_id=ClientId, flow_id=FlowId)
         })
      }, async=TRUE)

</code></pre>

