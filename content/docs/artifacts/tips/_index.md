---
menutitle: "Artifact Writing Tips"
title: "Artifact Writing Tips"
date: 2025-01-25
draft: false
weight: 90
summary: "Advice for writing and testing artifacts"
last_reviewed: 2025-04-30
---

## Development and testing workflow

Typically we have a new idea for a new detection.

1. The first step is to develop the VQL that will detect the anomaly by writing
  the VQL in a notebook cell on the target operating system itself (usually we
  use `velociraptor gui` to start a new local server).

While developing the VQL, Use the `log()` VQL function librally to
provide print debugging.

Use the `typeof()` function to learn about the data types for values returned by
your queries.

## Descriptions

- Ensure that your artifacts have sufficient information in the `description `
  field to guide users, especially if the artifact is complicated or has many
  parameters.

- Try to start the artifact description with a short lead sentence which
  summarizes the purpose of the artifact. For example: "Report network
  connections, and enrich with process information". This lead sentence makes it
  easy for users to quickly find the artifact they are looking for.

- Include relevant keywords in your artifact's description field since this
  entire field is added to the artifact search index which means users will be
  able to find it by searching for your keywords. For example, if your
  artifact's name is "Windows.Forensics.Shellbags" then make sure you also
  include the word "registry" somewhere in the description. That way users
  searching for registry-related artifacts can search for the word "registry"
  and your artifact will be included in the results.

## Parameters

- Ensure that your artifact has parameter defaults for all parameters, if
  possible. A well-designed artifact should not fail when it's run without any
  parameter customization. Users have a reasonable expectation that just running
  an artifact, without customizing the parameters, should result in a
  non-errored collection (while possibly producing no data).

- Make full use of the user-oriented features that are available for parameters.
  For example, use the `description`, `friendly_name`, and `validating_regex`
  fields for every parameter.


