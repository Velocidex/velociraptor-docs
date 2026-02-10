---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
pre: <i class="fas fa-download"></i>
release: 0.75.6
base_release: 0.75
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe
    hash: 09e6c312c5003e4326e3f71cb2d06a596826b50a911aabe76925790f95e67c33
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: 24265847a43dc60e861a3cb9eb7ad0c51b163777b576bddd5f270db84eb522f7
    platform: windows

  - desc: Windows 32-bit Executable
    name: windows-386.exe
    hash: 3273edf9a3807b88f6dc31148cbc15d4e1b3d7b31032827fc7d19620991162d7
    platform: windows

  - desc: Windows 32-bit MSI
    name: windows-386.msi
    hash: 3a5c62ebce53caa150505aaf538f62de465e5b6eae68c058313fe4cf027116c7
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: 2f1b1759b376bcaa2f2f3b936580484beb4318d6613e953c124fdc1400c625fb
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: 62c26e601925f421d1714c39275b7020fe5f52bdb213c77257cb58a981626d7a
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: 87a330e5459b0b5295290657705808704a7a3fa10d7fe8b0489e0a44fd1d0283
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: 0e616e6794dd100f3763a2d5eec1e180cc8afe35eacbbc9b52b398cdeef9351a
    platform: apple
    release: 0.75.5

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: 1c162662bf915d352889b8e9050afb2fa5359f48b19af1e81ca37d8cf0c878ae
    platform: apple
    release: 0.75.5

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    hash: cee094165cc7e7d5f6e072aac05721a0c29d42859128885c64b0a3679497a5e7
    platform: freebsd
    release: 0.75.1

  - desc: Windows AMD64 (64 bits) Executable For Windows 7 Only
    name: windows-amd64-legacy.exe
    hash: b89d7d9e22ca548a934759c07b45402bebdf7db147237d797df277585790450e
    platform: windows
    release: 0.75.5

  - desc: Windows 32 bits Executable For Windows 7 Only
    name: windows-386-legacy.exe
    hash: c234860d42c19d368843f96eb2ed2adfa0e866a9b2aee4ca25accbb28aa90a2c
    platform: windows
    release: 0.75.5

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
