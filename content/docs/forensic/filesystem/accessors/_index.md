---
title: "Accessor Reference"
description: |
    Velociraptor has a large number of accessors. This page documents the most common ones.

date: 2024-04-11T23:25:17Z
draft: false
weight: 40
---


## auto

The `auto` accessor is the default accessor that is used when a VQL
query does not specify an `accessor` parameter.

On Windows it attempts to open the file using the `file` accessor and
if that fails (for example due to permission errors), the `auto`
accessor automatically tries the `ntfs` accessor to access the file
using raw level filesystem parsing.

The overall effect is that the Velociraptor is able to transparently
access files that are locked (for example registry hives) or are
protected by filter drivers (e.g. some endpoint security software). In
general you should use the `auto` accessor to open files on the local
filesystem in all cases since it will be much faster than using the
`ntfs` accessor for every file (most files are not actually locked).

On other operating systems, the `auto` accessor is an alias to the
`file` accessor.

## bzip2

The bzip2 accessor is able to read the content of `bz2` compressed
files. It is very similar to the `gzip` accessor.

Since `bzip2` compressed files do not have an actual file hierarchy,
they can not be directly searched with `glob()`. This accessor is
therefore only really useful for opening the file for reading - or for
chaining with another accessor.

```sql
SELECT read_file(accessor="bzip2", filename="F:/hello.txt.bz2", length=10)
FROM scope()
```

Performance: Bzip2 files are non-seekable. This means they must be
read in sequence from start to finish. If the VQL query attempts to
seek within the file, this accessor will automatically decompress the
entire file into a temporary file so it can seek within it. This means
that performance can be extremely bad in some cases.

## collector

Open an offline collector zip file as if it was a directory. This is
similar to the `zip` accessor (see below) but it automatically
decrypts collections protected using the x509 scheme. Use this accessor to transparently read inside encrypted collections.

This accessor also automatically expands sparse files by zero padding
them (when possible - if zero padding is unreasonable large for this
file, we do not expand it).

## collector_sparse

Same as the `collector` accessor but does not expand sparse files.

## data

Makes a string appears as an in memory file. Path is taken as a
literal string to use as the file's data.

This accessor is useful to allow plugins that normally accept files to
also accept a plain string (for example `parse_binary()`).


## ewf

Allow reading an `EWF` file.

Note that usually `EWF` files form a set of files with extensions like
`.E01`, `.E02` etc. This accessor will automatically try to find all
parts of the same volume set if the file name ends with a `.E01`.

For Example

```vql
SELECT * FROM glob(
  globs="*", accessor="raw_ntfs", root=pathspec(
    Path="/",
    DelegateAccessor="ewf",
    DelegatePath="C:/test.ntfs.dd.E01"))
```

The next example reads a FAT partition through the offset
accessor (32256 is the byte offset of the first FAT partition).

```
SELECT OSPath.Path AS OSPath, Size, Mode.String
FROM glob(
  globs="*", accessor="fat",
  root=pathspec(
    Path="/",
    DelegateAccessor="offset",
    DelegatePath=pathspec(
      Path="/32256",
      DelegateAccessor="ewf",
      DelegatePath="/tmp/ubnist1.gen3.E01")))
```


## fat

Access the FAT filesystem inside an image by parsing FAT.

This accessor is designed to operate on images directly. It requires a
delegate accessor to get the raw image and will open files using the
FAT full path rooted at the top of the filesystem.

### Example

The following query will glob all the files under the directory `a`
inside a FAT image file

```sql
SELECT *
FROM glob(globs='/**',
  accessor="fat",
  root=pathspec(
    Path="a",
    DelegateAccessor="file",
    DelegatePath='fat.dd'))
```

## file

Access the filesystem using the OS API.

NOTE: This accessor does not follow symbolic links on `Windows` or
`Linux` in order to avoid being trapped by cycles. This means that on
some Linux systems you will find `/usr/bin/ls` instead of `/bin/ls`
since `/bin` is a symlink to `/usr/bin/`

## file_links

Access the filesystem using the OS APIs.

This Accessor also follows any symlinks

