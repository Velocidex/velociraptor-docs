---
title: Windows.System.CriticalServices
hidden: true
tags: [Client Artifact]
---

This artifact returns information about any services which are
considered critical.

The default list contains virus scanners. If the software is not
installed at all, it will not be shown.


<pre><code class="language-yaml">
name: Windows.System.CriticalServices
description: |
  This artifact returns information about any services which are
  considered critical.

  The default list contains virus scanners. If the software is not
  installed at all, it will not be shown.

reference:
  - &quot;ATT&amp;CK: T1089&quot;
  - https://github.com/teoseller/osquery-attck/blob/master/windows_critical_service_status.conf

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
  - name: lookupTable
    type: csv
    default: |
       ServiceName
       WinDefend
       MpsSvc
       SepMasterService
       SAVAdminService
       SavService
       wscsvc
       wuauserv

sources:
     - query: |
         SELECT Name, DisplayName, Created, State, {
            SELECT * FROM lookupTable WHERE Name =~ ServiceName
         } AS Critical
         FROM Artifact.Windows.System.Services()
         WHERE Critical AND State != &quot;Running&quot;

</code></pre>

