---
title: Windows.Search.Yara
hidden: true
tags: [Client Artifact]
---

Searches for a specific malicious file or set of files by a Yara rule.


<pre><code class="language-yaml">
name: Windows.Search.Yara
description: |
  Searches for a specific malicious file or set of files by a Yara rule.

parameters:
    - name: nameRegex
      description: Only file names that match this regular expression will be scanned.
      default: &quot;(exe|txt|dll|php)$&quot;
      type: regex
    - name: AlsoUpload
      type: bool
      description: Also upload matching files.
    - name: yaraRule
      type: yara
      description: The Yara Rule to search for.
      default: |
        rule Hit {
            strings:
              $a = &quot;Keyword&quot; nocase wide ascii
            condition:
              any of them
        }

    - name: NTFS_CACHE_TIME
      type: int
      description: How often to flush the NTFS cache. (Default is never).
      default: &quot;1000000&quot;

precondition:
    SELECT * FROM info() WHERE OS =~ &quot;windows&quot;

sources:
  - query: |
        LET Root = pathspec(parse=&quot;C:&quot;, path_type=&quot;ntfs&quot;)

        -- Progress logging for newer clients
        LET fileList = SELECT * FROM if(condition=version(function=&quot;log&quot;) &gt; 1,
        then={
          SELECT Root + OSPath AS OSPath
          FROM parse_mft(accessor=&quot;ntfs&quot;,filename=Root+&quot;$MFT&quot;)
          WHERE InUse
            AND log(message=&quot;Processing entry %v&quot;, args=EntryNumber, dedup=5)
            AND FileName =~ nameRegex
            AND NOT OSPath =~ &quot;WinSXS&quot;
            AND log(message=&quot;Scanning file %v&quot;, args=OSPath, dedup=5)

        }, else={
          SELECT Root + OSPath AS OSPath
          FROM parse_mft(accessor=&quot;ntfs&quot;,filename=Root+&quot;$MFT&quot;)
          WHERE InUse
            AND FileName =~ nameRegex
            AND NOT OSPath =~ &quot;WinSXS&quot;
        })

        -- These files are typically short - only report a single hit.
        LET search = SELECT Rule, String.Offset AS HitOffset,
             str(str=String.Data) AS HitContext,
             FileName,
             File.Size AS Size,
             File.ModTime AS ModTime
        FROM yara(
            rules=yaraRule, key=&quot;A&quot;,
            files= OSPath)
        LIMIT 1

        SELECT *, if(condition=AlsoUpload, then=upload(file=FileName)) AS Upload
        FROM foreach(row=fileList, query=search)

</code></pre>

