---
title: pk_decrypt
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## pk_decrypt
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
data|The data to decrypt|string (required)
signing_key|Public key to verify signature|string
private_key|Private key to decrypt with. Defaults to server private key|string
scheme|Encryption scheme to use. Defaults to RSA. Currently supported: PGP,RSA|string

### Description

Decrypt files using pubkey encryption

