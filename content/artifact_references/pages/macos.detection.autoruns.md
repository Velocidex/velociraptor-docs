---
title: MacOS.Detection.Autoruns
hidden: true
tags: [Client Artifact]
---

This artifact collects evidence of autoruns. We also capture the files and upload them.

This code is based on
https://github.com/CrowdStrike/automactc/blob/master/modules/mod_autoruns_v102.py


<pre><code class="language-yaml">
name: MacOS.Detection.Autoruns
description: |
   This artifact collects evidence of autoruns. We also capture the files and upload them.

   This code is based on
   https://github.com/CrowdStrike/automactc/blob/master/modules/mod_autoruns_v102.py

precondition: SELECT OS FROM info() WHERE OS =~ &#x27;darwin&#x27;

parameters:
- name: sandboxed_loginitems
  default: /var/db/com.apple.xpc.launchd/disabled.*.plist

- name: cronTabGlob
  default: /private/var/at//tabs/*

- name: LaunchAgentsDaemonsGlob
  default: |
     [&quot;/System/Library/LaunchAgents/*.plist&quot;,&quot;/Library/LaunchAgents/*.plist&quot;,
      &quot;/Users/*/Library/LaunchAgents/*.plist&quot;,&quot;/private/var/*/Library/LaunchAgents/*.plist&quot;,
      &quot;/System/Library/LaunchAgents/.*.plist&quot;,&quot;/Library/LaunchAgents/.*.plist&quot;,
      &quot;/Users/*/Library/LaunchAgents/.*.plist&quot;, &quot;/private/var/*/Library/LaunchAgents/.*.plist&quot;,
      &quot;/System/Library/LaunchDaemons/*.plist&quot;,&quot;/Library/LaunchDaemons/*.plist&quot;,
      &quot;/System/Library/LaunchDaemons/.*.plist&quot;,&quot;/Library/LaunchDaemons/.*.plist&quot;]

- name: ScriptingAdditionsGlobs
  default: |
      [&quot;/System/Library/ScriptingAdditions/*.osax&quot;,&quot;/Library/ScriptingAdditions/*.osax&quot;,
       &quot;/System/Library/ScriptingAdditions/.*.osax&quot;,&quot;/Library/ScriptingAdditions/.*.osax&quot;]

- name: StartupItemsGlobs
  default: |
       [&quot;/System/Library/StartupItems/*/*&quot;,&quot;/Library/StartupItems/*/*&quot;]

- name: MiscItemsGlobs
  default: |
      [&quot;/private/etc/periodic.conf&quot;, &quot;/private/etc/periodic/*/*&quot;, &quot;/private/etc/*.local&quot;,
       &quot;/private/etc/rc.common&quot;,
       &quot;/private/etc/emond.d/*&quot;,&quot;/private/etc/emond.d/*/*&quot;]

- name: LoginItemsGlobs
  default: |
      [&quot;/Users/*/Library/Preferences/com.apple.loginitems.plist&quot;,
       &quot;/private/var/*/Library/Preferences/com.apple.loginitems.plist&quot;]

sources:
- name: Sandboxed Loginitems
  query: |
    SELECT OSPath,
           Mtime,
           plist(file=OSPath) AS Disabled,
           upload(file=OSPath) AS Upload
    FROM glob(globs=sandboxed_loginitems)

- name: crontabs
  query: |
    LET raw = SELECT * FROM foreach(
          row={
            SELECT OSPath, Name, Mtime,
                   upload(file=OSPath) AS Upload
            FROM glob(globs=split(string=cronTabGlob, sep=&quot;,&quot;))
          },
          query={
            SELECT OSPath, Name, Mtime, Upload,
              data, parse_string_with_regex(
               string=data,
               regex=[
                 /* Regex for event (Starts with @) */
                 &quot;^(?P&lt;Event&gt;@[a-zA-Z]+)\\s+(?P&lt;Command&gt;.+)&quot;,

                 /* Regex for regular command. */
                 &quot;^(?P&lt;Minute&gt;[^\\s]+)\\s+&quot;+
                 &quot;(?P&lt;Hour&gt;[^\\s]+)\\s+&quot;+
                 &quot;(?P&lt;DayOfMonth&gt;[^\\s]+)\\s+&quot;+
                 &quot;(?P&lt;Month&gt;[^\\s]+)\\s+&quot;+
                 &quot;(?P&lt;DayOfWeek&gt;[^\\s]+)\\s+&quot;+
                 &quot;(?P&lt;Command&gt;.+)$&quot;]) as Record

            /* Read lines from the file and filter ones that start with &quot;#&quot; */
            FROM split_records(
               filenames=OSPath,
               regex=&quot;\n&quot;, columns=[&quot;data&quot;]) WHERE not data =~ &quot;^\\s*#&quot;
            }) WHERE Record.Command

    SELECT Record.Event AS Event,
               Mtime,
               Name AS User,
               Record.Minute AS Minute,
               Record.Hour AS Hour,
               Record.DayOfMonth AS DayOfMonth,
               Record.Month AS Month,
               Record.DayOfWeek AS DayOfWeek,
               Record.Command AS Command,
               OSPath AS Path,
               Upload
    FROM raw

- name: LaunchAgentsDaemons
  query: |

    LET launchd_config = SELECT OSPath, Mtime,
           plist(file=OSPath) AS LaunchdConfig,
           upload(file=OSPath) AS Upload
    FROM glob(globs=parse_json_array(data=LaunchAgentsDaemonsGlob))

    LET programs = SELECT OSPath, Mtime, LaunchdConfig,
           get(member=&quot;LaunchdConfig.Program&quot;,
               default=get(member=&quot;LaunchdConfig.ProgramArguments.0&quot;)) AS Program
    FROM launchd_config

    SELECT OSPath, Mtime, LaunchdConfig,
           Program, hash(path=Program) AS Hash,
           upload(file=OSPath) AS Upload
    FROM programs

- name: ScriptingAdditions
  query: |
    SELECT OSPath,
           Mtime,
           upload(file=OSPath) AS Upload
    FROM glob(globs=parse_json_array(data=ScriptingAdditionsGlobs))

- name: StartupItems
  query: |
    SELECT OSPath,
           Mtime,
           upload(file=OSPath) AS Upload
    FROM glob(globs=parse_json_array(data=StartupItemsGlobs))

- name: MiscItems
  query: |
    SELECT OSPath,
           Mtime,
           upload(file=OSPath) AS Upload
    FROM glob(globs=parse_json_array(data=MiscItemsGlobs))

- name: LoginItems
  query: |
    SELECT OSPath,
           Mtime,
           plist(file=OSPath) AS LoginItemConfig,
           upload(file=OSPath) AS Upload
    FROM glob(globs=parse_json_array(data=LoginItemsGlobs))

</code></pre>

