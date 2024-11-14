# How do I use the files inside the offline collector ZIP?

The Velociraptor offline collector is a convenient way to collect bulk
triage data quickly and efficiently, without having to install any new
software. The offline collector produces a zip file where metadata
about the collection and bulk files are stored.

However, because the container format is a ZIP file there are some
caveats about the way files are stored within it:

1. To enhance compatibility certain characters are escaped from a
   filename. For example, Velociraptor supports any form of paths but
   windows paths such as `\\.\C:` representing a device are not
   supported in a zip file (because they can not be extracted properly
   on windows).

   Therefore Velociraptor will escape these paths inside the ZIP file.

2. Some other programs try to preserve the timestamps of the acquired
   files inside the ZIP file. This is problematic because the ZIP
   format only supports storing one timestamp at a resolution of 1
   second.

{{% notice warning "Timestamps in triage collections" %}}

Some external tools attempt to use the acquired file timestamp in the
analysis and parsing of the file itself (e.g. prefetch parsing). This
is a mistake because it assumes the files being parsed are on the
originating system and they have not been collected or moved first. By
copying or manipulating files in any way those timestamps will change
increasing the chances of incorrect analysis.

Some triage tools go out of their way to preserve these timestamps at
the filesystem level - for example by creating a container NTFS image
instead of a ZIP file. While this helps to preserve some timestamps by
essentially timestomping the collected files into the correct
timestamp it is a workaround at best.

Velociraptor instead relies on timestamps being stored in the metadata
file and not within the ZIP file itself.

{{% /notice %}}

## Structure of the collected files

Lets examine the structure of the offline collection:

```
$ unzip -l Collection-WIN-SJE0CKQO83P_lan-2024-11-05T17_45_36Z.zip
Archive:  Collection-WIN-SJE0CKQO83P_lan-2024-11-05T17_45_36Z.zip
Length      Date    Time    Name
---------  ---------- -----   ----
       32  2024-10-15 16:16   uploads/ntfs/%5C%5C.%5CC%3A/$Extend/$UsnJrnl%3A$Max
     8192  2024-10-15 17:12   uploads/ntfs/%5C%5C.%5CC%3A/$Boot
  1048576  2024-10-15 17:12   uploads/ntfs/%5C%5C.%5CC%3A/$Extend/$RmMetadata/$TxfLog/$Tops%3A$T
     1152  2021-05-08 18:15   uploads/auto/C%3A/ProgramData/Microsoft/Windows/Start Menu/Programs/Server Manager.lnk
     1190  2024-10-15 00:06   uploads/auto/C%3A/ProgramData/Microsoft/Windows/Start Menu/Programs/Azure Arc Setup.lnk
     2349  2021-05-08 18:15   uploads/auto/C%3A/ProgramData/Microsoft/Windows/Start Menu/Programs/Immersive Control Panel.lnk
...
     3256  1980-00-00 00:00   results/Windows.KapeFiles.Targets%2FAll File Metadata.json.index
   137590  1980-00-00 00:00   results/Windows.KapeFiles.Targets%2FAll File Metadata.json
     3256  1980-00-00 00:00   results/Windows.KapeFiles.Targets%2FUploads.json.index
   222960  1980-00-00 00:00   results/Windows.KapeFiles.Targets%2FUploads.json
     6192  1980-00-00 00:00   log.json.index
   175374  1980-00-00 00:00   log.json
      910  2024-11-06 03:46   collection_context.json
   280433  2024-11-06 03:46   requests.json
      813  2024-11-06 03:46   client_info.json
     3448  1980-00-00 00:00   uploads.json.index
   154136  1980-00-00 00:00   uploads.json
---------                     -------
776656838                     442 files
```

We see the following:

1. The files collected using the `ntfs` accessor are stored in the
   prefix `uploads/ntfs/`.
2. Since those NTFS paths contain device names (with backslashes) that
   can not appear in a Windows filename, Velociraptor will escape the
   backslashes (So `\\.C:` becomes `%5C%5C.%5CC%3A`). If you also
   collect files from `VSS` they will be shown with the VSS device
   name escaped.
