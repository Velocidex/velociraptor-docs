# How do I use my own SSL certificates?

Use case: For an on-premises deployment, Let's Encrypt may not be an option. You may want to use your own enterprise/corporate Certificate Authority (CA) or another 3rd party.

Thanks to recent enhancements by the Velociraptor developers, this is quite a simple task. The below is a simple test configuration used and may need adapting to your environment.

Prior to commencing we have a plaintext PEM private key, certificate for our Velociraptor server, and the certificate chain of our enterprise CA, including the root and multiple intermediaries.


### Generate the configuration
Using Ubuntu we generated a stock standard "Self Signed SSL" configuration:

`./velociraptor-v0.6.3-2-linux-amd64 config generate -i`

<img width="491" alt="image" src="https://user-images.githubusercontent.com/30587915/163787136-f9e6f16f-5119-4cd0-ba43-741ab64cdc42.png">

### Update the server.config.yaml
Locate the frontend section and add the `tls_certificate_filename` and `tls_private_key_filename` parameters. Enter the absolute path to these files. For testing, we placed in /etc however there are better places for production use.
```yaml
Frontend:
  tls_certificate_filename: /etc/velociraptor.pem
  tls_private_key_filename: /etc/velociraptor.key
```

<img width="221" alt="image" src="https://user-images.githubusercontent.com/30587915/163787153-9734cbb8-ddbf-4140-b4d6-1c89e19afa7c.png">


### Update the client.config.yaml
In the client section modify `use_self_signed_ssl` to be false, and add the CA root/intermediary certificates to be trusted by the client:

```yaml
use_self_signed_ssl: false

Crypto:
    root_certs: |
          -----BEGIN CERTIFICATE-----
          XXXXX
          -----END CERTIFICATE-----
          -----BEGIN CERTIFICATE-----
          XXXXX
          -----END CERTIFICATE-----
          -----BEGIN CERTIFICATE-----
          XXXXX
          -----END CERTIFICATE-----
          ...
```

### Test
Launching the server we should be able to connect to the GUI using our new certificate. Note this must be trusted by browser/system to prevent errors.

Launching the client, it should connect securely without error, using the trusted CA chain and the new server certificate.

No changes need to be made to the pinned certificate name, nor do any certificates need to be modified in the configuration files.

Tags: #configuration #deployment
