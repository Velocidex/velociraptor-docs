---
title: Linux.Network.NetstatEnriched
hidden: true
tags: [Client Artifact]
---

Report network connections, and enrich with process information.


<pre><code class="language-yaml">
name: Linux.Network.NetstatEnriched
description: |
  Report network connections, and enrich with process information.

type: CLIENT

precondition:
  SELECT OS From info() where OS = &#x27;linux&#x27;

parameters:
  - name: IPRegex
    description: &quot;regex search over IP address fields.&quot;
    default:  &quot;.&quot;
    type: regex
  - name: PortRegex
    description: &quot;regex search over port fields.&quot;
    default: &quot;.&quot;
    type: regex
  - name: ProcessNameRegex
    description: &quot;regex search over source process name&quot;
    default: &quot;.&quot;
    type: regex
  - name: UsernameRegex
    description: &quot;regex search over source process user context&quot;
    default: &quot;.&quot;
    type: regex
  - name: ConnectionStatusRegex
    description: &quot;regex search over connection status&quot;
    default: &quot;LISTEN|ESTABLISHED&quot;
    type: regex
  - name: ProcessPathRegex
    description: &quot;regex search over source process path&quot;
    default: &quot;.&quot;
    type: regex
  - name: CommandLineRegex
    description: &quot;regex search over source process commandline&quot;
    default: &quot;.&quot;
    type: regex
  - name: CallChainRegex
    description: &quot;regex search over the process callchain&quot;
    default: &quot;.&quot;
    type: regex


sources:
  - query: |
      SELECT Laddr.IP AS Laddr,
             Laddr.Port AS Lport,
             Raddr.IP AS Raddr,
             Raddr.Port AS Rport,
             Pid,
             Status,
             process_tracker_get(id=Pid).Data AS ProcInfo,
             join(array=process_tracker_callchain(id=Pid).Data.Name, sep=&quot; -&gt; &quot;) AS CallChain,
             process_tracker_tree(id=Pid) AS ChildrenTree
      FROM connections()
      WHERE Status =~ ConnectionStatusRegex
       AND  Raddr =~ IPRegex
       AND  ( Lport =~ PortRegex OR Rport =~ PortRegex )
       AND ProcInfo.Name =~ ProcessNameRegex
       AND ProcInfo.Username =~ UsernameRegex
       AND ProcInfo.Exe =~ ProcessPathRegex
       AND ProcInfo.CommandLine =~ CommandLineRegex
       AND CallChain =~ CallChainRegex

column_types:
  - name: ChildrenTree
    type: tree

</code></pre>

