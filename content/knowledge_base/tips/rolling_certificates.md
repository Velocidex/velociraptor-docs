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

Reissuing a new server certificate can be performed at any time using the
`config reissue_certs` command. The procedure amounts to generating a new
server configuration which is derived from the old one, and then replacing the
old config with the new config.

Additionally the `config rotate_keys` command can be used to regenerate both
the server certificate and the associated private key. Although this is not
necessary for operational purposes, it is considered good security practice
to rotate keys and certificates periodically, and particularly after a
suspected systems compromise. 

## Setting a non-standard validity

The latest release has a `--validity` option can be used to extend the validity
beyond the default of one year. For example, to generate a config containing a
server certificate which is valid for 2 years, you would run the command:
```sh
velociraptor --config server.config.yaml config reissue_certs --validity 730  > new.server.config.yaml
```

If you expect your server to be a long-term instance then you don't have to
start with the default 1-year validity and wait for the certificate to expire.
You can generate a new config on day 1 based on the initial config using the
`config reissue_certs` command. You can then use the new config for the new
server installation.

## Rotating certificates

{{% notice info %}}

For server versions older than 0.72.3 please use the following commands instead
of those shown below:

- *Current command* -> *Command for versions <0.72.3*
- `velociraptor config reissue_certs` -> `velociraptor config reissue_key`
- `velociraptor config rotate_keys` -> `velociraptor config rotate_key`

{{% /notice %}}

To rotate server certificates, simply use the following command to
generate a new configuration file containing rotated certificates:

```
$ velociraptor config reissue_certs --config /etc/velociraptor/server.config.yaml > /tmp/new_key.config.yaml
```

Alternatively, you can regenerate the server's private keys and rotate the
certificates at the same time:

```
$ velociraptor config rotate_keys --config /etc/velociraptor/server.config.yaml > /tmp/new_key.config.yaml
```

The previous two commands will not affect the CA private key and
certificate, which is valid for 10 years, as described in the
previous section.

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
