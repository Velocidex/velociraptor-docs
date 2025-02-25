# How to setup an SFTP server

There are many options for receiving uploaded files from the offline
collector, for example using S3 buckets, Azure storage services and
even the [AWS SFTP transfer service]({{% ref "blog/2021/2021-12-11-sftp-in-aws/" %}}).

However sometimes it is simpler to set up your own SFTP server to
receive incoming uploads (it is certainly cheaper than the AWS managed
service).

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

4. Add the following in the file `/etc/ssh/sshd_config`

```
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

5. Create keys for the `sftpupload` user

```
sudo -u sftpuser bash
$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/sftpuser/.ssh/id_rsa)

# Make sure the permissions are correct for the directory
chmod 600 /home/sftpuser/.ssh/
```

In the offline collector configuration you should use this private key
(`/home/sftpuser/.ssh/id_rsa`) of the form:

```
-----BEGIN OPENSSH PRIVATE KEY-----
.....
-----END OPENSSH PRIVATE KEY-----
```


6. Verify you can connect to the server, list files and upload files

```
$ sftp localhost
The authenticity of host 'localhost (127.0.0.1)' can't be established.
ED25519 key fingerprint is SHA256:nJ9IXQjeXVXURD0bVCcylr4+5/Da0jnJEdrLqgZYBko.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'localhost' (ED25519) to the list of known hosts.
Connected to localhost.
sftp> ls -l files
remote readdir("/files/"): Permission denied
sftp> put /etc/passwd /files/passwd.txt
Uploading /etc/passwd to /files/passwd.txt
```

As you can see the `sftpupload` user does not have permission to read
the directory but can upload files to it.


Tags: #deployment