3. Files acquired using the `auto` accessor are stored with a prefix
   is `uploads/auto/`. Those filenames usually start with the drive
   name e.g. `C:` which has a `:` character. This is not usually
   allowed in a windows filename, so the character is escaped into
   `C%3A`
4. You can see that some of the files do retain the ZIP timestamp -
   this is done on a best effort basis as ZIP can only represent one
   timestamp with a second resolution.
5. The actual file metadata is stored in the `results` folder.


Let's examine the metadata:

```json
$ unzip -p Collection-WIN-SJE0CKQO83P_lan-2024-11-05T17_45_36Z.zip 'results/Windows.KapeFiles.Targets%2FUploads.json' | head -50 | tail -2

{"CopiedOnTimestamp":1730828739,"SourceFile":"C:\\Users\\Default\\NTUSER.DAT","DestinationFile":"C:\\Users\\Default\\NTUSER.DAT","FileSize":262144,"SourceFileSha256":"e05793b7ad9bb379514dcb59e778daeb76660cd19a009ee1d8d0dbcd4ed25de0","Created":"2021-05-08T08:06:51.7462883Z","Changed":"2024-10-14T15:32:30.3560316Z","Modified":"2024-10-14T15:32:30.3560316Z","LastAccessed":"2024-10-14T15:32:30.3560316Z","_Source":"Generic.Collectors.File/Uploads"}

{"CopiedOnTimestamp":1730828739,"SourceFile":"C:\\Windows\\System32\\winevt\\Logs\\HardwareEvents.evtx","DestinationFile":"C:\\Windows\\System32\\winevt\\Logs\\HardwareEvents.evtx","FileSize":69632,"SourceFileSha256":"f5f9e97a6b1ec8d46a9bd5b9d4ccae96521b85517b0337b248814d2e974a968b","Created":"2024-10-15T06:16:46.6761566Z","Changed":"2024-10-15T06:17:06.4886135Z","Modified":"2024-10-15T06:17:06.4886135Z","LastAccessed":"2024-10-15T06:17:06.4886135Z","_Source":"Generic.Collectors.File/Uploads"}
```

The metadata contains the precise filename seen, all the timestamps
and the correct hashes of the files collected.

## Preserving file names and timestamps

While you can extract the files using a regular ZIP program, the
program will likely not take into account the various transformations
made by the offline collector. If you need to have those preserved you
can use the
[Windows.KapeFiles.Extract](https://docs.velociraptor.app/artifact_references/pages/windows.kapefiles.extract/)
artifact to extract the files to a local directory.

```bash
velociraptor-v0.73.2-linux-amd64 -v artifacts collect Windows.KapeFiles.Extract --args ContainerPath=Collection-WIN-SJE0CKQO83P_lan-2024-11-05T17_45_36Z.zip --args OutputDirectory=/tmp/MyOutput/
```

This will extract the files from the container to the directory
`/tmp/MyOutput/` preserving their timestamps.


## Using FUSE to mount the collection

On Linux, a mechanism called `fuse` (Filesystem in Userspace) exists
to allow an application to mount a `filesystem` as a directory on the
global filesystem. While extracting the collection using the above
method works, it still results in rewriting the same files again on
the system, therefore using more disk space and time.

Instead we can use Velociraptor to mount the offline collection onto a
local directory - transparently decompressing data and applying the
file metadata as various timestamps.

```
./velociraptor-v0.73.2-linux-amd64 -v fuse container /tmp/mnt/ Collection-WIN-SJE0CKQO83P_lan-2024-11-05T17_45_36Z.zip --emulate_timestamps --unix_path_escaping --map_device_names_to_letters --strip_colons_on_drive_letters
```

The above command will mount the container on the directory
`/tmp/mnt`. The following options are supported:

* `--emulate_timestamps` will recreate all timestamps from the metadata file.
* `--unix_path_escaping` will allow some characters which are not allowed on windows by are allowed on Unix (e.g. `:`)
* `--map_device_names_to_letters` will replace NTFS style devices like `\\.\C:` with drive letters `C:`
* `--strip_colons_on_drive_letters` will remove `:` characters completely so `C:` will become a directory called `C`

Tags: #forensics
