---
title: pk_encrypt
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## pk_encrypt
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
data|The data to encrypt|string (required)
signing_key|Private key to sign with|string
public_key|Public key to encrypt with. Defaults to server public key|string
scheme|Encryption scheme to use. Defaults to X509. Currently supported: PGP,X509|string

Required Permissions: 
<span class="linkcolour label label-success">SERVER_ADMIN</span>

### Description

Encrypt files using pubkey encryption

