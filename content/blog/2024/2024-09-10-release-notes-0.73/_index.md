---
title: "Velociraptor 0.73 Release"
description: |
   Velociraptor Release 0.73 is now in release candidate status.
   This post discusses some of the new features.

tags:
 - Release

author: "Mike Cohen"
date: 2024-10-10
noindex: true
---

I am very excited to announce that the latest Velociraptor release
0.73 is now in release candidate.

In this post I will discuss some of the interesting new features.


### Built in memory acquisition

### Added zip_nocase accessor

### Improve granularity of flow state reporting.

Currently flows can be in the running, completed or errored
states. This is not enough granularity leaving users wondering what is
happening to their flows in case the client crashes or reboots for
some reason, or may become unresponsive. In such cases sometimes flows
remain in the running state so it is not easy to retry them.

This PR adds a server side mechanism to actively check up on the
progress of the flows. This ensures that we can keep track of running
flows better and terminate them when the client reboots. Flows now
move through more fine grained states:


### Added parse_journald() and watch_journald() plugins

### Add RDP Cache parser to RDP Cache artifact

### Added tags to hunts.

### Rewrote Table widget.

Paginator is now moved to the toolbar so users dont need to scroll to
the bottom each time.

### Updated column filters to support negation.

If a filter term starts with ! it will now be excluded.


### Created password encrypted ZIP files for VFS downloads.

### Added artifacts to make it easier to post process KapeFiles.Targets

The Windows.KapeFiles.Targets artifact allows to collect many bulk
forensic artifacts like registry hives etc. People often use it to
collect offline collections for preservation of hosts.

Although best practice is to **also** collect parsing artifacts as the
same time, sometimes this is left out. In this case the user needs to
parse the collected raw files (for example collecting $MFT then
needing to apply `Windows.NTFS.MFT` to parse it). This is not always
easy to do.

This PR adds a notebook suggestion which applies remapping on the
KapeFiles collection in such as way that some regular artifacts designed
to run on the live system can work to some extent off the raw
collection. The additional parsing will be added to new collections in
the same (possibly virtual) client.


### Redesigned timelines

###  Added Timesketch integration artifacts

1. `Server.Utils.TimesketchUpload` can upload a specific timeline to
   timesketch.

2. `Server.Monitoring.TimesketchUpload` is an event artifact that
   watches for any timelines added through the GUI and automatically
   forwards them to timesketch. This is easiest to use because users
   dont even have to think about it, timelines are automatically added
   to timesketch


### Client metadata fields can now be indexed and searched.

### Enable a server artifact to specify an impersonation user.

This mechanism is equivalent to the unix SUID mechanism in allowing
administrators to maintain a set of curated, safe artifacts for use by
non-privileged users that can elevate permissions in a controlled way
to perform powerful tasks.

### Added the ability to dump clear text network traffic for debugging

### Added experimental vmdk support for dead disk forensics.
