---
title: Windows.Forensics.Prefetch
hidden: true
tags: [Client Artifact]
---

Windows keeps a cache of prefetch files. When an executable is run,
the system records properties about the executable to make it faster
to run next time. By parsing this information we are able to
determine when binaries are run in the past. On Windows10 we can see
the last 8 execution times and creation time (9 potential executions).

There are several parameter's available for this artifact.
  - dateAfter enables search for prefetch evidence after this date.
  - dateBefore enables search for prefetch evidence before this date.
  - binaryRegex enables to filter on binary name, e.g evil.exe.
  - hashRegex enables to filter on prefetch hash.

NOTE: The Prefetch file format is described extensively in libscca
and painstakingly reversed by Joachim Metz (Shouts and Thank you!).


<pre><code class="language-yaml">
name: Windows.Forensics.Prefetch
description: |
  Windows keeps a cache of prefetch files. When an executable is run,
  the system records properties about the executable to make it faster
  to run next time. By parsing this information we are able to
  determine when binaries are run in the past. On Windows10 we can see
  the last 8 execution times and creation time (9 potential executions).

  There are several parameter&#x27;s available for this artifact.
    - dateAfter enables search for prefetch evidence after this date.
    - dateBefore enables search for prefetch evidence before this date.
    - binaryRegex enables to filter on binary name, e.g evil.exe.
    - hashRegex enables to filter on prefetch hash.

  NOTE: The Prefetch file format is described extensively in libscca
  and painstakingly reversed by Joachim Metz (Shouts and Thank you!).

reference:
  - https://www.forensicswiki.org/wiki/Prefetch
  - https://github.com/libyal/libscca/blob/main/documentation/Windows%20Prefetch%20File%20(PF)%20format.asciidoc

parameters:
    - name: prefetchGlobs
      default: C:\Windows\Prefetch\*.pf
    - name: dateAfter
      description: &quot;search for events after this date. YYYY-MM-DDTmm:hh:ssZ&quot;
      type: timestamp
    - name: dateBefore
      description: &quot;search for events before this date. YYYY-MM-DDTmm:hh:ssZ&quot;
      type: timestamp
    - name: binaryRegex
      description: &quot;Regex of executable name.&quot;
      type: regex
    - name: hashRegex
      description: &quot;Regex of prefetch hash.&quot;
      type: regex
    - name: IncludeFilesAccessed
      description: Include all accessed files
      type: bool

