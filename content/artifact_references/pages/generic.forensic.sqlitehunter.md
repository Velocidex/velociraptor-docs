---
title: Generic.Forensic.SQLiteHunter
hidden: true
tags: [Client Artifact]
---

Hunt for SQLite files.

SQLite has become the de-facto standard for storing application data,
in many types of applications:

- Web Browsers
- Operating Systems
- Various applications, such as iMessage, TCC etc

This artifact can hunt for these artifacts in a mostly automated way.
More info at https://github.com/Velocidex/SQLiteHunter

NOTE: If you want to use this artifact on just a bunch of files already
collected (for example the files collected using the
Windows.KapeFiles.Targets artifact) you can use the CustomGlob parameter
(for example set it to "/tmp/unpacked/**" to consider all files in the
unpacked directory).


<pre><code class="language-yaml">

name: Generic.Forensic.SQLiteHunter
description: |
    Hunt for SQLite files.
    
    SQLite has become the de-facto standard for storing application data,
    in many types of applications:
    
    - Web Browsers
    - Operating Systems
    - Various applications, such as iMessage, TCC etc
    
    This artifact can hunt for these artifacts in a mostly automated way.
    More info at https://github.com/Velocidex/SQLiteHunter
    
    NOTE: If you want to use this artifact on just a bunch of files already
    collected (for example the files collected using the
    Windows.KapeFiles.Targets artifact) you can use the CustomGlob parameter
    (for example set it to "/tmp/unpacked/**" to consider all files in the
    unpacked directory).
    
    

column_types:
- name: Image
  type: preview_upload

export: |
  LET SPEC &lt;= "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"
  LET Specs &lt;= parse_json(data=gunzip(string=base64decode(string=SPEC)))
  LET CheckHeader(OSPath) = read_file(filename=OSPath, length=12) = "SQLite forma"
  LET Bool(Value) = if(condition=Value, then="Yes", else="No")

  -- In fast mode we check the filename, then the header then run the sqlite precondition
  LET matchFilename(SourceName, OSPath) = OSPath =~ get(item=Specs.sources, field=SourceName).filename
    AND CheckHeader(OSPath=OSPath)
    AND Identify(SourceName= SourceName, OSPath= OSPath)
    AND log(message=format(format="%v matched by filename %v",
            args=[OSPath, get(item=Specs.sources, field=SourceName).filename]))

  -- If the user wanted to also upload the file, do so now
  LET MaybeUpload(OSPath) = if(condition=AlsoUpload, then=upload(file=OSPath)) OR TRUE

  LET Identify(SourceName, OSPath) = SELECT if(
    condition=CheckHeader(OSPath=OSPath),
    then={
      SELECT *
      FROM sqlite(file=OSPath, query=get(item=Specs.sources, field=SourceName).id_query)
    }) AS Hits
  FROM scope()
  WHERE if(condition=Hits[0].Check = get(item=Specs.sources, field=SourceName).id_value,
    then= log(message="%v was identified as %v",
            args=[OSPath, get(item=Specs.sources, field=SourceName).Name]),
    else=log(message="%v was not identified as %v (got %v, wanted %v)",
             args=[OSPath, get(item=Specs.sources, field=SourceName).Name, str(str=Hits),
                   get(item=Specs.sources, field=SourceName).id_value]) AND FALSE)

  LET ApplyFile(SourceName) = SELECT * FROM foreach(row={
     SELECT OSPath FROM AllFiles
     WHERE if(condition=MatchFilename,  then=matchFilename(SourceName=SourceName, OSPath=OSPath),
      else=Identify(SourceName= SourceName, OSPath= OSPath))

  }, query={
     SELECT *, OSPath FROM sqlite(
        file=OSPath, query=get(item=Specs.sources, field=SourceName).SQL)
  })

  -- Filter for matching files without sqlite checks.
  LET FilterFile(SourceName) =
     SELECT OSPath FROM AllFiles
     WHERE if(condition=MatchFilename,
              then=OSPath =~ get(item=Specs.sources, field=SourceName).filename)

  -- Build a regex for all enabled categories.
  LET all_categories = SELECT _value FROM foreach(row=["All","MacOS","Chrome","Browser","Edge","Firefox","InternetExplorer","Windows"]) WHERE get(field=_value)
  LET category_regex &lt;= join(sep="|", array=all_categories._value)
  LET AllGlobs &lt;= filter(list=Specs.globs, condition="x=&gt; x.tags =~ category_regex")
  LET _ &lt;= log(message="Globs for category %v is %v", args=[category_regex, CustomGlob || AllGlobs.glob])
  LET AllFiles &lt;= SELECT OSPath FROM glob(globs=CustomGlob || AllGlobs.glob)
    WHERE NOT IsDir AND MaybeUpload(OSPath=OSPath)

