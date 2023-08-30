---
title: MacOS.System.Dock
hidden: true
tags: [Client Artifact]
---

This artifact examines the contents of the user's dock.  The
property list entry for each application represented within the dock
can be modified to point to a malcious application.

 By comparing the application name, CFURLString, and book, we can
 gather greater context to assist in determining if an adversary may
 have tampered with an entry, or if an entry has been added to
 emulate a legitimate application.


<pre><code class="language-yaml">
name: MacOS.System.Dock
description: |
  This artifact examines the contents of the user&#x27;s dock.  The
  property list entry for each application represented within the dock
  can be modified to point to a malcious application.

   By comparing the application name, CFURLString, and book, we can
   gather greater context to assist in determining if an adversary may
   have tampered with an entry, or if an entry has been added to
   emulate a legitimate application.

reference:
  - https://specterops.io/so-con2020/event-758922
  - https://attack.mitre.org/techniques/T1547/009/
  - https://attack.mitre.org/techniques/T1647/

author: Wes Lambert - @therealwlambert

type: CLIENT

parameters:
   - name: DockGlob
     default: /Users/*/Library/Preferences/com.apple.dock.plist

sources:
  - query: |
       SELECT * FROM foreach(row={
          SELECT OSPath from glob(globs=DockGlob)
       }, query={
         SELECT OSPath, GUID,
           get(member=&quot;tile-data.file-label&quot;) AS FileLabel,
           get(member=&quot;tile-data.file-data._CFURLString&quot;) AS AppLocation,
           timestamp(mactime=get(member=&quot;tile-data.file-mod-date&quot;)) AS FileModDate,
           timestamp(mactime=get(member=&quot;tile-data.parent-mod-date&quot;)) AS ParentModDate,
           get(member=&quot;tile-data.bundle-identifier&quot;) AS BundleIdentifier,
           get(member=&quot;tile-data.dock-extra&quot;) AS DockExtra,
           base64encode(string=get(member=&quot;tile-data.book&quot;)) AS Book
         FROM foreach(row=plist(file=OSPath).`persistent-apps`)
       })

column_types:
  - name: Book
    type: base64hex

</code></pre>

