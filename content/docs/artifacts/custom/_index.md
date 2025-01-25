---
menutitle: "Custom Artifacts"
title: "Artifact Sources"
date: 2025-01-25
draft: true
weight: 50
---

This section will cover custom artifacts.

## Custom vs Built-in Artifacts

## Custom artifact overrides

e.g. Custom.Generic.Client.Info

## Inheritance and Masking

## How to add and manage custom artifacts.

### In the GUI

- Add a single artifact
- Add an artifact pack
- Import artifacts from external sources (including predefined ones like Sigma)

### Outside of the GUI

- Using artifact_set()
- Add from folder specified via the Frontend.artifact_definitions_directory config setting
- Add from folder specified via the --definitions command line flag (less likely to be used unless you're running your server in a terminal)
- Embed artifacts in the configuration autoexec.artifact_definitions section

