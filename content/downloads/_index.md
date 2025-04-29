---
title: "Downloads"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
pre: <i class="fas fa-download"></i>
release: 0.74.2
base_release: 0.74
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe
    hash: dd77e7d49230a1e1433d9423f6468fb2f4cb4d4806194b614eb83c431a0ca99e
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: b894d37894041edb830eebd101b9f085c286eda5981562a7683f996f97d46d62
    platform: windows

  - desc: Windows 32-bit Executable
    name: windows-386.exe
    hash: 59ceeb27ec33ae4c7aa665f23353977f9c78358486e75bb83b7c52cc92b7306b
    platform: windows

  - desc: Windows 32-bit MSI
    name: windows-386.msi
    hash: aa7bd782d6faf17493e779a44c238a4e715c7063c6a9b07ecbdcdaec07b96f93
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: 4d5b02e36abc57e8518287afcee56caf121b4f54e388e7a5553c5e87ac655ae0
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: a3f47f5c82f5d76296705feedc47eac66d758f7ffb288b31fe147305071bdd95
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: bfff7ea596ca0a991aebcf648dc1e1be009bdc4888a0cef521426c7107814268
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: 0bbeb1d18271599f3062af1332964c950bfddda2fd5e8ed768ce51e7e8aa5ddf
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: bbed0805c9195f0f23a24cb9189266ea8d8907d6b7d708df14b3ffbe80db2505
    platform: apple

  - desc: FreeBSD AMD64
    name: freebsd-amd64
    hash: 7a7a0109d300b385a6b3de06f60d38ddcc1dce80a2b0e0a8d36cc85b843d23e0
    platform: freebsd
    release: 0.74.1

  - desc: Windows AMD64 (64 bits) Executable For Windows 7 Only
    name: windows-amd64-legacy.exe
    hash: fdc94e1e928b832b7ec2c72cf5fde468a2a55cc1b32841ca44d83eae86765424
    platform: windows

  - desc: Windows 32 bits Executable For Windows 7 Only
    name: windows-386-legacy.exe
    hash: 67be97f7a82a4f9bf3f0ca33fcf774087468c49cd66cfc59ac1031f90ffb3e76
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