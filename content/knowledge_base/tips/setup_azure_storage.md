# How to set up Azure Blob Storage for file uploads

Microsoft Azure's Blob Storage service can be a useful upload destination for
receiving files from Velociraptor clients or collection archives from
[offline collectors]({{< ref "/docs/deployment/offline_collections" >}})
in scenarios where the source system is internet connected and you do not want
to stand up storage services on the local network.

This is made possible by the
[upload_azure]({{< ref "/vql_reference/other/upload_azure/" >}}) VQL function.

Azure supports an authentication policy called
[Shared Access Signature (SAS)](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview)
making it convenient and secure to provide limited access to the a storage
container. Using this method, we can embed a simple SAS URL that provides access
to upload data to the storage container without granting the ability to download
or remove any data.

This article explains how to set up an Azure storage container with appropriate
security for file uploads.

---

### Setup steps

1. Create a storage account.

2. Create a new data storage container to receive the uploads

![Creating a new Azure Blob storage container](creating_azure_container.png)

3. Add a role assignment to allow the storage account to manage the storage

![Adding a role assignment to the storage account](azure_role_assignment.png)

4. Generate a SAS Policy URL.

![Right click on the container to generate a SAS policy](generating_sas_policy.png)

5. Create a SAS policy with only write and create access. You can
specify an appropriate expiry time for the SAS URL. After this time
the uploader will no longer work.

![SAS Policy should have only Write and Create Access](sas_policy_details.png)

6. Test the SAS URL works properly

![Test the SAS Policy by uploading a small file in the notebook](testing_sas_url.png)

7. Embed the SAS URL in the offline collector.

![Simply paste the SAS URL in the collector GUI](sas_collector.png)



Tags: #deployment #uploads #triage
