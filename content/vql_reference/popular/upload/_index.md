---
title: upload
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## upload
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|The file to upload|OSPath (required)
name|The name of the file that should be stored on the server|OSPath
accessor|The accessor to use|string
mtime|Modified time to record|Any
atime|Access time to record|Any
ctime|Change time to record|Any
btime|Birth time to record|Any

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

Upload a file to the upload service. For a Velociraptor client this
will upload the file into the flow and store it in the server's file store.

If Velociraptor is run locally the file will be copied to the
`--dump_dir` path or added to the triage evidence container.

## Resumable Uploads

As of Velociraptor 0.75 the client may support resumable
uploads. The VQL query may elect for uploads to be resumable by
setting the VQL parameter `UPLOAD_IS_RESUMABLE` for example:

```vql
LET UPLOAD_IS_RESUMABLE <= TRUE
```

This variable changes the `upload()` function into resumable mode:

  1. The function will schedule an upload transaction on the client
  2. After scheduling the transaction, the function will return
     immediately allowing the VQL query to proceed quickly.

When using resumable uploads, the returned object from this
function **does not** include a hash since the actual upload will
occur in the background. There is limited error handling for
resumable uploads.

NOTE: Only some accessors support resumable uploads. Specifically
those accessors which can guarantee the file will remain in place
for a long time (enough time for the user to request
resuming). Usually it only makes sense to upload accessors like
`file`, `ntfs` etc.

It does not usually make sense to upload temp files using
resumable uploads because the temporary file will be cleared after
the query ends.


