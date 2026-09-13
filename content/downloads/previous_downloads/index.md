---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
pre: <i class="fas fa-download"></i>
release: 0.76.7
base_release: 0.76.7
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe
    hash: 06c590448364a914eea51e6737020c9917192fcdbe5d9d320f7997b8325db832
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: fc8935c52ffcc4482e72ee817f59b5ea9b51a73f166d18dcefb2da06fb495284
    platform: windows

  - desc: Windows 32-bit Executable
    name: windows-386.exe
    hash: 5ed116139a66576997cae5737b1cd895d3c5ec10afaa1c8d1f70e2b0e45e5bef
    platform: windows

  - desc: Windows 32-bit MSI
    name: windows-386.msi
    hash: 2b0b8124635b1953ee15cfc42da5b2ae9c08ae0e7c14d150f334e30fbe2a9b47
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: 1f0b1db8ce76cb3670a684df839ca25ce8852a74739b77e13565abb3705395f1
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: 2703b36105f6158d7b617788df65090a4df2b438228b57e1c7809460e8c8a3ef
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: 7b7e15d5bef76ac1bb7a2eaba14cb20b830b714aa3165e387c34ff5c31343b2d
    platform: linux

  - desc: Linux Sumo build. Recommended for servers.
    name: linux-amd64-sumo-musl
    hash: c35cae1cbc4fbda54043011dbf700075f3e5e93309566ba45c5eb119ca430652
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: fda159be1de055445e933ed61c11ec13c359d03bd3876ffc2e66109d4c78fa83
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: 9a970f07a2fafe113c84b295d4b3c41413035e8b1180193f13a8bc424f33b867
    platform: apple

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    hash: ebc5722094eea312873cc725c214715da541a71a46a13ce0acb80db0a015a411
    platform: freebsd
    release: 0.76.1
    base_release: 0.76

  - desc: Windows AMD64 (64 bits) Executable For Windows 7 Only
    name: windows-amd64-legacy.exe
    hash: a15f8b9bdfcf1fe5b4e73eafcb9c3091eb347b9c7f32ae7e94ab5de41c8c434e
    platform: windows
    release: 0.76.1
    base_release: 0.76

  - desc: Windows 32 bits Executable For Windows 7 Only
    name: windows-386-legacy.exe
    hash: 3a66986c3a4a9e0d4dacd3131ee55d65ff37b0093373048cb05afa1572a800c6
    platform: windows
    release: 0.76.1
    base_release: 0.76

description: |
  Velociraptor is open source software and is free for anyone to use under the
  [AGPL License](https://github.com/Velocidex/velociraptor?tab=License-1-ov-file#readme).
---

Velociraptor is open source software and is free for anyone to use under the
[AGPL License](https://github.com/Velocidex/velociraptor?tab=License-1-ov-file#readme).

This page is for the previous release. [The current Release is 0.77.1](/downloads/).

{{< release_download >}}

## Release notes

Full release notes are published in our [release blog post](/blog/2026/2026-03-10-release-notes-0.76/)

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
