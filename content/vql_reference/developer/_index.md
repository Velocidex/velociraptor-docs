---
title: Developer
weight: 85
linkTitle: Developer
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  These functions and plugins are only used during development, for automated
  testing, and occasionally for troubleshooting.
---

These functions and plugins are only used during development, for automated
testing, and occasionally for troubleshooting.

Normally you would not use these!
|Plugin/Function|Type|Description|
|-|-|-|
|[mock](mock)|Function|Mock a plugin|
|[mock_check](mock_check)|Function|Check expectations on a mock|
|[mock_clear](mock_clear)|Function|Resets all mocks|
|[mock_replay](mock_replay)|Function|Replay recorded calls on a mock|
|[panic](panic)|Plugin|Crash the program with a panic!|
|[profile](profile)|Plugin|Returns a profile dump from the running process|
|[profile_goroutines](profile_goroutines)|Plugin|Enumerates all running goroutines|
|[profile_memory](profile_memory)|Plugin|Enumerates all in use memory within the runtime|
|[trace](trace)|Function|Upload a trace file|
