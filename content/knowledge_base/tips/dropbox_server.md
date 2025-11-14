# How to set up a MinIO (S3-compatible) dropbox server for file uploads

AWS S3 buckets can be a useful upload destination for receiving files from
Velociraptor clients or collection containers from
[offline collectors]({{< ref "/docs/deployment/offline_collections" >}})
in scenarios where the source system is internet connected and you do not want
to stand up storage services on the local network.

This is made possible by the
[upload_s3]({{< ref "/vql_reference/other/upload_s3/" >}}) VQL function.

However, if you want similar functionality to AWS S3 and prefer to keep things
local, or at least fully under your own control, then
[MinIO](https://www.min.io/) is a great open source, self-hosted, S3-compatible
dropbox server. It's easy to install and works on all mainstream operating
systems. A MinIO server is a single Go binary licensed under the AGPL.

Here we describe the steps to quickly set up a MinIO server.

---

### Setup steps

For this example we assume the dropbox server has the IP `192.168.1.1`

1. First download the MinIO binary from the [MinIO GitHub
   page](https://github.com/minio/minio?tab=readme-ov-file#binary-download). For
   example, on Linux the binary can be fetched from
   https://dl.min.io/server/minio/release/linux-amd64/minio

2. Start the server using the following command:

```sh
MINIO_ROOT_USER=admin MINIO_ROOT_PASSWORD=password ./minio server /tmp/minio --console-address ":9001" --address ":4566"
```

This will start a server with the admin password provided and store
all files in the `/tmp/minio` directory. The web console will be
available on port `9001` and the API port will be `4566`. You can view the
web console for MinIO by navigating the browser to
`http://192.168.1.1:9001`

Please use a more complex password in reality, for this demonstration
we will use a weak password.

3. To administrate the MinIO server from the commandline we will use
   the `mc` command available from
   https://dl.min.io/client/mc/release/

```sh
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

```sh
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


```sh
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

```sh
velociraptor-v0.74.4-linux-amd64 -v query -f /tmp/test.vql
```

The first query uploads a test file to the bucket, we then try to read
it back out - this should be denied:

```text
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

```sh
./mc mirror --watch myminio/uploads /tmp/backup/
```



Tags: #deployment #uploads #triage
