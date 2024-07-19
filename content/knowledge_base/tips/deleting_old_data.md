# How to manage storage space on the server

Velociraptor can collect a lot of data quickly but usually the data is
only relevant for short periods of time.

Disk space management is an important part of Velociraptor
administrators tasks. You can keep an eye on the disk utilization as
shown on the dashboard.

If you need to grow the disk during an investigation, and you are
using a cloud VM from Amazon with Elastic Block Storage (EBS), disk
space management is very easy. In the AWS cloud it is possible to
resize disk space dynamically. See [Requesting
Modifications](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/requesting-ebs-volume-modifications.html)
to Your EBS Volumes and [Extending a Linux File System After
Resizing](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/recognize-expanded-volume-linux.html)
a Volume. You can do this without even restarting the server.

If you must attach a new volume you can migrate data from the old
datastore directory (as specified in the config file) to the new
directory by simply copying all the files. You must ensure permissions
remain the same (typically files are owned by the `velociraptor` low
privilege local linux account).

It is also possible to start with an empty datastore directory and
only copy selected files:

1. The `users` directory contains user accounts (hashed password etc)
2. The `acl` directory contains user ACLs
3. The `artifact_definitions` contains custom artifacts
4. The `config` directory contains various configuration settings.
5. The `orgs` directory contains data from various orgs.

Velociraptor will automatically re-enroll clients with the same client
id (The client id is set by the client itself) as needed.

You can also check the backups directory to recover from backup.

## Management of old collections

You can automatically delete old collections using the
[Server.Utils.DeleteManyFlows
](/artifact_references/pages/server.utils.deletemanyflows/) and
[Server.Utils.DeleteMonitoringData
](/artifact_references/pages/server.utils.deletemonitoringdata/)
artifacts. These are server artifacts which can delete flows and
monitoring data older than the specified time.
