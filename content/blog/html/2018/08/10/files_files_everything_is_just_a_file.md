---
date: 2018-08-10T04:10:06Z
description:  |
  Velociraptor introduced a major redesign of the underlying data
  store architecture. The default data store
  is now the FileBasedDataStore which stores all data in flat files.

title:  Files, files everything is just a file!
linktitle:  20180810 Files, files everything is just a file!
url: /blog/html/2018/02/09/files_files_everything_is_just_a_file.html
categories: ["Blog"]
hidden: true
---


GRR\'s original design abstracted the data storage to a simple key/value
store originally based around Bigtable. For open source deployments
various key value stores were used starting from MongoDB, to SQLite and
finally MySQL. Although the original idea was to use a simple key/value
implementation, due to locking requirements the data store
implementation became very complex.

As Velociraptor introduced a major redesign of the underlying data store
architecture, we are now able to relax our demands of the datastore and
use a true key/value model (since we have no requirements for locking
and synchronization). The default data store is now the
FileBasedDataStore which stores all data in flat files.

Using flat files over a database has many advantages, including ease of
deployment, and simplification of the data model. Having flat files
allows one to use standard tools to visualize Velociraptor\'s data
structures (e.g. with less), archive old data (e.g. with tar/zip) and
clean up old data (e.g. with find/rm). Velociraptor also includes an
inspect command which allows users to decode the stored files and
provides context as to what these files actually mean. This simplicity
increases the transparency in the system and makes it more accessible
for deployers, while increasing reliability, stability and speed.

In the following section we examine some of the files in the datastore
and see how they relate to the features we discuss elsewhere in this
document.

File organization
=================

The Velociraptor data store needs to provide only two types of
operations: Read and Write complete files and list files in a directory.
Using only these primitives we can implement the entire filestore. Most
modern file systems provide very fast file creation, reading and
deletion, as well as fast directory listing, even when containing
millions of files. Modern file systems also provide advanced features
like caching, journaling and rollbacks so it is not such a crazy idea to
use the file systems themselves as a data store.

Let\'s begin by listing the files in a typical Velociraptor file store
using the find command. We then use the velociraptor inspect command to
view the file\'s content.

Searching
---------

Searching for clients is implemented by simply creating empty files in
directories based on the search term. For example in order to retrieve
all clients which have the user \"mic\", we simply list the directory
\"client\_index/user%3Amic\":

``` {.sourceCode .console}
$ find ./client_index/
```

> ./client\_index/c.84216c7aab97557d
> ./client\_index/c.84216c7aab97557d/C.84216c7aab97557d.db./client\_index/user%3Amic
> ./client\_index/user%3Amic/C.84216c7aab97557d.db
> ./client\_index/user%3Amic/C.1b0cddfffbfe40f5.db./client\_index/all
> ./client\_index/all/C.84216c7aab97557d.db
> ./client\_index/all/C.1b0cddfffbfe40f5.db

Modern file systems can hold many thousands of files in the same
directory and list these very quickly. This feature is only really used
in the GUI\'s search box but can also be used to script or post process
collected data.

Client information
------------------

Information about each client is kept in a directory based on the
client\'s ID:

``` {.sourceCode .console}
./C.0fc63b45671af1a6/ping.db                   <- Last ping stats.
./C.0fc63b45671af1a6/key.db                    <- Client's public key
./C.0fc63b45671af1a6/flows
./C.0fc63b45671af1a6/flows/F.a8787c26.db       <- Flows running on this client.
./C.0fc63b45671af1a6/flows/F.e05952ff.db
./C.0fc63b45671af1a6/tasks
./C.0fc63b45671af1a6/tasks/1533517805834284.db <- Client messages waiting to be collected.
./C.0fc63b45671af1a6/tasks/1533517805834283.db
./C.0fc63b45671af1a6/tasks/1533517206859989.db
./C.0fc63b45671af1a6/tasks/1533517206860477.db
./C.84216c7aab97557d.db                        <- Client information (from Interrogate).
```

Each piece of data is kept in its own file as an encoded protobuf. Files
all have their names end with \".db\". Velociraptor has an inspect
command which decodes the protobuf and displays it in a human friendly
way. For example let us see what information we keep about each s last
poll:

``` {.sourceCode .console}
$ velociraptor --config server.yaml inspect /tmp/velociraptor/C.2d406f47d80f5583/ping.db
{
  "ipAddress": "127.0.0.1:33600","ping": "1533517053018582"
}
```

