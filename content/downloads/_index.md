---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
pre: <i class="fas fa-download"></i>
release: 0.77.1
base_release: 0.77.1
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe
    hash: c91cf8a32731c4c45c148393bc7d2af688c392194a9fffc4535e8b583260d55e
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: 7e38f39ccd50520ee752c8850777e2033b2e892d796adaec027d296606f42445
    platform: windows

  - desc: Windows 32-bit Executable
    name: windows-386.exe
    hash: 4d3eb4960d464a1c3b3232818f151ee1e000e5de21c5b4b91b3e34444cf2e94a
    platform: windows

  - desc: Windows 32-bit MSI
    name: windows-386.msi
    hash: 63ac4b35356afbb13460c1ac87895cd3b6da4dfb1b04d3b49a84c8533db082b8
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: 6636020f3ce03ea4eff5d5b96d635c400e51d2636c823a8f0bd458ddc7c4d28a
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: a0377f261f85314b692b2fbba980af58fc562e3ab085a293dd2ef3e6f8175669
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: c39e0d402776555d35c9555df41d5901bfb7f32f4baba1d06795d12862028a4f
    platform: linux

  - desc: Linux Sumo build. Recommended for servers.
    name: linux-amd64-sumo-musl
    hash: c39e0d402776555d35c9555df41d5901bfb7f32f4baba1d06795d12862028a4f
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: b403a14cfbe7ed31e57cc8b8a2b436a978985eadcf7845a34a416e433be8a388
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: a2e8fa47352f2191769393c1aec39b10f54f6f82a9b47454949bed33450c81b4
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

This page is for the current release. [The previous Release is 0.76.6](/downloads/previous_downloads/).

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
