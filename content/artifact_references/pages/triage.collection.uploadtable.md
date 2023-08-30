---
title: Triage.Collection.UploadTable
hidden: true
tags: [Client Artifact]
---

A Generic uploader used by triaging artifacts. This is similar to
`Triage.Collection.Upload` but uses a CSV table to drive it.


<pre><code class="language-yaml">
name: Triage.Collection.UploadTable
description: |
  A Generic uploader used by triaging artifacts. This is similar to
  `Triage.Collection.Upload` but uses a CSV table to drive it.

parameters:
  - name: triageTable
    description: &quot;A CSV table controlling upload. Must have the headers: Type, Accessor, Glob.&quot;
    type: csv
    default: |
      Type,Accessor,Glob

sources:
  - query: |
        LET results = SELECT OSPath, Size,
               Mtime As Modifed,
               Type,
               upload(file=OSPath,
                      mtime=Mtime,
                      ctime=Ctime,
                      accessor=Accessor) AS FileDetails
        FROM glob(globs=split(string=Glob, sep=&quot;,&quot;), accessor=Accessor)
        WHERE NOT IsDir

        SELECT * FROM foreach(
         row=triageTable,
         query={
           SELECT OSPath, Size, Modifed, Type,
               FileDetails.Path AS ZipPath,
               FileDetails.Md5 as Md5,
               FileDetails.Sha256 as SHA256
          FROM results
        })

</code></pre>

