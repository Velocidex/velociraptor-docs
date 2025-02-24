---
menutitle: "Deployment"
title: "Deployment Overview"
date: 2021-06-09T03:52:24Z
last_reviewed: 2025-02-24
draft: false
weight: 10
---

Velociraptor offers many deployment options that allow us to operate in all
kinds of environments.

There is no single "right" way to use Velociraptor so in
this section we'll describe the commonly used (and recommended) deployment modes.


[SSL-Self
Signed]({{< relref "quickstart" >}}) or
[Cloud Deployment]({{< ref "/docs/deployment/server" >}}) method,
or set up a Velociraptor environment on your
local machine for testing environment. For more information, see
[Instant Velociraptor](#instant-velociraptor).

{{% notice note "Using Velociraptor integrated with Rapid7 InsightIDR?"%}}

These deployment steps apply to open source Velociraptor only. Read the
[InsightIDR documentation](https://docs.rapid7.com/insightidr/velociraptor-integration)
to learn more about how Velociraptor is deployed with the Rapid7 Insight Platform.

{{% /notice %}}


Below is a typical Velociraptor deployment

![A typical Velociraptor deployment](overview.png)

Major components include:

1. The `client` is the instance of the Velociraptor agent running on the endpoint.
2. The `frontend` is the server component communicating with the client.
3. The `gui` is the web application server that presents the administrative interface.
4. The `API` server is used to accept API requests.

## Deployment Milestones

At a high level, your Velociraptor deployment will consist of 3 tasks: setting up a server, deploying clients, and granting user access to the console.


| Milestone               | Description                                                                                                                                                                                                                                                                                                                                      |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Task 1: Deploy a Server | Choose the deployment method that works best for you: <ul><li>Self-Signed SSL - recommended for on-premises environments</li><li>Cloud Deployment - recommended for easy deployments</li><li>Instant Velociraptor - recommended if you want to install Velociraptor as a self-contained client and server on your local machine for testing purposes</li></ul> |
| Task 2: Deploy Clients  | Deploy clients on your endpoints using one of the recommended methods:<ul><li>Run clients interactively</li><li>Install using Custom MSI</li><li> Install the Client as a Service</li><li>Agentless Deployment</li></ul>                                                                                                                                             |
| Task 3: Authorize Users | Grant user access to the Velociraptor console.

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
on Linux and that issues with other platforms will not be supported.

{{% /notice %}}

## Typical Deployment

Each deployment relies on unique configuration files, which include information such as connection URLs, DNS names, and unique cryptographic keys. Since key material is unique to each deployment, one Velociraptor deployment cannot connect with another deployment.

The **Velociraptor Server** is typically deployed on a cloud VM and runs a number of components as separate threads. The GUI serves the Admin UI - a Web application that can be used to control Velociraptor and orchestrate hunts and collections from the endpoints.
The endpoints themselves run the Velociraptor Client as a service. The client is simply the Velociraptor instance running on the endpoint.
Velociraptor Clients maintain a persistent connection with the server. This allows the server to issue a task to the clients as soon as it is scheduled by the user.  (Many other solutions rely on periodic polling between endpoint and the server leading to latency between issuing a new task and receiving the results - not so with Velociraptor).

Velociraptor is distributed as a **Single Binary**, which can act as a server, client or a number of utility programs depending on command line flags.
Velociraptor does not use an external datastore - all data is stored within the server’s filesystem in regular files and directories, making backups and data lifecycle management a breeze. You do not need any additional infrastructure such as databases or cloud services. Velociraptor is compatible with distributed file systems such as Amazon EFS, Google Filestore or generic NFS.

**A typical deployment includes the following steps:**
1. Generate a configuration file for the server and clients.
2. Create a server package that includes the generated configuration file.
3. Set up a cloud VM for the server (If deploying in the cloud) or create a new physical server.
4. Install the server package on the VM. Once installed you will be able to access the  Admin GUI and front end.
5. Create client packages for target operating systems (for example, MSI for windows).

{{% notice info "Deployment platform" %}}
We typically use Ubuntu or Debian based VMs to deploy the server in
production. We do not support Windows based servers at scale, although
you can install the server on windows for a demo or for a few
endpoints.
{{% /notice %}}

## Instant Velociraptor

If you want to quickly set up a Velociraptor sandbox for evaluation, testing, or another reason, you can install Instant Velociraptor.  It’s a fully functional Velociraptor system that is deployed only to your local machine. Just download the Velociraptor executable for
your platform from the [GitHub project's releases page](https://github.com/Velocidex/velociraptor/releases)
and run the `gui` command.

```sh
Velociraptor.exe gui
```
The `gui` command automatically creates new server and client
configuration files.

* The Server only listens on the local loopback interface.
* The Client connects to the server over the loopback.
A data store directory is set to the user’s temp folder.
A single administrator user is created with username `admin` and `password`.
A browser is launched with those credentials to connect to the welcome screen.

{{% notice tip %}}

By default the `gui` command uses the temp folder as it's data
store. Most OS's clean the temp folder periodically so if you
frequently use the same folder you might find missing files. You can
specify a different data store directory using the `--datastore` flag
to work with a persistently stored data store.

{{% /notice %}}


