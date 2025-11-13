---
title: "Working With Offline Collection Data"
menutitle: "Collection Data"
date: 2025-11-03
last_reviewed: 2025-11-13
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
[to copy/replicate data in testing or training environment]({{< ref "/knowledge_base/tips/prepopulate_server/" >}}),
or
[as a storage format for data backups]({{< ref "/artifact_references/pages/server.utils.backupdirectory/" >}}).


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

![](zip_cert_secured.png)


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

Offline collectors extract a unique `HostID` from the operating system and
stores this in the offline collection data. This ID is expected to not change
over the lifetime of the operating system. When offline collections are imported
into the server, this ID is used to construct the unique Velociraptor
`client_id` if you don't specified one during the import. This means that
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
collections. It only caters for collection containers that are either protected
using the server's X509 certificate or that are unprotected. Currently this
artifact does not support importing collection containers that are secured by
PGP, X509 certs other than the server's cert, or fixed passwords. However import
of collections secured by these other security schemes are supported using
alternative methods described
[below]({{< relref "/#importing-via-a-notebook" >}}).

Alternatively, if you want to use the `Server.Utils.ImportCollection` server
artifact to import a collection container that's been secured using a fixed
password, a PGP certificate, or an X509 _other than your server's certificate_
then you'll need to first
[manually extract]({{< relref "#manual-decryption" >}})
the inner zip (`data.zip`) from the protected outer zip, and then import that.

![Importing a collection container zip](import01.png)

![Matching to an existing client is attempted](import02.png)

![New virtual client is created](import03.png)

You can then click on the Client ID to go to that client's Collected Artifacts
screen and there you will find the collections presented exactly as they would
be for any "online" client.

### Importing via a notebook

The easiest way to run the
[import_collection]({{< ref "/vql_reference/server/import_collection/" >}})
VQL function is in a global notebook. However you may prefer to create your own
custom server custom server artifact similar to `Server.Utils.ImportCollection`
since notebooks and server artifacts are just different ways of running VQL on
the server.

#### X509 encryption using the server's certificate

For collection containers that are secured with the server's X509 certificate or
that are unprotected, the import can be done in a notebook without any
additional steps. This is a straightforward use of the `import_collection()` VQL
function.

###### Example

```vql
SELECT import_collection(filename="/path/to/zips/Collection-WIN-KMODJ1W0CYG-2025-11-10T20_11_40Z.zip")
FROM scope()
```


#### PGP, non-server X509 cert, or fixed password

For collection containers that use these protection schemes there is an
additional step required. We can only import these if we also provide the
`import_collection` function with the password. So the extra step is obtaining
that password.

##### Fixed password scheme

For the fixed password scheme that's easy because you set the password when
you created the collector. If you can't remember it, you can go find it in the
`Server.Utils.CreateCollector` collection that created the collector, or if you
have access to the collector binary you can use the `config show` command since
the embedded config contains the password in clear text.

When the `import_collection` function is run it checks for a variable in the
scope named `ZIP_PASSWORDS` which it expects to contain the password as a
string.

###### Example

In this example we set the password to "infected" when we created the
collector. Before importing we set the variable in the local scope.

```vql
LET ZIP_PASSWORDS <= "infected"
SELECT import_collection(filename="/path/to/zips/Collection-WIN-KMODJ1W0CYG-2025-11-10T18_36_27Z.zip")
FROM scope()
```

##### PGP, X509 (non-server cert) encryption schemes

If you chose to encrypt the collection container with a PGP certificate or an
X509 cert _other than the server's cert_, then you need to first decrypt the
encrypted zip password as an additional step. This can be done in a Velociraptor
notebook (which we describe here) or
[using external tools]({{< relref "#extraction-with-external-tools" >}}).

The collection container will contain a file at the top level named
`metadata.json`. This file contains the encrypted version of the zip password in
the field named `EncryptedPass`. To decrypt this string we also need the private
key that corresponds to the `PublicKey` which was used to encrypt it. The public
key is also provided in the `metadata.json` file, in case you need to be
reminded which one was used.

![example: metadata.json](encrypted_file_metadata.png)

