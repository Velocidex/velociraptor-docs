---
title: Generic.Client.Info
hidden: true
tags: [Client Artifact]
---

Collect basic information about the client.

This artifact is collected when any new client is enrolled into the
system. Velociraptor will watch for this artifact and populate its
internal indexes from this artifact as well.

You can edit this artifact to enhance the client's interrogation
information as required, by adding new sources.

NOTE: Do not modify the BasicInformation source since it is used to
interrogate the clients.


<pre><code class="language-yaml">
name: Generic.Client.Info
description: |
  Collect basic information about the client.

  This artifact is collected when any new client is enrolled into the
  system. Velociraptor will watch for this artifact and populate its
  internal indexes from this artifact as well.

  You can edit this artifact to enhance the client&#x27;s interrogation
  information as required, by adding new sources.

  NOTE: Do not modify the BasicInformation source since it is used to
  interrogate the clients.

sources:
  - name: BasicInformation
    description: |
      This source is used internally to populate agent info. Do not
      modify or remove this query.
    query: |
        LET Interfaces = SELECT format(format=&#x27;%02x:%02x:%02x:%02x:%02x:%02x&#x27;,
            args=HardwareAddr) AS MAC
        FROM interfaces()
        WHERE HardwareAddr

        SELECT config.Version.Name AS Name,
               config.Version.BuildTime as BuildTime,
               config.Version.Version as Version,
               config.Version.ci_build_url AS build_url,
               config.Version.install_time as install_time,
               config.Labels AS Labels,
               Hostname, OS, Architecture,
               Platform, PlatformVersion, KernelVersion, Fqdn,
               Interfaces.MAC AS MACAddresses
        FROM info()

  - name: WindowsInfo
    description: Windows specific information about the host
    precondition: SELECT OS From info() where OS = &#x27;windows&#x27;
    query: |
      LET DomainLookup &lt;= dict(
         `0`=&#x27;Standalone Workstation&#x27;,
         `1`=&#x27;Member Workstation&#x27;,
         `2`=&#x27;Standalone Server&#x27;,
         `3`=&#x27;Member Server&#x27;,
         `4`=&#x27;Backup Domain Controller&#x27;,
         `5`=&#x27;Primary Domain Controller&#x27;)

      SELECT
          {
            SELECT DNSHostName, Name, Domain, TotalPhysicalMemory,
                   get(item=DomainLookup,
                       field=str(str=DomainRole), default=&quot;Unknown&quot;) AS DomainRole
            FROM wmi(
               query=&#x27;SELECT * FROM win32_computersystem&#x27;)
          } AS `Computer Info`,
          {
            SELECT Caption,
               join(array=IPAddress, sep=&quot;, &quot;) AS IPAddresses,
               join(array=IPSubnet, sep=&quot;, &quot;) AS IPSubnet,
               MACAddress,
               join(array=DefaultIPGateway, sep=&quot;, &quot;) AS DefaultIPGateway,
               DNSHostName,
               join(array=DNSServerSearchOrder, sep=&quot;, &quot;) AS DNSServerSearchOrder
            FROM wmi(
               query=&quot;SELECT * from Win32_NetworkAdapterConfiguration&quot; )
            WHERE IPAddress
          } AS `Network Info`
      FROM scope()

    notebook:
      - type: vql_suggestion
        name: &quot;Enumerate Domain Roles&quot;
        template: |
          /*
          # Enumerate Domain Roles

          Search all clients&#x27; enrollment information for their domain roles.
          */
          --
          -- Remove the below comments to label Domain Controllers
          SELECT *--, label(client_id=client_id, labels=&quot;DomainController&quot;, op=&quot;set&quot;) AS Label
          FROM foreach(row={
             SELECT * FROM clients()
          }, query={
              SELECT
                `Computer Info`.Name AS Name, client_id,
                `Computer Info`.DomainRole AS DomainRole
              FROM source(client_id=client_id,
                  flow_id=last_interrogate_flow_id,
                  artifact=&quot;Generic.Client.Info/WindowsInfo&quot;)
          })
          -- WHERE DomainRole =~ &quot;Controller&quot;

  - name: Users
    precondition: SELECT OS From info() where OS = &#x27;windows&#x27;
    query: |
      SELECT Name, Description, Mtime AS LastLogin
      FROM Artifact.Windows.Sys.Users()

reports:
  - type: CLIENT
    template: |
      {{ $client_info := Query &quot;SELECT * FROM clients(client_id=ClientId) LIMIT 1&quot; | Expand }}

      {{ $flow_id := Query &quot;SELECT timestamp(epoch=active_time / 1000000) AS Timestamp FROM flows(client_id=ClientId, flow_id=FlowId)&quot; | Expand }}

      # {{ Get $client_info &quot;0.os_info.fqdn&quot; }} ( {{ Get $client_info &quot;0.client_id&quot; }} ) @ {{ Get $flow_id &quot;0.Timestamp&quot; }}

      {{ Query &quot;SELECT * FROM source(source=&#x27;BasicInformation&#x27;)&quot; | Table }}

      # Memory and CPU footprint over the past 24 hours

      {{ define &quot;resources&quot; }}
       SELECT * FROM sample(
         n=4,
         query={
           SELECT Timestamp, rate(x=CPU, y=Timestamp) * 100 As CPUPercent,
                  RSS / 1000000 AS MemoryUse
           FROM source(artifact=&quot;Generic.Client.Stats&quot;,
                       client_id=ClientId,
                       start_time=now() - 86400)
           WHERE CPUPercent &gt;= 0
         })
      {{ end }}

      &lt;div&gt;
      {{ Query &quot;resources&quot; | LineChart &quot;xaxis_mode&quot; &quot;time&quot; &quot;RSS.yaxis&quot; 2 }}
      &lt;/div&gt;

      {{ $windows_info := Query &quot;SELECT * FROM source(source=&#x27;WindowsInfo&#x27;)&quot; }}
      {{ if $windows_info }}
      # Windows agent information
        {{ $windows_info | Table }}
      {{ end }}

      # Active Users
      {{ Query &quot;SELECT * FROM source(source=&#x27;Users&#x27;)&quot; | Table }}


column_types:
  - name: BuildTime
    type: timestamp
  - name: LastLogin
    type: timestamp

</code></pre>

