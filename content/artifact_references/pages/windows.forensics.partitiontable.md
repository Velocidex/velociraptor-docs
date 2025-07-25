---
title: Windows.Forensics.PartitionTable
hidden: true
tags: [Client Artifact]
---

Parses the raw disk for partition tables.

This artifact also applies magic() check to indicate the type of
partition stored. If a partition contains NTFS filesystems, the
artifact will also list the top level directory. This allows a quick
overview of what type of partition this is (e.g. System OS or data
drive).

Currently handles only GPT (Most common) and Primary Dos partition
tables


<pre><code class="language-yaml">
name: Windows.Forensics.PartitionTable
description: |
  Parses the raw disk for partition tables.

  This artifact also applies magic() check to indicate the type of
  partition stored. If a partition contains NTFS filesystems, the
  artifact will also list the top level directory. This allows a quick
  overview of what type of partition this is (e.g. System OS or data
  drive).

  Currently handles only GPT (Most common) and Primary Dos partition
  tables

parameters:
  - name: ImagePath
    default: "\\\\?\\GLOBALROOT\\Device\\Harddisk0\\DR0"
    description: Raw Device for main disk containing partition table to parse.
  - name: Accessor
    default: "raw_file"
  - name: SectorSize
    type: int
    default: 512
  - name: MagicRegex
    type: regex
    description: Filter partitions by their magic
    default: .
  - name: NameRegex
    type: regex
    description: Filter partitions by their magic
    default: .

export: |
    LET MBRProfile = '''[
        ["MBRHeader", 0, [
         ["Magic", 0x1FE, "uint16"],
         ["PrimaryPartitions", 0x1BE, Array, {
            type: "PrimaryPartition",
            count: 4,
         }],
        ]],
        ["PrimaryPartition", 16, [
         ["boot", 0, "uint8"],
         ["ptype", 4, "Enumeration", {
             type: "uint8",
             map: {
                 "Unused": 0,
                 "Dos Extended": 0x05,
                 "Win95 Extended": 0x0f,
                 "GPT Safety Partition": 0xee,
                 "NTFS / exFAT": 7,
                 "Hibernation": 0x12,
                 "Linux": 0x83,
                 "Linux Swap": 0x82,
                 "Linux Extended": 0x85,
             }}],
         ["start_sec", 8, "uint32"],
         ["size_sec", 12, "uint32"],
        ]],
        ["GPTHeader", 0, [
         ["signature", 0, "String", {
             length: 8,
         }],
         ["version", 4, "uint32"],
         ["tab_start_lba", 72, "uint64"],
         ["tab_num", 80, "uint32"],
         ["tab_size", 84, "uint32"],
         ["entries", 0, "Profile", {
            type: "Array",
            offset: "x=&gt;x.tab_start_lba * 512",
            type_options: {
             type: "GPTEntry",
             count: "x=&gt;x.tab_num",
            }}]
        ]],
        ["GPTEntry", 128, [
          ["Offset", 0, "Value", {
              value: "x=&gt;x.StartOf",
          }],
          ["type_guid", 0, GUID],
          ["id_guid", 16, GUID],
          ["start_lba", 32, "uint64"],
          ["end_lba", 40, "uint64"],
          ["flag", 48, "uint64"],
          ["name", 56, "String", {
              encoding: "utf16"
          }]
        ]],
        ["GUID", 16, [
          ["__D1", 0, "uint32"],
          ["__D2", 2, "uint16"],
          ["__D3", 4, "uint16"],
          ["__D4", 6, "String", {"term": "", "length": 2}],
          ["__D5", 8, "String", {"term": "", "length": 6}],
          ["Value", 0, "Value", {
            "value": "x=&gt;format(format='{%08x-%04x-%04x-%02x-%02x}', args=[x.__D1, x.__D2, x.__D3, x.__D4, x.__D5])"
          }]
        ]]
        ]
        '''

sources:
  - query: |
        LET GPTHeader &lt;= parse_binary(filename=ImagePath,
           accessor=Accessor,
           profile=MBRProfile,
           struct="GPTHeader",
           offset=SectorSize)

        LET PrimaryPartitions &lt;= parse_binary(filename=ImagePath,
           accessor=Accessor,
           profile=MBRProfile,
           struct="MBRHeader",
           offset=0)

        -- Display GPT - this is by far the most common one on modern
        -- systems.
        LET GPT = SELECT * FROM if(condition=GPTHeader.signature =~ "EFI",
        then={
          SELECT start_lba * SectorSize AS StartOffset,
                 end_lba * SectorSize AS EndOffset,
                 humanize(bytes=(end_lba - start_lba) * SectorSize) AS Size,
                 name
          FROM foreach(row=GPTHeader.entries)
          WHERE start_lba &gt; 0
        })

        -- Display primary partitions
        LET PARTS = SELECT start_sec * SectorSize AS StartOffset,
           ( start_sec + size_sec ) * SectorSize AS EndOffset,
            humanize(bytes=size_sec * SectorSize) AS Size,
            ptype AS name
        FROM foreach(row=PrimaryPartitions.PrimaryPartitions)
        WHERE start_sec &gt; 0

        -- Handle the correct partition types
        LET GetAccessor(Magic) =
        if(condition=Magic =~ "NTFS", then="raw_ntfs",
           else=if(condition=Magic =~ "FAT", then="fat",
           else=if(condition=Magic =~ "EXT[2-4]", then="ext4")))

        LET ListTopDirectory(PartitionPath, Magic) =
        SELECT * FROM if(condition=GetAccessor(Magic=Magic), then={
            SELECT OSPath.Path AS OSPath
            FROM glob(globs="/*",
                      accessor=GetAccessor(Magic=Magic),
                      root=PartitionPath)
        })

        LET PartitionList = SELECT StartOffset, EndOffset, Size, name,
            magic(accessor="data", path=read_file(
              accessor=Accessor,
              filename=ImagePath,
              offset=StartOffset, length=10240)) AS Magic,

            -- The OSPath to access the partition
            pathspec(
              DelegateAccessor="offset",
              Delegate=pathspec(
                 DelegateAccessor=Accessor,
                 DelegatePath=ImagePath,
                 Path=format(format="%d", args=StartOffset))) AS _PartitionPath
        FROM chain(a=PARTS, b=GPT)
        WHERE name =~ NameRegex
          AND Magic =~ MagicRegex

        SELECT StartOffset, EndOffset, Size, name,
            ListTopDirectory(Magic=Magic,
              PartitionPath= _PartitionPath).OSPath AS TopLevelDirectory,
            Magic, _PartitionPath
        FROM PartitionList

</code></pre>

