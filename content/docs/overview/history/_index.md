---
title: "History"
date: 2021-06-09T03:51:18Z
draft: false
weight: 1
---

Velociraptor draws its inspiration from two major open source projects:

* Google Rapid Response:  https://github.com/google/grr
* OSQuery: https://github.com/osquery/osquery


If you used either of these projects you might wonder how Velociraptor compares to the work that was done before
it.

Let's look at the major design differences and priorities of Velociraptor, GRR, and OSQuery.


### Velociraptor vs Google Rapid Response

Google's Rapid Response (GRR) launched in 2011, and was one of the first tools to allow hunting for forensic artifacts at scale. 
GRR allowed investigators to quickly query network hosts to check files or registry settings. Rather than passively analyse logs that after they were collected into a central location, GRR allowed security professionals to proactively search for evidence of compromise
across many hosts.

One of the challenges of remotely accessing machines at scale is
that many endpoints are not online when investigators need to
access them. GRR allows for "Flows" to be scheduled in advance so that evidence is automatically collected
when the endpoint comes back online.

GRR and Velociraptor both refer to the process of simultaneously collecting the same file or registry key from
many machines as a "hunt".

Velociraptor also provides asynchronous
collection of "artifacts" from multiple hosts in a similar way. However, Velociraptor artifacts do more than collect
files or registry keys. Velociraptor can perform
sophisticated analysis on the endpoint to surface novel adversary
techniques and detect malicious activity quickly and with precision.

Another aspect where Velociraptor differs from GRR is in it's ease of
use and deployment. While GRR requires a complex deployment with many
moving parts, Velociraptor is a single statically compiled executable
written in Go. Velociraptor is also much faster than GRR and has a
much lower memory/CPU footprint on the endpoint. A single
Velociraptor server can handle over 10,000 endpoint network easily,
and can be installed in a few minutes on modest hardware.

GRR primarily collects files and registry keys from the endpoint, with
minimal parsing capability on the endpoint, preferring instead of
parse files on the server. Velociraptor's philosophy is to push as
much of the parsing and analysis to the endpoint as
possible. Velociraptor contains many powerful forensic analysis modules
on the endpoint, and uses a powerful query language allowing new parsers to
be written. This allows endpoints
to send only the most relevant results and reduces 
unnecessary parsing on the server.

### Velociraptor vs OSQuery

OSQuery was really the first popular example of an open source tool
that provided a query langauge to allow querying the endpoints. This
capability allows users to target specific queries in a flexible way
to address new threats or find new IOCs, making it a popular choice
among defenders.

The main limitation with OSQuery is that it uses SQL, a language that is designed for databases and not to query dynamic
endpoint state. There are limitations in SQL expressions that impact its ability to build concise and flexible
queries. While simple SQL is easy for beginners to learn, more
sophisticated queries use SQL contracts that are a pretty complex, such as JOIN operators.

Velociraptor's VQL also allows users to flexibly
write new queries to gather new evidence onthe endpoint. However, VQL
is deliberately kept very simple, yet powerfully expressive.

Additionally, OSQuery suffers from performance issues. Finding files using queries against the "file" table are notoriously
expensive. Velociraptor is typically much faster than OSQuery and
uses much less memory.

Finally, OSQuery by itself is not sufficient to monitor a large network
since OSQuery does not include any kind of client/server orchestration
or GUI. A complete solution requires users to install another tool (such as [FleetDM](https://github.com/fleetdm/fleet)) to use
OSQuery, increasing complexity and management overhead.
