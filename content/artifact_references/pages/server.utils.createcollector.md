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
      - MacOSArm
      - Generic

  - name: artifacts
    description: A list of artifacts to collect
    type: json_array
    default: |
      ["Generic.Client.Info"]

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
    default: "{}"

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
    default: "4"
    type: int
    description: Compression level (0=no compression).

  - name: opt_concurrency
    default: "2"
    type: int
    description: Number of concurrency queries

  - name: opt_format
    default: "jsonl"
    description: Output format (jsonl or csv)

  - name: opt_output_directory
    default: ""
    description: Where we actually write the collection to. You can specify this as a mapped drive to write over the network.

  - name: opt_filename_template
    default: "Collection-%FQDN%-%TIMESTAMP%"
    description: |
      The filename to use. You can expand environment variables as
      well as the following %FQDN% and %TIMESTAMP%.

  - name: opt_collector_filename
    type: string
    description: |
      If used, this option overrides the default filename of the collector being built.

  - name: opt_cpu_limit
    default: "0"
    type: int
    description: |
      A number between 0 to 100 representing the target maximum CPU
      utilization during running of this artifact.

  - name: opt_progress_timeout
    default: "1800"
    type: int
    description: |
      If specified the collector is terminated if it made no progress
      in this long. Note: Execution time may be a lot longer since
      each time any result is produced this counter is reset.

  - name: opt_timeout
    default: "0"
    type: int
    description: |
      If specified the collection must complete in the given time. It
      will be cancelled if the collection exceeds this time.

  - name: opt_version
    default: ""
    type: string
    description: |
      If specified the collection will be packed with the specified
      version of the binary. NOTE: This is rarely what you want
      because the packed builtin artifacts are only compatible with
      the current release version.

  - name: opt_delete_at_exit
    type: bool
    default: N
    description: |
      If specified the collection will be deleted at exit. This only
      makes sense when uploading to the cloud or a remote
      location. NOTE: There is no way to check that the upload
      actually worked so this flag deletes the collection regardless
      of upload success.

  - name: StandardCollection
    type: hidden
    default: |
      LET _ &lt;= log(message="Will collect package %v", args=zip_filename)

      SELECT * FROM collect(artifacts=Artifacts,
            args=Parameters, output=zip_filename,
            cpu_limit=CpuLimit,
            progress_timeout=ProgressTimeout,
            timeout=Timeout,
            password=pass[0].Pass,
            level=Level,
            concurrency=Concurrency,
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
          credentials_key=TargetArgs.credentialsKey,
          credentials_secret=TargetArgs.credentialsSecret,
          credentials_token=TargetArgs.credentialsToken,
          region=TargetArgs.region,
          endpoint=TargetArgs.endpoint,
          serverside_encryption=TargetArgs.serverSideEncryption,
          kms_encryption_key=TargetArgs.kmsEncryptionKey,
          s3upload_root=TargetArgs.s3UploadRoot,
          skip_verify=TargetArgs.noverifycert)

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
      LET S = scope()

      // Add all the tools we are going to use to the inventory.
      LET _ &lt;= SELECT inventory_add(tool=ToolName, hash=ExpectedHash, version=S.Version)
       FROM parse_csv(filename="/uploads/inventory.csv", accessor="me")
       WHERE log(message="Adding tool " + ToolName +
             " version " + (S.Version || "Unknown"))

      LET baseline &lt;= SELECT Fqdn, dirname(path=Exe) AS ExePath, Exe,
         scope().CWD AS CWD FROM info()

      LET OutputPrefix &lt;= if(condition= OutputPrefix,
        then=pathspec(parse=OutputPrefix),
        else= if(condition= baseline[0].CWD,
          then=pathspec(parse= baseline[0].CWD),
          else=pathspec(parse= baseline[0].ExePath)))

      LET _ &lt;= log(message="Output Prefix : %v", args= OutputPrefix)

      LET FormatMessage(Message) = regex_transform(
          map=dict(`%FQDN%`=baseline[0].Fqdn,
                   `%Timestamp%`=timestamp(epoch=now()).MarshalText),
          source=Message)

      // Format the filename safely according to the filename
      // template. This will be the name uploaded to the bucket.
      LET formatted_zip_name &lt;= regex_replace(
          source=expand(path=FormatMessage(Message=FilenameTemplate)),
          re="[^0-9A-Za-z\\-]", replace="_")

      // This is where we write the files on the endpoint.
      LET zip_filename &lt;= OutputPrefix + ( formatted_zip_name + ".zip" )
      LET LogFile &lt;= OutputPrefix + ( formatted_zip_name + ".log" )

      LET _ &lt;= log(message="Log file is at %v", args=LogFile)

      // Create the log file and start writing into it
      // Just forward output from the logging() plugin
      LET LogPipe &lt;= pipe(query={
        SELECT format(format="[%v] %v %v\n",
                      args=(level, time, msg)) AS Line
        FROM logging(prelog=TRUE)
      })

      LET _ &lt;= background(query={
          SELECT copy(accessor="pipe", filename="LogPipe", dest=LogFile) AS C
          FROM scope()
      })

      -- Remove the zip file and log file when done if the user asked for it.
      LET _ &lt;= if(condition=DeleteOnExit, then=atexit(query={
         SELECT rm(filename=zip_filename), rm(filename=log_filename) FROM scope()
         WHERE log(message="Removed Zip file %v", args=zip_filename)
      }, env=dict(zip_filename=zip_filename, log_filename=LogFile)))

      -- Make a random hex string as a random password
      LET RandomPassword &lt;= SELECT format(format="%02x",
            args=rand(range=255)) AS A
      FROM range(end=25)

      LET pass = SELECT * FROM switch(a={

         -- For X509 encryption we use a random session password.
         SELECT join(array=RandomPassword.A) as Pass From scope()
         WHERE encryption_scheme =~ "pgp|x509"
          AND log(message="I will generate a container password using the %v scheme",
                  args=encryption_scheme)

      }, b={

         -- Otherwise the user specified the password.
         SELECT encryption_args.password as Pass FROM scope()
         WHERE encryption_scheme =~ "password"

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
          re="[^0-9A-Za-z\\-/]", replace="_")

      LET _ &lt;= log(message="Will collect package %v and upload to cloud bucket %v",
         args=[zip_filename, TargetArgs.bucket])

      LET Result &lt;= SELECT
          upload_file(filename=Container,
                      name= upload_name + ".zip",
                      accessor="file") AS Upload,
          upload_file(filename=LogFile,
                      name= upload_name + ".log",
                      accessor="file") AS LogUpload

      FROM collect(artifacts=Artifacts,
          args=Parameters,
          format=Format,
          output=zip_filename,
          cpu_limit=CpuLimit,
          progress_timeout=ProgressTimeout,
          timeout=Timeout,
          password=pass[0].Pass,
          level=Level,
          concurrency=Concurrency,
          metadata=ContainerMetadata)

      LET _ &lt;= if(condition=NOT Result[0].Upload.Path,
         then=log(message="&lt;red&gt;Failed to upload to cloud bucket!&lt;/&gt; Leaving the collection behind for manual upload!"),
         else=log(message="&lt;green&gt;Collection Complete!&lt;/&gt; Please remove %v when you are sure it was properly transferred", args=zip_filename))

      SELECT * FROM Result


  - name: FetchBinaryOverride
    type: hidden
    description: |
       A replacement for Generic.Utils.FetchBinary which
       grabs files from the local archive.

    default: |
       LET RequiredTool &lt;= ToolName
       LET S = scope()

       LET matching_tools &lt;= SELECT ToolName, Filename
       FROM parse_csv(filename="/uploads/inventory.csv", accessor="me")
       WHERE RequiredTool = ToolName

       LET get_ext(filename) = parse_string_with_regex(
             regex="(\\.[a-z0-9]+)$", string=filename).g1

        LET FullPath &lt;= if(condition=matching_tools,
        then=copy(filename=matching_tools[0].Filename,
             accessor="me", dest=tempfile(
                 extension=get_ext(filename=matching_tools[0].Filename),
                 remove_last=TRUE,
                 permissions=if(condition=IsExecutable, then="x"))))

       SELECT FullPath, FullPath AS OSPath,
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
       a={ SELECT "VelociraptorWindows" AS Type FROM scope() WHERE OS = "Windows"},
       b={ SELECT "VelociraptorWindows_x86" AS Type FROM scope() WHERE OS = "Windows_x86"},
       c={ SELECT "VelociraptorLinux" AS Type FROM scope() WHERE OS = "Linux"},
       d={ SELECT "VelociraptorCollector" AS Type FROM scope() WHERE OS = "MacOS"},
       e={ SELECT "VelociraptorCollector" AS Type FROM scope() WHERE OS = "MacOSArm"},
       f={ SELECT "VelociraptorCollector" AS Type FROM scope() WHERE OS = "Generic"},
       g={ SELECT "" AS Type FROM scope()
           WHERE NOT log(message="Unknown target type " + OS) }
      )

      LET Target &lt;= tool_name[0].Type

      // This is what we will call it.
      LET CollectorName &lt;= opt_collector_filename ||
          format(format='Collector_%v', args=inventory_get(tool=Target).Definition.filename)

      LET CollectionArtifact &lt;= SELECT Value FROM switch(
        a = { SELECT CommonCollections + StandardCollection AS Value
              FROM scope()
              WHERE target = "ZIP" },
        b = { SELECT S3Collection + CommonCollections + CloudCollection AS Value
              FROM scope()
              WHERE target = "S3" },
        c = { SELECT GCSCollection + CommonCollections + CloudCollection AS Value
              FROM scope()
              WHERE target = "GCS" },
        d = { SELECT SFTPCollection + CommonCollections + CloudCollection AS Value
              FROM scope()
              WHERE target = "SFTP" },
        e = { SELECT AzureSASURL + CommonCollections + CloudCollection AS Value
              FROM scope()
              WHERE target = "Azure" },
        f = { SELECT SMBCollection + CommonCollections + CloudCollection AS Value
              FROM scope()
              WHERE target = "SMBShare" },
        z = { SELECT "" AS Value  FROM scope()
              WHERE log(message="Unknown collection type " + target) }
      )

      LET use_server_cert = encryption_scheme =~ "x509"
         AND NOT encryption_args.public_key =~ "-----BEGIN CERTIFICATE-----"
         AND log(message="Pubkey encryption specified, but no cert/key provided. Defaulting to server frontend cert")

      -- For x509, if no public key cert is specified, we use the
      -- server's own key. This makes it easy for the server to import
      -- the file again.
      LET updated_encryption_args &lt;= if(
         condition=use_server_cert,
         then=dict(public_key=server_frontend_cert(),
                   scheme="x509"),
         else=encryption_args
      )

      -- Add custom definition if needed. Built in definitions are not added
      LET definitions &lt;= SELECT * FROM chain(
      a = { SELECT name, description, tools, export, parameters, sources
            FROM artifact_definitions(deps=TRUE, names=artifacts)
            WHERE NOT compiled_in AND
              log(message="Adding artifact_definition for " + name) },

      // Create the definition of the Collector artifact.
      b = { SELECT "Collector" AS name, (
                    dict(name="Artifacts",
                         default=serialize(format='json', item=artifacts),
                         type="json_array"),
                    dict(name="Parameters",
                         default=serialize(format='json', item=parameters),
                         type="json"),
                    dict(name="encryption_scheme", default=encryption_scheme),
                    dict(name="encryption_args",
                         default=serialize(format='json', item=updated_encryption_args),
                         type="json"
                         ),
                    dict(name="Level", default=opt_level, type="int"),
                    dict(name="Concurrency", default=opt_concurrency, type="int"),
                    dict(name="Format", default=opt_format),
                    dict(name="OutputPrefix", default=opt_output_directory),
                    dict(name="FilenameTemplate", default=opt_filename_template),
                    dict(name="CpuLimit", type="int",
                         default=opt_cpu_limit),
                    dict(name="ProgressTimeout", type="int",
                         default=opt_progress_timeout),
                    dict(name="Timeout", default=opt_timeout, type="int"),
                    dict(name="DeleteOnExit", default=opt_delete_at_exit, type="bool"),
                    dict(name="target_args",
                         default=serialize(format='json', item=target_args),
                         type="json"),
                ) AS parameters,
                (
                  dict(query=CollectionArtifact[0].Value),
                ) AS sources
            FROM scope() },

      // Override FetchBinary to get files from the executable.
      c = { SELECT "Generic.Utils.FetchBinary" AS name,
            (
               dict(name="SleepDuration", type="int", default="0"),
               dict(name="ToolName"),
               dict(name="ToolInfo"),
               dict(name="TemporaryOnly", type="bool"),
               dict(name="Version"),
               dict(name="IsExecutable", type="bool", default="Y"),
            ) AS parameters,
            (
               dict(query=FetchBinaryOverride),
            ) AS sources FROM scope()  }
      )

      LET optional_cmdline = SELECT * FROM chain(
        a={ SELECT "-v" AS Opt FROM scope() WHERE opt_verbose},
        b={ SELECT "--nobanner" AS Opt FROM scope() WHERE NOT opt_banner},
        c={ SELECT "--require_admin" AS Opt FROM scope() WHERE opt_admin},
        d={ SELECT "--prompt" AS Opt FROM scope() WHERE opt_prompt},
        e={ SELECT "--tempdir" AS Opt FROM scope() WHERE opt_tempdir},
        f={ SELECT opt_tempdir AS Opt FROM scope() WHERE opt_tempdir}
      )

      // Build the autoexec config file depending on the user's
      // collection type choices.
      LET autoexec &lt;= dict(autoexec=dict(
          argv=("artifacts", "collect", "Collector") + optional_cmdline.Opt,
          artifact_definitions=definitions)
      )

      // Do the actual repacking.
      SELECT repack(
           upload_name=CollectorName,
           target=tool_name[0].Type,
           binaries=Binaries.Binary,
           version=opt_version,
           config=serialize(format='json', item=autoexec)) AS Repacked
      FROM scope()

</code></pre>

