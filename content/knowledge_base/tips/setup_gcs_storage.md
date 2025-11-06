# How to set up a GCS Bucket for file uploads

Google Cloud Storage buckets can be a useful upload destination for receiving
files from Velociraptor clients or collection archives from
[offline collectors]({{< ref "/docs/deployment/offline_collections" >}})
in scenarios where the source system is internet connected and you do not want
to stand up storage services on the local network.

This is made possible by the
[upload_gcs]({{< ref "/vql_reference/other/upload_gcs/" >}}) VQL function.

This article explains how to set up a GCS bucket with appropriate security for
file uploads.

---

### Setup steps

1. Before we can upload files to a bucket we need to have a project in place.
   For this example I will created a new project called `velociraptor-demo`:

![Create a new project](1__1DXiwQ4__gqzaYMZKSMxAfg.png)

Our plan is to distribute to our accomplices the packed binary as before, but
this time we want Velociraptor to automatically upload results for us into our
bucket.

2. In order to do this we need a service account with credentials allowing it to
   upload to our bucket. Go to **IAM & Admin** / **Service Accounts** / **Create
   Service Account:**

![](1__ZG9riz0ViCT8PgILXHuU7Q.png)

3. Since the service account will be able to upload by itself (i.e. the user
   does not authenticate on its behalf), we need to identify it with a JSON key.
   The key allows Velociraptor to act as the service account on this cloud
   project. Clicking the Create button will download a JSON file to your system
   with the private key in it.

![](1__rsKWeCDPrO9AffAuG2k__rA.png)

![](1__qGr13ir9qftvzxJUoM5D6A.png)

Note the service account’s email address. Currently this account has no
permissions at all, but we will allow it to write objects into our upload bucket
later.

![](1__EhghHAfmjbZFU2vhiPvhYA.png)

4. Next we create a bucket to store our collected zip files I will call it
   `velociraptor-uploads-121`:

![](1__ehJ3qfAiaUMNPXoy4mUhEg.png)

5. Selecting the **Permissions** tab, we are able to add the service account as
   a member — we will only give it the ability to write on a bucket and create
   new objects. This is important since is means that the service account is
   unable to read or list objects in this bucket. Since we will embed the
   service account key in our config file we need to make sure it can not be
   misused to compromise collections from other machines.

![](1__vzszs0OjRzdqMRlXbesuNw.png)


Tags: #deployment #uploads #triage
