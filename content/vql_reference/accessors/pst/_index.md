---
title: pst
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## pst
<span class='vql_type label label-warning pull-right page-header'>Accessor</span>


<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">FILESYSTEM_READ</span>

### Description

An accessor to open attachments in PST files.

This accessor allows opening of attachments for scanning or reading.

The OSPath used is structured in the form:

{
  Path: "Msg/<msg_id>/Att/<attach_id>/filename",
  DelegatePath: <path to PST file>,
  DelegateAccessor: <accessor for PST file>
}




