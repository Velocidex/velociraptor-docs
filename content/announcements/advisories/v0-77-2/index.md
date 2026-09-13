---
title: "Security Advisories fixed in release 0.77.2"
summary: |
   Velociraptor 0.77.2 release fixed a number of CVEs.
description: |
   Velociraptor 0.77.2 release fixed a number of CVEs.
weight: 10
date: 2026-08-09T00:00:00Z
no_edit: true
noTitle: false
no_children: true
no_menu: true
---

The Velociraptor project was lucky to receive a number of security
advisories recently. A number of talented and experienced security
researchers shared their findings and thorough reviews with our team.

We would like to extend our gratitude to the following researchers for
responsibly sharing their findings:

* Hamad Alghamdi
* Itay Vardi
* Mayank Rajput (https://github.com/hackelite01)
* Leonardo Souza (anauaque)
* Yuval Miller and Leon Kayaliev
* Kris Kennaway (Datadog)
* Tristan Madani (Talence Security)

There were a large number of advisories, the majority fell into some
broad categories.

## ACL, identity and permission issues

Velociraptor started off being a DFIR tool used by a small trusted
team. As the project matured, it has developed enterprise security
features:

* Multi-tenancy - being able to isolate cases into separate orgs, all
  sharing the same server.
* Multiple users and a discretional access control mechanism to
  separate and control users' actions.

Although most users still use the tool within a small trusted team it
is important to ensure that the user ACLs are properly enforced. The
recent round of security reviews tackled the Velociraptor security
model and assisted in locking down any bypasses.

The following vulnerabilities are examples where a malicious
authenticated user of the Velociraptor GUI can exceed their allowed
permissions.

* [CVE-2026-18348](../CVE-2026-18348): Velociraptor NETWORK ACL bypass via upload_azure / upload_sftp / upload_smb VQL plugins
* [CVE-2026-18635](../CVE-2026-18635): Velociraptor query plugin allows impersonation in other orgs
* [CVE-2026-18636](../CVE-2026-18636): Velociraptor VFSGetBuffer API path deny list bypass
* [CVE-2026-18638](../CVE-2026-18638): Velociraptor server crash via the SetPassword API
* [CVE-2026-18640](../CVE-2026-18640): Velociraptor directory traversal via the NewNotebook API
* [CVE-2026-18972](../CVE-2026-18972): Velociraptor authenticated identity-spoofing vulnerability
* [CVE-2026-18652](../CVE-2026-18652): Velociraptor STACK Type Download Path Bypasses Denied Prefix Check
* [CVE-2026-18860](../CVE-2026-18860): Velociraptor incorrect Org deletion permissions check
* [CVE-2026-64952](../CVE-2026-64952): Velociraptor Hunt Deletion With Insufficient Permission Check
* [CVE-2026-64954](../CVE-2026-64954): Velociraptor collect_client() Permissions Bypass


## Stability and crashes

Other vulnerabilities identify bugs in parsing edge conditions leading
to possible crashes.

* [CVE-2026-18638](../CVE-2026-18638): Velociraptor server crash via the SetPassword API
* [CVE-2026-17535](../CVE-2026-17535): Velociraptor Multiple Crashes in NTFS Parser when applied to invalid NTFS Volumes
* [CVE-2026-64951](../CVE-2026-64951): Velociraptor DoS triggered by Divide by Zero panic

## General improvements

The researchers have highlighted some design issues and helped to
harden Velociraptor

* [CVE-2026-18639](../CVE-2026-18639): Velociraptor OIDC Authenticator susceptible to email spoofing
   - Some OIDC providers allow users to spoof emails, making
     Velociraptor's reliance of emails dangerous.

* [CVE-2026-64955](../CVE-2026-64955): Velociraptor CSV Formula Injection in Export Pipeline
   - Some spreadsheet programs (e.g. MS Excel) treat CSV files as
     executable content allowing formulas to be run when loading CSV
     files.

## Upgrade

To fix these issues and others, we recommend users upgrade to the
latest [0.77.2 release](/downloads/). If you would rather not upgrade
to the latest release, you can update to the latest build from the
[previous 0.76.7 release](/downloads/previous_downloads/).
