---
title: Server.Alerts.ProcessCreation
hidden: true
tags: [Server Event Artifact]
---

This artifact alerts when a process was detected with the artifact 'Windows.Detection.ProcessCreation' (which is a client_event artifact that needs to be enabled first).


<pre><code class="language-yaml">
name: Server.Alerts.ProcessCreation
description: |
   This artifact alerts when a process was detected with the artifact &#x27;Windows.Detection.ProcessCreation&#x27; (which is a client_event artifact that needs to be enabled first).

author: Jos Clephas - @DfirJos

type: SERVER_EVENT

parameters:
  - name: SlackToken
    description: The token URL obtained from Slack/Teams/Discord (or basicly any communication-service that supports webhooks). Leave blank to use server metadata. e.g. https://hooks.slack.com/services/XXXX/YYYY/ZZZZ

sources:
  - query: |
        LET token_url = if(
           condition=SlackToken,
           then=SlackToken,
           else=server_metadata().SlackToken)

        LET hits = SELECT * from watch_monitoring(artifact=&#x27;Windows.Detection.ProcessCreation&#x27;)

        SELECT * FROM foreach(row=hits,
        query={
           SELECT EventData.CommandLine, EventData, Hostname, ClientId, Url, Content, Response FROM http_client(
            data=serialize(item=dict(
                text=format(format=&quot;Alert - Command detected &#x27;%v&#x27; on system %v with client Id %v. Syslog timestamp: %v &quot;,
                            args=[EventData.CommandLine, Hostname, ClientId, Timestamp])),
                format=&quot;json&quot;),
            headers=dict(`Content-Type`=&quot;application/json&quot;),
            method=&quot;POST&quot;,
            url=token_url)
        })

</code></pre>

