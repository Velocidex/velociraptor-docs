---
title: pst
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  An accessor to open attachments in PST files.

  This accessor allows opening of attachments for scanning or reading.

  The OSPath used is structured in the form:

  {
    Path: "Msg/<msg_id>/Att/<attach_id>/filename",
    DelegatePath: <path to PST file>,
    DelegateAccessor: <accessor for PST file>
  }



build:
  list: never
---



{{< badge >}}Accessor{{< /badge >}}


**Required permissions:** `FILESYSTEM_READ`

### Description

An accessor to open attachments in PST files.

This accessor allows opening of attachments for scanning or reading.

The OSPath used is structured in the form:

{
  Path: "Msg/<msg_id>/Att/<attach_id>/filename",
  DelegatePath: <path to PST file>,
  DelegateAccessor: <accessor for PST file>
}




