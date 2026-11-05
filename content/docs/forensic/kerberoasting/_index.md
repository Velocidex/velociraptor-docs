---
title: "Investigating Kerberoasting with Velociraptor"
date: 2026-11-05
draft: false
weight: 85
summary: |
  Use Velociraptor's existing Kerberoasting artifacts to investigate
  Event ID 4769, correlate suspicious service-ticket requests, and
  validate findings in an isolated Active Directory lab.
description: |
  A practical investigation workflow for Kerberoasting using
  Velociraptor client artifacts, client event monitoring, and Windows
  Security Event 4769.
tags: [Active Directory, Kerberos, Threat Hunting, Windows Event Logs]
---

Kerberoasting is an Active Directory credential-access technique in
which an authenticated domain user requests service tickets (TGS) for
accounts with Service Principal Names (SPNs). The returned tickets can
be taken offline and tested against candidate passwords. The activity
uses normal Kerberos requests, so a single service-ticket event is not,
by itself, proof of malicious activity.

This page describes how to use Velociraptor's existing Kerberoasting
artifacts to investigate this activity on Domain Controllers, correlate
requests with their source and target accounts, and validate the
workflow in an isolated lab.

The investigation maps to MITRE ATT&CK
[T1558.003 - Kerberoasting](https://attack.mitre.org/techniques/T1558/003/).

## Where the evidence is generated

Windows Security Event ID 4769 records a Kerberos service-ticket (TGS)
request. It is generated on the Domain Controller that processes the
request. The event includes useful context such as the requesting
account (**TargetUserName**), the service account associated with the
requested SPN (**ServiceName**), the source address (**IpAddress**), the
request status (**Status**), and the ticket encryption type
(**TicketEncryptionType**). See Microsoft's
[Event 4769 reference](https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4769)
for the event schema and field descriptions.

On Windows Server 2016 and later, the January 14, 2025 or later
security cumulative update adds an updated Event 4769 schema (Version
2), including fields describing the encryption types and keys
supported by the account, service, and Domain Controller. These fields
provide useful context when assessing whether RC4 use is expected.

Before investigating, confirm that the **Audit Kerberos Service
Ticket Operations** subcategory is configured to record successful
events on the Domain Controllers. Centralized collection and retention
are important because the evidence is generated on the KDC, not on the
workstation that initiated the request.

## Velociraptor artifacts available

Velociraptor already includes two artifacts for this activity. This
guide uses those existing definitions rather than introducing another
artifact that duplicates their filters.

### Historical collection: Windows.EventLogs.Kerberoasting

This is a client artifact that parses the Domain Controller's Security
EVTX log. Its current query selects successful Event 4769 records where
**TicketEncryptionType** is **23** (hexadecimal **0x17**, RC4-HMAC),
excludes **krbtgt** and machine accounts, and returns fields including:

- **EventTime** and **Computer**;
- **TargetUserName** and **TargetDomainName**;
- **ServiceName** and **ServiceSid**;
- **TicketEncryptionType**, **TicketOptions**, and **Status**;
- **IpAddress** and **IpPort**.

Use this artifact for a retrospective investigation or a targeted
hunt across Domain Controllers. In the GUI, create a collection or
hunt, select **Windows.EventLogs.Kerberoasting**, and target the Domain
Controllers rather than the entire workstation fleet. A dedicated
Domain Controller label is a useful way to scope the hunt.

### Continuous monitoring: Windows.Events.Kerberoasting

This is a **CLIENT_EVENT** artifact that uses **watch_evtx()** to follow
the Security event log and emit matching events as they occur. It can
be assigned through **Client Events** to a label group containing the
Domain Controllers that should be monitored.

To configure it, select a Domain Controller, open **Client Events**,
choose **Update client monitoring table**, and assign
**Windows.Events.Kerberoasting** to the relevant label group. Review
the collected rows in the client event timeline and table.

Client event rows are buffered before upload; the documentation notes
that the default batching interval can delay their appearance on the
server by up to approximately two minutes. This is monitoring, not a
synchronous alerting mechanism.

For more detail on these workflows, see the Velociraptor documentation
for [Windows Event Logs](/docs/forensic/event_logs/),
[Client Monitoring](/docs/clients/monitoring/), and
[Hunts](/docs/hunting/).

## Triage the results

Treat an artifact hit as an investigation lead, not as a verdict. Start
with the source address and the requesting account, then establish
whether the requested service tickets fit the normal activity of that
account and environment.

A practical triage sequence is:

1. **Identify the requester.** Review **TargetUserName** and determine
   whether the account is a user, computer, service, or automation
   account. Confirm whether the source address belongs to the expected
   workstation, server, jump host, or management platform.
2. **Identify the requested service.** Review **ServiceName** and map it
   to the account that owns the SPN in Active Directory. A request for
   an unusual service, or for services the requester does not normally
   use, deserves further investigation.
3. **Look for an unusual pattern.** Group events by requester, source
   address, and service account over a short time window. A burst of
   requests for multiple service accounts, particularly from a host
   that does not normally perform this activity, is more meaningful
   than one isolated request.
4. **Check the environment's baseline.** Compare the activity with
   scheduled jobs, application servers, vulnerability scanners,
   identity-management tools, and other approved systems that may
   legitimately request many service tickets.
5. **Assess the target account.** Review its SPNs, privilege level,
   group membership, password age, password-management process, and
   whether it is a gMSA. Prioritize service accounts with excessive
   privileges or long-lived, manually managed passwords.
6. **Preserve surrounding evidence.** Retain the original Security
   events and correlate the time window with endpoint, logon, and
   directory-change telemetry available in the environment.

For a Hunt, the results notebook can be used to group returned rows.
For example, replace the hunt ID with the ID of the collection you are
investigating:

~~~vql
SELECT
    Computer,
    TargetUserName,
    IpAddress,
    ServiceName,
    count() AS TicketRequests
FROM hunt_results(
    hunt_id="H.123",
    artifact="Windows.EventLogs.Kerberoasting")
GROUP BY Computer, TargetUserName, IpAddress, ServiceName
ORDER BY TicketRequests DESC
~~~

This summary helps prioritize repeated requests. It does not establish
malicious intent on its own; interpret the result against known-good
activity and the wider incident timeline.

## Important detection limitations

The built-in **Windows.EventLogs.Kerberoasting** and
**Windows.Events.Kerberoasting** definitions currently filter for
successful Event 4769 records using RC4-HMAC (**TicketEncryptionType**
23 / **0x17**). This is a useful indicator in environments where RC4 is
unexpected, but it is not a complete Kerberoasting detector.

In particular:

- **AES tickets are outside the current artifact filter.** AES128 and
  AES256 ticket encryption types are represented by **0x11** and
  **0x12**. A Kerberoasting attempt can still involve AES tickets,
  although offline password recovery is generally more expensive than
  with RC4. An investigation must not assume that no Kerberoasting
  occurred just because this RC4-focused artifact returned no rows.
- **Event 4769 is generated for legitimate service access too.** A
  single request, or even a high volume from a known application, is
  not enough to declare an incident. Baselines and source context are
  essential.
- **The artifact output is intentionally selective.** Its current
  result columns do not expose every field in the newer Version 2
  Event 4769 schema. When those encryption-capability fields are
  relevant, inspect the original event data or use a query designed
  to collect the additional fields.
- **Ticket requests and offline cracking are different stages.** The
  Domain Controller can record the ticket request, but it does not
  observe password-cracking activity performed later on another host.

MITRE's detection guidance similarly recommends considering anomalous
TGS request volume, RC4 use, and service-account baselines together,
rather than relying on one event in isolation. See the MITRE ATT&CK
[detection strategy for Kerberoasting](https://attack.mitre.org/detectionstrategies/DET0157/).

## Validate the workflow in an isolated lab

A controlled lab helps confirm that the expected Domain Controller
telemetry is collected and that the Velociraptor artifact behaves as
expected. Use a disposable Active Directory environment with a test
service account that has an SPN. Do not weaken encryption settings or
change production service accounts to generate a test event.

From an authorized, domain-joined test host, a targeted Rubeus request
can be used to generate a service-ticket request for the lab account:

~~~powershell
Rubeus.exe kerberoast /user:svc_sql /outfile:lab-hashes.txt
~~~

Check the Domain Controller's Security log for the corresponding Event
4769. Record the event time, requesting account, source address,
service name, status, and ticket encryption type. Then run
**Windows.EventLogs.Kerberoasting** against that Domain Controller and
compare the returned row with the original event.

The artifact will return the event only when it matches its current
RC4 and success filters. If the KDC issues an AES-encrypted ticket, the
request may still be visible as Event 4769 but will not match this
artifact's RC4-only condition. This is an expected limitation, not a
collection failure.

For an additional walkthrough of Rubeus Kerberoasting commands and
their Windows detection context, see the
[Rubeus Kerberos attack and detection guide](https://en.hackita.it/articoli/rubeus/).

## Response and hardening considerations

When the investigation supports suspicious activity, identify the
service account and the system that initiated the requests before
changing access or credentials. Coordinate remediation with the
service owner to avoid disrupting dependent applications.

Recommended defensive actions include:

- Remove unnecessary SPNs and correct SPN registrations.
- Prefer AES Kerberos encryption where supported, and reduce RC4 use
  through a tested domain-wide compatibility plan.
- Use long, unique, managed passwords for service accounts; consider
  group Managed Service Accounts where suitable.
- Remove unnecessary privileges from service accounts and avoid
  granting them membership in highly privileged groups.
- Monitor changes to service-account attributes and SPN registrations.
- Retain and centrally analyze Domain Controller Security logs so
  that requests can be correlated across the domain.

Enabling AES is not a substitute for strong service-account passwords
or least privilege. The goal is to reduce the value of captured tickets
and limit the impact if an account is compromised.

## References

- [Microsoft: Event 4769 - A Kerberos service ticket was requested](https://learn.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4769)
- [MITRE ATT&CK: Kerberoasting (T1558.003)](https://attack.mitre.org/techniques/T1558/003/)
- [MITRE ATT&CK: Detect Kerberoasting Attempts (DET0157)](https://attack.mitre.org/detectionstrategies/DET0157/)
- [Velociraptor: Windows Event Logs](https://docs.velociraptor.app/docs/forensic/event_logs/)
- [Velociraptor: Client Monitoring](https://docs.velociraptor.app/docs/clients/monitoring/)
- [Velociraptor: Hunting](https://docs.velociraptor.app/docs/hunting/)
- [Velociraptor artifact: Windows.EventLogs.Kerberoasting](https://github.com/Velocidex/velociraptor/blob/master/artifacts/definitions/Windows/EventLogs/Kerberoasting.yaml)
- [Velociraptor artifact: Windows.Events.Kerberoasting](https://github.com/Velocidex/velociraptor/blob/master/artifacts/definitions/Windows/Events/Kerberoasting.yaml)
