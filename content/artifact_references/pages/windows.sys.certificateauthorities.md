---
title: Windows.Sys.CertificateAuthorities
hidden: true
sitemap:
  disable: true
tags: [Client Artifact]
description: |
  Enumerates certificate authorities from Windows certificate stores.
---

Enumerates certificate authorities from Windows certificate stores.


<pre><code class="language-yaml">
name: Windows.Sys.CertificateAuthorities
description: |
  Enumerates certificate authorities from Windows certificate stores.

sources:
  - precondition:
      SELECT OS From info() where OS = 'windows'
    query: |
        SELECT Store, IsCA, Subject,
               encode(string=SubjectKeyId, type='hex') AS SubjectKeyId,
               encode(string=AuthorityKeyId, type='hex') AS AuthorityKeyId,
               Issuer, KeyUsageString,
               IsSelfSigned, SHA1, SignatureAlgorithm, PublicKeyAlgorithm, KeyStrength,
               NotBefore, NotAfter, HexSerialNumber
        FROM certificates()

</code></pre>

