---
menutitle: Security
title: Velociraptor Security Configuration
weight: 46
---

Velociraptor is a highly privileged service with elevated access to
thousands of endpoints across the enterprise. It is therefore crucial
to secure the deployment as much as possible.

While Velociraptor is designed with security in mind, there are a
number of architectural choices you can make related to security.

In this article we begin with a discussion of the communication
protocol used by Velociraptor and suggest a number of alternative
deployment methods to ensure it can be secured on the network. We then
discuss the Velociraptor permission model and suggest some further
steps to ensure user actions are audited and controlled.

## Velociraptor communications

How do Velociraptor clients communicate with the server? You can read
a lot more details about Velociraptor's encryption scheme and
communication protocol in our [Velociraptor Communications Blog
post]({{< ref
"/blog/2020/2020-09-28-velociraptor-network-communications-30568624043a/_index.md"
>}}), but we will go through the most important aspects here.

### Velociraptor’s internal PKI

Every Velociraptor deployment creates an internal PKI which underpins
it. The configuration wizard create an internal CA with an X509
certificate and a private key. This CA is used to

1. Create [initial server certificates]({{% ref "/docs/deployment/references/#Frontend.certificate" %}}) and any additional certificates
   for key rotation.

1. [CA public certificate]({{% ref "/docs/deployment/references/#Client.ca_certificate" %}}) is embedded in the client’s configuration and
   is used to verify server communications.

1. The internal CA is used to create API keys for programmatic
   access. The server is then able to verify API clients.

The configuration file contains the CA's X509 certificate in the
**Client.ca_certificate** parameter (it is therefore embedded in the
client configuration). The private key is contained in the
**CA.private_key** parameter.

{{% notice warning "Protecting the CA private key" %}}

In a secure installation you should remove the **CA.private_key**
section from the server config and keep it offline. You only need it
to create new API keys using the *velociraptor config api_client*
command, and the server does not need it in normal operations.

{{% /notice %}}

The internal CA will be used to verify the different Velociraptor
components in all cases, regardless if other TLS certificates are
used. While it is possible to roll server certificates the CA
certificate can not be rolled without re-deploying all the clients.

### Messages

Clients and servers communicate by sending each other messages (which
are simply protocol buffers), for example, a message may contain VQL
queries or result sets. Messages are collected into a list and sent in
a single POST operation in a **MessageList** protobuf. This protobuf
is encrypted using a session key with a symmetric cipher
(`aes_128_cbc`). The session key is chosen by the sending party and is
written into an encrypted **Cipher** protobuf and sent along with each
message.

![Velociraptor Communication overview](communication_overview.png)

This symmetric key is encoded in a **Cipher Properties** protobuf
which is encrypted in turn using the receiving party’s public key and
signed using the sending party’s private key.

{{% notice tip "Messages are double encrypted" %}}

You might have noticed that **MessageList** protobufs are encrypted
and signed, but they are usually still delivered within a TLS session -
therefore there are two layers of encryption.

The internal encryption scheme's main purpose is not only to encrypt
the messages but to sign them. This prevents messages from one client
from impersonating another client.

{{% /notice %}}

### HTTP protocol

Velociraptor uses HTTPS POST messages to deliver message sets to the
server. The server in turn sends messages to the client in the body of
the POST request. The client connects to one of the server URLs
provided in the **Client.server_urls** setting in its config file.

Before the client communicates with the server, the client must verify
it is actually talking with the correct server. This happens at two
levels:

* If the URL is a HTTPS URL then the TLS connection needs to be
  verified

* The client will fetch the url /server.pem to receive the server’s
  internal certificate. This certificate must be verified by the
  embedded CA.

Note that this verification is essential in order to prevent the
client from accidentally talking with captive portals or MITM proxies.

It is important to understand that the server's internal certificate
is **always** signed by the Velociraptor internal CA and is **always**
named with the name `VelociraptorServer`. It is completely
independent of the TLS certificates that control the HTTPS
connection (which may be external certificates).

The client will **always** verify the internal server certificate in
order to decrypt the messages as described above. This means that even
when a MITM proxy is able to decode the HTTPS connections, there is no
visible plain text due to the included messages being encrypted again
by the internal server certificate.

