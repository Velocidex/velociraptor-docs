---
menutitle: "service"
title: 'The "service" command group'
date: 2025-05-20
last_reviewed: 2025-07-06
draft: false
weight: 80
summary: Manipulate the Velociraptor client service on Windows and macOS.
---

These commands manipulate the Velociraptor **client service** on Windows and
macOS. They are only available in the Windows or macOS (Darwin) binaries.

The client can be
[installed as a service]({{< ref "/docs/deployment/clients/" >}}).
Usually this is done using installer packaging:

- MSI for Windows
- DEB or RPM for Linux
- DMG or PKG for macOS

The commands in this command group allow you to perform operations on the
installed service, even if it was installed using an installer package.

Because packaging and distribution is a rather complicated topic, Velociraptor
also includes the `service install` command in the Windows and Linux binaries.
Other methods of packaging and installing should preferably be used in
production deployments, however we do still provide this basic install
capability as an alternative for unusual deployment scenarios.

---

## Windows platform

On Windows the `service` command group functions much like Microsoft's Service
Control Manager (`sc.exe`), with the exception being that it can also install or
remove the service.

#### [ service install ]

```text
service install
    Install Velociraptor as a Windows service.
```

---

#### [ service remove ]

```text
service remove
    Remove the Velociraptor Windows service.
```

---

#### [ service start ]

```text
service start
    Start the service
```

---

#### [ service stop ]

```text
service stop
    Stop the service
```

---

#### [ service pause ]

```text
service pause
    Pause the service
```

---

#### [ service continue ]

```text
service continue
    Continue the service
```

---

#### [ service run ]

```text
service run
    Run as a service
```

This command is only used by the Windows service manager. For an installed
Windows client the service configuration's command line will be:

```
"C:\Program Files\Velociraptor\Velociraptor.exe"  --config "C:\Program Files\Velociraptor\client.config.yaml" service run
```

---

## macOS platform


#### [ service install ]

```text
service install
    Install Velociraptor as a service.
```

---

#### [ service remove ]

```text
service remove
    Remove the Velociraptor service.
```

