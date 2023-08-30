---
title: Windows.Sys.Users
hidden: true
tags: [Client Artifact]
---

List User accounts by inspecting registry keys. This method is a
reliable indicator for users who have physically logged into the
system and thereby created local profiles.

This will not include domain users or the output from `NetUserEnum`
- you should collect the `Windows.Sys.AllUsers` artifact to get all
possible users on the system.


<pre><code class="language-yaml">
name: Windows.Sys.Users
description: |
  List User accounts by inspecting registry keys. This method is a
  reliable indicator for users who have physically logged into the
  system and thereby created local profiles.

  This will not include domain users or the output from `NetUserEnum`
  - you should collect the `Windows.Sys.AllUsers` artifact to get all
  possible users on the system.

parameters:
  - name: remoteRegKey
    default: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList\*

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query: |
        LET GetTimestamp(High, Low) = if(condition=High,
                then=timestamp(winfiletime=High * 4294967296 + Low))

        -- lookupSID() may not be available on deaddisk analysis
        SELECT split(string=Key.OSPath.Basename, sep=&quot;-&quot;)[-1] as Uid,
           &quot;&quot; AS Gid,
           lookupSID(sid=Key.OSPath.Basename) || &quot;&quot; AS Name,
           Key.OSPath as Description,
           ProfileImagePath as Directory,
           Key.OSPath.Basename as UUID,
           Key.Mtime as Mtime,
           {
                SELECT Mtime
                FROM stat(filename=expand(path=ProfileImagePath))
            } AS HomedirMtime,
           dict(ProfileLoadTime=GetTimestamp(
                   High=LocalProfileLoadTimeHigh, Low=LocalProfileLoadTimeLow),
                ProfileUnloadTime=GetTimestamp(
                   High=LocalProfileUnloadTimeHigh, Low=LocalProfileUnloadTimeLow)
           ) AS Data
        FROM read_reg_key(globs=remoteRegKey, accessor=&quot;registry&quot;)

</code></pre>

