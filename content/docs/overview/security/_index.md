---
menutitle: "Security"
title: "Velociraptor Security"
date: 2025-01-25
weight: 40
---

Velociraptor is a very powerful platform running with very high
privilege and access on many endpoints. We take the security of
Velociraptor very seriously.

This short page provides links to deeper topics of discussion before
implementing Velociraptor in your environment.

## Deployment security

Velociraptor is an enterprise grade tool and supports most of the
security mechanisms expected from a trusted enterprise software, such
as `SSO`, reverse proxies, `mTLS`, `Role Based Access Control`,
`Auditing` and much more.

To become familiar with the different security mechanisms and
considerations available for new deployments, please see our
[Deployment Security Guide]({{< ref "/docs/deployment/security/" >}})

## Artifact Security

Being able to collect sensitive forensic information from endpoints is
a very powerful permissions. There are many escalation paths that can
result in complete domain takeover by simply being able to collect
forensic artifacts - for example, acquiring `lsass.exe` memory or
downloading the `SAM` or `NTDS.dit` can lead to domain takeover.

Understanding how to manage this risk and leverage `Velociraptor Role
Based Access Control` (RBAC) mechanisms is essential. You can read
more about this in our [Artifacts Security Guide]({{< ref
"/docs/artifacts/security/" >}}).


## Reporting Security Vulnerabilities

If you find a security issue in Velociraptor, please report it
responsibly using this following;

* **Contact**: security@rapid7.com
* **Encryption**: https://keys.openpgp.org/search?q=396F6DCA9B60EB1AF2D1621FA885DF1431A0A489
* **Preferred-Languages**: en
* **Canonical**: https://www.rapid7.com/.well-known/security.txt
* **Policy**: https://www.rapid7.com/security/disclosure/
