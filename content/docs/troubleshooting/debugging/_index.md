---
title: Debugging Velociraptor
menutitle: Debugging
date: 2025-02-18
last_reviewed: 2025-09-23
draft: false
weight: 70
summary: |
  * Velociraptor has built-in diagnostic capabilities to help with
  troubleshooting a broad range of issues.
aliases:
  - "/docs/gui/debugging/"
---

Like any piece of software, Velociraptor makes a number of engineering
trade-offs, and may encounter some error conditions or even bugs. When
faced with the prospect of an unresponsive server or client, or high
CPU load, users often ask: *"What is Velociraptor doing right now?"*

To see the inner workings of Velociraptor we can collect **profiles** of various
aspects of the program. These profiles exist regardless of whether Velociraptor
is being run as a client or server or even an offline collector.

You can read more about profiling in our blog article
[Profiling the Beast]({{% ref "/blog/2020/2020-08-16-profiling-the-beast-58913437fd16/" %}}).

## Collecting Profiles

Without appropriate ways to ask Velociraptor what is happening
internally, one would need to attach a debugger to understand what is
happening. To help users see inside the 'black box' of Velociraptor, we
have implemented extensive **Debugging Profiles** which allow us to
inspect the state of the various sub-systems inside the program.

Making Velociraptor's inner workings transparent helps to explain to
users how it actually works, what trade-offs are made and why the
program might not be behaving as expected.

**Profiles** are views into specific aspect of the code. You can collect
profiles from the local server using the `Server.Monitor.Profile`
artifact or from remote clients using `Generic.Client.Profile`.

Collecting these artifacts gives a snapshot or a dump of all profiles
at a specific instant in time.

![Collecting server profiles](server_profiles.svg)

{{% notice note "Seeking assistance from the community" %}}

If you encounter an issue that requires more thorough inspection, you
can seek assistance from the community on Discord or the mailing
list. In this case, you will probably be asked to attach a profile to
your request. This helps the developers to understand issues within
the system.

Simply collect the relevant artifact (either from the server with
`Server.Monitor.Profile` or a client with `Generic.Client.Profile`)
and export the collection into a zip file from the GUI. You can then
send us the Zip file for analysis.

{{% /notice %}}


### The Debug Console

While collecting profiles using an artifact is useful to take a
snapshot of the current process status, it is not very convenient when
we want to see how the process evolved over time.

To help with this, Velociraptor has a **Debug Console** GUI that provides a live
view of the debugging profiles.

On the server the Debug Console is always available by default. You can access
it from the main Welcome page. For clients and offline collectors please see the
[sections below]({{< relref "#starting-the-debug-console-on-clients" >}})
which explain how to enable it in those modes of operation.

![Accessing the Debug Console on the server](debug_server_gui.svg)

This link opens the main page of the Debug Console.

![The Debug Console main page](debug_server_main_page.svg)

### Starting the Debug Console on clients

Unlike on the server, on clients the Debug Console is not enabled by default for
security reasons.

To allow debugging of a client issue you can start the Debug Console by adding
the `--debug` flag to the service's command line. If the client is installed as
a service then you will need to stop the service first, and then run it manually
from the command line as follows:

{{< tabs >}}
{{% tab name="Linux" %}}
```sh
sudo systemctl stop velociraptor_client.service
/usr/local/bin/velociraptor_client --config /etc/velociraptor/client.config.yaml client -v --debug
```
{{% /tab %}} {{% tab name="Windows" %}}
```sh
sc.exe stop velociraptor
velociraptor.exe client --config "C:/Program Files/Velociraptor/client.config.yaml" -v --debug
```
{{% /tab %}}
{{% tab name="macOS" %}}
```sh
sudo launchctl unload /Library/LaunchDaemons/com.velocidex.velociraptor.plist
sudo /usr/local/sbin/velociraptor client --config /usr/local/sbin/velociraptor.config.yaml -v --debug
```
{{% /tab %}}
{{< /tabs >}}

When provided with the `--debug` flag, Velociraptor will start the Debug Console
on port 6060 (use `--debug_port` if you need to specify a different port). By
default the Debug Console will only bind to localhost so you will need to either
tunnel the port or use a local browser to connect to it.


### Debugging the offline collector

The offline collector is a "one shot" collector which simply runs, collects
several preconfigured artifacts into a zip file and terminates.

Sometimes the collector may, for example, take a long time or use too much
memory. In this case you might want to gain visibility into what it's doing.

You can start the offline collector by adding the `--debug` flag to its
command line.

```sh
Collector_velociraptor-v0.75.2-windows-amd64.exe -- --debug --debug_port 6061
```

Note that the additional `--` is required to indicate that the additional
parameters are not considered part of the command line (the offline collector
requires running with no parameters).

![Debugging the offline collector](debugging_offline_collector.png)

The above will start the Debug Console on port 6061 which you can access with a
web browser. You can then download goroutine, heap allocation and other profiles
from the debug server and forward these to the Velociraptor development team to
identify and resolve any issues.

If you have preconfigured the offline collector to close upon completion without
prompting and it completes before you are finished in the Debug Console, then
you can add `--prompt` to the command line to keep the application running. For
example:

```sh
Collector_velociraptor-v0.75.2-windows-amd64.exe -- --debug --prompt
```

### Profile types

The following pages provide additional details on each profile type. It is
instructive to read about each profile item to understand how Velociraptor works
internally, understand the trade-offs made, and how to get the most out of
Velociraptor in the real world.

{{% children description=true depth=2 %}}








