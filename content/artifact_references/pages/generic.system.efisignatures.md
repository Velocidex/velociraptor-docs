---
title: Generic.System.EfiSignatures
hidden: true
tags: [Client Artifact]
---

Collect Efi Signature information from the client.


```yaml
name: Generic.System.EfiSignatures
description: |
  Collect Efi Signature information from the client.

type: CLIENT
export: |
    -- GUIDs are taken from
    -- https://github.com/chipsec/chipsec/blob/main/chipsec/hal/uefi_common.py
    LET PROFILE = '''[
      ["EfiSignatures", 0, [
        ["__tmp", 0, "uint32"],
        ["__Signatures", 0, "Union", {
          "selector": "x=>x.__tmp < 257",
          "choices": {
            "true": "EfiSignaturesListAttrib",
            "false": "EfiSignaturesList"
          }
        }],
        ["Signatures", 0, "Value", {"value": "x=>x.__Signatures.Signatures"}]
      ]],
      ["EfiSignaturesListAttrib", 0, [
        ["__Attributes", 0, "uint32"],
        ["Signatures", 4, "Array", {"type": "Signature", "count": 1000}]
      ]],
      ["EfiSignaturesList", 0, [
        ["Signatures", 0, "Array", {"type": "Signature", "count": 1000}]
      ]],
      ["Signature", "x=>x.__ListSize", [
        ["__Type", 0, "GUID"],
        ["Type", 0, "Value", {"value": "x=>x.__Type.Value"}],
        ["__ListSize", 16, "uint32"],
        ["__HeaderSize", 20, "uint32"],
        ["Payload", 24, "Union", {
          "selector": "x=>x.Type",
          "choices": {
            "{a5c059a1-94e4-4aa7-87b5-ab155c2bf072}": "Cert",
            "{c1c41626-504c-4092-aca9-41f936934328}": "HashList"
          }
        }]
      ]],
      ["Cert", "x=>x.__SignatureSize + 4", [
        ["__SignatureSize", 0, "uint32"],
        ["__Owner", 4, "GUID"],
        ["Owner", 0, "Value", {"value": "x=>x.__Owner.Value"}],
        ["__Data", 20, "String", {"length": "x=>x.__SignatureSize - 16", "term": "", "max_length": 10000}],
        ["Cert", 0, "Value", {"value": "x=>parse_x509(data=x.__Data)[0]"}]
      ]],
      ["HashList", 0, [
        ["__SignatureSize", 0, "uint32"],
        ["Hashes", 4, "Array", {"type": "Hash", "count": 1000, "sentinel": "x=>x.Owner = '{00000000-0000-0000-0000-000000000000}'"}]
      ]],
      ["Hash", 48, [
        ["__Owner", 0, "GUID"],
        ["Owner", 0, "Value", {"value": "x=>x.__Owner.Value"}],
        ["__Data", 16, "String", {"length": 32, "term": ""}],
        ["Hash", 0, "Value", {"value": "x=>format(format='%048x', args=[x.__Data])"}]
      ]],
      ["GUID", 16, [
        ["__D1", 0, "uint32"],
        ["__D2", 4, "uint16"],
        ["__D3", 6, "uint16"],
        ["__D4", 8, "String", {"term": "", "length": 2}],
        ["__D5", 10, "String", {"term": "", "length": 6}],
        ["Value", 0, "Value", {
          "value": "x=>format(format='{%08x-%04x-%04x-%02x-%02x}', args=[x.__D1, x.__D2, x.__D3, x.__D4, x.__D5])"
        }]
      ]]
    ]'''

    LET GetSignatures(Namespace, Name) = Select Name as Name,
       parse_binary(accessor="data", filename=Value,
                    profile=PROFILE, struct="EfiSignatures").Signatures as Signatures
    FROM efivariables(namespace=Namespace, name=Name, value=True)

sources:
  - name: Certificates
    query: |
      LET PK = Select * FROM foreach(
          row=GetSignatures(Namespace="{8be4df61-93ca-11d2-aa0d-00e098032b8c}", Name="PK"),
          query={
              Select * From foreach(
                  row=Signatures,
                  query={
                      Select Name, Owner, Cert as Certificate From Payload
                  })
          })
      LET DB = Select * FROM foreach(
          row=GetSignatures(Namespace="{d719b2cb-3d3a-4596-a3bc-dad00e67656f}", Name="db"),
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
          row=GetSignatures(Namespace="{d719b2cb-3d3a-4596-a3bc-dad00e67656f}", Name="dbx"),
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

```
