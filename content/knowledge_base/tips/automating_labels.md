# How can I automatically apply labels to clients?

[Labels]({{< ref "/docs/clients/labels/" >}}) are used to target clients in
Velociraptor. All clients that share a particular label can be treated as a
group in common operations such as hunts and client monitoring. Labels can also
be used to search for and filter clients in the GUI and in VQL queries.

Sometimes it is useful to automatically label clients based on some property of
the client or the results of a collection. You can do this by running a
[Server Event]({{< ref "/docs/server_automation/server_monitoring/" >}}) artifact
which automatically applies labels based on some criteria that you define.

In this article we demonstrate two use cases: a basic and a more advanced one.

{{% notice note "Labels or Metadata?" %}}

Metadata is a set of fields associated with each client. Labels can also be
regarded as information associated with a client, but in Velociraptor labels are
a more transient kind of information and are designed to be added and removed
relatively frequently. Labels provide a way to group clients whereas Metadata
provides a way to store information *about* each client.

It's important that you choose the appropriate one for your use case. This
article is about automating Labels but if you want to do similar automation of
Metadata then you may find this article more useful:
[How can I automatically add & update client metadata?]({{< ref "/knowledge_base/tips/automating_metadata/" >}})

{{% /notice %}}

## Basic Use Case: Labelling based on default interrogation data

When a client connects for the first time in a Velociraptor deployment, the
server instructs the client to enroll and also tells it to run the
`Generic.Client.Info` artifact. This built-in artifact is designed to collect
basic information about the endpoint. We refer to this process as
["interrogation"]({{< ref "/docs/clients/interrogation/" >}}).

We can watch the system for any new collections of `Generic.Client.Info` and
apply labels based on the results.

The following example will label a client with the label "Server" if it is
running any kind of Windows Server Operating System.

```vql
LET interrogations = SELECT *
  FROM watch_monitoring(artifact="System.Flow.Completion")
  WHERE Flow.artifacts_with_results =~ "Generic.Client.Info/BasicInformation"

LET results = SELECT *, ClientId
              FROM source(
                 artifact="Generic.Client.Info/BasicInformation" ,
                 client_id=ClientId, flow_id=FlowId)
              WHERE Platform =~ "Server"

SELECT *, label(client_id=ClientId, labels="Server", op="set")
FROM foreach(row=interrogations, query=results)
```

1. The `interrogations` query will watch for any flow completion with results
   for the `Generic.Client.Info/BasicInformation` source. This will provide the
   flow id and the client id.
2. The `results` query will read all the results from the collection. Typically
   the `Platform` field will contain the Windows Release information. We filter
   out all rows except those that match the word "Server" to only see results
   from the Windows Server platform.
3. Finally for each interrogation we get the results and finally "set" the
   label "Server" on the client id.

Now that we have the VQL worked out, we just package it in a `SERVER_EVENT`
artifact.

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
the server event table.

![Installing server event monitoring](installing_event_monitoring.svg)

Now when a new server enrolls the label "Server" will be applied.

Note that we don't need to add a label for non-servers (i.e. "workstations")
because targeting a hunt, for example, allows us to exclude specific labels.

![Label added](server_label.svg)

{{% notice tip "Refreshing labels" %}}

The above artifact will automatically label clients when the
`Generic.Client.Info` collection is run on the clients. This collection runs
when the client is first seen but you can run it at any time.

To relabel all clients - even after they were enrolled - you can just start a
hunt for `Generic.Client.Info` at any time. It is fine to re-apply the label
many times as duplicate labels cannot occur.

Bulk removal of a specific label is possible by running VQL in a notebook, for
example:

```vql
SELECT client_id, label(client_id=client_id, labels=["Server"], op="remove")
FROM clients()
```

{{% /notice %}}

## Advanced Use Case: Labelling based on custom interrogation data

