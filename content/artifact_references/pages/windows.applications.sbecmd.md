---
title: Windows.Applications.SBECmd
hidden: true
tags: [Client Artifact]
---

Execute Eric Zimmerman's SBECmd and return output for analysis.

SBECmd is a CLI for analyzing shellbags data.

Objective:

- Find which folders were accessed on the local machine, the
  network, and/or removable devices. Evidence of previously
  existing folders after deletion/overwrite. When certain folders
  were accessed.

Interpretation:

- Stores information about which folders were most recently
  browsed by the user.

NOTE: Velociraptor can now parse Shellbags natively with the
Windows.Forensics.Shellbags artifact.

MITRE ATT&CK ID: TA0009 - Collection


<pre><code class="language-yaml">
name: Windows.Applications.SBECmd
description: |
    Execute Eric Zimmerman&#x27;s SBECmd and return output for analysis.

    SBECmd is a CLI for analyzing shellbags data.

    Objective:

    - Find which folders were accessed on the local machine, the
      network, and/or removable devices. Evidence of previously
      existing folders after deletion/overwrite. When certain folders
      were accessed.

    Interpretation:

    - Stores information about which folders were most recently
      browsed by the user.

    NOTE: Velociraptor can now parse Shellbags natively with the
    Windows.Forensics.Shellbags artifact.

    MITRE ATT&amp;CK ID: TA0009 - Collection

author: Eduardo Mattos - @eduardfir

reference:
  - https://github.com/EricZimmerman

type: CLIENT

tools:
  - name: SBECmd
    url: https://github.com/Velocidex/Tools/raw/main/SBECmd/ShellBagsExplorer/SBECmd.exe

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
  - name: userRegex
    default: .
    type: regex

  - name: UploadFiles
    description: &quot;Select to Upload SBECmd Output files.&quot;
    type: bool

  - name: RemovePayload
    description: &quot;Select to Remove Payload after execution.&quot;
    type: bool


sources:
  - query: |
      -- get context on target binary
      LET payload &lt;= SELECT * FROM Artifact.Generic.Utils.FetchBinary(
                    ToolName=&quot;SBECmd&quot;, IsExecutable=TRUE)

      -- build tempfolder for output
      LET tempfolder &lt;= tempdir(remove_last=TRUE)

      -- get users with profiles
      LET UserProfiles = SELECT
         Uid, Name,
         expand(path=Directory) AS HomeDirectory, UUID, Mtime
      FROM Artifact.Windows.Sys.Users()
      WHERE Name =~ userRegex and HomeDirectory =~ &quot;Users&quot;

      -- execute payload
      LET deploy &lt;= SELECT * FROM foreach(row=UserProfiles,
                    query={
                        SELECT *, Name
                        FROM execve(argv=[
                            payload.OSPath[0],
                            &quot;-d&quot;, HomeDirectory,
                            &quot;--csv&quot;, tempfolder + &quot;\\&quot; + Name,
                            &quot;--dedupe&quot;])
                    })

      -- parse csvs
      SELECT * FROM foreach(row=deploy,
      query={
        SELECT *, Name as UserName
        FROM parse_csv(filename=tempfolder + &quot;\\&quot; + Name + &quot;\\Deduplicated.csv&quot;)
      })

  - name: Uploads
    query: |
      SELECT * FROM chain(
      a={
         SELECT * FROM if(
           condition=UploadFiles,
           then={
             SELECT Name, upload(file=OSPath,
                                 name=relpath(base=tempfile, path=OSPath)) as FileDetails
             FROM glob(globs=&quot;/**&quot;, root=tempfolder)
           })
      },
      b={
         SELECT * FROM if(
           condition=RemovePayload,
           then={
             SELECT * FROM execve(argv=[&#x27;powershell&#x27;,&#x27;Remove-Item&#x27;,
                                             payload.OSPath[0],&#x27;-Force&#x27; ])
           })
      })
      WHERE Stdout =~ &quot;SBECmd&quot;

</code></pre>

