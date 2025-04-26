---
menutitle: Deployment Example
title: Deployment Example
draft: false
weight: 30
date: 2025-02-27
last reviewed: 2025-04-26
aliases:
  - "/docs/deployment/cloud/"
summary: |
  In this example we will walk through the process of deploying the server using
  Let's Encrypt certificates and Google SSO as the authentication provider.
---

In this example we will walk through the process of deploying the server using
Let's Encrypt certificates and Google SSO as the authentication provider.

This is a typical deployment choice for long-term deployments (both cloud-hosted
and on-premises), although the choice of authentication provider is usually
determined by each organizations existing Identity and Access Management (IAM)
policies and infrastructure.

## Before You Begin

Note the following requirements:
- You must use a DNS name as Let's Encrypt will not issue a certificate for an
  IP address. The DNS name can be managed via Dynamic DNS.
- Ports 80 and 443 must be publicly accessible. Let's Encrypt uses both ports to
  issue certificates.
- You can optionally configure Authentication via one or more SSO providers.

### Provision a Virtual Machine

Next we provision a Linux VM from any cloud provider. The size of your VM
depends on the number of endpoints in your environment. A standard VM with 8 or
16Gb RAM should be sufficient for around 5-10k clients. Additionally you will
need sufficient disk space to hold the data you collect. We recommend starting
with a modest amount of storage and then periodically back up and purge old
data, or else increase the storage volume size as needed.

{{% notice info "Network filtering requirements" %}}

The virtual machine must be able to receive connections over *both* ports 80 and
443. Be sure to check inbound filtering Access Control Lists to ensure that
access is allowed. When using SSL, both the client communication and the Admin
GUI are served over the same port to benefit from SSL transport encryption. The
Let's Encrypt protocol requires Let's Encrypt's servers to connect to the VM on
port 80 for the purpose of certificate issuance and renewal, however
Velociraptor will only provide services on the SSL-secured port 443.

Several Velociraptor features do require outbound access from the server to GitHub,
although [it is possible]({{< ref "/artifact_references/pages/server.utils.uploadtools/" >}})
for the server to operate without any intenet access.

{{% /notice %}}


### Get a domain name

An SSL certificate says that the DNS name is owned by the server that presents
it. You will need a public DNS name ("A" record) pointing to your Velociraptor
server’s external IP. This is because:

- Let's Encrypt will only issues a certificate for a public DNS name
- DNS names are integral to SSO and therefore required.


### Assign an IP

You can assign your Virtual Machine a static IP address or allow the
cloud provider to assign a dynamic IP address.

