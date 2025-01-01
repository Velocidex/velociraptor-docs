---
title: parse_x509
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_x509
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
data|X509 DER encoded string.|string (required)

### Description

Parse a DER encoded x509 string into an object.

If you have a base64 encoded certificate you will first need to strip the
header and footer and decode it, as shown in the example below.

### Example

```vql
SELECT parse_x509(
         data=base64decode(
           string=regex_transform(
             source=ca_certificate,
             map=dict(
               `-+BEGIN CERTIFICATE-+`="",
               `\n`="",
               `-+END CERTIFICATE-+`=""),
             key="A")))[0] AS ca_cert
FROM config
```


