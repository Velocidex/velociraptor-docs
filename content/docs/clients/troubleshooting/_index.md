---
title: "Troubleshooting"
date: 2021-06-30T12:31:08Z
draft: false
weight: 70
last_reviewed: 2024-12-30
---

### Debugging a remote client

In the
[Deployment troubleshooting section]({{< ref "/docs/deployment/troubleshooting/#debugging-velociraptor" >}})
we explain how to bring up the debug server by providing the `--debug`
commandline, but existing clients are normally already running without this
flag. Often we are trying to collect an artifact from a remote client and we
want to see what is actually happening in the client process itself.

We can do this by collecting the artifact `Generic.Client.Profile` from the
client. This artifact has access to the same data exposed through the debug
server, but does not require the debug flag to be enabled in advance.

![Collecting the client profile](client_profile_artifact.png)

By default the artifact collects the most useful information
developers require, but you can customize the artifact parameter to
collect more detailed information if required.

You can share the result of the collection by exporting it to a zip
file and sharing with the development team on Discord or GitHub
issues.

![Exporting the client profile](exporting_client_profile.svg)

### Enabling a trace

While collecting the profile at any time is useful, it is sometimes
hard to catch the problem on the client at just the right moment. For
example, if a particular query causes a memory leak or performance
issues, by the time you can schedule the `Generic.Client.Profile`
artifact, the client may have already restarted or is too busy to
actually collect the artifact.

In this case it is useful to enable a trace during the collection of
another artifact. This setting will cause the client to take profile
snapshots at specified intervals during query execution and
automatically upload them to the server.

![Enabling periodic trace during artifact collection](enabling_trace.png)

This setting will upload a zip file containing critical profile
information every 10 seconds during query execution. This information
is useful to see the memory and resource footprint as the query
progresses as well as the logs from the client.

![The trace logs](trace_logs.png)

### Inspecting a remote client's log

One of the first troubleshooting steps for client-related issues is to run the
client manually from the command line with the `-v` flag which prints client
logs to the screen. This helps to identify startup issues or transient network
issues. This is often impractical or impossible when the client is remote and we
have means of access to it other than Velociraptor itself.

We could use the Velociraptor client to collect it's own plaintext logs from
disk, however the client, by default, does not write its logs to disk. This is
done to prevent information leakage risks - the client's log may contain
sensitive information such as collected artifacts.

To overcome this, it is possible to tell the client to log to an encrypted local
storage file. This allows us to collect the file from the client later and
decrypt it on the server while not creating any information leakage risk.

To enable local client logging, you create a new label group
(e.g. `logged`) and then assign the `Generic.Client.LocalLogs` client
monitoring artifact to this group. This allows you to begin logging on
any client by labeling it so that it joins the group.

![Configuring local client logs](local_client_logs.png)

Logs will be written continuously into the specified file on the
endpoint. The file is encrypted and can only be decrypted on the
server but the client can append logging information, even after a
reboot.

When we want to inspect the log file, we simply collect it from the
endpoint using the `Generic.Client.LocalLogsRetrieve` artifact.

![Retrieving the encrypted log file](encrypted_local_log_file.png)

The notebook tab will automatically decrypt the logs and display them
in a table.

![Decrypting the local log file](reading_encrypted_file.png)