Note: Take care with this accessor because there may be circular
links. In particular this is dangerous on Linux when accidentally
entering the `/proc` part of the filesystem because it contains
circular links to everywhere.

## file_nocase

Access the filesystem using the OS API.

On Linux this accessor implements case insensitive comparisons over
the usual case sensitive filesystem. This is important for cases where
Windows files are unpacked on a Linux system and you are trying to use
artifacts written for Windows - they may fail due to incorrect casing
making it impossible to find the right files.

## gzip

Access the content of gzip files. The filename is a pathspec with a
delegate accessor opening the actual gzip file.

Since `gzip` compressed files do not have an actual file hierarchy,
they can not be directly searched with `glob()`. This accessor is
therefore only really useful for opening the file for reading - or for
chaining with another accessor.

```sql
SELECT read_file(accessor="gzip", filename="F:/hello.txt.gz", length=10)
FROM scope()
```

Performance: `GZIP` files are non-seekable. This means they must be
read in sequence from start to finish. If the VQL query attempts to
seek within the file, this accessor will automatically decompress the
entire file into a temporary file so it can seek within it. This means
that performance can be extremely bad in some cases.


## lazy_ntfs

Access the NTFS filesystem by parsing NTFS structures.

This accessor is a variation of the `ntfs` accessor. It is a bit
faster because it does not enumerate all the attributes in files
contained in directories, instead relying only on the `I30` index
streams. This means it is unable to find Alternate Data Streams in
directories (because ADS are not stored in the I30 stream).

Usually the extra performance is not worth these limitations since the
`ntfs` accessor is pretty fast these days already.

## me

The `me` accessor is used to retrieve files packed inside the
Velociraptor binary (for example in the offline collector). Currently
this is similar to the zip accessor but it might change in future. Do
not use this accessor directly, instead use the supported
`Generic.Utils.FetchBinary` artifact to retrieve packed files.

## mft

The `mft` accessor is used to access arbitrary MFT streams as files.

The filename is taken as an MFT inode number in the form
`<entry_id>-<stream_type>-<id>`, e.g. `203-128-0`. The first component
of the file is the device number to open (e.g. `C:`)

This accessor does not support directories and so can not be used in
`glob()`

An example of using this artifact:

```
SELECT upload(accessor="mft", filename="C:/203-128-0")
FROM scope()
```


## ntfs

Access the NTFS filesystem by parsing NTFS structures.

This accessor uses an NTFS parser to present the content of the NTFS
filesystem as a simple filesystem. It emulates the regular `file`
accessor and its interpretation of the paths:

1. At the top level of the filesystem, this accessor enumerates all
   fixed drives and VSS devices to present a list of valid devices
   that may be parsed. For example

   - `\\.\C:` - The C drive device
   - `\\\?\GLOBALROOT\Device\HarddiskVolumeShadowCopy1` - The first VSS device.

2. The accessor will automatically convert from Windows paths to ntfs
   paths. For example the path `C:/Windows` will be converted to
   `\\.\C:\Windows`

This accessor is only available on Windows.

See the `raw_ntfs` accessor for more information and comparisons.


## ntfs_vss

Access the NTFS filesystem by considering all VSS.

This accessor considers all Volume Shadow Copies available on the
system to deduplicate all files which are identical across all
VSS. Only files that have been modified are shown.

This makes it easier to compare files across VSS copies. If the file
is the same across all VSS then the accessor prefers to show the one
of the main device (i.e. `\\.\C:`)


## offset

Allow reading another file from a specific offset. The filename is
taken as an offset into the delegate.

For Example

```sql
SELECT read_file(accessor="offset", filename=pathspec(
    DelegateAccessor="data",
    DelegatePath="Hello world",
    Path="/6"))
FROM scope()

-> "world"
```

This accessor is useful in cases where we need to rebase the zero
offset into the file. For example when reading a filesystem partition
from an image.

## pipe

Read from a VQL pipe.

**NOTE: this is not the same as a windows named pipe**.

A VQL pipe allows data to be generated from a VQL query, as the pipe
is read, the query proceeds to feed more data to it.

Example:

