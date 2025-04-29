---
menutitle: Key Concepts
title: Key Concepts
draft: false
weight: 10
date: 2025-02-27
last reviewed: 2025-04-27
summary: |
  Before we dive in to server deployment specifics it will be helpful to
  familiarize yourself with a few important concepts, which are central to all
  Velociraptor deployments.
---

Before we dive in to server deployment specifics it will be helpful to
familiarize yourself with a few important concepts, which are central to all Velociraptor
deployments.

* [Velociraptor's Configuration File](#velociraptors-configuration-file)
* [Velociraptor Binaries](#velociraptor-binaries)
* [Velociraptor’s Internal PKI](#velociraptors-internal-pki)
* [Certificate Schemes](#certificate-schemes)
* [Authentication Providers](#authentication-providers)
* [Velociraptor’s ACL model](#velociraptors-acl-model)


## Velociraptor's Configuration File

Central to every Velociraptor deployment is a
[YAML](https://www.tutorialspoint.com/yaml/yaml_basics.htm)
[configuration file]({{< ref "/docs/deployment/references/" >}}).
This file contains all the configuration parameters that define how your server
and clients operate, plus cryptographic material that is used to secure
several aspects of the deployment, such a client-server communications.

Velociraptor includes a command line
[configuration wizard](https://github.com/Velocidex/velociraptor/blob/master/tools/survey/README.md)
which guides you through the key decisions and provides sensible defaults for
most options. Ultimately it produces a YAML configuration file that contains
settings which both the Velociraptor server and clients will use. The
configuration wizard (`config generate -i`) is the recommended way to generate a
_new_ configuration, although it is common to then manually tweak some settings
in the configuration file before deployment. It is also sometimes necessary to
do this in response to new features or issues encountered after deployment.

![Generating a configuration for a self-signed deployment](self-signed-generation.gif)

Running the `config generate` command _without_ the interactive flag will
generate a basic sensible configuration using the self-signed SSL option and
Basic authentication, similar to the deployment described in our
[Quickstart Guide]({{< ref "/docs/quickstart/" >}}).
You can then manually customize the configuration settings in the YAML file to
your needs. Alternatively you can use this command to create an initial config
and also use the JSON merge flag (`--merge`) to apply customization. This allows
you to automate the generation and customization of the configuration in a
single step, which you may want to do in automated build environments.


{{< tabs >}}
{{% tab name="Linux" %}}
```shell
./velociraptor config generate --merge \
      '{"autocert_domain": "domain.com", "autocert_cert_cache": "/foo/bar"}' \
      > server.config.yaml
```
_Example: Config generate with merge_
{{% /tab %}}
{{% tab name="Windows" %}}
```shell
velociraptor.exe config generate ^
      --merge "{"""autocert_domain""": """domain.com""", """autocert_cert_cache""": """/foo/bar"""}" ^
      > server.config.yaml
```
_Example: Config generate with merge_
Note that while this can be run on Windows the quote escaping is arduous and
likely to be error-prone. We therefore don't recommend it.
{{% /tab %}}
{{% tab name="macOS" %}}
```shell
./velociraptor config generate --merge \
      '{"autocert_domain": "domain.com", "autocert_cert_cache": "/foo/bar"}' \
      > server.config.yaml
```
_Example: Config generate with merge_
{{% /tab %}}
{{< /tabs >}}

Because the configuration file is a key component to your deployment and
contains security-sensitive material you should always keep it secure and
ideally also keep an backup of it in a secure location. The server configuration
does not change unless you edit it, so remember to update your backup copy
whenever you make any changes.

The configuration file contains sensible default values for most settings, and
for non-critical keys Velociraptor will default to these values if such keys
are not specified. Editing the file manually to customize and tweak it for your
local deployment is normal and expected.

The config file is divided into sections. Here is a quick overview:

- `version` records details of the Velociraptor version that was used to
  create the configuration file. This is purely informational and does not
  affect operations at all. It is common to have version information here which
  is older than the binary (if the server has been upgraded). When reading a
  slightly old version of the config file, the server will validate and upgrade
  the in-memory copy if any adjustments are needed.
- `Client` section is used to configure clients, and is extracted to produce the
  client configuration file. The server does use some values from this section
  too though.
- `API` configures the API service. The API server accepts connections
  from the GUI gRPC gateway, as well as connections from the gRPC API clients.
- `GUI` configures the admin GUI web application.
- `CA` is the internal Velociraptor CA configuration. Do not edit this section!
  It is only used internally and is needed to sign new API keys and reissue
  server certificates. Secure deployments can remove this part of the config and
  safely store it offline.
- `Frontend` configures the server component that talks with clients. It is intended to
  be exposed to the internet on a public interface so that clients may reach it.
  This section also contains the server's certificate as signed by the CA
- `Datastore` configures the data store implementation, and specifies where to
  store the data for the server. Velociraptor has a datastore abstraction which
  can use a number of data storage engines.
- `Logging` configures logging in text format and optionally syslog. This
  section can apply to server or clients although it is typically not used for
  clients as there are more secure logging options that can be used.
- `Monitoring` controls the built-in monitoring server (i.e. Prometheus) If you
  have a monitoring solution like Grafana or Data Dog then change this server to
  bind to 0.0.0.0 and point your scraper at it.
- `defaults` section is used to define and override various default server
  settings.

You can see a comprehensive listing of settings in our
[configuration reference]({{< ref "/docs/deployment/references/" >}}).

All Velociraptor clients need a client configuration (file), which is specific
to the deployment. This configuration is a subset of the full configuration.

![Client config is a subset of the full config](client_config_yaml.svg)

Because the server has access to the full configuration it is able to provide
the client configuration to us when needed
[in the form of a YAML file]({{< ref "/docs/deployment/clients/#option-1-obtaining-the-client-config-from-the-gui" >}}).
The server can also use it internally, for example when generating a client
installation package.

## Velociraptor Binaries

Velociraptor does not have separate client binaries and server binaries. The
binary can function in either role, and perform various other utility functions.
The command line parameters supplied to the binary tell it whether to behave as
a server or as a client.

This means that it's technically possible to run the server or the client on any
platform that we have a binary for. However
_please note that the server is only fully supported on Linux_,
mainly due to performance considerations inherent in other platforms such as
Windows. For non-production deployments (e.g. development or testing) it might
be convenient for you to run the server on another platform and that's fine if
you feel adventurous and confident in your troubleshooting skills. Just keep in
mind that for production deployments we strongly recommend that the server
should run on Linux and that issues encountered when running the server on other
platforms will not be supported. For this reason we only describe deploying the
server on Linux.

Binaries for the latest version are listed on our
[Downloads]({{< ref "/downloads/" >}}) page, with the binaries themselves being
hosted on Github.

We provide binaries for the most common client platform and architecture
combinations, but if you have a need for an unusual platform/architecture it is
possible to build one for almost any combination supported by Go. Instructions
for building from source are provided on our
[GitHub page](https://github.com/Velocidex/velociraptor/?tab=readme-ov-file#building-from-source).

The binaries used for clients and for the server should ideally be kept at the
same minor version, although there shouldn't be any issues if the client is one
or two releases behind (since we rely on this compatibility to support remote
upgrades).

## Velociraptor’s Internal PKI

Every Velociraptor deployments creates an internal PKI which underpins it. The
configuration wizard creates an internal CA with an X509 certificate and a
private key. This CA is used for:

1. Creating [initial server certificates]({{% ref "/docs/deployment/references/#Frontend.certificate" %}})
   and for reissuing certificates when they expire.

2. Verifying the server during client-server communications. [The CA public
   certificate]({{% ref "/docs/deployment/references/#Client.ca_certificate" %}})
   is embedded in the client’s configuration and is used to verify
   (and therefore trust) the server.

3. Creating API keys for programmatic access. The server is then able to verify
   API clients.

4. Creating client certificates for (optional) mTLS. This allows clients to be
   authenticated using certificates.


The configuration file contains the CA’s X509 certificate in the
`Client.ca_certificate` key (and is therefore included in the client
configuration). The private key is contained in the `CA.private_key` parameter.
Since the client’s configuration contains the (trusted) CA's certificate, it is
able to verify the server's certificate during communications.

The internal CA will be used to verify the different Velociraptor components in
all cases, regardless of whether other TLS certificates are used. While it is
possible to reissue/rotate server certificates the CA certificate can not be
reissued without re-deploying all the clients.

{{% notice warning "Protecting the CA private key" %}}

In a secure installation you should remove the `CA.private_key` section from
the server config and keep it offline. You only need it to
[create new API keys]({{< ref "/docs/server_automation/server_api/#creating-an-api-client-configuration" >}})
and when
[rotating server certificates]({{< ref "/knowledge_base/tips/rolling_certificates/" >}})
(typically after 1 year).
The server does not need it during normal operations.

{{% /notice %}}


## Certificate Schemes

In addition to using certificates issued by the internal CA, Velociraptor
supports TLS for client-server communications as well as access to the GUI. This
_outer_ TLS-secured layer allows the use of certificates issued by other CAs,
although we also can use our own self-signed certificates for this purpose.

Before the client communicates with the server, the client must verify it is
actually talking with the correct server. This happens at two levels:

1. If the server URI is an HTTPS URI then the TLS connection needs to be
   verified. This means that the certificate needs to be signed by a trusted CA.
2. The client will then fetch the certificate from the URI `/server.pem` which
   is the server's internal certificate. This certificate must be verified
   against the embedded CA certificate.

This verification is essential in order to prevent the client from accidentally
talking with captive portals or MITM proxies.

By default Velociraptor searches for root certificates from the running system
so it can verify TLS connections. Additionally Velociraptor accepts additional
root certs embedded in its config file (Just add all the certs in PEM format
under the `Client.Crypto.root_certs` key in the config file). This helps
deployments that must use a MITM proxy or traffic inspection proxies.

For the outer TLS, Velociraptor supports self-signed and certs issued by trusted
CAs.

#### Self-signed Certificates

In self-signed SSL mode, Velociraptor issues its own server certificate using
its internal CA. This means the Admin GUI and front end also use a self-signed
server certificate.

This type of deployment is most appropriate for on-premises scenarios where
internet access is not available or egress is blocked.

Self-signed SSL certificates trigger SSL warnings in all web browsers. When
accessing the Admin GUI you will receive a certificate warning about the
possibility of a MITM attack.

Velociraptor doesn't support other self-signed SSL certificates, and we don't
recommend attempting to add your own self-signed certificates to Velociraptor.

#### CA-issued Certificates

For CA-issued certificates we prefer Let's Encrypt since these are free and
Velociraptor has the built-in capability to request and rotate certificates from
Let's Encrypt. Other CAs are also supported, including private CAs, although
this requires
[manual configuration and certificate management]({{< ref "/knowledge_base/tips/ssl/" >}}).

##### A. Let's Encrypt

To use Let's Encrypt certificates we have an internal mechanism for requesting a
certificate for the DNS name provided in Velociraptor's config. In order to this
to work, Let's Encrypt goes through a verification protocol requiring that one
of their servers connect to the Velociraptor server on ports 80 and 443.

Therefore, the server needs to be reachable over ports 80 and 443 (You can not
serve over a non-standard SSL port with Let's Encrypt).

If you filter port 80 from the internet then Let's Encrypt will be unable to
verify the domain and will likely blacklist the domain name for a period. It is
crucial that port 80 and 443 be unfiltered to the world. It is difficult to
recover from a blacklisting event other than waiting for a long period of time.

##### B. Bring your own certs

It is possible to use a certificate from a public CA or your own private CA, but
this requires manual configuration and certificate management.

Please see
[Securing Network Communications]({{< ref "/docs/deployment/security/#securing-network-communications" >}})
for a more detailed discussion of this option.


## Authentication Providers

Velociraptor offers a number of options to authenticate users into the GUI. The
type of authenticator is specified in the `GUI.authenticator.type` setting. The
config wizard supports configuring some commonly-used authenticators, but others
have to be manually configured.

To make deployment easier the configuration wizard supports creating
**Initial Users**. These user accounts will be created automatically when the
server starts upon first installation and be given the administrator role.
This provides a way to bootstrap the administrator into the server. If the Basic
authentication method is specified, the password hashes and salt will be
initialized from the configuration file. For other authentication methods that
do not use passwords, the password hashes are ignored.

Velociraptor supports a number of choices for authentication providers:

1. Basic Authentication - this stores usernames and passwords in Velociraptor's
   own datastore.
2. OAuth2 - providers such as Google, Azure or GitHub support SSO via OAuth2.
3. OIDC - uses the Open ID Connect protocol to support many IAM providers (e.g.
   Okta)
4. SAML - Security Assertion Markup Language, also supported by many public SSO
   providers.
5. [Multi]({{< ref "/knowledge_base/tips/multiple_oauth/" >}}) - a combination
   of the abovementioned auth methods.

## Velociraptor’s ACL model

Velociraptor is a very powerful tool with a great deal of privileged access to
many endpoints. By necessity, Velociraptor clients typically run with System or
root level access on endpoints in order to have low level access to the
operating system. It follows that administrators on Velociraptor also have
privileged access to the entire domain as well — they are equivalent to domain
administrators.

Velociraptor users are assigned various permissions to control their actions. To
make it easier to deal with a group of permissions, Velociraptor has the concept
of a **role** which can be thought of as just a predefined set of
**permissions**. The actual permission check is made against the set of
permissions the user has.

Please see
[Velociraptor’s ACL model]({{< ref "/blog/2020/2020-03-29-velociraptors-acl-model-7f497575daee/" >}})
and [Roles and permissions]({{< ref "/docs/deployment/security/#roles-and-permissions" >}})
for a more detailed discussion of this topic.
