---
title: Windows.Remediation.Quarantine
hidden: true
tags: [Client Artifact]
---

**Apply quarantine via Windows local IPSec policy**

- By default the current client configuration is applied as an exclusion
using resolved IP address at time of application.
- A configurable lookup table is also used to generate additional entries
using the same syntax as netsh ipsec configuration.
  - DNS and DHCP are
entires here allowed by default.
- An optional MessageBox may also be configured to alert all logged in users.
  - The message will be truncated to 256 characters.
- After policy application, connection back to the Velociraptor
frontend is tested and the policy removed if connection unavailable.
- To remove policy, select the RemovePolicy checkbox.
- To update policy, simply rerun the artifact.

NOTE:

- Remember DNS resolution may change. It is highly recommended to plan
policy accordingly and not rely on DNS lookups.
- Local IPSec policy can not be applied when Domain IPSec policy
is already enforced. Please configure at GPO level in this case.


<pre><code class="language-yaml">
name: Windows.Remediation.Quarantine
description: |
      **Apply quarantine via Windows local IPSec policy**

      - By default the current client configuration is applied as an exclusion
      using resolved IP address at time of application.
      - A configurable lookup table is also used to generate additional entries
      using the same syntax as netsh ipsec configuration.
        - DNS and DHCP are
      entires here allowed by default.
      - An optional MessageBox may also be configured to alert all logged in users.
        - The message will be truncated to 256 characters.
      - After policy application, connection back to the Velociraptor
      frontend is tested and the policy removed if connection unavailable.
      - To remove policy, select the RemovePolicy checkbox.
      - To update policy, simply rerun the artifact.

      NOTE:

      - Remember DNS resolution may change. It is highly recommended to plan
      policy accordingly and not rely on DNS lookups.
      - Local IPSec policy can not be applied when Domain IPSec policy
      is already enforced. Please configure at GPO level in this case.

author: Matt Green - @mgreen27

reference:
  - https://mgreen27.github.io/posts/2020/07/23/IPSEC.html

required_permissions:
  - EXECVE

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
  - name: PolicyName
    default: &quot;VelociraptorQuarantine&quot;
  - name: RuleLookupTable
    type: csv
    default: |
        Action,SrcAddr,SrcMask,SrcPort,DstAddr,DstMask,DstPort,Protocol,Mirrored,Description
        Permit,me,,0,any,,53,udp,yes,DNS
        Permit,me,,0,any,,53,tcp,yes,DNS TCP
        Permit,me,,68,any,,67,udp,yes,DHCP
        Block,any,,,any,,,,yes,All other traffic
  - name: MessageBox
    description: |
        Optional message box notification to send to logged in users. 256
        character limit.
  - name: RemovePolicy
    type: bool
    description: Tickbox to remove policy.

