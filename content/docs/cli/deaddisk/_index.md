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

1. Generate the remapping config:

```sh
# a disk image
velociraptor deaddisk --add_windows_disk ./WinDev2404Eval.vmdk remapping.yaml
```

or

```sh
# a Windows partition mounted to a directory
velociraptor deaddisk --add_windows_directory /media/mnt/windows_c_drive/ remapping.yaml
```

2. run the client with the remapping config file:

```sh
velociraptor client -c ./client.config.yaml --remap ./remapping.yaml
```

{{% notice note %}}

The `deaddisk` command, by default, only supports Windows disk/partition images,
and Windows partitions mounted to folders.

From version 0.74.4 this CLI command uses the artifact
`Generic.Utils.DeadDiskRemapping` internally to generate the remapping
configuration file. So you can use this artifact in the GUI if you prefer - the
resulting config will be identical since both methods use the same VQL.

You can also define your own customized version of the
`Generic.Utils.DeadDiskRemapping` artifact if the default artifact does not suit
your specific analysis requirements, for example simple (non-LVM) Linux systems
or non-NTFS disk images. If you load your custom artifact definition from a
folder using the `--definitions` flag then this will be used by the `deaddisk`
command. Note that this approach would only be necessary if you have a strong
reason to use the CLI (for example in an automated analysis pipeline) rather
than the GUI, since it's much easier to create and use a custom version of the
artifact in the GUI.

{{% /notice %}}

See
[Dead disk Forensics]({{< ref "/blog/2022/2022-03-22-deaddisk/" >}})
for more information.