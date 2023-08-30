---
title: MacOS.Detection.InstallHistory
hidden: true
tags: [Client Artifact]
---

This artifact collects entries from the InstallHistory .plist file


<pre><code class="language-yaml">
name: MacOS.Detection.InstallHistory
description: |
  This artifact collects entries from the InstallHistory .plist file

type: CLIENT

author: Wes Lambert - @therealwlambert

precondition: SELECT OS FROM info() WHERE OS =~ &#x27;darwin&#x27;

parameters:
- name: InstallHistoryGlob
  default: /Library/Receipts/InstallHistory.plist

sources:
- name: Install History
  query: |
    LET SWplist = SELECT OSPath FROM glob(globs=InstallHistoryGlob)

    LET SoftwareDetails =
            SELECT * FROM foreach(
                row=plist(file=OSPath),
                query={
                    SELECT
                        get(member=&quot;displayName&quot;, default=&quot;&quot;) AS DisplayName,
                        get(member=&quot;displayVersion&quot;, default=&quot;&quot;) AS DisplayVersion,
                        get(member=&quot;processName&quot;, default=&quot;&quot;) AS ProcessName,
                        get(member=&quot;date&quot;, default=&quot;&quot;) AS InstallDate,
                        get(member=&quot;contentType&quot;, default=&quot;&quot;) AS ContentType,
                        get(member=&quot;packageIdentifiers&quot;, default=&quot;&quot;) AS PackageIdentifiers
                    FROM scope()
            })
    SELECT * FROM foreach(row=SWplist, query=SoftwareDetails)

</code></pre>

