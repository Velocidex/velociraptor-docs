---
title: Windows.Carving.USNFiles
hidden: true
tags: [Client Artifact]
---

The USN journal is an important source of information about when
files were manipulated on a system.

Ideally you can parse the journal directly using the
`Windows.Forensics.Usn` artifact on the endpoint itself. However,
sometimes all you have is a copy of the USN file itself (for example
after collection with the `Windows.KapeFiles.Targets`). If you only
have the file, you can use this artifact to parse the USN records
out of it by essentially carving the records out.

NOTE: This artifact is not as good as the `Windows.Forensics.Usn`
artifact because it can not resolve the full path of the files from
the MFT itself! In practice you should always prefer to collect
`Windows.Forensics.Usn` rather than just the $J file.


<pre><code class="language-yaml">
name: Windows.Carving.USNFiles
description: |
  The USN journal is an important source of information about when
  files were manipulated on a system.

  Ideally you can parse the journal directly using the
  `Windows.Forensics.Usn` artifact on the endpoint itself. However,
  sometimes all you have is a copy of the USN file itself (for example
  after collection with the `Windows.KapeFiles.Targets`). If you only
  have the file, you can use this artifact to parse the USN records
  out of it by essentially carving the records out.

  NOTE: This artifact is not as good as the `Windows.Forensics.Usn`
  artifact because it can not resolve the full path of the files from
  the MFT itself! In practice you should always prefer to collect
  `Windows.Forensics.Usn` rather than just the $J file.

imports:
  - Windows.Carving.USN

parameters:
  - name: USNFile
    default: \\.\C:\$Extend\$UsnJrnl:$J
  - name: Accessor
    default: ntfs
    type: choices
    choices:
      - ntfs
      - file
  - name: FileRegex
    description: &quot;Regex search over File Name&quot;
    default: &quot;.&quot;
    type: regex
  - name: DateAfter
    type: timestamp
    description: &quot;search for events after this date. YYYY-MM-DDTmm:hh:ssZ&quot;
  - name: DateBefore
    type: timestamp
    description: &quot;search for events before this date. YYYY-MM-DDTmm:hh:ssZ&quot;

sources:
  - query: |
        -- firstly set timebounds for performance
        LET DateAfterTime &lt;= if(condition=DateAfter,
             then=DateAfter, else=&quot;1600-01-01&quot;)
        LET DateBeforeTime &lt;= if(condition=DateBefore,
            then=DateBefore, else=&quot;2200-01-01&quot;)

        -- This rule performs an initial reduction for speed, then we
        -- reduce further using other conditions.
        LET USNYaraRule = &#x27;&#x27;&#x27;rule X {
            strings:
              // First byte is the record length &lt; 255 second byte should be 0-1 (0-512 bytes per record)
              // Version Major and Minor must be 2 and 0
              // D7 01 is the ending of a reasonable WinFileTime
              // Name Offset and Name Length are short ints but should be &lt; 255
              $a = { ?? (00 | 01) 00 00 02 00 00 00 [24] ?? ?? ?? ?? ?? ?? D? 01 [16] ?? 00 3c 00  }
            condition:
              any of them
        }
        &#x27;&#x27;&#x27;

        -- Find all the records in the drive.
        LET Hits = SELECT String.Offset AS Offset, parse_binary(
           filename=USNFile, accessor=Accessor, struct=&quot;USN_RECORD_V2&quot;,
           profile=USNProfile, offset=String.Offset) AS _Parsed
        FROM yara(files=USNFile, accessor=Accessor,
                  rules=USNYaraRule, number=200000000)
        WHERE _Parsed.RecordLength &gt; 60 AND  // Record must be at least 60 bytes
              _Parsed.FileNameLength &gt; 3 AND _Parsed.FileNameLength &lt; 100

        SELECT Offset, _Parsed.TimeStamp AS TimeStamp,
               _Parsed.Filename AS Name,
               _Parsed.FileReferenceNumberID AS MFTId,
               _Parsed.ParentFileReferenceNumberID AS ParentMFTId,
               _Parsed.Reason AS Reason
        FROM Hits
        WHERE Name =~ FileRegex AND
              TimeStamp &lt; DateBeforeTime AND
              TimeStamp &gt; DateAfterTime

</code></pre>

