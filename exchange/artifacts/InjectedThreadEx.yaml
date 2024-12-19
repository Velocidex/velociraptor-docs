name: Windows.Memory.InjectedThreadEx
author: "Matt Green - @mgreen27"
description: |
   This artifact runs Get-InjetedThreadEx to detect process injection and hooking.

    The artifact uses environment variables to configure the scan and outputs 
    parsed fields, as well as a raw section. Some of the scanning options include: 
    Default, Brief and Aggressive. The User can also target a specific ProcessId.

    For all process scanning the recommendation would be first run in brief mode, 
    then add more aggressive scanning as required. The default timeout has been 
    increased significantly to cover aggressive scanning mode.  

    IMPORTANT NOTES::
    
    - this query is complex powershell. Run it after a scriptblock hunt as it 
    will generate scriptblock logs, even if not configured.
    - Some EPP/EDR tools may block the scriptblock execution, please ensure 
    exclusions are made for velociraptor child powershell processes.  
    - The default output for Default and Aggressive scan excludes Thread User 
    information, however this can be confired by the field IsUniqueThreadToken 
    and if 'True' checked in raw data in the Windows.Memory.InjectedThreadEx/RawResults 
    namespace.

reference:
    - https://www.elastic.co/security-labs/get-injectedthreadex-detection-thread-creation-trampolines
type: CLIENT
resources:
  timeout: 6000

tools:
    - name: Get-InjectedThreadEx
      url: https://gist.githubusercontent.com/mgreen27/b37467aa725e0445d966c9589c90381a/raw/a3f8ac05fead58f5ba9465da67ae5881576b1762/Get-InjectedThreadEx.ps1

parameters:
  - name: TargetPid
    type: int
    description: Pid to pass through to tool. Default no entry scans all Pids, only one specific Pid can be added at a time.
  - name: ScanType
    type: choices
    description: Select memory permission you would like to return. Default All.
    default: Default
    choices:
      - Default
      - Brief
      - Aggressive


precondition:
      SELECT OS From info() where OS = 'windows'

