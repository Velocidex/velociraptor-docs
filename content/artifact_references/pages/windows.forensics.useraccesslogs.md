---
title: Windows.Forensics.UserAccessLogs
hidden: true
tags: [Client Artifact]
---

Parse and collect the SUM database

UAL is a feature that can help server administrators quantify the
number of unique client requests of roles and services on a local
server.

The UAL only exists on Windows Server edition 2012 and above.

NOTE: Unlike other tools, Velociraptor DOES NOT use the JET API to
access the database because it has a builtin ESE parser. This means
that you **do not need to repair** the files using `eseutil.exe` as
is commonly explained in the references below. Velociraptor should
have no trouble parsing these files on the live system.


<pre><code class="language-yaml">
name: Windows.Forensics.UserAccessLogs
description: |
  Parse and collect the SUM database

  UAL is a feature that can help server administrators quantify the
  number of unique client requests of roles and services on a local
  server.

  The UAL only exists on Windows Server edition 2012 and above.

  NOTE: Unlike other tools, Velociraptor DOES NOT use the JET API to
  access the database because it has a builtin ESE parser. This means
  that you **do not need to repair** the files using `eseutil.exe` as
  is commonly explained in the references below. Velociraptor should
  have no trouble parsing these files on the live system.

reference:
  - https://advisory.kpmg.us/blog/2021/digital-forensics-incident-response.html
  - https://docs.microsoft.com/en-us/windows-server/administration/user-access-logging/manage-user-access-logging
  - https://www.crowdstrike.com/blog/user-access-logging-ual-overview/

export: |
    LET IPProfile = &#x27;&#x27;&#x27;[
      [&quot;X&quot;, 0, [
        [&quot;A&quot;, 0, &quot;uint8&quot;],
        [&quot;B&quot;, 1, &quot;uint8&quot;],
        [&quot;C&quot;, 2, &quot;uint8&quot;],
        [&quot;D&quot;, 3, &quot;uint8&quot;],
        [&quot;IP&quot;, 0, &quot;Value&quot;, {
           value: &quot;x=&gt; format(format=&#x27;%d.%d.%d.%d&#x27;, args=[x.A, x.B, x.C, x.D])&quot;
        }]
      ]]
    ]&#x27;&#x27;&#x27;

    -- Format the address - it can be IPv4, IPv6 or something else.
    LET FormatAddress(Address) = if(condition=len(list=Address) = 4,

         -- IPv4 address should be formatted in dot notation
         then=parse_binary(accessor=&quot;data&quot;,
                           filename=Address, struct=&quot;X&quot;,
                           profile=IPProfile).IP,
         else=if(condition=len(list=Address)=16,
           -- IPv6 addresses are usually shortened
           then=regex_replace(source=format(format=&quot;%x&quot;, args=Address),
                              re=&quot;(00)+&quot;, replace=&quot;:&quot;),

           -- We dont know what kind of address it is.
           else=format(format=&quot;%x&quot;, args=Address)))

    -- Get the Clients table from all snapshot files.
    LET SystemIdentity = SELECT OSPath FROM glob(globs=SUMGlob)
      WHERE Name =~ &quot;SystemIdentity.mdb&quot;

    -- Prepare a Role lookup to resolve the role GUID
    LET RoleLookup &lt;= memoize(key=&quot;RoleGuid&quot;, query={
      SELECT * FROM foreach(row=SystemIdentity, query={
         SELECT * FROM parse_ese(file=OSPath, table=&quot;ROLE_IDS&quot;)
         WHERE log(message=&quot;RoleGuid &quot; + RoleGuid)
      })
    })

parameters:
    - name: SUMGlob
      type: glob
      default: C:/Windows/System32/LogFiles/Sum/*
      description: A glob to file all SUM ESE databases on the system.
    - name: AlsoUpload
      type: bool
      description: If set we also upload the raw files.

sources:
    - name: SystemIdentity
      description: Parse the SystemIdentity database.
      query: |
        SELECT * FROM foreach(row=SystemIdentity, query={
           SELECT *, OSPath AS _OSPath
           FROM parse_ese(file=OSPath, table=&quot;SYSTEM_IDENTITY&quot;)
        })

    - name: Chained Databases
      query: |
        SELECT * FROM foreach(row=SystemIdentity, query={
          SELECT *, OSPath AS _OSPath
          FROM parse_ese(file=OSPath, table=&quot;CHAINED_DATABASES&quot;)
        })

    - name: RoleIds
      query: |
        SELECT * FROM foreach(row=SystemIdentity, query={
           SELECT *, OSPath AS _OSPath
           FROM parse_ese(file=OSPath, table=&quot;ROLE_IDS&quot;)
        })

    - name: Clients
      description: Dump the clients database from all ESE files
      query: |
        LET ContentDatabases =  SELECT * FROM glob(globs=SUMGlob)
           WHERE Name =~ &quot;.mdb&quot; AND NOT Name =~ &quot;SystemIdentity&quot;

        -- The clients table has potentially 365 columns (1 per day) so we
        -- format it a bit better by putting the Day* columns in their own dict.
        LET GetClients(OSPath) = SELECT *, OSPath AS _OSPath
             FROM foreach(row={
            SELECT to_dict(item={
                   SELECT _key, _value FROM items(item=_value)
                   WHERE NOT _key =~ &quot;Day&quot;
               })  +
               dict(Days=to_dict(item={
                   SELECT _key, _value FROM items(item=_value)
                   WHERE _key =~ &quot;Day&quot;
               })) AS Value
            FROM items(item={
               SELECT *, get(item=RoleLookup, field=RoleGuid).RoleName AS RoleName,
                  Address AS RawAddress,
                  FormatAddress(Address=unhex(string=Address)) AS Address
               FROM parse_ese(file=OSPath, table=&quot;CLIENTS&quot;)
            })
        }, column=&quot;Value&quot;)

        -- Get the Clients table from all snapshot files.
        SELECT * FROM foreach(row=ContentDatabases, query={
          SELECT * FROM GetClients(OSPath=OSPath)
        })

    - name: VIRTUALMACHINES
      query: |
        SELECT * FROM foreach(row=ContentDatabases, query={
           SELECT *, OSPath AS _OSPath
           FROM parse_ese(file=OSPath, table=&quot;VIRTUALMACHINES&quot;)
        })

    - name: DNS
      query: |
        SELECT * FROM foreach(row=ContentDatabases, query={
           SELECT *, OSPath AS _OSPath
           FROM parse_ese(file=OSPath, table=&quot;DNS&quot;)
        })

    - name: Uploads
      query: |
        SELECT OSPath, if(condition=AlsoUpload, then=upload(file=OSPath))
        FROM glob(globs=SUMGlob)

</code></pre>

