---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
pre: <i class="fas fa-download"></i>
release: 0.77.2
base_release: 0.77.2
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe
    hash: 686e4f5888fdd66d07ace3b6c1cbd7d2dd0d8d5fb4d3b5d905a7df3341dfb86f
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: 7965d63d7c7434db425dba9dc7430f3e12c60e914017da9ac3617d0f3c9991e9
    platform: windows

  - desc: Windows 32-bit Executable
    name: windows-386.exe
    hash: 294e0fdc9e0cc623ad7f615b1b8772c9a7feb9e8bda9e50e3fe8041c8f0b934f
    platform: windows

  - desc: Windows 32-bit MSI
    name: windows-386.msi
    hash: 5b0dd9c0fbea1ab23e66135f4525226f36f7175c3d25226a09c073049a684b0f
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: 6c4c23c466d892788ff56ddcd3a31f844e4c0d797ade454c5e2625eb9e427077
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: 54d36c23f374a572a4a60106d896e0e39bc6fcafd0d6150cf56aec6c49454ea0
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: f3ffe0ed9942975214c1b7ba7a24b201eaff4ad827575342b43544158b64c524
    platform: linux

  - desc: Linux Sumo build. Recommended for servers.
    name: linux-amd64-sumo-musl
    hash: 16ba95c8556fa0340f62a97420db76863fe6b8a18575da58439c33fa759c5b11
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: 900efb29154939e6f594446096975439fc19c59fd74f5433d67bc15cacb4cd99
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: 3ec2df0c19726b92e27c51ec4b6239aee3e4e40425de39781859eb200987070e
    platform: apple

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    hash: 512cd253b2f3e3136a897fc080c9f04de4b6d577fce370126ef4a2520c697c2c
    platform: freebsd
    release: 0.77.1
    base_release: 0.77.1

  - desc: Windows AMD64 (64 bits) Executable For Windows 7 Only
    name: windows-amd64-legacy.exe
    hash: 4b56a1c082024e765a70e8c0f75e0cc3873a29f07402dac1d9beba08a424fb85
    platform: windows
    release: 0.77.1
    base_release: 0.77.1

  - desc: Windows 32 bits Executable For Windows 7 Only
    name: windows-386-legacy.exe
    hash: 828f0c295eebb01edb18e29bacdd1b14751446f9b43e969906b4fda50e0c53fe
    platform: windows
    release: 0.77.1
    base_release: 0.77.1

description: |
  Velociraptor is open source software and is free for anyone to use under the
  [AGPL License](https://github.com/Velocidex/velociraptor?tab=License-1-ov-file#readme).
---

Velociraptor is open source software and is free for anyone to use under the
[AGPL License](https://github.com/Velocidex/velociraptor?tab=License-1-ov-file#readme).

This page is for the current release. [The previous Release is 0.76.7](/downloads/previous_downloads/).

{{< release_download >}}

## Release notes

Full release notes are published in our [release blog post](/blog/2026/2026-05-31-release-notes-0.77/)

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

* We might disable some feature (VQL plugins) that can not be easily
  updated. These builds may miss some specific functionality.

* If you need to use these builds for an offline collector we
  recommend using [the generic collector](/docs/deployment/offline_collections/#the-generic-collector).


**Do not use this build in a general deployment!** Only use it for
deploying on deprecated, unsupported operating systems:

* Windows 7
* Windows 8, 8.1

{{% /notice %}}


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
