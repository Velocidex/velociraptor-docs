# hunt_add



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
client_id||string (required)
hunt_id||string (required)
flow_id|If a flow id is specified we do not create a new flow, but instead add this flow_id to the hunt.|string
relaunch|If specified we relaunch the hunt on this client again.|bool

**Required permissions:** `START_HUNT`

### Description

Assign a client to a hunt.

This function allows a client to be added to a hunt. The client
will be immediately scheduled and the results will be added to the
hunt. Clients are added to a hunt regardless of any hunt
conditions, or even if the hunt is stopped.

You can use this function to manually add clients to selected
hunts for example after being triaged or post processed to
identify the clients of interest.

An alternative method is to create a hunt that only targets
a specific label and then just assign the label to specific
clients.

### Notes

#### Adding an existing flow to a hunt.

If a flow_id is specified, this function will just immediately add
the collection to the hunt, without scheduling a new
collection. The results of this flow will be visible when post
processing the hunt, exporting the hunt etc.

This is useful to redo a collection in a hunt - for example, if
some collections in the hunt expired or were cancelled you can
manually re-run these collections and then when successful re-add
them to the hunt.



