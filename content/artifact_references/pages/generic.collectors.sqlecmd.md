---
title: Generic.Collectors.SQLECmd
hidden: true
tags: [Client Artifact]
---

Many applications maintain internal state using SQLite
databases. The SQLECmd project is an open source resource for known
applications and the type of forensic information we can recover.

## NOTES

1. This artifact is automatically generated from the SQLECmd project
2. This artifact uses the SQLite library, since the library does not
   support accurate CPU limits, this artifact can use a lot of CPU
   despite a CPU limit specified.
3. Locked or in use SQLite files will be copied to a tempfile and
   then queried.

4. If UseFilenames is enabled we only look at known
   filenames. Disabling it will try to identify all sqlite files
   within the search glob. This is slower but may find more
   potential files (e.g. renamed).

## NOTES:

This artifact is deprecated in favor of
Generic.Forensic.SQLiteHunter and will be removed in future


<pre><code class="language-yaml">
name: Generic.Collectors.SQLECmd
description: |
  Many applications maintain internal state using SQLite
  databases. The SQLECmd project is an open source resource for known
  applications and the type of forensic information we can recover.

  ## NOTES

  1. This artifact is automatically generated from the SQLECmd project
  2. This artifact uses the SQLite library, since the library does not
     support accurate CPU limits, this artifact can use a lot of CPU
     despite a CPU limit specified.
  3. Locked or in use SQLite files will be copied to a tempfile and
     then queried.

  4. If UseFilenames is enabled we only look at known
     filenames. Disabling it will try to identify all sqlite files
     within the search glob. This is slower but may find more
     potential files (e.g. renamed).

  ## NOTES:

  This artifact is deprecated in favor of
  Generic.Forensic.SQLiteHunter and will be removed in future

reference:
  - https://github.com/EricZimmerman/SQLECmd

export: |
  LET Identify(Query, FileType, OSPath, IdentifyValue) = SELECT {
      SELECT *
      FROM sqlite(file=OSPath, query=Query)
    } AS Hits
  FROM scope()
  WHERE Hits = IdentifyValue
    AND log(message=&quot;%v was identified as %v&quot;, args=[OSPath, FileType])

  LET ApplyFile(IdentifyQuery, FileType, SQLQuery, IdentifyValue) = SELECT *
    FROM foreach(row=SQLiteFiles,
    query={
      SELECT * FROM if(
        condition=Identify(Query=IdentifyQuery, FileType=FileType,
                           OSPath=OSPath, IdentifyValue=IdentifyValue),
        then={
            SELECT *, OSPath FROM sqlite(file=OSPath, query=SQLQuery)
        })
  })

