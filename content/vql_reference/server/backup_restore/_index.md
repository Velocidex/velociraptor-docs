---
title: backup_restore
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## backup_restore
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|The name of the backup file.|string (required)
prefix|Restore the backup from under this prefix in the zip file (defaults to org id).|string
providers|If provided only restore providers matching this regex.|string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">SERVER_ADMIN</span>

### Description

Restore state from a backup file.

Note that the backups file can only reside in the file store under
the `<filestor>/backups` directory.


