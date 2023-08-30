---
title: Server.Orgs.ListOrgs
hidden: true
tags: [Server Artifact]
---

This server artifact will list all currently configured orgs on the
server.

NOTE: This artifact is only available to users with the ORG_ADMIN
permission, normally only given to users with the administrator role
while using the root org (You might need to switch to the root org
in the GUI before collecting this artifact).


<pre><code class="language-yaml">
name: Server.Orgs.ListOrgs
description: |
  This server artifact will list all currently configured orgs on the
  server.

  NOTE: This artifact is only available to users with the ORG_ADMIN
  permission, normally only given to users with the administrator role
  while using the root org (You might need to switch to the root org
  in the GUI before collecting this artifact).

type: SERVER

parameters:
- name: AlsoDownloadClientConfigs
  type: bool
  description: When set also downloads client configs from each org

sources:
- query: |
    SELECT * FROM if(condition=AlsoDownloadClientConfigs,
    then={
      SELECT *, upload(file=_client_config,
         accessor=&quot;data&quot;,
         name=format(format=&quot;client.%s.config.yaml&quot;, args=OrgId || &quot;RootOrg&quot;)) AS ClientConfig
      FROM orgs()
    }, else={
      SELECT * FROM orgs()
    })

</code></pre>

