---
title: Windows.ETW.ViewSessions
hidden: true
tags: [Client Artifact]
---

This artifact enumerates all ETW sessions and optionally kills dangling ones


<pre><code class="language-yaml">
name: Windows.ETW.ViewSessions
description: |
  This artifact enumerates all ETW sessions and optionally kills dangling ones

required_permissions:
  - EXECVE

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;
parameters:
  - name: SessionRegex
    default: &quot;Velociraptor&quot;
    type: regex
  - name: KillMatching
    type: bool
    description: If set will kill the relevant sessions.


sources:
  - query: |
      SELECT * FROM foreach(row={
         SELECT Stdout, parse_string_with_regex(string=Stdout, regex=&quot;(^[^ ]+)&quot;).g1 AS SessionName
         from execve(argv=[&quot;logman&quot;, &quot;query&quot;, &quot;-ets&quot;], sep=&quot;\n&quot;)
         WHERE Stdout =~ &quot;Running&quot; AND SessionName =~ SessionRegex
      }, query={
         SELECT * FROM if(condition=KillMatching,
         then={
             SELECT SessionName, Stdout FROM execve(argv=[&quot;logman&quot;, &quot;stop&quot;, SessionName, &quot;-ets&quot;])
         }, else={
             SELECT SessionName FROM scope()
         })
      })

</code></pre>

