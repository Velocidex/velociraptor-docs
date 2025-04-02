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


{{% notice info "Non-production Disclaimer" %}}

Please note that in this simple configuration the Velociraptor server should
not be exposed to the public internet, particularly because Basic
authentication mode is vulnerable to brute-force attacks.
[SSO authentication]({{< ref "/knowledge_base/tips/setup_google_oauth/" >}}) is
recommended for production deployments, but it cannot be used with self-signed
certificates, which we will be using in this guide for expediency.

If you have chosen to install the server component on a cloud VM then you should
leave the GUI port bound to the loopback address and use SSH tunneling to
connect to the local loopback address.

Self-signed SSL with Basic authentication is most often used when Velociraptor
is deployed on private networks for temporary situations such as incident
response. For long-term deployments, the other modes of operation that
Velociraptor offers should be preferred.

{{% /notice %}}

{{% notice tip "Need to go even quicker?" %}}

If you're really in a hurry you can start a self-contained
[Instant Velociraptor](#instant-velociraptor)
on your local machine which will allow you to experiment and get a feel for how
Velociraptor works, without having to deal with any of the network complexities.
One command is all that's needed to get started!

{{% /notice %}}

## What you'll need

- A computer running Linux (any modern Debian or RPM-based distro should be
  fine) on which you can install the **Velociraptor server** component.

  - Ubuntu is commonly used and we use it for testing, so it is generally
    recommended unless you have a strong preference for something else. If you
    choose to use another Linux distro then please note that it needs to be one
    that uses systemd, although most do these days.

  - The sizing of your server depends on the number of endpoints in your
    environment. A small server with 8GB memory should be sufficient for
    at least 1000 clients, so for a limited deployment that should be more than
    sufficient. You will also need enough disk space to hold the data that you
    collect from your endpoints, and that of course depends entirely on what you
    intend to collect, how frequently you collect it, how many endpoints, etc.

- One or more computers running Windows on which you can install the
  **Velociraptor client** component.

  - This can actually be any supported client operating system, but in this
    guide we describe the process for a Windows client since it is still by far
    the most common target operating system. See
    [Deploying Clients]({{< ref "/docs/deployment/clients/" >}})
    for instructions for deploying clients on other platforms.

  - The Windows version should be at least Windows 10. Older versions may
    require a special build of the Velociraptor binary, as noted
    [here]({{< ref "/downloads/#release-notes" >}}),
    since earlier versions are not supported by the latest version of Go, nor
    by Microsoft.

  - If you're just testing, you can install the client on the same machine as
    the server if you really want to. It's not commonly done but the server and
    client will not conflict with each other if run on the same machine.

## Simplifying assumptions

To keep things simple in this deployment scenario we are going to assume that:

1. The server and client(s) are on the same local network, with no proxies,
   firewalls or NAT devices between them.

2. No DNS records have been configured for the server. While it is usually
   preferable for the clients to be able to resolve and connect to the server by
   DNS name, in Self-Signed SSL mode this is not a requirement. Here we will use
   IP addresses in our configuration, but that means you need to be sure that
   your server's IP address is static and will not change for the duration of
   your deployment. Alternatively you chould set up an DNS A record for your
   server and use that instead of an IP address in the steps below. In this
   article we will use `<server_ip>` as shorthand for the IP address of the
   server, but you should substitute your server's actual IP in the commands or
   config settings shown, or instead use the server's DNS name if you have added
   it to your DNS.

3. The server will be able to connect to websites on the internet, specifically
   GitHub, in order to download additional files. While this is not an absolute
   requirement, it is necessary to complete the steps in this guide.

4. The Velociraptor Clients will be able to connect to the server on the default
   TCP port `8000`.

5. Your workstation will be able to connect using a web browser to the
   Velociraptor Admin GUI running on the server on the default TCP port `8889`.


If you have a more complex environment that cannot satisfy the above
requirements then you should refer to the
[Deployment]({{< ref "/docs/deployment/" >}}) section where more advanced
deployment scenarios and associated options are discussed.

## Roadmap

Before we dive in, here's a brief overview of the procedure presented below.

In the first 3 steps we will _prepare_ to install the Velociraptor server
component:

* [Step 1: Download the Velociraptor binaries](#step-1-download-the-velociraptor-binaries)
* [Step 2: Create the server configuration file](#step-2-create-the-server-configuration-file)


These preparatory steps can actually be performed on any platform since we are
only preparing for the installation and not actually installing anything yet,
but doing so on the server is the quickest way and simultaneously verifies that
internet access from the server is OK.



## Ready? Let's go!

### Step 1: Download the Velociraptor binaries

Before we start configuring or running anything you'll need to download the
latest binary. Binaries for the latest version are listed on our
[Downloads]({{< ref "/downloads/" >}}) page, with the binaries themselves being
hosted on Github.
At this point you only need to download the binary that matches your server
platform and architecture, as we will use the server to download the Windows
binary for the client in a later step.

{{% notice note "One binary to rule them all!" %}}

**Velociraptor only has one binary per operating system + architecture combination.**

Velociraptor does not have separate client binaries and server binaries. We have
a single binary that can function in either role. The command line parameters
supplied to the binary tell it whether to behave as a server or as a client.

This means that it's technically possible to run the server or the client on any
platform that we have a binary for. However
_please note that the server is only fully supported on Linux_
due to performance considerations inherent in other platforms such as Windows.
For non-production deployments (e.g. development or testing) it might be
convenient for you to run the server on another platform and that's fine if you
feel adventurous and confident in your troubleshooting skills.
Just keep in mind that for production deployments we strongly recommend that the
server should run on Linux and that issues encountered when running the server
on other platforms will not be supported. For that reason we only describe
deploying the server on Linux in this guide.

{{% /notice %}}

For these pre-installation steps you may want to create a new working directory:

```sh
mkdir ~/velociraptor_setup && cd ~/velociraptor_setup
```

Copy the download link for the latest version, appropriate to the
platform and architecture of your server, and then use it in the `wget` command
shown below. This will download the binary and save it with the name
`velociraptor`:

```sh
wget -O velociraptor https://github.com/Velocidex/velociraptor/releases/download/v0.74/velociraptor-v0.74.1-linux-amd64
```

Then make the downloaded file executable so that you can run it in the next
step:

```sh
chmod +x velociraptor
```

### Step 2: Create the server configuration file

Central to every Velociraptor deployment is a YAML configuration file. This file
contains all the configuration parameters that define how your server and
clients operate, and also cryptographic material that is used to secure your
deployment.

To generate a new configuration file

```sh
velociraptor config generate -i
```

Because this file is a key component to your deployment and contains
security-sensitive material you should always keep a backup of it in a secure
location. The server installation package that we will create in the next step
also contains a copy of the server config, so you should handle it with the
same security considerations as the config file itself.

### Step 3: Create a server installation package



### Step 4: Install the server component

Check the service status

### Step 5: Log in to the Admin GUI

### Step 6: Create an installation package for Windows clients

### Step 7: Install the client on endpoints

## What next?

Here are the next steps you may want to consider:

- [Velociraptor Security Configuration]({{< ref "/docs/deployment/security/" >}})
- Managing clients
- Orgs