sources:
  - query: |
      -- Get the path to the Get-InjectedThread tool
      LET script <= SELECT FullPath
            FROM Artifact.Generic.Utils.FetchBinary(
                ToolName="Get-InjectedThreadEx",
                IsExecutable='N'
                )
      LET scan_type = if(condition= ScanType='Default', 
                        then= '',
                        else= ScanType)
      LET target_pid = if(condition= TargetPid=0, then='', else= TargetPid)

      -- Run the tool and relay back the output
      LET results <= SELECT *,
            parse_string_with_regex(
                string=Stdout,
                  regex=['''ProcessName\s+:\s+(?P<ProcessName>[^\s]*)\s+\w+\s+:''',
                    '''\s+ProcessId\s+:\s+(?P<ProcessId>[^\s]*)\s+\w+\s+:''',
                    '''\s+ProcessLogonId\s+:\s+(?P<ProcessLogonId>\d*)\s+\w+\s+:''',
                    '''\s+Wow64\s+:\s+(?P<Wow64>[^\s]*)\s+\w+\s+:''',
                    '''\s+Path\s+:\s+(?P<Path>[ -~]*)\s+\w+\s+:''',
                    '''\s+KernelPath\s+:\s+(?P<KernelPath>[ -~]*)\s+\w+\s+:''',
                    '''\s+CommandLine\s+:\s+(?P<CommandLine>[ -~]*)\s+\w+\s+:''',
                    '''\s+PathMismatch\s+:\s+(?P<PathMismatch>[^\s]*)\s+\w+\s+:''',
                    '''\s+ProcessIntegrity\s+:\s+(?P<ProcessIntegrity>[^\s]*)\s+\w+\s+:''',
                    '''\s+ProcessPrivilege\s+:\s+(?P<ProcessPrivilege>[^\s]*)\s+\w+\s+:''',
                    '''\s+ProcessLogonId\s+:\s+(?P<ProcessLogonId>\d*)\s+\w+\s+:''',
                    '''\s+ProcessSecurityIdentifier\s+:\s+(?P<ProcessSecurityIdentifier>[S\d\-]*)\s+\w+\s+:''',
                    '''\s+ProcessUserName\s+:\s+(?P<ProcessUserName>[ -~]*)\s\s+\w+\s+:''',
                    '''\s+ProcessLogonSessionStartTime\s+:\s+(?P<ProcessLogonSessionStartTime>[\d:/ ]*\w{2})\s+\w+\s+:''',
                    '''\s+ProcessLogonType\s+:\s+(?P<ProcessLogonType>[^\s]*)\s+\w+\s+:''',
                    '''\s+ProcessAuthenticationPackage\s+:\s+(?P<ProcessAuthenticationPackage>[^\s]*)\s+\w+\s+:''',
                    '''\s+ThreadId\s+:\s+(?P<ThreadId>\d*)\s+\w+\s+:''',
                    '''\s+ThreadStartTime\s+:\s+(?P<ThreadStartTime>[\d:/ ]*\w{2})\s+\w+\s+:''',
                    '''\s+BasePriority\s+:\s+(?P<BasePriority>[^\s]*)\s+\w+\s+:''',
                    '''\s+WaitReason\s+:\s+(?P<WaitReason>[^\s]*)\s+\w+\s+:''',
                    '''\s+IsUniqueThreadToken\s+:\s+(?P<IsUniqueThreadToken>[^\s]*)\s+\w+\s+:''',
                    '''\s+ThreadIntegrity\s+:\s+(?P<ThreadIntegrity>[^\s]*)\s+\w+\s+:''',
                    '''\s+AdditionalThreadPrivilege\s+:\s+(?P<AdditionalThreadPrivilege>[^\s]*)\s+\w+\s+:''',
                    '''\s+ThreadLogonId\s+:\s+(?P<ThreadLogonId>[^\s]*)\s+\w+\s+:''',
                    '''\s+ThreadSecurityIdentifier\s+:\s+(?P<ThreadSecurityIdentifier>[^\s]*)\s+\w+\s+:''',
                    '''\s+ThreadUserName\s+:\s+(?P<ThreadUserName>.*)\s+\w+\s+:''',
                    '''\s+ThreadLogonSessionStartTime\s+:\s+(?P<ThreadLogonSessionStartTime>[^\s]*)\s+\w+\s+:''',
                    '''\s+ThreadLogonType\s+:\s+(?P<ThreadLogonType>[^\s]*)\s+\w+\s+:''',
                    '''\s+ThreadAuthenticationPackage\s+:\s+(?P<ThreadAuthenticationPackage>[^\s]*)\s+\w+\s+:''',
                    '''\s+AllocatedMemoryProtection\s+:\s+(?P<AllocatedMemoryProtection>[^\s]*)\s+\w+\s+:''',
                    '''\s+MemoryProtection\s+:\s+(?P<MemoryProtection>[\w_]*)\s+\w+\s+:''',
                    '''\s+MemoryState\s+:\s+(?P<MemoryState>[\w_]*)\s+\w+\s+:''',
                    '''\s+MemoryType\s+:\s+(?P<MemoryType>[\w_]*)\s+\w+\s+:''',
                    '''\s+Win32StartAddress\s+:\s+(?P<Win32StartAddress>[0-9A-F]*)\s+\w+\s+:''',
                    '''\s+Win32StartAddressModule\s+:\s+(?P<Win32StartAddressModule>[ -~]*)\s+\w+\s+:''',
                    '''\s+Win32StartAddressModuleSigned\s+:\s+(?P<Win32StartAddressModuleSigned>[^\s]*)\s+\w+\s+:''',
                    '''\s+Win32StartAddressPrivate\s+:\s+(?P<Win32StartAddressPrivate>[^\s]*)\s+\w+\s+:''',
                    '''\s+Size\s+:\s+(?P<Size>\d*)\s+\w+\s+:''',
                    '''\s+TailBytes\s+:\s+(?P<TailBytes>[0-9A-F]*)\s+''',
                    '''\s+StartBytes\s+:\s+(?P<StartBytes>[0-9A-F]*)''',
                    '''\s+Detections\s+:\s+(?P<Detections>.*)$'''
                    ]) as Parsed  
        FROM execve(argv=['powershell','-ExecutionPolicy','Unrestricted','-NoProfile','-File',script.FullPath[0]],
            env=dict(
                `GetInjectedThreadScan` = scan_type,
                `GetInjectedThreadTarget` = str(str=target_pid) ),
            sep='\r\n\r\n')
        WHERE Stdout
            

      -- output rows
      --SELECT * FROM foreach(row=results.Parsed) WHERE NOT Stdout =~ '^WARNING'
      SELECT * FROM column_filter(
            query={ 
                    SELECT * FROM foreach(row=results.Parsed) 
                    WHERE NOT Stdout =~ '^WARNING'
            },
            exclude=['ThreadIntegrity','AdditionalThreadPrivilege','ThreadLogonId','ThreadSecurityIdentifier',
            'ThreadUserName','ThreadLogonSessionStartTime','ThreadLogonType','ThreadAuthenticationPackage']
        )
      
  - name: RawResults
    queries:
      - |
        SELECT Stdout, Stderr, ReturnCode, Complete,
            dict(   ScanType = scan_type,
                    PidTarget = str(str=target_pid) ) as ScanSettings
        FROM results
        
        
column_types:
  - name: ProcessLogonSessionStartTime
    type: timestamp
  - name: ThreadStartTime
    type: timestamp
