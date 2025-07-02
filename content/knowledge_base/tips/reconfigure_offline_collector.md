# How can I quickly reconfigure an offline collector?

The offline collector is a pre-configured version of Velociraptor that
automatically collects certain artifacts when invoked with no command line args.
The offline collector is a full Velociraptor binary that simply has a custom
configuration embedded - so you can use the collector binary to perform any
operations that Velociraptor would.

Usually the collector is built using the GUI by selecting the correct artifacts
and injecting parameters into the embedded configuration file. But sometimes we
might want to slightly modify the embedded configuration, and firing up a GUI to
rebuild a new collector from scratch is a bit too much work.

Here we describe an easy way to quickly modify the embedded configuration, which
is suitable for small changes in the embedded configuration. While it is
recommended that you use the GUI to prepare a completely new collector, for
small tweaks to an existing offline collector this method may be quicker.

## General Method

Assuming you have an existing offline collector named
`Collector_velociraptor-v0.74.3-windows-amd64.exe`:

1. First extract the existing embedded config from the collector into a local
   file:

```sh
Collector_velociraptor-v0.74.3-windows-amd64.exe config show > config.yaml
```

2. Next, edit the config file - for example, you might want to tweak one or two
   parameters.

3. Finally, repack the new configuration file into a new collector:

```sh
Collector_velociraptor-v0.74.3-windows-amd64.exe config repack config.yaml new_collector.exe
```

You can verify that the new collector has the modified configuration using
`new_collector.exe config show`.

In the example above the `config repack` command repacked the collector config
into a copy of the binary which invoked the command. This is the default
behaviour. If you wish to repack into a different binary then please see the
next section.

Also note that the commands above are invoked using the offline collector binary
itself, since this is just a normal Velociraptor binary which happens to have an
embedded config. This is just for convenience - you could use any Velociraptor
binary on any platform to do the config extraction or repacking, provided you
also supply it with the target binary that it will use in generating the output
file (see next section).


### Repacking to a different binary

{{% notice warning "Limitations" %}}

Repacking the config into a different binary will not transfer any bundled tools
to the new binary! This will cause the collection to fail if the offline
collector can't access these tools from an alternative location, such as from a
URL defined in the embedded artifacts' tool definitions. And even if it can
download the tool from an external location, you may not want it to.

If your collector uses artifacts which use tools then you should NOT use the
method described here. You should instead rebuild your offline collector using
the GUI or the CLI `collector` command.

{{% /notice %}}

You can use the `--exe` flag to specify a different target binary. This allows
you to transfer an existing collector config to a different architecture, and/or
to a newer binary version. For example:

```sh
# from Windows amd64 to i386
velociraptor-v0.74.3-windows-amd64.exe config repack --exe velociraptor-v0.74.3-windows-386.exe config.yaml new_collector.exe
```

or

```sh
# using Linux to repack a Windows collector
./velociraptor-v0.74.3-linux-amd64 config repack --exe velociraptor-v0.74.3-windows-amd64.exe config.yaml new_collector.exe
```


## Repacking a Generic Collector

The [Generic Collector](https://docs.velociraptor.app/docs/offline_triage/#the-generic-offline-collector)
is independent of any binary. It's essentially a standalone collector config
with compression applied. This allows it to be used with any Velociraptor binary
since it is external to the binary.

You can unpack the Generic Collector into uncompressed YAML as follows:

1. First extract the existing embedded config from the collector into a local
   file:

```sh
velociraptor config show --embedded_config Collector_velociraptor-collector > Collector_velociraptor-collector.yaml
```

2. Then make minor tweaks if needed, as mentioned above.

3. And then repack it back into the Generic Collector format using the `--exe`
flag. In this case the "exe" can be any generic collector file including the
default "blank" one available on our
[Github Releases page](https://github.com/Velocidex/velociraptor/releases)
(named `velociraptor-collector`).

```sh
velociraptor config repack --exe velociraptor-collector Collector_velociraptor-collector.yaml new_generic-collector
```

Even though the `velociraptor-collector` file is not actually an exe, this works
because the generic collector file contains the same embedding section as any
Velociraptor binary, so the `config repack` command recognizes it as a valid
binary and therefore allows it as an alternative repacking target.


Tags: #configuration #forensics #collector