parameters:
- name: MatchFilename
  description: |
    If set we use the filename to detect the type of sqlite file.
    When unset we use heristics (slower)
  type: bool
  default: Y

- name: CustomGlob
  description: Specify this glob to select other files

- name: DateAfter
  description: Timebox output to rows after this time.
  type: timestamp
  default: "1970-01-01T00:00:00Z"

- name: DateBefore
  description: Timebox output to rows after this time.
  type: timestamp
  default: "2100-01-01T00:00:00Z"

- name: FilterRegex
  description: Filter critical rows by this regex
  type: regex
  default: .


- name: All
  description: Select targets with category All
  type: bool
  default: Y


- name: MacOS
  description: Select targets with category MacOS
  type: bool
  default: N


- name: Chrome
  description: Select targets with category Chrome
  type: bool
  default: N


- name: Browser
  description: Select targets with category Browser
  type: bool
  default: N


- name: Edge
  description: Select targets with category Edge
  type: bool
  default: N


- name: Firefox
  description: Select targets with category Firefox
  type: bool
  default: N


- name: InternetExplorer
  description: Select targets with category InternetExplorer
  type: bool
  default: N


- name: Windows
  description: Select targets with category Windows
  type: bool
  default: N


- name: SQLITE_ALWAYS_MAKE_TEMPFILE
  type: bool
  default: Y

- name: AlsoUpload
  description: If specified we also upload the identified file.
  type: bool

sources:
- name: AllFiles
  query: |
    SELECT * FROM AllFiles


- name: iMessage_Profiles
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="iMessage_Profiles")
    SELECT timestamp(epoch=date / 1000000000 + 978307200) AS Timestamp, *
    FROM Rows
    WHERE Timestamp &gt; DateAfter AND Timestamp &lt; DateBefore
      AND (MessageText, RoomName) =~ FilterRegex
    


- name: Chromium Browser Autofill_Profiles
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Chromium Browser Autofill_Profiles")
    SELECT GUID,
      timestamp(epoch= date_modified) AS DateModified,
      timestamp(epoch= use_date) AS UseDate,
      FirstName, MiddleName, LastName, EmailAddress,
      PhoneNumber, CompanyName, StreetAddress,
      City, State, ZipCode, UseCount, OSPath
    FROM Rows
    WHERE UseDate &gt; DateAfter AND UseDate &lt; DateBefore
      AND (FirstName, MiddleName, LastName, EmailAddress, CompanyName, StreetAddress) =~ FilterRegex
    


- name: Chromium Browser Autofill_Masked Credit Cards
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Chromium Browser Autofill_Masked Credit Cards")
    SELECT * FROM Rows


- name: Chromium Browser Bookmarks
  query: |
    LET Rows = SELECT * FROM FilterFile(SourceName="Chromium Browser Bookmarks")
    -- Recursive function to report the details of a folder
    LET ReportFolder(Data, BaseName) = SELECT * FROM chain(a={
      -- First row emit the data about the actual folder
      SELECT BaseName + " | " + Data.name AS Name,
             timestamp(winfiletime=int(int=Data.date_added) * 10) AS DateAdded,
             timestamp(winfiletime=int(int=Data.date_last_used) * 10) AS DateLastUsed,
             Data.type AS Type,
             Data.url || ""  AS URL
      FROM scope()
    },
    b={
       -- If this folder has children recurse into it
       SELECT * FROM foreach(row={
          SELECT _value FROM items(item=Data.children)
       },  query={
          SELECT * FROM ReportFolder(Data=_value, BaseName=BaseName + " | " + Data.name)
       })
    })
    
    LET MatchingFiles = SELECT OSPath, parse_json(data=read_file(filename=OSPath)) AS Data
    FROM Rows
    
    SELECT * FROM foreach(row=MatchingFiles, query={
      SELECT * FROM chain(
      a={
        SELECT OSPath, *, "bookmark_bar" AS Type
        FROM ReportFolder(Data=Data.roots.bookmark_bar, BaseName="")
      },
      b={
        SELECT OSPath, *, "other" AS Type
        FROM ReportFolder(Data=Data.roots.other, BaseName="")
      },
      c={
        SELECT OSPath, *, "synced" AS Type
        FROM ReportFolder(Data=Data.roots.synced, BaseName="")
      })
    })
    


