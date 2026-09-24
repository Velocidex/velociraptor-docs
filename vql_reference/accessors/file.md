# file



{{< badge >}}Accessor{{< /badge >}}


**Required permissions:** `FILESYSTEM_READ`

### Description

Access files using the operating system's API.

Does not allow access to raw devices.

### Notes

This accessor does not follow symbolic links on `Windows` or
`Linux` in order to avoid being trapped by cycles. This means that
on some Linux systems you will find `/usr/bin/ls` instead of
`/bin/ls` since `/bin` is a symlink to `/usr/bin/`



