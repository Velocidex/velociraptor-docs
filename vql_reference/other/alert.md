# alert



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
name|Name of the alert.|string (required)
dedup|Suppress same message in this many seconds (default 7200 sec or 2 hours).|int64
condition|If specified we ignore the alert unless the condition is true|Any
`**`|Free Form Args|
### Description

Generate an alert message.

### See also

- [log]({{< ref "/vql_reference/popular/log/" >}}): alerts and log messages are similar in
  concept and use the same deduplication mechanism which is explained with
  examples for the `log()` function.



