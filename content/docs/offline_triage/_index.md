---
title: "Triage and acquisition"
date: 2021-06-27T04:31:24Z
draft: false
weight: 45
---

In DFIR Triaging means to quickly collect information about the system
in order to establish its potential relevance to a forensic
investigation.

While many think of triage as collecting files (perhaps as an
alternative to full disk acquisition), in Velociraptor, there is no
real difference between collecting files or other non-volatile
artifacts: Everything that Velociraptor collects is just a VQL
Artifact.

We like to think of triage as simply capturing machine state - where
the state may be bulk files (like the `$MFT` or registry hives) or any
other volatile data, such as process information, network connections
etc.

### Collecting files

Being able to efficiently and quickly collect and preserve evidence is
important for being able to capture machine state at a point in
time. It is also useful to be able to use these collected files with
other forensic tools that might be able to handle the file formats
involved.

One of the most commonly used artifact is the
`Windows.KapeFiles.Targets` artifact. This artifact is automatically
built from the open source
[KapeFiles](https://github.com/EricZimmerman/KapeFiles) repository.

While originally developed to support the non-opensource Kape tool,
this repository contains many types of files which might be relevant
to collect in a triage scenario. Each Kape "Target" is essentially a
glob expression with a name.

In Velociraptor `Windows.KapeFiles.Targets` is the most popular
artifact for mass file collection.  It does no analysis but simply
collects a bunch of files based on the targets specified.

Start by selecting the artifact from the "New Collection" wizard

![The Windows.KapeFiles.Targets artifact](image2.png)

Next we need to select the "Targets" in the "Configure Parameters"
step. Many targets are simply collections of other targets. For
example the `_BasicCollection` target automatically includes a number
of other useful targets.

![Selecting recursive targets](image7.png)

The `Windows.KapeFiles.Targets` artifact can transfer a large quantity
of data from the endpoints, and take a long time to run. We therefore
often need to update the resource control of the collection.

![Specifying a maximum upload limit](image6.png)

Once the collection is launched, we can monitor progress in the "Artifact Collection" tab.

![Monitoring collection progress](image4.png)

{{% notice note "Note about large file collections" %}}

Velociraptor is very careful about the performance and resource impact
on endpoints. When collecting many files if it is often hard to
determine in advance how much data will be collected or how long it
will take. For safety, Velociraptor allows limits to be set after
which the collection is cancelled. You can also interactively cancel
the collection by clicking the "Stop" button.

Be aware that a lot of data can be collected which might fill up the
VM disk.

> Math is a harsh mistress:
> Collecting 100Mb  from 10,000 endpoints = 1Tb
>
> Note that typically $MFT is around 300-400Mb so collecting the $MFT
> from many endpoints is going to be huge!

![Collections are automatically cancelled when they read the limit](image5.png)

{{% /notice %}}

## Offline collections

We have seen previously how to collect many files using the
`Windows.KapeFiles.Targets` artifact in the usual client/server
mode. But what if we are unable to deploy Velociraptor on a new
network in client/server mode? With Velociraptor not installed on the
endpoint, how shall we collect and triage artifacts?

Velociraptor is just a VQL engine!  All we need is Velociraptor to be
able to collect the VQL artifacts into a file, and then we can
transport the file ourselves for analysis.  Velociraptor does not
really need a server...

Often we rely of an external helper (such as a local admin) to
actually perform the collection for us. However, these helpers are
often not DFIR experts. We would like to provide them with a solution
that performs the required collection with minimal intervention - even
to the point where they do not need to type any command line
arguments.

The `Offline collector` aims to solve this problem. Velociraptor
allows the user to build a specially configured binary (which is
actually just a preconfigured Velociraptor binary itself) that will
automatically collect the artifacts we need.

Velociraptor allow us to build such a collector with the GUI using an
intuitive process.

![Creating a new Offline Collector](image3.png)

Select the offline collector builder from the `Server Artifacts`
page. The artifacts selection page and the parameters page are exactly
the same as previously shown.

![Offline Collector artifacts selection](image16.png)

Next select the collector configuration page.

![Offline Collector configuration](offline1.png)

Here we get to choose what kind of collector we would like:

* Target Operating System: This specifies the specific version of the
  Velociraptor binary that will be packed.

* Encryption: It is possible to specify a scheme to encrypt the zip
  file that will be created. Read more about this below.

* Collection Type: This controls where the collection is stored.

    * Zip Archive: The collection will be stored in a zip file in the
      same directory the collector is launched from.

    * Google Cloud Bucket: The zip file will be uploaded to a cloud
      bucket. When selecting this you can provide GCP credentials to control
      the upload bucket.

    * AWS Bucket: The zip file will be uploaded to a cloud
      bucket. When selecting this you can provide AWS credentials and
      details to control the upload bucket.

    * SFTP: This allows the collector to upload the file to an SFTP
      server using a private key.

The `Offline Collector Builder` is simply a GUI wrapper around the
`Server.Utils.CreateCollector` server artifact. Once it is collected,
the artifact will automatically upload the pre-configured collector it
created into the collection and the file will be available for
download from the "Uploads" tab. Simply click on the link to get the
collector.

![Retrieving the Offline Collector binary](image13.png)

Once the collector is run without command line arguments, the
collection will automatically start. No need for the user to enter
command line parameters, although they do need to be running in an
elevated administrator shell.

![Running the Offline Collector in the console](image14.png)

The collector creates a zip file containing the collected files as
well as an optional report.

![Viewing the Offline Collector in the console](image29.png)

### Encrypting the offline collection

The offline collector can capture a lot of privacy and security
sensitive information. Typically we want to produce an encrypted Zip
file so that it can not be extracted by anyone other than authorized
users.

The offline collector supports a number of encryption schemes, but
they all produce an encrypted zip file. While the ZIP encryption
format uses `AES` to encrypt the contents of files with a password, file
names and metadata are not encrypted. This can lead to a lot of
information leakage by simply listing the archive (which does not
require a password).

Velociraptor solves this problem by compressing the files inside
another ZIP file named `data.zip` and then encrypting the content of
that file. Therefore when listing an encrypted file we see only a
metadata file and `data.zip`

Velociraptor supports a number of ways to derive the password with
which to protect the collection:

1. The `Password` method specifies a password in the embedded
   configuration file. This password is passed directly to the ZIP
   library to encrypt the file.

   While simple to use this scheme is not recommended as the password
   is stored in clear text inside the offline collector and can be
   easily extracted (by running `Collector.exe config show`)

2. The `X509` method is the recommended method to use in all
   cases. This scheme embeds the Velociraptor server's public
   certificate in the offline collector. During collection, a random
   password is generated which is then encrypted using the embedded
   Velociraptor certificate and stored in the container inside a
   metadata file.

   After the password is used to encrypt the container, it is
   discarded. The only way to recover the password is to decrypt it
   using the server's private key. This way if the collector binary or
   the collection are compromised - it is impossible to recover the
   password without the server's configuration file (that contains the
   private key).

   If the `X509` method is used, the collected ZIP files will be
   decrypted automatically and transparently when they are imported
   into the same server that produced the offline collector.

