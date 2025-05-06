---
menutitle: Server Deployment
title: Server Deployment
draft: false
weight: 10
date: 2025-02-27
last reviewed: 2025-04-27
summary: "How to plan and implement your server deployment"
---

In our [Quickstart Guide]({{< ref "/docs/deployment/quickstart/" >}}) we cover the process
for performing a simplified deployment, secured with Self-signed SSL
certificates and Basic authentication. This type of deployment is most suited to
short-term uses such as training environments, temporary on-site incident
response situations, and small deployments with no internet exposure. As
suggested by the term "Quickstart", the goal there is to get a working
deployment up and running as quickly as possible, while assuming that the
operating environment will provide sufficient security for the expected duration
of the deployment.

For longer-term deployments it is essential to plan your installation taking
into consideration all the
[security mechanisms]({{< ref "/docs/deployment/security/" >}})
that Velociraptor offers, such as using publicly verifiable SSL certificates
(Velociraptor supports automatic enrollment and renewal of free certificates
from Let's Encrypt). Using proper SSL certificates allows the Velociraptor
server to be further secured using SSO authentication, and also eliminates the
"bad certificate" browser warning seen when using the self-signed certificates.

## What's next?

{{% children "description"=true %}}

