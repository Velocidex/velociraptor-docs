---
title: Windows.System.RootCAStore
hidden: true
tags: [Client Artifact]
---

Enumerate the root certificates in the Windows Root store.


<pre><code class="language-yaml">
name: Windows.System.RootCAStore
description: |
   Enumerate the root certificates in the Windows Root store.

reference:
   - &quot;ATT&amp;CK: T1553&quot;
   - https://attack.mitre.org/techniques/T1553/004/

parameters:
   - name: CertificateRootStoreGlobs
     type: csv
     default: |
       Accessor,Glob
       reg,HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\SystemCertificates\ROOT\Certificates\**\Blob
       reg,HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\SystemCertificates\ROOT\Certificates\**\Blob
       reg,HKEY_USERS\*\Software\Microsoft\SystemCertificates\Root\Certificates\**\Blob
       reg,HKEY_USERS\*\Software\Policies\Microsoft\SystemCertificates\Root\Certificates\**\Blob

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query: |
        LET profile = &#x27;&#x27;&#x27;[
        [&quot;Record&quot;, &quot;x=&gt;x.Length + 12&quot;, [
          [&quot;Type&quot;, 0, &quot;uint32&quot;],
          [&quot;Length&quot;, 8, &quot;uint32&quot;],
          [&quot;Data&quot;, 12, &quot;String&quot;, {
              length: &quot;x=&gt;x.Length&quot;,
              term: &quot;&quot;,
          }],
          [&quot;UnicodeString&quot;, 12, &quot;String&quot;, {
              encoding: &quot;utf16&quot;,
          }]
        ]],
        [&quot;Records&quot;, 0, [
          [&quot;Items&quot;, 0, &quot;Array&quot;, {
              type: &quot;Record&quot;,
              count: 20,
          }]
        ]]
        ]&#x27;&#x27;&#x27;

        // Parse the types from the certificate record itself, as well as the X509 cert structure.
        LET GetCert(CertData) = SELECT parse_x509(data=Data)[0] AS Cert
          FROM foreach(row=parse_binary(filename=CertData,
                       accessor=&quot;data&quot;, profile=profile, struct=&quot;Records&quot;).Items)
          WHERE Type = 32

        // Format the fingerprint as a hex string
        LET GetFinger(CertData) = SELECT format(format=&quot;%x&quot;, args=Data) AS FingerPrint
          FROM foreach(row=parse_binary(filename=CertData,
                       accessor=&quot;data&quot;, profile=profile, struct=&quot;Records&quot;).Items)
          WHERE Type = 3

        LET GetName(CertData) = SELECT UnicodeString AS Name
          FROM foreach(row=parse_binary(filename=CertData,
                       accessor=&quot;data&quot;, profile=profile, struct=&quot;Records&quot;).Items)
          WHERE Type = 11

        // Glob for certificates in all the locations we know about.
        SELECT * FROM foreach(row=CertificateRootStoreGlobs,
        query={
          SELECT OSPath AS _RegistryValue, ModTime,
               GetName(CertData=Data.value)[0].Name AS Name,
               GetFinger(CertData=Data.value)[0].FingerPrint AS FingerPrint,
               GetCert(CertData=Data.value)[0].Cert AS Certificate
          FROM glob(globs=Glob, accessor=Accessor)
        })

</code></pre>

