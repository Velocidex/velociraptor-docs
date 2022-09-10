# How to control hunting by label groups?

In Velociraptor, `Hunts` are sets of the same collections across
clients. For example, a hunt for `Scheduled Tasks` will automatically
collect the scueduled tasks from each client.

When creating the hunt it is possible to target the hunt to a
`Label`. This only schedules the hunt on clients that have that same
label. This is useful when collecting a lot of data which does not
make sense to collect from every machine in the fleet. For example in
the following screenshot I am limiting the heavy triaging collection
to machines with the label `Triage`.

![Limiting a hunt to a label](limiting_hunts.png)

## Assigning clients to the hunt.

Normally when we limit a hunt for a label we immediately schedule the
hunt on all machines with that label.

However it also works the other way around - When a label is added on
a client, if the hunt targets this label, the client will be
automatically added to the hunt!

This means it is possible to create heavy hunts targeting specific
labels, and then as the investigation progresses, simply assign the
label to the client to automatically cause the hunt to collect on that
client.

![Apply a label to a client to trigger hunt participation](apply_label.png)

Tags: #hunting #vql #labels
