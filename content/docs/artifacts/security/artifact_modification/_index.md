---
menutitle: "Audit Logging"
title: "Artifact modification audit logging"
date: 2025-05-24
weight: 100
draft: true
summary: "Artifact modification audit logging"
last_reviewed: 2025-05-24
---

## Tracking Artifact Modifications

`Server.Internal.ArtifactModification` event queue and logging


```
// Determine the permission required based on the type of the artifact.
var permission acls.ACL_PERMISSION

def_type := strings.ToLower(definition.Type)

switch def_type {
case "client", "client_event", "":
    permission = acls.ARTIFACT_WRITER
case "server", "server_event", "notebook":
    permission = acls.SERVER_ARTIFACT_WRITER
```
