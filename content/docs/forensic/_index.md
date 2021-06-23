---
title: "Forensic Analysis"
date: 2021-06-12T21:56:33Z
draft: false
weight: 40
---

In the previous sections we learned the syntax of VQL. But VQL is not
useful without a good set of plugins that make DFIR work
possible. Velociraptor's strength lies in the wide array of VQL
plugins and functions that are geared towards making DFIR
investigations and detections effective.


Digging deeper in Windows
2

Module overview
Velociraptor implements many forensic capabilities in VQL
This module will focus on typical forensic analysis and deep inspection capabilities. We will learn how to put the capabilities together to produce effective artifacts and when to use those.
This module will not use Velociraptor’s GUI or even the client/server mode since we are focused on the techniques themselves. Later we can leverage the same VQL across the network at scale, and effectively hunt for artifacts across our infrastructure - keep this in mind through this module.

NTFS Analysis
42

NTFS overview
NTFS is the standard Windows filesystem.
All files are represented in a Master File Table
Files can contain multiple attributes:
Filename (Long name/Short name)
Data attribute – contains file data
I30 attribute (contains directory listing)
Data attributes may be compressed or sparse
Filename attributes contain their own timestamps


43

The Master File Table
The NTFS file system contains a file called the master file table, or MFT. There is at least one entry in the MFT for every file on an NTFS file system volume, including the MFT itself. All information about a file, including its size, time and date stamps, permissions, and data content, is stored either in MFT entries, or in space outside the MFT that is described by MFT entries.

https://docs.microsoft.com/en-us/windows/win32/fileio/master-file-table

44

NTFS Concepts
https://www.fireeye.com/blog/threat-research/2012/10/incident-response-ntfs-indx-buffers-part-4-br-internal.html
45

Velociraptor’s NTFS support
Velociraptor has 2 accessors providing access to NTFS
ntfs - Supports Alternate Data Streams in directory listings.
lazy_ntfs - much faster but does not detect ADS.

Due to these accessors it is possible to operate on files in the NTFS volume using all the usual plugins.
46

47

The NTFS accessor makes NTFS specific information available in the Data field. For regular files it includes the inode string.
The NTFS accessor considers all paths to begin with a device name. For convenience the accessor also accepts a drive letter.

48
Volume Shadow Copies
NTFS allows for a special copy on write snapshot feature called “Volume Shadow Copy”.

Create a VSS copy on your own machine using WMI:

On Windows server OS you can use:
vssadmin create shadow

Checking for VSC
Ensure your system contains a volume shadow copy
49

NTFS accessor and VSS
When a VSS copy is created, it is accessible via a special device. Velociraptor allows the VSS copies to be enumerated by listing them at the top level of the filesystem.

At the top level, the accessor provides metadata about each device in the “Data” column, including its creation time. This is essentially the same output as vssadmin list shadows
50

51

52
Find all VSS copies of the event logs

53
We can glob the VSS just as if they were a directory

Makes it easy to fetch every version of a certain file (e.g. a log file).

54
Operating on VSS
Simply use the VSS device name as a prefix to all paths and the ntfs accessor will parse it instead.

You can use it to analyze older versions of the drive!

55

Parsing the MFT
You can download the entire $MFT file from the endpoint using the ntfs accessor, then process it offline.

You can also parse the $MFT on the endpoint using Velociraptor.

This is most useful when you need to pass over all the files in the disk - it is more efficient than a recursive glob and might recover deleted files.
56

57

58
Exercise: Find all .exe on the drive
Efficiently find all .exe on disk that were created after Jan 20, 2020

MFT Entries
An MFT Entry can have multiple attributes and streams
The previous plugin just shows high level information about each MFT entry - we can dig deeper with the parse_ntfs() plugin which accepts an mft ID.

Choose a file of interest in the previous output and inspect it deeper.
59

60
An inode is a triple of mft id, type id and id

e.g. 974-16-0

representing a stream of data

61
NTFS timestamps
An MFT entry can have up to 16 timestamps!
Timestamps are critical to forensic investigations
Determine when files were copied
When files were modified
And sometimes we can determine when a file was accessed
In NTFS there are timestamps
In $STANDARD_INFORMATION stream (usually only 1)
In the $FILENAME  stream (sometimes 2 or 3)
In the $I30 stream of the parent directory (see later)

Timestomping
62
Attackers sometimes change the timestamps of files to make them less obvious. E.g make malware look like it was installed many years ago.

For the next exercise we will stomp over some times. Use the provided powershell to stomp over Velociraptor.exe’s timestamps.



Timestomp a file
63
$file = 'C:\Program Files\Velociraptor\Velociraptor.exe'
$stomp = Get-Date 2007-07-07
$(Get-Item $file).creationtime = $stomp
$(Get-Item $file).lastaccesstime = $stomp
$(Get-Item $file).lastwritetime = $stomp
Get-ChildItem $file | Select *, Fullname, *Time*

