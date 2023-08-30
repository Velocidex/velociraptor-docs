---
title: Windows.Forensics.Lnk
hidden: true
tags: [Client Artifact]
---

This artiact parses LNK shortcut files.

A LNK file is a type of Shell Item that serves as a shortcut or reference to a 
specific file, folder, or application. It contains metadata and information 
about the accessed file or location and is a valuable forensic artifact. 
LNK files can be automatically created by the Windows operating system when a 
user accesses a file from a supported application or manually created by the user.

This artifact has several configurable options:

- TargetGlob: glob targeting. Default targets *.lnk files in user path.
- IOCRegex: Regex search on key fields: StringData, TrackerData and PropertyStore.
- IgnoreRegex: Ignore regex filter on key fields.
- UploadLnk: uploads lnk hits.

List of fields targeted by filter regex:

  - StringData.TargetPath
  - StringData.Name
  - StringData.RelativePath
  - StringData.WorkingDir
  - StringData.Arguments
  - StringData.IconLocation
  - LinkTarget.LinkTarget
  - PropertyStore
  - TrackerData.MachineID
  - TrackerData.MacAddress  
    
  NOTE: regex startof (^) and endof ($) line modifiers will not work.


<pre><code class="language-yaml">
name: Windows.Forensics.Lnk
author: Matt Green - @mgreen27
description: |
  This artiact parses LNK shortcut files.
  
  A LNK file is a type of Shell Item that serves as a shortcut or reference to a 
  specific file, folder, or application. It contains metadata and information 
  about the accessed file or location and is a valuable forensic artifact. 
  LNK files can be automatically created by the Windows operating system when a 
  user accesses a file from a supported application or manually created by the user.
  
  This artifact has several configurable options:
  
  - TargetGlob: glob targeting. Default targets *.lnk files in user path.
  - IOCRegex: Regex search on key fields: StringData, TrackerData and PropertyStore.
  - IgnoreRegex: Ignore regex filter on key fields.
  - UploadLnk: uploads lnk hits.
  
  List of fields targeted by filter regex:
  
    - StringData.TargetPath
    - StringData.Name
    - StringData.RelativePath
    - StringData.WorkingDir
    - StringData.Arguments
    - StringData.IconLocation
    - LinkTarget.LinkTarget
    - PropertyStore
    - TrackerData.MachineID
    - TrackerData.MacAddress  
      
    NOTE: regex startof (^) and endof ($) line modifiers will not work.


reference:
  - https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-shllink

parameters:
  - name: TargetGlob
    default: C:\Users\**\*.lnk
  - name: IocRegex
    type: regex
    description: A regex to filter on all fields
  - name: IgnoreRegex
    type: regex
    description: A regex to ignore ilter all fields
  - name: UploadLnk
    description: Also upload the link files themselves.
    type: bool