## Securing Network communications

The following are some common network deployment scenarios. Simple
scenarios are covered by the configuration generation wizard, but for
more complex scenarios you will need to tweak the configuration file
after generating it.

### Self signed deployment

This is the simplest deployment scenario handled by the configuration
wizard.

When deploying in self signed mode, Velociraptor will use its internal
CA to general TLS certificates as well. The TLS server certificate
will be generated with the common name `VelociraptorServer` and be
signed with the Velociraptor internal CA:

1. The setting `Client.use_self_signed_ssl` will be set to true. This
   causes the client to **require** that the server certificate have a
   common name of `VelociraptorServer` and it **must** be verified by
   the embedded CA certificate in `Client.ca_certificate`.

   This essentially pins the server’s certificate in the client — even
   if a MITM attacker was able to mint another certificate (even if it
   was trusted by the global roots!) it would not be valid since it
   was not issued by Velociraptor’s internal CA which is the only CA
   we trust in this mode! In this way self signed mode is more secure
   than when using a public CA.

   This mode also has the server use the `VelociraptorServer` internal
   certificate for securing the HTTPS connection as well.

2. The GUI is also served using self signed certificates which will
   generally result in a browser SSL warning. To avoid a MITM attack
   on a browser the GUI is forced to only bind to the localhost in
   this configuration. For increased security we recommend using the
   GUI using SSH to tunnel the connections into the localhost:

   ```sh
   ssh user@velociraptor.server -L 8889:127.0.0.1:8889
   ```

   Now use your browser on https://127.0.0.1:8889/ on your port
   forwarded workstation.

   Alternatively you can decide to expose the GUI on the public
   interface by changing the server configuration file:

   ```yaml
   GUI:
     bind_address: 0.0.0.0
     bind_port: 8889
   ```

   In this configuration you may use standard port filtering or
   firewalls to restrict access to the GUI port while allowing clients
   to connect freely to the frontend port (since these can be
   different ports).

### Deployment signed by Let's encrypt

The next deployment scenario handled by the configuration wizard uses
Let's encrypt to automatically assign certificates to the HTTPS TLS
connections.

In this scenario, the server will request Let's Encrypt to mint
certificates for the domain name provided. In order to this to work,
Let's Encrypt will go through a verification protocol requiring one of
their servers to connect to the Velociraptor server over port 80 and
443.

