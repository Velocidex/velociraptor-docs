---
title: "Working With Offline Collection Data"
menutitle: "Collection Data"
date: 2025-11-03
last_reviewed: 2025-11-10
draft: false
weight: 30
---

As described previously, the offline collector writes it's results into a zip
archive and optionally applies encryption to it. We technically refer to this as
a **collection container** because the data contained in the zip is structured
in a particular way that Velociraptor expects, and which includes metadata about
the collection that Velociraptor understands. This standardized data structure
allows Velociraptor to import the data from it, while making use of the
associated metadata when importing.

{{% notice tip %}}

Collection containers are also used when exporting collections or hunts from the
server. So the same data format that the offline collector uses can also be used
to transfer data from one server to another, for example
[to copy data to a server in testing or training environment]({{< ref "/knowledge_base/tips/prepopulate_server/" >}}).

{{% /notice %}}


Here is an example of the internal structure of a typical (unsecured) collection
container:

```text
data.zip
  ├── client_info.json
  ├── collection_context.json
  ├── log.json
  ├── requests.json
  ├── results
  │   ├── Windows.Triage.Targets%2FAll Matches Metadata.json
  │   ├── Windows.Triage.Targets%2FSearchGlobs.json
  │   └── Windows.Triage.Targets%2FUploads.json
  ├── uploads
  │   └── auto
  │       └── C%3A
  │           └── Users
  │               ├── ...
  │               └── ...
  ├── uploads.json
  └── uploads.json.index
```

As explained in
[Collection Security]({{< ref "/docs/deployment/offline_collections/#collection-security" >}}),
when collections are secured they are double-zipped. This is done to prevent
snooping on the collection filenames because the ZIP standard has the
shortcoming of allowing file listing even for protected zips. So we add an outer
zip on which we apply the encryption, which means that a file listing only
allows potential attackers to see the file name of the inner zip - not the names
of any files in the collection itself.


## Importing collections into the Velociraptor server

{{% notice note "Copying the collections to the server" %}}

Offline collections are typically much larger than web browser uploads will
allow, which is why we do not have a GUI facility to upload the collection zip
file into the server. So you will need to use an appropriate transfer mechanism
(such as SFTP or SCP) to upload the files to the server before importing them.

{{% /notice %}}

Most often we use the `Server.Utils.ImportCollection` artifact to import a
collection container, but this is essentially just a wrapper around the
[import_collection]({{< ref "/vql_reference/server/import_collection/" >}})
VQL function. If you need to perform a bulk import of many collections then it's
easy to automate that using VQL in either a notebook or a server artifact.

The Velociraptor server can automatically decrypt offline collection containers
when importing _if_ they were encrypted with the server's certificate. This
applies when importing via the GUI using the abovementioned artifact or using
your own VQL, since the `import_collection()` function always tries to do this
first. This auto-decryption is possible because the server has access to the
corresponding private key which it uses to decrypt the randomly-generated
encrypted password.

If you want to use the `Server.Utils.ImportCollection` server artifact to import
a collection container that's been secured using a regular password, a PGP
certificate, or an X509 _other than your server's certificate_ then you'll need
to first [manually extract]({{< relref "#manual-decryption" >}}) the inner zip
(`data.zip`) from the protected outer zip, and then import that.

Velociraptor offline collections generate a unique deterministic HostID on every
machine and stores this in the offline collector output. When offline
collections are imported into the server, this ID is used to construct the
unique `client_id` if you don't specified one during the import. This means that
separate collections from the same endpoint will be automatically associated
with the same "virtual client" in the server's datastore, unless you manually
specify a different `client_id` for each import.

If the collection you're importing comes from an existing client (real or
"virtual"), and you _didn't_ specify a `client_id` for the import, then the
server tries to match the `hostname` contained in the collection zip with an
existing client record. Again this attempts to match imports to existing client
records. It's not perfect under all scenarios - for example it's possible for
separate endpoints to have the same hostname in the real world - but most of the
time it should work. If you need to be absolutely sure about import matching the
right `client_id` then you should specify it instead of relying on the "auto"
option.

To summarize, the import process performs the following actions:

1. Inspects the zip file from a path specified on the server. Reads the
   metadata.json file, if present, to determine the encryption scheme and
   extract the encrypted password.

2. Decrypts the password if possible and then uses the password to unlock the
   `data.zip` inner container.

3. Creates a "virtual client" (that is, a Velociraptor client record) if one
   matching the hostname in the collection data does not exist.

4. Imports the collection data into the server datastore and associates it with
   the client.

In the client's **Collected Artifacts** view, the imported collections are
indistinguishable from those that were collected run on a normal "online"
client. The collections and their data will be available to any VQL queries run
from [notebooks]({{< ref "/docs/notebooks/" >}}),
[server_artifacts]({{< ref "/docs/artifacts/basic_fields/#-type-" >}}) or
[API queries]({{< ref "/docs/server_automation/server_api/" >}}).


### Importing using Server.Utils.ImportCollection

The `Server.Utils.ImportCollection` artifact is the most common way to import
collections. It caters for collection containers that are either protected using
the server's X509 certificate or that are unprotected.

![Importing a collection container zip](import01.png)

![Matching to an existing client is attempted](import02.png)

![New virtual client is created](import03.png)



### Importing via a notebook

The easiest way to run the `import_collection` function is in a global notebook.

#### X509 encryption using the server's certificate

For collection containers that are secured with the server's X509 certificate or
that are unprotected, the import can be done in a notebook without any
additional steps. This is a straightforward use of the
[import_collection]({{< ref "/vql_reference/server/import_collection/" >}})
VQL function.

