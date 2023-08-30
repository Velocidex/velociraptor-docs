---
title: Server.Internal.Welcome
hidden: true
tags: [Server Artifact]
---

This is the welcome screen in the Velociraptor GUI. You can
customize this screen by editing this artifact.

When editing the artifact in the main `View Artifacts` screen you
will see some markdown in the reports section of the YAML
file. Simply edit this markdown and your server will display your
customized report.

You can use this to add important information to your specific
deployment.


<pre><code class="language-yaml">
name: Server.Internal.Welcome
description: |
  This is the welcome screen in the Velociraptor GUI. You can
  customize this screen by editing this artifact.

  When editing the artifact in the main `View Artifacts` screen you
  will see some markdown in the reports section of the YAML
  file. Simply edit this markdown and your server will display your
  customized report.

  You can use this to add important information to your specific
  deployment.

type: SERVER

reports:
  - type: CLIENT
    template: |
      &lt;div class=&quot;row dashboard &quot;&gt;
      &lt;div class=&quot;card col-10&quot;&gt;
      &lt;img src=&quot;./velo.svg&quot; height=&quot;150&quot;&gt;
      &lt;div class=&quot;card-body&quot;&gt;

      # Welcome to Velociraptor!

      ## Common tasks:

      * &lt;a href=&quot;#/dashboard&quot;&gt;Inspect the server&#x27;s state&lt;/a&gt;
      * &lt;a href=&quot;#/collected/server&quot;&gt;Build an Offline Collector&lt;/a&gt;
      * &lt;a href=&quot;#/notebooks&quot;&gt;Write VQL notebooks&lt;/a&gt;
      * &lt;a href=&quot;#/host/server&quot;&gt;View Server Configuration&lt;/a&gt;
      * &lt;a href=&quot;#/events/server/Server.Audit.Logs&quot;&gt;Inspect Server Audit Log&lt;/a&gt;
      * &lt;a href=&quot;#/artifacts/Server.Internal.Welcome&quot;&gt;Customize this welcome screen&lt;/a&gt;

      Or simply search for a client in the search bar above.

      You can always get back to this welcome screen by clicking the
      little green reptile above!

      ## Tips

      1. Press `Ctrl-/` to view keyboard hotkeys.

      &lt;/div&gt;&lt;/div&gt;&lt;/div&gt;

</code></pre>

