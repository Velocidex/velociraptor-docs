# upload_sftp



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
file|The file to upload|OSPath (required)
name|The name of the file that should be stored on the server (may contain the path)|string
user|The username to connect to the endpoint with|string
path|Path on server to upload file to (will be prepended to name)|string
accessor|The accessor to use|string
privatekey|The private key to use|string
endpoint|The Endpoint to use including port number (e.g. 192.168.1.1:22 )|string
hostkey|Host key to verify. Blank to disable|string
secret|Alternatively, use a secret from the secrets service. Secret must be of type 'SSH PrivateKey'|string

**Required permissions:** `FILESYSTEM_READ`, `NETWORK`

### Description

Upload files to SFTP.