export: |
     LET Profile = &#x27;&#x27;&#x27;
     [
      [&quot;ShellLinkHeader&quot;, 0, [
        [&quot;HeaderSize&quot;, 0, &quot;uint32&quot;],
        [&quot;__LinkClsID&quot;, 4, &quot;String&quot;, {
            &quot;length&quot;: 16,
            &quot;term&quot;: &quot;&quot;
        }],
        [&quot;LinkClsID&quot;, 0, &quot;Value&quot;, {
            &quot;value&quot;: &quot;x=&gt;format(format=&#x27;%x&#x27;, args=x.__LinkClsID)&quot;
        }],
        [&quot;LinkFlags&quot;, 20, &quot;Flags&quot;, {
            &quot;type&quot;: &quot;uint32&quot;,
            &quot;bitmap&quot;: {
                &quot;HasLinkTargetIDList&quot;: 0,
                &quot;HasLinkInfo&quot;: 1,
                &quot;HasName&quot;: 2,
                &quot;HasRelativePath&quot;: 3,
                &quot;HasWorkingDir&quot;: 4,
                &quot;HasArguments&quot;: 5,
                &quot;HasIconLocation&quot;: 6,
                &quot;IsUnicode&quot;: 7,
                &quot;ForceNoLinkInfo&quot;: 8,
                &quot;HasExpString&quot;: 9,
                &quot;RunInSeparateProcess&quot;: 10,
                &quot;HasDarwinID&quot;: 12,
                &quot;RunAsUser&quot;: 13,
                &quot;HasExpIcon&quot;: 14,
                &quot;NoPidlAlias&quot;: 15,
                &quot;RunWithShimLayer&quot;: 17,
                &quot;ForceNoLinkTrack&quot;: 18,
                &quot;EnableTargetMetadata&quot;: 19,
                &quot;DisableLinkPathTracking&quot;: 20,
                &quot;DisableKnownFolderTracking&quot;: 21,
                &quot;DisableKnownFolderAlias&quot;: 22,
                &quot;AllowLinkToLink&quot;: 23,
                &quot;UnaliasOnSave&quot;: 24,
                &quot;PreferEnvironmentPath&quot;: 25,
                &quot;KeepLocalIDListForUNCTarget&quot;: 26
            }
        }],
        [&quot;FileAttributes&quot;, 24, &quot;Flags&quot;, {
            &quot;type&quot;: &quot;uint32&quot;,
            &quot;bitmap&quot;: {
                &quot;FILE_ATTRIBUTE_READONLY&quot;: 0,
                &quot;FILE_ATTRIBUTE_HIDDEN&quot;: 1,
                &quot;FILE_ATTRIBUTE_SYSTEM&quot;: 2,
                &quot;FILE_ATTRIBUTE_DIRECTORY&quot;: 4,
                &quot;FILE_ATTRIBUTE_ARCHIVE&quot;: 5,
                &quot;FILE_ATTRIBUTE_NORMAL&quot;: 7,
                &quot;FILE_ATTRIBUTE_TEMPORARY&quot;: 8,
                &quot;FILE_ATTRIBUTE_SPARSE_FILE&quot;: 9,
                &quot;FILE_ATTRIBUTE_REPARSE_POINT&quot;: 10,
                &quot;FILE_ATTRIBUTE_COMPRESSED&quot;: 11,
                &quot;FILE_ATTRIBUTE_OFFLINE&quot;: 12,
                &quot;FILE_ATTRIBUTE_NOT_CONTENT_INDEXED&quot;: 13,
                &quot;FILE_ATTRIBUTE_ENCRYPTED&quot;: 14,
            }
        }],
        [&quot;CreationTime&quot;, 28, &quot;WinFileTime&quot;, {
            &quot;type&quot;: &quot;uint64&quot;
        }],
        [&quot;AccessTime&quot;, 36, &quot;WinFileTime&quot;, {
            &quot;type&quot;: &quot;uint64&quot;
        }],
        [&quot;WriteTime&quot;, 44, &quot;WinFileTime&quot;, {
            &quot;type&quot;: &quot;uint64&quot;
        }],
        
        [&quot;FileSize&quot;, 52, &quot;uint32&quot;],
        [&quot;IconIndex&quot;, 56, &quot;uint32&quot;],
        [&quot;ShowCommand&quot;, 60, &quot;Enumeration&quot;, {
            &quot;type&quot;: &quot;uint32&quot;,
            &quot;map&quot;: {
                &quot;SHOWNORMAL&quot;: 0x00000001,
                &quot;SHOWMAXIMIZED&quot;: 0x00000003,
                &quot;SHOWMINNOACTIVE&quot;: 0x00000007,
            }
        }],
        [&quot;__HotKeyLow&quot;, 62, &quot;Enumeration&quot;, {
            &quot;type&quot;: &quot;uint8&quot;,
            &quot;map&quot;: {
                &quot;No key assigned.&quot; : 0x00,
                &quot;0&quot; :   0x30,
                &quot;1&quot; :   0x31,
                &quot;2&quot; :   0x32,
                &quot;3&quot; :   0x33,
                &quot;4&quot; :   0x34,
                &quot;5&quot; :   0x35,
                &quot;6&quot; :   0x36,
                &quot;7&quot; :   0x37,
                &quot;8&quot; :   0x38,
                &quot;9&quot; :   0x39,
                &quot;A&quot; :   0x41,
                &quot;B&quot; :   0x42,
                &quot;C&quot; :   0x43,
                &quot;D&quot; :   0x44,
                &quot;E&quot; :   0x45,
                &quot;F&quot; :   0x46,
                &quot;G&quot; :   0x47,
                &quot;H&quot; :   0x48,
                &quot;I&quot; :   0x49,
                &quot;J&quot; :   0x4A,
                &quot;K&quot; :   0x4B,
                &quot;L&quot; :   0x4C,
                &quot;M&quot; :   0x4D,
                &quot;N&quot; :   0x4E,
                &quot;O&quot; :   0x4F,
                &quot;P&quot; :   0x50,
                &quot;Q&quot; :   0x51,
                &quot;R&quot; :   0x52,
                &quot;S&quot; :   0x53,
                &quot;T&quot; :   0x54,
                &quot;U&quot; :   0x55,
                &quot;V&quot; :   0x56,
                &quot;W&quot; :   0x57,
                &quot;X&quot; :   0x58,
                &quot;Y&quot; :   0x59,
                &quot;Z&quot; :   0x5A,
                &quot;F1&quot; :   0x70,
                &quot;F2&quot; :   0x71,
                &quot;F3&quot; :   0x72,
                &quot;F4&quot; :   0x73,
                &quot;F5&quot; :   0x74,
                &quot;F6&quot; :   0x75,
                &quot;F7&quot; :   0x76,
                &quot;F8&quot; :   0x77,
                &quot;F9&quot; :   0x78,
                &quot;F10&quot; :   0x79,
                &quot;F11&quot; :   0x7A,
                &quot;F12&quot; :   0x7B,
                &quot;F13&quot; :   0x7C,
                &quot;F14&quot; :   0x7D,
                &quot;F15&quot; :   0x7E,
                &quot;F16&quot; :   0x7F,
                &quot;F17&quot; :   0x80,
                &quot;F18&quot; :   0x81,
                &quot;F19&quot; :   0x82,
                &quot;F20&quot; :   0x83,
                &quot;F21&quot; :   0x84,
                &quot;F22&quot; :   0x85,
                &quot;F23&quot; :   0x86,
                &quot;F24&quot; :   0x87,
                &quot;NumLock&quot; :   0x90,
                &quot;ScrollLock&quot; :   0x91,
            }
        }],
        [&quot;__HotKeyHigh&quot;, 63, &quot;Enumeration&quot;, {
            &quot;type&quot;: &quot;uint8&quot;,
            &quot;map&quot;: {
                &quot;No modifier key used.&quot; : 0x00,
                &quot;SHIFT&quot; : 0x01,
                &quot;CONTROL&quot; : 0x02,
                &quot;ALT&quot; : 0x04,
            }
        }],
        [&quot;HotKey&quot;, 0, &quot;Value&quot;, {
            &quot;value&quot;: &quot;x=&gt;if(condition= x.__HotKeyLow=~&#x27;No key assigned&#x27;,
                            then=x.__HotKeyLow,
                            else=x.__HotKeyLow + &#x27; + &#x27; + x.__HotKeyHigh)&quot;
            
        }],
        
        # The LinkTargetIDList only exists if the Link Flag is set otherwise it is empty.
        [&quot;LinkTargetIDList&quot;, &quot;x=&gt;x.HeaderSize&quot;, &quot;Union&quot;, {
            &quot;selector&quot;: &quot;x=&gt;x.LinkFlags =~ &#x27;HasLinkTargetIDList&#x27;&quot;,
            &quot;choices&quot;: {
                &quot;true&quot;: &quot;LinkTargetIDList&quot;,
                &quot;false&quot;: &quot;Empty&quot;
            }
        }],
        [&quot;LinkInfo&quot;, &quot;x=&gt;x.LinkTargetIDList.EndOf&quot;, &quot;Union&quot;, {
            &quot;selector&quot;: &quot;x=&gt;x.LinkFlags =~ &#x27;HasLinkInfo&#x27;&quot;,
            &quot;choices&quot;: {
                &quot;true&quot;: &quot;LinkInfo&quot;,
                &quot;false&quot;: &quot;Empty&quot;
            }
        }],
        
        # StringData flag checks
        [&quot;__Name&quot;, &quot;x=&gt;x.LinkInfo.EndOf&quot;, &quot;Union&quot;, {
            &quot;selector&quot;: &quot;x=&gt;x.LinkFlags =~ &#x27;HasName&#x27;&quot;,
            &quot;choices&quot;: {
                &quot;true&quot;: &quot;Name&quot;,
                &quot;false&quot;: &quot;Empty&quot;
            }
        }],
        [&quot;__RelativePath&quot;, &quot;x=&gt;x.__Name.EndOf&quot;, &quot;Union&quot;, {
            &quot;selector&quot;: &quot;x=&gt;x.LinkFlags =~ &#x27;HasRelativePath&#x27;&quot;,
            &quot;choices&quot;: {
                &quot;true&quot;: &quot;RelativePath&quot;,
                &quot;false&quot;: &quot;Empty&quot;
            }
        }],
        [&quot;__WorkingDir&quot;, &quot;x=&gt;x.__RelativePath.EndOf&quot;, &quot;Union&quot;, {
            &quot;selector&quot;: &quot;x=&gt;x.LinkFlags =~ &#x27;HasWorkingDir&#x27;&quot;,
            &quot;choices&quot;: {
                &quot;true&quot;: &quot;WorkingDir&quot;,
                &quot;false&quot;: &quot;Empty&quot;
            }
        }],
        [&quot;__Arguments&quot;, &quot;x=&gt;x.__WorkingDir.EndOf&quot;, &quot;Union&quot;, {
            &quot;selector&quot;: &quot;x=&gt;x.LinkFlags =~ &#x27;HasArguments&#x27;&quot;,
            &quot;choices&quot;: {
                &quot;true&quot;: &quot;Arguments&quot;,
                &quot;false&quot;: &quot;Empty&quot;
            }
        }],
        [&quot;__IconLocation&quot;, &quot;x=&gt;x.__Arguments.EndOf&quot;, &quot;Union&quot;, {
            &quot;selector&quot;: &quot;x=&gt;x.LinkFlags =~ &#x27;HasIconLocation&#x27;&quot;,
            &quot;choices&quot;: {
                &quot;true&quot;: &quot;IconLocation&quot;,
                &quot;false&quot;: &quot;Empty&quot;
            }
        }],
        [&quot;StringData&quot;,0,&quot;StringData&quot;],
        [&quot;ExtraData&quot;, &quot;x=&gt;x.__IconLocation.EndOf&quot;, &quot;Array&quot;, {
                &quot;type&quot;: &quot;ExtraData&quot;,
                &quot;count&quot;: 1000,
                &quot;sentinal&quot;: &quot;x=&gt;x.Size &lt; 0x00000004&quot;
            }],
      ]],
      [&quot;Empty&quot;, 0, []],
      
      # Struct size includes the size field
      [&quot;LinkTargetIDList&quot;, &quot;x=&gt;x.IDListSize + 2&quot;, [
        [&quot;IDListSize&quot;, 0, &quot;uint16&quot;],
        [&quot;IDList&quot;, 2, &quot;Array&quot;, {
           &quot;type&quot;: &quot;ItemIDList&quot;,
           &quot;count&quot;: 1000   # Max count until sentinal
         }]
      ]],

      # Item List contains shell bags
      [&quot;ItemIDList&quot;, &quot;x=&gt;x.ItemIDSize&quot;, [
        [&quot;ItemIDSize&quot;, 0, &quot;uint16&quot;],
        [&quot;Offset&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.StartOf&quot;}],
        [&quot;Type&quot;, 2, &quot;BitField&quot;, {
          &quot;type&quot;: &quot;uint8&quot;,
          &quot;start_bit&quot;: 4,
          &quot;end_bit&quot;: 7,
        }],

        [&quot;Subtype&quot;, 2, &quot;BitField&quot;, {
           &quot;type&quot;: &quot;uint8&quot;,
           &quot;start_bit&quot;: 0,
           &quot;end_bit&quot;: 1,
        }],

        # For now only support some common shell bags
        [&quot;ShellBag&quot;, 0, &quot;Union&quot;, {
           &quot;selector&quot;: &quot;x=&gt;x.Type&quot;,
            &quot;choices&quot;: {
               &quot;64&quot;: &quot;ShellBag0x40&quot;,
               &quot;48&quot;: &quot;ShellBag0x30&quot;,
               &quot;16&quot;: &quot;ShellBag0x1f&quot;,
               &quot;32&quot;: &quot;ShellBag0x20&quot;,
            }
        }]
        ]],

      [&quot;ShellBag0x40&quot;, 0, [
         [&quot;Name&quot;, 5, &quot;String&quot;, {
            encoding: &quot;utf8&quot;,
         }],
         [&quot;Description&quot;, 0, &quot;Value&quot;, {
             &quot;value&quot;: &#x27;x=&gt;dict(
             Type=&quot;NetworkLocation&quot;,
             ShortName=x.Name
             )&#x27;
         }]
      ]],

      # A LinkInfo stores information about the destination of the link.
      [&quot;LinkInfo&quot;, &quot;x=&gt;x.__LinkInfoSize&quot;, [
        [&quot;__LinkInfoOffset&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.StartOf&quot;}],
        [&quot;__LinkInfoSize&quot;, 0, &quot;uint32&quot;],
        [&quot;__LinkInfoHeaderSize&quot;, 4, &quot;uint32&quot;],
        [&quot;LinkInfoFlags&quot;, 8, &quot;Flags&quot;, {
            &quot;type&quot;: &quot;uint32&quot;,
            &quot;bitmap&quot;: {
                &quot;VolumeIDAndLocalBasePath&quot;: 0,
                &quot;CommonNetworkRelativeLinkAndPathSuffix&quot;: 1
            }
        }],
        [&quot;__VolumeIDOffset&quot;, 0xc, &quot;uint32&quot;],
        [&quot;__LocalBasePathOffset&quot;, 16, &quot;uint32&quot;],
        [&quot;__CommonNetworkRelativeLinkOffset&quot;, 20, &quot;uint32&quot;],
        [&quot;__CommonPathSuffixOffset&quot;, 24, &quot;uint32&quot;],
        [&quot;__LocalBasePath&quot;, &quot;x=&gt;x.__LocalBasePathOffset&quot;, &quot;String&quot;, {}],
        [&quot;__CommonNetworkRelativePath&quot;, &quot;x=&gt;x.__CommonNetworkRelativeLinkOffset&quot;, &quot;String&quot;],
        [&quot;__CommonPathSuffix&quot;, &quot;x=&gt;x.__CommonPathSuffixOffset&quot;, &quot;String&quot;],
        [&quot;__VolumeID&quot;, &quot;x=&gt;x.__VolumeIDOffset&quot;, &quot;VolumeID&quot;],
        [&quot;__CommonNetworkRelativeLink&quot;, &quot;x=&gt;x.__CommonNetworkRelativeLinkOffset&quot;, &quot;CommonNetworkRelativeLink&quot;],
        [&quot;Target&quot;, 0, &quot;Value&quot;, { # Depending on the LinkInfoFlags this struct needs to be interpreted differently.
            &quot;value&quot;: &#x27;
               x=&gt;if(condition=x.LinkInfoFlags =~ &quot;VolumeIDAndLocalBasePath&quot;,
                     then=dict(Path=x.__LocalBasePath,
                               VolumeInfo=x.__VolumeID),
                     else=dict(Path=format(format=&quot;%v\\%v&quot;,
                               args=[x.__CommonNetworkRelativeLink.NetName, x.__CommonPathSuffix]),
                               RelativeLink=x.__CommonNetworkRelativeLink) )&#x27;
        }]
      ]],
      
      [&quot;CommonNetworkRelativeLink&quot;, 0, [
        [&quot;__CommonNetworkRelativeLinkSize&quot;, 0, &quot;uint32&quot;],
        [&quot;__CommonNetworkRelativeLinkFlags&quot;, 4, &quot;Flags&quot;, {
            &quot;type&quot;: &quot;uint32&quot;,
            &quot;bitmap&quot;: {
                &quot;ValidDevice&quot;: 0,
                &quot;ValidNetType&quot;: 1,
            }
        }],
        [&quot;__NetNameOffset&quot;, 8, &quot;uint32&quot;],
        [&quot;__DeviceNameOffset&quot;, 12, &quot;uint32&quot;],
        [&quot;NetworkProviderType&quot;, 16, &quot;Enumeration&quot;, {
            &quot;type&quot;: &quot;uint32&quot;,
            &quot;map&quot;: {
                &quot;WNNC_NET_AVID&quot;: 0x001A0000,
                &quot;WNNC_NET_DOCUSPACE&quot;: 0x001B0000,
                &quot;WNNC_NET_MANGOSOFT&quot;: 0x001C0000,
                &quot;WNNC_NET_SERNET&quot;: 0x001D0000,
                &quot;WNNC_NET_RIVERFRONT1&quot;: 0X001E0000,
                &quot;WNNC_NET_RIVERFRONT2&quot;: 0x001F0000,
                &quot;WNNC_NET_DECORB&quot;: 0x00200000,
                &quot;WNNC_NET_PROTSTOR&quot;: 0x00210000,
                &quot;WNNC_NET_FJ_REDIR&quot;: 0x00220000,
                &quot;WNNC_NET_DISTINCT&quot;: 0x00230000,
                &quot;WNNC_NET_TWINS&quot;: 0x00240000,
                &quot;WNNC_NET_RDR2SAMPLE&quot;: 0x00250000,
                &quot;WNNC_NET_CSC&quot;: 0x00260000,
                &quot;WNNC_NET_3IN1&quot;: 0x00270000,
                &quot;WNNC_NET_EXTENDNET&quot;: 0x00290000,
                &quot;WNNC_NET_STAC&quot;: 0x002A0000,
                &quot;WNNC_NET_FOXBAT&quot;: 0x002B0000,
                &quot;WNNC_NET_YAHOO&quot;: 0x002C0000,
                &quot;WNNC_NET_EXIFS&quot;: 0x002D0000,
                &quot;WNNC_NET_DAV&quot;: 0x002E0000,
                &quot;WNNC_NET_KNOWARE&quot;: 0x002F0000,
                &quot;WNNC_NET_OBJECT_DIRE&quot;: 0x00300000,
                &quot;WNNC_NET_MASFAX&quot;: 0x00310000,
                &quot;WNNC_NET_HOB_NFS&quot;: 0x00320000,
                &quot;WNNC_NET_SHIVA&quot;: 0x00330000,
                &quot;WNNC_NET_IBMAL&quot;: 0x00340000,
                &quot;WNNC_NET_LOCK&quot;: 0x00350000,
                &quot;WNNC_NET_TERMSRV&quot;: 0x00360000,
                &quot;WNNC_NET_SRT&quot;: 0x00370000,
                &quot;WNNC_NET_QUINCY&quot;: 0x00380000,
                &quot;WNNC_NET_OPENAFS&quot;: 0x00390000,
                &quot;WNNC_NET_AVID1&quot;: 0X003A0000,
                &quot;WNNC_NET_DFS&quot;: 0x003B0000,
                &quot;WNNC_NET_KWNP&quot;: 0x003C0000,
                &quot;WNNC_NET_ZENWORKS&quot;: 0x003D0000,
                &quot;WNNC_NET_DRIVEONWEB&quot;: 0x003E0000,
                &quot;WNNC_NET_VMWARE&quot;: 0x003F0000,
                &quot;WNNC_NET_RSFX&quot;: 0x00400000,
                &quot;WNNC_NET_MFILES&quot;: 0x00410000,
                &quot;WNNC_NET_MS_NFS&quot;: 0x00420000,
                &quot;WNNC_NET_GOOGLE&quot;: 0x00430000,
            }
        }],
        [&quot;__NetNameOffsetUnicode&quot;, 20, &quot;uint32&quot;],
        [&quot;__DeviceNameOffsetUnicode&quot;, 24, &quot;uint32&quot;],
        [&quot;__NetNameAscii&quot;, &quot;x=&gt;x.__NetNameOffset&quot;, &quot;String&quot;],
        [&quot;__DeviceNameAscii&quot;, &quot;x=&gt;x.__DeviceNameOffset&quot;, &quot;String&quot;],
        [&quot;__NetNameUnicode&quot;, &quot;x=&gt;x.__NetNameOffsetUnicode&quot;, &quot;String&quot;, {&quot;encoding&quot;: &quot;utf16&quot;}],
        [&quot;__DeviceNameUnicode&quot;, &quot;x=&gt;x.__DeviceNameOffsetUnicode&quot;, &quot;String&quot;, {&quot;encoding&quot;: &quot;utf16&quot;}],
        [&quot;NetName&quot;, 0, &quot;Value&quot;, {
            &quot;value&quot;: &quot;x=&gt;if(condition=x.__NetNameOffset, then=x.__NetNameAscii, else=x.__NetNameUnicode)&quot;
        }],
        [&quot;DeviceName&quot;, 0, &quot;Value&quot;, {
            &quot;value&quot;: &quot;x=&gt;if(condition=x.__DeviceNameOffset, then=x.__DeviceNameAscii, else=x.__DeviceNameUnicode)&quot;
        }]
      ]],

      # This is a comment
      [&quot;VolumeID&quot;, 0, [
        [&quot;__VolumeIDSize&quot;, 0, &quot;uint32&quot;],
        [&quot;DriveType&quot;, 4, &quot;Enumeration&quot;, {
            &quot;type&quot;: &quot;uint32&quot;,
            &quot;choices&quot;: {
                 &quot;0&quot;: &quot;DRIVE_UNKNOWN&quot;,
                 &quot;1&quot;: &quot;DRIVE_NO_ROOT_DIR&quot;,
                 &quot;2&quot;: &quot;DRIVE_REMOVABLE&quot;,
                 &quot;3&quot;: &quot;DRIVE_FIXED&quot;,
                 &quot;4&quot;: &quot;DRIVE_REMOTE&quot;,
                 &quot;5&quot;: &quot;DRIVE_CDROM&quot;,
                 &quot;6&quot;: &quot;DRIVE_RAMDISK&quot;
            }
        }],
        [&quot;DriveSerialNumber&quot;, 8, &quot;uint32&quot;],
        [&quot;__VolumeLabelOffset&quot;, 12, &quot;uint32&quot;],
        [&quot;__VolumeLabelOffsetUnicode&quot;, 16, &quot;uint32&quot;],
        [&quot;__VolumeLabelAscii&quot;, &quot;x=&gt;x.__VolumeLabelOffset&quot;, &quot;String&quot;],
        [&quot;__VolumeLabelUnicode&quot;, &quot;x=&gt;x.__VolumeLabelOffsetUnicode&quot;, &quot;String&quot;, {&quot;encoding&quot;: &quot;utf16&quot;}],
        [&quot;VolumeLabel&quot;, 0, &quot;Value&quot;, {
            &quot;value&quot;: &#x27;x=&gt;if(condition=x.__VolumeLabelOffset,
               then=x.__VolumeLabelAscii, else=x.__VolumeLabelUnicode)&#x27;
        }]
      ]],

      # Volume name
      [&quot;ShellBag0x20&quot;, 0, [
         [&quot;__Name&quot;, 3, &quot;String&quot;],
         # Name is only valid if the first bit is set.
         [&quot;Name&quot;, 3, &quot;Value&quot;, {
             &quot;value&quot;: &quot;x=&gt;if(condition=x.ParentOf.Subtype, then=x.__Name, else=&#x27;&#x27;)&quot;,
         }],
         [&quot;Description&quot;, 0, &quot;Value&quot;, {
            &quot;value&quot;: &#x27;x=&gt;dict(
                LongName=x.Name,
                ShortName=x.Name,
                Type=&quot;Volume&quot;
            )&#x27;
        }]
      ]],

      # Marks the root class My Computer
      [&quot;ShellBag0x1f&quot;, 0, [
        [&quot;Description&quot;, 0, &quot;Value&quot;, {
            &quot;value&quot;: &#x27;x=&gt;dict(
               ShortName=&quot;My Computer&quot;,
               Type=&quot;Root&quot;
            )&#x27;
        }]
      ]],

      # Represent a file or directory
      [&quot;ShellBag0x30&quot;, 0, [
        [&quot;Size&quot;, 0, &quot;uint16&quot;],
        [&quot;Type&quot;, 2, &quot;uint8&quot;],
        [&quot;SubType&quot;, 2, &quot;Flags&quot;, {
            &quot;type&quot;: &quot;uint8&quot;,
            &quot;bitmap&quot;: {
                &quot;File&quot;: 1,
                &quot;Directory&quot;: 0,
                &quot;Unicode&quot;: 4,
            }
        }],
        [&quot;__LastModificationTime&quot;, 8, &quot;uint32&quot;],
        [&quot;LastModificationTime&quot;, 8, &quot;FatTimestamp&quot;],
        [&quot;ShortName&quot;, 14, &quot;String&quot;],

        # Variable length search for the extension signature from the start of the struct.
        [&quot;__pre&quot;, 0, &quot;String&quot;, {
            &quot;term_hex&quot;: &quot;0400efbe&quot;
        }],

        # The extension tag should be immediately after the search string.
        [&quot;__ExtensionTag&quot;, &quot;x=&gt;len(list=x.__pre)&quot;, &quot;uint32&quot;],

            # Extension starts 4 bytes before the tag
            [&quot;Extension&quot;, &quot;x=&gt;len(list=x.__pre) - 4&quot;, &quot;Union&quot;, {
                &quot;selector&quot;: &quot;x=&gt;format(format=&#x27;%#x&#x27;, args=x.__ExtensionTag)&quot;,
                &quot;choices&quot;: {
                    &quot;0xbeef0004&quot;: &quot;Beef0004&quot;,
                }
            }],

            # Put all the data together in a convenient location
            [&quot;Description&quot;, 0, &quot;Value&quot;, {
                &quot;value&quot;: &#x27;x=&gt;dict(
                    Type=x.SubType,
                    Modified=if(condition=x.__LastModificationTime, then=x.LastModificationTime),
                    LastAccessed=if(condition=x.Extension.__LastAccessed, then=x.Extension.LastAccessed),
                    CreateDate=if(condition=x.Extension.__CreateDate, then=x.Extension.CreateDate),
                    ShortName=x.ShortName,
                    LongName=x.Extension.LongName,
                    MFTID=x.Extension.MFTReference.MFTID,
                    MFTSeq=x.Extension.MFTReference.SequenceNumber
                )&#x27;
            }]
        ]],
        [&quot;Beef0004&quot;, 0, [
            [&quot;Size&quot;, 0, &quot;uint16&quot;],
            [&quot;Version&quot;, 2, &quot;uint16&quot;],
            [&quot;__Signature&quot;, 4, &quot;uint32&quot;],
            [&quot;Signature&quot;, 0, &quot;Value&quot;, {
                &quot;value&quot;: &quot;x=&gt;format(format=&#x27;%#x&#x27;, args=x.__Signature)&quot;
            }],
            [&quot;__CreateDate&quot;, 8, &quot;uint32&quot;],
            [&quot;__LastAccessed&quot;, 12, &quot;uint32&quot;],

            [&quot;CreateDate&quot;, 8, &quot;FatTimestamp&quot;],
            [&quot;LastAccessed&quot;, 12, &quot;FatTimestamp&quot;],
            [&quot;MFTReference&quot;, 20, &quot;MFTReference&quot;],
            [&quot;LongName&quot;, 46, &quot;String&quot;, {
                &quot;encoding&quot;: &quot;utf16&quot;
            }]
        ]],
        [&quot;MFTReference&quot;, 0, [
            [&quot;MFTID&quot;, 0, &quot;BitField&quot;, {
                &quot;type&quot;: &quot;uint64&quot;,
                &quot;start_bit&quot;: 0,
                &quot;end_bit&quot;: 48,
            }],
            [&quot;SequenceNumber&quot;, 0, &quot;BitField&quot;, {
                &quot;type&quot;: &quot;uint64&quot;,
                &quot;start_bit&quot;: 48,
                &quot;end_bit&quot;: 64,
            }]
        ]],
        
        [&quot;StringData&quot;,0,[
            [&quot;TargetPath&quot;,0,&quot;Value&quot;,{ &quot;value&quot;:&quot;x=&gt; x.ParentOf.LinkInfo.Target.Path&quot;}],
            [&quot;Name&quot;,0,&quot;Value&quot;,{ &quot;value&quot;:&quot;x=&gt; x.ParentOf.__Name.StringData&quot;}],
            [&quot;RelativePath&quot;,0,&quot;Value&quot;,{ &quot;value&quot;:&quot;x=&gt; x.ParentOf.__RelativePath.StringData&quot;}],
            [&quot;WorkingDir&quot;,0,&quot;Value&quot;,{ &quot;value&quot;:&quot;x=&gt; x.ParentOf__WorkingDir.StringData&quot;}],
            [&quot;Arguments&quot;,0,&quot;Value&quot;,{ &quot;value&quot;:&quot;x=&gt; x.ParentOf.__Arguments.StringData&quot;}],
            [&quot;IconLocation&quot;,0,&quot;Value&quot;,{ &quot;value&quot;:&quot;x=&gt; x.ParentOf.__IconLocation.StringData&quot;}],
        ]],
        
        ## StringDataBlock structs
        [&quot;Name&quot;, &quot;x=&gt;x.Size + 2&quot;, [
            [&quot;Offset&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.StartOf&quot;}],
            [&quot;Characters&quot;, 0, &quot;uint16&quot;],
            [&quot;Size&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.Characters * 2&quot;}],
            [&quot;StringData&quot;, 2, &quot;String&quot;, {
                &quot;encoding&quot;: &quot;utf16&quot;,
                &quot;length&quot;: &quot;x=&gt;x.Size&quot;,
                &quot;max_length&quot;: 10000,
                &quot;term&quot;: &quot;&quot;,
            }],
        ]],
        [&quot;WorkingDir&quot;, &quot;x=&gt;x.Size + 2&quot;, [
            [&quot;Offset&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.StartOf&quot;}],
            [&quot;Characters&quot;, 0, &quot;uint16&quot;],
            [&quot;Size&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.Characters * 2&quot;}],
            [&quot;StringData&quot;, 2, &quot;String&quot;, {
                &quot;encoding&quot;: &quot;utf16&quot;,
                &quot;length&quot;: &quot;x=&gt;x.Size&quot;,
                &quot;max_length&quot;: 10000,
                &quot;term&quot;: &quot;&quot;,
            }],
        ]],
        [&quot;RelativePath&quot;, &quot;x=&gt;x.Size + 2&quot;, [
            [&quot;Offset&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.StartOf&quot;}],
            [&quot;Characters&quot;, 0, &quot;uint16&quot;],
            [&quot;Size&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.Characters * 2&quot;}],
            [&quot;StringData&quot;, 2, &quot;String&quot;, {
                &quot;encoding&quot;: &quot;utf16&quot;,
                &quot;length&quot;: &quot;x=&gt;x.Size&quot;,
                &quot;max_length&quot;: 10000,
                &quot;term&quot;: &quot;&quot;,
            }],
        ]],
        [&quot;Arguments&quot;, &quot;x=&gt;x.Size + 2&quot;, [
            [&quot;Offset&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.StartOf&quot;}],
            [&quot;Characters&quot;, 0, &quot;uint16&quot;],
            [&quot;Size&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.Characters * 2&quot;}],
            [&quot;SizeType&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;format(format=&#x27;%T&#x27;,args=x.Size)&quot;}],
            [&quot;StringData&quot;, 2, &quot;String&quot;, {
                &quot;encoding&quot;: &quot;utf16&quot;,
                &quot;length&quot;: &quot;x=&gt;x.Size&quot;,
                &quot;max_length&quot;: 10000,
                &quot;term&quot;: &quot;&quot;,
            }],
        ]],
        [&quot;IconLocation&quot;, &quot;x=&gt;x.Size + 2&quot;, [
            [&quot;Offset&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.StartOf&quot;}],
            [&quot;Characters&quot;, 0, &quot;uint16&quot;],
            [&quot;Size&quot;, 0, &quot;Value&quot;, {&quot;value&quot;: &quot;x=&gt;x.Characters * 2&quot;}],
            [&quot;StringData&quot;, 2, &quot;String&quot;, {
                &quot;encoding&quot;: &quot;utf16&quot;,
                &quot;length&quot;: &quot;x=&gt;x.Size&quot;,
                &quot;max_length&quot;: 10000,
                &quot;term&quot;: &quot;&quot;,
            }],
        ]],
        [&quot;ExtraData&quot;,&quot;x=&gt;x.Size&quot;,[
            [&quot;Offset&quot;,0,&quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;x.StartOf&quot;}],
            [&quot;Size&quot;,0,&quot;uint32&quot;],
            [&quot;__Header&quot;,4,&quot;uint32&quot;],
            [&quot;Header&quot;,0,&quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;&#x27;0x&#x27; + upcase(string=format(format=&#x27;%08x&#x27;,args=x.__Header))&quot;}],
            [&quot;BlockClass&quot;, 4, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;EnvironmentVariable&quot;: 0xA0000001,
                    &quot;Console&quot;: 0xA0000002, 
                    &quot;TrackerData&quot;: 0xA0000003,
                    &quot;ConsoleFE&quot;: 0xA0000004,
                    &quot;SpecialFolder&quot;: 0xA0000005,
                    &quot;Darwin&quot;: 0xA0000006,
                    &quot;IconEnvironment&quot;: 0xA0000007,
                    &quot;Shim&quot;: 0xA0000008,
                    &quot;PropertyStore&quot;: 0xA0000009,
                    &quot;KnownFolder&quot;: 0xA000000B,
                    &quot;VistaAndAboveIDList&quot;: 0xA000000C,
                }}],
            [&quot;Data&quot;, 0, &quot;Union&quot;, {
               &quot;selector&quot;: &quot;x=&gt;x.Header&quot;,
                &quot;choices&quot;: {
                    &quot;0xA0000001&quot;: &quot;EnvironmentVariableDataBlock&quot;,
                    &quot;0xA0000002&quot;: &quot;ConsoleDataBlock&quot;, 
                    &quot;0xA0000003&quot;: &quot;TrackerDataBlock&quot;,
                    &quot;0xA0000004&quot;: &quot;ConsoleFEDataBlock&quot;,
                    &quot;0xA0000005&quot;: &quot;SpecialFolderDataBlock&quot;,
                    &quot;0xA0000006&quot;: &quot;DarwinDataBlock&quot;,
                    &quot;0xA0000007&quot;: &quot;IconEnvironmentDataBlock&quot;,
                    &quot;0xA0000008&quot;: &quot;ShimDataBlock&quot;,
                    &quot;0xA0000009&quot;: &quot;PropertyStoreDataBlock&quot;,
                    &quot;0xA000000B&quot;: &quot;KnownFolderDataBlock&quot;,
                    &quot;0xA000000C&quot;: &quot;VistaAndAboveIDListDataBlock&quot;,
                }
            }],
        ]],
        #0xA0000001
        [&quot;EnvironmentVariableDataBlock&quot;, 0x00000314, [
            [&quot;__DataBlockSize&quot;,0,&quot;uint32&quot;],
            [&quot;__TargetAnsi&quot;, 8, &quot;String&quot;, {&quot;max_length&quot;: 260 }],
            [&quot;__TargetUnicode&quot;, 268, &quot;String&quot;, {
                &quot;encoding&quot;: &quot;utf16&quot;,
                &quot;max_length&quot;: 520
            }],
            [&quot;DataValue&quot;, 0, &quot;Value&quot;,{ 
                &quot;value&quot;: &quot;x=&gt;if(condition= x.__TargetAnsi=x.__TargetUnicode,
                                    then=x.__TargetAnsi,
                                    else=dict(Ascii=x.__TargetAnsi,Unicode=x.__TargetUnicode))&quot; }],
        ]],
        #0xA0000002
        [&quot;ConsoleDataBlock&quot;, 0x000000CC, [
            [&quot;__DataBlockSize&quot;,0,&quot;uint32&quot;],
            [&quot;FillAttributes&quot;,8,&quot;Flags&quot;, {
                &quot;type&quot;: &quot;uint16&quot;,
                &quot;bitmap&quot;: {
                    &quot;FOREGROUND_BLUE&quot;: 0,
                    &quot;FOREGROUND_GREEN&quot;: 1,
                    &quot;FOREGROUND_RED&quot;: 2,
                    &quot;FOREGROUND_INTENSITY&quot;: 3,
                    &quot;BACKGROUND_BLUE&quot;: 4,
                    &quot;BACKGROUND_GREEN&quot;: 5,
                    &quot;BACKGROUND_RED&quot;: 6,
                    &quot;BACKGROUND_INTENSITY&quot;: 7, 
                }}],
            [&quot;PopupFillAttributes&quot;,10,&quot;Flags&quot;, {
                &quot;type&quot;: &quot;uint16&quot;,
                &quot;bitmap&quot;: {
                    &quot;FOREGROUND_BLUE&quot;: 0,
                    &quot;FOREGROUND_GREEN&quot;: 1,
                    &quot;FOREGROUND_RED&quot;: 2,
                    &quot;FOREGROUND_INTENSITY&quot;: 3,
                    &quot;BACKGROUND_BLUE&quot;: 4,
                    &quot;BACKGROUND_GREEN&quot;: 5,
                    &quot;BACKGROUND_RED&quot;: 6,
                    &quot;BACKGROUND_INTENSITY&quot;: 7, 
                }}],
            [&quot;__ScreenBufferSizeX&quot;,12,&quot;int16&quot;],
            [&quot;__ScreenBufferSizeY&quot;,14,&quot;int16&quot;],
            [&quot;ScreenBufferSize&quot;,0,&quot;Value&quot;,{
                &quot;value&quot;:&quot;x=&gt;format(format=&#x27;%v x %v&#x27;,args=[x.__ScreenBufferSizeX,x.__ScreenBufferSizeY])&quot;
            }],
            [&quot;__WindowSizeX&quot;,16,&quot;int16&quot;],
            [&quot;__WindowSizeY&quot;,18,&quot;int16&quot;],
            [&quot;WindowSize&quot;,0,&quot;Value&quot;,{
                &quot;value&quot;:&quot;x=&gt;format(format=&#x27;%v x %v&#x27;,args=[x.__WindowSizeX,x.__WindowSizeY])&quot;
            }],
            [&quot;__WindowOriginX&quot;,20,&quot;int16&quot;],
            [&quot;__WindowOriginY&quot;,22,&quot;int16&quot;],
            [&quot;WindowOrigin&quot;,0,&quot;Value&quot;,{
                &quot;value&quot;:&quot;x=&gt;format(format=&#x27;%v / %v&#x27;,args=[x.__WindowOriginX,x.__WindowOriginY])&quot;
            }], 
            [&quot;__FontSizeW&quot;,32,&quot;int16&quot;],
            [&quot;__FontSizeH&quot;,34,&quot;int16&quot;],
            [&quot;FontSize&quot;,0,&quot;Value&quot;,{
                &quot;value&quot;:&quot;x=&gt;if(condition= x.__FontSizeW=0,
                        then= x.__FontSizeH,
                        else= format(format=&#x27;%v / %v&#x27;,args=[x.__FontSizeW,x.__FontSizeH])) &quot;
            }],
            [&quot;__FontFamily&quot;, 36, &quot;BitField&quot;, {
                type: &quot;uint32&quot;,
                start_bit: 4,
                end_bit: 31,
            }],
            [&quot;FontFamily&quot;, 0, &quot;Value&quot;, {
                &quot;value&quot;: &quot;x=&gt;get(item=dict(
                                `0`=&#x27;DONTCARE&#x27;,
                                `16`=&#x27;ROMAN&#x27;,
                                `32`=&#x27;SWISS&#x27;,
                                `48`=&#x27;MODERN&#x27;,
                                `64`=&#x27;SCRIPT&#x27;,
                                `80`=&#x27;DECORATIVE&#x27;),
                            member=x.__FontFamily)&quot;
            }],
            [&quot;__FontPitch&quot;, 36, &quot;BitField&quot;, {
                type: &quot;uint32&quot;,
                start_bit: 0,
                end_bit: 3,
            }],
            # TODO: implement Flag select for FontPitch
            [&quot;FontPitch&quot;, 0 ,&quot;Value&quot;,{
                &quot;value&quot;:&quot;x=&gt;format(format=&#x27;0x%02x&#x27;,args=x.__FontPitch)&quot;
            }],
            [&quot;__FontWeight&quot;,40,&quot;uint32&quot;],
            [&quot;BoldFont&quot;, 0 ,&quot;Value&quot;,{
                &quot;value&quot;:&quot;x=&gt;if(condition= 700&lt;=x.__FontWeight,
                    then= True, 
                    else= False)&quot;
            }],
            [&quot;FaceName&quot;, 44, &quot;String&quot;, {
                &quot;encoding&quot;: &quot;utf16&quot;,
                &quot;length&quot;: 64,
            }],
            [&quot;__CursorSize&quot;,108,&quot;uint32&quot;],
            [&quot;CursorSize&quot;, 0 ,&quot;Value&quot;,{
                &quot;value&quot;:&quot;x=&gt; if(condition= x.__CursorSize &lt;= 25,
                                then= &#x27;Small&#x27;,
                        else=if(condition= x.__CursorSize &gt;= 26 AND x.__CursorSize &lt;= 50,
                                then= &#x27;Medium&#x27;,
                        else=if(condition= x.__CursorSize &gt;= 51 AND x.__CursorSize &lt;= 100,
                                else= &#x27;Large&#x27;,
                                else= x.__CursorSize )))&quot;
            }],
            [&quot;__FullScreen&quot;,112,&quot;uint32&quot;],
            [&quot;FullScreen&quot;, 0 ,&quot;Value&quot;,{
                &quot;value&quot;:&quot;x=&gt; if(condition= x.__FullScreen &gt; 0,
                                then= True,
                                else= False )&quot;
            }],
            [&quot;__QuickEdit&quot;,116,&quot;uint32&quot;],
            [&quot;QuickEdit&quot;, 0 ,&quot;Value&quot;,{
                &quot;value&quot;:&quot;x=&gt; if(condition= x.__QuickEdit &gt; 0,
                                then= True,
                                else= False )&quot;
            }],
            [&quot;__InsertMode&quot;,120,&quot;uint32&quot;],
            [&quot;InsertMode&quot;, 0 ,&quot;Value&quot;,{
                &quot;value&quot;:&quot;x=&gt; if(condition= x.__InsertMode &gt; 0,
                                then= True,
                                else= False )&quot;
            }],
            [&quot;__AutoPosition&quot;,124,&quot;uint32&quot;],
            [&quot;AutoPosition&quot;, 0 ,&quot;Value&quot;,{
                &quot;value&quot;:&quot;x=&gt; if(condition= x.__AutoPosition &gt; 0,
                                then= True,
                                else= False )&quot;
            }],
            [&quot;HistoryBufferSize&quot;,128,&quot;uint32&quot;],
            [&quot;NumberOfHistoryBuffers&quot;,132,&quot;uint32&quot;],
            [&quot;__HistoryNoDup&quot;,136,&quot;uint32&quot;],
            [&quot;HistoryDuplicatesAllowed&quot;, 0 ,&quot;Value&quot;,{
                &quot;value&quot;:&quot;x=&gt; if(condition= x.__HistoryNoDup &gt; 0,
                                then= True,
                                else= False )&quot;
            }],
            [&quot;ColorTable&quot;, 140, &quot;Array&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;count&quot;: 16   # Max count until sentinal
            }],
        ]],
        #0xA0000003
        [&quot;TrackerDataBlock&quot;, 0x00000060, [
            [&quot;__DataBlockSize&quot;,0,&quot;uint32&quot;],
            [&quot;__MachineID&quot;, 16, &quot;String&quot;],
            [&quot;MachineID&quot;, 0, &quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;if(condition= x.__MachineID=~&#x27;[^ -~]+&#x27;, then=Null, else=x.__MachineID )&quot; }],
            [&quot;MacAddress&quot;, 0, &quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;if(condition=x.MachineID,then=split(string=x.Droid[1],sep=&#x27;-&#x27;)[-1])&quot; }],
            [&quot;__Droid0&quot;, 32, &quot;GUID&quot;],
            [&quot;__Droid1&quot;, 48, &quot;GUID&quot;],
            [&quot;Droid&quot;, 0, &quot;Value&quot;,{&quot;value&quot;: &quot;x=&gt;if(condition=x.MachineID,then=(x.__Droid0.Value,x.__Droid1.Value))&quot; }],
            [&quot;__DroidBirth0&quot;, 64, &quot;GUID&quot;],
            [&quot;__DroidBirth1&quot;, 80, &quot;GUID&quot;],
            [&quot;DroidBirth&quot;, 0, &quot;Value&quot;,{ &quot;value&quot;: &quot;x=&gt;if(condition=x.MachineID,then=(x.__DroidBirth0.Value, x.__DroidBirth0.Value))&quot; }],
        ]],
        #0xA0000004
        [&quot;ConsoleFEDataBlock&quot;, 0x0000000C, [
            [&quot;__DataBlockSize&quot;,0,&quot;uint32&quot;],
            [&quot;CodePage&quot;,8,&quot;uint32&quot;],
            [&quot;DataValue&quot;,0,&quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;x.CodePage&quot;}],
        ]],
        #0xA0000005
        [&quot;SpecialFolderDataBlock&quot;, 0x00000010, [
            [&quot;__DataBlockSize&quot;,0,&quot;uint32&quot;],
            [&quot;SpecialFolderId&quot;,8,&quot;uint32&quot;],
            [&quot;IdOffset&quot;,12,&quot;uint32&quot;],
            [&quot;DataValue&quot;,0,&quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;x.SpecialFolderId&quot;}],
        ]],
        #0xA0000006
        [&quot;DarwinDataBlock&quot;, 0x00000314, [
            [&quot;__DataBlockSize&quot;,0,&quot;uint32&quot;],
            [&quot;__DarwinDataAnsi&quot;, 8, &quot;String&quot;, {&quot;max_length&quot;: 260 }],
            [&quot;__DarwinDataUnicode&quot;, 268, &quot;String&quot;, {
                &quot;encoding&quot;: &quot;utf16&quot;,
                &quot;max_length&quot;: 520
            }],
            [&quot;DataValue&quot;, 0, &quot;Value&quot;,{ 
                &quot;value&quot;: &quot;x=&gt;if(condition= x.__DarwinDataAnsi=x.__DarwinDataUnicode,
                                    then=x.__DarwinDataAnsi,
                                    else=dict(Ascii=x.__DarwinDataAnsi,Unicode=x.__DarwinDataUnicode))&quot; }],
        ]],
        #0xA0000007
        [&quot;IconEnvironmentDataBlock&quot;, 0x00000314, [
            [&quot;__DataBlockSize&quot;,0,&quot;uint32&quot;],
            [&quot;__TargetAnsi&quot;, 8, &quot;String&quot;, {&quot;max_length&quot;: 260 }],
            [&quot;__TargetUnicode&quot;, 268, &quot;String&quot;, {
                &quot;encoding&quot;: &quot;utf16&quot;,
                &quot;max_length&quot;: 520,
            }],
            [&quot;DataValue&quot;, 0, &quot;Value&quot;,{ 
                &quot;value&quot;: &quot;x=&gt;if(condition= x.__TargetAnsi=x.__TargetUnicode,
                                    then=x.__TargetAnsi,
                                    else=dict(Ascii=x.__TargetAnsi,Unicode=x.__TargetUnicode))&quot; }],
        ]],
        #0xA0000008
        [&quot;ShimDataBlock&quot;, &quot;x=&gt;x.__DataBlockSize&quot;, [
            [&quot;__DataBlockSize&quot;,0,&quot;uint32&quot;],
            [&quot;LayerName&quot;, 8, &quot;String&quot;, { 
                &quot;encoding&quot;: &quot;utf16&quot;,
                &quot;length&quot;: &quot;x=&gt;x.__DataBlockSize - 8&quot;,
                &quot;max_length&quot;: 10000
                }],
            [&quot;DataValue&quot;,0,&quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;x.LayerName&quot;}],
        ]],
        #0xA0000009
        [&quot;PropertyStoreDataBlock&quot;, &quot;x=&gt;x.__DataBlockSize&quot;, [
            [&quot;__DataBlockSize&quot;,0,&quot;uint32&quot;],
            [&quot;PropertyStorage&quot;, 8, &quot;Array&quot;, {
                &quot;count&quot;: 1000,
                &quot;type&quot;: &quot;PropertyStorage&quot;,
                &quot;sentinal&quot;: &quot;x=&gt;x.__DataBlockSize = 0&quot;
            }],
            [&quot;DataValue&quot;,0,&quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;x.PropertyStorage.PropertyValue&quot;}],
            #[&quot;DataValue&quot;,0,&quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;property_store(data=x.PropertyStorage.PropertyValue)&quot;}],
            
        ]],
        #0xA000000B
        [&quot;KnownFolderDataBlock&quot;, 0x00000314, [
            [&quot;__DataBlockSize&quot;,0,&quot;uint32&quot;],
            [&quot;__KnownFolderId&quot;, 8, &quot;GUID&quot;],
            [&quot;GUID&quot;,0,&quot;Value&quot;,{&quot;value&quot;:&quot;x=&gt;x.__KnownFolderId.Value&quot;}],
            [&quot;__Offset&quot;, 24,&quot;uint32&quot;],
            [&quot;KnownFolder&quot;, 0, &quot;Value&quot;, { 
                &quot;value&quot;: &quot;x=&gt; get(item=dict(
                    `DE61D971-5EBC-4F02-A3A9-6C82895E5C04`=&#x27;AddNewPrograms&#x27;,
                    `724EF170-A42D-4FEF-9F26-B60E846FBA4F`=&#x27;AdminTools&#x27;,
                    `A520A1A4-1780-4FF6-BD18-167343C5AF16`=&#x27;AppDataLow&#x27;,
                    `A305CE99-F527-492B-8B1A-7E76FA98D6E4`=&#x27;AppUpdates&#x27;,
                    `9E52AB10-F80D-49DF-ACB8-4330F5687855`=&#x27;CDBurning&#x27;,
                    `DF7266AC-9274-4867-8D55-3BD661DE872D`=&#x27;ChangeRemovePrograms&#x27;,
                    `D0384E7D-BAC3-4797-8F14-CBA229B392B5`=&#x27;CommonAdminTools&#x27;,
                    `C1BAE2D0-10DF-4334-BEDD-7AA20B227A9D`=&#x27;CommonOEMLinks&#x27;,
                    `0139D44E-6AFE-49F2-8690-3DAFCAE6FFB8`=&#x27;CommonPrograms&#x27;,
                    `A4115719-D62E-491D-AA7C-E74B8BE3B067`=&#x27;CommonStartMenu&#x27;,
                    `82A5EA35-D9CD-47C5-9629-E15D2F714E6E`=&#x27;CommonStartup&#x27;,
                    `B94237E7-57AC-4347-9151-B08C6C32D1F7`=&#x27;CommonTemplates&#x27;,
                    `0AC0837C-BBF8-452A-850D-79D08E667CA7`=&#x27;Computer&#x27;,
                    `4BFEFB45-347D-4006-A5BE-AC0CB0567192`=&#x27;Conflict&#x27;,
                    `6F0CD92B-2E97-45D1-88FF-B0D186B8DEDD`=&#x27;Connections&#x27;,
                    `56784854-C6CB-462B-8169-88E350ACB882`=&#x27;Contacts&#x27;,
                    `82A74AEB-AEB4-465C-A014-D097EE346D63`=&#x27;ControlPanel&#x27;,
                    `2B0F765D-C0E9-4171-908E-08A611B84FF6`=&#x27;Cookies&#x27;,
                    `B4BFCC3A-DB2C-424C-B029-7FE99A87C641`=&#x27;Desktop&#x27;,
                    `FDD39AD0-238F-46AF-ADB4-6C85480369C7`=&#x27;Documents&#x27;,
                    `374DE290-123F-4565-9164-39C4925E467B`=&#x27;Downloads&#x27;,
                    `1777F761-68AD-4D8A-87BD-30B759FA33DD`=&#x27;Favorites&#x27;,
                    `FD228CB7-AE11-4AE3-864C-16F3910AB8FE`=&#x27;Fonts&#x27;,
                    `CAC52C1A-B53D-4EDC-92D7-6B2E8AC19434`=&#x27;Games&#x27;,
                    `054FAE61-4DD8-4787-80B6-090220C4B700`=&#x27;GameTasks&#x27;,
                    `D9DC8A3B-B784-432E-A781-5A1130A75963`=&#x27;History&#x27;,
                    `4D9F7874-4E0C-4904-967B-40B0D20C3E4B`=&#x27;Internet&#x27;,
                    `352481E8-33BE-4251-BA85-6007CAEDCF9D`=&#x27;InternetCache&#x27;,
                    `BFB9D5E0-C6A9-404C-B2B2-AE6DB6AF4968`=&#x27;Links&#x27;,
                    `F1B32785-6FBA-4FCF-9D55-7B8E7F157091`=&#x27;LocalAppData&#x27;,
                    `2A00375E-224C-49DE-B8D1-440DF7EF3DDC`=&#x27;LocalizedResourcesDir&#x27;,
                    `4BD8D571-6D19-48D3-BE97-422220080E43`=&#x27;Music&#x27;,
                    `C5ABBF53-E17F-4121-8900-86626FC2C973`=&#x27;NetHood&#x27;,
                    `D20BEEC4-5CA8-4905-AE3B-BF251EA09B53`=&#x27;Network&#x27;,
                    `31C0DD25-9439-4F12-BF41-7FF4EDA38722`=&#x27;Objects3D&#x27;,
                    `2C36C0AA-5812-4B87-BFD0-4CD0DFB19B39`=&#x27;OriginalImages&#x27;,
                    `69D2CF90-FC33-4FB7-9A0C-EBB0F0FCB43C`=&#x27;PhotoAlbums&#x27;,
                    `33E28130-4E1E-4676-835A-98395C3BC3BB`=&#x27;Pictures&#x27;,
                    `DE92C1C7-837F-4F69-A3BB-86E631204A23`=&#x27;Playlists&#x27;,
                    `76FC4E2D-D6AD-4519-A663-37BD56068185`=&#x27;Printers&#x27;,
                    `9274BD8D-CFD1-41C3-B35E-B13F55A758F4`=&#x27;PrintHood&#x27;,
                    `5E6C858F-0E22-4760-9AFE-EA3317B67173`=&#x27;Profile&#x27;,
                    `62AB5D82-FDC1-4DC3-A9DD-070D1D495D97`=&#x27;ProgramData&#x27;,
                    `905E63B6-C1BF-494E-B29C-65B732D3D21A`=&#x27;ProgramFiles&#x27;,
                    `F7F1ED05-9F6D-47A2-AAAE-29D317C6F066`=&#x27;ProgramFilesCommon&#x27;,
                    `6365D5A7-0F0D-45E5-87F6-0DA56B6A4F7D`=&#x27;ProgramFilesCommonX64&#x27;,
                    `DE974D24-D9C6-4D3E-BF91-F4455120B917`=&#x27;ProgramFilesCommonX86&#x27;,
                    `6D809377-6AF0-444B-8957-A3773F02200E`=&#x27;ProgramFilesX64&#x27;,
                    `7C5A40EF-A0FB-4BFC-874A-C0F2E0B9FA8E`=&#x27;ProgramFilesX86&#x27;,
                    `A77F5D77-2E2B-44C3-A6A2-ABA601054A51`=&#x27;Programs&#x27;,
                    `DFDF76A2-C82A-4D63-906A-5644AC457385`=&#x27;Public&#x27;,
                    `C4AA340D-F20F-4863-AFEF-F87EF2E6BA25`=&#x27;PublicDesktop&#x27;,
                    `ED4824AF-DCE4-45A8-81E2-FC7965083634`=&#x27;PublicDocuments&#x27;,
                    `3D644C9B-1FB8-4F30-9B45-F670235F79C0`=&#x27;PublicDownloads&#x27;,
                    `DEBF2536-E1A8-4C59-B6A2-414586476AEA`=&#x27;PublicGameTasks&#x27;,
                    `3214FAB5-9757-4298-BB61-92A9DEAA44FF`=&#x27;PublicMusic&#x27;,
                    `B6EBFB86-6907-413C-9AF7-4FC2ABF07CC5`=&#x27;PublicPictures&#x27;,
                    `2400183A-6185-49FB-A2D8-4A392A602BA3`=&#x27;PublicVideos&#x27;,
                    `52A4F021-7B75-48A9-9F6B-4B87A210BC8F`=&#x27;QuickLaunch&#x27;,
                    `AE50C081-EBD2-438A-8655-8A092E34987A`=&#x27;Recent&#x27;,
                    `BD85E001-112E-431E-983B-7B15AC09FFF1`=&#x27;RecordedTV&#x27;,
                    `B7534046-3ECB-4C18-BE4E-64CD4CB7D6AC`=&#x27;RecycleBin&#x27;,
                    `8AD10C31-2ADB-4296-A8F7-E4701232C972`=&#x27;ResourceDir&#x27;,
                    `3EB685DB-65F9-4CF6-A03A-E3EF65729F3D`=&#x27;RoamingAppData&#x27;,
                    `B250C668-F57D-4EE1-A63C-290EE7D1AA1F`=&#x27;SampleMusic&#x27;,
                    `C4900540-2379-4C75-844B-64E6FAF8716B`=&#x27;SamplePictures&#x27;,
                    `15CA69B3-30EE-49C1-ACE1-6B5EC372AFB5`=&#x27;SamplePlaylists&#x27;,
                    `859EAD94-2E85-48AD-A71A-0969CB56A6CD`=&#x27;SampleVideos&#x27;,
                    `4C5C32FF-BB9D-43B0-B5B4-2D72E54EAAA4`=&#x27;SavedGames&#x27;,
                    `7D1D3A04-DEBB-4115-95CF-2F29DA2920DA`=&#x27;SavedSearches&#x27;,
                    `EE32E446-31CA-4ABA-814F-A5EBD2FD6D5E`=&#x27;SEARCH_CSC&#x27;,
                    `98EC0E18-2098-4D44-8644-66979315A281`=&#x27;SEARCH_MAPI&#x27;,
                    `190337D1-B8CA-4121-A639-6D472D16972A`=&#x27;SearchHome&#x27;,
                    `8983036C-27C0-404B-8F08-102D10DCFD74`=&#x27;SendTo&#x27;,
                    `7B396E54-9EC5-4300-BE0A-2482EBAE1A26`=&#x27;SidebarDefaultParts&#x27;,
                    `A75D362E-50FC-4FB7-AC2C-A8BEAA314493`=&#x27;SidebarParts&#x27;,
                    `625B53C3-AB48-4EC1-BA1F-A1EF4146FC19`=&#x27;StartMenu&#x27;,
                    `B97D20BB-F46A-4C97-BA10-5E3608430854`=&#x27;Startup&#x27;,
                    `43668BF8-C14E-49B2-97C9-747784D784B7`=&#x27;SyncManager&#x27;,
                    `289A9A43-BE44-4057-A41B-587A76D7E7F9`=&#x27;SyncResults&#x27;,
                    `0F214138-B1D3-4A90-BBA9-27CBC0C5389A`=&#x27;SyncSetup&#x27;,
                    `1AC14E77-02E7-4E5D-B744-2EB1AE5198B7`=&#x27;System&#x27;,
                    `D65231B0-B2F1-4857-A4CE-A8E7C6EA7D27`=&#x27;SystemX86&#x27;,
                    `A63293E8-664E-48DB-A079-DF759E0509F7`=&#x27;Templates&#x27;,
                    `5B3749AD-B49F-49C1-83EB-15370FBD4882`=&#x27;TreeProperties&#x27;,
                    `0762D272-C50A-4BB0-A382-697DCD729B80`=&#x27;UserProfiles&#x27;,
                    `F3CE0F7C-4901-4ACC-8648-D5D44B04EF8F`=&#x27;UsersFiles&#x27;,
                    `18989B1D-99B5-455B-841C-AB7C74E4DDFC`=&#x27;Videos&#x27;,
                    `F38BF404-1D43-42F2-9305-67DE0B28FC23`=&#x27;Windows&#x27;),
                    field=x.GUID)&quot;
            }],
        ]],
        #0xA000000C
        [&quot;VistaAndAboveIDListDataBlock&quot;, &quot;x=&gt;x.__BlockSize&quot;, [
            [&quot;__DataBlockSize&quot;,0,&quot;uint32&quot;],
            [&quot;IDList&quot;, 8, &quot;ItemIDList&quot;],
        ]],
        
        [&quot;PropertyStorage&quot;,&quot;x=&gt;x.StorageSize&quot;, [
            [&quot;StorageSize&quot;,0,&quot;uint32&quot;],
            #[&quot;Version&quot;,4,&quot;String&quot;,{ &quot;length&quot;:4 }], #Expect 1SPS / 0x53505331
            [&quot;__Format&quot;, 8,&quot;GUID&quot;],
            [&quot;Format&quot;, 0, &quot;Value&quot;,{&quot;value&quot;: &quot;x=&gt;x.__Format.Value&quot; }],
            [&quot;PropertyValue&quot;, 24, &quot;Array&quot;, {
                &quot;type&quot;: &quot;PropertyValue&quot;,
                &quot;count&quot;: 1000,
                &quot;sentinal&quot;: &quot;x=&gt;x.__ValueSize = 0&quot;
            }],
        ]],
        [&quot;PropertyValue&quot;,&quot;x=&gt;x.__ValueSize&quot;, [
            [&quot;__ValueSize&quot;,0,&quot;uint32&quot;],
            [&quot;__ID&quot;,4,&quot;uint32&quot;],
            [&quot;GuidId&quot;,0,&quot;Value&quot;,{&quot;value&quot;: &quot;x=&gt;x.ParentOf.Format + &#x27;/&#x27; + str(str=x.__ID)&quot;}],
            [&quot;Description&quot;, 0, &quot;Value&quot;, { 
                &quot;value&quot;: &quot;x=&gt; get(item=dict(
                        `28636AA6-953D-11D2-B5D6-00C04FD918D0`=x.__SHELL_DETAILS,
                        `446D16B1-8DAD-4870-A748-402EA43D788C`=x.__CACHE,
                        `46588AE2-4CBC-4338-BBFC-139326986DCE`=x.__User,
                        `841E4F90-FF59-4D16-8947-E81BBFFAB36D`=x.__Software,
                        `86407DB8-9DF7-48CD-B986-F999ADC19731`=x.__Share,
                        `86D40B4D-9069-443C-819A-2A54090DCCEC`=x.__Tile,
                        `9F4C2855-9F79-4B39-A8D0-E1D42DE1D5F3`=x.__AppUserModel,
                        `B725F130-47EF-101A-A5F1-02608C9EEBAC`=x.__STORAGE,
                        `DABD30ED-0043-4789-A7F8-D013A4736622`=x.__FolderDisplay,
                        `E3E0584C-B788-4A5A-BB20-7F5A44C9ACDD`=x.__SEARCH,
                        `F29F85E0-4FF9-1068-AB91-08002B27B3D9`=x.__Document,
                        `FB8D2D7B-90D1-4E34-BF60-6EAC09922BBF`=x.__Hash),
                    member=x.ParentOf.Format) || &#x27;Unknown Guid&#x27; &quot; 
            }],
            [&quot;__STORAGE&quot;, 4, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;System.ItemFolderNameDisplay&quot;: 0x00000002,
                    &quot;ClassId&quot;: 0x00000003,
                    &quot;System.ItemTypeText&quot;: 0x00000004,
                    &quot;FileIndex&quot;: 0x00000008,
                    &quot;USN&quot;: 0x00000009,
                    &quot;System.ItemNameDisplay&quot;: 0x0000000A,
                    &quot;Path&quot;: 0x0000000B,
                    &quot;System.Size&quot;: 0x0000000C,
                    &quot;System.FileAttributes&quot;: 0x0000000D,
                    &quot;System.DateModified&quot;: 0x0000000E,
                    &quot;System.DateCreated&quot;: 0x0000000F,
                    &quot;System.DateAccessed&quot;: 0x00000010,
                    &quot;AllocSize&quot;: 0x00000012,
                    &quot;ShortFilename&quot;: 0x00000014,
                }}],
            [&quot;__SHELL_DETAILS&quot;, 4, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;ComputerName&quot;: 0x00000005,
                    &quot;ContainedItems&quot;: 0x0000001D,
                    &quot;FileCount&quot;: 0x0000000C,
                    &quot;FindData&quot;: 0x00000000,
                    &quot;IsSendToTarget&quot;: 0x00000021,
                    &quot;ItemPathDisplayNarrow&quot;: 0x00000008,
                    &quot;ItemSubType&quot;: 0x00000025,
                    &quot;ItemType&quot;: 0x0000000B,
                    &quot;ParsingName&quot;: 0x00000018,
                    &quot;ParsingPath&quot;: 0x0000001E,
                    &quot;PerceivedType&quot;: 0x00000009,
                    &quot;SFGAOFlags&quot;: 0x00000019,
                    &quot;TotalFileSize&quot;: 0x0000000E,
                    &quot;DescriptionID&quot;: 0x00000002,
                    &quot;NamespaceCLSID&quot;: 0x00000006,
                }}],
            [&quot;__CACHE&quot;, 4, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;ThumbnailCacheId&quot;: 0x00000064,
                    &quot;VolumeId&quot;: 0x00000068,
                }}],
            [&quot;__SEARCH&quot;, 4, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;FolderPath&quot;: 0x00000006,
                    &quot;SearchRanking&quot;: 0x00000003,
                }}],
            [&quot;__User&quot;, 4, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;SID&quot;: 0x00000004,
                }}],
            [&quot;__Share&quot;, 4, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;Share Target Description&quot;: 0x00000002,
                }}],
            [&quot;__Hash&quot;, 4, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;WinX Hash&quot;: 0x00000002,
                }}],
            [&quot;__FolderDisplay&quot;, 4, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;Item Folder Path Display Narrow&quot;: 0x00000064,
                }}],                
            [&quot;__AppUserModel&quot;, 4, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;App User Model Relaunch Command&quot;: 2,
                    &quot;App User Model Relaunch Icon Resource&quot;: 3,
                    &quot;App User Model Relaunch Display Name Resource&quot;: 4,
                    &quot;App User Model ID&quot;: 5,
                    &quot;App User Model Is DestList Separator&quot;: 6,
                    &quot;App User Model Is DestList Link&quot;: 7,
                    &quot;App User Model Exclude From Show In New Install&quot;: 8,
                    &quot;App User Model Prevent Pinning&quot;: 9,
                    &quot;App User Model Best Shortcut&quot;: 10,
                    &quot;App User Model Is Dual Mode&quot;: 11,
                    &quot;App User Model Start Pin Option&quot;: 12,
                    &quot;App User Model Relevance&quot;: 13,
                    &quot;App User Model Host Environment&quot;: 14,
                    &quot;App User Model Package Install Path&quot;: 15,
                    &quot;App User Model Record State&quot;: 16,
                    &quot;App User Model Package Family Name&quot;: 17,
                    &quot;App User Model Installed By&quot;: 18,
                    &quot;App User Model Parent ID&quot;: 19,
                    &quot;App User Model Activation Context&quot;: 20,
                    &quot;App User Model Package Full Name&quot;: 21,
                    &quot;App User Model Package Relative Application ID&quot;: 22,
                    &quot;App User Model Excluded From Launcher&quot;: 23,
                    &quot;App User Model AppCompat ID&quot;: 24,
                    &quot;App User Model Run Flags&quot;: 25,
                    &quot;App User Model Toast Activator CLSID&quot;: 26,
                    &quot;App User Model DestList Provided Title&quot;: 27,
                    &quot;App User Model DestList Provided Description&quot;: 28,
                    &quot;App User Model DestList Logo Uri&quot;: 29,
                    &quot;App User Model DestList Provided Group Name&quot;: 30,
                }}],
            [&quot;__Software&quot;, 4, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;Publisher Display Name&quot;: 2,
                    &quot;Software Registered Owner&quot;: 3,
                    &quot;Software Registered Company&quot;: 4,
                    &quot;Software AppId&quot;: 5,
                    &quot;Software Support Url&quot;: 6,
                    &quot;Software Support Telephone&quot;: 7,
                    &quot;Software Help Link&quot;: 8,
                    &quot;Software Install Location&quot;: 9,
                    &quot;Software Install Source&quot;: 10,
                    &quot;Software Date Installed&quot;: 11,
                    &quot;Software Support Contact Name&quot;: 12,
                    &quot;Software ReadMe Url&quot;: 13,
                    &quot;Software Update Info Url&quot;: 14,
                    &quot;Software Times Used&quot;: 15,
                    &quot;Software Date Last Used&quot;: 16,
                    &quot;Software Tasks File Url&quot;: 17,
                    &quot;Software Parent Name&quot;: 18,
                    &quot;Software Product ID&quot;: 19,
                    &quot;Software Comments&quot;: 20,
                    &quot;Software Null Preview Total Size&quot;: 997,
                    &quot;Software Null Preview Subtitle&quot;: 998,
                    &quot;Software Null Preview Title&quot;: 999,
                }}],
            [&quot;__Tile&quot;, 4, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;Tile Small Image Location&quot;: 0x00000002,
                    &quot;Tile Background Color&quot;: 0x00000004,
                    &quot;Tile Foreground Color&quot;: 0x00000005,
                    &quot;Tile Display Name&quot;: 0x0000000b,
                    &quot;Tile Image Location&quot;: 0x0000000c,
                    &quot;Tile Wide 310x150 Logo Path&quot;: 0x0000000d,
                    &quot;Tile Unknown Flags&quot;: 0x0000000e,
                    &quot;Tile Badge Logo Path&quot;: 0x0000000f,
                    &quot;Tile Suite Display Name&quot;: 0x00000010,
                    &quot;Tile Suite Sor tName&quot;: 0x00000011,
                    &quot;Tile Display Name Language&quot;: 0x00000012,
                    &quot;Tile Square 310x310 Logo Path&quot;: 0x00000013,
                    &quot;Tile Square 70x70 Logo Path&quot;: 0x00000014,
                    &quot;Tile Fence Post&quot;: 0x00000015,
                    &quot;Tile Install Progress&quot;: 0x00000016,
                    &quot;Tile Encoded Target Path&quot;: 0x00000017,
                }}],
            [&quot;__Document&quot;, 4, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;Subject&quot;: 3,
                    &quot;Author&quot;: 4,
                    &quot;Keywords&quot;: 5,
                    &quot;Comment&quot;: 6,
                    &quot;Document Template&quot;: 7,
                    &quot;Document Last Author&quot;: 8,
                    &quot;Document Revision Number&quot;: 9,
                    &quot;Document Total Editing Time&quot;: 10,
                    &quot;Document Date Printed&quot;: 11,
                    &quot;Document Date Created&quot;: 12,
                    &quot;Document Date Saved&quot;: 13,
                    &quot;Document Page Count&quot;: 14,
                    &quot;Document Word Count&quot;: 15,
                    &quot;Document Character Count&quot;: 16,
                    &quot;Thumbnail&quot;: 17,
                    &quot;Application Name&quot;: 18,
                    &quot;Document Security&quot;: 19,
                    &quot;High Keywords&quot;: 24,
                    &quot;Low Keywords&quot;: 25,
                    &quot;Medium Keywords&quot;: 26,
                    &quot;Thumbnail Stream&quot;: 27,
                }}],
            #[&quot;Unused&quot;,8,&quot;char&quot;],
            [&quot;Type&quot;, 9, &quot;Enumeration&quot;, {
                &quot;type&quot;: &quot;uint32&quot;,
                &quot;map&quot;: {
                    &quot;LPWSTR&quot;: 0x0000001F,
                    &quot;FILETIME&quot;: 0x00000040,
                    &quot;UI8&quot;: 0x00000015,
                    &quot;CLSID&quot;: 0x00000048
                }
            }],
            [&quot;__Size&quot;,13,&quot;uint32&quot;],
            [&quot;__LPWSTR&quot;,17, &quot;String&quot;,{ 
                &quot;term_hex&quot;: &quot;00&quot;, 
                &quot;length&quot;: &quot;x=&gt;x.__Size * 2&quot;,
                &quot;encoding&quot;: &quot;utf16&quot;
            }],
            [&quot;__FILETIME&quot;,13, &quot;WinFileTime&quot;],
            [&quot;__UI8&quot;,13, &quot;uint64&quot;],
            [&quot;__CLSID&quot;,13,&quot;GUID&quot;],
            [&quot;Value&quot;, 0, &quot;Value&quot;, { 
                &quot;value&quot;: &quot;x=&gt; get(item=dict(
                                    `LPWSTR`=x.__LPWSTR,
                                    `FILETIME`=x.__FILETIME,
                                    `UI8`=x.__UI8,
                                    `CLSID`=x.__CLSID.Value),
                                member=x.Type) || &#x27;Unknown: First bytes 0x&#x27; + upcase(string=format(format=&#x27;%08x&#x27;,args=x.__Size))&quot; 
            }],
        ]],
        [&quot;GUID&quot;, 16, [
            [&quot;__D1&quot;, 0, &quot;uint32&quot;],
            [&quot;__D2&quot;, 4, &quot;uint16&quot;],
            [&quot;__D3&quot;, 6, &quot;uint16&quot;],
            [&quot;__D4&quot;, 8, &quot;String&quot;, {&quot;term&quot;: &quot;&quot;, &quot;length&quot;: 2}],
            [&quot;__D5&quot;, 10, &quot;String&quot;, {&quot;term&quot;: &quot;&quot;, &quot;length&quot;: 6}],
            [&quot;Value&quot;, 0, &quot;Value&quot;, { &quot;value&quot;: &quot;x=&gt;upcase(string=
                    format(format=&#x27;%08x-%04x-%04x-%02x-%02x&#x27;,
                        args=[x.__D1, x.__D2, x.__D3, x.__D4, x.__D5]))&quot; }],
        ]]
     ]
     &#x27;&#x27;&#x27;

