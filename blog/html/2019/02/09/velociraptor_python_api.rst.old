---
date: 2019-02-09T04:10:06Z
description: "Velociraptor usually is only a part of a wider solution
which might include a SIEM and SOC integration. In order to facilitate
interoperability with other tools, Velociraptor now offers an external
API."
title: "The Velociraptor Python API"
url: /blog/html/2019/02/09/velociraptor_python_api.html
categories: ["Blog"]
hidden: true
---


Velociraptor is very good at collecting artifacts from
endpoints. However, in modern DFIR work, the actual collection is only
the first step of a much more involved process. Typically we want to
post process data using more advanced data mining tools (such as data
stacking). Velociraptor usually is only a part of a wider solution
which might include a SIEM and SOC integration.

In order to facilitate interoperability with other tools, Velociraptor
now offers an external API. The API is offered via gRPC so it can be
used in any language which gRPC supports (e.g. Java, C++, Python
etc). In this blog post we illustrate the Python API but any language
should work.


The Velociraptor API Server
---------------------------

The API server exposes an endpoint ready to accept gRPC
connections. By default the API server listen only on the loopback
interface (127.0.0.1) but it is easy to change to be externally
accessible if you need by changing the `server.config.yaml` file:

.. code-block:: yaml

  API:
    bind_address: 127.0.0.1
    bind_port: 8001

Client programs simply connect directly to this API and call gRPC
methods on it.

.. image:: api_diagram.png

The connection is encrypted using TLS and authenticated using mutual
certificates. When we initially created the Velociraptor configuration
file, we created a CA certificate and embedded it in the
`server.config.yaml` file. It is this CA certificate which is used to
verify that the certificate each end presents was issued by the
Velociraptor CA.

.. note:: If you need to have extra security in your environment you
          should keep the original `server.config.yaml` file generated
          in an offline location, then deploy a redacted file (without
          the CA.private_key value) on the server. This way api client
          certificates can only be issued offline.

Before the client may connect to the API server they must have a
certificate issued by the Velociraptor CA. This is easy to generate:

.. code-block:: bash

   $ velociraptor --config server.config.yaml \
        config api_client --name Fred > api_client.yaml

Will generate something like:

.. code-block:: yaml

   ca_certificate: |
     -----BEGIN CERTIFICATE-----
     MIIDITCCAgmgAwIBAgIRAI1oswXLBFqWVSYZx1VibMkwDQYJKoZIhvcNAQELBQAw
     -----END CERTIFICATE-----
   client_cert: |
     -----BEGIN CERTIFICATE-----
     2e1ftQuzHGD2XPquqfuVzL1rtEIA1tiC82L6smYbeOe0p4pqpsHN1sEDkdfhBA==
     -----END CERTIFICATE-----
   client_private_key: |
     -----BEGIN RSA PRIVATE KEY-----
     sVr9HvR2kBzM/3yVwvb752h0qDOYDfzLRENjA7dySeOgLtBSvd2gRg==
     -----END RSA PRIVATE KEY-----
   api_connection_string: 127.0.0.1:8001
   name: Fred

The certificate generated has a common name as specified by the
`--name` flag. This name will be logged in the server's audit logs so
you can use this to keep track of which programs have access. This
file keeps both private key and certificate as well as the CA
certificate which must be used to authenticate the server in a single
file for convenience.

Using the API from Python
-------------------------

Although the API exposes a bunch of functions used by the GUI, the
main function (which is not exposed through the GUI) is the `Query()`
method. This function simply executes one or more VQL queries, and
streams their results back to the caller.

The function requires an argument which is a protobuf of type
VQLCollectorArgs:

.. code-block:: yaml

   VQLCollectorArgs:
        env:  list of VQLEnv(string key, string value)
        Query: list of VQLRequest(string Name, string VQL)
        max_row: int
        max_wait: int
        ops_per_second: float

This very simple structure allows the caller to specify one or more
VQL queries to run. The call can set up environment variables prior to
the query execution. The max_row and max_wait parameters indicate how
many rows to return in a single result set and how long to wait for
additional rows before returning a result set.

The call simply executes the VQL queries and returns result sets as
VQLResponse protobufs:

.. code-block:: yaml

   VQLResponse:
      Response: json encoded string
      Columns: list of string
      total_rows: total number of rows in this packet


The VQL query may return many responses - each represents a set of
rows. These responses may be returned over a long time, the API call
will simply wait until new responses are available. For example, the
VQL may represent an event query - i.e. watch for the occurrence of
some event in the system - in this case it will never actually
terminate, but keep streaming response packets.

How does this look like in code?
--------------------------------

The following will cover an example implementation in python. The
first step is to prepare credentials for making the gRPC call. We
parse the api_config yaml file and prepare a credential object:

.. code-block:: python

   config = yaml.load(open("api_client.yaml").read())
   creds = grpc.ssl_channel_credentials(
        root_certificates=config["ca_certificate"].encode("utf8"),
        private_key=config["client_private_key"].encode("utf8"),
        certificate_chain=config["client_cert"].encode("utf8"))

   options = (('grpc.ssl_target_name_override', "VelociraptorServer",),)

