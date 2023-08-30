---
title: Windows.Network.NetstatEnriched
hidden: true
tags: [Client Artifact]
---

NetstatEnhanced adds additional data points to the Netstat artifact and
enables verbose search options.

Examples include: Process name and path, authenticode information or
network connection details.

WARNING:  
KillProcess - attempts to use Taskill to kill the processes returned.  
DumpProcess - dumps the process as a sparse file for post processing.  

Please only use these switches after scoping as there are no guardrails on 
shooting yourself in the foot.


<pre><code class="language-yaml">
name: Windows.Network.NetstatEnriched
author: &quot;Matt Green - @mgreen27&quot;
description: |
  NetstatEnhanced adds additional data points to the Netstat artifact and
  enables verbose search options.

  Examples include: Process name and path, authenticode information or
  network connection details.
  
  WARNING:  
  KillProcess - attempts to use Taskill to kill the processes returned.  
  DumpProcess - dumps the process as a sparse file for post processing.  
  
  Please only use these switches after scoping as there are no guardrails on 
  shooting yourself in the foot.

required_permissions:
  - EXECVE
  
precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
  - name: IPRegex
    description: &quot;regex search over IP address fields.&quot;
    default:  .
    type: regex
  - name: PortRegex
    description: &quot;regex search over port fields.&quot;
    default: .
    type: regex
  - name: Family
    description: &quot;IP version family selection&quot;
    type: choices
    default: ALL
    choices:
       - ALL
       - IPv4
       - IPv6
  - name: FamilyMap
    type: hidden
    default: |
      Choice,Regex
      ALL,&quot;.&quot;
      IPv4,&quot;^IPv4$&quot;
      IPv6,&quot;^IPv6$&quot;

  - name: Type
    description: &quot;Transport protocol type selection&quot;
    type: choices
    default: ALL
    choices:
       - ALL
       - TCP
       - UDP
  - name: TypeMap
    type: hidden
    default: |
      Choice,Regex
      ALL,&quot;.&quot;
      TCP,&quot;^TCP$&quot;
      UDP,&quot;^UDP$&quot;

  - name: Status
    description: &quot;TCP status selection&quot;
    type: choices
    default: ALL
    choices:
       - ALL
       - ESTABLISHED
       - LISTENING
       - OTHER
  - name: StatusMap
    type: hidden
    default: |
      Choice,Regex
      ALL,&quot;.&quot;
      ESTABLISHED,&quot;^ESTAB$&quot;
      LISTENING,&quot;^LISTEN$&quot;
      OTHER,&quot;CLOS|SENT|RCVD|LAST|WAIT|DELETE&quot;

  - name: ProcessNameRegex
    description: &quot;regex search over source process name&quot;
    default: ^malware\.exe$
    type: regex
  - name: ProcessPathRegex
    description: &quot;regex search over source process path&quot;
    default: .
    type: regex
  - name: CommandLineRegex
    description: &quot;regex search over source process commandline&quot;
    default: .
    type: regex
  - name: HashRegex
    description: &quot;regex search over source process hash&quot;
    default: .
    type: regex
  - name: UsernameRegex
    description: &quot;regex search over source process user context&quot;
    default: .
    type: regex
  - name: AuthenticodeSubjectRegex
    description: &quot;regex search over source Authenticode Subject&quot;
    default: .
    type: regex
  - name: AuthenticodeIssuerRegex
    description: &quot;regex search over source Authenticode Issuer&quot;
    default: .
    type: regex
  - name: AuthenticodeVerified
    description: &quot;Authenticode signiture selection&quot;
    type: choices
    default: ALL
    choices:
       - ALL
       - TRUSTED
       - UNSIGNED
       - NOT TRUSTED
  - name: AuthenticodeVerifiedMap
    type: hidden
    default: |
      Choice,Regex
      ALL,&quot;.&quot;
      TRUSTED,&quot;^trusted$&quot;
      UNSIGNED,&quot;^unsigned$&quot;
      NOT TRUSTED,&quot;unsigned|disallowed|untrusted|error&quot;
  - name: DumpProcess
    description: &quot;WARNING: If selected will attempt to dump process from all results.&quot;
    type: bool
  - name: KillProcess
    description: &quot;WARNING: If selected will attempt to kill process from all results.&quot;
    type: bool
    
