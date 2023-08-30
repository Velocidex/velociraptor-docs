---
title: Windows.Triage.SDS
hidden: true
tags: [Client Artifact]
---

Collects the $Secure:$SDS stream from the NTFS volume. The $Secure
stream is both a directory (it has I30 stream) and a file (it has a
$DATA stream) and therefore confuses the Windows.KapeFiles.Target
artifact which relies on globbing. Use this artifact to collect the
$SDS stream.


<pre><code class="language-yaml">
name: Windows.Triage.SDS
description: |
  Collects the $Secure:$SDS stream from the NTFS volume. The $Secure
  stream is both a directory (it has I30 stream) and a file (it has a
  $DATA stream) and therefore confuses the Windows.KapeFiles.Target
  artifact which relies on globbing. Use this artifact to collect the
  $SDS stream.

parameters:
  - name: Drive
    description: The Drive letter to analyze
    default: &quot;C:&quot;

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query: |
      LET Device &lt;= pathspec(parse=Drive)

      SELECT *, upload(accessor=&quot;mft&quot;,
                       file=Device + Inode,
                       name=pathspec(Path=Name)) AS Upload
      FROM foreach(row=parse_ntfs(device=Device, mft=9).Attributes, column=&quot;_value&quot;)
      WHERE Name =~ &quot;\\$S&quot; AND TypeId IN (128, 160)

</code></pre>

