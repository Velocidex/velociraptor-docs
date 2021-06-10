---
title: "Self Signed SSL"
date: 2021-06-09T04:00:52Z
draft: false
weight: 5
---

The Velociraptor deployment is secured using a self signed CA
certificate, generated during the initial configuraion generation
step. The client's configuraion contains the CA certificate which is
used to verify all certificates needed during communications.

In `self signed SSL` mode, Velociraptor will issue its own server
certificate using its internal CA. Therefore, the GUI and Frontend
will use a self signed server certificate.

This type of deployment is most appropriate for on-premises scenarios
where internet access is not available or egress is blocked.

{{% notice info %}}

When using self signed mode, the client is configured to only accept a
server certificate signed by the Velociraptor CA. This effectively
pins the server certificate, and prevents a Man In The Middle (MITM)
attack. It is currently **not** supported to present a **different**
self signed server certificate.

Such a situation often arises when using an SSL intercepting
proxy. Velociraptor will refuse to connect through an SSL MITM
proxy. You will need to add whitelist rules to allow Velociraptor to
connect directly.

{{% /notice %}}

Self signed SSL certificates trigger SSL warnings in all web
browsers. Therefore when accessing the admin GUI you will receive a
certificate warning about the possibility of a MITM attack.

As a precaution, Velociraptor will by default only export the GUI port
on the loopback interface. You may change the `GUI.bind_address`
setting to "0.0.0.0" to bind to receive external connections on this
port but this is not recommended. Instead it is better to use SSH
tunneling to connect to the local loopback interface.


### Generating configuration

To generate a self signed deployment start by running the `config
generate` command to invoke the configuration wizard

```sh
velociraptor config generate -i
```

![Generating Self Signed Deployment](self-signed-generation.png?classes=shadow)

The configuration wizard asks a number of questions and creates a
server and client configuration.

* What OS will the server be deployed on? This choice will affect the
  defaults for various options. Production deployments are typically
  done on a Linux machine (but the configuration can be generated on
  Windows).
* Path to the datastore directory: Velociraptor uses flat files for
  all storage. This path is where Velociraptor will write the
  files. You should mount any network filesystems or storage devices
  on this path.
* The public DNS name of the Frontend: The clients will connect to the
  server using this DNS name so it should be publically accessible. If
  you are using self signed SSL you may specify an IP address here,
  but this not recommended because it is less flexible. If the
  server's IP address changes it will be impossible to contact the
  clients.
* The frontend port to listen on: The frontend receives client
  connections. You should allow inbound access to this port from
  anywhere.
* The port for the GUI to listen on: The GUI receives browser
  connections. As discussed above, in self signed mode the GUI will
  only bind to the localhost.
* GUI Username or email address to authorize: The initial set of
  administrator accounts can be stored in the configuration file. When
  Velociraptor starts it will automatically add these accounts as
  administrators. When using self signed SSL mode, the only
  authentication method available is `Basic Authentication`. Therefore
  Velociraptor will store the username and hashed passwords in the
  datastore.

### Deploying to the server

Once a server configuration file is created it is most convenient to
create a server Debian package embedding the config file.

```sh
velociraptor.exe --config server.config.yaml debian server --binary velociraptor-v0.6.0-linux-amd64
```

The above command instructs Velociraptor to build a debian package for
the server using the linux binary specified. The result is a deb
package containing the velociraptor executable, the server
configuration file and relevant startup scripts.

{{% notice warning %}}
The Deb package contains the server configuration file, which contains all required key materials. Make sure the debian file is well protected since a compromise of the file will leak private key material enabling a MITM attack against Velociraptor.
{{% /notice %}}
