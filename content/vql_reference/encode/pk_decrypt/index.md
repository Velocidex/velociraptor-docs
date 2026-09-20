---
title: pk_decrypt
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Decrypt files using pubkey encryption
build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
data|The data to decrypt|string (required)
signing_key|Public key to verify signature|string
private_key|Private key to decrypt with. Defaults to server private key|string
scheme|Encryption scheme to use. Defaults to RSA. Currently supported: PGP,RSA|string
### Description

Decrypt files using pubkey encryption

