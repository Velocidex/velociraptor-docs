---
title: Server.Utils.CreateMSI
hidden: true
tags: [Server Artifact]
---

Build an MSI ready for deployment in the current org.


<pre><code class="language-yaml">
name: Server.Utils.CreateMSI
description: |
  Build an MSI ready for deployment in the current org.

type: SERVER

parameters:
  - name: AlsoBuild_x86
    description: Also build 32 bit MSI for deployment.
    type: bool

sources:
- query: |
    LET Build(Target) = repack(
        upload_name=format(
          format=&#x27;Org_%v_%v&#x27;,
          args=[org().name, inventory_get(tool=Target).Definition.filename]),
        target=Target,
        config=serialize(format=&#x27;yaml&#x27;, item=org()._client_config))

    SELECT * FROM chain(a={
       SELECT Build(Target=&quot;VelociraptorWindowsMSI&quot;) FROM scope()
    }, b={
       SELECT Build(Target=&quot;VelociraptorWindows_x86MSI&quot;) FROM scope()
       WHERE AlsoBuild_x86
    })

</code></pre>

