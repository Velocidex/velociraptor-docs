# How can I automatically add & update client metadata?

[Client metadata]({{< ref "/docs/clients/metadata/" >}}) is used to store custom
information associated with each client. Velociraptor always stores basic
information about all clients but you may want to store additional information,
for example asset information. Client metadata makes this possible by allowing
you to store any kind of data and associate it with a client. Client metadata
can also be used to search for and filter clients in the GUI and in VQL queries,
as we will demonstrate below.

Metadata can be manually added and updated for any client in the client's
Overview page, but also via VQL using the
[client_set_metadata]({{< ref "/vql_reference/server/client_set_metadata/" >}})
function.

We can automate the addition and updating of client metadata by running a
[Server Event Artifact]({{< ref "/docs/server_automation/server_monitoring/" >}})
which sets metadata based on results of queries run on the client.

{{% notice note "Metadata or Labels?" %}}

Metadata is a set of fields associated with each client. Labels can also be
regarded as information associated with a client, but in Velociraptor labels are
a more transient kind of information and are designed to be added and removed
relatively frequently. Labels provide a way to group clients whereas Metadata
provides a way to store information *about* each client.

It's important that you choose the appropriate one for your use case. This
article is about automating Metadata but if you want to do similar automation of
Labels then you may find this article more useful:
[How can I automatically apply labels to clients?]({{< ref "/knowledge_base/tips/automating_labels/" >}})

{{% /notice %}}

## Adding/updating metadata during client interrogation

When a client connects for the first time in a Velociraptor deployment, the
server instructs the client to enroll and also tells it to run the
`Generic.Client.Info` artifact. This built-in artifact is designed to collect
basic information about the endpoint. We refer to this process as
["interrogation"]({{< ref "/docs/clients/interrogation/" >}}).

