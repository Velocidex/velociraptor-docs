---
title: Windows.Carving.USN
hidden: true
tags: [Client Artifact]
---

Carve URN Journal records from the disk.

The USN journal is a very important source of information about when
and how files were manipulated on the filesystem. However, typically
the journal is rotated within a few days.

This artifact carves out USN journal entries from the raw disk. This
might recover older entries which have since been rotated from the
journal file.

## Notes

1. Like all carving, USN carving is not very reliable. You
   would tend to use it to corroborate an existing theory or to
   discover new leads.

2. This artifact takes a long time to complete - you should
   probably increase the collection timeout past 10 minutes (usually
   more than an hour).

3. The reassembled OSPath is derived from the MFTId referenced in
   the USN record. Bear in mind that this might be out of date and
   inaccurate.

4. If you need to carve from a standalone file (e.g. collection from
   `Windows.KapeFiles.Targets`) you should use the
   Windows.Carving.USNFiles artifact instead.


<pre><code class="language-yaml">
name: Windows.Carving.USN
description: |
  Carve URN Journal records from the disk.

  The USN journal is a very important source of information about when
  and how files were manipulated on the filesystem. However, typically
  the journal is rotated within a few days.

  This artifact carves out USN journal entries from the raw disk. This
  might recover older entries which have since been rotated from the
  journal file.

  ## Notes

  1. Like all carving, USN carving is not very reliable. You
     would tend to use it to corroborate an existing theory or to
     discover new leads.

  2. This artifact takes a long time to complete - you should
     probably increase the collection timeout past 10 minutes (usually
     more than an hour).

  3. The reassembled OSPath is derived from the MFTId referenced in
     the USN record. Bear in mind that this might be out of date and
     inaccurate.

  4. If you need to carve from a standalone file (e.g. collection from
     `Windows.KapeFiles.Targets`) you should use the
     Windows.Carving.USNFiles artifact instead.

parameters:
  - name: DriveToScan
    default: &quot;C:&quot;
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