- name: Chromium Browser_Cookies
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Chromium Browser_Cookies")
    SELECT timestamp(winfiletime=(creation_utc * 10) || 0) AS CreationUTC,
           timestamp(winfiletime=(expires_utc * 10) || 0) AS ExpiresUTC,
           timestamp(winfiletime=(last_access_utc * 10) || 0) AS LastAccessUTC,
           HostKey, Name, Path,
           Bool(Value=is_secure) AS IsSecure,
           Bool(Value=is_httponly) AS IsHttpOnly,
           Bool(Value=has_expires) AS HasExpiration,
           Bool(Value=is_persistent) AS IsPersistent,
           Priority, SourcePort, OSPath
    FROM Rows
    WHERE LastAccessUTC &gt; DateAfter AND LastAccessUTC &lt; DateBefore
      AND (Name, Path) =~ FilterRegex
    


- name: Chromium Browser Extensions
  query: |
    LET Rows = SELECT * FROM FilterFile(SourceName="Chromium Browser Extensions")
    -- Resolve the message string against the Locale dict
    LET ResolveName(Message, Locale) = get(item=Locale,
          field=lowcase(string=parse_string_with_regex(regex="^__MSG_(.+)__$", string=Message).g1),
          default=Message).message || Message
    
    -- Read the manifest files
    LET ManifestData = SELECT OSPath, parse_json(data=read_file(filename=OSPath)) AS Manifest
    FROM Rows
    
    -- Find the Locale file to help with.
    LET LocaleData = SELECT *, if(condition=Manifest.default_locale, else=dict(),
         then=parse_json(data=read_file(
            filename=OSPath.Dirname + "_locales" + Manifest.default_locale + "messages.json"))) AS Locale
    FROM ManifestData
    
    LET GetIcon(Manifest) = Manifest.icons.`128` || Manifest.icons.`64` || Manifest.icons.`32` || Manifest.icons.`16`
    
    SELECT OSPath, Manifest.author.email AS Email,
      ResolveName(Message = Manifest.name, Locale=Locale) AS name,
      ResolveName(Message = Manifest.description, Locale=Locale) AS description,
      Manifest.oauth2.scopes as Scopes,
      Manifest.permissions as Permissions,
      Manifest.key as Key, if(condition=GetIcon(Manifest=Manifest),
                then=upload(file=OSPath.Dirname + GetIcon(Manifest=Manifest))) AS Image,
      Manifest AS _Manifest
    FROM LocaleData
    WHERE (name, description) =~ FilterRegex
    


- name: Chromium Browser Favicons
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Chromium Browser Favicons")
    SELECT ID, IconID,
      timestamp(winfiletime= (LastUpdated * 10) || 0) AS LastUpdated,
      PageURL, FaviconURL,
      upload(accessor="data",
         file=_image,
         name=format(format="Image%v.png", args=ID)) AS Image,
      OSPath as _OSPath
    FROM Rows
    WHERE LastUpdated &gt; DateAfter AND LastUpdated &lt; DateBefore
    


- name: Chromium Browser History_Visits
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Chromium Browser History_Visits")
    SELECT ID,
       timestamp(winfiletime=(visit_time * 10) || 0) AS VisitTime,
       timestamp(winfiletime=(last_visit_time * 10) || 0) AS LastVisitedTime,
       URLTitle, URL, VisitCount, TypedCount,
       if(condition=hidden =~ '1', then="Yes", else="No") AS Hidden,
       VisitID, FromVisitID,
       visit_duration / 1000000 AS VisitDurationInSeconds,
       OSPath
    FROM Rows
    WHERE VisitTime &gt; DateAfter
      AND VisitTime &lt; DateBefore
      AND (URLTitle, URL) =~ FilterRegex
    


- name: Chromium Browser History_Downloads
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Chromium Browser History_Downloads")
    LET StateLookup &lt;= dict(`0`='In Progress', `1`='Complete', `2`="Cancelled", `3`="Interrupted", `4`="Interrupted")
    LET DangerType &lt;= dict(`0`='Not Dangerous', `1`="Dangerous", `2`='Dangerous URL', `3`='Dangerous Content',
        `4`='Content May Be Malicious', `5`='Uncommon Content', `6`='Dangerous But User Validated',
        `7`='Dangerous Host', `8`='Potentially Unwanted', `9`='Whitelisted by Policy')
    LET InterruptReason &lt;= dict(`0`= 'No Interrupt', `1`= 'File Error', `2`='Access Denied', `3`='Disk Full',
      `5`='Path Too Long',`6`='File Too Large', `7`='Virus', `10`='Temporary Problem', `11`='Blocked',
      `12`='Security Check Failed', `13`='Resume Error', `20`='Network Error', `21`='Operation Timed Out',
      `22`='Connection Lost', `23`='Server Down', `30`='Server Error', `31`='Range Request Error',
      `32`='Server Precondition Error', `33`='Unable to get file', `34`='Server Unauthorized',
      `35`='Server Certificate Problem', `36`='Server Access Forbidden', `37`='Server Unreachable',
      `38`='Content Length Mismatch', `39`='Cross Origin Redirect', `40`='Cancelled', `41`='Browser Shutdown',
      `50`='Browser Crashed')
    
    SELECT ID, GUID, CurrentPath, TargetPath, OriginalMIMEType, ReceivedBytes, TotalBytes,
      timestamp(winfiletime=(start_time * 10) || 0) AS StartTime,
      timestamp(winfiletime=(end_time * 10) || 0) AS EndTime,
      timestamp(winfiletime=(opened * 10) || 0) AS Opened,
      timestamp(winfiletime=(last_access_time * 10) || 0) AS LastAccessTime,
      timestamp(epoch=last_modified) AS LastModified,
      get(item=StateLookup, field=str(str=state), default="Unknown") AS State,
      get(item=DangerType, field=str(str=danger_type), default="Unknown") AS DangerType,
      get(item=InterruptReason, field=str(str=interrupt_reason), default="Unknown") AS InterruptReason,
      ReferrerURL, SiteURL, TabURL, TabReferrerURL, DownloadURL, OSPath
    FROM Rows
    WHERE LastAccessTime &gt; DateAfter AND LastAccessTime &lt; DateBefore
      AND (SiteURL, DownloadURL, TabURL, TabReferrerURL, ReferrerURL, DownloadURL) =~ FilterRegex
    


