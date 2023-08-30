---
title: Linux.Ssh.KnownHosts
hidden: true
tags: [Client Artifact]
---

Find and parse ssh known hosts files.

<pre><code class="language-yaml">
name: Linux.Ssh.KnownHosts
description: Find and parse ssh known hosts files.
parameters:
  - name: sshKnownHostsFiles
    default: &#x27;.ssh/known_hosts*&#x27;

precondition: SELECT OS From info() where OS = &#x27;linux&#x27;

sources:
  - query: |
        // For each user on the system, search for known_hosts files.
        LET authorized_keys = SELECT * from foreach(
          row={
             SELECT Uid, User, Homedir from Artifact.Linux.Sys.Users()
          },
          query={
             SELECT OSPath, Mtime, Ctime, User, Uid
             FROM glob(
               globs=sshKnownHostsFiles,
               root=Homedir)
          })

        // For each known_hosts file, extract each line on a different row.
        SELECT * from foreach(
          row=authorized_keys,
          query={
            SELECT Uid, User, OSPath, Hostname, Type, PublicKey
            FROM split_records(
               filenames=OSPath, regex=&quot; &quot;, record_regex=&quot;\n&quot;,
               columns=[&quot;Hostname&quot;, &quot;Type&quot;, &quot;PublicKey&quot;])
            /* Ignore comment lines. */
            WHERE not Hostname =~ &quot;^[^#]+#&quot;
          })

  - name: HostPublicKeys
    query: |
      LET Me &lt;= SELECT * FROM info()

      SELECT * FROM foreach(row={
        SELECT OSPath
        FROM glob(globs=&quot;/etc/ssh/ssh_host*.pub&quot;)
      }, query={
        SELECT *, Me[0].Fqdn AS Fqdn
        FROM split_records(columns=[&quot;Type&quot;, &quot;PublicKey&quot;, &quot;KeyName&quot;],
                   filenames=OSPath,
                   regex=&quot; +&quot;)
      })

    notebook:
      - type: vql_suggestion
        name: &quot;Resolve Known Hosts&quot;
        template: |
          /*
          # Resolve Hostnames

          This query resolves the public keys in the known hosts file
          with the collected public keys from all hosts.

          This works best when this cell applies to a hunt collection
          from a wide number of hosts. It helps to resolve the
          hostnames from known hosts to real host names (these are
          usually hashed within the file).

          This artifact helps to establish historical SSH access from
          one machine to another machine.
          */

          LET lookup &lt;= memoize(
             key=&quot;PublicKey&quot;,
             query={
               SELECT *
               FROM source(artifact=&quot;Linux.Ssh.KnownHosts/HostPublicKeys&quot;)
          })

          SELECT *, get(item=lookup, field=PublicKey) AS Hostname
          FROM source(artifact=&quot;Linux.Ssh.KnownHosts&quot;)

</code></pre>

