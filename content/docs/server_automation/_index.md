---
title: "Server Automation"
date: 2021-06-30T12:31:08Z
draft: true
weight: 60
---

Velociraptor's uprecedented flexibility arises from the power of
VQL. We have seen how VQL can be used to collect artifacts on the
endpoint, but VQL can be used on the server too.

Running VQL queries on the server allows for tasks on the server to be
automated. In this page we will see how server artifacts can be used
to customize server behaviour.

Before we discuss server automation we need to clarify some of the
terms used when discussing the server.

Client
: A Velociraptor instance running on an endpoint. This is denoted by client_id and indexed in the client index.

Flow
: A single artifact collection instance. Can contain multiple artifacts with many sources each uploading multiple files.

Hunt
: A collection of flows from different clients. Hunt results consist of the results from all the hunt's flows

## Enumerating all clients

You can enumerate all clients using the `clients()` plugin. This
plugin provides basic information about each client on the system,
including its client id and labels assigned to it.

{{% notice tip %}}

If you do not provide any parameters to the `client()` plugin,
Velociraptor will iterate over all the clients. This may result in a
lot of rows and might be slow for large deployments. You can provide a
`search` parameter, that uses the client index to find clients by
label or hostname very quickly (This is the same mechanism used in the
GUI search bar).

```sql
-- Use this
SELECT * FROM clients(search="MyHostname")

-- Rather than this
SELECT * FROM clients()
WHERE os_info.fqdn =~ "MyHostname"
```

{{% /notice %}}

An example of a client record can be seen here

```json
  {
    "client_id": "C.04b2307000dfdf7a",
    "agent_information": {
      "version": "2021-06-30T22:38:41Z",
      "name": "velociraptor",
    },
    "os_info": {
      "system": "windows",
      "release": "Microsoft Windows 10 Enterprise Evaluation10.0.19041 Build 19041",
      "machine": "amd64",
      "fqdn": "DESKTOP-8B08MEV-2",
      "install_date": 0,
    },
    "first_seen_at": 1625214706,
    "last_seen_at": 1625236655282715,
    "last_ip": "127.0.0.1:53786",
    "last_interrogate_flow_id": "F.C3FCU0R46JK6S",
    "labels": []
  }
```

### Exercise - label clients

Labels are using in Velociraptor to group certain hosts together. This
is useful for example when targetting a hunt, or to specify a set of
clients to run monitoring queries.

You can change a client's label using the `label()` VQL function.

Label all windows machines with a certain local username.

Launch a hunt to gather all usernames from all endpoints
Write VQL to label all the clients with user "mike"

This can be used to label hosts based on any property of grouping that makes sense.
Now we can focus our hunts on only these machines.
36

Exercise - label clients with event query
The previous method requires frequent hunts to update the labels - what if a new machine is provisioned?

Label all windows machines with a certain local username using an event query.
37

Server management with VQL
We just ran a hunt which downloaded 300Gb of data (oops!) now our server is full!

We need to delete the results from this hunt because we don't need them.
38

Develop “Server.Admin.DeleteHunt”
39
Step 1: Find all the flows launched within the hunt
Step 2: Figure out all the files that make up the flow: enumerate_flow()
Step 3: Remove these files: file_store_delete()

40
Start cancelling flows
If your hunts are too heavy and overload the server simply start cancelling flows with VQL.

The Velociraptor API
41

Why an API?
Velociraptor needs to plug into a much wider ecosystem

Velociraptor can itself control other systems
Can already be done by the execve() and http_client() VQL plugins.

Velociraptor can be controlled by external tools
Allows external tools to enrich and automate Velociraptor
This is what the API is for!

42

API Server
GUI
Client program (Python)
X509 Cert
X509 Cert
TLS with mutual certificate verification.
43
TLS authentication occurs through pinned certificates - both client and server are mutually authenticated and must have certificates issued by Velociraptor's trusted CA.
Execute arbitrary VQL

The Velociraptor API
The API is extremely powerful so it must be protected!
The point of an API is to allow a client program (written in any language) to interact with Velociraptor.
The server mints a certificate for the client program to use. This allows it to authenticate and establish a TLS connection with the API server.
By default the API server only listens on 127.0.0.1 - you need to reconfigure it to open it up.

Create a client API certificate
velociraptor --config server.config.yaml  --config server.config.yaml config api_client --name Mike --role administrator api.config.yaml
45

Grant access to API key
Currently two levels of access:
velociraptor --config /etc/velociraptor/server.config.yaml config api_client --name Mike --role reader,api api_client.yaml
velociraptor --config /etc/velociraptor/server.config.yaml acl grant Mike --role administrator,api

Access to push events to an artifact queue:
velociraptor --config /etc/velociraptor/server.config.yaml acl grant Mike '{"publish_queues": ["EventArtifact1", "EventArtifact2"]}'
46

