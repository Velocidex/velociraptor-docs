---
title: "Volatile State"
date: 2021-06-27T04:35:23Z
draft: false
weight: 90
---

Volatile machine state

Volatile state
So far we looked at disk based artifacts.
Often evidence is ephemeral and will vanish quickly. The next slides focus on evidence that only exists temporarily and may disappear quickly.
Velociraptor's unique strength is being able to quickly and efficiently capture this volatile state using automated artifacts
60

61
Windows Management Instrumentation

WMI
A framework to export internal windows state information using a query language (WQL)
Consists of classes (providers) and objects
Lots of hooks into many internal system features
Being able to inspect system state using a consistent interface allows a tool to query a wide range of services.
62

63

64

65

66
Mutants

Malware persistence
Malware needs to ensure there is only a single copy of it running.
A common method is to use a Mutant (Or named mutex)
Create a mutant with a constant name:
    If the named mutant already exists, then exit

Ensures only a single copy is run.
67

Exercise - Mutants
$createdNew = $False
$mutex = New-Object -TypeName System.Threading.Mutex(
      $true, "Global\MyBadMutex", [ref]$createdNew)
if ($createdNew) {
    echo "Acquired Mutex"
    sleep(100)
} else {
    echo "Someone else has the mutex"
}

68

Enumerate the mutants
69

70
Process analysis

Windows Processes
A process is a user space task with a specific virtual memory layout

A process has a Process ID (Pid), an initial binary on disk, an ACL Token, environment variables etc.

Each of these properties can be inspected by Velociraptor
71

Process Information
Simple pslist() can reveal basic information about the process

Who launched the binary?
Transfer metrics (network/disk activity)
Is it elevated?
Process Creation time
72

73

74
Process Call chain

75
Process traversing can be done in pure VQL by recursively calling a locally defined function.

76
Exercise - Find elevated command shell
Write an artifact to find all currently running elevated command shells

Report how long they have run for

Mapped Memory
When a binary runs it links many DLLs into it

A linked DLL is a copy on write memory mapping of a file on disk into the process memory space.

DLLs can be linked when the program starts or dynamically
77

The VAD plugin
This plugin shows all the process memory regions and if the memory is mapped to file, the filename it is mapped from.

DLLs and .NET assemblies are mapped into the process - so we can use this to get an idea of what the program is doing.
78

79

80
Exercise - look into powershell
Without enabling powershell block logging, we can get an idea of what the script is doing by looking at its dependencies.
Write VQL to list all the DLL modules that powershell is running.

Run our previous mutex script.
Add the following command (this is typical of C&C)
Invoke-WebRequest -Uri "https://www.google.com" -UseBasicParsing



Dump mapped objects
Dump the powershell process's mapped DLLs.
The DLL winhttp.dll is responsible for making outbound http connections.

If the http request is enabled, the process will link the winhttp.dll at runtime.
This technique works on many other programs that may be subverted for example Cobalt Strike reflective DLL injection.
81

Dump mapped objects
82
