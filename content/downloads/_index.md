---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
pre: <i class="fas fa-download"></i>
release: 0.74.1
base_release: 0.74
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe
    hash: 76a23342d61554d23ffa282db0b009d6f08a0b594f28fd63fa2efb5877fd276e
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: e0f8850ff89919d54f9a84175cfa91c9f14f1311d0e4832ce9af3c1349a23d25
    platform: windows

  - desc: Windows 32-bit Executable
    name: windows-386.exe
    hash: 75741890e7eb921ed08ac69cecd4b539c153719dcbb8c64e646fd4a6ff09206a
    platform: windows

  - desc: Windows 32-bit MSI
    name: windows-386.msi
    hash: 2dfcf07699fbd6ded402ff5c5ac7d76578ce0115e8d9f3ae49122c72defcd245
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: dd23d6c24dc6170685026eb8d34100dadc16e34769a3b12282c81a0dec362451
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: a70854062034c288b7a823ff674b768c473c560c78be34c851968093d91d4d17
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: ad6ef2301c4babb7ef04de95b4b43fbb98c17e68b9b235a7398d6529e6eb5ecc
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: 5c6c8a5d07929f7c093b0b55eb1e25ae85d59eae4584f46966425fc4b5edceb3
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: e6496519402e139de376c1c964302cc5f9b338c1d88a52b0579c9121d1992fba
    platform: apple
    release: 0.73.3

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    hash: 7a7a0109d300b385a6b3de06f60d38ddcc1dce80a2b0e0a8d36cc85b843d23e0
    platform: freebsd

  - desc: Windows AMD64 (64 bits) Executable For Windows 7 Only
    name: windows-amd64-legacy.exe
    release: 0.73.3
    base_release: 0.73
    hash: 7c4f155a16445f7564df1e01aa6ccc59db952c967d30c3a160c31be7932cd74f
    platform: windows

  - desc: Windows 32 bits Executable For Windows 7 Only
    name: windows-386-legacy.exe
    release: 0.73.3
    base_release: 0.73
    hash: 6342a3fcaa8938fd71c7956b098c96a68c64e68cbfb27e98d70ac3216c799dbe
    platform: windows


---

Velociraptor is open source software and is free for anyone to use
under the [AGPL
License](https://github.com/Velocidex/velociraptor?tab=License-1-ov-file#readme).

This page is for the current release. [The previous Release is
0.73.4]({{< ref "/downloads/previous_downloads" >}})

{{< release_download >}}

## Release notes

Full release notes are published in our [release blog post]({{< ref "/blog/2025/2025-02-23-release-notes-0.74/" >}})

{{% notice note "Support for Windows 7" %}}

Golang has officially [ended support for Windows
7](https://github.com/golang/go/issues/57003) with the Go 1.20
release. Current builds do not support this platform.

The Windows 7 binaries mentioned above are built with the deprecated
Go 1.20 release which is known to work on Windows 7.

However, note the following caveats:

* To build under this unsupported Go version we had to freeze
  dependencies. Therefore this build includes known buggy and
  unsupported dependencies.

* This build may be insecure! since it includes unsupported
  dependencies.

* We typically update to the latest version of Velociraptor but it may
  be that in future we disable some feature (VQL plugins) that can not
  be easily updated.


**Do not use this build in a general deployment!** Only use it for
deploying on deprecated, unsupported operating systems:

* Windows 7
* Windows 8, 8.1

{{% /notice %}}


## Verifying your download

The Velociraptor releases are signed using gpg with key ID `0572F28B4EF19A043F4CBBE0B22A7FB19CB6CFA1`. You can verify the signature using `gpg` [by following the instructions]({{% ref "/docs/deployment/#verifying-your-download" %}})
