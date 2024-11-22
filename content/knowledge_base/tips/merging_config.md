---
title: How can I override the configuration file?
---

Velociraptor relies on the configuration file to control the operation
of the server or client. Usually the configuration file is generated
interactively using the `velociraptor config generate -i` command.

Many people want to automate the configuration generation or override
the configuration in some way. This short tip covers some of the
common ways to do that.

## Automating configuration generation.

When generating a new configuration, Velociraptor will generate new
key material and create a reasonable skeleton for the supported
deployment scenario. In the following command, Velociraptor will emit
a basic configuration file template to standard output, which can be
easily redirected to a file:

```
$ velociraptor-v0.6.4-linux-amd64 config generate > /tmp/config.yaml
```

To customize the generated configuration we can apply a JSON
merge/patch step. [JSON
merge](https://datatracker.ietf.org/doc/html/rfc7396) and [JSON
patch](http://jsonpatch.com/) are standard ways of specifying a
transformation on a JSON object.

{{% notice tip Viewing the Configuration in JSON %}}

Normally the configuration file is in YAML but you can also view it in
JSON using the `--json` flag to the `config show` command:

```
velociraptor --config config.yaml config show --json
```

Since YAML is a superset of JSON you can also provide this JSON blob
to Velociraptor as the actual configuration (no need to convert it
back to YAML). This helps to prepare the JSON merge patch - simply
remove the fields you dont want to change and change the fields you do
want to change.

{{% /notice %}}

For example, imagine we want to specify a new URL for clients to
connect to. We can merge the following JSON blob with the config:

```
$ velociraptor --config /tmp/config.yaml config show --merge '{"Client":{"server_urls":["https://192.168.1.11:8000/", "https://192.168.1.12:8000/"]}}' > /tmp/new_config.yaml
```

It may be more convenient to store the JSON merge blob in a file
instead of specifying on the command line - use the `--merge_file`
option to provide it.

## Overriding configuration at runtime

While the `config show` command can be used to manipulate the
configuration file, sometimes we want to change a few values at
runtime on a temporary basis.

The first option is using the `--config_override` flag to specify the
path to a JSON merge file that overrides the configuration at
runtime. Velociraptor will load the configuration file specified by
the `--config` flag as normal, but then will apply the JSON merge blob
to override specific fields.

This is useful for specifying a larger configuration manipulation - it
will not change the main config file at all, but will change the
running configuration

## Overriding configuration via command line flags

Velociraptor allows most configuration settings to be overriden by
suitable command line flags. Since there are so many flags, the usual
help shown with the `--help` flag does not include these configuration
overriding flags.

You can see all the defined flags by enabling the DEBUG environment
variable:

```
$ DEBUG=1 ./velociraptor --help

...
  --config.client-writeback-darwin=CONFIG.CLIENT-WRITEBACK-DARWIN
  --config.client-writeback-linux=CONFIG.CLIENT-WRITEBACK-LINUX
  --config.client-writeback-windows=CONFIG.CLIENT-WRITEBACK-WINDOWS
  --config.client-tempdir-linux=CONFIG.CLIENT-TEMPDIR-LINUX
  --config.client-tempdir-windows=CONFIG.CLIENT-TEMPDIR-WINDOWS
```

This is useful to override specific settings temporarily - for example
when running the server in a cloud environment, the bind port is
determined by the platform. In this case it is easier to simply
override this on the command line rather than manipulate the config
file.

```
velociraptor --config /etc/velociraptor/server.config.yaml frontend --config.frontend-bind-port=$PORT
```


Tags: #configuration
