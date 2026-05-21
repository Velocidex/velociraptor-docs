---
title: Guidelines for artifact contributions
weight: 10
description: |
  This document provides guidance for contributing artifacts to the artifact exchange or the upstream repository.
---

Velociraptor is an open source community driven project, and as such
we accept contributions from the community. Velociraptor's VQL
language is designed to lower the bar for contributions and make it
easier for non-developers to contribute meaningful improvements in the
form of new [Artifacts](/docs/artifacts/).

Over time the number of contribution has exploded and so we have
developed some guidelines on which artifacts should be accepted into
the project and where/how they should be included.

{{% notice tip "Maintaining your own artifacts" %}}

Velociraptor's philosophy is to be as flexible as possible and be
useful in many different use cases. This means that users usually
maintain a set of custom artifacts that suite their own particular
workflows specific to their requirements.

This is fine! You are welcome to maintain your own set of
artifacts. However, to contribute back into the project we require the
artifacts to be useful to a wider community. Artifacts that handle a
very specific and unique task are probably not that useful broadly and
won't be accepted for contribution.

{{% /notice %}}

Over time we found some general patterns for many artifacts and so we
have created a set of high level artifacts to handle the common cases.

## Triage artifacts

Triage artifacts typically consist of:

1. Search for files using `glob()`
2. Collect the files using `upload()` and possibly hash the with `hash()`
3. Enrich the collection somehow (for example using `authenticode()`


This pattern is so common that we built the [The Velociraptor Triage
Artifact project](https://triage.velocidex.com/) to automatically
produce a set of such triage artifacts based on
[rules](https://triage.velocidex.com/docs/windows.triage.targets/rules/)

The advantages of centralizing these triage artifacts include:

1. Users only have one artifact to collect, instead of remembering
   hundreds of specific small artifact.
2. Rules can be grouped into larger rules so in most cases users need
   to select a few high level rules (for example `_Live` to collect all
   live system artifacts)
3. The run time of the artifact can be optimized, even when searching
   for hundreds of rules at the same time.
4. More complex techniques like [Adaptive
   Triage](/blog/2025/2025-09-28-adaptive-collections/) can be
   implemented. All rules benefit from this without having to
   implement it individually.
5. Being part of a large active project means the rules are more
   likely to be maintained going forward.

Usually if your artifact falls into the above pattern, we will direct
you to add a rule to the triage artifacts.

## Registry parsing

Parsing data in the registry is a very common goal which typically
consists of:

1. Searching the registry for keys/values.
2. Parsing the values using e.g. `parse_binary()` or simply displaying
   them.

This pattern is so common that we built the [The Registry Hunter
project](https://registry-hunter.velocidex.com/) to automatically
produce a set of such triage artifacts based on
[rules](https://registry-hunter.velocidex.com/docs/rules/)

The advantages of centralizing registry analysis include:

* Handling the registry correctly is very challenging and there are
  many edge cases. For example, when accessing the `HKEY_USERS` hive,
  only currently logged in users will have their hive mounted
  there. The Registry Hunter automatically handles these cases by
  mounting the raw hives into the a remapping configuration.
* More complex techniques like [Adaptive
  Triage](/blog/2025/2025-09-28-adaptive-collections/) can be
  implemented. All rules benefit from this without having to implement
  it individually.

Usually if your artifact falls into the above pattern, we will direct
you to add a rule to the registry hunter.

## Parsing browser or OS artifacts

This is a common use case, which originally focused on SQLite files,
but can now handle many more file formats:

1. Search for files using a `glob()`
2. When a file is found, run a test on it to determine if the rule
   should match. For SQLite files, we can check for the presence of
   expected tables or schema.
3. Parse the file - with SQLite files this may consist of running a
   SQL query.
4. Enrich and manipulate the results using VQL

The advantages of centralizing SQLite analysis:

* The user simply collects one artifact on the endpoint, specifying
  some broad constraints (like categories of the rule). Velociraptor
  will then automatically find and parse all the SQLite files it
  finds.

* Handle hundreds of files from different applications. For example,
  many browsers are related to Chromium but have chosen a different
  location for their files. The SQLite hunter will automatically
  search for such Chromium derived browsers in multiple locations.

Usually if your artifact falls into the above pattern, we will direct
you to add a rule to the SQLite Hunter.


## Where should I contribute my artifact?

Velociraptor comes with a large number of built in artifacts ready to
use when installed. This makes it convenient because they are already
built in. However, there are hundreds of artifacts available on the
[Artifact Exchange](/exchange/).

The main distinction between the two sources is around quality and
maintainability:

1. Artifacts which are built into Velociraptor are useful to most
   people and are extensively tested using [automated
   tests](https://github.com/Velocidex/velociraptor/tree/master/artifacts/testdata/server/testcases). If
   you wish to contribute into the built in set you should also
   include tests. These tests ensure that the artifacts are less
   likely to fail in future and help maintain them in future releases.

2. The [Artifact Exchange](/exchange/) contains many artifacts that
   were useful at one time but may have not been updated in a
   while. This may generally be of lower quality and may even break
   (and since they do not contain tests, we may not know they are
   broken).

For example, good candidates for the Exchange are artifacts that hunt
for specific topical threats which may not be more widely useful in
general (for example `Log4J`)

We plan on reviewing the artifacts in the Exchange periodically and
removing outdated artifacts.


## Tips for writing better VQL

* Use the [artifact verifier](/docs/cli/artifacts/#-artifacts-verify-)
  command to verify your artifact. This runs a static analysis of the
  artifact's VQL to ensure there are not major issues. I can also make
  some suggestions. When you submit your artifact, the CI pipeline
  will run the verifier on your artifact automatically and fail if the
  artifact does not pass.
