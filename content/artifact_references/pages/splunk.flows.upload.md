---
title: Splunk.Flows.Upload
hidden: true
tags: [Server Event Artifact]
---

This server side event monitoring artifact waits for new artifacts
to be collected from endpoints and automatically uploads those to a
Splunk server.
To configure the event collector properly a couple steps need to be
completed prior to setting up this event:
  1. Configure an index to ingest the data.
     * Go to Settings > Index.
     * New Index.
  2. Configure the collector.
     * Go to Settings > Data Inputs > HTTP Event Collector.
     * Add New.
     * Name does not matter, but ensure indexer acknowledgement is OFF.
     * Set `Selected Indexes` to the index configured in step 1.
     * Save API key for this event.
  3. Set Global settings.
     * Go to Settings > Data Inputs > HTTP Event Collector > Global Settings
     * Ensure `All Tokens` is set to ENABLED
     * Copy the HTTP Port Number for this event
  4. Configure your Splunk props.conf and tranforms.conf  
     * Add the following to props.conf
      [vql]
      INDEXED_EXTRACTIONS = json
      DATETIME_CONFIG = CURRENT
      TZ = GMT
      category = Custom
      pulldown_type = 1
      TRANSFORMS-vql-sourcetype = vql-sourcetype,vql-timestamp
      TRUNCATE = 512000  
     * Add the following to transforms.conf  
      [vql-sourcetype]
      INGEST_EVAL = sourcetype=lower(_index)
      [vql-timestamp]
      INGEST_EVAL = _time=case( \
                    _index="artifact_Linux_Search_FileFinder",strptime(CTime,"%Y-%m-%dT%H:%M:%SZ"), \
                    _index="artifact_System_VFS_ListDirectory",strptime(ctime,"%Y-%m-%dT%H:%M:%S.%NZ"), \
                    _index="artifact_Windows_Timeline_MFT",strptime(event_time,"%Y-%m-%dT%H:%M:%S.%NZ"), \
                    _index="artifact_Windows_NTFS_MFT",strptime(Created0x10,"%Y-%m-%dT%H:%M:%S.%NZ"), \
                    _index="artifact_Windows_EventLogs_Evtx",strptime(TimeCreated,"%Y-%m-%dT%H:%M:%SZ"), \
                    _index="artifact_Custom_Windows_EventLogs_System_7045",strptime(TimeCreated,"%Y-%m-%dT%H:%M:%SZ"), \
                    _index="artifact_Windows_EventLogs_RDPAuth",strptime(EventTime,"%Y-%m-%dT%H:%M:%SZ"), \
                    _index="artifact_Windows_Analysis_EvidenceOfExecution_UserAssist",strptime(LastExecution,"%Y-%m-%dT%H:%M:%SZ"), \
                    _index="artifact_Windows_Analysis_EvidenceOfExecution_Amcache",strptime(KeyMTime,"%Y-%m-%dT%H:%M:%SZ"), \
                    _index="artifact_Windows_System_Amcache_InventoryApplicationFile",strptime(LastModified,"%Y-%m-%dT%H:%M:%SZ"), \
                    _index="artifact_Windows_Search_FileFinder",strptime(CTime,"%Y-%m-%dT%H:%M:%S.%NZ"), \
                    _index="artifact_Windows_Applications_NirsoftBrowserViewer",strptime(Visited,"%Y-%m-%dT%H:%M:%SZ"), \
                    _index="artifact_Windows_Registry_RecentDocs",strptime(LastWriteTime,"%Y-%m-%dT%H:%M:%SZ"), \
                    _index="artifact_Windows_Forensics_UserAccessLogs_Clients",strptime(InsertDate,"%Y-%m-%dT%H:%M:%SZ"), \
                    _index="artifact_Windows_Forensics_UserAccessLogs_DNS",strptime(LastSeen,"%Y-%m-%dT%H:%M:%SZ"), \
                    _index="artifact_Windows_Forensics_UserAccessLogs_SystemIdentity",strptime(CreationTime,"%Y-%m-%dT%H:%M:%SZ"), \
                    _index="artifact_Custom_Windows_Application_IIS_IISLogs",strptime(event_time,"%Y-%m-%dT%H:%M:%SZ"), \
                    _index="artifact_MacOS_Applications_Chrome_History",strptime(last_visit_time,"%Y-%m-%dT%H:%M:%SZ"), \
                    _index="artifact_Windows_Registry_UserAssist",strptime(LastExecution,"%Y-%m-%dT%H:%M:%SZ") \
                    )  


     > Note: `Enable SSL` only works if SSL is properly configured on your
     Splunk server -- meaning you have proper certificates and DNS. If you are
     accessing your Splunk instance by IP, `Enable SSL` should be set to OFF.


