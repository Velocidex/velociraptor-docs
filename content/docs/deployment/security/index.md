---
menutitle: Security
title: Velociraptor Security Configuration
date: 2024-01-17
weight: 46
last_reviewed: 2026-11-19
summary: |
  Velociraptor is a highly privileged service with elevated access to thousands
  of endpoints across the enterprise, so securing the deployment is critical.
description: |
  Velociraptor is a highly privileged service with elevated access to
  thousands of endpoints across the enterprise, so securing the
  deployment is critical.
---

Velociraptor is a highly privileged service with elevated access to
thousands of endpoints across the enterprise, so securing the
deployment is critical.

While Velociraptor is designed with security in mind, there are a
number of architectural choices you can make related to security.

This page describes the communication protocol used by Velociraptor
and suggests a number of alternative deployment methods to secure it
on the network. It then describes the Velociraptor permission model
and suggests further steps to audit and control user actions.

## Client trust model

From the outset we need to highlight a fundamental limitation of agent
based security software:

**Because the agent (the Velociraptor Client) is running on a
potentially compromised platform, we can never fully trust what the
client is telling us.**

There is no guarantee that the client will work correctly, as it may be
subverted by an attacker to disable itself, omit or hide information,
or report fabricated data.

This is a fundamental limitation in the server/client model and cannot
be fully mitigated. The Velociraptor client typically runs at elevated
permissions to make tampering harder, and an EDR can add anti-tamper
rules, but residual risk remains when the platform itself is
compromised. We refer to this as a **Rogue Client**.

You should always keep this limitation in mind when interpreting
results. A client may be disabled by an attacker, or the results may
be missing or incorrect.

### Client identity

