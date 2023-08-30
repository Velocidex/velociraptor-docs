---
title: Windows.Forensics.BulkExtractor
hidden: true
tags: [Client Artifact]
---

This content will execute bulk_extractor with record carving plugins from
4n6ist. Initially developed to carve EventLogs from physical disk and
unallocated space, this content may also be leveraged for other
bulk extractor capability. Best use case is for remote targeted machine
collection to remove the need for a disk image.

**Settings**
Target - Can be \\\\.\\PhysicalDrive[X], \\\\?\\HarddiskVolumeShadowCopy[Y]
or C:\\Folder\\Path"
TargetAllPhysical - boolean option to include all attached physical disks
TargetVSS - boolean option to target all VSC
CarveEvtx - boolean option to include evtx carving
FindRegex - regex to include for BulkExtractor find plugins

FreeCommand - supersedes evtx or find options and allows free form switch
generation for adlib use cases.
e.g '-E evtx, -e zip -S unzip_carve_mode=2'"
Will add:
command prefix: "-q 99999999999 -R'" and
postfix: "-o [Outfolder] [Target]".
To make: bulk_extractor q 99999999999 -R -E evtx, -e zip -S unzip_carve_mode=2 -o [outfolder] [Target]

If FindRegex or "-f" has been used in FreeCommand the artifact will attempt
to parse find.txt output.

**Note**
1. Currently only supported for x64 bit machines.
2. This artifact usually takes a long time. Ensure default timeout is high
enough for completion.
3. This content is NOT recommended for hunting without great consideration as
bulk_extractor is a multithreaded tool and utilises all CPU available on the
endpoint.
4. The artifact copies carved data to the local disk prior to upload which
is not ideal from a forensic viewpoint.


<pre><code class="language-yaml">
name: Windows.Forensics.BulkExtractor
description: |
    This content will execute bulk_extractor with record carving plugins from
    4n6ist. Initially developed to carve EventLogs from physical disk and
    unallocated space, this content may also be leveraged for other
    bulk extractor capability. Best use case is for remote targeted machine
    collection to remove the need for a disk image.

    **Settings**
    Target - Can be \\\\.\\PhysicalDrive[X], \\\\?\\HarddiskVolumeShadowCopy[Y]
    or C:\\Folder\\Path&quot;
    TargetAllPhysical - boolean option to include all attached physical disks
    TargetVSS - boolean option to target all VSC
    CarveEvtx - boolean option to include evtx carving
    FindRegex - regex to include for BulkExtractor find plugins

    FreeCommand - supersedes evtx or find options and allows free form switch
    generation for adlib use cases.
    e.g &#x27;-E evtx, -e zip -S unzip_carve_mode=2&#x27;&quot;
    Will add:
    command prefix: &quot;-q 99999999999 -R&#x27;&quot; and
    postfix: &quot;-o [Outfolder] [Target]&quot;.
    To make: bulk_extractor q 99999999999 -R -E evtx, -e zip -S unzip_carve_mode=2 -o [outfolder] [Target]

    If FindRegex or &quot;-f&quot; has been used in FreeCommand the artifact will attempt
    to parse find.txt output.

    **Note**
    1. Currently only supported for x64 bit machines.
    2. This artifact usually takes a long time. Ensure default timeout is high
    enough for completion.
    3. This content is NOT recommended for hunting without great consideration as
    bulk_extractor is a multithreaded tool and utilises all CPU available on the
    endpoint.
    4. The artifact copies carved data to the local disk prior to upload which
    is not ideal from a forensic viewpoint.

reference:
  - http://www.kazamiya.net/en/bulk_extractor-rec
  - http://downloads.digitalcorpora.org/downloads/bulk_extractor/BEUsersManual.pdf
  - https://simson.net/clips/academic/2013.COSE.bulk_extractor.pdf

author: Matt Green - @mgreen27

required_permissions:
  - EXECVE

tools:
  - name: Bulk_Extractor_Binary
    url: https://github.com/Velocidex/Tools/raw/main/BulkExtractor/bulk_extractor.exe
    serve_locally: true

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
  - name: Target
    description: &quot;Target. Can by physical drive, \\\\?\\HarddiskVolumeShadowCopy1 or C:\\Folder\\Path&quot;
    default: \\.\PhysicalDrive0
  - name: TargetAllPhysical
    description: &quot;Target all attached physical drives&quot;
    type: bool
  - name: TargetVSS
    description: &quot;Target all VSC. Note: Not targeted to folder. Velociraptor CAN collect from the Volume Shadow direct targeted to folder with ntfs accessor so there may be a better way.&quot;
    type: bool
  - name: CarveEvtx
    description: &quot;Carve EVTX files&quot;
    type: bool
  - name: FindRegex
    description: &quot;Regex for Bulk_extractor find plugin&quot;
  - name: FreeCommand
    description: &quot;Bulk_extractor custom commands. .e.g &#x27;-E evtx, -e zip -S unzip_carve_mode=2&#x27;&quot;

