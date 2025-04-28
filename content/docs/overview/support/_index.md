---
menutitle: "Support Policy"
title: "The Velociraptor Support Policy"
weight: 10
draft: false
---

While Velociraptor is an open source project, we do take the security
and stability of the project very seriously.

This page sets out our policy for ongoing support and our testing
regime. This should help to set expectations of what features and
specific configurations are supported by the core Velociraptor team.

Ultimately, Velociraptor is an open source project maintained and run
by the community. We depend on bug reports and testing by the
community to support and maintain the project. If you find a bug or a
feature which does not work quite as expected, please file an issue on
[our GitHub Issue
Tracker](https://github.com/Velocidex/velociraptor/issues) with steps
to help us reproduce it!

## The Release process

Velociraptor release numbers follow [semantic versioning](https://semver.org/)
(e.g. 0.74.1). Currently our major version is 0, meaning that we do not
consider the public API to be stable in relation to interoperability
with older or future versions.

Our development occurs against the GitHub master branch and
periodically we prepare a new release by following this process:

1. A release branch is prepared from master with a name reflecting the
   release number (e.g. v0.74-release)
2. No more new features are committed to this branch - it is in
   feature freeze.
3. A release candidate (RC) is prepared and binaries for our supported
   operating systems are published to GitHub
4. The RC remains in pre-release for a minimum of 2 weeks while we
   receive feedback from the community. We encourage everyone to test
   the RC on their infrastructure in order to flag any issue that
   should be addressed before the main release.
5. Once a release is qualified, we create a final build and release at
   that version.

If bugs are identified after the release that are deemed critical, we
may back port these bugs to the last release branch and make a revised
patched release at that version (e.g. v0.73.2). We generally do not
update any previous releases older than the current release.


## Client and Server versioning

Velociraptor has two major components, the client and server. Clients
are typically deployed widely across a large number of endpoints, and
are sometimes difficult to upgrade in a timely manner. Nevertheless,
we highly recommend that client versions are kept up to date since any
bug fixes and new features become available with later versions.

The Velociraptor team only tests compatible versions of client and
server thoroughly (in our CI pipeline). The most supported
configuration is when the client and server versions match exactly
(e.g. a 0.74.1 server communicating with a 0.74.1 client).

Nevertheless we do attempt to achieve compatibility between the latest
version of the server and recent clients, however this is done on a
best effort basis. Usually compatibility issues surface in the
following ways:

1. The newer server may contain artifacts that reference functionality
   not present in the older clients - therefore they are unable to
   collect those specific artifacts.
2. The newer server may use existing functionality in a way that is
   not compatible with older clients (e.g. a new parameter to a plugin
   used by a new artifact version). There may be possible workarounds
   as advised by the Velociraptor team, so please seek advice if you
   need to collect these artifacts with older clients. (e.g. sometimes
   by manually modifying the VQL it is possible to achieve
   compatibility with older clients).
3. Something has changed with the way the communication between client
   and server is implemented and the newer server is completely unable
   to communicate with the older clients at all. This condition is
   rare and we actively try to avoid it, but may happen if the version
   mismatch between client and server is too great.

Typically client/server communication is stable to the point where at
least we can issue a remote upgrade for the client (i.e. run the
Admin.Client.Upgrade artifact or similar), so an upgrade path is
possible for clients.

To summarize the main takeaway from this section:

* While it is not completely unsupported, generally mixing client and
  server versions is possible and a fact of life in most
  deployments. This deployment scenario is not ideal and may not work
  completely out of the box in all cases - there may need to be some
  tweaking required (e.g. copy older artifacts or rewrite VQL using
  only older features).

* When reporting bugs, we will generally suggest upgrading clients and
  servers to the latest release. The Velociraptor team may
  de-prioritize reports for older versions of issues that may have
  already been addressed.

Ultimately, upgrading the clients is usually the recommended approach
initially.


## Server Upgrades

The Velociraptor server may be upgraded by keeping the same server
configuration file, and data store as the previous version. We
generally ensure that suitable migration code is run on upgrades on a
best effort basis. See [server upgrades documentation]({{<ref "/docs/deployment/server/#server-upgrades" >}}).

The release notes may indicate additional caveats or steps that need
to be taken during the upgrade.

We do not guarantee that all data will be accurately migrated from
older versions (especially very old versions), however we do not
generally delete the older data on migration. For example, if the
schema for certain data has changed we will attempt to migrate from
the old schema to the new schema but do not guarantee that the old
data remains accessible in the new GUI. The old data remains however
in its original raw file format.

As the configuration file evolves over time, we attempt to
transparently upgrade the configuration file when possible. We
recommend a manual review of the upgraded configuration file after an
upgrade as well. The release notes may indicate manual changes to the
configuration that may be needed.

We generally recommend upgrading one release at the time to be
conservative. Although it is possible to skip a few releases the
migration path may not be as well tested.

## Continuous integration and testing

Velociraptor has a continuous integration pipeline (CI), building
binaries at each commit point (and performing extensive
testing). These binaries are considered experimental and for testing
purposes only. You can download these binaries in order to try out a
new feature or patch a bug.

If a reported bug is deemed low priority and only affecting fewer
users, we may suggest to use the CI binaries as a temporary workaround
until the next release is available (or to help us test the bug
fix). See [Getting the latest
version](https://github.com/Velocidex/velociraptor#getting-the-latest-version)
for instructions on downloading these binaries.

You may choose to run a binary release in the master branch or (if
available) a back-ported bugfix into one of the release branches. Note
that release branches do not receive new features, but may still
receive bugfixes for critical bugs.

## Supported configurations

Velociraptor is a very flexible tool and may be configured in many
different ways to suit many different use cases. The Velociraptor team
is very interested in learning about novel use cases, but we can not
guarantee that unusual configurations work out of the box.

We generally support the configuration and deployment guides described
on the Velociraptor [documentation
site](https://docs.velociraptor.app/) only. Any deviations from these
configurations are not guaranteed to work, but you may work with us to
include them in the next release, or open a feature request on [our
issue tracker](https://github.com/Velocidex/velociraptor/issues).


## Support channels

As an open source project, the community is our greatest resource!
Many of us hang on the [discord
channel](https://docs.velociraptor.app/discord/), and are all too
happy to help.

We also have a mailing list velociraptor-discuss@googlegroups.com that
can be accessed or subscribed to on [Google
Groups](https://groups.google.com/g/velociraptor-discuss).
