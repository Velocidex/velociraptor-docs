---
title: Client Issues
menutitle: Client
date: 2025-02-17
last_reviewed: 2025-09-26
draft: false
weight: 20
summary: |
  * Troubleshooting problems with getting clients running.
---


TBD

<!-- ### Client fails to start


{{< tabs >}}
{{% tab name="Windows" %}}
```sh
sc query velociraptor
```
{{% /tab %}}
{{% tab name="macOS" %}}
```sh
```
{{% /tab %}}
{{% tab name="Linux" %}}
```sh
$ sudo systemctl status velociraptor_client.service
[sudo] password for user:
● velociraptor_client.service - Velociraptor client
     Loaded: loaded (/etc/systemd/system/velociraptor_client.service; enabled; vendor preset: enabled)
     Active: activating (auto-restart) (Result: exit-code) since Fri 2025-09-05 12:24:18 SAST; 1min 2s ago
    Process: 767 ExecStart=/usr/local/bin/velociraptor_client --config /etc/velociraptor/client.config.yaml client --quiet (code=exited, status=1/FAILURE)
   Main PID: 767 (code=exited, status=1/FAILURE)
        CPU: 131ms
```
{{% /tab %}}
{{< /tabs >}}

#### Running the client in a terminal

If the client fails to start, you can try to start it manually in a terminal
with the `-v` (verbose) flag to see if it reports any errors or issues.

{{< tabs >}}
{{% tab name="Windows" %}}
```sh
"C:\Program Files\Velociraptor\Velociraptor.exe"  --config "C:\Program Files\Velociraptor\client.config.yaml" service run -v
```
{{% /tab %}}
{{% tab name="macOS" %}}
```sh
```
{{% /tab %}}
{{% tab name="Linux" %}}
```sh
$ sudo /usr/local/bin/velociraptor_client --config /etc/velociraptor/client.config.yaml client -v
```
{{% /tab %}}
{{< /tabs >}} -->