Next we connect the channel to the API server:

.. code-block:: python

    with grpc.secure_channel(config["api_connection_string"],
                             creds, options) as channel:
        stub = api_pb2_grpc.APIStub(channel)

The stub is the object we use to make calls with. We can then issue
our call:

.. code-block:: python

   request = api_pb2.VQLCollectorArgs(
            Query=[api_pb2.VQLRequest(
                VQL=query,
            )])

   for response in stub.Query(request):
       rows = json.loads(response.Response)
       for row in rows:
           print(row)

We issue the query and then just wait for the call to generate
response packets. Each packet may contain several rows which will all
be encoded as JSON in the Response field. Each row is simply a dict
with keys being the column names, and the values being possibly nested
dicts or simple data depending on the query.


What can we do with this?
-------------------------

The Velociraptor API is deliberately open ended - meaning we do not
pose any limitations on what can be done with it. It is conceptually a
very simple API - just issue the query and look at the results,
however this makes it extremely powerful.

We already have a number of very useful server side VQL plugins you
can use. We also plan to add a number of other plugins in future -
this means that the Velociraptor API can easily be extended in a
backwards compatible way by simply adding new VQL plugins. New queries
can do more, without breaking existing queries.

Post process artifacts
~~~~~~~~~~~~~~~~~~~~~~

This is the most common use case for the API. Velociraptor
deliberately does not do any post processing on the server - we don't
want to slow the server down by making it do more work than necessary.

But sometimes users need to do some more with the results - for
example upload to an external system, check hashes against Virus
Total, and even initiate an active response like escalation or
disruption when something is detected.

In a recent engagement we needed to collect a large number of $MFT
files from many endpoints. We wanted to analyze these using external
tools like `analyseMFT.py`.

We wrote a simple artifact to collect the MFT:

.. code-block:: yaml

   name: Windows.Upload.MFT
   description: |
      Uses an NTFS accessor to pull the $MFT

   parameters:
     - name: path
       default: \\.\C:\$MFT

   sources:
     - precondition:
         SELECT OS From info() where OS = 'windows'

       queries:
       - select upload(file=path, accessor="ntfs") as Upload from scope()

We then created a hunt to collect this artifact from the machines of
interest. Once each $MFT file is uploaded we need to run
`analyseMFT.py` to parse it:


.. code-block:: python

    QUERY="""
      SELECT Flow,
             file_store(path=Flow.FlowContext.uploaded_files) as Files
      FROM  watch_monitoring(artifact='System.Flow.Completion')
      WHERE 'Windows.Upload.MFT' in Flow.FlowContext.artifacts
    """

    with grpc.secure_channel(config["api_connection_string"],
                             creds, options) as channel:
        stub = api_pb2_grpc.APIStub(channel)
        request = api_pb2.VQLCollectorArgs(
            Query=[api_pb2.VQLRequest(
                VQL=QUERY,
            )])

        for response in stub.Query(request):
            rows = json.loads(response.Response)
            for row in rows:
                for file_name in row["Files"]:
                     subprocess.check_call(
                        ["analyseMFT.py", "-f", file_name,
                         "-o", file_name+".analyzed"])


The previous code sets up a watcher query which will receive every
completed flow on the server which collected the artifact
"Windows.Upload.MFT" (i.e. each completed flow will appear as a row to
the query).

We can have this program running in the background. We can then launch
a hunt collecting the artifact, and the program will automatically
process all the results from the hunt as soon as they occur. When new
machines are turned on they will receive the hunt, have their $MFT
collected and this program will immediately process that.

Each flow contains a list of files that were uploaded to it. The
`file_store()` VQL function reveals the server's filesystem path where
the files actually reside. The server simply stores the uploaded files
on its filesystem since Velociraptor does not use a database
(everything is a file!).

The python code then proceeds to launch the `analyseMFT.py` script to
parse the `$MFT`.

.. note::

   The nice thing with this scheme is that the `analyseMFT.py` is
   running in its own process and can be managed separately to the
   main Velociraptor server (e.g. we can set its execution priority or
   even run it on a separate machine). The Velociraptor server does
   not actually need to wait for post processing nor will the post
   processing affect its performance in any way. If the
   `analyseMFT.py` script takes a long time, it will just fall behind
   but it eventually will catch up. In the meantime, the Velociraptor
   server will continue receiving the uploads regardless.


The above example sets up a watcher query to receive flow results in
real time, but you can also just process the results of a specific
hunt completely using a query like:

.. code-block:: sql

   SELECT Flow, file_store(path=Flow.FlowContext.uploaded_files) as Files
   FROM hunt_flows(hunt_id=huntId)

Conclusions
-----------

The Velociraptor python API opens up enormous possibilities for
automating Velociraptor and interfacing it with other
systems. Combining the power of VQL and the flexibility (and user
familiarity) of Python allows users to build upon Velociraptor in a
flexible and creative way. I am very excited to see what the community
will do with this feature - I can see integration with ELK, BigQuery
and other data analytic engines being a valuable use case.

Please share your experiences in the comments or on the mailing list
at velociraptor-discuss@groups.google.com.
