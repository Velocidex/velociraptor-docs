---
title: "History"
date: 2021-06-09T03:51:18Z
draft: false
weight: 1
---

Velociraptor draws its inspiration from two major open source projects:

* GRR  https://github.com/google/grr
* OSQuery https://github.com/osquery/osquery


If you have previously used one of these projects you might be
wondering how Velociraptor compares to the work that was done before
it?

Let's compare, at a high level, some of the major design differences
and priorities between Velociraptor and GRR or OSQuery to help explain
the rationale for Velociraptor's design.


### Velociraptor vs GRR

One of the earliest tools that allowed hunting for forensic artifacts
at scale was Google's Rapid Response (GRR) launched around 2011. GRR
really set the stage for proactive hunting at scale - allowing
investigators to quickly reach out across the network at hosts and
check files or registry settings at ease. Rather than passively
analyse logs that were collected into a central location, GRR allows
security professionals to proactive search for evidence of compromise
across many hosts.

One of the challenges with remotely accessing machines at scale is
that many endpoints are not online at the time investigators need to
access them. GRR allows for "Flows" to be scheduled in advance, so
when the end point comes back online, they are able to be collected.

Similarly being able to collect the same file or registry key from
many machines at the same time efficiently, is termed a "Hunt" in GRR
terminology.

Velociraptor draws from this experience and also provides asynchronous
collection of "Artifacts" from multiple hosts in a similar way. As we
will see below, Velociraptor artifacts are not limited to simply
collecting files or registry keys! Velociraptor can perform
sophisticated analysis on the endpoint to surface novel adversary
techniques and detect malicious activity quickly and with precision.

Another aspect where Velociraptor differs from GRR is in it's ease of
use and deployment. While GRR requires a complex deployment with many
moving parts, Velociraptor is a single statically compiled executable
written in Go. Velociraptor is also much faster than GRR and has a
much lower memory/CPU footprint on the endpoint. Typically a single
Velociraptor server can handle over 10,000 endpoint network easily,
and can be installed in a few minutes on modest hardware.

GRR primarily collects files and registry keys from the endpoint, with
minimal parsing capability on the endpoint, preferring instead of
parse files on the server. Velociraptor's philosophy is to push as
much of the parsing and analysis to the endpoint as
possible. Velociraptor contains many powerful forenic analysis modules
on the endpoint, and a powerful query language allowing new parsers to
be written. This allows for much larger scalability, as endpoints
simply send back the results of interest rather than having to perform
a lot of parsing on the server. Therefore Velociraptor is typically
much more scalable than GRR.

### Velociraptor vs OSQuery

OSQuery was really the first popular example of an opensource tool
that provided a query langauge to allow querying the endpoints. This
capability allows users to target specific queries in a flexible way
to address new threats or find new IOCs, making it a popular choice
among defenders.

The main limitation with OSQuery is that OSQuery uses SQL as the query
langauge. Since SQL is designed for databases and not to query dynamic
endpoint state, there are a number of shortfalls in the experssiveness
of the langauge and its ability to build concise and flexible
queries. While simple SQL is easy for beginners to learn, more
sophisticated queries use SQL constracts that are a pretty complex
(e.g. JOIN operators).

Velociraptor's VQL serves a similar role - it allows users to flexibly
write new queries to gather new evidence onthe endpoint. However, VQL
is deliberately kept very simple, yet powerfully expressive.

Additionally OSQuery suffers from performance issues (for example
finding files using queries against the "file" table are notoriously
expensive). Velociraptor is typically much faster than OSQuery and
uses much less memory.

Finally OSQuery by itself is not sufficient to monitor a large network
since OSQuery does not include any kind of client/server orchestration
or GUI. A complete solution requires users to install another tool
(e.g. [FleetDM](https://github.com/fleetdm/fleet) to make use of
OSQuery in practice, increasing complexity and management overheads.
