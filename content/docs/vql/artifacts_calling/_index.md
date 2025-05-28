---
title: "Calling artifacts from VQL"
menutitle: "Calling Artifacts"
date: 2025-05-13
draft: false
weight: 50
summary: "How to call artifacts from VQL"
last_reviewed: 2025-05-28
---

Artifacts can be called directly from other VQL queries as if they were another
VQL plugin. This allows you to chain artifacts together or use one artifact's
results as input for another. This feature encourages building reusable VQL
artifacts like "Lego bricks".

You can call other artifacts using the `Artifact.<artifact name>` plugin
notation. Args to the `Artifact()` plugin are passed as artifact parameters.

![Calling artifacts](calling_artifacts.png)

When calling artifacts, parameter types are not converted. For example if the
called artifact has a parameter named `StartDate`

Some implicit parameters that are always allowed:

- `source` - see Windows.Registry.Sysinternals.Eulacheck
- `preconditions`

		"SELECT * FROM Artifact.ArtifactWithSourcesAndPreconditions()",
		"SELECT * FROM Artifact.ArtifactWithSourcesAndPreconditions(preconditions=TRUE)",

		// Select a specific source.
		"SELECT * FROM Artifact.ArtifactWithSourcesAndPreconditions(source='Source1')",

		// Should return no results as preconditions is false.
		"SELECT * FROM Artifact.ArtifactWithSourcesAndPreconditions(source='Source1', preconditions=TRUE)",

		service.repository/fixtures/plugin_test.go



