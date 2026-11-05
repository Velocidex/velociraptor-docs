# ext4



{{< badge >}}Accessor{{< /badge >}}

### Description

Access files by parsing the raw ext4 filesystems.

This accessor is designed to operate on a live system. It
automatically enumerates the mount points and attaches a raw ext4
mount to each mounted device.

Users can use the same path as is presented on the real system, but
the raw ext4 partitions will be parsed instead.

This accessor is only available under linux.

### Example

```vql
SELECT *
FROM glob(globs='/boot/*', accessor="ext4")
```



