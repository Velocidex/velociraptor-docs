# Detecting Velociraptor misuse

Velociraptor is widely used by defenders for legitimate forensic and
response workflows, and, just like many other security and
administrative tools, it can also be abused when in the wrong hands.

Threat actors use legitimate software to their advantage at various
stages of the attack lifecycle. In the past, we have seen many
legitimate tools that were abused by threat actors (`PsExec`,
`AnyDesk`, `ScreenConnect`, etc.). Threat actors will continue to
abuse legitimate tools to facilitate their attacks.

Recently, we observed that [the Velociraptor tool was one of
them](https://news.sophos.com/en-us/2025/08/26/velociraptor-incident-response-tool-abused-for-remote-access/ ).

In this instance, the threat actor downloaded the Velociraptor binary
and, in its configuration file, specified the command-and-control
server. After Velociraptor was executed on the compromised asset, it
established a communication with the C2 server. Once the communication
was established, the threat actor used Velociraptor to perform further
actions, such as downloading additional files or executing commands on
the compromised asset. While this is not a vulnerability in the tool
itself, it can be used for malicious purposes.

## How can I detect Velociraptor misuse in my environment?

In order to help organizations detect Velociraptor misuse,
Velociraptor deliberately creates some IOCs which are easy to detect:

1. When Velociraptor starts, the binary registers a new event log
   source with the name `Velociraptor`. This will create a new key at
   the location
   `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\EventLog\Application\Velociraptor`.

   Typically the modification time for this key is a good indicator of
   the first time the Velociraptor binary was launched on the system.

2. Each time the binary is launched, the binary logs the command line
   arguments used into the `Application` event log with an event id of
   `1000`. For example, when run as a service, the message looks
   similar to:

```
Velociraptor startup ARGV: ["C:\\Program Files\\Velociraptor\\Velociraptor.exe","--config","C:\\Program Files\\Velociraptor\\/client.config.yaml","service","run"]
```

3. Of course, since Velociraptor is an open source tool it is possible
   for attackers to remove these indicators and rebuild the
   program. However, the resulting binary will not be signed by Rapid7
   and so will most likely remain an unsigned binary, thereby raising
   a further indicator that may be used: Detecting any execution of
   unsigned binaries in the environment. The official Rapid7 signed
   binary will always leave detectable traces of execution.

4. Another more robust detection for a potentially malicious rebuilt
   Velociraptor binary may use the following Yara rule:

```
rule velociraptor_strings {
  meta:
    description = "Detects unique strings in Velociraptor binaries"

  strings:
    $s1 = "www.velocidex.com/golang/velociraptor/" wide ascii
    $s2 = "proto.VelociraptorUser, error" wide ascii
    $s3 = "Welcome to the Velociraptor multi-frontend configuration generator" wide ascii
    $s4 = "Go build ID:" wide ascii

  condition:
    3 of them
}
```

For organizations that are concerned about unauthorized deployments
and already have Velociraptor deployed, Rapid7 has published a
Velociraptor inception artifact that automates the above techniques
and can help detect unexpected instances. This can be viewed here:
https://github.com/rapid7/Rapid7-Labs/blob/main/Vql/VelociraptorInception.yaml

For organizations that do not already have Velociraptor deployed, the
above detections methods can be easily implemented using whatever
technology stack they already have deployed.

## What if I am already using Velociraptor?

If Velociraptor use is already expected in your environment, misuse of
Velociraptor may blend in with legitimate use. In this case:

1. Forward the audit logs centrally and look for unusual sets of
   command line arguments (if Velociraptor is usually installed as a
   service it will always be started similar to the example above).

2. Check the integrity of the Velociraptor agent configuration to to
   ensure that it is not tampered with.

3. Check the process lineage of the Velociraptor binary in your EDR to
   ensure it is always started by the service control manager in the
   usual way.


Tags: #deployment #forensics
