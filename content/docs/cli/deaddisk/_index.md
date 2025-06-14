---
menutitle: "deaddisk"
title: 'The "deaddisk" command'
date: 2025-05-20
draft: false
weight: 50
summary: "Create a deaddisk configuration"
---

Create a deaddisk configuration (remapping) file, which can then be used to run
a virtual client with the `--remap` flag.

---

### [ deaddisk ]

The `deaddisk` command currently only supports Windows disk images and folders.

```text
deaddisk [<flags>] <output>
    Create a deaddisk configuration

    --hostname="Virtual Host"  The hostname to impersonate
    --add_windows_disk=ADD_WINDOWS_DISK
                               Add a Windows Hard Disk Image
    --offset=-1                The offset of the partition inside the disk
    --add_windows_directory=ADD_WINDOWS_DIRECTORY
                               Add a Windows mounted directory

Args:
  <output>  Output file to write config on
```

For this command, either `--add_windows_directory` or `--add_windows_disk` is
required.

**Examples:**

```sh
velociraptor deaddisk --add_windows_disk ./WinDev2404Eval.vmdk remapping.yaml
```

or

```sh
velociraptor deaddisk --add_windows_directory /media/mnt/windows_c_drive/ remapping.yaml
```

and then

```sh
velociraptor client -c ./client.config.yaml --remap ./remapping.yaml
```

See
[Dead disk Forensics]({{< ref "/blog/2022/2022-03-22-deaddisk/" >}})
for more information.