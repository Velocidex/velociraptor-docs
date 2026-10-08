# basename



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
path|Extract directory name of path|Any (required)
sep|Separator to use (default /)|string
path_type|Type of path (e.g. windows, linux)|string
### Description

Return the basename of the path.

### Example

```vql
basename(path="/foo/bar") -> "bar"
```

### See also

- [dirname]({{< ref "/vql_reference/other/dirname/" >}})



