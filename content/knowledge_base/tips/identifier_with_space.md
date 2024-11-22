---
title: In VQL, can I SELECT a column with special characters in its name?
---

Sometimes a VQL query will emit a column name with special characters in its name, such as a dot, space or other special characters.

You can still refer to this column using backticks around the identifier name:

```vql
-- This will not work because VQL will interpret the dot as an operator
SELECT Raddr.IP FROM ...

-- This will work because VQL will treat the entire thing as a single identifier
SELECT `Raddr.IP` FROM ...
```

You can read more about [VQL identifiers]({{< ref "/docs/vql/#identifiers-with-spaces" >}})

Tags: #vql
