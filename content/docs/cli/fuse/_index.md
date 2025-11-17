---
menutitle: "fuse"
title: 'The "fuse" command'
date: 2025-05-20
last_reviewed: 2025-011-15
draft: false
weight: 65
summary: Mount collection containers on folders.
aliases:
  - "/knowledge_base/tips/fuse_mount/"
---

Mount collection containers on folders using FUSE.

This command is only available in the Linux binary.

### [ fuse container ]

```text
fuse container [<flags>] <directory> <files>...
    Mount ZIP containers over fuse

    --accessor="collector"     The accessor to use (default collector)
    --prefix="/"               Export all files below this directory in the zip file
    --[no-]map_device_names_to_letters
                               Convert raw device names to drive letters
    --[no-]strip_colons_on_drive_letters
                               Remove the : on drive letters
    --[no-]unix_path_escaping  If set we escape only few characters in file names otherwise escape windows compatible chars
    --[no-]emulate_timestamps  If set emulate timestamps for common artifacts like Windows.Triage.Targets.
    --[no-]merge_accessors     If set merge all the accessors into the same directory (implied --map_device_names_to_letters).

Args:
  <directory>  A directory to mount on
  <files>      list of zip files to mount
```

---

On Linux, a mechanism called
[FUSE](https://en.wikipedia.org/wiki/Filesystem_in_Userspace) (Filesystem in
UserSpacE) allows an application to mount a filesystem as a directory on the
global filesystem. As the name suggests, this does not require root privileges,
unlike conventional mounts.

While extracting collection containers is possible, it results in duplicating
the same data on the analysis system, therefore consuming more disk space and
taking up valuable investigative time for the extraction. Instead we can use
Velociraptor to mount the offline collection onto a local directory -
transparently decompressing the data and restoring timestamps from file metadata
that's stored separately in the collection container. FUSE provides
non-sequential access to the data which is important, especially when dealing
with very large collections.

Mounting containers via FUSE also has the advantage of being able to represent
certain filenames and paths more accurately, for example
`C/$Extend/$UsnJrnl:$J`, which if extracted would not be allowed on certain
filesystems and would be represented with their URL-encoded equivalent.

##### Mount options

By default the command applies several transformations to the paths in the
container to make them easier to post-process with external tools, which is the
most common use case. However the following options are available to modify the
default behavior:

- `prefix`: exports all files below this directory in the zip file, for example
  `"/uploads/auto/C%3A/"` will move the mount point to that directory within the
  zip.

- `emulate_timestamps` (enabled by default): will recreate all timestamps from
  the metadata files stored in the container.

- `unix_path_escaping` (disabled by default): will allow some characters (e.g.
  `:`) which are not allowed on windows but are allowed on Unix. If set, all
  path characters will be allowed except `/` which will be escaped (This is
	correct on Linux). If false, escape Windows // illegal characters in paths.

- `map_device_names_to_letters` (enabled by default): will replace NTFS-style
  devices like `\\.\C:` with drive letters `C:`.

- `strip_colons_on_drive_letters` (enabled by default): will remove `:`
  characters completely so `C:` will become a directory in the output named `C`.

- `merge_accessors` (enabled by default): merges all separate
  [accessors]({{< ref "/vql_reference/accessors/" >}})
  into the same directory (which will be named `files`). By default Velociraptor
  stores file uploads under the name of the accessor that was used to collect
  them. This allows you to keep track of which accessor was originally used to
  read the file. However when processing these files with external tools it is
  sometimes convenient or even necessary to merge them into a single root
  directory.


##### Usage Notes

- The zip files need to be specified with full paths, however wildcards in the
  filename and path components are supported.

- The mount directory can be specified as a relative path.

- If multiple zip files are specified then their contents are merged in the
  mount. Note that when 2 or more containers are merged they are layered over
  each other in the order that they were specified on the command line. So if
  there are 2 different files (or 2 different versions of the same file) using
  the same path then in the mount directory you will see the last one in the
  stack. It's important to keep this in mind since the container format uses
  several standard paths for certain common collection files. Merging is
  primarily intended for files in the collection's "uploads", i.e. files copied
  from the endpoint, so that you can work with them all together in one tree
  structure. Note that this is also distinct from the `merge_accessors` option
  which merges accessors, not containers.

- If the zip files are secured with the server's X.509 certificate then you need
  to provide the config to the command using the `--config` (or `-c`) flag so
  that it can access the server's private key. Otherwise you will see the error
  `"GetPrivateKeyFromScope: No frontend configuration given"` logged in the
  terminal.

##### Example

1. Create an empty mount directory.

   ```sh
   $ mkdir -v ~/fuse_mount
   ```

2. Run the `fuse container` command. The -v flag is recommended if you want to
   see what's going on.

   ```sh
   $ velociraptor fuse container --map_device_names_to_letters --strip_colons_on_drive_letters --unix_path_escaping \
   --emulate_timestamps ~/fuse_mount /home/user/collections/Collection-*.zip -v
   ```

3. Work with the files in the mount directory.

   ```sh
   $ tree ~/fuse_mount/
   /home/user/fuse_mount/
   ├── client_info.json
   ├── collection_context.json
   ├── log.json
   ├── log.json.index
   ├── requests.json
   ├── results
   │   ├── Windows.KapeFiles.Targets%2FAll File Metadata.json
   │   ├── Windows.KapeFiles.Targets%2FAll File Metadata.json.index
   │   ├── Windows.KapeFiles.Targets%2FUploads.json
   │   └── Windows.KapeFiles.Targets%2FUploads.json.index
   ├── uploads
   │   └── auto
   │       └── C
   │           └── Windows
   │               └── System32
   │                   └── winevt
   │                       └── Logs
   │                           ├── Application.evtx
   │                           ├── HardwareEvents.evtx
   │                           ├── Internet Explorer.evtx
    ...
   ```

4. Ctrl+C to terminate the fuse container command when you're done. You should
   always ensure that the mount directory is unmounted, otherwise you will have
   problems if reusing it for the next mount.

   ```sh
   $ umount -v ~/fuse_mount
   umount: /home/user/fuse_mount (rawBridge) unmounted
   ```
   > <i class="fas fa-triangle-exclamation" style="color:gray"></i>
   > If you try to reuse a mount directory without first unmounting it, you will see
   > an error like:
   > `/usr/bin/fusermount3: failed to access mountpoint /home/user/fuse_mount: Permission denied`.


##### See also

- [[ decrypt ]]({{< ref "/docs/cli/misc/#-decrypt-" >}}), which removes the encryption from collection containers without
  extracting the collection's files.

- [[ unzip ]]({{< ref "/docs/cli/misc/#-unzip-" >}}), which works similarly to
  `decrypt` but lists filenames or extracts the files from a collection
  container.

- [Offline collections > Mounting with the fuse container command]({{< ref "/docs/deployment/offline_collections/collection_data/#mounting-with-the-fuse-container-command" >}})
