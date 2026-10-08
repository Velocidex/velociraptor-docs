# file_nocase



{{< badge >}}Accessor{{< /badge >}}


**Required permissions:** `FILESYSTEM_READ`

### Description

Access files using the operating system's API.

On Linux this accessor implements case insensitive comparisons
over the usual case sensitive filesystem. This is important for
cases where Windows files are unpacked on a Linux system and you
are trying to use artifacts written for Windows - they may fail
due to incorrect casing making it impossible to find the right
files.