- name: Chromium Browser History_Keywords
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Chromium Browser History_Keywords")
    SELECT KeywordID, URLID,
       timestamp(winfiletime=(last_visit_time * 10) || 0) AS LastVisitedTime,
       KeywordSearchTerm, Title, URL, OSPath
    FROM Rows
    WHERE LastVisitedTime &gt; DateAfter AND LastVisitedTime &lt; DateBefore
      AND (Title, KeywordSearchTerm, URL) =~ FilterRegex
    


- name: Chromium Browser Media_History
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Chromium Browser Media_History")
    SELECT ID, URL, WatchTimeSeconds,
       Bool(Value=has_video) AS HasVideo,
       Bool(Value=has_audio) AS HasAudio,
       timestamp(winfiletime=last_updated_time_s || 0) AS LastUpdated,
       OriginID, OSPath
    FROM Rows
    WHERE LastUpdated &gt; DateAfter AND LastUpdated &lt; DateBefore
      AND URL =~ FilterRegex
    


- name: Chromium Browser Media_Playback Session
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Chromium Browser Media_Playback Session")
    SELECT ID,
      timestamp(winfiletime=last_updated_time_s || 0) AS LastUpdated, URL,
      duration_ms / 1000 AS DurationInSeconds,
      position_ms / 1000 AS PositionInSeconds,
      Title, Artist, Album, SourceTitle, OriginID, OSPath
    FROM Rows
    WHERE LastUpdated &gt; DateAfter AND LastUpdated &lt; DateBefore
      AND URL =~ FilterRegex
    


- name: Chromium Browser Network_Predictor
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Chromium Browser Network_Predictor")
    SELECT * FROM Rows
    WHERE UserText =~ FilterRegex
    


- name: Chromium Browser Notifications_Site Engagements
  query: |
    LET Rows = SELECT * FROM FilterFile(SourceName="Chromium Browser Notifications_Site Engagements")
    LET JSON = SELECT parse_json(data=read_file(filename=OSPath)) AS Data, OSPath FROM Rows
    
    SELECT * FROM foreach(row={
      SELECT OSPath, Data.profile.content_settings.exceptions AS exceptions FROM JSON
    },  query={
      SELECT _key AS Site,
         timestamp(winfiletime=int(int=_value.last_modified) * 10 || 0) AS LastModified,
         timestamp(winfiletime=int(int=_value.setting.lastEngagementTime) * 10 || 0) AS LastEngagementTime,
         OSPath
      FROM items(item=exceptions.site_engagement)
    })
    


- name: Chromium Browser Notifications_App Banners
  query: |
    LET Rows = SELECT * FROM FilterFile(SourceName="Chromium Browser Notifications_App Banners")
    LET JSON = SELECT parse_json(data=read_file(filename=OSPath)) AS Data, OSPath FROM Rows
    
    SELECT * FROM foreach(row={
      SELECT OSPath, Data.profile.content_settings.exceptions AS exceptions FROM JSON
    },  query={
      SELECT _key AS Site,
         timestamp(winfiletime=int(int=_value.last_modified) * 10 || 0) AS LastModified,
         {
           SELECT _key AS Site,
              timestamp(winfiletime=int(int=_value.couldShowBannerEvents) * 10 || 0) AS CouldShowBannerEvents,
              timestamp(winfiletime=int(int=_value.next_install_text_animation.last_shown) * 10 || 0) AS LastShown
           FROM items(item=_value.setting)
         } AS Setting,
         OSPath
      FROM items(item=exceptions.app_banner)
    })
    


