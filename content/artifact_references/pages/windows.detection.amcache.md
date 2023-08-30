---
title: Windows.Detection.Amcache
hidden: true
tags: [Client Artifact]
---

This artifact collects AMCache entries with a SHA1 hash to enable threat
detection.

AmCache is an artifact which stores metadata related to PE execution and
program installation on Windows 7 and Server 2008 R2 and above. This artifact
includes EntryName, EntryPath and SHA1 as great data points for IOC collection.
Secondary datapoints include publisher/company, BinaryType and OriginalFileName.

Available filters include:

  - SHA1regex - regex entries to filter by SHA1.
  - PathRegex - filter on path if available.
  - NameRegex - filter on EntryName OR OriginalFileName.

NOTE:

  - Secondary fields are not consistent across AMCache types and some legacy
  versions do not return these fields.
  - Some enrichment has occured but any secondary fields should be treated as
  guidance only.
  - This artifact collects only entries with a SHA1, for complete AMCache
  analysis please download raw artifact sets.


<pre><code class="language-yaml">
name: Windows.Detection.Amcache
author: Matt Green - @mgreen27
description: |
    This artifact collects AMCache entries with a SHA1 hash to enable threat
    detection.

    AmCache is an artifact which stores metadata related to PE execution and
    program installation on Windows 7 and Server 2008 R2 and above. This artifact
    includes EntryName, EntryPath and SHA1 as great data points for IOC collection.
    Secondary datapoints include publisher/company, BinaryType and OriginalFileName.

    Available filters include:

      - SHA1regex - regex entries to filter by SHA1.
      - PathRegex - filter on path if available.
      - NameRegex - filter on EntryName OR OriginalFileName.

    NOTE:

      - Secondary fields are not consistent across AMCache types and some legacy
      versions do not return these fields.
      - Some enrichment has occured but any secondary fields should be treated as
      guidance only.
      - This artifact collects only entries with a SHA1, for complete AMCache
      analysis please download raw artifact sets.

reference:
  - https://www.ssi.gouv.fr/uploads/2019/01/anssi-coriin_2019-analysis_amcache.pdf

parameters:
  - name: AMCacheGlob
    default: &quot;%SYSTEMROOT%/appcompat/Programs/Amcache.hve&quot;
    description: AMCache hive path
  - name: KeyPathGlob
    default: /Root/{Inventory, File}*/**
    type: hidden
    description: Registry key path glob
  - name: SHA1Regex
    default: .
    description: Regex of SHA1s to filter
    type: regex
  - name: PathRegex
    description: Regex of recorded path.
    type: regex
  - name: NameRegex
    description: Regex of entry / binary name
    type: regex

sources:
  - query: |
        LET files &lt;= SELECT OSPath
           FROM glob(globs=expand(path=AMCacheGlob))

        SELECT * FROM foreach(row=files,
                query={
                    SELECT
                      Key.OSPath.DelegatePath As HivePath,
                      Key.OSPath.Path as EntryKey,
                      Key.ModTime as KeyMTime,

                      -- Key is like \Root\InventoryDriverBinary\&quot;c:/windows/system32/drivers/1394ohci.sys&quot;
                      Key.OSPath.Components[1] as EntryType,

                      if(condition=get(member=&quot;FileId&quot;),
                         then=strip(string=FileId, prefix=&#x27;0000&#x27;),
                      else=if(condition=get(member=&quot;101&quot;),
                         then=strip(string=`101`, prefix=&#x27;0000&#x27;),
                      else=if(condition=get(member=&quot;DriverId&quot;),
                         then=strip(string=DriverId, prefix=&#x27;0000&#x27;)))) as SHA1,

                      if(condition=get(member=&quot;Name&quot;),
                         then=Name,
                      else=if(condition=get(member=&quot;FriendlyName&quot;),
                         then=FriendlyName,
                      else=if(condition=get(member=&quot;15&quot;),
                         then=split(string=str(str=`15`), sep=&#x27;\\\\&#x27;)[-1],
                      else=if(condition=get(member=&quot;DriverName&quot;),
                         then=DriverName)))) as EntryName,

                      if(condition=get(member=&quot;LowerCaseLongPath&quot;),
                          then=LowerCaseLongPath,
                      else=if(condition=get(member=&quot;15&quot;),
                          then=`15`,
                      else=if(condition=get(member=&quot;AddinCLSID&quot;),
                          then=AddinCLSID))) as EntryPath,

                      if(condition=get(member=&quot;Publisher&quot;),
                          then=Publisher,
                      else=if(condition=get(member=&quot;Provider&quot;),
                          then=Provider,
                      else=if(condition=get(member=&quot;DriverCompany&quot;),
                          then=DriverCompany))) as Publisher,

                      get(member=&quot;OriginalFileName&quot;) AS OriginalFileName,

                      if(condition=get(member=&quot;BinaryType&quot;),
                         then=BinaryType,
                      else=if(condition=get(member=&quot;AddInType&quot;),
                         then=AddinType + &#x27; &#x27; + OfficeArchitecture,
                      else=if(condition=Key.OSPath.Path =~ &#x27;InventoryDevicePnp&#x27;,
                         then=&#x27;DevicePnp&#x27;,
                      else=if(condition=Key.OSPath.Path =~ &#x27;InventoryDriverBinary&#x27;,
                         then=&#x27;DriverBinary&#x27;)))) as BinaryType

                    FROM read_reg_key(
                        globs=KeyPathGlob,
                        root=pathspec(DelegatePath=OSPath),
                        accessor=&#x27;raw_reg&#x27;)
                    WHERE SHA1
                        AND SHA1 =~ SHA1Regex
                        AND if(condition= NameRegex,
                                then= EntryName =~ NameRegex OR OriginalFileName =~ NameRegex,
                                else= True)
                        AND if(condition= PathRegex,
                            then= EntryPath =~ PathRegex,
                            else= True)
            })
</code></pre>

