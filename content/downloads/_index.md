---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
pre: <i class="fas fa-download"></i>
release: 0.74.4
base_release: 0.74
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe
    hash: b00684287278d00e247bbc35a1f2cdec6b456499311c60748fe4234b246dc9aa
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: 2f494444267faf8f3455bd9dce604610b111102bb1f33220b08ddf9baf9a1cc1
    platform: windows

  - desc: Windows 32-bit Executable
    name: windows-386.exe
    hash: e4a38333745db7c949ef273ccec74ed3ddff739f93f39a37fb0caa755f7b000c
    platform: windows

  - desc: Windows 32-bit MSI
    name: windows-386.msi
    hash: f4deb6dfc26339d0649af4d7fa123e73ed78c0f78741a5ca43d0f1d5e8a8c8ed
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: e054c1b58b79bbab9ed2abfb75fd957598bf8b5294e7bec0e939f5d31056bd9f
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: 312d13f063b7c46776eda84f5d0ef0a17ac81eb6b01a056a65b7454bf9e646dc
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: d5da82558921190f0c89f76bc18181b5475012a65fb33eb7dff3df80727f6325
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: 212b34310b30dcb70506afba64fceb3e49d495e5c0bb27b6fcb747aac1b0d5ae
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: 6671d3f73ce655bef4689d9cc02cf6bf9eb0636d7d1c871a960c61c7882e7c42
    platform: apple

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    hash: 7a7a0109d300b385a6b3de06f60d38ddcc1dce80a2b0e0a8d36cc85b843d23e0
    platform: freebsd
    release: 0.74.1

  - desc: Windows AMD64 (64 bits) Executable For Windows 7 Only
    name: windows-amd64-legacy.exe
    hash: 2216689ba402137f4896296cb3c7496fef8b34c20a76b321d0f04c86baf31dfa
    platform: windows

  - desc: Windows 32 bits Executable For Windows 7 Only
    name: windows-386-legacy.exe
    hash: 606f6a46976cba2c3f762e2ec93e56b232139fedd7d1c428fea3cf2ed0141ca5
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

* We typically update to the latest version of Velociraptor but it may
  be that in future we disable some feature (VQL plugins) that can not
  be easily updated.


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