Therefore, the server needs to be reachable over ports 80 and 443 (You
can not serve over a non standard SSL port with Let's Encrypt).

{{% notice warning "Filtering ports" %}}

If you filter port 80 from the internet then Let's Encrypt will be
unable to verify the domain and will likely blacklist the domain name
for a period.

It is crucial that port 80 and 443 be unfiltered to the world. It is
difficult to recover from a blacklisting event other than waiting for
a long period of time.

{{% /notice %}}

In this configuration:

1. The `Client.use_self_signed_ssl` is switched off. This tells the
   client that it should verify the TLS connection using public root
   CA's.

2. The GUI is configured to bind to all interfaces as above. This is
   required to allow connections from the Let's Encrypt servers.

In this scenario the GUI must share the same port as the frontend
because the TLS certificate can only be issued to port 443. This means
that the GUI is accessible from the world as it is sharing the same
port as the frontend service and we can not use traditional port
filtering to restrict access.

#### Restricting access to the GUI from IP blocks

If your administrators normally access the GUI from a predictable
network IP block you can add a list of network addresses in the
[GUI.allowed_cidr]({{% ref
"/docs/deployment/references/#GUI.allowed_cidr" %}}) part of the
config file. This setting will automatically reject connections to the
GUI applications from IP addresses outside the allowed range.

### Deployment with TLS certificates signed by external CA

This is a common scenario where there is an SSL inspection proxy
between the client and server communications. In this case the proxy
will present a certificate for the server signed by another CA
(usually an internal self signed CA associated with the inspection
software).

Alternatively you may choose to buy TLS certificates from a commercial
CA (this use case is very similar).

In this scenario, the client needs to verify the TLS connections using this custom CA certificate:

1. From the client's point of view it is not in self signed mode,
   because Velociraptor itself did not issue this certificate,
   therefore `Client.use_self_signed_ssl` should be false.

2. Additionally the certificate should be verified using the
   inspection CA's certificate. Therefore that certificate should be
   added to `Client.Crypto.root_certs`:

   ```yaml
   Client:
      Crypto:
         root_certs: |
            -----BEGIN CERTIFICATE-----
            <certificate 1>
            -----END CERTIFICATE-----
            -----BEGIN CERTIFICATE-----
            <certificate 2>
            -----END CERTIFICATE-----
   ```

3. The server may need to present custom certificates. Add those to
   the Frontend section (Certificates need to be in PEM format with
   unencrypted private keys to allow the server to start without user
   interaction):

   ```yaml
   Frontend:
       tls_certificate_filename: /etc/cert.pem
       tls_private_key_filename /etc/cert.key
   ```

   Do not change the `Frontend.certificate` field as Velociraptor will
   still require to verify the server using it's own CA.

   Note that only the TLS communications will be visible to the TLS
   interception proxy. It will be unable to see any clear text since
   there are always two layers of encryption.

### Deploying mTLS authentication

An additional layer of security can be provided by use of Mutual TLS
(mTLS) authentication between clients and server. This method requires
the client to present a `valid client side certifacte` before the
server even allows a connection to the frontend. The client
certificate is included in the configuration file, therefore
connections from the internet to the frontend require to have a valid
configuration file first.

To implement this strategy you need to:

1. Generate client side certificates signed by the internal Velociraptor CA.
2. Specify that the frontend requires the client to present a valid
   client side certificate signed by the internal Velociraptor CA.

#### Generating client side certificates

The client side certificate is just a certificate signed by the
internal CA - since all clients present the same certificate we do not
use it for identify, just to verify its signature!

Therefore this is the same as an API key certificate and we can use
the same process to generate one.

```
velociraptor --config /etc/velociraptor/server.config.yaml config api_client --name "Client" /tmp/api.config.yaml
Creating API client file on /tmp/api.config.yaml.
No role added to user Client. You will need to do this later using the 'acl grant' command.
```

{{% notice warning "API User permissions" %}}
This will create an API key and an API user called `Client`. It
is critical that the user has no roles or permissions on the server to
prevent this key from being used to connect to the API ports.
{{% /notice %}}

Once the key is generated you can see it in the yaml file encoded in
PEM format. Simply copy the two blocks (`client_private_key` and
`client_cert`) into the client's config file [Client.Crypto.client_certificate]({{% ref "/docs/deployment/references/#Client.Crypto.client_certificate" %}}) and [Client.Crypto.client_certificate_private_key]({{% ref "/docs/deployment/references/#Client.Crypto.client_certificate_private_key" %}}).

Note that this client certificate will only be used if the server
requests it so it is ok to add the client certificates even if you do
not intend to require it until later.

#### Requiring client side certificates

On the server you can require frontend connections to present valid
client side certificates by setting the
[Frontend.require_client_certificates]({{% ref
"/docs/deployment/references/#Frontend.require_client_certificates"
%}}) to true.

Once this setting is made it will not be possible to connect to the
frontend without presenting a relevant client side certificate. This
makes troubleshooting a bit more challenging.

For example the following will fail:

```
$ curl -k https://127.0.0.1:8000/server.pem
curl: (56) OpenSSL SSL_read: error:0A000412:SSL routines::sslv3 alert bad certificate, errno 0
```

To allow curl to connect you will need to create a PEM file with both
the certificate and the private key in it (Copied from the YAML files
above):

```
-----BEGIN CERTIFICATE-----
....
-----END CERTIFICATE-----
-----BEGIN RSA PRIVATE KEY-----
....
-----END RSA PRIVATE KEY-----
```

Now we can use curl to connect successfully
```
curl -k https://127.0.0.1:8000/server.pem --cert /tmp/client.pem | openssl x509 -text
```

## Securing the server

In the following section I will discuss how the GUI application can be
further secured. Since Velociraptor commands such privileged access to
the network it is important to ensure this access can not be misused.

### GUI Users

Velociraptor's GUI is the nerve center for managing a Velociraptor
deployment so we need to ensure we secure it with proper user
authentication. Within Velociraptor, the user is central and is
associated with a set if roles and permissions which control what the
user is able to do.

Users and permissions are managed in the GUI's `Users` screen (which
is visible to administrators)

