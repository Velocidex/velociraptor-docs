---
title: Windows.System.VAD
hidden: true
tags: [Client Artifact]
---

This artifact enables enumeration of process memory sections via the Virtual
Address Descriptor (VAD). The VAD is used by the Windows memory manager to
describe allocated process memory ranges.

Availible filters include process, mapping path, memory permissions
or by content with yara.

NOTE:

 - ProtectionChoice is a choice to filter on section protection. Default is
all sections and ProtectionRegex can override selection.   
- To filter on unmapped sections the MappingNameRegex: ^$ can be used.


<pre><code class="language-yaml">
name: Windows.System.VAD
author: &quot;Matt Green - @mgreen27&quot;
description: |
  This artifact enables enumeration of process memory sections via the Virtual
  Address Descriptor (VAD). The VAD is used by the Windows memory manager to
  describe allocated process memory ranges.

  Availible filters include process, mapping path, memory permissions
  or by content with yara.

  NOTE:
  
   - ProtectionChoice is a choice to filter on section protection. Default is
  all sections and ProtectionRegex can override selection.   
  - To filter on unmapped sections the MappingNameRegex: ^$ can be used.

parameters:
  - name: ProcessRegex
    description: A regex applied to process names.
    default: .
    type: regex
  - name: PidRegex
    default: .
    type: regex
  - name: ProtectionChoice
    type: choices
    description: Select memory permission you would like to return. Default All.
    default: Any
    choices:
      - Any
      - Execute, read and write
      - Any executable
  - name: ProtectionRegex
    type: regex
    description: Allows a manual regex selection of section Protection permissions. If configured take preference over Protection choice.
  - name: MappingNameRegex
    type: regex
  - name: UploadSection
    description: Upload suspicious section.
    type: bool
  - name: SuspiciousContent
    description: A yara rule of suspicious section content
    type: yara
  - name: ContextBytes
    description: Include this amount of bytes around yara hit as context.
    default: 200
    type: int


sources:
  - query: |
      -- firstly find processes in scope
      LET processes = SELECT int(int=Pid) AS Pid,
              Name, Exe, CommandLine, CreateTime
        FROM process_tracker_pslist()
        WHERE Name =~ ProcessRegex
            AND format(format=&quot;%d&quot;, args=Pid) =~ PidRegex
            AND log(message=&quot;Scanning pid %v : %v&quot;, args=[Pid, Name])

      -- next find sections in scope
      LET sections = SELECT * FROM foreach(
          row=processes,
          query={
            SELECT CreateTime as ProcessCreateTime,Pid, Name,MappingName  ,
                format(format=&#x27;%x-%x&#x27;, args=[Address, Address+Size]) AS AddressRange,
                Address as _Address,
                State,Type,ProtectionMsg,Protection,
                Size as SectionSize,
                pathspec(
                    DelegateAccessor=&quot;process&quot;,
                    DelegatePath=Pid,
                    Path=Address) AS _PathSpec
            FROM vad(pid=Pid)
            WHERE if(condition=MappingNameRegex,
                    then= MappingName=~MappingNameRegex,
                    else= True)
                AND if(condition = ProtectionRegex,
                    then= Protection=~ProtectionRegex,
                    else= if(condition= ProtectionChoice=&#x27;Any&#x27;,
                        then= TRUE,
                    else= if(condition= ProtectionChoice=&#x27;Execute, read and write&#x27;,
                        then= Protection= &#x27;xrw&#x27;,
                    else= if(condition= ProtectionChoice=&#x27;Any executable&#x27;,
                        then= Protection=~&#x27;x&#x27;))))
          })

      -- if suspicious yara added, search for it
      LET yara_sections = SELECT *
        FROM foreach(row={
                SELECT * FROM sections
                WHERE NOT State =~ &quot;RESERVE&quot;
            }, query={
                SELECT
                    ProcessCreateTime, Pid, Name,MappingName,
                    AddressRange,State,Type,ProtectionMsg,
                    Protection,SectionSize,
                    dict(Rule=Rule,
                         Meta=Meta,
                         Tags=Tags,
                         Offset=String.Offset,
                         Name=String.Name) as YaraHit,
                    upload( accessor=&#x27;scope&#x27;,
                            file=&#x27;String.Data&#x27;,
                            name=format(format=&quot;%v-%v_%v.bin-%v-%v&quot;,
                            args=[
                                Name, Pid, AddressRange,
                                if(condition= String.Offset - ContextBytes &lt; 0,
                                    then= 0,
                                    else= String.Offset - ContextBytes),
                                if(condition= String.Offset + ContextBytes &gt; SectionSize,
                                    then= SectionSize,
                                    else= String.Offset + ContextBytes ) ])
                            ) as HitContext,
                    _PathSpec, _Address
                FROM yara(
                            accessor=&#x27;offset&#x27;,
                            files=_PathSpec,
                            rules=SuspiciousContent,
                            end=SectionSize,  key=&#x27;X&#x27;,
                            number=1,
                            context=ContextBytes
                        )
            })

      -- finalise results
      LET results = SELECT *,
             process_tracker_callchain(id=Pid).Data as ProcessChain
        FROM if(condition= SuspiciousContent,
                    then= yara_sections,
                    else= sections)

      -- upload sections if selected
      LET upload_results = SELECT *,
        upload(accessor=&#x27;sparse&#x27;,
               file=pathspec(
                    DelegateAccessor=&quot;process&quot;,
                    DelegatePath=Pid,
                    Path=[dict(Offset=_Address, Length=SectionSize),]),
                name=pathspec(
                    Path=format(
                        format=&#x27;%v-%v_%v.bin&#x27;,
                        args= [ Name, Pid, AddressRange ]))) as SectionDump
            FROM results

      -- output rows
      SELECT * FROM if(condition= UploadSection,
                    then= upload_results,
                    else= results)

column_types:
  - name: HitContext
    type: preview_upload

</code></pre>