As explained
[here](https://docs.velociraptor.app/docs/clients/interrogation/#custom-artifact-override),
the default interrogation artifact can be overridden with a custom version. If
such a custom artifact is present on the Velociraptor server then all clients
will use it.

In this example we will use a custom interrogation artifact to collect custom
information and then use a
[Server Event]({{< ref "/docs/server_automation/server_monitoring/" >}}) artifact
to watch for any new collections of `Custom.Generic.Client.Info` and add or update
metadata fields based on the results.

The interrogation flow can also be run manually by clicking the **Interrogate**
button on the client Overview page, or by creating a hunt for the
`Generic.Client.Info` artifact. Such a hunt can further be created on a
scheduled basis as demonstrated by the
[Server.Monitoring.ScheduleHunt]({{< ref "/artifact_references/pages/server.monitoring.schedulehunt/" >}})
artifact.

Before we set up the event monitoring we first need to:

- prepare our custom interrogation artifact (including subordinate artifacts),
  and
- configure metadata indexing on the server.

### Add custom interrogation artifacts

We are going to have our custom interrogation artifact
(`Custom.Generic.Client.Info`) call 2 other artifacts which will each collect the
particular results we are interested in having as metadata.

#### Add an artifact to collect some BIOS info

The first artifact will query the endpoint for some BIOS information which may
be useful for asset management. On Windows it will use WMI and on Linux it will
use the `dmidecode` program which is available by default on most modern Linux
systems. These methods both return equivalent data.

```yaml
name: Generic.Client.BiosInfo
description: |
  Extracts some key fields from the BIOS which may be useful for system
  inventory purposes. For demonstration purposes only. Currently does not cover macOS.

type: CLIENT

sources:
  - precondition: SELECT * From info() where OS = 'windows'
    query: |
      -- On Windows we use WMI
      SELECT Manufacturer AS BaseBoardManufacturer,
             Product AS BaseBoardProduct,
             Version AS BaseBoardVersion,
             SerialNumber AS BaseBoardSerialNumber
      FROM wmi(query="SELECT * FROM Win32_baseboard")

  - precondition: SELECT * From info() where OS = 'linux' AND IsAdmin
    query: |
      -- on Linux we use dmidecode
      LET info = SELECT * FROM chain(
      a={SELECT regex_replace(source=Stdout,re="([^[:graph:]])",replace="") AS BaseBoardManufacturer
         FROM execve(argv=["dmidecode", "-s", "baseboard-manufacturer"])},
      b={SELECT regex_replace(source=Stdout,re="([^[:graph:]])",replace="") AS BaseBoardProduct
         FROM execve(argv=["dmidecode", "-s", "baseboard-product-name"])},
      c={SELECT regex_replace(source=Stdout,re="([^[:graph:]])",replace="") AS BaseBoardVersion
         FROM execve(argv=["dmidecode", "-s", "baseboard-version"])},
      d={SELECT regex_replace(source=Stdout,re="([^[:graph:]])",replace="") AS BaseBoardSerialNumber
         FROM execve(argv=["dmidecode", "-s", "baseboard-serial-number"])}
      )
      SELECT info[0].BaseBoardManufacturer AS BaseBoardManufacturer,
             info[1].BaseBoardProduct AS BaseBoardProduct,
             info[2].BaseBoardVersion AS BaseBoardVersion,
             info[3].BaseBoardSerialNumber AS BaseBoardSerialNumber
      FROM scope()
```

The key thing to note is that we are interested in having the following fields
as metadata fields:

- `BaseBoardManufacturer`
- `BaseBoardProduct`
- `BaseBoardVersion`
- `BaseBoardSerialNumber`

After creating the artifact you can run it and verify that it produces the
expected results:

![Windows BIOS info](biosinfo_windows.png)

![Linux BIOS info](biosinfo_linux.png)


#### Add an artifact to collect the last logged on user

Because the BIOS information is unlikely to ever change we also want to collect
something which *does* change. For purposes of demonstration let's query the
last logged on user. We already have built-in artifacts that provide the
relevant source information for Windows and Linux so we will leverage those in
our new artifact.

```yaml
name: Generic.Client.LastUser

description: Query to find the last logged on user.

type: CLIENT

sources:
  - precondition: SELECT * From info() where OS = 'windows'
    query: |
      SELECT Name AS LastUser, Mtime AS LastLogin
      FROM Artifact.Windows.Sys.Users()
      ORDER BY LastLogin DESC
      LIMIT 1

  - precondition: SELECT * From info() where OS = 'linux'
    query: |
      SELECT login_User AS LastUser, login_time AS LastLogin
      FROM Artifact.Linux.Sys.LastUserLogin()
      ORDER BY LastLogin DESC
      LIMIT 1
```

As with any new artifact it's always a good idea to run it and verify that it
produces the expected result:

![Windows last user logon](lastuser_windows.png)

![Linux last user logon](lastuser_linux.png)

From this artifact we get the following two fields which we want to have as
client metadata:

- `LastUser`
- `LastLogin`


#### Configure Metadata Indexing

When run, the above two artifacts will altogether return 6 fields
which we want added as client metadata. As explained
[here]({{< ref "/docs/clients/metadata/#indexed-metadata" >}}),
client metadata fields can be indexed or non-indexed. While all metadata is
accessible - and therefore searchable - via VQL, indexed fields are also
searchable via the search bar in the GUI. So you might be thinking
*"great, let's make everything indexed and searchable!"*.
However there are performance consequences to indexing metadata fields,
especially if you have a large number of clients. In our case we are also going
to have fields who's value may change with every interrogation and that will
require changes to the index and consequent re-indexing. So ideally you should
only index fields that are going to be useful for GUI searches. You can still
search all fields in VQL.

- `BaseBoardManufacturer`
- `BaseBoardProduct`
- `BaseBoardVersion` <- unlikely to be searched for, so it doesn't need to be indexed
- `BaseBoardSerialNumber`
- `LastUser`
- `LastLogin` <- a timestamp (string) which won't be searched for, so it doesn't need to be indexed

Given the above considerations, we need to add the following to the server
configuration file (the "defaults" section should already exist in the config).

```yaml
defaults:
  indexed_client_metadata:
    - BaseBoardManufacturer
    - BaseBoardProduct
    - BaseBoardSerialNumber
    - LastUser
```

After adding this configuration the server will need to be restarted so that it
reads the updated config file. The change will cause those metadata fields to be
created for every client. Initially the indexed metadata fields will be empty -
our server event artifact will populate their values later. You can navigate to
any client's Overview page and verify that the fields exist.

![](metadata_empty.svg)

Note: You can always edit any metadata field's value, but you cannot delete
metadata fields that are indexed.

#### Add custom interrogation artifact

When interrogation happens on the client we want it to also run the 2 new
artifacts which we added in the previous steps.

As explained
[here](https://docs.velociraptor.app/docs/clients/interrogation/#custom-artifact-override),
the default interrogation artifact can be overridden with a custom version. If
such a custom artifact is present on the Velociraptor server then all clients
will use it.

We want to modify the default artifact carefully and as little as possible (see
warning in the artifact's description!), so we are only going to add two new
sources to it which won't affect any of the default functionality:

1. The first new source will call the `Generic.Client.BiosInfo` artifact.
2. The second new source will call the `Generic.Client.LastUser` artifact.

We create our custom interrogation artifact by editing the default
`Generic.Client.Info` artifact. By default the name of the edited artifact will
be `Custom.Generic.Client.Info` which is exactly what we want it to be.

In the custom version we add the new sources after the existing ones (around line
115 in the current default artifact):

```yaml
  - name: BiosInfo
    query: SELECT * FROM Artifact.Generic.Client.BiosInfo(preconditions=TRUE)

  - name: LastUserLogin
    query: SELECT * FROM Artifact.Generic.Client.LastUser(preconditions=TRUE)
```

As you can see we are calling the other artifacts rather than including their
VQL directly in the interrogation artifact. This makes our addition more concise
and also allows the dependent artifacts to be run separately which is useful for
troubleshooting. The parameter `preconditions=TRUE` is necessary because the
dependent artifacts include preconditions that must be checked so that the
correct VQL is run for each platform.

As a check that the artifact works you can manually initiate a client
interrogation. The results should now include the two new sources.

![New sources have data](custom_generic_client_info.png)

### Configure Server Event Monitoring

At this point we have configured the collection of the required data. The next
step is to create a server event artifact and add it to server monitoring. This
will monitor for incoming results and then populate the metadata fields with
data from these results.

#### Add a Server Event Monitoring artifact

Our server event artifact to be added has 2 sources - one to monitor each of the
new client artifacts that we added to `Custom.Generic.Client.Info`.

```yaml
name: AutomateClientMetadata
type: SERVER_EVENT
sources:
- name: WatchBiosInfo
  query: |
    LET interrogations = SELECT *
    FROM watch_monitoring(artifact="System.Flow.Completion")
    WHERE Flow.artifacts_with_results =~ "Custom.Generic.Client.Info/BiosInfo"

    LET results = SELECT *, ClientId
    FROM source(
       artifact="Custom.Generic.Client.Info/BiosInfo" ,
       client_id=ClientId, flow_id=FlowId)

    SELECT *,
      client_set_metadata(
                  client_id=ClientId,
                  metadata=dict(
                    BaseBoardManufacturer=BaseBoardManufacturer,
                    BaseBoardProduct=BaseBoardProduct,
                    BaseBoardVersion=BaseBoardVersion,
                    BaseBoardSerialNumber=BaseBoardSerialNumber
                    )
                  )
    FROM foreach(row=interrogations, query=results)

- name: WatchLastUserLogin
  query: |
    LET interrogations = SELECT *
    FROM watch_monitoring(artifact="System.Flow.Completion")
    WHERE Flow.artifacts_with_results =~ "Custom.Generic.Client.Info/LastUserLogin"

    -- we sleep this query to slightly stagger the update
    LET results = SELECT *, ClientId, sleep(time=3) AS _sleep
    FROM source(
       artifact="Custom.Generic.Client.Info/LastUserLogin" ,
       client_id=ClientId, flow_id=FlowId)

    SELECT *,
      client_set_metadata(
                  client_id=ClientId,
                  metadata=dict(
                    LastUser=LastUser,
                    LastLogin=LastLogin
                    )
                  )
    FROM foreach(row=interrogations, query=results)
```

We now add this server event artifact to our server monitoring:

![Add artifact to server event monitoring](add_event_monitoring.png)

#### Test it!

If you now enroll a new client *or* perform a manual interrogation against an
existing client you will see the metadata fields populated.

![](metadata_populated.svg)

The indexed fields will now be available as
[search operators]({{< ref "/docs/clients/searching/" >}})
in the client search bar.

![search by indexed fields](indexed_search.png)

As mentioned, the interrogation flow can be run manually by clicking the
**Interrogate** button on the client Overview page, or by creating a hunt for
the `Custom.Generic.Client.Info` artifact. Such a hunt can further be created on
a schedule as demonstrated by the
[Server.Monitoring.ScheduleHunt]({{< ref "/artifact_references/pages/server.monitoring.schedulehunt/" >}})
artifact.

## Adding/updating metadata from normal collections

Although we previously linked the metadata to interrogations, it doesn't have to
be done that way. We could, for example, hunt for either of the 2 new client
artifacts we created and have Server Monitoring add/update the metadata from the
results. Here's how to do that...

#### Add a new server monitoring artifact

This artifact is almost identical to the one we previously created. The only
difference is that instead of watching for interrogation flow completions it
watches for completions of the client artifacts themselves.

```yaml
name: AutomateClientMetadataDirect
type: SERVER_EVENT
sources:
- name: WatchBiosInfo
  query: |
    LET interrogations = SELECT *
    FROM watch_monitoring(artifact="System.Flow.Completion")
    WHERE Flow.artifacts_with_results =~ "Generic.Client.BiosInfo"

    LET results = SELECT *, ClientId
    FROM source(
       artifact="Generic.Client.BiosInfo" ,
       client_id=ClientId, flow_id=FlowId)

    SELECT *,
      client_set_metadata(
                  client_id=ClientId,
                  metadata=dict(
                    BaseBoardManufacturer=BaseBoardManufacturer,
                    BaseBoardProduct=BaseBoardProduct,
                    BaseBoardVersion=BaseBoardVersion,
                    BaseBoardSerialNumber=BaseBoardSerialNumber
                    )
                  )
    FROM foreach(row=interrogations, query=results)

- name: WatchLastUserLogin
  query: |
    LET interrogations = SELECT *
    FROM watch_monitoring(artifact="System.Flow.Completion")
    WHERE Flow.artifacts_with_results =~ "Generic.Client.LastUser"

    LET results = SELECT *, ClientId
    FROM source(
       artifact="Generic.Client.LastUser" ,
       client_id=ClientId, flow_id=FlowId)

    SELECT *,
      client_set_metadata(
                  client_id=ClientId,
                  metadata=dict(
                    LastUser=LastUser,
                    LastLogin=LastLogin
                    )
                  )
    FROM foreach(row=interrogations, query=results)
```

We then add this new artifact to our Server Event Monitoring.

![Add artifact to server event monitoring](add_event_monitoring_direct.png)

Now all we need to do is run the artifacts directly and the metadata will be
updated. You can create a hunt for these artifacts if you want to update the
data for all your clients.

The two approaches are not mutually exclusive: You can have both
`AutomateClientMetadata` and `AutomateClientMetadataDirect` added to Server
Monitoring at the same time and either one will update the same metadata.

## Searching metadata in VQL

Searching metadata values in VQL is easy. Here's an example that will list all
systems where Mary was the last user to log on.

```vql
SELECT client_id,
       os_info.hostname,
       client_metadata(client_id=client_id).LastUser AS LastUser,
       client_metadata(client_id=client_id).LastLogin AS LastLogin
FROM clients()
WHERE LastUser = "Mary"
```

![Running a search in a notebook](vql_search.png)

Tags: #configuration #vql #deployment
