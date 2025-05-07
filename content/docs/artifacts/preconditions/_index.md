---
menutitle: "Preconditions"
title: "Artifact Preconditions"
date: 2025-01-25
draft: false
weight: 30
summary: "Preconditions and how they work"
last_reviewed: 2025-04-30
---

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

<!-- ## Preconditions

A precondition is a query that will run before the main
collection. If the precondition returns any rows then it is deemed
to be TRUE and therefore the main query will be run. Otherwise, the
request will be ignored by the client. Preconditions allow one to
control execution of the artifact so it is safe to collect it on a
wider group of systems (e.g. Linux only artifacts may safely collect
on windows but will do nothing at all).

Artifacts have two places where preconditions may be
defined. Preconditions may be defined at the top level, in which
case they apply to all sources. However preconditions may also be
defined on each source, in this case the source will not be
collected unless the precondition is true.

Consider the following artifact:

```yaml
name: MultiSourceSerialMode
sources:
- name: Source1
precondition: SELECT * FROM info() WHERE OS = "linux"
query: |
	LET X <= SELECT ....
	SELECT ...
- name: Source2
precondition: SELECT * FROM info() WHERE OS = "windows"
query: |
	SELECT * FROM X
```

Source1 will only run on Linux systems, and Source2 on Windows
systems. Therefore it is impossible to share scope between the two
sources since Source2 can never see the variable X defined by
Source1.

Therefore when preconditions are defined at the source level, the
artifact will be collected in "Parallel Mode", implying each source
has its own scope.

## Summary

The following rules summarise if the artifact is collected in
parallel mode (i.e. sources in separate requests) or Serial Mode
(i.e. all sources in the same request).

* Event artifacts:                  Parallel Mode
* No preconditions:                 Serial Mode
* Precondition at the top level:    Serial Mode
* Precondition at source level:     Parallel Mode -->

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
