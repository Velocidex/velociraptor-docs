---
menutitle: "collector"
title: 'The "collector" command'
date: 2025-05-20
draft: false
weight: 30
summary: "Build an offline collector"
---

Builds an offline collector.

---

### [ collector ]

Typically offline collectors are built using a
[user-friendly workflow]({{< ref "/docs/offline_triage/#offline-collections" >}})
in the GUI. This command allows you to do the same thing on the command line,
and is intended to support automated build environments. For new users the GUI
is definitely the preferred way to accomplish the task.

```text
collector [<flags>] [<spec_file>]
    Build an offline collector

    --datastore=DATASTORE  Path to a datastore directory (defaults to temp)

Args:
  [<spec_file>]  A Spec file to use.
```

Run without any arguments to print an example spec file, which you can then
customize and use to build a new offline collector.

```sh
velociraptor collector > sample.spec.yaml
```

If you want the collector to integrate with an existing server, for example if
you want it to create X509-secured collections, then you'll need to give it
access to your server's config file, which contains the cryptographic materials
needed for this. That doesn't mean that you have to work on the server though -
you could copy the config into your build environment.

If you don't need to integrate your offline collectors in the way described
above then all you need is the Velociraptor binary.

See
[Building an offline collector on the command line]({{< ref "/docs/offline_triage/#building-an-offline-collector-on-the-command-line" >}})
for more information.