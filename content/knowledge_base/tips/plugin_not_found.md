# What to do about error "Plugin info not found"

Velociraptor VQL queries can run on the server in the context of
server artifacts or notebook queries. Usually server side VQL is used
to post-process collected results, manage the server configuration,
schedule new collections etc.

However, server side VQL can do a lot more than that - including shell
out to external binaries, read and write files on the server or
connect to external servers. In some deployments (especially shared
deployments) it is desirable to block any functionality on the server
which may interfere with other users or server security or
configuration.

In recent Velociraptor versions the administrator can add an allow
list to the configuration file. This forces server side VQL to only
register plugins on the allow list, so potentially dangerous plugins
are not present at all (regardless of the Velociraptor permission
model).

The configuration wizard will offer this functionality using the
question:

```
Do you want to restrict VQL functionality on the server?

This is useful for a shared server where users are not fully trusted.
It removes potentially dangerous plugins like execve(),filesystem access etc.
```

If you selected this during configuration you will receive these
errors in the notebook (or using the API) for any plugins not in the
allow list:

```
ERROR:Plugin info not found.
```

If you decide you need this particular plugin you can either add to
the allow list in the server configuration file. Or you may remove the
allow list entirely (which allows all plugins to be registered).

Tags: #vql #configuration #deployment
