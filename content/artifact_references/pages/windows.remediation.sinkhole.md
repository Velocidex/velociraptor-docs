---
title: Windows.Remediation.Sinkhole
hidden: true
tags: [Client Artifact]
---

**Apply a Sinkhole via Windows hosts file modification**
This content will modify the Windows hosts file by a configurable
lookup table.

On application, the original configuration is backed up.
When reapplying a sinkhole, the original configuration is restored then
changes applied to maintain integrity of the restore process.
If RestoreBackup is selected the artifact will restore the backup
configuration, then delete the backup with no further processing.

NOTE:
Modifying the hosts file may cause network communication issues. I have
disabled any sinkhole settings on the Velociraptor agent configuration
but there are no rail guards on other domains. Use with caution.


<pre><code class="language-yaml">
name: Windows.Remediation.Sinkhole
description: |
   **Apply a Sinkhole via Windows hosts file modification**
   This content will modify the Windows hosts file by a configurable
   lookup table.

   On application, the original configuration is backed up.
   When reapplying a sinkhole, the original configuration is restored then
   changes applied to maintain integrity of the restore process.
   If RestoreBackup is selected the artifact will restore the backup
   configuration, then delete the backup with no further processing.

   NOTE:
   Modifying the hosts file may cause network communication issues. I have
   disabled any sinkhole settings on the Velociraptor agent configuration
   but there are no rail guards on other domains. Use with caution.

author: Matt Green - @mgreen27

required_permissions:
  - EXECVE

implied_permissions:
  - FILESYSTEM_WRITE

type: CLIENT

parameters:
  - name: HostsFile
    description: Path to hosts file
    default: C:\Windows\System32\drivers\etc\hosts
  - name: HostsFileBackup
    description: Name to backup original hosts file. If reapplying the artifact this file is used as the base.
    default: C:\Windows\System32\drivers\etc\hosts.velociraptor.backup
  - name: CommentPrefix
    description: Prefix to add to description in hosts file comments.
    default: "Velociraptor sinkhole"
  - name: RestoreBackup
    description: "Restore hosts file backup"
    type: bool
  - name: SinkholeTable
    description: Table of Domains to add to or modify in hosts file.
    type: csv
    default: |
        Domain,Sinkhole,Description
        evil.com,127.0.0.1,Evilcorp C2 domain


sources:
  - precondition:
      SELECT OS From info() where OS = 'windows'

    query: |
      -- Extract sink hole requirements from table
      LET changes &lt;= SELECT
                Domain,
                Sinkhole,
                if(condition=Description,
                  then= CommentPrefix + ': ' + Description,
                  else= CommentPrefix) as Description
            FROM SinkholeTable

      -- Check for backup to determine if sinkhole applied
      LET check_backup = SELECT OSPath FROM stat(filename=HostsFileBackup)
      WHERE log(message="Found backup at " + OSPath)

      -- Backup old config
      LET backup = copy(filename=HostsFile,dest=HostsFileBackup)

      -- Restore old config
      LET restore = SELECT * FROM chain(
            z=log(message="Will restore from backup"),
            a=copy(filename=HostsFileBackup,dest=HostsFile),
            b={
                SELECT *
                FROM if(condition=RestoreBackup,
                    then={
                        SELECT *
                        FROM execve(argv=['cmd.exe', '/c',
                            'del','/F',HostsFileBackup])
                    })
            })

      -- Write hosts file
      LET write(DataBlob) = copy(filename=DataBlob,dest=HostsFile,accessor='data')

      -- FlushDNS
      LET flushdns = SELECT *
        FROM execve(argv=['cmd.exe', '/c','ipconfig','/flushdns'])

      -- Find existing entries to modify
      LET existing &lt;= SELECT
            parse_string_with_regex(
            string=Line,
            regex=[
                "^\\s+(?P&lt;Resolution&gt;[^\\s]+)\\s+" +
                "(?P&lt;Hostname&gt;[^\\s]+)\\s*\\S*$"
            ]) as Record,
            Line
        FROM parse_lines(filename=HostsFile)
        WHERE
            Record AND Line
            AND NOT Line =~ '^#'

      -- Parse a URL to get domain name.
      LET get_domain(URL) = parse_string_with_regex(
           string=URL, regex='^https?://(?P&lt;Domain&gt;[^:/]+)').Domain

      -- extract Velociraptor config for policy
      LET extracted_config &lt;= SELECT * FROM foreach(
          row=config.server_urls,
            query={
                SELECT get_domain(URL=_value) AS Domain
                FROM scope()
            })

      -- Set existing entries to sinkholed values
      LET find_modline &lt;= SELECT * FROM foreach(row=changes,
            query={
                SELECT
                    format(format='\t%v\t\t%v\t\t# %v',
                    args=[Sinkhole,Domain,Description]) as Line,
                    Domain,
                    'modification' as Type
                FROM existing
                WHERE
                    Record.Hostname = Domain
                    AND NOT Domain in extracted_config.Domain
                GROUP BY Line
            })

      -- Add new hostsfile entries
      LET find_newline &lt;= SELECT * FROM foreach(row=changes,
            query={
                SELECT
                    format(format='\t%v\t\t%v\t\t# %v',
                        args=[Sinkhole,Domain,Description]) as Line,
                    Domain,
                    'new entry' as Type
                FROM scope()
                WHERE
                    NOT Domain in find_modline.Domain
                    AND NOT Domain in extracted_config.Domain
            })

      -- Determine which lines should stay the same
      LET find_line &lt;= SELECT
                Line,
                Record.Hostname as Domain,
                'old entry' as Type
            FROM existing
            WHERE
                NOT Domain in find_modline.Domain
                AND NOT Domain in find_newline.Domain

      -- Add all lines to staging object
      LET build_lines &lt;= SELECT Line FROM chain(
            a=find_modline,
            b=find_newline,
            c=find_line
      )

      -- Join lines from staging object
      LET HostsData = join(array=build_lines.Line,sep='\r\n')

      -- Force start of backup or restore if applicable
      LET backup_restore &lt;= if(
         condition= RestoreBackup AND log(message="Will attempt to restore backup"),
         then= if(
            condition= check_backup,
            then= restore,
            -- then= { SELECT * FROM restore },
            else= log(message='Can not restore hosts file as backup does not exist.')),

         else= if(
           condition= check_backup,
           then={
              SELECT * FROM chain(
                 a= log(message='Backup hosts file already exists.'),
                 b= restore)
              },
          else= backup)
        )

      -- Do kick off logic
      LET do_it &lt;= SELECT * FROM if(condition= NOT RestoreBackup,
            then= {
                SELECT * FROM chain(
                    a= log(message='Adding hosts entries.'),
                    b= write(DataBlob=HostsData),
                    c= flushdns
                )})

      -- Finally show resultant HostsFile
      SELECT * FROM Artifact.Windows.System.HostsFile(HostsFile=HostsFile)

</code></pre>

