---
type: wide
cascade:
  type: wide
sidebar:
  exclude: true
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
release: 0.77.4
base_release: 0.77.4
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe.gz
    hash: e90820fc0a129bb76e9990560d8620d4a3b7759a902e473c9887e8bcbe128512
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: c8d5705157a752c9b9ed8bf08769a30030e30766b998cedb7436a2be2b5bf76f
    platform: windows

  - desc: Windows ARM64 Executable
    name: windows-arm64.exe.gz
    hash: 00d4e81f0f69c05d774a979fc65bf1136d534b7fceaeda56748f305148fa71aa
    platform: windows

  - desc: Windows ARM64 MSI
    name: windows-arm64.msi
    hash: ba2c34b1bb5eb1c65c7be8337b3c34b8e505590936ea661dc58c4702cbb3c976
    platform: windows

  - desc: Linux Ubuntu 26.04 AMD64 and later. Recommended for servers.
    name: linux-amd64.gz
    hash: 890c1b8458276909cfbbfb2edad2e0b9c31672b95532e41516c39d2537925157
    platform: linux

  - desc: Linux Ubuntu 26.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64.gz
    hash: 908eda7aaaf46f4a988b282cabbe7844c273ad185d5c9846aa33518ff5e2708c
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl.gz
    hash: dc093453cd9e2da8778fed58f165fdc040f9484fd199814b6ddb0fc29b665b10
    platform: linux

  - desc: Linux Sumo build. Recommended for servers.
    name: linux-amd64-sumo-musl.gz
    hash: 329fcf775ffd8b0f58ce4f457684b0df5c1c943f8a6d8d089a448013d391088d
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64.gz
    hash: 551251457f9f499998636828cba4fc152296cb2360063a99df1bbd8d5dc55161
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64.gz
    hash: a8943c78b10dde9edeba1810038816e89fd5626bae4e5f5fe88a045b9fbf06fa
    platform: apple

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    hash: 512cd253b2f3e3136a897fc080c9f04de4b6d577fce370126ef4a2520c697c2c
    platform: freebsd
    release: 0.77.1
    base_release: 0.77.1

  - desc: Windows AMD64 (64 bits) Executable For Windows 7 Only
    name: windows-amd64-legacy.exe
    hash: 7b699a6670e0caaf8ce951225dff479c141580a9fe8d9d0a1a7c5e83d32e1698
    platform: windows
    release: 0.77.3
    base_release: 0.77.3

  - desc: Windows 32 bits Executable For Windows 7 Only
    name: windows-386-legacy.exe
    hash: 89034042c0b956ce071cc5c23c0409702a2a3a463c7fd935c888ff7f3f26fb4f
    platform: windows
    release: 0.77.3
    base_release: 0.77.3

description: |
  Velociraptor is open source software and is free for anyone to use under the
  [AGPL License](https://github.com/Velocidex/velociraptor?tab=License-1-ov-file#readme).
---

Velociraptor is open source software and is free for anyone to use under the
[AGPL License](https://github.com/Velocidex/velociraptor?tab=License-1-ov-file#readme).

This page is for the current release. [The previous Release is 0.76.7](/downloads/previous_downloads/).

{{< release_download >}}

## Release notes

* Full release notes are published in our [release blog post](/blog/2026/2026-05-31-release-notes-0.77/)

* From this release we no longer publish 32 bit Windows
  binaries. Instead we added ARM64 Windows binaries and MSI. If you
  need 32 bit binaries you can build from source using `make
  windowsx86` at the top level of the repository.

## The Sumo build

In recent releases, the build was split into two:

1. The regular build is suitable for both clients and servers. It
   reduces binary size by removing some large dependencies.
2. The Sumo build includes additional dependencies which inflate the
   size of the binary.

In particular, the Sumo build uses the official AWS SDK, while the
regular build uses the light weight Minio client library. If your
server needs AWS integration (particularly around credentials) you
will probably need to use the Sumo build.

> [!NOTE] Support for Windows 7
> Golang has officially [ended support for Windows
> 7](https://github.com/golang/go/issues/57003) with the Go 1.20
> release. Current builds do not support this platform.
>
> The Windows 7 binaries mentioned above are built with the deprecated
> Go 1.20 release which is known to work on Windows 7.
>
> However, note the following caveats:
>
> * To build under this unsupported Go version we had to freeze
>   dependencies. Therefore this build includes known buggy and
>   unsupported dependencies.
>
> * This build may be insecure! since it includes unsupported
>   dependencies.
>
> * We might disable some feature (VQL plugins) that can not be easily
>   updated. These builds may miss some specific functionality.
>
> * If you need to use these builds for an offline collector we
>   recommend using [the generic collector](/docs/deployment/offline_collections/#the-generic-collector).
>
>
> **Do not use this build in a general deployment!** Only use it for
> deploying on deprecated, unsupported operating systems:
>
> * Windows 7
> * Windows 8, 8.1


## Verifying your download

The Velociraptor releases are signed using gpg with key ID
`0572F28B4EF19A043F4CBBE0B22A7FB19CB6CFA1`.

You can verify the signature using `gpg`:

```sh
$ gpg --verify velociraptor-v0.73.3-linux-amd64.sig
gpg: assuming signed data in 'velociraptor-v0.73.3-linux-amd64'
gpg: Signature made Mon 04 Nov 2024 07:36:05 SAST
gpg:                using RSA key 0572F28B4EF19A043F4CBBE0B22A7FB19CB6CFA1
gpg: Good signature from "Velociraptor Team (Velociraptor - Dig deeper!  https://docs.velociraptor.app/) <support@velocidex.com>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 0572 F28B 4EF1 9A04 3F4C  BBE0 B22A 7FB1 9CB6 CFA1

```

You can import the key from your favorite key server:

```sh
$ gpg --search-keys 0572F28B4EF19A043F4CBBE0B22A7FB19CB6CFA1
gpg: data source: https://keys.openpgp.org:443
(1)     Velociraptor Team (Velociraptor - Dig deeper!  https
          3072 bit RSA key B22A7FB19CB6CFA1, created: 2021-10-29
Keys 1-1 of 1 for "0572F28B4EF19A043F4CBBE0B22A7FB19CB6CFA1".  Enter number(s), N)ext, or Q)uit >
```