sources:
  - query: |
     LET targets = SELECT OSPath, Mtime,Atime,Ctime,Btime,Size,
            read_file(filename=OSPath,offset=0,length=2) as _Header
        FROM glob(globs=TargetGlob)
        WHERE NOT IsDir AND _Header =~ &#x27;^L\x00$&#x27;
     
     LET lnk_files = SELECT *,
            parse_binary(filename=OSPath,
                profile=Profile, struct=&quot;ShellLinkHeader&quot;)  AS Parsed
        FROM targets

     LET fixpath(data) = regex_transform(key=&#x27;x&#x27;, source=join(sep=&#x27;\\&#x27;,array=data),
            map=dict( `My Computer\\\\` = &#x27;&#x27;, `:\\\\\\\\` = &#x27;&#x27;&#x27;:\&#x27;&#x27;&#x27;,`\\\\\\\\\\\\` = &#x27;\\&#x27;))
            
     LET property_store(data) = SELECT * FROM foreach(row=data,query={SELECT * FROM foreach(row=_value,
            query={
                SELECT GuidId,Description,Type,Value FROM foreach(row=_value)
            })})


            
     LET parsed = SELECT 
            dict(OSPath=OSPath, Size=Size,
                Mtime=Mtime,Btime=Btime) as SourceFile,
            dict( 
                Headersize = Parsed.HeaderSize,
                LinkClsID = Parsed.LinkClsID,
                LinkFlags = Parsed.LinkFlags,
                FileAttributes = Parsed.FileAttributes,
                FileSize = Parsed.FileSize,
                CreationTime = Parsed.CreationTime,
                AccessTime = Parsed.AccessTime,
                WriteTime = Parsed.WriteTime,
                IconIndex = Parsed.IconIndex,
                ShowCommand = Parsed.ShowCommand,
                HotKey = Parsed.HotKey
            ) as ShellLinkHeader,
            Parsed.LinkInfo as LinkInfo,
            dict(
                LinkTarget= if(condition= len(list=fixpath(data=Parsed.LinkTargetIDList.IDList.ShellBag.Description.LongName))
                    &lt;   len(list=fixpath(data=Parsed.LinkTargetIDList.IDList.ShellBag.Description.ShortName)),
                        then= fixpath(data=Parsed.LinkTargetIDList.IDList.ShellBag.Description.ShortName),
                        else= fixpath(data=Parsed.LinkTargetIDList.IDList.ShellBag.Description.LongName)),
                LinkTargetIDList = Parsed.LinkTargetIDList
            ) as LinkTarget,
            Parsed.StringData as StringData,
            to_dict(item={
                    SELECT 
                        BlockClass as _key, 
                        if(condition= Data.DataValue,
                            then= Data.DataValue, else= Data)  as _value 
                    FROM foreach(row=Parsed.ExtraData)
                }) as ExtraData,
            property_store(data=Parsed.ExtraData.Data.PropertyStorage.PropertyValue) as PropertyStore
        FROM lnk_files

      LET results = SELECT SourceFile,ShellLinkHeader,LinkInfo,LinkTarget,StringData,
            if(condition=PropertyStore, 
                then= ExtraData + dict(PropertyStore=PropertyStore),
                else= ExtraData ) as ExtraData
        FROM parsed
        WHERE if(condition= IocRegex,
                    then= format(format=&#x27;%s\n%s\n%s\n%s\n%s\n%s\n%s\n%s\n%s\s%s&#x27;, 
                        args=[
                            StringData.TargetPath,
                            StringData.Name,
                            StringData.RelativePath,
                            StringData.WorkingDir,
                            StringData.Arguments,
                            StringData.IconLocation,
                            LinkTarget.LinkTarget,
                            ExtraData.TrackerData.MachineID,
                            ExtraData.TrackerData.MacAddress,
                            join(array=PropertyStore.Value,sep=&#x27;\n&#x27;)
                        ]) =~ IocRegex,
                    else= True)
                AND NOT if(condition= IgnoreRegex,
                    then= format(format=&#x27;%s\n%s\n%s\n%s\n%s\n%s\n%s\n%s\n%s\s%s&#x27;, 
                        args=[
                            StringData.TargetPath,
                            StringData.Name,
                            StringData.RelativePath,
                            StringData.WorkingDir,
                            StringData.Arguments,
                            StringData.IconLocation,
                            LinkTarget.LinkTarget,
                            ExtraData.TrackerData.MachineID,
                            ExtraData.TrackerData.MacAddress,
                            join(array=PropertyStore.Value,sep=&#x27;\n&#x27;)
                        ]) =~ IgnoreRegex,
                    else= False)
        
      LET upload_results = SELECT *, 
            upload(file=SourceFile.OSPath) as UploadedLnk
        FROM results
        
      SELECT *
        FROM if(condition=UploadLnk,
            then= upload_results,
            else= results )

column_types:
  - name: SourceFile.Mtime
    type: timestamp
  - name: SourceFile.Btime
    type: timestamp
  - name: ShellLinkHeader.CreationTime
    type: timestamp
  - name: ShellLinkHeader.AccessTime
    type: timestamp
  - name: ShellLinkHeader.WriteTime
    type: timestamp

</code></pre>

