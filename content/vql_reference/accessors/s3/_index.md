---
title: s3
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## s3
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

Allows access to S3 buckets.

1. The first component is interpreted as the bucket name.

2. Provide credentials through the VQL environment
   variable `S3_CREDENTIALS`. This should be a dict with
   a key of the bucket name and the value being the credentials.

### Example

```vql
LET S3_CREDENTIALS<=dict(endpoint='http://127.0.0.1:4566/',
  credentials_key='admin',
  credentials_secret='password',
  no_verify_cert=1)

SELECT *, read_file(filename=OSPath,
   length=10, accessor='s3') AS Data
FROM glob(
   globs='/velociraptor/orgs/root/clients/C.39a107c4c58c5efa/collections/*/uploads/auto/*',
   accessor='s3')
```

NOTE: It is more convenient to use the [secrets support]({{< ref
"/blog/2024/2024-03-10-release-notes-0.72/#secret-management" >}})
introduced in version 0.72 to manage these credentials.


