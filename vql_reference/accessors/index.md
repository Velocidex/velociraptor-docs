# Accessors

Accessors are used to access bulk data from various sources using a standard
file-like interface.
|Plugin/Function|Type|Description|
|-|-|-|
|[auto](auto)|Accessor|Access the file using the best accessor possible|
|[bzip2](bzip2)|Accessor|Access the content of bzip2 files|
|[collector](collector)|Accessor|Open a collector zip file as if it was a directory - automatically|
|[collector_sparse](collector_sparse)|Accessor|Open a collector zip file as if it was a directory|
|[data](data)|Accessor|Makes a string appears as an in-memory file|
|[ewf](ewf)|Accessor|Allow reading an EWF file|
|[ext4](ext4)|Accessor|Access files by parsing the raw ext4 filesystems|
|[fat](fat)|Accessor|Access the FAT filesystem inside an image by parsing FAT|
|[file](file)|Accessor|Access files using the operating system's API|
|[file_links](file_links)|Accessor|Access the filesystem using the OS APIs|
|[file_nocase](file_nocase)|Accessor|Access files using the operating system's API|
|[fs](fs)|Accessor|Provide access to the server's filestore and datastore|
|[fs_sparse](fs_sparse)|Accessor|Provide access to the server's filestore and datastore|
|[gzip](gzip)|Accessor|Access the content of gzip files|
|[lazy_ntfs](lazy_ntfs)|Accessor|Access the NTFS filesystem by parsing NTFS structures|
|[me](me)|Accessor|Access files bundled inside the Velociraptor binary itself|
|[mft](mft)|Accessor|The `mft` accessor is used to access arbitrary MFT streams as|
|[mscfb](mscfb)|Accessor|Parse a MSCFB file as an archive|
|[ntfs](ntfs)|Accessor|Access the NTFS filesystem by parsing NTFS structures|
|[ntfs_vss](ntfs_vss)|Accessor|Access the NTFS filesystem by considering all VSS|
|[offset](offset)|Accessor|Allow reading another file from a specific offset|
|[overlay](overlay)|Accessor|Merges several paths into a single path|
|[pipe](pipe)|Accessor|Read from a VQL pipe|
|[process](process)|Accessor|Access process memory like a file|
|[pst](pst)|Accessor|An accessor to open attachments in PST files|
|[ranged](ranged)|Accessor|Reconstruct sparse files from idx and base|
|[raw_ext4](raw_ext4)|Accessor|Access the Ext4 filesystem inside an image by parsing the image|
|[raw_file](raw_file)|Accessor|Access the filesystem using the OS API|
|[raw_ntfs](raw_ntfs)|Accessor|Access the NTFS filesystem inside an image by parsing NTFS|
|[raw_reg](raw_reg)|Accessor|Access keys and values by parsing a raw registry hive|
|[reg](reg)|Accessor|An alias for the `registry` accessor, which accesses the registry using the|
|[registry](registry)|Accessor|Access the registry like a filesystem using the OS APIs|
|[s3](s3)|Accessor|Allows access to S3 buckets|
|[scope](scope)|Accessor|Present the content of a scope variable as a file|
|[smb](smb)|Accessor|Access smb shares (e|
|[sparse](sparse)|Accessor|Allows reading another file by overlaying a sparse map on top of|
|[ssh](ssh)|Accessor|Access a remote system's filesystem via `SSH/SFTP`|
|[vfs](vfs)|Accessor|Access client's VFS filesystem on the server|
|[vhdx](vhdx)|Accessor|Allow reading a VHDX file|
|[vmdk](vmdk)|Accessor|Allow reading a VMDK file|
|[winpmem](winpmem)|Accessor|Access physical memory like a file|
|[zip](zip)|Accessor|Open a zip file as if it was a directory|
|[zip_nocase](zip_nocase)|Accessor|Open a zip file as if it was a directory|

