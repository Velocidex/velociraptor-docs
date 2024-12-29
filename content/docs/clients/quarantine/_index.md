---
title: "Quarantine"
date: 2024-12-24
draft: false
weight: 35
---
You can quarantine a host using the **Quarantine Host**
(<i class="fas fa-briefcase-medical"></i>) button. Quarantining a host will
reconfigure the hosts's network stack to only allow it to communicate with the
Velociraptor server. This allows you to continue investigating the host remotely
while preventing the host from making other network connections.

Quarantining is implemented using an event monitoring query which means it
persists across client reboots. A quarantined client will gain the label
`Quarantine` so you can easily search for all quarantined hosts using the label
search feature above.

Removing the quarantine label from a host will immediately unquarantine the
host. Read further how to automatically apply and remove labels based on various
events - this allows you to automatically quarantine a host too!
