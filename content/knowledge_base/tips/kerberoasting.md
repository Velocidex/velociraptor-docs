# How do I investigate Kerberoasting with Velociraptor?

Use Velociraptor's existing Kerberoasting artifacts to investigate Kerberos service-ticket requests (Event ID 4769) on Domain Controllers. The workflow below covers historical collection, continuous monitoring, triage, and validation in an isolated lab.

## Collect the relevant Kerberos events

Windows Security Event ID 4769 is generated on the Domain Controller (the KDC) that processes a Kerberos service-ticket (TGS) request. Useful fields include `TargetUserName` (requesting account), `ServiceName` (requested service account/SPN), `IpAddress` (request source), `Status`, and `TicketEncryptionType`.

Before hunting, make sure the **Audit Kerberos Service Ticket Operations** subcategory is configured to record successful events on your Domain Controllers. The evidence is generated on the KDC, not on the workstation that requested the ticket, so centralized collection and retention matter.

## Choose the right Velociraptor artifact

Velociraptor includes two artifacts for this workflow:

- **`Windows.EventLogs.Kerberoasting`** performs historical collection from the Domain Controller's Security EVTX log. Its current query selects successful Event 4769 records using RC4-HMAC (`TicketEncryptionType` 23 / `0x17`) and excludes `krbtgt` and machine accounts. Use it in a collection or Hunt scoped to your Domain Controllers.
- **`Windows.Events.Kerberoasting`** is a `CLIENT_EVENT` artifact that uses `watch_evtx()` to monitor the Security event log as events arrive. Assign it through **Client Events** to a label group containing the Domain Controllers you want to monitor. Client event uploads are buffered, so results may take up to approximately two minutes to appear; this is not synchronous alerting.

For background, see the Velociraptor documentation for [Windows Event Logs](/docs/forensic/event_logs/), [Client Monitoring](/docs/clients/monitoring/), and [Hunts](/docs/hunting/).

## Triage suspicious requests

Treat an artifact hit as an investigation lead, not a verdict. Correlate the requester, source, and requested service:

1. Identify the requesting account (`TargetUserName`) and check whether the source IP (`IpAddress`) belongs to its expected workstation, server, jump host, or management platform.
2. Map `ServiceName` to the account that owns the SPN in Active Directory. Investigate requests for unusual services or services the requester does not normally access.
3. Group requests by requester, source IP, and service account. A burst involving several service accounts from an unusual host is more significant than one isolated request.
4. Compare the activity with normal application traffic, scheduled jobs, scanners, and identity-management tools.
5. Review the target service account's SPNs, privileges, group membership, password age, and password-management process. Preserve the surrounding Security events and correlate them with logon and directory-change telemetry.

For a Hunt, the results notebook can summarize repeated requests. Replace `H.123` with the Hunt ID you are investigating:

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

This query helps prioritize activity; it does not establish malicious intent by itself.

## Understand the detection limitations

The two built-in Kerberoasting artifacts currently focus on successful Event 4769 records encrypted with RC4-HMAC (`0x17`). **AES tickets are not matched by this RC4-focused filter**: AES128 and AES256 use `0x11` and `0x12`. A Kerberoasting attempt can still involve AES tickets, so an empty result does not rule out the activity. Inspect the original Security event or use a query that collects the additional fields when AES activity needs investigation.

Event 4769 is also generated during legitimate service access. Baseline the account, source, and request pattern before escalating. The Domain Controller records the ticket request, not any later offline password-cracking activity. Newer Windows Server versions may expose additional encryption-capability fields in Event 4769 Version 2; inspect the original event when those fields are needed.

## Validate the workflow in an isolated lab

Use a disposable Active Directory environment with a test service account that has an SPN. From an authorized, domain-joined lab host, generate a service-ticket request with Rubeus:

~~~powershell
Rubeus.exe kerberoast /user:svc_sql /outfile:lab-hashes.txt
~~~

Check the Domain Controller's Security log for the corresponding Event 4769, then run `Windows.EventLogs.Kerberoasting` against that Domain Controller and compare the returned row with the original event. The artifact returns the event only when it matches its current successful-RC4 filter; an AES-encrypted ticket will be visible in the Security log but will not match that filter.

For a practical walkthrough of Rubeus Kerberoasting commands and their Windows detection context, see the [HackITA Rubeus Kerberos attack and detection guide](https://en.hackita.it/articoli/rubeus/).

## Defensive follow-up

Review and remove unnecessary SPNs, reduce excessive service-account privileges, and use long, unique, managed passwords (including group Managed Service Accounts where appropriate). Prefer AES where supported, but validate application compatibility before changing domain-wide encryption settings. Retain and centrally analyze Domain Controller Security logs so requests can be correlated across the domain.

Tags: #active-directory #kerberos #threat-hunting #windows-event-logs #vql