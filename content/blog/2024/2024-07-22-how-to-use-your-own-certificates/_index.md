---
title: "How to use your own certificates to secure your Velociraptor deployment"
description: |
    Velociraptor is a robust open-source tool designed for endpoint
    monitoring and digital forensics and response. Whether you deploy it
    on-premise or in the cloud, securing communication between the
    Velociraptor server and its clients is crucial. This blog post will
    guide you through creating and installing TLS certificates using
    DigiCert as your Certificate Authority (CA).

tags:
 - Deployment

author: "Chris Hayes"
date: 2024-07-16
---

This article was reproduced with permission from
[reliancecyber.com](https://reliancecyber.com/how-to-use-your-own-certificates-to-secure-your-velociraptor-deployment/). It
outlines some of the practical steps needed to deploy Velociraptor
with custom certificates and some step by step troubleshooting steps
that can be used to diagnose deployment issues.

## Using DigiCert as the certificate Authority

Velociraptor is a robust open-source tool designed for endpoint
monitoring and digital forensics and response.


## Introduction

Velociraptor is a robust open-source tool designed for endpoint
monitoring and digital forensics and response. Whether you deploy it
on-premise or in the cloud, securing communication between the
Velociraptor server and its clients is crucial. This blog post will
guide you through creating and installing TLS certificates using
DigiCert as your Certificate Authority (CA).

This guide has been written to provide additional guidance to the
following official Velociraptor articles.

[How do I use my own SSL certificates?](https://docs.velociraptor.app/knowledge_base/tips/ssl/)

[Velociraptor Security Configuration](https://docs.velociraptor.app/docs/deployment/security/).

## Prerequisites

Before getting started, ensure you have the following:

* *Domain name*: Own or control a domain name, such as example.com.
* *Accessible Velociraptor server*: Ensure your server is accessible via
  a domain name, e.g., DNS A record points to your Velociraptor
  server’s Public IP.
* *DigiCert* account: A valid SSL certificate from DigiCert for your domain.
* *OpenSSL*: Installed on your machine.


## Creating the certificate files

You will need three key files for the Velociraptor server:

* *Velociraptor.pem*: Contains the public certificate identifying your
  Velociraptor server.
* *your_domain_name.key*: Contains the private key for your SSL
  certificate. Keep this file secure.
* *CA_chain.pem*: Contains the certificate chain of your enterprise
  CA, including intermediate and root certificates.


DigiCert will provide the following files:

* *Private Key*: `your_domain_name.key`
* *Primary Certificate*: `your_domain_name.crt`
* *Intermediate Certificate*: `DigiCertCA.crt`
* *Root Certificate*: `TrustedRoot.crt`


For details on how to request your certificates [How do I Order a TLS/SSL Certificate? | DigiCert FAQ](https://www.digicert.com/faq/public-trust-and-certificates/how-do-i-order-a-tls-ssl-certificate)

## Creating Velociraptor.pem

To create the Velociraptor.pem file, you need to convert the Primary
Certificate (`your_domain_name.crt`) file from CRT to PEM format.

Open a terminal and run the following command:

```
openssl x509 -in your_domain_name.crt -out velociraptor.pem -outform PEM
```

Verify the certificate details:

```
openssl x509 -in velociraptor.pem -text -noout
```

You should see the details of your certificate, such as the issuer,
the subject, the validity period, and the public key.

## Verifying the key file

Ensure the private key (`your_domain_name.key`) is in PEM format and
decrypted. When viewed, the file should look like this:


```
-----BEGIN RSA PRIVATE KEY-----

    {base64 encoded data}

-----END RSA PRIVATE KEY-----
```

To verify that the key format is valid, run the following command:

```
openssl rsa -in your_domain_name.key -check
```

You should see `RSA key ok`.

## Creating CA_chain.pem

To create the CA_chain.pem file, you need to combine the intermediate
certificate (`DigiCertCA.crt`) and the root certificate
(`TrustedRoot.crt`) into one file. This can be done by simply
concatenating the two files using a text editor or a command line
tool. For example, you can run the following command:

```
cat DigiCertCA.crt TrustedRoot.crt > CA_chain.pem
```

{{% notice "note" %}}
Ensure the order is correct: server certificate first, followed by intermediate certificates (you may have more than one), and finally the root certificate.
{{% /notice %}}

You should now have the following files in your cert folder:

* *Velociraptor.pem* (contains only the server certificate)
* *your_domain_name.key* (contains the unencrypted private key)
* *CA_chain.pem* (contains the certificate chain of your enterprise CA)


## Configuring Velociraptor

To enable TLS encryption for the Velociraptor server and client:

### Generate a Self-Signed SSL Configuration:

```
./velociraptor-0.72.3-linux-amd64 config generate -i
```

**Note**: The version number may be different for the most recent release.


![The velociraptor configuration generator screenshot](Configuring-Velociraptor.png)


{{% notice "note" %}}

In this configuration I set frontend to communicate over port 443 as
most firewalls in a network will allow this traffic outbound making it
easier for the deployment of clients.

{{% /notice %}}

## Update the Server Configuration:

To use your own Certificates, you need to update the server
configuration file (`server.config.yaml`)

1. Locate the frontend section and add the `tls_certificate_filename`
   and `tls_private_key_filename` parameters (these are not included by
   default).

2. Enter the absolute path to these files. For testing, we placed them
   in /etc, but you may want to use a different location for
   production use.

```yaml
Frontend:

  tls_certificate_filename: /etc/velociraptor.pem

  tls_private_key_filename: /etc/your_domain_key.key
```

![Configuring server update Velociraptor](Configuring-server-update-Velociraptor.png)

## Update the client configuration:

**Note**: if you have already exported a `client.config.yaml`, then you
need to update the client section in both `server.config.yaml`
configuration file and the `client.config.yaml` configuration
file. Remember, the client configuration is embedded into the server
configuration file, so you need to update it there as well.

1. In the client section, modify `use_self_signed_ssl` to be
   **false**. This will tell the client to use the CA certificate instead
   of the server certificate for verification.

2. Copy and paste the CA root and intermediate certificates (created
   in the `CA_chain.pem` file) to the `root_certs` parameter. This will
   allow the client to trust the CA certificate chain. For example:

```yaml
use_self_signed_ssl: false
Crypto:
    root_certs: |
         -----BEGIN CERTIFICATE-----
         The Intermediate Certificate

         -----END CERTIFICATE-----

         -----BEGIN CERTIFICATE-----

            The Root Certificate

         -----END CERTIFICATE-----
```

{{% notice "note" %}}

As discussed in the certificate section, ensure that the intermediate
and root certificates are in the correct order. The server certificate
should come first, followed by any intermediate certs, and finally the
root trusted authority certificate (if self-signed) for more
information, please see
https://www.rfc-editor.org/rfc/rfc4346#section-7.4.2

{{% /notice %}}

## Testing the TLS Encryption

To verify the TLS encryption:

* **GUI**: Launch the Velociraptor server and connect to the GUI using
  your web browser. You should be able to access the GUI using the new
  certificate. You may need to trust the certificate in your browser
  or system to prevent errors.

* **Frontend**: Launch the Velociraptor client and check the logs for
  any errors. The client should connect securely to the server using
  the trusted CA chain and the new server certificate.

* No changes need to be made to the pinned certificate name, nor do
  any certificates need to be modified in the configuration files.


## Troubleshooting

### Connection/certificate errors:

To validate that the certificates you are using are in the right
format, you can use the command to diagnose issues:

```
openssl [x509|rsa] -in CERT_FILE -text -noout
```

If the certificates are in the right format and valid you should use
curl to confirm connectivity by requesting the `server.pem` file from
the velociraptor server (as detailed in [Troubleshooting and
Debugging](https://docs.velociraptor.app/docs/deployment/troubleshooting/)).

### Use curl from the server localhost

```
curl https://localhost/server.pem -vvv
```

**Reason**: This command tests the server’s ability to serve the
certificate file (`server.pem`) over HTTPS from the local machine. Using
the `-vvv` flag enables verbose output, providing detailed information
about the connection process, including SSL/TLS handshake details. It
helps to confirm that:

1. **Local Server Configuration**: The server is properly configured to
   handle HTTPS requests.
2. **Certificate Availability**: The certificate file is accessible and
   correctly served by the server.

### Use curl from the server localhost allowing self-signed certificates

```
curl https://localhost/server.pem -vvv -k
```

**Reason**: This command includes the -k option, which allows
connections to servers using self-signed certificates. It helps to:

1. **Bypass SSL Verification**: Ensure that the server can still serve the
   certificate even when SSL verification is bypassed. This is useful
   for testing purposes when using self-signed certificates.

2. **Debugging**: Identify issues related to SSL verification failures
   that might not be apparent when SSL verification is enforced.


### Use  curl from the localhost via DNS

```
curl https://www.example.com/server.pem -vvv
```

**Reason**: Running this command from the localhost but using the
domain name tests:

1. **DNS Resolution**: Ensure that the domain name resolves correctly to the local server.
2. **SSL/TLS Configuration**: Confirm that the server is correctly serving the certificate over the domain name.

### Use curl from a remote client

```
curl https://www.example.com/server.pem -vvv
```

**Reason**: This command tests the following from a remote client (a
different machine than the server):

1. **External Connectivity**: Ensure that the server is accessible over
   the internet or network and that there are no firewall or network
   issues preventing access.
2. **SSL/TLS Configuration**: Confirm that the SSL/TLS setup is correct
   and the server is properly serving the certificate to external
   clients.
3. **Certificate Acceptance**: Verify that the client can accept and
   validate the certificate, ensuring the trust chain is correctly
   established.

These steps validate the entire communication path, from local server
configuration to remote client connectivity.

## Proxy Errors:

A proxy or SSL inspection device is a network device that inspects and
modifies the traffic between the client and the server. Sometimes
these devices can cause problems, especially if they are not
configured properly or are incompatible with the server’s TLS version
or cipher suite.

One possible error is this Server reports:

> http: TLS handshake error from XX.XX.XX.XX: :22439 read tcp XX.XX.XX.XX:443-> XX.XX.XX.XX:22439: read: connection reset by peer


This means the server-client TLS connection was interrupted. This
could be due to network issues, firewall settings, or expired
certificates.

Another possible error reported by the client:

> wsarecv: An existing connection was forcibly closed by the remote host.

This means the server or something in between closed the connection
abruptly. This could be due to server overload, crash, or shutdown, or
a proxy or SSL inspection device that interferes with the connection.

To check if there is a proxy or SSL inspection device that is causing the connection errors, run this command:

```
curl https[://]server.com/server.pem -vvv
```

This command tries to download the server’s certificate file using
curl. If the command succeeds, there is no proxy or SSL inspection
device that is blocking or altering the connection. If the command
fails or idles, there is something in between that is preventing or
delaying the connection.

If you suspect that there is a proxy or SSL inspection device that is
causing the connection errors, try these solutions:

* Review the configurations of the proxy or SSL inspection device and
  make sure they are compatible with the server’s TLS version and
  cipher suite. You can use tools like `SSL Labs` or `TestSSL` to check
  the server’s TLS configuration and compare it with the proxy or SSL
  inspection device.
* Disable or bypass the proxy or SSL inspection device temporarily and
  see if the connection errors go away. This can help you isolate the
  problem and confirm that the proxy or SSL inspection device is the
  culprit.
* Contact the administrator or vendor of the proxy or SSL inspection
  device and ask for help or guidance on how to resolve the
  issue. They might have some tips or updates that can fix the
  problem.

For full details on troubleshooting or for any other debugging issues,
please see [Troubleshooting and Debugging](https://docs.velociraptor.app/docs/deployment/troubleshooting/)

## About the author

![Picture of Chris Hayes - Head of IR](Untitled-design-5-e1721652417163.png)

### Chris Hayes, Head of Incident Response at Reliance Cyber

Chris possesses over 10 years of experience across a series of Cyber roles within both the private public sector. As ex-military, Chris has responded to some of the largest and most high-profile cyber-attacks in addition to tracking sophisticated nation state threat actor groups.
