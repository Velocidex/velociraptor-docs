---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
pre: <i class="fas fa-download"></i>
release: 0.74.5
base_release: 0.74
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe
    hash: f39d1164fba6a6aeb9759f98bcb6424a96cd6b06833d66714e1be3fc249cd544
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: 4d8708501edabeab1c30c481b07138f8d06d18610491f100f4e268069b397376
    platform: windows

  - desc: Windows 32-bit Executable
    name: windows-386.exe
    hash: 6ab6f29f459a8eb180b5bc81a8f7711c696599d5068fb09e594e88d20151c452
    platform: windows

  - desc: Windows 32-bit MSI
    name: windows-386.msi
    hash: 05a3199f5bd721762e79c1436f4b806ca65a4d8350f0e9d710c5099315b3a776
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: 710be6656b5668ff2bac551b80acee4958383aa5cfd8c9f7b895aa32046d9e35
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: bd18b915b16f3db7778065208aecde522438c00970620c3bf5fb45860a506798
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: f2416a0dface7cbbd7194b50639141e185961b9c4199d81d66e4cda4151691de
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: a63ea7927c31a760f0307844362a27f812a3354a084e724441e50bebab23ff80
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: 4e15e9f63bce88628df3720747945b9f7d097d1fccde9558a4c3d985221df8e5
    platform: apple

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    hash: 7a7a0109d300b385a6b3de06f60d38ddcc1dce80a2b0e0a8d36cc85b843d23e0
    platform: freebsd
    release: 0.74.1

  - desc: Windows AMD64 (64 bits) Executable For Windows 7 Only
    name: windows-amd64-legacy.exe
    hash: 51a58e048c1dae45efe02a9a088f856a7b63ed9ea47776678b1c5bb5f6f6fc72
    platform: windows

  - desc: Windows 32 bits Executable For Windows 7 Only
    name: windows-386-legacy.exe
    hash: 2c6acdbab4c1914de72ec4d8f5e9f57d328405fa3192cd3bc11c08a96ddba99e
    platform: windows


---

Velociraptor is open source software and is free for anyone to use under the
[AGPL License](https://github.com/Velocidex/velociraptor?tab=License-1-ov-file#readme).

This page is for the current release. [The previous Release is 0.73.4]({{< ref "/downloads/previous_downloads" >}})

{{< release_download >}}

## Release notes

Full release notes are published in our [release blog post]({{< ref "/blog/2025/2025-02-23-release-notes-0.74/" >}})

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
