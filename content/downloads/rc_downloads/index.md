---
title: "Release Candidates"
date: 2021-06-23T08:29:57Z
draft: false
weight: 25
no_children: true
pre: <i class="fas fa-download"></i>
release: 0.77.1-rc1
base_release: 0.77.1-rc1
arches:
  - desc: Windows AMD64 (64-bit) Executable
    name: windows-amd64.exe
    hash: 9749c273d8cf85ecbecba2ffb01a8ff6a171b5eaa48164a9c474f3ef1ccfd19e
    platform: windows

  - desc: Windows AMD64 (64-bit) MSI
    name: windows-amd64.msi
    hash: f44ff68c32f5ab6547d17a6774e3a2012c457520b6d295f05e8074fd6474a109
    platform: windows

  - desc: Windows 32-bit Executable
    name: windows-386.exe
    hash: ae5ee24bde67726d28a652c6d2aaf5949b7b5642098b0ddf186309daad723c63
    platform: windows

  - desc: Windows 32-bit MSI
    name: windows-386.msi
    hash: 222b8c9d49515087f69ddda362ae2cfcc3b4f20df6bf24548cdd319461fbe4cd
    platform: windows

  - desc: Linux Ubuntu 22.04 AMD64 and later. Recommended for servers.
    name: linux-amd64
    hash: e1eb03d48da6d47769c7a7e7ad36403adb3b323b60796fd33beadf7aae177fdf
    platform: linux

  - desc: Linux Ubuntu 22.04 ARM and later. Recommended for servers or containers.
    name: linux-arm64
    hash: bb7c0c10db1292c641b2d4aef6e914b52546d9761170e9f03d58e29386da1c0e
    platform: linux

  - desc: Linux Static Build (Older Releases, e.g. RHEL, Centos) Recommended for clients.
    name: linux-amd64-musl
    hash: 76d39cde013f32cae3a62030daff7a5bd201ff7f226a70387d0097eb62418787
    platform: linux

  - desc: Linux Sumo build. Recommended for servers.
    name: linux-amd64-sumo-musl
    hash: 512d1ea9c2ad3796c0da04136e1e3aa7f11105d1e38288bb468ea55357fdf913
    platform: linux

  - desc: MacOS AMD64
    name: darwin-amd64
    hash: 860ec855cbda03f3a63c8097a4d9d6fe395b3ccf4f641824c492e0437817faf4
    platform: apple

  - desc: MacOS ARM (M1, M2 chipsets)
    name: darwin-arm64
    hash: 2cf8e12cc8af81761694e4995b659ad8fc947260eb92ef97596d0b606579abb4
    platform: apple

description: |
  This is the release candidate. It is available for testing.

  For production use, please check out the [current release](/downloads/)
---

This is the release candidate. It is available for testing.

For production use, please check out the [current release](/downloads/)

{{< release_download >}}

## Release notes

Full release notes are published in our [release blog post](/blog/2026/2026-05-31-release-notes-0.77/)

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
