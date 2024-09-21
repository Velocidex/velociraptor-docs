---
title: "Velociraptor 0.73 Release"
description: |
   Velociraptor Release 0.73 is now in release candidate status.
   This post discusses some of the new features.

tags:
 - Release

author: "Mike Cohen"
date: 2024-09-10
noindex: false
---

I am very excited to announce that the latest Velociraptor release
0.73 is now in release candidate status.

In this post I will discuss some of the interesting new features.

## New Client functionality

### Built in Windows memory acquisition

Previously Velociraptor was able to acquire physical memory on Windows
using the Winpmem binary as an external tool - which was delivered to
the endpoint and executed to obtain the memory image.

In this release, the Winpmem driver is incorporated into the
Velociraptor binary itself so there is no need to introduce additional
binaries to the endpoint. The driver is inserted on demand when an
image is required using the new VQL function
[winpmem()](https://docs.velociraptor.app/vql_reference/misc/winpmem/). This
VQL function can compress the memory image, to make it faster to
acquire (less IO) and deliver over the network (less network bandwidth
required).

The ability to access physical memory simply is also leveraged with
the
[winpmem](https://docs.velociraptor.app/vql_reference/accessors/winpmem/)
accessor which allows for direct Yara scans with
`Windows.Detection.Yara.PhysicalMemory `


### Added parse_journald() and watch_journald() plugins

Journald is Linux's answer to structured logging. Previously
Velociraptor implemented a simple parser using pure VQL. In this
release Velociraptor introduces a dedicated `journald` parser.

The new parser emulates the windows event log format, with common
fields grouped under the `System` column and variable fields in
`EventData`.

{{< figure caption="Journald parser" src="journald.png" >}}

This release also introduces a new VQL plugin `watch_journald()` which
follows journald logs and forwards events to the server.

### Add RDP Cache parser to RDP Cache artifact

Attackers commonly use Remote Desktop (RDP) to laterally move between
systems. The Microsoft RDP client maintains a tile cache with
fragments of the screen.

Sometimes the RDP cache holds crucial evidence as to the activity of
the attacker on systems that ran the RDP client. This information is
now easily accessible using the new `Windows.Forensics.RDPCache`
artifact.

{{< figure caption="Viewing the RDP cache tiles" src="rdp_cache.png" >}}


### Added the ability to dump clear text network traffic for debugging

Velociraptor clients are often deployed in complex networks. It is
sometimes difficult to debug why network communications fail.

This release introduces the ability for the client to record the plain
text communications between the client and server to a local file for
debugging purposes.

Network communications are usually wrapped in TLS making network
captures useless for debugging. Because of the way Velociraptor pins
the TLS communications it is not easy to insert a MITM interceptor
proxy either.

Adding the following to the client's config will write plain text
communications into the specified file:

```yaml
Client:
   insecure_network_trace_file: /tmp/trace.txt
```

Running the client will show the following log message:
```
[INFO] 2024-09-19T11:50:07Z Insecure Spying on network connections in /tmp/trace.txt
```

Make sure to disable this trace in production and only use it for
debugging communications, as it does weaken the network security.

{{% notice note "Network traffic is still encrypted" %}}

Velociraptor uses two layers of encryption - messages between client
and server are encrypted using Velociraptor's internal PKI scheme, and
**in addition**, a HTTP over TLS connection is used to exchange those
messages.

This means that the trace file is still not really completely in plain
text - it contains the encrypted messages in among the clear text HTTP
messages.

However this should help debug issues around reverse proxies and MITM
proxies in production.

{{% /notice %}}


## New Server Functionality

### Improve granularity of flow state reporting.

In previous versions, flows could only be in the `RUNNING`, `FINISHED`
or `ERROR` states. When the user schedules a collection from an
endpoint, the collection is in the `RUNNING` state and when it is
completed it is either in the `FINISHED` or `ERROR` state.

However, this has proved to be insufficient when things go wrong,
leaving users wondering what is happening in cases where the client
crashes or reboots, or even if it becomes unresponsive. In such cases
sometimes flows remained stuck in the `RUNNING` state indefinitely, so
it is not easy for users to re-launch them.

In this release, the Velociraptor client goes through more states:

1. When the collection is initially scheduled, it is in the
   `Scheduled` state and has the icon <i class="fas fa-calendar-plus"></i>.
2. When the client checks in, the collection request is sent to the
   client, and the collection moves into the `In Progess` state <i
   class="fas fa-person-running"></i>.
3. The server will periodically check on the progress of the
   collection - if the server in unable to check for a period of time,
   the collection will now be marked as `Unresponsive` and have the <i
   class="fas fa-question"></i> icon.
4. If the client comes back online (for example after a restart), the
   server will query the client about the progress of in flight
   collections. The client can then confirm if these collections are
   not known, the collection will be marked as an `Error` with icon <i
   class="fas fa-exclamation"></i>.

Previously, the server sent all outstanding requests to the client at
the same time. This meant that if there were many hunts scheduled, all
requests were delivered immediately. If the client subsequently timed
out, crashed or disappeared from the network during execution, all
requests were lost leaving flows in the hung `RUNNING` state
indefinitely.

In this release the server only sends 2 requests simultaneously,
waiting until they complete, before sending further requests. This
means if the client reboots only the currently executing queries are
lost, and further queries will continue once the client reconnects.

{{< figure caption="Collection status show finer granularity" src="collection_states.svg" >}}

### Hunts can be tagged now.

Velociraptor enables powerful automation in everyday DFIR work. Some
users start many hunts automatically via the API or VQL queries.

Over time there can be many hunts active simultaneously, and they can
be used for multiple uses. In this release, the GUI's hunt view is
streamlined by enabling hunts to contains labels.

{{< figure caption="Hunts can now have Tags" src="hunt_tags.svg" >}}

Clicking on the hunt label in the table will automatically filter the
table for that label. Hunt Labels are a way to group large numbers of
hunts and clean up the display.

### Updated Table widget.

The Velociraptor GUI presents most data in tabular form. It is
important that tables are easy to navigate. The navigation pager is
now placed at the top of the table.


{{< figure caption="Velociraptor tables have been revamped" src="table_widget.svg" >}}

If a filter term starts with ! it will now be excluded from the rows
(i.e. a negative search term).

### Password encrypted ZIP files for VFS downloads.

Velociraptor is often used to fetch potentially malicious binaries
from endpoints for further analysis. Users can schedule a collection
from the endpoint and then download the binaries using the browser.

However, this can sometimes result in analyst workstations triggering
virus scanners or other warnings as they download potential malware.

As in previous versions, the user can set a download password in their
preferences. However, previously the password only applied to hunt or
collection exports.

{{< figure caption="Setting password for downloads globally" src="setting_password.svg" >}}

In this release, the password setting also applies to individual file
downloads such as the VFS


{{< figure caption="Downloads are password protected" src="encrypted_downloads.svg" >}}

Or the uploads tab in specific collections.

{{< figure caption="Individual file downloads can be password protected" src="single_file_downloads.svg" >}}

### Post-processing preservation artifacts

The `Windows.KapeFiles.Targets` artifact allows to collect many bulk
forensic artifacts like registry hives etc. People often use it to
collect offline collections for preservation of hosts.

Although best practice is to **also** collect parsing artifacts at the
same time, sometimes this is left out (See [Preserving Forensic
Evidence
](https://docs.velociraptor.app/training/playbooks/preservation/) for
a full discussion. It is particularly problematic when using the
offline collector to collect the `Windows.KapeFiles.Targets` artifact,
because once the collection is imported back into Velociraptor there
is no possibility or returning to the endpoint to collect other
artifacts.

In this case the user needs to parse the collected raw files (for
example collecting the `$MFT` then needing to apply `Windows.NTFS.MFT`
to parse it).

In the new release, a notebook suggestion was added to
`Windows.KapeFiles.Targets` to apply a remapping on the collection in
such as way that some regular artifacts designed to run on the live
system can work to some extent off the raw collection.

Let's examine a typical workflow. I will begin by preparing an offline
collector with the `Windows.KapeFiles.Targets` artifact configured to
collect all event logs.

{{< figure caption="Building an offline collector" src="building_offline_collector.png" >}}

Once the collection is complete I receive a ZIP file containing all
the collected files. I will now import it into Velociraptor.

{{< figure caption="Importing the offline collection" src="importing_offline_collection.svg" >}}

Since this is an offline client and not a real client, Velociraptor
will create a new client id to contain the collections.

{{< figure caption="The imported collection looks just like any other collection" src="kapefiles_collection.svg" >}}

Of course we can not schedule new collections for the client because
it is not a real client, but once imported, the offline collection
appears as just another collection in the GUI.

Suppose now I wanted to use the `Windows.Hayabusa.Rules` artifact to
triage the system according to the Hayabusa Sigma ruleset. Ordinarily,
with a connected endpoint, I would just schedule a new collection on
the endpoint and receive the triaged data in a few minutes.

However, this is not a real client since I used the offline collector
to retrieve the event logs. I can not schedule new collections on it
as easily (without preparing a new offline collector and manually
running it on the endpoint).

Instead, the `Windows.KapeFiles.Targets` artifact now offers a VQL
snippet as a notebook suggestion to post process the collection. I
access this from the collection's notebook.

{{< figure caption="Post processing the KapeFiles collection with a notebook suggestion" src="post_process_kapefiles.svg" >}}

The new cell contains some template VQL. I can modify it to run other
artifacts. In this case I will collect the `Windows.Hayabusa.Rules`
artifact with all the rules (event noisy ones) and `Windows.NTFS.MFT`
artifact.

{{< figure caption="Modifying VQL to run other artifacts" src="post_process_kapefiles_2.svg" >}}

The post processing steps added a new distinct collection to the
offline client, as if we collected it directly from the
endpoint. However, the artifacts were collected from the triage files
directly imported from the offline bundle.

{{< figure caption="A new distinct collection is added" src="post_process_kapefiles_3.svg" >}}

Although this new workflow makes it more convenient to post process
bulk file triage collections, note that this is not an ideal workflow
for a number of reasons (for example parsing event logs on systems
other than where they were written will result in a loss of some log
messages).

It is always better to collect and parse the required artifacts
directly from the endpoint (even in an offline collection) and **not**
rely on bulk file collections.

### Redesigned timelines

Timelines has been part of the Velociraptor GUI for a few releases
now. In this release we have really expanded their functionality into
a complete end to end timelining analysis tool.

The details of the new workflow are described in the [Timelines in
Velociraptor]({{% ref "/blog/2024/2024-09-12-timelines/" %}}) blog
post, but below is a screenshot to illustrate the final product - an
annotated timeline derived from analysis of multiple artifacts.

{{< figure caption="The complete timeline with annotations" src="../2024-09-12-timelines/supertimeline.svg" >}}

###  Added Timesketch integration artifacts

In addition to an enhanced built in timelining feature, this release
also features enhanced integration with `Timesketch`, a popular open
source timelining tool. The details of the integration are also
discussed in the blog post above, but here is a view of Timesketch
with some Velociraptor timelines exported.

{{< figure caption="Viewing timelines in Timesketch" src="../2024-09-12-timelines/timesketch_view.svg" >}}

### Client metadata fields can now be indexed and searched.

Velociraptor allows arbitrary key/value pairs to be added the Client
record. We call this the `Client Metadata`. Previously the metadata
could be set in the GUI but there was no way to search for it from the
main search bar.

In this release client metadata can be searched directly in the search
box. Additionally, the user can specify custom metadata fields in the
configuration file to have all clients present this information.

Consider this example. I wanted to record maintain the department that
each endpoint belongs to. I will add the following the server's
configuration file:

```yaml
defaults:
  indexed_client_metadata:
    - department
```

This tells the server to index the client metadata field
`department`. This allows the user to search all clients by
department.

Indexed metadata fields exist on all clients. Additional non-indexed
fields can be added by the user.

{{< figure caption="Client metadata fields can be indexed or free form" src="client_metadata.svg" >}}

### Enable a server artifact to specify an impersonation user.

Velociraptor's user permission system ensures that only users that are
granted certain permissions are able to carry out actions that require
these permissions. For example, to launch an external binary on the
server is a highly privileged permission (basically it gives a server
shell). So the `execve()` plugin requires a special `EXECVE`
permission to run. This is normally only given to administrators on
the server.

If a user has a lower role (e.g. `investigator`) they are not able to
shell out by calling the `execve()` VQL plugin in a notebook or a
server artifact.

While this is what we want in most cases, sometimes we want to provide
the low privileged user a mechanism for performing privileged
operations in a safe manner. For example, say we want to allow the
`investigator` user to call the `timesketch` CLI tool to upload some
timelines. It clearly would not be appropriate to allow the
`investigator` user to call **any** arbitrary programs, but it is
probably ok to allow them to call the `timesketch` program
selectively in a controlled way.

This idea is very similar to Linux's SUID or Windows's impersonation
mechanisms - both mechanisms allow a low privileged user to run a
program as another high privileged user, taking on their privileges
for the duration of the task. The program itself controls access to
the privileged commands by suitably filtering user input.

In the 0.73 release, server artifacts may specify that they will run
with an impersonated user.

Consider the following artifact:
```yaml
name: Server.Utils.StartHuntExample
type: SERVER
impersonate: admin
sources:
  - query: |
      -- This query will run with admin ACLs.
      SELECT hunt(
        description="A general hunt",
        artifacts='Generic.Client.Info')
      FROM scope()
```

This artifact launches a new hunt for the `Generic.Client.Info`
artifact. Usually a user needs the `START_HUNT` permission to actually
create a new hunt.

Ordinarily, if a user has the `COLLECT_SERVER` permission allowing
them to collect server artifacts, they will be able to start this
server artifact, but unless they **also** have the `START_HUNT`
permission they will be unable to schedule the new hunt.

With the `impersonate` field, any user that is able to start
collecting this artifact will be able to schedule a hunt.

This feature allows an administrator to carefully delegate higher
privilege tasks to users with lower roles. This makes it easier to
create users with lower levels of access and improves a least
privilege permission model.


## Conclusions

There are many more new features and bug fixes in the latest release.

If you like the new features, take [Velociraptor for a
spin](https://github.com/Velocidex/velociraptor)!  It is available
on GitHub under an open source license. As always please file issues
on the bug tracker or ask questions on our mailing list
[velociraptor-discuss@googlegroups.com](mailto:velociraptor-discuss@googlegroups.com)
. You can also chat with us directly on discord
[https://www.velocidex.com/discord](https://www.velocidex.com/discord)
.
