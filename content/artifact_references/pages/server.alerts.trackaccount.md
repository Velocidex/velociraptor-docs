---
title: Server.Alerts.Trackaccount
hidden: true
tags: [Server Event Artifact]
---

This artifact alerts when account usage of a monitored account is detected. This is a server-side artifact, please note that it requires the client_event artifact 'Windows.Events.Trackaccount' to be enabled.


<pre><code class="language-yaml">
name: Server.Alerts.Trackaccount
description: |
   This artifact alerts when account usage of a monitored account is detected. This is a server-side artifact, please note that it requires the client_event artifact &#x27;Windows.Events.Trackaccount&#x27; to be enabled.

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

        LET hits = SELECT * from watch_monitoring(artifact=&#x27;Windows.Events.Trackaccount&#x27;)

        SELECT * FROM foreach(row=hits,
        query={
           SELECT EventRecordID, EventID, TargetUserName, TargetWorkstationName, SourceComputer, LogonType, EventTime, ClientId, Url, Content, Response FROM http_client(
            data=serialize(item=dict(
                text=format(format=&quot;EventID: %v - Account &#x27;%v&#x27; authenticated from system &#x27;%v&#x27; to &#x27;%v&#x27; with LogonType %v at %v on client %v (EventRecordID: %v)&quot;,
                            args=[EventID, TargetUserName, TargetWorkstationName, SourceComputer, LogonType, EventTime, ClientId, EventRecordID])),
                format=&quot;json&quot;),
            headers=dict(`Content-Type`=&quot;application/json&quot;),
            method=&quot;POST&quot;,
            url=token_url)
        })

</code></pre>

