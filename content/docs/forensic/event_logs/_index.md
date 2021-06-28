---
title: "Event Logs"
date: 2021-06-27T04:34:03Z
draft: false
weight: 80
---

Windows Event Logs

Windows event logs
Stored in files with extension of *.evtx typically in C:\Windows\System32\WinEVT\Logs\*.evtx

File format features:
Rollover - File is divided into chunks and new chunks can overwrite older chunks
Binary XML format provides compression
Structured records with strong types
30

Parsing EVTX
31
The event message is actually written in XML but Velociraptor convert it into a JSON object to make it easier to filter specific fields.


Event significant fields
Provider, Channel, Computer - this represents the source of the message
Event ID - An index into the message table identifying the type of this event
EventRecordID - The ID of this message within the evtx file.
UserData - An application specific blob of structured data
32

Event Messages
Windows Event Logs architecture does NOT store the event message in the evtx file!
This allows for event message internationalization
Saves some small amount of space in the evtx files themselves
But mostly makes it difficult to analyze offline
Grabbing all the EVTX files off the system may result in loss of event messages!
33

34

35
The event description message contains vital context about what the event actually means.
Without the message we would need to search for the event id.


36
Event message search
If you copied the event log files off the system and do not have access to the messages, you will need to figure out what does the event id mean.

Some common event ids are documented publicly.

Deriving event messages
Using the provider, channel and computer name lookup the registry key
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\EventLog\<channel>\<provider>
Read the value EventMessageFile.
This will point at a DLL path, open the resource section of this dll for a Message Table resource. This will produce a formatted string. Interpolate the UserData section into the string.
37

Deriving event messages
Open the DLL, and locate the resource section in the PE file of this dll, searching for a Message Table resource.

A MESSAGE_TABLE resource is a list of strings - the Event ID is an index into this table.

This will produce a string with expansion directives like %1, %2 etc. Interpolate the UserData section into the string.
38

39

40
Resolving Messages
Velociraptor can automatically follow this process when parsing event logs using the parse_evtx() plugin.
Notice the UserData is expanded into the messages.

What could go wrong?
If you just collect the EVTX files from one system to another you will lose access to message tables, because the messages are in DLL files scattered across the entire system.

If an application is uninstalled, its message DLLs will be removed and earlier events are not able to be displayed any more.
41

Event Message databases
The https://github.com/Velocidex/evtx-data repository contains sqlite databases of many known message tables collected from different systems.

The dumpevtx tool can resolve messages from these databases and the sqlite databases.
42

Event logs DFIR
43

Exercise - resolve messages
Clone the evtx-data repository to your Linux machine. Download the dumpevtx tool from the releases page.

View the event log samples on your Linux machine using the dumpevtx tool. Note that no messages are present.

Download the relevant sqlite message databases and resolve messages from your evtx files.
44

45
The dumpevtx tool emits JSON data. You can use the jq tool to reformat the JSON data to remove un-needed fields.


46
SELECT timestamp(epoch=System.TimeCreated.SystemTime) AS Timestamp,
               Message,
               get(field='EventData') AS EventData
FROM parse_evtx(filename=EVTX, messagedb=MSG)

References
https://www.appliedincidentresponse.com/windows-event-log-analyst-reference/

https://docs.microsoft.com/en-us/windows/security/threat-protection/auditing/audit-logon


47

Disabling event logs
Event logs can be easily disabled.


48

What is the setting?
49

Exercise: Detect disabled logs
Write an artifact that reports the state of each log channel (enabled/disabled)

Use the Microsoft-Windows-Bits-Client/Operational channel as an example
50

Convert to an artifact
51

Event Tracing for Windows
52

What is ETW
ETW is the underlying system by which event logs are generated and collected.
https://docs.microsoft.com/en-us/windows-hardware/test/weg/instrumenting-your-code-with-etw


53

ETW Providers
Show all registered ETW providers



Show details about each provider


54
logman query providers
logman query providers Microsoft-Windows-DNS-Client

ETW for event driven logs
ETW and event logs are just two sides of the same coin
Log providers are just ETW providers

In VQL watch_etw() can be used
instead of watch_evtx()

See Windows.Sysinternals.SysmonLogForward
for an example
55

Exercise - Monitor DNS queries
Use ETW to monitor all clients' DNS queries.

Stream queries to server
56

Exercise - Monitor DNS queries
57

58
