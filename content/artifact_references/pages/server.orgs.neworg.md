---
title: Server.Orgs.NewOrg
hidden: true
tags: [Server Artifact]
---

This server artifact will create a new org and assign the current
user as an admin to it.

NOTE: This artifact is only available to users with the ORG_ADMIN
permission, normally only given to users with the administrator role
while using the root org (You might need to switch to the root org
in the GUI before collecting this artifact).

This artifact will also start a set of server artifacts in the new
org. If you need to run any initialization steps in the new org,
simple package those into a server artifact and include it in the
`InitialArtifacts` parameter.


<pre><code class="language-yaml">
name: Server.Orgs.NewOrg
description: |
  This server artifact will create a new org and assign the current
  user as an admin to it.

  NOTE: This artifact is only available to users with the ORG_ADMIN
  permission, normally only given to users with the administrator role
  while using the root org (You might need to switch to the root org
  in the GUI before collecting this artifact).

  This artifact will also start a set of server artifacts in the new
  org. If you need to run any initialization steps in the new org,
  simple package those into a server artifact and include it in the
  `InitialArtifacts` parameter.

type: SERVER

parameters:
- name: OrgName
  default: "New Org"
  description: |
    The name of the new org. A new Org ID will be assigned.

- name: InitialArtifacts
  type: artifactset
  artifact_type: SERVER
  default: |
    Artifact
    Server.Utils.CreateMSI
    Server.Utils.CreateLinuxPackages
  description: |
    Start the following server artifacts in the new org.

sources:
- query: |
    LET org_record &lt;= org_create(name=OrgName)
    LET _ &lt;= log(message="Created New Org with ID %v", args=org_record.id)

    -- Give the current user permissions to operate in the org.
    LET _ &lt;= user_create(orgs=org_record.id,
                         roles=["administrator", "org_admin"],
                         user=whoami())

    -- Launch this as a separate collection within the Org.
    SELECT * FROM query(
      query={
        SELECT collect_client(artifacts=InitialArtifacts.Artifact, client_id="server")
        FROM scope()
      }, org_id=org_record.id, env=dict(InitialArtifacts=InitialArtifacts))

</code></pre>

