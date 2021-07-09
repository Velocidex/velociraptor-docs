---
title: "Self-Signed SSL"
date: 2021-06-09T04:00:52Z
draft: false
weight: 5
---

Velociraptor deployments are secured using a self-signed Certificate Authority (CA) that is generated during the initial configuration generation step. The client’s configuration contains the signed CA, which is used to verify all certificates needed during communications.

In `self-signed SSL` mode, Velociraptor issues its own server
certificate using its internal CA. This means the Admin GUI and front end
also use a self-signed server certificate.

**When to use this method**
This type of deployment is most appropriate for on-premises scenarios
where internet access is not available or egress is blocked.

## Self-Signed Certificates 
Self-signed SSL certificates trigger SSL warnings in all web
browsers. When accessing the Admin GUI you will receive a
certificate warning about the possibility of a MITM attack.

As a precaution, Velociraptor only exports the GUI port
on the loopback interface. You may change the `GUI.bind_address`
setting to "0.0.0.0" to receive external connections on this
port, but this is not recommended. Instead, you should use SSH
tunneling to connect to the local loopback interface.

Velociraptor doesn't support other self-signed SSL certificates, and we don't recommend attempting to create and upload your own internal self-signed certificate to Velociraptor. 

{{% notice info %}}

By default, Velociraptor will not connect through an SSL intercepting proxy. While not recommended, it is possible to add allowlist rules that enable Velociraptor to connect through an SSL intercepting proxy. If you do so, you will see a certificate warning about the possibility of a MITM attack when accessing the Admin GUI.

{{% /notice %}}


## Generate the configuration file

Run the `config
generate` command to invoke the configuration wizard.

```sh
velociraptor config generate -i
```
The configuration wizard appears. 

![Generating Self Signed Deployment](self-signed-generation.png?classes=shadow)

The configuration wizard includes a set of questions to guide you through the first step of the deployment process.

* **What OS will the server be deployed on?** This choice will affect the
  defaults for various options. Velociraptor is typically
  deployed on a Linux machine (but the configuration can be generated on
  Windows).
* **Path to the datastore directory:** Velociraptor uses flat files for
  all storage. This path is where Velociraptor will write the
  files. You should mount any network filesystems or storage devices
  on this path.
* **The public DNS name of the Frontend:** The clients will connect to the
  server using this DNS name so it should be publically accessible. If
  you are using self-signed SSL you may specify an IP address here,
  but this not recommended because it is less flexible. If the
  server's IP address changes it will be impossible to contact the
  clients.
* **The frontend port to listen on:** The front end receives client
  connections. You should allow inbound access to this port from
  anywhere.
* **The port for the Admin GUI to listen on:** The Admin GUI receives browser
  connections. As discussed above, in self-signed mode the Admin GUI will
  only bind to the local host.
* **GUI Username or email address to authorize:** The initial set of
  administrator accounts can be stored in the configuration file. When
  Velociraptor starts, it automatically adds these accounts as
  administrators. When using self-signed SSL mode, the only
  authentication method available is `Basic Authentication`.
  Velociraptor stores the username and hashed passwords in the
  datastore.

## Create the server package

You'll need to run a command that instructs Velociraptor to create a server Debian package using the linux binary specified. The
package will contain the Velociraptor executable, the server
configuration file and relevant startup scripts.

Use the following command:
```sh
velociraptor.exe --config server.config.yaml debian server --binary velociraptor-v0.6.0-linux-amd64
```

{{% notice warning %}}
The Debian package contains the server configuration file, which contains all required key materials. Make sure the debian file is well protected since a compromise of the file will leak private key material enabling a MITM attack against Velociraptor.
{{% /notice %}}

## Install a new server
Push the debian package to the server using Secure Copy Protocol (SCP): 
```scp velociraptor_server*.deb mike@123.45.67.89:/tmp/```

## Install the package
Run the following command to install the server package: 
```sudo dpkg -i velociraptor_server*.deb```

