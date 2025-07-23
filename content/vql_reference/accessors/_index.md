---
title: Accessors
weight: 100
linktitle: Accessors
index: true
no_edit: true
no_children: true
---

Accessors are used to access bulk data from various sources using a standard
file-like interface.
|Plugin/Function|<span class='vql_type'>Type</span>|Description|
|-|-|-|
|[auto](auto)|<span class='vql_type'>Accessor</span>|Access the file using the best accessor possible|
|[bzip2](bzip2)|<span class='vql_type'>Accessor</span>|Access the content of bzip2 files|
|[collector](collector)|<span class='vql_type'>Accessor</span>|Open a collector zip file as if it was a directory - automatically|
|[collector_sparse](collector_sparse)|<span class='vql_type'>Accessor</span>|Open a collector zip file as if it was a directory|
|[data](data)|<span class='vql_type'>Accessor</span>|Makes a string appears as an in-memory file|
|[ewf](ewf)|<span class='vql_type'>Accessor</span>|Allow reading an EWF file|
|[ext4](ext4)|<span class='vql_type'>Accessor</span>|Access files by parsing the raw ext4 filesystems|
|[fat](fat)|<span class='vql_type'>Accessor</span>|Access the FAT filesystem inside an image by parsing FAT|
|[file](file)|<span class='vql_type'>Accessor</span>|Access files using the operating system's API|
|[file_links](file_links)|<span class='vql_type'>Accessor</span>|Access the filesystem using the OS APIs|
|[file_nocase](file_nocase)|<span class='vql_type'>Accessor</span>|Access files using the operating system's API|
|[fs](fs)|<span class='vql_type'>Accessor</span>|Provide access to the server's filestore and datastore|
|[fs_sparse](fs_sparse)|<span class='vql_type'>Accessor</span>|Provide access to the server's filestore and datastore|
|[gzip](gzip)|<span class='vql_type'>Accessor</span>|Access the content of gzip files|
|[lazy_ntfs](lazy_ntfs)|<span class='vql_type'>Accessor</span>|Access the NTFS filesystem by parsing NTFS structures|
|[me](me)|<span class='vql_type'>Accessor</span>|Access files bundled inside the Velociraptor binary itself|
|[mft](mft)|<span class='vql_type'>Accessor</span>|The `mft` accessor is used to access arbitrary MFT streams as|
|[mscfb](mscfb)|<span class='vql_type'>Accessor</span>|Parse a MSCFB file as an archive|
|[ntfs](ntfs)|<span class='vql_type'>Accessor</span>|Access the NTFS filesystem by parsing NTFS structures|
|[ntfs_vss](ntfs_vss)|<span class='vql_type'>Accessor</span>|Access the NTFS filesystem by considering all VSS|
|[offset](offset)|<span class='vql_type'>Accessor</span>|Allow reading another file from a specific offset|
|[pipe](pipe)|<span class='vql_type'>Accessor</span>|Read from a VQL pipe|
|[process](process)|<span class='vql_type'>Accessor</span>|Access process memory like a file|
|[pst](pst)|<span class='vql_type'>Accessor</span>|An accessor to open attachments in PST files|
|[ranged](ranged)|<span class='vql_type'>Accessor</span>|Reconstruct sparse files from idx and base|
|[raw_ext4](raw_ext4)|<span class='vql_type'>Accessor</span>|Access the Ext4 filesystem inside an image by parsing the image|
|[raw_file](raw_file)|<span class='vql_type'>Accessor</span>|Access the filesystem using the OS API|
|[raw_ntfs](raw_ntfs)|<span class='vql_type'>Accessor</span>|Access the NTFS filesystem inside an image by parsing NTFS|
|[raw_reg](raw_reg)|<span class='vql_type'>Accessor</span>|Access keys and values by parsing a raw registry hive|
|[reg](reg)|<span class='vql_type'>Accessor</span>|An alias for the `registry` accessor, which accesses the registry using the|
|[registry](registry)|<span class='vql_type'>Accessor</span>|Access the registry like a filesystem using the OS APIs|
|[s3](s3)|<span class='vql_type'>Accessor</span>|Allows access to S3 buckets|
|[scope](scope)|<span class='vql_type'>Accessor</span>|Present the content of a scope variable as a file|
|[smb](smb)|<span class='vql_type'>Accessor</span>|Access smb shares (e|
|[sparse](sparse)|<span class='vql_type'>Accessor</span>|Allows reading another file by overlaying a sparse map on top of|
|[ssh](ssh)|<span class='vql_type'>Accessor</span>|Access a remote system's filesystem via `SSH/SFTP`|
|[vfs](vfs)|<span class='vql_type'>Accessor</span>|Access client's VFS filesystem on the server|
|[vhdx](vhdx)|<span class='vql_type'>Accessor</span>|Allow reading a VHDX file|
|[vmdk](vmdk)|<span class='vql_type'>Accessor</span>|Allow reading a VMDK file|
|[winpmem](winpmem)|<span class='vql_type'>Accessor</span>|Access physical memory like a file|
|[zip](zip)|<span class='vql_type'>Accessor</span>|Open a zip file as if it was a directory|
|[zip_nocase](zip_nocase)|<span class='vql_type'>Accessor</span>|Open a zip file as if it was a directory|