export: |
  -- Profile to parse the USN record
  LET USNProfile = &#x27;&#x27;&#x27;[
            [&quot;USN_RECORD_V2&quot;, 4, [
                [&quot;RecordLength&quot;, 0, &quot;unsigned long&quot;],
                [&quot;MajorVersion&quot;, 4, &quot;unsigned short&quot;],
                [&quot;MinorVersion&quot;, 6, &quot;unsigned short&quot;],
                [&quot;FileReferenceNumberSequence&quot;, 8, &quot;BitField&quot;, {
                    &quot;type&quot;: &quot;unsigned long long&quot;,
                    &quot;start_bit&quot;: 48,
                    &quot;end_bit&quot;: 63
                }],
                [&quot;FileReferenceNumberID&quot;, 8, &quot;BitField&quot;, {
                    &quot;type&quot;: &quot;unsigned long long&quot;,
                    &quot;start_bit&quot;: 0,
                    &quot;end_bit&quot;: 48
                }],
                [&quot;ParentFileReferenceNumberSequence&quot;, 16, &quot;BitField&quot;, {
                    &quot;type&quot;: &quot;unsigned long long&quot;,
                    &quot;start_bit&quot;: 48,
                    &quot;end_bit&quot;: 63
                }],
                [&quot;ParentFileReferenceNumberID&quot;, 16, &quot;BitField&quot;, {
                    &quot;type&quot;: &quot;unsigned long long&quot;,
                    &quot;start_bit&quot;: 0,
                    &quot;end_bit&quot;: 48
                }],

                [&quot;Usn&quot;, 24, &quot;unsigned long long&quot;],
                [&quot;TimeStamp&quot;, 32, &quot;WinFileTime&quot;],
                [&quot;Reason&quot;, 40, &quot;Flags&quot;, {
                    &quot;type&quot;: &quot;unsigned long&quot;,
                    &quot;bitmap&quot;: {
                        &quot;DATA_OVERWRITE&quot;: 0,
                        &quot;DATA_EXTEND&quot;: 1,
                        &quot;DATA_TRUNCATION&quot;: 2,
                        &quot;NAMED_DATA_OVERWRITE&quot;: 4,
                        &quot;NAMED_DATA_EXTEND&quot;: 5,
                        &quot;NAMED_DATA_TRUNCATION&quot;: 6,
                        &quot;FILE_CREATE&quot;: 8,
                        &quot;FILE_DELETE&quot;: 9,
                        &quot;EA_CHANGE&quot;: 10,
                        &quot;SECURITY_CHANGE&quot;: 11,
                        &quot;RENAME_OLD_NAME&quot;: 12,
                        &quot;RENAME_NEW_NAME&quot;: 13,
                        &quot;INDEXABLE_CHANGE&quot;: 14,
                        &quot;BASIC_INFO_CHANGE&quot;: 15,
                        &quot;HARD_LINK_CHANGE&quot;: 16,
                        &quot;COMPRESSION_CHANGE&quot;: 17,
                        &quot;ENCRYPTION_CHANGE&quot;: 18,
                        &quot;OBJECT_ID_CHANGE&quot;: 19,
                        &quot;REPARSE_POINT_CHANGE&quot;: 20,
                        &quot;STREAM_CHANGE&quot;: 21,
                        &quot;CLOSE&quot;: 31
                    }
                }],
                [&quot;SourceInfo&quot;, 44, &quot;Flags&quot;, {
                    &quot;type&quot;: &quot;unsigned long&quot;,
                    &quot;bitmap&quot;: {
                        &quot;DATA_MANAGEMENT&quot;: 0,
                        &quot;AUXILIARY_DATA&quot;: 1,
                        &quot;REPLICATION_MANAGEMENT&quot;: 2
                    }
                }],
                [&quot;SecurityId&quot;, 48, &quot;unsigned long&quot;],
                [&quot;FileAttributes&quot;, 52, &quot;Flags&quot;, {
                    &quot;type&quot;: &quot;unsigned long&quot;,
                    &quot;bitmap&quot;: {
                        &quot;READONLY&quot;: 0,
                        &quot;HIDDEN&quot;: 1,
                        &quot;SYSTEM&quot;: 2,
                        &quot;DIRECTORY&quot;: 4,
                        &quot;ARCHIVE&quot;: 5,
                        &quot;DEVICE&quot;: 6,
                        &quot;NORMAL&quot;: 7,
                        &quot;TEMPORARY&quot;: 8,
                        &quot;SPARSE_FILE&quot;: 9,
                        &quot;REPARSE_POINT&quot;: 10,
                        &quot;COMPRESSED&quot;: 11,
                        &quot;OFFLINE&quot;: 12,
                        &quot;NOT_CONTENT_INDEXED&quot;: 13,
                        &quot;ENCRYPTED&quot;: 14,
                        &quot;INTEGRITY_STREAM&quot;: 15,
                        &quot;VIRTUAL&quot;: 16,
                        &quot;NO_SCRUB_DATA&quot;: 17
                    }
                }],
                [&quot;FileNameLength&quot;, 56, &quot;unsigned short&quot;],
                [&quot;FileNameOffset&quot;, 58, &quot;unsigned short&quot;],
                [&quot;Filename&quot;, &quot;x=&gt;x.FileNameOffset&quot;, &quot;String&quot;, {
                    encoding: &quot;utf16&quot;,
                    length: &quot;x=&gt;x.FileNameLength&quot;,
                }]
            ]]]
        &#x27;&#x27;&#x27;

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query: |
        -- firstly set timebounds for performance
        LET DateAfterTime &lt;= if(condition=DateAfter,
             then=DateAfter, else=&quot;1600-01-01&quot;)
        LET DateBeforeTime &lt;= if(condition=DateBefore,
            then=DateBefore, else=&quot;2200-01-01&quot;)

        LET Device &lt;= &#x27;&#x27;&#x27;\\.\&#x27;&#x27;&#x27; + DriveToScan

        -- This rule performs an initial reduction for speed, then we
        -- reduce further using other conditions.
        LET YaraRule = &#x27;&#x27;&#x27;rule X {
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
           filename=Device, accessor=&quot;ntfs&quot;, struct=&quot;USN_RECORD_V2&quot;,
           profile=USNProfile, offset=String.Offset) AS _Parsed
        FROM yara(files=Device, accessor=&quot;ntfs&quot;, rules=YaraRule, number=200000000)
        WHERE _Parsed.RecordLength &gt; 60 AND  // Record must be at least 60 bytes
              _Parsed.FileNameLength &gt; 3 AND _Parsed.FileNameLength &lt; 100

        LET FlatHits = SELECT Offset, _Parsed.TimeStamp AS TimeStamp, _Parsed.Filename AS Name,
               _Parsed.FileReferenceNumberID AS MFTId,
               parse_ntfs(device=Device, mft=_Parsed.FileReferenceNumberID) AS MFTEntry,
               _Parsed.ParentFileReferenceNumberID AS ParentMFTId,
               _Parsed.Reason AS Reason
        FROM Hits
        WHERE Name =~ FileRegex AND
              TimeStamp &lt; DateBeforeTime AND
              TimeStamp &gt; DateAfterTime

        SELECT Offset, TimeStamp, Name, MFTId,
               MFTEntry.OSPath AS OSPath,
               ParentMFTId, Reason
        FROM FlatHits

</code></pre>