export: |
        LET PrefetchProfile = &#x27;&#x27;&#x27;[
        [&quot;Header&quot;, 8, [
          [&quot;Signature&quot;, 0, &quot;String&quot;, {&quot;length&quot;: 3}],
          [&quot;UncompressedSize&quot;, 4, &quot;unsigned long&quot;],
          [&quot;Data&quot;, 8, String, {
              length: &quot;x=&gt;x.UncompressedSize&quot;,
              term: &quot;&quot;,
              max_length: 10000000,
          }],
          [&quot;Decompressed&quot;, 0, &quot;Value&quot;, {
              value: &quot;x=&gt;lzxpress_decompress(data=x.Data)&quot;
          }],
        ]],
        [&quot;SCCAHeader&quot;, 84, [
         [&quot;Version&quot;, 0, &quot;Enumeration&quot;, {
             type: &quot;unsigned int&quot;,
             choices: {
               &quot;17&quot;: &quot;WinXP (17)&quot;,
               &quot;23&quot;: &quot;Vista (23)&quot;,
               &quot;26&quot;: &quot;Win8.1 (26)&quot;,
               &quot;30&quot;: &quot;Win10 (30)&quot;
             }
         }],
         [&quot;Signature&quot;, 4, &quot;String&quot;, {&quot;length&quot;: 4}],
         [&quot;FileSize&quot;, 12, &quot;unsigned long&quot;],
         [&quot;Executable&quot;, 16, &quot;String&quot;, {
             encoding: &quot;utf16&quot;,
         }],
         [&quot;Hash&quot;, 76, &quot;unsigned long&quot;],

         # Hash is followed by a version specific info struct.
         [&quot;Info&quot;, 84, &quot;Union&quot;, {
             selector: &quot;x=&gt;x.Version&quot;,
             choices: {
                 &quot;WinXP (17)&quot;: &quot;FileInformationWinXP&quot;,
                 &quot;Vista (23)&quot;: &quot;FileInformationVista&quot;,
                 &quot;Win8.1 (26)&quot;: &quot;FileInformationWin81&quot;,
                 &quot;Win10 (30)&quot;: &quot;FileInformationWin10&quot;,
             }
         }]
        ]],

        [&quot;FileInformationWinXP&quot;, 68, [
         [&quot;__FileMetricsOffset&quot;, 0, &quot;unsigned long&quot;],
         [&quot;__NumberOfFileMetrics&quot;, 4, &quot;unsigned long&quot;],
         [&quot;__TraceChainsArrayOffset&quot;, 8, &quot;unsigned long&quot;],
         [&quot;__NumberOfTraceChains&quot;, 12, &quot;unsigned long&quot;],
         [&quot;__FilenameOffset&quot;, 16, &quot;unsigned long&quot;],
         [&quot;__FilenameSize&quot;, 20, &quot;unsigned long&quot;],
         [&quot;__VolumesInformationOffset&quot;, 24, &quot;unsigned long&quot;],
         [&quot;__NumberOfVolumes&quot;, 28, &quot;unsigned long&quot;],
         [&quot;__VolumesInformationSize&quot;, 32, &quot;unsigned long&quot;],

         # This is realy just one time but we make it an
         # array to be compatible with the others.
         [&quot;LastRunTimes&quot;, 36, &quot;Array&quot;, {
              &quot;type&quot;: &quot;Timestamp&quot;,
              &quot;count&quot;: 1
           }],
         [&quot;RunCount&quot;, 60, &quot;unsigned long&quot;],

         # Metrics offset is absolute.
         [&quot;Metrics&quot;, &quot;x=&gt;x.__FileMetricsOffset - x.StartOf&quot;, &quot;Array&quot;, {
             type: &quot;FileMetricsEntryV17&quot;,
             count: &quot;x=&gt;x.__NumberOfFileMetrics&quot;,
         }],
         [&quot;VolumeInfo&quot;, &quot;x=&gt;x.__VolumesInformationOffset - x.StartOf&quot;, &quot;Array&quot;, {
             type: &quot;VolumeInformation&quot;,
             count: &quot;x=&gt;x.__NumberOfVolumes&quot;,
          }],
        ]],

        [&quot;FileInformationVista&quot;, 156, [
         [&quot;__FileMetricsOffset&quot;, 0, &quot;unsigned long&quot;],
         [&quot;__NumberOfFileMetrics&quot;, 4, &quot;unsigned long&quot;],
         [&quot;__TraceChainsArrayOffset&quot;, 8, &quot;unsigned long&quot;],
         [&quot;__NumberOfTraceChains&quot;, 12, &quot;unsigned long&quot;],
         [&quot;__FilenameOffset&quot;, 16, &quot;unsigned long&quot;],
         [&quot;__FilenameSize&quot;, 20, &quot;unsigned long&quot;],
         [&quot;__VolumesInformationOffset&quot;, 24, &quot;unsigned long&quot;],
         [&quot;__NumberOfVolumes&quot;, 28, &quot;unsigned long&quot;],
         [&quot;__VolumesInformationSize&quot;, 32, &quot;unsigned long&quot;],

         # This is realy just one time but we make it an
         # array to be compatible with the others.
         [&quot;LastRunTimes&quot;, 44, &quot;Array&quot;, {
              &quot;type&quot;: &quot;Timestamp&quot;,
              &quot;count&quot;: 1
           }],
         [&quot;RunCount&quot;, 68, &quot;unsigned long&quot;],

         # Metrics offset is absolute.
         [&quot;Metrics&quot;, &quot;x=&gt;x.__FileMetricsOffset - x.StartOf&quot;, &quot;Array&quot;, {
             type: &quot;FileMetricsEntryV23&quot;,
             count: &quot;x=&gt;x.__NumberOfFileMetrics&quot;,
         }],
         [&quot;VolumeInfo&quot;, &quot;x=&gt;x.__VolumesInformationOffset - x.StartOf&quot;, &quot;Array&quot;, {
             type: &quot;VolumeInformation&quot;,
             count: &quot;x=&gt;x.__NumberOfVolumes&quot;,
          }],
        ]],


        [&quot;FileInformationWin81&quot;, 224, [
         [&quot;__FileMetricsOffset&quot;, 0, &quot;unsigned long&quot;],
         [&quot;__NumberOfFileMetrics&quot;, 4, &quot;unsigned long&quot;],
         [&quot;__TraceChainsArrayOffset&quot;, 8, &quot;unsigned long&quot;],
         [&quot;__NumberOfTraceChains&quot;, 12, &quot;unsigned long&quot;],
         [&quot;__FilenameOffset&quot;, 16, &quot;unsigned long&quot;],
         [&quot;__FilenameSize&quot;, 20, &quot;unsigned long&quot;],
         [&quot;__VolumesInformationOffset&quot;, 24, &quot;unsigned long&quot;],
         [&quot;__NumberOfVolumes&quot;, 28, &quot;unsigned long&quot;],
         [&quot;__VolumesInformationSize&quot;, 32, &quot;unsigned long&quot;],

         # This is realy just one time but we make it an
         # array to be compatible with the others.
         [&quot;LastRunTimes&quot;, 44, &quot;Array&quot;, {
              &quot;type&quot;: &quot;Timestamp&quot;,
              &quot;count&quot;: 8,
           }],
         [&quot;RunCount&quot;, 124, &quot;unsigned long&quot;],

         # Metrics offset is absolute.
         [&quot;Metrics&quot;, &quot;x=&gt;x.__FileMetricsOffset - x.StartOf&quot;, &quot;Array&quot;, {
             type: &quot;FileMetricsEntryV23&quot;,
             count: &quot;x=&gt;x.__NumberOfFileMetrics&quot;,
         }],
         [&quot;VolumeInfo&quot;, &quot;x=&gt;x.__VolumesInformationOffset - x.StartOf&quot;, &quot;Array&quot;, {
             type: &quot;VolumeInformation&quot;,
             count: &quot;x=&gt;x.__NumberOfVolumes&quot;,
          }],
        ]],

        [&quot;FileInformationWin10&quot;, 224, [
         [&quot;__FileMetricsOffset&quot;, 0, &quot;unsigned long&quot;],
         [&quot;__NumberOfFileMetrics&quot;, 4, &quot;unsigned long&quot;],
         [&quot;__TraceChainsArrayOffset&quot;, 8, &quot;unsigned long&quot;],
         [&quot;__NumberOfTraceChains&quot;, 12, &quot;unsigned long&quot;],
         [&quot;__FilenameOffset&quot;, 16, &quot;unsigned long&quot;],
         [&quot;__FilenameSize&quot;, 20, &quot;unsigned long&quot;],
         [&quot;__VolumesInformationOffset&quot;, 24, &quot;unsigned long&quot;],
         [&quot;__NumberOfVolumes&quot;, 28, &quot;unsigned long&quot;],
         [&quot;__VolumesInformationSize&quot;, 32, &quot;unsigned long&quot;],
         [&quot;__TotalDirectoryCount&quot;, 36, &quot;unsigned long&quot;],
         [&quot;LastRunTimes&quot;, 44, &quot;Array&quot;, {
              &quot;type&quot;: &quot;Timestamp&quot;,
              &quot;count&quot;: 8
           }],
         [&quot;__RunCount1&quot;, 124, &quot;unsigned long&quot;],
         [&quot;__RunCountPre&quot;, 120, &quot;unsigned long&quot;],
         [&quot;__RunCount2&quot;, 116, &quot;unsigned long&quot;],
         [&quot;RunCount&quot;, 0, Value, {
            value: &quot;x=&gt;if(condition=x.__RunCountPre=0, then=x.__RunCount1, else=x.__RunCount2)&quot;,
         }],

         # Metrics offset is absolute.
         [&quot;Metrics&quot;, &quot;x=&gt;x.__FileMetricsOffset - x.StartOf&quot;, &quot;Array&quot;, {
             type: &quot;FileMetricsEntryV30&quot;,
             count: &quot;x=&gt;x.__NumberOfFileMetrics&quot;,
         }],
         [&quot;VolumeInfo&quot;, &quot;x=&gt;x.__VolumesInformationOffset - x.StartOf&quot;, &quot;Array&quot;, {
             type: &quot;VolumeInformation&quot;,
             count: &quot;x=&gt;x.__NumberOfVolumes&quot;,
          }],
        ]],

        [&quot;Timestamp&quot;, 8, [
          [&quot;Date&quot;, 0, &quot;WinFileTime&quot;],
          [&quot;Int&quot;, 0, &quot;unsigned long long&quot;]
        ]],

        [&quot;FileMetricsEntryV17&quot;, 20, [
          [&quot;__FilenameOffset&quot;, 8, &quot;unsigned long&quot;],
           [&quot;__FilenameLength&quot;, 12, &quot;unsigned long&quot;],
           [&quot;Filename&quot;, 0, &quot;Profile&quot;, {
               offset: &quot;x=&gt;x.ParentOf.__FilenameOffset + x.__FilenameOffset&quot;,
               type: &quot;String&quot;,
               type_options: {
                   encoding: &quot;utf16&quot;,
                   length: 1024,
               }
           }]
        ]],


        [&quot;FileMetricsEntryV23&quot;, 32, [
          [&quot;__FilenameOffset&quot;, 12, &quot;unsigned long&quot;],
          [&quot;__FilenameLength&quot;, 16, &quot;unsigned long&quot;],
          [&quot;__MFTFileReference&quot;, 24, &quot;unsigned long&quot;],
          [&quot;Filename&quot;, 0, &quot;Profile&quot;, {
               offset: &quot;x=&gt;x.ParentOf.__FilenameOffset + x.__FilenameOffset&quot;,
               type: &quot;String&quot;,
               type_options: {
                   encoding: &quot;utf16&quot;,
                   length: 1024,
               }
           }]
        ]],

        [&quot;FileMetricsEntryV30&quot;, 32, [
           [&quot;__FilenameOffset&quot;, 12, &quot;unsigned long&quot;],
           [&quot;__FilenameLength&quot;, 16, &quot;unsigned long&quot;],
           [&quot;__MFTFileReference&quot;, 24, &quot;unsigned long&quot;],
           [&quot;Filename&quot;, 0, &quot;Profile&quot;, {
               offset: &quot;x=&gt;x.ParentOf.__FilenameOffset + x.__FilenameOffset&quot;,
               type: &quot;String&quot;,
               type_options: {
                   encoding: &quot;utf16&quot;,
                   length: 1024,
               }
           }]
        ]],

        [&quot;VolumeInformation&quot;, 40, [
          [&quot;__DeviceOffset&quot;, 0, &quot;unsigned long&quot;],
          [&quot;DeviceName&quot;, &quot;x=&gt;x.__DeviceOffset&quot;, &quot;String&quot;, {
              encoding: utf16,
              length: &quot;x=&gt;x.__DeviceSize * 2&quot;,
          }],
          [&quot;__DeviceSize&quot;, 4, &quot;unsigned long&quot;],
          [&quot;DeviceCreationTime&quot;, 8, &quot;WinFileTime&quot;],
          [&quot;VolumeSerialNumber&quot;, 12, &quot;unsigned long&quot;],
          [&quot;VolumeSerialNumberHex&quot;, 0, Value, {
              value: &quot;x=&gt;format(format=&#x27;%#x&#x27;, args=x.VolumeSerialNumber)&quot;,
          }],
          [&quot;__FileReferenceOffset&quot;, 20, &quot;unsigned long&quot;],
          [&quot;__FileReferenceDataSize&quot;, 24, &quot;unsigned long&quot;],
          [&quot;__DirectoryStringsOffset&quot;, 28, &quot;unsigned long&quot;],
          [&quot;__NumDirectoryStrings&quot;, 32, &quot;unsigned long&quot;],
          [&quot;__Directories&quot;, &quot;x=&gt;x.__DirectoryStringsOffset&quot;, &quot;Array&quot;, {
              type: &quot;DirectoryName&quot;,
              count: &quot;x=&gt;x.__NumDirectoryStrings&quot;,
          }],
          [&quot;Directories&quot;, 0, Value, {
              value: &quot;x=&gt;x.__Directories.Name&quot;
          }],
        ]],
        [&quot;DirectoryName&quot;, &quot;x=&gt;x.Size * 2 + 4&quot;, [
          [&quot;Size&quot;, 0, &quot;uint8&quot;],
          [&quot;Name&quot;, 2, &quot;String&quot;, {
              encoding: &quot;utf16&quot;,
              length: &quot;x=&gt;x.Size * 2&quot;
          }]
        ]]
        ]
        &#x27;&#x27;&#x27;

        LET ParsePrefetch(PrefetchFile) = SELECT
          parse_binary(accessor=&quot;data&quot;, filename=Data,
            profile=PrefetchProfile, struct=&quot;SCCAHeader&quot;) AS SCCAHeader
        FROM switch(a={
            -- Handle compressed MAM prefetch files.
            SELECT
              parse_binary(filename=PrefetchFile, profile=PrefetchProfile, struct=&quot;Header&quot;) AS Header,
              parse_binary(filename=PrefetchFile, profile=PrefetchProfile, struct=&quot;Header&quot;).Decompressed AS Data
            FROM scope()
            WHERE Header.Signature = &quot;MAM&quot;
        },
        b={
            -- Handle uncompressed files
            SELECT read_file(filename=PrefetchFile, length=1024*1024) AS Data
            FROM scope()
        })
        WHERE SCCAHeader.Signature = &quot;SCCA&quot;

