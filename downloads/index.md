# Downloads

Velociraptor is open source software and is free for anyone to use under the
[AGPL License](https://github.com/Velocidex/velociraptor?tab=License-1-ov-file#readme).

This page is for the current release. [The previous Release is 0.76.7](/downloads/previous_downloads/).

{{< release_download >}}

## Release notes

Full release notes are published in our [release blog post](/blog/2026/2026-05-31-release-notes-0.77/)

## The Sumo build

In recent releases, the build was split into two:

1. The regular build is suitable for both clients and servers. It
   reduces binary size by removing some large dependencies.
2. The Sumo build includes additional dependencies which inflate the
   size of the binary.

In particular, the Sumo build uses the official AWS SDK, while the
regular build uses the light weight Minio client library. If your
server needs AWS integration (particularly around credentials) you
will probably need to use the Sumo build.

> [!NOTE] Support for Windows 7
> Golang has officially [ended support for Windows
> 7](https://github.com/golang/go/issues/57003) with the Go 1.20
> release. Current builds do not support this platform.
>
> The Windows 7 binaries mentioned above are built with the deprecated
> Go 1.20 release which is known to work on Windows 7.
>
> However, note the following caveats:
>
> * To build under this unsupported Go version we had to freeze
>   dependencies. Therefore this build includes known buggy and
>   unsupported dependencies.
>
> * This build may be insecure! since it includes unsupported
>   dependencies.
>
> * We might disable some feature (VQL plugins) that can not be easily
>   updated. These builds may miss some specific functionality.
>
> * If you need to use these builds for an offline collector we
>   recommend using [the generic collector](/docs/deployment/offline_collections/#the-generic-collector).
>
>
> **Do not use this build in a general deployment!** Only use it for
> deploying on deprecated, unsupported operating systems:
>
> * Windows 7
> * Windows 8, 8.1


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

