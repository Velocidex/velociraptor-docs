---
title: Windows.System.VBScript
hidden: true
tags: [Client Artifact]
---

This artifact allows running VBScript through cscript.exe.

This is a very powerful artifact since it allows for arbitrary command execution
on the endpoints as SYSTEM. Therefore this artifact requires elevated permissions
(specifically the EXECVE permission). Typically it is only available with the
administrator role.

Note: Output is formatted to 1 row per line of Stdout. Ensure appropriately
formatted scripts. Pasting scripts direct from word or webpages may lead to
formatting issues when unicode characters are substituted. Copy script into
a notepad, save as ASCII then try again.


<pre><code class="language-yaml">
name: Windows.System.VBScript
author: Matt Green - @mgreen27
description: |
  This artifact allows running VBScript through cscript.exe.

  This is a very powerful artifact since it allows for arbitrary command execution
  on the endpoints as SYSTEM. Therefore this artifact requires elevated permissions
  (specifically the EXECVE permission). Typically it is only available with the
  administrator role.

  Note: Output is formatted to 1 row per line of Stdout. Ensure appropriately
  formatted scripts. Pasting scripts direct from word or webpages may lead to
  formatting issues when unicode characters are substituted. Copy script into
  a notepad, save as ASCII then try again.

required_permissions:
  - EXECVE

implied_permissions:
  - FILESYSTEM_WRITE

precondition:
  SELECT OS From info() where OS = 'windows'

parameters:
  - name: Script
    default: Wscript.Echo "Hello world!"

sources:
  - query: |
      LET temp_script &lt;= tempfile(extension='.vbs', data=str(str=Script))

      SELECT Stdout
      FROM execve(argv=['cscript.exe','//NoLogo','/E:vbs',temp_script], sep='\n')

</code></pre>

