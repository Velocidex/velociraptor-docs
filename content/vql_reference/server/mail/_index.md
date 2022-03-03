---
title: mail
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## mail
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
to|Recipient of the mail|list of string (required)
from|The from email address.|string
cc|A cc for the mail|list of string
subject|The subject.|string
body|The body of the mail.|string (required)
period|How long to wait before sending the next mail - help to throttle mails.|int64 (required)
server_port|The SMTP server port to use (default 587).|uint64
server|The SMTP server to use (if not specified we try the config file).|string
auth_username|The SMTP username we authenticate to the server.|string
auth_password|The SMTP username password we use to authenticate to the server.|string

### Description

Send Email to a remote server.

