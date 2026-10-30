---
title: Windows.Detection.WMIProcessCreation
description: "Captures WMI calls to the Win32_Process.Create method as a lateral\nmovement indicator."
type: docs-no-toc
hidden: true
sitemap:
  disable: true
tags: [Client Event Artifact]
build:
  list: never
---

Captures WMI calls to the Win32_Process.Create method as a lateral
movement indicator.

WMI Process creation is a common lateral movement technique. The
attacker simply uses WMI to call the Create() method on the
Win32_Process WMI object.

This can be easily done via the `wmic.exe` command or via
PowerShell:

```bash
wmic process call create cmd.exe
```


---

````yaml
name: Windows.Detection.WMIProcessCreation
description: |
  Captures WMI calls to the Win32_Process.Create method as a lateral
  movement indicator.

  WMI Process creation is a common lateral movement technique. The
  attacker simply uses WMI to call the Create() method on the
  Win32_Process WMI object.

  This can be easily done via the `wmic.exe` command or via
  PowerShell:

  ```bash
  wmic process call create cmd.exe
  ```

type: CLIENT_EVENT

sources:
  - query: |
        SELECT Parse from wmi_events(
          query="SELECT * FROM MSFT_WmiProvider_ExecMethodAsyncEvent_Pre WHERE ObjectPath=\"Win32_Process\" AND MethodName=\"Create\"",
          namespace="ROOT/CIMV2",
          wait=50000000)
````


