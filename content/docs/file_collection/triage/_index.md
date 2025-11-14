---
title: "Triage file collections"
menutitle: "Triage collections"
date: 2025-11-01
last_reviewed: 2025-11-01
draft: true
weight: 5
---

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
file processing solution. Centralized processing can be done but it's
significantly more complicated than just parsing and querying the data directly
on the endpoint.

Key takeaways:

- If you want to preserve evidence by copying a file from an endpoint then do it
  _in addition to querying the data_ on the endpoint. As a concrete example, if
  you parse evtx files on the endpoint this barely takes longer than copying the
  files from the endpoint, and you then have the parsed data which you can work
  with. If you also want the evtx files then you can copy them too, but since
  you already have the parsed data that they contain this would only be
  necessary _for preservation purposes_.
- If you're working on an investigation where full disk images are required for
  evidence preservation then do that _in addition to investigating the endpoint
  with Velociraptor._ As mentioned above, a live endpoint is a far richer source
  of information than a dead disk image. Velociraptor has capabilities for
  working with disk images, but you should only be working from a disk image
  when the endpoint is no longer available. Ideally you should use Velociraptor
  to perform triage on an endpoint and let that guide your decision-making about
  whether or not to create a disk image.


If you ..., take [Velociraptor for a
spin](https://github.com/Velocidex/velociraptor)!  It is available on
GitHub under an open source license. As always please file issues on
the bug tracker or ask questions on our mailing list
[velociraptor-discuss@googlegroups.com](mailto:velociraptor-discuss@googlegroups.com)
. You can also chat with us directly on discord
[https://www.velocidex.com/discord](https://www.velocidex.com/discord)
.
