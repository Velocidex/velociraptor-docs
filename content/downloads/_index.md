---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
pre: <i class="fas fa-download"></i>
release: 0.75.2
base_release: 0.75
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe
    hash: 32c5cfa556dd0e001824487358f9cb3443cc14b5639dcb3a76969675047085f0
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: 08b7ed8a0593f829cebc92752cfd6320f9838dd3b35196f1f2b81f3e38fab107
    platform: windows

  - desc: Windows 32-bit Executable
    name: windows-386.exe
    hash: 06cdbe168674edf7159ee812c3b953ab902f7da7bc8b1da49973b4da17a7dc4d
    platform: windows

  - desc: Windows 32-bit MSI
    name: windows-386.msi
    hash: 08b7ed8a0593f829cebc92752cfd6320f9838dd3b35196f1f2b81f3e38fab107
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: 359db48381d6f1418aa8eca12ed23bc791ec73e60b7e151023f8b493efc54771
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: c7b6ac7832c2cdb5f0601f8d3e13dba6b1e43b94df2e0102ed5b1edc5ea34292
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: 0ac95dec7189bb3afe7002eb2e8787e5aa06ea5fd36e1f4964d13b7ad7099e26
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: 73305ad06fb6f8b4706e53fdb60617545942be4ad7e7674bcd3302489fee4e20
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: fafd103d1eb120350cb3feb4fa097f588df306e6cc240dc1776a874e74520cba
    platform: apple

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    hash: cee094165cc7e7d5f6e072aac05721a0c29d42859128885c64b0a3679497a5e7
    platform: freebsd
    release: 0.75.1

  - desc: Windows AMD64 (64 bits) Executable For Windows 7 Only
    name: windows-amd64-legacy.exe
    hash: a2a36041ac6632e0ae3893a1bab7a9c50ef8da0f68f670ab1cbaa1d60e63c885
    platform: windows

  - desc: Windows 32 bits Executable For Windows 7 Only
    name: windows-386-legacy.exe
    hash: eeacdcbe48c89faeb495455fbfe97abc049e1e39acf7cf2472baab8988882f7b
    platform: windows


---

Velociraptor is open source software and is free for anyone to use under the
[AGPL License](https://github.com/Velocidex/velociraptor?tab=License-1-ov-file#readme).

This page is for the current release. [The previous Release is 0.74.5]({{< ref "/downloads/previous_downloads" >}})

{{< release_download >}}

## Release notes

Full release notes are published in our [release blog post]({{< ref "/blog/2025/2025-08-30-release-notes-0.75/" >}})

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
  recommend using [the generic collector]({{< ref "/docs/offline_triage/#the-generic-offline-collector" >}}).


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
