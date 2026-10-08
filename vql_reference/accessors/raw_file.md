# raw_file



{{< badge >}}Accessor{{< /badge >}}


**Required permissions:** `FILESYSTEM_READ`

### Description

Access the filesystem using the OS API.

This accessor allows to read raw devices. On Windows, raw files
need to be read in aligned page size. This accessor ensures reads
are buffered into page size buffers to make it safe for VQL to
read the device in arbitrary alignment.

We do not support directory operations on raw devices, so this
accessor can not be used in the `glob()` plugin.

Additionally this accessor does not attempt to interpret the
device part of the path components. It will pass the full path
string to the underlying OS APIs. This allows us to read arbitrary
devices.



