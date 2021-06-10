---
date: 2018-12-11T04:10:06Z
description:  |
  One of the interesting new features in the latest release of
  Velociraptor is an interactive shell. One can interact with the end
  point over the standard Velociraptor communication mechanism - an
  encrypted and authenticated channel.

title: Velociraptor Interactive Shell
url: /blog/html/2018/12/11/velociraptor_interactive_shell.html
categories: ["Blog"]
hidden: true
---


One of the interesting new features in the latest release of
Velociraptor is an interactive shell. One can interact with the end
point over the standard Velociraptor communication mechanism - an
encrypted and authenticated channel.

This feature is implemented by utilizing the Velociraptor event
monitoring, server side VQL queries. This post explores how these
components come together to deliver a responsive, interactive workflow.

Endpoint shell access
=====================

Although we generally try to avoid it, sometimes the easiest way to
extract certain information is to run a command and parse its output.
For example, consider the windows ipconfig command. It is possible to
extract this information using win32 apis but this requires additional
code to be written in the client. The ipconfig command is guaranteed to
be available. Soemtimes running a command and parsing its output is the
easiest option.

The GRR client has a client action which can run a command. However that
client action is restricted to run a whitelist of commands, since GRR
chose to prevent the running of arbitrary commands on the endpoint. In
practice, though it is difficult to add new commands to the whitelist
(and rebuild and deploy new clients that have the updated whitelist).
But users need to run arbitrary commands (including their own third
party tools) anyway. So in the GRR world, most people use \"python
hacks\" routinely to run arbitrary commands.

When we came to redesign Velociraptor we pondered if arbitrary command
execution should be included or not. To be sure, this is a dangerous
capability - effectively giving Velociraptor root level access on the
endpoint. In our experience restricting it in an arbitrary way (as was
done in GRR) is not useful because it is harder adapt to real incident
response needs (you hardly ever know in advance what is needed at 2am in
the morning when trying to triage an incident!).

Other endpoint monitoring tools also have a shell interface (For example
Carbon Black). It is understood that this feature is extremely powerful,
but it is necessary sometimes.

Velociraptor mitigates this risk in a few ways:

1.  If an organization deems the ability to run arbitrary commands too
    dangerous, they can completely disable this feature in the client\'s
    configuration.
2.  Every shell command run by the client is audited and its output is
    archived. Misuse can be easily detected and investigated.
3.  This feature is considered high risk and it is not available via the
    GUI. One must use the velociraptor binary on the server itself to
    run the interactive shell.

Interactive Shell
=================

The interactive shell feature is accessed by issueing the shell command
to the velociraptor binary:

``` {.sourceCode .bash}
$ velociraptor --config ~/server.config.yaml shell C.7403676ab8664b2b
C.7403676ab8664b2b (trek) >ls /
Running ls / on C.7403676ab8664b2b
Received response at 2018-12-11 13:12:35 +1000 AEST - Return code 0

bin
boot
core
data
dev

C.7403676ab8664b2b (trek) >id
Running id on C.7403676ab8664b2b
Received response at 2018-12-11 13:13:05 +1000 AEST - Return code 0

uid=1000(mic) gid=1000(mic) groups=1000(mic),4(adm),24(cdrom),27(sudo)

C.7403676ab8664b2b (trek) >whoami
Running whoami on C.7403676ab8664b2b
Received response at 2018-12-11 13:13:10 +1000 AEST - Return code 0

mic
```

As you can see it is pretty straight forward - type a command, the
command is sent to the client, and the client responds with the output.

How does it work?
=================

The main components are shown in the figure below. Note that the shell
process is a different process from the frontend:

![image](interactive_shell_workflow.png)

The workflow starts when a user issues a command (for example \"ls -l
/\") on the terminal. The shell process schedules a VQL query for the
client:

``` {.sourceCode .psql}
SELECT now() as Timestamp, Argv, Stdout,
     Stderr, ReturnCode FROM execve(argv=['ls', '-l', '/'])
```

However, this query is scheduled as part of the monitoring flow -which
means it\'s response will be sent and stored with the monitoring logs.
As soon as the shell process schedules the VQL query the frontend is
notified and the client is woken. Note that due to Velociraptor\'s near
instantaneous communication protocol this causes the client to run the
command almost immediately.

The client executes the query which returns one or more rows containing
the Stdout of the process. The client will then send the response to the
server as a monitoring event. The frontend will then append the event to
a CSV file.

After sending the initial client query, the interactive shell process
will issue a watch VQL query to watch for the shell response:

``` {.sourceCode .psql}
SELECT ReturnCode, Stdout, Stderr, Timestamp, Argv
FROM watch_monitoring(client_id=ClientId, artifact='Shell')
```

The process now blocks until this second query detects the response
arrived on the monitoring queue. Now we simply display the result and go
back to the interactive prompt.

Note that the interactive shell is implemented using the same basic
building blocks that Velociraptor offers:

1.  Issuing client VQL queries.
2.  Waking the client immediately gives instant results (no need for
    polling).
3.  Utilizing the event monitoring flow to receive results from queries
    immediately.
4.  Writing server side event queries to watch for new events, such as
    responses from the client.

Note that the frontend is very simple and does no specific processing of
the interactive shell, the feature is implemented completely within the
interactive shell process itself. This design lowers the load on the
frontends since their job is very simple, but enables complex post
processing and interaction to tbe implemented by other processes.

Auditing
========

We mentioned previously that running shell commands on endpoints is a
powerful feature and we need to audit its use closely. Since shell
command output is implemented via the monitored event queues it should
be obvious that we can monitor all such commands by simply watching the
Shell artifact event queue:

``` {.sourceCode .bash}
$ velociraptor query "select * from watch_monitoring(artifact='Shell')"
[
 {
  "Argv": "\"{\\\"Argv\\\":[\\\"id\\\"]}\"",
  "Artifact": "Shell",
  "ClientId": "C.7403676ab8664b2b",
  "ReturnCode": "0",
  "Stderr": "\"\"",
  "Stdout": "\"uid=1000(mic) gid=1000(mic) groups=1000(mic)\\n\"",
  "Timestamp": "1544499929"
 }
]
```

We can easily write an artifact that escalates any use of the
interactive shell by sending the admin an mail (See previous blog post).
This way we can see if someone missused the feature. Alternatively we
may simply archive the event queue CSV file for long term auditing of
any interactive shell use.