sources:
  - name: Netstat
    query: |
      LET VerifiedRegex &lt;= SELECT Regex
            FROM parse_csv(filename=AuthenticodeVerifiedMap, accessor=&quot;data&quot;)
            WHERE Choice=AuthenticodeVerified LIMIT 1
      LET StatusRegex &lt;= SELECT Regex
            FROM parse_csv(filename=StatusMap, accessor=&quot;data&quot;)
            WHERE Choice=Status LIMIT 1
      LET FamilyRegex &lt;= SELECT Regex
            FROM parse_csv(filename=FamilyMap, accessor=&quot;data&quot;)
            WHERE Choice=Family LIMIT 1
      LET TypeRegex &lt;= SELECT Regex
            FROM parse_csv(filename=TypeMap, accessor=&quot;data&quot;)
            WHERE Choice=Type LIMIT 1

      LET process &lt;= SELECT Pid as PsId,
            Ppid,
            Name,
            CommandLine,
            Exe,
            Hash,
            Authenticode,
            Username
        FROM Artifact.Windows.System.Pslist()
        WHERE Name =~ ProcessNameRegex
            AND Exe =~ ProcessPathRegex
            AND CommandLine =~ CommandLineRegex

      LET results = SELECT Pid,
                { SELECT Ppid FROM process WHERE PsId = Pid } as Ppid,
                { SELECT Name FROM process WHERE PsId = Pid } as Name,
                { SELECT Exe FROM process WHERE PsId = Pid } as Path,
                { SELECT CommandLine FROM process WHERE PsId = Pid } as CommandLine,
                { SELECT Hash FROM process WHERE PsId = Pid } as Hash,
                { SELECT Username FROM process WHERE PsId = Pid } as Username,
                { SELECT Authenticode FROM process WHERE PsId = Pid } as Authenticode,
                FamilyString as Family,
                TypeString as Type,
                Status,
                Laddr.IP as SrcIP, 
                Laddr.Port as SrcPort,
                Raddr.IP as DestIP, 
                Raddr.Port as DestPort,
                Timestamp
            FROM netstat()
            WHERE 
                Name =~ ProcessNameRegex
                AND Path =~ ProcessPathRegex
                and CommandLine =~ CommandLineRegex
                and Username =~ UsernameRegex
                and ( Hash.MD5 =~ HashRegex
                  or Hash.SHA1 =~ HashRegex
                  or Hash.SHA256 =~ HashRegex
                  or not Hash )
                and ( Authenticode.IssuerName =~ AuthenticodeIssuerRegex or not Authenticode )
                and ( Authenticode.SubjectName =~ AuthenticodeSubjectRegex or not Authenticode )
                and ( Authenticode.Trusted =~ VerifiedRegex.Regex[0] or not Authenticode )
                and Status =~ StatusRegex.Regex[0]
                and Family =~ FamilyRegex.Regex[0]
                and Type =~ TypeRegex.Regex[0]
                and ( format(format=&quot;%v&quot;, args=SrcIP) =~ IPRegex
                    or format(format=&quot;%v&quot;, args=DestIP) =~ IPRegex )
                and ( format(format=&quot;%v&quot;, args=SrcPort) =~ PortRegex
                    or format(format=&quot;%v&quot;, args=DestPort) =~ PortRegex )
    
      LET Regions(Pid) = SELECT dict(Offset=Address, Length=Size) AS Sparse
        FROM vad(pid=Pid)
        WHERE Protection =~ &quot;r&quot;
      LET dump = SELECT *,
            upload(accessor=&quot;sparse&quot;,
                    file=pathspec(
                    Path=serialize(item=Regions(Pid=Pid).Sparse),
                    DelegateAccessor=&quot;process&quot;,
                    DelegatePath=format(format=&quot;/%d&quot;, args=Pid)),
                     name=pathspec(Path=format(format=&quot;%d.dd&quot;, args=Pid))) AS ProcessMemory
        FROM results
      LET kill = SELECT *, pskill(pid=Pid) AS KillProcess    
        FROM results
      LET dumpandkill = SELECT *, pskill(pid=Pid) AS KillProcess 
        FROM dump
      
      SELECT * FROM switch(
            a = { 
                SELECT *, if(condition= KillProcess=Null,then=&#x27;Success&#x27;,else=KillProcess) AS KillProcess
                FROM if(condition= DumpProcess AND KillProcess, then= dumpandkill )},
            b = { SELECT * FROM if(condition= DumpProcess, then= dump )},
            c = { 
                SELECT *, if(condition= KillProcess=Null,then=&#x27;Success&#x27;,else=KillProcess) AS KillProcess
                FROM if(condition= KillProcess, then= kill) 
            },
            catch = results
        )

</code></pre>

