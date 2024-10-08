---
title: Linux.Utils.InstallDeb
hidden: true
tags: [Client Artifact]
---

Install a deb package and configure it with debconf answers. The package
may either be specified by name or be an uploaded file. If the package
already exists, it may be optionally reconfigured with debconf answers.


<pre><code class="language-yaml">
name: Linux.Utils.InstallDeb
author: Andreas Misje – @misje
description: |
   Install a deb package and configure it with debconf answers. The package
   may either be specified by name or be an uploaded file. If the package
   already exists, it may be optionally reconfigured with debconf answers.

type: CLIENT

required_permissions:
   - EXECVE

reference:
   - https://manpages.debian.org/bookworm/debconf-doc/debconf-devel.7.en.html#Type

parameters:
   - name: DebName
     description: |
        Package to install (by name). Ignored if DebFile is set. An absolute path
        to a deb file that already exists on the system is also accepted.

   - name: DebFile
     description: |
        Package to install (by file). Remember to click "Upload"! When set,
        DebName is ignored. Use DebName with an absolute file path if the
        file already exists on the system and does not need to be uploaded.
     type: upload

   - name: UpdateSources
     description: |
        Run `apt-get update` before installing the package. This is not necessary
        if the package has no dependencies, and it should be disabled if there
        is no Internet.
     type: bool
     default: True

   - name: ForceConfNew
     type: bool
     description: |
        Use the configuration delivered by the package instead of keeping the
        local changes.

   - name: ReconfigureIfInstalled
     type: bool
     description: |
        If the package is already installed, run pre-seed debconf and
        `dpkg-reconfigure` instead.

   - name: DebConfValues
     type: csv
     description: |
        debconf is a system used by many packages for interactive configuration.
        When using a non-interactive frontend (like this artifact), answers may
        by provided as a "pre-seed" file. Example line:

        "wireshark-common/install-setuid,boolean,false"
     default: |
        Key,Type,Value

column_types:
  - name: Stdout
    type: nobreak

  - name: Stderr
    type: nobreak

sources:
  - precondition:
      SELECT OS From info() where OS = 'linux'

    query: |
     LET Package &lt;= if(
         condition=DebFile,
         then=tempfile(data=DebFile, extension='_amd64.deb'),
         else=DebName)

     /* The file name is lost from the uploaded file, so extract it from the
        package instead: */
     LET PackageInfo = SELECT Stdout
       FROM execve(argv=['/usr/bin/dpkg-deb', '--field', Package, 'Package'])

     LET PackageName = if(
         condition=DebFile,
         then=PackageInfo[0].Stdout[:-1], // remove "\n"
         else=DebName)

     /* The file format is "package_name question type answer": */
     LET PreSeedLines = SELECT
                               join(
                                 sep=' ',
                                 array=(PackageName, Key, Type, Value, )) AS Line
       FROM DebConfValues

     LET PreSeedFile &lt;= tempfile(data=join(sep='\n', array=PreSeedLines.Line))

     LET AptOpts &lt;= ('-f', '-y', '-o', 'Debug::pkgProblemResolver=yes', '--no-install-recommends', ) + if(
         condition=ForceConfNew,
         then=('-o', 'Dpkg::Options::="--force-confnew"', ),
         else=[])

     LET PreSeed = SELECT
                          'Pre-seed debconf' AS Step,
                          *
       FROM if(
         condition=DebConfValues,
         then={
           SELECT *
           FROM execve(argv=['/usr/bin/debconf-set-selections', PreSeedFile, ])
           WHERE log(
             message=format(
               format='Pre-seeding %v',
               args=[PackageName, ]),
             level='INFO')
         })

     LET Install = SELECT *
       FROM chain(
         a_update={
           SELECT
                  'Update index' AS Step,
                  *
           FROM if(
             condition=UpdateSources,
             then={
               SELECT *
               FROM execve(argv=['/usr/bin/apt-get', '-y', 'update'])
               WHERE log(
                 message='Updating package index before installing',
                 level='INFO')
             })
         },
         b_debconf=PreSeed,
         c_install={
           SELECT
                  'Installing package' AS Step,
                  *
           FROM execve(argv=('/usr/bin/apt-get', 'install', ) + AptOpts + (Package, ))
           WHERE log(
             message=format(
               format='Installing deb package %v',
               args=[PackageName, ]),
             level='INFO')
         })

     LET IsInstalled = SELECT *
       FROM stat(
         filename=path_join(
           components=('/var/lib/dpkg/info', PackageName + '.list')))
       WHERE log(
         message=format(
           format='Package %v is already installed',
           args=[PackageName, ]),
         level='INFO')

     SELECT *
     FROM if(
       condition=IsInstalled,
       then=if(
         condition=ReconfigureIfInstalled,
         then={
           SELECT *
           FROM chain(
             a_debconf=PreSeed,
             b_reconfigure={
               SELECT
                      'Reconfiguring package' AS Step,
                      *
               FROM execve(argv=['/usr/sbin/dpkg-reconfigure', PackageName, ],
                           env=dict(
                             DEBIAN_FRONTEND='noninteractive'))
               WHERE log(
                 message=format(
                   format='Reconfiguring deb package %v',
                   args=[PackageName, ]),
                 level='INFO')
             })
         }),
       else=Install)

</code></pre>

