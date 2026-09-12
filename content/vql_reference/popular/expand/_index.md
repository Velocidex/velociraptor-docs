---
title: expand
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Expand the path using the environment.

  This function expands environment variables into the path. It is
  normally needed after using registry values of type REG_EXPAND_SZ as
  they typically contain environment strings. Velociraptor does not
  automatically expand such values since environment variables typically
  depend on the specific user account which reads the registry value
  (different user accounts can have different environment variables).

  This function uses the Golang standard for expanding variables
  (using $varname ). On Windows, we also support using the Windows
  notation with % before and after the variable name.

  ```vql
  SELECT expand(path="My Username is %USERNAME%")
  FROM scope()
  ```

  ### Notes

  The environment strings are set per user and Velociraptor's
  own environment may not reflect any other process's
  environment. See `Windows.Forensics.ProcessInfo` for a
  forensically sound manner of obtaining the environment from any
  process.

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
path|A path with environment escapes|string (required)

**Required permissions:** `MACHINE_STATE`

### Description

Expand the path using the environment.

This function expands environment variables into the path. It is
normally needed after using registry values of type REG_EXPAND_SZ as
they typically contain environment strings. Velociraptor does not
automatically expand such values since environment variables typically
depend on the specific user account which reads the registry value
(different user accounts can have different environment variables).

This function uses the Golang standard for expanding variables
(using $varname ). On Windows, we also support using the Windows
notation with % before and after the variable name.

```vql
SELECT expand(path="My Username is %USERNAME%")
FROM scope()
```

### Notes

The environment strings are set per user and Velociraptor's
own environment may not reflect any other process's
environment. See `Windows.Forensics.ProcessInfo` for a
forensically sound manner of obtaining the environment from any
process.


