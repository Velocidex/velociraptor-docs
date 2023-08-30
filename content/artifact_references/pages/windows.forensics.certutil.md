---
title: Windows.Forensics.CertUtil
hidden: true
tags: [Client Artifact]
---

The Windows Certutil binary is capable of downloading arbitrary
files. Attackers typically use it to fetch tools undetected using
Living off the Land (LOL) techniques.

Certutil maintains a cache of the downloaded files and this contains
valuable metadata. This artifact parses this metadata to establish
what was downloaded and when.


<pre><code class="language-yaml">
name: Windows.Forensics.CertUtil
description: |
  The Windows Certutil binary is capable of downloading arbitrary
  files. Attackers typically use it to fetch tools undetected using
  Living off the Land (LOL) techniques.

  Certutil maintains a cache of the downloaded files and this contains
  valuable metadata. This artifact parses this metadata to establish
  what was downloaded and when.

reference:
  - https://u0041.co/blog/post/3
  - https://thinkdfir.com/2020/07/30/certutil-download-artefacts/
  - https://lolbas-project.github.io/lolbas/Binaries/Certutil/

parameters:
  - name: MinSize
    type: int
    description: Only show contents larger than this size.
  - name: URLWhitelist
    type: csv
    default: |
      URL
      http://sf.symcd.com
      http://oneocsp.microsoft.com
      http://certificates.godaddy.com
      http://ocsp.pki.goog
      http://repository.certum.pl
      http://www.microsoft.com
      http://ocsp.verisign.com
      http://ctldl.windowsupdate.com
      http://ocsp.sectigo.com
      http://ocsp.usertrust.com
      http://ocsp.comodoca.com
      http://cacerts.digicert.com
      http://ocsp.digicert.com
  - name: MetadataGlobUser
    default: C:/Users/*/AppData/LocalLow/Microsoft/CryptnetUrlCache/MetaData/*
  - name: MetadataGlobSystem
    default: C:/Windows/*/config/systemprofile/AppData/LocalLow/Microsoft/CryptnetUrlCache/MetaData/*
  - name: AlsoUpload
    type: bool

  - name: VSSAnalysisAge
    type: int
    default: 0
    description: |
      If larger than zero we analyze VSS within this many days
      ago. (e.g 7 will analyze all VSS within the last week).  Note
      that when using VSS analysis we have to use the ntfs accessor
      for everything which will be much slower.


sources:
  - query: |
      LET VSS_MAX_AGE_DAYS &lt;= VSSAnalysisAge
      LET Accessor = if(condition=VSSAnalysisAge &gt; 0, then=&quot;ntfs_vss&quot;, else=&quot;auto&quot;)

      LET Profile = &#x27;[
        [&quot;Header&quot;, 0, [
          [&quot;UrlSize&quot;, 12, &quot;uint32&quot;],
          [&quot;HashSize&quot;, 100, &quot;uint32&quot;],
          [&quot;DownloadTime&quot;, 16, &quot;uint64&quot;],
          [&quot;FileSize&quot;, 112, &quot;uint32&quot;],
          [&quot;URL&quot;, 116, &quot;String&quot;, {
              &quot;encoding&quot;: &quot;utf16&quot;,
              &quot;length&quot;: &quot;x=&gt;x.UrlSize&quot;
          }],
          [&quot;Hash&quot;, &quot;x=&gt;x.UrlSize + 116&quot;, &quot;String&quot;, {
              &quot;encoding&quot;: &quot;utf16&quot;,
              &quot;length&quot;: &quot;x=&gt;x.HashSize&quot;
          }]
        ]]
      ]&#x27;

      -- Build a whitelist regex
      LET URLRegex &lt;= &quot;^&quot; + join(array=URLWhitelist.URL, sep=&quot;|&quot;)
      LET Files = SELECT OSPath,

          -- Parse each metadata file.
          parse_binary(filename=OSPath, accessor=Accessor,
                       profile=Profile,
                       struct=&quot;Header&quot;) AS Header,

          -- The content is kept in the Content directory.
          OSPath.Dirname.Dirname + &quot;Content&quot; + OSPath.Basename AS _ContentPath,
          read_file(length=4, accessor=Accessor,
                filename=OSPath.Dirname.Dirname + &quot;Content&quot; + OSPath.Basename) AS ContentHeader
      FROM glob(globs=[MetadataGlobUser, MetadataGlobSystem], accessor=Accessor)
      WHERE Header.FileSize &gt; MinSize

      SELECT OSPath AS _MetadataFile, _ContentPath,
               if(condition=AlsoUpload, then=upload(file=OSPath, accessor=Accessor)) AS _MetdataUpload,
               if(condition=AlsoUpload, then=upload(file=_ContentPath, accessor=Accessor)) AS _Upload,
               Header.URL AS URL,
               Header.FileSize AS FileSize,
               regex_replace(re=&#x27;&quot;&#x27;, replace=&quot;&quot;, source=Header.Hash) AS Hash,
               timestamp(winfiletime=Header.DownloadTime) AS DownloadTime,
               if(condition= ContentHeader=~ &#x27;MZ&#x27;,
                    then= parse_pe(file= _ContentPath, accessor=Accessor).VersionInformation,
                    else= &#x27;N/A&#x27; ) as VersionInformation,
               if(condition= ContentHeader=~ &#x27;MZ&#x27;,
                    then= authenticode(filename= _ContentPath, accessor=Accessor),
                    else= &#x27;N/A&#x27; ) as Authenticode

      FROM Files
      WHERE NOT URL =~ URLRegex

</code></pre>

