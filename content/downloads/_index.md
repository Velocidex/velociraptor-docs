---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
pre: <i class="fas fa-download"></i>
release: 0.72.4
base_release: 0.72
arches:
  - desc: Windows AMD64 (64 bits) Executable
    name: windows-amd64.exe
    hash: b1e0fdde323b77b9be4e51b1b20a4ddaa1b3c9fdb8d6ed721d742b08a64cf7b0
    platform: windows

  - desc: Windows AMD64 (64 bits) MSI
    name: windows-amd64.msi
    hash: 018450b7afc5b16a6a1502c0f139a75290b8bcb17752b69fe451286a9bca9d29
    platform: windows

  - desc: Windows 32 bits Executable
    name: windows-386.exe
    hash: 09a6c2d68ff9b8276dc794e8dbb9012d219677c24537cb3ec1704b06953dfb24
    platform: windows

  - desc: Windows 32 bits MSI
    name: windows-386.msi
    hash: 98a3a664bee6c8d0c312f8453d8c3cebc7a1c065b14744c1f4ac082beaa1faab
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: 656a8adfdb15cd3cf756a85ad9e22d1be7b7cf40cd3a9fbcd62dbe6a94c54c67
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: 0e0d9af81b435ff1845fe4fef811c6beb8f885fd6df234d61e1ff1116ad257f4
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: 4bb8038d4b116971d194e5060c19adb8f4a95887eedcb2119dfad7ea22b5b24a
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: 0c64acd9b4f98fd1bda93e243c60982c18abde694370c625d493d117e34f2195
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: d6b8d3a6ab322d1d887b63306e1372e21687a7d3633b16b28df4663779eea7c8
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
