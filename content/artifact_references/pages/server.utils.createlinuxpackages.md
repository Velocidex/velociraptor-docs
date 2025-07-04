---
title: Server.Utils.CreateLinuxPackages
hidden: true
tags: [Server Artifact]
---

Build Deb and RPM packages ready for deployment in the current org.

This artifact depends on the following tool:

* <velo-tool-viewer name="VelociraptorLinux" />

You can replace this with suitable Velociraptor Linux build, or the
current release binary will be used by default.


<pre><code class="language-yaml">
name: Server.Utils.CreateLinuxPackages
description: |
  Build Deb and RPM packages ready for deployment in the current org.

  This artifact depends on the following tool:

  * &lt;velo-tool-viewer name="VelociraptorLinux" /&gt;

  You can replace this with suitable Velociraptor Linux build, or the
  current release binary will be used by default.

type: SERVER

parameters:
  - name: CustomConfig
    description: Supply a custom client config instead of using the one from the current org
    type: yaml

sources:
- query: |
    LET ValidateConfig(Config) = Config.Client.server_urls
          AND Config.Client.ca_certificate =~ "(?ms)-----BEGIN CERTIFICATE-----.+-----END CERTIFICATE-----"
          AND Config.Client.nonce

    LET client_config &lt;= if(condition=ValidateConfig(Config=CustomConfig),
                         then=CustomConfig,
                         else=org()._client_config)

    LET TmpDir &lt;= tempdir()

    SELECT * FROM chain(a={
      SELECT OSPath.Basename AS Name, upload(file=OSPath, name=OSPath.Basename) AS Upload
      FROM deb_create(directory_name=TmpDir,
                    config=serialize(item=client_config, format="yaml"))
    }, b={
      SELECT OSPath.Basename AS Name, upload(file=OSPath, name=OSPath.Basename) AS Upload
      FROM rpm_create(directory_name=TmpDir,
                    config=serialize(item=client_config, format="yaml"))
    })

column_types:
  - name: Upload
    type: upload_preview

</code></pre>

