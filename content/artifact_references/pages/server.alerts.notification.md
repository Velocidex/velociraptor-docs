---
title: Server.Alerts.Notification
hidden: true
tags: [Server Event Artifact]
---

This artifact forwards alerts from Server.Internal.Alerts to a Slack/Teams/Discord via a Webhook.


<pre><code class="language-yaml">
name: Server.Alerts.Notification
description: |
   This artifact forwards alerts from Server.Internal.Alerts to a Slack/Teams/Discord via a Webhook.

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

        LET hits = SELECT * from watch_monitoring(artifact=&#x27;Server.Internal.Alerts&#x27;)

        SELECT * FROM foreach(row=hits,
        query={
           SELECT * FROM http_client(
            data=serialize(item=dict(
                text=format(format=&quot;Alert: %v | Details: %v | Artifact: %v | ClientId: %v | Timestamp: %v)&quot;,
                            args=[name, event_data, artifact, client_id, timestamp])),
                format=&quot;json&quot;),
            headers=dict(`Content-Type`=&quot;application/json&quot;),
            method=&quot;POST&quot;,
            url=token_url)
        })

</code></pre>

