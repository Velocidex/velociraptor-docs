---
title: Windows.Carving.CobaltStrike
hidden: true
tags: [Client Artifact]
---

This artifact extracts cobalt strike configuration from a byte stream, process
or file on disk such as a process dump. Best used as a triage step against a
detection of a cobalt strike beacon via a yara process scan.

The User can define bytes, file glob, process name or pid regex as a target. The
content will search for a configuration pattern, extract a defined byte size,
xor with discovered key, then attempt configuration extraction.

- Cobalt Strike beacon configuration is typically XORed with 0x69 or 0x2e
(depending on version) but trivial to change.
- Configuration is built in a typical index / type / length / value structure
with either big endian values or zero terminated strings.
- If no beacon is found, parser will fallback to CobaltStrike Shellcode analysis.

This content simply carves the configuration and does not unpack files on
disk. That means pointing this artifact as a packed or obfuscated file may not
obtain the expected results.

Unpacking later version.


<pre><code class="language-yaml">
name: Windows.Carving.CobaltStrike
author: Matt Green - @mgreen27
description: |
  This artifact extracts cobalt strike configuration from a byte stream, process
  or file on disk such as a process dump. Best used as a triage step against a
  detection of a cobalt strike beacon via a yara process scan.

  The User can define bytes, file glob, process name or pid regex as a target. The
  content will search for a configuration pattern, extract a defined byte size,
  xor with discovered key, then attempt configuration extraction.

  - Cobalt Strike beacon configuration is typically XORed with 0x69 or 0x2e
  (depending on version) but trivial to change.
  - Configuration is built in a typical index / type / length / value structure
  with either big endian values or zero terminated strings.
  - If no beacon is found, parser will fallback to CobaltStrike Shellcode analysis.

  This content simply carves the configuration and does not unpack files on
  disk. That means pointing this artifact as a packed or obfuscated file may not
  obtain the expected results.

  Unpacking later version.

reference:
  - https://attack.mitre.org/software/S0154/
  - https://blog.didierstevens.com/2020/11/07/1768-k/

parameters:
  - name: TargetBytes
    default:
  - name: TargetFileGlob
    default:
  - name: PidRegex
    default: .
    type: regex
  - name: ProcessRegex
    default: .
    type: regex
  - name: ExtractBytes
    type: int
    default: 10000
  - name: BruteXor
    type: bool
    description: Select to attempt brute forcing Xor byte in config. Default is 0x2e or 0x69.
  - name: IncludeDecodedData
    type: bool
    description: Select to include decoded data in output.
  - name: FindConfigTemplate
    type: hidden
    default: |
        rule cobalt_strike_beacon {
            strings:
                $REPLACEME

            condition:
                any of them
        }
  - name: FindShellcode
    type: hidden
    default: |
        rule cobalt_strike_shellcode {
            strings:
                $header = { FC }
                $s1 = &quot;hwini&quot;
                $s2 = &quot;hws2_&quot;
                $s3 = &quot;wininet&quot;

            condition:
                ( $header at 0 and filesize &lt; 4096 )
                or any of ($s*) // we enact offset limits in VQL ( 0..4096 )
        }
  - name: FindSleepFunction
    type: hidden
    default: |
        rule cobalt_strike_sleepfunction {
            strings:
                $x64 = { 4C 8B 53 08 45 8B 0A 45 8B 5A 04 4D 8D 52 08 45 85 C9 75 05 45 85 DB 74 33 45 3B CB 73 E6 49 8B F9 4C 8B 03 }
                $x86 = { 8B 46 04 8B 08 8B 50 04 83 C0 08 89 55 08 89 45 0C 85 C9 75 04 85 D2 74 23 3B CA 73 E6 8B 06 8D 3C 08 33 D2 }

            condition:
                any of them
        }

