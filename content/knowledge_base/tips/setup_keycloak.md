# How to set up OIDC authentication using Keycloak

This guide walks you through the configuration of
[Keycloak](https://www.keycloak.org/) as an OIDC authentication provider for
Velociraptor.

Keycloak, as a self-hosted, free, and open source solution, may be an attractive
choice for Velociraptor deployments where using cloud-based and/or commercial
providers is not practical or possible. Most of the steps shown here would be
the same or similar for other self-hosted OIDC solutions (for example Zitadel or
Authentik), so it may be useful even if you are not using Keycloak.

{{% notice warning "Production deployment of Keycloak" %}}

Keycloak is a Java application which can be installed manually or deployed via
several officially documented container-based methods. This guide partly mirrors Keycloak's
[Getting started guide](https://www.keycloak.org/getting-started/getting-started-docker)
which uses Docker to create a _"development mode" instance_ of Keycloak. This
method starts a working Keycloak instance but does not create a persistent
database or a production-ready secured server, since the goal here is only to
demonstrate the integration with Velociraptor.

For production-ready deployment guidance we refer you to
[Configuring Keycloak for production](https://www.keycloak.org/server/configuration-production)
and the official [Keycloak documentation](https://www.keycloak.org/documentation).

{{% /notice %}}

As mentioned above, the goal of this guide is to demonstrate a working SSO
configuration for Velociraptor using Keycloak. The basic steps and configuration
will be very similar or even identical for production deployments however some
of the steps shown here are deliberately over-simplified for reasons of brevity
and therefore do not reflect security best practices. Also Keycloak has a vast
array of options and capabilities, which we recommend you explore later, but the
intention here is to get up and running with a basic working integration since
it is better to start simple and be sure that it's working as expected before
possibly adding complexity to it.

In this simplified setup we have two hosts, with DNS names `keycloak.local` and
`velociraptor.local`. Substitute your DNS names where applicable. The two hosts
don't need to be on the same network but the Velociraptor host needs to be able
to DNS-resolve the name of the Keycloak server and reach it on port 443. It's
not necessary that the Keycloak server be able to resolve the Velociraptor
server's DNS name but your server probably already has a DNS name already so
that clients can connect to it.

![Network overview](network_overview.svg)

The high-level steps of this setup process are:

1. Create a self-hosted Docker-based Keycloak instance.
2. Configure an authentication realm, OIDC client and test users in Keycloak.
3. Configure the authentication provider in Velociraptor.
4. Add test users to Velociraptor.
5. Test the authentication process.


## Create a Docker-based Keycloak instance

We assume that Docker has already been installed and configured on the
designated Keycloak host. We aren't going to use Docker Compose but for
production deployment you might prefer to do so, and example configurations can
be found on the internet.

Before we install Keycloak we are going to need a certificate for it to use. Here
we will generate a simple self-signed cert with corresponding private key but ideally in
production you would have a cert signed by a trusted CA.

**1. Generate a key pair**

```sh
# Create keycloak-server.crt.pem and keycloak-server.key.pem
openssl req -newkey rsa:2048 -nodes -subj "/CN=keycloak.local" \
-addext "subjectAltName=DNS:keycloak.local,IP:192.168.56.1" \
-keyout keycloak-server.key.pem -x509 -days 3650 -out keycloak-server.crt.pem
# Set appropriate permissions on files
chmod -R 644 keycloak-server*
```

NOTE: The certificate SAN is required by Velociraptor. If not present you will receive
this error when trying to start Velociraptor.\
`error: gui: starting frontend: Get "https://keycloak.local/.well-known/openid-configuration": x509: certificate relies on legacy Common Name field, use SANs instead`\
Putting the IP in the SAN is not really necessary but helpful if you need to
connect to Keycloak's admin page using it's IP.

Now that we have the key pair we can run Docker which will pull the latest
Keycloak image (26.0.7 at the time of writing).

**2. Run the Docker command.**

```sh
docker run -p 443:443 -e KC_HOSTNAME=keycloak.local \
-e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
-v /root/keycloak-server.crt.pem:/etc/x509/https/keycloak-server.crt.pem \
-v /root/keycloak-server.key.pem:/etc/x509/https/keycloak-server.key.pem \
-e KC_HTTPS_CERTIFICATE_FILE=/etc/x509/https/keycloak-server.crt.pem \
-e KC_HTTPS_CERTIFICATE_KEY_FILE=/etc/x509/https/keycloak-server.key.pem \
quay.io/keycloak/keycloak:latest start-dev --https-port=443
```

We set various Keycloak config options as Docker environment variables and
make the cert and private key available inside the Docker using volume mapping.

If the Docker fails to start, you should inspect the command output for errors.
If successful it should report
`Listening on: http://0.0.0.0:8080 and https://0.0.0.0:443`.

The KC_BOOTSTRAP* variables create an initial user `admin` with password
`admin` which we use to configure Keycloak in the next section.

## Configure Keycloak

Next we go through the steps that are almost the same as described in Keycloak's
[Getting started guide](https://www.keycloak.org/getting-started/getting-started-docker).

Connect to Keycloak's Admin Console (in this case: https://keycloak.local) and
log in with the `admin` user.

**3. Create an authentication realm**

![](keycloak00.png)

You can use any name for the realm but here we are going to just use `myrealm`
for convenience.

![](keycloak01.png)

Click **Create**.

**4. Create OIDC client configuration for Velociraptor**

In this step we create a new client record and client secret which we will use
later in the Velociraptor configuration. In the realm selection drop-down ensure
that you are in the new `myrealm` realm.

In the sidebar select **Clients** and then select **Create client**.

![](keycloak02.png)

This will start a 3-page configuration wizard. On the first page the **Client
ID** is all that's required. Enter `velociraptor` and click **Next**.

![](keycloak03.png)

On the second page, choose **Client authentication: ON** and
**Authentication flow: Standard flow** (only). Then click **Next**.

![](keycloak04.png)

On the third page we use the following values (adapt to your DNS names if your
are replicating the setup in your own environment):

- Valid redirect URIs: `https://velociraptor.local:8889/auth/oidc/keycloak/callback`
- Valid post logout redirect URIs:
  `https://velociraptor.local:8889/app/logoff.html`
- Web origins: `https://velociraptor.local`

![](keycloak05.png)

Then click **Save**. Your OIDC client configuration is now created.

On the page that follows, go to the **Credentials** tab. There you will find the
**Client secret** which you will need for your Velociraptor configuration. It is
randomly generated and you can regenerate it if desired, but if you do so then
don't forget to update your Velociraptor server's config with the new secret.
Typically you would only regenerate it if you suspected a compromised secret.

![](keycloak06.png)

The next action is to configure email addresses as login usernames. To do that
navigate via the sidebar to **Realm settings** > **Login** tab. Ensure that
**Email as username** and **Login with email** are enabled. The additional user
preferences shown in the following screenshot are optional and in your case
would be determined by your organizational policies.

![](keycloak08.png)

The last action in this step is to configure the required actions for
authentication so that users don't have to enter additional information when
they first log in.
Navigate via the sidebar to **Authentication** > **Required actions** tab.
Disable all options except **Update password**.

**5. Create test users**

We will need at least one user account to test the authentication. From the
sidebar select **Users** and then click the **Create new user** button.

![](keycloak07.png)

For the user account I am going to create one named `bob@local`. Remember that
we previously enabled **Email as username** and **Login with email**, so all
other fields are optional. I also selected **Email verified** to avoid an email
verification step when logging in.

![](keycloak09.png)

After creating the account, go to the Credentials tab and set a password. Note
that we leave **Temporary:ON** set so that the password must be changed on first
logon. Note also that this is a simplified demonstration so for that reason
we're ONLY using password auth while Keycloak easily supports multi-factor
authentication.

![](keycloak10.png)

Repeat the user creation actions to also create a user account
`fred@local`.

![](keycloak11.png)

Now we are ready to move to configuring the Velociraptor side of things.

## Configure Velociraptor

{{% notice tip %}}

While configuring, testing and potentially troubleshooting problems, it's
easier if you can see Velociraptor's log messages. You can stop the server
service and then run the server manually on the command line by using the
following commands:

```bash
sudo systemctl stop velociraptor_server
sudo -u velociraptor bash
velociraptor -c /etc/velociraptor/server.config.yaml frontend -v
```

This will display the log messages in the terminal.

{{% /notice %}}

**6. Add the authenticator settings to your Velciraptor config**

In the `GUI` section of your Velociraptor config you should have the following
authenticator settings by default:

```yaml
  authenticator:
    type: Basic
```

We no longer want Basic auth and instead want SSO, so replace that with these
new settings to match our Keycloak configuration:

```yaml
    type: oidc
    oidc_issuer: https://keycloak.local/realms/myrealm
    oidc_name: keycloak
    avatar: https://www.keycloak.org/resources/images/logo.svg
    oauth_client_id: velociraptor
    oauth_client_secret: p4EABoniopnasbrmstDnsHrQcSukNmp2
```

The `oauth_client_secret` is the value we obtained at the end of step 4. The
`oauth_client_id` is the name we used for the OIDC Client ID in that same
section.

The `oidc_name` can be anything you want but it must exactly match
(case-sensitive) the substring used in the **Valid redirect URIs** field of the
client configuration in Keycloak.

Keycloak requires that the `oidc_issuer` field specify the path
`/realms/myrealm` as this is where is serves the OpenID Endpoint Configuration
that Velociraptor will need to access. If you have somehow gotten this wrong
then Velociraptor will log an error such as:
`[ERROR] can not get information from OIDC provider, check https://keycloak.local/.well-known/openid-configuration is correct and accessible from the server.`

Before you start Velociraptor, if you are using a self-signed cert for Keycloak
then also attend to the next step.

**7. Copy the Keycloak server cert to the trusted root store.**

Because the Keycloak server is using a certificate that wasn't issued by a
trusted CA, we need to add it's certificate to the trusted root store on the
Velociraptor server. Assuming your server is Ubuntu or similar this means saving
a copy of the certificate to `/etc/ssl/certs`.

Without this step you will see this error in the log when attempting to start
Velociraptor:
`error: gui: starting frontend: Get "https://keycloak.local/...": x509: certificate signed by unknown authority (possibly because of "crypto/rsa: verification error" while trying to verify candidate authority certificate "keycloak.local")`

**8. Start Velociraptor**

The server should now start cleanly and continue running. In the log messages
you should see `GUI will use the oidc authenticator`. That means everything is
OK with the authenticator config.

One possible gotcha is if the server's `GUI.public_url` setting is still using
an IP address or if `GUI.bind_address` is not set to `0.0.0.0` then you may get
stopped with the error:
`error: gui: starting frontend: Authentication type 'oidc' requires valid public_url parameter`

In this case the `GUI.public_url` is set to `https://velociraptor.local:8889/`.


## Add test users

We have created 2 users in Keycloak but these users don't yet exist in
Velociraptor. Velociraptor has it's own permissions model and therefore needs to
know about any users so that once they authenticate the correct permissions can
be applied.

Users can be created using VQL in Velociraptor notebooks but since we have now
switched authentication providers we no longer have access to the GUI. Of course
we could have added the users before we switched but let's pretend we didn't and
instead do it from the command line.

We will make `bob@local` a server admin and grant `fred@local` the "reader"
role, which provides minimal access to Velociraptor's GUI. The following two
commands will create these users:

**9. Add users to the datastore**

```sh
velociraptor --config server.config.yaml user add --role administrator bob@local
velociraptor --config server.config.yaml user add --role reader fred@local
```

NOTE: We provide the `--config` flag so that this invocation of the velociraptor
binary knows which datastore to add the new users to. This can be done while the
server service is running or not running, but either way the service will need
to be restarted to update itself with the datastore changes.

Because of our OIDC authenticator config, when adding each user we will receive
an acknowledgement message saying
`"Authentication will occur via oidc - therefore no password needs to be set."`

## Test authentication process

Test the authentication process by going to `https://velociraptor.local:8889/`

You will be presented with the choice to log in with Keycloak (multiple
authentication providers are supported but we only have one configured).

![](auth00.png)

Enter initial credentials (password that was set in Keycloak).

![Login page](auth01.png)

You will be required to change the password because we configured
**Temporary:ON** when setting the account's password.

![Change the password](auth02.png)

![Successful login!](auth03.png)

![We can verify that the user has the server admin role.](auth04.png)

![We can sign out... and sign in again.](auth05.png)

The same process applies to `fred@local` except that we can verify in
Velociraptor that the user has the read-only role.

{{% notice tip %}}

For testing multiple users in the same web browser you may have trouble
fully logging a user out because while logged out of Velociraptor the OIDC
session is still active.

Logout of the OIDC session can be achieved by
navigating to the the endpoint
`https://keycloak.local/realms/myrealm/protocol/openid-connect/logout`
from within the same web browser and choosing to log out.

{{% /notice %}}

## What next?

Once you have the working authentication setup, as per this guide, then you can
begin experimenting with additional options while knowing that any change which
causes a negative effect can be reverted back to a known working state. This is
a much easier approach than diving in with a complex configuration and spending
hours troubleshooting why it doesn't work.

Since the Docker installation used in the guide is non-permanent it will reset
when you restart the docker VM. For testing and experimenting that's a good
thing as you gain familiarity by going through the process. As mentioned,
Keycloak supports multifactor authentication, complex authentication flow
options, themeable login screens, and many other cool features. However for
permanent configuration you will need to learn how to create a persistent
Keycloak database, possibly using a different deployment method.

Tags: #configuration #sso #deployment