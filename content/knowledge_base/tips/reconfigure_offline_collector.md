---
title: How can I quickly reconfigure an offline collector?
---

The offline collector is a pre-configured version of Velociraptor that automatically collects certain artifacts when invoked with no command line args. The offline collector is a full Velociraptor binary that simply has a custom configuration embedded - so you can use the collector binary to perform any operations that Velociraptor would.

Usually the collector is built using the GUI by selecting the correct artifacts and injecting parameters into the embedded configuration file. But sometimes we might want to slightly modify the embedded configuration, and firing up a GUI to rebuild a new collector from scratch is a bit too much work.

There is actually an easier way to quickly modify the embedded configuration.

1. First extract the existing embedded config from the collector into a local file:

```
Collector_velociraptor-v0.6.4-windows-amd64.exe config show > config.yaml
```

2. Next we can edit the config file - for example, if we need to tweak the parameters
3. Finally we repack the new configuration file into the existing collector:

```
Collector_velociraptor-v0.6.4-windows-amd64.exe config repack config.yaml new_collector.exe
```

You can verify the new collector has the modified configuration using `new_collector.exe config show`

This method is suitable for small changes in the embedded configuration - it is always more reliable to use the GUI to prepare a completely new collector, but for small tweaks this method may be quicker.
