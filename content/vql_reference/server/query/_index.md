---
title: query
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## query
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
query|A VQL Query to parse and execute.|Any (required)
env|A dict of args to insert into the scope.|ordereddict.Dict
copy_env|A list of variables in the current scope that will be copied into the new scope.|list of string
cpu_limit|Average CPU usage in percent of a core.|float64
iops_limit|Average IOPs to target.|float64
timeout|Cancel the query after this many seconds|float64
progress_timeout|If no progress is detected in this many seconds, we terminate the query and output debugging information|float64
org_id|If specified, the query will run in the specified org space (Use 'root' to refer to the root org)|string
runas|If specified, the query will run as the specified user|string
inherit|If specified we inherit the scope instead of building a new one.|bool

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">IMPERSONATION</span>

### Description

Evaluate a VQL query.

This plugin is useful for evaluating a query in a different
environment or context, or turning a string into a query.

The query provided by the `query` parameter can be a string, in
which case it is parsed as a VQL expression, or a VQL expression.

When we evaluate the query, it runs in an isolated scope. This
means that usually variables defined outside the query plugin are
not visible inside the query.

You can use the `env` parameter to specify a dict of variables
that will be visible inside the query. This allows to control how
variables are shared between the new isolated scope and the
existing scope outside the query.

Below we describe a few quirks that users might encounter with
this plugin.

### Custom artifacts

The isolated scope does not contain any artifacts by
default. Usually artifacts are accessible from VQL using the
`Artifact` plugin, for example the following accesses the
`Custom.VQL` artifact:

```vql
SELECT * FROM Artifact.Custom.VQL()
```

This will not work in the query plugin because the scope is
isolated. If you want to use the `Artifact` plugin in the new
scope you need to pass it through the `env` variable:

```vql
SELECT * FROM query(query={
      SELECT * FROM Artifact.Custom.VQL()
}, env=dict(artifact=Artifact))
```

### Remapping rules

When using the `remap()` function to install a new remapping
configuration, the remapping applies on the current scope and
affect all further VQL statements after the `remap()` function is
evaluated. This means that it is impossible to revoke the
remapping configuration and restore the scope.

For this reason we recommend that remapping rules be applied
inside an isolated `query()` scope. This way the remapping will
only apply for the like of the `query()` plugin invocation.

### Using LET statements inside the query

The `query` parameter can specify a VQL statement or a string
which will be parsed into a VQL statement. If you use a VQL
statement it is no possible to use a LET expression (since LET is
a separate statement). So this is not valid VQL syntax:

```vql
SELECT * FROM query(query={
  LET Foo(X) = ....
  SELECT * FROM Foo(X=1)
})
```

You can define the LET statements outside the query block and pass them in:
```vql
LET Foo(X) = ....

SELECT * FROM query(query={
  SELECT * FROM Foo(X=1)
}, env=dict(Foo=Foo))
```

Or declare the VQL block as a string;
SELECT * FROM query(query='''
  LET Foo(X) = ....
  SELECT * FROM Foo(X=1)
''')
```

### Running a query in a different org

Normally a VQL query runs in the org context in which it was
started. However sometimes it is useful to run in different
context. The `query()` plugin allows you to execute the query in
another scope context created within a different org.

To do this your user account must be sufficient permissions in the
target org (The query will use the user's ACL permissions token
for the target org).

For example the following query lists all the clients from all orgs:

```vql
SELECT *
FROM foreach(row={
   SELECT OrgId
   FROM orgs()
},  query={
   SELECT *, OrgId
   FROM query(query={ SELECT client_id FROM clients() }, org_id=OrgId)
})
```

### Running as a different user

You can specify a different user to run the VQL. This will load
the other user's ACL token and username (basically this acts like
the Linux `sudo` command).

You need to have the IMPERSONATION ACL permission to be able to do
this (Usually only admins have it). This permission is equivalent
to administrator because a user with this permission can become
any user they want including the administrator.