```sql
LET MyPipe = pipe(query={
    SELECT _value FROM range(start=0, end=10, step=1)
}, sep="\n")

SELECT read_file(filename="MyPipe", accessor="pipe")
FROM scope()
```

It is mostly useful for redirecting the output of one query to another
without using temp files. You probably do not want to use it!

## process

Access process memory like a file.

The Path is taken in the form `/<pid>`, i.e. the pid appears as the
top level path component.

The accessor does not support directories so it can not be used with
the `glob()` plugin. It is useful for any functions or plugins that
need to read from process memory.

Note that process memory is typically very sparse (on 64 bit systems
it covers the entire address space). Therefore, Velociraptor will
treat it as sparse - various plugins that support sparse files (such
as the `upload()` plugin or `yara()` plugin) will automatically handle
the unmapped regions.

You will therefore need other plugins like `vad()` to figure out the
exact process memory layout where there is data to read. It is not an
error to read from unmapped regions, but it will just return nulls.


## raw_file

Access the filesystem using the OS API.

This accessor allows to read raw devices. On Windows, raw files need
to be read in aligned page size. This accessor ensures reads are
buffered into page size buffers to make it safe for VQL to read the
device in arbitrary alignment.

We do not support directory operations on raw devices, so this
accessor can not be used in the `glob()` plugin.

Additionally this accessor does not attempt to interpret the device
part of the path components. It will pass the full path string to the
underlying OS APIs. This allows us to read arbitrary devices.

## raw_ntfs

Access the NTFS filesystem inside an image by parsing NTFS.

This accessor is designed to operate on images directly. It requires a
delegate accessor to get the raw image and will open files using the
NTFS full path rooted at the top of the filesystem.


Example:

The following query will open the $MFT file from the raw image file
that will be accessed using the file accessor.

```vql
SELECT * FROM parse_mft(
  filename=pathspec(
    Path="$MFT",
    DelegateAccessor="file",
    DelegatePath='ntfs.dd'),
  accessor="raw_ntfs")
```

Note that this accessor is different than the standard `ntfs` accessor
which attempts to emulate the simpler `file` accessor. This is so the
paths can be easily interchanged between `file` and `ntfs`.

The `ntfs` accessor automatically calculates the raw device needed to
open the ntfs partition. The following queries are equivalent:

```
SELECT * FROM parse_mft(
  filename=pathspec(
    Path="$MFT",
    DelegateAccessor="raw_file",
    DelegatePath='''\\.\C:'''),
  accessor="raw_ntfs")

SELECT * FROM parse_mft(
  filename='''\\.\C:\$MFT''',
  accessor="ntfs")
```

The `raw_ntfs` accessor is available in all supported platforms and
uses the same filesystem parser as the `ntfs` accessor.

## raw_reg

Access keys and values by parsing a raw registry hive. Path is a
OSPath having delegate opening the raw registry hive.

For example we can search the raw registry for the System hive:

```sql
SELECT OSPath
FROM glob(globs='*',
  accessor="raw_reg",
  root=pathspec(
    Path="ControlSet001",
    DelegateAccessor="auto",
    DelegatePath="C:/Windows/System32/config/System"))
```

## s3

Access S3 Buckets.

This artifact allows access to S3 buckets:

1. The first component is interpreted as the bucket name.

2. Provide credentials through the VQL environment
   variable S3_CREDENTIALS. This should be a dict with
   a key of the bucket name and the value being the credentials.

Example:

```sql
LET S3_CREDENTIALS <= dict(
    endpoint='http://127.0.0.1:4566/',
    credentials_key='admin',
    credentials_secret='password',
    no_verify_cert=1)

SELECT *, read_file(filename=OSPath, length=10, accessor='s3') AS Data
FROM glob(globs='/velociraptor/*', accessor='s3')
```

NOTE: It is more convenient to use the [secrets support]({{< ref
"/blog/2024/2024-03-10-release-notes-0.72/#secret-management" >}}) in
0.72 to manage these credentials.

## scope

Similar to the `data` accessor, this makes a string appears as the
file contents. However, instead of the filename itself containing the
file content, the filename refers to the name of a variable in the
current scope that contains the data.

This is useful when the binary data is not unicode safe and can not be
properly represented by JSON. Sometimes the filename is echoed in
various log messages and with the `data` accessor this will echo some
binary data into the logs.

