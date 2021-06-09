---
title: "Vfs"
date: 2021-06-09T04:12:50Z
draft: false
weight: 10
---




83
Interactively fetching files from the endpoint

The Virtual File System (VFS)
The VFS visualizes some server-side information we collect about the clients.
Top level corresponds to the type of information we collect:
File - Access the file system using the filesystem API
NTFS - Access the file system using raw NTFS parsing (Windows Only)
Registry - Access the Windows Registry using the Registry API (Windows Only)
Artifacts - A view of all artifacts collected from the client sorted by artifact type, and then times when they were collected.

84

File accessor
85
Uses the OS APIs to access files (unless locked then it fallback to NTFS)

NTFS Accessor
86
Uses raw NTFS parsing providing access to special files and ADS

Registry Accessor
87
Provides access to registry using the Windows API.
Keys are like directories and Values are files.
Since Values are typically small, they are also retrieved as a result of a directory listing - in most cases there is no need to download content explicitly.

Note that registry mapping occurs so take care when accessing virtual keys like HKEY_CURRENT_USER or HKEY_USERS

88

89

Artifacts accessor
90
This shows the artifacts collected from the endpoint grouped by artifact

This is useful to see the timeline of the same artifact collected at different times.

91

Navigating the interface
92
Click the “Refresh this directory” will schedule a directory listing artifact and wait for the results (usually very quick if the endpoint is online).
The “Recursively refresh this directory” will schedule a recursive refresh - this may take some time! After this operation a lot of the VFS will be pre-populated already.
“Collect from client” will retrieve the file data to the server. After which, the floppy disk sign indicates that we have file data available and you can click the “Download” link to get a copy of the file.

Refresh directory from endpoint  (can be done recursively)
Fetch file contents from endpoint
Remember that the VFS view is simply a server side cache of information we know about the endpoint - it is usually out of date!

Exercise: Determine user activity
Task: We suspect a user account had been compromised.
Did the user download malware?

Freely explore the interface to answer this question
Useful artifacts include
Download directory content
Internet browser history
Temporary files