### The Generic offline collector

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
collector called the `Generic` collector.

![](generic_collector.png)

This will embed the configuration into a shell script instead of the
Velociraptor binary. Users can then launch the offline collector using
the unmodified official binary by specifying the `--embedded_config`
flag:

```
velociraptor-v0.7.0-windows-amd64.exe -- --embedded_config Collector_velociraptor-collector
```

![](generic_collector_running.png)

While the method is required for MacOS, it can also be used for
Windows in order to preserve the binary signature or accommodate
larger artifacts.

### Building an offline collector on the command line

The easiest way of building an offline collector is using the GUI as
described above. However, for cases where automation is required, it
is also possible to build an offline collector using the commandline
only.

This works by writing settings into a `Spec File`. Velociraptor uses
this file to prepare the offline collector automatically. To obtain
the initial template for the file run the following command:

```
$ mkdir /tmp/datastore/
$ ./velociraptor-v0.72.4-linux-amd64 collector --datastore /tmp/datastore/ > /tmp/datastore/spec.yaml
velociraptor-v0.72.4-linux-amd64: error: collector: No Spec file provided
```

The first command prepares a temporary datastore location (this is
similar to the `velociraptor gui` command which builds an entire
deployment in that directory).

Because we have not provided any `Spec File` parameter, Velociraptor
will print a template to the output which we redirect to a file.

Next edit the spec file (which is heavily documented). Most options
are similar to the ones presented in the GUI builder.

To build the collector, run the command with the generated `spec
file`.

