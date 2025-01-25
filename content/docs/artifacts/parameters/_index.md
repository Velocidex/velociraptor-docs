---
menutitle: "Parameters"
title: "Artifact Parameters"
date: 2025-01-25
draft: true
weight: 10
---

This section will cover artifact parameters.

## How parameters are processed

Parameters are essentially VQL variables. The values are converted to the specified type at runtime.
- Demonstrate this:
   - using typeof()
   - by overriding a parameter value with a VQL assignment.

## Parameter types

- artifactset
- csv
- bool
- choice
- float
- hidden
- int / integer / int64
- json
- json_array / regex_array / multichoice https://github.com/Velocidex/velociraptor/pull/3392
- redacted
- string / regex / yara	- (these types are passed through unparsed)
- server_metadata
- starlark
- timestamp
- upload
- upload_file
- xml
- yaml
- yara_lint?

## Parameter fields

[Descriptions of the parameter fields](https://github.com/Velocidex/velociraptor/blob/52dc005b1594723716dc6b3e3a7a719a885b74ef/docs/references/server.config.yaml#L1050)
- name
- description
- default
- type
- friendly_name
- validating_regex (this is just a visual indicator. It will not stop you from running the artifact)
- artifact_type (only used for type = artifactset)