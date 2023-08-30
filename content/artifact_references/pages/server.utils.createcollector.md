---
title: Server.Utils.CreateCollector
hidden: true
tags: [Server Artifact]
---

A utility artifact to create a stand alone collector.

This artifact is actually invoked by the Offline collector GUI and
that is the recommended way to launch it. You can find the Offline
collector builder in the `Server Artifacts` section of the GUI.


<pre><code class="language-yaml">
name: Server.Utils.CreateCollector
description: |
  A utility artifact to create a stand alone collector.

  This artifact is actually invoked by the Offline collector GUI and
  that is the recommended way to launch it. You can find the Offline
  collector builder in the `Server Artifacts` section of the GUI.

type: SERVER

parameters:
  - name: OS
    default: Windows
    type: choices
    choices:
      - Windows
      - Windows_x86
      - Linux
      - MacOS

  - name: artifacts
    description: A list of artifacts to collect
    type: json_array
    default: |
      [&quot;Generic.Client.Info&quot;]

  - name: encryption_scheme
    description: |
      Encryption scheme to use. Currently supported are Password, X509 or PGP

  - name: encryption_args
    description: |
      Encryption arguments
    type: json
    default: |
      {}

  - name: parameters
    description: A dict containing the parameters to set.
    type: json
    default: |
      {}

  - name: target
    description: Output type
    type: choices
    default: ZIP
    choices:
      - ZIP
      - GCS
      - S3
      - SFTP
      - Azure
      - SMBShare

  - name: target_args
    description: Type Dependent args
    type: json
    default: &quot;{}&quot;

  - name: opt_verbose
    default: Y
    type: bool
    description: Show verbose progress.

  - name: opt_banner
    default: Y
    type: bool
    description: Show Velociraptor banner.

  - name: opt_prompt
    default: N
    type: bool
    description: Wait for a prompt before closing.

  - name: opt_admin
    default: Y
    type: bool
    description: Require administrator privilege when running.

  - name: opt_tempdir
    default:
    description: A directory to write tempfiles in

  - name: opt_level
    default: &quot;4&quot;
    type: int
    description: Compression level (0=no compression).

  - name: opt_format
    default: &quot;jsonl&quot;
    description: Output format (jsonl or csv)

  - name: opt_output_directory
    default: &quot;&quot;
    description: Where we actually write the collection to. You can specify this as a mapped drive to write over the network.

  - name: opt_filename_template
    default: &quot;Collection-%FQDN%-%TIMESTAMP%&quot;
    description: |
      The filename to use. You can expand environment variables as
      well as the following %FQDN% and %TIMESTAMP%.

  - name: opt_cpu_limit
    default: &quot;0&quot;
    type: int
    description: |
      A number between 0 to 100 representing the target maximum CPU
      utilization during running of this artifact.

  - name: opt_progress_timeout
    default: &quot;1800&quot;
    type: int
    description: |
      If specified the collector is terminated if it made no progress
      in this long. Note: Execution time may be a lot longer since
      each time any result is produced this counter is reset.

  - name: opt_timeout
    default: &quot;0&quot;
    type: int
    description: |
      If specified the collection must complete in the given time. It
      will be cancelled if the collection exceeds this time.

  - name: opt_version
    default: &quot;&quot;
    type: string
    description: |
      If specified the collection will be packed with the specified
      version of the binary. NOTE: This is rarely what you want
      because the packed builtin artifacts are only compatible with
      the current release version.

  - name: StandardCollection
    type: hidden
    default: |
      LET _ &lt;= log(message=&quot;Will collect package %v&quot;, args=zip_filename)

      SELECT * FROM collect(artifacts=Artifacts,
            args=Parameters, output=zip_filename,
            cpu_limit=CpuLimit,
            progress_timeout=ProgressTimeout,
            timeout=Timeout,
            password=pass[0].Pass,
            level=Level,
            format=Format,
            metadata=ContainerMetadata)

  - name: S3Collection
    type: hidden
    default: |
      // A utility function to upload the file.
      LET upload_file(filename, name, accessor) = upload_s3(
          file=filename,
          accessor=accessor,
          bucket=TargetArgs.bucket,
          name=name,
          credentialskey=TargetArgs.credentialsKey,
          credentialssecret=TargetArgs.credentialsSecret,
          region=TargetArgs.region,
          endpoint=TargetArgs.endpoint,
          serversideencryption=TargetArgs.serverSideEncryption,
          kmsencryptionkey=TargetArgs.kmsEncryptionKey,
          s3uploadroot=TargetArgs.s3UploadRoot,
          noverifycert=TargetArgs.noverifycert)

  - name: GCSCollection
    type: hidden
    default: |
      LET GCSBlob &lt;= parse_json(data=target_args.GCSKey)

      // A utility function to upload the file.
      LET upload_file(filename, name, accessor) = upload_gcs(
          file=filename,
          accessor=accessor,
          bucket=target_args.bucket,
          project=GCSBlob.project_id,
          name=name,
          credentials=target_args.GCSKey)

  - name: AzureSASURL
    type: hidden
    default: |
      // A utility function to upload the file.
      LET upload_file(filename, name, accessor) = upload_azure(
          file=filename,
          accessor=accessor,
          sas_url=TargetArgs.sas_url,
          name=name)

  - name: SMBCollection
    type: hidden
    default: |
      // A utility function to upload the file.
      LET upload_file(filename, name, accessor) = upload_smb(
          file=filename,
          accessor=accessor,
          username=TargetArgs.username,
          password=TargetArgs.password,
          server_address=TargetArgs.server_address,
          name=name)

  - name: SFTPCollection
    type: hidden
    default : |
      LET upload_file(filename, name, accessor) = upload_sftp(
        file=filename,
        accessor=accessor,
        name=name,
        user=TargetArgs.user,
        path=TargetArgs.path,
        privatekey=TargetArgs.privatekey,
        endpoint=TargetArgs.endpoint,
        hostkey = TargetArgs.hostkey)

  - name: CommonCollections
    type: hidden
    default: |
      // Add all the tools we are going to use to the inventory.
      LET _ &lt;= SELECT inventory_add(tool=ToolName, hash=ExpectedHash)
       FROM parse_csv(filename=&quot;/uploads/inventory.csv&quot;, accessor=&quot;me&quot;)
       WHERE log(message=&quot;Adding tool &quot; + ToolName)

      LET baseline &lt;= SELECT Fqdn, dirname(path=Exe) AS ExePath, Exe,
         scope().CWD AS CWD FROM info()

      LET OutputPrefix &lt;= if(condition= OutputPrefix,
        then=pathspec(parse=OutputPrefix),
        else= if(condition= baseline[0].CWD,
          then=pathspec(parse= baseline[0].CWD),
          else=pathspec(parse= baseline[0].ExePath)))

      LET _ &lt;= log(message=&quot;Output Prefix : %v&quot;, args= OutputPrefix)

      LET FormatMessage(Message) = regex_transform(
          map=dict(`%FQDN%`=baseline[0].Fqdn,
                   `%Timestamp%`=timestamp(epoch=now()).MarshalText),
          source=Message)

      // Format the filename safely according to the filename
      // template. This will be the name uploaded to the bucket.
      LET formatted_zip_name &lt;= regex_replace(
          source=expand(path=FormatMessage(Message=FilenameTemplate)),
          re=&quot;[^0-9A-Za-z\\-]&quot;, replace=&quot;_&quot;) + &quot;.zip&quot;

      // This is where we write the files on the endpoint.
      LET zip_filename &lt;= OutputPrefix + formatted_zip_name

      // The log is always written to the executable path
      LET log_filename &lt;= pathspec(parse= baseline[0].Exe + &quot;.log&quot;)

      -- Make a random hex string as a random password
      LET RandomPassword &lt;= SELECT format(format=&quot;%02x&quot;,
            args=rand(range=255)) AS A
      FROM range(end=25)

      LET pass = SELECT * FROM switch(a={

         -- For X509 encryption we use a random session password.
         SELECT join(array=RandomPassword.A) as Pass From scope()
         WHERE encryption_scheme =~ &quot;pgp|x509&quot;
          AND log(message=&quot;I will generate a container password using the %v scheme&quot;,
                  args=encryption_scheme)

      }, b={

         -- Otherwise the user specified the password.
         SELECT encryption_args.password as Pass FROM scope()
         WHERE encryption_scheme =~ &quot;password&quot;

      }, c={

         -- No password specified.
         SELECT Null as Pass FROM scope()
      })

      -- For X509 encryption_scheme, store the encrypted
      -- password in the metadata file for later retrieval.
      LET ContainerMetadata = if(
          condition=encryption_args.public_key,
          then=dict(
             EncryptedPass=pk_encrypt(data=pass[0].Pass,
                public_key=encryption_args.public_key,
             scheme=encryption_scheme),
          Scheme=encryption_scheme,
          PublicKey=encryption_args.public_key))

  - name: CloudCollection
    type: hidden
    default: |
      LET TargetArgs &lt;= target_args

      // When uploading to the cloud it is allowed to use directory //
      // separators and we trust the filename template to be a valid
      // filename.
      LET upload_name &lt;= regex_replace(
          source=expand(path=FormatMessage(Message=FilenameTemplate)),
          re=&quot;[^0-9A-Za-z\\-/]&quot;, replace=&quot;_&quot;)

      LET _ &lt;= log(message=&quot;Will collect package %v and upload to cloud bucket %v&quot;,
         args=[zip_filename, TargetArgs.bucket])

      LET Result &lt;= SELECT
          upload_file(filename=Container,
                      name= upload_name + &quot;.zip&quot;,
                      accessor=&quot;file&quot;) AS Upload,
          upload_file(filename=log_filename,
                      name= upload_name + &quot;.log&quot;,
                      accessor=&quot;file&quot;) AS LogUpload

      FROM collect(artifacts=Artifacts,
          args=Parameters,
          format=Format,
          output=zip_filename,
          cpu_limit=CpuLimit,
          progress_timeout=ProgressTimeout,
          timeout=Timeout,
          password=pass[0].Pass,
          level=Level,
          metadata=ContainerMetadata)

      LET _ &lt;= if(condition=NOT Result[0].Upload.Path,
         then=log(message=&quot;&lt;red&gt;Failed to upload to cloud bucket!&lt;/&gt; Leaving the collection behind for manual upload!&quot;),
         else=log(message=&quot;&lt;green&gt;Collection Complete!&lt;/&gt; Please remove %v when you are sure it was properly transferred&quot;, args=zip_filename))

      SELECT * FROM Result


  - name: FetchBinaryOverride
    type: hidden
    description: |
       A replacement for Generic.Utils.FetchBinary which
       grabs files from the local archive.

    default: |
       LET RequiredTool &lt;= ToolName

       LET matching_tools &lt;= SELECT ToolName, Filename
       FROM parse_csv(filename=&quot;/uploads/inventory.csv&quot;, accessor=&quot;me&quot;)
       WHERE RequiredTool = ToolName

       LET get_ext(filename) = parse_string_with_regex(
             regex=&quot;(\\.[a-z0-9]+)$&quot;, string=filename).g1

       LET temp_binary &lt;= if(condition=matching_tools,
       then=tempfile(
                extension=get_ext(filename=matching_tools[0].Filename),
                remove_last=TRUE,
                permissions=if(condition=IsExecutable, then=&quot;x&quot;)))

       SELECT copy(filename=Filename, accessor=&quot;me&quot;, dest=temp_binary) AS OSPath,
              Filename AS Name
       FROM matching_tools