<pre><code class="language-yaml">
name: Splunk.Flows.Upload

description: |
  This server side event monitoring artifact waits for new artifacts
  to be collected from endpoints and automatically uploads those to a
  Splunk server.
  To configure the event collector properly a couple steps need to be
  completed prior to setting up this event:
    1. Configure an index to ingest the data.
       * Go to Settings &gt; Index.
       * New Index.
    2. Configure the collector.
       * Go to Settings &gt; Data Inputs &gt; HTTP Event Collector.
       * Add New.
       * Name does not matter, but ensure indexer acknowledgement is OFF.
       * Set `Selected Indexes` to the index configured in step 1.
       * Save API key for this event.
    3. Set Global settings.
       * Go to Settings &gt; Data Inputs &gt; HTTP Event Collector &gt; Global Settings
       * Ensure `All Tokens` is set to ENABLED
       * Copy the HTTP Port Number for this event
    4. Configure your Splunk props.conf and tranforms.conf  
       * Add the following to props.conf
        [vql]
        INDEXED_EXTRACTIONS = json
        DATETIME_CONFIG = CURRENT
        TZ = GMT
        category = Custom
        pulldown_type = 1
        TRANSFORMS-vql-sourcetype = vql-sourcetype,vql-timestamp
        TRUNCATE = 512000  
       * Add the following to transforms.conf  
        [vql-sourcetype]
        INGEST_EVAL = sourcetype=lower(_index)
        [vql-timestamp]
        INGEST_EVAL = _time=case( \
                      _index=&quot;artifact_Linux_Search_FileFinder&quot;,strptime(CTime,&quot;%Y-%m-%dT%H:%M:%SZ&quot;), \
                      _index=&quot;artifact_System_VFS_ListDirectory&quot;,strptime(ctime,&quot;%Y-%m-%dT%H:%M:%S.%NZ&quot;), \
                      _index=&quot;artifact_Windows_Timeline_MFT&quot;,strptime(event_time,&quot;%Y-%m-%dT%H:%M:%S.%NZ&quot;), \
                      _index=&quot;artifact_Windows_NTFS_MFT&quot;,strptime(Created0x10,&quot;%Y-%m-%dT%H:%M:%S.%NZ&quot;), \
                      _index=&quot;artifact_Windows_EventLogs_Evtx&quot;,strptime(TimeCreated,&quot;%Y-%m-%dT%H:%M:%SZ&quot;), \
                      _index=&quot;artifact_Custom_Windows_EventLogs_System_7045&quot;,strptime(TimeCreated,&quot;%Y-%m-%dT%H:%M:%SZ&quot;), \
                      _index=&quot;artifact_Windows_EventLogs_RDPAuth&quot;,strptime(EventTime,&quot;%Y-%m-%dT%H:%M:%SZ&quot;), \
                      _index=&quot;artifact_Windows_Analysis_EvidenceOfExecution_UserAssist&quot;,strptime(LastExecution,&quot;%Y-%m-%dT%H:%M:%SZ&quot;), \
                      _index=&quot;artifact_Windows_Analysis_EvidenceOfExecution_Amcache&quot;,strptime(KeyMTime,&quot;%Y-%m-%dT%H:%M:%SZ&quot;), \
                      _index=&quot;artifact_Windows_System_Amcache_InventoryApplicationFile&quot;,strptime(LastModified,&quot;%Y-%m-%dT%H:%M:%SZ&quot;), \
                      _index=&quot;artifact_Windows_Search_FileFinder&quot;,strptime(CTime,&quot;%Y-%m-%dT%H:%M:%S.%NZ&quot;), \
                      _index=&quot;artifact_Windows_Applications_NirsoftBrowserViewer&quot;,strptime(Visited,&quot;%Y-%m-%dT%H:%M:%SZ&quot;), \
                      _index=&quot;artifact_Windows_Registry_RecentDocs&quot;,strptime(LastWriteTime,&quot;%Y-%m-%dT%H:%M:%SZ&quot;), \
                      _index=&quot;artifact_Windows_Forensics_UserAccessLogs_Clients&quot;,strptime(InsertDate,&quot;%Y-%m-%dT%H:%M:%SZ&quot;), \
                      _index=&quot;artifact_Windows_Forensics_UserAccessLogs_DNS&quot;,strptime(LastSeen,&quot;%Y-%m-%dT%H:%M:%SZ&quot;), \
                      _index=&quot;artifact_Windows_Forensics_UserAccessLogs_SystemIdentity&quot;,strptime(CreationTime,&quot;%Y-%m-%dT%H:%M:%SZ&quot;), \
                      _index=&quot;artifact_Custom_Windows_Application_IIS_IISLogs&quot;,strptime(event_time,&quot;%Y-%m-%dT%H:%M:%SZ&quot;), \
                      _index=&quot;artifact_MacOS_Applications_Chrome_History&quot;,strptime(last_visit_time,&quot;%Y-%m-%dT%H:%M:%SZ&quot;), \
                      _index=&quot;artifact_Windows_Registry_UserAssist&quot;,strptime(LastExecution,&quot;%Y-%m-%dT%H:%M:%SZ&quot;) \
                      )  


       &gt; Note: `Enable SSL` only works if SSL is properly configured on your
       Splunk server -- meaning you have proper certificates and DNS. If you are
       accessing your Splunk instance by IP, `Enable SSL` should be set to OFF.
