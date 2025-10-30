---
menutitle: "collector"
title: 'The "collector" command'
date: 2025-05-20
draft: false
weight: 30
summary: "Build an offline collector"
---

Builds an offline collector.

### [ collector ]

```text
collector [<flags>] [<spec_file>]
    Build an offline collector

    --datastore=DATASTORE  Path to a datastore directory (defaults to temp)

Args:
  [<spec_file>]  A Spec file to use.
```

---

Typically offline collectors are built using a
[user-friendly "wizard"-style workflow]({{< ref "/docs/deployment/offline_collections/" >}})
in the GUI.

The `collector` command allows you to do the same thing on the command line, but
it is mainly intended to support automated build environments.
**The GUI is the recommended way to create offline collectors, especially for
novice users.**

The process of creating an offline collector on the command line consists of 2
steps:

1. Create a YAML spec file which details all the options to be used when
   creating the collector.

2. Run the `collector` command and provide it with the spec file.


#### Obtaining a sample spec file

If you run the `collector` command without any arguments it will print an
example spec file in the terminal. You can redirect the output to a file and
then use that as a starting point, customize it, and then build a new offline
collector binary.

```sh
velociraptor collector > sample_spec.yaml
```

{{% notice note %}}

From version 0.75.5 the `Server.Utils.CreateCollector` artifact will create the
corresponding spec file and store it in the collection's Uploads section, in
addition to the repacked collector binary.

![](spec_file.png)

This allows you to create an initial collector using the GUI and then recreate
the same collector configuration using the CLI (for example, when planning to
recreate/update standardized collectors in a separate build environment whenever
newer Velociraptor versions are released).

{{% /notice %}}

#### Integrating with a Velociraptor server

Certain offline collector options require integration with an existing server.

For example, if you want the collector to include tools from the server's tools
inventory you can use the `--datastore` flag to provide access to the server's
tools inventory (only needed when your selected artifacts require these tools
_and_ when they cannot be downloaded directly from the computer where you are
creating the collector).

If you want the collector to create X509-secured collection zips using the
server's certificate, which can then be transparently imported to your
Velociraptor server, then you'll need to also provide the `collector` command
with access to your server's config file using the `--config` (or `-c`) flag.
The server config contains the server certificate which can be used to encrypt
collections.

The situations described above don't mean that you have to build the offline
collectors on your production server though. When using the `--config` or
`--datastore` flags you could work with a copy of the config and/or a replica
datastore in a separate build environment.

Also note that you don't need the Velociraptor server to be running when you use
the `--config` flag. The `collector` command actually spins up a separate
temporary server instance, similar to an "Instant Velociraptor" instance, for
the purpose of creating collectors on the command line.

If you don't need to integrate your offline collectors in the ways described
above then all you need is the Velociraptor binary, and possibly also internet
access so that it can download tools and additional Velociraptor binaries as
needed.

#### Spec file formatting

The spec file provides parameters to the `Server.Utils.CreateCollector` artifact
which creates the collector. This means that all fields and their associated
values defined in the spec file have to be valid parameters for this artifact.

While the spec file is YAML, all values in it are specified as strings. This
means that items such as artifact parameters which expect compound data types
need to be specified as serialized JSON and _not_ as the equivalent YAML data
types.

For example the following spec is invalid and will not be parsed correctly:

```yaml
# The list of artifacts and their args.
Artifacts:
 Windows.Triage.Targets:
    VSS_MAX_AGE_DAYS: 3
    HighLevelTargets:
      - _KapeTriage
      - _BasicCollection
      - _Live
      - _SANS_Triage
 Windows.Sysinternals.Autoruns:
    All: Y
```

The correctly formatted version of the above should be:

```yaml
# The list of artifacts and their args.
Artifacts:
 Windows.Triage.Targets:
    VSS_MAX_AGE_DAYS: '3'
    HighLevelTargets: '["_KapeTriage","_BasicCollection","_Live","_SANS_Triage"]'
 Windows.Sysinternals.Autoruns:
    All: 'Y'
```

Note that in the above example we must force YAML to treat the number **3** as a
string, which we do by enclosing it in quotes. The same is necessary for the
**Y** since we need it to be a string rather than a YAML boolean field. It's
easier to use a combination of single and double quotes, as in this example, but
you can also escape inner quotes with a `\` character if you prefer.

To specify an empty field value where a JSON object is expected you should use
the notation for an empty JSON object: `Foo: '{}'`. For a field that expects a
simple string the empty value `Foo: ""` should be used. You should never leave
values blank (e.g. `Foo:`) since this equates to `Null` which is not a valid
value for artifact parameters.

#### Reproducing configurations from previously-created collectors

<!-- Revise when 0.75.5 becomes available -->

It is currently not possible to produce a spec file from a previously created
offline collector or from a previously run `Server.Utils.CreateCollector` flow
in the GUI.

For a previously run `Server.Utils.CreateCollector` flow you can inspect the
**Requests** tab to see what settings were used and then manually transcribe
them if needed. Generally it is easier to use the "Copy Collection" button in
the GUI to regenerate an offline collector, possibly tweaking some settings in
the process, but this option is useful if you need to switch from using the GUI
to using the CLI (for example, when you want to create or update collector
builds in a separate build environment).

For a previously created collector you can inspect the embedded config using the
`config show` CLI command and then manually transcribe the settings into a new
spec file. While this is not the most pleasant way to do things, sometimes it is
the only option, for example when you only have access to a collector that
someone else created and you need to reproduce it on the latest version or tweak
some of it's settings.

If you have a requirement to recreate offline collectors periodically using the
CLI then it's a good idea to store your spec files somewhere safe for future
use.

See
[Building an offline collector on the command line]({{< ref "/docs/deployment/offline_collections/#building-an-offline-collector-on-the-command-line" >}})
for more information.