- name: Chromium Browser Notifications_Notification Preferences
  query: |
    LET Rows = SELECT * FROM FilterFile(SourceName="Chromium Browser Notifications_Notification Preferences")
    LET ContentSettings &lt;= array(`0`="Default",`1`="Allow",`2`="Block",`3`="Ask",`4`="Session Only",`5`="Detect Important Content")
    
    LET JSON = SELECT parse_json(data=read_file(filename=OSPath)) AS Data, OSPath FROM Rows
    
    SELECT * FROM foreach(row={
      SELECT OSPath, Data.profile.content_settings.exceptions AS exceptions FROM JSON
    },  query={
      SELECT _key AS Site,
        timestamp(winfiletime=int(int=_value.last_modified) * 10 || 0) AS LastModified,
        ContentSettings[_value.setting] AS Setting,
        OSPath
      FROM items(item=exceptions.notifications)
    })
    


- name: Chromium Browser Notifications_Notification Interactions
  query: |
    LET Rows = SELECT * FROM FilterFile(SourceName="Chromium Browser Notifications_Notification Interactions")
    LET JSON = SELECT parse_json(data=read_file(filename=OSPath)) AS Data, OSPath FROM Rows
    LET S = scope()
    
    SELECT * FROM foreach(row={
      SELECT OSPath, Data.profile.content_settings.exceptions AS exceptions FROM JSON
    },  query={
      SELECT _key AS URL,
        timestamp(winfiletime=int(int=_value.last_modified) * 10 || 0) AS LastModified,
        _value.display_count as DisplayCount,
        _value.click_count as ClickCount,
        OSPath
      FROM items(item=S.notification_interactions || dict())
    })
    


- name: Chromium Browser Shortcuts
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Chromium Browser Shortcuts")
    SELECT ID,
      timestamp(winfiletime= (last_access_time * 10) || 0) AS LastAccessTime,
      TextTyped, FillIntoEdit, URL, Contents,
      Description, Type, Keyword, TimesSelectedByUser, OSPath
    FROM Rows
    WHERE LastAccessTime &gt; DateAfter AND LastAccessTime &lt; DateBefore
      AND (Contents, Description) =~ FilterRegex
    


- name: Chromium Sessions_Sessions
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Chromium Sessions_Sessions")
    SELECT timestamp(winfiletime=(creation_utc * 10) || 0) AS CreationUTC,
           timestamp(winfiletime=(expires_utc * 10) || 0) AS ExpiresUTC,
           timestamp(winfiletime=(last_access_utc * 10) || 0) AS LastAccessUTC,
           HostKey, Name, Path,
           Bool(Value=is_secure) AS IsSecure,
           Bool(Value=is_httponly) AS IsHttpOnly,
           Bool(Value=has_expires) AS HasExpiration,
           Bool(Value=is_persistent) AS IsPersistent,
           Priority, SourcePort, OSPath
    FROM Rows
    WHERE LastAccessUTC &gt; DateAfter AND LastAccessUTC &lt; DateBefore
      AND (Name, Path) =~ FilterRegex
    


- name: Chromium Browser Top Sites
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Chromium Browser Top Sites")
    SELECT * FROM Rows
    WHERE ( URL =~ FilterRegex OR Title =~ FilterRegex )
    


- name: Edge Browser Navigation History_Navigation History
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Edge Browser Navigation History_Navigation History")
    SELECT ID,
       timestamp(epoch=`Last Visited Time`) AS `Last Visited Time`,
       Title, URL, VisitCount, OSPath
    FROM Rows
    WHERE `Last Visited Time` &gt; DateAfter
      AND `Last Visited Time` &lt; DateBefore
      AND (Title, URL) =~ FilterRegex
    


- name: Firefox Places
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Firefox Places")
    LET BookmarkTypes &lt;= dict(`1`="URL", `2`="Folder", `3`="Separator")
    SELECT ID, ParentID,
       get(item= BookmarkTypes, field=str(str=type), default="Unknown") AS Type,
       timestamp(epoch=dateAdded) AS DateAdded,
       timestamp(epoch=lastModified) AS LastModified,
       Position, Title, URL, ForeignKey, OSPath
    FROM Rows
    WHERE LastModified &gt; DateAfter AND LastModified &lt; DateBefore
      AND (Title, URL) =~ FilterRegex
    


- name: Firefox Places_Downloads
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Firefox Places_Downloads")
    SELECT PlaceID, Content,
       timestamp(epoch=dateAdded) AS DateAdded,
       timestamp(epoch=lastModified) AS LastModified,
       OSPath
    FROM Rows
    WHERE LastModified &gt; DateAfter AND LastModified &lt; DateBefore
      AND Content =~ FilterRegex
    


