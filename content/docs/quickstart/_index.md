---
menutitle: "Quickstart"
title: "Quickstart Guide"
date: 2025-02-27
last_reviewed: 2025-02-27
draft: false
weight: 10
aliases:
  - "/docs/deployment/self-signed/"
---

The goal of this guide is to help you get a Velociraptor server deployed with
one or more clients, as quickly and simply as possible.

The Velociraptor server will be configured to use self-signed SSL certificates
and Basic authentication, which is a relatively simple configuration scheme
suitable for short-term (e.g. testing/evaluation) non-production use, ideally on a
private network.

For production deployments, Single Sign-on (SSO) authentication
is strongly recommended. However it requires a slightly more complicated
certificate scheme and public DNS configuration. To explore these other options
please see the [Deployment]({{< ref "/docs/deployment/" >}}) section.

{{% notice tip "Need to go even quicker?" %}}

If you're really in a hurry you can start a self-contained
[Instant Velociraptor](#instant-velociraptor)
on your local machine which will allow you to experiment and get a feel for how
Velociraptor works, without having to deal with any of the network complexities.
One command is all that's needed to get started!

{{% /notice %}}



{{% notice info "Non-production Disclaimer" %}}

Please note that _in this simple configuration the Velociraptor server should
not be exposed to the public internet_, particularly because Basic
authentication mode is vulnerable to brute-force attacks.
[SSO authentication]({{< ref "/knowledge_base/tips/setup_google_oauth/" >}}) is
recommended for production deployments, but it cannot be used with self-signed
certificates, which we will be using in this case for expediency.

If you have chosen to install the server component on a cloud VM then you should
leave the GUI port bound to the loopback address and use SSH tunneling to
connect to the local loopback address.

Self-signed SSL with Basic authentication is most often used when Velociraptor
is deployed on private networks for temporary situations such as incident
response. For long-term deployments, the other modes of operation that
Velociraptor offers should be preferred.

{{% /notice %}}

## What you'll need

- a computer running Linux (any modern Debian or RPM-based distro should be
  fine) on which you can install the **Velociraptor server** component.

  - Ubuntu is commonly used and we use it for testing, so it is generally
    recommended unless you have a strong preference for something else. If you
    choose to use another Linux distro then please note that it needs to be one
    that uses systemd, although most do these days.

  - The sizing of your server depends on the number of endpoints in your
    environment. A typical server with 8-16GB memory should be sufficient for
    around 5-10k clients, so for a limited deployment that should be more than
    sufficient. You will need enough disk space to hold the data that you
    collect from your endpoints, and that of course depends entirely on what you
    intend to collect, how frequently you collect it, etc.

- One or more computers running Windows on which you can install the
  **Velociraptor client** component.

  - This can be be any supported client operating system, but in this guide we
    describe the process for a Windows client since it is still by far the most
    common target operating system. See
    [Deploying Clients]({{< ref "/docs/deployment/clients/" >}})
    for instructions of deploying clients to other platforms.

  - The Windows version should be at least Windows 10. Older versions may
    require a special build of the Velociraptor binary, as noted
    [here]({{< ref "/downloads/#release-notes" >}}),
    because earlier versions are not supported by the latest version of Go, nor
    by Microsoft.

  - If you're just testing, you can install the client on the same machine as
    the server if you want to. It's not commonly done but the server and client
    will not conflict with each other if run on the same machine.

## Simplifying assumptions:

To keep things simple, in this deployment scenario we are going to assume that:

1. The server and client(s) are on the same local network, with no proxies,
   firewalls or NAT devices between them.

2. No DNS records have been configured for the server. While it is definitely
   preferable for the clients to be able to resolve and connect to the server by
   DNS name, for Self-Signed SSL mode this is not a requirement. Here we will
   use IP addresses in our configuration, but that means you need to be sure
   that your server's IP address is static and will not change for the duration
   of your deployment. Alternatively you should set up an DNS A record for your
   server and use that instead of an IP address in the steps below. In this
   article we will use `<server_ip>` as shorthand for the IP address of the
   server, but you should substitute your server's actual IP in the commands or
   config settings shown, or instead use the server's DNS name if you have added
   it to your DNS.


## Download the Velociraptor binaries

Before we start configuring or running anything you'll need to download the
latest binary from our [Downloads]({{< ref "/downloads/" >}}) page.
You will need to download the binary that matches your server platform and
architecture.

{{% notice note "One binary to rule them all!" %}}

**Velociraptor only has one binary per operating system + architecture combination.**

Velociraptor doesn't have separate client binaries and server binaries. The command line
parameters tell the binary whether to behave as a server or as a client.

While this technically allows you to run the server or the client on any
platform that we have a binary for,
_please note that the server is only fully supported on Linux_
due to performance considerations inherent in other platforms such as Windows.
However for non-production deployments (e.g. development or testing) it
might be convenient for you to run the server or client on whatever platform you
prefer. Just keep in mind that for production deployments we strongly recommend
that the server should run on Linux and that issues with other platforms will
not be supported. For that reason we only describe deploying the server on
Linux in this guide.

{{% /notice %}}


In a terminal on your server you can run the following commands to download the
latest binary and then make it executable:

```sh
wget -O velociraptor https://github.com/Velocidex/velociraptor/releases/download/v0.73/velociraptor-v0.73.4-linux-amd64
chmod +x velociraptor
```

## Create the server config file

```sh
velociraptor config generate -i
```

## What next?

Here are the next steps you may want to consider:

- [Velociraptor Security Configuration]({{< ref "/docs/deployment/security/" >}})
- Two
- Three
