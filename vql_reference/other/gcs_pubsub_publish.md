# gcs_pubsub_publish



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
topic|The topic to publish to|string (required)
project_id|The project id to publish to|string (required)
msg|Message to publish to Pubsub|Any (required)
credentials|The credentials to use|string (required)
attributes|The publish attributes|ordereddict.Dict (required)
### Description

Publish a message to Google PubSub.


