---
title: "Working With Offline Collection Data"
menutitle: "Collection Data"
date: 2025-11-03
last_reviewed: 2025-11-03
draft: false
weight: 30
---


### Importing into Velociraptor

* Velociraptor can automatically decrypted offline containers when
  importing.
* Use the Server.Utils.ImportCollection artifact to import collections
* The server uses its private key to unlock the container automatically.
* This preserves PII and confidential information in transit!

* You can import an offline collection into the GUI using the
  `import_collection()` [VQL function](https://docs.velociraptor.app/vql_reference/server/import_collection/).
* Requires the collection ZIP to already be present on the server.
* Decrypts X509 encrypted collections automatically.

### Accessing collection archives without importing


If you want to give other people the ability to decrypt the collection
you can share that `server.config.yaml` file with them and allow them
to unpack using:

```sh
velociraptor --config server.config.yaml unzip collection.zip --dump_dir /output/dir
```


#### fuse container command

#### Dead disk analysis of a collection archive

May be from an offline collector or exported from the server.

https://docs.velociraptor.app/artifact_references/pages/windows.collectors.remapping/

it allows you to run a real client against the offline collection and
interactively collect other artifacts without needing to import it first

