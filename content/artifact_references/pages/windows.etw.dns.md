---
title: Windows.ETW.DNS
hidden: true
tags: [Client Event Artifact]
---

This artifact monitors DNS queries using ETW.

There are several filteres availible to the user to filter out and target with 
regex, by default duplicate DNSCache requests are filtered out.


<pre><code class="language-yaml">
name: Windows.ETW.DNS
author: Matt Green - @mgreen27
description: |
  This artifact monitors DNS queries using ETW.
  
  There are several filteres availible to the user to filter out and target with 
  regex, by default duplicate DNSCache requests are filtered out.

type: CLIENT_EVENT

parameters:
  - name: ImageRegex
    description: &quot;ImagePath regex filter for&quot;
    default: .
    type: regex
  - name: CommandLineRegex
    description: &quot;Commandline to filter for.&quot;
    default: .
    type: regex
  - name: QueryRegex
    description: &quot;DNS query request (domain) to filter for.&quot;
    default: .
    type: regex
  - name: AnswerRegex
    description: &quot;DNS answer to filter for.&quot;
    default: .
    type: regex
  - name: CommandLineExclusion
    description: &quot;Commandline to filter out. Typically we do not want Dnscache events.&quot;
    default: &#x27;svchost.exe -k NetworkService -p -s Dnscache$&#x27;
    type: regex
    
    
sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;
      
    query: |
      LET RecentProcesses = SELECT * FROM fifo(query={
                SELECT System.TimeStamp AS CreateTime, 
                    EventData.ImageName AS ImageName,
                    int(int=EventData.ProcessID) AS Pid,
                    EventData.MandatoryLabel AS MandatoryLabel,
                    EventData.ProcessTokenElevationType AS ProcessTokenElevationType,
                    EventData.ProcessTokenIsElevated AS TokenIsElevated
                FROM watch_etw(guid=&quot;{22fb2cd6-0e7b-422b-a0c7-2fad1fd0e716}&quot;, any=0x10)
                WHERE System.ID = 1   
            }, max_rows=1000, max_age=60)
        
      -- Query it once to materialize the FIFO
      LET _ &lt;= SELECT * FROM RecentProcesses
        
      LET GetProcessInfo(TargetPid) = SELECT *, ThreadId as ProcessThreadId
        FROM switch(
            -- First try to get the pid directly
            a={
                SELECT 
                    Name, Pid, CreateTime,
                    Exe as ImageName,
                    CommandLine,
                    Username,
                    TokenIsElevated
                FROM pslist(pid=TargetPid)
            },
            -- Failing this look in the FIFO for a recently started process.
            b={
                SELECT
                    basename(path=ImageName) as Name,
                    Pid,
                    CreateTime,
                    ImageName,
                    Null as CommandLine,
                    Null as Username,
                    if(condition= TokenIsElevated=&quot;0&quot;, 
                        then= false, 
                        else= true ) as TokenIsElevated
                FROM RecentProcesses
                WHERE Pid = TargetPid
                LIMIT 1
            })
        
        SELECT System.TimeStamp AS EventTime,
            EventData.QueryName AS Query,
            get(item=dict(
                        `1` = &#x27;A&#x27;,
                        `2` = &#x27;NS&#x27;,
                        `5` = &#x27;CNAME&#x27;,
                        `6` = &#x27;SOA&#x27;,
                        `12` = &#x27;PTR&#x27;,
                        `13` = &#x27;HINFO&#x27;,
                        `15` = &#x27;MX&#x27;,
                        `16` = &#x27;TXT&#x27;,
                        `17` = &#x27;RP&#x27;,
                        `18` = &#x27;AFSDB&#x27;,
                        `24` = &#x27;SIG&#x27;,
                        `25` = &#x27;KEY&#x27;,
                        `28` = &#x27;AAAA&#x27;,
                        `29` = &#x27;LOC&#x27;,
                        `33` = &#x27;SRV&#x27;,
                        `35` = &#x27;NAPTR&#x27;,
                        `36` = &#x27;KX&#x27;,
                        `37` = &#x27;CERT&#x27;,
                        `39` = &#x27;DNAME&#x27;,
                        `42` = &#x27;APL&#x27;,
                        `43` = &#x27;DS&#x27;,
                        `44` = &#x27;SSHFP&#x27;,
                        `45` = &#x27;IPSECKEY&#x27;,
                        `46` = &#x27;RRSIG&#x27;,
                        `47` = &#x27;NSEC&#x27;,
                        `48` = &#x27;DNSKEY&#x27;,
                        `49` = &#x27;DHCID&#x27;,
                        `50` = &#x27;NSEC3&#x27;,
                        `51` = &#x27;NSEC3PARAM&#x27;,
                        `52` = &#x27;TLSA&#x27;,
                        `53` = &#x27;SMIMEA&#x27;,
                        `55` = &#x27;HIP&#x27;,
                        `59` = &#x27;CDS&#x27;,
                        `60` = &#x27;CDNSKEY&#x27;,
                        `61` = &#x27;OPENPGPKEY&#x27;,
                        `62` = &#x27;CSYNC&#x27;,
                        `63` = &#x27;ZONEMD&#x27;,
                        `64` = &#x27;SVCB&#x27;,
                        `65` = &#x27;HTTPS&#x27;,
                        `108` = &#x27;EUI48&#x27;,
                        `109` = &#x27;EUI64&#x27;,
                        `249` = &#x27;TKEY&#x27;,
                        `250` = &#x27;TSIG&#x27;,
                        `256` = &#x27;URI&#x27;,
                        `257` = &#x27;CAA&#x27;,
                        `32768` = &#x27;TA&#x27;,
                        `32769` = &#x27;DLV&#x27;),
                    member=str(str=EventData.QueryType)) AS Type,
               EventData.QueryResults AS Answer,
               GetProcessInfo(TargetPid=System.ProcessID,ThreadId=System.ThreadID)[0] as Process
        FROM watch_etw(guid=&quot;{1C95126E-7EEA-49A9-A3FE-A378B03DDB4D}&quot;)
        WHERE System.ID = 3008
            AND Query AND Process AND Answer 
            AND NOT Process.CommandLine =~ CommandLineExclusion
            AND Process.ImageName =~ ImageRegex
            AND Query =~ QueryRegex
            AND Answer =~ AnswerRegex
</code></pre>

