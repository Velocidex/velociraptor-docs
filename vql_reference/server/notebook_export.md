# notebook_export



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
notebook_id|The id of the notebook to export|string (required)
filename|The name of the export. If not set this will be named according to the notebook id and timestamp|string
type|Set the type of the export (html or zip).|string

**Required permissions:** `PREPARE_RESULTS`

### Description

Exports a notebook to a zip file or HTML.


