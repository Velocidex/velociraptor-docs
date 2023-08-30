---
title: Windows.Detection.TemplateInjection
hidden: true
tags: [Client Artifact]
---

This content will detect injected templates in Office and RTF documents.

Template injection is a form of defence evasion.
For office documents a malicious macro is loaded into an OOXML document
via a resource file masquerading as an office template. The OOXML artifact structure
will also detect MSHTML RCE Vulnerability #CVE-2021-40444 which has a similar payload technique.
For RTF documents a malicious payload can be delivered by modifying document
formatting control via the "\\\*\template" structure.


This artifact can be modified to search for other suspicious rels files:

- document.xml.rels = macros, ole objects, images.
- settings.xml.rels = templates.
- websettings.xml.rels = frames.
- header#.xml.rels and footer#.xml.rels and others has also been observed
hosting image files for canary files or abused for NetNTLM hash collection.

Change TemplateFileRegex to '\\.xml\\.rels$' for looser file selection.
Change TemplateTargetRegex to '^(https?|smb|\\\\|//|mhtml|file)' for looser
Target selection.

This artifact can also be modified to quickly deploy yara based detections on
other documents. Simply replace RtfYara with yara of interest and modify glob
for targeting.


<pre><code class="language-yaml">
name: Windows.Detection.TemplateInjection
author: Matt Green - @mgreen27
description: |
    This content will detect injected templates in Office and RTF documents.

    Template injection is a form of defence evasion.
    For office documents a malicious macro is loaded into an OOXML document
    via a resource file masquerading as an office template. The OOXML artifact structure
    will also detect MSHTML RCE Vulnerability #CVE-2021-40444 which has a similar payload technique.
    For RTF documents a malicious payload can be delivered by modifying document
    formatting control via the &quot;\\\*\template&quot; structure.


    This artifact can be modified to search for other suspicious rels files:

    - document.xml.rels = macros, ole objects, images.
    - settings.xml.rels = templates.
    - websettings.xml.rels = frames.
    - header#.xml.rels and footer#.xml.rels and others has also been observed
    hosting image files for canary files or abused for NetNTLM hash collection.

    Change TemplateFileRegex to &#x27;\\.xml\\.rels$&#x27; for looser file selection.
    Change TemplateTargetRegex to &#x27;^(https?|smb|\\\\|//|mhtml|file)&#x27; for looser
    Target selection.

    This artifact can also be modified to quickly deploy yara based detections on
    other documents. Simply replace RtfYara with yara of interest and modify glob
    for targeting.



reference:
  - https://attack.mitre.org/techniques/T1221/
  - https://www.sans.org/reading-room/whitepapers/testing/template-injection-attacks-bypassing-security-controls-living-land-38780

type: CLIENT

