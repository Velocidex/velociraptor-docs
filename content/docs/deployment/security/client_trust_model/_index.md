---
title: "Client Trust Model"
menutitle: "Client Trust Model"
date: 2026-07-17
draft: false
weight: 40
last_reviewed: 2026-07-17
summary: |
  Velociraptor's server generally trusts the data that clients report.
  This page explains what clients can influence, why the model
  is designed this way, and implications for your deployment.
description: |
  Velociraptor's server generally trusts the data that clients report
  to it. This page explains what clients can influence, why the model
  is designed this way, and what it means for your deployment.
---

## Overview

Velociraptor clients authenticate to the server using cryptographic
certificates. This confirms *which* client is talking to the server
— but the server largely trusts whatever data the client sends
without independent verification.

This is a deliberate architectural choice. Velociraptor is designed
on the assumption that the client is a trusted part of the
deployment. If a client is compromised, the endpoint is considered
owned, and there is little the server can do to verify what the
client reports.

However, understanding what a rogue client *can* influence helps
you make informed decisions about threat modeling, monitoring, and
compensating controls.

## What clients control

A compromised or rogue client can influence several aspects of its
relationship with the server:

### Self-labeling

Clients can tell the server to apply labels to themselves. This
happens automatically when a client's configuration file includes
labels under `Client.labels` — the client sends them during
enrollment via the `Server.Internal.ClientInfo` event.

```yaml
Client:
  labels:
    - Sales
```

A rogue client can also send arbitrary labels at any time by
emitting a `VQLResponse` with `Query.Name` set to
`Server.Internal.ClientInfo` containing crafted JSON. The server
applies these labels without checking whether they were authorized.

**Implications:**

- **Hunt evasion.** A compromised client can assign itself labels
  that exclude it from security hunts. For example, if your hunt
  targets clients *without* the `quarantine` label, a rogue client
  can assign itself that label to avoid collection.
- **Identity spoofing.** Clients can also report arbitrary values
  for hostname, FQDN, system type, and architecture, making them
  appear as different machines in search results and dashboards.

Clients can also set labels via their config file on disk. This is
a legitimate feature used to pre-assign labels at deployment time
based on provisioning strategy (e.g. Active Directory OU). See the
[client labels](/docs/clients/labels/) page for more details.

### Event monitoring injection

Clients can send monitoring results for any `CLIENT_EVENT` artifact,
regardless of whether that artifact was actually assigned to them
by the server. The server checks only that the artifact exists and
is of type `CLIENT_EVENT` — it does not verify assignment.

**Implications:**

- **False alert flooding.** A rogue client can inject fabricated
  monitoring telemetry for any event artifact, triggering detection
  rules and overwhelming analysts.
- **SIEM poisoning.** Fabricated events forwarded to Splunk, Elastic,
  or other SIEM systems can corrupt downstream analytics.
- **Detection evasion.** Flooding the event stream with noise can
  mask real malicious activity.

### Alert injection

Clients can send [alert](/docs/artifacts/event_queues/#alerts-queue)
messages with arbitrary content. The server overrides only the
`ClientId` and `FlowId` fields to attribute the alert to the correct
client, but all other fields — `AlertName`, `EventData`, `Timestamp`
— are preserved verbatim from the client.

**Implications:**

- **False incident response.** A rogue client can trigger
  notification integrations (Slack, Teams, Discord, PagerDuty) with
  attacker-controlled content.
- **Timeline corruption.** Fabricated timestamps can mislead
  investigation timelines.
- **Alert fatigue.** Repeated false alerts can desensitize
  responders to genuine incidents.

### Flow state manipulation

Clients report their own collection statistics and flow completion
status via `FlowStats` messages. The server stores these verbatim
without comparing them against actual received data.

**Implications:**

- **Silent collection abort.** A rogue client can mark a flow as
  `FINISHED` immediately after receiving it, before collecting any
  data. The analyst sees a "successful" collection with zero results.
- **Error injection.** A client can report fabricated error messages,
  wasting analyst time on non-existent issues.
- **Statistical manipulation.** Total uploaded files and collected
  rows are reported by the client and stored without verification.

## Why it's designed this way

The decision to trust client-reported data is based on several
factors:

- **Performance.** Verifying every claim — counting uploaded bytes,
  confirming labels are authorized, validating event artifacts — would
  add significant server-side overhead and limit scalability.
- **Architectural simplicity.** Clients manage their own state and
  report it to the server. This keeps the server stateless with
  respect to collection progress.
- **Threat model.** Velociraptor assumes that a compromised client
  means the endpoint is fully controlled by an attacker. In that
  scenario, the attacker can simply refuse to collect anything,
  making server-side verification of client claims irrelevant.
- **Design philosophy.** Velociraptor prefers to collect and store
  data rather than restrict it. Clients are allowed to send
  monitoring results and alerts freely; the server's job is to store
  and attribute them.

## Implications for deployments

Understanding the trust model helps you plan your deployment
appropriately:

- **Client-reported data is not authoritative.** Labels, hostnames,
  collection statistics, and alert details should be treated as
  client-reported signals, not verified facts.
- **Hunt targeting via labels is best-effort.** If a client can
  label itself, it can potentially exclude itself from hunts. Use
  labels as a grouping mechanism, not a security control.
- **Alerts and events need review.** Fabricated alerts or events
  are possible. Correlate client-reported data with other sources
  where possible.
- **Empty collections can be masked.** A compromised client can
  report a successful collection without sending any data. Always
  verify that results were actually received.

## Mitigations

While the trust model is by design, you can take steps to reduce
risk:

- **Monitor for suspicious client behavior.** Watch for clients
  that change labels unexpectedly, send alerts with unusual content,
  or report flow completion without corresponding data.
- **Use server-side label management.** Instead of relying solely
  on client-configured labels, use server-side VQL queries or
  automation to apply labels based on observed behavior.
- **Correlate flow results.** Compare reported collection statistics
  against actual received data to detect discrepancies.
- **Review client-reported metadata.** Treat client-reported
  hostname, FQDN, and architecture as hints, not authoritative
  identifiers. The client ID (derived from the client's
  cryptographic key) is the reliable identifier.
- **Network segmentation.** Limit which endpoints can connect to
  the Velociraptor server. A client that cannot reach the server
  cannot abuse the trust model.
- **Monitor alerts for attribution.** Since `ClientId` is server-set
  and cannot be spoofed, alerts can always be attributed to the
  correct client. Use this to detect patterns of abuse from
  specific endpoints.
