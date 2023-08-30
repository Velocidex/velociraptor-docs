---
title: Linux.Ssh.AuthorizedKeys
hidden: true
tags: [Client Artifact]
---

Find and parse ssh authorized keys files.

<pre><code class="language-yaml">
name: Linux.Ssh.AuthorizedKeys
description: Find and parse ssh authorized keys files.
parameters:
  - name: sshKeyFiles
    default: &#x27;.ssh/authorized_keys*&#x27;
    description: Glob of authorized_keys file relative to a user&#x27;s home directory.

sources:
  - precondition: |
      SELECT OS From info() where OS = &#x27;linux&#x27;

    query: |
      LET authorized_keys = SELECT * from foreach(
          row={
             SELECT Uid, User, Homedir from Artifact.Linux.Sys.Users()
          },
          query={
             SELECT OSPath, Mtime, Ctime, User, Uid
             FROM glob(root=Homedir, globs=sshKeyFiles)
          })

      SELECT * from foreach(
          row=authorized_keys,
          query={
            SELECT Uid, User, OSPath, Key, Comment, Mtime
            FROM split_records(
               filenames=OSPath, regex=&quot; +&quot;, columns=[&quot;Type&quot;, &quot;Key&quot;, &quot;Comment&quot;])
               WHERE Type =~ &quot;ssh&quot;
          })

</code></pre>