export: |
  LET PROFILE = &#x27;&#x27;&#x27;[
    [CobaltConfig, 0, [
        # 0x0001:BeaconType, 0x0001:Type, 0x0002:Length
        [&quot;BeaconType&quot;, 6, &quot;Enumeration&quot;, {
            &quot;type&quot;: &quot;uint16b&quot;,
            &quot;choices&quot;: {
                 &quot;0&quot;: &quot;windows-beacon_http-reverse_http&quot;,
                 &quot;1&quot;: &quot;windows-beacon_dns-reverse_http&quot;,
                 &quot;2&quot;: &quot;windows-beacon_smb-bind_pipe&quot;,
                 &quot;8&quot;: &quot;windows-beacon_https-reverse_https&quot;,
                 &quot;16&quot;: &quot;windows-beacon_tcp-bind_tcp&quot;
            }
        }],

        # 0x0002:Port, 0x0001:Type, 0x0002:Length
        [&quot;__port_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;000200010002&quot;, length: 10000, max_length: 10000}],
        [&quot;Port&quot;, &quot;x=&gt;len(list=x.__port_prefix) + 6&quot;, &quot;uint16b&quot;],

        # 0x0003:Sleeptime,0x0002:Type, 0x0004:Length
        [&quot;__sleeptime_prefix&quot;, 0, &quot;String&quot;, {&quot;term_hex&quot;: &quot;000300020004&quot;, length: 10000, max_length: 10000}],
        [&quot;Sleeptime&quot;, &quot;x=&gt;len(list=x.__sleeptime_prefix) + 6&quot;, &quot;uint32b&quot;],

        # 0x0004:Maxgetsize, 0x0002:Type, 0x0004:Length
        [&quot;__maxgetsize_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;000400020004&quot;, length: 10000, max_length: 10000}],
        [&quot;Maxgetsize&quot;, &quot;x=&gt;len(list=x.__maxgetsize_prefix) + 6&quot;, &quot;uint32b&quot;],

        # 0x0005:Jitter, 0x0001:Type, 0x0002:Length
        [&quot;__jitter_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;000500010002&quot;, length: 10000, max_length: 10000}],
        [&quot;Jitter&quot;, &quot;x=&gt;len(list=x.__jitter_prefix) + 6&quot;, &quot;uint16b&quot;],

        # 0x0006:MaxDns, 0x0001:Type, 0x0002:Length
        [&quot;__maxdns_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;000600010002&quot;, length: 10000, max_length: 10000}],
        [&quot;MaxDns&quot;, &quot;x=&gt;len(list=x.__maxdns_prefix) + 6&quot;, &quot;uint16b&quot;],

        # 0x0007:Publickey,0x0003:Type,
        [&quot;__publickey_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;000700030100&quot;, length: 10000, max_length: 10000}],
        [&quot;__publickey_raw&quot;, &quot;x=&gt;len(list=x.__publickey_prefix) + 6&quot;, &quot;String&quot;,{&quot;term_hex&quot;:&quot;00000008&quot;}],
        [&quot;PublicKey&quot;, &quot;x=&gt;len(list=x.__publickey_prefix) + 6&quot;, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;format(format=&#x27;% x&#x27;,args=x.__publickey_raw)&quot;}],

        # 0x0008:server/get-uri,0x0003:Type,
        [&quot;__c2server_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;00080003&quot;, length: 10000, max_length: 10000}],
        [&quot;C2Server&quot;, &quot;x=&gt;len(list=x.__c2server_prefix) + 6&quot;, &quot;String&quot;],

        # 0x0009:useragent,0x0003:Type,
        [&quot;__useragent_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;00090003&quot;, length: 10000, max_length: 10000}],
        [&quot;UserAgent&quot;, &quot;x=&gt;len(list=x.__useragent_prefix) + 6&quot;, &quot;String&quot;],

        # 0x000a:PostUri,0x0003:Type,
        [&quot;__PostUri_prefix&quot;, 0, &quot;String&quot;, {&quot;term_hex&quot;: &quot;000a0003&quot;, length: 10000, max_length: 10000}],
        [&quot;PostURI&quot;, &quot;x=&gt;len(list=x.__PostUri_prefix) + 6&quot;, &quot;String&quot;],

        # 0x000b:Malleable_C2_Instructions,0x0003:Type, adding length check as not sure if we can rely on termination
        [&quot;__Malleable_C2_Instructions_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;000b0003&quot;, length: 10000, max_length: 10000}],
        [&quot;__Malleable_C2_Instructions_length&quot;,&quot;x=&gt;len(list=x.__Malleable_C2_Instructions_prefix) + 4&quot;,&quot;uint16b&quot;],
        [&quot;__Malleable_C2_Instructions&quot;, &quot;x=&gt;len(list=x.__Malleable_C2_Instructions_prefix) + 6&quot;, &quot;String&quot;,{&quot;term&quot;:&quot;***NOTERM***&quot;, &quot;length&quot;: &quot;x=&gt; x.__Malleable_C2_Instructions_length&quot;}],
        [&quot;MalleableC2Instructions&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;format(format=&#x27;%s&#x27;, args=[regex_replace(source=x.__Malleable_C2_Instructions, re=&#x27;[^ -~\\r\\n]&#x27;, replace=&#x27;&#x27;)])&quot; }],
        #[&quot;Malleable_C2_Instructions&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;&#x27;base64:&#x27; + base64encode(string=x.__Malleable_C2_Instructions)&quot; }], #uncomment to return base64 encoded raw Malleable_C2_Instructions

        # 0x000c:HttpGetHeader,0x0003:Type, adding length check as we can not rely on termination
        [&quot;__HttpGetHeader_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;000c0003&quot;, length: 10000, max_length: 10000}],
        [&quot;__HttpGetHeader_length&quot;,&quot;x=&gt;len(list=x.__HttpGetHeader_prefix) + 4&quot;,&quot;uint16b&quot;],
        [&quot;__HttpGetHeader&quot;,&quot;x=&gt;len(list=x.__HttpGetHeader_prefix) + 6&quot;,&quot;String&quot;,{&quot;term&quot;:&quot;***NOTERM***&quot;, &quot;length&quot;: &quot;x=&gt; x.__HttpGetHeader_length&quot;}],
        [&quot;HttpGetHeader&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;format(format=&#x27;%s&#x27;, args=[regex_replace(source=x.__HttpGetHeader, re=&#x27;[^ -~\\r\\n]&#x27;, replace=&#x27;&#x27;)])&quot; }],
        #[&quot;HttpGetHeader&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;&#x27;base64:&#x27; + base64encode(string=x.__HttpGetHeader)&quot; }], #uncomment to return base64 encoded raw HttpGetHeader

        # 0x000d:HttpPostHeader,0x0003:Type, adding length check as we can not rely on termination
        [&quot;__http_post_header_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;000d0003&quot;, length: 10000, max_length: 10000}],
        [&quot;__HttpPostHeader_length&quot;,&quot;x=&gt;len(list=x.__http_post_header_prefix) + 4&quot;,&quot;uint16b&quot;],
        [&quot;__HttpPostHeader&quot;,&quot;x=&gt;len(list=x.__http_post_header_prefix) + 6&quot;,&quot;String&quot;,{&quot;term&quot;:&quot;***NOTERM***&quot;, &quot;length&quot;: &quot;x=&gt; x.__HttpPostHeader_length&quot;}],
        [&quot;HttpPostHeader&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;format(format=&#x27;%s&#x27;, args=[regex_replace(source=x.__HttpPostHeader, re=&#x27;[^ -~\\r\\n]&#x27;, replace=&#x27;&#x27;)])&quot; }],
        #[&quot;HttpPostHeader&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;&#x27;base64:&#x27; + base64encode(string=x.__HttpPostHeader)&quot; }], #uncomment to return base64 encoded raw HttpPostHeader

        # 0x000e:SpawnTo,0x0003:Type # Adding length check as we can not rely on termination
        [&quot;__SpawnTo_header_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;000e0003&quot;, length: 10000, max_length: 10000}],
        [&quot;__SpawnTo_header_length&quot;,&quot;x=&gt;len(list=x.__SpawnTo_header_prefix) + 4&quot;,&quot;uint16b&quot;],
        [&quot;__SpawnTo&quot;, &quot;x=&gt;len(list=x.__SpawnTo_header_prefix) + 6&quot;, &quot;String&quot;,{&quot;term&quot;:&quot;***NOTERM***&quot;, &quot;length&quot;: &quot;x=&gt; x.__SpawnTo_header_length&quot;}],
        [&quot;SpawnTo&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;format(format=&#x27;%s&#x27;, args=[regex_replace(source=x.__SpawnTo, re=&#x27;[^ -~\\r\\n]&#x27;, replace=&#x27;&#x27;)])&quot; }],
        #[&quot;SpawnTo&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;&#x27;base64:&#x27; + base64encode(string=x.__SpawnTo)&quot; }], #uncomment to return base64 encoded raw SpawnTo

        # 0x000f:PipeName,0x0003:Type
        [&quot;__pipename_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;000f0003&quot;, length: 10000, max_length: 10000}],
        [&quot;Pipename&quot;, &quot;x=&gt;len(list=x.__pipename_prefix) + 6&quot;, &quot;String&quot;,{&quot;term_hex&quot;:&quot;0000&quot;}],

        # 0x0010:KillDateYear, 0x0001:Type, 0x0002:Length
        [&quot;__KillDateYear_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;001000010002&quot;, length: 10000, max_length: 10000}],
        [&quot;KillDateYear&quot;, &quot;x=&gt;len(list=x.__KillDateYear_prefix) + 6&quot;, &quot;uint16b&quot;],

        # 0x0011:KillDateMonth, 0x0001:Type, 0x0002:Length
        [&quot;__KillDateMonth_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;001200010002&quot;, length: 10000, max_length: 10000}],
        [&quot;KillDateMonth&quot;, &quot;x=&gt;len(list=x.__KillDateMonth_prefix) + 6&quot;, &quot;uint16b&quot;],

        # 0x0012:KillDateDay, 0x0001:Type, 0x0002:Length
        [&quot;__KillDateDay_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;001200010002&quot;, length: 10000, max_length: 10000}],
        [&quot;KillDateDay&quot;, &quot;x=&gt;len(list=x.__KillDateDay_prefix) + 6&quot;, &quot;uint16b&quot;],

        # 0x0013:DNSIdle, 0x0002:Type, 0x0004:Length
        [&quot;__DNSIdle_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;001300020004&quot;, length: 10000, max_length: 10000}],
        [&quot;__DNSIdle1&quot;, &quot;x=&gt;len(list=x.__DNSIdle_prefix) + 6&quot;, &quot;uint8&quot;],
        [&quot;__DNSIdle2&quot;, &quot;x=&gt;len(list=x.__DNSIdle_prefix) + 7&quot;, &quot;uint8&quot;],
        [&quot;__DNSIdle3&quot;, &quot;x=&gt;len(list=x.__DNSIdle_prefix) + 8&quot;, &quot;uint8&quot;],
        [&quot;__DNSIdle4&quot;, &quot;x=&gt;len(list=x.__DNSIdle_prefix) + 9&quot;, &quot;uint8&quot;],
        [&quot;DNSIdle&quot;, 0, &quot;Value&quot;, {
            &quot;value&quot;: &quot;x=&gt; str(str=x.__DNSIdle1) + &#x27;.&#x27; + str(str=x.__DNSIdle2) + &#x27;.&#x27; + str(str=x.__DNSIdle3) + &#x27;.&#x27; + str(str=x.__DNSIdle4)&quot;
        }],

        # 0x0014:DNSSleep&#x27;, 0x0002:Type, 0x0004:Length
        [&quot;__DNSSleep_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;001400020004&quot;, length: 10000, max_length: 10000}],
        [&quot;DNSSleep&quot;, &quot;x=&gt;len(list=x.__DNSSleep_prefix) + 6&quot;, &quot;uint32b&quot;],

        # 0x0015:SSH_1, to complete - didnt find any examples assuming zero terminated
        [&quot;__SSH_1_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;00150003&quot;, length: 10000, max_length: 10000}],
        [&quot;SSH_1&quot;, &quot;x=&gt;len(list=x.__SSH_1_prefix) + 6&quot;, &quot;String&quot;],

        # 0x0016:SSH_2, to complete - didnt find any examples assuming zero terminated
        [&quot;__SSH_2_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;00160003&quot;, length: 10000, max_length: 10000}],
        [&quot;SSH_2&quot;, &quot;x=&gt;len(list=x.__SSH_2_prefix) + 6&quot;, &quot;String&quot;],

        # 0x0017:SSH_3, to complete - didnt find any examples assuming zero terminated
        [&quot;__SSH_3_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;00170003&quot;, length: 10000, max_length: 10000}],
        [&quot;SSH_3&quot;, &quot;x=&gt;len(list=x.__SSH_3_prefix) + 6&quot;, &quot;String&quot;],

        # 0x0018:SSH_4, to complete - didnt find any examples assuming zero terminated
        [&quot;__SSH_4_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;00180003&quot;, length: 10000, max_length: 10000}],
        [&quot;SSH_4&quot;, &quot;x=&gt;len(list=x.__SSH_4_prefix) + 6&quot;, &quot;String&quot;],

        # 0x0019:SSH_5, to complete - didnt find any examples assuming zero terminated
        [&quot;__SSH_5_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;00190003&quot;, length: 10000, max_length: 10000}],
        [&quot;SSH_5&quot;, &quot;x=&gt;len(list=x.__SSH_5_prefix) + 6&quot;, &quot;String&quot;],

        # 0x001a:GetVerb,0x0003:Type
        [&quot;__GetVerb_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;001a0003&quot;}],
        [&quot;GetVerb&quot;, &quot;x=&gt;len(list=x.__GetVerb_prefix) + 6&quot;, &quot;String&quot;,{&quot;term_hex&quot;:&quot;0000&quot;}],

        # 0x001b: PostVerb, 0x0003:Type
        [&quot;__PostVerb_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;001b0003&quot;}],
        [&quot;PostVerb&quot;, &quot;x=&gt;len(list=x.__PostVerb_prefix) + 6&quot;, &quot;String&quot;,{&quot;term_hex&quot;:&quot;0000&quot;}],

        # 0x001c:HttpPostChunk,0x0002:Type, 0x0004:Length
        [&quot;__HttpPostChunk_prefix&quot;, 0, &quot;String&quot;, {&quot;term_hex&quot;: &quot;001c00020004&quot;}],
        [&quot;HttpPostChunk&quot;, &quot;x=&gt;len(list=x.__HttpPostChunk_prefix) + 6&quot;, &quot;uint32b&quot;],

        # 0x001d:spawnto_x86,0x0003:Type
        [&quot;__spawnx86_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;001d0003&quot;, length: 10000, max_length: 10000}],
        [&quot;SpawnTox86&quot;, &quot;x=&gt;len(list=x.__spawnx86_prefix) + 6&quot;, &quot;String&quot;,{&quot;term_hex&quot;:&quot;0000&quot;}],

        # 0x001e:spawn_to_x64,0x0003:Type
        [&quot;__spawnx64_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;001e0003&quot;, length: 10000, max_length: 10000}],
        [&quot;SpawnTox64&quot;, &quot;x=&gt;len(list=x.__spawnx64_prefix) + 6&quot;, &quot;String&quot;,{&quot;term_hex&quot;:&quot;0000&quot;}],

        # 0x001f:CryptoScheme, 0x0001:Type, 0x0002:Length
        [&quot;__CryptoScheme_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;001f00010002&quot;, length: 10000, max_length: 10000}],
        [&quot;CryptoScheme&quot;, &quot;x=&gt;len(list=x.__CryptoScheme_prefix) + 6&quot;, &quot;uint16b&quot;],

        # 0x0020:Proxy, 0x0003:Type
        [&quot;__Proxy_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;000e0003&quot;, length: 10000, max_length: 10000}],
        #[&quot;__Proxy_length&quot;,&quot;x=&gt;len(list=x.__Proxy_prefix) + 4&quot;,&quot;uint16b&quot;],
        [&quot;Proxy&quot;, &quot;x=&gt;len(list=x.__Proxy_prefix) + 6&quot;, &quot;String&quot;],

        # 0x0021:ProxyUsername, 0x0003:Type
        [&quot;__ProxyUsername_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;000e0003&quot;, length: 10000, max_length: 10000}],
        [&quot;__ProxyUsername_length&quot;,&quot;x=&gt;len(list=x.__ProxyUsername_prefix) + 4&quot;,&quot;uint16b&quot;],
        [&quot;ProxyUsername&quot;, &quot;x=&gt;len(list=x.__ProxyUsername_prefix) + 6&quot;, &quot;String&quot;],

        # 0x0022:ProxyPassword, 0x0003:Type
        [&quot;__ProxyPassword_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;000e0003&quot;, length: 10000, max_length: 10000}],
        [&quot;__ProxyPassword_length&quot;,&quot;x=&gt;len(list=x.__ProxyPassword_prefix) + 4&quot;,&quot;uint16b&quot;],
        [&quot;ProxyPassword&quot;, &quot;x=&gt;len(list=x.__ProxyPassword_prefix) + 6&quot;, &quot;String&quot;],

        # 0x0023:ProxyType, 0x0001:Type, 0x0002:Length
        [&quot;__ProxyType&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;002300010002&quot;, length: 10000, max_length: 10000}],
        [&quot;ProxyType&quot;, &quot;x=&gt;len(list=x.__ProxyType) + 6&quot;, &quot;Enumeration&quot;, {
            &quot;type&quot;: &quot;uint16b&quot;,
            &quot;choices&quot;: {
                 &quot;1&quot;: &quot;No proxy&quot;,
                 &quot;2&quot;: &quot;IE settings&quot;,
                 &quot;4&quot;: &quot;Hardcoded proxy&quot;}
        }],

        # 0x0024:Deprecated, 0x0001:Type, 0x0002:Length
        [&quot;__Deprecated_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;002400010002&quot;, length: 10000, max_length: 10000}],
        [&quot;Deprecated&quot;, &quot;x=&gt;len(list=x.__Deprecated_prefix) + 6&quot;, &quot;uint16b&quot;],

        # 0x0025:LicenseId,0x0002:Type, 0x0004:Length
        [&quot;__LicenseId_prefix&quot;, 0, &quot;String&quot;, {&quot;term_hex&quot;: &quot;002500020004&quot;, length: 10000, max_length: 10000}],
        [&quot;LicenseId&quot;, &quot;x=&gt;len(list=x.__LicenseId_prefix) + 6&quot;, &quot;uint32b&quot;],

        # 0x0026:bStageCleanup, 0x0001:Type, 0x0002:Length
        [&quot;__bStageCleanup_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;002600010002&quot;, length: 10000, max_length: 10000}],
        [&quot;bStageCleanup&quot;, &quot;x=&gt;len(list=x.__bStageCleanup_prefix) + 6&quot;, &quot;uint16b&quot;],

        # 0x0027:bCFGCaution, 0x0001:Type, 0x0002:Length
        [&quot;__bCFGCaution_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;002700010002&quot;, length: 10000, max_length: 10000}],
        [&quot;bCFGCaution&quot;, &quot;x=&gt;len(list=x.__bCFGCaution_prefix) + 6&quot;, &quot;uint16b&quot;],

        # 0x0028:KillDate,0x0002:Type, 0x0004:Length
        [&quot;__KillDate_prefix&quot;, 0, &quot;String&quot;, {&quot;term_hex&quot;: &quot;002800020004&quot;, length: 10000, max_length: 10000}],
        [&quot;KillDate&quot;, &quot;x=&gt;len(list=x.__KillDate_prefix) + 6&quot;, &quot;uint32b&quot;],

        # 0x0029:TextSectionEnd,0x0002:Type, 0x0004:Length
        [&quot;__TextSectionEnd_prefix&quot;, 0, &quot;String&quot;, {&quot;term_hex&quot;: &quot;002900020004&quot;, length: 10000, max_length: 10000}],
        [&quot;TextSectionEnd&quot;, &quot;x=&gt;len(list=x.__TextSectionEnd_prefix) + 6&quot;, &quot;uint32b&quot;],

        # 0x002a:ObfuscateSectionsInfo,0x0003:Type # Adding length check as we can not rely on termination
        [&quot;__ObfuscateSectionsInfo_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;002a0003&quot;, length: 10000, max_length: 10000}],
        [&quot;__ObfuscateSectionsInfo_length&quot;,&quot;x=&gt;len(list=x.__ObfuscateSectionsInfo_prefix) + 4&quot;,&quot;uint16b&quot;],
        [&quot;__ObfuscateSectionsInfo&quot;, &quot;x=&gt;len(list=x.__ObfuscateSectionsInfo_prefix) + 6&quot;, &quot;String&quot;,{&quot;term&quot;:&quot;***NOTERM***&quot;, &quot;length&quot;: &quot;x=&gt; x.__ObfuscateSectionsInfo_length&quot;}],
        [&quot;ObfuscateSectionsInfo&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;format(format=&#x27;%s&#x27;, args=[regex_replace(source=x.__ObfuscateSectionsInfo, re=&#x27;[^ -~\\r\\n]&#x27;, replace=&#x27;&#x27;)])&quot; }],
        #[&quot;ObfuscateSectionsInfo&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;&#x27;base64:&#x27; + base64encode(string=x.__ObfuscateSectionsInfo)&quot; }], #uncomment to return base64 encoded raw ObfuscateSectionsInfo

        #0x002b:ProcessInjectStartRWX, 0x0001:Type, 0x0002:Length
        [&quot;__ProcessInjectStartRWX&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;002b00010002&quot;, length: 10000, max_length: 10000}],
        [&quot;ProcessInjectStartRWX&quot;, &quot;x=&gt;len(list=x.__ProcessInjectStartRWX) + 6&quot;, &quot;Enumeration&quot;, {
            &quot;type&quot;: &quot;uint16b&quot;,
            &quot;choices&quot;: {
                 &quot;0x1&quot;: &quot;PAGE_NOACCESS&quot;,
                 &quot;0x2&quot;: &quot;PAGE_READONLY&quot;,
                 &quot;0x4&quot;: &quot;PAGE_READWRITE&quot;,
                 &quot;0x8&quot;: &quot;PAGE_WRITECOPY&quot;,
                &quot;0x10&quot;: &quot;PAGE_EXECUTE&quot;,
                &quot;0x20&quot;: &quot;PAGE_EXECUTE_READ&quot;,
                &quot;0x40&quot;: &quot;PAGE_EXECUTE_READWRITE&quot;,
                &quot;0x80&quot;: &quot;PAGE_EXECUTE_WRITECOPY&quot;}
        }],

        #0x002c:ProcessInjectUseRWX, 0x0001:Type, 0x0002:Length
        [&quot;__ProcessInjectUseRWX&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;002c00010002&quot;, length: 10000, max_length: 10000}],
        [&quot;ProcessInjectUseRWX&quot;, &quot;x=&gt;len(list=x.__ProcessInjectUseRWX) + 6&quot;, &quot;Enumeration&quot;, {
            &quot;type&quot;: &quot;uint16b&quot;,
            &quot;choices&quot;: {
                 &quot;0x1&quot;: &quot;PAGE_NOACCESS&quot;,
                 &quot;0x2&quot;: &quot;PAGE_READONLY&quot;,
                 &quot;0x4&quot;: &quot;PAGE_READWRITE&quot;,
                 &quot;0x8&quot;: &quot;PAGE_WRITECOPY&quot;,
                &quot;0x10&quot;: &quot;PAGE_EXECUTE&quot;,
                &quot;0x20&quot;: &quot;PAGE_EXECUTE_READ&quot;,
                &quot;0x40&quot;: &quot;PAGE_EXECUTE_READWRITE&quot;,
                &quot;0x80&quot;: &quot;PAGE_EXECUTE_WRITECOPY&quot;}
        }],

        # 0x002d:ProcessInjectMinAlloc,0x0002:Type, 0x0004:Length
        [&quot;__ProcessInjectMinAlloc_prefix&quot;, 0, &quot;String&quot;, {&quot;term_hex&quot;: &quot;002d00020004&quot;, length: 10000, max_length: 10000}],
        [&quot;ProcessInjectMinAlloc&quot;, &quot;x=&gt;len(list=x.__ProcessInjectMinAlloc_prefix) + 6&quot;, &quot;uint32b&quot;],

        # 0x002e:ProcessInjectTransformx86, 0x0003:Type, # Adding length check as we can not rely on termination
        [&quot;__ProcessInjectTransformx86_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;002e0003&quot;, length: 10000, max_length: 10000}],
        [&quot;__ProcessInjectTransformx86_length&quot;,&quot;x=&gt;len(list=x.__ProcessInjectTransformx86_prefix) + 4&quot;,&quot;uint16b&quot;],
        [&quot;__ProcessInjectTransformx86&quot;, &quot;x=&gt;len(list=x.__ProcessInjectTransformx86_prefix) + 6&quot;, &quot;String&quot;,{&quot;term&quot;:&quot;***NOTERM***&quot;, &quot;length&quot;: &quot;x=&gt; x.__ProcessInjectTransformx86_length&quot;}],
        [&quot;ProcessInjectTransformx86&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;format(format=&#x27;%s&#x27;, args=[regex_replace(source=x.__ProcessInjectTransformx86, re=&#x27;[^ -~\\r\\n]&#x27;, replace=&#x27;&#x27;)])&quot; }],
        #[&quot;ProcessInjectTransformx86&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;&#x27;base64:&#x27; + base64encode(string=x.__ProcessInjectTransformx86)&quot; }],#uncomment to return base64 encoded raw ProcessInjectTransformx86


        # 0x002f:ProcessInjectTransformx64, 0x0003:Type, # Adding length check as we can not rely on termination
        [&quot;__ProcessInjectTransformx64_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;002f0003&quot;, length: 10000, max_length: 10000}],
        [&quot;__ProcessInjectTransformx64_length&quot;,&quot;x=&gt;len(list=x.__ProcessInjectTransformx64_prefix) + 4&quot;,&quot;uint16b&quot;],
        [&quot;__ProcessInjectTransformx64&quot;, &quot;x=&gt;len(list=x.__ProcessInjectTransformx64_prefix) + 6&quot;, &quot;String&quot;,{&quot;term&quot;:&quot;***NOTERM***&quot;, &quot;length&quot;: &quot;x=&gt; x.__ProcessInjectTransformx64_length&quot;}],
        [&quot;ProcessInjectTransformx64&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;format(format=&#x27;%s&#x27;, args=[regex_replace(source=x.__ProcessInjectTransformx64, re=&#x27;[^ -~\\r\\n]&#x27;, replace=&#x27;&#x27;)])&quot; }],
        #[&quot;ProcessInjectTransformx64&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;&#x27;base64:&#x27; + base64encode(string=x.__ProcessInjectTransformx64)&quot; }],#uncomment to return base64 encoded raw ProcessInjectTransformx64

        # 0x0032:UsesCookies, 0x0001:Type, 0x0002:Length
        [&quot;__UsesCookies_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;003200010002&quot;, length: 10000, max_length: 10000}],
        [&quot;UsesCookies&quot;, &quot;x=&gt;len(list=x.__UsesCookies_prefix) + 6&quot;, &quot;uint16b&quot;],

        # 0x0033:ProcessInjectExecute, 0x0003:Type # Adding length check as we can not rely on termination
        [&quot;__ProcessInjectExecute_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;00330003&quot;, length: 10000, max_length: 10000}],
        [&quot;__ProcessInjectExecute_length&quot;,&quot;x=&gt;len(list=x.__ProcessInjectExecute_prefix) + 4&quot;,&quot;uint16b&quot;],
        [&quot;__ProcessInjectExecute&quot;, &quot;x=&gt;len(list=x.__ProcessInjectExecute_prefix) + 6&quot;, &quot;String&quot;,{&quot;term&quot;:&quot;***NOTERM***&quot;, &quot;length&quot;: &quot;x=&gt; x.__ProcessInjectExecute_length&quot;}],
        [&quot;ProcessInjectExecute&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;format(format=&#x27;%s&#x27;, args=[regex_replace(source=x.__ProcessInjectExecute, re=&#x27;[^ -~\\r\\n]&#x27;, replace=&#x27;&#x27;)])&quot; }],
        #[&quot;ProcessInjectExecute&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;&#x27;base64:&#x27; + base64encode(string=x.__ProcessInjectExecute)&quot; }], #uncomment to return base64 encoded raw ProcessInjectExecute

        # 0x0034:ProcessInjectAllocationMethod, 0x0001:Type, 0x0002:Length
        [&quot;__ProcessInjectAllocationMethod_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;003400010002&quot;, length: 10000, max_length: 10000}],
        [&quot;ProcessInjectAllocationMethod&quot;, &quot;x=&gt;len(list=x.__ProcessInjectAllocationMethod_prefix) + 6&quot;, &quot;uint16b&quot;],

        # 0x0035:ProcessInjectStub, 0x0003:Type # Adding length check as we can not rely on termination
        [&quot;__ProcessInjectStub_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;00350003&quot;, length: 10000, max_length: 10000}],
        [&quot;__ProcessInjectStub_length&quot;,&quot;x=&gt;len(list=x.__ProcessInjectStub_prefix) + 4&quot;,&quot;uint16b&quot;],
        [&quot;__ProcessInjectStub&quot;, &quot;x=&gt;len(list=x.__ProcessInjectStub_prefix) + 6&quot;, &quot;String&quot;,{&quot;term_hex&quot;:&quot;00000000&quot;, &quot;length&quot;: &quot;x=&gt; x.__ProcessInjectStub_length&quot;}],
        [&quot;ProcessInjectStub&quot;,0,&quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;format(format=&#x27;% x&#x27;, args=x.__ProcessInjectStub)&quot; }],

        # 0x0036:HostHeader, 0x0003:Type # Adding length check as we can not rely on termination
        [&quot;__HostHeader_prefix&quot;, 0, &quot;String&quot;,{&quot;term_hex&quot;: &quot;00360003&quot;, length: 10000, max_length: 10000}],
        [&quot;__HostHeader_length&quot;,&quot;x=&gt;len(list=x.__HostHeader_prefix) + 4&quot;,&quot;uint16b&quot;],
        [&quot;HostHeader&quot;, &quot;x=&gt;len(list=x.__HostHeader_prefix) + 6&quot;, &quot;String&quot;,{&quot;term_hex&quot;:&quot;00000000&quot;, &quot;length&quot;: &quot;x=&gt; x.__HostHeader_length&quot;}],

    ]],
    [Shellcode, 0, [
        [&quot;__Position&quot;, 0, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;unhex(string=position(data=_Data))&quot;}],
        [&quot;Server&quot;, 0, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;regex_replace(source=regex_replace(source=x.__Position,re=&#x27;\\x{00}.{4}[^$]*$&#x27;,replace=&#x27;&#x27;),re=&#x27;\u0000&#x27;,replace=&#x27;&#x27;)&quot;}],
        [&quot;TargetUri&quot;, 0, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;find_strings(data=_Data,length=5,filter=&#x27;^/&#x27;).Strings[0]&quot;}],
        [&quot;__LicenseBytes&quot;, 0, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;read_file(accessor=&#x27;data&#x27;,filename=x.__Position || &#x27;&#x27;, offset=len(list=x.Server) + 1 ,length=4)&quot;}],
        [&quot;License&quot;, 0, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;parse_binary(accessor=&#x27;data&#x27;, filename=x.__LicenseBytes,struct=&#x27;uint32b&#x27;)&quot;}],
        [&quot;Strings&quot;, 0, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;find_strings(data=_Data,length=5,filter=&#x27;.&#x27;).Strings&quot;}],
    ]],

    [&quot;EmbeddedPE&quot;, 0, [
        [&quot;__PayloadType&quot;, 0, &quot;uint32&quot;],
        [&quot;PayloadType&quot;, 0, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;format(format=&#x27;0x%08x&#x27;,args=x.__PayloadType)&quot;}],
        [&quot;__PayloadSize&quot;, 4, &quot;uint32&quot;],
        #[&quot;PayloadSize&quot;, 4, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;format(format=&#x27;0x%08x&#x27;,args=x.__PayloadSize)&quot;}],
        [&quot;__XorKey&quot;, 8, &quot;uint32b&quot;],
        [&quot;XorKey&quot;, 8, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;format(format=&#x27;0x%08x&#x27;,args=x.__XorKey)&quot;}],
        [&quot;__Id2&quot;, 12, &quot;uint32&quot;],
        [&quot;Id2&quot;, 12, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;format(format=&#x27;0x%08x&#x27;,args=x.__Id2)&quot;}],
        [&quot;__Payload&quot;, 16, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;read_file(accessor=&#x27;data&#x27;,filename=embedded_section(path=TargetBytes || OSPath,
                type=if(condition=TargetBytes,then=&#x27;data&#x27;,else=&#x27;auto&#x27;))[0].Data || &#x27;&#x27;, offset=16,length=x.__PayloadSize)&quot;}],
        #[&quot;__Payload&quot;, 16, &quot;String&quot;,{&quot;term_hex&quot;:&quot;&quot;,length=x.__PayloadSize)&quot;}],
        [&quot;DecodedPayload&quot;, 16, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;xor(string=x.__Payload,key=unhex(string=x.XorKey))&quot;}],
        [&quot;PayloadHash&quot;, 16, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;hash(path=xor(string=x.__Payload,key=unhex(string=x.XorKey)),accessor=&#x27;data&#x27;)&quot;}],
        [&quot;OriginalFileHash&quot;, 16, &quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;hash(path=OSPath)&quot;}],
    ]]]&#x27;&#x27;&#x27;


sources:
  - query: |
      -- unique function to groupby value for enumerate
      LET unique(values) = SELECT _value as value FROM foreach(row=values) GROUP BY _value

      -- section to dynamically generate Xor configuration yara hunt strings
      LET a &lt;= unhex(string=&#x27;01&#x27;)
      LET b &lt;= unhex(string=&#x27;02&#x27;)
      LET c &lt;= unhex(string=&#x27;03&#x27;)

      LET XorChars &lt;=
        SELECT format(format=&quot;%#02x&quot;, args=_value) AS H,
            unhex(string=format(format=&quot;%02x&quot;, args=_value)) as X
        FROM range(start=0, end=256, step=1)
        WHERE if(condition=BruteXor,
                    then=True,
                    else= H=~ &#x27;0x2e|0x69&#x27;)

      Let XorCharsStep2 =
        SELECT H, X,
            xor(string=a, key=X) as aXor,
            xor(string=b, key=X) as bXor,
            xor(string=c, key=X) as cXor,
            len(list=X)
        FROM XorChars

      LET YaraStrings =
        SELECT -- { 00 01 00 01 00 02 ?? ?? 00 02 00 01 00 02 ?? ?? 00 03 }
            X,H,
            H + &#x27; = { &#x27; + format(format=&#x27;% x&#x27;, args=X + aXor + X + aXor + X + bXor) +
            &#x27; ?? ?? &#x27; + format(format=&#x27;% x&#x27;, args=X + bXor + X + aXor + X + bXor) +
            &#x27; ?? ?? &#x27; + format(format=&#x27;% x&#x27;, args=X + cXor) + &#x27; }&#x27;  as Line
        FROM XorCharsStep2

      LET FindConfig =
            regex_replace(
                source=FindConfigTemplate,
                re=&#x27;REPLACEME&#x27;,
                replace=join(array=YaraStrings.Line, sep=&quot; $$&quot;))


      -- function to extract potential additional encoded PE in data section
      LET embedded_section(path,type) = SELECT
            path as OriginalFileName,
            _value.Name as Name,
            _value.Size as Size,
            _value.FileOffset as FileOffset,
            _value.VMA as VMA,
            _value.RVA as RVA,
            _value.Perm as Perm,
            read_file(filename=path,
                      accessor=type,
                      offset=_value.FileOffset,
                      length=_value.Size) as Data
        FROM foreach(row= parse_pe(file=path,accessor=type).Sections)
        WHERE Name = &#x27;.data&#x27; AND Size &gt; 15


      -- scan DataBytes for CobaltStrike config
      LET ByteConfiguration = SELECT Rule,
                len(list=TargetBytes) as Size,
                hash(path=TargetBytes,accessor=&#x27;data&#x27;) as Hash,
                format(format=&quot;%v_%v.bin&quot;, args=[Rule,String.Offset]) as _DecodedDataName,
                Xor,_Data,
                Rule  as _Group
            FROM switch( -- switchcase will find beacon as priority, then search for shellcode
                beacon = {
                    SELECT *,
                        substr(start=0,end=1,str=String.Data) as Xor,
                        read_file(accessor=&#x27;data&#x27;,
                                  filename=TargetBytes,
                                  offset= String.Offset,
                                  length=ExtractBytes) as _Data
                    FROM yara(accessor=&#x27;data&#x27;,files=TargetBytes || &quot;&quot;,
                              rules=FindConfig, number=99)
                },
                shellcode = {
                    SELECT *, &#x27;&#x27; as Xor,
                        read_file(accessor=&#x27;data&#x27;,
                                  filename=TargetBytes,
                                  offset=String.Offset,length=4096) as _Data
                    FROM yara(accessor=&#x27;data&#x27;,
                              files=TargetBytes,
                              rules=FindShellcode, number=99)
                },
                section_encoded_pe = {
                    SELECT *,
                        &#x27;Embedded data section: &#x27; + Rule as Rule,
                        substr(start=0,end=1,str=String.Data) as Xor,
                        read_file(accessor=&#x27;data&#x27;,
                                  filename=File.OSPath,
                                  offset=String.Offset,
                                  length=ExtractBytes) as _Data
                    FROM yara(files=parse_binary(
                                accessor=&#x27;data&#x27;,
                                filename= embedded_section(
                                     path=TargetBytes, type=&#x27;data&#x27;)[0].Data || &quot;&quot;,
                                profile=PROFILE,
                                struct=&quot;EmbeddedPE&quot;).DecodedPayload,
                              accessor=&#x27;data&#x27;, rules=FindConfig, number=99)
                },
                    section_encoded_stager = {
                        SELECT *,
                            &#x27;&#x27; as Xor,
                            &#x27;Embedded data section: &#x27; + Rule as Rule,
                            read_file(accessor=&#x27;data&#x27;,
                                      filename=File.OSPath) as _Data
                        FROM yara(files=parse_binary(
                                     accessor=&#x27;data&#x27;,
                                     filename= embedded_section(
                                          path=TargetBytes,type=&#x27;data&#x27;)[0].Data || &quot;&quot;,
                                     profile=PROFILE,
                                     struct=&quot;EmbeddedPE&quot;).DecodedPayload,
                                  accessor=&#x27;data&#x27;, rules=FindShellcode, number=99)
                    },
                sleepfunction = {
                    SELECT *, &#x27;&#x27; as Xor,
                    if(condition= String.Name= &#x27;$x86&#x27;,
                            then= &#x27;Sleep mask 32-bit 4.2 deobfuscation routine found.&#x27;,
                            else= &#x27;Sleep mask 64-bit 4.2 deobfuscation routine found.&#x27;) as _Data
                    FROM yara(accessor=&#x27;data&#x27;,files=TargetBytes, rules=FindSleepFunction, number=1)
                })

      -- find target files
      LET TargetFiles = SELECT OSPath AS OSPath,Size
        FROM glob(globs=TargetFileGlob) WHERE NOT IsDir


      -- scan files in scope with our rule
      LET FileConfiguration = SELECT * FROM foreach(row=TargetFiles,
            query={
                SELECT
                    Rule,
                    OSPath, Size,
                    hash(path=OSPath) as Hash,
                    Xor,_Data,
                    Rule + &#x27;|&#x27; + OSPath.String as _Group,
                    format(format=&quot;%v_%v_%v.bin&quot;, args=[Rule,OSPath,String.Offset]) as _DecodedDataName
                FROM switch( -- switchcase will find beacon as priority, then search for shellcode
                    beacon = {
                        SELECT *,
                            substr(start=0,end=1,str=String.Data) as Xor,
                            read_file(
                               filename=OSPath,
                               offset= String.Offset,
                               length=ExtractBytes) as _Data
                        FROM yara(files=OSPath, rules=FindConfig, number=99)
                    },

                    shellcode = {
                        SELECT *, &#x27;&#x27; as Xor,
                            read_file(filename=OSPath,length=4096) as _Data
                        FROM yara(files=OSPath, rules=FindShellcode, number=99)
                    },

                    section_encoded_pe = {
                        SELECT *,
                            &#x27;Embedded data section: &#x27; + Rule as Rule,
                            substr(start=0,end=1,str=String.Data) as Xor,
                            read_file(accessor=&#x27;data&#x27;,filename=File.OSPath,
                                      offset=String.Offset,length=ExtractBytes) as _Data
                        FROM yara(files=parse_binary(
                                      accessor=&#x27;data&#x27;,
                                      filename= embedded_section(path=OSPath,type=&#x27;auto&#x27;)[0].Data || &quot;&quot;,
                                      profile=PROFILE,
                                      struct=&quot;EmbeddedPE&quot;).DecodedPayload,
                                  accessor=&#x27;data&#x27;, rules=FindConfig, number=99)
                    },
                    section_encoded_stager = {
                        SELECT *,
                            &#x27;&#x27; as Xor,
                            &#x27;Embedded data section: &#x27; + Rule as Rule,
                            read_file(accessor=&#x27;data&#x27;,
                                      filename=File.OSPath,
                                      length=ExtractBytes) as _Data
                        FROM yara(files=parse_binary(
                                      accessor=&#x27;data&#x27;,
                                      filename= embedded_section(path=OSPath,type=&#x27;auto&#x27;)[0].Data || &quot;&quot;,
                                      profile=PROFILE,
                                      struct=&quot;EmbeddedPE&quot;).DecodedPayload,
                                  accessor=&#x27;data&#x27;, rules=FindShellcode, number=99)
                    },
                    sleepfunction = {
                        SELECT *, &#x27;&#x27; as Xor,
                            if(condition= String.Name= &#x27;$x86&#x27;,
                                then= &#x27;Sleep mask 32-bit 4.2 deobfuscation routine found.&#x27;,
                                else= &#x27;Sleep mask 64-bit 4.2 deobfuscation routine found.&#x27;) as _Data
                        FROM yara(files=OSPath, rules=FindSleepFunction, number=1)
                    })
            })


      -- find velociraptor process
      LET me &lt;= SELECT * FROM if(condition= NOT ( TargetFileGlob OR TargetBytes ),
                    then = { SELECT Pid FROM pslist(pid=getpid()) })


      -- find all processes and add filters
      LET processes = SELECT Name as ProcessName, CommandLine, Pid
        FROM pslist()
        WHERE
            Name =~ ProcessRegex
            AND format(format=&quot;%d&quot;, args=Pid) =~ PidRegex
            AND NOT Pid in me.Pid

      -- scan processes in scope with our rule
      LET ProcessConfiguration = SELECT * FROM foreach(
        row=processes,
        query={
            SELECT Rule,
                Pid, ProcessName, CommandLine,
                format(format=&quot;%v_%v_%v_%v.bin&quot;, args=[Rule,ProcessName,Pid,String.Offset]) as _DecodedDataName,
                Xor,_Data,_Group
            FROM switch( -- switchcase will find beacon as priority, then search for shellcode
                beacon = {
                    SELECT *,
                        substr(start=0,end=1,str=String.Data) as Xor,
                        read_file(accessor=&#x27;process&#x27;,
                                  filename=str(str=Pid),
                                  offset= String.Offset,
                                  length=ExtractBytes) as _Data,
                        Rule +&#x27;|&#x27;+ str(str=Pid) +&#x27;|&#x27;+ ProcessName +&#x27;|&#x27;+ CommandLine as _Group
                    FROM yara(accessor=&#x27;process&#x27;,files=str(str=Pid), rules=FindConfig, number=99)
                },
                shellcode = {
                    SELECT *, &#x27;&#x27; as Xor,
                        read_file(accessor=&#x27;process&#x27;,
                                  filename=str(str=Pid),
                                  offset=String.Offset,length=4096) as _Data,
                        Rule +&#x27;|&#x27;+ str(str=Pid) +&#x27;|&#x27;+ ProcessName +&#x27;|&#x27;+ CommandLine as _Group
                    FROM yara(accessor=&#x27;process&#x27;,files=str(str=Pid), rules=FindShellcode, number=99)
                },
                sleepfunction = {
                    SELECT *, &#x27;&#x27; as Xor,
                        if(condition= String.Name= &#x27;$x86&#x27;,
                            then= &#x27;Sleep mask 32-bit 4.2 deobfuscation routine found.&#x27;,
                            else= &#x27;Sleep mask 64-bit 4.2 deobfuscation routine found.&#x27;) as _Data,
                        &#x27;&#x27; as _Group
                    FROM yara(accessor=&#x27;process&#x27;,files=str(str=Pid), rules=FindSleepFunction, number=1)
                })
        })


      -- Add dynamic functions for shellcode parsing
      LET position(data) = if(condition= len(list=split(string=format(format=&#x27;%x&#x27;,args=data),sep=&#x27;ffff&#x27;)) &gt; 1,
            then= split(string=format(format=&#x27;%x&#x27;,args=data),sep=&#x27;ffff&#x27;)[-1],
            else= False )
      LET find_strings(data,length,filter) = SELECT Strings
        FROM parse_records_with_regex(file=data,accessor=&#x27;data&#x27;,regex=&#x27;(?P&lt;Strings&gt;[ -~]+)&#x27;)
        WHERE len(list=Strings) &gt; length - 1
            AND Strings =~ filter
            AND NOT Strings =~ &#x27;^\\s+$&#x27;
        LIMIT 150


      -- generate results remove any FPs
      LET results &lt;= SELECT *,
            if(condition= Rule=~&#x27;cobalt_strike_beacon$&#x27;,
                then= format(format=&#x27;0x%x&#x27;,args=Xor),else=&#x27;0x00&#x27;) as Xor,
            if(condition= Rule=~&#x27;cobalt_strike_beacon&#x27;,
                then= parse_binary(accessor=&#x27;data&#x27;,
                    filename= xor(string=_Data || &quot;&quot; ,key=Xor),
                    profile = PROFILE,struct  = &quot;CobaltConfig&quot;),
                else= if(condition= Rule=~&#x27;cobalt_strike_shellcode&#x27;,
                    then= parse_binary(accessor=&#x27;data&#x27;,
                        filename= _Data || &quot;&quot;,
                        profile = PROFILE,struct=&quot;Shellcode&quot;),
                    else= _Data )) AS DecodedConfig
        FROM if(condition=TargetBytes,
            then=ByteConfiguration,
            else= if(condition=TargetFileGlob,
                then= FileConfiguration,
                else= ProcessConfiguration))
        WHERE _Data
            AND
              (( DecodedConfig.C2Server =~ &#x27;^[ -~]+$&#x27; AND DecodedConfig.BeaconType )
            OR ( DecodedConfig.Pipename =~ &#x27;^[ -~]+$&#x27; AND DecodedConfig.BeaconType )
            OR DecodedConfig.Server =~ &#x27;^[ -~]+&#x27; -- AND DecodedConfig.TargetUri )
            OR Rule=&#x27;cobalt_strike_sleepfunction&#x27; )

      -- add decoded data seperate to keep pretty output
      LET output_decoded_data = SELECT *,
            upload(accessor = &#x27;data&#x27;,
                file = if(condition = Rule=&#x27;cobalt_strike_beacon&#x27;,
                            then = xor(string=_Data,key=unhex(string=Xor)),
                            else = _Data),
                name = _DecodedDataName) as DecodedData
        FROM results

      LET cleanup(config) = to_dict(item=
            {
                SELECT _key, _value
                FROM items(item=config)
                WHERE NOT _key =~ &#x27;^__&#x27;  AND ( _value  OR _key =~ &#x27;^license&#x27; )
            })

      -- output rows, standard config priority, exclude _Data
      SELECT *,
        if(condition= format(format=&#x27;%T&#x27;,args=DecodedConfig)=&#x27;string&#x27;,
            then= DecodedConfig,
            else= cleanup(config=DecodedConfig)) as DecodedConfig
      FROM column_filter(
        query={
            SELECT * ,
                 -- NOTE: some junk strings for shellcode _Group are removed in GROUP BY
                if(condition= Rule=&#x27;cobalt_strike_beacon&#x27;,
                    then= _Group +&#x27;|&#x27;+ str(str=DecodedConfig),
                    else= _Group +&#x27;|&#x27;+ str(str=DecodedConfig.Server) +&#x27;|&#x27;+ str(str=DecodedConfig.TargetUri) +&#x27;|&#x27;+ str(str=DecodedConfig.Licence) ) as _Group
            FROM if(condition=IncludeDecodedData,
                then= output_decoded_data,
                else= results)
            GROUP BY _Group
        }, exclude=[&quot;_Data&quot;,&quot;_Group&quot;])

column_types:
  - name: DecodedData
    type: preview_upload

</code></pre>

