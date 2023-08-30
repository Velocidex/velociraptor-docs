---
title: Generic.System.EfiSignatures
hidden: true
tags: [Client Artifact]
---

Collect Efi Signature information from the client.


<pre><code class="language-yaml">
name: Generic.System.EfiSignatures
description: |
  Collect Efi Signature information from the client.

type: CLIENT
export: |
    -- GUIDs are taken from
    -- https://github.com/chipsec/chipsec/blob/main/chipsec/hal/uefi_common.py
    LET PROFILE = &#x27;&#x27;&#x27;[
      [&quot;EfiSignatures&quot;, 0, [
        [&quot;__tmp&quot;, 0, &quot;uint32&quot;],
        [&quot;__Signatures&quot;, 0, &quot;Union&quot;, {
          &quot;selector&quot;: &quot;x=&gt;x.__tmp &lt; 257&quot;,
          &quot;choices&quot;: {
            &quot;true&quot;: &quot;EfiSignaturesListAttrib&quot;,
            &quot;false&quot;: &quot;EfiSignaturesList&quot;
          }
        }],
        [&quot;Signatures&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.__Signatures.Signatures&quot;}]
      ]],
      [&quot;EfiSignaturesListAttrib&quot;, 0, [
        [&quot;__Attributes&quot;, 0, &quot;uint32&quot;],
        [&quot;Signatures&quot;, 4, &quot;Array&quot;, {&quot;type&quot;: &quot;Signature&quot;, &quot;count&quot;: 1000}]
      ]],
      [&quot;EfiSignaturesList&quot;, 0, [
        [&quot;Signatures&quot;, 0, &quot;Array&quot;, {&quot;type&quot;: &quot;Signature&quot;, &quot;count&quot;: 1000}]
      ]],
      [&quot;Signature&quot;, &quot;x=&gt;x.__ListSize&quot;, [
        [&quot;__Type&quot;, 0, &quot;GUID&quot;],
        [&quot;Type&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.__Type.Value&quot;}],
        [&quot;__ListSize&quot;, 16, &quot;uint32&quot;],
        [&quot;__HeaderSize&quot;, 20, &quot;uint32&quot;],
        [&quot;Payload&quot;, 24, &quot;Union&quot;, {
          &quot;selector&quot;: &quot;x=&gt;x.Type&quot;,
          &quot;choices&quot;: {
            &quot;{a5c059a1-94e4-4aa7-87b5-ab155c2bf072}&quot;: &quot;Cert&quot;,
            &quot;{c1c41626-504c-4092-aca9-41f936934328}&quot;: &quot;HashList&quot;
          }
        }]
      ]],
      [&quot;Cert&quot;, &quot;x=&gt;x.__SignatureSize + 4&quot;, [
        [&quot;__SignatureSize&quot;, 0, &quot;uint32&quot;],
        [&quot;__Owner&quot;, 4, &quot;GUID&quot;],
        [&quot;Owner&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.__Owner.Value&quot;}],
        [&quot;__Data&quot;, 20, &quot;String&quot;, {&quot;length&quot;: &quot;x=&gt;x.__SignatureSize - 16&quot;, &quot;term&quot;: &quot;&quot;, &quot;max_length&quot;: 10000}],
        [&quot;Cert&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;parse_x509(data=x.__Data)[0]&quot;}]
      ]],
      [&quot;HashList&quot;, 0, [
        [&quot;__SignatureSize&quot;, 0, &quot;uint32&quot;],
        [&quot;Hashes&quot;, 4, &quot;Array&quot;, {&quot;type&quot;: &quot;Hash&quot;, &quot;count&quot;: 1000, &quot;sentinel&quot;: &quot;x=&gt;x.Owner = &#x27;{00000000-0000-0000-0000-000000000000}&#x27;&quot;}]
      ]],
      [&quot;Hash&quot;, 48, [
        [&quot;__Owner&quot;, 0, &quot;GUID&quot;],
        [&quot;Owner&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.__Owner.Value&quot;}],
        [&quot;__Data&quot;, 16, &quot;String&quot;, {&quot;length&quot;: 32, &quot;term&quot;: &quot;&quot;}],
        [&quot;Hash&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;format(format=&#x27;%048x&#x27;, args=[x.__Data])&quot;}]
      ]],
      [&quot;GUID&quot;, 16, [
        [&quot;__D1&quot;, 0, &quot;uint32&quot;],
        [&quot;__D2&quot;, 4, &quot;uint16&quot;],
        [&quot;__D3&quot;, 6, &quot;uint16&quot;],
        [&quot;__D4&quot;, 8, &quot;String&quot;, {&quot;term&quot;: &quot;&quot;, &quot;length&quot;: 2}],
        [&quot;__D5&quot;, 10, &quot;String&quot;, {&quot;term&quot;: &quot;&quot;, &quot;length&quot;: 6}],
        [&quot;Value&quot;, 0, &quot;Value&quot;, {
          &quot;value&quot;: &quot;x=&gt;format(format=&#x27;{%08x-%04x-%04x-%02x-%02x}&#x27;, args=[x.__D1, x.__D2, x.__D3, x.__D4, x.__D5])&quot;
        }]
      ]]
    ]&#x27;&#x27;&#x27;

    LET GetSignatures(Namespace, Name) = Select Name as Name,
       parse_binary(accessor=&quot;data&quot;, filename=Value,
                    profile=PROFILE, struct=&quot;EfiSignatures&quot;).Signatures as Signatures
    FROM efivariables(namespace=Namespace, name=Name, value=True)

sources:
  - name: Certificates
    query: |
      LET PK = Select * FROM foreach(
          row=GetSignatures(Namespace=&quot;{8be4df61-93ca-11d2-aa0d-00e098032b8c}&quot;, Name=&quot;PK&quot;),
          query={
              Select * From foreach(
                  row=Signatures,
                  query={
                      Select Name, Owner, Cert as Certificate From Payload
                  })
          })
      LET DB = Select * FROM foreach(
          row=GetSignatures(Namespace=&quot;{d719b2cb-3d3a-4596-a3bc-dad00e67656f}&quot;, Name=&quot;db&quot;),
          query={
              Select * From foreach(
                  row=Signatures,
                  query={
                      Select Name, Owner, Cert as Certificate From Payload
                  })
          })

       Select * from chain(
          a={ Select * From PK },
          b={ Select * From DB })

  - name: Hashes
    query: |
      Select * FROM foreach(
          row=GetSignatures(Namespace=&quot;{d719b2cb-3d3a-4596-a3bc-dad00e67656f}&quot;, Name=&quot;dbx&quot;),
          query={
              Select * From foreach(
                  row=Signatures,
                  query={
                      Select * FROM foreach(
                          row=Payload.Hashes,
                          query={
                              Select Name, Owner, Hash From scope()
                          })
                  })
          })

</code></pre>

