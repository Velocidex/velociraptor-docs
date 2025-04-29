# How can I configure Velociraptor for multiple SSO providers

Velociraptor can be configured to use a single SSO provider using the usual configuration building wizard (see [Here](https://docs.velociraptor.app/docs/deployment/server/#configuring-google-oauth-sso)), but the wizard does not offer to configure multiple providers.

Sometimes we want to have multiple providers so we can allow users from another organization to be able to log into Velociraptor. To do this we need to configure the SSO authenticator manually in the configuration file.

Simply run `velociraptor config generate -i` and select the OAuth provider for the first provider. In the end your config file will have the following section where `oauth_client_id` and `oauth_client_secret` refer to the Google OAuth app you created:

```yaml
GUI:
  ... more settings ...
  authenticator:
    type: Google
    oauth_client_id: 12345.apps.googleusercontent.com
    oauth_client_secret: XYZ1234
```

To provide multiple authenticators, you will need to manually change to the `multi` authenticator type:
```yaml
GUI:
  ... more settings ...
  authenticator:
    type: multi
    sub_authenticators:
     - type: Google
       oauth_client_id: 12345.apps.googleusercontent.com
       oauth_client_secret: XYZ1234
     - type: Github
       oauth_client_id: 123456
       oauth_client_secret: 76521376523
     - type: oidc
       oidc_issuer: https://accounts.google.com
       oidc_name: Rapid7
       avatar: https://example.com/avatar.png
       oauth_client_id: XXXXX
       oauth_client_secret: AAAAA
```

Note that you can have multiple `OIDC` authenticators and each can have a separate name and an icon associated with it (e.g. if multiple organizations use separate Okta logins).

![Logging in with multiple providers](https://user-images.githubusercontent.com/3856546/160241517-c2bf85e5-7d5d-4d3b-ac24-b2bfbda5436b.png)

## Granting a user a role.

Velociraptor will trust any of the configured authenticators, to identify the user and based on the username, grant the user the appropriate roles on the Velociraptor server. You will need to grant the user a role either through the command line:

```
velociraptor user add --role administrator mike@gmail.comm
```

Or via a notebook cell:
```sql
SELECT user_create(user="mike@gmail.com", role="administrator")
FROM scope()
```

{{% notice warning "Trusting multiple providers" %}}

Be aware that trusting multiple identity providers can result in account hijack if a user can get an account of the same name on another provider. Velociraptor just uses the account name provided by the OAuth provider to grant access and does not keep track of which provider actually identified the user.

In simple terms, if a user has username "mike" on `OIDC` provider 1 and another user can get say a Github account for the user "mike", then the second user can impersonate the first user by logging in with the second provider.

{{% /notice %}}

Tags: #configuration #sso #deployment
