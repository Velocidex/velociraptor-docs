---
title: Generic.Detection.Logs
hidden: true
tags: [Client Artifact]
---

This artifact enables grep of Logs to hunt for strings of interest. Default
target glob includes /var/log/, Apache and Windows IIS paths.

Parameters include SearchRegex and WhitelistRegex as regex terms and will
return the whole line to assist with scoping.

IIS and Apache Groks are available as notebook suggestions - please feel free to PR
additions!


<pre><code class="language-yaml">
name: Generic.Detection.Logs
author: "Matt Green - @mgreen27, Apache groks thanks to Harsh Jaroli and Krishna Patel"
description: |
  This artifact enables grep of Logs to hunt for strings of interest. Default
  target glob includes /var/log/, Apache and Windows IIS paths.

  Parameters include SearchRegex and WhitelistRegex as regex terms and will
  return the whole line to assist with scoping.

  IIS and Apache Groks are available as notebook suggestions - please feel free to PR
  additions!


parameters:
  - name: TargetGlob
    default: '/{/var/log/**,*:/inetpub/logs/**/,{/var/log/httpd,/var/log/apache2,/var/log/nginx,C:/Apache/logs}/{access.log,access_log}*}'
  - name: SearchRegex
    description: "Regex of strings to search in line."
    default: 'PUT '
    type: regex
  - name: WhitelistRegex
    description: "Regex of strings to leave out of output."
    default:
    type: regex

sources:
  - query: |
      LET files = SELECT OSPath FROM glob(globs=TargetGlob)

      SELECT * FROM foreach(row=files,
          query={
              SELECT Line, OSPath 
              FROM parse_lines(filename=OSPath)
              WHERE
                Line =~ SearchRegex
                AND NOT if(condition= WhitelistRegex,
                    then= Line =~ WhitelistRegex,
                    else= FALSE)
          })

    notebook:
      - type: vql_suggestion
        name: IIS Groks
        template: |
            /*
            ### IIS grok

            Note:  IIS doesn't have a standard logging format so we have added some
            suggestions. Comment in preferred or add / modify your own.
            */

            LET target_grok = "%{TIMESTAMP_ISO8601:LogTimeStamp} %{IPORHOST:Site} %{WORD:Method} %{URIPATH:UriPath} %{NOTSPACE:QueryString} %{NUMBER:Port} %{NOTSPACE:Username} %{IPORHOST:Clienthost} %{NOTSPACE:Useragent} %{NOTSPACE:Referrer} %{NUMBER:Response} %{NUMBER:Subresponse} %{NUMBER:Win32status} %{NUMBER:Timetaken:int}"
            --LET target_grok = "%{TIMESTAMP_ISO8601:log_timestamp} %{IPORHOST:site} %{WORD:method} %{URIPATH:page} %{NOTSPACE:querystring} %{NUMBER:port} %{NOTSPACE:username} %{IPORHOST:clienthost} %{NOTSPACE:useragent} %{NOTSPACE:referer} %{NUMBER:response} %{NUMBER:subresponse} %{NUMBER:scstatus} %{NUMBER:timetaken:int}"
            --LET target_grok = "%{TIMESTAMP_ISO8601:log_timestamp} %{WORD:iisSite} %{NOTSPACE:computername} %{IPORHOST:site} %{WORD:method} %{URIPATH:page} %{NOTSPACE:querystring} %{NUMBER:port} %{NOTSPACE:username} %{IPORHOST:clienthost} %{NOTSPACE:protocol} %{NOTSPACE:useragent} %{NOTSPACE:referer} %{IPORHOST:cshost} %{NUMBER:response} %{NUMBER:subresponse} %{NUMBER:scstatus} %{NUMBER:bytessent:int} %{NUMBER:bytesrecvd:int} %{NUMBER:timetaken:int}"


            LET parsed = SELECT ClientId as _ClientId, Line as _Raw,
                  grok(data=Line,grok=target_grok) as GrokParsed
              FROM source()
              WHERE GrokParsed

            SELECT * FROM foreach(row=parsed,
                  query={ SELECT *, _Raw FROM GrokParsed })
                  
      - type: vql_suggestion
        name: Apache Groks
        template: |
            /*
            ### Apache Grok
            */

            LET target_grok = '''%{IPORHOST:client} - - \[%{HTTPDATE:timestamp}\] "%{WORD:method} %{URIPATHPARAM:request} HTTP/%{NUMBER:httpversion}" %{NUMBER:status} %{NUMBER:response_size}'''
            
            LET parsed = SELECT ClientId as _ClientId, Line as _Raw,
                  grok(data=Line,grok=target_grok) as GrokParsed
              FROM source()
              WHERE GrokParsed

            SELECT * FROM foreach(row=parsed,
                  query={ SELECT *, _Raw FROM GrokParsed })

</code></pre>

