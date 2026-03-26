---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
pre: <i class="fas fa-download"></i>
release: 0.76.1
base_release: 0.76
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe
    hash: 1380bb6373604c68360d8eaede811cb6e19b826b4116b808907d5b9ab049ac2b
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: c9e1d827882e74c95e2c36bd8adb807a02ed878f2e1a501beeb894c02e798689
    platform: windows

  - desc: Windows 32-bit Executable
    name: windows-386.exe
    hash: bec9905d51c03b95041580437f3583bfb4d4585ece09d17e28428ae7ab9c270f
    platform: windows

  - desc: Windows 32-bit MSI
    name: windows-386.msi
    hash: 9d2c0eea8d3a9c3874b40c74012fbe3324e56b056955d9217714fc2426ae117d
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: 8cfd3e84622659e0dc276f379f7ef7700df562a47e15eed136e5f900d1b85fa2
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: e9189727d6757454c5b0c858f534e34a2f19816629627811880776b7af2cbcfd
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: a46910e810e4c3e9169b1771ddafd23ad85116278c5e43fbd1de00dd77bac8e8
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: e39fa77e27d2ad5ebabe24b4077c265dbb404a4d5e6d4e839aab757da9bab1e3
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: 220669b0d35a5de806fa73376f06c056580bfca5b48ecd5f31e1d7560cc628c6
    platform: apple

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    hash: ebc5722094eea312873cc725c214715da541a71a46a13ce0acb80db0a015a411
    platform: freebsd

  - desc: Windows AMD64 (64 bits) Executable For Windows 7 Only
    name: windows-amd64-legacy.exe
    hash: a15f8b9bdfcf1fe5b4e73eafcb9c3091eb347b9c7f32ae7e94ab5de41c8c434e
    platform: windows

  - desc: Windows 32 bits Executable For Windows 7 Only
    name: windows-386-legacy.exe
    hash: 3a66986c3a4a9e0d4dacd3131ee55d65ff37b0093373048cb05afa1572a800c6
    platform: windows
---

Velociraptor is open source software and is free for anyone to use under the
[AGPL License](https://github.com/Velocidex/velociraptor?tab=License-1-ov-file#readme).

This page is for the current release. [The previous Release is 0.75.6]({{< ref "/downloads/previous_downloads" >}})

{{< release_download >}}

## Release notes

Full release notes are published in our [release blog post]({{< ref "/blog/2026/2026-03-10-release-notes-0.76/" >}})

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
  recommend using [the generic collector]({{< ref "/docs/deployment/offline_collections/#the-generic-offline-collector" >}}).


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
