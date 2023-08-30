---
title: MacOS.System.Users
hidden: true
tags: [Client Artifact]
---

This artifact collects information about the local users on the
system. The information is stored in plist files.


<pre><code class="language-yaml">
name: MacOS.System.Users
description: |
  This artifact collects information about the local users on the
  system. The information is stored in plist files.

parameters:
  - name: UserPlistGlob
    default: /private/var/db/dslocal/nodes/Default/users/*.plist
  - name: OnlyShowRealUsers
    type: bool
    default: Y

sources:
  - query: |
      LET user_plist = SELECT OSPath FROM glob(globs=UserPlistGlob)
      LET UserDetails(OSPath) =
              SELECT get(member=&quot;name.0&quot;, default=&quot;&quot;) AS Name,
                     get(member=&quot;realname.0&quot;, default=&quot;&quot;) AS RealName,
                     get(member=&quot;shell.0&quot;, default=&quot;&quot;) AS UserShell,
                     get(member=&quot;home.0&quot;, default=&quot;&quot;) AS HomeDir,
                     if(condition=LinkedIdentity,
                        then=plist(file=LinkedIdentity[0],
                                   accessor=&#x27;data&#x27;)) as AppleId,
                     if(condition=accountPolicyData,
                        then=plist(file=accountPolicyData[0],
                                   accessor=&#x27;data&#x27;)) AS AccountPolicyData
              FROM plist(file=OSPath)

      SELECT Name, RealName, UserShell, HomeDir,
               get(item=AppleId, field=&quot;appleid.apple.com&quot;) AS AppleId,
               timestamp(epoch=AccountPolicyData.creationTime) AS CreationTime,
               AccountPolicyData.failedLoginCount AS FailedLoginCount,
               timestamp(epoch=AccountPolicyData.failedLoginTimestamp) AS FailedLoginTimestamp,
               timestamp(epoch=AccountPolicyData.passwordLastSetTime) AS PasswordLastSetTime
      FROM foreach(row=user_plist, query={
         SELECT * FROM UserDetails(OSPath= OSPath)
      })
      WHERE NOT OnlyShowRealUsers OR NOT UserShell =~ &#x27;false&#x27;

</code></pre>