Export access to your API
Normally Velociraptor is listening on the loopback interface only
If you want to use the API from external machines, enable binding to all interfaces
47

Using Jupyter to analyze hunts
48

Jupyter
Jupyter is an interactive notebook app

Runs python internally but we can use it to call the server via APIs
49

Install the python bindings
For python we always recommend a virtual environment and Python 3 then:

pip install pyvelociraptor jupyter pandas
50

51
Download the api_client.yaml file to your workstation and edit the api_connection_string to your external domain name

Run a simple query
Set the api file in the environment variable


Use the sample app in the PyVelociraptor bindings to test your connection to the server

pyvelociraptor "SELECT * FROM info()"


52

53

54

Running VQL on the server
Write a simple script by copying the sample app and editing it

    creds = grpc.ssl_channel_credentials(
        root_certificates=config["ca_certificate"].encode("utf8"),
        private_key=config["client_private_key"].encode("utf8"),
        certificate_chain=config["client_cert"].encode("utf8"))

    options = (('grpc.ssl_target_name_override', "VelociraptorServer",),)
    with grpc.secure_channel(config["api_connection_string"], creds, options) as channel:
        stub = api_pb2_grpc.APIStub(channel)
        request = api_pb2.VQLCollectorArgs(
            max_wait=1,
            Query=[api_pb2.VQLRequest(
                VQL=" SELECT * from clients() ",
            )])

        for response in stub.Query(request):
package = json.loads(response.Response)
            print (package)



55

Schedule an artifact collection
You can use the API to schedule an artifact collection


LET collection <= collect_client(client_id='C.cdbd59efbda14627', artifacts='Generic.Client.Info', args=dict())
56

Wait for the client to finish
When a collection is done, the server will deliver an event to the System.Flow.Completion event artifact

You can watch this to be notified of flows completing

SELECT * FROM watch_monitoring(artifact='System.Flow.Completion') WHERE FlowId = collection.flow_id LIMIT 1
57

Reading the results
You can use the source() plugin to read the results from the collection.

SELECT * FROM source(client_id=collection.ClientId, flow_id=collection.flow_id, artifact='Generic.Client.Info/BasicInformation')
58

Exercise: Put it all together
Write VQL to call via the API to collect an artifact from an endpoint and read all the results in one query.
59

Event Queries and Server Monitoring
60

Server Monitoring
We have previously seen that event queries can monitor for new events in real time

We can use this to monitor the server via the API using the watch_monitoring() VQL plugin.


61
The Velociraptor API is asynchronous. When running event queries the gRPC call will block and stream results in real time.

Exercise - Watch for flow completions
We can watch for any flow completion events via the API
This allows our API program to respond whenever someone collects a certain artifact (e.g. post process it and relay the results to another system). We can also automatically collect another artifact after examining the collected data.
SELECT * FROM
    watch_monitoring(artifact=’System.Flow.Completion’)
62

Server side VQL Event artifacts
63

Server Event Artifacts
We saw that API clients can run VQL Event queries.
The Velociraptor server also offers a permanent Event Artifact service - this will run all event artifacts server side.

We can use this to refine and post process events only using artifacts. We can also react on client events in the server.

64

Exercise: Powershell encoded cmdline
Powershell may accept a script on the command line which is base64 encoded. This makes it harder to see what the script does, therefore many attackers launch powershell with this option
We would like to keep a log on the server with the decoded powershell scripts.
Our strategy will be:
Watch the client’s process execution logs as an event stream on the server.
Detect execution of powershell with encoded parameters
Decode the parameter and report the decoded script.
Store all results as another artifact.
65

Server side artifacts
Client Event Artifacts

Windows.Event.ProcessCreation


Server











Windows.Event.ProcessCreation Log files
Server VQL watches the log file for specific events of interest
Windows.Event.ProcessCreation
66
Server.Powershell.EncodedCommand



Install a server side event monitor
67

Install a client side event monitor
68

Generate an encoded powershell command using

powershell -encodedCommand ZABpAHIAIAAiAGMAOgBcAHAAcgBvAGcAcgBhAG0AIABmAGkAbABlAHMAIgAgAA==

Wait 2 minutes for events to be delivered.


69

70

Conclusions
Velociraptor is essentially a collector of data
Velociraptor has a number of ways to integrate and be controlled by other systems
VQL provide execve() allowing Velociraptor to invoke other programs, and parse their output seamlessly.
On the server VQL exposes server management functions allowing automating the server with artifacts.

71

Conclusions
The Velociraptor server exposes VQL via a streaming API - allowing external programs to
Listen for events on the server
Command the server to collect and respond
Enrich and filter data on the server for better triaging and response.

72