![Managing User Permissions](user_management.png)

Velociraptor offers a number of options to authenticate users into the
GUI. The type of authenticator is specified in the
[GUI.authenticator.type]({{% ref
"/docs/deployment/references/#GUI.authenticator.type" %}})
setting. The config wizard supports some basic authenticators but
others have to be manually configured.

To make deployment easier the configuration wizard supports creating
`Initial Users`. These user accounts will be created automatically
when the server starts upon first installation and be given the administrator role.

This provides a way to bootstrap the administrator into the server. If
the `Basic` authentication method is specified, the password hashes
and salt will be initialized from the configuration file. For other
authentication methods that do not use passwords, the password hashes
are ignored.

```
GUI:
  initial_users:
  - name: mic
    password_hash: aa3a779......
    password_salt: f8707a7......
```

#### Adding a new user

To add a new user, the GUI can be used by clicking on the `+` icon and
setting a user name.

![Adding a new user](user_adding.png)

By default the user is added to the selected org with the `Read Only`
role. You can assign the new user to any number of orgs using the GUI

![Assign a new user to orgs](user_assign_org.png)

#### Roles and permissions

Velociraptor users are assigned various permissions to control their
actions in different `Orgs`. To make it easier to deal with a group of
permissions, Velociraptor has the concept of a `role` which can be
thought of as just a predefined set of permissions.

The actual permission check is made against the set of permissions
the user has. Assigning a role to a user gives them a set of
permissions, but you can also assign permissions separately.

![Assign Roles and Permissions to a user](user_assign_roles.png)

In the above screenshot we see the `testuser` has the read only role
which allows them to read already collected results from
clients. Additionally we also gave them the `Label Clients` permission
so they can assign labels to different clients (potentially affecting
their membership in hunts).

User roles and permissions extend far beyond the GUI itself
though. Since Velociraptor is really a VQL engine and provides
powerful capabilities for automation and post processing via
notebooks, the VQL engine itself respects the user's permissions.

Therefore while the VQL query is executed the user's permissions are
checked against the different VQL plugins and functions, and if the
user does not have permissions to run these, the plugin will be
prevented from running.

![User permissions are checked in notebook evaluation](VQL_permissions.png)

In the above screenshot, the `testuser` user attempted to run the
`SELECT * FROM info()` plugin but that plugin requires the
`MACHINE_STATE` permission (because it inspects properties of the
server like hostname etc). Therefore the plugin will be rejected and
an error log emitted.

However the user may still run other plugins like the `hunt_results()`
plugin to inspect results (because the user has the read permission).

You can check which permission each plugin requires in the reference
site's `VQL Reference` section.

![Inspecting VQL plugin permissions](VQL_permissions_reference.png)

{{% notice warning "Selecting User permissions" %}}

While you can have very fine control over the user's roles and
permissions we suggest that you stick to the built in roles and they
way they should be used as much as possible.

This is because sometimes there are unexpected escalation paths
between permissions that you might not be aware of. For example,
giving a user the `Server Artifact Writer` role can easily lead to
privilege escalation as the user can modify an existing server
artifact to run VQL to grant them other roles, and trick an
administrator in running that artifact.

This is why we say that some roles are `Administrator Equivalent`
because it is easy to escalate from them to more powerful
roles. Typically we try to limit access to trusted users anyway and
not rely too much on the user roles.

{{% /notice %}}

### Auditing User actions

Some actions in the UI (Or in VQL notebooks) are important for server
security. We call these actions `Auditable Actions` because we want to
report them taking place.

Velociraptor records auditable actions in two ways:
1. The Audit log is written to the audit directory
2. The Audit event is written to the `Server.Audit.Logs` event artifact.

This allows events to be recorded and **also** be automatically acted
upon with a server event query using the `watch_monitoring()` plugin.

