---
title: "Welcome"
date: 2021-06-12T07:11:04Z
draft: false
noDisqus: true
weight: 20
no_header: true
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

---

{{% navs %}}


{{% notice warning "CVE-2025-6264 published on 2025-06-20" %}}

If you use rely on artifact `required_permissions` to prevent
`investigator` users from running dangerous operations on the
endpoint, please upgrade your server to mitigate `CVE-2025-6264` to at
least release `0.74.3` and consider [this documentation]({{< ref
"/docs/artifacts/security/#restricting-dangerous-client-artifacts"
>}}). [More details]({{% ref "/announcements/advisories/cve-2025-6264"
%}})

{{% /notice %}}

## Velociraptor - Digging Deeper!

Velociraptor is an advanced digital forensic and incident response
tool that enhances your visibility into your endpoints.

{{% carousel %}}
