---
title: "Deployment Overview"
date: 2021-06-09T03:52:24Z
draft: false
weight: 2
---

Velociraptor can be deployed in a number of scenarios depending on
need. The diagram below illustrates what a typical Velociraptor deployment looks like.

![Deployment Overview](overview.png?width=80pc&classes=shadow)

The Velociraptor server is typically deployed on a cloud VM and runs a number of components as separate threads. The GUI serves the Admin UI - a Web application that can be used to control Velociraptor and orchestrate hunts and collections from the endpoints.

The endpoints themselves run the **Velociraptor Client** as a
service. The client is simply the Velociraptor instance running on the
endpoint.

Clients have a persistent connection with the server. The server is
therefore able to issue a task to the clients immediately as soon as
the User scheduled it (Many other solutions rely on periodic polling
between endpoint and the server leading to latency between issuing a
new task and receiving the results - not so with Velociraptor).

Velociraptor is distributed as a **Single Binary** for ease of
deployment. The same binary can act as a server, client or a number of
utility programs depending on command line flags.

Velociraptor does not use an external datastore - all data is stored
within the server's filesystem in regular files and directories making
backups and data lifecycle management a breeze. Therefore you do not
need any additional infrastructure such as databases or cloud
services. Velociraptor is compatible with distributed filesystems such
as Amazon EFS, Google Filestore or generic NFS.

### Typical Deployment

By deployment we mean to stand up a new Velociraptor server instance. Typically this consists of a number of broad steps:

1. Generate a configuration file for the server and clients
2. Create a server package for deployment which includes the generated configuration file.
3. Spin up a cloud VM for the server (If deploying in the cloud) or create a new physical server.
4. Install the server package on the VM - this will bring the GUI and frontends up.
5. Create client packages for target operating systems (e.g. MSI for windows).

Each deployment relies on unique configuration files, which include
information such as connection URLs, DNS names and unique
cryptographic keys. The configuration files ensure that one
Velociraptor deployment can not connect with another deployment since
key material is unique to each deployment.

{{% notice info %}}
We typically use Ubuntu or Debian based VMs to deploy the server in
production. We do not support Windows based servers at scale, although
it is fine to install the server on windows for a demo or for a few
endpoints.
{{% /notice %}}


### Resource considerations

The secret behind Velociraptor's scalability lies in the use of VQL to
query the endpoint. The server does not usually have to do much work:
All the server does is send a VQL query to the endpoints. The VQL
query executes on the endpoint and any results from the query (Queries
always returns rows encoded in JSON) are sent back to the server. The
server simply needs to write the queries into its filesystem --
Typically the server does not need to parse or process the responses
from the endpoint.

Because the server performs minimal processing on the collected data,
it is able to handle a very high volume of requests simultaneously.

See [Performance Considerations](resources) for a discussion of
resource sizing and scale related tuning parameters available.

### Instant Velociraptor

If you just want to play with Velociraptor, you do not need to deploy
a complete server. Simply download the Velociraptor executable for
your platform from the [GitHub project's releases page](https://github.com/Velocidex/velociraptor/releases)
and start it with the `gui` command.

```sh
Velociraptor.exe gui
```

The `gui` command automatically creates a new server and client
configuration files with the server:

* Server only listening on the local loopback interface.
* Client will connect to the server over the loopback.
* Datastore directory is set to the user's temp folder.
* A single administrator user is created with username `admin` and password `password`.
* A browser is launched with those credentials to connect to the welcome screen.

{{% notice tip %}} By default the `gui` command uses the temp folder
as it's data store. Most OS's clean the temp folder periodically so if
you frequently use the same folder you might find missing files. You
can specify a different data store directory using the `--datastore`
flag to work with a persistently stored data store.  {{% /notice %}}

### Common deployment scenarios

{{% children %}}


#### Self Signed SSL mode

Frontend served using TLS on port 8000 (connected to clients)
GUI uses basic authentication with usernames/passwords.
GUI Served over loopback port 8889 (127.0.0.1)
By default not exposed to the network
You can use SSH tunneling to forward the GUI

#### Installing a new server

Use the password provided in the Workshop setup to log into the server.
Fetch the latest Velociraptor Windows and Linux release binaries
Create a new configuration

```sh
velociraptor config generate -i
```

Create a new server debian package

```sh
velociraptor.exe --config server.config.yaml debian server  --binary velociraptor-v0.5.5-windows.exe
```


#### Installing a new server

Push the debian package to the server using scp

```sh
scp velociraptor_server*.deb mike@123.45.67.89:/tmp/
```

Install package
```sh
sudo dpkg -i velociraptor_server*.deb
```

### Automating config generation

Some people want to automate the config generation step.
Velociraptor supports a JSON merge for non interactive configuration generation

```sh
velociraptor config generate --merge
    '{"autocert_domain": "domain.com", "autocert_cert_cache": "/foo/bar"}'
```

The service adds a new velociraptor user to run under.
You can now access the Velociraptor server using your browser.

The first time you navigate to the SSL URL the server will obtain a
certificate from Let's Encrypt. There will be a small pause as this
happens.

You will be redirected to Google for authentication - Velociraptor
does not handle any credentials in this configuration. Google will
determine if the user authenticated properly (2 FA etc) and convey
simple info like the user’s email address and avatar.
