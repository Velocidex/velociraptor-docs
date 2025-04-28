---
menutitle: Key Decisions
title: Key Deployment Decisions
draft: false
weight: 20
date: 2025-04-27
last reviewed: 2025-04-27
summary: "Guidance on selecting the right options for your deployment."
---

* [Certificate Schemes](#certificate-schemes)
* [Authentication Providers](#authentication-providers)

The aim of the wizard is to make it easy to configure Velociraptor in the most
common deployment scenarios. Even though these scenarios will not be a perfect
fit for everyone, most users should be able to start with these deploment modes
and tweak the configuration to their specific needs.

The end result of running the configuration wizard is a YAML configuration file.
So there is no harm in doing "dry runs" and examining or comparing resulting
files to better understand how the choices affect the resulting configuration.

![Decision tree for the main configuration options](decision_tree.svg)


## Certificate Schemes

### Self-signed

In self-signed SSL mode, Velociraptor issues its own server
certificate using its internal CA. This means the Admin GUI and front end
also use a self-signed server certificate.

#### When to use this deployment mode

This type of deployment is most appropriate for on-premises scenarios
where internet access is not available or egress is blocked.

Self-signed SSL certificates trigger SSL warnings in all web
browsers. When accessing the Admin GUI you will receive a
certificate warning about the possibility of a MITM attack.

Velociraptor doesn't support other self-signed SSL certificates, and we don't
recommend attempting to add your own internal self-signed certificate to
Velociraptor.

### Let's Encrypt

### Own certs [How do I use my own SSL certificates?]({{< ref "/knowledge_base/tips/ssl/" >}})



## Authentication Providers

Velociraptor supports a number of choices for authentication providers:

1. Basic Authentication - this stores usernames and passwords in Velociraptor's
   own datastore.
2. OAuth2 - providers such as Google, Azure or GitHub support SSO via OAuth2.
3. OIDC - uses the Open ID Connect protocol to support many IAM providers (e.g.
   Okta)
4. SAML - Security Assertion Markup Language, also supported by many public SSO providers.
5. [Multi]({{< ref "/knowledge_base/tips/multiple_oauth/" >}}) - a combination of the abovementioned auth methods.