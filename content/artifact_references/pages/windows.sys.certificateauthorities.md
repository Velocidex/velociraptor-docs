---
title: Windows.Sys.CertificateAuthorities
hidden: true
tags: [Client Artifact]
---

Certificate Authorities installed in Keychains/ca-bundles.

<pre><code class="language-yaml">
name: Windows.Sys.CertificateAuthorities
description: Certificate Authorities installed in Keychains/ca-bundles.
sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;
    query: |
        SELECT Store, IsCA, Subject,
               encode(string=SubjectKeyId, type=&#x27;hex&#x27;) AS SubjectKeyId,
               encode(string=AuthorityKeyId, type=&#x27;hex&#x27;) AS AuthorityKeyId,
               Issuer, KeyUsageString,
               IsSelfSigned, SHA1, SignatureAlgorithm, PublicKeyAlgorithm, KeyStrength,
               NotBefore, NotAfter, HexSerialNumber
        FROM certificates()

</code></pre>

