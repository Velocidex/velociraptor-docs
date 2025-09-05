---
menutitle: "fuse"
title: 'The "fuse" command'
date: 2025-05-20
last_reviewed: 2025-07-06
draft: false
weight: 65
summary: Mount collection archives on folders.
---

Mount collection archives on folders using [FUSE](https://en.wikipedia.org/wiki/Filesystem_in_Userspace)
(Filesystem in Userspace).

This command is only available in the Linux binary.

---

### [ fuse container ]

```text
fuse container [<flags>] <directory> <files>...
    Mount ZIP containers over fuse

      --accessor="collector"     The accessor to use (default container)
      --prefix="/"               Export all files below this directory in the zip file
      --tmpdir=TMPDIR            A temporary directory to use (if not specified we use our own tempdir)
      --[no-]map_device_names_to_letters
                                 Convert raw device names to drive letters
      --[no-]strip_colons_on_drive_letters
                                 Remove the : on drive letters
      --[no-]unix_path_escaping  If set we escape only few characters in file names otherwise escape windows compatible chars
      --[no-]emulate_timestamps  If set emulate timestamps for common artifacts like Windows.KapeFiles.Targets.

Args:
  <directory>  A directory to mount on
  <files>      list of zip files to mount
```

- The zip files need to be specified with full paths, however wildcards in the
  filename and path components are supported.

- The mount directory can be specified as a relative path.

- If multiple zip files are included then their contents are merged in the
  mount.

- If the zip files are secured with the server's X509 certificate then you need
  to provide the config to the command using the `--config` flag so that it can
  access the secured archive. Otherwise you will see the error
  "GetPrivateKeyFromScope: No frontend configuration given" logged in the
  terminal.

##### Example

```sh
# create an empty mount directory
$ mkdir -v ~/fuse_mount

# run the command. The -v flag is recommended if you want to see what's going on.
$ velociraptor fuse container --map_device_names_to_letters --strip_colons_on_drive_letters --unix_path_escaping \
--emulate_timestamps ~/fuse_mount /home/user/collections/Collection-*.zip -v
```
```sh
# work with the files in the mount directory
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
```sh
# Ctrl+C to terminate the fuse container command

# ensure that the mount directory is unmounted, otherwise you might have problems if reusing it for the next mount.
$ umount -v ~/fuse_mount
umount: /home/user/fuse_mount (rawBridge) unmounted
```
