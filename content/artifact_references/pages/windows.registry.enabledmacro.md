---
title: Windows.Registry.EnabledMacro
hidden: true
tags: [Client Artifact]
---

Checks for Registry key indicating macro was enabled by user.

HKEY_USERS\*\Software\Microsoft\Office\*\Security\Trusted Documents\TrustRecords reg keys for values ending in FFFFFF7F
http://az4n6.blogspot.com/2016/02/more-on-trust-records-macros-and.html


<pre><code class="language-yaml">
name: Windows.Registry.EnabledMacro
description: |
  Checks for Registry key indicating macro was enabled by user.

  HKEY_USERS\*\Software\Microsoft\Office\*\Security\Trusted Documents\TrustRecords reg keys for values ending in FFFFFF7F
  http://az4n6.blogspot.com/2016/02/more-on-trust-records-macros-and.html

author: &quot;@mgreen27&quot;

precondition: SELECT OS From info() where OS = &#x27;windows&#x27;

parameters:
 - name: KeyGlob
   default: Software\Microsoft\Office\*\*\Security\Trusted Documents\TrustRecords\*
 - name: userRegex
   default: .
   type: regex

sources:
 - query: |
        LET UserProfiles = Select Name as Username,
            {
                SELECT OSPath FROM glob(
                  root=expand(path=Directory),
                  globs=&quot;/NTUSER.DAT&quot;,
                  accessor=&quot;auto&quot;)
            } as NTUser,
            expand(path=Directory) as Directory
        FROM Artifact.Windows.Sys.Users()
        WHERE Directory and NTUser and Name =~ userRegex

        SELECT * FROM foreach(
          row={
            SELECT Username,NTUser FROM UserProfiles
          },
          query={
            SELECT Name as Document,
              Username,
              NTUser as Userhive,
              OSPath.Dirname AS Key,
              Mtime AS LastModified
            FROM glob(
              globs=KeyGlob,
              root=pathspec(DelegatePath=NTUser),
              accessor=&quot;raw_reg&quot;)
            WHERE Data.type =~ &quot;BINARY&quot;
              and encode(string=Data.value, type=&quot;hex&quot;) =~ &quot;ffffff7f$&quot;
          })

</code></pre>

