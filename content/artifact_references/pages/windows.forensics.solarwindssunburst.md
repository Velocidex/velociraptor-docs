---
title: Windows.Forensics.SolarwindsSunburst
hidden: true
tags: [Client Artifact]
---

"SolarWinds.Orion.Core.BusinessLayer.dll is a SolarWinds digitally-signed component of the Orion software framework that contains a backdoor that communicates via HTTP to third party servers."

We can look for evidence of this dll by first performing a YARA search on the MFT across all drives, then applying an additional FireEye-supplied rule against the file found via MFT.


<pre><code class="language-yaml">
name: Windows.Forensics.SolarwindsSunburst

description: |
    &quot;SolarWinds.Orion.Core.BusinessLayer.dll is a SolarWinds digitally-signed component of the Orion software framework that contains a backdoor that communicates via HTTP to third party servers.&quot;

    We can look for evidence of this dll by first performing a YARA search on the MFT across all drives, then applying an additional FireEye-supplied rule against the file found via MFT.

reference:
  - https://www.fireeye.com/blog/threat-research/2020/12/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor.html

author: Wes Lambert - @therealwlambert

tools:
  - name: SunburstYARARules
    url: https://raw.githubusercontent.com/fireeye/sunburst_countermeasures/main/all-yara.yar

parameters:
    - name: yaraMFT
      type: yara
      description: &quot;The term we will use to search the MFT&quot;
      default: |
        rule Hit {
           strings:
             $a = &quot;SolarWinds.Orion.Core.BusinessLayer.dll&quot; wide nocase
           condition:
             any of them
        }
    - name: SizeMax
      type: int64
      description: &quot;Entries in the MFT under this size in bytes.&quot;
      default: 1200000
    - name: SizeMin
      type: int64
      description: &quot;Entries in the MFT over this size in bytes.&quot;
      default: 1000000

sources:
  - query: |
      LET yara_rules &lt;= SELECT read_file(filename=OSPath) AS Rule,
           basename(path=OSPath) AS ToolName
        FROM Artifact.Generic.Utils.FetchBinary(
             ToolName=&quot;SunburstYARARules&quot;, IsExecutable=FALSE)

      LET ntfs_drives = SELECT OSPath + &#x27;/$MFT&#x27;as Path, OSPath AS Device
          FROM glob(globs=&quot;/*&quot;, accessor=&quot;ntfs&quot;)

      LET MFTEntries = SELECT * from foreach(
            row=ntfs_drives,
            query={ SELECT Device, String.Offset AS Offset,
               String.HexData AS HexData,
               Device + &quot;\\&quot; + parse_ntfs(device=Device,
                          mft=String.Offset / 1024).OSPath AS FilePath,
               parse_ntfs(device=Device,
                          mft=String.Offset / 1024) AS MFT
            FROM yara(
             rules=yaraMFT, files=Device + &quot;/$MFT&quot;,
             end=10000000000,
             number=1000,
             accessor=&quot;ntfs&quot;)}) WHERE MFT.Size &gt; SizeMin AND MFT.Size &lt; SizeMax

      LET yarasearch = SELECT Rule, String.Offset AS HitOffset,
             str(str=String.Data) AS HitContext,
             FileName,
             File.Size AS Size,
             File.ModTime AS ModTime
        FROM yara(
            rules=yara_rules[0].Rule, key=&quot;A&quot;,
            files=FilePath)
        LIMIT 1

      LET yarahits = SELECT * FROM if(condition=yara_rules,
        then={
          SELECT *
          FROM foreach(row=MFTEntries,query=yarasearch)
        })

      SELECT *,
        hash(path=FileName) AS Hash
      FROM yarahits

</code></pre>

