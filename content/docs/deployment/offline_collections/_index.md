---
title: "Offline Collections"
date: 2025-10-21
last_reviewed: 2025-10-31
draft: false
weight: 30
---

In this section we look at a less conventional method of collecting data from
endpoints. One of Velocraptor's many strengths is its ability to deal with the
variety of challenging environments that realworld DFIR throws our way.

### How do offline collections work?

At it's core, the Velociraptor is just a VQL engine! We give it VQL to run, in
the form of [artifacts]({{< ref "/docs/artifacts/" >}}), and it gives us back
data (which may or may not
[include files]({{< ref "/docs/file_collection/" >}})).
Normally the Velociraptor server gives the client the VQL to run, the client
runs ("collects") it, and the server receives the results from the client. Note
that the collection step occurs independently of the server, with the server
only being involved before and after the collection.

So for situations where the a server can't be deployed or can't be reached from
the endpoints, we essentially need a special type of client that can do it's
collection work without receiving it's instructions from the server, and without
needing to send the results directly back to the server. We need an independent
Velociraptor binary that acts like a client in terms of running (pre-defined)
VQL artifacts, and that stores the results in a standalone/portable archive. We
can then transport that archive file via alternative channels back to the server
for import and analysis.

![Online vs. Offline collections](online-offline.svg)

To support offline collections, Velociraptor is capable of creating special
binaries that are pre-configured to automatically collect a selected set of
artifacts. We call these binaries **offline collectors**.

- They can do anything that a normal client can do, but they have their
  instructions "baked in" rather than receiving instructions interactively from
  the Velociraptor server.

- Instead of sending their data back to the server they write it to a local
  collection archive file, which they can optionally upload to a cloud storage
  service or network location. Because the collection archive may contain
  sensitive data, offline collectors can encrypt or password-protect this file
  so that it's secure while in transit.


{{% notice note "Terminology Note" %}}

The term "offline" in this context refers to the fact that the collection is
done without the use of an online client - that is, without the client-server
network connectivity that is required for normal collections. The endpoint needs
to have a running operating system, just as it would if an
[installed]({{< ref "/docs/deployment/clients/#installing-the-client-as-a-service" >}})
or
[non-installed]({{< ref "/docs/deployment/clients/#running-clients-interactively" >}})
client was used. Do not confuse the term with
[deadisk analysis]({{< ref "/docs/forensic/deaddisk/" >}}), which deals with
data from computers that don't have a running operating system.

It may be better to think of offline collections as _out-of-band collections_,
since the main difference is that the VQL and collected results are not sent
over a network-based client-server communication channel.

{{% /notice %}}


### Why do we need offline collections?

Under ideal circumstances we'd have our Velociraptor clients deployed and
communicating with their Velociraptor server, and we'd be having an easy time
hunting down the cyber threats. But sometimes some of us are thrown into
difficult situations where we don't have clients deployed and where a
conventional client-server deployment is just not possible - we may have to
perform investigations in situations where a conventional client-server
deployment is either forbidden, or just not possible due to technical reasons
such as lack of network access. This may even be your everyday "normal" if you,
for example, provide IR services to other organizations.

In some situations, deploying Velociraptor in the usual client-server
architecture might be impossible, impractical, or just inconvenient. For
example:

- You may not be permitted to deploy a Velociraptor server or clients in an
  environment that you are tasked with investigating. During a security incident
  there may be strong resistance to deploying any new software or
  infrastructure.
- Internet access may be shut down during an incident so that clients, if
  deployed, could not connect to your cloud-based server. And in that case you
  may need to rely on external assistance (such as a local admin) to perform the
  collections when you have no remote access to the site. However, these
  assistants are typically not Velociraptor or even DFIR experts, so we need to
  be able to provide them with a solution that performs the required collections
  with minimal technical knowledge.


### What is an offline collector?

