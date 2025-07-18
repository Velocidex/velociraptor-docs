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

Use the following to inspect the RPM and Deb:
- rpm -qi velociraptor.rpm
- rpm -qp --scripts velociraptor.rpm
- dpkg-deb -I velociraptor.deb


<pre><code class="language-yaml">
name: Server.Utils.CreateLinuxPackages
description: |
  Build Deb and RPM packages ready for deployment in the current org.

  This artifact depends on the following tool:

  * &lt;velo-tool-viewer name="VelociraptorLinux" /&gt;

  You can replace this with suitable Velociraptor Linux build, or the
  current release binary will be used by default.

  Use the following to inspect the RPM and Deb:
  - rpm -qi velociraptor.rpm
  - rpm -qp --scripts velociraptor.rpm
  - dpkg-deb -I velociraptor.deb


type: SERVER

parameters:
  - name: CustomConfig
    description: Supply a custom client config instead of using the one from the current org
    type: yaml
  - name: ServiceName
    description: Customize the service name
  - name: Maintainer
    description: Customize the maintainer
  - name: MaintainerEmail
    description: Customize the maintainer email
  - name: Homepage
    description: Customize the homepage URL

sources:
- query: |
    LET ValidateConfig(Config) = Config.Client.server_urls
          AND Config.Client.ca_certificate =~ "(?ms)-----BEGIN CERTIFICATE-----.+-----END CERTIFICATE-----"
          AND Config.Client.nonce

    LET client_config &lt;= if(condition=ValidateConfig(Config=CustomConfig),
                         then=CustomConfig,
                         else=org()._client_config)

    LET TmpDir &lt;= tempdir()

    LET _RPMSpec &lt;= SELECT Spec FROM rpm_create(show_spec=TRUE)
    LET RPMSpec &lt;= _RPMSpec[0].Spec

    LET _DebSpec &lt;= SELECT Spec FROM deb_create(show_spec=TRUE)
    LET DebSpec &lt;= _DebSpec[0].Spec

    LET UpdateExpansion(Expansion) = Expansion + dict(
       Name=ServiceName || Expansion.Name,
       SysvService=ServiceName || Expansion.SysvService,
       Maintainer=Maintainer || Expansion.Maintainer,
       MaintainerEmail=MaintainerEmail || Expansion.MaintainerEmail,
       Homepage=Homepage || Expansion.Homepage
    )

    SELECT * FROM chain(a={
      SELECT OSPath.Basename AS Name,
             upload(file=OSPath, name=OSPath.Basename) AS Upload
      FROM deb_create(
        directory_name=TmpDir,
        package_spec=DebSpec +
            dict(Expansion=UpdateExpansion(Expansion=DebSpec.Expansion)),
        config=serialize(item=client_config, format="yaml"))
    }, b={
      SELECT OSPath.Basename AS Name,
             upload(file=OSPath, name=OSPath.Basename) AS Upload
      FROM rpm_create(
        directory_name=TmpDir,
        package_spec=RPMSpec +
            dict(Expansion=UpdateExpansion(Expansion=RPMSpec.Expansion)),
        config=serialize(item=client_config, format="yaml"))
    })

column_types:
  - name: Upload
    type: upload_preview

</code></pre>