sources:
    - query: |

        // If a MessageBox configured truncate to 256 character limit
        LET MessageBox &lt;= parse_string_with_regex(
                  regex=&#x27;^(?P&lt;Message&gt;.{0,255}).*&#x27;,
                  string=MessageBox).Message

        // Normalise Action
        LET normalise_action(Action)=if(condition= lowcase(string=Action)= &#x27;permit&#x27;,
              then= &#x27;Permit&#x27;,
              else= if(condition= lowcase(string=Action)= &#x27;block&#x27;,
                  then= &#x27;Block&#x27;))

        // extract configurable policy from lookuptable
        LET configurable_policy &lt;= SELECT
                  normalise_action(Action=Action) AS Action,
                  SrcAddr,SrcMask,SrcPort,
                  DstAddr,DstMask,DstPort,
                  Protocol,Mirrored,Description
              FROM RuleLookupTable

        // Parse a URL to get domain name.
        LET get_domain(URL) = parse_string_with_regex(
             string=URL, regex=&#x27;^https?://(?P&lt;Domain&gt;[^:/]+)&#x27;).Domain

        // Parse a URL to get the port
        LET get_port(URL) = if(condition= URL=~&quot;https://[^:]+/&quot;, then=&quot;443&quot;,
              else=if(condition= URL=~&quot;http://[^:]+/&quot;, then=&quot;80&quot;,
              else=parse_string_with_regex(string=URL,
                  regex=&#x27;^https?://[^:/]+(:(?P&lt;Port&gt;[0-9]*))?/&#x27;).Port))

        // extract Velociraptor config for policy
        LET extracted_config &lt;= SELECT * FROM foreach(
                  row=config.server_urls,
                  query={
                      SELECT
                          &#x27;Permit&#x27; AS Action,
                          &#x27;me&#x27; AS SrcAddr,
                          &#x27;&#x27; As SrcMask,
                          &#x27;0&#x27; AS SrcPort,
                          get_domain(URL=_value) AS DstAddr,
                          &#x27;&#x27; As DstMask,
                          get_port(URL=_value) AS DstPort,
                          &#x27;tcp&#x27; AS Protocol,
                          &#x27;yes&#x27; AS Mirrored,
                          &#x27;VelociraptorFrontEnd&#x27; AS Description,
                          _value AS URL
                      FROM scope()
                  })

        // build policy with extracted config and lookuptable
        LET policy &lt;= SELECT *
              FROM chain(
                  a=extracted_config,
                  b=configurable_policy
              )
              WHERE Action =~ &#x27;^(Permit|Block)$&#x27;

        // Removes empty options from the command line
        LET clean_cmdline(CMD) = filter(list=CMD, regex=&#x27;^(\\w+|\\w+=.+)$&#x27;)

        LET delete_cmdline = clean_cmdline(
             CMD=(&#x27;netsh&#x27;,&#x27;ipsec&#x27;,&#x27;static&#x27;,&#x27;delete&#x27;,&#x27;policy&#x27;, &#x27;name=&#x27; + PolicyName))

        LET create_cmdline = clean_cmdline(
             CMD=(&#x27;netsh&#x27;,&#x27;ipsec&#x27;,&#x27;static&#x27;,&#x27;add&#x27;,&#x27;policy&#x27;, &#x27;name=&#x27; + PolicyName))

        LET action_cmdline(Action) = clean_cmdline(
             CMD=(&#x27;netsh&#x27;,&#x27;ipsec&#x27;,&#x27;static&#x27;,&#x27;add&#x27;,&#x27;filteraction&#x27;,
                  &#x27;name=&#x27; + PolicyName + &#x27; &#x27; + Action + &#x27;Action&#x27;,
                  &#x27;action=&#x27; + Action))

        LET rule_cmdline(Action) = clean_cmdline(
             CMD=(&#x27;netsh&#x27;,&#x27;ipsec&#x27;,&#x27;static&#x27;,&#x27;add&#x27;,&#x27;rule&#x27;,
                  &#x27;name=&#x27; + PolicyName + &#x27; &#x27; + Action + &#x27;Rule&#x27;,
                  &#x27;policy=&#x27; + PolicyName,
                  &#x27;filterlist=&#x27; + PolicyName + &#x27; &#x27; + Action + &#x27;FilterList&#x27;,
                  &#x27;filteraction=&#x27; + PolicyName + &#x27; &#x27; + Action + &#x27;Action&#x27;))

        LET enable_cmdline = clean_cmdline(
             CMD=(&#x27;netsh&#x27;,&#x27;ipsec&#x27;,&#x27;static&#x27;,&#x27;set&#x27;,&#x27;policy&#x27;,
                   &#x27;name=&#x27; + PolicyName, &#x27;assign=y&#x27;))

        // Emit the message if no output is emitted, otherwise emit the output.
        LET combine_results(Stdout, Stderr, ReturnCode, Message) = if(
              condition=Stdout =~ &quot;[^\\s]&quot;, then=Stdout,
              else= if(condition=Stderr =~ &quot;[^\\s]&quot;, then=Stderr,
              else= if(condition= ReturnCode=0,
                    then=Message )))

        // delete old or unwanted policy
        LET delete_policy = SELECT
              timestamp(epoch=now()) as Time,
              PolicyName + &#x27; IPSec policy removed.&#x27; AS Result
          FROM execve(argv=delete_cmdline, length=10000)

        // first step is creating IPSec policy
        LET create_policy = SELECT
              timestamp(epoch=now()) as Time,
              combine_results(Stdout=Stdout, Stderr=Stderr,
                  ReturnCode=ReturnCode,
                  Message=PolicyName + &#x27; IPSec policy created.&#x27;) AS Result
          FROM execve(argv=create_cmdline, length=10000)

        LET entry_cmdline(Action, SrcAddr, SrcPort, SrcMask,
                   DstAddr, DstPort, DstMask, Protocol,
                   Mirrored, Description) = clean_cmdline(
              CMD=(&#x27;netsh&#x27;,&#x27;ipsec&#x27;,&#x27;static&#x27;,&#x27;add&#x27;,&#x27;filter&#x27;,
                   format(format=&#x27;filterlist=%s %sFilterList&#x27;, args=[PolicyName, Action]),
                   format(format=&#x27;srcaddr=%v&#x27;, args=SrcAddr),
                   format(format=&#x27;srcmask=%v&#x27;, args=SrcMask),
                   format(format=&#x27;srcport=%v&#x27;, args=SrcPort),
                   format(format=&#x27;dstaddr=%v&#x27;, args=DstAddr),
                   format(format=&#x27;dstmask=%v&#x27;, args=DstMask),
                   format(format=&#x27;dstport=%v&#x27;, args=DstPort),
                   format(format=&#x27;protocol=%v&#x27;, args=Protocol),
                   format(format=&#x27;mirrored=%v&#x27;, args=Mirrored),
                   format(format=&#x27;description=%v&#x27;, args=Description)))

        // second step is to create policy filters
        LET create_filters = SELECT * FROM foreach(row=policy,
                  query={
                      SELECT
                          timestamp(epoch=now()) as Time,
                          combine_results(Stdout=Stdout, Stderr=Stderr,
                               ReturnCode=ReturnCode,
                               Message=&#x27;Entry added: &#x27; +
                                 join(array=entry_cmdline(Action=Action,
                                   SrcAddr=SrcAddr, SrcPort=SrcPort, SrcMask=SrcMask,
                                   DstAddr=DstAddr, DstPort=DstPort, DstMask=DstMask,
                                   Protocol=Protocol, Mirrored=Mirrored,
                                   Description=Description), sep=&quot; &quot;)) AS Result
                      FROM execve(argv=entry_cmdline(Action=Action,
                                   SrcAddr=SrcAddr, SrcPort=SrcPort, SrcMask=SrcMask,
                                   DstAddr=DstAddr, DstPort=DstPort, DstMask=DstMask,
                                   Protocol=Protocol, Mirrored=Mirrored,
                                   Description=Description), length=10000)
                  })

        // third step is to create policy filter actions
        LET create_actions = SELECT * FROM foreach(
                  row= {
                      SELECT Action
                      FROM policy
                      GROUP BY Action
                  },
                  query={
                      SELECT
                          timestamp(epoch=now()) as Time,
                          combine_results(Stdout=Stdout, Stderr=Stderr,
                               ReturnCode=ReturnCode,
                               Message=&#x27;FilterAction added: &#x27; +
                                 join(array=action_cmdline(Action=Action), sep=&quot; &quot;)) AS Result
                      FROM execve(argv=action_cmdline(Action=Action), length=10000)
                  })

        // fourth step combines action lists and actions in a Rule
        LET create_rules = SELECT * FROM foreach(
                  row= {
                      SELECT Action
                      FROM policy
                      GROUP BY Action
                  },
                  query={
                      SELECT
                          timestamp(epoch=now()) as Time,
                          combine_results(Stdout=Stdout, Stderr=Stderr,
                               ReturnCode=ReturnCode,
                               Message=&#x27;Rule added: &#x27; +
                                 join(array=rule_cmdline(Action=Action), sep=&quot; &quot;)) AS Result
                      FROM execve(argv=rule_cmdline(Action=Action), length=10000)
                  })

        // fith step is to enable our IPSec policy
        LET enable_policy = SELECT
              timestamp(epoch=now()) as Time,
              combine_results(Stdout=Stdout, Stderr=Stderr,
                  ReturnCode=ReturnCode,
                  Message=PolicyName + &#x27; IPSec policy applied.&#x27;) AS Result
              FROM execve(argv=enable_cmdline, length=10000)

        // test connection to a frontend server
        LET test_connection = SELECT * FROM foreach(
                  row={
                      SELECT * FROM policy
                      WHERE Description = &#x27;VelociraptorFrontEnd&#x27;
                  },
                  query={
                      SELECT *
                          Url,
                          response
                      FROM
                          http_client(url=&#x27;https://&#x27; + DstAddr + &#x27;:&#x27; + DstPort + &#x27;/server.pem&#x27;,
                              disable_ssl_security=&#x27;TRUE&#x27;)
                      WHERE Response = 200
                      LIMIT 1
                  })

        // final check to keep or remove policy
        LET final_check = SELECT * FROM if(condition= test_connection,
                  then={
                      SELECT
                          timestamp(epoch=now()) as Time,
                          if(condition=MessageBox,
                              then= PolicyName + &#x27; connection test successful. MessageBox sent.&#x27;,
                              else= PolicyName + &#x27; connection test successful.&#x27;
                              ) AS Result
                      FROM if(condition=MessageBox,
                          then= {
                              SELECT * FROM execve(argv=[&#x27;msg&#x27;,&#x27;*&#x27;,MessageBox])
                          },
                          else={
                              SELECT * FROM scope()
                          })
                  },
                  else={
                      SELECT
                          timestamp(epoch=now()) as Time,
                          PolicyName + &#x27; failed connection test. Removing IPSec policy.&#x27; AS Result
                      FROM delete_policy
                  })

        // Execute content
        SELECT * FROM if(condition=RemovePolicy,
                  then=delete_policy,
                  else={
                      SELECT * FROM chain(
                          a=delete_policy,
                          b=create_policy,
                          c=create_filters,
                          d=create_actions,
                          e=create_rules,
                          g=enable_policy,
                          h=final_check)
                  })

</code></pre>

