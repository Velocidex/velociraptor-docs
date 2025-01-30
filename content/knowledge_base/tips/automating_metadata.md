# How can I automatically add & update client metadata?

[Client metadata]({{< ref "/docs/clients/metadata/" >}}) is used to store custom
information associated with each client. Velociraptor always stores basic
information about all clients but you may want to store additional information,
for example asset information. Client metadata makes this possible by allowing
you to store any kind of data and associate it with a client. Client metadata
can also be used to search for and filter clients in the GUI and in VQL queries,
as we will demonstrate below.

The addition of metadata can be automated by running a
[Server Event Artifact]({{< ref "/docs/server_automation/server_monitoring/" >}})
which automatically sets metadata based on some criteria that you define.

In this article we demonstrate two use case: one basic and one more advanced.

{{% notice note "Metadata vs Labels?" %}}

Metadata is a set of fields associated with each client. Labels can also be
regarded as information associated with a client, but in Velociraptor labels are
a more transient kind of information and are designed to be added and removed
relatively frequently. Labels provide a way to group clients whereas metadata
provides a way to store information *about* each client.

It's important that you choose the appropriate one for your use case. This
article is about Metadata but if you want to do a similar thing using Labels
then you may find this article more useful:
[How can I automatically apply labels to clients?]({{< ref "/knowledge_base/tips/automating_labels/" >}})

{{% /notice %}}

## Basic Use Case: Labelling based on default interrogation data



## Add Metadata Indexing

## Advanced Use Case: Automatic interrogation

Previously we were targeting data that doesn't change, so it was sufficient to
rely on the initial collection of `Custom.Generic.Client.Info` new clients or
else run a hunt for that artifact so that the data can be gathered from existing
clients. But what if we want to target data that changes regularly?



Tags: #automation #metadata
