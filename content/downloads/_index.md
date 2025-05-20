---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
pre: <i class="fas fa-download"></i>
release: 0.74.3
base_release: 0.74
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe
    hash: 9183d559fcc2696702381bd6a2cf067a5c6fa2af05354eca99b0de39ad54f397
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: 6fcbd80a7f9278b7bdb74f9f75dcb5ec556e9f40ead264fc65902c71e9e20faa
    platform: windows

  - desc: Windows 32-bit Executable
    name: windows-386.exe
    hash: 84020d055a71f9d1a64b9d2a9c4cced72657cea16c780843046fb152417cd618
    platform: windows

  - desc: Windows 32-bit MSI
    name: windows-386.msi
    hash: b9cd8ceba213f5f48288eec977967b0686dc1f6996faa50e838176224ef5ad19
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: 5cbf5bd0424ca42bbac3d1f618e3ae137915698561c2b67545a78381cd6ab6e7
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: b0f25b3a90d95c0dcd00600b1a6be10739f1f18fefedc67f03535cba490790c7
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: 8bf823d9d7ac8430e16dddff561aeb645817b3e93b3a5073badaa6bc3aeba732
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: 336df23ce250b3e3298e741513bcbbceaf3a2467c43085eb271561d31f6a352e
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: 1382cfe5ef5a7e3ad3bb093d28fbc64e08c7ef85aa7cd46891351acec318ebf7
    platform: apple

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    hash: 7a7a0109d300b385a6b3de06f60d38ddcc1dce80a2b0e0a8d36cc85b843d23e0
    platform: freebsd
    release: 0.74.1

  - desc: Windows AMD64 (64 bits) Executable For Windows 7 Only
    name: windows-amd64-legacy.exe
    hash: 829f043863e1d2e0602449cf19a86e4e761d011e2603d9a996ff6dd77cf224e1
    platform: windows

  - desc: Windows 32 bits Executable For Windows 7 Only
    name: windows-386-legacy.exe
    hash: c547d4a15873d8e3a2db7d36ff62fdadc13bbc28f9a3cbc60bddaacc1d04e9c0
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
