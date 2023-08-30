---
title: Generic.Forensic.Carving.URLs
hidden: true
tags: [Client Artifact]
---

Carve URLs from files located in a glob. Note that we do not parse
any files - we simply carve anything that looks like a URL.


<pre><code class="language-yaml">
name: Generic.Forensic.Carving.URLs
description: |
  Carve URLs from files located in a glob. Note that we do not parse
  any files - we simply carve anything that looks like a URL.


parameters:
  - name: UrlGlob
    default: |
      [&quot;C:/Documents and Settings/*/Local Settings/Application Data/Google/Chrome/User Data/**&quot;,
       &quot;C:/Users/*/AppData/Local/Google/Chrome/User Data/**&quot;,
       &quot;C:/Documents and Settings/*/Local Settings/History/**&quot;,
       &quot;C:/Documents and Settings/*/Local Settings/Temporary Internet Files/**&quot;,
       &quot;C:/Users/*/AppData/Local/Microsoft/Windows/WebCache/**&quot;,
       &quot;C:/Users/*/AppData/Local/Microsoft/Windows/INetCache/**&quot;,
       &quot;C:/Users/*/AppData/Local/Microsoft/Windows/INetCookies/**&quot;,
       &quot;C:/Users/*/AppData/Roaming/Mozilla/Firefox/Profiles/**&quot;,
       &quot;C:/Documents and Settings/*/Application Data/Mozilla/Firefox/Profiles/**&quot;
       ]

sources:
  - query: |
        LET matching = SELECT OSPath FROM glob(
            globs=parse_json_array(data=UrlGlob))

        SELECT OSPath, URL FROM foreach(
          row=matching,
          query={
            SELECT OSPath,
                   URL FROM parse_records_with_regex(file=OSPath,
               regex=&quot;(?P&lt;URL&gt;https?:\\/\\/[\\w\\.-]+[\\/\\w \\.-]*)&quot;)
          })

</code></pre>

