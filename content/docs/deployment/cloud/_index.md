---
menutitle: Cloud Deployment
title: Cloud Server Deployment
draft: false
weight: 10
---

For cloud deployments you can create a proper SSL certificate using the free
[Let's Encrypt CA](https://letsencrypt.org/).
This eliminates the "bad certificate" browser warning seen in the
[Self-signed Deployment]({{< ref "/docs/deployment/quickstart/" >}}) mode.
Velociraptor uses the Let's Encrypt protocol to obtain and manage its own
certificates, and to automatically rotate them when they expire.

## When to use this deployment mode

This type of deployment is most appropriate for scenarios where a cloud-based
server is required. Clients will connect to the server (Frontend port) via the
internet.

## Before You Begin

Note the following requirements:
* You _must_ use a DNS name. Let's Encrypt will not issue a certificate for an
  IP address. The DNS name can be a Dynamic DNS name managed by Google Domains.
* Ports 80 and 443 _must_ be publicly accessible. Let's Encrypt uses both ports
  to issue certificates.
* You can optionally configure Authentication via SSO providers.

## Provision a Virtual Machine

Next we provision an Ubuntu VM from any cloud provider.  The size of
your VM depends on the number of endpoints in your environment.  An 8
or 16Gb VM should be sufficient for around 5-10k clients.
Additionally you will need sufficient disk space to hold the data you
collect. We recommend starting with a modest amount of storage and
then back up data or increase the storage volume as needed.

{{% notice warning "Network filtering requirements" %}}

Our virtual machine must be able to receive connections over both
ports 80 and 443. Be sure to check inbound filtering Access Control
Lists to ensure that access is allowed. When using SSL, both the
client communication and the Admin GUI are served over the same ports
to benefit from SSL transport encryption. The Let's Encrypt protocol
requires Let's Encrypt's servers to connect to the VM on port 80 -
however the Admin GUI will only be served over SSL.

{{% /notice %}}

### Get a domain name

An SSL certificate says that the DNS name is owned by the server that
presents it. Since you cannot currently get a Let's Encrypt
certificate for an IP address. you'll need buy a DNS domain from any
provider. You'll then need to set up a DNS A Record to point at your
Velociraptor server’s external IP.

### Assign an IP

You can assign your Virtual Machine a static IP address or allow the
cloud provider to assign a dynamic IP address.

If you use a dynamic IP address you must also configure Dynamic DNS.
Velociraptor directly supports updating Cloudflare or No-IP Dynamic DNS so these
are the easiest options since they requires the least amount of configuration.

Alternatively you can install an external dynamic DNS client such as ddclient to
update your DNS->IP mapping dynamically.

After the dynamic address is created, you need to note the credentials for
updating the IP address (as configured with your DDNS provider) as you will use
these during the interactive configuration process below.


## Configure Velociraptor to use Let's Encrypt

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

{{% notice info %}}

You _must_ have both ports 80 and 443 publicly accessible by allowing these in
any inbound firewall rules! Let's Encrypt uses both ports when issuing
certificates. If you forgot to open port 80, Let's Encrypt will fail to
issue the certificate. Repeated failures might result in them blocking the DNS
name from requesting a certificate for several days. If you find that
this has happened then you will need to change the DNS name and start again.

{{% /notice %}}

The first time you connect to the Admin GUI or to the frontend, the server
will obtain its own certificate from Let's Encrypt. You should see no SSL
warnings in your browser.


## Configuring Google OAuth SSO

In the previous sections you set up Velociraptor's GUI over
SSL. Next, you need to create users and assign them
passwords manually. The trouble with user account management is that
we cannot enforce 2-factor authentication, password policies,
or any of the usual enterprise requirements for user account
management. Users who have to remember too many passwords may be inclined to use an easily guessable password.

Most enterprise systems require an SSO mechanism to manage user
accounts and passwords. Manual user account management simply does not
scale.

Velociraptor supports a number of choices of authentication providers:

1. **Basic Authentication**: this stores usernames and passwords in
   Velociraptor's own datastore.
2. **OAuth2**: these providers authenticate users via OAuth2 (e.g. Google, Azure or GitHub)
3. **OIDC**: uses the Open ID Connect protocol to support many IAM providers (e.g. Okta)

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

### Registering Velociraptor as an OAuth application

Register Velociraptor as an OAuth app
by accessing the Google cloud console at
https://console.cloud.google.com. You must set up a cloud
account and create a cloud project even if you do not host
your server on Google's Cloud Platform.

Your ultimate goal is to obtain OAuth credentials to give our
Velociraptor app, there are a few things set up
first. Navigate to `APIs and Services` in the GCP console and select
`Credentials` and the `OAuth Consent Screen` tab.

![Creating application credentials](sso11.png)

Further down you need to provide an authorized domain

![Authorizing domains](sso12.png)

In order to add an Authorized domain you need to *verify it*. Google's
help pages explain it further:

{{% notice tip %}}

**Authorized domains**: To protect you and your users, Google
   restricts your OAuth 2.0 application to using Authorized
   Domains. If you have verified the domain with Google, you can use
   any Top Private Domain as an Authorized Domain.

{{% /notice %}}

In this example we assume that you purchased your domain with Google
domains which makes this step easier since it is already verified.

We can go back to the cloud console and `Create Credentials/OAuth
client ID`:

![Creating OAuth2 client ID](sso15.png)

Now select `Web App` and set the `Authorized redirect URIs` to
`https://<Your Domain Name>/auth/google/callback` -
This is the URL that successful OAuth authentication will redirect
to. Velociraptor accepts this redirect and uses it to log the user on.

![Specifying the redirect URL](sso16.png)

If all goes well the Google cloud console will give us a client ID and
a client secret.

### Generating configuration

To generate a self signed deployment, start by running the `config
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


### Grant Access to Velociraptor

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

## Deploying the server

Once a server configuration file is created, you need to create a server
installation package which contains the Velociraptor executable, the server
configuration file and relevant startup scripts.

You then install the server installation package on your server using standard
package management tools.

### Creating the server installation package

{{% notice info %}}

While the server installation package can be _created_ on any platform, as shown
below, we strongly recommend _running_ the server on Linux.
Running the server on Windows or macOS is technically possible but unsupported
and we therefore don't provide any server packaging options for those platforms.

{{% /notice %}}

The following command will create the server deb package:

{{< tabs >}} {{% tab name="Linux" %}}
```shell
./velociraptor-linux debian server --config server.config.yaml --binary velociraptor-linux-<arch>
```
{{% /tab %}}
{{% tab name="Windows" %}}
```shell
velociraptor-windows.exe debian server --config server.config.yaml --binary velociraptor-linux-<arch>
```
{{% /tab %}}
{{% tab name="macOS" %}}
```shell
./velociraptor-darwin debian server --config server.config.yaml --binary velociraptor-linux-<arch>
```
{{% /tab %}}
{{< /tabs >}}

This will create a deb package named `velociraptor_server_<version>_<arch>.deb`
containing the server configuration plus the installation scripts necessary to
install the server as a service on debian-based systems. To create a server
installation package for rpm-based systems the command `velociraptor rpm server`
can be substituted in the above step.

The basename of the output file name can be specified adding the `--output` flag
to the command if you want anything other than the default name.

If the `--binary` flag is not used then the package will be created using the
Velociraptor binary which invoked the command. That is, the `--binary` flag is
not needed if you are creating the server installation package on the same
system or architecture that you intend to deploy the server on.

Additional command options can be viewed by running `velociraptor debian server -h`
or `velociraptor rpm server -h`.

{{% notice warning %}}

Make sure the installation package file is well protected. A compromise of the
file will leak private key material enabling a MITM attack against Velociraptor.

{{% /notice %}}

### Installing the server installation package

The server installation package is installed using the regular package
management tools.

**Debian-based systems:**

```shell
sudo dpkg -i velociraptor_server_<version>_<arch>.deb
```

**RPM-based systems:**

```shell
sudo rpm -i velociraptor_server_<version>_<arch>.rpm
```

On Debian-based systems the installation output should look something like this.

```sh
$ sudo dpkg -i velociraptor_server_0.74.0.rc1_amd64.deb
Selecting previously unselected package velociraptor-server.
(Reading database ... 527397 files and directories currently installed.)
Preparing to unpack velociraptor_server_0.74.0.rc1_amd64.deb ...
Unpacking velociraptor-server (0.74.0.rc1) ...
Setting up velociraptor-server (0.74.0.rc1) ...
Adding group `velociraptor' (GID 138) ...
Done.
Adding system user `velociraptor' (UID 128) ...
Adding new user `velociraptor' (UID 128) with group `velociraptor' ...
Not creating home directory `/etc/velociraptor/'.
Created symlink /etc/systemd/system/multi-user.target.wants/velociraptor_server.service → /etc/systemd/system/velociraptor_server.service.
```

On systems that use systemd you can check the service status after installation
using the command `systemctl status velociraptor_server.service`.

```
$ sudo systemctl status velociraptor_server.service
● velociraptor_server.service - Velociraptor server
     Loaded: loaded (/etc/systemd/system/velociraptor_server.service; enabled; vendor preset: enabled)
     Active: active (running) since Sat 2025-02-22 12:33:23 SAST; 1min 1s ago
   Main PID: 4941 (velociraptor.bi)
      Tasks: 10 (limit: 4537)
     Memory: 54.1M
        CPU: 2.163s
     CGroup: /system.slice/velociraptor_server.service
             └─4941 /usr/local/bin/velociraptor.bin --config /etc/velociraptor/server.config.yaml frontend

Feb 22 12:33:23 linux64-client systemd[1]: Started Velociraptor server.

```

## Server upgrades

To upgrade the Velociraptor server to a new version, simply download
the latest release binary from the [GitHub Release
Page](https://github.com/Velocidex/velociraptor/releases) and
regenerate a new debian package as described above, but using the
existing configuration file.

{{% notice note "Backing up your configuration file" %}}

The configuration file contains cryptographic keys that allow clients
and server to communicate. Each time the configuration is regenerated
(e.g. using `velociraptor config generate`), new keys are created.

It is imperative to backup the configuration file somewhere safe
(perhaps offline) and re-use the same file when upgrading to a new
version of Velociraptor in order to preserve the key material and
maintain client communication.

{{% /notice %}}

From time to time, the schema of the configuration file may evolve
with newer versions. When a newer versions of Velociraptor encounters
an older configuration file, it attempts to upgrade the configuration
file to the latest version. This happens automatically and it is
usually a seamless process.

During the debian package preparation the upgraded file is embedded
into the server package so you will receive an upgraded configuration
file installed to the `/etc/` directory. You can see the version that
wrote the configuration file in the `version` part of the
configuration file.

{{% notice tip "Upgrading servers" %}}

If you wanted to completely change the way the server is configured by
regenerating the config file (e.g. if you need to switch from self
signed to autocert server) you may need to stand up a completely new
server (with a different DNS name, certificates, keys etc).

You can still use the old server in order to push the new MSI to
existing clients, but as the new MSI is installed, the new client
config file overwrites the old one and the new velociraptor client
will connect to the new server.

This method allows the orderly migration of Velociraptor clients from
an old server to a new server by simply user remote upgrade.

{{% /notice %}}

## Reverting versions

It is generally ok to revert from later versions to earlier versions
since the migration process is generally non-destructive.

## Uninstalling the server

The server can be uninstalled with the following command.

```sh
sudo dpkg -r velociraptor-server
```