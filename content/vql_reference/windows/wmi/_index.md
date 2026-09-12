---
title: wmi
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Execute simple WMI queries synchronously.

  This plugin issues a WMI query and returns its rows directly. The
  exact format of the returned row depends on the WMI query issued.

  This plugin creates a bridge between WMI and VQL and it is a very
  commonly used plugin for inspecting the state of windows systems.

build:
  list: never
---



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
query|The WMI query to issue.|string (required)
namespace|The WMI namespace to use (ROOT/CIMV2)|string

**Required permissions:** `MACHINE_STATE`

### Description

Execute simple WMI queries synchronously.

This plugin issues a WMI query and returns its rows directly. The
exact format of the returned row depends on the WMI query issued.

This plugin creates a bridge between WMI and VQL and it is a very
commonly used plugin for inspecting the state of windows systems.


