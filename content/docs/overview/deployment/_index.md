---
title: "Deployment"
date: 2021-06-09T03:52:24Z
draft: false
weight: 2
---

You can deploy full-scale Velociraptor using either the [SSL-Self Signed](self-signed) or [Cloud Deployment](cloud) method, or set up a Velolicraptor environment on your local machine for testing environment. For more information, see [Instant Velociraptor](#instant-velociraptor).  

## Deployment Milestones

At a high level, your Velociraptor deployment will consist of 3 tasks: setting up a server, deploying clients, and granting user access to the console.


| Milestone               | Description                                                                                                                                                                                                                                                                                                                                      |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Task 1: Deploy a Server | Choose the deployment method that works best for you: <br>* Self-Signed SSL - recommended for on-premises environments  <br>* Cloud Deployment - recommended for easy deployments  <br>* Instant Velociraptor - recommended if you want to install Velociraptor as a self-contained client and server on your local machine for testing purposes |
| Task 2: Deploy Clients  | Deploy clients on your endpoints using one of the recommended methods:<br>* Run clients interactively <br>* Install using Custom MSI <br>* Install the Client as a Service<br>* Agentless Deployment                                                                                                                                             |
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
5. Create client packages for target operating systems (e.g. MSI for windows).

{{% notice info %}}
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

{{% notice tip %}} By default the `gui` command uses the temp folder
as it's data store. Most OS's clean the temp folder periodically so if
you frequently use the same folder you might find missing files. You
can specify a different data store directory using the `--datastore`
flag to work with a persistently stored data store.  {{% /notice %}}
