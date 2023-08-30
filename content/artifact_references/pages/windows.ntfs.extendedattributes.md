---
title: Windows.NTFS.ExtendedAttributes
hidden: true
tags: [Client Artifact]
---

Adversaries may use NTFS file attributes for defence evasion to hide malicious
data. This artifact parses NTFS Extended attributes ($EA).
The artifact firstly queries the MFT, then enriches NTFS data to check for
Extended Attributes. Several filters can be applied such as file search,
Extended Attribute size, name or content.

NOTE:
By default an EAName exclusion has been applied to filter some common $EA names
found on Windows System. Recommended hunt would be by rare name or $EA size.
By default we only parse $EA and discard $EA_INFORMATION. $EA_INFORMATION
typically is very small and available in NtfsMetadata field of output.


<pre><code class="language-yaml">
name: Windows.NTFS.ExtendedAttributes
author: &quot;Matt Green - @mgreen27&quot;
description: |
  Adversaries may use NTFS file attributes for defence evasion to hide malicious
  data. This artifact parses NTFS Extended attributes ($EA).
  The artifact firstly queries the MFT, then enriches NTFS data to check for
  Extended Attributes. Several filters can be applied such as file search,
  Extended Attribute size, name or content.

  NOTE:
  By default an EAName exclusion has been applied to filter some common $EA names
  found on Windows System. Recommended hunt would be by rare name or $EA size.
  By default we only parse $EA and discard $EA_INFORMATION. $EA_INFORMATION
  typically is very small and available in NtfsMetadata field of output.


reference:
  - https://attack.mitre.org/techniques/T1564/004/
  - https://posts.specterops.io/host-based-threat-modeling-indicator-design-a9dbbb53d5ea
  - http://inform.pucp.edu.pe/~inf232/Ntfs/ntfs_doc_v0.5/attributes/ea.html

parameters:
  - name: MFTDrive
    default: &quot;C:&quot;
  - name: HostPathRegex
    description: &quot;Regex search over OSPath.&quot;
    default: &quot;.&quot;
    type: regex
  - name: DateAfter
    type: timestamp
    description: &quot;search for host files with timestamps after this date. YYYY-MM-DDTmm:hh:ssZ&quot;
  - name: DateBefore
    type: timestamp
    description: &quot;search for  host files with timestamps before this date. YYYY-MM-DDTmm:hh:ssZ&quot;
  - name: AllDrives
    type: bool
    description: &quot;Select MFT search on all attached ntfs drives.&quot;
  - name: EANameRegex
    description: &quot;$EA Name regex filter to include in results.&quot;
    default: .
    type: regex
  - name: EANameExclusion
    description: Regex of ADS name to exclude.
    default: ^(\$KERNEL\.PURGE\.(ESBCACHE|APPXFICACHE)|\$CI\.CATALOGHINT|\w{8}-\w{4}-\w{4}-\w{4}-\w{12}\.CSC\.\w+)$
    type: regex
  - name: EAContentRegex
    description: &quot;$EA content to search for by regex.&quot;
    default: .
    type: regex
  - name: SizeMax
    type: int64
    description: &quot;Total $EA attributes in the MFT under this size in bytes.&quot;
    default: 100000
  - name: SizeMin
    type: int64
    description: &quot;Total $EA attributes in the MFT over this size in bytes.&quot;
    default: 0
  - name: UploadHits
    type: bool
    description: &quot;Upload complete complete attribute data.&quot;

sources:
  - query: |
      LET Profile = &#x27;&#x27;&#x27;[
         [&quot;EAData&quot;, 0, [
            [&quot;Entries&quot;, 0, &quot;Array&quot;,{
                &quot;type&quot;: &quot;EA&quot;,
                &quot;count&quot;: 99 }],
         ]],
         [&quot;EA&quot;, &quot;x=&gt;x.__NextOffset&quot;, [
            [&quot;__NextOffset&quot;, 0, &quot;uint32&quot;],
            [&quot;__NameLength&quot;, 5, &quot;uint8&quot;],
            [&quot;__ValueLength&quot;, 6, &quot;uint16&quot;],
            [&quot;Name&quot;, 8, String, {
                length: &quot;x=&gt;x.__NameLength&quot; }],
            [&quot;Flags&quot;, 4, &quot;uint8&quot;],
            [&quot;ValueLength&quot;, 6, &quot;uint16&quot;],
            [&quot;Value&quot;, &quot;x=&gt;9 + x.__NameLength&quot;, &quot;String&quot;,{
                term: &quot;********** NO TERM **********&quot;,
                length: &quot;x=&gt;x.__ValueLength&quot;,
                max_length: 10000 }],
       ]]
       ]&#x27;&#x27;&#x27;

      -- find all MFT entries with an $EA - ignore VSS
      LET mft_entries = SELECT *,
            parse_ntfs(mft=EntryNumber, device=MFTDrive ) as NtfsMetadata
        FROM Artifact.Windows.NTFS.MFT(
           MFTDrive=MFTDrive,
           Accessor=&#x27;ntfs&#x27;,
           PathRegex=HostPathRegex,
           DateAfter=DateAfter,
           DateBefore=DateBefore,
           AllDrives=AllDrives)
        WHERE -- NOT OSPath =~ &#x27;HarddiskVolumeShadowCopy&#x27; AND
          NtfsMetadata.Attributes.Type =~ &#x27;^\\$EA&#x27;

      -- enrich results for size filter, dropping metadata field output as this attribute is viewable in Ntfs field.
      LET enriched_results = SELECT OSPath,NtfsMetadata,
            --{ SELECT * FROM NtfsMetadata.Attributes WHERE Type = &#x27;$EA_INFORMATION&#x27;} as _EA_INFORMATION_Metadata,
            { SELECT * FROM NtfsMetadata.Attributes WHERE Type = &#x27;$EA&#x27;} as _EA_Metadata
        FROM mft_entries
        WHERE _EA_Metadata.Size &gt; SizeMin AND _EA_Metadata.Size &lt; SizeMax

      -- parse EA attribute
      LET parse_ea = SELECT OSPath, NtfsMetadata, _EA_Metadata,
            parse_binary(accessor=&quot;mft&quot;,
                filename=NtfsMetadata.Device + _EA_Metadata.Inode,
                profile=Profile, struct=&quot;EAData&quot;).Entries AS EA
        FROM enriched_results

      -- flattern results and output a row for each EA parsed
      LET flatten_results = SELECT  OSPath, NtfsMetadata, EA, _EA_Metadata
        FROM flatten(
            query={
                SELECT *
                    {
                        SELECT Name,Value,Flags,ValueLength
                        FROM foreach(row=EA)
                    } as EA
                FROM parse_ea
                WHERE EA.Name =~ EANameRegex
                    AND NOT if(condition=EANameExclusion,
                            then= EA.Name =~ EANameExclusion,
                            else= False )
                    AND EA.Value =~ EAContentRegex
            })

      -- upload extended EA data
      LET upload_hits=SELECT OSPath, NtfsMetadata, EA,
            upload(file=NtfsMetadata.Device + _EA_Metadata.Inode,accessor=&#x27;mft&#x27;) AS Upload
            --upload(file=Ntfs.Device + _EA_INFORMATION_Metadata.Inode,accessor=&#x27;mft&#x27;) AS EA_INFORMATION_Upload
        FROM flatten_results

      -- return rows
      SELECT *
      FROM if(condition=UploadHits,
        then=upload_hits,
        else=flatten_results)

</code></pre>

