---
title: Linux.Debian.Packages
hidden: true
tags: [Client Artifact]
---

Parse dpkg status file.

<pre><code class="language-yaml">
name: Linux.Debian.Packages
description: Parse dpkg status file.
parameters:
  - name: linuxDpkgStatus
    default: /var/lib/dpkg/status
sources:
  - precondition: |
      SELECT OS From info() where OS = &#x27;linux&#x27;
    query: |
        /* First pass - split file into records start with
           Package and end with \n\n.

           Then parse each record using multiple RegExs.
        */
        LET packages = SELECT parse_string_with_regex(
            string=Record,
            regex=[&#x27;Package:\\s(?P&lt;Package&gt;.+)&#x27;,
                   &#x27;Installed-Size:\\s(?P&lt;InstalledSize&gt;.+)&#x27;,
                   &#x27;Version:\\s(?P&lt;Version&gt;.+)&#x27;,
                   &#x27;Source:\\s(?P&lt;Source&gt;.+)&#x27;,
                   &#x27;Architecture:\\s(?P&lt;Architecture&gt;.+)&#x27;]) as Record
            FROM parse_records_with_regex(
                   file=linuxDpkgStatus,
                   regex=&#x27;(?sm)^(?P&lt;Record&gt;Package:.+?)\\n\\n&#x27;)

        SELECT Record.Package as Package,
               atoi(string=Record.InstalledSize) as InstalledSize,
               Record.Version as Version,
               Record.Source as Source,
               Record.Architecture as Architecture from packages

</code></pre>

