---
title: Linux.Users.RootUsers
hidden: true
tags: [Client Artifact]
---

Detects users added in the `sudo` group.


<pre><code class="language-yaml">
name: Linux.Users.RootUsers

description: |
  Detects users added in the `sudo` group.

author: George-Andrei Iosif (@iosifache)

type: CLIENT

implied_permissions:
  - EXECVE

sources:
  - precondition: |
      SELECT OS
      FROM info()
      WHERE OS = 'linux'

    query: |
      SELECT *
      FROM foreach(
        row={
          SELECT *
          FROM Artifact.Linux.Sys.Users()
        },
        query={
          SELECT Fqdn AS Host,
                 User,
                 Description,
                 Uid,
                 Gid,
                 Homedir,
                 Shell
          FROM execve(argv=["id", "-Gn", User])
          WHERE ReturnCode = 0 AND Stdout =~ "root"
        }
      )

</code></pre>

