---
title: MacOS.System.TCC
hidden: true
tags: [Client Artifact]
---

This artifact provides details around the TCC (Transparency,
Consent, and Control) database, and can help reveal when access to
system services has been added or modified for an application.

Note that this artifact has only been tested on macOS Big Sur, and
that the `allowed`, and `prompt_count` columns will need to be used
in place of the `auth_value`, `auth_reason`, and `auth_version`
columns for Catalina and prior.


<pre><code class="language-yaml">
name: MacOS.System.TCC
description: |
   This artifact provides details around the TCC (Transparency,
   Consent, and Control) database, and can help reveal when access to
   system services has been added or modified for an application.

   Note that this artifact has only been tested on macOS Big Sur, and
   that the `allowed`, and `prompt_count` columns will need to be used
   in place of the `auth_value`, `auth_reason`, and `auth_version`
   columns for Catalina and prior.

type: CLIENT

author: Wes Lambert - @therealwlambert

parameters:
- name: TCCGlob
  default: /Library/Application Support/com.apple.TCC/TCC.db,/Users/*/Library/Application Support/com.apple.TCC/TCC.db

precondition:
      SELECT OS From info() where OS = &#x27;darwin&#x27;

sources:
  - query: |
      LET TCCList = SELECT OSPath
       FROM glob(globs=split(string=TCCGlob, sep=&quot;,&quot;))

      LET TCCAccess = SELECT *
       FROM sqlite(file=OSPath, query=&quot;SELECT * from access&quot;)

      LET TCCAccessDetails =
          SELECT * FROM foreach(
              row=TCCAccess,
              query={ SELECT
                    timestamp(epoch=last_modified) AS LastModified,
                    service AS Service,
                    client AS Client,
                    if(condition= client_type= 0, then=&quot;Console&quot;, else=if(condition= client_type= 1, then=&quot;Service/Script&quot;, else=&quot;Other&quot;)) AS ClientType,
                    if(condition= auth_value= 2, then=&quot;Yes&quot;, else=&quot;No&quot;) AS Allowed,
                    if(condition= OSPath =~ &quot;Users&quot;, then=path_split(path=OSPath)[-5], else=&quot;System&quot;) AS User,
                    auth_reason AS _AuthReason,
                    auth_version AS _AuthVersion,
                    csreq AS _CSReq,
                    policy_id as _PolicyId,
                    indirect_object_identifier_type as _IndirectObjectIdentifierType,
                    indirect_object_identifier as IndirectObjectIdentifier,
                    indirect_object_code_identity as _IndirectObjectCodeIdentity,
                    flags as _Flags,
                    OSPath AS _OSPath
                 FROM scope()
              }
          )
      SELECT * FROM foreach(row=TCCList, query=TCCAccessDetails)

</code></pre>

