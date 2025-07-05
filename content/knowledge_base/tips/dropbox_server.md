# How to set up a local S3 dropbox server?

When collecting evidence with the offline collector we often need to
upload large quantities of data. While cloud based uploads are
convenient they are usually slower than uploading to a local LAN and
might result in network bottlenecks as many systems in the local
network are saturating internet uplinks.

In these cases it is more convenient to set up a local `dropbox`
upload server which will collect collections from systems within local
on-premises segments instead.

There are several options for that:
1. A [Windows file share]({{< ref
   "/docs/offline_triage/remote_uploads/#smb-share" >}}) can be
   created on a Windows system.
2. An SFTP server can be [installed on a local Linux system]({{< ref
   "/knowledge_base/tips/setting_up_sftp/" >}}).
3. A local S3 server can be installed using
   [MinIO](https://github.com/minio/minio) - the subject of this
   article.

A common thread between these options is to ensure that credentials
are only allowed to upload new files and not download these files
again. Since the offline collector must include credentials within the
configuration file, we need to ensure these credentials can not
provide additional access to what is required.

You can view the offline collector's configuration file using
`Collector.exe config show`.

## Installing a local MinIO server

This option is very easy to do and works on all mainstream operating
systems as MinIO is a single Go binary available under the AGPL.

For this example we assume the dropbox server has the IP `192.168.1.1`

1. First download the MinIO binary from the [MinIO GitHub
   page](https://github.com/minio/minio?tab=readme-ov-file#binary-download). For
   example, on Linux the binary can be fetched from
   https://dl.min.io/server/minio/release/linux-amd64/minio

2. Start the server using the following command:

```
MINIO_ROOT_USER=admin MINIO_ROOT_PASSWORD=password ./minio server /tmp/minio --console-address ":9001" --address ":4566"
```

This will start a server with the admin password provided and store
all files in the `/tmp/minio` directory. The web console will be
available on port 9001 and the API port will be 4566. You can view the
web console for MinIO by navigating the browser to
http://192.168.1.1:9001

Please use a more complex password in reality, for this demonstration
we will use a weak password.

3. To administrate the MinIO server from the commandline we will use
   the `mc` command available from
   https://dl.min.io/client/mc/release/

```
wget https://dl.min.io/client/mc/release/linux-amd64/mc
chmod +x ./mc

# Save credentials for the mc tool
./mc alias set 'myminio' 'http://192.168.1.11:4566' 'admin' 'password'

# Create a new bucket called uploads
./mc mv myminio/uploads
```

4. Next we need to create a new client key and secret - this a similar
   process to what we need to do on the [AWS S3
   console](https://training.velociraptor.app//modules/offline_collection/cloud_upload.html#/8),
   but using the command line it is quicker

```
# Add a new uploader user with specific access key and secret key
./mc admin user add uploader access_key_123 secret_key_123
```

5. Next we need to restrict the policy allowed for this user (the user
   is basically identified by the access key). We create a JSON policy
   with an editor and store it for example in
   `/tmp/uploader.policy.json`

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:PutObject",
            "Resource": "arn:aws:s3:::uploads/*"
        }
    ]
}
```


```
# Create the policy from the JSON file
 ./mc admin policy create myminio uploader /tmp/uploader.policy.json

# Attach the policy to the new user
./mc admin policy attach myminio --user=access_key_123 uploader
```

6. Test the bucket and the permissions using the following VQL. Paste
   the following code into a file say `/tmp/test.vql`

```vql
SELECT
    upload_s3(accessor="data",
              file="Hello",
              name="test.txt",
              endpoint="http://192.168.1.11:4566",
              credentials_key="access_key_123",
              credentials_secret="secret_key_123",
              bucket="uploads")
FROM scope()

LET S3_CREDENTIALS <= dict(endpoint='http://192.168.1.11:4566/',
                           credentials_key='access_key_123',
                           credentials_secret='secret_key_123',
                           no_verify_cert=1)

SELECT *, read_file(filename=OSPath, length=10, accessor='s3') AS Data
FROM glob(globs='/uploads/*', accessor='s3')
```

Run this query with Velociraptor:
```
velociraptor-v0.74.4-linux-amd64 -v query -f /tmp/test.vql
```

The first query uploads a test file to the bucket, we then try to read
it back out - this should be denied:

```
[INFO] 2025-07-05T02:26:32Z upload_S3: Uploading test.txt to uploads
[
 {
  "upload_s3(accessor=\"data\", file=\"Hello\", name=\"test.txt\", endpoint=\"http://192.168.1.11:4566\", credentials_key=\"access_key_123\", credentials_secret=\"secret_key_123\", bucket=\"uploads\")": {
   "Path": "http://192.168.1.11:4566/uploads/test.txt",
   "Size": 5
  }
 }
][][INFO] 2025-07-05T02:26:32Z Globber: operation error S3: ListBuckets, https response error StatusCode: 403, RequestID: 184F39DAD67D435B, HostID: f2a388c21e253e519af7cec24c2e281b7821740cf65cb6ff168ac3a3ce38718c, api error AccessDenied: Access Denied. while processing /
```

You can verify the file is there using the MinIO Console.

7. Exporting the files. MinIO uses its internal data to store bucket
   data but you can use it to copy files in raw format into another
   directory. The `--watch` flag will continuously watch the bucket to
   export files in real time (omit it for one shot export).

```
./mc mirror --watch myminio/uploads /tmp/backup/
```

### Using Velociraptor to remotely launch the offline collector.

While the offline collector is a stand alone collector, sometime you
might want to use Velociraptor to distribute and run it. This might be
because directly downloading the data that needs to be collected is
not possible over a slow link. In this use case we want to push the
offline collector to the endpoint and have it upload the bulk data to
the local drop box server.

To do this it is best to use the [Generic Collector]({{< ref
"/docs/offline_triage/#the-generic-offline-collector" >}}) because it
is small and the Velociraptor binary is already present on the
endpoint.

In the following artifact we define the `OfflineCollector` tool and
then fetch it from the endpoint and launch the Velociraptor binary
with the correct command line for running a generic collector.

```yaml
name: RemoteOfflineCollector
tools:
- name: OfflineCollector

required_permissions:
- EXECVE

sources:
- query: |
    LET _Exe <= SELECT Exe FROM info()
    LET Exe <= _Exe[0].Exe

    SELECT * FROM foreach(row={
       SELECT OSPath
       FROM Artifact.Generic.Utils.FetchBinary(
           ToolName="OfflineCollector",
           TemporaryOnly=TRUE, IsExecutable=FALSE)
    }, query={
       SELECT * FROM execve(sep="\n",
          argv=[Exe, "--", "--embedded_config", OSPath])
    })
```

When building the generic collector make sure to use the S3
credentials as described above to have it automatically upload the
collections to the local dropbox server.


Tags: #deployment #forensics #triage
