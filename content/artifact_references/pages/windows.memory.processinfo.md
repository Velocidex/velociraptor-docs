---
title: Windows.Memory.ProcessInfo
hidden: true
tags: [Client Artifact]
---

This artifact returns process information obtained by parsing the PEB directly.

Renamed Windows.Forensics.ProcessInfo


<pre><code class="language-yaml">
name: Windows.Memory.ProcessInfo
description: |
   This artifact returns process information obtained by parsing the PEB directly.

   Renamed Windows.Forensics.ProcessInfo

parameters:
  - name: ProcessNameRegex
    default: .
    type: regex
  - name: PidRegex
    default: .
    type: regex
  - name: ImagePathRegex
    default: .
    type: regex
  - name: CommandLineRegex
    default: .
    type: regex

sources:
- query: |
       LET profile = &#x27;&#x27;&#x27;[
       [&quot;PEB&quot;,0 , [
           # https://docs.microsoft.com/en-us/windows/win32/api/winternl/ns-winternl-peb
           [&quot;ProcessParameters&quot;, 32, &quot;Pointer&quot;, {
                &quot;type&quot;: &quot;ProcessParameters&quot;,
           }],
       ]],
       [&quot;ProcessParameters&quot;, 0, [
          [&quot;ImagePathName&quot;, 96, &quot;UNICODE_STRING&quot;],
          [&quot;CommandLine&quot;, 112, &quot;UNICODE_STRING&quot;],
          [&quot;CurrentDirectory&quot;, 56, &quot;CURDIR&quot;],
          [&quot;EnvironmentSize&quot;, 1008, &quot;uint64&quot;],
          [&quot;Environment&quot;, 128, &quot;Pointer&quot;, {
              &quot;type&quot;: &quot;String&quot;,
              &quot;type_options&quot;: {
                 &quot;length&quot;: &quot;x=&gt;x.EnvironmentSize&quot;,
                 &quot;encoding&quot;: &quot;utf16&quot;,
                 &quot;max_length&quot;: 10000,
                 &quot;term&quot;: &quot;&quot;,
              }}]
       ]],
       [&quot;CURDIR&quot;, 0, [
         [&quot;DosPath&quot;, 0, &quot;UNICODE_STRING&quot;],
       ]],
       [&quot;UNICODE_STRING&quot;, 16, [
          [&quot;Length&quot;, 0, &quot;uint16&quot;],
          [&quot;Buffer&quot;, 8, &quot;Pointer&quot;, {
              &quot;type&quot;: &quot;String&quot;,
              &quot;type_options&quot;: {
                &quot;encoding&quot;: &quot;utf16&quot;,
                &quot;length&quot;: &quot;x=&gt;x.Length&quot;,
                &quot;term&quot;: &quot;&quot;,
              }}],
       ]]
       ]&#x27;&#x27;&#x27;

       LET ParsePeb(PID) = SELECT Name,
           format(format=&quot;%0#x&quot;, args=PebBaseAddress) AS PebBaseAddress, Pid,
           parse_binary(accessor=&quot;process&quot;,
                        filename=format(format=&quot;/%v&quot;, args=PID),
                        profile=profile,
                        struct=&quot;PEB&quot;,
                        offset=PebBaseAddress) AS Data
       FROM pslist(pid=PID)

       -- The Environment string consists of null terminated
       -- lines. Each line contains the variable name followed by an =
       -- sign and then the variable value.
       LET SplitEnv(EnvString) =  SELECT parse_string_with_regex(
          string=_value, regex=&quot;^(?P&lt;Name&gt;[^=]*)=(?P&lt;Value&gt;.+)&quot;) AS Line
       FROM foreach(row=split(string=EnvString, sep=&quot;\x00&quot;))
       WHERE Line

       -- Massage the parsed data into a structured table
       LET Calculate(PID) = SELECT Name, PebBaseAddress, Pid,
              Data.ProcessParameters.ImagePathName.Buffer AS ImagePathName,
              Data.ProcessParameters.CommandLine.Buffer AS CommandLine,
              Data.ProcessParameters.CurrentDirectory.DosPath.Buffer AS CurrentDirectory,
              -- Build an Env dict out of the parsed string.
              to_dict(item={
                 SELECT Line.Name AS _key, Line.Value AS _value
                 FROM SplitEnv(EnvString=Data.ProcessParameters.Environment)
              }) AS Env
        FROM ParsePeb(PID=PID)

        SELECT * FROM foreach(row={
            SELECT Pid FROM pslist()
            WHERE Name =~ ProcessNameRegex
              AND str(str=Pid) =~ PidRegex
              AND str(str=ImagePathName) =~ ImagePathRegex
              AND str(str=CommandLine) =~ CommandLineRegex
        }, query={
            SELECT * FROM Calculate(PID=Pid)
        })

</code></pre>