The offline collector is a full-featured Velociraptor binary that has a custom
configuration and selected artifacts embedded in it. If the embedded artifacts
require any 3rd-party [tools]({{< ref "/docs/artifacts/tools/" >}}) then these
will also be repackaged into the offline collector binary.

The process of embedding the config - and optionally bundling other tools - does
not require compiling a new binary from source. It uses the standard
Velociraptor binary and produces a modified version of it. So you can still use
the collector binary to perform any operations that an unmodified Velociraptor
binary is capable of. The offline collector behaviour is only invoked when the
binary is launched without any
[command line arguments]({{< ref "/docs/cli/" >}}).

![Standard binary vs. offline collector binary](offline-collector-repacking.svg)

Because offline collectors are based on standard Velociraptor binaries they can
be created for any platform or achitecture that Velociraptor supports.

When run without any command line arguments the embedded config is loaded. The
config defines the offline collector's behaviour which is:

1. **collect** the specified artifacts which are included in the config.

2. **store** the collection results, logs and metadata in a structured zip
   archive, which is typically encrypted or password-protected (but doesn't have
   to be).

3. **upload** the collection archive to a cloud storage service or other network
   destination, if configured to do so.

4. **delete** the collection archive from disk (optional and only used when the
   collection archive is uploaded to a network destination).

During the collection the offline collector displays progress in a terminal. No
user interaction is needed, but you can choose the option to pause at the end of
the collection process so that if there's a person running it locally then they
can observe whether or not it has completed successfully.


### Offline collection considerations

Although offline collectors provide a powerful capability to address difficult
situations, they are not without some drawbacks. Here are a few that you should
think about.

- You really need to plan ahead about what you want to collect. An offline
  collection is often a one-shot opportunity to collect what you need. Iteration
  would require creating a new collector each time. By contrast a
  network-connected "online" client makes it easy to quickly pivot and dig
  deeper in response to findings.
- Offline collectors need to be packaged with the artifacts and tools that they
  need. This means that you can't quickly create a new artifact and add it to
  your offline collector without rebuilding and redistributing a new binary. If
  your artifacts need tools then bundling them into a collector binary can
  significantly increase the file size.
- The release versions of the Velociraptor binaries for Windows and macOS are
  digitally signed. Repacking the binary invalidates those digital signatures.
  For Windows this is rarely an issue, but macOS will refuse to execute binaries
  with invalid signatures. So on macOS we use the
  [Generic collector]() option, which is the offline collector config plus tools
  packaged into a separate file.
- Because offline collectors do not provide progress updates and resource
  telemetry to the server, we cannot get feedback on how the collection is going
  or on the resource usage. However, since offline collectors are typically used
  under emergency conditions the resource utilization aspect may not be of much
  concern.

{{% notice tip %}}

In general, don't use offline collectors:

- **To only collect files**: Many new users make the mistake of only collecting
  files with the intention of analyzing them later on the server. Velociraptor
  is not designed for centralized parsing of files - it can be done but it's
  relatively complicated, loaded with caveats, and can add significant delays to
  an investigation.

  If you want to parse files and analyze their contents _and also
  collect copies of the files_, then that's easily done: just add the relevant
  parsing artifacts to your offline collector spec. Parsing of most file types
  is very fast and can therefore be done on the endpoint at the same time that
  the files themselves are collected. This approach makes use of the combined
  computing resources of all endpoints rather than centralizing the workload on
  the server. When you import a collection archive on the server it's far better
  to have data that you can immediately begin working with, and not just a dump
  of files.

  Ideally you should use the same artifacts in an offline collector as you would
  use if you had a client running on the endpoint. Although, as mentioned
  previously, this does require some planning.

  There are certainly some situations where you might only need to collect
  certain files, but those are typically rare. With Velociraptor it usually only
  makes sense to copy a file if you've looked through it and found something of
  interest.

