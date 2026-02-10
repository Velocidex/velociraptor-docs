---
title: Windows.Registry.PuttyHostKeys
hidden: true
tags: [Client Artifact]
---

This artifact extracts PuTTY SSH host keys.

As a security measure PuTTY and its companion utilities PSCP, PSFTP, and Plink
records the host key for each server connected to, in the Windows Registry.

- Output KeyName: `ssh-ed12345@22:27.27.27.27`
- To search for a specific IP: `TargetKeyName =~ ':\<IP\>$'`
- To search for a specific PORT: `TargetKeyName =~ '@\<PORT\>:.+$'`


<pre><code class="language-yaml">
name: Windows.Registry.PuttyHostKeys
author: Matt Green - @mgreen27
description: |
   This artifact extracts PuTTY SSH host keys.

   As a security measure PuTTY and its companion utilities PSCP, PSFTP, and Plink
   records the host key for each server connected to, in the Windows Registry.

   - Output KeyName: `ssh-ed12345@22:27.27.27.27`
   - To search for a specific IP: `TargetKeyName =~ ':\&lt;IP\&gt;$'`
   - To search for a specific PORT: `TargetKeyName =~ '@\&lt;PORT\&gt;:.+$'`


type: CLIENT

parameters:
   - name: KeyGlob
     default: Software\SimonTatham\Putty\SshHostKeys\**
   - name: TargetUser
     default: .
   - name: TargetKeyName
     default: .
   - name: TargetKeyValue
     default: .

sources:
  - precondition:
      SELECT OS From info() where OS = 'windows'

    query: |
      LET HKEY_USERS &lt;= pathspec(path_type="registry", Path="HKEY_USERS")

      SELECT
        Mtime,
        Username,
        OSPath.Basename AS KeyName,
        Data.value AS KeyValue,
        HKEY_USERS + UUID + OSPath.Dirname AS Key,
        OSPath.DelegatePath AS SourcePath
      FROM Artifact.Windows.Registry.NTUser(KeyGlob=KeyGlob,userRegex=TargetUser)
      WHERE KeyName =~ TargetKeyName
        AND KeyValue =~ TargetKeyValue


</code></pre>

