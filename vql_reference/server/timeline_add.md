# timeline_add



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
timeline|Supertimeline to add to. If a super timeline does not exist, creates a new one.|string (required)
name|Name/Id of child timeline to add.|string (required)
query|Run this query to generate the timeline.|StoredQuery (required)
key|The column representing the time to key off.|string (required)
message_column|The column representing the message.|string
ts_desc_column|The column representing the timestamp description.|string
notebook_id|The notebook ID the timeline is stored in.|string

**Required permissions:** `READ_RESULTS`

### Description

Add a new query to a timeline.


