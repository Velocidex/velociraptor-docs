---
menutitle: Upgrades
title: Server Upgrades
draft: false
weight: 50
date: 2025-02-27
last reviewed: 2025-04-27
summary: "How to upgrade your server."
---

Upgrading the server component is usually a simple matter of creating a new
server installation package using the latest version and your existing
configuration file, and then applying it to your server.

{{% notice note "Backing up your configuration file" %}}

The configuration file contains cryptographic keys that allow clients
and server to communicate. Each time the configuration is regenerated
(e.g. using `velociraptor config generate`), new keys are created.

It is imperative to backup the configuration file somewhere safe
(perhaps offline) and re-use the same file when upgrading to a new
version of Velociraptor in order to preserve the key material and
maintain client communication.

Remember to always make a backup copy of your config file before upgrading and
after upgrading, just in case changes are made by the upgrade!

{{% /notice %}}

From time to time, the schema of the configuration file may evolve
with newer versions. When a newer version of Velociraptor encounters
an older configuration file, it attempts to upgrade the configuration
file to the latest version. This happens automatically and it is
usually a seamless process.

During the installation package preparation the upgraded config file is embedded
into the server package so you will receive an upgraded configuration file
installed to the `/etc/` directory. You can see the version that wrote the
configuration file in the `version` section of the configuration file.

## Upgrading a server (in-place upgrade)

To upgrade the Velociraptor server to a new version, first download the
[latest release binary]({{< ref "/downloads/" >}}),
appropriate for your server's architecture.

### Create a new server installation package

On your server, create a new server installation package using the new binary
(which we've renamed 'velociraptor' in the commands below) and your existing
config file (which will be `/etc/velociraptor/server.config.yaml` on an existing
server):

**Debian-based server:**

```sh
./velociraptor debian server --config /etc/velociraptor/server.config.yaml
```

or

**RPM-based server:**

```sh
./velociraptor rpm server --config /etc/velociraptor/server.config.yaml
```

The output file will be automatically named to reflect the version and
architecture of the new Velociraptor version, but you can choose any file name
you want and specify it with the `--output <your_file_name>` flag.

### Run the upgrade

Then upgrade by installing the new server package using the relevant command
below, according to your server's packaging system.

**Debian-based server installation:**

```
$ sudo dpkg -i velociraptor_server_0.74.2_amd64.deb
Selecting previously unselected package velociraptor-server.
(Reading database ... 527396 files and directories currently installed.)
Preparing to unpack velociraptor_server_0.74.2_amd64.deb ...
Unpacking velociraptor-server (0.74.2) ...
Setting up velociraptor-server (0.74.2) ...
Created symlink /etc/systemd/system/multi-user.target.wants/velociraptor_server.service → /etc/systemd/system/velociraptor_server.service.
```

or

**RPM-based server installation:**

```
$ sudo rpm -Uvh velociraptor-server-0.74.2.x86_64.rpm
Verifying...                          ################################# [100%]
Preparing...                          ################################# [100%]
Updating / installing...
   1:velociraptor-server-0:0.74.2-A   ################################# [100%]
Created symlink '/etc/systemd/system/multi-user.target.wants/velociraptor_server.service' → '/etc/systemd/system/velociraptor_server.service'.
```

The upgrade should proceed smoothly. After upgrading you can check that the
service is running:

```
$ systemctl status velociraptor_server.service
● velociraptor_server.service - Velociraptor server
     Loaded: loaded (/etc/systemd/system/velociraptor_server.service; enabled; vendor preset: enabled)
     Active: active (running) since Tue 2025-04-08 12:25:34 SAST; 3min 5s ago
   Main PID: 3514 (velociraptor.bi)
      Tasks: 19 (limit: 4537)
     Memory: 67.2M
        CPU: 4.249s
     CGroup: /system.slice/velociraptor_server.service
             ├─3514 /usr/local/bin/velociraptor.bin --config /etc/velociraptor/server.config.yaml frontend
             └─3522 /usr/local/bin/velociraptor.bin --config /etc/velociraptor/server.config.yaml frontend

Apr 08 12:25:34 linux64-client systemd[1]: Started Velociraptor server.
```

## Reverting versions

It is generally ok to revert from later versions to earlier versions since the
migration process is generally non destructive.

The process is identical to the one for in-place upgrades described above,
except that you would create the installer package using the earlier version of
the Velociraptor binary.

## Migrating clients to a new server

If you wanted to completely change the way the server is configured by
regenerating the config file (for example, if you need to switch from self-
signed to Let's Encrypt certificates) you may need to stand up a completely new
server (with a different DNS name, certificates, keys etc) and migrate existing
clients to it.

This method allows the orderly migration of Velociraptor clients from
an old server to a new server by using a remote client upgrade.

You can use the old server to push the new MSI to existing clients, but as the
new MSI is installed the new client config file overwrites the old one and the
new velociraptor client will then connect to the new server and enroll as a new
client (with a new client ID).