powershell -executionpolicy bypass "& .\stomp.ps1"

64
Before
After


65
Timestomping uses the API to change the times of a file but this only changed the $STANDARD_INFORMATION stream. The real times are still present on the $FILENAME attributes.

66

Exercise: Detect timestomping
Write an artifact that detects when a file has had its time stomped.

Note: This is not necessarily a smoking gun - many installers will update a file’s timestamps during installation.

http://www.forensickb.com/2009/02/detecting-timestamp-changing-utlities.html
67

68
Many binaries are timestomped naturally because they come from CAB or MSI files.
To eliminate noise you can narrow the created time from the $FILE_NAME attribute.

Created0x30 is the real time the file was created.

69
Timeline analysis
We can get a timeline by sorting the table on the modified or birth timestamps.

It is more efficient to narrow the time of interest first.

When post processing large tables it is better to work in stages.

Exercise: Build a timeline
Collect Windows.NTFS.MFT from your system
Post process by building a timeline
What happened on the machine in today's session?
What files were modified?
Prefetch
Link files
Logfiles


70

71
Many binaries are timestomped naturally because they come from CAB or MSI files.
To eliminate noise you can narrow the created time from the $FILE_NAME attribute

The $I30 INDX stream
In NTFS a directory is simply an MFT entry with $I30 streams. The streams contains a B+ tree of the MFT entries in the directory.

Since INDX streams are a B+ tree when a record is deleted, the tree will be reordered. Sometimes this leaves old entries in the slack space.
72

73
INDX stream is allocated in 4096 byte blocks. Contains information about the directory contents.

74
INDX stream is allocated in 4096 bytes. Contains information about the directory contents.

Carving INDX headers
https://www.fireeye.com/blog/threat-research/2012/10/incident-response-ntfs-indx-buffers-part-4-br-internal.html
75

Exercise: Experiment with $I30 carving
Add and remove files from a directory and observe which files can be carved from the $I30 stream.
See previous slide to verify the process.
76

Exercise: Write an artifact
Sometimes we need to prove that a file used to exist in a directory - just the presence of the name and timestamps is significant!

Example:
FIN8 deletes prefetch files https://attack.mitre.org/techniques/T1107/

Write an artifact that recovers the filenames of deleted files in directories.
77

Exercise: Write an artifact



SELECT * FROM foreach(
   row={
     SELECT FullPath, Data.mft AS MFT
     FROM glob(globs=DirectoryGlobs, accessor="ntfs")
     WHERE IsDir
   },
   query={
     SELECT FullPath, Name, NameType, Size, AllocatedSize,
            IsSlack, SlackOffset, Mtime, Atime, Ctime, Btime, MFTId
     FROM parse_ntfs_i30(device=FullPath, inode=MFT)
})
78

The USN journal
Update Sequence Number Journal or Change journal is maintained by NTFS to record filesystem changes.
Records metadata about filesystem changes.
Resides in the path $Extend\$UsnJrnl:$J

79

USN Journal
Records are appended to the file at the end
The file is sparse - periodically NTFS will remove the range at the start of the file to make it sparse
Therefore the file will report a huge size but will actually only take about 30-40mb on disk.
When collecting the journal file, Velociraptor will collect the sparse file.
80

81

82
Velociraptor uploads only ranges with data. An index file contains the ranges offsets.
Downloading the file from the "Uploaded Files" tab will pad the sparse regions.

OR

Exporting the data in a zip file will include both the sparse file and the idx file.

83
Parsing USN journal
Velociraptor can parse each entry in the journal
Remember the beginning of the file is sparse, we start parsing from the first valid range.
The USN value is the offset in the file.
The journal records many interactions with each file.
The USN journal can go back a week or two
You can find evidence of files long removed!


84
You can collect the USN journal using the Windows.Forensics.Usn artifact!



85
The USN journal can be used to gather evidence of historical file modifications!

86
Exercise: Post process USN
Collect the USN journal from the endpoint
Establish:
Which files were downloaded to the Downloads folder?
Program execution through prefetch?
Which files were opened through link file analysis?

Conclusions
Velociraptor implements state of the art forensic analysis capabilities in the client agent
These capabilities are exposed via VQL plugins/function
Putting together these capabilities in arbitrary combinations is the real strength:
Velociraptor can enrich forensic analysis results with extra endpoint state
Artifacts can be adapted on the fly to respond to new threats
87

Conclusions
In this module we learned about:
Globbing is a powerful method to search files by filename patterns
Velociraptor extends the concept of filesystems by providing Accessors. Therefore all plugins can operate on file-like objects like compressed archives, registry keys, MFT entries and raw parsed NTFS files.
88

Conclusions
Velociraptor exposes deep level filesystem analysis
NTFS analysis can recover evidence of deleted files
Timestomping can be uncovered using additional low level NTFS analysis.
USN Journal shows historical file manipulation
Velociraptor exposes Volume Shadow Copies via the NTFS analysis engine.
89