You can forward server event logs to a remote syslog server by setting
the value in the [Logging.remote_syslog_server]({{% ref
"/docs/deployment/references/#Logging.remote_syslog_server" %}}) part
of the config. We recommend this be done to archive audit logs.

However, much more interestingly, Velociraptor treats server audit
events as simply another event query called
`Server.Audit.Logs`. Therefore you can view it as just another server
event artifact in the GUI.

![Viewing server audit logs](viewing_audit_logs.png)

The audit event is divided into fixed fields (`ServerTime`,
`operation` and `principal`) and a variable column `details` with a
per event data.

By having the data recorded as a timed artifact we can apply filtering
etc using the notebook. The below query isolates only administrator
actions within the time of interest.

![Querying audit logs within the Velociraptor GUI](querying_audit_logs.png)

Additionally it is possible to forward audit events to external
systems. For example, `Elastic.Events.Upload` can forward audit events
to Elastic, while `Server.Alerts.Notification` can forward these to a
slack channel.

### Authenticating the user

Users can be authenticated using a variety of ways, including Active
Directory, Client Certificates, Multi-Factor Authentication
etc. Velociraptor offers a number of different `authenticators` to
allow flexibility with authenticating users.

#### Basic Authentication

The simplest authentication is `Basic` authentication. In this mode,
the GUI requires the user to provide a username and password using the
HTTP `Basic` Authentication mode. While these credentials are
typically encrypted using HTTPS in transit, basic authentication is
not considered secure and should be avoided because Velociraptor
itself has to manage the passwords.

Velociraptor will store the password hashes and salts in the filestore
for each user and verify them on each HTTP request.

When basic authentication is configured, a user can update their own
password using the GUI