parameters:
- name: GlobExpr
  description: A glob to search for SQLite files.
  type: csv
  default: |
    Name,Glob
    &quot;Bitdefender:Bitdefender Endpoint Security Logs&quot;,&quot;C:\ProgramData\Bitdefender\Endpoint Security\Logs/**10&quot;
    &quot;Bitdefender:Bitdefender Internet Security Logs&quot;,&quot;C:\ProgramData\Bitdefender\Desktop\Profiles\Logs/**10&quot;
    &quot;Chrome:Chrome bookmarks&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Bookmarks*&quot;
    &quot;Chrome:Chrome Cookies&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Cookies*&quot;
    &quot;Chrome:Chrome Current Session&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Current Session&quot;
    &quot;Chrome:Chrome Current Tabs&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Current Tabs&quot;
    &quot;Chrome:Chrome Download Metadata&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/DownloadMetadata&quot;
    &quot;Chrome:Chrome Extension Cookies&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Extension Cookies&quot;
    &quot;Chrome:Chrome Favicons&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Favicons*&quot;
    &quot;Chrome:Chrome History&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/History*&quot;
    &quot;Chrome:Chrome Last Session&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Last Session&quot;
    &quot;Chrome:Chrome Last Tabs&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Last Tabs&quot;
    &quot;Chrome:Chrome Sessions Folder&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*\Sessions/**10&quot;
    &quot;Chrome:Chrome Login Data&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Login Data&quot;
    &quot;Chrome:Chrome Media History&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Media History*&quot;
    &quot;Chrome:Chrome Network Action Predictor&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Network Action Predictor&quot;
    &quot;Chrome:Chrome Network Persistent State&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Network Persistent State&quot;
    &quot;Chrome:Chrome Preferences&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Preferences&quot;
    &quot;Chrome:Chrome Quota Manager&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/QuotaManager&quot;
    &quot;Chrome:Chrome Reporting and NEL&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Reporting and NEL&quot;
    &quot;Chrome:Chrome Shortcuts&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Shortcuts*&quot;
    &quot;Chrome:Chrome Top Sites&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Top Sites*&quot;
    &quot;Chrome:Chrome Trust Tokens&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Trust Tokens*&quot;
    &quot;Chrome:Chrome SyncData Database&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*\Sync Data/**10/SyncData.sqlite3&quot;
    &quot;Chrome:Chrome Visited Links&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Visited Links&quot;
    &quot;Chrome:Chrome Web Data&quot;,&quot;C:\Users\*\AppData\Local\Google\Chrome\User Data\*/**10/Web Data*&quot;
    &quot;Chrome:Windows Protect Folder&quot;,&quot;C:\Users\*\AppData\Roaming\Microsoft\Protect\*/**10&quot;
    &quot;Firefox:Addons&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/addons.sqlite*&quot;
    &quot;Firefox:Bookmarks&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*\weave/**10/bookmarks.sqlite*&quot;
    &quot;Firefox:Cookies&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/cookies.sqlite*&quot;
    &quot;Firefox:Downloads&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/downloads.sqlite*&quot;
    &quot;Firefox:Extensions&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/extensions.json&quot;
    &quot;Firefox:Favicons&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/favicons.sqlite*&quot;
    &quot;Firefox:Form history&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/formhistory.sqlite*&quot;
    &quot;Firefox:Permissions&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/permissions.sqlite*&quot;
    &quot;Firefox:Places&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/places.sqlite*&quot;
    &quot;Firefox:Protections&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/protections.sqlite*&quot;
    &quot;Firefox:Search&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/search.sqlite*&quot;
    &quot;Firefox:Signons&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/signons.sqlite*&quot;
    &quot;Firefox:Storage Sync&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/storage-sync.sqlite*&quot;
    &quot;Firefox:Webappstore&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/webappstore.sqlite*&quot;
    &quot;Firefox:Password&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/key*.db&quot;
    &quot;Firefox:Preferences&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/prefs.js&quot;
    &quot;Firefox:Sessionstore&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*/**10/sessionstore*&quot;
    &quot;Firefox:Sessionstore Folder&quot;,&quot;C:\Users\*\AppData\Roaming\Mozilla\Firefox\Profiles\*\sessionstore-backups/**10&quot;
    &quot;MicrosoftStickyNotes:Microsoft Sticky Notes - Windows 7, 8, and 10 version 1511 and earlier&quot;,&quot;C:\Users\*\AppData\Roaming\Microsoft\StickyNotes/**10/StickyNotes.snt&quot;
    &quot;MicrosoftStickyNotes:Microsoft Sticky Notes - 1607 and later&quot;,&quot;C:\Users\*\AppData\Local\Packages\Microsoft.MicrosoftStickyNotes*\LocalState/**10/plum.sqlite*&quot;
    &quot;TeraCopy:TeraCopy&quot;,&quot;C:\Users\*\AppData\Roaming\TeraCopy/**10&quot;
    &quot;WindowsNotificationsDB:Windows 10 Notification DB&quot;,&quot;C:\Users\*\AppData\Local\Microsoft\Windows\Notifications/**10/wpndatabase.db&quot;
    &quot;WindowsOSUpgradeArtifacts:Update Store.db&quot;,&quot;C:\ProgramData\USOPrivate\UpdateStore/**10/store.db&quot;
    &quot;WindowsYourPhone:Windows Your Phone - All Databases&quot;,&quot;C:\Users\*\AppData\Local\Packages\Microsoft.YourPhone_8wekyb3d8bbwe\LocalCache\Indexed/**10&quot;
    &quot;pCloudDatabase:pCloud Database&quot;,&quot;C:\Users\*\AppData\Local\pCloud/**10/*.db&quot;
    &quot;pCloudDatabase:pCloud Database WAL File&quot;,&quot;C:\Users\*\AppData\Local\pCloud/**10/*.db-wal&quot;
    &quot;pCloudDatabase:pCloud Database Shared Memory File&quot;,&quot;C:\Users\*\AppData\Local\pCloud/**10/*.db-shm&quot;
    &quot;Chrome:Chrome bookmarks&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Bookmarks*&quot;
    &quot;Chrome:Chrome Cookies&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Cookies*&quot;
    &quot;Chrome:Chrome Current Session&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Current Session&quot;
    &quot;Chrome:Chrome Current Tabs&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Current Tabs&quot;
    &quot;Chrome:Chrome Download Metadata&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/DownloadMetadata&quot;
    &quot;Chrome:Chrome Extension Cookies&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Extension Cookies&quot;
    &quot;Chrome:Chrome Favicons&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Favicons*&quot;
    &quot;Chrome:Chrome History&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/History*&quot;
    &quot;Chrome:Chrome Last Session&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Last Session&quot;
    &quot;Chrome:Chrome Last Tabs&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Last Tabs&quot;
    &quot;Chrome:Chrome Sessions Folder&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/Sessions/**10&quot;
    &quot;Chrome:Chrome Login Data&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Login Data&quot;
    &quot;Chrome:Chrome Media History&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Media History*&quot;
    &quot;Chrome:Chrome Network Action Predictor&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Network Action Predictor&quot;
    &quot;Chrome:Chrome Network Persistent State&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Network Persistent State&quot;
    &quot;Chrome:Chrome Preferences&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Preferences&quot;
    &quot;Chrome:Chrome Quota Manager&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/QuotaManager&quot;
    &quot;Chrome:Chrome Reporting and NEL&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Reporting and NEL&quot;
    &quot;Chrome:Chrome Shortcuts&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Shortcuts*&quot;
    &quot;Chrome:Chrome Top Sites&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Top Sites*&quot;
    &quot;Chrome:Chrome Trust Tokens&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Trust Tokens*&quot;
    &quot;Chrome:Chrome SyncData Database&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/SyncData.sqlite3&quot;
    &quot;Chrome:Chrome Visited Links&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Visited Links&quot;
    &quot;Chrome:Chrome Web Data&quot;,&quot;/Users/*/Library/Application Support/{BraveSoftware/Brave,Google/Chrome,Microsoft Edge}/**10/Web Data*&quot;
    &quot;Firefox:Addons&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/addons.sqlite*&quot;
    &quot;Firefox:Bookmarks&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/bookmarks.sqlite*&quot;
    &quot;Firefox:Cookies&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/cookies.sqlite*&quot;
    &quot;Firefox:Downloads&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/downloads.sqlite*&quot;
    &quot;Firefox:Extensions&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/extensions.json&quot;
    &quot;Firefox:Favicons&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/favicons.sqlite*&quot;
    &quot;Firefox:Form history&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/formhistory.sqlite*&quot;
    &quot;Firefox:Permissions&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/permissions.sqlite*&quot;
    &quot;Firefox:Places&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/places.sqlite*&quot;
    &quot;Firefox:Protections&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/protections.sqlite*&quot;
    &quot;Firefox:Search&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/search.sqlite*&quot;
    &quot;Firefox:Signons&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/signons.sqlite*&quot;
    &quot;Firefox:Storage Sync&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/storage-sync.sqlite*&quot;
    &quot;Firefox:Webappstore&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/webappstore.sqlite*&quot;
    &quot;Firefox:Password&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/key*.db&quot;
    &quot;Firefox:Preferences&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/prefs.js&quot;
    &quot;Firefox:Sessionstore&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/**10/sessionstore*&quot;
    &quot;Firefox:Sessionstore Folder&quot;,&quot;/Users/*/Library/Application Support/Firefox/Profiles/sessionstore-backups/**10&quot;
    &quot;Chrome:Chrome Current Session&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Current Session&quot;
    &quot;Chrome:Chrome Current Tabs&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Current Tabs&quot;
    &quot;Chrome:Chrome Download Metadata&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/DownloadMetadata&quot;
    &quot;Chrome:Chrome Extension Cookies&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Extension Cookies&quot;
    &quot;Chrome:Chrome Favicons&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Favicons*&quot;
    &quot;Chrome:Chrome History&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/History*&quot;
    &quot;Chrome:Chrome Last Session&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Last Session&quot;
    &quot;Chrome:Chrome Last Tabs&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Last Tabs&quot;
    &quot;Chrome:Chrome Sessions Folder&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/Sessions/**10&quot;
    &quot;Chrome:Chrome Login Data&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Login Data&quot;
    &quot;Chrome:Chrome Media History&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Media History*&quot;
    &quot;Chrome:Chrome Network Action Predictor&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Network Action Predictor&quot;
    &quot;Chrome:Chrome Network Persistent State&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Network Persistent State&quot;
    &quot;Chrome:Chrome Preferences&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Preferences&quot;
    &quot;Chrome:Chrome Quota Manager&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/QuotaManager&quot;
    &quot;Chrome:Chrome Reporting and NEL&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Reporting and NEL&quot;
    &quot;Chrome:Chrome Shortcuts&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Shortcuts*&quot;
    &quot;Chrome:Chrome Top Sites&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Top Sites*&quot;
    &quot;Chrome:Chrome Trust Tokens&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Trust Tokens*&quot;
    &quot;Chrome:Chrome SyncData Database&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/SyncData.sqlite3&quot;
    &quot;Chrome:Chrome Visited Links&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Visited Links&quot;
    &quot;Chrome:Chrome Web Data&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/Web Data*&quot;
    &quot;Firefox:Addons&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/addons.sqlite*&quot;
    &quot;Firefox:Bookmarks&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/bookmarks.sqlite*&quot;
    &quot;Firefox:Cookies&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/cookies.sqlite*&quot;
    &quot;Firefox:Downloads&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/downloads.sqlite*&quot;
    &quot;Firefox:Extensions&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/extensions.json&quot;
    &quot;Firefox:Favicons&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/favicons.sqlite*&quot;
    &quot;Firefox:Form history&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/formhistory.sqlite*&quot;
    &quot;Firefox:Permissions&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/permissions.sqlite*&quot;
    &quot;Firefox:Places&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/places.sqlite*&quot;
    &quot;Firefox:Protections&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/protections.sqlite*&quot;
    &quot;Firefox:Search&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/search.sqlite*&quot;
    &quot;Firefox:Signons&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/signons.sqlite*&quot;
    &quot;Firefox:Storage Sync&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/storage-sync.sqlite*&quot;
    &quot;Firefox:Webappstore&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/webappstore.sqlite*&quot;
    &quot;Firefox:Password&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/key*.db&quot;
    &quot;Firefox:Preferences&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/prefs.js&quot;
    &quot;Firefox:Sessionstore&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/**10/sessionstore*&quot;
    &quot;Firefox:Sessionstore Folder&quot;,&quot;/home/*/.config/{google-chrome,chrome-remote-desktop/chrome-profile,chromium}/sessionstore-backups/**10&quot;
- name: Accessor
  default: auto
- name: UseFilenames
  default: Y
  type: bool
  description: When set use filenames to optimize identification of files.
- name: AlsoUpload
  description: Also upload the raw sqlite files
  type: bool

sources:
- query: |
   LET AllFilenamesRegex &lt;= &#x27;&#x27;&#x27;^(CarsDB.db|Contacts.db|random.sqlite|ActivitiesCache.db|Antiphishing.db|RansomwareRecover.db|cache.db|es.db|Web Data|Web Data|Cookies|History|Favicons|History|History|Web Data|Media History|Media History|Network Action Predictor|Shortcuts|Top Sites|aggregation.dbx|config.db|filecache.db|icon.db|instance.dbx|home.db|home.db|home.db|home.db|sync_history.db|tray-thumbnails.db|EventTranscript.db|EventTranscript.db|queue.sqlite3|places.sqlite|cookies.sqlite|downloads.sqlite|places.sqlite|favicons.sqlite|formhistory.sqlite|places.sqlite|random.db|cloud_graph.db|snapshot.db|sync_config.db|metadata_sqlite_db|plum.sqlite|nessusd.db|MediaDb.v1.sqlite|random.db|Main.db|wpndatabase.db|wpndatabase.db|Store.db|contacts.db|Notifications.db|Phone.db|photos.db|settings.db|accounts4.db|callhistory.storedata)$&#x27;&#x27;&#x27;
   LET SQLiteFiles &lt;=
   SELECT OSPath,
    read_file(filename=OSPath, length=15, accessor=Accessor) AS Magic,
    if(condition=AlsoUpload,
       then=upload(file=OSPath,
                   mtime=Mtime,
                   atime=Atime,
                   ctime=Ctime,
                   btime=Btime)) AS Upload
   FROM glob(globs=GlobExpr.Glob, accessor=Accessor)
   WHERE NOT IsDir
     AND if(condition=UseFilenames, then=Name =~ AllFilenamesRegex, else=TRUE)
     AND Magic =~ &quot;SQLite format 3&quot;

   SELECT * FROM SQLiteFiles

- name: 4K Video Downloader
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;media_item_description&#x27; OR name=&#x27;url_description&#x27; OR name=&#x27;media_info&#x27; OR name=&#x27;audio_info&#x27; OR name=&#x27;video_info&#x27; OR name=&#x27;url_description&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 6
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    audio_info.id AS ID,
    url_description.service_name AS ServiceName,
    media_item_description.title AS Title,
    url_description.url AS URL,
    download_item.filename AS Filename,
    media_item_description.duration / 1000 / 60 AS &#x27;Duration (Minutes)&#x27;,
    audio_info.bitrate / 1000 AS &#x27;Bitrate (kbps)&#x27;,
    CASE

    WHEN video_info.video_360 = 0 THEN
    &#x27;No&#x27;
    WHEN video_info.video_360 = 1 THEN
    &#x27;Yes&#x27;
    END AS Video360,
    CASE

    WHEN video_info.hdr = 0 THEN
    &#x27;No&#x27;
    WHEN video_info.hdr = 1 THEN
    &#x27;Yes&#x27;
    END AS VideoHDR
    FROM
    download_item
    LEFT JOIN media_item_description ON download_item.id = media_item_description.id
    LEFT JOIN url_description ON media_item_description.id = url_description.id
    NATURAL LEFT JOIN media_info
    LEFT JOIN audio_info ON download_item.id = audio_info.id
    LEFT JOIN video_info ON media_info.id = video_info.id
    AND url_description.id = video_info.id
    ORDER BY
    ID ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;4K Video Downloader&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Activity Package Id
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Activity&#x27; OR name=&#x27;Activity_PackageId&#x27; OR name=&#x27;ActivityOperation&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 3
    LET SQLQuery = &#x27;&#x27;&#x27;Select substr(hex(ActivityId), 1, 8)
    || &#x27;-&#x27; || substr(hex(ActivityId), 9, 4)
    || &#x27;-&#x27; || substr(hex(ActivityId), 13, 4)
    || &#x27;-&#x27; || substr(hex(ActivityId), 17, 4)
    || &#x27;-&#x27; || substr(hex(ActivityId), 21, 12) as ActivityId,Platform,PackageName,
    datetime(ExpirationTime,&#x27;unixepoch&#x27;,&#x27;localtime&#x27;) as ExpirationTime from Activity_PackageId&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Activity Package Id&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Activity Operation
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Activity&#x27; OR name=&#x27;Activity_PackageId&#x27; OR name=&#x27;ActivityOperation&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 3
    LET SQLQuery = &#x27;&#x27;&#x27;Select OperationOrder,AppId,ActivityType,
    datetime(LastModifiedTime,&#x27;unixepoch&#x27;,&#x27;localtime&#x27;) as LastModifiedTime,
    datetime(ExpirationTime,&#x27;unixepoch&#x27;,&#x27;localtime&#x27;) as ExpirationTime,
    datetime(CreatedTime,&#x27;unixepoch&#x27;,&#x27;localtime&#x27;) as CreatedTime,
    datetime(EndTime,&#x27;unixepoch&#x27;,&#x27;localtime&#x27;) as EndTime,
    datetime(LastModifiedOnClient,&#x27;unixepoch&#x27;,&#x27;localtime&#x27;) as LastModifiedOnClient,PlatformDeviceId from ActivityOperation;&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Activity Operation&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Activity
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Activity&#x27; OR name=&#x27;Activity_PackageId&#x27; OR name=&#x27;ActivityOperation&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 3
    LET SQLQuery = &#x27;&#x27;&#x27;Select substr(hex(Id), 1, 8)
    || &#x27;-&#x27; || substr(hex(Id), 9, 4)
    || &#x27;-&#x27; || substr(hex(Id), 13, 4)
    || &#x27;-&#x27; || substr(hex(Id), 17, 4)
    || &#x27;-&#x27; || substr(hex(Id), 21, 12) as Id,payload,
    datetime(LastModifiedTime,&#x27;unixepoch&#x27;,&#x27;localtime&#x27;) as LastModifiedTime,
    datetime(ExpirationTime,&#x27;unixepoch&#x27;,&#x27;localtime&#x27;) as ExpirationTime,
    datetime(CreatedInCloud,&#x27;unixepoch&#x27;,&#x27;localtime&#x27;) as CreatedInCloud,
    datetime(StartTime,&#x27;unixepoch&#x27;,&#x27;localtime&#x27;) as StartTime,datetime(EndTime,&#x27;unixepoch&#x27;,&#x27;localtime&#x27;) as EndTime,
    datetime(LastModifiedOnClient,&#x27;unixepoch&#x27;,&#x27;localtime&#x27;) as LastModifiedOnClient,
    datetime(OriginalLastModifiedOnClient,&#x27;unixepoch&#x27;,&#x27;localtime&#x27;) as OriginalLastModifiedOnClient,
    ActivityType,IsLocalOnly,ETag,PackageIdHash,PlatformDeviceId from Activity&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Activity&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Bitdefender Antiphishing DB
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;aph_cache&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    url AS URL,
    result AS Result,
    datetime( expire / 1000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS ExpireTime
    FROM
    aph_cache
    ORDER BY
    ExpireTime ASC;&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Bitdefender Antiphishing DB&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Bitdefender es DB
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;es_cache&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    url AS URL,
    md5 AS MD5,
    content_size AS ContentSizeBytes,
    datetime( expire / 1000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS ExpireTime
    FROM
    es_cache
    ORDER BY
    ExpireTime ASC;&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Bitdefender es DB&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Bitdefender cache DB
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;entries&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    quarId AS QuarantineID,
    path AS FilePath,
    threat AS Threat,
    size AS Size,
    datetime( quartime, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS QuarantineTime,
    datetime( acctime, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS LastAccessedTime,
    datetime( modtime, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS LastModifiedTime,
    usersid AS UserSID
    FROM
    entries
    ORDER BY
    QuarantineTime ASC;&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Bitdefender cache DB&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Bitdefender RansomwareRecover DB Files
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;files&#x27; OR name=&#x27;packs&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 2
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    files.packid AS PackID,
    files.path AS Path,
    files.restored AS Restored,
    files.restored_path AS RestoredPath,
    files.extern_itemid AS ExternItemID,
    files.extern_groupid AS ExternGroupID,
    packs.process AS Process,
    packs.restore_attempt_count AS RestoreAttemptCount,
    datetime( files.insert_time / 1000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS InsertTime,
    datetime( files.last_operation_time / 1000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS LastOperationTime
    FROM
    files INNER JOIN packs ON files.packid = packs.uuid
    ORDER BY
    LastOperationTime ASC;&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Bitdefender RansomwareRecover DB Files&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Chromium Browser Autofill Entries
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;autofill&#x27; OR name=&#x27;credit_cards&#x27; OR name=&#x27;offer_data&#x27; OR name=&#x27;server_addresses&#x27; OR name=&#x27;keywords&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    autofill.name AS Name,
    autofill.value AS Value,
    autofill.value_lower AS ValueLowercase,
    datetime( &quot;date_created&quot;, &#x27;unixepoch&#x27; ) AS DateCreated,
    datetime( &quot;date_last_used&quot;, &#x27;unixepoch&#x27; ) AS LastUsed,
    autofill.count AS Count
    FROM
    autofill
    ORDER BY
    autofill.name ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Chromium Browser Autofill Entries&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Chromium Browser Autofill Profiles
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;autofill&#x27; OR name=&#x27;credit_cards&#x27; OR name=&#x27;offer_data&#x27; OR name=&#x27;server_addresses&#x27; OR name=&#x27;keywords&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    autofill_profiles.guid AS GUID,
    datetime( &quot;date_modified&quot;, &#x27;unixepoch&#x27; ) AS DateModified,
    datetime( &quot;use_date&quot;, &#x27;unixepoch&#x27; ) AS UseDate,
    autofill_profile_names.first_name AS FirstName,
    autofill_profile_names.middle_name AS MiddleName,
    autofill_profile_names.last_name AS LastName,
    autofill_profile_emails.email as EmailAddress,
    autofill_profile_phones.number AS PhoneNumber,
    autofill_profiles.company_name AS CompanyName,
    autofill_profiles.street_address AS StreetAddress,
    autofill_profiles.city AS City,
    autofill_profiles.state AS State,
    autofill_profiles.zipcode AS ZipCode,
    autofill_profiles.use_count AS UseCount
    FROM
    autofill_profiles
    INNER JOIN autofill_profile_emails ON autofill_profile_emails.guid = autofill_profiles.guid
    INNER JOIN autofill_profile_phones ON autofill_profiles.guid = autofill_profile_phones.guid
    INNER JOIN autofill_profile_names ON autofill_profile_phones.guid = autofill_profile_names.guid
    ORDER BY
    autofill_profiles.guid ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Chromium Browser Autofill Profiles&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Chromium Browser Cookies
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;cookies&#x27; OR name=&#x27;meta&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 2
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    datetime ( cookies.creation_utc / 1000000 + ( strftime( &#x27;%s&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS CreationUTC,
    datetime ( cookies.expires_utc / 1000000 + ( strftime( &#x27;%s&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS ExpiresUTC,
    datetime ( cookies.last_access_utc / 1000000 + ( strftime( &#x27;%s&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS LastAccessUTC,
    cookies.host_key AS HostKey,
    cookies.name AS Name,
    cookies.path AS Path,
    CASE

    WHEN cookies.is_secure = 1 THEN
    &#x27;Yes&#x27;
    WHEN cookies.is_secure = 0 THEN
    &#x27;No&#x27;
    END AS IsSecure,
    CASE

    WHEN cookies.is_httponly = 1 THEN
    &#x27;Yes&#x27;
    WHEN cookies.is_httponly = 0 THEN
    &#x27;No&#x27;
    END AS IsHttpOnly,
    CASE

    WHEN cookies.has_expires = 1 THEN
    &#x27;Yes&#x27;
    WHEN cookies.has_expires = 0 THEN
    &#x27;No&#x27;
    END AS HasExpiration,
    CASE

    WHEN cookies.is_persistent = 1 THEN
    &#x27;Yes&#x27;
    WHEN cookies.is_persistent = 0 THEN
    &#x27;No&#x27;
    END AS IsPersistent,
    cookies.priority AS Priority,
    cookies.source_port AS SourcePort
    FROM
    cookies
    ORDER BY
    cookies.creation_utc ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Chromium Browser Cookies&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Chromium Browser Downloads
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;urls&#x27; OR name=&#x27;visits&#x27; OR name=&#x27;downloads&#x27; OR name=&#x27;segments&#x27; OR name=&#x27;typed_url_sync_metadata&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    downloads.id AS ID,
    downloads.guid AS GUID,
    downloads.current_path AS CurrentPath,
    downloads.target_path AS TargetPath,
    downloads.original_mime_type AS OriginalMIMEType,
    downloads.received_bytes AS ReceivedBytes,
    downloads.total_bytes AS TotalBytes,
    datetime( downloads.start_time / 1000000 + ( strftime( &#x27;%s&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS StartTime,
    datetime( downloads.end_time / 1000000 + ( strftime( &#x27;%s&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS EndTime,
    datetime( downloads.opened / 1000000 + ( strftime( &#x27;%s&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS Opened,
    datetime( downloads.last_access_time / 1000000 + ( strftime( &#x27;%s&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS LastAccessTime,
    downloads.last_modified AS LastModified,
    CASE

    WHEN downloads.state = 0 THEN
    &#x27;In Progress&#x27;
    WHEN downloads.state = 1 THEN
    &#x27;Complete&#x27;
    WHEN downloads.state = 2 THEN
    &#x27;Cancelled&#x27;
    WHEN downloads.state = 3 THEN
    &#x27;Interrupted&#x27;
    WHEN downloads.state = 4 THEN
    &#x27;Interrupted&#x27;
    END AS State,
    CASE

    WHEN downloads.danger_type = 0 THEN
    &#x27;Not Dangerous&#x27;
    WHEN downloads.danger_type = 1 THEN
    &#x27;Dangerous&#x27;
    WHEN downloads.danger_type = 2 THEN
    &#x27;Dangerous URL&#x27;
    WHEN downloads.danger_type = 3 THEN
    &#x27;Dangerous Content&#x27;
    WHEN downloads.danger_type = 4 THEN
    &#x27;Content May Be Malicious&#x27;
    WHEN downloads.danger_type = 5 THEN
    &#x27;Uncommon Content&#x27;
    WHEN downloads.danger_type = 6 THEN
    &#x27;Dangerous But User Validated&#x27;
    WHEN downloads.danger_type = 7 THEN
    &#x27;Dangerous Host&#x27;
    WHEN downloads.danger_type = 8 THEN
    &#x27;Potentially Unwanted&#x27;
    WHEN downloads.danger_type = 9 THEN
    &#x27;Whitelisted by Policy&#x27;
    END AS DangerType,
    CASE

    WHEN downloads.interrupt_reason = 0 THEN
    &#x27;No Interrupt&#x27;
    WHEN downloads.interrupt_reason = 1 THEN
    &#x27;File Error&#x27;
    WHEN downloads.interrupt_reason = 2 THEN
    &#x27;Access Denied&#x27;
    WHEN downloads.interrupt_reason = 3 THEN
    &#x27;Disk Full&#x27;
    WHEN downloads.interrupt_reason = 5 THEN
    &#x27;Path Too Long&#x27;
    WHEN downloads.interrupt_reason = 6 THEN
    &#x27;File Too Large&#x27;
    WHEN downloads.interrupt_reason = 7 THEN
    &#x27;Virus&#x27;
    WHEN downloads.interrupt_reason = 10 THEN
    &#x27;Temporary Problem&#x27;
    WHEN downloads.interrupt_reason = 11 THEN
    &#x27;Blocked&#x27;
    WHEN downloads.interrupt_reason = 12 THEN
    &#x27;Security Check Failed&#x27;
    WHEN downloads.interrupt_reason = 13 THEN
    &#x27;Resume Error&#x27;
    WHEN downloads.interrupt_reason = 20 THEN
    &#x27;Network Error&#x27;
    WHEN downloads.interrupt_reason = 21 THEN
    &#x27;Operation Timed Out&#x27;
    WHEN downloads.interrupt_reason = 22 THEN
    &#x27;Connection Lost&#x27;
    WHEN downloads.interrupt_reason = 23 THEN
    &#x27;Server Down&#x27;
    WHEN downloads.interrupt_reason = 30 THEN
    &#x27;Server Error&#x27;
    WHEN downloads.interrupt_reason = 31 THEN
    &#x27;Range Request Error&#x27;
    WHEN downloads.interrupt_reason = 32 THEN
    &#x27;Server Precondition Error&#x27;
    WHEN downloads.interrupt_reason = 33 THEN
    &#x27;Unable to get file&#x27;
    WHEN downloads.interrupt_reason = 34 THEN
    &#x27;Server Unauthorized&#x27;
    WHEN downloads.interrupt_reason = 35 THEN
    &#x27;Server Certificate Problem&#x27;
    WHEN downloads.interrupt_reason = 36 THEN
    &#x27;Server Access Forbidden&#x27;
    WHEN downloads.interrupt_reason = 37 THEN
    &#x27;Server Unreachable&#x27;
    WHEN downloads.interrupt_reason = 38 THEN
    &#x27;Content Length Mismatch&#x27;
    WHEN downloads.interrupt_reason = 39 THEN
    &#x27;Cross Origin Redirect&#x27;
    WHEN downloads.interrupt_reason = 40 THEN
    &#x27;Cancelled&#x27;
    WHEN downloads.interrupt_reason = 41 THEN
    &#x27;Browser Shutdown&#x27;
    WHEN downloads.interrupt_reason = 50 THEN
    &#x27;Browser Crashed&#x27;
    END AS InterruptReason,
    downloads.referrer AS ReferrerURL,
    downloads.site_url AS SiteURL,
    downloads.tab_url AS TabURL,
    downloads.tab_referrer_url AS TabReferrerURL,
    DownloadURL.url AS DownloadURL
    FROM
    downloads
    INNER JOIN downloads_url_chains AS DownloadURL ON downloads.id = DownloadURL.id
    ORDER BY
    downloads.id ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Chromium Browser Downloads&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Chromium Browser Favicons
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;icon_mapping&#x27; OR name=&#x27;favicons&#x27; OR name=&#x27;favicon_bitmaps&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 3
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    favicons.id AS ID,
    favicon_bitmaps.icon_id AS IconID,
    datetime( favicon_bitmaps.last_updated / 1000000 + ( strftime( &#x27;%s&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS LastUpdated,
    icon_mapping.page_url AS PageURL,
    favicons.url AS FaviconURL
    FROM
    favicons
    INNER JOIN
    icon_mapping
    INNER JOIN
    favicon_bitmaps
    ON icon_mapping.icon_id = favicon_bitmaps.icon_id
    AND favicons.id = favicon_bitmaps.icon_id
    ORDER BY
    favicons.id ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Chromium Browser Favicons&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Chromium Browser History
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;urls&#x27; OR name=&#x27;visits&#x27; OR name=&#x27;downloads&#x27; OR name=&#x27;segments&#x27; OR name=&#x27;typed_url_sync_metadata&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    urls.id AS ID,
    datetime( visits.visit_time / 1000000 + ( strftime( &#x27;%s&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS &#x27;VisitTime (Local)&#x27;,
    datetime( urls.last_visit_time / 1000000 + ( strftime( &#x27;%s&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS &#x27;LastVisitedTime (Local)&#x27;,
    urls.title AS URLTitle,
    urls.url AS URL,
    urls.visit_count AS VisitCount,
    urls.typed_count AS TypedCount,
    CASE

    WHEN urls.hidden = 1 THEN
    &#x27;Yes&#x27;
    WHEN urls.hidden = 0 THEN
    &#x27;No&#x27;
    END AS Hidden,
    visits.id AS VisitID,
    visits.from_visit AS FromVisitID,
    CAST ( visits.visit_duration AS FLOAT ) / 1000000 AS VisitDurationInSeconds
    FROM
    urls
    LEFT JOIN visits ON urls.id = visits.url
    ORDER BY
    visits.visit_time ASC;&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Chromium Browser History&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Chromium Browser Keyword Searches
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;urls&#x27; OR name=&#x27;visits&#x27; OR name=&#x27;downloads&#x27; OR name=&#x27;segments&#x27; OR name=&#x27;typed_url_sync_metadata&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    keyword_search_terms.keyword_id AS KeywordID,
    keyword_search_terms.url_id AS URLID,
    datetime( urls.last_visit_time / 1000000 + ( strftime( &#x27;%s&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS LastVisitTime,
    keyword_search_terms.term AS KeywordSearchTerm,
    urls.title AS Title,
    urls.url AS URL
    FROM
    keyword_search_terms
    INNER JOIN urls ON keyword_search_terms.url_id = urls.id
    ORDER BY
    keyword_search_terms.keyword_id ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Chromium Browser Keyword Searches&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Chromium Browser Masked Credit Cards
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;autofill&#x27; OR name=&#x27;credit_cards&#x27; OR name=&#x27;offer_data&#x27; OR name=&#x27;server_addresses&#x27; OR name=&#x27;keywords&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    masked_credit_cards.id AS ID,
    masked_credit_cards.status AS Status,
    masked_credit_cards.name_on_card AS NameOnCard,
    masked_credit_cards.network AS CardNetwork,
    masked_credit_cards.last_four AS LastFour,
    masked_credit_cards.exp_month AS ExpMonth,
    masked_credit_cards.exp_year AS ExpYear,
    masked_credit_cards.bank_name AS BankName,
    masked_credit_cards.nickname AS CardNickname,
    masked_credit_cards.card_issuer AS CardIssuer,
    masked_credit_cards.instrument_id AS InstrumentID
    FROM
    masked_credit_cards
    ORDER BY
    masked_credit_cards.id ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Chromium Browser Masked Credit Cards&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Chromium Browser Media History Playback
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;origin&#x27; OR name=&#x27;playback&#x27; OR name=&#x27;playbackSession&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 3
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    playback.id AS ID,
    playback.url AS URL,
    playback.watch_time_s AS WatchTimeSeconds,
    CASE

    WHEN playback.has_video = 1 THEN
    &#x27;Yes&#x27;
    WHEN playback.has_video = 0 THEN
    &#x27;No&#x27;
    END AS HasVideo,
    CASE

    WHEN playback.has_audio = 1 THEN
    &#x27;Yes&#x27;
    WHEN playback.has_audio = 0 THEN
    &#x27;No&#x27;
    END AS HasAudio,
    datetime( playback.last_updated_time_s + ( strftime( &#x27;%s&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS LastUpdated,
    playback.origin_id AS OriginID
    FROM
    playback
    ORDER BY
    playback.id ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Chromium Browser Media History Playback&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Chromium Browser Media History Playback Session
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;origin&#x27; OR name=&#x27;playback&#x27; OR name=&#x27;playbackSession&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 3
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
        playbackSession.id AS ID,
        datetime( playbackSession.last_updated_time_s + ( strftime( &#x27;%s&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS LastUpdated,
        playbackSession.url AS URL,
        CAST ( playbackSession.duration_ms AS FLOAT ) / 1000 AS DurationInSeconds,
        CAST ( playbackSession.position_ms AS FLOAT ) / 1000 AS PositionInSeconds,
        playbackSession.title AS Title,
        playbackSession.artist AS Artist,
        playbackSession.album AS Album,
        playbackSession.source_title AS SourceTitle,
        playbackSession.origin_id AS OriginID
    FROM
        playbackSession
    ORDER BY
        playbackSession.id&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Chromium Browser Media History Playback Session&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Chromium Browser Network Action Predictor
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;resource_prefetch_predictor_host_redirect&#x27; OR name=&#x27;network_action_predictor&#x27; OR name=&#x27;resource_prefetch_predictor_metadata&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 3
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    network_action_predictor.id AS ID,
    network_action_predictor.user_text AS UserText,
    network_action_predictor.url AS URL,
    network_action_predictor.number_of_hits AS NumberOfHits,
    network_action_predictor.number_of_misses AS NumberOfMisses
    FROM
    network_action_predictor,
    resource_prefetch_predictor_host_redirect
    ORDER BY
    network_action_predictor.id ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Chromium Browser Network Action Predictor&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Chromium Browser Shortcuts
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;meta&#x27; OR name=&#x27;omni_box_shortcuts&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 2
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    datetime( omni_box_shortcuts.last_access_time / 1000000 + ( strftime( &#x27;%s&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS LastAccessTime,
    omni_box_shortcuts.text AS TextTyped,
    omni_box_shortcuts.fill_into_edit AS FillIntoEdit,
    omni_box_shortcuts.url AS URL,
    omni_box_shortcuts.contents AS Contents,
    omni_box_shortcuts.description AS Description,
    omni_box_shortcuts.type AS Type,
    omni_box_shortcuts.keyword AS Keyword,
    omni_box_shortcuts.number_of_hits AS TimesSelectedByUser,
    omni_box_shortcuts.id AS ID
    FROM
    omni_box_shortcuts
    ORDER BY
    omni_box_shortcuts.last_access_time ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Chromium Browser Shortcuts&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Chromium Browser Top Sites
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;meta&#x27; OR name=&#x27;top_sites&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 2
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    top_sites.url_rank AS URLRank,
    top_sites.url AS URL,
    top_sites.title AS Title,
    top_sites.redirects AS Redirects
    FROM
    top_sites
    ORDER BY
    top_sites.url_rank ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Chromium Browser Top Sites&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Dropbox Aggregation database
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;snapshot&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    snapshot.&quot;key&quot; AS &quot;Key&quot;,
    snapshot.value AS &quot;Value(ConvertToJSON)&quot;
    FROM
    snapshot
    ORDER BY
    snapshot.&quot;key&quot; ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Dropbox Aggregation database&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Drobpox
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;file_journal&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    id,
    server_path,
    parent_path,
    local_host_id,
    local_filename,
    local_infinite_details,
    local_size,
    datetime(local_mtime,&#x27;unixepoch&#x27;) AS &quot;Local Modified Time&quot;,
    datetime(local_ctime,&#x27;unixepoch&#x27;) AS &quot;Local Created Time&quot;,
    local_attrs,
    datetime(local_timestamp,&#x27;unixepoch&#x27;) AS &quot;Local Timestamp&quot;,
    local_user_id,
    Local_sync_type,
    updated_filename,
    updated_host_id,
    updated_size,
    datetime(updated_mtime) AS &quot;Updated Modified Time&quot;,
    datetime(updated_timestamp) AS &quot;Updated Timestamp&quot;,
    updated_dir,
    updated_user_id,
    updated_sync_type
    from file_journal
    order by &quot;local created time&quot; desc&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Drobpox&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Dropbox Icon DB
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;ext_icon_table&#x27; OR name=&#x27;folder_icon_table&#x27; OR name=&#x27;path_icon_table&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 3
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    datetime( &quot;created_time&quot;, &#x27;unixepoch&#x27; ) AS CreatedTime,
    datetime( &quot;file_mtime&quot;, &#x27;unixepoch&#x27; ) AS ModifiedTime,
    path_icon_table.file_path AS FilePath
    FROM
    path_icon_table
    ORDER BY
    path_icon_table.created_time ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Dropbox Icon DB&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Dropbox
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;instance&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    id,
    active,
    appdata_path,
    default_dropbox_path,
    default_dropbox_folder_name,
    business_name,
    uid,
    host_id
    from instance&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Dropbox&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Dropbox Non-Local Resources
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;activity_feed&#x27; OR name=&#x27;recents&#x27; OR name=&#x27;starred_items&#x27; OR name=&#x27;calendar_items&#x27; OR name=&#x27;sfj_resources&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    datetime( nonlocal_resources.server_fetch_timestamp / 1000 + ( strftime( &#x27;%ms&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS timestamp,
    nonlocal_resources.account_id AS AccountID,
    nonlocal_resources.name AS Name,
    nonlocal_resources.url AS URL,
    nonlocal_resources.server_path AS ServerPath,
    CASE

    WHEN nonlocal_resources.is_dir = 0 THEN
    &#x27;No&#x27;
    WHEN nonlocal_resources.is_dir = 1 THEN
    &#x27;Yes&#x27;
    END AS IsDirectory,
    CASE

    WHEN nonlocal_resources.is_share = 0 THEN
    &#x27;No&#x27;
    WHEN nonlocal_resources.is_share = 1 THEN
    &#x27;Yes&#x27;
    END AS IsShare,
    nonlocal_resources.resource_type AS ResourceType,
    nonlocal_resources.resource_id AS ResourceID
    FROM
    nonlocal_resources&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Dropbox Non-Local Resources&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Dropbox Recent Items
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;activity_feed&#x27; OR name=&#x27;recents&#x27; OR name=&#x27;starred_items&#x27; OR name=&#x27;calendar_items&#x27; OR name=&#x27;sfj_resources&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    datetime( timestamp / 1000 + ( strftime( &#x27;%ms&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS Timestamp,
    recents.account_id AS AccountID,
    recents.server_path AS ServerPath,
    datetime( server_fetch_timestamp / 1000 + ( strftime( &#x27;%ms&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS ServerFetchTimestamp,
    recents.batch_key AS BatchKey,
    recents.event_type AS EventType,
    CASE

    WHEN recents.is_local = 0 THEN
    &#x27;No&#x27;
    WHEN recents.is_local = 1 THEN
    &#x27;Yes&#x27;
    END AS IsLocal,
    recents.keywords AS Keywords,
    recents.resource_id AS ResourceID,
    recents.resource_type AS ResourceType
    FROM
    recents
    ORDER BY
    recents.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Dropbox Recent Items&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Dropbox SFJ Resources
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;activity_feed&#x27; OR name=&#x27;recents&#x27; OR name=&#x27;starred_items&#x27; OR name=&#x27;calendar_items&#x27; OR name=&#x27;sfj_resources&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    datetime( server_fetch_timestamp / 1000 + ( strftime( &#x27;%ms&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS ServerFetchTimestamp,
    sfj_resources.name AS Name,
    sfj_resources.cased_server_path AS ServerPath,
    sfj_resources.resource_type AS ResourceType,
    sfj_resources.resource_id AS ResourceID,
    sfj_resources.account_id AS AccountID,
    sfj_resources.icon_override AS IconOverride
    FROM
    sfj_resources
    ORDER BY
    sfj_resources.server_fetch_timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Dropbox SFJ Resources&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Dropbox Starred Items
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;activity_feed&#x27; OR name=&#x27;recents&#x27; OR name=&#x27;starred_items&#x27; OR name=&#x27;calendar_items&#x27; OR name=&#x27;sfj_resources&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    datetime( timestamp / 1000 + ( strftime( &#x27;%ms&#x27;, &#x27;1601-01-01&#x27; ) ), &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS timestamp,
    starred_items.account_id AS AccountID,
    starred_items.server_path AS ServerPath,
    CASE

    WHEN starred_items.is_starred = 0 THEN
    &#x27;No&#x27;
    WHEN starred_items.is_starred = 1 THEN
    &#x27;Yes&#x27;
    END AS IsStarred,
    starred_items.keywords AS Keywords,
    starred_items.paper_path AS PaperPath,
    starred_items.persist_state AS PersistState,
    starred_items.resource_type AS ResourceType,
    starred_items.resource_id AS ResourceID
    FROM
    starred_items
    ORDER BY
    starred_items.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Dropbox Starred Items&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Dropbox Sync History
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;sync_history&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    datetime( &quot;timestamp&quot;, &#x27;unixepoch&#x27; ) AS Timestamp,
    sync_history.event_type AS EventType,
    sync_history.file_event_type AS FileEventType,
    sync_history.direction AS Direction,
    sync_history.local_path AS LocalPath,
    sync_history.file_id AS FileID
    FROM
    sync_history
    ORDER BY
    sync_history.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Dropbox Sync History&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Dropbox Tray Thumbnails
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;cached_thumbnail_table&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    datetime( &quot;timestamp&quot;, &#x27;unixepoch&#x27; ) AS Timestamp,
    cached_thumbnail_table.file_name AS FileName,
    cached_thumbnail_table.blocklist AS BlockList
    FROM
    cached_thumbnail_table
    ORDER BY
    cached_thumbnail_table.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Dropbox Tray Thumbnails&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Drobpox
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;config&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
       key,
       VALUE
       from config&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Drobpox&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows EventTranscript.db BrowsingHistory
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;categories&#x27; OR name=&#x27;event_categories&#x27; OR name=&#x27;event_tags&#x27; OR name=&#x27;events_persisted&#x27; OR name=&#x27;producers&#x27; OR name=&#x27;provider_groups&#x27; OR name=&#x27;tag_descriptions&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 7
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    CASE

    WHEN
    events_persisted.sid = &#x27;S-1-0&#x27; THEN
    &#x27;S-1-0 (Null Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-0-0&#x27; THEN
    &#x27;S-1-0-0 (Nobody)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1&#x27; THEN
    &#x27;S-1-1 (World Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1-0&#x27; THEN
    &#x27;S-1-1-0 (Everyone)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-0&#x27; THEN
    &#x27;S-1-16-0 (Untrusted Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-12288&#x27; THEN
    &#x27;S-1-16-12288 (High Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-16384&#x27; THEN
    &#x27;S-1-16-16384 (System Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-20480&#x27; THEN
    &#x27;S-1-16-20480 (Protected Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-28672&#x27; THEN
    &#x27;S-1-16-28672 (Secure Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-4096&#x27; THEN
    &#x27;S-1-16-4096 (Low Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8192&#x27; THEN
    &#x27;S-1-16-8192 (Medium Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8448&#x27; THEN
    &#x27;S-1-16-8448 (Medium Plus Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2&#x27; THEN
    &#x27;S-1-2 (Local Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-0&#x27; THEN
    &#x27;S-1-2-0 (Local)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-1&#x27; THEN
    &#x27;S-1-2-1 (Console Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3&#x27; THEN
    &#x27;S-1-3 (Creator Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-0&#x27; THEN
    &#x27;S-1-3-0 (Creator Owner)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-1&#x27; THEN
    &#x27;S-1-3-1 (Creator Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-2&#x27; THEN
    &#x27;S-1-3-2 (Creator Owner Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-3&#x27; THEN
    &#x27;S-1-3-3 (Creator Group Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-4&#x27; THEN
    &#x27;S-1-3-4 (Owner Rights)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-4&#x27; THEN
    &#x27;S-1-4 (Non-unique Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5&#x27; THEN
    &#x27;S-1-5 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-1&#x27; THEN
    &#x27;S-1-5-1 (Dialup)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-10&#x27; THEN
    &#x27;S-1-5-10 (Principal Self)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-11&#x27; THEN
    &#x27;S-1-5-11 (Authenticated Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-12&#x27; THEN
    &#x27;S-1-5-12 (Restricted Code)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-13&#x27; THEN
    &#x27;S-1-5-13 (Terminal Server Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-14&#x27; THEN
    &#x27;S-1-5-14 (Remote Interactive Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-15&#x27; THEN
    &#x27;S-1-5-15 (This Organization)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-17&#x27; THEN
    &#x27;S-1-5-17 (IUSR)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-18&#x27; THEN
    &#x27;S-1-5-18 (Local System)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-19&#x27; THEN
    &#x27;S-1-5-19 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-2&#x27; THEN
    &#x27;S-1-5-2 (Network)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-20&#x27; THEN
    &#x27;S-1-5-20 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-498&#x27; THEN
    &#x27;S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-521&#x27; THEN
    &#x27;S-1-5-21domain-521 (Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-571&#x27; THEN
    &#x27;S-1-5-21domain-571 (Allowed RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-572&#x27; THEN
    &#x27;S-1-5-21domain-572 (Denied RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-500&#x27; THEN
    &#x27;S-1-5-21domain-500 (Administrator)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-501&#x27; THEN
    &#x27;S-1-5-21domain-501 (Guest)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-502&#x27; THEN
    &#x27;S-1-5-21domain-502 (KRBTGT)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-512&#x27; THEN
    &#x27;S-1-5-21domain-512 (Domain Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-513&#x27; THEN
    &#x27;S-1-5-21domain-513 (Domain Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-514&#x27; THEN
    &#x27;S-1-5-21domain-514 (Domain Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-515&#x27; THEN
    &#x27;S-1-5-21domain-515 (Domain Computers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-516&#x27; THEN
    &#x27;S-1-5-21domain-516 (Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-517&#x27; THEN
    &#x27;S-1-5-21domain-517 (Cert Publishers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-520&#x27; THEN
    &#x27;S-1-5-21domain-520 (Group Policy Creator Owners)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21-domain-522&#x27; THEN
    &#x27;S-1-5-21-domain-522 (Cloneable Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-526&#x27; THEN
    &#x27;S-1-5-21domain-526 (Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-527&#x27; THEN
    &#x27;S-1-5-21domain-527 (Enterprise Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-553&#x27; THEN
    &#x27;S-1-5-21domain-553 (RAS and IAS Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-518&#x27; THEN
    &#x27;S-1-5-21root domain-518 (Schema Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-519&#x27; THEN
    &#x27;S-1-5-21root domain-519 (Enterprise Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-3&#x27; THEN
    &#x27;S-1-5-3 (Batch)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-544&#x27; THEN
    &#x27;S-1-5-32-544 (Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-545&#x27; THEN
    &#x27;S-1-5-32-545 (Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-546&#x27; THEN
    &#x27;S-1-5-32-546 (Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-547&#x27; THEN
    &#x27;S-1-5-32-547 (Power Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-548&#x27; THEN
    &#x27;S-1-5-32-548 (Account Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-549&#x27; THEN
    &#x27;S-1-5-32-549 (Server Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-550&#x27; THEN
    &#x27;S-1-5-32-550 (Print Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-551&#x27; THEN
    &#x27;S-1-5-32-551 (Backup Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-552&#x27; THEN
    &#x27;S-1-5-32-552 (Replicators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-554&#x27; THEN
    &#x27;S-1-5-32-554 (Builtin\Pre-Windows 2000 Compatible Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-555&#x27; THEN
    &#x27;S-1-5-32-555 (Builtin\Remote Desktop Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-556&#x27; THEN
    &#x27;S-1-5-32-556 (Builtin\Network Configuration Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-557&#x27; THEN
    &#x27;S-1-5-32-557 (Builtin\Incoming Forest Trust Builders)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-558&#x27; THEN
    &#x27;S-1-5-32-558 (Builtin\Performance Monitor Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-559&#x27; THEN
    &#x27;S-1-5-32-559 (Builtin\Performance Log Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-560&#x27; THEN
    &#x27;S-1-5-32-560 (Builtin\Windows Authorization Access Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-561&#x27; THEN
    &#x27;S-1-5-32-561 (Builtin\Terminal Server License Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-562&#x27; THEN
    &#x27;S-1-5-32-562 (Builtin\Distributed COM Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-569&#x27; THEN
    &#x27;S-1-5-32-569 (Builtin\Cryptographic Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-573&#x27; THEN
    &#x27;S-1-5-32-573 (Builtin\Event Log Readers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-574&#x27; THEN
    &#x27;S-1-5-32-574 (Builtin\Certificate Service DCOM Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-575&#x27; THEN
    &#x27;S-1-5-32-575 (Builtin\RDS Remote Access Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-576&#x27; THEN
    &#x27;S-1-5-32-576 (Builtin\RDS Endpoint Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-577&#x27; THEN
    &#x27;S-1-5-32-577 (Builtin\RDS Management Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-578&#x27; THEN
    &#x27;S-1-5-32-578 (Builtin\Hyper-V Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-579&#x27; THEN
    &#x27;S-1-5-32-579 (Builtin\Access Control Assistance Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-580&#x27; THEN
    &#x27;S-1-5-32-580 (Builtin\Remote Management Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-582&#x27; THEN
    &#x27;S-1-5-32-582 (Storage Replica Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-4&#x27; THEN
    &#x27;S-1-5-4 (Interactive)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-5-X-Y&#x27; THEN
    &#x27;S-1-5-5-X-Y (Logon Session)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-6&#x27; THEN
    &#x27;S-1-5-6 (Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-10&#x27; THEN
    &#x27;S-1-5-64-10 (NTLM Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-14&#x27; THEN
    &#x27;S-1-5-64-14 (SChannelAuthentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-21&#x27; THEN
    &#x27;S-1-5-64-21 (Digest Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-7&#x27; THEN
    &#x27;S-1-5-7 (Anonymous)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-8&#x27; THEN
    &#x27;S-1-5-8 (Proxy)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80&#x27; THEN
    &#x27;S-1-5-80 (NT Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (NT Services\All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-83-0&#x27; THEN
    &#x27;S-1-5-83-0 (NT Virtual Machine\Virtual Machines)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-9&#x27; THEN
    &#x27;S-1-5-9 (Enterprise Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-90-0&#x27; THEN
    &#x27;S-1-5-90-0 (Windows Manager\Windows Manager Group)&#x27; ELSE events_persisted.sid
    END AS UserSID,
    datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS Timestamp,
    tag_descriptions.locale_name AS LocaleName,
    producers.producer_id_text AS ProducerIDText,
    tag_descriptions.tag_name AS TagName,
    events_persisted.full_event_name AS FullEventName,
    events_persisted.logging_binary_name AS LoggingBinaryName,
    events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
    events_persisted.full_event_name_hash AS FullEventNameHash,
    events_persisted.event_keywords AS Keywords,
    provider_groups.group_guid AS GroupGUID,
    CASE

    WHEN events_persisted.is_core = 0 THEN
    &#x27;No&#x27;
    WHEN events_persisted.is_core = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsCore,
    events_persisted.compressed_payload_size AS CompressedPayloadSize,
    events_persisted.payload AS JSONPayload
    FROM
    events_persisted
    LEFT JOIN producers ON events_persisted.producer_id = producers.producer_id
    LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
    LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
    LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
    WHERE
    TagName = &#x27;Browsing History&#x27;
    ORDER BY
    events_persisted.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows EventTranscript.db BrowsingHistory&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows EventTranscript.db Device Connectivity and Configuration
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;categories&#x27; OR name=&#x27;event_categories&#x27; OR name=&#x27;event_tags&#x27; OR name=&#x27;events_persisted&#x27; OR name=&#x27;producers&#x27; OR name=&#x27;provider_groups&#x27; OR name=&#x27;tag_descriptions&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 7
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    CASE

    WHEN
    events_persisted.sid = &#x27;S-1-0&#x27; THEN
    &#x27;S-1-0 (Null Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-0-0&#x27; THEN
    &#x27;S-1-0-0 (Nobody)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1&#x27; THEN
    &#x27;S-1-1 (World Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1-0&#x27; THEN
    &#x27;S-1-1-0 (Everyone)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-0&#x27; THEN
    &#x27;S-1-16-0 (Untrusted Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-12288&#x27; THEN
    &#x27;S-1-16-12288 (High Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-16384&#x27; THEN
    &#x27;S-1-16-16384 (System Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-20480&#x27; THEN
    &#x27;S-1-16-20480 (Protected Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-28672&#x27; THEN
    &#x27;S-1-16-28672 (Secure Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-4096&#x27; THEN
    &#x27;S-1-16-4096 (Low Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8192&#x27; THEN
    &#x27;S-1-16-8192 (Medium Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8448&#x27; THEN
    &#x27;S-1-16-8448 (Medium Plus Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2&#x27; THEN
    &#x27;S-1-2 (Local Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-0&#x27; THEN
    &#x27;S-1-2-0 (Local)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-1&#x27; THEN
    &#x27;S-1-2-1 (Console Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3&#x27; THEN
    &#x27;S-1-3 (Creator Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-0&#x27; THEN
    &#x27;S-1-3-0 (Creator Owner)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-1&#x27; THEN
    &#x27;S-1-3-1 (Creator Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-2&#x27; THEN
    &#x27;S-1-3-2 (Creator Owner Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-3&#x27; THEN
    &#x27;S-1-3-3 (Creator Group Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-4&#x27; THEN
    &#x27;S-1-3-4 (Owner Rights)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-4&#x27; THEN
    &#x27;S-1-4 (Non-unique Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5&#x27; THEN
    &#x27;S-1-5 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-1&#x27; THEN
    &#x27;S-1-5-1 (Dialup)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-10&#x27; THEN
    &#x27;S-1-5-10 (Principal Self)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-11&#x27; THEN
    &#x27;S-1-5-11 (Authenticated Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-12&#x27; THEN
    &#x27;S-1-5-12 (Restricted Code)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-13&#x27; THEN
    &#x27;S-1-5-13 (Terminal Server Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-14&#x27; THEN
    &#x27;S-1-5-14 (Remote Interactive Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-15&#x27; THEN
    &#x27;S-1-5-15 (This Organization)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-17&#x27; THEN
    &#x27;S-1-5-17 (IUSR)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-18&#x27; THEN
    &#x27;S-1-5-18 (Local System)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-19&#x27; THEN
    &#x27;S-1-5-19 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-2&#x27; THEN
    &#x27;S-1-5-2 (Network)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-20&#x27; THEN
    &#x27;S-1-5-20 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-498&#x27; THEN
    &#x27;S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-521&#x27; THEN
    &#x27;S-1-5-21domain-521 (Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-571&#x27; THEN
    &#x27;S-1-5-21domain-571 (Allowed RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-572&#x27; THEN
    &#x27;S-1-5-21domain-572 (Denied RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-500&#x27; THEN
    &#x27;S-1-5-21domain-500 (Administrator)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-501&#x27; THEN
    &#x27;S-1-5-21domain-501 (Guest)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-502&#x27; THEN
    &#x27;S-1-5-21domain-502 (KRBTGT)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-512&#x27; THEN
    &#x27;S-1-5-21domain-512 (Domain Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-513&#x27; THEN
    &#x27;S-1-5-21domain-513 (Domain Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-514&#x27; THEN
    &#x27;S-1-5-21domain-514 (Domain Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-515&#x27; THEN
    &#x27;S-1-5-21domain-515 (Domain Computers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-516&#x27; THEN
    &#x27;S-1-5-21domain-516 (Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-517&#x27; THEN
    &#x27;S-1-5-21domain-517 (Cert Publishers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-520&#x27; THEN
    &#x27;S-1-5-21domain-520 (Group Policy Creator Owners)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21-domain-522&#x27; THEN
    &#x27;S-1-5-21-domain-522 (Cloneable Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-526&#x27; THEN
    &#x27;S-1-5-21domain-526 (Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-527&#x27; THEN
    &#x27;S-1-5-21domain-527 (Enterprise Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-553&#x27; THEN
    &#x27;S-1-5-21domain-553 (RAS and IAS Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-518&#x27; THEN
    &#x27;S-1-5-21root domain-518 (Schema Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-519&#x27; THEN
    &#x27;S-1-5-21root domain-519 (Enterprise Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-3&#x27; THEN
    &#x27;S-1-5-3 (Batch)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-544&#x27; THEN
    &#x27;S-1-5-32-544 (Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-545&#x27; THEN
    &#x27;S-1-5-32-545 (Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-546&#x27; THEN
    &#x27;S-1-5-32-546 (Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-547&#x27; THEN
    &#x27;S-1-5-32-547 (Power Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-548&#x27; THEN
    &#x27;S-1-5-32-548 (Account Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-549&#x27; THEN
    &#x27;S-1-5-32-549 (Server Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-550&#x27; THEN
    &#x27;S-1-5-32-550 (Print Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-551&#x27; THEN
    &#x27;S-1-5-32-551 (Backup Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-552&#x27; THEN
    &#x27;S-1-5-32-552 (Replicators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-554&#x27; THEN
    &#x27;S-1-5-32-554 (Builtin\Pre-Windows 2000 Compatible Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-555&#x27; THEN
    &#x27;S-1-5-32-555 (Builtin\Remote Desktop Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-556&#x27; THEN
    &#x27;S-1-5-32-556 (Builtin\Network Configuration Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-557&#x27; THEN
    &#x27;S-1-5-32-557 (Builtin\Incoming Forest Trust Builders)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-558&#x27; THEN
    &#x27;S-1-5-32-558 (Builtin\Performance Monitor Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-559&#x27; THEN
    &#x27;S-1-5-32-559 (Builtin\Performance Log Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-560&#x27; THEN
    &#x27;S-1-5-32-560 (Builtin\Windows Authorization Access Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-561&#x27; THEN
    &#x27;S-1-5-32-561 (Builtin\Terminal Server License Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-562&#x27; THEN
    &#x27;S-1-5-32-562 (Builtin\Distributed COM Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-569&#x27; THEN
    &#x27;S-1-5-32-569 (Builtin\Cryptographic Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-573&#x27; THEN
    &#x27;S-1-5-32-573 (Builtin\Event Log Readers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-574&#x27; THEN
    &#x27;S-1-5-32-574 (Builtin\Certificate Service DCOM Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-575&#x27; THEN
    &#x27;S-1-5-32-575 (Builtin\RDS Remote Access Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-576&#x27; THEN
    &#x27;S-1-5-32-576 (Builtin\RDS Endpoint Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-577&#x27; THEN
    &#x27;S-1-5-32-577 (Builtin\RDS Management Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-578&#x27; THEN
    &#x27;S-1-5-32-578 (Builtin\Hyper-V Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-579&#x27; THEN
    &#x27;S-1-5-32-579 (Builtin\Access Control Assistance Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-580&#x27; THEN
    &#x27;S-1-5-32-580 (Builtin\Remote Management Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-582&#x27; THEN
    &#x27;S-1-5-32-582 (Storage Replica Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-4&#x27; THEN
    &#x27;S-1-5-4 (Interactive)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-5-X-Y&#x27; THEN
    &#x27;S-1-5-5-X-Y (Logon Session)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-6&#x27; THEN
    &#x27;S-1-5-6 (Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-10&#x27; THEN
    &#x27;S-1-5-64-10 (NTLM Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-14&#x27; THEN
    &#x27;S-1-5-64-14 (SChannelAuthentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-21&#x27; THEN
    &#x27;S-1-5-64-21 (Digest Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-7&#x27; THEN
    &#x27;S-1-5-7 (Anonymous)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-8&#x27; THEN
    &#x27;S-1-5-8 (Proxy)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80&#x27; THEN
    &#x27;S-1-5-80 (NT Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (NT Services\All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-83-0&#x27; THEN
    &#x27;S-1-5-83-0 (NT Virtual Machine\Virtual Machines)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-9&#x27; THEN
    &#x27;S-1-5-9 (Enterprise Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-90-0&#x27; THEN
    &#x27;S-1-5-90-0 (Windows Manager\Windows Manager Group)&#x27; ELSE events_persisted.sid
    END AS UserSID,
    datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS Timestamp,
    tag_descriptions.locale_name AS LocaleName,
    producers.producer_id_text AS ProducerIDText,
    tag_descriptions.tag_name AS TagName,
    events_persisted.full_event_name AS FullEventName,
    events_persisted.logging_binary_name AS LoggingBinaryName,
    events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
    events_persisted.full_event_name_hash AS FullEventNameHash,
    events_persisted.event_keywords AS Keywords,
    provider_groups.group_guid AS GroupGUID,
    CASE

    WHEN events_persisted.is_core = 0 THEN
    &#x27;No&#x27;
    WHEN events_persisted.is_core = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsCore,
    events_persisted.compressed_payload_size AS CompressedPayloadSize,
    events_persisted.payload AS JSONPayload
    FROM
    events_persisted
    LEFT JOIN producers ON events_persisted.producer_id = producers.producer_id
    LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
    LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
    LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
    WHERE
    TagName = &#x27;Device Connectivity and Configuration&#x27;
    ORDER BY
    events_persisted.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows EventTranscript.db Device Connectivity and Configuration&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows EventTranscript.db Inking Typing and Speech Utterance
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;categories&#x27; OR name=&#x27;event_categories&#x27; OR name=&#x27;event_tags&#x27; OR name=&#x27;events_persisted&#x27; OR name=&#x27;producers&#x27; OR name=&#x27;provider_groups&#x27; OR name=&#x27;tag_descriptions&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 7
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    CASE

    WHEN
    events_persisted.sid = &#x27;S-1-0&#x27; THEN
    &#x27;S-1-0 (Null Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-0-0&#x27; THEN
    &#x27;S-1-0-0 (Nobody)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1&#x27; THEN
    &#x27;S-1-1 (World Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1-0&#x27; THEN
    &#x27;S-1-1-0 (Everyone)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-0&#x27; THEN
    &#x27;S-1-16-0 (Untrusted Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-12288&#x27; THEN
    &#x27;S-1-16-12288 (High Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-16384&#x27; THEN
    &#x27;S-1-16-16384 (System Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-20480&#x27; THEN
    &#x27;S-1-16-20480 (Protected Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-28672&#x27; THEN
    &#x27;S-1-16-28672 (Secure Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-4096&#x27; THEN
    &#x27;S-1-16-4096 (Low Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8192&#x27; THEN
    &#x27;S-1-16-8192 (Medium Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8448&#x27; THEN
    &#x27;S-1-16-8448 (Medium Plus Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2&#x27; THEN
    &#x27;S-1-2 (Local Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-0&#x27; THEN
    &#x27;S-1-2-0 (Local)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-1&#x27; THEN
    &#x27;S-1-2-1 (Console Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3&#x27; THEN
    &#x27;S-1-3 (Creator Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-0&#x27; THEN
    &#x27;S-1-3-0 (Creator Owner)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-1&#x27; THEN
    &#x27;S-1-3-1 (Creator Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-2&#x27; THEN
    &#x27;S-1-3-2 (Creator Owner Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-3&#x27; THEN
    &#x27;S-1-3-3 (Creator Group Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-4&#x27; THEN
    &#x27;S-1-3-4 (Owner Rights)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-4&#x27; THEN
    &#x27;S-1-4 (Non-unique Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5&#x27; THEN
    &#x27;S-1-5 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-1&#x27; THEN
    &#x27;S-1-5-1 (Dialup)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-10&#x27; THEN
    &#x27;S-1-5-10 (Principal Self)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-11&#x27; THEN
    &#x27;S-1-5-11 (Authenticated Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-12&#x27; THEN
    &#x27;S-1-5-12 (Restricted Code)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-13&#x27; THEN
    &#x27;S-1-5-13 (Terminal Server Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-14&#x27; THEN
    &#x27;S-1-5-14 (Remote Interactive Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-15&#x27; THEN
    &#x27;S-1-5-15 (This Organization)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-17&#x27; THEN
    &#x27;S-1-5-17 (IUSR)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-18&#x27; THEN
    &#x27;S-1-5-18 (Local System)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-19&#x27; THEN
    &#x27;S-1-5-19 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-2&#x27; THEN
    &#x27;S-1-5-2 (Network)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-20&#x27; THEN
    &#x27;S-1-5-20 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-498&#x27; THEN
    &#x27;S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-521&#x27; THEN
    &#x27;S-1-5-21domain-521 (Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-571&#x27; THEN
    &#x27;S-1-5-21domain-571 (Allowed RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-572&#x27; THEN
    &#x27;S-1-5-21domain-572 (Denied RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-500&#x27; THEN
    &#x27;S-1-5-21domain-500 (Administrator)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-501&#x27; THEN
    &#x27;S-1-5-21domain-501 (Guest)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-502&#x27; THEN
    &#x27;S-1-5-21domain-502 (KRBTGT)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-512&#x27; THEN
    &#x27;S-1-5-21domain-512 (Domain Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-513&#x27; THEN
    &#x27;S-1-5-21domain-513 (Domain Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-514&#x27; THEN
    &#x27;S-1-5-21domain-514 (Domain Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-515&#x27; THEN
    &#x27;S-1-5-21domain-515 (Domain Computers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-516&#x27; THEN
    &#x27;S-1-5-21domain-516 (Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-517&#x27; THEN
    &#x27;S-1-5-21domain-517 (Cert Publishers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-520&#x27; THEN
    &#x27;S-1-5-21domain-520 (Group Policy Creator Owners)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21-domain-522&#x27; THEN
    &#x27;S-1-5-21-domain-522 (Cloneable Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-526&#x27; THEN
    &#x27;S-1-5-21domain-526 (Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-527&#x27; THEN
    &#x27;S-1-5-21domain-527 (Enterprise Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-553&#x27; THEN
    &#x27;S-1-5-21domain-553 (RAS and IAS Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-518&#x27; THEN
    &#x27;S-1-5-21root domain-518 (Schema Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-519&#x27; THEN
    &#x27;S-1-5-21root domain-519 (Enterprise Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-3&#x27; THEN
    &#x27;S-1-5-3 (Batch)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-544&#x27; THEN
    &#x27;S-1-5-32-544 (Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-545&#x27; THEN
    &#x27;S-1-5-32-545 (Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-546&#x27; THEN
    &#x27;S-1-5-32-546 (Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-547&#x27; THEN
    &#x27;S-1-5-32-547 (Power Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-548&#x27; THEN
    &#x27;S-1-5-32-548 (Account Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-549&#x27; THEN
    &#x27;S-1-5-32-549 (Server Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-550&#x27; THEN
    &#x27;S-1-5-32-550 (Print Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-551&#x27; THEN
    &#x27;S-1-5-32-551 (Backup Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-552&#x27; THEN
    &#x27;S-1-5-32-552 (Replicators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-554&#x27; THEN
    &#x27;S-1-5-32-554 (Builtin\Pre-Windows 2000 Compatible Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-555&#x27; THEN
    &#x27;S-1-5-32-555 (Builtin\Remote Desktop Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-556&#x27; THEN
    &#x27;S-1-5-32-556 (Builtin\Network Configuration Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-557&#x27; THEN
    &#x27;S-1-5-32-557 (Builtin\Incoming Forest Trust Builders)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-558&#x27; THEN
    &#x27;S-1-5-32-558 (Builtin\Performance Monitor Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-559&#x27; THEN
    &#x27;S-1-5-32-559 (Builtin\Performance Log Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-560&#x27; THEN
    &#x27;S-1-5-32-560 (Builtin\Windows Authorization Access Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-561&#x27; THEN
    &#x27;S-1-5-32-561 (Builtin\Terminal Server License Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-562&#x27; THEN
    &#x27;S-1-5-32-562 (Builtin\Distributed COM Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-569&#x27; THEN
    &#x27;S-1-5-32-569 (Builtin\Cryptographic Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-573&#x27; THEN
    &#x27;S-1-5-32-573 (Builtin\Event Log Readers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-574&#x27; THEN
    &#x27;S-1-5-32-574 (Builtin\Certificate Service DCOM Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-575&#x27; THEN
    &#x27;S-1-5-32-575 (Builtin\RDS Remote Access Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-576&#x27; THEN
    &#x27;S-1-5-32-576 (Builtin\RDS Endpoint Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-577&#x27; THEN
    &#x27;S-1-5-32-577 (Builtin\RDS Management Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-578&#x27; THEN
    &#x27;S-1-5-32-578 (Builtin\Hyper-V Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-579&#x27; THEN
    &#x27;S-1-5-32-579 (Builtin\Access Control Assistance Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-580&#x27; THEN
    &#x27;S-1-5-32-580 (Builtin\Remote Management Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-582&#x27; THEN
    &#x27;S-1-5-32-582 (Storage Replica Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-4&#x27; THEN
    &#x27;S-1-5-4 (Interactive)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-5-X-Y&#x27; THEN
    &#x27;S-1-5-5-X-Y (Logon Session)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-6&#x27; THEN
    &#x27;S-1-5-6 (Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-10&#x27; THEN
    &#x27;S-1-5-64-10 (NTLM Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-14&#x27; THEN
    &#x27;S-1-5-64-14 (SChannelAuthentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-21&#x27; THEN
    &#x27;S-1-5-64-21 (Digest Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-7&#x27; THEN
    &#x27;S-1-5-7 (Anonymous)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-8&#x27; THEN
    &#x27;S-1-5-8 (Proxy)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80&#x27; THEN
    &#x27;S-1-5-80 (NT Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (NT Services\All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-83-0&#x27; THEN
    &#x27;S-1-5-83-0 (NT Virtual Machine\Virtual Machines)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-9&#x27; THEN
    &#x27;S-1-5-9 (Enterprise Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-90-0&#x27; THEN
    &#x27;S-1-5-90-0 (Windows Manager\Windows Manager Group)&#x27; ELSE events_persisted.sid
    END AS UserSID,
    datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS Timestamp,
    tag_descriptions.locale_name AS LocaleName,
    producers.producer_id_text AS ProducerIDText,
    tag_descriptions.tag_name AS TagName,
    events_persisted.full_event_name AS FullEventName,
    events_persisted.logging_binary_name AS LoggingBinaryName,
    events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
    events_persisted.full_event_name_hash AS FullEventNameHash,
    events_persisted.event_keywords AS Keywords,
    provider_groups.group_guid AS GroupGUID,
    CASE

    WHEN events_persisted.is_core = 0 THEN
    &#x27;No&#x27;
    WHEN events_persisted.is_core = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsCore,
    events_persisted.compressed_payload_size AS CompressedPayloadSize,
    events_persisted.payload AS JSONPayload
    FROM
    events_persisted
    LEFT JOIN producers ON events_persisted.producer_id = producers.producer_id
    LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
    LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
    LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
    WHERE
    TagName = &#x27;Inking Typing and Speech Utterance&#x27;
    ORDER BY
    events_persisted.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows EventTranscript.db Inking Typing and Speech Utterance&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows EventTranscript.db_ProductandServicePerformance
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;categories&#x27; OR name=&#x27;event_categories&#x27; OR name=&#x27;event_tags&#x27; OR name=&#x27;events_persisted&#x27; OR name=&#x27;producers&#x27; OR name=&#x27;provider_groups&#x27; OR name=&#x27;tag_descriptions&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 7
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    CASE

    WHEN
    events_persisted.sid = &#x27;S-1-0&#x27; THEN
    &#x27;S-1-0 (Null Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-0-0&#x27; THEN
    &#x27;S-1-0-0 (Nobody)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1&#x27; THEN
    &#x27;S-1-1 (World Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1-0&#x27; THEN
    &#x27;S-1-1-0 (Everyone)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-0&#x27; THEN
    &#x27;S-1-16-0 (Untrusted Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-12288&#x27; THEN
    &#x27;S-1-16-12288 (High Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-16384&#x27; THEN
    &#x27;S-1-16-16384 (System Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-20480&#x27; THEN
    &#x27;S-1-16-20480 (Protected Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-28672&#x27; THEN
    &#x27;S-1-16-28672 (Secure Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-4096&#x27; THEN
    &#x27;S-1-16-4096 (Low Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8192&#x27; THEN
    &#x27;S-1-16-8192 (Medium Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8448&#x27; THEN
    &#x27;S-1-16-8448 (Medium Plus Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2&#x27; THEN
    &#x27;S-1-2 (Local Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-0&#x27; THEN
    &#x27;S-1-2-0 (Local)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-1&#x27; THEN
    &#x27;S-1-2-1 (Console Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3&#x27; THEN
    &#x27;S-1-3 (Creator Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-0&#x27; THEN
    &#x27;S-1-3-0 (Creator Owner)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-1&#x27; THEN
    &#x27;S-1-3-1 (Creator Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-2&#x27; THEN
    &#x27;S-1-3-2 (Creator Owner Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-3&#x27; THEN
    &#x27;S-1-3-3 (Creator Group Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-4&#x27; THEN
    &#x27;S-1-3-4 (Owner Rights)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-4&#x27; THEN
    &#x27;S-1-4 (Non-unique Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5&#x27; THEN
    &#x27;S-1-5 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-1&#x27; THEN
    &#x27;S-1-5-1 (Dialup)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-10&#x27; THEN
    &#x27;S-1-5-10 (Principal Self)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-11&#x27; THEN
    &#x27;S-1-5-11 (Authenticated Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-12&#x27; THEN
    &#x27;S-1-5-12 (Restricted Code)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-13&#x27; THEN
    &#x27;S-1-5-13 (Terminal Server Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-14&#x27; THEN
    &#x27;S-1-5-14 (Remote Interactive Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-15&#x27; THEN
    &#x27;S-1-5-15 (This Organization)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-17&#x27; THEN
    &#x27;S-1-5-17 (IUSR)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-18&#x27; THEN
    &#x27;S-1-5-18 (Local System)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-19&#x27; THEN
    &#x27;S-1-5-19 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-2&#x27; THEN
    &#x27;S-1-5-2 (Network)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-20&#x27; THEN
    &#x27;S-1-5-20 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-498&#x27; THEN
    &#x27;S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-521&#x27; THEN
    &#x27;S-1-5-21domain-521 (Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-571&#x27; THEN
    &#x27;S-1-5-21domain-571 (Allowed RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-572&#x27; THEN
    &#x27;S-1-5-21domain-572 (Denied RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-500&#x27; THEN
    &#x27;S-1-5-21domain-500 (Administrator)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-501&#x27; THEN
    &#x27;S-1-5-21domain-501 (Guest)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-502&#x27; THEN
    &#x27;S-1-5-21domain-502 (KRBTGT)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-512&#x27; THEN
    &#x27;S-1-5-21domain-512 (Domain Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-513&#x27; THEN
    &#x27;S-1-5-21domain-513 (Domain Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-514&#x27; THEN
    &#x27;S-1-5-21domain-514 (Domain Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-515&#x27; THEN
    &#x27;S-1-5-21domain-515 (Domain Computers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-516&#x27; THEN
    &#x27;S-1-5-21domain-516 (Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-517&#x27; THEN
    &#x27;S-1-5-21domain-517 (Cert Publishers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-520&#x27; THEN
    &#x27;S-1-5-21domain-520 (Group Policy Creator Owners)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21-domain-522&#x27; THEN
    &#x27;S-1-5-21-domain-522 (Cloneable Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-526&#x27; THEN
    &#x27;S-1-5-21domain-526 (Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-527&#x27; THEN
    &#x27;S-1-5-21domain-527 (Enterprise Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-553&#x27; THEN
    &#x27;S-1-5-21domain-553 (RAS and IAS Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-518&#x27; THEN
    &#x27;S-1-5-21root domain-518 (Schema Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-519&#x27; THEN
    &#x27;S-1-5-21root domain-519 (Enterprise Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-3&#x27; THEN
    &#x27;S-1-5-3 (Batch)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-544&#x27; THEN
    &#x27;S-1-5-32-544 (Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-545&#x27; THEN
    &#x27;S-1-5-32-545 (Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-546&#x27; THEN
    &#x27;S-1-5-32-546 (Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-547&#x27; THEN
    &#x27;S-1-5-32-547 (Power Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-548&#x27; THEN
    &#x27;S-1-5-32-548 (Account Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-549&#x27; THEN
    &#x27;S-1-5-32-549 (Server Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-550&#x27; THEN
    &#x27;S-1-5-32-550 (Print Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-551&#x27; THEN
    &#x27;S-1-5-32-551 (Backup Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-552&#x27; THEN
    &#x27;S-1-5-32-552 (Replicators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-554&#x27; THEN
    &#x27;S-1-5-32-554 (Builtin\Pre-Windows 2000 Compatible Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-555&#x27; THEN
    &#x27;S-1-5-32-555 (Builtin\Remote Desktop Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-556&#x27; THEN
    &#x27;S-1-5-32-556 (Builtin\Network Configuration Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-557&#x27; THEN
    &#x27;S-1-5-32-557 (Builtin\Incoming Forest Trust Builders)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-558&#x27; THEN
    &#x27;S-1-5-32-558 (Builtin\Performance Monitor Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-559&#x27; THEN
    &#x27;S-1-5-32-559 (Builtin\Performance Log Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-560&#x27; THEN
    &#x27;S-1-5-32-560 (Builtin\Windows Authorization Access Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-561&#x27; THEN
    &#x27;S-1-5-32-561 (Builtin\Terminal Server License Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-562&#x27; THEN
    &#x27;S-1-5-32-562 (Builtin\Distributed COM Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-569&#x27; THEN
    &#x27;S-1-5-32-569 (Builtin\Cryptographic Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-573&#x27; THEN
    &#x27;S-1-5-32-573 (Builtin\Event Log Readers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-574&#x27; THEN
    &#x27;S-1-5-32-574 (Builtin\Certificate Service DCOM Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-575&#x27; THEN
    &#x27;S-1-5-32-575 (Builtin\RDS Remote Access Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-576&#x27; THEN
    &#x27;S-1-5-32-576 (Builtin\RDS Endpoint Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-577&#x27; THEN
    &#x27;S-1-5-32-577 (Builtin\RDS Management Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-578&#x27; THEN
    &#x27;S-1-5-32-578 (Builtin\Hyper-V Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-579&#x27; THEN
    &#x27;S-1-5-32-579 (Builtin\Access Control Assistance Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-580&#x27; THEN
    &#x27;S-1-5-32-580 (Builtin\Remote Management Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-582&#x27; THEN
    &#x27;S-1-5-32-582 (Storage Replica Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-4&#x27; THEN
    &#x27;S-1-5-4 (Interactive)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-5-X-Y&#x27; THEN
    &#x27;S-1-5-5-X-Y (Logon Session)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-6&#x27; THEN
    &#x27;S-1-5-6 (Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-10&#x27; THEN
    &#x27;S-1-5-64-10 (NTLM Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-14&#x27; THEN
    &#x27;S-1-5-64-14 (SChannelAuthentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-21&#x27; THEN
    &#x27;S-1-5-64-21 (Digest Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-7&#x27; THEN
    &#x27;S-1-5-7 (Anonymous)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-8&#x27; THEN
    &#x27;S-1-5-8 (Proxy)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80&#x27; THEN
    &#x27;S-1-5-80 (NT Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (NT Services\All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-83-0&#x27; THEN
    &#x27;S-1-5-83-0 (NT Virtual Machine\Virtual Machines)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-9&#x27; THEN
    &#x27;S-1-5-9 (Enterprise Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-90-0&#x27; THEN
    &#x27;S-1-5-90-0 (Windows Manager\Windows Manager Group)&#x27; ELSE events_persisted.sid
    END AS UserSID,
    datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS Timestamp,
    tag_descriptions.locale_name AS LocaleName,
    producers.producer_id_text AS ProducerIDText,
    tag_descriptions.tag_name AS TagName,
    events_persisted.full_event_name AS FullEventName,
    events_persisted.logging_binary_name AS LoggingBinaryName,
    events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
    events_persisted.full_event_name_hash AS FullEventNameHash,
    events_persisted.event_keywords AS Keywords,
    provider_groups.group_guid AS GroupGUID,
    CASE

    WHEN events_persisted.is_core = 0 THEN
    &#x27;No&#x27;
    WHEN events_persisted.is_core = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsCore,
    events_persisted.compressed_payload_size AS CompressedPayloadSize,
    events_persisted.payload AS JSONPayload
    FROM
    events_persisted
    LEFT JOIN producers ON events_persisted.producer_id = producers.producer_id
    LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
    LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
    LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
    WHERE
    TagName = &#x27;Product and Service Performance&#x27;
    ORDER BY
    events_persisted.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows EventTranscript.db_ProductandServicePerformance&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows EventTranscript.db Product and Service Usage
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;categories&#x27; OR name=&#x27;event_categories&#x27; OR name=&#x27;event_tags&#x27; OR name=&#x27;events_persisted&#x27; OR name=&#x27;producers&#x27; OR name=&#x27;provider_groups&#x27; OR name=&#x27;tag_descriptions&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 7
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    CASE

    WHEN
    events_persisted.sid = &#x27;S-1-0&#x27; THEN
    &#x27;S-1-0 (Null Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-0-0&#x27; THEN
    &#x27;S-1-0-0 (Nobody)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1&#x27; THEN
    &#x27;S-1-1 (World Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1-0&#x27; THEN
    &#x27;S-1-1-0 (Everyone)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-0&#x27; THEN
    &#x27;S-1-16-0 (Untrusted Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-12288&#x27; THEN
    &#x27;S-1-16-12288 (High Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-16384&#x27; THEN
    &#x27;S-1-16-16384 (System Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-20480&#x27; THEN
    &#x27;S-1-16-20480 (Protected Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-28672&#x27; THEN
    &#x27;S-1-16-28672 (Secure Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-4096&#x27; THEN
    &#x27;S-1-16-4096 (Low Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8192&#x27; THEN
    &#x27;S-1-16-8192 (Medium Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8448&#x27; THEN
    &#x27;S-1-16-8448 (Medium Plus Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2&#x27; THEN
    &#x27;S-1-2 (Local Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-0&#x27; THEN
    &#x27;S-1-2-0 (Local)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-1&#x27; THEN
    &#x27;S-1-2-1 (Console Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3&#x27; THEN
    &#x27;S-1-3 (Creator Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-0&#x27; THEN
    &#x27;S-1-3-0 (Creator Owner)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-1&#x27; THEN
    &#x27;S-1-3-1 (Creator Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-2&#x27; THEN
    &#x27;S-1-3-2 (Creator Owner Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-3&#x27; THEN
    &#x27;S-1-3-3 (Creator Group Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-4&#x27; THEN
    &#x27;S-1-3-4 (Owner Rights)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-4&#x27; THEN
    &#x27;S-1-4 (Non-unique Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5&#x27; THEN
    &#x27;S-1-5 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-1&#x27; THEN
    &#x27;S-1-5-1 (Dialup)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-10&#x27; THEN
    &#x27;S-1-5-10 (Principal Self)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-11&#x27; THEN
    &#x27;S-1-5-11 (Authenticated Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-12&#x27; THEN
    &#x27;S-1-5-12 (Restricted Code)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-13&#x27; THEN
    &#x27;S-1-5-13 (Terminal Server Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-14&#x27; THEN
    &#x27;S-1-5-14 (Remote Interactive Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-15&#x27; THEN
    &#x27;S-1-5-15 (This Organization)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-17&#x27; THEN
    &#x27;S-1-5-17 (IUSR)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-18&#x27; THEN
    &#x27;S-1-5-18 (Local System)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-19&#x27; THEN
    &#x27;S-1-5-19 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-2&#x27; THEN
    &#x27;S-1-5-2 (Network)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-20&#x27; THEN
    &#x27;S-1-5-20 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-498&#x27; THEN
    &#x27;S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-521&#x27; THEN
    &#x27;S-1-5-21domain-521 (Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-571&#x27; THEN
    &#x27;S-1-5-21domain-571 (Allowed RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-572&#x27; THEN
    &#x27;S-1-5-21domain-572 (Denied RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-500&#x27; THEN
    &#x27;S-1-5-21domain-500 (Administrator)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-501&#x27; THEN
    &#x27;S-1-5-21domain-501 (Guest)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-502&#x27; THEN
    &#x27;S-1-5-21domain-502 (KRBTGT)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-512&#x27; THEN
    &#x27;S-1-5-21domain-512 (Domain Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-513&#x27; THEN
    &#x27;S-1-5-21domain-513 (Domain Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-514&#x27; THEN
    &#x27;S-1-5-21domain-514 (Domain Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-515&#x27; THEN
    &#x27;S-1-5-21domain-515 (Domain Computers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-516&#x27; THEN
    &#x27;S-1-5-21domain-516 (Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-517&#x27; THEN
    &#x27;S-1-5-21domain-517 (Cert Publishers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-520&#x27; THEN
    &#x27;S-1-5-21domain-520 (Group Policy Creator Owners)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21-domain-522&#x27; THEN
    &#x27;S-1-5-21-domain-522 (Cloneable Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-526&#x27; THEN
    &#x27;S-1-5-21domain-526 (Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-527&#x27; THEN
    &#x27;S-1-5-21domain-527 (Enterprise Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-553&#x27; THEN
    &#x27;S-1-5-21domain-553 (RAS and IAS Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-518&#x27; THEN
    &#x27;S-1-5-21root domain-518 (Schema Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-519&#x27; THEN
    &#x27;S-1-5-21root domain-519 (Enterprise Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-3&#x27; THEN
    &#x27;S-1-5-3 (Batch)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-544&#x27; THEN
    &#x27;S-1-5-32-544 (Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-545&#x27; THEN
    &#x27;S-1-5-32-545 (Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-546&#x27; THEN
    &#x27;S-1-5-32-546 (Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-547&#x27; THEN
    &#x27;S-1-5-32-547 (Power Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-548&#x27; THEN
    &#x27;S-1-5-32-548 (Account Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-549&#x27; THEN
    &#x27;S-1-5-32-549 (Server Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-550&#x27; THEN
    &#x27;S-1-5-32-550 (Print Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-551&#x27; THEN
    &#x27;S-1-5-32-551 (Backup Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-552&#x27; THEN
    &#x27;S-1-5-32-552 (Replicators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-554&#x27; THEN
    &#x27;S-1-5-32-554 (Builtin\Pre-Windows 2000 Compatible Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-555&#x27; THEN
    &#x27;S-1-5-32-555 (Builtin\Remote Desktop Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-556&#x27; THEN
    &#x27;S-1-5-32-556 (Builtin\Network Configuration Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-557&#x27; THEN
    &#x27;S-1-5-32-557 (Builtin\Incoming Forest Trust Builders)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-558&#x27; THEN
    &#x27;S-1-5-32-558 (Builtin\Performance Monitor Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-559&#x27; THEN
    &#x27;S-1-5-32-559 (Builtin\Performance Log Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-560&#x27; THEN
    &#x27;S-1-5-32-560 (Builtin\Windows Authorization Access Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-561&#x27; THEN
    &#x27;S-1-5-32-561 (Builtin\Terminal Server License Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-562&#x27; THEN
    &#x27;S-1-5-32-562 (Builtin\Distributed COM Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-569&#x27; THEN
    &#x27;S-1-5-32-569 (Builtin\Cryptographic Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-573&#x27; THEN
    &#x27;S-1-5-32-573 (Builtin\Event Log Readers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-574&#x27; THEN
    &#x27;S-1-5-32-574 (Builtin\Certificate Service DCOM Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-575&#x27; THEN
    &#x27;S-1-5-32-575 (Builtin\RDS Remote Access Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-576&#x27; THEN
    &#x27;S-1-5-32-576 (Builtin\RDS Endpoint Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-577&#x27; THEN
    &#x27;S-1-5-32-577 (Builtin\RDS Management Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-578&#x27; THEN
    &#x27;S-1-5-32-578 (Builtin\Hyper-V Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-579&#x27; THEN
    &#x27;S-1-5-32-579 (Builtin\Access Control Assistance Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-580&#x27; THEN
    &#x27;S-1-5-32-580 (Builtin\Remote Management Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-582&#x27; THEN
    &#x27;S-1-5-32-582 (Storage Replica Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-4&#x27; THEN
    &#x27;S-1-5-4 (Interactive)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-5-X-Y&#x27; THEN
    &#x27;S-1-5-5-X-Y (Logon Session)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-6&#x27; THEN
    &#x27;S-1-5-6 (Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-10&#x27; THEN
    &#x27;S-1-5-64-10 (NTLM Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-14&#x27; THEN
    &#x27;S-1-5-64-14 (SChannelAuthentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-21&#x27; THEN
    &#x27;S-1-5-64-21 (Digest Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-7&#x27; THEN
    &#x27;S-1-5-7 (Anonymous)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-8&#x27; THEN
    &#x27;S-1-5-8 (Proxy)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80&#x27; THEN
    &#x27;S-1-5-80 (NT Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (NT Services\All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-83-0&#x27; THEN
    &#x27;S-1-5-83-0 (NT Virtual Machine\Virtual Machines)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-9&#x27; THEN
    &#x27;S-1-5-9 (Enterprise Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-90-0&#x27; THEN
    &#x27;S-1-5-90-0 (Windows Manager\Windows Manager Group)&#x27; ELSE events_persisted.sid
    END AS UserSID,
    datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS Timestamp,
    tag_descriptions.locale_name AS LocaleName,
    producers.producer_id_text AS ProducerIDText,
    tag_descriptions.tag_name AS TagName,
    events_persisted.full_event_name AS FullEventName,
    events_persisted.logging_binary_name AS LoggingBinaryName,
    events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
    events_persisted.full_event_name_hash AS FullEventNameHash,
    events_persisted.event_keywords AS Keywords,
    provider_groups.group_guid AS GroupGUID,
    CASE

    WHEN events_persisted.is_core = 0 THEN
    &#x27;No&#x27;
    WHEN events_persisted.is_core = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsCore,
    events_persisted.compressed_payload_size AS CompressedPayloadSize,
    events_persisted.payload AS JSONPayload
    FROM
    events_persisted
    LEFT JOIN producers ON events_persisted.producer_id = producers.producer_id
    LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
    LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
    LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
    WHERE
    TagName = &#x27;Product and Service Usage&#x27;
    ORDER BY
    events_persisted.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows EventTranscript.db Product and Service Usage&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows EventTranscript.db Software Setup and Inventory
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;categories&#x27; OR name=&#x27;event_categories&#x27; OR name=&#x27;event_tags&#x27; OR name=&#x27;events_persisted&#x27; OR name=&#x27;producers&#x27; OR name=&#x27;provider_groups&#x27; OR name=&#x27;tag_descriptions&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 7
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    CASE

    WHEN
    events_persisted.sid = &#x27;S-1-0&#x27; THEN
    &#x27;S-1-0 (Null Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-0-0&#x27; THEN
    &#x27;S-1-0-0 (Nobody)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1&#x27; THEN
    &#x27;S-1-1 (World Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1-0&#x27; THEN
    &#x27;S-1-1-0 (Everyone)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-0&#x27; THEN
    &#x27;S-1-16-0 (Untrusted Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-12288&#x27; THEN
    &#x27;S-1-16-12288 (High Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-16384&#x27; THEN
    &#x27;S-1-16-16384 (System Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-20480&#x27; THEN
    &#x27;S-1-16-20480 (Protected Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-28672&#x27; THEN
    &#x27;S-1-16-28672 (Secure Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-4096&#x27; THEN
    &#x27;S-1-16-4096 (Low Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8192&#x27; THEN
    &#x27;S-1-16-8192 (Medium Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8448&#x27; THEN
    &#x27;S-1-16-8448 (Medium Plus Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2&#x27; THEN
    &#x27;S-1-2 (Local Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-0&#x27; THEN
    &#x27;S-1-2-0 (Local)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-1&#x27; THEN
    &#x27;S-1-2-1 (Console Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3&#x27; THEN
    &#x27;S-1-3 (Creator Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-0&#x27; THEN
    &#x27;S-1-3-0 (Creator Owner)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-1&#x27; THEN
    &#x27;S-1-3-1 (Creator Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-2&#x27; THEN
    &#x27;S-1-3-2 (Creator Owner Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-3&#x27; THEN
    &#x27;S-1-3-3 (Creator Group Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-4&#x27; THEN
    &#x27;S-1-3-4 (Owner Rights)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-4&#x27; THEN
    &#x27;S-1-4 (Non-unique Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5&#x27; THEN
    &#x27;S-1-5 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-1&#x27; THEN
    &#x27;S-1-5-1 (Dialup)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-10&#x27; THEN
    &#x27;S-1-5-10 (Principal Self)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-11&#x27; THEN
    &#x27;S-1-5-11 (Authenticated Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-12&#x27; THEN
    &#x27;S-1-5-12 (Restricted Code)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-13&#x27; THEN
    &#x27;S-1-5-13 (Terminal Server Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-14&#x27; THEN
    &#x27;S-1-5-14 (Remote Interactive Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-15&#x27; THEN
    &#x27;S-1-5-15 (This Organization)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-17&#x27; THEN
    &#x27;S-1-5-17 (IUSR)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-18&#x27; THEN
    &#x27;S-1-5-18 (Local System)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-19&#x27; THEN
    &#x27;S-1-5-19 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-2&#x27; THEN
    &#x27;S-1-5-2 (Network)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-20&#x27; THEN
    &#x27;S-1-5-20 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-498&#x27; THEN
    &#x27;S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-521&#x27; THEN
    &#x27;S-1-5-21domain-521 (Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-571&#x27; THEN
    &#x27;S-1-5-21domain-571 (Allowed RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-572&#x27; THEN
    &#x27;S-1-5-21domain-572 (Denied RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-500&#x27; THEN
    &#x27;S-1-5-21domain-500 (Administrator)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-501&#x27; THEN
    &#x27;S-1-5-21domain-501 (Guest)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-502&#x27; THEN
    &#x27;S-1-5-21domain-502 (KRBTGT)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-512&#x27; THEN
    &#x27;S-1-5-21domain-512 (Domain Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-513&#x27; THEN
    &#x27;S-1-5-21domain-513 (Domain Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-514&#x27; THEN
    &#x27;S-1-5-21domain-514 (Domain Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-515&#x27; THEN
    &#x27;S-1-5-21domain-515 (Domain Computers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-516&#x27; THEN
    &#x27;S-1-5-21domain-516 (Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-517&#x27; THEN
    &#x27;S-1-5-21domain-517 (Cert Publishers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-520&#x27; THEN
    &#x27;S-1-5-21domain-520 (Group Policy Creator Owners)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21-domain-522&#x27; THEN
    &#x27;S-1-5-21-domain-522 (Cloneable Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-526&#x27; THEN
    &#x27;S-1-5-21domain-526 (Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-527&#x27; THEN
    &#x27;S-1-5-21domain-527 (Enterprise Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-553&#x27; THEN
    &#x27;S-1-5-21domain-553 (RAS and IAS Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-518&#x27; THEN
    &#x27;S-1-5-21root domain-518 (Schema Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-519&#x27; THEN
    &#x27;S-1-5-21root domain-519 (Enterprise Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-3&#x27; THEN
    &#x27;S-1-5-3 (Batch)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-544&#x27; THEN
    &#x27;S-1-5-32-544 (Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-545&#x27; THEN
    &#x27;S-1-5-32-545 (Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-546&#x27; THEN
    &#x27;S-1-5-32-546 (Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-547&#x27; THEN
    &#x27;S-1-5-32-547 (Power Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-548&#x27; THEN
    &#x27;S-1-5-32-548 (Account Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-549&#x27; THEN
    &#x27;S-1-5-32-549 (Server Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-550&#x27; THEN
    &#x27;S-1-5-32-550 (Print Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-551&#x27; THEN
    &#x27;S-1-5-32-551 (Backup Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-552&#x27; THEN
    &#x27;S-1-5-32-552 (Replicators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-554&#x27; THEN
    &#x27;S-1-5-32-554 (Builtin\Pre-Windows 2000 Compatible Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-555&#x27; THEN
    &#x27;S-1-5-32-555 (Builtin\Remote Desktop Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-556&#x27; THEN
    &#x27;S-1-5-32-556 (Builtin\Network Configuration Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-557&#x27; THEN
    &#x27;S-1-5-32-557 (Builtin\Incoming Forest Trust Builders)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-558&#x27; THEN
    &#x27;S-1-5-32-558 (Builtin\Performance Monitor Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-559&#x27; THEN
    &#x27;S-1-5-32-559 (Builtin\Performance Log Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-560&#x27; THEN
    &#x27;S-1-5-32-560 (Builtin\Windows Authorization Access Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-561&#x27; THEN
    &#x27;S-1-5-32-561 (Builtin\Terminal Server License Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-562&#x27; THEN
    &#x27;S-1-5-32-562 (Builtin\Distributed COM Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-569&#x27; THEN
    &#x27;S-1-5-32-569 (Builtin\Cryptographic Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-573&#x27; THEN
    &#x27;S-1-5-32-573 (Builtin\Event Log Readers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-574&#x27; THEN
    &#x27;S-1-5-32-574 (Builtin\Certificate Service DCOM Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-575&#x27; THEN
    &#x27;S-1-5-32-575 (Builtin\RDS Remote Access Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-576&#x27; THEN
    &#x27;S-1-5-32-576 (Builtin\RDS Endpoint Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-577&#x27; THEN
    &#x27;S-1-5-32-577 (Builtin\RDS Management Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-578&#x27; THEN
    &#x27;S-1-5-32-578 (Builtin\Hyper-V Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-579&#x27; THEN
    &#x27;S-1-5-32-579 (Builtin\Access Control Assistance Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-580&#x27; THEN
    &#x27;S-1-5-32-580 (Builtin\Remote Management Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-582&#x27; THEN
    &#x27;S-1-5-32-582 (Storage Replica Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-4&#x27; THEN
    &#x27;S-1-5-4 (Interactive)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-5-X-Y&#x27; THEN
    &#x27;S-1-5-5-X-Y (Logon Session)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-6&#x27; THEN
    &#x27;S-1-5-6 (Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-10&#x27; THEN
    &#x27;S-1-5-64-10 (NTLM Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-14&#x27; THEN
    &#x27;S-1-5-64-14 (SChannelAuthentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-21&#x27; THEN
    &#x27;S-1-5-64-21 (Digest Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-7&#x27; THEN
    &#x27;S-1-5-7 (Anonymous)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-8&#x27; THEN
    &#x27;S-1-5-8 (Proxy)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80&#x27; THEN
    &#x27;S-1-5-80 (NT Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (NT Services\All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-83-0&#x27; THEN
    &#x27;S-1-5-83-0 (NT Virtual Machine\Virtual Machines)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-9&#x27; THEN
    &#x27;S-1-5-9 (Enterprise Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-90-0&#x27; THEN
    &#x27;S-1-5-90-0 (Windows Manager\Windows Manager Group)&#x27; ELSE events_persisted.sid
    END AS UserSID,
    datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS Timestamp,
    tag_descriptions.locale_name AS LocaleName,
    producers.producer_id_text AS ProducerIDText,
    tag_descriptions.tag_name AS TagName,
    events_persisted.full_event_name AS FullEventName,
    events_persisted.logging_binary_name AS LoggingBinaryName,
    events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
    events_persisted.full_event_name_hash AS FullEventNameHash,
    events_persisted.event_keywords AS Keywords,
    provider_groups.group_guid AS GroupGUID,
    CASE

    WHEN events_persisted.is_core = 0 THEN
    &#x27;No&#x27;
    WHEN events_persisted.is_core = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsCore,
    events_persisted.compressed_payload_size AS CompressedPayloadSize,
    events_persisted.payload AS JSONPayload
    FROM
    events_persisted
    LEFT JOIN producers ON events_persisted.producer_id = producers.producer_id
    LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
    LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
    LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
    WHERE
    TagName = &#x27;Software Setup and Inventory&#x27;
    ORDER BY
    events_persisted.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows EventTranscript.db Software Setup and Inventory&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows EventTranscript.db BrowsingHistory
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;categories&#x27; OR name=&#x27;event_categories&#x27; OR name=&#x27;event_tags&#x27; OR name=&#x27;events_persisted&#x27; OR name=&#x27;producers&#x27; OR name=&#x27;provider_groups&#x27; OR name=&#x27;tag_descriptions&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 4
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    CASE

    WHEN
    events_persisted.sid = &#x27;S-1-0&#x27; THEN
    &#x27;S-1-0 (Null Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-0-0&#x27; THEN
    &#x27;S-1-0-0 (Nobody)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1&#x27; THEN
    &#x27;S-1-1 (World Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1-0&#x27; THEN
    &#x27;S-1-1-0 (Everyone)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-0&#x27; THEN
    &#x27;S-1-16-0 (Untrusted Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-12288&#x27; THEN
    &#x27;S-1-16-12288 (High Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-16384&#x27; THEN
    &#x27;S-1-16-16384 (System Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-20480&#x27; THEN
    &#x27;S-1-16-20480 (Protected Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-28672&#x27; THEN
    &#x27;S-1-16-28672 (Secure Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-4096&#x27; THEN
    &#x27;S-1-16-4096 (Low Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8192&#x27; THEN
    &#x27;S-1-16-8192 (Medium Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8448&#x27; THEN
    &#x27;S-1-16-8448 (Medium Plus Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2&#x27; THEN
    &#x27;S-1-2 (Local Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-0&#x27; THEN
    &#x27;S-1-2-0 (Local)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-1&#x27; THEN
    &#x27;S-1-2-1 (Console Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3&#x27; THEN
    &#x27;S-1-3 (Creator Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-0&#x27; THEN
    &#x27;S-1-3-0 (Creator Owner)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-1&#x27; THEN
    &#x27;S-1-3-1 (Creator Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-2&#x27; THEN
    &#x27;S-1-3-2 (Creator Owner Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-3&#x27; THEN
    &#x27;S-1-3-3 (Creator Group Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-4&#x27; THEN
    &#x27;S-1-3-4 (Owner Rights)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-4&#x27; THEN
    &#x27;S-1-4 (Non-unique Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5&#x27; THEN
    &#x27;S-1-5 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-1&#x27; THEN
    &#x27;S-1-5-1 (Dialup)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-10&#x27; THEN
    &#x27;S-1-5-10 (Principal Self)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-11&#x27; THEN
    &#x27;S-1-5-11 (Authenticated Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-12&#x27; THEN
    &#x27;S-1-5-12 (Restricted Code)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-13&#x27; THEN
    &#x27;S-1-5-13 (Terminal Server Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-14&#x27; THEN
    &#x27;S-1-5-14 (Remote Interactive Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-15&#x27; THEN
    &#x27;S-1-5-15 (This Organization)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-17&#x27; THEN
    &#x27;S-1-5-17 (IUSR)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-18&#x27; THEN
    &#x27;S-1-5-18 (Local System)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-19&#x27; THEN
    &#x27;S-1-5-19 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-2&#x27; THEN
    &#x27;S-1-5-2 (Network)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-20&#x27; THEN
    &#x27;S-1-5-20 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-498&#x27; THEN
    &#x27;S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-521&#x27; THEN
    &#x27;S-1-5-21domain-521 (Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-571&#x27; THEN
    &#x27;S-1-5-21domain-571 (Allowed RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-572&#x27; THEN
    &#x27;S-1-5-21domain-572 (Denied RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-500&#x27; THEN
    &#x27;S-1-5-21domain-500 (Administrator)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-501&#x27; THEN
    &#x27;S-1-5-21domain-501 (Guest)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-502&#x27; THEN
    &#x27;S-1-5-21domain-502 (KRBTGT)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-512&#x27; THEN
    &#x27;S-1-5-21domain-512 (Domain Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-513&#x27; THEN
    &#x27;S-1-5-21domain-513 (Domain Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-514&#x27; THEN
    &#x27;S-1-5-21domain-514 (Domain Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-515&#x27; THEN
    &#x27;S-1-5-21domain-515 (Domain Computers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-516&#x27; THEN
    &#x27;S-1-5-21domain-516 (Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-517&#x27; THEN
    &#x27;S-1-5-21domain-517 (Cert Publishers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-520&#x27; THEN
    &#x27;S-1-5-21domain-520 (Group Policy Creator Owners)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21-domain-522&#x27; THEN
    &#x27;S-1-5-21-domain-522 (Cloneable Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-526&#x27; THEN
    &#x27;S-1-5-21domain-526 (Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-527&#x27; THEN
    &#x27;S-1-5-21domain-527 (Enterprise Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-553&#x27; THEN
    &#x27;S-1-5-21domain-553 (RAS and IAS Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-518&#x27; THEN
    &#x27;S-1-5-21root domain-518 (Schema Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-519&#x27; THEN
    &#x27;S-1-5-21root domain-519 (Enterprise Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-3&#x27; THEN
    &#x27;S-1-5-3 (Batch)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-544&#x27; THEN
    &#x27;S-1-5-32-544 (Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-545&#x27; THEN
    &#x27;S-1-5-32-545 (Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-546&#x27; THEN
    &#x27;S-1-5-32-546 (Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-547&#x27; THEN
    &#x27;S-1-5-32-547 (Power Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-548&#x27; THEN
    &#x27;S-1-5-32-548 (Account Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-549&#x27; THEN
    &#x27;S-1-5-32-549 (Server Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-550&#x27; THEN
    &#x27;S-1-5-32-550 (Print Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-551&#x27; THEN
    &#x27;S-1-5-32-551 (Backup Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-552&#x27; THEN
    &#x27;S-1-5-32-552 (Replicators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-554&#x27; THEN
    &#x27;S-1-5-32-554 (Builtin\Pre-Windows 2000 Compatible Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-555&#x27; THEN
    &#x27;S-1-5-32-555 (Builtin\Remote Desktop Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-556&#x27; THEN
    &#x27;S-1-5-32-556 (Builtin\Network Configuration Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-557&#x27; THEN
    &#x27;S-1-5-32-557 (Builtin\Incoming Forest Trust Builders)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-558&#x27; THEN
    &#x27;S-1-5-32-558 (Builtin\Performance Monitor Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-559&#x27; THEN
    &#x27;S-1-5-32-559 (Builtin\Performance Log Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-560&#x27; THEN
    &#x27;S-1-5-32-560 (Builtin\Windows Authorization Access Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-561&#x27; THEN
    &#x27;S-1-5-32-561 (Builtin\Terminal Server License Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-562&#x27; THEN
    &#x27;S-1-5-32-562 (Builtin\Distributed COM Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-569&#x27; THEN
    &#x27;S-1-5-32-569 (Builtin\Cryptographic Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-573&#x27; THEN
    &#x27;S-1-5-32-573 (Builtin\Event Log Readers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-574&#x27; THEN
    &#x27;S-1-5-32-574 (Builtin\Certificate Service DCOM Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-575&#x27; THEN
    &#x27;S-1-5-32-575 (Builtin\RDS Remote Access Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-576&#x27; THEN
    &#x27;S-1-5-32-576 (Builtin\RDS Endpoint Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-577&#x27; THEN
    &#x27;S-1-5-32-577 (Builtin\RDS Management Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-578&#x27; THEN
    &#x27;S-1-5-32-578 (Builtin\Hyper-V Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-579&#x27; THEN
    &#x27;S-1-5-32-579 (Builtin\Access Control Assistance Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-580&#x27; THEN
    &#x27;S-1-5-32-580 (Builtin\Remote Management Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-582&#x27; THEN
    &#x27;S-1-5-32-582 (Storage Replica Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-4&#x27; THEN
    &#x27;S-1-5-4 (Interactive)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-5-X-Y&#x27; THEN
    &#x27;S-1-5-5-X-Y (Logon Session)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-6&#x27; THEN
    &#x27;S-1-5-6 (Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-10&#x27; THEN
    &#x27;S-1-5-64-10 (NTLM Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-14&#x27; THEN
    &#x27;S-1-5-64-14 (SChannelAuthentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-21&#x27; THEN
    &#x27;S-1-5-64-21 (Digest Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-7&#x27; THEN
    &#x27;S-1-5-7 (Anonymous)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-8&#x27; THEN
    &#x27;S-1-5-8 (Proxy)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80&#x27; THEN
    &#x27;S-1-5-80 (NT Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (NT Services\All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-83-0&#x27; THEN
    &#x27;S-1-5-83-0 (NT Virtual Machine\Virtual Machines)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-9&#x27; THEN
    &#x27;S-1-5-9 (Enterprise Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-90-0&#x27; THEN
    &#x27;S-1-5-90-0 (Windows Manager\Windows Manager Group)&#x27; ELSE events_persisted.sid
    END AS UserSID,
    datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS Timestamp,
    tag_descriptions.locale_name AS LocaleName,
    tag_descriptions.tag_name AS TagName,
    events_persisted.full_event_name AS FullEventName,
    events_persisted.logging_binary_name AS LoggingBinaryName,
    events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
    events_persisted.full_event_name_hash AS FullEventNameHash,
    events_persisted.event_keywords AS Keywords,
    provider_groups.group_guid AS GroupGUID,
    CASE

    WHEN events_persisted.is_core = 0 THEN
    &#x27;No&#x27;
    WHEN events_persisted.is_core = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsCore,
    events_persisted.compressed_payload_size AS CompressedPayloadSize,
    events_persisted.payload AS JSONPayload
    FROM
    events_persisted
    LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
    LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
    LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
    WHERE
    TagName = &#x27;Browsing History&#x27;
    ORDER BY
    events_persisted.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows EventTranscript.db BrowsingHistory&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows EventTranscript.db Device Connectivity and Configuration
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;categories&#x27; OR name=&#x27;event_categories&#x27; OR name=&#x27;event_tags&#x27; OR name=&#x27;events_persisted&#x27; OR name=&#x27;producers&#x27; OR name=&#x27;provider_groups&#x27; OR name=&#x27;tag_descriptions&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 4
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    CASE

    WHEN
    events_persisted.sid = &#x27;S-1-0&#x27; THEN
    &#x27;S-1-0 (Null Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-0-0&#x27; THEN
    &#x27;S-1-0-0 (Nobody)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1&#x27; THEN
    &#x27;S-1-1 (World Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1-0&#x27; THEN
    &#x27;S-1-1-0 (Everyone)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-0&#x27; THEN
    &#x27;S-1-16-0 (Untrusted Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-12288&#x27; THEN
    &#x27;S-1-16-12288 (High Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-16384&#x27; THEN
    &#x27;S-1-16-16384 (System Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-20480&#x27; THEN
    &#x27;S-1-16-20480 (Protected Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-28672&#x27; THEN
    &#x27;S-1-16-28672 (Secure Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-4096&#x27; THEN
    &#x27;S-1-16-4096 (Low Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8192&#x27; THEN
    &#x27;S-1-16-8192 (Medium Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8448&#x27; THEN
    &#x27;S-1-16-8448 (Medium Plus Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2&#x27; THEN
    &#x27;S-1-2 (Local Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-0&#x27; THEN
    &#x27;S-1-2-0 (Local)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-1&#x27; THEN
    &#x27;S-1-2-1 (Console Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3&#x27; THEN
    &#x27;S-1-3 (Creator Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-0&#x27; THEN
    &#x27;S-1-3-0 (Creator Owner)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-1&#x27; THEN
    &#x27;S-1-3-1 (Creator Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-2&#x27; THEN
    &#x27;S-1-3-2 (Creator Owner Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-3&#x27; THEN
    &#x27;S-1-3-3 (Creator Group Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-4&#x27; THEN
    &#x27;S-1-3-4 (Owner Rights)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-4&#x27; THEN
    &#x27;S-1-4 (Non-unique Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5&#x27; THEN
    &#x27;S-1-5 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-1&#x27; THEN
    &#x27;S-1-5-1 (Dialup)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-10&#x27; THEN
    &#x27;S-1-5-10 (Principal Self)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-11&#x27; THEN
    &#x27;S-1-5-11 (Authenticated Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-12&#x27; THEN
    &#x27;S-1-5-12 (Restricted Code)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-13&#x27; THEN
    &#x27;S-1-5-13 (Terminal Server Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-14&#x27; THEN
    &#x27;S-1-5-14 (Remote Interactive Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-15&#x27; THEN
    &#x27;S-1-5-15 (This Organization)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-17&#x27; THEN
    &#x27;S-1-5-17 (IUSR)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-18&#x27; THEN
    &#x27;S-1-5-18 (Local System)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-19&#x27; THEN
    &#x27;S-1-5-19 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-2&#x27; THEN
    &#x27;S-1-5-2 (Network)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-20&#x27; THEN
    &#x27;S-1-5-20 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-498&#x27; THEN
    &#x27;S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-521&#x27; THEN
    &#x27;S-1-5-21domain-521 (Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-571&#x27; THEN
    &#x27;S-1-5-21domain-571 (Allowed RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-572&#x27; THEN
    &#x27;S-1-5-21domain-572 (Denied RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-500&#x27; THEN
    &#x27;S-1-5-21domain-500 (Administrator)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-501&#x27; THEN
    &#x27;S-1-5-21domain-501 (Guest)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-502&#x27; THEN
    &#x27;S-1-5-21domain-502 (KRBTGT)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-512&#x27; THEN
    &#x27;S-1-5-21domain-512 (Domain Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-513&#x27; THEN
    &#x27;S-1-5-21domain-513 (Domain Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-514&#x27; THEN
    &#x27;S-1-5-21domain-514 (Domain Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-515&#x27; THEN
    &#x27;S-1-5-21domain-515 (Domain Computers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-516&#x27; THEN
    &#x27;S-1-5-21domain-516 (Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-517&#x27; THEN
    &#x27;S-1-5-21domain-517 (Cert Publishers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-520&#x27; THEN
    &#x27;S-1-5-21domain-520 (Group Policy Creator Owners)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21-domain-522&#x27; THEN
    &#x27;S-1-5-21-domain-522 (Cloneable Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-526&#x27; THEN
    &#x27;S-1-5-21domain-526 (Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-527&#x27; THEN
    &#x27;S-1-5-21domain-527 (Enterprise Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-553&#x27; THEN
    &#x27;S-1-5-21domain-553 (RAS and IAS Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-518&#x27; THEN
    &#x27;S-1-5-21root domain-518 (Schema Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-519&#x27; THEN
    &#x27;S-1-5-21root domain-519 (Enterprise Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-3&#x27; THEN
    &#x27;S-1-5-3 (Batch)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-544&#x27; THEN
    &#x27;S-1-5-32-544 (Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-545&#x27; THEN
    &#x27;S-1-5-32-545 (Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-546&#x27; THEN
    &#x27;S-1-5-32-546 (Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-547&#x27; THEN
    &#x27;S-1-5-32-547 (Power Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-548&#x27; THEN
    &#x27;S-1-5-32-548 (Account Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-549&#x27; THEN
    &#x27;S-1-5-32-549 (Server Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-550&#x27; THEN
    &#x27;S-1-5-32-550 (Print Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-551&#x27; THEN
    &#x27;S-1-5-32-551 (Backup Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-552&#x27; THEN
    &#x27;S-1-5-32-552 (Replicators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-554&#x27; THEN
    &#x27;S-1-5-32-554 (Builtin\Pre-Windows 2000 Compatible Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-555&#x27; THEN
    &#x27;S-1-5-32-555 (Builtin\Remote Desktop Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-556&#x27; THEN
    &#x27;S-1-5-32-556 (Builtin\Network Configuration Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-557&#x27; THEN
    &#x27;S-1-5-32-557 (Builtin\Incoming Forest Trust Builders)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-558&#x27; THEN
    &#x27;S-1-5-32-558 (Builtin\Performance Monitor Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-559&#x27; THEN
    &#x27;S-1-5-32-559 (Builtin\Performance Log Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-560&#x27; THEN
    &#x27;S-1-5-32-560 (Builtin\Windows Authorization Access Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-561&#x27; THEN
    &#x27;S-1-5-32-561 (Builtin\Terminal Server License Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-562&#x27; THEN
    &#x27;S-1-5-32-562 (Builtin\Distributed COM Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-569&#x27; THEN
    &#x27;S-1-5-32-569 (Builtin\Cryptographic Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-573&#x27; THEN
    &#x27;S-1-5-32-573 (Builtin\Event Log Readers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-574&#x27; THEN
    &#x27;S-1-5-32-574 (Builtin\Certificate Service DCOM Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-575&#x27; THEN
    &#x27;S-1-5-32-575 (Builtin\RDS Remote Access Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-576&#x27; THEN
    &#x27;S-1-5-32-576 (Builtin\RDS Endpoint Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-577&#x27; THEN
    &#x27;S-1-5-32-577 (Builtin\RDS Management Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-578&#x27; THEN
    &#x27;S-1-5-32-578 (Builtin\Hyper-V Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-579&#x27; THEN
    &#x27;S-1-5-32-579 (Builtin\Access Control Assistance Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-580&#x27; THEN
    &#x27;S-1-5-32-580 (Builtin\Remote Management Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-582&#x27; THEN
    &#x27;S-1-5-32-582 (Storage Replica Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-4&#x27; THEN
    &#x27;S-1-5-4 (Interactive)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-5-X-Y&#x27; THEN
    &#x27;S-1-5-5-X-Y (Logon Session)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-6&#x27; THEN
    &#x27;S-1-5-6 (Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-10&#x27; THEN
    &#x27;S-1-5-64-10 (NTLM Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-14&#x27; THEN
    &#x27;S-1-5-64-14 (SChannelAuthentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-21&#x27; THEN
    &#x27;S-1-5-64-21 (Digest Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-7&#x27; THEN
    &#x27;S-1-5-7 (Anonymous)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-8&#x27; THEN
    &#x27;S-1-5-8 (Proxy)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80&#x27; THEN
    &#x27;S-1-5-80 (NT Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (NT Services\All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-83-0&#x27; THEN
    &#x27;S-1-5-83-0 (NT Virtual Machine\Virtual Machines)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-9&#x27; THEN
    &#x27;S-1-5-9 (Enterprise Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-90-0&#x27; THEN
    &#x27;S-1-5-90-0 (Windows Manager\Windows Manager Group)&#x27; ELSE events_persisted.sid
    END AS UserSID,
    datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS Timestamp,
    tag_descriptions.locale_name AS LocaleName,
    tag_descriptions.tag_name AS TagName,
    events_persisted.full_event_name AS FullEventName,
    events_persisted.logging_binary_name AS LoggingBinaryName,
    events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
    events_persisted.full_event_name_hash AS FullEventNameHash,
    events_persisted.event_keywords AS Keywords,
    provider_groups.group_guid AS GroupGUID,
    CASE

    WHEN events_persisted.is_core = 0 THEN
    &#x27;No&#x27;
    WHEN events_persisted.is_core = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsCore,
    events_persisted.compressed_payload_size AS CompressedPayloadSize,
    events_persisted.payload AS JSONPayload
    FROM
    events_persisted
    LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
    LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
    LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
    WHERE
    TagName = &#x27;Device Connectivity and Configuration&#x27;
    ORDER BY
    events_persisted.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows EventTranscript.db Device Connectivity and Configuration&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows EventTranscript.db Inking Typing and Speech Utterance
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;categories&#x27; OR name=&#x27;event_categories&#x27; OR name=&#x27;event_tags&#x27; OR name=&#x27;events_persisted&#x27; OR name=&#x27;producers&#x27; OR name=&#x27;provider_groups&#x27; OR name=&#x27;tag_descriptions&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 4
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    CASE

    WHEN
    events_persisted.sid = &#x27;S-1-0&#x27; THEN
    &#x27;S-1-0 (Null Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-0-0&#x27; THEN
    &#x27;S-1-0-0 (Nobody)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1&#x27; THEN
    &#x27;S-1-1 (World Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1-0&#x27; THEN
    &#x27;S-1-1-0 (Everyone)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-0&#x27; THEN
    &#x27;S-1-16-0 (Untrusted Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-12288&#x27; THEN
    &#x27;S-1-16-12288 (High Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-16384&#x27; THEN
    &#x27;S-1-16-16384 (System Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-20480&#x27; THEN
    &#x27;S-1-16-20480 (Protected Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-28672&#x27; THEN
    &#x27;S-1-16-28672 (Secure Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-4096&#x27; THEN
    &#x27;S-1-16-4096 (Low Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8192&#x27; THEN
    &#x27;S-1-16-8192 (Medium Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8448&#x27; THEN
    &#x27;S-1-16-8448 (Medium Plus Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2&#x27; THEN
    &#x27;S-1-2 (Local Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-0&#x27; THEN
    &#x27;S-1-2-0 (Local)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-1&#x27; THEN
    &#x27;S-1-2-1 (Console Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3&#x27; THEN
    &#x27;S-1-3 (Creator Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-0&#x27; THEN
    &#x27;S-1-3-0 (Creator Owner)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-1&#x27; THEN
    &#x27;S-1-3-1 (Creator Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-2&#x27; THEN
    &#x27;S-1-3-2 (Creator Owner Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-3&#x27; THEN
    &#x27;S-1-3-3 (Creator Group Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-4&#x27; THEN
    &#x27;S-1-3-4 (Owner Rights)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-4&#x27; THEN
    &#x27;S-1-4 (Non-unique Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5&#x27; THEN
    &#x27;S-1-5 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-1&#x27; THEN
    &#x27;S-1-5-1 (Dialup)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-10&#x27; THEN
    &#x27;S-1-5-10 (Principal Self)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-11&#x27; THEN
    &#x27;S-1-5-11 (Authenticated Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-12&#x27; THEN
    &#x27;S-1-5-12 (Restricted Code)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-13&#x27; THEN
    &#x27;S-1-5-13 (Terminal Server Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-14&#x27; THEN
    &#x27;S-1-5-14 (Remote Interactive Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-15&#x27; THEN
    &#x27;S-1-5-15 (This Organization)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-17&#x27; THEN
    &#x27;S-1-5-17 (IUSR)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-18&#x27; THEN
    &#x27;S-1-5-18 (Local System)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-19&#x27; THEN
    &#x27;S-1-5-19 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-2&#x27; THEN
    &#x27;S-1-5-2 (Network)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-20&#x27; THEN
    &#x27;S-1-5-20 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-498&#x27; THEN
    &#x27;S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-521&#x27; THEN
    &#x27;S-1-5-21domain-521 (Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-571&#x27; THEN
    &#x27;S-1-5-21domain-571 (Allowed RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-572&#x27; THEN
    &#x27;S-1-5-21domain-572 (Denied RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-500&#x27; THEN
    &#x27;S-1-5-21domain-500 (Administrator)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-501&#x27; THEN
    &#x27;S-1-5-21domain-501 (Guest)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-502&#x27; THEN
    &#x27;S-1-5-21domain-502 (KRBTGT)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-512&#x27; THEN
    &#x27;S-1-5-21domain-512 (Domain Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-513&#x27; THEN
    &#x27;S-1-5-21domain-513 (Domain Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-514&#x27; THEN
    &#x27;S-1-5-21domain-514 (Domain Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-515&#x27; THEN
    &#x27;S-1-5-21domain-515 (Domain Computers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-516&#x27; THEN
    &#x27;S-1-5-21domain-516 (Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-517&#x27; THEN
    &#x27;S-1-5-21domain-517 (Cert Publishers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-520&#x27; THEN
    &#x27;S-1-5-21domain-520 (Group Policy Creator Owners)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21-domain-522&#x27; THEN
    &#x27;S-1-5-21-domain-522 (Cloneable Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-526&#x27; THEN
    &#x27;S-1-5-21domain-526 (Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-527&#x27; THEN
    &#x27;S-1-5-21domain-527 (Enterprise Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-553&#x27; THEN
    &#x27;S-1-5-21domain-553 (RAS and IAS Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-518&#x27; THEN
    &#x27;S-1-5-21root domain-518 (Schema Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-519&#x27; THEN
    &#x27;S-1-5-21root domain-519 (Enterprise Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-3&#x27; THEN
    &#x27;S-1-5-3 (Batch)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-544&#x27; THEN
    &#x27;S-1-5-32-544 (Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-545&#x27; THEN
    &#x27;S-1-5-32-545 (Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-546&#x27; THEN
    &#x27;S-1-5-32-546 (Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-547&#x27; THEN
    &#x27;S-1-5-32-547 (Power Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-548&#x27; THEN
    &#x27;S-1-5-32-548 (Account Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-549&#x27; THEN
    &#x27;S-1-5-32-549 (Server Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-550&#x27; THEN
    &#x27;S-1-5-32-550 (Print Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-551&#x27; THEN
    &#x27;S-1-5-32-551 (Backup Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-552&#x27; THEN
    &#x27;S-1-5-32-552 (Replicators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-554&#x27; THEN
    &#x27;S-1-5-32-554 (Builtin\Pre-Windows 2000 Compatible Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-555&#x27; THEN
    &#x27;S-1-5-32-555 (Builtin\Remote Desktop Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-556&#x27; THEN
    &#x27;S-1-5-32-556 (Builtin\Network Configuration Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-557&#x27; THEN
    &#x27;S-1-5-32-557 (Builtin\Incoming Forest Trust Builders)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-558&#x27; THEN
    &#x27;S-1-5-32-558 (Builtin\Performance Monitor Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-559&#x27; THEN
    &#x27;S-1-5-32-559 (Builtin\Performance Log Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-560&#x27; THEN
    &#x27;S-1-5-32-560 (Builtin\Windows Authorization Access Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-561&#x27; THEN
    &#x27;S-1-5-32-561 (Builtin\Terminal Server License Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-562&#x27; THEN
    &#x27;S-1-5-32-562 (Builtin\Distributed COM Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-569&#x27; THEN
    &#x27;S-1-5-32-569 (Builtin\Cryptographic Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-573&#x27; THEN
    &#x27;S-1-5-32-573 (Builtin\Event Log Readers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-574&#x27; THEN
    &#x27;S-1-5-32-574 (Builtin\Certificate Service DCOM Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-575&#x27; THEN
    &#x27;S-1-5-32-575 (Builtin\RDS Remote Access Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-576&#x27; THEN
    &#x27;S-1-5-32-576 (Builtin\RDS Endpoint Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-577&#x27; THEN
    &#x27;S-1-5-32-577 (Builtin\RDS Management Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-578&#x27; THEN
    &#x27;S-1-5-32-578 (Builtin\Hyper-V Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-579&#x27; THEN
    &#x27;S-1-5-32-579 (Builtin\Access Control Assistance Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-580&#x27; THEN
    &#x27;S-1-5-32-580 (Builtin\Remote Management Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-582&#x27; THEN
    &#x27;S-1-5-32-582 (Storage Replica Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-4&#x27; THEN
    &#x27;S-1-5-4 (Interactive)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-5-X-Y&#x27; THEN
    &#x27;S-1-5-5-X-Y (Logon Session)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-6&#x27; THEN
    &#x27;S-1-5-6 (Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-10&#x27; THEN
    &#x27;S-1-5-64-10 (NTLM Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-14&#x27; THEN
    &#x27;S-1-5-64-14 (SChannelAuthentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-21&#x27; THEN
    &#x27;S-1-5-64-21 (Digest Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-7&#x27; THEN
    &#x27;S-1-5-7 (Anonymous)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-8&#x27; THEN
    &#x27;S-1-5-8 (Proxy)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80&#x27; THEN
    &#x27;S-1-5-80 (NT Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (NT Services\All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-83-0&#x27; THEN
    &#x27;S-1-5-83-0 (NT Virtual Machine\Virtual Machines)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-9&#x27; THEN
    &#x27;S-1-5-9 (Enterprise Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-90-0&#x27; THEN
    &#x27;S-1-5-90-0 (Windows Manager\Windows Manager Group)&#x27; ELSE events_persisted.sid
    END AS UserSID,
    datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS Timestamp,
    tag_descriptions.locale_name AS LocaleName,
    tag_descriptions.tag_name AS TagName,
    events_persisted.full_event_name AS FullEventName,
    events_persisted.logging_binary_name AS LoggingBinaryName,
    events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
    events_persisted.full_event_name_hash AS FullEventNameHash,
    events_persisted.event_keywords AS Keywords,
    provider_groups.group_guid AS GroupGUID,
    CASE

    WHEN events_persisted.is_core = 0 THEN
    &#x27;No&#x27;
    WHEN events_persisted.is_core = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsCore,
    events_persisted.compressed_payload_size AS CompressedPayloadSize,
    events_persisted.payload AS JSONPayload
    FROM
    events_persisted
    LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
    LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
    LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
    WHERE
    TagName = &#x27;Inking Typing and Speech Utterance&#x27;
    ORDER BY
    events_persisted.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows EventTranscript.db Inking Typing and Speech Utterance&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows EventTranscript.db_ProductandServicePerformance
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;categories&#x27; OR name=&#x27;event_categories&#x27; OR name=&#x27;event_tags&#x27; OR name=&#x27;events_persisted&#x27; OR name=&#x27;producers&#x27; OR name=&#x27;provider_groups&#x27; OR name=&#x27;tag_descriptions&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 4
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    CASE

    WHEN
    events_persisted.sid = &#x27;S-1-0&#x27; THEN
    &#x27;S-1-0 (Null Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-0-0&#x27; THEN
    &#x27;S-1-0-0 (Nobody)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1&#x27; THEN
    &#x27;S-1-1 (World Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1-0&#x27; THEN
    &#x27;S-1-1-0 (Everyone)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-0&#x27; THEN
    &#x27;S-1-16-0 (Untrusted Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-12288&#x27; THEN
    &#x27;S-1-16-12288 (High Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-16384&#x27; THEN
    &#x27;S-1-16-16384 (System Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-20480&#x27; THEN
    &#x27;S-1-16-20480 (Protected Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-28672&#x27; THEN
    &#x27;S-1-16-28672 (Secure Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-4096&#x27; THEN
    &#x27;S-1-16-4096 (Low Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8192&#x27; THEN
    &#x27;S-1-16-8192 (Medium Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8448&#x27; THEN
    &#x27;S-1-16-8448 (Medium Plus Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2&#x27; THEN
    &#x27;S-1-2 (Local Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-0&#x27; THEN
    &#x27;S-1-2-0 (Local)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-1&#x27; THEN
    &#x27;S-1-2-1 (Console Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3&#x27; THEN
    &#x27;S-1-3 (Creator Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-0&#x27; THEN
    &#x27;S-1-3-0 (Creator Owner)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-1&#x27; THEN
    &#x27;S-1-3-1 (Creator Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-2&#x27; THEN
    &#x27;S-1-3-2 (Creator Owner Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-3&#x27; THEN
    &#x27;S-1-3-3 (Creator Group Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-4&#x27; THEN
    &#x27;S-1-3-4 (Owner Rights)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-4&#x27; THEN
    &#x27;S-1-4 (Non-unique Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5&#x27; THEN
    &#x27;S-1-5 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-1&#x27; THEN
    &#x27;S-1-5-1 (Dialup)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-10&#x27; THEN
    &#x27;S-1-5-10 (Principal Self)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-11&#x27; THEN
    &#x27;S-1-5-11 (Authenticated Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-12&#x27; THEN
    &#x27;S-1-5-12 (Restricted Code)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-13&#x27; THEN
    &#x27;S-1-5-13 (Terminal Server Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-14&#x27; THEN
    &#x27;S-1-5-14 (Remote Interactive Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-15&#x27; THEN
    &#x27;S-1-5-15 (This Organization)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-17&#x27; THEN
    &#x27;S-1-5-17 (IUSR)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-18&#x27; THEN
    &#x27;S-1-5-18 (Local System)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-19&#x27; THEN
    &#x27;S-1-5-19 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-2&#x27; THEN
    &#x27;S-1-5-2 (Network)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-20&#x27; THEN
    &#x27;S-1-5-20 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-498&#x27; THEN
    &#x27;S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-521&#x27; THEN
    &#x27;S-1-5-21domain-521 (Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-571&#x27; THEN
    &#x27;S-1-5-21domain-571 (Allowed RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-572&#x27; THEN
    &#x27;S-1-5-21domain-572 (Denied RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-500&#x27; THEN
    &#x27;S-1-5-21domain-500 (Administrator)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-501&#x27; THEN
    &#x27;S-1-5-21domain-501 (Guest)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-502&#x27; THEN
    &#x27;S-1-5-21domain-502 (KRBTGT)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-512&#x27; THEN
    &#x27;S-1-5-21domain-512 (Domain Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-513&#x27; THEN
    &#x27;S-1-5-21domain-513 (Domain Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-514&#x27; THEN
    &#x27;S-1-5-21domain-514 (Domain Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-515&#x27; THEN
    &#x27;S-1-5-21domain-515 (Domain Computers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-516&#x27; THEN
    &#x27;S-1-5-21domain-516 (Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-517&#x27; THEN
    &#x27;S-1-5-21domain-517 (Cert Publishers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-520&#x27; THEN
    &#x27;S-1-5-21domain-520 (Group Policy Creator Owners)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21-domain-522&#x27; THEN
    &#x27;S-1-5-21-domain-522 (Cloneable Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-526&#x27; THEN
    &#x27;S-1-5-21domain-526 (Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-527&#x27; THEN
    &#x27;S-1-5-21domain-527 (Enterprise Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-553&#x27; THEN
    &#x27;S-1-5-21domain-553 (RAS and IAS Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-518&#x27; THEN
    &#x27;S-1-5-21root domain-518 (Schema Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-519&#x27; THEN
    &#x27;S-1-5-21root domain-519 (Enterprise Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-3&#x27; THEN
    &#x27;S-1-5-3 (Batch)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-544&#x27; THEN
    &#x27;S-1-5-32-544 (Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-545&#x27; THEN
    &#x27;S-1-5-32-545 (Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-546&#x27; THEN
    &#x27;S-1-5-32-546 (Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-547&#x27; THEN
    &#x27;S-1-5-32-547 (Power Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-548&#x27; THEN
    &#x27;S-1-5-32-548 (Account Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-549&#x27; THEN
    &#x27;S-1-5-32-549 (Server Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-550&#x27; THEN
    &#x27;S-1-5-32-550 (Print Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-551&#x27; THEN
    &#x27;S-1-5-32-551 (Backup Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-552&#x27; THEN
    &#x27;S-1-5-32-552 (Replicators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-554&#x27; THEN
    &#x27;S-1-5-32-554 (Builtin\Pre-Windows 2000 Compatible Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-555&#x27; THEN
    &#x27;S-1-5-32-555 (Builtin\Remote Desktop Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-556&#x27; THEN
    &#x27;S-1-5-32-556 (Builtin\Network Configuration Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-557&#x27; THEN
    &#x27;S-1-5-32-557 (Builtin\Incoming Forest Trust Builders)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-558&#x27; THEN
    &#x27;S-1-5-32-558 (Builtin\Performance Monitor Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-559&#x27; THEN
    &#x27;S-1-5-32-559 (Builtin\Performance Log Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-560&#x27; THEN
    &#x27;S-1-5-32-560 (Builtin\Windows Authorization Access Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-561&#x27; THEN
    &#x27;S-1-5-32-561 (Builtin\Terminal Server License Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-562&#x27; THEN
    &#x27;S-1-5-32-562 (Builtin\Distributed COM Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-569&#x27; THEN
    &#x27;S-1-5-32-569 (Builtin\Cryptographic Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-573&#x27; THEN
    &#x27;S-1-5-32-573 (Builtin\Event Log Readers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-574&#x27; THEN
    &#x27;S-1-5-32-574 (Builtin\Certificate Service DCOM Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-575&#x27; THEN
    &#x27;S-1-5-32-575 (Builtin\RDS Remote Access Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-576&#x27; THEN
    &#x27;S-1-5-32-576 (Builtin\RDS Endpoint Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-577&#x27; THEN
    &#x27;S-1-5-32-577 (Builtin\RDS Management Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-578&#x27; THEN
    &#x27;S-1-5-32-578 (Builtin\Hyper-V Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-579&#x27; THEN
    &#x27;S-1-5-32-579 (Builtin\Access Control Assistance Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-580&#x27; THEN
    &#x27;S-1-5-32-580 (Builtin\Remote Management Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-582&#x27; THEN
    &#x27;S-1-5-32-582 (Storage Replica Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-4&#x27; THEN
    &#x27;S-1-5-4 (Interactive)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-5-X-Y&#x27; THEN
    &#x27;S-1-5-5-X-Y (Logon Session)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-6&#x27; THEN
    &#x27;S-1-5-6 (Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-10&#x27; THEN
    &#x27;S-1-5-64-10 (NTLM Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-14&#x27; THEN
    &#x27;S-1-5-64-14 (SChannelAuthentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-21&#x27; THEN
    &#x27;S-1-5-64-21 (Digest Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-7&#x27; THEN
    &#x27;S-1-5-7 (Anonymous)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-8&#x27; THEN
    &#x27;S-1-5-8 (Proxy)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80&#x27; THEN
    &#x27;S-1-5-80 (NT Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (NT Services\All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-83-0&#x27; THEN
    &#x27;S-1-5-83-0 (NT Virtual Machine\Virtual Machines)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-9&#x27; THEN
    &#x27;S-1-5-9 (Enterprise Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-90-0&#x27; THEN
    &#x27;S-1-5-90-0 (Windows Manager\Windows Manager Group)&#x27; ELSE events_persisted.sid
    END AS UserSID,
    datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS Timestamp,
    tag_descriptions.locale_name AS LocaleName,
    tag_descriptions.tag_name AS TagName,
    events_persisted.full_event_name AS FullEventName,
    events_persisted.logging_binary_name AS LoggingBinaryName,
    events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
    events_persisted.full_event_name_hash AS FullEventNameHash,
    events_persisted.event_keywords AS Keywords,
    provider_groups.group_guid AS GroupGUID,
    CASE

    WHEN events_persisted.is_core = 0 THEN
    &#x27;No&#x27;
    WHEN events_persisted.is_core = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsCore,
    events_persisted.compressed_payload_size AS CompressedPayloadSize,
    events_persisted.payload AS JSONPayload
    FROM
    events_persisted
    LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
    LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
    LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
    WHERE
    TagName = &#x27;Product and Service Performance&#x27;
    ORDER BY
    events_persisted.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows EventTranscript.db_ProductandServicePerformance&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows EventTranscript.db Product and Service Usage
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;categories&#x27; OR name=&#x27;event_categories&#x27; OR name=&#x27;event_tags&#x27; OR name=&#x27;events_persisted&#x27; OR name=&#x27;producers&#x27; OR name=&#x27;provider_groups&#x27; OR name=&#x27;tag_descriptions&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 4
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    CASE

    WHEN
    events_persisted.sid = &#x27;S-1-0&#x27; THEN
    &#x27;S-1-0 (Null Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-0-0&#x27; THEN
    &#x27;S-1-0-0 (Nobody)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1&#x27; THEN
    &#x27;S-1-1 (World Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1-0&#x27; THEN
    &#x27;S-1-1-0 (Everyone)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-0&#x27; THEN
    &#x27;S-1-16-0 (Untrusted Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-12288&#x27; THEN
    &#x27;S-1-16-12288 (High Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-16384&#x27; THEN
    &#x27;S-1-16-16384 (System Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-20480&#x27; THEN
    &#x27;S-1-16-20480 (Protected Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-28672&#x27; THEN
    &#x27;S-1-16-28672 (Secure Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-4096&#x27; THEN
    &#x27;S-1-16-4096 (Low Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8192&#x27; THEN
    &#x27;S-1-16-8192 (Medium Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8448&#x27; THEN
    &#x27;S-1-16-8448 (Medium Plus Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2&#x27; THEN
    &#x27;S-1-2 (Local Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-0&#x27; THEN
    &#x27;S-1-2-0 (Local)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-1&#x27; THEN
    &#x27;S-1-2-1 (Console Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3&#x27; THEN
    &#x27;S-1-3 (Creator Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-0&#x27; THEN
    &#x27;S-1-3-0 (Creator Owner)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-1&#x27; THEN
    &#x27;S-1-3-1 (Creator Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-2&#x27; THEN
    &#x27;S-1-3-2 (Creator Owner Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-3&#x27; THEN
    &#x27;S-1-3-3 (Creator Group Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-4&#x27; THEN
    &#x27;S-1-3-4 (Owner Rights)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-4&#x27; THEN
    &#x27;S-1-4 (Non-unique Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5&#x27; THEN
    &#x27;S-1-5 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-1&#x27; THEN
    &#x27;S-1-5-1 (Dialup)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-10&#x27; THEN
    &#x27;S-1-5-10 (Principal Self)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-11&#x27; THEN
    &#x27;S-1-5-11 (Authenticated Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-12&#x27; THEN
    &#x27;S-1-5-12 (Restricted Code)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-13&#x27; THEN
    &#x27;S-1-5-13 (Terminal Server Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-14&#x27; THEN
    &#x27;S-1-5-14 (Remote Interactive Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-15&#x27; THEN
    &#x27;S-1-5-15 (This Organization)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-17&#x27; THEN
    &#x27;S-1-5-17 (IUSR)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-18&#x27; THEN
    &#x27;S-1-5-18 (Local System)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-19&#x27; THEN
    &#x27;S-1-5-19 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-2&#x27; THEN
    &#x27;S-1-5-2 (Network)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-20&#x27; THEN
    &#x27;S-1-5-20 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-498&#x27; THEN
    &#x27;S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-521&#x27; THEN
    &#x27;S-1-5-21domain-521 (Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-571&#x27; THEN
    &#x27;S-1-5-21domain-571 (Allowed RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-572&#x27; THEN
    &#x27;S-1-5-21domain-572 (Denied RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-500&#x27; THEN
    &#x27;S-1-5-21domain-500 (Administrator)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-501&#x27; THEN
    &#x27;S-1-5-21domain-501 (Guest)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-502&#x27; THEN
    &#x27;S-1-5-21domain-502 (KRBTGT)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-512&#x27; THEN
    &#x27;S-1-5-21domain-512 (Domain Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-513&#x27; THEN
    &#x27;S-1-5-21domain-513 (Domain Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-514&#x27; THEN
    &#x27;S-1-5-21domain-514 (Domain Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-515&#x27; THEN
    &#x27;S-1-5-21domain-515 (Domain Computers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-516&#x27; THEN
    &#x27;S-1-5-21domain-516 (Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-517&#x27; THEN
    &#x27;S-1-5-21domain-517 (Cert Publishers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-520&#x27; THEN
    &#x27;S-1-5-21domain-520 (Group Policy Creator Owners)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21-domain-522&#x27; THEN
    &#x27;S-1-5-21-domain-522 (Cloneable Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-526&#x27; THEN
    &#x27;S-1-5-21domain-526 (Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-527&#x27; THEN
    &#x27;S-1-5-21domain-527 (Enterprise Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-553&#x27; THEN
    &#x27;S-1-5-21domain-553 (RAS and IAS Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-518&#x27; THEN
    &#x27;S-1-5-21root domain-518 (Schema Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-519&#x27; THEN
    &#x27;S-1-5-21root domain-519 (Enterprise Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-3&#x27; THEN
    &#x27;S-1-5-3 (Batch)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-544&#x27; THEN
    &#x27;S-1-5-32-544 (Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-545&#x27; THEN
    &#x27;S-1-5-32-545 (Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-546&#x27; THEN
    &#x27;S-1-5-32-546 (Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-547&#x27; THEN
    &#x27;S-1-5-32-547 (Power Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-548&#x27; THEN
    &#x27;S-1-5-32-548 (Account Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-549&#x27; THEN
    &#x27;S-1-5-32-549 (Server Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-550&#x27; THEN
    &#x27;S-1-5-32-550 (Print Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-551&#x27; THEN
    &#x27;S-1-5-32-551 (Backup Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-552&#x27; THEN
    &#x27;S-1-5-32-552 (Replicators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-554&#x27; THEN
    &#x27;S-1-5-32-554 (Builtin\Pre-Windows 2000 Compatible Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-555&#x27; THEN
    &#x27;S-1-5-32-555 (Builtin\Remote Desktop Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-556&#x27; THEN
    &#x27;S-1-5-32-556 (Builtin\Network Configuration Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-557&#x27; THEN
    &#x27;S-1-5-32-557 (Builtin\Incoming Forest Trust Builders)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-558&#x27; THEN
    &#x27;S-1-5-32-558 (Builtin\Performance Monitor Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-559&#x27; THEN
    &#x27;S-1-5-32-559 (Builtin\Performance Log Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-560&#x27; THEN
    &#x27;S-1-5-32-560 (Builtin\Windows Authorization Access Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-561&#x27; THEN
    &#x27;S-1-5-32-561 (Builtin\Terminal Server License Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-562&#x27; THEN
    &#x27;S-1-5-32-562 (Builtin\Distributed COM Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-569&#x27; THEN
    &#x27;S-1-5-32-569 (Builtin\Cryptographic Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-573&#x27; THEN
    &#x27;S-1-5-32-573 (Builtin\Event Log Readers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-574&#x27; THEN
    &#x27;S-1-5-32-574 (Builtin\Certificate Service DCOM Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-575&#x27; THEN
    &#x27;S-1-5-32-575 (Builtin\RDS Remote Access Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-576&#x27; THEN
    &#x27;S-1-5-32-576 (Builtin\RDS Endpoint Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-577&#x27; THEN
    &#x27;S-1-5-32-577 (Builtin\RDS Management Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-578&#x27; THEN
    &#x27;S-1-5-32-578 (Builtin\Hyper-V Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-579&#x27; THEN
    &#x27;S-1-5-32-579 (Builtin\Access Control Assistance Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-580&#x27; THEN
    &#x27;S-1-5-32-580 (Builtin\Remote Management Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-582&#x27; THEN
    &#x27;S-1-5-32-582 (Storage Replica Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-4&#x27; THEN
    &#x27;S-1-5-4 (Interactive)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-5-X-Y&#x27; THEN
    &#x27;S-1-5-5-X-Y (Logon Session)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-6&#x27; THEN
    &#x27;S-1-5-6 (Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-10&#x27; THEN
    &#x27;S-1-5-64-10 (NTLM Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-14&#x27; THEN
    &#x27;S-1-5-64-14 (SChannelAuthentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-21&#x27; THEN
    &#x27;S-1-5-64-21 (Digest Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-7&#x27; THEN
    &#x27;S-1-5-7 (Anonymous)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-8&#x27; THEN
    &#x27;S-1-5-8 (Proxy)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80&#x27; THEN
    &#x27;S-1-5-80 (NT Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (NT Services\All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-83-0&#x27; THEN
    &#x27;S-1-5-83-0 (NT Virtual Machine\Virtual Machines)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-9&#x27; THEN
    &#x27;S-1-5-9 (Enterprise Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-90-0&#x27; THEN
    &#x27;S-1-5-90-0 (Windows Manager\Windows Manager Group)&#x27; ELSE events_persisted.sid
    END AS UserSID,
    datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS Timestamp,
    tag_descriptions.locale_name AS LocaleName,
    tag_descriptions.tag_name AS TagName,
    events_persisted.full_event_name AS FullEventName,
    events_persisted.logging_binary_name AS LoggingBinaryName,
    events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
    events_persisted.full_event_name_hash AS FullEventNameHash,
    events_persisted.event_keywords AS Keywords,
    provider_groups.group_guid AS GroupGUID,
    CASE

    WHEN events_persisted.is_core = 0 THEN
    &#x27;No&#x27;
    WHEN events_persisted.is_core = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsCore,
    events_persisted.compressed_payload_size AS CompressedPayloadSize,
    events_persisted.payload AS JSONPayload
    FROM
    events_persisted
    LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
    LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
    LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
    WHERE
    TagName = &#x27;Product and Service Usage&#x27;
    ORDER BY
    events_persisted.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows EventTranscript.db Product and Service Usage&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows EventTranscript.db Software Setup and Inventory
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;categories&#x27; OR name=&#x27;event_categories&#x27; OR name=&#x27;event_tags&#x27; OR name=&#x27;events_persisted&#x27; OR name=&#x27;producers&#x27; OR name=&#x27;provider_groups&#x27; OR name=&#x27;tag_descriptions&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 4
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    CASE

    WHEN
    events_persisted.sid = &#x27;S-1-0&#x27; THEN
    &#x27;S-1-0 (Null Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-0-0&#x27; THEN
    &#x27;S-1-0-0 (Nobody)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1&#x27; THEN
    &#x27;S-1-1 (World Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-1-0&#x27; THEN
    &#x27;S-1-1-0 (Everyone)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-0&#x27; THEN
    &#x27;S-1-16-0 (Untrusted Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-12288&#x27; THEN
    &#x27;S-1-16-12288 (High Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-16384&#x27; THEN
    &#x27;S-1-16-16384 (System Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-20480&#x27; THEN
    &#x27;S-1-16-20480 (Protected Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-28672&#x27; THEN
    &#x27;S-1-16-28672 (Secure Process Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-4096&#x27; THEN
    &#x27;S-1-16-4096 (Low Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8192&#x27; THEN
    &#x27;S-1-16-8192 (Medium Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-16-8448&#x27; THEN
    &#x27;S-1-16-8448 (Medium Plus Mandatory Level)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2&#x27; THEN
    &#x27;S-1-2 (Local Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-0&#x27; THEN
    &#x27;S-1-2-0 (Local)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-2-1&#x27; THEN
    &#x27;S-1-2-1 (Console Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3&#x27; THEN
    &#x27;S-1-3 (Creator Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-0&#x27; THEN
    &#x27;S-1-3-0 (Creator Owner)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-1&#x27; THEN
    &#x27;S-1-3-1 (Creator Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-2&#x27; THEN
    &#x27;S-1-3-2 (Creator Owner Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-3&#x27; THEN
    &#x27;S-1-3-3 (Creator Group Server)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-3-4&#x27; THEN
    &#x27;S-1-3-4 (Owner Rights)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-4&#x27; THEN
    &#x27;S-1-4 (Non-unique Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5&#x27; THEN
    &#x27;S-1-5 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-1&#x27; THEN
    &#x27;S-1-5-1 (Dialup)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-10&#x27; THEN
    &#x27;S-1-5-10 (Principal Self)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-11&#x27; THEN
    &#x27;S-1-5-11 (Authenticated Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-12&#x27; THEN
    &#x27;S-1-5-12 (Restricted Code)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-13&#x27; THEN
    &#x27;S-1-5-13 (Terminal Server Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-14&#x27; THEN
    &#x27;S-1-5-14 (Remote Interactive Logon)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-15&#x27; THEN
    &#x27;S-1-5-15 (This Organization)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-17&#x27; THEN
    &#x27;S-1-5-17 (IUSR)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-18&#x27; THEN
    &#x27;S-1-5-18 (Local System)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-19&#x27; THEN
    &#x27;S-1-5-19 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-2&#x27; THEN
    &#x27;S-1-5-2 (Network)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-20&#x27; THEN
    &#x27;S-1-5-20 (NT Authority)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-498&#x27; THEN
    &#x27;S-1-5-21domain-498 (Enterprise Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-521&#x27; THEN
    &#x27;S-1-5-21domain-521 (Read-only Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-571&#x27; THEN
    &#x27;S-1-5-21domain-571 (Allowed RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-572&#x27; THEN
    &#x27;S-1-5-21domain-572 (Denied RODC Password Replication Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-500&#x27; THEN
    &#x27;S-1-5-21domain-500 (Administrator)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-501&#x27; THEN
    &#x27;S-1-5-21domain-501 (Guest)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-502&#x27; THEN
    &#x27;S-1-5-21domain-502 (KRBTGT)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-512&#x27; THEN
    &#x27;S-1-5-21domain-512 (Domain Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-513&#x27; THEN
    &#x27;S-1-5-21domain-513 (Domain Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-514&#x27; THEN
    &#x27;S-1-5-21domain-514 (Domain Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-515&#x27; THEN
    &#x27;S-1-5-21domain-515 (Domain Computers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-516&#x27; THEN
    &#x27;S-1-5-21domain-516 (Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-517&#x27; THEN
    &#x27;S-1-5-21domain-517 (Cert Publishers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-520&#x27; THEN
    &#x27;S-1-5-21domain-520 (Group Policy Creator Owners)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21-domain-522&#x27; THEN
    &#x27;S-1-5-21-domain-522 (Cloneable Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-526&#x27; THEN
    &#x27;S-1-5-21domain-526 (Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-527&#x27; THEN
    &#x27;S-1-5-21domain-527 (Enterprise Key Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21domain-553&#x27; THEN
    &#x27;S-1-5-21domain-553 (RAS and IAS Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-518&#x27; THEN
    &#x27;S-1-5-21root domain-518 (Schema Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-21root domain-519&#x27; THEN
    &#x27;S-1-5-21root domain-519 (Enterprise Admins)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-3&#x27; THEN
    &#x27;S-1-5-3 (Batch)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-544&#x27; THEN
    &#x27;S-1-5-32-544 (Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-545&#x27; THEN
    &#x27;S-1-5-32-545 (Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-546&#x27; THEN
    &#x27;S-1-5-32-546 (Guests)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-547&#x27; THEN
    &#x27;S-1-5-32-547 (Power Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-548&#x27; THEN
    &#x27;S-1-5-32-548 (Account Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-549&#x27; THEN
    &#x27;S-1-5-32-549 (Server Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-550&#x27; THEN
    &#x27;S-1-5-32-550 (Print Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-551&#x27; THEN
    &#x27;S-1-5-32-551 (Backup Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-552&#x27; THEN
    &#x27;S-1-5-32-552 (Replicators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-554&#x27; THEN
    &#x27;S-1-5-32-554 (Builtin\Pre-Windows 2000 Compatible Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-555&#x27; THEN
    &#x27;S-1-5-32-555 (Builtin\Remote Desktop Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-556&#x27; THEN
    &#x27;S-1-5-32-556 (Builtin\Network Configuration Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-557&#x27; THEN
    &#x27;S-1-5-32-557 (Builtin\Incoming Forest Trust Builders)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-558&#x27; THEN
    &#x27;S-1-5-32-558 (Builtin\Performance Monitor Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-559&#x27; THEN
    &#x27;S-1-5-32-559 (Builtin\Performance Log Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-560&#x27; THEN
    &#x27;S-1-5-32-560 (Builtin\Windows Authorization Access Group)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-561&#x27; THEN
    &#x27;S-1-5-32-561 (Builtin\Terminal Server License Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-562&#x27; THEN
    &#x27;S-1-5-32-562 (Builtin\Distributed COM Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-569&#x27; THEN
    &#x27;S-1-5-32-569 (Builtin\Cryptographic Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-573&#x27; THEN
    &#x27;S-1-5-32-573 (Builtin\Event Log Readers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-574&#x27; THEN
    &#x27;S-1-5-32-574 (Builtin\Certificate Service DCOM Access)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-575&#x27; THEN
    &#x27;S-1-5-32-575 (Builtin\RDS Remote Access Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-576&#x27; THEN
    &#x27;S-1-5-32-576 (Builtin\RDS Endpoint Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-577&#x27; THEN
    &#x27;S-1-5-32-577 (Builtin\RDS Management Servers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-578&#x27; THEN
    &#x27;S-1-5-32-578 (Builtin\Hyper-V Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-579&#x27; THEN
    &#x27;S-1-5-32-579 (Builtin\Access Control Assistance Operators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-580&#x27; THEN
    &#x27;S-1-5-32-580 (Builtin\Remote Management Users)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-32-582&#x27; THEN
    &#x27;S-1-5-32-582 (Storage Replica Administrators)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-4&#x27; THEN
    &#x27;S-1-5-4 (Interactive)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-5-X-Y&#x27; THEN
    &#x27;S-1-5-5-X-Y (Logon Session)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-6&#x27; THEN
    &#x27;S-1-5-6 (Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-10&#x27; THEN
    &#x27;S-1-5-64-10 (NTLM Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-14&#x27; THEN
    &#x27;S-1-5-64-14 (SChannelAuthentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-64-21&#x27; THEN
    &#x27;S-1-5-64-21 (Digest Authentication)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-7&#x27; THEN
    &#x27;S-1-5-7 (Anonymous)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-8&#x27; THEN
    &#x27;S-1-5-8 (Proxy)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80&#x27; THEN
    &#x27;S-1-5-80 (NT Service)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (NT Services\All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-80-0&#x27; THEN
    &#x27;S-1-5-80-0 (All Services)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-83-0&#x27; THEN
    &#x27;S-1-5-83-0 (NT Virtual Machine\Virtual Machines)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-9&#x27; THEN
    &#x27;S-1-5-9 (Enterprise Domain Controllers)&#x27;
    WHEN events_persisted.sid = &#x27;S-1-5-90-0&#x27; THEN
    &#x27;S-1-5-90-0 (Windows Manager\Windows Manager Group)&#x27; ELSE events_persisted.sid
    END AS UserSID,
    datetime( ( events_persisted.timestamp / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS Timestamp,
    tag_descriptions.locale_name AS LocaleName,
    tag_descriptions.tag_name AS TagName,
    events_persisted.full_event_name AS FullEventName,
    events_persisted.logging_binary_name AS LoggingBinaryName,
    events_persisted.friendly_logging_binary_name AS FriendlyLoggingBinaryName,
    events_persisted.full_event_name_hash AS FullEventNameHash,
    events_persisted.event_keywords AS Keywords,
    provider_groups.group_guid AS GroupGUID,
    CASE

    WHEN events_persisted.is_core = 0 THEN
    &#x27;No&#x27;
    WHEN events_persisted.is_core = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsCore,
    events_persisted.compressed_payload_size AS CompressedPayloadSize,
    events_persisted.payload AS JSONPayload
    FROM
    events_persisted
    LEFT JOIN event_tags ON events_persisted.full_event_name_hash = event_tags.full_event_name_hash
    LEFT JOIN tag_descriptions ON event_tags.tag_id = tag_descriptions.tag_id
    LEFT JOIN provider_groups ON events_persisted.provider_group_id = provider_groups.group_id
    WHERE
    TagName = &#x27;Software Setup and Inventory&#x27;
    ORDER BY
    events_persisted.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows EventTranscript.db Software Setup and Inventory&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: FileZilla Client Queue
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;files&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
     source_file,
     download,
     size,
     error_count,
     priority,
     l.path AS Local_Path,
     r.path AS Remote_Path,
     s.host as Remote_Server_IP,
     s.port as Remote_Server_Port,
     s.user as Remote_Server_User,
     s.password as Remote_Server_Password,
     s.account as Remote_Server_Account,
     s.name as Remote_Server_Name,
     s.parameters as Remote_Server_Parameters,
     s.site_path as Remote_Server_Site_Path
     FROM files f
     INNER JOIN servers s ON f.server = s.id
     INNER JOIN remote_paths r ON f.local_path = r.id
     INNER JOIN local_paths l ON f.remote_path = l.id&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;FileZilla Client Queue&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Bookmarks
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;moz_historyvisits&#x27; OR name=&#x27;moz_bookmarks&#x27; OR name=&#x27;moz_places&#x27; OR name=&#x27;moz_inputhistory&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 4
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    Bookmarks.id AS ID,
    Bookmarks.parent AS ParentID,
    CASE

    WHEN Bookmarks.type = 1 THEN
    &#x27;URL&#x27;
    WHEN Bookmarks.type = 2 THEN
    &#x27;Folder&#x27;
    WHEN Bookmarks.type = 3 THEN
    &#x27;Separator&#x27;
    END AS Type,
    datetime( Bookmarks.dateAdded / 1000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS DateAdded,
    datetime( Bookmarks.lastModified / 1000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS LastModified,
    Bookmarks.position AS Position,
    Bookmarks.title AS Title,
    moz_places.url AS URL,
    Bookmarks.fk AS ForeignKey
    FROM
    moz_bookmarks AS Bookmarks
    LEFT JOIN moz_places ON Bookmarks.fk = moz_places.id
    ORDER BY
    Bookmarks.id ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Bookmarks&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Firefox Cookies
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;moz_cookies&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    moz_cookies.id AS ID,
    moz_cookies.host AS Host,
    moz_cookies.name AS Name,
    moz_cookies.value AS Value,
    datetime( moz_cookies.creationTime / 1000000, &#x27;UNIXEPOCH&#x27;, &#x27;localtime&#x27; ) AS &quot;Creation Time&quot;,
    datetime( moz_cookies.lastAccessed / 1000000, &#x27;UNIXEPOCH&#x27;, &#x27;localtime&#x27; ) AS &quot;Last Accessed Time&quot;,
    datetime( moz_cookies.expiry, &#x27;UNIXEPOCH&#x27;, &#x27;localtime&#x27; ) AS Expiration,
    CASE

    WHEN moz_cookies.isSecure = 0 THEN
    &#x27;No&#x27;
    WHEN moz_cookies.isSecure = 1 THEN
    &#x27;Yes&#x27;
    END AS IsSecure,
    CASE

    WHEN moz_cookies.isHttpOnly = 0 THEN
    &#x27;No&#x27;
    WHEN moz_cookies.isHttpOnly = 1 THEN
    &#x27;Yes&#x27;
    END AS IsHTTPOnly
    FROM
    moz_cookies
    ORDER BY
    moz_cookies.id ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Firefox Cookies&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Firefox Downloads
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;moz_historyvisits&#x27; OR name=&#x27;moz_bookmarks&#x27; OR name=&#x27;moz_places&#x27; OR name=&#x27;moz_inputhistory&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 4
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
        moz_annos.place_id AS PlaceID,
        moz_annos.content AS Content,
        datetime( dateAdded / 1000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS DateAdded,
        datetime( lastModified / 1000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS LastModified
    FROM
        moz_annos
    WHERE
        anno_attribute_id IN (1,2)
    ORDER BY
        moz_annos.dateAdded ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Firefox Downloads&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Firefox Downloads
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;moz_downloads&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    moz_downloads.id AS ID,
    moz_downloads.name AS Name,
    moz_downloads.mimeType AS MIMEType,
    moz_downloads.source AS Source,
    moz_downloads.target AS Target,
    datetime( startTime / 1000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS StartTime,
    datetime( endTime / 1000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS EndTime,
    moz_downloads.currBytes AS CurrentBytes,
    moz_downloads.maxBytes AS MaxBytes
    FROM
    moz_downloads
    ORDER BY
    moz_downloads.id ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Firefox Downloads&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Firefox Favicons
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;moz_icons&#x27; OR name=&#x27;moz_icons_to_pages&#x27; OR name=&#x27;moz_pages_w_icons&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 3
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    moz_icons.id AS ID,
    moz_pages_w_icons.page_url AS PageURL,
    moz_icons.icon_url AS FaviconURL,
    datetime( moz_icons.expire_ms / 1000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS Expiration
    FROM
    moz_icons
    INNER JOIN moz_icons_to_pages ON moz_icons.id = moz_icons_to_pages.icon_id
    INNER JOIN moz_pages_w_icons ON moz_icons_to_pages.page_id = moz_pages_w_icons.id
    ORDER BY
    moz_icons.expire_ms ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Firefox Favicons&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Firefox Form History
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;moz_formhistory&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
     id AS ID,
     fieldname AS FieldName,
     value AS Value,
     timesUsed AS TimesUsed,
     datetime( firstUsed / 1000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS &quot;First Used&quot;,
     datetime( lastUsed / 1000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS &quot;Last Used&quot;,
     guid AS GUID
    FROM
     moz_formhistory
    ORDER BY
     id ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Firefox Form History&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: History
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;moz_historyvisits&#x27; OR name=&#x27;moz_bookmarks&#x27; OR name=&#x27;moz_places&#x27; OR name=&#x27;moz_inputhistory&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 4
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    moz_historyvisits.id AS VisitID,
    moz_historyvisits.from_visit AS FromVisitID,
    datetime( moz_places.last_visit_date / 1000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS LastVisitDate,
    moz_places.visit_count AS VisitCount,
    moz_places.url AS URL,
    moz_places.title AS Title,
    moz_places.description AS Description,
    CASE

    WHEN moz_historyvisits.visit_type = 1 THEN
    &#x27;TRANSITION_LINK&#x27;
    WHEN moz_historyvisits.visit_type = 2 THEN
    &#x27;TRANSITION_TYPED&#x27;
    WHEN moz_historyvisits.visit_type = 3 THEN
    &#x27;TRANSITION_BOOKMARK&#x27;
    WHEN moz_historyvisits.visit_type = 4 THEN
    &#x27;TRANSITION_EMBED&#x27;
    WHEN moz_historyvisits.visit_type = 5 THEN
    &#x27;TRANSITION_REDIRECT_PERMANENT&#x27;
    WHEN moz_historyvisits.visit_type = 6 THEN
    &#x27;TRANSITION_REDIRECT_TEMPORARY&#x27;
    WHEN moz_historyvisits.visit_type = 7 THEN
    &#x27;TRANSITION_DOWNLOAD&#x27;
    WHEN moz_historyvisits.visit_type = 8 THEN
    &#x27;TRANSITION_FRAMED_LINK&#x27;
    WHEN moz_historyvisits.visit_type = 9 THEN
    &#x27;TRANSITION_RELOAD&#x27;
    END AS VisitType,
    CASE

    WHEN moz_places.hidden = 0 THEN
    &#x27;No&#x27;
    WHEN moz_places.hidden = 1 THEN
    &#x27;Yes&#x27;
    END AS Hidden,
    CASE

    WHEN moz_places.typed = 0 THEN
    &#x27;No&#x27;
    WHEN moz_places.typed = 1 THEN
    &#x27;Yes&#x27;
    END AS Typed,
    moz_places.frecency AS Frecency,
    moz_places.preview_image_url AS PreviewImageURL
    FROM
    moz_places
    INNER JOIN moz_historyvisits ON moz_places.origin_id = moz_historyvisits.id
    ORDER BY
    moz_places.last_visit_date ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;History&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Google Drive FS Changes
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;change_buffer_entries&#x27; OR name=&#x27;fschanges&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 2
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    sqlite_sequence.seq AS Sequence,
    fschanges.identifier AS Identifier,
    fschanges.direction AS Direction,
    fschanges.&quot;action&quot; AS &quot;Action&quot;,
    fschanges.inode AS Inode,
    fschanges.parent_inode AS ParentInode,
    fschanges.volume AS Volume,
    fschanges.parent_volume AS ParentVolume,
    fschanges.path AS Path,
    fschanges.name AS Name,
    CASE

    WHEN fschanges.is_folder = 0 THEN
    &#x27;No&#x27;
    WHEN fschanges.is_folder = 1 THEN
    &#x27;Yes&#x27;
    END AS IsFolder,
    CASE

    WHEN fschanges.affects_gdoc = 0 THEN
    &#x27;No&#x27;
    WHEN fschanges.affects_gdoc = 1 THEN
    &#x27;Yes&#x27;
    END AS AffectsGDocs,
    datetime( modified, &#x27;unixepoch&#x27; ) AS ModifiedTime,
    fschanges.size AS SizeInBytes,
    CASE

    WHEN fschanges.shared = 0 THEN
    &#x27;No&#x27;
    WHEN fschanges.shared = 1 THEN
    &#x27;Yes&#x27;
    END AS Shared,
    CASE

    WHEN doc_type = 0 THEN
    &#x27;Folder&#x27;
    WHEN doc_type = 1 THEN
    &#x27;Regular File&#x27;
    WHEN doc_type = 2 THEN
    &#x27;Google Slides&#x27;
    WHEN doc_type = 3 THEN
    &#x27;Google Forms&#x27;
    WHEN doc_type = 4 THEN
    &#x27;Google Sheets&#x27;
    WHEN doc_type = 5 THEN
    &#x27;Google Draw&#x27;
    WHEN doc_type = 6 THEN
    &#x27;Google Docs&#x27;
    WHEN doc_type = 12 THEN
    &#x27;Google Maps&#x27; ELSE &#x27;Google File/Object&#x27;
    END AS DocType,
    fschanges.full_path AS OSPath,
    fschanges.hash AS Hash,
    change_buffer_entries.failure_count AS FailureCount,
    change_buffer_entries.time AS Time,
    change_buffer_entries.state AS State
    FROM
    fschanges
    LEFT JOIN change_buffer_entries ON fschanges.identifier = change_buffer_entries.identifier,
    sqlite_sequence
    ORDER BY
    fschanges.identifier ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Google Drive FS Changes&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Google Drive CloudGraphDB
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;cloud_graph_entry&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    filename AS &#x27;Filename&#x27;,
    datetime( modified, &#x27;unixepoch&#x27; ) AS &#x27;ModifiedTime&#x27;,
    CASE

    WHEN acl_role = 0 THEN
    &#x27;Private/Google Drive Owner&#x27;
    WHEN acl_role = 1 THEN
    &#x27;Can Contribute&#x27;
    WHEN acl_role = 2 THEN
    &#x27;Can View&#x27; ELSE &#x27;From Elsewhere&#x27;
    END AS &#x27;ACL Role&#x27;,
    CASE

    WHEN doc_type = 0 THEN
    &#x27;Folder&#x27;
    WHEN doc_type = 1 THEN
    &#x27;Regular File&#x27;
    WHEN doc_type = 2 THEN
    &#x27;Google Slides&#x27;
    WHEN doc_type = 3 THEN
    &#x27;Google Forms&#x27;
    WHEN doc_type = 4 THEN
    &#x27;Google Sheets&#x27;
    WHEN doc_type = 5 THEN
    &#x27;Google Draw&#x27;
    WHEN doc_type = 6 THEN
    &#x27;Google Docs&#x27;
    WHEN doc_type = 12 THEN
    &#x27;Google Maps&#x27; ELSE &#x27;Google File/Object&#x27;
    END AS Type,
    size AS &#x27;Size in bytes&#x27;,
    checksum AS &#x27;MD5 Hash&#x27;,
    CASE

    WHEN shared = 1 THEN
    &#x27;Shared&#x27;
    WHEN shared = 0 THEN
    &#x27;Not Shared&#x27;
    END AS &#x27;Shared Status&#x27;,
    CASE

    WHEN removed = 0 THEN
    &#x27;Not Removed&#x27;
    WHEN removed = 1 THEN
    &#x27;Removed&#x27;
    END AS &#x27;Cloud Status&#x27;
    FROM
    cloud_graph_entry&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Google Drive CloudGraphDB&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Google Drive SnapshotDB - Cloud Files
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;cloud_entry&#x27; OR name=&#x27;volume_info&#x27; OR name=&#x27;cloud_relations&#x27; OR name=&#x27;local_entry&#x27; OR name=&#x27;local_relations&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    cloud_entry.doc_id AS ID,
    ( SELECT cloud_entry.filename FROM cloud_entry WHERE cloud_relations.parent_doc_id = cloud_entry.doc_id ) AS ParentFolder,
    filename AS Filename,
    datetime( modified, &#x27;unixepoch&#x27; ) AS ModifiedTime,
    CASE

    WHEN acl_role = 0 THEN
    &#x27;Google Drive Owner&#x27; ELSE &#x27;From Elsewhere&#x27;
    END AS ACLRole,
    CASE

    WHEN doc_type = 0 THEN
    &#x27;Folder&#x27;
    WHEN doc_type = 1 THEN
    &#x27;Regular File&#x27;
    WHEN doc_type = 2 THEN
    &#x27;Google Slides&#x27;
    WHEN doc_type = 3 THEN
    &#x27;Google Forms&#x27;
    WHEN doc_type = 4 THEN
    &#x27;Google Sheets&#x27;
    WHEN doc_type = 5 THEN
    &#x27;Google Draw&#x27;
    WHEN doc_type = 6 THEN
    &#x27;Google Docs&#x27;
    WHEN doc_type = 12 THEN
    &#x27;Google Maps&#x27; ELSE &#x27;Google File/Object&#x27;
    END AS Type,
    size AS &#x27;SizeInBytes&#x27;,
    checksum AS Checksum,
    CASE

    WHEN shared = 1 THEN
    &#x27;Shared&#x27;
    WHEN shared = 0 THEN
    &#x27;Not Shared&#x27;
    END AS SharedStatus,
    CASE

    WHEN removed = 1 THEN
    &#x27;Yes&#x27;
    WHEN removed = 0 THEN
    &#x27;No&#x27;
    END AS RemovedStatus
    FROM
    cloud_entry
    LEFT JOIN cloud_relations ON cloud_relations.child_doc_id = cloud_entry.doc_id
    ORDER BY
    cloud_entry.modified ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Google Drive SnapshotDB - Cloud Files&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Google Drive SnapshotDB - Local Files
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;cloud_entry&#x27; OR name=&#x27;volume_info&#x27; OR name=&#x27;cloud_relations&#x27; OR name=&#x27;local_entry&#x27; OR name=&#x27;local_relations&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    local_entry.inode AS FileID,
    local_entry.volume AS Volume,
    ( SELECT local_entry.filename FROM local_entry WHERE local_relations.parent_inode = local_entry.inode ) AS ParentFolder,
    local_entry.filename AS Filename,
    datetime( modified, &#x27;unixepoch&#x27; ) AS &quot;ModifiedTime&quot;,
    local_entry.checksum AS Checksum,
    local_entry.size AS SizeInBytes,
    CASE

    WHEN is_folder = 0 THEN
    &#x27;No&#x27;
    WHEN is_folder = 1 THEN
    &#x27;Yes&#x27;
    END AS IsFolder
    FROM
    local_entry AS local_entry
    LEFT JOIN local_relations ON local_relations.child_inode = local_entry.inode
    ORDER BY
    local_entry.inode ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Google Drive SnapshotDB - Local Files&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Google Drive SnapshotDB - Volume Info
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;cloud_entry&#x27; OR name=&#x27;volume_info&#x27; OR name=&#x27;cloud_relations&#x27; OR name=&#x27;local_entry&#x27; OR name=&#x27;local_relations&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    main.volume_info.volume AS Volume,
    main.volume_info.full_path AS OSPath,
    main.volume_info.uuid AS UUID,
    main.volume_info.label AS DriveLabel,
    main.volume_info.size AS SizeInBytes,
    main.volume_info.filesystem AS DriveFormat,
    main.volume_info.model AS DriveModel,
    main.volume_info.device_type AS DeviceType,
    main.volume_info.device_file AS DeviceFile,
    main.volume_info.device_number AS DeviceSerialNumber
    FROM
    main.volume_info
    ORDER BY
    main.volume_info.full_path ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Google Drive SnapshotDB - Volume Info&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Google Drive Sync Config Database
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;data&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    data.entry_key AS EntryKey,
    data.data_key AS DataKey,
    data.data_value AS DataValue
    FROM
    data&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Google Drive Sync Config Database&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Google Drive for Desktop Metadata
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;items&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    items.stable_id,
    items.local_title as &quot;Name&quot;,
    items.file_size as &quot;SizeInBytes&quot;,
    items.mime_type,
    datetime(items.modified_date / 1000, &#x27;unixepoch&#x27;) as &quot;ModifiedTime&quot;,
    datetime(items.viewed_by_me_date / 1000, &#x27;unixepoch&#x27;) as &quot;LastInteractionTime&quot;,
    CASE
    when items.is_folder = 1 then &quot;Folder&quot;
    when items.is_folder = 0 then &quot;File&quot;
    end as &quot;IsFolder&quot;,
    CASE
    when items.trashed = 1 then &quot;Deleted&quot;
    when items.trashed = 0 then &quot;Not Deleted&quot;
    end as &quot;DeletionStatus&quot;,
    CASE
    when items.is_owner = 1 then &quot;Owner&quot;
    when items.is_owner = 0 then &quot;Not Owner&quot;
    end as &quot;Ownership&quot;,
    CASE
    when items.shared_with_me_date = 1 then &quot;Shared&quot;
    when items.shared_with_me_date = 0 then &quot;Not Shared&quot;
    end as &quot;SharedWithUser&quot;,
    items.id AS &quot;CloudIdentifier&quot;
    FROM
    items&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Google Drive for Desktop Metadata&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Microsoft Sticky Notes
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Note&#x27; OR name=&#x27;Media&#x27; OR name=&#x27;Insight&#x27; OR name=&#x27;User&#x27; OR name=&#x27;Stroke&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    datetime( ( &quot;CreatedAt&quot; / 10000000 ) - 62135596800, &#x27;unixepoch&#x27; ) AS CreatedAt,
    datetime( ( &quot;UpdatedAt&quot; / 10000000 ) - 62135596800, &#x27;unixepoch&#x27; ) AS UpdatedAt,
    datetime( ( &quot;DeletedAt&quot; / 10000000 ) - 62135596800, &#x27;unixepoch&#x27; ) AS DeletedAt,
    Note.WindowPosition AS WindowPosition,
    CASE
    WHEN Note.IsOpen = 0 THEN &#x27;No&#x27;
    WHEN Note.IsOpen = 1 THEN &#x27;Yes&#x27;
    ELSE &#x27;Unknown&#x27;
    END AS IsOpen,
    CASE
    WHEN Note.IsAlwaysOnTop = 0 THEN &#x27;No&#x27;
    WHEN Note.IsAlwaysOnTop = 1 THEN &#x27;Yes&#x27;
    ELSE &#x27;Unknown&#x27;
    END AS IsAlwaysOnTop,
    Note.Theme AS Theme,
    Note.Id AS NoteID,
    Note.ParentId AS ParentID,
    Note.Text AS Text,
    Note.LastServerVersion AS LastServerVersion
    FROM
    Note
    ORDER BY
    Note.CreatedAt ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Microsoft Sticky Notes&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Nessus Preferences Database
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;PREFERENCES&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    PREFERENCES.name AS Name,
    PREFERENCES.value AS Value
    FROM
    PREFERENCES&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Nessus Preferences Database&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Company names
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Cars&#x27; OR name=&#x27;CarScheduling&#x27; OR name=&#x27;Customers&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 3
    LET SQLQuery = &#x27;&#x27;&#x27;select Company from Customers;&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Company names&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Order payment type and amount, ordered
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Cars&#x27; OR name=&#x27;CarScheduling&#x27; OR name=&#x27;Customers&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 3
    LET SQLQuery = &#x27;&#x27;&#x27;select CustomerID,PaymentType,PaymentAmount from Orders ORDER BY PaymentAmount,PaymentType;&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Order payment type and amount, ordered&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Distinct descriptions
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Cars&#x27; OR name=&#x27;CarScheduling&#x27; OR name=&#x27;Customers&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 3
    LET SQLQuery = &#x27;&#x27;&#x27;select distinct Description from CarScheduling&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Distinct descriptions&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Make and model
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Cars&#x27; OR name=&#x27;CarScheduling&#x27; OR name=&#x27;Customers&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 3
    LET SQLQuery = &#x27;&#x27;&#x27;select Trademark,Model from cars ORDER BY Trademark&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Make and model&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Customers table users
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Customers&#x27; OR name=&#x27;Total&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 2
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT FirstName,LastName from Customers&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Customers table users&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Another Customers table query
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Customers&#x27; OR name=&#x27;Total&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 2
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT Id,State as Wizzo from Customers&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Another Customers table query&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: JoinExample
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Customers&#x27; OR name=&#x27;Total&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 2
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT Total.ID, Customers.FirstName || &#x27; &#x27; || Customers.LastName AS CustomerName, Total.Year, Total.January, Total.February, Total.March, Total.April, Total.May, Total.June, Total.July, Total.August, Total.September, Total.October, Total.November, Total.December FROM         Customers INNER JOIN Total ON Customers.ID = Total.CustomerID&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;JoinExample&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: SomeThingElse
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Customers&#x27; OR name=&#x27;Total&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 2
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT Id,State as Wizzo froM Customers&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;SomeThingElse&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: TeraCopy MainDB
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;list&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;select
     Name AS &quot;Name of SQLite DB&quot;,
     datetime(julianday(Started)) as &quot;Transfer Started&quot;,
     datetime(julianday(Finished)) as &quot;Transfer Finished&quot;,
     source AS &quot;Source&quot;,
     target AS &quot;Target&quot;,
     Files AS &quot;Number of Files&quot;,
     size AS &quot;Size (Bytes)&quot;
     from list&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;TeraCopy MainDB&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: TeraCopy History
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Files&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
        Source,
        size AS &quot;Size (Bytes)&quot;,
    CASE

            WHEN IsFolder = 0 THEN
            &#x27;No&#x27;
            WHEN IsFolder = 1 THEN
            &#x27;Yes&#x27;
        END AS IsFolder,
    CASE

            WHEN Marked = 0 THEN
            &#x27;No&#x27;
            WHEN Marked = 1 THEN
            &#x27;Yes&#x27;
        END AS Marked,
    CASE

            WHEN Hidden = 0 THEN
            &#x27;No&#x27;
            WHEN Hidden = 1 THEN
            &#x27;Yes&#x27;
        END AS Hidden,
        datetime( julianday( Creation ) ) AS Creation,
        datetime( julianday( Access ) ) AS Access,
        datetime( julianday( Write ) ) AS Write
    FROM
        Files&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;TeraCopy History&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: TeraCopy History Log
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Files&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
        Log.Timestamp AS Timestamp,
        Log.Message AS Message
    FROM
        Log
    ORDER BY
        Timestamp&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;TeraCopy History Log&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows Photos Items
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Item&#x27; OR name=&#x27;Folder&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 2
    LET SQLQuery = &#x27;&#x27;&#x27;select item.Item_FileName AS Item_FileName,
    item.Item_FileSize AS Item_FileSize,
    item.Item_Width AS Item_Width,
    item.Item_Height AS Item_Height,
    item.Item_Latitude AS Item_Latitude,
    item.Item_Longitude AS Item_Longitude,
    ApplicationName.ApplicationName_Text,
    CameraManufacturer.CameraManufacturer_Text,
    CameraModel.CameraModel_Text,
    datetime((item.Item_DateTaken - 116444736000000000) / 10000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27;) AS Item_DateTaken,
    datetime((item.Item_DateCreated - 116444736000000000) / 10000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27;) AS Item_DateCreated,
    datetime((item.Item_DateModified - 116444736000000000) / 10000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27;) AS Item_DateModified,
    datetime((item.Item_DateIngested - 116444736000000000) / 10000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27;) AS Item_DateIngested
    FROM item
    LEFT JOIN ApplicationName ON item.Item_ApplicationNameId = ApplicationName.ApplicationName_Id
    LEFT JOIN CameraManufacturer ON item.Item_CameraManufacturerId = CameraManufacturer.CameraManufacturer_Id
    LEFT JOIN CameraModel ON item.Item_CameraModelId = CameraModel.CameraModel_Id
    ORDER BY Item_DateCreated DESC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows Photos Items&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows Photos Folders
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Item&#x27; OR name=&#x27;Folder&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 2
    LET SQLQuery = &#x27;&#x27;&#x27;select Folder.Folder_Path AS Folder_Path,
    Folder.Folder_DisplayName AS Folder_DisplayName,
    Folder.Folder_ItemCount AS Folder_ItemCount,
    datetime((Folder.Folder_DateCreated - 116444736000000000) / 10000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27;) AS Folder_DateCreated,
    datetime((Folder.Folder_DateModified - 116444736000000000) / 10000000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27;) AS Folder_DateModified
    FROM Folder ORDER BY Folder_DateCreated DESC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows Photos Folders&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows Update Store.db
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;ACTIONRECORDS&#x27; OR name=&#x27;COMPLETEDUPDATES&#x27; OR name=&#x27;UPDATES&#x27; OR name=&#x27;VARIABLES&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 4
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    datetime( Time / 1000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS Time,
    COMPLETEDUPDATES.PROVIDERID AS ProviderID,
    COMPLETEDUPDATES.UPDATEID AS UpdateID,
    COMPLETEDUPDATES.TITLE AS Title,
    COMPLETEDUPDATES.DESCRIPTION AS Description,
    COMPLETEDUPDATES.MOREINFOURL AS MoreInfoURL,
    COMPLETEDUPDATES.HISTORYCATEGORY AS HistoryCategory,
    COMPLETEDUPDATES.UNINSTALL AS Uninstall
    FROM
    COMPLETEDUPDATES
    ORDER BY
    COMPLETEDUPDATES.TIME ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows Update Store.db&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows Notifications
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Notification&#x27; OR name=&#x27;HandlerAssets&#x27; OR name=&#x27;WNSPushChannel&#x27; OR name=&#x27;TransientTable&#x27; OR name=&#x27;NotificationData&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    Notification.Id AS ID,
    Notification.&#x27;Order&#x27; AS &#x27;Order&#x27;,
    Notification.HandlerId AS HandlerId,
    NotificationHandler.PrimaryId AS Application,
    CASE

    WHEN NotificationHandler.ParentId THEN
    NotificationHandler.ParentId ELSE &#x27;&#x27;
    END AS Parent,
    NotificationHandler.HandlerType AS HandlerType,
    Notification.Type AS Type,
    Notification.Payload AS Payload,
    Notification.PayloadType AS PayloadType,
    Notification.Tag AS Tag,
    Notification.&quot;Group&quot; AS &quot;Group&quot;,
    datetime( ( Notification.ArrivalTime - 116444736000000000 ) / 10000000, &#x27;unixepoch&#x27; ) AS ArrivalTime,
    CASE

    WHEN Notification.ExpiryTime = 0 THEN
    &#x27;Expired&#x27; ELSE datetime( ( Notification.ExpiryTime - 116444736000000000 ) / 10000000, &#x27;unixepoch&#x27; )
    END AS ExpirationTime,
    NotificationHandler.CreatedTime AS HandlerCreated,
    NotificationHandler.ModifiedTime AS HandlerModified,
    CASE

    WHEN NotificationHandler.WNSId NOTNULL THEN
    NotificationHandler.WNSId ELSE &#x27;&#x27;
    END AS WNSId,
    CASE

    WHEN NotificationHandler.WNFEventName NOTNULL THEN
    NotificationHandler.WNFEventName ELSE &#x27;&#x27;
    END AS WNFEventName,
    CASE

    WHEN WNSPushChannel.ChannelId NOTNULL THEN
    WNSPushChannel.ChannelId ELSE &#x27;&#x27;
    END AS ChannelID,
    CASE

    WHEN WNSPushChannel.Uri NOTNULL THEN
    WNSPushChannel.Uri ELSE &#x27;&#x27;
    END AS URI,
    CASE

    WHEN WNSPushChannel.CreatedTime NOTNULL THEN
    datetime( ( WNSPushChannel.CreatedTime - 116444736000000000 ) / 10000000, &#x27;unixepoch&#x27; ) ELSE &#x27;&#x27;
    END AS WNSCreatedTime,
    CASE

    WHEN WNSPushChannel.ExpiryTime NOTNULL THEN
    datetime( ( WNSPushChannel.ExpiryTime - 116444736000000000 ) / 10000000, &#x27;unixepoch&#x27; ) ELSE &#x27;&#x27;
    END AS WNSExpirationTime,
    CASE

    WHEN hex( Notification.ActivityId ) = &#x27;00000000000000000000000000000000&#x27; THEN
    &#x27;&#x27; ELSE hex( Notification.ActivityId )
    END AS ActivityId
    FROM
    Notification
    JOIN NotificationHandler ON NotificationHandler.RecordId = Notification.HandlerId
    LEFT JOIN WNSPushChannel ON WNSPushChannel.HandlerId = NotificationHandler.RecordId
    ORDER BY
    Id DESC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows Notifications&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows Notifications
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;Notification&#x27; OR name=&#x27;HandlerAssets&#x27; OR name=&#x27;WNSPushChannel&#x27; OR name=&#x27;TransientTable&#x27; OR name=&#x27;NotificationData&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    NotificationHandler.PrimaryId AS PrimaryID,
    WNSPushChannel.ChannelId AS ChannelID,
    WNSPushChannel.HandlerId AS HandlerID,
    WNSPushChannel.Uri AS URI,
    datetime( ( WNSPushChannel.CreatedTime - 116444736000000000 ) / 10000000, &#x27;unixepoch&#x27; ) AS CreatedTime,
    datetime( ( WNSPushChannel.ExpiryTime - 116444736000000000 ) / 10000000, &#x27;unixepoch&#x27; ) AS ExpirationTime
    FROM
    WNSPushChannel
    JOIN NotificationHandler ON NotificationHandler.RecordId = WNSPushChannel.HandlerId
    ORDER BY
    CreatedTime ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows Notifications&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows Your Phone Contacts Database
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;contact&#x27; OR name=&#x27;contactdate&#x27; OR name=&#x27;contacturl&#x27; OR name=&#x27;emailaddress&#x27; OR name=&#x27;phonenumber&#x27; OR name=&#x27;postaladdress&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 6
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT DISTINCT
    contact.display_name AS DisplayName,
    contact.nickname AS Nickname,
    datetime( ( last_updated_time / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS LastUpdatedTimeUTC,
    contact.company AS Company,
    contact.job_title AS Title,
    contact.notes AS Notes,
    contact.name_prefix AS Prefix,
    contact.given_name AS GivenName,
    contact.middle_name AS MiddleName,
    contact.family_name AS FamilyName,
    contact.name_suffix AS Suffix,
    CASE

    WHEN contactdate.date_type = 1 THEN
    &#x27;Birthday&#x27;
    WHEN contactdate.date_type = 2 THEN
    &#x27;Anniversary&#x27;
    WHEN contactdate.date_type = 3 THEN
    &#x27;UserDefined&#x27; ELSE contactdate.date_type
    END AS DateType,
    contactdate.label AS DateLabel,
    contactdate.display_date AS DisplayDate,
    CASE

    WHEN contacturl.type = 1 THEN
    &#x27;HomePage&#x27;
    WHEN contacturl.type = 3 THEN
    &#x27;Work&#x27;
    WHEN contacturl.type = 5 THEN
    &#x27;Other&#x27;
    WHEN contacturl.type = 6 THEN
    &#x27;Blog/Profile/UserDefined&#x27; ELSE contacturl.type
    END AS URLType,
    contacturl.label AS URLLabel,
    contacturl.url_address AS URLAddress,
    CASE

    WHEN emailaddress.type = 1 THEN
    &#x27;Home&#x27;
    WHEN emailaddress.type = 2 THEN
    &#x27;Work&#x27;
    WHEN emailaddress.type = 4 THEN
    &#x27;Other&#x27;
    WHEN emailaddress.type = 5 THEN
    &#x27;UserDefined&#x27; ELSE emailaddress.type
    END AS EmailType,
    emailaddress.label AS EmailLabel,
    emailaddress.address AS EmailAddress,
    phonenumber.phone_number AS PhoneNumber,
    phonenumber.display_phone_number AS DisplayPhoneNumber,
    CASE

    WHEN phonenumber.phone_number_type = 1 THEN
    &#x27;Home&#x27;
    WHEN phonenumber.phone_number_type = 2 THEN
    &#x27;Mobile&#x27;
    WHEN phonenumber.phone_number_type = 3 THEN
    &#x27;Work&#x27;
    WHEN phonenumber.phone_number_type = 4 THEN
    &#x27;WorkMobile&#x27;
    WHEN phonenumber.phone_number_type = 5 THEN
    &#x27;Main&#x27;
    WHEN phonenumber.phone_number_type = 6 THEN
    &#x27;Other/HomeFax/WorkFax/Pager&#x27;
    WHEN phonenumber.phone_number_type = 8 THEN
    &#x27;UserDefined&#x27; ELSE phonenumber.phone_number_type
    END AS PhoneNumberType,
    phonenumber.label AS PhoneNumberLabel,
    CASE

    WHEN postaladdress.type = 1 THEN
    &#x27;Home&#x27;
    WHEN postaladdress.type = 2 THEN
    &#x27;Work&#x27;
    WHEN postaladdress.type = 4 THEN
    &#x27;Other&#x27;
    WHEN postaladdress.type = 5 THEN
    &#x27;UserDefined&#x27; ELSE postaladdress.type
    END AS PostalAddressType,
    postaladdress.label AS PostalAddressLabel,
    postaladdress.street AS PostalAddressStreet,
    postaladdress.city AS PostalAddressCity,
    postaladdress.region AS PostalAddressRegion,
    postaladdress.postal_code AS PostalAddressPostalCode,
    postaladdress.country_code AS PostalAddressCountryCode,
    postaladdress.display_address AS PostalAddressDisplayAddress
    FROM
    contact
    LEFT JOIN contactdate ON contact.contact_id = contactdate.contact_id
    LEFT JOIN contacturl ON contact.contact_id = contacturl.contact_id
    LEFT JOIN emailaddress ON contact.contact_id = emailaddress.contact_id
    LEFT JOIN phonenumber ON contact.contact_id = phonenumber.contact_id
    LEFT JOIN postaladdress ON contact.contact_id = postaladdress.contact_id
    ORDER BY
    contact.display_name ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows Your Phone Contacts Database&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows Your Phone Notifications Database
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;notifications&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    notifications.id AS &#x27;ID&#x27;,
    json_extract ( json, &#x27;$.appName&#x27; ) AS &#x27;Application&#x27;,
    datetime( json_extract ( json, &#x27;$.postTime&#x27; ) / 1000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS &#x27;PostTime&#x27;,
    datetime( json_extract ( json, &#x27;$.timestamp&#x27; ) / 1000, &#x27;unixepoch&#x27;, &#x27;localtime&#x27; ) AS &#x27;Timestamp&#x27;,
    json_extract ( json, &#x27;$.tickerText&#x27; ) AS &#x27;TickerText&#x27;,
    json_extract ( json, &#x27;$.title&#x27; ) AS &#x27;Title&#x27;,
    json_extract ( json, &#x27;$.bigText&#x27; ) AS &#x27;BigText&#x27;,
    json_extract ( json, &#x27;$.text&#x27; ) AS &#x27;Text&#x27;,
    json_extract ( json, &#x27;$.subText&#x27; ) AS &#x27;SubText&#x27;,
    CASE

    WHEN json_extract ( json, &#x27;$.isClearable&#x27; ) = 0 THEN
    &#x27;No&#x27;
    WHEN json_extract ( json, &#x27;$.isClearable&#x27; ) = 1 THEN
    &#x27;Yes&#x27;
    END AS &#x27;IsClearable&#x27;,
    CASE

    WHEN json_extract ( json, &#x27;$.isGroup&#x27; ) = 0 THEN
    &#x27;No&#x27;
    WHEN json_extract ( json, &#x27;$.isGroup&#x27; ) = 1 THEN
    &#x27;Yes&#x27;
    END AS &#x27;IsGroup&#x27;,
    CASE

    WHEN json_extract ( json, &#x27;$.isOngoing&#x27; ) = 0 THEN
    &#x27;No&#x27;
    WHEN json_extract ( json, &#x27;$.isOngoing&#x27; ) = 1 THEN
    &#x27;Yes&#x27;
    END AS &#x27;IsOngoing&#x27;,
    json_extract ( json, &#x27;$.category&#x27; ) AS &#x27;Category&#x27;,
    notifications.package_name AS &#x27;Package Name&#x27;,
    notifications.json AS &#x27;Payload&#x27;
    FROM
    notifications
    ORDER BY
    notifications.id ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows Your Phone Notifications Database&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows Your Phone Photos Database
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;media&#x27; OR name=&#x27;photo&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 2
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    media.id AS &#x27;Media ID&#x27;,
    media.mime_type AS &#x27;MIME Type&#x27;,
    media.name AS Name,
    datetime( ( last_updated_time / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS &#x27;Last Updated Time&#x27;,
    datetime( ( taken_time / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS &#x27;Taken Time&#x27;,
    datetime( ( last_seen_time / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS &#x27;Last Seen Time&#x27;,
    media.height AS Height,
    media.width AS Width,
    media.orientation AS Orientation,
    ( media.size / 1000.00 ) AS &#x27;Size (kb)&#x27;,
    media.uri AS URI
    FROM
    media
    ORDER BY
    media.id ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows Your Phone Photos Database&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows Your Phone Phone Database SMS Messages
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;message&#x27; OR name=&#x27;mms&#x27; OR name=&#x27;rcs_chat&#x27; OR name=&#x27;sync&#x27; OR name=&#x27;subscription&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
        message.message_id AS MessageID,
        message.thread_id AS ThreadID,
        datetime( ( &quot;timestamp&quot; / 10000000 ) - 11644473600, &#x27;unixepoch&#x27; ) AS Timestamp,
        message.from_address AS &quot;From&quot;,
    CASE

            WHEN message.type = 1 THEN
            &#x27;Received&#x27;
            WHEN message.type = 2 THEN
            &#x27;Sent&#x27; ELSE &#x27;Unknown&#x27;
        END AS Type,
        message.body AS Body
    FROM
        message
    ORDER BY
        message.thread_id ASC,
        message.timestamp ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows Your Phone Phone Database SMS Messages&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows Your Phone Subscription Info
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;message&#x27; OR name=&#x27;mms&#x27; OR name=&#x27;rcs_chat&#x27; OR name=&#x27;sync&#x27; OR name=&#x27;subscription&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 5
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    subscription.subscription_id AS SubscriptionID,
    subscription.sim_slot_index AS SimSlotIndex,
    subscription.country_iso AS CountryISO,
    subscription.name AS WirelessProviderName,
    CASE

    WHEN subscription.is_roaming = 0 THEN
    &#x27;No&#x27;
    WHEN subscription.is_roaming = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsRoaming,
    subscription.number AS PhoneNumber,
    CASE

    WHEN subscription.is_mms_enabled = 0 THEN
    &#x27;No&#x27;
    WHEN subscription.is_mms_enabled = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsMMSEnabled,
    CASE

    WHEN subscription.is_audio_attachment_allowed = 0 THEN
    &#x27;No&#x27;
    WHEN subscription.is_audio_attachment_allowed = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsAudioAttachmentAllowed,
    CASE

    WHEN subscription.is_multipart_sms_enabled = 0 THEN
    &#x27;No&#x27;
    WHEN subscription.is_multipart_sms_enabled = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsMultiPartSMSEnabled,
    CASE

    WHEN subscription.is_group_mms_enabled = 0 THEN
    &#x27;No&#x27;
    WHEN subscription.is_group_mms_enabled = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsGroupMMSEnabled,
    CASE

    WHEN subscription.should_send_multipart_sms_as_separate_messages = 0 THEN
    &#x27;No&#x27;
    WHEN subscription.should_send_multipart_sms_as_separate_messages = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS ShouldSendMultiPartSMSAsSeparateMessages,
    subscription.max_message_size AS &quot;MaxMessageSize (Bytes)&quot;,
    subscription.recipient_limit AS RecipientLimit,
    subscription.max_image_height AS MaxImageHeight,
    subscription.max_image_width AS MaxImageWidth,
    subscription.sms_multipart_to_mms_text_threshold AS SMSMultiParttoMMSTextThreshold,
    subscription.sms_to_mms_text_length_threshold AS SMStoMMSTextLengthThreshold,
    subscription.max_message_text_length AS MaxMessageTextLength,
    subscription.max_subject_length AS MaxSubjectLength,
    CASE

    WHEN subscription.is_default_data_subscription = 0 THEN
    &#x27;No&#x27;
    WHEN subscription.is_default_data_subscription = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsDefaultDataSubscription,
    CASE

    WHEN subscription.is_default_sms_subscription = 0 THEN
    &#x27;No&#x27;
    WHEN subscription.is_default_sms_subscription = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsDefaultSMSSubscription,
    CASE

    WHEN subscription.is_default_subscription = 0 THEN
    &#x27;No&#x27;
    WHEN subscription.is_default_subscription = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsDefaultSubscription,
    CASE

    WHEN subscription.is_default_voice_subscription = 0 THEN
    &#x27;No&#x27;
    WHEN subscription.is_default_voice_subscription = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsDefaultVoiceSubscription,
    CASE

    WHEN subscription.is_rcs_supported = 0 THEN
    &#x27;No&#x27;
    WHEN subscription.is_rcs_supported = 1 THEN
    &#x27;Yes&#x27; ELSE &#x27;Unknown&#x27;
    END AS IsRCSSupported,
    subscription.max_rcs_message_size AS &quot;MaxRCSMessageSize (Bytes)&quot;,
    subscription.max_rcs_file_size AS &quot;MaxRCSFileSize (Bytes)&quot;
    FROM
    subscription&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows Your Phone Subscription Info&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Windows Your Phone Settings Database
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;settings&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    phone_apps.app_name AS &#x27;Application Name&#x27;,
    phone_apps.package_name AS &#x27;Package Name&#x27;,
    phone_apps.version AS &#x27;Version&#x27;,
    settings.setting_group_id AS &#x27;GroupID&#x27;,
    CASE

    WHEN settings.setting_value = 1 THEN
    &#x27;On&#x27; ELSE &#x27;Off&#x27;
    END AS &#x27;Settings Value&#x27;,
    settings.setting_type AS &#x27;Settings Type&#x27;,
    settings.setting_key AS &#x27;Settings Key&#x27;,
    settings.setting_group_id AS &#x27;Group ID&#x27;
    FROM
    phone_apps
    LEFT JOIN settings ON settings.setting_key = phone_apps.package_name
    ORDER BY
    phone_apps.app_name ASC&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Windows Your Phone Settings Database&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Calls
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;ZCALLRECORD&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;select
    z_pk AS &quot;Call Sequence #&quot;,
    zaddress AS &quot;Phone Number&quot;,
    zduration AS &quot;Call in Seconds&quot;,
    case
    when zoriginated = 0 then &quot;Incoming&quot;
    when zoriginated = 1 then &quot;Outgoing&quot;
    end AS &quot;Call Direction&quot;,
    case
    when zanswered = 0 then &quot;Call Missed&quot;
    when zanswered = 1 then &quot;Call Answered&quot;
    end as &quot;Call Status&quot;,
    datetime(zdate+978307200,&#x27;unixepoch&#x27;,&#x27;localtime&#x27;) AS &quot;Timestamp&quot;
    from zcallrecord&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Calls&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

- name: Accounts
  query: |
    LET IdentifyQuery = &#x27;&#x27;&#x27;SELECT count(*) FROM sqlite_master WHERE type=&#x27;table&#x27; AND (name=&#x27;ZACCOUNT&#x27;);&#x27;&#x27;&#x27;
    LET IdentifyValue = 1
    LET SQLQuery = &#x27;&#x27;&#x27;SELECT
    Z_PK,
    ZACCOUNTTYPE AS &quot;Account Type&quot;,
    ZPARENTACCOUNT AS &quot;Parent Account&quot;,
    ZUSERNAME AS &quot;Username&quot;,
    DATETIME(ZDATE+978307200,&#x27;UNIXEPOCH&#x27;) AS &quot;TIMESTAMP&quot;,
    ZACCOUNTDESCRIPTION AS &quot;Account Description&quot;,
    ZIDENTIFIER AS &quot;Identifier&quot;,
    ZOWNINGBUNDLEID AS &quot;Bundle ID&quot;
    FROM ZACCOUNT&#x27;&#x27;&#x27;
    LET FileType = &#x27;&#x27;&#x27;Accounts&#x27;&#x27;&#x27;

    SELECT * FROM ApplyFile(
      SQLQuery=SQLQuery, FileType=FileType,
      IdentifyQuery=IdentifyQuery, IdentifyValue=IdentifyValue)

</code></pre>

