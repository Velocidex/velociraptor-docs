---
menutitle: "Current CVEs"
title: "Current CVEs"
description: |
    The current CVEs in the latest release.

weight: 10
no_edit: true
noTitle: true

---

The following CVEs were reported with the current 0.6.7 release. Both
Vulnerabilities can result in privilege escalation from low privilege
"investigator" Velociraptor users to "administrator" level.

If you use multiple roles with your Velociraptor GUI users, we
recommend to upgrade your server to the 0.6.7-5 release. These issues
do not affect clients so there is no need to upgrade clients.

## CVE-2023-2226  Velociraptor crashes while parsing some malformed PE or OLE files.
{{< include-html "CVE-2023-2226.html" >}}

## CVE-2023-0242  Insufficient Permission Check In The VQL Copy() Function
{{< include-html "CVE-2023-0242.html" >}}


## CVE-2023-0290 Directory Traversal In Client Id Parameter
{{< include-html "CVE-2023-0290.html" >}}
