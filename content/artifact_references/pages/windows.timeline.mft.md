---
title: Windows.Timeline.MFT
hidden: true
tags: [Client Artifact]
---

# Output all filtered MFT records.

This Artifact enables querying the MFT with advanced filters
such as time, path or other ntfs attributes.

Output is to Timeline field format to enable simple review across Timeline
queries. The TimeOutput paramater enables configuring which NTFS attribute
timestamps are in focus as event_time. for example:
  STANDARD_INFORMATION (4), FILE_NAME (4) or ALL (8)

This artifact also has the same anomaly logic as AnalyzeMFT added to
each row to assist analysis.


<pre><code class="language-yaml">
name: Windows.Timeline.MFT
description: |
  # Output all filtered MFT records.

  This Artifact enables querying the MFT with advanced filters
  such as time, path or other ntfs attributes.

  Output is to Timeline field format to enable simple review across Timeline
  queries. The TimeOutput paramater enables configuring which NTFS attribute
  timestamps are in focus as event_time. for example:
    STANDARD_INFORMATION (4), FILE_NAME (4) or ALL (8)

  This artifact also has the same anomaly logic as AnalyzeMFT added to
  each row to assist analysis.

author: Matt Green - @mgreen27

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
  - name: MFTFilename
    default: &quot;C:/$MFT&quot;
  - name: Accessor
    default: ntfs
  - name: PathRegex
    description: &quot;regex search over OSPath.&quot;
    type: regex
  - name: NameRegex
    default: .
    type: regex
    description: &quot;regex search over File Name&quot;
  - name: Inode
    type: int64
    description: &quot;search for inode&quot;
  - name: DateAfter
    type: timestamp
    description: &quot;search for events after this date. YYYY-MM-DDTmm:hh:ssZ&quot;
  - name: DateBefore
    type: timestamp
    description: &quot;search for events before this date. YYYY-MM-DDTmm:hh:ssZ&quot;
  - name: SizeMax
    type: int64
    description: &quot;Entries in the MFT over this size in bytes.&quot;
  - name: SizeMin
    type: int64
    description: &quot;Entries in the MFT under this size in bytes.&quot;
  - name: EntryType
    description: |
        Type of entry. File, Directory or Both.
    type: choices
    default: Both
    choices:
       - File
       - Directory
       - Both
  - name: AllocatedType
    description: |
        Type of entry. Allocated, Unallocated or Both.
    type: choices
    default: Both
    choices:
       - Allocated
       - Unallocated
       - Both
  - name: TimeOutput
    description: |
        Timestamps to output as event_time. SI, FN or both.
        NOTE: both will output 8 rows per MFT entry.
    type: choices
    default: STANDARD_INFORMATION
    choices:
       - STANDARD_INFORMATION
       - FILE_NAME
       - ALL

