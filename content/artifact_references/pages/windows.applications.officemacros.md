---
title: Windows.Applications.OfficeMacros
hidden: true
sitemap:
  disable: true
tags: [Client Artifact]
description: |
  Scans directories for Office documents (xls, xlsm, doc, docx, ppt,
  pptm) and extracts embedded VBA macros via OLE parsing.
---

Scans directories for Office documents (xls, xlsm, doc, docx, ppt,
pptm) and extracts embedded VBA macros via OLE parsing.

Office macros are a prominent initial infection vector. Many users
click through the warning dialogs, thus leading to infection.

If you find that any macro calls an external program (e.g.
PowerShell) that is very suspicious!


<pre><code class="language-yaml">
name: Windows.Applications.OfficeMacros
description: |
  Scans directories for Office documents (xls, xlsm, doc, docx, ppt,
  pptm) and extracts embedded VBA macros via OLE parsing.
  
  Office macros are a prominent initial infection vector. Many users
  click through the warning dialogs, thus leading to infection.

  If you find that any macro calls an external program (e.g.
  PowerShell) that is very suspicious!

parameters:
  - name: officeExtensions
    default: "*.{xls,xlsm,doc,docx,ppt,pptm}"
  - name: officeFileSearchGlob
    default: C:\Users\**\
    description: The directory to search for office documents.

sources:
  - query: |
        SELECT * FROM foreach(
           row={
              SELECT OSPath FROM glob(globs=officeFileSearchGlob + officeExtensions)
           },
           query={
               SELECT * from olevba(file=OSPath)
           })

</code></pre>

