# How to set up authentication using Google OAuth SSO

This guide walks you through the configuration of Google OAuth SSO as an
authentication provider. This requires a user to authenticate via Google
Workspace using it's associated authentication policy. For example if 2-factor
authentication is required then users will need to satisfy this requirement.

Once the user authenticates to Google, they are redirected back into the
Velociraptor application with a token that allows the application to request
information about the user (for example, the username or email address).

## Before You Begin

Please note the following requirements:

* Your Velociraptor server must have a valid SSL certificate already issued and
  configured. This can be a certificate issued by Let's Encrypt or another
  public CA.

* Google restricts OAuth 2.0 applications to using Authorized Domains. According
  to Google:
  > To use a domain as an authorized domain for OAuth, it must be a "top private
  > domain", which is the domain component available for registration on a
  > public suffix, such as the domain before the .com, .net, or .biz, or similar
  > top-level domains. Subdomains are controlled by the parent domain and are
  > not considered top private domains.
  >
  > For example, if your application home page is
  > https://sub.example.com/product, you would need to verify ownership of the
  > example.com domain. This verification is necessary to ensure the security and
  > trustworthiness of the application.



### Registering Velociraptor as an OAuth application

Before using Google to authenticate, you need to register your Velociraptor
deployment as an OAuth App with Google. You register Velociraptor as an OAuth
app by accessing the Google cloud console at https://console.cloud.google.com.
You must set up a cloud account and create a cloud project even if you do not
host your server on Google's Cloud Platform.

The ultimate goal of this step is to obtain OAuth credentials that will be used
in the Velociraptor configuration, but there are a few things set up first.

Navigate to `APIs and Services` in the GCP console and select `Credentials` and
the `OAuth Consent Screen` tab.

![Creating application credentials](sso11.png)

Further down the page you need to provide an authorized domain.

![Authorizing domains](sso12.png)

In order to add an Authorized Domain you need to *verify it*. Google's help pages
[explain it further](https://developers.google.com/identity/protocols/oauth2/production-readiness/brand-verification#authorized-domains).


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

If all goes well the Google Cloud Console will give us a client ID and
a client secret.

### Generating configuration

To generate a server config file run the `config generate` command to invoke the
configuration wizard:

```sh
velociraptor config generate -i
```

![Select SSO deployment type](config1.png)

![Select Google as authentication provider](config2.png)

![Enter OAuth credentials](config3.png)

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



Tags: #configuration #sso #deployment