# How can I automate the creation of the offline collector?

The Velociraptor Offline collector is a [pre-configured triage and
acquisition tool]({{<ref "/docs/offline_triage/#offline-collections" >}}).

Velociraptor features a convenient GUI to allow creating the offline
collector's including building the configuration file and embedding it
inside the collector.

But what if we need to automate the creation of the collector? While a
GUI is nice it can be made much more efficient to automate the
collector.

When building the collector using the GUI you might notice that the
GUI simply preconfigured and launches a new server artifact and the
server simply collects that.

![The Create Offline Collector artifact](create_collector.png)


You can actually collect the same artifact using the command line (on
the server) or using the API (from anywhere). Here is an example with
PowerShell (assuming the server is running on Windows):

```powershell
velociraptor.exe --config server.config.yaml -v artifacts collect
   Server.Utils.CreateCollector
   --args OS=Windows
   --args artifacts='["""Generic.System.Pstree"""]'
   --args parameters='{"""Generic.System.Pstree""":{}}'
   --args target=ZIP
   --args opt_admin=N
   --args opt_prompt=N
   --output collector.zip
```

This command will create a new offline collector binary and store it
inside the file `collector.zip`

We can now extract the executable from the ZIP file (using powershell)

{{% notice note "Escaping quotes" %}}

Note that running this in powershell requires quotes to be escaped in
the powershell specific way. Usually it means expanding double quotes
(`"`) into 3 double quotes (`"""`)

https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_quoting_rules

{{% /notice %}}

```powershell
Expand-Archive .\collector.zip .\my_dir\
```

The collector binary will be found in the unpacked directory.

{{% notice note "Caveats" %}}

The above method relies on Velociraptor having access to the server
filesystem so it can find the configured tools - so this must be run
directly on the server machine. If your server is on linux be sure to
change to the velociraptor user first (`sudo -u velociraptor bash`)

{{% /notice %}}

Tags: #configuration #collector
