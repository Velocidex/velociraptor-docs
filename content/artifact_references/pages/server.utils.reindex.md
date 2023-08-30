---
title: Server.Utils.ReIndex
hidden: true
tags: [Client Artifact]
---

This utility artifact replays all collected Generic.Client.Info
collections to the interrogation service forcing a reindex.

It should normally not be needed.


<pre><code class="language-yaml">
name: Server.Utils.ReIndex
description: |
  This utility artifact replays all collected Generic.Client.Info
  collections to the interrogation service forcing a reindex.

  It should normally not be needed.

sources:
  - query: |
      SELECT * FROM foreach(row={
        SELECT Name AS ClientId
        FROM glob(globs=&quot;/clients/*&quot;, accessor=&quot;fs&quot;)
        WHERE Name =~ &quot;^C.&quot;
      }, query={
        SELECT session_id,
             send_event(artifact=&quot;System.Flow.Completion&quot;,
                        row=dict(
                           Flow=dict(artifacts_with_results=artifacts_with_results),
                           ClientId=ClientId,
                           FlowId=session_id)) AS Event
        FROM flows(client_id=ClientId)
        WHERE request.artifacts =~ &quot;Generic.Client.Info&quot;
        LIMIT 1
      }, workers=10)

</code></pre>

