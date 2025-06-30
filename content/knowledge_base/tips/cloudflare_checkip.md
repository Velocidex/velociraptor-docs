# How do I configure check ip for Cloudflare Dynamic DNS?

## Problem

When deploying Dynamic DNS using Cloudflare in v0.74.3 I noticed an error and on
investigation found that the default lookup IP Velociraptor used has moved.

Running frontend in verbose mode:
```[ERROR] 2025-06-18T00:13:23Z DynDns: Unable to set dns: Content for A record must be a valid IPv4 address.```

Manually testing the old lookup URL:

```text
curl https://domains.google.com/checkip
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="https://domains.google/">here</A>.
</BODY></HTML>
```

## Solution

We can configure the lookup URL manually by adding The
`checkip_url: https://wtfismyip.com/text` entry into the server configuration.


Cloudflare configuration instructions:
https://docs.velociraptor.app/blog/2024/2024-03-10-release-notes-0.72/#dynamic-dns-providers

In the example below I am configuring a host name: `hostname.example.com`

```yaml
dyn_dns:
    type: cloudflare
    api_token: <API_KEY>
    zone_name: example.com
    checkip_url: https://wtfismyip.com/text
```

Tags: #deployment, #cloudflare, #ddns, #checkip
