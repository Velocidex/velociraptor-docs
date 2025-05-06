# What do I do about "version GLIBC_2.xx not found" errors?

{{% notice tip "TLDR - use the `musl` build" %}}

Use the `musl` built binary for older Linux systems. You can
find this build together with the others on the release page with the
`-musl` suffix in the name.

{{% /notice %}}

On Linux, binaries always link to the C library dynamically. This
happens even with a static binary like Velociraptor. The C library is
intimately linked to the version of Linux installed on the system and
it is generally not possible to upgrade the C library without also
upgrading the entire Linux distribution.

During the build process, the compiler creates a version requirement
for this C library embedded in the binary itself. You can see the
exact version of all libraries needed at runtime using the `read_elf`
program:

```
$ readelf -V velociraptor-v0.6.4-linux-amd64
...
Version needs section '.gnu.version_r' contains 3 entries:
 Addr: 0x00000000004106a0  Offset: 0x0106a0  Link: 7 (.dynstr)
   000000: Version: 1  File: libdl.so.2  Cnt: 1
   0x0010:   Name: GLIBC_2.2.5  Flags: none  Version: 10
   0x0020: Version: 1  File: libpthread.so.0  Cnt: 2
   0x0030:   Name: GLIBC_2.3.2  Flags: none  Version: 6
   0x0040:   Name: GLIBC_2.2.5  Flags: none  Version: 5
   0x0050: Version: 1  File: libc.so.6  Cnt: 8
   0x0060:   Name: GLIBC_2.11  Flags: none  Version: 12
   0x0070:   Name: GLIBC_2.7  Flags: none  Version: 11
   0x0080:   Name: GLIBC_2.14  Flags: none  Version: 9
   0x0090:   Name: GLIBC_2.15  Flags: none  Version: 8
   0x00a0:   Name: GLIBC_2.4  Flags: none  Version: 7
   0x00b0:   Name: GLIBC_2.3.4  Flags: none  Version: 4
   0x00c0:   Name: GLIBC_2.2.5  Flags: none  Version: 3
   0x00d0:   Name: GLIBC_2.3  Flags: none  Version: 2
```

In the above example this binary requires at least `GLIBC_2.15` to
run. You can tell what version of libc you have on any particular
system using the local package manager.

```
$ dpkg -l libc6:amd64
Desired=Unknown/Install/Remove/Purge/Hold
| Status=Not/Inst/Conf-files/Unpacked/halF-conf/Half-inst/trig-aWait/Trig-pend
|/ Err?=(none)/Reinst-required (Status,Err: uppercase=bad)
||/ Name           Version       Architecture Description
+++-==============-=============-============-=================================
ii  libc6:amd64    2.33-0ubuntu5 amd64        GNU C Library: Shared libraries
```

In this case this system has GLIBC version 2.33 which is higher than
the minimum required version of 2.15.

However for older systems, the locally installed GLIBC may be older
than required. This results in an error when we attempt to run it. For
example on an old CentOS 6 system:

```
$ ./velociraptor-v0.6.4-linux-amd64
./velociraptor-v0.6.4-linux-amd64: /lib64/libc.so.6: version `GLIBC_2.14' not found (required by ./velociraptor-v0.6.4-linux-amd64)
./velociraptor-v0.6.4-linux-amd64: /lib64/libc.so.6: version `GLIBC_2.15' not found (required by ./velociraptor-v0.6.4-linux-amd64)
```

Since the version requirement is added at build time, we really need
to build on an old system to ensure the linked to GLIBC is old enough.

Velociraptor uses the [musl](https://www.musl-libc.org/) project to
build completely static binaries independent of the GLIBC installed on
the system. While this feature is considered experimental it seems to
work well and produces truly portable binaries.

We recommend that version to only be used for clients on older
systems, although it might also work for a server too (but really you
should be running servers on modern patched systems).

Tags: #deployment