- name: Firefox Places_History
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Firefox Places_History")
    LET VisitType &lt;= dict(`1`='TRANSITION_LINK', `2`='TRANSITION_TYPED', `3`='TRANSITION_BOOKMARK',
      `4`='TRANSITION_EMBED', `5`= 'TRANSITION_REDIRECT_PERMANENT', `6`='TRANSITION_REDIRECT_TEMPORARY',
      `7`='TRANSITION_DOWNLOAD', `8`='TRANSITION_FRAMED_LINK', `9`='TRANSITION_RELOAD')
    
    SELECT VisitID, FromVisitID,
       timestamp(epoch= last_visit_date) AS LastVisitDate,
       VisitCount, URL, Title, Description,
       get(item= VisitType, field=str(str=visit_type), default="Unknown") AS VisitType,
       Bool(Value=hidden) AS Hidden,
       Bool(Value=typed) AS Typed,
       Frecency, PreviewImageURL, OSPath
    FROM Rows
    WHERE LastVisitDate &gt; DateAfter AND LastVisitDate &lt; DateBefore
      AND (Title, URL, Description) =~ FilterRegex
    


- name: Firefox Cookies
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Firefox Cookies")
    SELECT ID, Host, Name, Value,
       timestamp(epoch= creationTime) AS CreationTime,
       timestamp(epoch= lastAccessed) AS LastAccessedTime,
       timestamp(epoch= expiry) AS Expiration,
       Bool(Value= isSecure) AS IsSecure,
       Bool(Value= isHttpOnly) AS IsHTTPOnly, OSPath
    FROM Rows
    WHERE LastAccessedTime &gt; DateAfter
      AND LastAccessedTime &lt; DateBefore
      AND ( Name =~ FilterRegex OR Value =~ FilterRegex )
    


- name: Firefox Downloads
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Firefox Downloads")
    SELECT ID, Name, MIMEType, Source, Target,
       timestamp(epoch= startTime) AS StartTime,
       timestamp(epoch= endTime) AS EndTime,
       timestamp(epoch= expiry) AS Expiration,
       CurrentBytes, MaxBytes, OSPath
    FROM Rows
    WHERE StartTime &gt; DateAfter
      AND StartTime &lt; DateBefore
      AND Name =~ FilterRegex
    


- name: Firefox Favicons
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Firefox Favicons")
    SELECT ID, PageURL, FaviconURL,
       timestamp(epoch= expire_ms) AS Expiration,
       OSPath
    FROM Rows
    


- name: Firefox Form History
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Firefox Form History")
    SELECT ID, FieldName, Value, TimesUsed,
       timestamp(epoch= firstUsed) AS FirstUsed,
       timestamp(epoch= lastUsed) AS LastUsed,
       GUID, OSPath
    FROM Rows
    WHERE LastUsed &gt; DateAfter AND LastUsed &lt; DateBefore
      AND ( FieldName =~ FilterRegex OR Value =~ FilterRegex )
    


- name: IE or Edge WebCacheV01_All Data
  query: |
    LET Rows = SELECT * FROM FilterFile(SourceName="IE or Edge WebCacheV01_All Data")
    LET MatchingFiles = SELECT OSPath FROM Rows
    
    LET Containers(OSPath) = SELECT Table
    FROM parse_ese_catalog(file=OSPath)
    WHERE Table =~ "Container_"
    GROUP BY Table
    
    LET AllHits(OSPath) = SELECT * FROM foreach(row={
        SELECT * FROM Containers(OSPath=OSPath)
    }, query={
       SELECT timestamp(winfiletime=ExpiryTime) AS ExpiryTime,
          timestamp(winfiletime=ModifiedTime) AS ModifiedTime,
          timestamp(winfiletime=AccessedTime) AS AccessedTime, Url, *
       FROM parse_ese(file=OSPath, table=Table)
    })
    
    SELECT * FROM foreach(row=MatchingFiles, query={
      SELECT * FROM AllHits(OSPath=OSPath)
    })
    WHERE AccessedTime &gt; DateAfter AND AccessedTime &lt; DateBefore
      AND Url =~ FilterRegex
    


- name: IE or Edge WebCacheV01_Highlights
  query: |
    LET Rows = SELECT * FROM FilterFile(SourceName="IE or Edge WebCacheV01_Highlights")
    SELECT * FROM foreach(row=MatchingFiles, query={
      SELECT AccessedTime, ModifiedTime, ExpiryTime, Url
      FROM AllHits(OSPath=OSPath)
    })
    WHERE AccessedTime &gt; DateAfter AND AccessedTime &lt; DateBefore
      AND Url =~ FilterRegex
    


