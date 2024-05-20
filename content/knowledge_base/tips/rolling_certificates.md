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

## Rotating certificates

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
