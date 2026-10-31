# file_links



{{< badge >}}Accessor{{< /badge >}}


**Required permissions:** `FILESYSTEM_READ`

### Description

Access the filesystem using the OS APIs.

Note: Take care with this accessor because there may be circular
links. In particular this is dangerous on Linux when accidentally
entering the `/proc` part of the filesystem because it contains
circular links to everywhere.



