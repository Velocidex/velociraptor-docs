---
title: "Building Offline Collectors"
menutitle: "Building"
date: 2025-11-03
last_reviewed: 2025-11-03
draft: false
weight: 10
---

Offline collectors can be created in the GUI or using the CLI.

The GUI is the recommended way to create them as it provides an intuitive
collector builder wizard that makes the process quick and easy. For advanced use
cases, such as automating the creation of collectors in a separate build
environment, the `collector` CLI command is often preferred, and we refer you to
[the command's documentation]({{< ref "/docs/cli/collector/" >}})
for further information on that option.

Here we will discuss the GUI-based method.

## The offline collector builder

The **Offline Collector Builder** is simply a GUI wrapper around the
`Server.Utils.CreateCollector` server artifact, so much of it will seem familiar
as many of the options are what you will also see when collecting any other
server artifact.

You can launch the offline collector builder using either:
- the <i class="fas fa-paper-plane"></i>
  button in the toolbar on the **Server Artifacts** screen
- the link on the Welcome screen (from version 0.75).

![Starting the Offline Collector builder](image3.svg)


The **Select Artifacts** page is exactly the same as the one you would see if
you were configuring a normal collection for a single client or for a hunt.

![Offline Collector artifacts selection](collector_artifacts.png)

On the **Configure Parameters** page you can edit the parameters for any of the
artifacts selected in the previous step. Here you can also remove artifacts from
your selection if needed.

![Offline Collector parameters configuration](collector_parameters.png)

The **Configure Collector** page is where you select the options that determine
how the offline collector will be built, and key aspects of it's runtime
behaviour.

![Offline Collector configuration](collector_configure.png)

### Collector Options

- **Target Operating System**

  This specifies the target platform and
  architecture of the Velociraptor binary that the
  [collector config]({{< ref "/docs/deployment/offline_collections/#what-is-an-offline-collector" >}})
  will be packed into. The choices cover the most commonly used Velociraptor
  binaries. Note that the list also includes the
  [Generic collector]({{< ref "/docs/deployment/offline_collections/#the-generic-collector" >}})
  option which is platform-independent.

  The option you choose will change the **Velociraptor Binary** tool button on
  the collector options form. Normally you don't need to do anything with this
  field, but it helps to understand what it means: The target binary that will
  be used is defined as a Velociraptor [tool]({{< ref "/docs/artifacts/tools/" >}})
  and the server will attempt to download it from GitHub. If your server has no
  internet access then this obviously won't work, so in that case you'll need to
  [manually upload the binary]({{< relref "#overriding-the-default-binaries" >}}).

- **Encryption**

  As explained [here]({{< ref "/docs/deployment/offline_collections/#collection-security" >}}),
  the zip archive used to store the collection results can be secured with
  encryption. Additional fields for the encryption key (certificate) or password
  will be displayed depending on which option you select.

- **Collection Type**

  This option determines the destination of the collection archive. Additional
  fields will be displayed relevant to the option you select.

  - `Zip Archive`: The collection will be stored in a zip file in the same
    directory the collector is launched from.

  - `Google Cloud Bucket`: The zip file will be uploaded to a Google Cloud
    Storage bucket.

  - `AWS Bucket`: The zip file will be uploaded to an AWS cloud bucket.

  - `Azure SAS URL`: The zip file will be uploaded to Azure blob storage using a
    SAS (Shared Access Signature) URL.

  - `SMB Share`: The zip will be uploaded to a SMB share, authenticating with a
    username and password.

  - `SFTP Upload`: This allows the collector to upload the file to an SFTP
    server authenticating using a private key.






 Once it is collected,
the artifact will automatically upload the pre-configured collector it
created into the collection and the file will be available for
download from the "Uploads" tab. Simply click on the link to get the
collector.

![Retrieving the Offline Collector binary](image13.svg)

Once the collector is run without command line arguments, the
collection will automatically start. No need for the user to enter
command line parameters, although they do need to be running in an
elevated administrator shell.

![Running the Offline Collector in the console](image14.png)

The collector creates a zip file containing the collected files as
well as an optional report.

![Viewing the Offline Collector in the console](image29.png)

## Encrypting the offline collection


Velociraptor supports a number of ways to derive the password with
which to protect the collection:






## Including third party binaries (tools)

* Sometimes we want to collect the output from other third party
  executables.
* Velociraptor can package dependent binaries together with the
  offline collector.
* Velociraptor can append a zip file to the end of the binary and
  adjust PE headers to ensure that it can be properly signed.


Sometimes we want to collect the output from other third party
executables. It would be nice to be able to package them together with
Velociraptor and include their output in the collection file.

Velociraptor fully supports incorporating external tools. When
creating the offline collection, Velociraptor will automatically pack
any third party binaries it needs to collect the artifacts specified.

Velociraptor will automatically download any
required binaries for inclusion in the collector. External binaries
will be cached in the datastore so the next time the command is run it
will just use those efficiently.


## Overriding the default binaries

The Velociraptor binaries that will be used for creating offline collectors are
defined as [tools]({{< ref "/docs/artifacts/tools/" >}}) in the
`Server.Internal.ToolDependencies` artifact. This is a built-in artifact that
is updated with each Velociraptor release. Using the tool definitions in this
artifact, Velociraptor will download the latest binary for the selected
platform/architecture from GitHub, if it is not already present in your server's
tools inventory. This ensures that when you create a new offline collector it
will be created using the release version for the selected platform
corresponding to your server's version.

You can override a specific binary by clicking on the tool button to access the
the tool management screen, and then manually uploading a different binary.

![](collector_binary.png)

![admin tool override](tool_override.png)

We call this an "admin override". This is rarely done but might be necessary in
some circumstances, for example:

- you need to create a collector for an unusual architecture that isn't provided
  by default - perhaps one that you've compiled yourself,

- you need to create a collector using an older binary version,

- you need to create a collector using an bugfixed pre-release version.

Although in all the abovementioned cases you could alternatively create a
[Generic Collector]({{< ref "/docs/deployment/offline_collections/#the-generic-collector" >}})
which can be used with any Velociraptor binary.

If you have performed an admin override can revert to the version defined in the
tool definition by clicking the **Re-Download File** button on the tool's
management screen.






