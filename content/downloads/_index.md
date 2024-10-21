---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
pre: <i class="fas fa-download"></i>
release: 0.73.2
base_release: 0.73
arches:
  - desc: Windows AMD64 (64 bits) Executable
    name: windows-amd64.exe
    hash: 5c2ee4d30e8d46b46b7d2de45c021b0f886bcf045d49354391090f3edba50914
    platform: windows

  - desc: Windows AMD64 (64 bits) MSI
    name: windows-amd64.msi
    hash: 5add9ac0fc74e147e15ee1849dd6330aad8ad87bafbbb9bce6a94f269364b1f7
    platform: windows

  - desc: Windows 32 bits Executable
    name: windows-386.exe
    hash: dda7f5979e708f90d18d255c496761da6fbf965cb03ec1692f6837039052014d
    platform: windows

  - desc: Windows 32 bits MSI
    name: windows-386.msi
    hash: dba3248f6c18a8e1f64a9c5495062f8ed6c2a7914ed3a2aa726436a641f97cfd
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: 5160689cadd4477331522efe1bfe89e5167ea1c7dac69468887c06a84a76e38a
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: 9d6d90c8c84b06149a86689919ca9415a74ae8fdd7ec394a62dfceb9054c994d
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: 8169809ec2136a1bd47c99a51784f6bdf1a6783d7dab6bef113858c5f796e372
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: 534a2af356b1fb115818bb8c77d961e4f6af306f86f9ad81a331d4d2553f78d8
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: 9d6d90c8c84b06149a86689919ca9415a74ae8fdd7ec394a62dfceb9054c994d
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
