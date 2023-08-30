---
title: Linux.Sys.Users
hidden: true
tags: [Client Artifact]
---

Get User specific information like homedir, group etc from /etc/passwd.

<pre><code class="language-yaml">
name: Linux.Sys.Users
description: Get User specific information like homedir, group etc from /etc/passwd.
parameters:
  - name: PasswordFile
    default: /etc/passwd
    description: The location of the password file.
sources:
  - precondition: |
      SELECT OS From info() where OS = &#x27;linux&#x27;
    query: |
      SELECT User, Description, Uid, Gid, Homedir, Shell
      FROM split_records(
            filenames=PasswordFile,
            regex=&quot;:&quot;, record_regex=&quot;\n&quot;,
            columns=[&quot;User&quot;, &quot;X&quot;, &quot;Uid&quot;, &quot;Gid&quot;, &quot;Description&quot;, &quot;Homedir&quot;, &quot;Shell&quot;])

</code></pre>

