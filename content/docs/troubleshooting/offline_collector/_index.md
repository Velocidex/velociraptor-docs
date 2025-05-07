---
title: Offline Collector Issues
menutitle: Offline Collector
date: 2025-02-17
draft: false
weight: 60
summary: |
  * Troubleshooting issues when running a Velociraptor offline collector.
---

StrawS — 11:26
Hello guys, I have a problem. I want to add a query that run AutoRuns.exe in an offline environment. I uploaded the AutoRuns.exe file to the server, but it's not working. I'd be happy if someone has any idea 🙂 thank you!!
predictiple — 11:35
When you create an offline collector that includes artifacts which reference tools, then those tools get packed into the repacked binary. If it's not working you'll need to explain the process you followed and exactly how it's "not working" (e.g. what errors are produced and where?)
Also make sure you're trying it with the latest version (0.74.2).
If the tools are repacked in the binary then the file size will change. So that's probably the first thing to check - is the offline collector bigger than the standard binary?