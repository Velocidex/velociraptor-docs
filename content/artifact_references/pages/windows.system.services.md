---
title: Windows.System.Services
hidden: true
tags: [Client Artifact]
---

List Service details.


<pre><code class="language-yaml">
name: Windows.System.Services
description: |
  List Service details.

parameters:
  - name: servicesKeyGlob
    default: HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\
  - name: Calculate_hashes
    default: N
    type: bool
  - name: CertificateInfo
    default: N
    type: bool
  - name: NameRegex
    default: .
    type: regex
  - name: DisplayNameRegex
    default: .
    type: regex
  - name: PathNameRegex
    default: .
    type: regex
  - name: ServiceDllRegex
    default: .
    type: regex
  - name: FailureCommandRegex
    default: .
    type: regex

export: |
    LET Profile = &#x27;&#x27;&#x27;
        [
        [&quot;ServiceFailureActions&quot;, 0, [
          [&quot;ResetPeriod&quot;, 0, &quot;uint32&quot;],
          [&quot;__ActionsCount&quot;, 12, &quot;uint32&quot;],
          [&quot;__lpsaActionsHeader&quot;, 16, &quot;uint32&quot;],
          [&quot;FailureAction&quot;, &quot;x=&gt;x.__lpsaActionsHeader&quot;, &quot;Array&quot;, {
              &quot;type&quot;: &quot;ServiceAction&quot;,
              &quot;count&quot;: &quot;x=&gt;x.__ActionsCount&quot;
          }]
        ]],
        [&quot;ServiceAction&quot;, 8, [
            [&quot;Type&quot;, 0, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;SC_ACTION_NONE&quot;: 0,
                    &quot;SC_ACTION_RESTART&quot;: 1,
                    &quot;SC_ACTION_REBOOT&quot;: 2,
                    &quot;SC_ACTION_RUN_COMMAND&quot;: 3,
                }}],
            [&quot;__DelayMsec&quot;, 4, &quot;uint32&quot;],
            [&quot;Delay&quot;, 4,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;x.__DelayMsec/1000&quot; }],
        ]],
      ]
      &#x27;&#x27;&#x27;

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query: |
      LET service &lt;= SELECT State, Name, DisplayName, Status,
            ProcessId as Pid, ExitCode, StartMode,
            PathName, ServiceType, StartName as UserAccount,
            {
                SELECT Mtime as Created
                FROM stat(filename=servicesKeyGlob + Name, accessor=&#x27;registry&#x27;)
            } AS Created,
            {
                SELECT expand(path=ServiceDll) AS ServiceDll
                FROM read_reg_key(globs=servicesKeyGlob + Name + &quot;\\Parameters&quot;)
                LIMIT 1
            } AS ServiceDll,
            {
                SELECT FailureCommand FROM read_reg_key(globs=servicesKeyGlob + Name)
                LIMIT 1
            } AS FailureCommand,
            {
                SELECT if(condition=FailureActions,
                   then=parse_binary(accessor=&#x27;data&#x27;,
                                     filename= FailureActions || &quot; &quot;,
                                     profile=Profile,
                                     struct=&#x27;ServiceFailureActions&#x27;)) as FailureActions
                FROM read_reg_key(globs=servicesKeyGlob + Name)
            } AS FailureActions,
            expand(path=parse_string_with_regex(regex=
                [&#x27;^&quot;(?P&lt;AbsoluteExePath&gt;[^&quot;]+)&#x27;,&#x27;(?P&lt;AbsoluteExePath&gt;^[^ &quot;]+)&#x27;],
                string=PathName).AbsoluteExePath) as AbsoluteExePath
        FROM wmi(query=&quot;SELECT * From Win32_service&quot;, namespace=&quot;root/CIMV2&quot;)
        WHERE Name =~ NameRegex
            AND DisplayName =~ DisplayNameRegex
            AND PathName =~ PathNameRegex
            AND if(condition=ServiceDll, then=ServiceDll =~ ServiceDllRegex, else=TRUE)
            AND if(condition=FailureCommand, then=FailureCommand =~ FailureCommandRegex, else=TRUE)

      SELECT *,
        if(condition=Calculate_hashes,
            then=hash(path=AbsoluteExePath, accessor=&quot;auto&quot;)) AS HashServiceExe,
                 if(condition=CertificateInfo,
                    then=authenticode(filename=AbsoluteExePath || &quot; &quot;)) AS CertinfoServiceExe,
                 if(condition=Calculate_hashes,
                    then=hash(path=ServiceDll || &quot; &quot;,accessor=&quot;auto&quot;)) AS HashServiceDll,
                 if(condition=CertificateInfo,
                    then=authenticode(filename=ServiceDll || &quot; &quot;)) AS CertinfoServiceDll
      FROM service

</code></pre>