parameters:
  - name: SearchGlob
    description: Glob to search
    default: C:\Users\**\*.{rtf,doc,dot,docx,docm,dotx,dotm,docb,xls,xlt,xlm,xlsx,xlsm,xltx,xltm,xlsb,ppt,pptx,pptm,potx,potm}
  - name: TemplateFileRegex
    description: Regex to search inside resource section.
    default: &#x27;(document|settings)\.xml\.rels$&#x27;
    type: regex
  - name: TemplateTargetRegex
    description: Regex to search inside resource section.
    default: &#x27;^(https?|smb|\\\\|//|mhtml)&#x27;
    type: regex
  - name: UploadDocument
    type: bool
    description: Select to upload document on detection.
  - name: RtfYara
    type: yara
    default: |
        rule RTF_TemplateInjection {
            meta:
                author = &quot;Matt Green - @mgreen27&quot;
                description = &quot;Yara for RTF template injection. Using regex match to extract template information&quot;

            strings:
                $regex1 = /\{\\\*\\template\s+http[^\}]+\}/ nocase
                $regex2 = /\{\\\*\\templates\s+\\u-[^\}]+\}/ nocase
                $regex3 = /\{\\\*\\template\s+file[^\}]+\}/ nocase

            condition:
              // header is {\rt only to also flag on malformed rtf heders
              uint32be(0) == 0x7B5C7274 and 1 of them
        }

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;

    query: |
      -- Find target docs
      LET office_docs = SELECT OSPath, Mtime, Size
        FROM glob(globs=SearchGlob)
        WHERE NOT IsDir and Size &gt; 0

      LET rtf_injection &lt;= SELECT * FROM foreach(
         row=office_docs,
         query={
                SELECT
                    OSPath AS DocumentPath,
                    hash(path=OSPath) as DocumentHash,
                    Mtime,
                    Size,
                    &#x27;YaraHit: &#x27; + Rule  as Section,
                    regex_replace(
                      source=String.Data,
                      re=&#x27;\{...template\s*|\}&#x27;,replace=&#x27;&#x27;) as TemplateTarget
                FROM yara(files=OSPath, rules=RtfYara)
                WHERE NOT TemplateTarget =~ &#x27;^http(s|)://schemas\.microsoft\.com/&#x27;

            })

      -- select zip members inside the doc that have some content.
      LET document_parts = SELECT * FROM foreach(
            row={
                SELECT
                    OSPath AS OfficePath,
                    Mtime as OfficeMtime,
                    Size as OfficeSize
                FROM office_docs
                WHERE NOT OSPath in rtf_injection.OSPath
            },
            query= {
                SELECT
                    Mtime, Atime, Ctime,
                    OSPath,
                    OSPath.Path AS ZipMemberPath,
                    OfficePath
                FROM glob(
                  globs=&quot;/**&quot;,
                  root=pathspec(DelegatePath=OfficePath),
                  accessor=&#x27;zip&#x27;)
                WHERE not IsDir
                  AND Size &gt; 0
                  AND ZipMemberPath =~ TemplateFileRegex
            })

      -- parse settings file by line and extract config
      LET template = SELECT * FROM foreach(row=document_parts,
        query={
            SELECT
                OSPath as SectionPath,
                OSPath.DelegatePath as Document,
                OSPath.Path as Section,
                parse_string_with_regex(
                    string=Line,
                    regex=[&#x27;\\s+Target=&quot;(?P&lt;Target&gt;[^&quot;]+)&quot;\\s+TargetMode=&#x27;
                        ]).Target as TemplateTarget,
                Mtime as SectionMtime,
                Atime as SectionAtime,
                Ctime as SectionCtime
            FROM parse_lines(filename=OSPath, accessor=&#x27;zip&#x27;)
            WHERE TemplateTarget
        })

      -- search settings for remote or file templates, format mshtml entries
      LET hits = SELECT * FROM chain(
        rtf = { SELECT * FROM rtf_injection },
        office = {
            SELECT * FROM foreach(row=template,
                query={
                    SELECT
                        OSPath AS DocumentPath,
                        hash(path=OSPath) as DocumentHash,
                        Mtime,
                        Size,
                        Section,
                        regex_replace(source=TemplateTarget,
                            re=&#x27;.*Target=&quot;(mhtml)&#x27;,
                            replace=&#x27;mhtml&#x27;) as TemplateTarget,
                        SectionMtime,
                        hash(path=SectionPath,accessor=&#x27;zip&#x27;) as SectionHash
                    FROM stat(filename=Document)
                    WHERE
                        TemplateTarget =~ TemplateTargetRegex
                         AND (( Section=~&#x27;/document.xml.rels$&#x27; AND TemplateTarget=~&#x27;^mhtml:&#x27; )
                                OR NOT Section=~&#x27;/document.xml.rels$&#x27; )
                })
        })

      -- upload hits to server
      LET upload_hits = SELECT *, upload(file=DocumentPath) as Upload
        FROM hits

      -- output rows
      SELECT * FROM if(condition= UploadDocument,
            then= { SELECT * FROM upload_hits},
            else= { SELECT * FROM hits})

</code></pre>

