---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
pre: <i class="fas fa-download"></i>
release: 0.72.3
base_release: 0.72
arches:
  - desc: Windows AMD64 (64 bits) Executable
    name: windows-amd64.exe
    hash: cd4697255e30961de26eb303079e7f738f8b86fd5d4c94863091362082e7fda9
    platform: windows

  - desc: Windows AMD64 (64 bits) MSI
    name: windows-amd64.msi
    hash: ba0332d12278d09068d355ef8712a4fe26e20760f77fd3ed3ddc4be611c154f1
    platform: windows

  - desc: Windows 32 bits Executable
    name: windows-386.exe
    hash: afbc5b06ed89891e53558fe701e75e17d76dacad72f79be937fac2df24573692
    platform: windows

  - desc: Windows 32 bits MSI
    name: windows-386.msi
    hash: 20413ebabe16d019b60967fe82123aabdf4d752bc03836c1dc88d365014a247c
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: abc13cb5a6478e3f40086b2ef4b207a7e63a2be754c4a2939315deb68d406445
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: cb60a57cad4ee28acddf89a02787d21949370f2bc5c30446749cd598d46bdc95
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: dd0b77ef62f994f0e0cd833b4afdc2a98c56e72e5ea0d1093bb030f0927fe7d5
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: 29b108d87db86e9e40b3748c0cd596c21c89de4a465934a88cc426452b53ae74
    platform: apple

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    release: 0.72.0
    hash: c8274055cad5fb0ef65af40bf52792f224ed5aa59a46f182bb7f73cca6df7c77
    platform: freebsd

---

Velociraptor is open source software and is free for anyone to use
under the [AGPL
License](https://github.com/Velocidex/velociraptor?tab=License-1-ov-file#readme).

{{< release_download >}}

## Release notes

Full release notes are published in our [release blog post]({{< ref "/blog/2024/2024-03-10-release-notes-0.72/" >}})

## Verifying your download

The Velociraptor releases are signed using gpg with key ID `0572F28B4EF19A043F4CBBE0B22A7FB19CB6CFA1`. You can verify the signature using `gpg` [by following the instructions]({{% ref "/docs/deployment/#verifying-your-download" %}})