- **To avoid using clients**: If the endpoint can communicate with the server
  then there really is no reason to use an offline collector rather than an
  interactive online client.
  - Velociraptor clients can operate
    [without being installed]({{< ref "/docs/deployment/clients/#running-clients-interactively" >}}).
  - Clients can immediately join hunts upon enrollment, which allows them to
    immediately begin collecting exactly the same pre-defined set of artifacts
    that an offline collector would have.
  - Clients allow you to iterate and pivot as you investigate. Having the
    results returned directly and almost immediately to the server allows you to
    get answers without delays.
  - The client config can be
    [repacked]({{< ref "/docs/cli/config/#-config-repack-" >}})
    into the binary, and made to
    [auto execute]({{< ref "/docs/cli/#autoexec-mode-and-post-args">}})
    in `client` mode. That is, the convenience of a single autoexec binary can
    be replicated for non-installable clients using the same embedding
    mechanisms that offline collectors use.


{{% /notice %}}

### The Generic Collector

The **Generic Collector** is functionally the same as the offline collectors
that use an embedded config, however it is separate from and independent of the
binary. It's essentially a standalone collector config, optionally combined with
a tools bundle, written into a single file. This allows it to be used on the
command line with any Velociraptor binary.

![Generic collectors support cross-platform use](generic-collector1.svg)

There are two reasons to use a Generic Collector instead of one that's embedded
in a platform-specific binary:

1. Embedded configs are limited to approximately 80KB, regardless of which
   platform the binary is compiled for. This is usually sufficient for a large
   number of average sized artifacts, since compression is applied to the config
   before it's embedded and artifacts are highly compressible. However we have a
   few artifacts that are relatively large and contain already-compressed data
   that can't be compressed much more. Some of these large artifacts are larger
   than the ~80KB embed limit, or else a selection of artifacts that includes 2
   or 3 of the large ones will be beyond the limit.

2. The macOS binaries that we create are code-signed. Embedding a collector
   config into the binary invalidates this digital signature. Recent versions of
   macOS will prevent execution of binaries with invalid signatures. So on macOS
   the Generic Collector approach is absolutely necessary and the only supported
   option.


Note that tools are not embedded in the binary and therefore do not need to be
factored into the ~80KB limit. With both the generic collector and the offline
collectors based on Velociraptor binaries, the tools are bundled and appended to
the file.



Normally the Velociraptor offline collector builder computes a preset
configuration file and embeds it inside the regular Velociraptor
binary for ease of use. However this can cause some problems in some
cases:

1. By modifying the official Velociraptor binary, the Authenticode
   signature is invalidated. Therefore the offline collector will need
   to be re-signed to pass many integrity checks.
2. The amount of space within the binary reserved for the offline
   collector is limited. This means that very large artifacts will
   cause the space to be exceeded.
3. We have also seen recent MacOS systems refuse to run a binary that
   has been modified. Therefore regular offline collector packing does
   not work on recent MacOS versions.

In recent versions of Velociraptor we now offer a new type of
collector called the "Generic collector".

![](generic_collector.png)

This will embed the configuration into a shell script instead of the
Velociraptor binary. You can then launch the offline collector using the
unmodified official binary by specifying the `--embedded_config` flag:

{{< tabs >}}
{{% tab name="macOS" %}}
```shell
./velociraptor-darwin-amd64 -- --embedded_config Collector_velociraptor-collector
```
{{% /tab %}}
{{% tab name="Linux" %}}
```shell
./velociraptor-linux-amd64 -- --embedded_config Collector_velociraptor-collector
```
{{% /tab %}}
{{% tab name="Windows" %}}
```shell
velociraptor-windows-amd64.exe -- --embedded_config Collector_velociraptor-collector
```
{{% /tab %}}
{{< /tabs >}}


![](generic_collector_running.png)

While the method is required for MacOS, it can also be used for
Windows in order to preserve the binary signature or accommodate
larger artifacts.


## Collection security

All Velociraptor collections can potentially contain sensitive data.

With online client-server collections the