- name: MacOS Applications Cache
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="MacOS Applications Cache")
    SELECT
       time_stamp AS Timestamp,
       OSPath.Base AS Application,
       entry_ID AS EntryID,
       version AS Version,
       hash_value AS Hash,
       storage_policy AS StoragePolicy,
       request_key AS URL,
       plist(file=request_object, accessor="data") AS Request,
       plist(file=response_object, accessor="data") AS Response,
       partition AS Partition,
       OSPath
    FROM Rows
    WHERE Timestamp &gt; DateAfter AND Timestamp &lt; DateBefore
      AND Application =~ FilterRegex
    


- name: MacOS NetworkUsage
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="MacOS NetworkUsage")
    SELECT timestamp(epoch= ZTIMESTAMP + 978307200) AS Timestamp,
      timestamp(epoch= ZFIRSTTIMESTAMP + 978307200) AS FirstTimestamp,
      timestamp(epoch= LIVE_USAGE_TIMESTAMP + 978307200) AS LiveUsageTimestamp,
      ZBUNDLENAME AS BundleID,
      ZPROCNAME AS ProcessName,
      ZWIFIIN AS WifiIn,
      ZWIFIOUT AS WifiOut,
      ZWWANIN AS WanIn,
      ZWWANOUT AS WandOut,
      ZWIREDIN AS WiredIn,
      ZWIREDOUT AS WiredOut,
      ZXIN AS _XIn,
      ZXOUT AS _XOut,
      Z_PK AS LiveUsageTableID
    FROM Rows
    


- name: MacOS Notes
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="MacOS Notes")
    SELECT Key AS _Key,
     OSPath[1] AS User,
     Note,
     Title,
     Snippet,
     NoteID AS _NoteID,
     timestamp(cocoatime=CreatedTS) AS CreatedTime,
     timestamp(cocoatime=LastOpenedDate) AS LastOpenedTime,
     timestamp(cocoatime=DirModificationDate) AS LastDirModifcation,
     Account AS _Account,
     Directory,
     DirectoryID,
     AttachmentName,
     AttachmentSize,
     AttachmentUUID,
     if(condition=AttachmentUUID,
        then=OSPath[:2] + '/Library/Group Containers/group.com.apple.notes/Accounts/LocalAccount/Media/' + AttachmentUUID + '/' + AttachmentName) AS AttachmentLocation,
     AccountName AS _AccountName,
     AccountID AS _AccountID,
     AccountType AS _AccountType,
     gunzip(string=Data) AS Data,
     OSPath
    FROM Rows
    WHERE LastOpenedTime &gt; DateAfter AND LastOpenedTime &lt; DateBefore
      AND ( Title =~ FilterRegex OR Data =~ FilterRegex )
    


- name: MacOS XProtect Detections
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="MacOS XProtect Detections")
    SELECT *
    FROM Rows
    WHERE dt &gt; DateAfter
      AND dt &lt; DateBefore
      AND (violated_rule, exec_path, responsible_path, responsible_signing_id,
        exec_cdhash, exec_sha256, responsible_cdhash, responsible_sha256 ) =~ FilterRegex
    


- name: Windows Activities Cache_ActivityPackageId
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Windows Activities Cache_ActivityPackageId")
    SELECT format(format="%0X-%0X-%0X-%0X-%0X", args=[
      ActivityId[0:4], ActivityId[4:6], ActivityId[6:8],
      ActivityId[8:10], ActivityId[10:] ]) AS ActivityId,
      Platform, PackageName, ExpirationTime, OSPath
    FROM Rows
    


- name: Windows Activities Cache_Clipboard
  query: |
    LET Rows = SELECT * FROM ApplyFile(SourceName="Windows Activities Cache_Clipboard")
    SELECT
      CreatedTime,
      timestamp(epoch=LastModifiedTime) AS LastModifiedTime,
      timestamp(epoch=LastModifiedOnClient) AS LastModifiedOnClient,
      StartTime,
      EndTime,
      Payload,
      OSPath[1] AS User,
      base64decode(string=parse_json_array(data=ClipboardPayload)[0].content) AS ClipboardPayload,
      OSPath AS Path,
      Mtime
    FROM Rows
    WHERE StartTime &gt; DateAfter
      AND StartTime &lt; DateBefore
      AND ClipboardPayload =~ FilterRegex
    


