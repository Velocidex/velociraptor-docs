---
title: registry
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## registry
<span class='vql_type label label-warning pull-right page-header'>Accessor</span>


### Description

Access the registry like a filesystem using the OS APIs.

The top level path component is a list of the common hives (e.g.
`HKEY_USERS`). The accessor creates a registry abstraction to make it appear
as a filesystem where:

* Top level consists of the major hives
* Values appear as files, Keys appear as directories
* The Default value in a key is named “@”
* Since reading the registry value is very quick and efficient, the registry
  accessor makes the Value's content available inside the Data attribute.
* Path components that include `/` can be escaped using quotes, for example:
`HKEY_LOCAL_MACHINE\Microsoft\Windows\"http://www.microsoft.com/"`

The hives can also be referenced by their abbreviated (shorthand) names:

- `HKLM` = `HKEY_LOCAL_MACHINE`
- `HKU` = `HKEY_USERS`
- `HKCU` = `HKEY_CURRENT_USER`

The `registry` (or `reg` for short) accessor allows any filesystem functions
and plugins to also work on the registry. For example, here we use the
`glob` plugin to list keys:

```vql
SELECT *
FROM glob(
  globs="*",
  root='''HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion''',
  accessor="registry")
WHERE Name = "Run"
```

We can use the `read_file` function to read values as if they were files:

```vql
SELECT OSPath.Path AS Key,
      Data,
      Data.type AS Type,
      expand(path=read_file(accessor='registry', filename=OSPath)) AS Content
FROM glob(globs='HKU/*/Environment/*', accessor='registry')
```

For convenience we also have the `read_reg_key` plugin which is similar to
using both `glob` and `read_file` together, as in the previous example. The
main difference is that `read_reg_key` returns the key's values as columns
which makes it easier to work with them in VQL. Note that with this
registry-specific plugin we do not need to specify the `registry` accessor,
as that is the default.

```vql
SELECT *
FROM read_reg_key(root='HKEY_USERS', globs='*/Environment')
```

### See also

- [read_reg_key]({{< ref "/vql_reference/windows/read_reg_key/" >}}):
  A convenience plugin which applies the globs to the registry accessor to
  find keys.
- [reg_rm_key]({{< ref "/vql_reference/windows/reg_rm_key/" >}}):
  Removes a key and all its values from the registry.
- [reg_rm_value]({{< ref "/vql_reference/windows/reg_rm_value/" >}}):
  Removes a value in the registry.
- [reg_set_value]({{< ref "/vql_reference/windows/reg_set_value/" >}}):
  Set a value in the registry.


