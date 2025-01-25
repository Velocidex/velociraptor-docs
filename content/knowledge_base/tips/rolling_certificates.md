# How to fix "certificate has expired or not yet valid error"?

When Velociraptor generates a configuration file it also generates
some certificates to secure it's internal PKI.

The CA certificate is embedded in the client's configuration file and
underpins the entire Velociraptor communications protocol - all
certificates are issued by this internal CA. The Velociraptor CA is
set to expire in 10 years.

The Server certificate is signed by the CA certificate and is set to
expire in 1 year by default. When the certificate expires, clients
will be unable to connect to the server any more.

You can check the expiry time of the server certificate using curl and
openssl:

```
$ curl -s -k https://127.0.0.1:8000/server.pem | openssl x509 -text  | grep -A 2 Validity
Validity
   Not Before: Apr 13 12:05:46 2022 GMT
   Not After : Apr 13 12:05:46 2023 GMT
```

## What happens when the certificate expires?

- When the internal server certificate expires clients will not accept it and
  they will refuse to communicate. Clients will show as offline in the GUI and
  buffer data as long as possible, subject to their configured buffer limits.
- New GUI sessions will fail with "500 Internal Server Error" and the response
  body `{"code":2,"message":"Must set a username"}` and fail to load.

For Velociraptor versions 0.74 and later there is a mechanism to mitigate the
impact of unexpected certificate expiry:

- Upon restarting the server service, if the certificate
  (`Frontend.certificate`) has expired, and if the server.config.yaml contains
  the CA private key then it will automatically issue a new cert with the same
  validity period as the expired one. This temporary certificate is held in
  memory only and is NOT written to the server.config.yaml.
- In the server log you will see the following messages:

```bash
[ERROR] <log_date> Frontend Certificate is not valid: Certificate Valid NotBefore <start_date> and Not After <end_date> but Now is <current_date>. See https://docs.velociraptor.app/knowledge_base/tips/rolling_certificates/
[INFO] <log_date> Found CA private key in config, will automatically rotate keys, but you should consider updating the config file using `velociraptor config rotate`
```
If this is the case you should update your server certificate by reissuing a new
one.

## Rotating certificates

Reissuing a new server certificate can be performed at any time using the
`config reissue_certs` command. You can even reissue a certificate with extended
validity before you deploy your server.

The procedure amounts to generating a new server configuration which is derived
from the old one, and then replacing the old config with the new config.

The `config rotate_keys` command can be used to regenerate both the server
certificate and the associated private key. Although this is not necessary for
operational purposes, it is considered good security practice to rotate keys and
certificates periodically, and particularly after a suspected systems
compromise.

{{% notice info %}}

For server versions older than 0.72.3 please use the following commands instead
of those shown below:

|                         Goal                         | Command for the current version     | Command for versions <0.72.3      |
|:----------------------------------------------------:|-------------------------------------|-----------------------------------|
|             Reissue only the server cert             | `velociraptor config reissue_certs` | `velociraptor config reissue_key` |
| Reissue the server cert and<br> also the private key | `velociraptor config rotate_keys`   | `velociraptor config rotate_key`  |

{{% /notice %}}

#### Setting a non-standard validity

When reissuing the certificate the `--validity` flag can be used to extend the
validity beyond the default of one year. For example, to generate a config
containing a server certificate which is valid for 2 years, you would run the
command:

```sh
velociraptor --config server.config.yaml config reissue_certs --validity 730  > new.server.config.yaml
```

If you expect your server to be a long-term instance then you don't have to
start with the default 1-year validity and wait for the certificate to expire.
You can generate a new config on day 1 based on the initial config using the
`config reissue_certs` command. You can then use the new config for the new
server installation.

{{% notice tip %}}

In version 0.74 and later the configuration wizard (`velociraptor config
generate -i`) allows you to issue the server certificate with either 1-year,
2-year or 10-year validity.

{{% /notice %}}

#### Option 1: Reissue only the server cert

To rotate server certificates, use the following command to generate a new
configuration file containing rotated certificates:

```
$ velociraptor config reissue_certs --config /etc/velociraptor/server.config.yaml > /tmp/new_key.config.yaml
```

The `config reissue_key` command updates the following configuration items:
- `GUI.gw_certificate`
- `Frontend.certificate`

`CA.private_key`, `Client.ca_certificate`, `GUI.gw_private_key`, and `Frontend.private_key` are preserved.

#### Option 2: Reissue the server cert and also the private key

Alternatively, you can regenerate the server's private keys and rotate the
certificates at the same time:

```
$ velociraptor config rotate_keys --config /etc/velociraptor/server.config.yaml > /tmp/new_key.config.yaml
```

The `config rotate_key` command updates the following configuration items:
- `GUI.gw_certificate`
- `GUI.gw_private_key`
- `Frontend.certificate`
- `Frontend.private_key`

`CA.private_key` and `Client.ca_certificate` are preserved.

The previous two commands will not affect the CA private key and
certificate, which is valid for 10 years, as described previously.

You can view the new certificate using jq and openssl (here `jq` is
used to show the PEM certificate of the frontend and `openssl` is used
to decode it)

```
$ velociraptor --config /tmp/new_key.config.yaml config show --json | jq -r .Frontend.certificate | openssl x509 -text  | grep -A 2 Validity
Validity
   Not Before: Apr 25 21:01:51 2022 GMT
   Not After : Apr 25 21:01:51 2023 GMT
```

Now back up the old configuration file and replace it with the new
file, then restart the server. Clients should reconnect automatically.

Tags: #configuration #deployment
