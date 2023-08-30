---
title: Windows.Detection.Service.Upload
hidden: true
tags: [Client Event Artifact]
---

When a new service is installed, upload the service binary to the server


<pre><code class="language-yaml">
name: Windows.Detection.Service.Upload
description: |
  When a new service is installed, upload the service binary to the server

type: CLIENT_EVENT

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

sources:
  - query: |
      // Sometimes the image path contains the full command line - we
      // try to extract the first parameter as the binary itself. Deal
      // with two options - either quoted or not.
      SELECT ServiceName, upload(file=regex_replace(
                    source=ImagePath,
                    replace=&quot;$2&quot;,
                    re=&#x27;^(&quot;([^&quot;]+)&quot; .+|([^ ]+) .+)&#x27;)) AS Upload,
               Timestamp, _EventData, _System
      FROM Artifact.Windows.Events.ServiceCreation()

</code></pre>

