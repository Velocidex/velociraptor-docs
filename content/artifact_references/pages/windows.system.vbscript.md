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

precondition:
  SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
  - name: Script
    default: Wscript.Echo &quot;Hello world!&quot;
       
sources:
  - query: |
      LET temp_script &lt;= tempfile(extension=&#x27;.vbs&#x27;, data=str(str=Script))
 
      SELECT Stdout 
      FROM execve(argv=[&#x27;cscript.exe&#x27;,&#x27;//NoLogo&#x27;,&#x27;/E:vbs&#x27;,temp_script], sep=&#x27;\n&#x27;)
</code></pre>

