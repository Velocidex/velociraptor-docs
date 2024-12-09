---
title: link_to
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## link_to
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
type|The type of link. Currently one of collection, hunt, artifact, event, debug|string
client_id||string
flow_id||string
upload|Upload object for the file to upload (upload object is returned by the upload() function)|ordereddict.Dict
tab|The tab to focus - can be overview, request, results, logs, notebook|string
text|If specified we emit a markdown style URL with a text|string
hunt_id|The hunt id to read.|string
artifact|The artifact to retrieve|string
raw|When specified we emit a raw URL (without autodetected text)|bool
org|If set the link accesses a different org. Otherwise we accesses the current org.|string

### Description

Create a url linking to a particular part in the Velociraptor GUI.

This function knows about how Velociraptor web app is routed
internally and can help you generate a valid URL that links into
the app. You can then use this URL to share a reference via
e.g. email, slack or other means.

The links generated will be in markdown format by default (i.e. of
the for `[Text](url)`). If you need a raw link without the text,
specify the `raw` parameter as TRUE.

If a link text is not supplied, this function will create a
default text message:

* For client links this text will also include the hostname
* For artifact links, this will include the artifact name
* For hunt, flows etc the text will be the hunt id, flow id etc.

By default the link will refer to the current org but you can
override this with the org id.

If you want to display the links in the notebook within the GUI
table you will need to set the column type to `url_internal` or
`url`.

NOTE: This function makes no effort to check if the link is
actually valid - i.e. it does not check that the client id refers
to a real client, flow id to a real flow, etc.

### Example

```vql
// Setting this in a notebook will tell the GUI to treat this
// column as URL.
LET ColumnTypes <= dict(HuntLink="url_internal")

SELECT link_to(hunt_id="H.1234") AS HuntLink,
       link_to(client_id="C.123", flow_id="F.123") AS FlowLink,
       link_to(client_id="C.123") AS ClientLink,
       link_to(client_id="C.123", artifact="Custom.Artifact.Name",
               text='Event link') AS ArtifactLink,
       link_to(artifact="Custom.Artifact.Name"),
       link_to(upload=Upload) AS Download
FROM scope()
```


