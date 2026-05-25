---
title: Guidelines for artifact contributions
weight: 10
last_reviewed: 2026-05-09
summary: |
  This document provides guidance for contributing artifacts to the
  main Velociraptor project and related projects.
description: |
  This document provides guidance for contributing artifacts to the
  main Velociraptor project and related projects.
---

Velociraptor is an open source community-driven project, and as such
we welcome contributions from the community. Velociraptor's VQL
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

This is fine! You are welcome to maintain your own set of artifacts.
However, to contribute back into the project we require the artifacts
to be useful to the broader Velociraptor community. Artifacts that
handle a very specific or unique task are probably not that useful
broadly and are unlikely to be accepted as Exchange contributions. On
the other hand, if your artifact demonstrates a solution to an
interesting/novel use case that others can learn from then it may be
accepted on that basis.

If you're considering making a contribution and you're not sure about
it, then please chat to us on [Discord](/discord/) first, and we'll do
our best to point you in the right direction and avoid wasting your
efforts.

{{% /notice %}}

Over time we found some general patterns for many artifacts and so we
have created a set of high level artifacts to handle the common cases.

## Triage artifacts

Triage artifacts typically consist of:

1. Search for files using `glob()`
2. Collect the files using `upload()` and possibly hash the with `hash()`
3. Enrich the collection somehow (for example using `authenticode()`


This pattern is so common that we built the
[The Velociraptor Triage Artifact project](https://triage.velocidex.com/)
to automatically produce a set of such triage artifacts based on
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
you to add a rule to the
[Triage Artifacts](https://github.com/Velocidex/velociraptor-triage-collector)
project.

## Registry parsing artifacts

Parsing data in the registry is a very common goal which typically
consists of:

1. Searching the registry for keys/values.
2. Parsing the values using e.g. `parse_binary()` or simply displaying
   them.

This pattern is so common that we built the
[The Registry Hunter project](https://registry-hunter.velocidex.com/)
to automatically produce a set of such triage artifacts based on
[rules](https://registry-hunter.velocidex.com/docs/rules/)

The advantages of centralizing registry analysis include:

* Handling the registry correctly is very challenging and there are
  many edge cases. For example, when accessing the `HKEY_USERS` hive,
  only currently logged in users will have their hive mounted
  there. The Registry Hunter automatically handles these cases by
  mounting the raw hives into the a remapping configuration.
* More complex techniques like
  [Adaptive Triage](/blog/2025/2025-09-28-adaptive-collections/)
  can be implemented. All rules benefit from this without having to
  implement it individually.

Usually if your artifact falls into the above pattern, we will direct
you to add a rule to the Registry Hunter project.

## Artifacts targeting web browsers and OS-related database files

This is a common use case, which originally focused on SQLite files,
but which can now handle many more file formats (e.g. `leveldb` and
`ese`):

1. Search for files using a `glob()`
2. When a file is found, run a test on it to determine if the rule
   should match. For SQLite files, we can check for the presence of
   expected tables or schema.
3. Parse the file - with SQLite files this may consist of running a
   SQL query.
4. Enrich and manipulate the results using VQL.

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
you to add a rule to the
[SQLiteHunter project](https://github.com/Velocidex/SQLiteHunter).

## Sigma rule-based detection

In addition to the projects described above, we also maintain curated
Sigma rules for Windows, Linux and macOS, sourced from other excellent
open source projects. These are maintained in our
[Sigma Rules](https://github.com/Velocidex/velociraptor-sigma-rules)
project.

Often a specific detection is easiest to implement as a Sigma rule
rather than writing a dedicated artifact for it. In such cases you
could consider making your contribution in the form of a Sigma rule to
our Sigma Rules project.


## Where should I contribute my artifact?

Velociraptor comes with a large number of built in artifacts ready to
use when installed. This makes it convenient because they are already
built in. However, there are also hundreds of artifacts available on
the [Artifact Exchange](/exchange/).

The main distinction between the two sources is around quality and
maintainability:

1. Artifacts which are built into Velociraptor are useful to most
   people and are extensively tested using
   [automated tests](https://github.com/Velocidex/velociraptor/tree/master/artifacts/testdata/server/testcases).
   If you wish to contribute to the built-in set you should also
   include tests. These tests ensure that the artifacts are less
   likely to fail in future and help maintain them in future releases.

2. The [Artifact Exchange](/exchange/) contains many artifacts that
   were useful at one time but have not been updated in a while. These
   artifacts have no quality assurance and may even do nothing or
   break. Since they do not have associated CI tests we may not know
   they are broken unless someone reports it. Furthermore, many of
   these artifacts provide integration with 3rd-party systems which we
   don't have access to, which means we can't verify reported issues
   or create CI tests for such artifacts. If you encounter issues with
   an exchange artifact your best bet is to try fix it yourself (and
   hopefully then contribute the fixed version back to the exchange)
   or else try to contact the original author for assistance.

   Good candidates for the Exchange are artifacts that hunt for
   specific topical threats which may not be more widely useful in
   general (for example the `Log4J` vulnerability which is now widely
   patched and therefore less likely to be detected).

   The artifact exchange is also a good place for artifacts that
   demonstrate a unique or reusable solution to a general class of
   problem. For example, we have artifacts that demonstrate how to
   interact with various types of external APIs, including LLMs.


We do also plan on reviewing the artifacts in the Exchange
periodically and removing outdated artifacts. Very useful Exchange
artifacts may be graduated to become built-ins if suitable tests can
be devised that can assure their ongoing reliability.

## Artifact Exchange Contributions

Exchange artifacts are currently stored in our
[documentation repo](https://github.com/Velocidex/velociraptor-docs).

To submit your artifact for consideration, you follow basically the
same process as for a documentation contribution, as described
[here](/dev/dev-server/#2-create-a-fork-of-the-velociraptor-docs-repo-and-clone-it-locally)
except that you're just adding your YAML file into
`velociraptor-docs/content/exchange/artifacts`
so you don't need Hugo or any of the steps related to that.


## Tips for writing better artifacts

* Use the [artifact verifier](/docs/cli/artifacts/#-artifacts-verify-)
  command to verify your artifact. This runs a static analysis of the
  artifact's VQL to ensure there are not major issues. It can also
  make some suggestions. When you submit your artifact, the CI
  pipeline will run the verifier on your artifact automatically and
  fail if the artifact does not pass.

  The verifier can also be run via the `Server.Utils.ArtifactVerifier`
  server artifact, if you prefer using the GUI.

* We recommend that you author artifacts using the built-in editor to
  benefit from it's VQL-aware tools and automatic validation. If you
  prefer to write your artifact in an external editor then it's
  worthwhile to also paste it into the GUI's artifact editor and save
  it to trigger the validation step. The built-in editor also provides
  a VQL formatter (via the "Reformat VQL" button at the lower right of
  the screen while editing an artifact) and we recommend you use it as
  it ensures that the VQL is formatted consistently across artifacts.

* Good artifact descriptions are essential so that others can
  understand exactly what it does and how to use it, without them
  needing to understand the VQL. We provide some advice
  [here](/docs/artifacts/tips/#tips-for-creating-better-artifacts) on
  aspects to consider that can make your artifact description more
  helpful to other users.
