---
title: "Remote Uploads"
date: 2023-04-02T04:31:24Z
draft: false
weight: 45
---

By default, Velociraptor's offline collector will create a ZIP file
containing all the collected files and artifacts. However, this zip
file is normally large and we may not want to rely on the person
collecting the data to handle sending us the archive file. Instead,
Velociraptor's offline collector can upload the collected archive to a
remote location automatically when the collection is done.

![The Offline Collector supports many types of uploads](offline_collection_types.png)

In this page we discuss how to use some of these options. The correct
option to choose in any specific scenario depends on many factors,
such as network access, cost and availability.

## Encrypting the collection

Velociraptor's artifact collections typically include a lot of
potentially sensitive information, such as logs, user activity etc. By
default the archive produced is a simple ZIP file, but we recommend
the Zip file be protected with some encryption.

![Output container can be encrypted using a number of schemes](encrytion_schemes.png)

### Password encryption

Velociraptor can use a ZIP password to encrypt the collected
data. Unfortunately the ZIP encryption standard does not cover the
Central Directory making it possible to see file names, sizes and
other metadata, even if the file content itself is encrypted.

To mitigate this risk, Velociraptor will create an embedded ZIP file
inside an encrypted container zip file with a fixed name (called
`data.zip`). This way the file metadata is not exposed without needing
to decrypt the embedded ZIP file.

{{% notice warning "Password encrypted ZIP files" %}}

If using a fixed password to encrypt the collection, the password
needs to be embedded within the collector itself. It is easy to
extract the collector configuration (simply by running `collector.exe
config show`) and therefore the fixed password can be easily
extracted.

We recommend an asymmetric scheme to be used in practice.

{{% /notice %}}

### X509 certificate based encryption

To avoid needing to embed the password in the collector binary,
Velociraptor offers an X509 scheme. In this scheme the Velociraptor
server embeds its public certificate in the collector binary.

The offline collector then generates a random password to encrypt the
collection archive with, and in turn encrypts this password with the
embedded public key certificate. This means **only** the server with
the corresponding private key is able to decrypt the zip file.

To use this option, simply select the `X509 Certificate` option for
the collector and leave the `Public Key/Cert` text box blank. The
produced collector will automatically encrypt the container.

![Offline collector encrypting the output container](encrypting_container.png)

The produced collection contains the encrypted data and the metadata
file that can be used to decrypt the file given the correct private
key.

![The contents of the encrypted collection file](encrypted_file_content.png)

To extract the X509 encrypted container you can use Velociraptor's
`unzip` command to decrypt the container automatically. You will need
to provide Velociraptor with the correct config file for the server
that created the collector in the first place. Velociraptor will use
the server's private key to decrypt the container transparently.

```
velociraptor.exe --config server.config.yaml unzip Collection-WIN-ADLPBK6BTV0-2023-04-09T07_26_25-07_00.zip
```

![Inspecting the encrypted container](extracting_encrypted_files.png)

Alternatively, you can import the encrypted collection to the
Velociraptor server using the `Server.Utils.ImportCollection`
artifact.

{{% notice tip "X509 encrypted collections" %}}

Due to the ease of use and enhanced security provided by the X509
encryption scheme we recommend this to be used in most cases.

Make sure that you retain the server configuration file that was used
to create the collector in the first place! It is needed to be able to
decrypt the collections.

{{% /notice %}}

## Zip Archive

By default Velociraptor's collector will simply create a ZIP file and
leave it in the current directory.

In many scenarios, the collection is performed by a trusted agent
(such as a remote IT professional). In that case it is useful to
automatically upload the collection to a remote system.

The following sections document additional options and the best
practice of securing them.

## SMB Share

SMB is the Microsoft file sharing protocol which is a convenient
option for Windows based systems. Velociraptor supports uploading to
SMB shares since release 0.6.9.

To configure this option we need to:
1. Create a new local uploader user on one of the windows systems
   accessible to the host the collection is running on.

![Creating a local user for uploads](local_user.png)

2. Create a directory to receive the files.
3. Share the directory out to the local uploader user.

![Right click on directory and select properties/sharing tab then click the share button](sharing_directory.png)

4. Adjust directory ACLs to only permit the user to write files
   without being able to list the directory or read the files. This is
   required because the uploader user credentials must be embedded in
   the offline collector so we do not want these misused to alter any
   of the other uploads.

![Adjusting directory permissions to only provide write access](directory_permissions.png)

It is best to test the SMB configuration works as desired using the
simple VQL query in a notebook.

```vql
LET SMB_CREDENTIALS <= dict(`192.168.1.112`="uploader:test!password")

SELECT upload_smb(accessor="data",
    file="Hello world",
    name="hello.txt",
    server_address="//192.168.1.112/uploads")
FROM scope()

SELECT *
FROM glob(globs="*",
    root="//192.168.1.112/uploads",
    accessor="smb")
```

The above query:
1. Sets the global credential cache for use of SMB
2. Uploads a test file called "hello.txt" to the uploader directory
3. Attempts to list the uploads directory using the `glob` plugin.

The upload file should succeed but the `uploader` user should not be
able to list the directory.

![Testing the SMB permissions with a VQL query](testing_smb.png)

We are now ready to specify the details to the offline collection
GUI. NOTE: Usually it is better to use the IP of the server rather
than the name for improved reliability.

![Creating the SMB offline collector](creating_smb_collector.png)

## Azure Blob Storage

Velociraptor supports uploading to Azure since version 0.6.9.

Azure is a popular cloud provider by Microsoft, and this is a popular
choice for uploading collection archives from remote systems. This
choice is suitable when the system is internet connected and you do
not want to make other changes to the network (e.g. standing up an SMB
server as above).

Azure supports an authentication policy called [Shared Access
Signature
(SAS)](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview)
making it convenient and secure to provide limited access to the
a storage container. Using this method, we can embed a simple SAS URL
that provides access to upload data to the storage container without
granting the ability to download or remove any data. This is ideal for
embedding in the offline collector.

The steps required to set up Azure access are:

1. Create a storage account.
2. Create a new data storage container to receive the uploads

![Creating a new Azure Blob storage container](creating_azure_container.png)

3. Add a role assignment to allow the storage account to manage the storage

![Adding a role assignment to the storage account](azure_role_assignment.png)

3. Generate a SAS Policy URL.

![Right click on the container to generate a SAS policy](generating_sas_policy.png)

4. Create a SAS policy with only write and create access. You can
specify an appropriate expiry time for the SAS URL. After this time
the uploader will no longer work.

![SAS Policy should have only Write and Create Access](sas_policy_details.png)

5. Test the SAS URL works properly

![Test the SAS Policy by uploading a small file in the notebook](testing_sas_url.png)

6. Embed the SAS URL in the offline collector.

![Simply paste the SAS URL in the collector GUI](sas_collector.png)
