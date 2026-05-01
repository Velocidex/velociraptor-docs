---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
pre: <i class="fas fa-download"></i>
release: 0.76.5
base_release: 0.76
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe
    hash: 4813e753f6f9bfa5c5de0edbb8dd3cc7f1fa51714097d3144d44e5e89dbd33ef
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: a35a220a58360bbe501b5f9cb4ccf4eda188c6e68e770bf0a79bea75d3b2b899
    platform: windows

  - desc: Windows 32-bit Executable
    name: windows-386.exe
    hash: 402e7968257bb8b3d85864517c452dde04d0c997ddfdbf161908bc377987521b
    platform: windows

  - desc: Windows 32-bit MSI
    name: windows-386.msi
    hash: fe407135b9f0e7fa149533b42119814afdb036b3489f26637ba6243841c68aff
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: e6b2b379c90aaddf549a200dea108fe34e397994d45d2fc3b68f53b2f5277b51
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: 5e38969f199823535f1bd8611e1ab95e45c2cc4a4522d0c2a68474cdbe098214
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: e7e43975f4855e03aba0e7d9ef2a8ed32c58112718074ddcf3535bebf90e1f2f
    platform: linux

  - desc: Linux Sumo build. Recommended for servers.
    name: linux-amd64-sumo-musl
    hash: 8b2d1e8cd74ea58a56ce0ed0c052c2e66ad45980f0b35bab6afe566363cae745
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash:
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash:
    platform: apple

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    hash: ebc5722094eea312873cc725c214715da541a71a46a13ce0acb80db0a015a411
    platform: freebsd
    release: 0.76.1

  - desc: Windows AMD64 (64 bits) Executable For Windows 7 Only
    name: windows-amd64-legacy.exe
    hash: a15f8b9bdfcf1fe5b4e73eafcb9c3091eb347b9c7f32ae7e94ab5de41c8c434e
    platform: windows
    release: 0.76.1

  - desc: Windows 32 bits Executable For Windows 7 Only
    name: windows-386-legacy.exe
    hash: 3a66986c3a4a9e0d4dacd3131ee55d65ff37b0093373048cb05afa1572a800c6
    platform: windows
    release: 0.76.1
description: |
  Velociraptor is open source software and is free for anyone to use under the
  [AGPL License](https://github.com/Velocidex/velociraptor?tab=License-1-ov-file#readme).
---

Velociraptor is open source software and is free for anyone to use under the
[AGPL License](https://github.com/Velocidex/velociraptor?tab=License-1-ov-file#readme).

This page is for the current release. [The previous Release is 0.75.7](/downloads/previous_downloads/)

{{< release_download >}}

## Release notes

Full release notes are published in our [release blog post](/blog/2026/2026-03-10-release-notes-0.76/)

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
