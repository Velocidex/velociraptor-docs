---
title: How do I deploy the client as agentless (without install)?
---

Sometimes we need to deploy Velociraptor in an IR and can not install
it permanently as a service.

## Windows Environments

It is possible to deploy the client using Group Policy by using
`Scheduled task` feature to cause domain connected machines to run the
client. See details [here]({{< ref "/blog/html/2019/03/02/agentless_hunting_with_velociraptor/" >}}).

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

Window's Group Policy allows setting only a single instance of the
program to run at the time, however we found in practice this is not
reliable and sometimes GPO will launch dozens of copies of
Velociraptor over time. To avoid this we use the `--mutant` flag which
will exit if a mutant of this name already exists.

{{% /notice %}}

## Linux Environments

### Systemd

It is possible to execute a program in a "transient scope", which enables it to be controlled and inspected just like a regular service (unit) in Linux, without the need to create persistent configurations.
Using ```systemd-run``` the process will be executed and its parent will be the `init` process, and will not terminate until the host is rebooted.

To execute the Velociraptor binary run the following:

```
systemd-run -u velociraptor_tmp /tmp/velociraptor.bin client --config /tmp/client.config.yaml
```
Once the service is running, you should now be free to terminate the SSH / management session without terminating the process.

You can manually terminate the service with: ```systemctl stop velociraptor_tmp.service ```

You can check it's status with: ```systemctl status velociraptor_tmp.service```

{{% notice warning "Temporary locations" %}}

On Linux /tmp is cleaned up by a service, which gets triggered on shutdown.
You will need to arrange for the Velociraptor binary and configuration file to be transferred again if the host reboots.

{{% /notice %}}

You can read more about the ```systemd-run``` here for flags etc: https://www.freedesktop.org/software/systemd/man/systemd-run.html


Tags: #deployment
