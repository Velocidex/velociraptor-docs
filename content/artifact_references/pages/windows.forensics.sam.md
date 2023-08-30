---
title: Windows.Forensics.SAM
hidden: true
tags: [Client Artifact]
---

Parses user account information from the SAM hive.

Based on Omer Yampel's parser


<pre><code class="language-yaml">
name: Windows.Forensics.SAM
description: |
   Parses user account information from the SAM hive.

   Based on Omer Yampel&#x27;s parser

reference:
  - https://github.com/yampelo/samparser/blob/master/samparser.py

parameters:
   - name: SAMPath
     description: Path to the SAM file to parse.
     default: C:/Windows/System32/Config/SAM

export: |
     // Reference: https://github.com/yampelo/samparser/blob/master/samparser.py
     LET Profile = &#x27;&#x27;&#x27;
     [
       [&quot;F&quot;, 0, [
         [&quot;LastLoginDate&quot;, 8, &quot;WinFileTime&quot;],
         [&quot;PasswordResetDate&quot;, 24, &quot;WinFileTime&quot;],
         [&quot;PasswordFailDate&quot;, 40, &quot;WinFileTime&quot;],
         [&quot;RID&quot;, 48, &quot;uint32&quot;],
         [&quot;Flags&quot;, 56, &quot;Flags&quot;, {
             &quot;type&quot;: &quot;uint16&quot;,
             &quot;bitmap&quot;: {
              &quot;Account Disabled&quot;: 0,
              &quot;Home directory required&quot;: 1,
              &quot;Password not required&quot;: 2,
              &quot;Temporary duplicate account&quot;: 3,
              &quot;Normal user account&quot;: 4,
              &quot;MNS logon user account&quot;: 5,
              &quot;Interdomain trust account&quot;: 6,
              &quot;Workstation trust account&quot;: 7,
              &quot;Server trust account&quot;: 8,
              &quot;Password does not expire&quot;: 9,
              &quot;Account auto locked&quot;: 10
             }
         }],
         [&quot;FailedLoginCount&quot;, 64, &quot;uint16&quot;],
         [&quot;LoginCount&quot;, 66, &quot;uint16&quot;],
       ]],
       [&quot;V&quot;, 0, [
        [&quot;AccountType&quot;, 4, &quot;Enumeration&quot;, {
            &quot;type&quot;: &quot;uint32&quot;,
            &quot;choices&quot;: {
               &quot;188&quot; : &quot;Default Admin User&quot;,
               &quot;212&quot; : &quot;Custom Limited Acct&quot;,
               &quot;176&quot; : &quot;Default Guest Acct&quot;
            }
        }],
        [&quot;__username_offset&quot;, 12, &quot;uint32&quot;],
        [&quot;__username_length&quot;, 16, &quot;uint32&quot;],
        [&quot;username&quot;, &quot;x=&gt;x.__username_offset + 0xcc&quot;, &quot;String&quot;, {
            &quot;length&quot;: &quot;x=&gt;x.__username_length&quot;,
            &quot;encoding&quot;: &quot;utf16&quot;,
        }],
        [&quot;__fullname_offset&quot;, 24, &quot;uint32&quot;],
        [&quot;__fullname_length&quot;, 28, &quot;uint32&quot;],
        [&quot;fullname&quot;, &quot;x=&gt;x.__fullname_offset + 0xcc&quot;, &quot;String&quot;, {
            &quot;length&quot;: &quot;x=&gt;x.__fullname_length&quot;,
            &quot;encoding&quot;: &quot;utf16&quot;,
        }],
        [&quot;__comment_offset&quot;, 36, &quot;uint32&quot;],
        [&quot;__comment_length&quot;, 40, &quot;uint32&quot;],
        [&quot;comment&quot;, &quot;x=&gt;x.__comment_offset + 0xcc&quot;, &quot;String&quot;, {
            encoding: &quot;utf16&quot;,
            length: &quot;x=&gt;x.__comment_length&quot;,
        }],

        [&quot;__driveletter_offset&quot;, 84, &quot;uint32&quot;],
        [&quot;__driveletter_length&quot;, 88, &quot;uint32&quot;],
        [&quot;driveletter&quot;, &quot;x=&gt;x.__driveletter_offset + 0xcc&quot;, &quot;String&quot;, {
            encoding: &quot;utf16&quot;,
            length: &quot;x=&gt;x.__driveletter_length&quot;,
        }],

        [&quot;__logon_script_offset&quot;, 96, &quot;uint32&quot;],
        [&quot;__logon_script_length&quot;, 100, &quot;uint32&quot;],
        [&quot;logon_script&quot;, &quot;x=&gt;x.__logon_script_offset + 0xcc&quot;, &quot;String&quot;, {
            encoding: &quot;utf16&quot;,
            length: &quot;x=&gt;x.__logon_script_length&quot;,
        }],

        [&quot;__profile_path_offset&quot;, 108, &quot;uint32&quot;],
        [&quot;__profile_path_length&quot;, 112, &quot;uint32&quot;],
        [&quot;profile_path&quot;, &quot;x=&gt;x.__profile_path_offset + 0xcc&quot;, &quot;String&quot;, {
            encoding: &quot;utf16&quot;,
            length: &quot;x=&gt;x.__profile_path_length&quot;,
        }],

        [&quot;__workstation_offset&quot;, 120, &quot;uint32&quot;],
        [&quot;__workstation_length&quot;, 124, &quot;uint32&quot;],
        [&quot;workstation&quot;, &quot;x=&gt;x.__workstation_offset + 0xcc&quot;, &quot;String&quot;, {
            encoding: &quot;utf16&quot;,
            length: &quot;x=&gt;x.__workstation_length&quot;,
        }],

        [&quot;__lmpwd_hash_offset&quot;, 156, &quot;uint32&quot;],
        [&quot;__lmpwd_hash_length&quot;, 160, &quot;uint32&quot;],
        [&quot;lmpwd_hash&quot;, &quot;x=&gt;x.__lmpwd_hash_offset + 0xcc&quot;, &quot;String&quot;, {
            encoding: &quot;utf16&quot;,
            length: &quot;x=&gt;x.__lmpwd_hash_length&quot;,
        }],

        [&quot;__ntpwd_hash_offset&quot;, 168, &quot;uint32&quot;],
        [&quot;__ntpwd_hash_length&quot;, 172, &quot;uint32&quot;],
        [&quot;ntpwd_hash&quot;, &quot;x=&gt;x.__ntpwd_hash_offset + 0xcc&quot;, &quot;String&quot;, {
            encoding: &quot;utf16&quot;,
            length: &quot;x=&gt;x.__ntpwd_hash_length&quot;,
        }]
       ]]
     ]
     &#x27;&#x27;&#x27;

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query: |
        SELECT Key.OSPath.Path AS Key,
           Key.OSPath.DelegatePath AS Hive,
           get(field=&quot;F&quot;) AS _F,
           get(field=&quot;V&quot;) AS _V,
           get(field=&quot;SupplementalCredentials&quot;) AS _SupplementalCredentials,
           parse_binary(accessor=&quot;data&quot;, filename=F,
                        profile=Profile, struct=&quot;F&quot;) AS ParsedF,
           parse_binary(accessor=&quot;data&quot;, filename=V,
                        profile=Profile, struct=&quot;V&quot;) AS ParsedV
        FROM read_reg_key(
           globs=&#x27;SAM\\Domains\\Account\\Users\\0*&#x27;,
           root=pathspec(DelegatePath=SAMPath),
           accessor=&quot;raw_reg&quot;)
        WHERE _F AND _V

column_types:
  - name: F
    type: hex
  - name: V
    type: hex

</code></pre>