In the previous example we used data that was already being gathered by the
`Generic.Client.Info` artifact. In addition, the `Platform` information doesn't
ever change, so every time you run it you will get the same result. Boring!

Now let's look at applying a label based on data that *isn't* included in the
default interrogation artifact, and that is dynamic (i.e. will change over time).
Here we will use a Sigma rule from the
[Hayabusa Rules](https://sigma.velocidex.com/docs/artifacts/velociraptor_hayabusa_ruleset/)
ruleset.

In order for this to work you'll need to have already imported the "Velociraptor
Hayabusa Ruleset" by running the `Server.Import.CuratedSigma` server artifact on
your server. To learn more about Sigma rules in Velociraptor
[see this page](https://sigma.velocidex.com/docs/sigma_in_velociraptor/).

![Running Server.Import.CuratedSigma](sigma_import.png)

The Sigma rule we will be using in this example is
[Windows Defender Threat Detected](https://github.com/Yamato-Security/hayabusa-rules/blob/main/sigma/builtin/windefend/win_defender_threat.yml).

When interrogation happens on the client we want it to also check whether
Windows Defender has detected any threats in the past 24 hours. This may be a
somewhat contrived example but it (or something similar) may also have
realworld usefulness if you are rolling out Velociraptor clients in response to
an incident. It may be useful to have endpoints flagged based on recent Defender
detections to aid with triage.

As explained
[here](https://docs.velociraptor.app/docs/clients/interrogation/#custom-artifact-override)
in the documentation, the default interrogation artifact can be overridden with
a custom version. If such a custom artifact is present on the Velociraptor
server then all clients will use it.

We want to modify the default artifact as little as possible, as advised in
the artifact's description, so we are only going to add a new source to it: one
which calls the `Windows.Hayabusa.Rules` artifact.

We do this by editing the default `Generic.Client.Info` artifact. By default the
name of the edited artifact will be `Custom.Generic.Client.Info` which is
exactly what we want it to be.

In the custom version we add a new source after the existing ones (around line
115 in the current default artifact):

```vql
  - name: RecentDefenderDetections
    precondition: SELECT OS From info() where OS = 'windows'
    query: |
      LET past_day <= timestamp_format(time=now() - 86400)
      SELECT *
      FROM Artifact.Windows.Hayabusa.Rules(RuleLevel="All",
                                           RuleStatus="All Rules",
                                           RuleTitleFilter="Windows Defender Threat Detected",
                                           DateAfter=past_day)
```

If we now run an interrogation manually on a Windows client where we have
deliberately triggered a detection using the EICAR test file, we see that the
Sigma rule has run and that the detection has been included in the collection
results.

![Manual interrogation test](defender_detection.svg)

We have now extended our interrogation data with something more dynamic than in
the first example. The remaining steps are essentially the same except that we
are monitoring a different source and adding a different label.

We add a new `SERVER_EVENT` artifact:

```yaml
name: LabelRecentDefenderDetections
type: SERVER_EVENT
sources:
- query: |
    LET interrogations = SELECT *
    FROM watch_monitoring(artifact="System.Flow.Completion")
    WHERE Flow.artifacts_with_results =~ "Custom.Generic.Client.Info/RecentDefenderDetections"

    SELECT *,
    label(client_id=ClientId, labels="Recent Threat Detection", op="set")
    FROM interrogations
```

This artifact is slightly simpler than the one in the previous example because
we don't need to check for any specific value in the results. If the results
contain *any* rows then we want the label to be applied. Of course you could
make it more sophisticated if you wanted.

Lastly we add the artifact to the server event table as we did with the first
example.

![Installing server event monitoring](event_monitoring2.png)

Now the interrogation of any Windows client will also check the Windows Defender
logs and if a threat was logged in the past 24 hours the client will be labelled
"Recent Threat Detection".

![Label added!](label_added.png)

As with the basic use case you can force all clients to re-run this check by
creating a hunt for the `Custom.Generic.Client.Info` artifact.

Tags: #automation #labels