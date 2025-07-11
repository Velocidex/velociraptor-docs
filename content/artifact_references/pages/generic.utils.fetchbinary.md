---
title: Generic.Utils.FetchBinary
hidden: true
tags: [Client Artifact]
---

A utility artifact which fetches a binary from a URL and caches it on disk.
We verify the hash of the binary on disk and if it does not match we fetch it again
from the source URL.

This artifact is designed to be called from other artifacts. The
binary path will be emitted in the OSPath column.

As a result of launching an artifact with declared "tools"
field, the server will populate the following environment
variables.

Tool_<ToolName>_HASH     - The hash of the binary
Tool_<ToolName>_FILENAME - The filename to store it.
Tool_<ToolName>_URL      - The URL to fetch the binary from.
Tool_<ToolName>_URLs     - A set of possible URLs to fetch the binary from.

Older server versions only supported a single URL but current
versions send a set of URLs to try in order.


<pre><code class="language-yaml">
name: Generic.Utils.FetchBinary
description: |
   A utility artifact which fetches a binary from a URL and caches it on disk.
   We verify the hash of the binary on disk and if it does not match we fetch it again
   from the source URL.

   This artifact is designed to be called from other artifacts. The
   binary path will be emitted in the OSPath column.

   As a result of launching an artifact with declared "tools"
   field, the server will populate the following environment
   variables.

   Tool_&lt;ToolName&gt;_HASH     - The hash of the binary
   Tool_&lt;ToolName&gt;_FILENAME - The filename to store it.
   Tool_&lt;ToolName&gt;_URL      - The URL to fetch the binary from.
   Tool_&lt;ToolName&gt;_URLs     - A set of possible URLs to fetch the binary from.

   Older server versions only supported a single URL but current
   versions send a set of URLs to try in order.

parameters:
  - name: ToolName
    default: Autorun_amd64

  - name: IsExecutable
    type: bool
    default: Y
    description: Set to Y if the file needs to be executable (on windows it will have .exe extension)

  - name: SleepDuration
    default: "20"
    type: int
    description: A time to sleep before fetching the binary.

  - name: ToolInfo
    type: hidden
    description: A dict containing the tool information (deprecated).

  - name: TemporaryOnly
    type: bool
    description: |
      If true we use a temporary directory to hold the binary and
      remove it afterwards

implied_permissions:
  - SERVER_ADMIN
  - FILESYSTEM_WRITE

sources:
  - query: |
      -- Optionally accepts multiple download URLs from the server
      LET ParseUrls(Url) = parse_json_array(data=Url || '[]')

      LET args &lt;= dict(
        ToolHash=get(field="Tool_" + ToolName + "_HASH"),
        ToolFilename=get(field="Tool_" + ToolName + "_FILENAME"),
        ToolURL=get(field="Tool_" + ToolName + "_URL"),
        ToolURLs=ParseUrls(Url=get(field="Tool_" + ToolName + "_URLs")))

      LET _ &lt;= if(condition=NOT args.ToolFilename,
       then=log(level="ERROR",
         message="Tool %v not configured by the server. Did you define it as an artifact tool? %v", args=[ToolName, args]))

      // By default the temp directory is created inside a trusted directory.
      LET TempDir &lt;= tempdir(remove_last=TRUE)

      // Where store the file. If the user specified TemporaryOnly we
      // remove it with the tempdir, otherwise we store it in the trusted
      // directory.
      LET binpath &lt;= if(condition=TemporaryOnly, then=TempDir, else=dirname(path=TempDir))

      // Where we should save the file - use the filename as specified by the server.
      LET ToolPath &lt;= path_join(components=[binpath, args.ToolFilename || "Unknown"])

      // Download the file from the binary URL and store in the local
      // binary cache.
      // If http_client support multiple URLs use them.
      LET download_multiple = SELECT * FROM if(condition=args.ToolURLs
        AND version(plugin="http_client") &gt; 2
        AND log(
             message="URLs for %v are at %v. The tool has a hash of %v", args=[
                 args.ToolFilename , args.ToolURLs, args.ToolHash
             ])
             AND args.ToolHash,
        then={
          SELECT hash(path=Content) as Hash,
              args.ToolFilename AS Name,
              "Downloaded" AS DownloadStatus,
              copy(filename=Content, dest=ToolPath,
                   permissions=if(condition=IsExecutable, then="x")) AS OSPath
          FROM http_client(url=args.ToolURLs, tempfile_extension=".tmp")
          WHERE log(message=format(format="downloaded hash of %v: %v, expected %v", args=[
                    Content, Hash.SHA256, args.ToolHash]))
                AND Hash.SHA256 = args.ToolHash
        })

      // Download the file from the binary URL and store in the local
      // binary cache. Used for old clients with http_client that only supports one URL.
      LET download_single = SELECT * FROM if(condition=log(
             message="URL for " + args.ToolFilename +
                " is at " + args.ToolURL + " and has hash of " + args.ToolHash)
             AND args.ToolHash AND args.ToolURL,
        then={
          SELECT hash(path=Content) as Hash,
              args.ToolFilename AS Name,
              "Downloaded" AS DownloadStatus,
              copy(filename=Content, dest=ToolPath,
                   permissions=if(condition=IsExecutable, then="x")) AS OSPath
          FROM http_client(url=args.ToolURL, tempfile_extension=".tmp")
          WHERE log(message=format(format="downloaded hash of %v: %v, expected %v", args=[
                    Content, Hash.SHA256, args.ToolHash]))
                AND Hash.SHA256 = args.ToolHash
        }, else={
           SELECT * FROM scope()
           WHERE NOT log(message="No valid setup - is tool " + ToolName +
                        " configured in the server inventory?")
        })

      // Check if the existing file in the binary file cache matches
      // the hash.
      LET existing = SELECT OSPath, hash(path=OSPath) AS Hash, Name,
                    "Cached" AS DownloadStatus
        FROM stat(filename=ToolPath)
        WHERE log(message=format(format="Local hash of %v: %v, expected %v", args=[
            OSPath, Hash.SHA256, args.ToolHash]))
        AND Hash.SHA256 = args.ToolHash

      // Find the required_tool either in the local cache or
      // download it (and put it in the cache for next time). If we
      // have to download the file we sleep for a random time to
      // stagger server bandwidth load.
      SELECT *, OSPath AS FullPath
      FROM switch(
        b=existing,
        c={
           SELECT rand(range=SleepDuration) AS timeout
           FROM scope()
           WHERE args AND args.ToolURL AND
              log(message=format(format='Sleeping %v Seconds',
                 args=[timeout])) AND sleep(time=timeout) AND FALSE
        },
        d=download_multiple,
        e=download_single)

</code></pre>

