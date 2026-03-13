---
title: "Velociraptor 0.76 Release"
description: |
   Velociraptor Release 0.76 is now available

tags:
 - Release

author: "Mike Cohen"
date: 2026-03-10
noindex: false
draft: false
---

I am very excited to announce that the latest Velociraptor release
0.76 is now available.

In this post I will discuss some of the new features introduced by
this release.

## GUI Improvements

This release improves a number of GUI features.

### Bundled searchable documentation


## Removed plugins

[ need to rephrase etc - this is just coped from the PR ]

There are a couple of very large libraries with huge API surface,
making the binary extremely large:

1.  The Elastic library is now handled via a fork to isolate just the
    Bulk upload API - reducing the binary size by 16mb
2.  The next largest library is the AWS client library used by
    `s3_upload()` increasing the binary size by 6mb.
3.  The Google cloud client library is also huge at around 5mb

 However for regular builds:

-   Use the minio S3 library to connect to AWS - this library is much
    much smaller and easier to use.
-   Remove Google cloud dependencies: pubsub is a rarely used feature,
    and with Google cloud storage (GCS) we can always enable S3
    compatible mode so there is no real need for specific GCS access.
-   Removed the starlark() plugin since it is not really very often
    used.

From this version we've introduced a new build tag `sumo` which
includes these large libraries if anyone really needs them.
By enabling `sumo` build tags (i.e. `make linux_sumo`) it is possible
to build a larger binary with the full AWS and Google client
libraries.


## Conclusions

There are many more new features and bug fixes in the latest release.
Please download the release candidate and give it a test and provide
feedback.

If you like the new features, take [Velociraptor for a
spin](https://github.com/Velocidex/velociraptor)!  It is available
on GitHub under an open source license. As always please file issues
on the bug tracker or ask questions on our mailing list
[velociraptor-discuss@googlegroups.com](mailto:velociraptor-discuss@googlegroups.com)
. You can also chat with us directly on discord
[https://www.velocidex.com/discord](https://www.velocidex.com/discord)
.
