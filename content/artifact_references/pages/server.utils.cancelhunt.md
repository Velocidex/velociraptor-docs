---
title: Server.Utils.CancelHunt
hidden: true
tags: [Server Artifact]
---

Sometimes a hunt is issued which is no longer useful. While stopping
the hunt from the GUI prevents new clients from receiving the hunt,
it does not actively cancel collections currently in flight.

This artifact enumerates all flows in the hunt and actively cancels
them.


<pre><code class="language-yaml">
name: Server.Utils.CancelHunt
description: |
  Sometimes a hunt is issued which is no longer useful. While stopping
  the hunt from the GUI prevents new clients from receiving the hunt,
  it does not actively cancel collections currently in flight.

  This artifact enumerates all flows in the hunt and actively cancels
  them.

type: SERVER

parameters:
  - name: HuntId

sources:
  - query: |
      LET all_flows = SELECT Flow.client_id AS client_id, Flow.session_id AS flow_id
      FROM hunt_flows(hunt_id=HuntId)
      WHERE NOT Flow.state =~ "ERROR|FINISHED"

      LET cancellations = SELECT client_id, flow_id,
             cancel_flow(client_id=client_id, flow_id=flow_id) AS Cancellation
      FROM all_flows

      SELECT * FROM if(condition=HuntId, then=cancellations,
      else={
         SELECT * FROM scope()
         WHERE log(message="Hunt ID must be specified.") AND NULL
      })

</code></pre>

