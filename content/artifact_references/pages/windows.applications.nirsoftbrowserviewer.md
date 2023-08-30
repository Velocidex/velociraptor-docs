---
title: Windows.Applications.NirsoftBrowserViewer
hidden: true
tags: [Client Artifact]
---

This artifact wraps the Nirsoft BrowsingHistoryView tool - a tool
for parsing browser history from a variety of browsers.

More information about the tool can be found here
https://www.nirsoft.net/utils/browsing_history_view.html

NOTE: This binary is treated as malware by many detection engines
since it is capable of dumping user passwords and search history!!!
Running it on the endpoint may (hopefully) trigger endpoint defences.

BrowsingHistoryView v2.55 - View browsing history of your Web browsers
Copyright (c) 2012 - 2023 Nir Sofer


<pre><code class="language-yaml">
name: Windows.Applications.NirsoftBrowserViewer
description: |
  This artifact wraps the Nirsoft BrowsingHistoryView tool - a tool
  for parsing browser history from a variety of browsers.

  More information about the tool can be found here
  https://www.nirsoft.net/utils/browsing_history_view.html

  NOTE: This binary is treated as malware by many detection engines
  since it is capable of dumping user passwords and search history!!!
  Running it on the endpoint may (hopefully) trigger endpoint defences.

  BrowsingHistoryView v2.55 - View browsing history of your Web browsers
  Copyright (c) 2012 - 2023 Nir Sofer

tools:
 - name: NirsoftBrowsingHistoryView64
   url: https://github.com/Velocidex/Tools/raw/main/BrowsingHistoryView/BrowsingHistoryView-amd64.exe
   expected_hash: c50d3f139bc7ed05fb0f5e25671ec0268b577d5930f27964291cc8747970f2c3
   serve_locally: true

parameters:
   - name: HistorySource
     default: 1
     description: Source of history data (1=All users).
   - name: URLRegex
     default: .
     description: Filter URLs by this regex
     type: regex
   - name: DateAfter
     type: timestamp
   - name: DateBefore
     type: timestamp
   - name: AlsoUpload
     type: bool
     description: Also upload BrowsingHistoryView produced CSV file.
   - name: PARSE_TZ
     default: LOCAL
     description: Default timezone for parsing timestamps

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query: |
      -- firstly set timebounds for performance
      LET DateAfterTime &lt;= if(condition=DateAfter,
        then=timestamp(epoch=DateAfter), else=timestamp(epoch=&quot;1600-01-01&quot;))
      LET DateBeforeTime &lt;= if(condition=DateBefore,
        then=timestamp(epoch=DateBefore), else=timestamp(epoch=&quot;2200-01-01&quot;))

      LET CSVFile &lt;= tempfile(extension=&#x27;.csv&#x27;)

      -- Download the binary and create a csv file to write on.
      LET tmp_exe = SELECT OSPath AS BinPath
      FROM Artifact.Generic.Utils.FetchBinary(ToolName=&quot;NirsoftBrowsingHistoryView64&quot;)

      LET results = SELECT CSVFile
      FROM foreach(row=tmp_exe,
        query={
          SELECT CSVFile,
                 if(condition=AlsoUpload,
                    then=upload(file=CSVFile,
                                name=&quot;NirsoftBrowsingHistoryView.csv&quot;)) AS Upload
          FROM execve(argv=[
             BinPath,
             &quot;/VisitTimeFilterType&quot;, &quot;1&quot;,
             &quot;/HistorySource&quot;, HistorySource, &quot;/LoadIE&quot;, &quot;1&quot;,
             &quot;/LoadFirefox&quot;, &quot;1&quot;, &quot;/LoadChrome&quot;, &quot;1&quot;,
             &quot;/LoadSafari&quot;, &quot;1&quot;,
             &quot;/scomma&quot;,  CSVFile, &quot;/SaveDirect&quot;])
        })
      WHERE Upload OR TRUE

      -- Filter the results by the user specs
      SELECT * FROM foreach(row=results,
      query={
        -- This timestamp is in US style time and local time... boo :-(
        SELECT *, timestamp(string=`Visit Time`,
           format=&quot;1/2/2006 3:04:05 PM&quot;) AS Visited
        FROM parse_csv(filename=CSVFile)
      })
      WHERE URL =~ URLRegex AND
            Visited &gt; DateAfterTime AND
            Visited &lt; DateBeforeTime

</code></pre>

