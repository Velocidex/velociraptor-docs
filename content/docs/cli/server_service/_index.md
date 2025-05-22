---
menutitle: "server_service"
title: 'The "server_service" command group'
date: 2025-05-20
draft: false
weight: 70
summary: Manipulate the Velociraptor server service on Windows.
---

Manipulate the Velociraptor **server service** on Windows (only).

This command is only available in the Windows binary. For production deployments
installing the server on Windows is not recommended, however this command
group does facilitate it for the purpose of very small or non-production
deployments.

The `server_service` command group functions much like Microsoft's Service
Control Manager (`sc.exe`), with the exception being that it can also install or
remove the service.

---

### [ server_service install ]

```text
server_service install
    Install Velociraptor frontend as a Windows service.
```

---

### [ server_service remove ]

```text
server_service remove
    Remove the Velociraptor Windows service.
```

---

### [ server_service start ]

```text
server_service start
    Start the service
```

---

### [ server_service stop ]

```text
server_service stop
    Stop the service
```

---

### [ server_service pause ]

```text
server_service pause
    Pause the service
```

---

### [ server_service continue ]

```text
server_service continue
    Continue the service
```
