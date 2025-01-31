---
menutitle: "Preconditions"
title: "Artifact Preconditions"
date: 2025-01-25
draft: false
weight: 30
---

This section will cover artifact preconditions.

## How preconditions are evaluated

## Preconditions effect on execution sequence

## Preconditions when calling other artifacts


## Preconditions and source queries

A precondition is a query that is run before collecting the artifact
to determine if the artifact should be collected at all. The
precondition makes it safe to collect artifacts without needing to
worry about if the artifact is designed for this particular
architecture or operating system. For example, performing a hunt for a
Windows only artifact is safe to target all clients because Linux
clients will just ignore it and return no rows. Most preconditions
target specific operating systems or architectures but the precondition
can be an arbitrary query.

You can specify a precondition at the top level of the artifact or at
each source:

* For a top level precondition, after testing for the precondition,
  the queries from each source are run in series within the same query
  scope. This means you can define a VQL variable in an earlier source
  and use it in another source.
* If the precondition is specified at the source level, the VQL engine
  has no idea if any particular source will be use or not. Therefore
  the engine treats each source as an independent query within its own
  scope. Since sources are independent they will run in parallel and
  any VQL variable defined in one source will not be visible to other
  sources.
