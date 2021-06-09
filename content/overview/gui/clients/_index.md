---
title: "Clients"
date: 2021-06-09T04:12:07Z
draft: false
weight: 5
---


Interactively investigate
individual clients
74

Searching for a client
To work with a specific client we need to search for it.
Press the Search or Show All icon to see some clients
75

76
Search for clients
hostname, label, or client ID.
You can start typing the hostname to auto-complete

Client overview
The server collects some high level information about each endpoint.
Click VQL Drilldown to see more detailed information:
Client version
Client footprint (memory and CPU)


77
You can customize the information collected and shown by editing the Generic.Client.Info artifact.

78
Clients have a unique ID starting with “C.”. Internally the client id is considered the most accurate source of endpoint identity

Each client has arbitrary metadata so you can integrate it easily into your procedures

79
By default, VQL Drill Down shows the recent memory and CPU load of Velociraptor on the endpoint as well as the list of users.
This screen simply shows the report of the Generic.Client.Info artifact - you can edit the artifact to collect more/different info.
The GUI consists of familiar widgets: Here we can see the table widget which repeats often

80
You can show/hide columns as needed - this helps to see wider columns

81
You can see the raw data behind each table:
A table is simply a list of rows
Each row is a mapping

82
Velociraptor allows running shell commands on the endpoint using Powershell/Cmd/Bash

Only Velociraptor users with the administrator role are allowed to do this!

Actions are logged and audited
You can disable client shell ability by configuration policy - but this limits your DFIR efficacy.
Get-LocalGroupMember -Group "Administrators"
