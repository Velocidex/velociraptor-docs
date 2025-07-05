# How to initialize a Velociraptor server with custom artifacts?

Velociraptor frontend process has a component called the `Artifact
Repository`. This component knows about all the artifacts that are
defined. When the server starts up, it loads artifacts into the
repository from the following sources.

1. Built in artifacts are embedded into the binary itself.
2. It is possible to provide custom artifacts inside the configuration
   file itself.
3. Providing a directory with the `--definitions` flag will cause
   Velociraptor to scan the directory for artifact YAML files.
4. Finally, the server will load artifacts from the configured
   filestore path under `<filestore>/artifact_definitions`. These are
   usually the custom artifacts defined through the GUI.

The location of where an artifact came from does not matter,
Velociraptor organizes artifacts internally using the artifact
name. It is customary to denote custom artifacts with the `Custom.`
prefix but this is not mandatory.

{{% notice warning Overriding built in artifacts %}}

Velociraptor does not allow a custom artifact to override a built in
artifact (i.e. have the same name). Built in artifacts are protected
because overriding built in artifacts may break the proper
functionality of Velociraptor. If you want to customize a built in
artifact, simply change the name when you save it.

Velociraptor considers artifacts defined in the config file, or given
in the `--definitions` directory as "built in".

{{% /notice %}}

## Specifying a startup artifact.

When the Velociraptor server is run for the very first time, it
creates an install record in the filestore
`<filestore>/config/install_time.json.db`. It can then setup initial
artifacts to collect as specified by the config file:

```yaml
Frontend:
  default_client_monitoring_artifacts:
  - Generic.Client.Stats
  initial_server_artifacts:
  - MyServerArtifact
  default_server_monitoring_artifacts:
  - MyCustomServerMonitor
```

In the above snippet, we see the following parameters:

* `default_client_monitoring_artifacts` specifies the initial client
  monitoring table that will be created. By default, Velociraptor
  collects endpoint CPU and Memory telemetry from all endpoints. You
  can remove this, or specify a different client artifact to collect.

* `default_server_monitoring_artifacts` specifies an initial set of
  server event artifacts to collect.

* `initial_server_artifacts` is a list of server artifacts that will
  be automatically launched on the server on initial startup. You can
  specify the names of any artifacts here (including custom artifacts)
  which can be bootstrapped to perform any kinds of server
  configuration needed. The artifacts are simply scheduled and will
  appear in the usual `Server Artifacts` screen.

{{% notice note %}}

Currently it is not possible to specify parameters for initial
artifacts so if you need to tweak the parameters it is best to create
a custom artifact that in turn launches the needed artifacts with the
correct parameters. You can find an example below.

{{% /notice %}}

## Initializing the server using a custom artifact.

For more complex initialization tasks you can write a custom artifact
that will be collected the first time the server is started. The
artifact can import any custom artifacts and start monitoring
queries. The custom artifact should take no arguments. It is most
reliable to add the custom artifact to the configuration file itself
to ensure it is loaded and ready when the server initializes.

For example, the relevant part of the server configuration might be:

```yaml
autoexec:
  artifact_definitions:
    - name: InitializeServer
      description: Setup the server on first run
      sources:
        - query: |
            LET _ <= SELECT *
                     FROM Artifact.Server.Import.CuratedSigma()

            SELECT add_client_monitoring(
                      label="Monitoring",
                      artifact="Windows.Hayabusa.Monitoring",
                      parameters=dict(RuleLevel="Critical, High, and Medium",
                                      RuleStatus="Stable")) AS Monitoring,
                  artifact_set_metadata(name="InitializeServer", hidden=TRUE)
            FROM scope()

Frontend:
  initial_server_artifacts:
    - InitializeServer
```

The above parts:
1. An artifact is defined inline in the config file.

2. The artifact imports the Sigma artifacts from the velociraptor
   sigma projects (you can add your own URLs to import your own set of
   custom artifacts).
3. A client monitoring artifact is added using the `Hayabusa` Sigma
   artifact targeting the "Monitoring" label. Parameters to the
   artifact are passed here.
4. Finally the server is configured to collect the `InitializeServer`
   artifact when first run.

Tags: #deployment #configuration
