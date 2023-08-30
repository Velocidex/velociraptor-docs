---
title: Linux.Remediation.Quarantine
hidden: true
tags: [Client Artifact]
---

This artifact applies quarantine to Linux systems via nftables.
It expects the target system to have nftables installed, and
hence the availability of nft CLI.

This artifact will create a table, with the default name
*vrr_quarantine_table*, which contains three chains. One
for inbound traffic, one for outbound traffic, and the other
for forwarding traffic. The chains will cut off all traffics
except those for DNS lookup and velociraptor itself.

To unquarantine the system, set the *RemovePolicy* parameter to *True*.


<pre><code class="language-yaml">
name: Linux.Remediation.Quarantine
description: |
  This artifact applies quarantine to Linux systems via nftables.
  It expects the target system to have nftables installed, and
  hence the availability of nft CLI.

  This artifact will create a table, with the default name
  *vrr_quarantine_table*, which contains three chains. One
  for inbound traffic, one for outbound traffic, and the other
  for forwarding traffic. The chains will cut off all traffics
  except those for DNS lookup and velociraptor itself.

  To unquarantine the system, set the *RemovePolicy* parameter to *True*.

precondition: SELECT OS From info() where OS = &#x27;linux&#x27;

type: CLIENT

required_permissions:
  - EXECVE

parameters:
  - name: pathToNFT
    default: /usr/sbin/nft
    description: We depend on nft to manage the tables, chains, and rules.

  - name: TableName
    default: vrr_quarantine_table
    description: Name of the quarantine table

  - name: MessageBox
    description: |
        Optional message box notification to send to logged in users. 256
        character limit.

  - name: RemovePolicy
    type: bool
    description: Tickbox to remove policy.

