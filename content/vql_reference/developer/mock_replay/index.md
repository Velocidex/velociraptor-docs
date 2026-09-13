---
title: mock_replay
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Replay recorded calls on a mock.
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
plugin|The plugin to mock|string
function|The function to mock|string
expected_calls|How many times plugin should be called|int
clear|This call will clear previous mocks for this plugin|bool
### Description

Replay recorded calls on a mock.

