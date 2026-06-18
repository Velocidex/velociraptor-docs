---
title: "Welcome"
date: 2021-06-12T07:11:04Z
draft: false
noDisqus: true
weight: 20
no_header: false
carousel:
 - name: '<div class="logo-btn"><i class="fas fa-laptop"></i> Collect</div>'
   image: collect.png
   description: |
     At the press of a (few) buttons, perform targeted collection of digital forensic evidence simultaneously across your endpoints, with speed and precision.

 - name: <div class="logo-btn"><i class="fas fa-eye"></i> Monitor</div>
   image: monitoring.png
   description: Continuously collect endpoint events such as event logs, file modifications and process execution. Centrally store events indefinitely for historical review and analysis.

 - name: <div class="logo-btn"><i class="fas fa-bullseye"></i> Hunt</div>
   image: hunt.png
   description: Don't wait until an event occurs. Actively search for suspicious activities using our library of forensic artifacts, then customize to your specific threat hunting needs.

navs:
 - name: Overview
   description: Velociraptor overview
   link: /docs/overview/
 - name: Quickstart
   description: Quick Start
   link: /docs/deployment/quickstart/
 - name: Security
   description: Lean about Velociraptor Security
   link: /docs/overview/security/
 - name: Configure
   description: Configuration File Reference
   link: /docs/deployment/references/
 - name: Troubleshooting
   description: Troubleshooting deployments
   link: /docs/troubleshooting/

description: |
  {{% navs %}}
---

{{% navs %}}


{{% notice warning "Current Security Advisories" %}}

Please update to the latest release [0.76.5](/downloads/) to address
the following CVEs:

* [CVE-2026-5329](/announcements/advisories/cve-2026-5329/) Velociraptor improper input validation in client message handler. This could lead to remote
  code execution on the server.

* [CVE-2026-6290](/announcements/advisories/cve-2026-6290/)  Velociraptor query() plugin misapplies permissions to orgs.

* [CVE-2026-6863](/announcements/advisories/cve-2026-6863/)  HTTP Filestore Endpoints Misapply Permissions Across Organizations

* [CVE-2026-6948](/announcements/advisories/cve-2026-6948/)  Unbounded Memory Allocation in VQLResponse Result-Set Writer. This could lead to a DoS attack against the server.

{{% /notice %}}


## Velociraptor - Digging Deeper!

Velociraptor is an advanced digital forensic and incident response
tool that enhances your visibility into your endpoints.

{{% carousel %}}

<script>
    $("#top-bar").addClass("hidden");
</script>