sources:
  - query: |
      LET Binaries &lt;= SELECT * FROM foreach(
          row={
             SELECT tools FROM artifact_definitions(deps=TRUE, names=artifacts)
          }, query={
             SELECT * FROM foreach(row=tools,
             query={
                SELECT name AS Binary FROM scope()
             })
          }) GROUP BY Binary

      // Choose the right target binary depending on the target OS
      LET tool_name = SELECT * FROM switch(
       a={ SELECT &quot;VelociraptorWindows&quot; AS Type FROM scope() WHERE OS = &quot;Windows&quot;},
       b={ SELECT &quot;VelociraptorWindows_x86&quot; AS Type FROM scope() WHERE OS = &quot;Windows_x86&quot;},
       c={ SELECT &quot;VelociraptorLinux&quot; AS Type FROM scope() WHERE OS = &quot;Linux&quot;},
       d={ SELECT &quot;VelociraptorCollector&quot; AS Type FROM scope() WHERE OS = &quot;MacOS&quot;},
       e={ SELECT &quot;VelociraptorCollector&quot; AS Type FROM scope() WHERE OS = &quot;MacOSArm&quot;},
       f={ SELECT &quot;VelociraptorCollector&quot; AS Type FROM scope() WHERE OS = &quot;Generic&quot;},
       g={ SELECT &quot;&quot; AS Type FROM scope()
           WHERE NOT log(message=&quot;Unknown target type &quot; + OS) }
      )

      LET Target &lt;= tool_name[0].Type

      // This is what we will call it.
      LET CollectorName &lt;= format(
          format=&#x27;Collector_%v&#x27;,
          args=inventory_get(tool=Target).Definition.filename)

      LET CollectionArtifact &lt;= SELECT Value FROM switch(
        a = { SELECT CommonCollections + StandardCollection AS Value
              FROM scope()
              WHERE target = &quot;ZIP&quot; },
        b = { SELECT S3Collection + CommonCollections + CloudCollection AS Value
              FROM scope()
              WHERE target = &quot;S3&quot; },
        c = { SELECT GCSCollection + CommonCollections + CloudCollection AS Value
              FROM scope()
              WHERE target = &quot;GCS&quot; },
        d = { SELECT SFTPCollection + CommonCollections + CloudCollection AS Value
              FROM scope()
              WHERE target = &quot;SFTP&quot; },
        e = { SELECT AzureSASURL + CommonCollections + CloudCollection AS Value
              FROM scope()
              WHERE target = &quot;Azure&quot; },
        f = { SELECT SMBCollection + CommonCollections + CloudCollection AS Value
              FROM scope()
              WHERE target = &quot;SMBShare&quot; },
        z = { SELECT &quot;&quot; AS Value  FROM scope()
              WHERE log(message=&quot;Unknown collection type &quot; + target) }
      )

      LET use_server_cert = encryption_scheme =~ &quot;x509&quot;
         AND NOT encryption_args.public_key =~ &quot;----BEGIN CERTIFICATE-----&quot;
         AND log(message=&quot;Pubkey encryption specified, but no cert/key provided. Defaulting to server frontend cert&quot;)

      -- For x509, if no public key cert is specified, we use the
      -- server&#x27;s own key. This makes it easy for the server to import
      -- the file again.
      LET updated_encryption_args &lt;= if(
         condition=use_server_cert,
         then=dict(public_key=server_frontend_cert(),
                   scheme=&quot;x509&quot;),
         else=encryption_args
      )

      -- Add custom definition if needed. Built in definitions are not added
      LET definitions &lt;= SELECT * FROM chain(
      a = { SELECT name, description, tools, parameters, sources
            FROM artifact_definitions(deps=TRUE, names=artifacts)
            WHERE NOT compiled_in AND
              log(message=&quot;Adding artifact_definition for &quot; + name) },

      // Create the definition of the Collector artifact.
      b = { SELECT &quot;Collector&quot; AS name, (
                    dict(name=&quot;Artifacts&quot;,
                         default=serialize(format=&#x27;json&#x27;, item=artifacts),
                         type=&quot;json_array&quot;),
                    dict(name=&quot;Parameters&quot;,
                         default=serialize(format=&#x27;json&#x27;, item=parameters),
                         type=&quot;json&quot;),
                    dict(name=&quot;encryption_scheme&quot;, default=encryption_scheme),
                    dict(name=&quot;encryption_args&quot;,
                         default=serialize(format=&#x27;json&#x27;, item=updated_encryption_args),
                         type=&quot;json&quot;
                         ),
                    dict(name=&quot;Level&quot;, default=opt_level, type=&quot;int&quot;),
                    dict(name=&quot;Format&quot;, default=opt_format),
                    dict(name=&quot;OutputPrefix&quot;, default=opt_output_directory),
                    dict(name=&quot;FilenameTemplate&quot;, default=opt_filename_template),
                    dict(name=&quot;CpuLimit&quot;, type=&quot;int&quot;,
                         default=opt_cpu_limit),
                    dict(name=&quot;ProgressTimeout&quot;, type=&quot;int&quot;,
                         default=opt_progress_timeout),
                    dict(name=&quot;Timeout&quot;, default=opt_timeout, type=&quot;int&quot;),
                    dict(name=&quot;target_args&quot;,
                         default=serialize(format=&#x27;json&#x27;, item=target_args),
                         type=&quot;json&quot;),
                ) AS parameters,
                (
                  dict(query=CollectionArtifact[0].Value),
                ) AS sources
            FROM scope() },

      // Override FetchBinary to get files from the executable.
      c = { SELECT &quot;Generic.Utils.FetchBinary&quot; AS name,
            (
               dict(name=&quot;SleepDuration&quot;, type=&quot;int&quot;, default=&quot;0&quot;),
               dict(name=&quot;ToolName&quot;),
               dict(name=&quot;ToolInfo&quot;),
               dict(name=&quot;IsExecutable&quot;, type=&quot;bool&quot;, default=&quot;Y&quot;),
            ) AS parameters,
            (
               dict(query=FetchBinaryOverride),
            ) AS sources FROM scope()  }
      )

      LET optional_cmdline = SELECT * FROM chain(
        a={ SELECT &quot;-v&quot; AS Opt FROM scope() WHERE opt_verbose},
        b={ SELECT &quot;--nobanner&quot; AS Opt FROM scope() WHERE NOT opt_banner},
        c={ SELECT &quot;--require_admin&quot; AS Opt FROM scope() WHERE opt_admin},
        d={ SELECT &quot;--prompt&quot; AS Opt FROM scope() WHERE opt_prompt},
        e={ SELECT &quot;--tempdir&quot; AS Opt FROM scope() WHERE opt_tempdir},
        f={ SELECT opt_tempdir AS Opt FROM scope() WHERE opt_tempdir}
      )

      // Build the autoexec config file depending on the user&#x27;s
      // collection type choices.
      LET autoexec &lt;= dict(autoexec=dict(
          argv=(&quot;artifacts&quot;, &quot;collect&quot;, &quot;Collector&quot;,
                &quot;--logfile&quot;, CollectorName + &quot;.log&quot;) + optional_cmdline.Opt,
          artifact_definitions=definitions)
      )

      // Do the actual repacking.
      SELECT repack(
           upload_name=CollectorName,
           target=tool_name[0].Type,
           binaries=Binaries.Binary,
           version=opt_version,
           config=serialize(format=&#x27;json&#x27;, item=autoexec))
      FROM scope()

</code></pre>

