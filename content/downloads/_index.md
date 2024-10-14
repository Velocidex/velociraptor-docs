---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
pre: <i class="fas fa-download"></i>
release: 0.73.1
base_release: 0.73
arches:
  - desc: Windows AMD64 (64 bits) Executable
    name: windows-amd64.exe
    hash: 7942fdb78c97c80b78851ba56749a263a014bc551028bef877971d770e175b7f
    platform: windows

  - desc: Windows AMD64 (64 bits) MSI
    name: windows-amd64.msi
    hash: 1fe26e3fa1c61e1979165b97e00e4c1e43a7878f7a8e9535ae1c17fa71edfa4b
    platform: windows

  - desc: Windows 32 bits Executable
    name: windows-386.exe
    hash: 7c714c7d02da0583d57917d926f2ee261deeca4f05d480634786213ce4c83da6
    platform: windows

  - desc: Windows 32 bits MSI
    name: windows-386.msi
    hash: 51eb558b8dd4197a8dee2107b99918ebac9f00bf31d00efbc9003912eaae6829
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: 9bd62e28f81c8a34dbec82b24246e932fc08e4326b9bcfb5e20654e10624ee84
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: 72a004baf0a7fa161cad4a93d89993f6eea16daff5d5cd53c6b6ed29f84174cf
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: bf347d503684cef8886f58a565f21cdb6cd4a4e7e4668b0e52fc0e8b5655e97f
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: 9a5c601b32cff58ce80d0f35bed87c4ab6b8af22c7cb64412a84ced75e768970
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: 4192414f4bdae41c07092ebc8b72e5df3c8bb3c5c5527c743ae17f1854f7a4b5
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
