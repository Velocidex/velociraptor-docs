---
title: Collection and Hunt Issues
menutitle: Collections & Hunts
date: 2026-05-18
last_reviewed: 20256-05-18
draft: false
weight: 40
summary: |
  * Troubleshooting Collections and Hunts.
description: |
  ## Collection status
---

<!-- ## Collection status -->

## Collection Requests

When a collection request is assigned to a client, the _compiled_
request is recorded in the **Request** tab of the collection screen in
JSON format.

If the collection isn't doing what you think it should be doing then
you might want to review the actual request (as sent to the client) in
this tab.

## Collection Log

Each collection has an associated log that can be viewed on the
**Log** tab in the GUI. Since hunts are just a logical container for
many collections they don't have their own log.

The collection log should show any issues encountered by the client
during the collection.

## Common issues

#### Error: grpc: received message larger than max (xxxxxxx vs. 4194304)

The gRPC error is caused by the GUI/API not being able to retrieve a
row containing such a large amount of data. This is an intentional
safeguard, as sending massive JSON blobs can potentially hang or crash
your browser, or cause problems with downstream data processing. The
default limit applies to the API, which is used by the GUI, so you
could also encounter this error when interacting directly with the
API. Lastly, but least likely, if you are using a master/minion setup
then messages are also delivered by gRPC between them and therefore
you may also hit the limit there.

If the artifact you've collected did something such as reading the
contents of a file without parsing it, this can result in a row that
is extraordinarily large. Even with parsed data you may hit this
limit, for example when parsinge an entire 15MB plist or log file into
a single JSON row.

Such abnormally large row/values will likely also cause problems in
downstream systems such as Elastic or Splunk.

The size limit can be increased using the `API.max_grpc_recv_size`
config setting, but the default limit should be
sufficient for normal situations and you should avoid changing it
unless the issue can't be avoided by sanitizing your data.

The best way to resolve this is to rework your VQL to be more
efficient rather than simply raising the limit. Ensure that your
collected artifacts parse and filter the file's content, if possible.
If you want the entire file content in raw form then it should
preferably be handled as a file upload (using the `upload()`
function).

Alternatively, if you really do want to read in the entire raw file
content into a field, and you have an expectation that the files will
be workably small, then add a size limit filter to your VQL to act as
a guardrail.





