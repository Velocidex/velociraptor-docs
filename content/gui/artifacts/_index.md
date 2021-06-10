---
title: "Artifacts"
date: 2021-06-09T04:03:42Z
draft: false
weight: 15
---


96
Velociraptor Artifacts
Fast, Efficient, Surgical

97
Velociraptor artifacts
Velociraptor is just a VQL engine!

We package VQL queries in Artifacts:
YAML files
Include human description
Package related VQL queries into “Sources”
Take parameters for customization
Can in turn be used in VQL as well...

98
Refreshing the VFS simply schedules new artifacts to be collected - it is just a GUI convenience.
This also means we have a complete audit of users refreshing the VFS
Previous collected artifacts overview
Collected artifact details

Velociraptor uses expert
 knowledge to find the evidence
A key objective of Velociraptor is encapsulating DFIR knowledge into the platform, so you don’t need to be a DFIR expert.
We have high level questions to answer
We know where to look for evidence of user / system activities

We build artifacts to collect and analyze the evidencein order to answer our investigative questions.
99

Velociraptor's superpower:
user specified artifacts
An artifact is a YAML file …
(therefore user-readable, shareable and editable)
… that answers a question …
… by collecting data from the endpoint …
… and reporting on this data in a human readable way.
Artifacts encode expert knowledge intohuman reusable components.



100

101
Artifact Description
Artifact Search area.
Actual VQL source

102
To collect a new artifact, from the Collected Artifacts screen, click Collect new artifact and search for it. Select Add to add it to this collection. When finished simply click Next.

103

Velociraptor Artifacts
Velociraptor comes with a large number of artifact types
Client Artifacts run on the endpoint
Client Event artifacts monitor the endpoint
Server Artifacts run on the server
Server Event artifacts monitor for events on the server.

104
Depending on context, the GUI artifact search screen will only show the relevant artifact types.

The View Artifacts page shows all types as well as details about each one.

105
All artifacts produce rows since they are just queries.
Some artifacts also upload files. You can create a download zip to export all the uploaded files.

106
The uploads tab shows the file's location on the server.

You can download each one individually.

107
As the query is running on the endpoint any log messages are sent to the server.
Click the log tab to see if there were any errors and how many rows are expected.

108
Source Selector
Viewing the result tab shows the rows sent from every artifact and source.



109

110

Searching, Viewing and Modifying artifacts
111

View artifacts
Artifacts are just YAML files
The “View Artifacts” screen allows users to explore the different available artifacts.

While most users will just collect existing ones, we expect power users to customize and write their own artifacts from scratch.


112

113
Search box
Description and Info
Available customization

114
User artifacts must have the prefix “Custom.”. You can collect the original or the customized version as you please.

Customizing the dashboard
The main server dashboard is just an artifact called Server.Monitor.Health !

You can therefore modify it.

I usually put the name of the deployment prominently and/or links to MSI or client config files - we have so many different deployments it is hard to keep track!
115

116
