---
title: "VQL"
date: 2021-06-11T05:55:46Z
draft: false
weight: 25
---

VQL is central to the design and functionality of Velociraptor, and a solid grasp of VQL is critical to understanding and extending Velociraptor.


## Why a new query language?

The need for a query language arose from our experience of previous
Digital Forensic and Incident Response (DFIR) frameworks. Endpoint analysis tools must be
flexible enough to adapt to new indicators of compromise (IOCs) and protect against new
threats. While it is always possible to develop new capability in
code, it's not always easy or quick to deploy a new version.

A query language can accelerate the time it takes to discover an IOC, design a rule to detect it, and then deploy the detection at scale across
a large number of hosts. Using VQL, a DFIR investigator can
learn of a new type of indicator, write relevant VQL queries,
package them in an artifact, and hunt for the artifact across the
entire deployment in a matter of minutes.

Additionally, VQL artifacts can be shared with the community and
facilitate a DFIR-specific knowledge exchange of
indicators and detection techniques.


{{% children %}}
