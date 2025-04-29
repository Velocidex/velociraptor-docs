# How do I upgrade my server and clients?

To upgrade the Velociraptor server to a new version, simply download the latest release binary from the GitHub Release Page and regenerate a new `Debian` package as described above, but using the existing configuration file.

See [this page for more details]({{< ref "/docs/deployment/server/#server-upgrades" >}})

To upgrade the Velociraptor clients, you will need to push out new MSIs using the existing client configuration files.

More details on [Client upgrades]({{< ref "/docs/deployment/clients/#client-upgrades" >}})

## Supported Upgrade Scenarios

Matching client and server versions is the most supported configuration.
See [the support policy]({{< ref "/docs/overview/support/#client-and-server-versioning" >}})

Before upgrading perform testing of the combination of client and server versions to be used, compatibility of mixed versions is best efforts based on community testing and issues being reported.

 - Check [GitHub](https://github.com/Velocidex/velociraptor/issues) for issues reported by the community.
 - Read [release notes](https://github.com/Velocidex/velociraptor/releases) for all  versions between the current version, and the version you are moving to if skipping versions. Generally though avoid skipping versions.


## Other tips

 - Recent versions of clients and servers generally can communicate with each other without a problem, but new functionality may not be available on old clients. Artifacts like [this](https://github.com/Velocidex/velociraptor/issues/1566) will (0.6.4+) help reduce this.
 - Upgrading the server before clients is more common, so version problems are more likely to have been caught in community testing with this approach.
 - Consider running a parallel deployment as the most compatible way to upgrade. Such as when upgrading and there are known breaking changes between the current client and target server versions (going from self-signed to auto cert), or when there are large version differences (unusual combinations of client and server).

Tags: #configuration #admin
