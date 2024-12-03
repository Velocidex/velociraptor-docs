---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
pre: <i class="fas fa-download"></i>
release: 0.73.3
base_release: 0.73
arches:
  - desc: Windows AMD64 (64 bits) Executable
    name: windows-amd64.exe
    hash: fe9f9a9033779ed6be0cc20ea053106adba3bfd18ebcb78f7b8c19ca58ec105e
    platform: windows

  - desc: Windows AMD64 (64 bits) MSI
    name: windows-amd64.msi
    hash: 0ccf5033fa86a1a7571ac5df93a782049f228404d67478e96487afdae4a535ba
    platform: windows

  - desc: Windows 32 bits Executable
    name: windows-386.exe
    hash: 5a40eadd1bb781ee6958bc34509f2977ddbc983052b9f5423c10391c62946215
    platform: windows

  - desc: Windows 32 bits MSI
    name: windows-386.msi
    hash: 67fde8015d961c0cdb0ff2efcd382c0813803c5c21841131ebe045a2a45a23ac
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: d11f8191f44afa41562d4bf080672b7e3ca12345d1972458af55cf0a941658fe
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: 1a49ed3c7732638841337b7f2e28ecd054f6f10b589e7bd559800d5bcca7a78d
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: 7826d81c1495cc8fd8cd47cd44f92b0cbca89b6cc2bd9e2b6c6bde4f06c6b4dc
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: f22f1b3a905f658b61ec491aa7f104b5e20a75f192b42dba5ffe0f50d9f1353b
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: 8d4e9d4fc00cbc8aa86dbd4b70101491e2a6c8a8d582896d6cf18bfff06ad56b
    platform: apple

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    release: 0.72.4
    base_release: 0.72
    hash: 3ef039583ebaffce281df070b868455bc2dbc234f4b2ed3988cea8dd50116003
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

{{< release_download >}}

## Release notes

Full release notes are published in our [release blog post]({{< ref "/blog/2024/2024-03-10-release-notes-0.72/" >}})

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