sources:
  - query: |
        LET hostname &lt;= SELECT Fqdn FROM info()
        LET DateAfterTime &lt;= if(condition=DateAfter,
             then=DateAfter, else=timestamp(epoch=&quot;1600-01-01&quot;))
        LET DateBeforeTime &lt;= if(condition=DateBefore,
             then=DateBefore, else=timestamp(epoch=&quot;2200-01-01&quot;))
        LET records = SELECT *,
                Created0x10 &lt; Created0x30 as FNCreatedShift,
                Created0x10.Unix * 1000000000 = Created0x10.UnixNano as USecZero,
                Created0x10 &gt; LastModified0x10 as PossibleCopy,
                ( LastAccess0x10 &gt; LastModified0x10 AND LastAccess0x10 &gt; Created0x10 ) as VolumeCopy
            FROM parse_mft(filename=MFTFilename, accessor=Accessor)
            WHERE
                FileName =~ NameRegex AND
                OSPath =~ PathRegex AND
                if(condition=Inode, then= EntryNumber=atoi(string=Inode)
                    OR ParentEntryNumber=atoi(string=Inode),
                    else=TRUE) AND
                if(condition=SizeMax, then=FileSize &lt; SizeMax,
                    else=TRUE) AND
                if(condition=SizeMin, then=FileSize &gt; SizeMin,
                    else=TRUE) AND
                if(condition= EntryType=&quot;Both&quot;, then=TRUE,
                    else= if(condition= EntryType=&quot;File&quot;,
                        then= IsDir=False,
                    else= if(condition= EntryType=&quot;Directory&quot;,
                        then= IsDir=True))) AND
                if(condition= AllocatedType=&quot;Both&quot;, then=TRUE,
                    else= if(condition= AllocatedType=&quot;Allocated&quot;,
                        then= InUse=True,
                    else= if(condition= AllocatedType=&quot;Unallocated&quot;,
                        then= InUse=False))) AND
                (((Created0x10 &gt; DateAfterTime) AND (Created0x10 &lt; DateBeforeTime)) OR
                ((Created0x30 &gt; DateAfterTime) AND (Created0x30 &lt; DateBeforeTime)) OR
                ((LastModified0x10 &gt; DateAfterTime) AND (LastModified0x10 &lt; DateBeforeTime)) OR
                ((LastModified0x30 &gt; DateAfterTime) AND (LastModified0x30 &lt; DateBeforeTime)) OR
                ((LastRecordChange0x10 &gt; DateAfterTime) AND (LastRecordChange0x10 &lt; DateBeforeTime)) OR
                ((LastRecordChange0x30 &gt; DateAfterTime) AND (LastRecordChange0x30 &lt; DateBeforeTime)) OR
                ((LastAccess0x10 &gt; DateAfterTime) AND (LastAccess0x10 &lt; DateBeforeTime)) OR
                ((LastAccess0x30 &gt; DateAfterTime) AND (LastAccess0x30 &lt; DateBeforeTime)))

        LET common_fields = SELECT EntryNumber, ParentEntryNumber,
                OSPath, FileName, FileSize, IsDir,InUse,
                Created0x10, Created0x30,
                LastModified0x10, LastModified0x30,
                LastRecordChange0x10, LastRecordChange0x30,
                LastAccess0x10, LastAccess0x30,
                FNCreatedShift, USecZero, PossibleCopy, VolumeCopy
            FROM scope()

        LET standard_information_rows = SELECT * FROM chain(
            si_modified = {
                SELECT *,
                    LastModified0x10 as event_time,
                    format(format=&quot;MFTEntry:%v $STANDARD_INFORMATION (0x10) LastModified time&quot;,
                      args=EntryNumber) as message
                FROM common_fields
            },
            si_access = {
                SELECT *,
                    LastAccess0x10 as event_time,
                    format(format=&quot;MFTEntry:%v $STANDARD_INFORMATION (0x10) LastAccess time&quot;,
                      args=EntryNumber) as message
                FROM common_fields
            },
            si_created = {
                SELECT *,
                    LastRecordChange0x10 as event_time,
                    format(format=&quot;MFTEntry:%v $STANDARD_INFORMATION (0x10) LastRecordChange time&quot;,
                      args=EntryNumber) as message
                FROM common_fields
            },
            si_born = {
                SELECT *,
                    Created0x10 as event_time,
                    format(format=&quot;MFTEntry:%v $STANDARD_INFORMATION (0x10) Created time&quot;,
                      args=EntryNumber) as message
                FROM common_fields
            })
        LET file_name_rows = SELECT * FROM chain(
            fn_modified = {
                SELECT *,
                    LastModified0x30 as event_time,
                    format(format=&quot;MFTEntry:%v $FILE_NAME (0x30) LastModified time&quot;,
                      args=EntryNumber) as message
                FROM common_fields
            },
            fn_access = {
                SELECT *,
                    LastAccess0x30 as event_time,
                    format(format=&quot;MFTEntry:%v $FILE_NAME (0x30) LastAccess time&quot;,
                      args=EntryNumber) as message
                FROM common_fields
            },
            fn_created = {
                SELECT *,
                    LastRecordChange0x30 as event_time,
                    format(format=&quot;MFTEntry:%v $FILE_NAME (0x30) LastRecordChange time&quot;,
                      args=EntryNumber) as message
                FROM common_fields
            },
            fn_born = {
                SELECT *,
                    Created0x30 as event_time,
                      format(format=&quot;MFTEntry:%v $FILE_NAME (0x30) Created time&quot;,
                        args=EntryNumber) as message
                FROM common_fields
            })

        SELECT
            event_time,
            hostname.Fqdn[0] as hostname,
            &quot;MFT&quot; as parser,
            MFTFilename as source,
            message,
            OSPath as path,
            { SELECT EntryNumber,ParentEntryNumber,FileSize,
                     IsDir, InUse
              FROM scope() } as optional_1,

            { SELECT FNCreatedShift, USecZero, PossibleCopy,
                     VolumeCopy
              FROM scope() } as optional_2,

            { SELECT LastModified0x10,LastAccess0x10,
                     LastRecordChange0x10,Created0x10
              FROM scope() } as optional_3,

            { SELECT LastModified0x30,LastAccess0x30,
                     LastRecordChange0x30,Created0x30
              FROM scope() } as optional_4

          FROM foreach(
            row=records,
            query={
                SELECT * FROM chain(
                    standard_information={
                        SELECT * FROM if(
                            condition=TimeOutput=&quot;STANDARD_INFORMATION&quot; OR TimeOutput=&quot;ALL&quot;,
                            then=standard_information_rows)
                    },
                    file_name={
                        SELECT * FROM if(
                            condition=TimeOutput=&quot;FILE_NAME&quot; OR TimeOutput=&quot;ALL&quot;,
                            then=file_name_rows)
                    })
            })

</code></pre>

