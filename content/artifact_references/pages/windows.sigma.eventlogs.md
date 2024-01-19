---
title: Windows.Sigma.EventLogs
hidden: true
tags: [Client Artifact]
---

Parse Windows event logs and matches then against Sigma Rules.

NOTE: This is a very simple artifact for demonstration only. For
more extensive Sigma rules use the `Server.Import.CuratedSigma`
artifact to import a curated set of Sigma rules from
https://sigma.velocidex.com/


<pre><code class="language-yaml">
name: Windows.Sigma.EventLogs
description: |
  Parse Windows event logs and matches then against Sigma Rules.

  NOTE: This is a very simple artifact for demonstration only. For
  more extensive Sigma rules use the `Server.Import.CuratedSigma`
  artifact to import a curated set of Sigma rules from
  https://sigma.velocidex.com/

parameters:
- name: EventLogDirectory
  default: C:/Windows/System32/WinEvt/Logs/
- name: InlineSigmaRules
  description: A single string of sigma rules separated by --- lines
- name: SigmaRuleFile
  description: A path to a file containing sigma rules
- name: Debug
  type: bool
  description: Enable full debug trace

export: |
  LET StandardSigmaLogSource &lt;= sigma_log_sources(
  `process_creation/windows` = {
    SELECT *
    FROM parse_evtx(
      filename= EventLogDirectory + "/Microsoft-Windows-Sysmon%4Operational.evtx")
  },
  `*/windows/sysmon` = {
    SELECT *
    FROM parse_evtx(
      filename= EventLogDirectory + "/Microsoft-Windows-Sysmon%4Operational.evtx")
  })

  LET StandardSigmaFieldMapping &lt;= dict(
    AccessList="x=&gt;x.EventData.AccessList",
    AccessMask="x=&gt;x.EventData.AccessMask",
    Accesses="x=&gt;x.EventData.Accesses",
    AccountDomain="x=&gt;x.EventData.AccountDomain",
    AccountName="x=&gt;x.EventData.AccountName",
    Account_Name="x=&gt;x.EventData.Account_Name",
    Action="x=&gt;x.EventData.Action",
    AllowedToDelegateTo="x=&gt;x.EventData.AllowedToDelegateTo",
    ApplicationPath="x=&gt;x.EventData.ApplicationPath",
    AttributeLDAPDisplayName="x=&gt;x.EventData.AttributeLDAPDisplayName",
    AttributeValue="x=&gt;x.EventData.AttributeValue",
    AuditPolicyChanges="x=&gt;x.EventData.AuditPolicyChanges",
    AuditSourceName="x=&gt;x.EventData.AuditSourceName",
    AuthenticationPackageName="x=&gt;x.EventData.AuthenticationPackageName",
    CallTrace="x=&gt;x.EventData.CallTrace",
    CallerProcessName="x=&gt;x.EventData.CallerProcessName",
    Caller_Process_Name="x=&gt;x.EventData.Caller_Process_Name",
    CallingProcessName="x=&gt;x.EventData.CallingProcessName",
    CategoryName="x=&gt;x.EventData.`Category Name`",
    CertThumbprint="x=&gt;x.EventData.CertThumbprint",
    Channel="x=&gt;x.System.Channel",
    ClassName="x=&gt;x.EventData.ClassName",
    ClientAddress="x=&gt;x.EventData.ClientAddress",
    Client_Address="x=&gt;x.EventData.Client_Address",
    ClientName="x=&gt;x.EventData.ClientName",
    CommandLine="x=&gt;x.EventData.CommandLine",
    Company="x=&gt;x.EventData.Company",
    Computer="x=&gt;x.System.Computer",
    ComputerName="x=&gt;x.System.Computer",
    ContextInfo="x=&gt;x.EventData.ContextInfo",
    CurrentDirectory="x=&gt;x.EventData.CurrentDirectory",
    Description="x=&gt;x.EventData.Description",
    DestAddress="x=&gt;x.EventData.DestAddress",
    DestPort="x=&gt;x.EventData.DestPort",
    Destination="x=&gt;x.EventData.Destination",
    DestinationAddress="x=&gt;x.EventData.DestinationAddress",
    DestinationHostname="x=&gt;x.EventData.DestinationHostname",
    DestinationIp="x=&gt;x.EventData.DestinationIp",
    DestinationIsIpv6="x=&gt;x.EventData.DestinationIsIpv6",
    DestinationPort="x=&gt;x.EventData.DestinationPort",
    Details="x=&gt;x.EventData.Details",
    DetectionSource="x=&gt;x.EventData.DetectionSource",
    DetectionUser="x=&gt;x.EventData.`Detection User`",
    Device="x=&gt;x.EventData.Device",
    DeviceClassName="x=&gt;x.EventData.DeviceClassName",
    DeviceDescription="x=&gt;x.EventData.DeviceDescription",
    DeviceInstanceID="x=&gt;x.UserData.InstallDeviceID.DeviceInstanceID",
    DeviceName="x=&gt;x.EventData.DeviceName",
    DomainName="x=&gt;x.EventData.SubjectDomainName",
    DriverDescription="x=&gt;x.UserData.InstallDeviceID.DriverDescription",
    DriverProvider="x=&gt;x.UserData.InstallDeviceID.DriverProvider",
    InstallStatus="x=&gt;x.UserData.InstallDeviceID.InstallStatus",
    EngineVersion="x=&gt;x.EventData.EngineVersion",
    ErrorCode="x=&gt;x.EventData.ErrorCode",
    EventID="x=&gt;x.System.EventID.Value",
    EventType="x=&gt;x.EventData.EventType",
    ExecutionProcessID="x=&gt;x.System.Execution_attributes.ProcessID",
    FailureCode="x=&gt;x.EventData.FailureCode",
    FilePath="x=&gt;x.EventData.FilePath",
    FileVersion="x=&gt;x.EventData.FileVersion",
    Filename="x=&gt;x.EventData.Filename",
    GrantedAccess="x=&gt;x.EventData.GrantedAccess",
    GroupName="x=&gt;x.EventData.GroupName",
    GroupSid="x=&gt;x.EventData.GroupSid",
    Hashes="x=&gt;x.EventData.Hashes",
    HiveName="x=&gt;x.EventData.HiveName",
    HostApplication="x=&gt;x.EventData.HostApplication",
    HostName="x=&gt;x.EventData.HostName",
    HostVersion="x=&gt;x.EventData.HostVersion",
    Image="x=&gt;x.EventData.Image",
    image="x=&gt;x.EventData.Image",
    ImageLoaded="x=&gt;x.EventData.ImageLoaded",
    ImagePath="x=&gt;x.EventData.ImagePath",
    Imphash="x=&gt;x.EventData.Hashes",
    Initiated="x=&gt;x.EventData.Initiated",
    InstanceID="x=&gt;x.UserData.UMDFHostDeviceArrivalBegin.InstanceId",
    IntegrityLevel="x=&gt;x.EventData.IntegrityLevel",
    IpAddress="x=&gt;x.EventData.IpAddress",
    IpPort="x=&gt;x.EventData.IpPort",
    JobTitle="x=&gt;x.EventData.name",
    KeyLength="x=&gt;x.EventData.KeyLength",
    Keywords="x=&gt;x.System.Keywords",
    LDAPDisplayName="x=&gt;x.EventData.LDAPDisplayName",
    LayerRTID="x=&gt;x.EventData.LayerRTID",
    Level="x=&gt;x.System.Level",
    LogFileClearedChannel="x=&gt;x.UserData.LogFileCleared.Channel",
    LogFileClearedSubjectUserName="x=&gt;x.UserData.LogFileCleared.SubjectUserName",
    LogonId="x=&gt;x.EventData.LogonId",
    LogonID="x=&gt;x.EventData.LogonID",
    LogonProcessName="x=&gt;x.EventData.LogonProcessName",
    LogonType="x=&gt;x.EventData.LogonType",
    Logon_Account="x=&gt;x.EventData.Logon_Account",
    MachineName="x=&gt;x.EventData.MachineName",
    MemberName="x=&gt;x.EventData.MemberName",
    MemberSid="x=&gt;x.EventData.MemberSid",
    Message="x=&gt;x.EventData",
    ModifyingApplication="x=&gt;x.EventData.ModifyingApplication",
    NewName="x=&gt;x.EventData.NewName",
    NewTemplateContent="x=&gt; Event.EventData.NewTemplateContent",
    NewUacValue="x=&gt;x.EventData.NewUacValue",
    NewValue="x=&gt;x.EventData.NewValue",
    New_Value="x=&gt;x.EventData.`New Value`",
    NewProcessName="x=&gt;x.EventData.NewProcessName",
    NewProcessId="x=&gt;x.EventData.NewProcessId",
    ObjectClass="x=&gt;x.EventData.ObjectClass",
    ObjectName="x=&gt;x.EventData.ObjectName",
    ObjectServer="x=&gt;x.EventData.ObjectServer",
    ObjectType="x=&gt;x.EventData.ObjectType",
    ObjectValueName="x=&gt;x.EventData.ObjectValueName",
    OldUacValue="x=&gt;x.EventData.OldUacValue",
    Origin="x=&gt;x.EventData.Origin",
    OriginalFileName="x=&gt;x.EventData.OriginalFileName",
    OriginalFilename="x=&gt;x.EventData.OriginalFileName",
    param1="x=&gt;x.EventData.param1",
    param2="x=&gt;x.EventData.param2",
    param3="x=&gt;x.EventData.param3",
    param4="x=&gt;x.EventData.param4",
    param5="x=&gt;x.EventData.param5",
    ParentCommandLine="x=&gt;x.EventData.ParentCommandLine",
    ParentImage="x=&gt;x.EventData.ParentImage",
    ParentIntegrityLevel="x=&gt;x.EventData.ParentIntegrityLevel",
    ParentProcessName="x=&gt;x.EventData.ParentProcessName",
    ParentUser="x=&gt;x.EventData.ParentUser",
    PasswordLastSet="x=&gt;x.EventData.PasswordLastSet",
    Path="x=&gt;x.EventData.Path",
    Payload="x=&gt;x.EventData.Payload",
    PipeName="x=&gt;x.EventData.PipeName",
    PossibleCause="x=&gt;x.UserData.PossibleCause",
    PreAuthType="x=&gt;x.EventData.PreAuthType",
    PrivilegeList="x=&gt;x.EventData.PrivilegeList",
    ProcessCommandLine="x=&gt;x.EventData.ProcessCommandLine",
    ProcessGuid="x=&gt;x.EventData.ProcessGuid",
    ProcessId="x=&gt;x.EventData.ProcessId",
    ProcessName="x=&gt;x.EventData.ProcessName",
    Product="x=&gt;x.EventData.Product",
    Properties="x=&gt;x.EventData.Properties",
    Provider="x=&gt;x.UserData.Provider",
    ProviderName="x=&gt;x.System.Provider_attributes.Name",
    Provider_Name="x=&gt;x.System.Provider_attributes.Name",
    QNAME="x=&gt;x.EventData.QNAME",
    query="x=&gt;x.EventData.Query",
    Query="x=&gt;x.UserData.Query",
    QueryName="x=&gt;x.EventData.QueryName",
    QueryResults="x=&gt;x.EventData.QueryResults",
    QueryStatus="x=&gt;x.EventData.QueryStatus",
    RelativeTargetName="x=&gt;x.EventData.RelativeTargetName",
    RuleName="x=&gt;x.EventData.RuleName",
    SAMAccountName="x=&gt;x.EventData.SamAccountName",
    ScriptBlockText="x=&gt;x.EventData.ScriptBlockText",
    SearchFilter="x=&gt;x.System.SearchFilter",
    SecurityUserID="x=&gt;x.System.Security_attributes.UserID",
    ServerName="x=&gt;x.System.ServerName",
    Service="x=&gt;x.EventData.Service",
    ServiceFileName="x=&gt;x.EventData.ServiceFileName",
    ServiceName="x=&gt;x.EventData.ServiceName",
    ServicePrincipalNames="x=&gt;x.EventData.ServicePrincipalNames",
    ServiceStartType="x=&gt;x.EventData.ServiceStartType",
    ServiceType="x=&gt;x.EventData.ServiceType",
    SeverityID="x=&gt;x.EventData.`Severity ID`",
    SeverityName="x=&gt;x.EventData.`Severity Name`",
    ShareLocalPath="x=&gt;x.EventData.ShareLocalPath",
    ShareName="x=&gt;x.EventData.ShareName",
    SidHistory="x=&gt;x.EventData.SidHistory",
    Signature="x=&gt;x.EventData.Signature",
    SignatureStatus="x=&gt;x.EventData.SignatureStatus",
    Signed="x=&gt;x.EventData.Signed",
    Source="x=&gt;x.System.Provider_Name",
    SourceAddress="x=&gt;x.EventData.SourceAddress",
    SourceImage="x=&gt;x.EventData.SourceImage",
    SourceNetworkAddress="x=&gt;x.EventData.SourceNetworkAddress",
    SourcePort="x=&gt;x.EventData.SourcePort",
    Source_Name="x=&gt;x.EventData.`Source Name`",
    Source_Network_Address="x=&gt;x.EventData.Source_Network_Address",
    Source_WorkStation="x=&gt;x.EventData.Source_WorkStation",
    StartAddress="x=&gt;x.EventData.StartAddress",
    StartFunction="x=&gt;x.EventData.StartFunction",
    StartModule="x=&gt;x.EventData.StartModule",
    StartType="x=&gt;x.EventData.StartType",
    State="x=&gt;x.EventData.State",
    Status="x=&gt;x.EventData.Status",
    SubStatus="x=&gt;x.EventData.SubStatus",
    SubjectDomainName="x=&gt;x.EventData.SubjectDomainName",
    SubjectLogonId="x=&gt;x.EventData.SubjectLogonId",
    SubjectUserName="x=&gt;x.EventData.SubjectUserName",
    SubjectUserSid="x=&gt;x.EventData.SubjectUserSid",
    TargetDomainName="x=&gt;x.EventData.TargetDomainName",
    TargetFilename="x=&gt;x.EventData.TargetFilename",
    TargetInfo="x=&gt;x.EventData.TargetInfo",
    TargetImage="x=&gt;x.EventData.TargetImage",
    TargetLogonId="x=&gt;x.EventData.TargetLogonId",
    TargetObject="x=&gt;x.EventData.TargetObject",
    TargetProcessAddress="x=&gt;x.EventData.TargetProcessAddress",
    TargetServerName="x=&gt;x.EventData.TargetServerName",
    TargetSid="x=&gt;x.EventData.TargetSid",
    TargetUserName="x=&gt;x.EventData.TargetUserName",
    TaskDate="x=&gt;x.EventData.TaskContent",
    TaskName="x=&gt;x.EventData.TaskName",
    TemplateContent="x=&gt;x.EventData.TemplateContent",
    ThreatName="x=&gt;x.EventData.`Threat Name`",
    TicketEncryptionType="x=&gt;x.EventData.TicketEncryptionType",
    TicketOptions="x=&gt;x.EventData.TicketOptions",
    Url="x=&gt;x.EventData.url",
    User="x=&gt;x.EventData.User",
    UserName="x=&gt;x.EventData.UserName",
    Value="x=&gt;x.EventData.Value",
    Version="x=&gt;x.System.Version",
    WindowsDefenderProcessName="x=&gt;x.EventData.`Process Name`",
    Workstation="x=&gt;x.EventData.Workstation",
    WorkstationName="x=&gt;x.EventData.WorkstationName",
    param1="x=&gt;x.EventData.param1",
    param2="x=&gt;x.EventData.param2",
    service="x=&gt;x.EventData.Service",
    sha1="x=&gt;x.EventData.Hashes_sha1",
    UserDataProviderName="x=&gt;x.UserData.Operation_StartedOperational.ProviderName",
    UserDataCode="x=&gt;x.UserData.Operation_StartedOperational.Code",
    UserDataHostProcess="x=&gt;x.UserData.Operation_StartedOperational.HostProcess",
    UserDataProviderPath="x=&gt;x.UserData.Operation_StartedOperational.ProviderPath",
    UserDataProcessID="x=&gt;x.UserData.Operation_StartedOperational.ProcessID",
    UserDataNamespace="x=&gt;x.UserData.Operation_ESStoConsumerBinding.Namespace",
    UserDataNamespaceName="x=&gt;x.UserData.Operation_TemporaryEssStarted.NamespaceName",
    UserDataQuery="x=&gt;x.UserData.Operation_TemporaryEssStarted.Query",
    UserDataUser="x=&gt;x.UserData.Operation_TemporaryEssStarted.User",
    UserDataProcessid="x=&gt;x.UserData.Operation_TemporaryEssStarted.Processid",
    UserDataConsumer="x=&gt;x.UserData.Operation_ESStoConsumerBinding.CONSUMER",
    UserDataESS="x=&gt;x.UserData.Operation_ESStoConsumerBinding.ESS",
    UserDataPossibleCause="x=&gt;x.UserData.Operation_ESStoConsumerBinding.PossibleCause",
    UserDataParam1="x=&gt;x.UserData.EventXML.Param1",
    UserDataParam2="x=&gt;x.UserData.EventXML.Param2",
    UserDataParam3="x=&gt;x.UserData.EventXML.Param3",
    UserDataUser="x=&gt;x.UserData.EventXML.User",
    UserDataSessionID="x=&gt;x.UserData.EventXML.SessionID",
    UserDataAddress="x=&gt;x.UserData.EventXML.Address",
    SysmonVersion="x=&gt;x.EventData.SysmonVersion",
    OperationEssStartedNamespaceName="x=&gt;x.UserData.Operation_EssStarted.NamespaceName",
    OperationEssStartedQuery="x=&gt;x.UserData.Operation_EssStarted.Query",
    OperationEssStartedUser="x=&gt;x.UserData.Operation_EssStarted.User",
    OperationEssStartedProcessid="x=&gt;x.UserData.Operation_EssStarted.Processid",
    OperationEssStartedProvider="x=&gt;x.UserData.Operation_EssStarted.Provider",
    OperationEssStartedPossibleCause="x=&gt;x.UserData.Operation_EssStarted.PossibleCause",
    DvrFmwkInstanceId="x=&gt;x.UserData.UMDFHostDeviceRequest.InstanceId",
    DvrFmwk2003InstanceId="x=&gt;x.UserData.UMDFHostDeviceArrivalBegin.InstanceId"
  )

sources:
- query: |
    LET Rules = InlineSigmaRules ||
       if(condition=SigmaRuleFile, then=read_file(path=SigmaRuleFile, length=10000000))

    SELECT * FROM sigma(
       rules=split(string= Rules, sep_string="\n---\n"),
       log_sources= StandardSigmaLogSource, debug=Debug,
       field_mapping= StandardSigmaFieldMapping)

</code></pre>

