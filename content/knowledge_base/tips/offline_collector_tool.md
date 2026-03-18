# How to create and use an offline collector as a tool

Velociraptor
[offline collectors]({{< ref "/docs/deployment/offline_collections/" >}})
are a popular standalone mode in which one or more artifacts are
collected and the results are packaged in a zip container, and often
uploaded to a
[remote destination]({{< ref "/docs/file_collection/#remote-upload-destinations" >}}).
Typically the remote destination is a cloud storage provider such as
AWS S3, Azure, or Google Cloud Storage, but it can also be a storage
service set up on the local network.

Offline collectors provide the same capabilities as normal
network-connected clients, but perform a once-off collection of
predefined artifacts rather than receiving instructions from the
server on which artifacts to collect. Normal clients can therefore do
anything that offline collectors can do,
[even without installation]({{< ref "/knowledge_base/tips/online_collector/" >}}),
however the results are then uploaded to the Velociraptor server,
which you may not want due to the potential size of these uploads. You
may want to use your network-connected "online" clients to run smaller
more focused queries and occasionally do an offline-collector-style
[bulk file acquisition]({{< ref "/docs/file_collection/bulk/" >}}).

This article demonstrates how to create a generic offline collector
and then use it as a Velociraptor
[tool]({{< ref "/docs/artifacts/tools/" >}})
on normal "online" clients.
The end goal is to have the collection container zip uploaded to a
remote server, and in this case we use
[Garage](https://garagehq.deuxfleurs.fr/)
which is an open source, S3-compatible server written in Rust.

## Overview

1. Set up an S3-compatible server (Garage)
2. Create a generic offline collector and store it in the Velociraptor
   tools repository.
3. Create a client artifact to run the offline collector on a live
   client, using the collector as a tool.

## Setup Garage (an open source S3-compatible server)

We are going to use a simple single-node Garage server as the remote
destination for our offline collector uploads, but you could use AWS
S3, [MinIO]({{< ref "/knowledge_base/tips/dropbox_server/" >}}), or
any other S3-compatible server.

1. Generate a configuration file as explained in the
   [Garage Quick-start guide](https://garagehq.deuxfleurs.fr/documentation/quick-start/).

2. Configure the Garage server's storage, also as per their
   quick-start guide. For brevity, here are the commands we used
   (the corresponding output is not shown):

   ```shell
   # start the server
   garage -c ./garage.toml server
   # check the server status and get the node ID
   garage -c ./garage.toml status
   # create a cluster layout
   garage -c ./garage.toml layout assign -z dc1 -c 1G d7d19e6f32edec53
   # apply the layout
   garage -c ./garage.toml layout apply --version 1
   # create a bucket
   garage -c ./garage.toml bucket create offline-collections
   # check that the bucket has been created
   garage -c ./garage.toml bucket list
   # view the bucket configuration
   garage -c ./garage.toml bucket info offline-collections
   # create an identity for the collector to use
   garage -c ./garage.toml key create offline-collections-key
   # assign write-only access to the bucket for this user
   garage -c ./garage.toml bucket allow --write offline-collections --key offline-collections-key
   # create a bucket admin user
   garage -c ./garage.toml key create offline-collections-owner
   # assign full access to the bucket for this user
   garage -c ./garage.toml bucket allow --write --read --owner offline-collections --key offline-collections-owner
   ```

3. We've created one bucket to receive the collection zips, named
   `offline-collections`, and created 2 keys with access to it. You
   can confirm this with the command
   `garage -c ./garage.toml bucket info offline-collections`.

   ```shell
   ==== BUCKET INFORMATION ====
   Bucket:          d5f9982666e004de45114bcfc1e9428755c15d12f55a2dac7bc77dc495343e97
   Created:         2026-03-16 16:28:13.689 +02:00

   Size:            0 B (0 B)
   Objects:         0

   Website access:  false

   Global alias:    offline-collections

   ==== KEYS FOR THIS BUCKET ====
   Permissions  Access key                                             Local aliases
   W           GKaa23dd92075b4dc6fc9fe54f  offline-collections-key
   RWO          GK08c8137adf22d3b08c6ea088  offline-collections-owner
   ```

   We've created two keys to access the S3 bucket:
   - `offline-collections-key`: with only write access, that will be
      used by the clients to upload their collection zips
   - `offline-collections-owner`: with full access for browsing and
     downloading the collection zips.

4. To access the bucket as `offline-collections-owner` on the command
   line we'll use the `mc` (MinIO client) utility available from
   https://dl.min.io/client/mc/release/.

   ```shell
   wget https://dl.min.io/client/mc/release/linux-amd64/mc
   chmod +x ./mc

   # Save credentials for the mc tool
   mc alias set \
   garage \
   http://192.168.56.1:3900 \
   GK08c8137adf22d3b08c6ea088 \
   389adafacb2e3b1c96f9216b9a77c89b74b4d64949d1a0e90f3ca88378f2ca4e \
   --api S3v4
   ```

   With the credentials configured, you can test access by uploading a
   file to the bucket, listing the bucket's contents, and finally
   clearing everything from the bucket.

   ```shell
   # copy a file to the bucket
   mc cp /proc/cpuinfo garage/offline-collections/cpuinfo.txt
   # list bucket contents
   mc ls garage/offline-collections
   # remove everything from the uckey
   mc rm --force --recursive garage/offline-collections
   ```




Tags: #automation #deployment #acquisition #collector #tools #s3 #garage