sources:
  - query: |
        // Parse prefetch files and apply non time filters
        LET pf = SELECT * FROM foreach(
              row={
                 SELECT * FROM glob(globs=prefetchGlobs)
              },
              query={
                SELECT SCCAHeader AS _SCCAHeader,
                  SCCAHeader.Executable AS Executable,
                  SCCAHeader.FileSize AS FileSize,
                  format(format=&quot;%#X&quot;, args=SCCAHeader.Hash) AS Hash,
                  SCCAHeader.Version AS Version,
                  filter(list=SCCAHeader.Info.LastRunTimes.Date, condition=&quot;x=&gt;x.Unix &gt; 0&quot;) AS LastRunTimes,
                  SCCAHeader.Info.RunCount AS RunCount,
                  OSPath,
                  Name AS PrefetchFileName,
                  Btime as CreationTime,
                  Mtime as ModificationTime,
                  filter(list=SCCAHeader.Info.Metrics.Filename, regex=&quot;.exe$&quot;)[0] AS Binary,
                  if(condition= IncludeFilesAccessed, then=SCCAHeader.Info.Metrics.Filename) AS FilesAccessed,
                  if(condition= IncludeFilesAccessed, then=SCCAHeader.Info.VolumeInfo) AS VolumeInfo
                FROM ParsePrefetch(PrefetchFile=OSPath)
                WHERE
                    if(condition=binaryRegex, then= Executable =~ binaryRegex, else=TRUE) AND
                    if(condition=hashRegex, then= Hash =~ hashRegex, else=TRUE)
              })

        // Flattern to enable time filters. Remember VQL is lazy.
        LET executionTimes = SELECT * FROM flatten(
                query = {
                    SELECT *,
                        OSPath as FilteredPath,
                        LastRunTimes as ExecutionTime
                    FROM pf
                })
            WHERE
                if(condition=dateAfter, then=ExecutionTime &gt; timestamp(string=dateAfter),
                    else=TRUE) AND
                if(condition=dateBefore, then=ExecutionTime &lt; timestamp(string=dateBefore),
                    else=TRUE)
        LET creationTimes = SELECT * FROM flatten(
                query = {
                    SELECT *,
                        OSPath as FilteredPath,
                        CreationTime as ExecutionTime
                    FROM pf
                    WHERE RunCount &gt; 8
                })
            WHERE
                if(condition=dateAfter, then=ExecutionTime &gt; timestamp(string=dateAfter),
                    else=TRUE) AND
                if(condition=dateBefore, then=ExecutionTime &lt; timestamp(string=dateBefore),
                        else=TRUE)
            GROUP BY ExecutionTime

        // For stdOutput with timefilters we need to group by OSPath
        LET timeFiltered = SELECT FilteredPath
            FROM chain(
                a = { SELECT * FROM executionTimes },
                b = { SELECT * FROM creationTimes  })
            GROUP BY FilteredPath

        LET timeFilteredStdOut = SELECT * FROM foreach(
                row={
                        SELECT * FROM timeFiltered
                    },
                query={
                    SELECT *
                    FROM pf
                    WHERE OSPath = FilteredPath
                })

        SELECT *
        FROM if(condition = (dateBefore OR dateAfter),
            then={ SELECT * FROM timeFilteredStdOut },
            else={ SELECT * FROM pf  })


column_types:
  - name: CreationTime
    type: timestamp
  - name: ModificationTime
    type: timestamp

</code></pre>

