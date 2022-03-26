---
title: How do I deploy the client as agentless (without install)?
author: "scudette"
author_link: "https://github.com/scudette"
author_avatar: "https://avatars.githubusercontent.com/u/3856546?v=4"
date: "2022-03-21"
tags: ["deployment"]
hidden: true
noTitle: true
editURL: https://github.com/Velocidex/velociraptor-docs/edit/master/content/knowledge_base/tips/deploying_in_agentless_mode.md
---

# How do I deploy the client as agentless (without install)?

Sometimes we need to deploy Velociraptor in an IR and can not install
it permanently as a service.

It is possible to deploy the client using Group Policy by using
`Scheduled task` feature to cause domain connected machines to run the
client.

1. The first step is to place the client and the generated
   `client.config.yaml` on a public read only windows share.

2. Update the config file's writeback location to somewhere writable
   on the client (e.g. `C:\Windows\Temp\velo.writeback.yaml`)

3. Next create a `Scheduled Task` in a new group policy object that
   applies to the relevant OU.

4. The scheduled task should be launched as `NT_AUTHORITY\SYSTEM` from
   the read only share. With the appropriate command line. For example:

```
\\dc\deployment\velociraptor.exe --config \\dc\deployment\client.config.yaml client --mutant MyVeloName
```


{{% notice warning "Controlling number of instances" %}}

Windows's Group Policy allows setting only a single instance of the
program to run at the time, however we found in practice this is not
reliable and sometimes GPO will launch dozens of copies of
Velociraptor over time. To avoid this we use the `--mutant` flag which
will exist if a mutant of this name already exists.

{{% /notice %}}



