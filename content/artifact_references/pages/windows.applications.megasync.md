---
title: Windows.Applications.MegaSync
hidden: true
tags: [Client Artifact]
---

This artifact will parse MEGASync logs and enables using regex to search for
entries of interest.

With UploadLogs selected a copy of the logs are uploaded to the server.
SearchVSS enables search over VSS and dedup support.


<pre><code class="language-yaml">
name: Windows.Applications.MegaSync
description: |
  This artifact will parse MEGASync logs and enables using regex to search for
  entries of interest.

  With UploadLogs selected a copy of the logs are uploaded to the server.
  SearchVSS enables search over VSS and dedup support.

author: &quot;Matt Green - @mgreen27&quot;

reference:
  - https://attack.mitre.org/techniques/T1567/002/

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
  - name: LogFiles
    default: &#x27;C:\Users\*\AppData\Local\Mega Limited\MEGAsync\logs\*.log&#x27;
  - name: SearchRegex
    description: &quot;Regex of strings to search in line.&quot;
    default: &#x27;Transfer\s\(UPLOAD\)|upload\squeue|local\sfile\saddition\sdetected|Sync\s-\ssending\sfile|\&quot;user\&quot;&#x27;
    type: regex
  - name: WhitelistRegex
    description: &quot;Regex of strings to leave out of output.&quot;
    default:
    type: regex

  - name: VSSAnalysisAge
    type: int
    default: 0
    description: |
      If larger than zero we analyze VSS within this many days
      ago. (e.g 7 will analyze all VSS within the last week).  Note
      that when using VSS analysis we have to use the ntfs accessor
      for everything which will be much slower.

  - name: UploadLogs
    description: &quot;Upload MEGASync logs.&quot;
    type: bool

sources:
  - query: |
      LET VSS_MAX_AGE_DAYS &lt;= VSSAnalysisAge
      LET Accessor = if(condition=VSSAnalysisAge &gt; 0, then=&quot;ntfs_vss&quot;, else=&quot;auto&quot;)

      -- Find target files
      LET files = SELECT *, OSPath as Source
        FROM glob(globs=LogFiles, accessor=Accessor)

      -- Collect all Lines in scope of regex search
      LET output = SELECT * FROM foreach(row=files,
          query={
              SELECT Line, OSPath,
                Mtime,
                Atime,
                Ctime,
                Size
              FROM parse_lines(filename=OSPath,accessor=&#x27;file&#x27;)
              WHERE TRUE
                AND Line =~ SearchRegex
                AND NOT if(condition= WhitelistRegex,
                    then= Line=~WhitelistRegex,
                    else = false)
          })
        GROUP BY Line

      SELECT
        Line as RawLine,
        OSPath
      FROM output


  - name: LogFiles
    query: |
        SELECT
            OSPath,
            if(condition=UploadLogs,
                then= upload(file=OSPath, accessor=Accessor)
                ) as Upload,
            &#x27;MEGAsync logfile&#x27; as Description,
            Mtime,
            Atime,
            Ctime,
            Size
        FROM output
        GROUP BY OSPath

</code></pre>

