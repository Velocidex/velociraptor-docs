---
title: Server.Hunts.CancelAndDelete
hidden: true
tags: [Server Artifact]
---

Velociraptor Hunts are a way of running the same flow on
many endpoints at once. Hunts issue very quickly and wait
until each endpoint returns results.

Sometimes, the artifacts collected might take a long time and
have unacceptable performance impact on the endpoint.
In some cases the artifacts end up retrieving too much data
that is not needed.

For those cases you might want to run the following server
artifact. It cancels all currently in-flight collections.

Optionally you can also remove any files already collected if you
do not need them.

This artifact is implicitly collected by the GUI when pressing the
"Delete Hunt" Button.


<pre><code class="language-yaml">
name: Server.Hunts.CancelAndDelete
description: |
   Velociraptor Hunts are a way of running the same flow on
   many endpoints at once. Hunts issue very quickly and wait
   until each endpoint returns results.

   Sometimes, the artifacts collected might take a long time and
   have unacceptable performance impact on the endpoint.
   In some cases the artifacts end up retrieving too much data
   that is not needed.

   For those cases you might want to run the following server
   artifact. It cancels all currently in-flight collections.

   Optionally you can also remove any files already collected if you
   do not need them.

   This artifact is implicitly collected by the GUI when pressing the
   "Delete Hunt" Button.

type: SERVER

parameters:
  - name: HuntId
    description: hunt_id you would like to kill all associated flows.
    default: "H.XXXXXX"
  - name: DeleteAllFiles
    description: Also delete all collected files
    type: bool

sources:
  - name: CancelFlows
    query: |
      // Get the flows and their running state for this hunt.
      LET flows = SELECT ClientId, FlowId, HuntId, {
            SELECT state FROM flows(client_id=ClientId, flow_id=FlowId)
        } AS FlowState
      FROM hunt_flows(hunt_id=HuntId)

      // Only cancel running flows.
      SELECT *, cancel_flow(client_id=ClientId, flow_id=FlowId) as cancel_flow
      FROM flows
      WHERE NOT FlowState =~ "ERROR|FINISHED"

  - name: HuntFiles
    query: |
      SELECT * FROM hunt_delete(hunt_id=HuntId, really_do_it=DeleteAllFiles)

</code></pre>