sources:
  - query: |
     LET run_command(Cmd, Message) = SELECT timestamp(epoch=now()) as Time,
       format(format=&quot;Running %v: %v, Returned %v %v&quot;,
              args=[Cmd, Stdout || Stderr,
                    ReturnCode, Message || &quot;&quot;]) AS Result
     FROM  execve(argv=Cmd, length=10000)

     // If a MessageBox configured truncate to 256 character limit
     LET MessageBox &lt;= parse_string_with_regex(
               regex=&#x27;^(?P&lt;Message&gt;.{0,255}).*&#x27;,
               string=MessageBox).Message

     // Parse a URL to get domain name.
     LET get_domain(URL) = split(string=url(parse=URL).Host, sep=&quot;:&quot;)[0]
     LET get_port(URL) = if(condition=url(parse=URL).Host =~ &quot;:&quot;,
         then=split(string=url(parse=URL).Host, sep=&quot;:&quot;)[1],
         else=if(condition=url(parse=URL).Scheme = &quot;https&quot;,
                 then=&quot;443&quot;, else=&quot;80&quot;))

     // extract Velociraptor config for policy
     LET extracted_config &lt;= SELECT * FROM foreach(
               row=config.server_urls,
               query={
                   SELECT
                       get_domain(URL=_value) AS DstAddr,
                       get_port(URL=_value) AS DstPort,
                       &#x27;VelociraptorFrontEnd&#x27; AS Description,
                       _value AS URL
                   FROM scope()
               })

     // delete table
     LET delete_table_cmd = (pathToNFT, &#x27;delete&#x27;, &#x27;table&#x27;, &#x27;inet&#x27;, TableName)

     // add table
     LET add_table_cmd = (pathToNFT, &#x27;add&#x27;, &#x27;table&#x27;, &#x27;inet&#x27;, TableName)

     // add inbound chain
     LET add_inbound_chain_cmd = (
          pathToNFT, &#x27;add&#x27;, &#x27;chain&#x27;, &#x27;inet&#x27;, TableName, &#x27;inbound_chain&#x27;,
          &#x27;{&#x27;, &#x27;type&#x27;, &#x27;filter&#x27;, &#x27;hook&#x27;, &#x27;input&#x27;, &#x27;priority&#x27;, &#x27;0\;&#x27;, &#x27;policy&#x27;, &#x27;drop\;&#x27;, &#x27;}&#x27;)

     // add udp rule inbound chain to allow DNS lookups
     LET add_udp_rule_to_inbound_chain_cmd = (
          pathToNFT,&#x27;add&#x27;,&#x27;rule&#x27;,&#x27;inet&#x27;, TableName, &#x27;inbound_chain&#x27;,
          &#x27;udp&#x27;, &#x27;sport&#x27;, &#x27;domain&#x27;,
          &#x27;ct&#x27;, &#x27;state&#x27;, &#x27;established&#x27;, &#x27;accept&#x27;)

     // add outbound chain
     LET add_outbound_chain_cmd = (
          pathToNFT, &#x27;add&#x27;, &#x27;chain&#x27;, &#x27;inet&#x27;, TableName, &#x27;outbound_chain&#x27;,
          &#x27;{&#x27;, &#x27;type&#x27;, &#x27;filter&#x27;, &#x27;hook&#x27;, &#x27;output&#x27;, &#x27;priority&#x27;, &#x27;0\;&#x27;, &#x27;policy&#x27;, &#x27;drop\;&#x27;, &#x27;}&#x27;)

     // add tcp rule outbound chain to allow DNS traffics
     LET add_tcp_rule_to_outbound_chain_cmd = (
          pathToNFT, &#x27;add&#x27;, &#x27;rule&#x27;, &#x27;inet&#x27;, TableName, &#x27;outbound_chain&#x27;,
          &#x27;tcp&#x27;, &#x27;dport&#x27;, &#x27;{&#x27;, &#x27;53&#x27;, &#x27;}&#x27;,
          &#x27;ct&#x27;, &#x27;state&#x27;, &#x27;new,established&#x27;, &#x27;accept&#x27;)

     // add udp rule outbound chain to allow DNS and DHCP traffics
     LET add_udp_rule_to_outbound_chain_cmd = (
          pathToNFT,&#x27;add&#x27;,&#x27;rule&#x27;,&#x27;inet&#x27;, TableName, &#x27;outbound_chain&#x27;,
          &#x27;udp&#x27;, &#x27;dport&#x27;, &#x27;{&#x27;, &#x27;53,67,68&#x27;, &#x27;}&#x27;,
          &#x27;ct&#x27;, &#x27;state&#x27;, &#x27;new,established&#x27;, &#x27;accept&#x27;)

     // add forward chain
     LET add_forward_chain_cmd = (
          pathToNFT, &#x27;add&#x27;, &#x27;chain&#x27;, &#x27;inet&#x27;, TableName, &#x27;forward_chain&#x27;,
          &#x27;{&#x27;, &#x27;type&#x27;, &#x27;filter&#x27;, &#x27;hook&#x27;, &#x27;forward&#x27;, &#x27;priority&#x27;, &#x27;0\;&#x27;, &#x27;policy&#x27;, &#x27;drop\;&#x27;, &#x27;}&#x27;)


     // delete quarantine table
     LET delete_quarantine_table = SELECT
          timestamp(epoch=now()) as Time,
          TableName + &#x27; table removed.&#x27; AS Result
       FROM execve(argv=delete_table_cmd, length=10000)

     // add tcp rule to inbound_chain to allow connections from Velociraptor
     // FIXME(gye): may need to add IPv6 rules if DstAddr is an IPv6 address
     LET add_velociraptor_rule_to_inbound_chain = SELECT * FROM foreach(
          row={
              SELECT DstAddr, DstPort, (
                  pathToNFT, &#x27;add&#x27;, &#x27;rule&#x27;, &#x27;inet&#x27;, TableName, &#x27;inbound_chain&#x27;,

                  &#x27;ip&#x27;, &#x27;saddr&#x27;, DstAddr, &#x27;tcp&#x27;, &#x27;sport&#x27;, &#x27;{&#x27;, DstPort, &#x27;}&#x27;,
                  &#x27;ct&#x27;, &#x27;state&#x27;, &#x27;established&#x27;,
                  &#x27;accept&#x27;) AS add_velociraptor_rule_to_inbound_chain_cmd
              FROM extracted_config
          },
          query={
            SELECT * FROM run_command(Cmd=add_velociraptor_rule_to_inbound_chain_cmd,
                Message=&#x27;Added tcp rule to inbound_chain in &#x27; +  TableName + &#x27; table.&#x27;)
        })

     // add tcp rule to inbound_chain to allow connections from Velociraptor
     // FIXME(gye): may need to add IPv6 rules if DstAddr is an IPv6 address
     LET add_velociraptor_rule_to_outbound_chain = SELECT * FROM foreach(
          row={
              SELECT DstAddr, DstPort, (
                  pathToNFT, &#x27;add&#x27;, &#x27;rule&#x27;, &#x27;inet&#x27;, TableName, &#x27;outbound_chain&#x27;,
                  &#x27;ip&#x27;, &#x27;daddr&#x27;, DstAddr, &#x27;tcp&#x27;, &#x27;dport&#x27;, &#x27;{&#x27;, DstPort, &#x27;}&#x27;,
                  &#x27;ct&#x27;, &#x27;state&#x27;, &#x27;established,new&#x27;,
                  &#x27;accept&#x27;) AS add_velociraptor_rule_to_outbound_chain_cmd
              FROM extracted_config
          },
          query={
              SELECT * FROM run_command(
                 Cmd=add_velociraptor_rule_to_outbound_chain_cmd,
                 Message=&#x27;Added tcp rule to inbound_chain in &#x27; +
                    TableName + &#x27; table.&#x27;)
          })

     // test connection to a frontend server
     LET test_connection = SELECT * FROM foreach(
         row={
             SELECT DstAddr, DstPort, URL + &#x27;server.pem&#x27; AS pem_url
             FROM extracted_config
             WHERE log(message=&quot;Will check connectivity with &quot; + pem_url)
         },
         query={
             SELECT format(format=&quot;Testing connectivity with %v: %v&quot;, args=[Url, Response]) AS Result
             FROM http_client(url=pem_url, disable_ssl_security=&#x27;TRUE&#x27;)
             WHERE Response = 200
             LIMIT 1
         })

     // final check to keep or remove policy
     // TODO(gyee): for now we are using the wall commmand to send the message.
     // Will need to look into using libnotify instead.
     LET final_check = SELECT * FROM if(condition= test_connection,
               then={
                   SELECT
                       timestamp(epoch=now()) as Time,
                       if(condition=MessageBox,
                           then= TableName + &#x27; connection test successful. MessageBox sent.&#x27;,
                           else= TableName + &#x27; connection test successful.&#x27;
                       ) AS Result
                    FROM if(condition=MessageBox,
                        then= {
                            SELECT * FROM execve(argv=[&#x27;wall&#x27;, MessageBox])
                        },
                        else={
                            SELECT * FROM scope()
                        })
               },
               else=run_command(
                      Cmd=delete_table_cmd,
                      Message= TableName + &#x27; failed connection test. Removing quarantine table.&#x27;))

     LET check_nft_cmd = (pathToNFT, &quot;--version&quot;)

     // Execute content
     LET doit = SELECT * FROM if(condition=RemovePolicy,
               then=delete_quarantine_table,
               else={
                   SELECT * FROM chain(
                       a=delete_quarantine_table,
                       b=run_command(Cmd=add_table_cmd, Message=TableName + &#x27; added.&#x27;),
                       c=run_command(Cmd=add_inbound_chain_cmd,
                           Message=&#x27;Added inbound_chain to &#x27; +
                                    TableName + &#x27; table.&#x27;),
                       d=add_velociraptor_rule_to_inbound_chain,
                       e=run_command(Cmd=add_udp_rule_to_inbound_chain_cmd,
                           Message=&#x27;Added udp rule to inbound_chain in &#x27; +
                                     TableName + &#x27; table.&#x27;),
                       f=run_command(Cmd=add_outbound_chain_cmd,
                           Message=&#x27;Added outbound_chain to &#x27; +
                                     TableName + &#x27; table.&#x27;),
                       g=add_velociraptor_rule_to_outbound_chain,
                       h=run_command(Cmd=add_tcp_rule_to_outbound_chain_cmd,
                           Message=&#x27;Added tcp rule to outbound_chain in &#x27; +
                                     TableName + &#x27; table.&#x27;),
                       i=run_command(Cmd=add_udp_rule_to_outbound_chain_cmd,
                           Message=&#x27;Added udp rule to outbound_chain in &#x27; +
                                     TableName + &#x27; table.&#x27;),
                       j=run_command(Cmd=add_forward_chain_cmd,
                           Message=&#x27;Added forward_chain to &#x27; +
                                     TableName + &#x27; table.&#x27;),
                       k=final_check)
               })

     SELECT * FROM if(condition={
        SELECT * FROM run_command(
           Cmd=check_nft_cmd, Message=&#x27;Check for &#x27; + pathToNFT)
        WHERE Result =~ &quot;nftables&quot;
     }, then=doit,
     else={
       SELECT * FROM scope() WHERE log(level=&quot;ERROR&quot;,
            message=&quot;nftables is not installed - quarantine not supported&quot;)
            AND FALSE
       })

</code></pre>

