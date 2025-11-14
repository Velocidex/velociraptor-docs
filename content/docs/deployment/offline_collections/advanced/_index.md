---
title: "Advanced Use Cases"
menutitle: "Advanced Use Cases"
date: 2025-11-09
last_reviewed: 2025-11-09
draft: true
weight: 70
summary: "Advanced use cases for offline collectors"
---

For detailed customization, including access to all the available collector
options, it is generally better to call the `Server.Utils.CreateCollector`
artifact directly rather than use the GUI collector builder workflow. To do
serious customization you may even need to create a custom version of that
artifact, but keep in mind that this is quite a complex artifact and
customization shouldn't be attempted unless you have a very strong grasp of VQL
and artifact-related functionality (for example, exports and tools).

Test extensively and don't expect much support if your customization goes wrong.


## Conditional collections

## Online client with fallback to offline collection


