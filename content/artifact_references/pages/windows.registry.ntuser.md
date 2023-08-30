---
title: Windows.Registry.NTUser
hidden: true
tags: [Client Artifact]
---

This artifact searches for keys or values within the user's
NTUser.dat registry hives.

When a user logs into a windows machine the system creates their own
"profile" which consists of a registry hive mapped into the
HKEY_USERS hive. This hive file is locked as long as the user is
logged in. If the user is not logged in, the file is not mapped at
all.

This artifact bypasses the locking mechanism by parsing the raw NTFS
filesystem to recover the registry hives. We then parse the registry
hives to search for the glob provided.

This artifact is designed to be reused by other artifacts that need
to access user data.

{{% notice note %}}

  Any artifacts that look into the HKEY_USERS registry hive should
  be using the `Windows.Registry.NTUser` artifact instead of
  accessing the hive via the API. The API only makes the currently
  logged in users available in that hive and so if we rely on the
  windows API we will likely miss any settings for users not
  currently logged on.

{{% /notice %}}


<pre><code class="language-yaml">
name: Windows.Registry.NTUser
description: |
  This artifact searches for keys or values within the user&#x27;s
  NTUser.dat registry hives.

  When a user logs into a windows machine the system creates their own
  &quot;profile&quot; which consists of a registry hive mapped into the
  HKEY_USERS hive. This hive file is locked as long as the user is
  logged in. If the user is not logged in, the file is not mapped at
  all.

  This artifact bypasses the locking mechanism by parsing the raw NTFS
  filesystem to recover the registry hives. We then parse the registry
  hives to search for the glob provided.

  This artifact is designed to be reused by other artifacts that need
  to access user data.

  {{% notice note %}}

    Any artifacts that look into the HKEY_USERS registry hive should
    be using the `Windows.Registry.NTUser` artifact instead of
    accessing the hive via the API. The API only makes the currently
    logged in users available in that hive and so if we rely on the
    windows API we will likely miss any settings for users not
    currently logged on.

  {{% /notice %}}

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
 - name: KeyGlob
   default: Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\**
 - name: userRegex
   default: .
   type: regex

export: |
    -- HivePath: The path to the hive on disk
    -- RegistryPath: The path in the registry to mount the hive
    -- RegMountPoint: The path inside the hive to mount (usually /)
    LET _map_file_to_reg_path(HivePath, RegistryPath, RegMountPoint) = dict(
       type=&quot;mount&quot;,
       `from`=dict(accessor=&#x27;raw_reg&#x27;,
                   prefix=pathspec(
                      Path=RegMountPoint,
                      DelegateAccessor=&#x27;ntfs&#x27;,
                      DelegatePath=HivePath),
                   path_type=&#x27;registry&#x27;),
        `on`=dict(accessor=&#x27;registry&#x27;,
                  prefix=RegistryPath,
                  path_type=&#x27;registry&#x27;))

    LET _standard_mappings = (
       _map_file_to_reg_path(
          HivePath=&quot;C:/Windows/System32/Config/SOFTWARE&quot;,
          RegistryPath=&quot;HKEY_LOCAL_MACHINE\\Software&quot;,
          RegMountPoint=&quot;/&quot;),
       _map_file_to_reg_path(
          HivePath=&quot;C:/Windows/System32/Config/System&quot;,
          RegistryPath=&quot;HKEY_LOCAL_MACHINE\\System&quot;,
          RegMountPoint=&quot;/&quot;),
       _map_file_to_reg_path(
          HivePath=&quot;C:/Windows/System32/Config/SYSTEM&quot;,
          RegistryPath=&quot;HKEY_LOCAL_MACHINE\\System\\CurrentControlSet&quot;,
          RegMountPoint=&quot;/ControlSet001&quot;))

    LET _make_ntuser_mappings = SELECT _map_file_to_reg_path(
      HivePath=NTUserPath,
      RegMountPoint=&quot;/&quot;,
      -- This is technically the SID but it is clearer to just use the username
      RegistryPath=&quot;HKEY_USERS/&quot; + NTUserPath[-2]) AS Mapping
    FROM foreach(row={
       SELECT pathspec(parse=expand(path=Directory), path_type=&quot;windows&quot;) + &quot;NTUser.dat&quot;  AS NTUserPath
       FROM Artifact.Windows.Sys.Users(OnlyRemote=TRUE)
    }, query={
        -- Verify the file actually exists
        SELECT NTUserPath FROM stat(filename=NTUserPath)
    })

    // Use this like `LET _ &lt;= MapRawRegistryHives`
    LET MapRawRegistryHives =remap(config=dict(
       remappings=_make_ntuser_mappings.Mapping + _standard_mappings))

sources:
 - query: |
       LET UserProfiles = SELECT Uid,
            Gid,
            Name || &quot;&quot; as Username,
            Description,
            UUID,
            {
                SELECT OSPath FROM glob(
                   root=expand(path=Directory),
                   globs=&quot;/NTUSER.DAT&quot;,
                   accessor=&quot;auto&quot;)
            } as OSPath,
            expand(path=Directory) as Directory
       FROM Artifact.Windows.Sys.Users()
       WHERE Directory and OSPath AND Username =~ userRegex

       SELECT * FROM foreach(
            row={
                SELECT * FROM UserProfiles
            },
            query={
                SELECT OSPath, OSPath, Data, Mtime AS Mtime,
                       Username, Description, Uid, Gid, UUID, Directory
                FROM glob(
                    globs=KeyGlob,
                    root=pathspec(
                       DelegateAccessor=&quot;ntfs&quot;,
                       DelegatePath=OSPath,
                       Path=&quot;/&quot;),
                    accessor=&quot;raw_reg&quot;)
            })

</code></pre>