**Example**

```vql
SELECT import_collection(filename="/path/to/zips/Collection-WIN-KMODJ1W0CYG-2025-11-10T20_11_40Z.zip")
FROM scope()
```


#### PGP, non-server X509 cert, or regular password

For collection containers that use these protection schemes there is a little
more complexity involved. We can only import these if we also provide the
`import_collection` function with the password.

##### Regular (non-encrypted) password scheme

For the regular password scheme that's easy because you set the password when
you created the collector. If you can't remember it, you can go find it in the
`Server.Utils.CreateCollector` collection that created the collector.

When the `import_collection` function is run it checks for a variable in the
scope named `ZIP_PASSWORDS` which it expects to contain the password as a
string.

**Example**

In this example we set the password to "infected" when we crreated the
collector. Before importing we set the variable in the local scope.

```vql
LET ZIP_PASSWORDS <= "infected"
SELECT import_collection(filename="/path/to/zips/Collection-WIN-KMODJ1W0CYG-2025-11-10T18_36_27Z.zip")
FROM scope()
```

#### PGP, non-server X509 cert encryption schemes

If you chose to encrypt the collection container with a PGP certificate or an
X509 cert _other than the server's cert_, then you need to first decrypt the
encrypted zip password as a manual step. This can be done in a Velociraptor
notebook or with external tools.

The collection container will contain a file at the top level named
`metadata.json`. This file contains the encrypted version of the zip password in
the field named `EncryptedPass`. To decrypt this string we also need the private
key that corresponds to the `PublicKey` which was used to encrypt it. Tthe
public key is also provided in the `metadata.json` file, in case you're not sure
which one was used.

In a notebook we can use the [pk_decrypt]({{< ref "/vql_reference/encode/pk_decrypt/" >}})
VQL function to decrypt the encrypted zip password.
The private key must not be passphrase-protected.

**Example**

```vql
LET PrivKey <= '''
-----BEGIN RSA PRIVATE KEY-----

...

-----END RSA PRIVATE KEY-----
'''

LET EncryptedPass <= base64decode(string="HmvxVDBNdjlC8dn ... pqBvigeqpG5o3Kew==")

SELECT str(str=pk_decrypt(data=EncryptedPass, private_key=PrivKey, scheme="rsa")) AS Password
FROM scope()
```
Note that in the above we used `scheme="RSA"` for the X509 scheme, but to
decrypt PGP you would use `scheme="pgp"` instead.

For this example the notebook provides the decrypted password like this:

![](decrypted_pass.png)

Now that we have the decrypted password we can provide it to the
`import_collection` function the same way we did for the regular non-encrypted
password case:

```vql
LET ZIP_PASSWORDS <= "c7889f8d2292f284c1f703b9fd367c86d618d9b4170af26f65"
SELECT import_collection(filename="/path/to/zips/Collection-WIN-KMODJ1W0CYG-2025-11-10T18_36_50Z.zip")
FROM scope()
```

### Bulk imports

If you have many collection containers to import, you will probably want to
automate the process by iterating over the zips and importing them one by one.

This can be done using VQL in a
[notebook]({{< ref "/docs/notebooks/" >}}),
[server_artifact]({{< ref "/docs/artifacts/basic_fields/#-type-" >}}), or
[via an API query]({{< ref "/docs/server_automation/server_api/" >}}).

Automating this process assumes that the collection containers can be
automatically decrypted (i.e. X509 using the server's cert), or are unprotected.
If you used the regular password scheme, such that all your collection zips are
secured by the same password, then you can add `LET ZIP_PASSWORDS <= ...` to
your VQL so that `import_collection` has access to it.

**Example**

```vql
LET ZipsDir <= "/tmp/imports/"

SELECT OSPath, import_collection(filename=OSPath)
FROM glob(globs="*.zip", root=ZipsDir)
```

## Accessing collection containers without importing

Sometimes you may want to work with the data external to Velociraptor. For
example you may want to process the collected data with external tools.








### Manual extraction with external tools

#### No encryption or password encryption

Unzipping using external tools is possible if you didn't tell the collector
to [apply encryption]
to the collection zip, but we strongly recommend that you use the encryption
feature in most situations.

![](zip_pass_secured)

But if the collection archive is encrypted then you'll need to use one of the
methods described below. These all involve providing Velociraptor with a config
containing the server's private key

#### Manual decryption

[manual decryption]({{< relref "#manual-decryption" >}})

![](zip_cert_secured)


##### X509 encryption using the server's cert

```sh
$ velociraptor --config server.config.yaml unzip -l Collection-WIN-2VKA2DK38DT_lan-2024-04-07T23_26_33-07_00.zip -v --report_password
```

![X509 password decryption](report_password.png)

Note that this does not necessarily need to be done on the server, although it
requires the server's private key which is read from the config file. You could
do this on any computer using a copy of the config. Alternatively you could use
just the private key as explained below for PGP or other X509 certs.

##### PGP encryption or a non-server X509 cert




### Extracting or listing with the unzip command

[unzip]({{< ref "/docs/cli/misc/#-unzip-" >}})

If you want to give other people the ability to decrypt the collection
you can share that `server.config.yaml` file with them and allow them
to unpack using:

```sh
velociraptor --config server.config.yaml unzip collection.zip --dump_dir /output/dir
```


### Mounting with the fuse container command

### Dead disk analysis of a collection container

May be from an offline collector or exported from the server.

https://docs.velociraptor.app/artifact_references/pages/windows.collectors.remapping/

it allows you to run a real client against the offline collection and
interactively collect other artifacts without needing to import it first

