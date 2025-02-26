---
menutitle: "Quick Start"
title: "Quick Start Guide"
date: 2021-06-09
last_reviewed: 2025-02-24
draft: false
weight: 5
aliases:
  - "/docs/deployment/self-signed/"
---

## What you'll get / goals:

- Velociraptor server deployed and configured to use self-signed SSL
  certificates and Basic authentication.


## What you'll need:

- a computer running Linux (deb or rpm) on which you can install the
  Velociraptor server component.

## Provision a Virtual Machine

Next we provision an Ubuntu VM from any cloud provider.  The size of
your VM depends on the number of endpoints in your environment.  An 8
or 16Gb VM should be sufficient for around 5-10k clients.
Additionally you will need sufficient disk space to hold the data you
collect. We recommend starting with a modest amount of storage and
then back up data or increase the storage volume as needed.

- one or more computers on which you can install the Velociraptor client
  component. This can be any supported operating system, but in this guide we
  describe the process for a Windows client since it is still the most common
  target operating system.

## Simplifying assumptions:

- Server and client on the same local network.

## Download the Velociraptor binaries

{{% notice note "Velociraptor binaries" %}}

**Velociraptor only has one binary per operating system and architecture.**

We don't have separate client binaries and server binaries. The command line
options tell the binary whether to behave as a server or as a client. Therefore
you can run the server or the client on any platform that we have a binary for.

_Please note however that the server is only fully supported on Linux_ due to
performance considerations inherent in other platforms such as Windows. But if
you are learning or just playing around then it might be convenient for you to
run the server or client on whatever platform you prefer. Just keep in mind
that for production deployments we strongly recommend that the server should run
on Linux and that issues with other platforms will not be supported. For that
reason we only describe deploying the server on Linux in this guide.

{{% /notice %}}

{{% notice warning "Do not expose the GUI port to the internet with Basic auth enabled!" %}}

By default Velociraptor only binds the Admin GUI port to the loopback address
(`127.0.0.1`). If you configure SSO authentication then you may change this to
receive external connections on this port, and take additional measures to
secure the GUI from attacks. However it is not possible to use SSO
authentication in self-signed mode -
_only Basic authentication is supported in this mode_ -
and you should not expose the Admin GUI to the internet with Basic auth enabled!

If you have chosen to install the server component on a cloud VM then you should
leave the GUI port bound to the loopback address and use SSH tunneling to
connect to the local loopback address.

{{% /notice %}}

## What next?

Here are other steps you may want to consider:

- One
- Two
- Three