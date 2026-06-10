---
title: Server.Utils.ListUsers
hidden: true
sitemap:
  disable: true
tags: [Server Artifact]
description: |
  Enumerates all users across orgs along with their roles and permissions.
---

Enumerates all users across orgs along with their roles and permissions.

NOTE: When collected in an org context, only users belonging to the
current org are visible. When collected in the context of the root
org, all users in all orgs are visible.


<pre><code class="language-yaml">
name: Server.Utils.ListUsers
description: |
  Enumerates all users across orgs along with their roles and permissions.

  NOTE: When collected in an org context, only users belonging to the
  current org are visible. When collected in the context of the root
  org, all users in all orgs are visible.

type: SERVER

sources:
  - query: |
      SELECT * FROM gui_users(all_orgs=TRUE)

</code></pre>

