---
title: backup_restore
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Restore state from a backup file.

  Note that the backups file can only reside in the file store under
  the `<filestor>/backups` directory.

build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
name|The name of the backup file.|string (required)
prefix|Restore the backup from under this prefix in the zip file (defaults to org id).|string
providers|If provided only restore providers matching this regex.|string

**Required permissions:** `SERVER_ADMIN`

### Description

Restore state from a backup file.

Note that the backups file can only reside in the file store under
the `<filestor>/backups` directory.