Example

```sql
LET MyData <= "This is a test string"

SELECT read_file(accessor="scope", filename="MyData") FROM scope()
```

## smb

Access windows shares.

This accessor is similar to the `s3` accessor in allowing access to
remove network shares. The credentials are passed in a scope variable
called `SMB_CREDENTIALS`. The credentials are a dict with the server
name being the key and the username and password joined with ":".

The first element in the path is treated as the server name (top level
directory). The accessor then looks up the relevant credentials from
the `SMB_CREDENTIALS` dict. This allows multiple servers and multiple
credentials to be defined at the same time.

Example:

```
LET SMB_CREDENTIALS <= dict(ServerName="Username:Password")

SELECT OSPath,
FROM glob(globs='*',
          root="/ServerName/Windows/System32",
          accessor="smb")
```

## sparse

Allow reading another file by overlaying a sparse map on top of it.

The map excludes reading from certain areas which are considered
sparse.

The resulting file is sparse (and therefore uploading it excludes the
masked out regions). The filename is taken as a list of ranges.

For example here we create a sparse file over the delegate which only
defines the first 5 bytes, then a 5 byte sparse region then another 5
bytes.

```sql
SELECT upload(accessor="sparse", path=pathspec(
    DelegateAccessor="data", DelegatePath=MyData,
    Path=[dict(Offset=0,Length=5), dict(Offset=10,Length=5)])
FROM scope()
```

The uploaded file will contain only 10 bytes but will retain the 5
byte "hole" in the middle.

This accessor is most useful when uploading or masking parts of other
files - for example uploading a carved files from a larger image. NOTE
that delegate offsets are retained in this accessor (so for example
offset 10 in this accessor corresponds to offset 10 in the delegate
regardless of the sparse map).

For more flexibility than this use the "ranged" accessor.


## ssh

Access a remote system's filesystem via `SSH/SFTP`.

This accessor allows accessing remote systems via `SFTP/SSH`.  This is
useful for being able to search remote systems where it is not
possible to run a Velociraptor client directly on the endpoint. For
example, on embedded edge devices such as routers/firewalls/VPN
servers etc.

To use this accessor you will need to provide credentials via the
SSH_CONFIG scope variable:

```vql
LET SSH_CONFIG <= dict(hostname='localhost:22',
    username='mic',
    private_key=read_file(filename='/home/mic/.ssh/id_rsa'))

SELECT OSPath FROM glob(accessor="ssh", globs="/*")
```

NOTES:

1. hostname must have a port after the column.
2. You can provide a password instead of a private key via the
   password parameter to the `SSH_CONFIG`
3. The private_key parameter must contain an unencrypted PEM encoded
   SSH private key pair.

NOTE: It is more convenient to use the [secrets support]({{< ref
"/blog/2024/2024-03-10-release-notes-0.72/#secret-management" >}}) in
0.72 to manage these credentials.

## vfs

Access client's VFS filesystem on the server.

On the Velociraptor server, the Virtual File System (VFS) represents a
cached copy of the files and directories we have collected from the
client using the `VFS` GUI.

Since it is a snapshot formed over multiple collections from the GUI
it may change in future (for example if a file is added or removed,
the next time the directory is refreshed the VFS view will change).

Due to the interactive nature of the VFS collections, the VFS is
constructed over many collections in different times.

Sometimes we want to directly read those cached files and directories
and this is where the `vfs` accessor comes in.

The accessor gets the client's ID from the `ClientId` scope
variable. The first component of the path is taken to be the accessor
(top level of the VFS GUI).

This accessor is mostly used in the `System.VFS.Export` artifact to
facilitate snapshotting of the VFS view in the GUI.

## zip

Open a zip file as if it was a directory.

Filename is a pathspec with a delegate accessor opening the Zip file,
and the Path representing the file within the zip file.

Example:

```sql
SELECT OSPath, Mtime, Size
FROM glob(
    globs='/**/*.txt',
    root=pathspec(DelegateAccessor='file',
                  DelegatePath="File.zip",
                  Path='/'),
accessor='zip')
```
