---
title: Developer
weight: 85
linktitle: Developer
index: true
no_edit: true
no_children: true
---

These functions and plugins are only used during development, for automated
testing, and occasionally for troubleshooting.

Normally you would not use these!
|Plugin/Function|<span class='vql_type'>Type</span>|Description|
|-|-|-|
|[mock](mock)|<span class='vql_type'>Function</span>|Mock a plugin|
|[mock_check](mock_check)|<span class='vql_type'>Function</span>|Check expectations on a mock|
|[mock_clear](mock_clear)|<span class='vql_type'>Function</span>|Resets all mocks|
|[mock_replay](mock_replay)|<span class='vql_type'>Function</span>|Replay recorded calls on a mock|
|[panic](panic)|<span class='vql_type'>Plugin</span>|Crash the program with a panic!|
|[profile](profile)|<span class='vql_type'>Plugin</span>|Returns a profile dump from the running process|
|[profile_goroutines](profile_goroutines)|<span class='vql_type'>Plugin</span>|Enumerates all running goroutines|
|[profile_memory](profile_memory)|<span class='vql_type'>Plugin</span>|Enumerates all in use memory within the runtime|
|[trace](trace)|<span class='vql_type'>Function</span>|Upload a trace file|
