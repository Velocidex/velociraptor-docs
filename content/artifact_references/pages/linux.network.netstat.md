---
title: Linux.Network.Netstat
hidden: true
tags: [Client Artifact]
---

This artifact will parse /proc and reveal information
about current network connections.


<pre><code class="language-yaml">
name: Linux.Network.Netstat
description: |
   This artifact will parse /proc and reveal information
   about current network connections.

type: CLIENT

parameters:
   - name: StateRegex
     type: regex
     default: &quot;Listening|Established&quot;
     description: Only show these states

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;linux&#x27;

    query: |
        -- Break down the address of the form 0100007F:22B9
        LET _X(x) = parse_string_with_regex(string=addr,
          regex=&quot;(..)(..)(..)(..):(....)&quot;)

        -- Unroll hex encoded IPv4 address into more usual form.
        LET ParseAddress(addr) = dict(
            IP=format(format=&quot;%d.%d.%d.%d&quot;, args=[
               int(int=&quot;0x&quot; + _X(x=addr).g4),
               int(int=&quot;0x&quot; + _X(x=addr).g3),
               int(int=&quot;0x&quot; + _X(x=addr).g2),
               int(int=&quot;0x&quot; + _X(x=addr).g1)]),
            Port=int(int=&quot;0x&quot; + _X(x=addr).g5)
        )

        -- https://elixir.bootlin.com/linux/latest/source/include/net/tcp_states.h#L14
        LET StateLookup &lt;= dict(
           `01`=&quot;Established&quot;,
           `02`=&quot;Syn Sent&quot;,
           `06`=&quot;Time Wait&quot;, -- No owner process
           `0A`=&quot;Listening&quot;
        )

        -- Enumerate all the sockets and cache them in memory for
        -- reverse lookup. The following is basically lsof.
        LET X = SELECT OSPath[2] AS Pid,
               Data.Link AS Filename,
               parse_string_with_regex(
                  string=Data.Link,
                  regex=&quot;(?P&lt;Type&gt;socket|pipe):\\[(?P&lt;inode&gt;[0-9]+)\\]&quot;) AS Details
        FROM glob(globs=&quot;/proc/*/fd/*&quot;)

        LET AllSockets &lt;= SELECT atoi(string=Pid) AS Pid,
               read_file(filename=&quot;/proc/&quot; + Pid + &quot;/comm&quot;) AS Command,
               read_file(filename=&quot;/proc/&quot; + Pid + &quot;/cmdline&quot;) AS CommandLine,
               Filename,
               Details.Type AS Type,
               Details.inode AS Inode
        FROM X
        WHERE Type =~ &quot;socket&quot;

        -- Parse the TCP table and refer back to the socket
        -- so we can print process info.
        SELECT inode, get(item=StateLookup, field=st) AS State, uid, {
                  SELECT * FROM AllSockets
                  WHERE Inode=inode
                  LIMIT 1
               } AS ProcessInfo,
               ParseAddress(addr=local_address) AS LocalAddr,
               ParseAddress(addr=rem_address) AS RemoteAddr
        FROM split_records(
             columns=[&quot;_&quot;, &quot;sl&quot;,&quot;local_address&quot;, &quot;rem_address&quot;, &quot;st&quot;, &quot;queues&quot;, &quot;tr_tm_when&quot;,
                      &quot;retransmit&quot;, &quot;uid&quot;, &quot;timeout&quot;, &quot;inode&quot;],
             filenames=&quot;/proc/net/tcp&quot;,
             regex=&quot; +&quot;)
        WHERE sl =~ &quot;:&quot;  -- Remove header row
          AND State =~ StateRegex

</code></pre>