In a notebook we can use the
[pk_decrypt]({{< ref "/vql_reference/encode/pk_decrypt/" >}})
VQL function to decrypt the encrypted zip password.
Note that Velociraptor does not support passphrase-protected keys.

###### Example

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
`import_collection` function the same way we did for the non-encrypted
password case:

```vql
LET ZIP_PASSWORDS <= "c7889f8d2292f284c1f703b9fd367c86d618d9b4170af26f65"
SELECT import_collection(filename="/path/to/zips/Collection-WIN-KMODJ1W0CYG-2025-11-10T18_36_50Z.zip")
FROM scope()
```

### Bulk collection imports

If you have many collection containers to import, you will probably want to
automate the process by iterating over the zips and importing them one by one.

This can be done using VQL in a
[notebook]({{< ref "/docs/notebooks/" >}}), a
[server artifact]({{< ref "/docs/artifacts/basic_fields/#-type-" >}}), or
[via an API query]({{< ref "/docs/server_automation/server_api/" >}}).

Automating this process assumes that the collection containers can be
automatically decrypted (i.e. X509 using the server's cert), or are unprotected.
If you used the fixed password scheme, such that all your collection zips are
secured by the same password, then you can add `LET ZIP_PASSWORDS <= ...` to
your VQL so that `import_collection` has access to it.

###### Example

```vql
LET ZipsDir <= "/tmp/imports/"

SELECT OSPath, import_collection(filename=OSPath)
FROM glob(globs="*.zip", root=ZipsDir)
```

## Accessing collection containers without importing

Sometimes you may want to work with the data external to Velociraptor. For
example you may want to process the collected data with external tools.


### Extraction with external tools

If you want to extract the collection containers without using Velociraptor at
all, this is entirely possible.

#### No encryption or password encryption

Unzipping using external tools is straightforward if you didn't configure the
collector to apply a certificate-based encryption scheme to the collection zip,
but we remind you that the certificate-based schemes are strongly recommended in
all cases.

If no encryption scheme was used then the container is just an ordinary
unprotected zip.

If the fixed password scheme was used then the collection container is simply a
standard password-protected zip.

![](zip_pass_secured.png)


#### Certificate-based schemes

For the X509 and PGP encryption schemes, the collection container is still just
a password-protected zip, but the password is encrypted and must therefore be
recovered first by decrypting it.

The collection container will contain a file at the top level named
`metadata.json`.

![](zip_cert_secured.png)

This file contains the encrypted version of the zip password in the field named
`EncryptedPass`. To decrypt this string we also need the private key that
corresponds to the `PublicKey` which was used to encrypt it. The public key is
also provided in the `metadata.json` file, in case you need to be reminded which
one was used.

![example: metadata.json](encrypted_file_metadata.png)

You can manually copy the encrypted password from that file and decrypt it using
external tools such a `openssl` or `gpg` with the relevant private keys.

If decrypting the password with external tools then you'll likely also need to
first decode the encrypted password since the JSON format of `metadata.json`
requires that we store it in Base64-encoded form.

While working in a separate environment from your Velociraptor deployment, it is
still possible to make use of a Velociraptor notebook, as described
[here]({{< relref "/docs/deployment/offline_collections/collection_data/#pgp-x509-non-server-cert-encryption-schemes" >}}),
to do the password decryption. Since the notebook only needs the encrypted
password and the relevant cert, it can be done on an
[Instant Velociraptor]({{< ref "/docs/deployment/#instant-velociraptor" >}})
instance that is completely separate from your Velociraptor deployment.

Once you have decrypted the password you can use it with any unzip tool to
extract the contents of the collection container.

### Extracting or listing with the unzip command

To extract the collection container on the command line you can use
Velociraptor's [`unzip` command]({{< ref "/docs/cli/misc/#-unzip-" >}}).
This command only supports collections secured with the server's X509
certificate and unprotected zips.

To decrypt an X509-secured container automatically, you will need to provide
Velociraptor with access to the config file of the server that created the
collector. Velociraptor will then use the server's private key to decrypt the
container transparently.

If you want to extract or list X509-secured collection containers on a machine
other than your Velociraptor server, you use a copy of the `server.config.yaml`.
_Just remember that the config should be carefully guarded precisely because it
contains the server's private key and possibly also the private key of the
internal CA!_

###### Example: Listing

```sh
velociraptor --config server.config.yaml unzip Collection-WIN-KMODJ1W0CYG-2025-11-10T18_36_27Z.zip --list
```

![Listing contents of an X509 encrypted container](listing_encrypted_files.png)

The `unzip` command used with the `-v` and  `--report_password` flags will also
display the decrypted password.

```sh
velociraptor --config server.config.yaml unzip Collection-WIN-KMODJ1W0CYG-2025-11-10T18_36_27Z.zip --list --report_password -v
```

![Listing and displaying the password](report_password.png)


If the `--list` (or `-l`) flag is not provided then the `unzip` command will
extract the contents of the container into the current directory. If you want to
specify a different directory then the `--dump_dir` flag should be used (it will
create the specified directory if it doesn't exist).

###### Example: Extracting

```sh
velociraptor --config server.config.yaml unzip Collection-WIN-KMODJ1W0CYG-2025-11-10T18_36_27Z.zip --dump_dir ./output/
```

![Extracting an encrypted container](extracting_encrypted_files.png)


### Mounting with the fuse container command

It's possible to work with the contents of collection containers by mounting
them with FUSE instead of extracting them. The Velociraptor Linux binary
provides the [`fuse container` command]({{< ref "/docs/cli/fuse/" >}}) which
allows us to mount collection containers on a directory.

Using FUSE allows efficient and rapid access because the container does not need
to be extracted. Non-sequential access is provided by the FUSE driver. This is a
significant benefit if you're working with a large number of huge collection
containers. This also means that you don't need to consume disk space by
extracting the data.

The `fuse container` command has many advantages (some enabled by command line
flags) over simply extracting the contents of the zip container, especially when
the collection contains files collected from the endpoint that you want to
inspect with external tools. It can:

- merge file collections from multiple (non-encrypted) containers
- convert raw device names to drive letters, e.g. `\\.\C:` -> `C:`
- strip the `:` from drive letters in paths, e.g. `C:` -> `C`
- escape `/` characters in Windows path components, e.g. `abc/xyz` -> `abc\/xyz`
  because on Linux the `/` is a path separator and not valid within a path
  component.
- emulate the original timestamps for bulk file collection artifacts such as
  `Windows.Triage.Targets`

If you want to use a specific external tool to analyze the files, then the above
options give you the flexibility to adjust the presentation of the file and
folder structure so that it best suits the requirements of your external tool.


##### Auto-decryption

The `fuse container` command only works with collection containers that can be
automatically decrypted or accessed without encryption. This means containers
that are secured with the server's X509 cert, or non-encrypted containers.

###### Example: Mounting an X509-protected container

```sh
velociraptor fuse container -c server.config.yaml \
--map_device_names_to_letters --strip_colons_on_drive_letters \
--unix_path_escaping --emulate_timestamps /tmp/exports/fuse_mount \
/tmp/exports/eventlogs-WIN-KMODJ1W0CYG-2025-11-12T10_24_44Z.zip -v
```
##### Manual decryption

If you have collection containers secured with other schemes then you can
decrypt the password manually, extract the inner zip, and then FUSE mount it.

This applies also to the situation where you want to mount multiple zips. This
is necessary even if they are protected with the server's cert because
auto-decryption currently only supports one zip (the first one if multiple are
specified).

1. Obtain the decrypted password

   ```sh
   velociraptor --config server.config.yaml unzip eventlogs-WIN-KMODJ1W0CYG-2025-11-12T10_24_44Z.zip --list --report_password -v
   ```

2. Use the decrypted password to extract the collection container.

3. Repeat the above 2 steps for any additional containers.

4. Mount the inner zip (`data.zip`) using the `fuse container` command.

###### Example: Merge-mounting two manually extracted inner zips

  ```sh
  velociraptor fuse container \
  --map_device_names_to_letters --strip_colons_on_drive_letters --unix_path_escaping --emulate_timestamps \
  /tmp/exports/fuse_mount \
  /tmp/exports/eventlogs-WIN-KMODJ1W0CYG-2025-11-12T10_24_44Z/data.zip \
  /tmp/exports/prefetch-WIN-KMODJ1W0CYG-2025-11-12T10_25_06Z/data.zip -v
  ```

  ![Merge mount of 2 collection zips](merge_mount.png)

  ![Merged collection data in mount directory](fuse_mount_merged.png)

  Note that when 2 or more containers are merged they are layered over each
  other in the order that they were specified on the command line. So if there
  are 2 different files (or 2 different versions of the same file) using the
  same path then in the mount directory you will see the last one in stack. It's
  important to keep this in mind since the container format uses several
  standard paths for certain JSON files that describe the collection. Merging is
  primarily intended for files in the collection's "uploads", i.e. files copied
  from the endpoint.

Once the containers are mounted you can then apply other tools to the collection
data and/or files in the mount directory.

Reminder: Don't forget to `Ctrl+C` and `umount` when you're done!

<!--
### Dead disk analysis on a collection container

[Remapping]({{< ref "/docs/forensic/filesystem/remapping/" >}})
is one of Velociraptor's most versatile and powerful features. It was originally
designed to allow Velociraptor to support
[dead disk analysis]({{< ref "/blog/2022/2022-03-22-deaddisk/" >}}),
but turned out to be an incredibly useful capability that can be applied to a
broad range of problems.

In some sense, a collection container is not that much different from a disk
image which is also a type of storage container. Velociraptor can remap
accessors to allow transparent file access to various disk image formats and
filesystem types. Likewise, the collection container has a well-defined format
and we can remap the zip accessor and paths inside it to approximate the
filesystem of an endpoint. The remapping allows a Velociraptor client to operate
on the data as if it was running on a live endpoint.

The
[Windows.Collectors.Remapping]({{< ref "/artifact_references/pages/windows.collectors.remapping/" >}})
artifact calculates remapping rules to be able to operate directly on a
collection container, basically treating it the same as a dead disk. This allows
running further artifacts on the output of the offline collector without needing
to import the collection first.

Because collection containers are a common format used for both exported
collections and offline collectors, this artifact can be used for either case.

In it's description the artifact provides instructions for using it on the
command line in a standalone manner, but here we will show how it can
alternatively be used with a dedicated client that is connected to the server.

1. We start with a collection container that contains files collected by the
   `Windows.Triage.Targets` artifact, created by an offline collector. This file
   needs to be on the Velociraptor server because we are going to run the
   `Windows.Collectors.Remapping` server artifact in the GUI.

   Because we're using remapping things get a bit complicated with the zip
   protection schemes, so we should first manually extract the inner `data.zip`
   from the protected outer zip, as explained
   [here]({{< relref "#manual-decryption" >}}).
   We will then work with the non-encrypted `data.zip` container.

   Because the collection container is secured with the server's certificate
   and we're running the artifact via the GUI it will be able to auto-decrypt
   the collection container, as explained in the previous sections, and then
   generate the remapping by examining it's file contents.

2. We generate the remapping file by running the `Windows.Collectors.Remapping`
   artifact, providing it with the full path to the `data.zip`, the hostname,
   and a path to write the remapping file to.

   ![Windows.Collectors.Remapping parameters](collector_create_remapping.png)

   After running the artifact we can view it and confirm that it's correct.

   ![Viewing the remapping file](collector_view_remapping.png)

3. On the Server Dashboard screen in the GUI we download a client config file.
   Save it in the same folder where you saved the `remapping.yaml` file.

   ![Save a client config](download_client_config.png)

4. Using the `client.root.config.yaml` and `remapping.yaml`, we now start a
   virtual client that will connect to the server.

   ```sh
   velociraptor client -c client.root.config.yaml --remap remapping.yaml
   ```

   ![Virtual client connecting to the server](virtual_client_cli.png)

5. In the GUI we can search clients and see our new virtual client.

   ![Virtual client in the clients list](virtual_client_gui.png)


6. The virtual client is functionally the same as a normal client except that it
   runs collections against the offline collection container rather than the
   host it's running on. Obviously there are limitations because it's not a full
   live host, so certain artifacts may not work or produce unexpected results,
   but most artifacts that rely purely on file access should reliably produce
   meaningful analysis data. -->

