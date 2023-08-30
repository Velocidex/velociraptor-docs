---
title: Server.Import.PreviousReleases
hidden: true
tags: [Server Artifact]
---

When upgrading the Velociraptor server the built in artifacts may
change using newer VQL features that are not present on older
clients.

If you have some older clients that can not be upgraded, sometimes
collecting standard built-in artifacts will fail. In this case it is
handy to import older VQL artifacts that work with these older
clients.

This server artifact allows you to automatically import all
artifacts that came bundled with previous versions. These should be
compatible with older clients.


<pre><code class="language-yaml">
name: Server.Import.PreviousReleases
description: |
  When upgrading the Velociraptor server the built in artifacts may
  change using newer VQL features that are not present on older
  clients.

  If you have some older clients that can not be upgraded, sometimes
  collecting standard built-in artifacts will fail. In this case it is
  handy to import older VQL artifacts that work with these older
  clients.

  This server artifact allows you to automatically import all
  artifacts that came bundled with previous versions. These should be
  compatible with older clients.

type: SERVER

required_permissions:
- SERVER_ADMIN

parameters:
  - name: VelociraptorRelease
    description: |
      The Velociraptor Release to import.
    type: choices
    default: v0.6.9
    choices:
      - v0.6.0
      - v0.6.1
      - v0.6.2
      - v0.6.3
      - v0.6.4
      - v0.6.5
      - v0.6.6
      - v0.6.7
      - v0.6.8
      - v0.6.9

sources:
  - query: |
      LET Prefix &lt;= regex_replace(source=VelociraptorRelease, re=&#x27;\\.&#x27;, replace=&quot;&quot;) + &quot;.&quot;
      LET ExchangeURL = &quot;https://docs.velociraptor.app/release_artifacts/release_artifacts_&quot; + VelociraptorRelease + &quot;.zip&quot;

      LET X = SELECT artifact_set(
           prefix=Prefix,
           definition=Definition) AS Definition
        FROM foreach(row={
          SELECT Content FROM http_client(
             remove_last=TRUE,
             tempfile_extension=&quot;.zip&quot;, url=ExchangeURL)
        }, query={
          -- Replace internal references to use the same version so
          -- artifacts are still internally consistent.
          SELECT regex_replace(source=read_file(accessor=&quot;zip&quot;, filename=OSPath),
             re=&#x27;&#x27;&#x27;(?sm) Artifact\.([a-z0-9._]+?[(])&#x27;&#x27;&#x27;,
             replace=&quot; Artifact.&quot; + Prefix + &quot;$1&quot;) AS Definition
          FROM glob(
             globs=&#x27;/**/*.yaml&#x27;,
             root=pathspec(
                DelegateAccessor=&quot;auto&quot;,
                DelegatePath=Content),
             accessor=&quot;zip&quot;)
          WHERE NOT Definition =~ &quot;(?ms)type: +INTERNAL&quot;
        })

        SELECT Definition.name AS Name,
               Definition.description AS Description,
               Definition.author AS Author
        FROM X

</code></pre>

