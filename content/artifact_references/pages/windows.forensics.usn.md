---
title: Windows.Forensics.Usn
hidden: true
tags: [Client Artifact]
---

This artifact parses the NTFS USN journal and allows filters to
assist investigative workflow.

NTFS is a journal filesystem. This means that it maintains a journal
file where intended filesystem changes are written first, then the
filesystem is changed. This journal is called the USN journal in NTFS.

Velociraptor can parse the USN journal from the filesystem. This
provides an indication of recent file changes. Typically the system
maintains the journal of around 30mb and depending on system
activity this can go back quite some time.

Use this artifact to determine the times when a file was
modified/added from the journal. This will be present even if the
file was later removed.

Availible filters are Filename, OSPath, MFT/Parent ID and time bounds.


<pre><code class="language-yaml">
name: Windows.Forensics.Usn
description: |
  This artifact parses the NTFS USN journal and allows filters to
  assist investigative workflow.

  NTFS is a journal filesystem. This means that it maintains a journal
  file where intended filesystem changes are written first, then the
  filesystem is changed. This journal is called the USN journal in NTFS.

  Velociraptor can parse the USN journal from the filesystem. This
  provides an indication of recent file changes. Typically the system
  maintains the journal of around 30mb and depending on system
  activity this can go back quite some time.

  Use this artifact to determine the times when a file was
  modified/added from the journal. This will be present even if the
  file was later removed.

  Availible filters are Filename, OSPath, MFT/Parent ID and time bounds.

type: CLIENT

parameters:
  - name: Device
    description: The NTFS drive to parse
    default: "C:\\"
  - name: MFTFile
    description: Alternatively provide an MFTFile to use for resolving paths.
  - name: USNFile
    description: Alternatively provide a previously extracted USN file to parse.
  - name: Accessor
    description: The accessor to use.
  - name: AllDrives
    description: Dump USN from all drives and VSC
    type: bool
  - name: FileNameRegex
    description: A regex to match the Filename field.
    default: .
  - name: PathRegex
    description: A regex to match the entire path (you can watch a directory or a file type).
    default: .
    type: regex
  - name: MFT_ID_Regex
    description: A regex to match the MFTId. e.g ^10225$ or ^(10225|232111)$
    default: .
    type: regex
  - name: Parent_MFT_ID_Regex
    description: A regex to match the MFTId. e.g ^10225$ or ^(10225|232111)$
    default: .
    type: regex
  - name: DateAfter
    type: timestamp
    description: "search for events after this date. YYYY-MM-DDTmm:hh:ssZ"
  - name: DateBefore
    type: timestamp
    description: "search for events before this date. YYYY-MM-DDTmm:hh:ssZ"
  - name: FastPaths
    type: bool
    description: When set use a faster but less accurate path reassembly algorithm.


sources:
  - precondition:
      SELECT OS From info() where OS =~ 'windows'

    query: |
      -- firstly set timebounds for performance
      LET DateAfterTime &lt;= if(condition=DateAfter,
            then=timestamp(epoch=DateAfter), else=timestamp(epoch="1600-01-01"))
      LET DateBeforeTime &lt;= if(condition=DateBefore,
            then=timestamp(epoch=DateBefore), else=timestamp(epoch="2200-01-01"))

      -- If the user specified an MFTFile then ignore the device
      LET Device &lt;= if(condition=MFTFile OR USNFile, then="",
          else=if(condition=Device,
          then=pathspec(parse=Device, path_type="ntfs")))

      LET Parse(MFT, USN, Accessor) = SELECT *
              FROM parse_usn(accessor=Accessor, fast_paths=FastPaths,
                             mft_filename=MFT, usn_filename=USN)
              WHERE Filename =~ FileNameRegex
                AND _FileMFTID =~ MFT_ID_Regex
                AND _ParentMFTID =~ Parent_MFT_ID_Regex
                AND Timestamp &lt; DateBeforeTime
                AND Timestamp &gt; DateAfterTime
                AND _Links =~ PathRegex

      LET all_drives = SELECT * FROM foreach(
      row={
        SELECT OSPath[:1] AS Drive
        FROM glob(globs="/*/$Extend/$UsnJrnl:$J", accessor="ntfs")
        WHERE log(message=format(format="Processing Drive %v", args=Drive))
      }, query={
        SELECT Timestamp,
               Filename,
               Drive + OSPath AS OSPath,
               _Links,
               Reason,
               _FileMFTID as MFTId,
               _FileMFTSequence as Sequence,
               _ParentMFTID as ParentMFTId,
               _ParentMFTSequence as ParentSequence,
               FileAttributes,
               SourceInfo,
               Usn
        FROM Parse(MFT=Drive + "$MFT",
                   USN=Drive + "$Extend/$UsnJrnl:$J",
                   Accessor="ntfs")
      })

      SELECT *
      FROM if(condition=AllDrives, then=all_drives, else={
        SELECT * FROM if(condition=Device AND
              log(message=format(format="Processing Device %v", args=Device)),
          then={
            SELECT Timestamp,
               Filename,
               Device + OSPath AS OSPath,
               _Links,
               Reason,
               _FileMFTID as MFTId,
               _FileMFTSequence as Sequence,
               _ParentMFTID as ParentMFTId,
               _ParentMFTSequence as ParentSequence,
               FileAttributes,
               SourceInfo,
               Usn
            FROM Parse(MFT=Device + "$MFT",
                 USN=Device + "$Extend/$UsnJrnl:$J",
                 Accessor="ntfs")

          }, else={
            SELECT Timestamp,
               Filename,
               OSPath,
               _Links,
               Reason,
               _FileMFTID as MFTId,
               _FileMFTSequence as Sequence,
               _ParentMFTID as ParentMFTId,
               _ParentMFTSequence as ParentSequence,
               FileAttributes,
               SourceInfo,
               Usn
            FROM Parse(MFT=MFTFile,
                 USN=USNFile, Accessor=Accessor)
          })
      })

</code></pre>

