---
title: Windows.Network.PacketCapture
hidden: true
tags: [Client Artifact]
---

Run this artifact twice, the first time, set the StartTrace flag to
True to start the PCAP collection, this will have the VQL return a
single row (the TraceFile generated) When you want to stop
collecting, and transform this TraceFile to a PCAP, re-run this
artifact with StartTrace as false, and put path of the .etl file
created in the previous step in the TraceFile. This will then
convert the .etl to a PCAP and upload it.


<pre><code class="language-yaml">
name: Windows.Network.PacketCapture
author: Cybereason &lt;omer.yampel@cybereason.com&gt;
description: |
  Run this artifact twice, the first time, set the StartTrace flag to
  True to start the PCAP collection, this will have the VQL return a
  single row (the TraceFile generated) When you want to stop
  collecting, and transform this TraceFile to a PCAP, re-run this
  artifact with StartTrace as false, and put path of the .etl file
  created in the previous step in the TraceFile. This will then
  convert the .etl to a PCAP and upload it.

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

tools:
    - name: etl2pcapng
      url: https://github.com/microsoft/etl2pcapng/releases/download/v1.4.0/etl2pcapng.zip

parameters:
    - name: StartTrace
      type: bool
      default: Y
    - name: TraceFile
      type: string
      default:

sources:
    - query: |
        LET tool_zip = SELECT * FROM Artifact.Generic.Utils.FetchBinary(
            ToolName=&quot;etl2pcapng&quot;, IsExecutable=FALSE)

        LET ExePath &lt;= tempfile(extension=&#x27;.exe&#x27;)

        LET etl2pcapbin &lt;= SELECT
            copy(
              filename=pathspec(
                 DelegatePath=tool_zip[0].OSPath,
                 Path=&quot;etl2pcapng/x64/etl2pcapng.exe&quot;),
              dest=ExePath,
              accessor=&#x27;zip&#x27;
            ) AS file
        FROM scope()

        LET outfile &lt;= tempfile(extension=&quot;.pcapng&quot;)

        LET stop_trace = SELECT * FROM execve(
             argv=[&#x27;netsh&#x27;, &#x27;trace&#x27;, &#x27;stop&#x27;])

        LET convert_pcap = SELECT * FROM execve(
             argv=[etl2pcapbin[0].file, TraceFile, outfile])

        LET end_trace = SELECT * FROM chain(
                a=stop_trace,
                b=convert_pcap,
                c={SELECT upload(file=outfile) AS Upload FROM scope()},
                d={SELECT upload(file=TraceFile) AS Upload FROM scope()}
            )

        LET launch_trace =
                SELECT
                    split(string=split(
                        string=Stdout,
                        sep=&quot;Trace File: &quot;)[1],
                    sep=&quot;\r\nAppend:&quot;)[0] as etl_file
                FROM execve(argv=[&quot;netsh&quot;, &quot;trace&quot;, &quot;start&quot;, &quot;capture=yes&quot;])
                WHERE log(message=&quot;stderr: &quot; + Stderr), log(message=&quot;stdout: &quot; + Stdout)

        SELECT * FROM if(
                condition=StartTrace,
                then={ SELECT * FROM launch_trace},
                else={ SELECT * FROM end_trace }
        )

</code></pre>

