---
menutitle: "Tools"
title: "Managing external tools"
date: 2025-01-25
weight: 120
summary: "Defining and adding tools in artifacts"
last_reviewed: 2026-11-19
description: |
  How Velociraptor defines, distributes, and caches tools for artifacts.
---

Velociraptor is a powerful endpoint visibility tool. It has plugins
and parsers for many file formats, such as raw NTFS access, raw
registry hive, prefetch files etc. One of the strengths of
Velociraptor is its flexibility afforded by the use of the
[Velociraptor Query Language (VQL)](/docs/vql/).

However, as most DFIR professionals know, there are many tools out
there that we would like to use in our IR work. Many of these tools
are not specifically designed to work in a fast-evolving network
environment.

Velociraptor can orchestrate the use of these tools at scale, across
the network, using the built-in tools support.

## How can Velociraptor manage and distribute tools?

Velociraptor pushes third-party `tools` to the endpoint. In this
context, tools are third-party binaries or other files (for example
YARA rule files) that we want to make available on the endpoint.

Tools are managed by the inventory service, the part of Velociraptor
that tracks tools.

At a high level:

1. A tool is a file managed by the inventory service, known by its
   `Tool Name` and `Version`.

2. A tool is defined as a dependency of a specific artifact in the
   artifact definition YAML.

3. When the artifact is scheduled for collection, Velociraptor ensures
   the tool is available for delivery to the endpoint by its
   `Tool Name`.

4. A Velociraptor administrator may override the tool with a different
   version and decide where the tool should be served from.

5. Once a tool is delivered to the endpoint, it is cached there for
   the next use of the artifact. If the tool changes since the time of
   last use, the new version is delivered to the endpoint
   automatically.

The built-in tool support ensures that artifact writers do not need to
think about managing the tools: all they need to do is define the tool
as a dependency of their artifact and then use it in the VQL. The
logistics of managing the tool, delivering it to the endpoint, and
ensuring the correct version is present are all handled by
Velociraptor in a consistent way.

Let's examine how Velociraptor tools are implemented and used in
detail.

### Defining a tool

Before an artifact can use a managed tool, the artifact writer should
declare that tool as a dependency.

Let's look at an example of an artifact that uses a tool:

```
name: Linux.OSQuery.Generic

tools:
  - name: OSQueryLinux
    url: https://github.com/Velocidex/OSQuery-Releases/releases/download/4.4.0/osquery-4.4.0-linux-amd64
    serve_locally: true
    expected_hash: 2e42fe964d2a0fc16fd1b565c25f2a2cae2784f483638a956eb616b288e6323a

parameters:
  - name: Query
    default: "SELECT * FROM osquery_info"

sources:
  - query: |
      LET result = SELECT * FROM foreach(row={
        SELECT OSPath
        FROM Artifact.Generic.Utils.FetchBinary(ToolName="OSQueryLinux")
      }, query={
        SELECT * FROM execve(
         argv=[OSPath, "--json", Query],
         length=1000000)
      })

      SELECT * FROM foreach(row=result,
      query={
         SELECT * FROM parse_json_array(data=Stdout)
      })
```

The artifact defines a list of tools under the `tools:` section. Each
tool has a set of options:

* The `name` is the name of the tool that will be used in the artifact
  body itself.
* The `url` is where the tool can be downloaded from. Tools are not
  downloaded until the artifact is scheduled for the first time, so
  they can be delivered to the endpoint.
* The `serve_locally` flag controls if the endpoint should fetch the
  tool from the Velociraptor server itself, or directly from the `url`
  in the definition. This is the initial preference, because the
  setting can be configured by the administrator later.
* The `expected_hash` declares the SHA-256 hash of the tool as fetched
  from the URL. This extra control ensures that the tool cannot be
  replaced by the upstream publisher without the artifact writer being
  aware of it. This is a protection against supply chain attacks.

The `url` can be an `http://` or `https://` URL, a `file://` URL, or a
`smb://` URL. SMB URLs are useful on networks where tools are kept on
a file share rather than downloaded from the internet:

```yaml
tools:
  - name: Autorun
    url: smb://uploader:password@192.168.1.1/Tools/Autorun.exe
    serve_locally: true
```

