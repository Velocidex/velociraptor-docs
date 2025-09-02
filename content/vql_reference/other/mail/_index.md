---
title: mail
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## mail
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
to|Recipient of the mail|list of string (required)
from|The from email address.|string
cc|A cc for the mail|list of string
subject|The subject.|string
body|The body of the mail.|string (required)
period|How long to wait before sending the next mail - help to throttle mails.|int64
server_port|The SMTP server port to use (default 587).|uint64
server|The SMTP server to use (if not specified we try the config file).|string
auth_username|The SMTP username we authenticate to the server.|string
auth_password|The SMTP username password we use to authenticate to the server.|string
skip_verify|Skip SSL verification(default: False).|bool
root_ca|As a better alternative to disable_ssl_security, allows root ca certs to be added here.|string
secret|Alternatively use a secret from the secrets service. Secret must be of type 'SMTP Creds'|string
headers|A dict of headers to send.|ordereddict.Dict

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">NETWORK</span>

### Description

Send Email to a remote server.

This function will send an email to a remote SMTP server. The mail
will be sent using SMTP with TLS and authentication.

Mails will be globally rate limited (among all queries) to the
specified period (default 60 seconds) to prevent overloading the
SMTP server. For this reason it is not suitable as a way to send
high number of events - use it sparingly to notify on some rare
events.

You can either fill in the auth_username and auth_password
parameters directly or use the secrets service to encapsulate
secrets in a managed way.

You can set any headers needed - for example to send HTML email
set the `Content-Type` to "text/html"

### Example

```vql
SELECT mail(secret="gmail",
            subject="Hello from Velociraptor",
            to="user@example.com",
            headers=dict(`Content-Type`="text/html"),
            body="<h1>Good morning</h1><p>From Velociraptor")
FROM scope()
```


