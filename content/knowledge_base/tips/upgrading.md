# How do I upgrade my server and clients?

To upgrade the Velociraptor server to a new version, simply download the latest release binary from the GitHub Release Page and regenerate a new `Debian` package as described above, but using the existing configuration file.

See [this page for more details]({{< ref "/docs/deployment/cloud/#server-upgrades" >}})

To upgrade the Velociraptor clients, you will need to push out new MSIs using the existing client configuration files.

More details on [Client upgrades]({{< ref "/docs/deployment/clients/#client-upgrades" >}})
