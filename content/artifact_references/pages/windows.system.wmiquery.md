---
title: Windows.System.WMIQuery
hidden: true
tags: [Client Artifact]
---

This artifact enables querying Windows Management Instrumentation (WMI).

Windows Management Instrumentation (WMI) is the Microsoft implementation of
Web-Based Enterprise Management (WBEM), which is an industry initiative to
develop a standard technology for accessing management information in an
enterprise environment. WMI uses the Common Information Model (CIM) industry
standard to represent systems, applications, networks, devices, and other
managed components. CIM is developed and maintained by the Distributed
Management Task Force (DMTF).

Please see the second reference link for an example of built in system classes.


<pre><code class="language-yaml">
name: Windows.System.WMIQuery
author: Matt Green - @mgreen27
description: |
    This artifact enables querying Windows Management Instrumentation (WMI).

    Windows Management Instrumentation (WMI) is the Microsoft implementation of
    Web-Based Enterprise Management (WBEM), which is an industry initiative to
    develop a standard technology for accessing management information in an
    enterprise environment. WMI uses the Common Information Model (CIM) industry
    standard to represent systems, applications, networks, devices, and other
    managed components. CIM is developed and maintained by the Distributed
    Management Task Force (DMTF).

    Please see the second reference link for an example of built in system classes.

reference:
    - https://docs.microsoft.com/en-us/windows/win32/wmisdk/wmi-start-page
    - https://docs.microsoft.com/en-us/windows/win32/cimwin32prov/operating-system-classes

required_permissions:
  - EXECVE

parameters:
  - name: WMIQuery
    description: &quot;Add target WMI query: e.g SELECT * FROM &lt;CLASSNAME&gt;&quot;
    default: &quot;SELECT * FROM Win32_Process&quot;

  - name: Namespace
    description: &quot;Add target Namespace: e.g root/cimv2&quot;
    default: root/cimv2

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query: |
       SELECT * FROM wmi(namespace=Namespace,query=WMIQuery)

</code></pre>

