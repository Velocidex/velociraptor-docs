---
menutitle: Upgrades
title: Server Upgrades
draft: false
weight: 50
date: 2025-02-27
last reviewed: 2025-04-26
summary: "How to upgrade your server."
---


## Server upgrades

To upgrade the Velociraptor server to a new version, simply download
the latest release binary from the [GitHub Release
Page](https://github.com/Velocidex/velociraptor/releases) and
regenerate a new debian package as described above, but using the
existing configuration file.

{{% notice note "Backing up your configuration file" %}}

The configuration file contains cryptographic keys that allow clients
and server to communicate. Each time the configuration is regenerated
(e.g. using `velociraptor config generate`), new keys are created.

It is imperative to backup the configuration file somewhere safe
(perhaps offline) and re-use the same file when upgrading to a new
version of Velociraptor in order to preserve the key material and
maintain client communication.

{{% /notice %}}

From time to time, the schema of the configuration file may evolve
with newer versions. When a newer versions of Velociraptor encounters
an older configuration file, it attempts to upgrade the configuration
file to the latest version. This happens automatically and it is
usually a seamless process.

During the debian package preparation the upgraded file is embedded
into the server package so you will receive an upgraded configuration
file installed to the `/etc/` directory. You can see the version that
wrote the configuration file in the `version` part of the
configuration file.

{{% notice tip "Upgrading servers" %}}

If you wanted to completely change the way the server is configured by
regenerating the config file (e.g. if you need to switch from self
signed to autocert server) you may need to stand up a completely new
server (with a different DNS name, certificates, keys etc).

You can still use the old server in order to push the new MSI to
existing clients, but as the new MSI is installed, the new client
config file overwrites the old one and the new velociraptor client
will connect to the new server.

This method allows the orderly migration of Velociraptor clients from
an old server to a new server by simply user remote upgrade.

{{% /notice %}}

### Reverting versions

It is generally ok to revert from later versions to earlier versions
since the migration process is generally non destructive.
