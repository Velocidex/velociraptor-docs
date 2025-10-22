---
title: "Offline Collectors"
date: 2025-10-21
last_reviewed: 2025-10-22
draft: false
weight: 20
---

By default, Velociraptor's offline collector will create a ZIP file
containing all the collected files and artifacts. However, this zip
file is normally large and we may not want to rely on the person
collecting the data to handle sending us the archive file. Instead,
Velociraptor's offline collector can upload the collected archive to a
remote location automatically when the collection is done.