Velociraptor's main defense against rogue clients is cryptographic
identity verification. Each client has a unique encryption key, and
the server uses the internal PKI to ensure one client cannot
impersonate another. This prevents a compromised client from injecting
fake information about a different endpoint. See the
[communications](#velociraptor-communications) section for details.

### What a rogue client can influence

Even with identity verification in place, the server largely trusts
whatever data a client sends. A rogue client can influence several
aspects of its relationship with the server:

**Self-labeling and metadata.** Clients send labels during enrollment
via `Server.Internal.ClientInfo` and can send arbitrary labels at any
time via a crafted `VQLResponse`. The server applies these without
checking authorization. A rogue client can exclude itself from
label-targeted hunts or spoof its hostname, FQDN, and system type.
See the [client labels](/docs/clients/labels/) page for more.

**Event monitoring injection.** Clients can send monitoring results
for any `CLIENT_EVENT` artifact regardless of whether it was assigned
to them. A rogue client can flood the event stream with fabricated
telemetry, trigger false detection rules, poison SIEM pipelines, or
mask real activity with noise.

**Client Flow injection.** Clients can send any results for any
`CLIENT` artifact collection regardless of whether it was assigned to
them. A rogue client can flood the server with arbitrary amount of
data without limits. Artifact resource limits are enforced by the
client itself, not the server. Enforcing limits on the server does not
work with auto-enrollment, so this is not implemented.

**Alert injection.** Clients can send alert messages with arbitrary
content. The server overrides only `ClientId` and `FlowId` for
attribution but preserves `AlertName`, `EventData`, and `Timestamp`
from the client. A rogue client can trigger false incident response
notifications or corrupt investigation timelines.

**Flow state manipulation.** Clients report their own collection
statistics and completion status via `FlowStats`. A rogue client can
mark a flow as `FINISHED` immediately, before collecting any data,
making the collection appear successful with zero results.

**Auto enrollment.** Velociraptor uses a zero registration system
which does not require pre-provisioning of clients before
deployment. This lets any client with suitable configuration
automatically enroll. By extension, a rogue client can
upload arbitrary amounts of data to the server (by changing the
client id and pushing the data to multiple flows). There is no
mechanism to prevent server storage exhaustion due to rogue
clients.

### Mitigations

While the trust model is by design, you can take practical steps to
reduce risk:

- **Treat client-reported data as signals, not facts.** Labels,
  hostnames, collection statistics, and alert details are
  client-reported and should be correlated with other sources.
- **Use client IDs for reliable identity.** The client ID is derived
  from the client's cryptographic key and cannot be spoofed. Use it
  instead of hostname or FQDN for authoritative identification.
- **Monitor for suspicious behavior.** Watch for clients that change
  labels unexpectedly, send unusual alerts, or report flow completion
  without corresponding data.
- **Correlate collection results.** Compare reported collection
  statistics against actual received data to detect discrepancies.
- **Segment the network.** Limit which endpoints can connect to the
  server. A client that cannot reach the server cannot abuse the trust
  model.
- **Manage server storage.** Use the methods in
  [How to manage storage space on the server](/knowledge_base/tips/deleting_old_data/).
  Velociraptor does not enforce any hard limits on collected data or
  any built-in data retention policy. It is up to you to manage
  storage appropriately.

## Velociraptor communications

How do Velociraptor clients communicate with the server? You can read
a lot more details about Velociraptor's encryption scheme and
communication protocol in our
[Velociraptor Communications Blog post](/blog/2020/2020-09-28-velociraptor-network-communications-30568624043a/),
but we will go through the most important aspects here.

### Velociraptor’s internal PKI

Every Velociraptor deployment creates an internal PKI which underpins
it. The configuration wizard creates an internal CA with an X.509
certificate and a private key. The CA is used to:

1. Create [initial server certificates](/docs/deployment/references/#Frontend.certificate)
   and any additional certificates for key rotation.

2. Verify the server during client-server communications. [The CA public
   certificate](/docs/deployment/references/#Client.ca_certificate)
   is embedded in the client's configuration and is used to verify
   (and so trust) the server.

3. Create API keys for programmatic access. The server can then verify
   API clients.

4. Create client certificates for (optional) mTLS. This lets clients
   authenticate using certificates.

The configuration file contains the CA's X.509 certificate in the
`Client.ca_certificate` key, which is included in the client
configuration. The private key is in the `CA.private_key` parameter.
Because the client configuration contains the trusted CA certificate,
the client can verify the server's certificate during communications.

The internal CA verifies the different Velociraptor components in all
cases, regardless of whether other TLS certificates are used. While it
is possible to reissue or rotate server certificates, the CA
certificate cannot be reissued without re-deploying all the clients.

> [!WARNING] Protecting the CA private key
> In a secure installation you should remove the `CA.private_key` section from
> the server config and keep it offline. You only need it to
> [create new API keys](/docs/server_automation/server_api/#creating-an-api-client-configuration)
> and when
> [rotating server certificates](/knowledge_base/tips/rolling_certificates/)
> (typically after 1 year).
> The server does not need it during normal operations.


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

> [!TIP] Messages are double encrypted
> You might have noticed that **MessageList** protobufs are encrypted
> and signed, but they are usually still delivered within a TLS session,
> so there are two layers of encryption.
>
> The internal encryption scheme's main purpose is not only to encrypt
> the messages but to sign them. This prevents messages from one client
> from impersonating another client.
>
> The inner envelope uses SHA-1 for its RSA-OAEP and HMAC operations.
> This is acceptable because the envelope is always delivered inside a
> TLS session, which provides the primary cryptographic protection.

### HTTP protocol

Velociraptor uses HTTPS POST messages to deliver message sets to the
server. The server in turn sends messages to the client in the body of
the POST request. The client connects to one of the server URLs
provided in the **Client.server_urls** setting in its config file.

Before the client communicates with the server, the client must verify
it is actually talking with the correct server. This happens at two
levels:

* If the URL is an HTTPS URL then the TLS connection needs to be
  verified.

* The client fetches the URL `/server.pem` to receive the server's
  internal certificate. This certificate must be verified by the
  embedded CA.

This verification prevents the client from accidentally talking with
captive portals or man-in-the-middle proxies.

The server's internal certificate is **always** signed by the
Velociraptor internal CA and is **always** named
`VelociraptorServer`. It is completely independent of the TLS
certificates that control the HTTPS connection (which may be external
certificates).

The client **always** verifies the internal server certificate before
decrypting messages. So even when a
man-in-the-middle proxy decodes the HTTPS connections, there is no
visible plain text, because the included messages are encrypted again
by the internal server certificate.

> [!WARNING] Debugging clients and TLS verification
> The client-only setting
> [`Client.insecure_network_trace_file`](/docs/deployment/references/#Client.insecure_network_trace_file)
> is only for diagnosing connectivity issues. Any non-empty value writes
> clear text protocol traces **and disables TLS certificate
> verification** for outbound client connections, so intermediaries
> could strip the TLS tunnel even though Velociraptor’s inner protobuf
> encryption layer may remain. Never ship golden images or repacked
> clients that leave this flag configured.

## Securing network communications

The following sections describe common network deployment scenarios.
The configuration generation wizard covers basic scenarios; for more
complex ones, modify the configuration file after generating it.

### Self-signed deployment

This is the basic deployment scenario handled by the configuration
wizard.

When deploying in self-signed mode, Velociraptor uses its internal
CA to generate TLS certificates as well. The TLS server certificate
is generated with the common name `VelociraptorServer` and signed
with the Velociraptor internal CA:

1. The setting `Client.use_self_signed_ssl` will be set to true. This
   causes the client to **require** that the server certificate have a
   common name of `VelociraptorServer` and it **must** be verified by
   the embedded CA certificate in `Client.ca_certificate`.

   This pins the server's certificate in the client, even
   if a man-in-the-middle attacker was able to mint another certificate (even if it
   was trusted by the global roots!) it would not be valid since it
   was not issued by Velociraptor’s internal CA which is the only CA
   we trust in this mode! In this way self-signed mode is more secure
   than when using a public CA.

   This mode also has the server use the `VelociraptorServer` internal
   certificate for securing the HTTPS connection as well.

2. The GUI is also served using self-signed certificates, which
   generally results in a browser SSL warning. To avoid a
   man-in-the-middle attack, the GUI is forced to bind only to
   localhost in this configuration. For increased security, we
   recommend tunneling the connection over SSH:

   ```sh
   ssh user@velociraptor.server -L 8889:127.0.0.1:8889
   ```

   Now open https://127.0.0.1:8889/ in your browser on the
   port-forwarded workstation.

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

### Deployment signed by Let's Encrypt

The next deployment scenario handled by the configuration wizard uses
Let's Encrypt to automatically assign certificates to the HTTPS TLS
connections.

In this scenario, the server asks Let's Encrypt to mint certificates
for the domain name provided. For this to work, Let's Encrypt runs a
verification protocol that requires one of its servers to connect to
the Velociraptor server over ports 80 and 443.

The server must be reachable over ports 80 and 443. You cannot serve
over a non-standard SSL port with Let's Encrypt.

> [!WARNING] Filtering ports
> If you filter port 80 from the internet then Let's Encrypt will be
> unable to verify the domain and will likely blacklist the domain name
> for a period.
>
> It is crucial that port 80 and 443 be unfiltered to the world. It is
> difficult to recover from a blacklisting event other than waiting for
> a long period of time.

In this configuration:

1. The `Client.use_self_signed_ssl` is switched off. This tells the
   client that it should verify the TLS connection using public root
   CA's.

2. The GUI is configured to bind to all interfaces, as in the previous
   scenario. This is required so Let's Encrypt servers can connect.

In this scenario, the GUI must share the same port as the frontend,
because the TLS certificate can only be issued for port 443. This
means the GUI is reachable from the internet, because it shares the
frontend port, and you cannot use traditional port filtering to
restrict access.

### Deployment with TLS certificates signed by an external CA

This is a common scenario where an SSL inspection proxy sits between
the client and server communications. In this case the proxy
presents a certificate for the server signed by another CA (usually an
internal self-signed CA associated with the inspection software).

Alternatively, you can buy TLS certificates from a commercial CA;
this use case is similar.

In this scenario, the client needs to verify the TLS connections
using this custom CA certificate:

1. From the client's point of view it is not in self-signed mode,
   because Velociraptor did not issue this certificate. Set
   `Client.use_self_signed_ssl` to false.

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
       tls_private_key_filename: /etc/cert.key
   ```

   Do not change the `Frontend.certificate` field. Velociraptor still
   needs it to verify the server using its own CA.

   Only the TLS communications are visible to the TLS interception
   proxy. It cannot see any plain text because there are always two
   layers of encryption.

### Restricting access to the GUI from IP blocks

If your users normally access the GUI from a predictable
network IP block you can add a list of network addresses in the
[GUI.allowed_cidr](/docs/deployment/references/#GUI.allowed_cidr)
part of the config file. This setting will automatically reject
connections to the GUI applications from IP addresses outside the
allowed range.

### Deploying mTLS authentication

An additional layer of security can be provided by enabling
Mutual TLS (mTLS) authentication between clients and server.
This mechanism requires the client to present a valid client certificate before
the server even allows a connection to the frontend. The client certificate is
included in the client configuration file.

Although clients cannot enroll or communicate without a valid configuration
file, it is possible to connect and fingerprint the server if the mTLS policy is
not enabled. For servers exposed to the public internet this may be undesirable
even though this doesn't present any substantial risk.

mTLS provides an additional layer of security in that connections from the
internet (from clients or non-clients) to the frontend are required to present a
valid certificate in order to complete the TLS connection.

To implement this strategy you need to:

1. Generate client-side certificates signed by the internal Velociraptor CA.
2. Specify that the frontend requires the client to present a valid
   client-side certificate signed by the internal Velociraptor CA.

#### Generating client-side certificates

The client-side certificate is a certificate signed by the internal
CA. The server verifies the validity of the client certificate but
does not track issued certificates or provide a CRL mechanism. The
client certificate is not used to individually identify clients, so
you only need to issue one certificate to verify all clients. All
clients present the same certificate when connecting.

Since the certificate needed is the same as an API client certificate, we can
use the same process to generate one for mTLS:

```
$ velociraptor --config /etc/velociraptor/server.config.yaml config api_client --name "Client" /tmp/dummy.api.config.yaml
Creating API client file on /tmp/dummy.api.config.yaml.
No role added to user Client. You will need to do this later using the 'acl grant' command.
```

> [!WARNING] API user permissions
> This creates an API configuration file for an API user called
> "Client", containing the key pair you need. However, the `config
> api_client` command in this example does not create a user on the
> Velociraptor server, because we deliberately did not specify the
> `--role` flag.
>
> It is critical that the user has no roles or permissions on the
> server, to prevent this key from being used to connect to the API
> ports. So do not follow the message about the `acl_grant` command.

Once the key is generated, it appears in the resulting YAML file,
encoded in PEM format. Copy the two blocks (`client_private_key` and
`client_cert`) into the client's config file:
[Client.Crypto.client_certificate](/docs/deployment/references/#Client.Crypto.client_certificate)
and
[Client.Crypto.client_certificate_private_key](/docs/deployment/references/#Client.Crypto.client_certificate_private_key).
or into the server config if you intend to use the GUI to repack the
MSI or generate client configs for multiple orgs (service restart will
be required to read these new config items).

```yaml
Client:
   Crypto:
      client_certificate: |
        -----BEGIN CERTIFICATE-----
        <certificate>
        -----END CERTIFICATE-----
      client_certificate_private_key: |
        -----BEGIN RSA PRIVATE KEY-----
        <key>
        -----END RSA PRIVATE KEY-----
```

This client certificate is only used if the server requests it, so it
is fine to add the client certificate to the client config even if you
only intend to enable mTLS later.

> [!NOTE]
> Client certificates generated by the `config api_client` command are
> valid for 1 year. It is
> likely that you will upgrade your clients before this 1-year period
> elapses, so we recommend that you issue a new client certificate during the
> upgrade process by including an updated client config (that is, with a new
> client certificate) in your client package, for example the MSI for Windows
> clients.

#### Requiring client-side certificates

On the server you can require frontend connections to present valid
client-side certificates by setting the
[Frontend.require_client_certificates](/docs/deployment/references/#Frontend.require_client_certificates)
config setting to true.

Once this setting is enabled, it is not possible to connect to the
frontend without presenting a relevant client-side certificate. This
makes troubleshooting more challenging.

For example the following will fail:

```sh
$ curl -k https://127.0.0.1:8000/server.pem
curl: (56) OpenSSL SSL_read: error:0A000412:SSL routines::sslv3 alert bad certificate, errno 0
```

To let curl connect, create a PEM file containing both the certificate
and the private key (copied from the client config YAML examples):

```
-----BEGIN CERTIFICATE-----
....
-----END CERTIFICATE-----
-----BEGIN RSA PRIVATE KEY-----
....
-----END RSA PRIVATE KEY-----
```

Now curl can connect:

```sh
curl -k https://127.0.0.1:8000/server.pem --cert /tmp/client.pem | openssl x509 -text
```

## Securing the server

In the following sections we discuss how the GUI application can be
further secured. Because Velociraptor has such privileged access to
the network, it is important to ensure this access cannot be misused.

### GUI users

The Velociraptor GUI is the nerve center for managing a Velociraptor
deployment, so you need to protect it with strong user authentication.
Within Velociraptor, the user is central and is associated with a set
of roles and permissions that control what the user can do.

Users and permissions are managed in the **Users** screen, which is
visible to administrators.

![Managing User Permissions](user_management.png)

Velociraptor offers a number of options to authenticate users into the
GUI. The type of authenticator is specified in the
[GUI.authenticator.type](/docs/deployment/references/#GUI.authenticator.type)
setting. The config wizard supports some basic authenticators but
others have to be manually configured.

To make deployment easier the configuration wizard supports creating
`Initial Users`. These user accounts will be created automatically
when the server starts upon first installation and be given the
administrator role.

This provides a way to bootstrap the administrator into the server. If
the `Basic` authentication method is specified, the password hashes
and salt will be initialized from the configuration file. For other
authentication methods that do not use passwords, the password hashes
are ignored.

```yaml {filename="server.config.yaml"}
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
actions in different orgs. To make it easier to deal with a group of
permissions, Velociraptor has the concept of a `role`, which is a
predefined set of permissions.

The actual permission check is made against the set of permissions
the user has. Assigning a role to a user gives them a set of
permissions, but you can also assign permissions separately.

![Assign Roles and Permissions to a user](user_assign_roles.png)

In this screenshot, `testuser` has the read-only role, which lets
them read already collected results from clients. The user also has
the `Label Clients` permission, so they can assign labels to different
clients (potentially affecting their membership in hunts).

User roles and permissions extend beyond the interface. Because
Velociraptor is a VQL engine with powerful capabilities for automation
and post-processing via notebooks, the VQL engine respects the user's
permissions.

When a VQL query runs, the user's permissions are checked against the
different VQL plugins and functions. If the user does not have
permission to run them, the plugin is prevented from running.

![User permissions are checked in notebook evaluation](VQL_permissions.png)

In this screenshot, `testuser` attempted to run the
`SELECT * FROM info()` plugin, but that plugin requires the
`MACHINE_STATE` permission, because it inspects server properties
such as the hostname. The plugin is rejected and an error is logged.

The user can still run other plugins, such as `hunt_results()`, to
inspect results, because the user has the read permission.

You can check which permission each plugin requires in the reference
site's `VQL Reference` section.

> [!NOTE] Velociraptor's User Access Control
> Velociraptor's security model is org scoped. This means that ACLs are
> applied at the org level and are not granular to the client/flow
> level. If a user has the `READ_RESULTS` permission (given to any user
> who can log into the GUI), then they can read any file within the org,
> including all clients' collections, hunts, exports, and notebooks.
>
> Similarly, while notebooks can be shared with other users (or marked
> private), **this is not a security measure**; it is only for
> convenience and to clean up the interface, so each user sees only the
> notebooks relevant to them.
>
> Any user that can log into the org (that is, they have the
> `READ_RESULTS` permission) can read any notebook within the org.
>
> This reflects Velociraptor's collaborative model: all users
> assigned to the org are considered trusted. Velociraptor's threat
> model does not assume untrusted or rogue users. You should always
> ensure that user access is protected via SSO, two-factor
> authentication, and other best-practice tools so that account takeover
> is unlikely.

![Inspecting VQL plugin permissions](VQL_permissions_reference.png)

> [!WARNING] Selecting user permissions
> While you can control the user's roles and permissions in detail, we
> suggest that you use the built-in roles and the way they should be
> used as much as possible.
>
> This is because sometimes there are unexpected escalation paths
> between permissions that you might not be aware of. For example,
> giving a user the `Server Artifact Writer` role can lead to
> privilege escalation, because the user can modify an existing server
> artifact to run VQL to grant them other roles, and trick an
> administrator into running that artifact.
>
> This is why we say that some roles are "Administrator Equivalent":
> it is easy to escalate from them to more powerful roles. Typically we
> try to limit access to trusted users anyway and not rely too much on
> the user roles.


> [!WARNING] User permissions do not apply on endpoints
> Velociraptor clients execute VQL queries without per-plugin ACL
> control, since they have no concept of users or ACLs.
>
> This means that once an artifact is scheduled, it can do anything on
> the client side. ACL permissions only apply to the **ability to
> schedule** the artifact in the first place.
>
> Any hostile artifact authored into a hunt inherits full client
> privileges. Defense there relies on [code review of
> artifacts](/docs/artifacts/security/).

### Auditing user actions

Some actions in the interface (or in VQL notebooks) are important for
server security. We call these actions *auditable actions* because we
report when they take place.

Velociraptor records auditable actions in two ways:

1. The audit log is written to the audit directory.
2. The audit event is written to the `Server.Audit.Logs` event
   artifact.

Events are recorded and can also be acted upon automatically with a
server event query using the `watch_monitoring()` plugin.

You can forward server event logs to a remote syslog server by setting
the value in the
[Logging.remote_syslog_server](/docs/deployment/references/#Logging.remote_syslog_server)
setting in the config. For details on syslog forwarding configuration,
see the [Server Logging](/docs/deployment/logging/#syslog-forwarding)
page. We recommend setting this up to archive audit logs.

Velociraptor treats server audit events as another event query called
`Server.Audit.Logs`, so you can view it as another server event
artifact in the interface.

![Viewing server audit logs](viewing_audit_logs.png)

The audit event is divided into fixed fields (`ServerTime`,
`operation` and `principal`) and a variable column `details` with
per-event data.

Because the data is recorded as a timed artifact, you can apply
filtering in the notebook. The following query isolates administrator
actions within the time of interest.

![Querying audit logs within the Velociraptor GUI](querying_audit_logs.png)

You can also forward audit events to external systems. For example,
`Elastic.Events.Upload` can forward audit events to Elastic, while
`Server.Alerts.Notification` can forward these to a Slack channel.

### Authenticating the user

Users can authenticate in several ways, including Active Directory,
client certificates, and multi-factor authentication. Velociraptor
offers a number of `authenticators` to allow flexibility when
authenticating users.

#### Basic authentication

`Basic` authentication requires the user to provide a username and
password using HTTP Basic authentication. While these credentials are
typically encrypted in transit using HTTPS, basic authentication is
not considered secure and should be avoided because Velociraptor has
to manage the passwords.

Velociraptor stores the password hashes and salts in the filestore for
each user and verifies them on each HTTP request.

When basic authentication is configured, a user can update their own
password using the GUI

![Updating a user's own password](updating_own_password.png)

Sometimes administrators need to update another user's password. This
can be done from the user management screen.

![Updating another user's password](updating_user_password.png)

Password management is deliberately limited in scope, because
production servers should use an external authentication service, such
as OIDC.

> [!WARNING] Org separation with Basic authentication
> When using Basic authentication, any Velociraptor admin can reset any
> user's password, regardless of whether the user "belongs" in their
> org (administrators for a child org can add any user to their org).
> Basic authentication cannot be used in environments that
> require strong org user separation with untrusted child org
> administrators.

Passwords enforced through `Basic` authentication are salted and
hashed with SHA-256 once per HTTP request for speed. Use this only for
lab or short-lived evaluation systems. Attackers who steal the hashed
credentials from backing storage can brute-force common passwords
offline much faster than with a dedicated password hash. Production
deployments, especially internet-facing servers, belong behind OIDC,
OAuth2, SAML, or another enterprise identity provider, as described
under [OAuth2 and OIDC services](#oauth2-and-oidc-services).

#### OAuth2 and OIDC services

Velociraptor supports modern authentication frameworks like OAuth and
OIDC and supports all major Identity Providers (IDP). By using an
external IDP, the task of managing users, passwords, two factor etc is
shifted to the IDP itself - thereby relieving Velociraptor from this
responsibility.

You can read more about setting up [GitHub, Azure and Google](/blog/2020/2020-08-17-velociraptor-sso-authentication-6dd68d46dccf/) as an OAuth2 provider.


### Lockdown mode

Many users use Velociraptor for incident response purposes and
collecting telemetry. While it is convenient to have Velociraptor
already deployed and active in the environment, this may increase the
risk for misuse when not used for response.

For this purpose Velociraptor has a "lockdown mode". This mode
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

```yaml {filename="server.config.yaml"}
lockdown: true
```

Therefore it will still be possible to read existing collections, and
continue collecting client monitoring data but not edit artifacts or
start new hunts or collections.

During an active IR the server may be taken out of lockdown by
removing the directive from the configuration file and restarting the
service. Usually the configuration file is only writable by root and
the Velociraptor server process is running as a low-privilege account
which cannot write to the config file. This combination makes it
difficult for a compromised Velociraptor administrator account to
remove the lockdown and use Velociraptor as a lateral movement
vehicle.

### API client security

Because the API allows external programs to run powerful Velociraptor
Query Language (VQL) queries directly on your server, a poorly
configured or compromised API client is a major security risk.

#### IP-based access control

By default, the API server listens only on 127.0.0.1, which lets
scripts on the local machine call the API. To use an external caller,
change the server's configuration file.
by setting the bind_address field under the API section to 0.0.0.0
allowing the API to bind on all interfaces.

See
[Protecting the API](/docs/server_automation/server_api/#protecting-the-api)
for more information.

#### Authentication

API clients authenticate using mTLS and their own key, which is issued
to them by the built-in CA. This operates independently of the
authentication methods you have set up for your users. The API
client's authentication credentials are stored in a plain text file
which needs to be tightly guarded, however the keys in such files can
be passphrase-secured.

API client certificates are **valid for one year**, by default. You
must reissue them before they expire to avoid breaking your automation
pipelines.

**Encrypt Private Keys**: When generating an API config using
`velociraptor config api_client` it is possible to set a
password/passphrase to encrypt the private key. This ensures that if
the config file is stolen, it cannot be used without the passphrase.
However, this is not useful for credentials used by automated API
clients because unlocking the key is a user-interactive process. For
interactive API access (for example when using the API client that's
included in the Velociraptor binary) where the API config might reside
on a laptop, we recommend that you secure the key this way.

**Offline CA**: For high-security environments, keep your CA private
key offline, which usually means keeping an offline copy of the full
config with the CA key included in it, while removing the CA key from
the config on your production server. This prevents an attacker who
gains root on the Velociraptor server from being able to mint their
own valid API keys. You can issue new API keys if you have the full
offline config - access to the production server is not required,
although you will also need to provision the new user on the server
and grant it access.

##### Instant revocation

If an API key is compromised, or suspected to be compromised, you
don't need to struggle with complex certificate revocation lists
(CRLs). Simply use the `acl grant` command to set an empty policy for
that principal.

```sh
velociraptor acl grant --name "CompromisedKey" --role ""
```

This immediately strips all permissions, denying that user the
ability to make API calls. Any applications using that API user
must be configured to use a new account with a new key.

API client accounts can alternatively have their roles and permissions
revoked in the **User Management** screen.

Leaving the user account in place with no roles assigned is still
risky, because someone could accidentally grant permissions to it.

To permanently delete the user, run the
[user_delete()](/vql_reference/server/user_delete/)
function in a notebook. There is no interface option to delete a
user.

#### Authorization

The API Client role (`api`) is mandatory for API access. Every
programmatic connection requires this role as a baseline. Without it,
even a user with full administrator privileges gets a "permission
denied" error when connecting through the API port. Think of it as the
passport that gets you through the API door.

The client also needs permissions (usually assigned through the
predefined roles) to do its work.

##### Apply the principle of least privilege

It is tempting to grant your API clients the `administrator` role to
"just make it work," but this is a dangerous shortcut. An API key
with admin rights is effectively `root` on your entire server.

Instead, evaluate exactly what the script needs to do and choose the
appropriate "least privilege" role or permissions set:
- Need to read results for a dashboard? Use the `reader` role.
- Need to perform data analysis or post-processing? Use the `analyst`
  role.
- Need to trigger specific collections? Use the `investigator` role.

##### Beware of admin-equivalent permissions

Some permissions are more dangerous than they might appear because
they provide a path to full server control:
- `ARTIFACT_WRITER`: This role allows a user to edit artifact
  definitions. Since VQL runs unrestricted on endpoints, an artifact
  writer effectively has root access to every client on your network.
- `EXECVE`: This permission allows the execution of arbitrary shell
  commands on clients or the server (subject to
  [additional restrictions](/docs/deployment/security/#accessing-files-from-vql)
  that are in place by default). It is typically reserved for
  administrators because it can be easily misused.
- `FILESYSTEM_WRITE`: On the server side, this allows creating files,
  which can be used to overwrite ACL objects and escalate privileges.

##### Use wrapper artifacts and impersonation

To manage security, avoid giving raw, dangerous permissions to users
or API clients. Instead, create a wrapper artifact. For example,
instead of giving an artifact `EXECVE` access to run any command, write
a custom artifact
[that only runs a specific, safe command](/docs/artifacts/security/#controlling-access-to-client-artifacts)
(like `ipconfig`) with hard-coded arguments. You can then
[mark this artifact as "basic"](/docs/artifacts/security/#basic-artifacts),
which lets a lower-privilege API client run it.

You can use
[the impersonation field](/docs/artifacts/security/#server-artifacts-and-impersonation).
The impersonation field lets an artifact run with the privileges of a
different user (like sudo for VQL), so a low-privilege API client can
perform a specific high-privilege task in a controlled, audited way.

### Preventing new client enrollments

By default, new clients can enroll at any time if they have a valid
client configuration file. Normally this is what you'd want because
you may be using a client distribution method that provides ongoing
deployment of new clients.

In some circumstances you may wish to suspend client deployment. For
example, if you have decided that all intended clients are deployed
and that your deployment phase is over then you may choose to switch
to a more strict deployment process to ensure that rogue clients
cannot be enrolled. This is unusual but in high-security environments
it may be a requirement.

By "rogue client" we mean any client deployed outside an approved
process, regardless of whether the intention is benign. For example,
you might want to ensure that the IT department does not accidentally
deploy new clients beyond a certain point.

To ensure that no new clients can enroll, set the value of the
[`Frontend.resources.enrollments_per_second`](/docs/deployment/references/#Frontend.resources.enrollments_per_second)
configuration key to `-1`.

As with all server config changes, this requires a service restart. To
reverse this policy, either remove the config key or comment it out to
resume accepting client enrollments.

### Protecting stored secrets

Server-side [secret
management](/blog/2024/2024-03-10-release-notes-0.72/#secret-management)
keeps API tokens, credentials, and webhook material out of raw
artifacts. At rest the material is encrypted using the key described
by
[`security.secrets_dek`](/docs/deployment/references/#security.secrets_dek).

If you leave `secrets_dek` empty, the server falls back to deriving
keying material from the
[`obfuscation_nonce`](/docs/deployment/references/#obfuscation_nonce)
(which itself defaults to data tied to the frontend private key
material). **Attackers who steal the configuration file alongside the
cipher text can recover the encryption key**, because both
live in the same configuration bundle. Treat that default as a
convenience for ephemeral labs only.

For hardened deployments:

* Supply `secrets_dek` through an indirection such as
  `env://SENSITIVE_DEK` and inject that environment variable from your
  init system, container orchestrator, or secret manager.

* Consider bootstrapping the daemon with the YAML itself provided
  through a process environment (for example `VELOCIRAPTOR_CONFIG`),
  then use
  [`security.shadowed_env_vars`](/docs/deployment/references/#security.shadowed_env_vars)
  to strip privileged variables from VQL's view.

### Removing plugins from a shared server

While Velociraptor allows user to run arbitrary VQL in notebooks it
does control access to the things that the queries can do by applying
a user's ACL token to each plugin.

This means that administrators are typically allowed to run all
plugins, even those that might compromise the server (for example, the
`execve()` plugin can run arbitrary shell commands).

For shared server environments it is better to prevent these plugins
from running at all, even for administrators.

Velociraptor allows the configuration file to specify which VQL
plugins are allowed using the
[security.allowed_plugins](/docs/deployment/references/#security.allowed_plugins),
[security.allowed_functions](/docs/deployment/references/#security.allowed_functions),
and
[security.allowed_accessors](/docs/deployment/references/#security.allowed_accessors).

To populate these, answer Yes to **Do you want to restrict VQL
functionality on the server?** in the configuration wizard. This
implements the
[default allow list](https://github.com/Velocidex/velociraptor/blob/master/tools/survey/allowlist.go),
which you can modify later as required.

If these lists are populated, only the listed plugins are registered at
all. If a plugin is not in the list, the server returns the error
`Plugin Info Not Found` when the plugin is used.

This security measure removes functionality from the server,
regardless of the permissions model. It is only needed when the server
is shared between potentially untrusted users. You should usually not
implement this, because it causes functionality to break
unpredictably. For example, any artifact that depends on a plugin not
in the allow list will fail.

## Securing VQL

Velociraptor uses VQL extensively in the form of
[artifacts](/docs/artifacts/) and
[notebooks](/docs/notebooks/).
Since a VQL query can do many potentially dangerous actions, it is
important to restrict the type of actions the query can perform based
on the user's ACL token. When the VQL query is started, the user's ACL
token is loaded into the query environment. As the query continues
executing, various VQL plugins and functions are evaluated by the VQL
engine. VQL plugins and functions may have requirements as to the type
of permission required to run. You can see the required permission for
each plugin in the [VQL reference](/vql_reference/) page.

![Example VQL reference showing required permissions](vql_reference.png)

This mechanism lets low-privilege users run VQL safely. Actions that
require permissions the user does not have are ignored, and a log
message is emitted.

ACL checks are always enforced on the server, for example in notebooks
and server artifacts. A user with the `Analyst` role has no
`FILESYSTEM_READ` permission, so if they try to run a `glob()`-based
query in a notebook, they are denied.

![Permission denied error in the notebook](notebook_permission_denied.png)

### Controlling access to artifacts

While ACL checks are enforced on the server, on the client all ACL
checks are disabled. This means that as long as a user is able to
schedule the collection on the client, the collection can do anything
at all. This makes sense as we want the VQL to be evaluated the same
way regardless of who launched the collection in the first place.

However this may give lower privilege users a lot of power over the
entire network. For example the artifact
[Windows.System.PowerShell](/artifact_references/pages/windows.system.powershell/) allows
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

This field specifies that the server checks the user has all the
required permissions before it lets the artifact be scheduled. If a
user with the `Investigator` role tries to launch this artifact, they
are denied because they usually lack the `EXECVE` permission.

![Permission denied launching a powerful artifact](launch_artifact_permission_denied.png)

Typically you set `required_permissions` on client artifacts that can
do dangerous things if misused, particularly when an artifact parameter
can specify arbitrary code.

> [!TIP] Delegating artifact permissions
> The `required_permissions` check is only done on the artifact being
> launched. It does not apply to dependent artifacts called from the
> launched artifact. This is deliberate: it lets you create curated,
> safe versions of dangerous artifacts for low-privilege users. For
> example, while `Windows.System.PowerShell` requires the `EXECVE`
> permission because its parameter allows arbitrary
> commands to run, you can wrap it with a safe version:
>
> ```yaml
> name: Custom.SafePowershellDir
> sources:
>   - query: |
>         SELECT * FROM Artifact.Windows.System.PowerShell(Command="dir C:/")
> ```
>
> This artifact cannot be misused, because the command passed to
> `Windows.System.PowerShell` is a fixed string that the user
> initiating the collection cannot change.


## Managing org access

Velociraptor provides ACL separation to users based on an org (or
tenant) model. This means the same user may have different ACLs in
different orgs - they may only have read access in one org and full
admin access in another org.

While this is convenient, it is not enough to provide complete
separation to untrusted users.

If an untrusted user has access to one org but does not have access to
another, there are several ways a user can read or modify
data in the other org:

> [!WARNING] SAML/OIDC auto-role assignment applies to all orgs
> When you configure SAML or OIDC to automatically assign roles via
> `saml_user_roles` or `claims.roles`, those roles are granted in
> **every org** on the server, not just the org the user initially
> authenticates into. There is no way to scope SAML/OIDC
> role assignment to a subset of orgs.
>
> If your deployment uses orgs for multi-tenant isolation (for example
> MSSP deployments where orgs represent different customers), be aware
> that SAML/OIDC auto-role assignment bypasses that isolation. A user
> authenticated via SAML/OIDC receives roles in all orgs
> automatically.
>
> To avoid unintended cross-org access, either:
>
> - Manage user roles manually through the GUI instead of using
>   SAML/OIDC auto-role assignment.
> - Use separate Velociraptor instances for each tenant if true
>   data isolation is required.

### Shelling out

By default, users have access to the `execve()` plugin provided they
have the `EXECVE` permission (normally given to administrators). This
lets an administrator in one org run arbitrary code on the
server, which may let them read the file store of another org.

You can disable the `execve()` plugin in the
[configuration file](/docs/deployment/references/#security.denied_plugins).

```yaml {filename="server.config.yaml"}
security:
  denied_plugins:
      - execve
```

### Accessing files from VQL

Velociraptor's data ultimately lives within the datastore directory
on disk. Although Velociraptor's ACL system controls access to
high-level objects such as flows, secrets, and clients, VQL queries
can bypass these controls by reading the data directly from disk.

Users can run queries in notebooks or server artifacts that reach
these files through two different
[accessors](/docs/forensic/filesystem/#filesystem-accessors):

| Accessor | Typical use | Controlled by |
|---|---|---|
| `file` | Native OS paths on the server host | [`security.denied_file_accessor_prefix`](/docs/deployment/references/#security.denied_file_accessor_prefix), [`security.allowed_file_accessor_prefix`](/docs/deployment/references/#security.allowed_file_accessor_prefix) |
| `fs` | Logical Velociraptor paths (notebooks, flows, hunts, uploads, secrets area, …) | [`security.denied_fs_accessor_prefix`](/docs/deployment/references/#security.denied_fs_accessor_prefix), [`security.allowed_fs_accessor_prefix`](/docs/deployment/references/#security.allowed_fs_accessor_prefix) |

Prefixes for one accessor never apply to the other: use the
**`_file_accessor_`** keys to control access via the `file` accessor and
**`_fs_accessor_`** keys to control access via the `fs` accessor.

To test your settings, an Administrator can probe the datastore from a
notebook via these queries:

```vql
SELECT * FROM glob(globs="/**", accessor="file")
SELECT * FROM glob(globs="/*", accessor="fs")
```

The prefixes which are filtered out will be removed from the
output. Using the `fs` accessor also requires `SERVER_ADMIN`; that
filtering happens in addition to this requirement.

By default, the `fs` accessor is denied access to [some filestore
prefixes](https://github.com/Velocidex/velociraptor/blob/bb0fb04b128f791e2fb74b1008b9b7700f952e0b/services/sanity/security.go#L76),
which are considered sensitive.

> [!WARNING] Replace semantics
> When you set `security.denied_fs_accessor_prefix` in your config,
> the specified list **replaces** the default deny list entirely.
> It does not merge with it. The built-in defaults are:
> `acl`, `backups`, `config`, `orgs`, `secrets`, `users`.
> To preserve them while adding custom prefixes, you must include
> all of them explicitly in your list. This replace-on-write
> behavior applies to all list-type security settings in
> Velociraptor.

However, Velociraptor's ACL policies mean that any user with the
`READ_RESULTS` permission can read any client's data within the same
org (see the discussion in [GUI users](#gui-users)).

Because org directories sit on filesystem paths, anyone with
unrestricted access to the `file` accessor can pivot around ACL
boundaries. For example:

```vql
SELECT * FROM glob(globs="/opt/velociraptor/orgs/**", accessor="file")
```

In the default configuration, no restrictions are imposed on the
`file` accessor, so users can access any file on the server's
filesystem (for example, for post-processing or running external
tools).

Tune
[`security.denied_file_accessor_prefix`](/docs/deployment/references/#security.denied_file_accessor_prefix)
for your mounting layout, for example by blocking the datastore root
plus global pseudo filesystems (`/proc/`, `/sys/`).

```yaml {filename="server.config.yaml"}
security:
  denied_file_accessor_prefix:
      - /opt/velociraptor/
      - /etc/
      - /proc/
```

> [!TIP] How do the denied and allowed sets interact?
> * If only the allowed set is specified, Velociraptor denies any prefix
>   outside the allowed set.
> * If only the denied set is specified, Velociraptor denies any prefix
>   within the denied set, but allows other prefixes.
> * If both are specified, Velociraptor denies any file within the
>   denied set unless it also matches the allowed set.
>
> Other accessors (`ext4`, `ntfs`, raw disk plugins, archive mounts, and
> so on) may still expose underlying blocks when the daemon runs with
> root privileges. Running Velociraptor on Linux as a dedicated
> low-privilege user avoids the risk of accessing the disk directly to
> bypass ACLs and denied paths.


> [!WARNING] `http_client()`, Unix sockets, and server ACLs
> The VQL `http_client()` plugin understands URLs like
> `/var/run/docker.sock:unix/v1/version`, which relays HTTP traffic
> over local Unix domain sockets. This is useful for communicating
> with some servers, such as Docker.
>
> This may also pose a risk in shared environments. Administrators who
> can run unrestricted notebook queries (and hold the required
> `NETWORK` permission) can interact directly with anything listening
> on a socket, for example orchestration APIs commonly reachable
> through `/run/docker.sock`, `/run/podman/podman.sock`, or
> `/run/containerd/containerd.sock`.
>
> The plugin also understands `file://` and `smb://` URLs.
> `file://` URLs are read through the `file` accessor, so the
> `security.allowed_file_accessor_prefix` and
> `security.denied_file_accessor_prefix` settings still apply.
> `smb://` URLs connect to a remote file share using the credentials
> embedded in the URL.
>
> To harden access to the `http_client()` plugin, consider these
> approaches:
> [artifact curated permissions](#controlling-access-to-artifacts),
> [removing plugins](#removing-plugins-from-a-shared-server),
> [`security.denied_plugins`](/docs/deployment/references/#security.denied_plugins),
> [`security.vql_must_use_secrets`](/docs/deployment/references/#security.vql_must_use_secrets),
> and tight role hygiene so only trusted principals obtain those
> capabilities.

In summary, restricting user access to different orgs is best effort.
Isolating an untrusted user from other orgs requires careful
configuration. Avoid giving untrusted and potentially malicious users
access to the Velociraptor GUI at all.

If you need true data isolation between orgs, we recommend running a
separate Velociraptor instance (Virtual Machine or container) for each
unique deployment.

### Accessing process environment from VQL

The VQL `environ()` plugin provides access to the server's environment
strings. In many environments, these contain sensitive secrets. For
example, Velociraptor's configuration file (which contains private
keys) may be injected via the `VELOCIRAPTOR_CONFIG` environment
variable into a container. In some deployments, environment variables
may also contain sensitive information like S3 access tokens and other
API tokens.

To access environment variables, the calling user needs the
`MACHINE_STATE` permission (normally only given to the `administrator`
role).

For secure deployments, also add other sensitive environment variables
to the
[`security.shadowed_env_vars`](/docs/deployment/references/#security.shadowed_env_vars)
configuration (Velociraptor's own environment variables are added
automatically).

### The root org

The root org is more privileged than other orgs. Giving a user access
to this org allows them to affect other orgs. For example, any custom
artifact created in the root org will be visible to all other orgs.

You should only give trusted users access to the root org.
