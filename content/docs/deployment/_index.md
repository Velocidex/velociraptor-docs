---
title: "Deployment"
date: 2021-06-09T03:52:24Z
draft: false
weight: 10
---

You can deploy full-scale Velociraptor using either the [SSL-Self
Signed]({{< relref "self-signed" >}}) or [Cloud Deployment]({{< relref
"cloud" >}}) method, or set up a Velociraptor environment on your
local machine for testing environment. For more information, see
[Instant Velociraptor](#instant-velociraptor).

{{% notice note "Using Velociraptor integrated with Rapid7 InsightIDR?"%}}

These deployment steps apply to open source Velociraptor only. Read the  [InsightIDR documentation](https://docs.rapid7.com/insightidr/velociraptor-integration) to learn more about how Velociraptor is deployed with the Insight Platform.

{{% /notice %}}

## Deployment Overview

Below is a typical Velociraptor deployment

![A typical Velociraptor deployment](overview.png)

Major parts include:

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

### Verifying your download

The Velociraptor releases are signed using gpg with key ID `0572F28B4EF19A043F4CBBE0B22A7FB19CB6CFA1`.
You can verify the signature using `gpg`:

```
$ gpg --verify velociraptor-v0.6.2-linux-amd64.sig
gpg: assuming signed data in 'velociraptor-v0.6.2-linux-amd64'
gpg: Signature made Wed Nov  3 02:44:15 2021 AEST
gpg:                using RSA key 0572F28B4EF19A043F4CBBE0B22A7FB19CB6CFA1
gpg: Good signature from "Velociraptor Team (Velociraptor - Dig deeper!  https://docs.velociraptor.app/) <support@velocidex.com>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 0572 F28B 4EF1 9A04 3F4C  BBE0 B22A 7FB1 9CB6 CFA1
```

You can import the key from your favorite key server:
```
$ gpg --search-keys 0572F28B4EF19A043F4CBBE0B22A7FB19CB6CFA1
gpg: data source: https://keys.openpgp.org:443
(1)     Velociraptor Team (Velociraptor - Dig deeper!  https
          3072 bit RSA key B22A7FB19CB6CFA1, created: 2021-10-29
Keys 1-1 of 1 for "0572F28B4EF19A043F4CBBE0B22A7FB19CB6CFA1".  Enter number(s), N)ext, or Q)uit >
```
