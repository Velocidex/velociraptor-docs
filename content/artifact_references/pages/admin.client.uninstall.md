---
title: Admin.Client.Uninstall
hidden: true
tags: [Client Artifact]
---

Uninstall Velociraptor from the endpoint.

This artifact uninstalls a Velociraptor client (or any other MSI
package) from the endpoint.

Typically the client will be hard terminated during the uninstall
process, so on the server it would appear that the collection is not
completed. This is normal.

NOTE: Be careful with the DisplayNameRegex to ensure you do not
uninstall another package accidentally.


<pre><code class="language-yaml">
name: Admin.Client.Uninstall
description: |
  Uninstall Velociraptor from the endpoint.

  This artifact uninstalls a Velociraptor client (or any other MSI
  package) from the endpoint.

  Typically the client will be hard terminated during the uninstall
  process, so on the server it would appear that the collection is not
  completed. This is normal.

  NOTE: Be careful with the DisplayNameRegex to ensure you do not
  uninstall another package accidentally.

required_permissions:
  - EXECVE

parameters:
  - name: DisplayNameRegex
    type: regex
    default: Velociraptor
    description: A regex that will match the package to uninstall.

  - name: ReallyDoIt
    type: bool

sources:
  - name: Windows
    precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query:  |
      LET packages = SELECT KeyName, DisplayName,UninstallString
      FROM Artifact.Windows.Sys.Programs()
      WHERE DisplayName =~ DisplayNameRegex AND
        log(message=&quot;Will uninstall &quot; + DisplayName)

      LET uninstall(UninstallString) = SELECT * FROM execve(
          argv=commandline_split(command=UninstallString) + &quot;/quiet&quot;)

      SELECT KeyName, DisplayName, UninstallString,
          if(condition=ReallyDoIt, then=uninstall(Name=UninstallString).Stdout) AS UninstallLog
      FROM packages

  - name: Debian
    precondition: |
      -- Only run if dpkg is installed.
      SELECT OS, {
         SELECT ReturnCode FROM execve(argv=[&quot;dpkg&quot;, &quot;--help&quot;])
      } AS ReturnCode
      FROM info()
      WHERE OS = &#x27;linux&#x27; AND ReturnCode = 0

    query:  |
      SELECT * FROM if(condition=ReallyDoIt,
      then={
        SELECT * FROM execve(argv=[&quot;dpkg&quot;, &quot;--remove&quot;, &quot;velociraptor-client&quot;])
      })

  - name: RPMBased
    precondition: |
      -- Only run if rpm is installed.
      SELECT OS, {
         SELECT ReturnCode FROM execve(argv=[&quot;rpm&quot;, &quot;--help&quot;])
      } AS ReturnCode
      FROM info()
      WHERE OS = &#x27;linux&#x27; AND ReturnCode = 0

    query:  |
      SELECT * FROM if(condition=ReallyDoIt,
      then={
        SELECT * FROM execve(argv=[&quot;rpm&quot;, &quot;--erase&quot;, &quot;velociraptor-client&quot;])
      })

  - name: MacOS
    precondition: |
      SELECT OS
      FROM info()
      WHERE OS = &#x27;darwin&#x27;

    query:  |
      LET me &lt;= SELECT Exe FROM info()

      SELECT * FROM if(condition=ReallyDoIt,
      then={
        SELECT * FROM execve(argv=[me[0].Exe, &quot;service&quot;, &quot;remove&quot;])
      })

</code></pre>