If you use a dynamic IP address for your server then you must also configure
Dynamic DNS. Velociraptor directly supports updating
[Cloudflare](https://www.cloudflare.com/learning/dns/glossary/dynamic-dns/) or
[No-IP](https://www.noip.com/) Dynamic DNS, so these are the easiest options to
use since they requires the least amount of configuration.
Alternatively, or for other DDNS providers, you can install an external Dynamic
DNS client such as [ddclient](https://ddclient.net/) to update your
DNS->IP mapping.

After the dynamic address is created, you need to note the credentials (as
configured with your DDNS provider) for updating the IP address as you will need
to supply these during the interactive configuration process.


## Generating the configuration file

To generate a new configuration file we use the `config generate` command. The
`-i` flag tells it to run in interactive mode, which means it will launch a
question/answer dialogue-style "wizard" that will gather the most important
details needed to produce your config.

{{< tabs >}}
{{% tab name="Linux" %}}
```shell
./velociraptor config generate -i
```
{{% /tab %}}
{{% tab name="Windows" %}}
```shell
velociraptor.exe config generate -i
```
{{% /tab %}}
{{% tab name="macOS" %}}
```shell
./velociraptor config generate -i
```
{{% /tab %}}
{{< /tabs >}}


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
* **The Frontend port to listen on:** The Frontend receives client
  connections. You should allow inbound access to this port from
  anywhere.
* **The port for the Admin GUI to listen on:** The Admin GUI receives browser
  connections. As discussed above, in self-signed mode the Admin GUI will
  only bind to the local host.
* **Initial GUI users:** The initial set of administrator accounts can be stored
  in the configuration file. When Velociraptor starts, it automatically adds
  these accounts as administrators. When using self-signed SSL mode, the only
  authentication method available is `Basic Authentication`. Velociraptor stores
  the username and hashed passwords in the datastore.
* **Extended certificate validity:** You may choose to override the default
  1-year certificate expiry if you intend to deploy a long-term server instance.



## Configure Velociraptor to use Let's Encrypt (with SSO)

Let’s Encrypt allows Velociraptor to issue its own
certificates. Selecting the Let's Encrypt option ensures:
* The server will fetch certificates automatically from Let's
  Encrypt's servers when first accessed by the browser.
* Both the Frontend and GUI will be served over the standard SSL port
  (443).
* The GUI is externally available, but protected over SSL.
* Clients will connect to the public DNS name over SSL.

Use the guided configuration wizard to select this operation mode:

```text
$ ./velociraptor config generate -i
 Welcome to the Velociraptor configuration generator

 This wizard creates a configuration file for a new deployment.

 Let's begin by configuring the server itself.

┃ Deployment Type
┃ This wizard can create the following distinct deployment types.
┃    Self Signed SSL
┃  ● Automatically provision certificates with Lets Encrypt
┃    Authenticate users with SSO
```

If you intend to use SSO authentication (discussed below) then choose the option
"Authenticate users with SSO" which implicitly includes Let's Encrypt
certificate management.

The configuration wizard asks a number of questions and creates a
server and client configuration.

* **What OS will the server be deployed on?** This choice will affect the
  defaults for various options. Production deployments are typically
  done on a Linux machine (but the configuration can be generated on
  Windows).
* **Path to the datastore directory:** Velociraptor uses flat files for
  all storage. This path is where Velociraptor will write the
  files. You should mount any network filesystems or storage devices
  on this path.
* **The public DNS name of the Frontend:** The clients will connect to the
  server using this DNS name so it should be publically accessible
  (Note this is a DNS name and not a URL).
* **Google OAuth2 Client ID and Secret** are obtained from above.
* **GUI Username or email address to authorize:** The initial set of
  administrator accounts can be stored in the configuration file. When
  Velociraptor starts it will automatically add these accounts as
  administrators. When using SSO, Velociraptor does not use any
  passwords so only the user names will be recorded.

{{% notice info "Let's Encrypt failures can result in request blacklisting!" %}}

You must have both ports 80 and 443 publicly accessible via any inbound
firewall rules! Let's Encrypt uses both ports in the certificate enrollment
process. If you forgot to open port 80, Let's Encrypt will fail to issue the
certificate and repeated failures might result in them
[blocking the domain name](https://letsencrypt.org/docs/rate-limits/#authorization-failures-per-hostname-per-account)
from getting an SSL certificate for several days. If you find that this has
happened and you can't afford to wait, then you will need to change to a new
DynDNS name and start again.

{{% /notice %}}

The first time you connect to the Admin GUI or to the frontend, the server
will obtain its own certificate from Let's Encrypt. You should see no SSL
warnings in your browser.

Now that you have set up Velociraptor's GUI and Frontend to operate over
SSL, the next step is to create user accounts that can access the GUI.

It is possible to assign passwords to these accounts and use Basic
authentication, as we explain in the
[Quickstart Guide]({{< ref "/docs/quickstart/#step-2-create-the-server-configuration-file" >}}).
However in enterprise and cloud environments it is highly recommended to use
stronger authentication mechanisms which provide, for example, 2-factor
authentication, password policies, or any of the usual enterprise requirements
for user account management. Most enterprise systems utilize a SSO provider to
manage user accounts and authentication because manual user account management
simply does not scale.




### OAuth Identity management

In the following sections, we demonstrate how Velociraptor can be configured to
use Google's OAuth mechanism to verify a user's identity. This
requires a user to authenticate to Google via their usual method -
if their account requires 2 factor authentication, then users need to
log in this way.

Once the user authenticates to Google, they are redirected back into
the Velociraptor application with a token that allows the application
to request information about the user (for example, the username or
email address).


{{% notice note "What is OAuth2 used for?" %}}

OAuth is an authentication protocol. This means Velociraptor can be
pretty confident the user is who they claim they are. However, this does not
automatically grant them access to the application.  A Velociraptor
administrator must still manually grant user access before a user can
log in.

{{% /notice %}}

Before using Google to authenticate, you need to register your
Velociraptor deployment as an OAuth App with Google.

### Generating configuration

To generate a self-signed deployment, start by running the `config
generate` command to invoke the configuration wizard

```sh
velociraptor config generate -i
```

![Generating Cloud Deployment](config.png?classes=shadow)

The configuration wizard asks a number of questions and creates a
server and client configuration.


* **What OS will the server be deployed on?** This choice will affect the
  defaults for various options. Production deployments are typically
  done on a Linux machine (but the configuration can be generated on
  Windows).
* **Path to the datastore directory:** Velociraptor uses flat files for
  all storage. This path is where Velociraptor will write the
  files. You should mount any network filesystems or storage devices
  on this path.
* **The public DNS name of the Frontend:** The clients will connect to the
  server using this DNS name so it should be publically accessible
  (Note this is a DNS name and not a URL).
* **Google OAuth2 Client ID and Secret** are obtained from above.
* **GUI Username or email address to authorize:** The initial set of
  administrator accounts can be stored in the configuration file. When
  Velociraptor starts it will automatically add these accounts as
  administrators. When using SSO, Velociraptor does not use any
  passwords so only the user names will be recorded.


## Grant Access to Velociraptor

The OAuth flow ensures the user's identity is correct but does not
give them permission to log into Velociraptor. Note that having an
OAuth enabled application on the web allows anyone with a Google
identity to authenticate to the application but the user is still
required to be authorized explicitly. If a user is rejected, we can
see the following in the Audit logs:

```json
   {
     "level": "error",
     "method": "GET",
     "msg": "User rejected by GUI",
     "remote": "192.168.0.10:40570",
     "time": "2018-12-21T18:17:47+10:00",
     "user": "mike@velocidex.com"
   }
```

In order to authorize the user we must explicitly add them using the
Velociraptor Admin tool:

```text
$ velociraptor --config ~/server.config.yaml user add mike@velocidex.com
Authentication will occur via Google - therefore no password needs to be set.
```
Note that this time, Velociraptor does not ask for a password at all,
since authentication occurs using Google's SSO. If we hit refresh in
the browser we should be able to see the Velociraptor application dashboard.

We can see that the logged in user is authenticated by Google, and we
can also see the user's Google avatar at the top right for some more
eye candy :-).

![Velociraptor Dashboard](dashboard.png)


{{% notice note %}}

Velociraptor will retain its OAuth token for 24 hours. Each day users
will need to re-grant OAuth credentials. Therefore revoking a user
from the Google Admin console may take a full day to take effect. To
remove access sooner you should simply remove all permissions from the
user using `velociraptor user grant '{}'`.

{{% /notice %}}

### Deploying to the server

Once a server configuration file is created, you need to create a server Debian package embedding the config file. The Debian package the Velociraptor executable, the server configuration file and relevant startup scripts.

Run the following command to create the server:

```sh
velociraptor.exe --config server.config.yaml debian server --binary velociraptor-v0.6.0-linux-amd64
```

{{% notice warning %}}
Make sure the debian file is well protected. A compromise of the file will leak private key material enabling a MITM attack against Velociraptor.
{{% /notice %}}

You can check the installation using `service velociraptor_server status`.

```bash
$ sudo dpkg -i velociraptor_0.3.0_server.deb
Selecting previously unselected package velociraptor-server.
(Reading database ... 384556 files and directories currently installed.)
Preparing to unpack velociraptor_0.3.0_server.deb ...
Unpacking velociraptor-server (0.3.0) ...
Setting up velociraptor-server (0.3.0) ...
Created symlink /etc/systemd/system/multi-user.target.wants/velociraptor_server.service → /etc/systemd/system/velociraptor_server.service.

$ sudo service velociraptor_server status
● velociraptor_server.service - Velociraptor linux amd64
   Loaded: loaded (/etc/systemd/system/velociraptor_server.service; enabled; vendor preset: enabled)
   Active: active (running) since Sun 2019-07-07 08:49:24 AEST; 17s ago
 Main PID: 2275 (velociraptor)
    Tasks: 13 (limit: 4915)
   Memory: 30.2M
   CGroup: /system.slice/velociraptor_server.service
           └─2275 /usr/local/bin/velociraptor --config /etc/velociraptor/server.config.yaml frontend

Jul 07 08:49:24 mic-Inspiron systemd[1]: Started Velociraptor linux amd64.
```

{{% notice tip %}}

If you prefer to use Windows for your day to day work, you can build the Debian package
on your windows machine but you must specify the `--binary` flag to
the `debian server` command with a path to the linux binary. You can
obtain a copy of the linux binary from the Github releases page.

{{% /notice %}}


#### Using RPM

Some Linux distributions use RPM as their package management. The process is similar. First create an installation RPM package:

```
$ ./velociraptor-v0.74.2-linux-amd64 --config server.config.yaml rpm server
Creating  package at velociraptor-server-0.74.2.x86_64.rpm
```

Then install the package on the server
```
# rpm -Uvh ./velociraptor-server-0.74.2.x86_64.rpm
Created symlink '/etc/systemd/system/multi-user.target.wants/velociraptor_server.service' → '/etc/systemd/system/velociraptor_server.service'.
```