type: SERVER_EVENT

parameters:
   - name: ArtifactNameRegex
     default: &quot;.&quot;
     type: regex
     description: Names of artifacts to upload to Splunk
   - name: url
     default: http://127.0.0.1:8088/services/collector
     description: |
      The Splunk collector url, this is typically the url of the Splunk
      server followed by :8088/services/collector.
   - name: token
     description: |
      API token given when the event collector is configured on Splunk.
   - name: index
     default: velociraptor
     description: |
      Index to ingest the data. This should be set up when configuring
      the event collector.
   - name: SkipVerify
     default: false
     type: bool
     description: |
      SSL configured with the event collector. This is false by default.
   - name: RootCerts
     description: |
       As a better alternative to skip_verify, allows root ca certs to
       be added here.

   - name: HostnameField
     description: Field to extract hostname from
     default: ClientId

   - name: TimestampField
     description: Field to extract timestamp from
     default: timestamp

sources:
  - query: |
        LET completions = SELECT * FROM watch_monitoring(
                     artifact=&quot;System.Flow.Completion&quot;)
                 WHERE Flow.artifacts_with_results =~ ArtifactNameRegex
                     AND log(message=Flow.artifacts_with_results)

        LET documents = SELECT * FROM foreach(row=completions,
                  query={
                     SELECT * FROM foreach(
                         row=Flow.artifacts_with_results,
                         query={
                             SELECT *, _value AS Artifact,
                                    timestamp(epoch=now()) AS timestamp,
                                    ClientId, Flow.session_id AS FlowId,
                                    &quot;artifact_&quot; + regex_replace(source=_value,
                                       re=&#x27;[/.]&#x27;, replace=&#x27;_&#x27;) as _index
                             FROM source(
                                client_id=ClientId,
                                flow_id=Flow.session_id,
                                artifact=_value)
                         })
                  })

        SELECT * FROM splunk_upload(
        query = documents,
        url = url,
        token = token,
        index = index,
        skip_verify = SkipVerify,
        root_ca = RootCerts,
        hostname_field=HostnameField,
        timestamp_field=TimestampField
        )

</code></pre>