- name: Windows Search Service_SystemIndex_Gthr
  query: |
    LET Rows = SELECT * FROM FilterFile(SourceName="Windows Search Service_SystemIndex_Gthr")
    LET MatchingFiles = SELECT OSPath FROM Rows
    
    LET FormatTimeB(T) = timestamp(winfiletime=parse_binary(
       filename=T, accessor="data", struct="uint64b"))
    
    LET FormatTime(T) = timestamp(winfiletime=parse_binary(
       filename=T, accessor="data", struct="uint64"))
    
    LET FormatSize(T) = parse_binary(
       filename=T, accessor="data", struct="uint64")
    
    SELECT * FROM foreach(row=MatchingFiles, query={
       SELECT ScopeID, DocumentID, SDID,
          FormatTimeB(T=LastModified) AS LastModified,
          FileName
       FROM parse_ese(file=OSPath, table= "SystemIndex_Gthr")
    })
    WHERE LastModified &gt; DateAfter AND LastModified &lt; DateBefore
      AND FileName =~ FilterRegex
    


- name: Windows Search Service_SystemIndex_GthrPth
  query: |
    LET Rows = SELECT * FROM FilterFile(SourceName="Windows Search Service_SystemIndex_GthrPth")
    SELECT * FROM foreach(row=MatchingFiles, query={
       SELECT Scope, Parent, Name
       FROM parse_ese(file=OSPath, table= "SystemIndex_GthrPth")
    })
    WHERE Name =~ FilterRegex
    


- name: Windows Search Service_SystemIndex_PropertyStore
  query: |
    LET Rows = SELECT * FROM FilterFile(SourceName="Windows Search Service_SystemIndex_PropertyStore")
    LET X = scope()
    
    -- The PropertyStore columns look like
    -- &lt;random&gt;-ProperName so we strip the
    -- random part off to display it properly.
    LET FilterDict(Dict) = to_dict(item={
      SELECT split(sep_string="-", string=_key)[1] || _key AS _key, _value
      FROM items(item=Dict)
    })
    
    LET PropStore(OSPath) = SELECT *,
       FormatTime(T=X.System_Search_GatherTime) AS System_Search_GatherTime,
       FormatSize(T=X.System_Size) AS System_Size,
       FormatTime(T=X.System_DateModified) AS System_DateModified,
       FormatTime(T=X.System_DateAccessed) AS System_DateAccessed,
       FormatTime(T=X.System_DateCreated) AS System_DateCreated
    FROM foreach(row={
       SELECT *, FilterDict(Dict=_value) AS _value
       FROM items(item={
         SELECT * FROM parse_ese(file=OSPath, table="SystemIndex_PropertyStore")
      })
    }, column="_value")
    
    SELECT * FROM foreach(row=MatchingFiles, query={
       SELECT *
       FROM PropStore(OSPath=OSPath)
    })
    WHERE System_DateAccessed &gt; DateAfter AND System_DateAccessed &lt; DateBefore
    


- name: Windows Search Service_SystemIndex_PropertyStore_Highlights
  query: |
    LET Rows = SELECT * FROM FilterFile(SourceName="Windows Search Service_SystemIndex_PropertyStore_Highlights")
    SELECT * FROM foreach(row=MatchingFiles, query={
       SELECT WorkID,
          System_Search_GatherTime,
          System_Size,
          System_DateModified,
          System_DateCreated,
          X.System_FileOwner AS System_FileOwner,
          X.System_ItemPathDisplay AS System_ItemPathDisplay,
          X.System_ItemType AS System_ItemType,
          X.System_FileAttributes AS System_FileAttributes,
          X.System_Search_AutoSummary AS System_Search_AutoSummary
       FROM PropStore(OSPath=OSPath)
    })
    WHERE System_DateAccessed &gt; DateAfter AND System_DateAccessed &lt; DateBefore
    


- name: Windows Search Service_BrowsingActivity
  query: |
    LET Rows = SELECT * FROM FilterFile(SourceName="Windows Search Service_BrowsingActivity")
    SELECT * FROM foreach(row=MatchingFiles, query={
       SELECT X.ItemPathDisplay AS ItemPathDisplay,
          X.Activity_ContentUri AS Activity_ContentUri,
          X.Activity_Description AS Activity_Description
       FROM PropStore(OSPath=OSPath)
       WHERE Activity_ContentUri
    })
    


- name: Windows Search Service_UserActivityLogging
  query: |
    LET Rows = SELECT * FROM FilterFile(SourceName="Windows Search Service_UserActivityLogging")
    SELECT * FROM foreach(row=MatchingFiles, query={
       SELECT X.System_ItemPathDisplay AS System_ItemPathDisplay,
           FormatTime(T=X.ActivityHistory_StartTime) AS ActivityHistory_StartTime,
           FormatTime(T=X.ActivityHistory_EndTime) AS ActivityHistory_EndTime,
           X.ActivityHistory_AppId AS ActivityHistory_AppId
       FROM PropStore(OSPath=OSPath)
       WHERE ActivityHistory_AppId
    })
    WHERE ActivityHistory_StartTime &gt; DateAfter
      AND ActivityHistory_StartTime &lt; DateBefore
    




</code></pre>

