# switch



{{< badge >}}Plugin{{< /badge >}}

### Description

Conditional execution of multiple queries in order

Executes each query in order. If a query returns any rows, those
are emitted. Any further queries are ignored.

For example:
```vql
SELECT * FROM switch(a={
  SELECT * FROM First
}, b={
  SELECT * FROM Second
})
```



