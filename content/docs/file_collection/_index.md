---
title: "Bulk File Collection"
date: 2021-06-27T04:31:24Z
last_reviewed: 2025-10-28
draft: false
weight: 50
aliases:
  - "/docs/offline_triage/"
---

In this section we look at some features that Velociraptor offers which support
bulk file collection.



### Triage, Velociraptor Collections and File Acquisition

In the DFIR world **"triage"** refers to the process of collecting _information_
about an endpoint in order to assess and rank its relevance to an incident,
particularly in high-pressure situations where time is critical. Usually this is
the first phase of an investigation, and is done for the purpose of identifying
affected systems and scoping an incident. In other words, triage with
Velociraptor is really just [hunting]({{< ref "/docs/hunting/" >}}) done with
specific constraints and objectives in mind.

There are many DFIR tools that collect files, or to use an alternative term:
perform _file acquisition_. Such tools are often used to do a bulk collection of
files as a first step in the triage process, with subsequent steps being done on
a centralized server or disconnected system, using those files as the main data
source.

This is done for two distinct reasons:
1. To preserve forensic evidence.
2. To allow for forensic analysis on a separate system, i.e. not the original
   computer.

The distinction between these 2 goals is often blurred in the typical forensic
workflow, especially when it involves systems that centralize the
parsing/extraction of data from files.

Tools that are designed around the centralized file processing concept often use
the term "collection" to simply mean file acquisition, with this action serving
both of the abovementioned goals as if they were just one. This conflation of
goals is compounded by the fact that traditional forensic methodologies
emphasize preservation of evidence and working exclusively on file copies (often
captured in the form of disk images), since investigations of yesteryear
frequently had the aim of litigation. While these considerations are certainly
still applicable in some investigations, the majority of modern incidents do not
have litigation as their end goal and frequently need to scale to an extent that
makes bulk file collection and centralized processing highly impractical, and
indeed contrary to the goal of rapid incident response and resolution.

Consequently many forensic practitioners tend to equate the term "triage" with
bulk file collection, in contrast to the even slower process of full disk
acquisition. New users to Velociraptor - especially those who have prior
experience with solutions that centralize file processing - often don't
recognize this distinction and therefore want to use Velociraptor clients (and
offline collectors) to collect files and analyze/query them later. This is not
how Velociraptor is intended to work and we'll explain more about that below.

While Velociraptor can be used for both of the abovementioned goals, one of its
key strengths is in distributing the processing workload by performing analysis
on the endpoints themselves. This allows Velociraptor to scale far more easily
than any centralized processing solution can, since we scale horizontally by
leveraging the processing power of each endpoint. In addition to utilizing the
combined resources of all endpoints, the live endpoints also provide far richer
sources of data than one can get from isolated "collected" files or disk images.

In Velociraptor we run VQL queries on the endpoint. These queries can use data
from files or other non-volatile sources, as well as system APIs and volatile
sources. Data from multiple sources can be combined to provide information that
is richer than can be obtained from files alone. For example when we parse
Windows event logs on a live system we also have access to the corresponding
event messages that we extract from DLLs that are referenced via the Windows
registry API.

Queries are written in VQL (Velociraptor Query Language) and packaged in a YAML
data structure that we call an [artifact]({{< ref "/docs/artifacts/" >}}) which
is then "collected" on a target computer (endpoint), and we call the process of
running an artifact "a collection". VQL queries can copy files, amongst many
other possible actions. Notice that we use the terms **"collection"** and
**"collected"** regardless of whether any files were copied from the target
system.

Most collections run on clients but we also run collections on the Velociraptor
server itself to perform server-side actions.

A Velociraptor collection can consist of:
- data extracted from the endpoint (for example parsed from files or queried
  from system APIs)
- copied files (sometimes called "uploads")
- both of the above.

_It's important to understand that Velociraptor collections do not necessarily
involve file acquisition._

In other words, with Velociraptor it is possible (and normal) to perform triage
without copying files. You may choose to _also_ copy files as part of your
Velociraptor collections, but generally you should only do that for the explicit
goal of [preserving evidence]({{< ref "/training/playbooks/preservation/" >}}).

While it is possible to work with file copies and disk images in a centralized
manner (and that may even necessary under certain circumstances!), you
should take advantage of Velociraptor's scalable decentralized design. Avoid
copying files unless you are doing it for the #1 reason stated above: preserving
evidence. And in that case copy the files _in addition to_ running your
queries. For example, if you are looking for specific events in the Windows
Security event log then run queries against the live system to find those events
_and_ then copy the evtx file if the events are found. It is much easier to do
both rather than just copying the file and hoping to be able to run queries
against it later.









In summary, it's important to recognize that there are distinct reasons for file
acquisition. In Velociraptor file acquisition is done primarily for the purpose
of preserving evidence, since Velociraptor is not designed to be a centralized
file processing solution. Centralized processing can be done but it's more
complicated than just quering the data directly on the endpoint. If you want to
preserve evidence by copying a file from an endpoint then do it _in addition_ to
quering the data on the endpoint. As a concrete example, if you parse evtx files
on the endpoint this barely takes longer than copying the files from the
endpoint, and you then have the parsed data which you can work with. If you also
want the evtx files then you can copy them too, but it wouldn't make much sense
to do so because you already have the data that they contain.



### Collecting files

Being able to efficiently and quickly collect and preserve evidence is
important for being able to capture machine state at a point in
time. It is also useful to be able to use these collected files with
other forensic tools that might be able to handle the file formats
involved.

One of the most commonly used artifact is the
`Windows.KapeFiles.Targets` artifact. This artifact is automatically
built from the open source
[KapeFiles](https://github.com/EricZimmerman/KapeFiles) repository.

While originally developed to support the non-opensource Kape tool,
this repository contains many types of files which might be relevant
to collect in a triage scenario. Each Kape "Target" is essentially a
glob expression with a name.

In Velociraptor `Windows.KapeFiles.Targets` is the most popular
artifact for mass file collection.  It does no analysis but simply
collects a bunch of files based on the targets specified.

Start by selecting the artifact from the "New Collection" wizard

![The Windows.KapeFiles.Targets artifact](image2.png)

Next we need to select the "Targets" in the "Configure Parameters"
step. Many targets are simply collections of other targets. For
example the `_BasicCollection` target automatically includes a number
of other useful targets.

![Selecting recursive targets](image7.png)

The `Windows.KapeFiles.Targets` artifact can transfer a large quantity
of data from the endpoints, and take a long time to run. We therefore
often need to update the resource control of the collection.

![Specifying a maximum upload limit](image6.png)

Once the collection is launched, we can monitor progress in the "Artifact Collection" tab.

![Monitoring collection progress](image4.png)

{{% notice note "Note about large file collections" %}}

Velociraptor is very careful about the performance and resource impact
on endpoints. When collecting many files if it is often hard to
determine in advance how much data will be collected or how long it
will take. For safety, Velociraptor allows limits to be set after
which the collection is cancelled. You can also interactively cancel
the collection by clicking the "Stop" button.

Be aware that a lot of data can be collected which might fill up the
VM disk.

> Math is a harsh mistress:
> Collecting 100Mb  from 10,000 endpoints = 1Tb
>
> Note that typically $MFT is around 300-400Mb so collecting the $MFT
> from many endpoints is going to be huge!

![Collections are automatically cancelled when they reach the limit](image5.png)

{{% /notice %}}

