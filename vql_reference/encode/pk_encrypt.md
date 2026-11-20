# pk_encrypt



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
data|The data to encrypt|string (required)
signing_key|Private key to sign with|string
public_key|Public key to encrypt with. Defaults to server public key|string
scheme|Encryption scheme to use. Defaults to X509. Currently supported: PGP,X509|string

**Required permissions:** `SERVER_ADMIN`

### Description

Encrypt files using pubkey encryption


