---
title: "File Acquisition Over SSH"
menutitle: "Acquisition over SSH"
date: 2025-11-06
last_reviewed: 2026-01-27
draft: true
weight: 30
description: |
  The ssh accessor can be used to read files from a remote SSH-enabled system
---

This page explains the options for running filesystem-oriented
Velociraptor artifacts on systems without running a client on them,
over SSH, using Velociraptor's [SSH accessor]().

The ssh accessor can be used to read files from a remote SSH-enabled
system. This is very useful in situations where deployment of a normal
client isn't permitted or isn't technically possible (for example,
unsupported architectures such as routers and firewalls which
nevertheless do provide filesystem access via SSH). Typically this
means *nix-based systems, as these often have SSH access enabled, but
it could also be a Windows or macOS system where installation of a
client is just not possible for technical or political reasons.

## Limitations


Accessing a remote system using the SSH accessor is essentially
equivalent to using [SSHFS](https://github.com/libfuse/sshfs) and has
the same limitations.

The ssh accessor is used to read remote files - it can not execute arbitrary
tools on the endpoint. For example, the UAC collector is a shell script which is pushed to the
endpoint when collecting the `UAC collector` artifact on a normal
Linux system, however it cannot be used via the ssh accessor.


## What it does allow

Because the SSH accessor allows reading files, it also allows copying
files from the remote system. See example below.

For SSH-accessible systems such as routers or firewalls, it may
provide access to logging data on the filesystem, which may be the
goal rather than investigating the router or firewall as an endpoint itself.


###### Example: a simple upload artifact

```yaml
name: SSH.Upload
description: |
  Uploads files from a remote host via the SSH accessor.
  The remote host and access credentials are defined in a server secret.

type: CLIENT

sources:
  - query: |
      LET SSH_CONFIG <= dict(secret="alpine")

      SELECT OSPath,
             Mtime,
             Size,
             upload(file=OSPath, accessor="ssh") AS FilePreview
      FROM glob(globs='/var/log/*', accessor='ssh')

column_types:
  - name: FilePreview
    type: preview_upload
  - name: Size
    type: mb
```

## SSH access to a remote system via a remapped virtual client

Can we use an artifact which spawns a virtual client similar to `ArtifactName`?

## SSH access to a remote system via a server artifact or a global notebook

[ A few months ago I tested and found that this didn't work - need to
check if it perhaps now works ]

