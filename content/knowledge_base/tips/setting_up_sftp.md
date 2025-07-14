# How to setup an SFTP server

There are many options for receiving uploaded files from the
[offline collector]({{< ref "http://localhost:1313/docs/offline_triage/#offline-collections" >}}),
for example
[using S3 buckets]({{< ref "/knowledge_base/tips/dropbox_server/">}}),
Azure storage services and even the
[AWS SFTP transfer service]({{% ref "blog/2021/2021-12-11-sftp-in-aws/" %}}).

However sometimes it is simpler to set up your own SFTP server to
receive incoming uploads (it is certainly cheaper than the AWS managed
service).

{{% notice warning %}}

Setting up SSH and SFTP can be tricky for novice Linux users. It is easy to
misconfigure things in ways that can leave a server open to exploitation.

Unless you have a strong reason to prefer using SFTP we recommend you consider
less arcane alternative options such as the one described in
[How to set up a local S3 dropbox server]({{< ref "/knowledge_base/tips/dropbox_server/">}})
using MinIO.

{{% /notice %}}

This tip explains how to set up a server securely.

1. Create a new Linux based VM and open port 22 for incoming
   requests. This can be in the cloud or on prem.

2. Create an `sftpupload` user

```
sudo adduser sftpupload
```

3. Create a directory for files to be uploaded and set the directory
   to be writable by the user.

```
mkdir -p /var/sftp/files
chown root:root /var/sftp/files

# Allow anyone to write there
chmod o+wx /var/sftp/files

# No directory listing possible
chmod o-r /var/sftp/files
```

4. Add the following in the file `/etc/ssh/sshd_config`:

```text
PasswordAuthentication no

Match User sftpupload
    ForceCommand internal-sftp
    PasswordAuthentication no
    ChrootDirectory /var/sftp
    PermitTunnel no
    AllowAgentForwarding no
    AllowTcpForwarding no
    X11Forwarding no
```

and then restart the `sshd` service:

```sh
$ sudo systemctl restarts sshd
```

5. Create keys for the `sftpupload` user

```sh
sudo -u sftpupload bash
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/sftpuser/.ssh/id_rsa)

# Authorize the user's public key for access
$ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys

# Make sure that secure permissions are applied for the directory
$ chmod -v 600 /home/sftpupload/.ssh/
```

6. Verify you can connect to the server and upload files. Listing files will be
   denied.

```sh
$ sftp localhost

sftp> put /etc/passwd /files/passwd.txt
Uploading /etc/passwd to /files/passwd.txt

sftp> ls -l files
remote readdir("/files/"): Permission denied
```

As you can see the `sftpupload` user does not have permission to read
the directory but can upload files to it.

If we try shell access via SSH it will correctly be denied:

```sh
$ ssh localhost
This service allows sftp connections only.
Connection to localhost closed.
```

### Offline Collector configuration

In the offline collector configuration you should use the private key
(`/home/sftpupload/.ssh/id_rsa`) of the form:

```text
-----BEGIN OPENSSH PRIVATE KEY-----
.....
-----END OPENSSH PRIVATE KEY-----
```

and for the Endpoint value, specify it in the form `<hostname or IP>:<ssh port>`.

Tags: #deployment
