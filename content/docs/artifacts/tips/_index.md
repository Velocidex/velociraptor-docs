---
menutitle: "Artifact Writing Tips"
title: "Artifact Writing Tips"
date: 2025-01-25
draft: false
weight: 80
---

Typically we have a new idea for a new detection. The first step is to
develop the VQL that will detect the anomaly by writing the VQL in a
notebook cell on the target operating system itself (usually we use
`velociraptor gui` to start a new local server).

While developing the VQL, Use the `log()` VQL function librally to
provide print debugging.

Use format(format="%T %v", args=[X, X]) to learn about a value's type
and value.