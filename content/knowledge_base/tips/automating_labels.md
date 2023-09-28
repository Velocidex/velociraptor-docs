# How can I automatically apply labels to clients?

Sometimes it is useful to automatically label clients based on client
state. You can do this automatically by running a [Server Event
Artifact]({{< ref "/docs/server_automation/server_monitoring/" >}})
that automatically applies labels based on some criteria.

When a client appears for the first time on a Velociraptor deployment,
the server instructs the client to enrol, and automatically runs the
`Generic.Client.Info` artifact on it. This artifact is designed to
collect basic information about the endpoint.

We can watch the system for any new collections of the artifact and
apply labels based on their results.

For the following example, I will label a client with the label
"Server" if it is running any kind of Windows Server Operating System.

```vql
LET interrogations = SELECT *
FROM watch_monitoring(artifact="System.Flow.Completion")
WHERE Flow.artifacts_with_results =~ "Generic.Client.Info/BasicInformation"

LET results = SELECT *, ClientId
FROM source(
   artifact="Generic.Client.Info/BasicInformation" ,
   client_id=ClientId, flow_id=FlowId)
WHERE Platform =~ "Server"

SELECT *,
label(client_id=ClientId, labels="Server", op="set")
FROM foreach(row=interrogations, query=results)
```

1. The `interrogations` query will watch for any flow completion with
   results for the `Generic.Client.Info/BasicInformation` source. This
   will provide the flow id and the client id.
2. The `results` query will read all the results from the
   collection. Typically the Release field will contain the Windows
   Release information. We filter out all rows but those that match
   the word "Server" to only see results from the Windows Server
   platform.
3. Finally for each interrogations we get the results and finally
   "set" the label "Server" on the client id.

Now that we have the VQL worked out, we just package it in a YAML
artifact by giving it a name.

```yaml
name: AutomateServerLabels
type: SERVER_EVENT
sources:
- query: |
    LET interrogations = SELECT *
    FROM watch_monitoring(artifact="System.Flow.Completion")
    WHERE Flow.artifacts_with_results =~ "Generic.Client.Info/BasicInformation"

    LET results = SELECT *, ClientId
    FROM source(
       artifact="Generic.Client.Info/BasicInformation" ,
       client_id=ClientId, flow_id=FlowId)
    WHERE Platform =~ "Server"

    SELECT *
    label(client_id=ClientId, labels="Server", op="set")
    FROM foreach(row=interrogations, query=results)
```

![Adding a new artifact](artifact.png)

Now we can enable monitoring of these events by adding the artifact to
the server event table

![Installing server event monitoring](installing_event_monitoring.png)

{{% notice tip "Refreshing labels" %}}

The above artifact will automatically label clients when the `Generic.Client.Info` collection is run on the clients. This collection runs when the client is first seen but you can run it at any time.

To relabel all clients - even after they were enrolled, you can just
start a hunt for `Generic.Client.Info` at any time.

Note that labels are either Set or Cleared for it is fine to re-apply
the label many times.

{{% /notice %}}

Tags: #automation #labels
