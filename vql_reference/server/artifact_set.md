# artifact_set



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
definition|Artifact definition in YAML|string
prefix|Optional name prefix (deprecated ignored)|string
tags|Optional tags to attach to the artifact.|list of string
repository|Add the artifact to this repository, if not set, we add the artifact to the global repository.|string

**Required permissions:** `ARTIFACT_WRITER`, `SERVER_ARTIFACT_WRITER`

### Description

Sets an artifact into the global repository.


