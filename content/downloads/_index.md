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
    hash: 3ef039583ebaffce281df070b868455bc2dbc234f4b2ed3988cea8dd50116003
    platform: freebsd

  - desc: Windows AMD64 (64 bits) Executable For Windows 7 Only
    name: windows-amd64.exe
    release: 0.72.3
    hash: cd4697255e30961de26eb303079e7f738f8b86fd5d4c94863091362082e7fda9
    platform: windows

  - desc: Windows AMD64 (64 bits) MSI For Windows 7 Only
    name: windows-amd64.msi
    release: 0.72.3
    hash: ba0332d12278d09068d355ef8712a4fe26e20760f77fd3ed3ddc4be611c154f1
    platform: windows

  - desc: Windows 32 bits Executable For Windows 7 Only
    name: windows-386.exe
    release: 0.72.3
    hash: afbc5b06ed89891e53558fe701e75e17d76dacad72f79be937fac2df24573692
    platform: windows

  - desc: Windows 32 bits MSI For Windows 7 Only
    name: windows-386.msi
    release: 0.72.3
    hash: 20413ebabe16d019b60967fe82123aabdf4d752bc03836c1dc88d365014a247c
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
release. Current builds do not support this platform. The Windows 7
binaries mentioned above are the last version known to work on Windows
7 and should mostly work with the current servers (See our [support
policy](https://docs.velociraptor.app/docs/overview/support/) )

In future we may make periodic builds to target Windows 7 from time to
time but these will not be the latest.

{{% /notice %}}


## Verifying your download

The Velociraptor releases are signed using gpg with key ID `0572F28B4EF19A043F4CBBE0B22A7FB19CB6CFA1`. You can verify the signature using `gpg` [by following the instructions]({{% ref "/docs/deployment/#verifying-your-download" %}})