The Flow\'s results.
--------------------

Velociraptor\'s flows typically only produce VQL results. As described
above, the VQL results are typically split into parts by the client (by
default 10000 rows per part), and Velociraptor simply writes these in
the flow\'s directory:

``` {.sourceCode .console}
./C.1b0cddfffbfe40f5/flows/F.a31255a1
./C.1b0cddfffbfe40f5/flows/F.a31255a1/results
./C.1b0cddfffbfe40f5/flows/F.a31255a1/results/0.db   <- VQL result part 1.
./C.1b0cddfffbfe40f5/flows/F.a31255a1.db             <- Flow information.
```

Velociraptor\'s inspect command understands that VQL collections
represent a table of results, and so it displays these in a more
friendly way.

``` {.sourceCode .console}
$ velociraptor --config server.yaml inspect /tmp/velociraptor/C.1b0cddfffbfe40f5/flows/F.a31255a1/results/0.db
+-------+----------------+---------+------+-----------------------------+----------------------------+
| ISDIR |    FULLPATH    |  SIZE   | MODE |            MTIME            |            ATIME           |
+-------+----------------+---------+------+-----------------------------+----------------------------+
| false |  /bin/bash     | 1037528 |  493 |  2017-05-16T22:49:55+10:00  |  2018-01-22T12:47:25+10:00 |
| false |  /bin/busybox  | 1964536 |  493 |  2015-08-19T22:07:39+10:00  |  2018-01-23T15:41:46+10:00 |
+-------+----------------+---------+------+-----------------------------+----------------------------+
File Finder Response: SELECT IsDir , FullPath , Size , Mode , mtime , atime , ctime,
   upload(file=FullPath)as Upload FROM files
```

We can also see the original VQL query which was run to produce this
output. The bottom line, though, is that the entire flow\'s result is
just a flat JSON encoded file. You can easily decode the data using any
programming language and post process it in whatever way is appropriate
(e.g. export the results to BigQuery or ElasticSearch). Velociraptor
does not really do anything with the result other than just store it on
disk.

The Virtual File System
-----------------------

As described above, Velociraptor\'s VFS consists of VQL tables for each
directory on the client, listing the entire directory content:

``` {.sourceCode .console}
./C.1b0cddfffbfe40f5/vfs/usr/share/doc/gir1.2-freedesktop.db
./C.1b0cddfffbfe40f5/vfs/usr/share/doc/libdatrie1.db
./C.1b0cddfffbfe40f5/vfs/usr/share/doc/dh-strip-nondeterminism.db
./C.1b0cddfffbfe40f5/vfs/usr/share/doc/libcap2-bin.db
./C.1b0cddfffbfe40f5/vfs/usr/share/doc/libsoup2.4-1.db
./C.1b0cddfffbfe40f5/vfs/usr/share/doc/libgphoto2-port12.db
./C.1b0cddfffbfe40f5/vfs/usr/share/doc/libsodium18.db
```

Inspecting each of these shows it is just a simple VQL table. This
particular VFS entry was produced from a recursive directory listing of
/usr (of depth 5).

``` {.sourceCode .console}
$ velociraptor --config server.yaml inspect .../vfs/usr/share/doc/libcap2-bin.db
+-------+--------------------------------+---------------------+------+-----------+--------------------
| ISDIR |            FULLPATH            |        NAME         | SIZE |   MODE    |           MTIME
+-------+--------------------------------+---------------------+------+-----------+--------------------
| false | /usr/share/doc/libcap2-bin/REA | README.Debian       | 1149 |       420 | 2015-10-02T23:34:07
|       | DME.Debian                     |                     |      |           |
| false | /usr/share/doc/libcap2-bin/cha | changelog.Debian.gz |   30 | 134218239 | 2015-10-24T07:11:34
|       | ngelog.Debian.gz               |                     |      |           |
| false | /usr/share/doc/libcap2-bin/cop | copyright           | 4367 |       420 | 2015-10-02T23:34:07
|       | yright                         |                     |      |           |
+-------+--------------------------------+---------------------+------+-----------+--------------------
/usr: SELECT IsDir, FullPath as _FullPath, Name, Size, Mode, timestamp(epoch=Sys.Mtim.Sec) as mtime,
  timestamp(epoch=Sys.Atim.Sec) as ys.Ctim.Sec) as ctime FROM glob(globs=path + '/**5')
```