See the [`http_client()`](/vql_reference/popular/http_client/)
reference for details on these URL schemes. The server fetches the
tool once to calculate its hash. If the tool is served locally, the
endpoints then fetch it from the Velociraptor server. Otherwise the
endpoints fetch it directly, so with an SMB URL they must be able to
reach the share themselves. The SMB credentials must allow the file
to be read by the server when it fetches the tool, and by the
endpoints when they fetch directly from the share.

Of all these options, only the `name` is mandatory. If the `url`
is not specified, then the server is unable to automatically fetch the
file on first use, so the artifact cannot be scheduled until the admin
uploads a tool manually (see [Managing tools](#managing-tools)). This
is a valid configuration for artifacts that use commercial tools that
are not widely distributed.

### Using a tool in the artifact

Once the tool is defined as a dependency, the artifact may use it via
the `Generic.Utils.FetchBinary` artifact:

```vql
  SELECT OSPath
  FROM Artifact.Generic.Utils.FetchBinary(ToolName="OSQueryLinux")
```

This artifact handles the logistics of managing the tool on the
endpoint:

1. Check the local cache on the endpoint for the presence of the tool.
2. If there is a cached version of the tool, then check the hash of
   the local file to ensure it matches the required hash.
3. If the local copy of the file is not present, or its hash does not
   match the required hash, the `FetchBinary` artifact fetches a new
   copy of the file.

If all goes well the `FetchBinary` artifact emits a single row with a
column `OSPath` of the local path on the endpoint to the file (this
will be in the Tools cache directory).

> [!TIP] Consuming the output of the FetchBinary artifact
> In this example, we iterate over the output of the `FetchBinary`
> artifact using a `foreach()` plugin. This method is more defensive, as
> if the tool fails to be fetched, the query does nothing:
>
> ```vql
> LET result = SELECT * FROM foreach(row={
>   SELECT OSPath
>   FROM Artifact.Generic.Utils.FetchBinary(ToolName="OSQueryLinux")
> }, query={
>   ... Do stuff with OSPath
> })
> ```
>
> In many other artifacts we see a pattern like:
>
> ```vql
>  LET binary <= SELECT OSPath
>  FROM Artifact.Generic.Utils.FetchBinary(ToolName="OSQueryLinux")
>
>  SELECT * FROM execve(
>     argv=[ binary[0].OSPath, "--json", Query],
>     length=1000000)
> ```
>
> This works because `binary` is a list of rows so we index the first
> row with `[0]` and take the `OSPath` column. However, this pattern is
> not robust: If the tool fails to download, `binary` will be an
> empty list, and `binary[0].OSPath` will be `NULL`. This is dangerous
> because the artifact will then attempt to execute a program called
> `NULL`, which is not the intention.

Usually the output of the tool is processed by the artifact somehow,
for example, the tool may write output in JSON or CSV or simply create
some output files that the artifact uses `upload()` to deliver to the
server.

#### Generic.Utils.FetchBinary options

By default, `Generic.Utils.FetchBinary` ensures that the filename
ends with a `.exe` extension, which is required on Windows to be able
to run the tool. On Unix-like systems, the tool is written with the
execute permission enabled.

If you are using the tools feature to distribute non-binary files
(for example a `zip` file), the `.exe` extension can be unexpected
(and can also trigger some security tools on the endpoint). You can
tell `FetchBinary` that the file is not an executable by setting
`IsExecutable` to `FALSE` or "N".

When `FetchBinary` decides to fetch the file from the server, it adds
a small random sleep interval. This avoids overloading the server
during large hunts, when all endpoints try to download the tool at
the same time. You can change the sleep interval with the
`SleepDuration` parameter if the tool is exceptionally large and might
overload the network.

Finally, if you prefer not to cache the tool locally, use
`TemporaryOnly` to prevent the tool from being cached. This increases
network load and delays re-collecting the same artifact, but it might
be appropriate for tool files that change frequently, where caching
does not make sense.

## Managing tools

The previous sections showed how tools can be used in artifacts, but
typically Velociraptor administrators need to have more control over
the files that are distributed.

Tools are managed using the **Tool Setup** screen. You can open
**Tool Setup** whenever the artifact is shown, for example in the
**View Artifact** screen or when selecting the artifact in new
collections.

![Opening the tool setup screen](opening_tool_setup.svg)

Once the setup screen is open, you can manage how tools are
distributed.

![The tool setup screen](tool_setup.svg)

The interface has the following parts:

1. **Tool Name** and **Artifact Definition** refer to the specific
   tool you are editing, and where it was defined.

2. It is possible to use the same tool in multiple artifacts, which
   means it is defined in multiple artifacts. Only one definition is
   used at a time, however. The **Other Definitions** menu shows where
   else the tool is defined and lets you switch to the relevant
   definition (and reset the tool definition to the defaults).

3. **Upstream URL** indicates where the tool originally resides. The
   server attempts to fetch the tool from that URL before scheduling
   the artifact.

4. Once the tool is fetched (in Velociraptor terminology, the tool is
   *materialized*), the server can calculate the hash. This is the hash
   that endpoints require before they use the tool.

5. In this case, the tool is served locally (that is, fetched
   from the Velociraptor server itself).

6. **Serve URL** is the URL the endpoint fetches the tool from. When
   the tool is served by Velociraptor, this is an obfuscated URL based
   on the filename, under the server's public directory.

7. The **Override Tool** section lets the administrator override how
   the tool is served. The user can upload a binary to use as that tool
   through the interface.

   Alternatively, the administrator can override **Serve URL** to an
   external URL. This is useful when the tool is large and needs to be
   distributed to a large number of hosts. Setting **Serve URL** to a
   cloud provider storage bucket, for example, handles issues of scale
   and bandwidth.

   **Serve URL** can also be a URL with a non-HTTP scheme, such as
   `smb://uploader:password@192.168.1.1/Tools/Autorun.exe` (see
   [Defining a tool](#defining-a-tool)). When an SMB URL is used, the
   endpoints download the tool directly from the file share, so they
   must be able to reach it.

8. The **Served Locally** button toggles whether the endpoint fetches
   the tool from the Velociraptor server or from the upstream URL. Most
   upstream publishers, such as GitHub, have DDoS protection, so using
   the tool in a hunt may trigger rate limiting when thousands of
   endpoints fetch the same file. Consider delegating serving to a
   cloud provider as described earlier.

> [!TIP] The Velociraptor Public directory
> No authentication is required to fetch URLs from the
> Velociraptor public directory, only knowledge of the obfuscated
> URL itself. This means that the URL is in itself a form of shared
> secret.

### Managing tools in restricted environments

During security incidents, many environments are locked down, and it
is not possible for the Velociraptor server to reach out to fetch
tools from the internet when needed (that is, internet access is shut
down or blocked). You might also have to work in environments that
are permanently air-gapped.

In these environments, you need to manually pre-populate the tools
inventory with the binaries of all the tools you want to use in
advance. This also gives you the opportunity to curate the tools that
are allowed.

To facilitate this, we provide a built-in server artifact that
partially automates the process:
[`Server.Utils.UploadTools`](/artifact_references/pages/server.utils.uploadtools/)

This artifact is designed to be used as follows:

1. The first time you collect it, it creates a downloader bash script
   that you can find in the collection's **Uploaded Files** tab. The
   script uses `curl` to download the binaries into the current folder.
   Copy that script to a system that has internet access and `curl`.

   ![The uploader script generated by Server.Utils.UploadTools](uploader_script.png)

2. On an internet-connected system, you create a folder and then run
   the script produced in the first step from that folder. This
   downloads all the binaries.

3. You move the folder containing the binaries to your Velociraptor server (the
   one that doesn't have internet access), and there you run the same artifact a
   second time, but this time pointing it to the folder using the artifact's
   `BasePath` parameter. This step loads all the binaries into the tools
   inventory.

   ![Re-importing all the binaries manually](import_directory.png)

If the binaries are already on a file share, you can set the tool
`url` to an `smb://` URL (for example
`smb://uploader:password@192.168.1.1/Tools/Autorun.exe`) instead of
importing them. The server must be able to read the tool from the
share once to materialize it. After that, endpoints fetch it directly
from the share unless the tool is served locally, and the server does
not need internet access.

## Working with the tools inventory via the CLI

{{% include-page "/docs/cli/tools/" %}}
