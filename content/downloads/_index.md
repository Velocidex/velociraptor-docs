---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
pre: <i class="fas fa-download"></i>
release: 0.75.3
base_release: 0.75
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe
    hash: e4c27657fd8e40fb4bec5497600e6bf1d94c723ffb715c32e68558377e7f0ee0
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: 02a7e298140dc5fdfd59fcd25f57136febc816ce6b041d064c80a60977d6567b
    platform: windows

  - desc: Windows 32-bit Executable
    name: windows-386.exe
    hash: e8fa72d037b866466fba77082a1dff895f4255a432123c00cef5f253f0d71976
    platform: windows

  - desc: Windows 32-bit MSI
    name: windows-386.msi
    hash: 06818579db84625a7ae46236a9734ab58fc2b49f65d503a9f77578129009da94
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: 90d93ce6fd43ee622141c190ac381f4b5b6d5be71f50d1ed1e3e33dc65151f49
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: 65bf37890dc3e0196657d700961a3dda75eee395ea2adf378142dd5ab051427f
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: 1a0403eba6f4bbf65e167204704c6919ded0fc49c049cf80885b33152477b45e
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: 4b7aeeaffd063a8adbe3bb2f5fd09536b27eef285563e1910c66521363a048c6
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: 1fefd728d427763d6f3777cc15d0a6eb72f6509b06e5013986aefa4ba7570d2e
    platform: apple

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    hash: cee094165cc7e7d5f6e072aac05721a0c29d42859128885c64b0a3679497a5e7
    platform: freebsd
    release: 0.75.1

  - desc: Windows AMD64 (64 bits) Executable For Windows 7 Only
    name: windows-amd64-legacy.exe
    hash: 3f44af40cb10ff5ee98087f284943e28eaacb84321fee1d3a66724a197cc82ff
    platform: windows

  - desc: Windows 32 bits Executable For Windows 7 Only
    name: windows-386-legacy.exe
    hash: 94ffb782fdb9bdf14aa6a961f5ab9ff7da13a9a2686eaf336c5864395e77bd10
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
