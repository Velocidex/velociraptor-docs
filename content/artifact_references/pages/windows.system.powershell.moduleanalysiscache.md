---
title: Windows.System.Powershell.ModuleAnalysisCache
hidden: true
tags: [Client Artifact]
---

ModuleAnalysisCache stores metadata about loaded Powershell modules.

Recent updates include filters by regex to enable targeted hunting
use cases.


<pre><code class="language-yaml">
name: Windows.System.Powershell.ModuleAnalysisCache
description: |
    ModuleAnalysisCache stores metadata about loaded Powershell modules.

    Recent updates include filters by regex to enable targeted hunting
    use cases.

reference:
 - https://github.com/PowerShell/PowerShell/blob/281b437a65360ae869d40f3766a1f2bbba786e5e/src/System.Management.Automation/engine/Modules/AnalysisCache.cs#L649

parameters:
  - name: GlobLookup
    default: C:\{Users\*,Windows\System32\config\systemprofile}\AppData\Local\Microsoft\Windows\PowerShell\ModuleAnalysisCache
  - name: ModulePathRegex
    description: Regex of installed ModulePath to target.
    default: .
    type: regex
  - name: ModulePathIgnoreRegex
    description: Regex of installed ModulePath to ignore.
    type: regex
  - name: FunctionNameRegex
    description: Regex of FunctionName to include.
    default: .
    type: regex

sources:
  - query: |
      LET Profile = &#x27;
       [
         [&quot;Header&quot;, 0, [
           [&quot;Signature&quot;, 0, &quot;String&quot;, {&quot;length&quot;: 13}],
           [&quot;CountOfEntries&quot;, 14, &quot;uint32&quot;],
           [&quot;Entries&quot;, 18, &quot;Array&quot;,
                 {&quot;type&quot;: &quot;Entry&quot;, &quot;count&quot;: &quot;x =&gt; x.CountOfEntries&quot;}]
         ]],

         [&quot;Entry&quot;, &quot;x=&gt;x.Func.SizeOf + x.ModuleLength + 20&quot;, [
           [&quot;Offset&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x =&gt; x.StartOf&quot;}],
           [&quot;TimestampTicks&quot;, 0, &quot;uint64&quot;],
           [&quot;ModuleLength&quot;, 8, &quot;uint32&quot;],
           [&quot;ModuleName&quot;, 12, &quot;String&quot;, {&quot;length&quot;: &quot;x =&gt; x.ModuleLength&quot;}],
           [&quot;CommandCount&quot;, &quot;x =&gt; x.ModuleLength + 12&quot;, &quot;uint32&quot;],
           [&quot;Func&quot;, &quot;x =&gt; x.ModuleLength + 16&quot;, &quot;Array&quot;,
                  {&quot;type&quot;: &quot;FunctionInfo&quot;, &quot;count&quot;: &quot;x =&gt; x.CommandCount&quot;}],
           [&quot;CountOfTypes&quot;, &quot;x =&gt; x.Func.EndOf&quot;, &quot;uint32&quot;]
         ]],

         [&quot;FunctionInfo&quot;, &quot;x =&gt; x.NameLen + 8&quot;, [
           [&quot;NameLen&quot;, 0, &quot;uint32&quot;],
           [&quot;Name&quot;, 4, &quot;String&quot;, {&quot;length&quot;: &quot;x =&gt; x.NameLen&quot;}],
           [&quot;Count&quot;, &quot;x =&gt; x.NameLen + 4&quot;, &quot;uint32&quot;]
         ]]
       ]
      &#x27;
      LET parsed = SELECT OSPath,
         parse_binary(filename=OSPath, profile=Profile, struct=&quot;Header&quot;) AS Header
      FROM glob(globs=GlobLookup)

      SELECT * FROM foreach(row=parsed,
      query={
         SELECT * FROM foreach(row=Header.Entries,
         query={
            SELECT OSPath, ModuleName,
                  timestamp(epoch=TimestampTicks/10000000 - 62136892800) AS Timestamp,
                  Func.Name AS Functions
            FROM scope()
            WHERE ModuleName =~ ModulePathRegex
                AND NOT if(condition= ModulePathIgnoreRegex,
                            then= ModuleName =~ ModulePathIgnoreRegex,
                            else= False )
                AND filter(list=Functions,regex=FunctionNameRegex)
         })
      })

</code></pre>

