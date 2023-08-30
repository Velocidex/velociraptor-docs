---
title: Linux.Detection.Yara.Process
hidden: true
tags: [Client Artifact]
---

This artifact enables running Yara over processes in memory.

There are 2 kinds of Yara rules that can be deployed:

1. Url link to a yara rule.
2. A Standard Yara rule attached as a parameter.

Only one method of Yara will be applied and search order is as above. The
default is Cobalt Strike opcodes.

Regex parameters can be applied for process name and pid for targeting. The
artifact also has an option to upload any process with Yara hits.

Note: the Yara scan will stop after one hit. Multi-string rules will also only
show one string in returned rows.


<pre><code class="language-yaml">
name: Linux.Detection.Yara.Process
author: Matt Green - @mgreen27
description: |
  This artifact enables running Yara over processes in memory.

  There are 2 kinds of Yara rules that can be deployed:

  1. Url link to a yara rule.
  2. A Standard Yara rule attached as a parameter.

  Only one method of Yara will be applied and search order is as above. The
  default is Cobalt Strike opcodes.

  Regex parameters can be applied for process name and pid for targeting. The
  artifact also has an option to upload any process with Yara hits.

  Note: the Yara scan will stop after one hit. Multi-string rules will also only
  show one string in returned rows.

type: CLIENT
parameters:
  - name: ProcessRegex
    default: .
    type: regex
  - name: PidRegex
    default: .
    type: regex
  - name: UploadHits
    type: bool
  - name: YaraUrl
    description: If configured will attempt to download Yara rules from Url
    type: upload
  - name: YaraRule
    type: yara
    description: Final Yara option and the default if no other options provided.
    default: |
      rule keyword_search {
         strings:
           $a = &quot;velociraptor&quot; ascii

        condition:
            any of them
      }
  - name: NumberOfHits
    description: THis artifact will stop by default at one hit. This setting allows additional hits
    default: 1
    type: int
  - name: ContextBytes
    description: Include this amount of bytes around hit as context.
    default: 0
    type: int
  - name: ExePathWhitelist
    description: Regex of ProcessPaths to exclude
    type: regex


sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;linux&#x27;

    query: |
      -- check which Yara to use
      LET yara_rules &lt;= YaraUrl || YaraRule

      -- find velociraptor process
      LET me = SELECT Pid FROM pslist(pid=getpid())

      -- find all processes and add filters
      LET processes = SELECT
             Name as ProcessName,
             CommandLine, Pid
        FROM pslist()
        WHERE
            Name =~ ProcessRegex
            AND format(format=&quot;%d&quot;, args=Pid) =~ PidRegex
            AND NOT Pid in me.Pid
            AND NOT if(condition=ExePathWhitelist,
                    then= Exe=~ExePathWhitelist)
            AND log(message=format(format=&quot;Scanning pid %v: %v&quot;, args=[
                Pid, CommandLine]))

      -- scan processes in scope with our rule, limit 1 hit
      LET hits = SELECT * FROM foreach(
        row=processes,
        query={
            SELECT
                ProcessName,
                CommandLine,
                Pid,
                Namespace,
                Rule,
                Meta,
                String.Name as YaraString,
                String.Offset as HitOffset,
                upload( accessor=&#x27;scope&#x27;, 
                    file=&#x27;String.Data&#x27;, 
                    name=format(format=&quot;%v-%v_%v_%v&quot;, 
                    args=[ ProcessName, Pid, String.Offset, ContextBytes ]
                        )) as HitContext
             FROM yara(files=format(format=&quot;/%d&quot;, args=Pid),
                       accessor=&#x27;process&#x27;,rules=yara_rules,
                       context=ContextBytes, number=NumberOfHits )
          })

      -- upload hits using the process accessor
      LET upload_hits = SELECT *,
          upload(
            accessor=&quot;process&quot;,
            file=format(format=&quot;/%v&quot;, args=Pid),
            name=pathspec(Path=format(format=&#x27;%v-%v.dmp&#x27;,
                          args= [ ProcessName, Pid ]))) as ProcessDump
      FROM hits
      WHERE log(message=format(format=&#x27;Will upload %v: %v&#x27;, args=[Pid, ProcessName]))

      -- return rows
      SELECT * FROM if(condition=UploadHits,
        then=upload_hits,
        else=hits)

column_types:
  - name: HitContext
    type: preview_upload
</code></pre>

