---
title: "Cloud"
date: 2021-06-09T04:01:47Z
draft: false
weight: 10
---

Steps to deploy Velociraptor
Provision a VM in the cloud
Configure DNS (static or dynamic)
Configure OAuth2 SSO
Generate configuration files
Build debian packages and install
Build MSI packages for Windows
Deploy via GPO/SCCM etc.

#### Setting Dynamic DNS with Google Domains

Configuring Google OAuth2 requires a new project and a consent screen
Do not add an application logo or require more permissions - Google will require OAuth verification which can take weeks!

Generate OAuth client credentials.
Note you can have multiple credentials and multiple domains in the same GCP project.

The redirect URL is the url which Google will use to call back to Velociraptor with the user’s successful login.

It must be

https://<domain>/auth/google/callback


Note the client id and secret - we will need to provide it in the server config.
