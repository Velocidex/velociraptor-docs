---
title: Windows.System.HostsFile
hidden: true
tags: [Client Artifact]
---

Parses the Windows Hostsfile.

Regex searching for Hostname and resolutin is enabled over output.
NOTE: For Hostname search is on the hostfile line and regex ^ or $
is not reccomended.


<pre><code class="language-yaml">
name: Windows.System.HostsFile
author: Matt Green - @mgreen27
description: |
   Parses the Windows Hostsfile.

   Regex searching for Hostname and resolutin is enabled over output.
   NOTE: For Hostname search is on the hostfile line and regex ^ or $
   is not reccomended.

type: CLIENT

parameters:
  - name: HostsFile
    default: C:\Windows\System32\drivers\etc\hosts
  - name: HostnameRegex
    description: &quot;Hostname target Regex in Hostsfile&quot;
    default: .
    type: regex

  - name: ResolutionRegex
    description: &quot;Resolution target Regex in Hostsfile&quot;
    default: .
    type: regex

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query: |
      -- Parse hosts file
      Let lines = SELECT split(string=Data,sep=&#x27;\\r?\\n|\\r&#x27;) as List
        FROM read_file(filenames=HostsFile)

      -- extract into fields
      LET results = SELECT * FROM foreach(row=lines,
                query={
                    SELECT parse_string_with_regex(
                        string=_value,
                        regex=[
                            &quot;^\\s*(?P&lt;Resolution&gt;[^\\s]+)\\s+&quot; +
                            &quot;(?P&lt;Hostname&gt;[^\\#]+)\\s*&quot; +
                            &quot;#*\\s*(?P&lt;Comment&gt;.*)$&quot;
                        ]) as Record
                    FROM foreach(row=List)
                    WHERE _value
                        AND NOT _value =~ &#x27;^\\s*#&#x27;
                        AND _value =~ HostnameRegex
                        AND _value =~ ResolutionRegex
                })

      -- clean up hostname output
      LET hostlist(string)=
            if(condition= len(list=split(string=regex_replace(source=string,
                    re=&#x27;\\s+$&#x27;, replace=&#x27;&#x27;), sep=&#x27;\\s+&#x27;)) = 1,
                then= regex_replace(source=string,re=&#x27;\\s+$&#x27;, replace=&#x27;&#x27;),
                else= split(string=regex_replace(source=string,re=&#x27;\\s+$&#x27;,
                  replace=&#x27;&#x27;), sep=&#x27;\\s+&#x27;))

      -- output rows
      SELECT
        Record.Resolution AS Resolution,
        hostlist(string=Record.Hostname) AS Hostname,
        Record.Comment AS Comment
      FROM results

</code></pre>

