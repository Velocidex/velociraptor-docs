# Adding basic authentication to the HTTP secret

The `http_client()` plugin can use a [server
secret](/docs/gui/#server-secrets) to control access to sensitive
information.

Sometimes the target URL requires login information in the way of
`HTTP Basic Authentication`. This type of authentication is delivered
via a HTTP header.

Velociraptor's interface does not have special handling for basic
authentication when it comes to adding a secret. Instead, Velociraptor
allows the secret to define a HTTP header. Sometimes the header
carried a bearer token or other special sensitive data.

To encode a http basic authentication in the GUI's secret interface,
simply use the console dev tools to calculate the required header
(e.g. in Chrome, type Ctrl+Shift+I or select `More tools/Developer
Mode`)

![Specifying a Basic Login to the HTTP secret](http_secret.svg)

Then paste the header into the secrets interface.

{{% notice warning "Do not paste credentials into third party websites" %}}

Using the dev console ensures that the javascript is running in a
trusted browser tab. Do not use third party sites offering to
calculate the credentials.

{{% /notice %}}

Tags: #secrets #configuration
