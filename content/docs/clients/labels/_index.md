---
title: "Labels"
date: 2024-12-18
draft: false
weight: 20
last_reviewed: 2024-12-29
---

Clients can have one or more **labels** attached to them. You're probably
already familiar with concept which is alternatively referred to as "tags" but
we just happen to call them labels. Labels are useful when we need to hunt or
perform other operations on a well-defined group of hosts. For example, we can
restrict a hunt to one or more labels to avoid collecting unnecessary data, or
to target specific hosts, or to avoid specific hosts.

Although labels are associated with clients, the clients themselves have no
knowledge of the labels being applied to them. That is, labels are a purely a
server-side construct that are used to organize clients. The VQL functions to
query and manipulate labels are only available in VQL queries running on the
server.

## Adding or removing labels manually

Manual manipulation of labels can be done in the GUI's client search screen.

To add labels, select the hosts in the GUI and then click the "add labels"
button.

![Adding labels](labels.png)

## Adding or removing labels via VQL

Although it is possible to manipulate labels via the GUI, It is
usually easier to use VQL queries to add or remove labels via the
`label()` plugin.

For example, let's say we wanted to label all machines with the local
user of `mike`. I would follow the following steps:

1. Launch a hunt to list all user accounts on all endpoints using the
`Windows.Sys.Users`.
2. When enough results are returned, I click the `Notebook` tab in the
   hunt manager to access the hunt's notebook.
3. Applying the query below I filter all results with the user `Mike`
   and apply the label function to that host.

Note that `HuntId` is automatically set to the hunt id inside the hunt notebook:

```vql
SELECT Name, label(client_id=ClientId,
                   labels="Mikes Box",
                   op="set")
FROM hunt_results(hunt_id=HuntId,
                  artifact="Windows.Sys.Users")
WHERE Name =~ "mike"
```

{{% notice tip "Using labels to control hunts and monitoring" %}}

Labels applied to clients essentially form groups. Many features in
Velociraptor apply to these groups and it is possible to move clients
in and out of these during the course of an investigation.

For example, client event monitoring queries are controlled via client
labels. This allows you to assign a detection rule to a group of
machines then simple add or remove machines from the group.  Similarly
it is possible to restrict a hunt to a label group then simply add
clients to the label group in order to automatically add them to the
hunt.

In addition, it's possible to create
[server monitoring]({{< ref "/docs/server_automation/server_monitoring/" >}})
artifacts which automatically add or remove labels based on flow completion
status and results. Thus we can implement automatic label manipulation via VQL
which in turn initiates further actions (such as assigning the client to a
particular hunt based on a previous hunt's results) and thereby accomplishes
very powerful multi-phase automation.

{{% /notice %}}


### Built-in Labels

While one can add labels to machines using the GUI this is not
practical for labeling very large numbers of client, for example
belonging to a particular Active Directory Organizational Unit
(OU). It is reasonable to want to quickly select those machines
belonging to a particular OU.

We can use labels to identify machines installed by a specific group
policy. For example, suppose we have a particular OU called
`Sales`. We want to ensure that Velociraptor clients in the Sales team
are specifically marked by the `Sales` label.

Simply modify the client's configuration file to contain the Sales
label, and this label will be automatically applied when the client is
enrolled:

```yaml
Client:
  labels:
  - Sales
```

Then we apply the Group Policy Object only on the Sales OU which will
result in those clients being enrolled with the Sales label
automatically.

{{% notice note %}}

Although any labels can be deleted on the server, the labels specified in the
client config file will return after the client restarts.

{{% /notice %}}
