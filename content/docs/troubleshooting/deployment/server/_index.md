---
title: Server Deployment Issues
menutitle: Server
date: 2025-02-17
last_reviewed: 2025-09-26
draft: false
weight: 10
summary: |
  * Troubleshooting problems with getting the server running.
---

### Server fails to start

If the server fails to start, typically the Linux service will report something
unhelpful such as:

```sh
$ sudo systemctl status velociraptor_server.service
● velociraptor_server.service - Velociraptor server
     Loaded: loaded (/etc/systemd/system/velociraptor_server.service; enabled; vendor preset: enabled)
     Active: activating (auto-restart) (Result: exit-code) since Sat 2025-09-27 19:12:03 SAST; 2s ago
    Process: 5516 ExecStart=/usr/local/bin/velociraptor --config /etc/velociraptor/server.config.yaml frontend (code=exited, status=1/FAILURE)
   Main PID: 5516 (code=exited, status=1/FAILURE)
        CPU: 414ms

Sep 27 19:12:03 linux64-client systemd[1]: velociraptor_server.service: Failed with result 'exit-code'.
```

#### Check the system journal for error messages

You can sometimes get more information from the system journal for example:

```sh
$ journalctl -u velociraptor_server.service
Sep 27 19:18:39 linux64-client systemd[1]: Started Velociraptor server.
Sep 27 19:18:40 linux64-client velociraptor[763]: velociraptor: error: frontend: starting frontend: Invalid GUI.public_url - this should refer to the externally accessible URL for the GUI application. It should end with '/app/index.html'
Sep 27 19:18:40 linux64-client systemd[1]: velociraptor_server.service: Main process exited, code=exited, status=1/FAILURE
Sep 27 19:18:40 linux64-client systemd[1]: velociraptor_server.service: Failed with result 'exit-code'.
```

In the above example we can see that there is an issue with a value in the
server config, and the error message explains what is required to correct the
issue.


#### Try running the server in a terminal

If you do not see any meaningful errors in the system journal then you can
proceed to run the server in a terminal which will provide much more detail in
it's console output.

1. First change to the `velociraptor` user.
2. Then start the server as that user using the same command line that's shown by
the `systemctl` command's `ExecStart` value.

```sh
$ sudo -u velociraptor bash
$ /usr/local/bin/velociraptor --config /etc/velociraptor/server.config.yaml frontend
[INFO] 2025-09-27T17:56:58Z  _    __     __           _                  __
[INFO] 2025-09-27T17:56:58Z | |  / /__  / /___  _____(_)________ _____  / /_____  _____
[INFO] 2025-09-27T17:56:58Z | | / / _ \/ / __ \/ ___/ / ___/ __ `/ __ \/ __/ __ \/ ___/
[INFO] 2025-09-27T17:56:58Z | |/ /  __/ / /_/ / /__/ / /  / /_/ / /_/ / /_/ /_/ / /
[INFO] 2025-09-27T17:56:58Z |___/\___/_/\____/\___/_/_/   \__,_/ .___/\__/\____/_/
[INFO] 2025-09-27T17:56:58Z                                   /_/
[INFO] 2025-09-27T17:56:58Z Digging deeper!                  https://www.velocidex.com
[INFO] 2025-09-27T17:56:58Z This is Velociraptor 0.75.2 built on 2025-09-18T07:55:39+02:00 (92250494d)
[INFO] 2025-09-27T17:56:58Z Environment Variable GOTRACEBACK: none
[INFO] 2025-09-27T17:56:58Z Loading config from file /etc/velociraptor/server.config.yaml
[INFO] 2025-09-27T17:56:58Z Initializing logging for /opt/velociraptor/logs/Velociraptor
velociraptor: error: frontend: loading config file: failed to acquire target io.Writer: failed to create a new file /opt/velociraptor/logs/Velociraptor_info.log.202509220000: failed to open file /opt/velociraptor/logs/Velociraptor_info.log.202509220000: open /opt/velociraptor/logs/Velociraptor_info.log.202509220000: permission denied
```

In this case, Velociraptor could not start because it cannot write to the
configured logs directory. This can be corrected by reapplying ownership for the
`velociraptor` user to the files in the `/opt/velociraptor` directory.

{{% notice info "Incorrect permissions in the filestore" %}}

Because Velociraptor normally runs as a low privileged user, it needs to
maintain file ownership as the `velociraptor` user. Sometimes permissions change
by accident (usually this happens by running velociraptor as root and
interacting with the file store - you should **always** change to the
`velociraptor` user before interacting with the server).

It is worth checking file permissions (using `ls -l`) and recursively returning
file ownership back to the `velociraptor` user
(using the command `sudo chown -R velociraptor:velociraptor /path/to/filestore/`)

{{% /notice %}}

The most common causes of the service not starting are:

* Invalid configuration - either invalid YAML formatting or invalid settings.
* Incorrect filesystem permissions on the server datastore directory.
* Insufficient disk space (i.e. disk full)


### Server starts but other issues are encountered

#### Try running the server in a terminal with verbose output

If the server does start but you need to troubleshoot some other issue then you
can run the server in a terminal with the `-v` (verbose) flag. This will display
the full console output, not just errors, so it is useful for checking that
component services are operating as expected.

```sh
$ sudo -u velociraptor bash
$ /usr/local/bin/velociraptor --config /etc/velociraptor/server.config.yaml frontend -v
```

### GUI connectivity issues

If the server starts but you can't connect to the GUI, here are some suggestions
to troubleshoot the problem.

#### Check your config settings

To allow remote access to the GUI your server's config needs to have the setting
`GUI.bind_address` set to `0.0.0.0`. A common mistake is to set this to a
specific IP address which then doesn't work because `0.0.0.0` and
`127.0.0.1` are the only valid values for this setting.

#### Test that the GUI is listening on the expected port

It's always best to first confirm that the GUI port is reachable locally on the
server before testing from a remote host, since remote connectivity issues might
be the result of network infrastructure such as firewalls and proxies, or
network routing issues.

Use netcat (`nc`) to check that the Frontend is listening:

```sh
$ nc -vz 127.0.0.1 8889
Connection to 127.0.0.1 8889 port [tcp/*] succeeded!
```

You can then repeat the previous test using a non-loopback IP address.

If your server has a desktop environment then you may also want to try
connecting locally using a web browser.

Once you have confirmed that the GUI is accessible from the server itself, then
you can test from a remote host. If possible first test from another computer on
the same local network as the server.

