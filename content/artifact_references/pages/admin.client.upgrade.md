---
title: Admin.Client.Upgrade
hidden: true
tags: [Client Artifact]
---

Remotely push new client updates.

NOTE: This artifact requires that you supply a client MSI using the
tools interface. Simply click on the tool in the GUI and upload a
pre-packaged MSI.

While typically the MSI will contain the Velociraptor windows
client, you can install any other MSI as well by customizing this
artifact or uploading a different msi file.


<pre><code class="language-yaml">
name: Admin.Client.Upgrade
description: |
  Remotely push new client updates.

  NOTE: This artifact requires that you supply a client MSI using the
  tools interface. Simply click on the tool in the GUI and upload a
  pre-packaged MSI.

  While typically the MSI will contain the Velociraptor windows
  client, you can install any other MSI as well by customizing this
  artifact or uploading a different msi file.

tools:
  - name: WindowsMSI

parameters:
  - name: SleepDuration
    default: &quot;600&quot;
    type: int
    description: |
      The MSI file is typically very large and we do not want to
      overwhelm the server so we stagger the download over this many
      seconds.

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query:  |
      // Force the file to be copied to the real temp directory since
      // we are just about to remove the Tools directory.
      LET bin &lt;= SELECT copy(filename=OSPath,
          dest=expand(path=&quot;%SYSTEMROOT%\\Temp\\&quot;) + basename(path=OSPath)) AS Dest
      FROM Artifact.Generic.Utils.FetchBinary(
         ToolName=&quot;WindowsMSI&quot;, IsExecutable=FALSE,
         SleepDuration=SleepDuration)

      // Call the binary and return all its output in a single row.
      // If we fail to download the binary we do not run the command.
      SELECT * FROM foreach(row=bin,
      query={
         SELECT * FROM execve(
              argv=[&quot;msiexec.exe&quot;, &quot;/i&quot;, Dest, &quot;/q&quot;],
              length=10000000)
      })

</code></pre>