sources:
  - query: |
      LET bin &lt;= SELECT *
        FROM Artifact.Generic.Utils.FetchBinary(ToolName=&quot;Bulk_Extractor_Binary&quot;)
      LET tempfolder &lt;= tempdir()
      LET ExePath &lt;= tempfile(extension=&quot;.exe&quot;)

      LET target = SELECT
            DeviceID,
            if(condition=DeviceID=~&quot;^\\\\\\\\.\\\\&quot;,
                then=split(string=split(string=DeviceID,sep=&#x27;\\\\\\\\.\\\\&#x27;)[1],
                    sep=&#x27;\\\\&#x27;)[0],
                else=&quot;bulk_out&quot;) as base,
            _DeviceID
      FROM chain(
            a={
                SELECT
                    DeviceID,
                    upcase(string=DeviceID) as _DeviceID
                FROM Artifact.Windows.Sys.DiskInfo()
                WHERE TargetAllPhysical
            },
            b={
                SELECT
                    Target as DeviceID,
                    upcase(string=Target) as _DeviceID
                FROM scope()
                WHERE Target =~ &#x27;.&#x27;
            },
            c={
                SELECT
                    regex_replace(source=OSPath,
                        re=&quot;GLOBALROOT\\\\Device\\\\&quot;,replace=&quot;&quot;)AS DeviceID,
                    Data.ID AS ShadowCopyID,
                    upcase(string=regex_replace(source=OSPath,
                        re=&quot;GLOBALROOT\\\\Device\\\\&quot;,replace=&quot;&quot;)) as _DeviceID
                FROM glob(globs=&#x27;/*&#x27;, accessor=&#x27;ntfs&#x27;)
                WHERE ShadowCopyID AND TargetVSS
                ORDER by OSPath
            })
            GROUP BY _DeviceID

      LET cmdline = SELECT (bin[0].OSPath, &#x27;-q&#x27;, &#x27;99999999999&#x27;, &#x27;-R&#x27;) +
                           CMD + &#x27;-o&#x27; as CMD FROM switch(
            a= {
                SELECT commandline_split(command=FreeCommand) AS CMD
                FROM scope()
                WHERE FreeCommand
            },
            b= {
                SELECT
                    (&#x27;-E&#x27;,&#x27;evtx&#x27;,&#x27;-e&#x27;,&#x27;find&#x27;,&#x27;-f&#x27;,FindRegex) AS CMD
                FROM scope()
                WHERE CarveEvtx AND FindRegex
            },
            c= {
                SELECT (&#x27;-E&#x27;,&#x27;evtx&#x27;) AS CMD
                FROM scope()
                WHERE CarveEvtx
            },
            d= {
                SELECT (&#x27;-E&#x27;,&#x27;find&#x27;,&#x27;-f&#x27;,FindRegex) AS CMD
                FROM scope()
                WHERE FindRegex
            },
            e= {
                SELECT (&#x27;-h&#x27;) AS CMD FROM scope()
            })

      SELECT * FROM foreach(
        row=target,
        query= {
            SELECT *
            FROM execve(
             argv=cmdline[0].CMD + (
                tempfolder + &#x27;\\&#x27; +
                  regex_replace(source=base, re=&#x27;[^a-zA-Z]&#x27;, replace=&#x27;_&#x27;),
                  DeviceID),
             length=10000000, sep=&#x27;\n&#x27;)})

  - name: FindResults
    query: |
      SELECT * FROM foreach(
        row={  SELECT *
               FROM glob(globs=&#x27;/*/find.txt&#x27;, root=tempfolder)
        },
        query={
            SELECT *
            FROM split_records(filenames=OSPath,first_row_is_headers=false,
                columns=[&#x27;Location&#x27;,&#x27;Match&#x27;,&#x27;Data&#x27;],regex=&#x27;\t&#x27;)
            WHERE NOT Location =~ &#x27;#&#x27;
        })
        WHERE FindRegex OR FreeCommand =~ &#x27;-f&#x27;

  - name: Upload
    query: |
      SELECT upload(file=OSPath,
                    name=strip(string=OSPath,prefix=tempfolder)) AS Upload
      FROM glob(globs=&quot;/**&quot;, root=tempfolder)
      WHERE Upload

</code></pre>