```text
$ ./velociraptor-v0.72.4-linux-amd64 collector --datastore /tmp/datastore/ /tmp/datastore/spec.yaml
...
Running query LET _ <= SELECT name FROM artifact_definitions()
[INFO] 2024-07-10T09:12:28Z Compiled all artifacts.
[]Running query LET Spec <= parse_yaml(filename=SPECFILE)
[]Running query LET _K = SELECT _key FROM items(item=Spec.Artifacts)
[]Running query SELECT * FROM Artifact.Server.Utils.CreateCollector(OS=Spec.OS, artifacts=serialize(item=_K._key), parameters=serialize(item=Spec.Artifacts), target=Spec.Target, target_args=Spec.TargetArgs, encryption_scheme=Spec.EncryptionScheme, encryption_args=Spec.EncryptionArgs, opt_verbose=Spec.OptVerbose, opt_banner=Spec.OptBanner, opt_prompt=Spec.OptPrompt, opt_admin=Spec.OptAdmin, opt_tempdir=Spec.OptTempdir, opt_level=Spec.OptLevel, opt_filename_template=Spec.OptFilenameTemplate, opt_collector_filename=Spec.OptCollectorTemplate, opt_format=Spec.OptFormat, opt_output_directory=Spec.OptOutputDirectory, opt_cpu_limit=Spec.OptCpuLimit, opt_progress_timeout=Spec.OptProgressTimeout, opt_timeout=Spec.OptTimeout, opt_version=Spec.OptVersion)
[INFO] 2024-07-10T09:12:28Z Downloading tool VelociraptorWindows FROM https://github.com/Velocidex/velociraptor/releases/download/v0.72/velociraptor-v0.72.4-windows-amd64.exe
client_repack: Will Repack the Velociraptor binary with 5733 bytes of config
Adding binary Autorun_386
Adding binary Autorun_amd64
Uploaded /tmp/datastore/Collector_velociraptor-v0.72.4-windows-amd64.exe (60829135 bytes)
[
 {
   "Repacked": {
      "Path": "/tmp/datastore/Collector_velociraptor-v0.72.4-windows-amd64.exe",
      "Size": 60829135,
      "sha256": "968b8802c10faeaec2a86b9295f66aeee45b79e30a3028be2162a8718b4a98e9",
      "md5": "3c9375283665d68817008d7a8f232796",
      "Components": [
         "Collector_velociraptor-v0.72.4-windows-amd64.exe"
      ]
   },
   "_Source": "Server.Utils.CreateCollector"
 }
]
```

As the output shows, Velociraptor will automatically download any
required binaries for inclusion in the collector. External binaries
will be cached in the datastore so the next time the command is run it
will just use those efficiently.

As mentioned previously it is recommended to use the `X509` encryption
method for the offline collector. Simply change the following part of
the spec file:

```yaml
EncryptionScheme: X509
```

The `velociraptor collector` command is similar to the `velociraptor
gui` command in using a directory on the disk to create a full
deployment with a `server.config.yaml` containing keys. When using the
`X509` command, the `server.config.yaml` file will be placed in that
datastore directory.

If you want to give other people the ability to decrypt the collection
you can share that `server.config.yaml` file with them and allow them
to unpack using:

```bash
velociraptor --config server.config.yaml collection.zip unzip --dump_dir /output/dir
```

### Include third party binaries

Sometimes we want to collect the output from other third party
executables. It would be nice to be able to package them together with
Velociraptor and include their output in the collection file.

Velociraptor fully supports incorporating external tools. When
creating the offline collection, Velociraptor will automatically pack
any third party binaries it needs to collect the artifacts specified.

### Collecting across the network

By having a single executable collector, all we need is to run it
remotely. We can use another EDR solution that allows remote execution
if available. Alternatively, we can use Window's own remote management
mechanisms (such as PsExec or WinRM) to deploy our binary across the
network.  Simply, copy our collector binary across the network to C$
share on the remote system and use, e.g. `wmic` to launch our binary
on the remote host.

![Collecting across the network](image45.png)

## Importing collections into the GUI

We can use the offline collector to fetch multiple artifacts from the
endpoint. The results consist of bulk data as well as JSON file
containing the result of any artifacts collected.

You can re-import these collection into the GUI so you can use the
same notebook port processing techniques on the data. It also allows
you to keep the results from several offline collections within the
same host record in the Velociraptor GUI.

> Offline collection + Import is very similar to client/server except
> that instead of the client connecting over the internet, the data is
> delivered via sneakernet!

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
