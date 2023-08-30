---
title: Windows.NTFS.I30
hidden: true
tags: [Client Artifact]
---

Carve the $I30 index stream for a directory.

This can reveal previously deleted files. Optionally upload the I30
stream to the server as well.


<pre><code class="language-yaml">
name: Windows.NTFS.I30
description: |
  Carve the $I30 index stream for a directory.

  This can reveal previously deleted files. Optionally upload the I30
  stream to the server as well.

parameters:
 - name: DirectoryGlobs
   default: C:\Users\*

 - name: SlackOnly
   description: &quot;Select to return only entries from Slack space.&quot;
   type: bool

 - name: AlsoUpload
   description: Select to also upload the raw $I30 stream.
   type: bool

sources:
  - name: UploadI30Streams
    precondition:
      SELECT * FROM info() where OS = &#x27;windows&#x27; AND AlsoUpload

    query: |
       LET inodes = SELECT OSPath, Data.mft AS MFT,
             parse_ntfs(device=OSPath, inode=Data.mft) AS MFTInfo
       FROM glob(globs=DirectoryGlobs, accessor=&quot;ntfs&quot;)
       WHERE IsDir

       LET upload_streams = SELECT * FROM foreach(
         row=MFTInfo.Attributes,
         query={
           SELECT _value.Type AS Type,
                  _value.TypeId AS TypeId,
                  _value.Id AS Id,
                  _value.Inode AS Inode,
                  _value.Size AS Size,
                  _value.Name AS Name,
                  _value.OSPath AS OSPath,
                  upload(accessor=&quot;mft&quot;,
                         file=MFTInfo.Device + _value.Inode,
                         name=pathspec(Path=_value.OSPath + &quot;/&quot; + _value.Inode)) AS IndexUpload
           FROM scope()
           WHERE Type =~ &quot;INDEX_&quot;
       })

       SELECT * FROM foreach(row=inodes, query=upload_streams)

  - name: AnalyzeI30
    precondition:
      SELECT * FROM info() where OS = &#x27;windows&#x27;

    query: |
       LET inodes = SELECT OSPath, Data.mft AS MFT,
             parse_ntfs(device=OSPath, inode=Data.mft) AS MFTInfo
       FROM glob(globs=DirectoryGlobs, accessor=&quot;ntfs&quot;)
       WHERE IsDir

       SELECT * FROM foreach(
         row=inodes,
         query={
            SELECT OSPath, Name, NameType, Size, AllocatedSize,
                   IsSlack, SlackOffset, Mtime, Atime, Ctime, Btime, MFTId
            FROM parse_ntfs_i30(device=MFTInfo.Device, inode=MFT)
            WHERE IsSlack = true or NOT SlackOnly
       })

</code></pre>