![Updating a user's own password](updating_own_password.png)

Sometimes administrators need to update another user's password. This
can be done from the user management screen.

![Updating another user's password](updating_user_password.png)

Note that password management is supposed to be very simplistic
because for production servers we recommend to use an external
authentication service (e.g. OIDC)

#### OAuth2 services

A number of public identity providers are directly supported in
Velociraptor and based on OAuth2 protocol.

You can read more about setting up [GitHub, Azure and Google]({{% ref "/blog/2020/2020-08-17-velociraptor-sso-authentication-6dd68d46dccf/" %}}) as an OAuth2 provider.


### Lock down mode

Many users use Velociraptor for incident response purposes and
collecting telemetry. While it is convenient to have Velociraptor
already deployed and active in the environment, this may increase the
risk for misuse when not used for response.

For this purpose Velociraptor has a `lockdown mode`. This mode
prevents Velociraptor from performing any active modification to the
environment.

This is implemented by denying all users from certain powerful
permissions - even if the user is an administrator!

The following permissions are denied while in lockdown mode

* `ARTIFACT_WRITER`
* `SERVER_ARTIFACT_WRITER`
* `EXECVE`
* `SERVER_ADMIN`
* `FILESYSTEM_WRITE`
* `FILESYSTEM_READ`
* `MACHINE_STATE`

After initial deployment and configuration, the administrator can set
the server in lockdown by adding the following configuration directive
to the `server.config.yaml` and restarting the server:

```yaml
lockdown: true
```

Therefore it will still be possible to read existing collections, and
continue collecting client monitoring data but not edit artifacts or
start new hunts or collections.

During an active IR the server may be taken out of lockdown by
removing the directive from the configuration file and restarting the
service. Usually the configuration file is only writable by root and
the Velociraptor server process is running as a low privilege account
which can not write to the config file. This combination makes it
difficult for a compromised Velociraptor administrator account to
remove the lockdown and use Velociraptor as a lateral movement
vehicle.

### Removing plugins from a shared server

While Velociraptor allows user to run arbitrary VQL in notebooks it
does control access to the things that the queries can do by applying
a user's ACL token to each plugin.

This means that administrators are typically allowed to run all
plugins, even those that might compromise the server (e.g. the
`execve()` plugin can run arbitrary shell commands!)

For shared server environments it is better to prevent these plugins
from running at all - even for administrators.

Velociraptor allows the configuration file to specify which VQL plugins are allowed using the [defaults.allowed_plugins]({{% ref "/docs/deployment/references/#defaults.allowed_plugins" %}}), [defaults.allowed_functions]({{% ref "/docs/deployment/references/#defaults.allowed_functions" %}}) and [defaults.allowed_accessors]({{% ref "/docs/deployment/references/#defaults.allowed_accessors" %}})

The easiest way to populate these is to answer Yes to `Do you want to
restrict VQL functionality on the server?` in the configuration
wizard. This will implement the [default allow
list](https://github.com/Velocidex/velociraptor/blob/master/bin/allowlist.go)
(which you can tweak later as required).

If these lists are populated, only the plugins mentioned are allowed
to be registered at all. This results in an error message like `Plugin
Info Not Found` when the plugin is used.

The purpose of this security measure is to completely remove
functionality from the server, regardless of the permissions model. It
is only needed when the server is shared between potentially untrusted
users. Usually you should not implement this because it causes a lot
of functionality to randomly break (e.g. any artifacts that might
depend on a plugin which is not in the allow list will fail).

## Securing VQL

Velociraptor uses VQL extensively in the form of [artifacts]({{% ref
"/docs/artifacts/" %}}) and [notebooks]({{% ref
"/docs/notebooks" %}}). Since a VQL query can do many potentially
dangerous actions, it is important to restrict the type of actions the
query can perform based on the user's ACL token. When the VQL query is
started, the user's ACL token is loaded into the query environment. As
the query continues executing, various VQL plugins and functions are
evaluated by the VQL engine. VQL plugins and functions may have
requirements as to the type of permission required to run. You can see
the required permission for each plugin in the [VQL reference]({{% ref
"/vql_reference" %}}) page.

![Example VQL reference showing required permissions](vql_reference.png)

This mechanism allows lower privilege users to run VQL safely - those
actions that require permissions the user does not have will simply be
ignored (and a log message emitted).

ACL checks are always enforced on the server, for example in notebooks
and server artifacts. A user with the `Analyst`role, has no
`FILESYSTEM_READ` permission, and therefore if they tried to run a
`glob()` based query in a notebook they will be denied.

![Permission denied error in the notebook](notebook_permission_denied.png)

### Controlling access to artifacts

While ACL checks are enforced on the server, on the client all ACL
checks are disabled. This means that as long as a user is able to
schedule the collection on the client, the collection can do anything
at all. This makes sense as we want the VQL to be evaluated the same
way regardless of who launched the collection in the first place.

However this may give lower privilege users a lot of power over the
entire network. For example the artifact
[Windows.System.PowerShell]({{< ref "/artifact_references/pages/windows.system.powershell/" >}}) allows
running arbitrary shell commands on the endpoint. While this is a
useful capability in limited situations it may lead to severe
compromise if misused!

Velociraptor allows for an artifact to specify the
`required_permissions` field.

```yaml
name: Windows.System.PowerShell
description: |
  This artifact allows running arbitrary commands through the system
    powershell.
  ....
required_permissions:
  - EXECVE
```

This field specifies that the server check the user has all of the
required permissions before the server allows the artifact to be
scheduled. If a user with the `Investigator` role tries to launch this
artifact, they will be denied (since the usually lack the `EXECVE`
permission)

![Permission denied launching a powerful artifact](launch_artifact_permission_denied.png)

Typically we set the `required_permissions` field on client artifacts
that can do dangerous things if misused. In particular, if the
artifact parameter can specify running arbitrary code.

{{% notice tip "Delegating artifact permissions" %}}

The `required_permissions` check is only done on the artifact being
launched. It does not apply to any dependent artifacts called from the
launched artifact. This is deliberate as it allows you to create
curated safe versions of the dangerous artifacts to be used by lower
privilege users. For example, while `Windows.System.PowerShell`
requires an `EXECVE` permission because its parameter allows arbitrary
commands to run, we can wrap it with a safe version:

```yaml
name: Custom.SafePowershellDir
sources:
  - query: |
        SELECT * FROM Artifact.Windows.System.PowerShell(Command="dir C:/")
```

This artifact can not be misused because the command passed to
`Windows.System.PowerShell` is a fixed string and can not be changed
by the user that initiates the collection.


{{% /notice %}}