Because an offline collector creates a zip archive that , and which is outside the control of , it is important to properly secure this data.

### Acquired file is encrypted

* Due to limitations in the Zip format, file names can not be encrypted.
* Therefore, Velociraptor creates a second protected Zip file inside
  the outer container.
* Several encryption schemes supported:
    1. Regular password
    2. X509 - random password generated and encrypted with the server's certificate.
    3. GPG - random password generated and encrypted with the GPG public key.

## Protecting the collection file: Encryption
* For added protection, add a password to the zip file
* If we used a simple password it would be embedded in the collector
* Use an X509 scheme to generate a random password.

* Zip files do not password protect the directory listing - So
  Velociraptor creates a second zip file inside the password protected
  zip.


## Importing collections into the GUI

We can use the offline collector to fetch multiple artifacts from the
endpoint. The results consist of bulk data as well as JSON file
containing the result of any artifacts collected.

You can re-import these collection into the GUI so you can use the
same notebook port processing techniques on the data. It also allows
you to keep the results from several offline collections within the
same host record in the Velociraptor GUI.

{{% notice tip "Offline Collectors are Out-Of-Band Clients!" %}}

An offline collector is essentially an out-of-band client. Instead of the client
connecting over the internet, the data is delivered via sneakernet! The data is
then imported into the server which creates a normal client record and
associated collections. The data can then be queried as with any other client.

{{% /notice %}}

Importing an offline collection can be done via the
`Server.Utils.ImportCollection` artifact. This artifact will inspect
the zip file from a path specified on the server and import it as a
new collection (with new collection id) into either a specified client
or a new randomly generated client.

![Importing Offline Collector collections](image48.png)

{{% notice tip "Copying the collections to the server" %}}

Offline collections are typically very large, this is why we do not
have a GUI facility to upload the collection zip file into the
server. You will need to use an appropriate transfer mechanism (such
as SFTP or SCP) to upload to the server itself.

{{% /notice %}}

# Local collection considerations

Local collection can be done well without a server and permanent agent
installed. A disadvantage is that we do not get feedback of how the
collection is going and how many resources are consumed.

Offline collections are typically planned in advance and it is a bit
more difficult to pivot and dig deeper based on analysis results to
search for more results. For this reason offline collections tend to
err on the side of collecting more data rather than being more
targeted and focused on answering the investigative questions.

### Using Velociraptor to remotely launch the offline collector

While the offline collector is a stand alone collector, sometimes you might want
to use Velociraptor to distribute and run it. This might be because uploading
the data that needs to be collected is not feasible over a slow link back to the
Velociraptor server. In this use case we cab to push the offline collector to
the endpoint and have it upload the bulk data to the local drop box server.

To do this it is best to use the [Generic Collector]({{< ref
"/docs/deployment/offline_collections/#the-generic-offline-collector" >}}) because it
is small and the Velociraptor binary is already present on the
endpoint.

In the following artifact we define the `OfflineCollector` tool, then fetch it
from the endpoint, and then launch the Velociraptor binary with the correct
command line for running a generic collector.

```yaml
name: RemoteOfflineCollector
tools:
- name: OfflineCollector

required_permissions:
- EXECVE

sources:
- query: |
    LET _Exe <= SELECT Exe FROM info()
    LET Exe <= _Exe[0].Exe

    SELECT * FROM foreach(row={
       SELECT OSPath
       FROM Artifact.Generic.Utils.FetchBinary(
           ToolName="OfflineCollector",
           TemporaryOnly=TRUE, IsExecutable=FALSE)
    }, query={
       SELECT * FROM execve(sep="\n",
          argv=[Exe, "--", "--embedded_config", OSPath])
    })
```

The first time you schedule this artifact for collection you will need to ensure
that you manually upload the `OfflineCollector` tool, which you can do by
clicking on the tool name to access the tool management screen.

When building the generic collector make sure to use the correct credentials and
connection details so that it will automatically upload the collections to your
uploads server.


