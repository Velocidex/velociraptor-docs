---
menutitle: Key Concepts
title: Key Concepts
draft: false
weight: 10
date: 2025-02-27
last reviewed: 2025-04-26
summary: |
  Before we dive in to server deployment specifics it will be helpful to
  familiarize yourself with a few important concepts, which are central to all
  Velociraptor deployments.
---

Before we dive in to server deployment specifics it will be helpful to
familiarize yourself with a few important concepts, which are central to all Velociraptor
deployments.

* [Velociraptor's configuration file](#velociraptors-configuration-file)
* [Velociraptor’s internal PKI](#velociraptors-internal-pki)
* [Velociraptor Binaries](#velociraptor-binaries)


## Velociraptor's configuration file

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
_new_ configuration, although it is common to manually tweak some settings in
the configuration file before deployment, or sometimes in response to new
features or issues encountered after deployment.

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

All Velociraptor clients need a client configuration (file), which is specific
to the deployment. This configuration is a subset of the full YAML-based
configuration.

![Client config is a subset of the full config](client_config_yaml.svg)

Because the server has access to the full configuration it is able to provide
the client configuration to us when needed
[in the form of a YAML file]({{< ref "/docs/deployment/clients/#option-1-obtaining-the-client-config-from-the-gui" >}}).
The server can also use it internally, for example when generating a client
installation package.


## Velociraptor’s internal PKI

Every Velociraptor deployments creates an internal PKI which underpins it. The
configuration wizard creates an internal CA with an X509 certificate and a
private key. This CA is used for:

1. Creating [initial server certificates]({{% ref "/docs/deployment/references/#Frontend.certificate" %}})
   and any additional certificates for key rotation.

2. Verifying the server during client-server communications. [The CA public
   certificate]({{% ref "/docs/deployment/references/#Client.ca_certificate" %}})
   is embedded in the client’s configuration and is used to verify (and therefore trust) the server.

3. Creating API keys for programmatic access. The server is then able to verify
   API clients.

4. Creating client certificates for (optional) mTLS. This allows clients to be
   authenticated using certificates.


The configuration file contains the CA’s X509 certificate in the
`Client.ca_certificate` parameter (and is therefore embedded in the client
configuration). The private key is contained in the `CA.private_key` parameter.

The client’s configuration contains the CA's certificate which is regarded as
trusted, and which is used to verify the server'scertificate during
communications.

{{% notice warning "Protecting the CA private key" %}}

In a secure installation you should remove the `CA.private_key` section from
the server config and keep it offline. You only need it to
[create new API keys]({{< ref "/docs/server_automation/server_api/#creating-an-api-client-configuration" >}})
and when
[rotating server certificates]({{< ref "/knowledge_base/tips/rolling_certificates/" >}})
(typically after 1 year).
The server does not need it during normal operations.

{{% /notice %}}


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
