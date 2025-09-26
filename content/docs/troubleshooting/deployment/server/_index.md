---
title: Server Issues
menutitle: Server
date: 2025-02-17
last_reviewed: 2025-09-26
draft: false
weight: 10
summary: |
  * Troubleshooting problems with getting the server running.
---

## Issue: Server fails to start

If the server fails to start, you can try to start it by hand to see any logs or
issues. Typically the Linux service will report something unhelpful such as:

```sh
# systemctl status velociraptor_server.service
● velociraptor_server.service - Velociraptor server
     Loaded: loaded (/etc/systemd/system/velociraptor_server.service; enabled; vendor preset: enabled)
     Active: activating (auto-restart) (Result: exit-code) since Sat 2025-02-22 12:13:00 SAST; 19s ago
    Process: 4126 ExecStart=/usr/local/bin/velociraptor --config /etc/velociraptor/server.config.yaml frontend (code=exited, status=1/FAILURE)
   Main PID: 4126 (code=exited, status=1/FAILURE)
        CPU: 83ms
```

You can usually get more information from the system log files, usually
`/var/log/syslog`. Alternative you can try to start the service by hand and see
any issues on the console.

#### Running the server in a terminal

If the server fails to start, you can try to start it manually in a terminal to
see if it reports any errors or issues.

First change to the Velociraptor user and then start the service as that user.

```sh
# sudo -u velociraptor bash
$ /usr/local/bin/velociraptor --config /etc/velociraptor/server.config.yaml frontend -v
Dec 31 15:47:18 devbox velociraptor[3572509]: velociraptor.bin: error: frontend: loading config file: failed to acquire target io.Writer: failed to create a new file /mnt/data/logs/Velociraptor_debug.log.202112270000: failed to open file /mnt/data/logs/Velociraptor_debug.log.202112270000: open /mnt/data/logs/Velociraptor_debug.log.202112270000: permission denied
```

In this case, Velociraptor can not start because it can not write to the
configured logs directory. Other errors might be "disk full" or various
permission denied problems.

{{% notice warning "Incorrect permissions in the filestore" %}}

Because Velociraptor normally runs as a low privileged user, it needs to
maintain file ownership as the `velociraptor` user. Sometimes permissions change
by accident (usually this happens by running velociraptor as root and
interacting with the file store - you should **always** change to the
`velociraptor` user before interacting with the server).

It is worth checking file permissions (using `ls -l`) and recursively returning
file ownership back to the `velociraptor` user
(using the command `chown -R velociraptor:velociraptor /path/to/filestore/`)

{{% /notice %}}
