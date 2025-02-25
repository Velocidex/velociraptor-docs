---
title: watch_etw
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## watch_etw
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|A session name |string
guid|A Provider GUID to watch |string (required)
any|Any Keywords |uint64
all|All Keywords |uint64
level|Log level (0-5)|int64
stop|If provided we stop watching automatically when this lambda returns true|Lambda
timeout|If provided we stop after this much time|uint64
capture_state|If true, capture the state of the provider when the event is triggered|bool
enable_map_info|Resolving MapInfo with TdhGetEventMapInformation is very expensive and causes events to be dropped so we disabled it by default. Enable with this flag.|bool
description|Description for this GUID provider|string
kernel_tracer_type|A list of event types to fetch from the kernel tracer (can be registry, process, image_load, network, driver, file, thread, handle)|list of string
kernel_tracer_stacks|A list of kernel tracer event types to append stack traces to (can be any of the types accepted by kernel_tracer_type)|list of string

### Description

Watch for events from an ETW provider.

Event Tracing for Windows is a powerful built in monitoring and
eventing system in Windows. This plugin provides an interface to
this capability.

To learn more about ETW see
https://docs.velociraptor.app/blog/2021/2021-08-18-velociraptor-and-etw/
or
https://docs.velociraptor.app/blog/2021/2021-09-03-process-spoofing/

## The NT Kernel Logger

This plugin also provides specialized support for more advanced
loggers. For example the NT Kernel Logger is a special ETW
provider that can report a lot of telemetry.

The NT Kernel Logger is a special ETW session which can monitor
the following event types:

* registry - all registry interactions like keys/values
* process - all processes start/stop
* image_load - dll loading and mapping
* network - inbound/outbound connections
* driver - drivers loaded
* file - file io like opening files/deleting files etc
* handles - Any time a kernel handle is created

Additionally this provider can report a full stack trace for each event.

You can specify this provider by the GUID
`{9E814AAD-3204-11D2-9A82-006008A86939}` or as a shorthand
`kernel`. This will enabled a special ETW session with support for
this special provider.

When this provider is used, you can also specify what kind of
events you want to see using the `kernel_tracer_type`
parameter. This is a list of any of the following keywords
`registry`, `process`, `image_load`, `network`, `driver`, `file`,
`handles`.

Additionally, you can specify which kinds of events will be
decorated with stack traces using the `kernel_tracer_stacks`
parameter.

### Example:

```vql
SELECT * FROM
watch_etw(guid='kernel',
   kernel_tracer_type=['image_load', 'registry', 'file', 'process', 'network'],
   kernel_tracer_stacks=['registry', 'network', 'file', 'process'])
```

An example of a file created by Chrome - This example illustrates
the backtrace reported by the Kernel and decorated by Velociraptor
with the function names (when known).

```json
{
  "System": {
    "ID": 0,
    "ProcessID": 7672,
    "TimeStamp": "2025-01-02T06:21:36.7026893Z",
    "Provider": "{90CBDC39-4A3E-11D1-84F4-0000F80464E3}",
    "OpCode": 64,
    "KernelEventType": "CreateFile"
  },
  "EventData": {
    "IrpPtr": "0xFFFF830E25838598",
    "FileObject": "0xFFFF830E34395DD0",
    "TTID": "1124",
    "CreateOptions": "33554528",
    "FileAttributes": "0",
    "ShareAccess": "7",
    "OpenPath": "C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Code Cache\\js\\5926f528a1f0ddd3_0"
  },
  "Backtrace": [
    "fileinfo.sys!0x11107",
    "ntoskrnl.exe!IofCallDriver",
    "ntoskrnl.exe!SePrivilegeCheck",
    "ntoskrnl.exe!_setjmpex",
    "ntdll.dll!NtCreateFile",
    "KernelBase.dll!CreateFileW",
    "chrome.dll!0x55bc08",
    "chrome.dll!0x834d17",
    "chrome.dll!IsSandboxedProcess",
    "chrome.dll!IsSandboxedProcess",
    "chrome.dll!0xae178",
    "chrome.dll!0x966030",
    "kernel32.dll!BaseThreadInitThunk",
    "ntdll.dll!RtlUserThreadStart"
  ]
},
```

The following is an example of an outbound connection over port 22.
```json
 {
   "System": {
     "ID": 0,
     "ProcessID": 4294967295,
     "TimeStamp": "2025-01-02T06:27:38.6957971Z",
     "Provider": "{9A280AC0-C8E0-11D1-84E2-00C04FB998A2}",
     "OpCode": 12,
     "KernelEventType": "ConnectTCPv4"
   },
   "EventData": {
     "PID": "1748",
     "size": "0",
     "daddr": "192.168.0.2",
     "saddr": "192.168.1.237",
     "dport": "22",
     "sport": "50068",
     "mss": "1460",
     "sackopt": "1",
     "tsopt": "0",
     "wsopt": "1",
     "rcvwin": "2098020",
     "rcvwinscale": "8",
     "sndwinscale": "7",
     "seqnum": "0",
     "connid": null
   },
}
```


