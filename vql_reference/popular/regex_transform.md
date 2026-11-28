# regex_transform



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
source|The source string to replace.|string (required)
map|A dict with keys reg, values substitutions.|ordereddict.Dict (required)
key|A key for caching|string
### Description

Search and replace a string with multiple regex. Note you can use $1
to replace the capture string.

```vql
SELECT regex_transform(source="Hello world", map=dict(
   `^Hello`="Goodbye",
   `world`="Space"), key="A")
FROM scope()
```



