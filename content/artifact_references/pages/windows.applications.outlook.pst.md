---
title: Windows.Applications.Outlook.PST
hidden: true
tags: [Client Artifact]
---

This artifact fetch emails and attachments from outlook PST file.
This artifact parse for outlook pst files and display the details and save 
all attachments to user specified directory.


<pre><code class="language-yaml">
name: Windows.Applications.Outlook.PST
author: "Sikha Puthanveedu @SikhaMohan"
description: |
  This artifact fetch emails and attachments from outlook PST file.
  This artifact parse for outlook pst files and display the details and save 
  all attachments to user specified directory.
parameters:
  - name: outlookPSTfile
    type: .pst
    description: Full path to the outlook .pst file (For example - D:/MyPST/MyOutlookDataFile.pst)
  - name: AttachmentFolder
    type: directory path
    description: If selected it will save all the attachments from emails to the specified directory.

sources:
  - precondition:
      SELECT OS FROM info() WHERE OS = 'windows'
    query: |
        
            LET PSTInfo = SELECT Sender as Sender,
                 Receiver as Receiver,
                 Subject as Subject,
                 Message as Message,
                 DateandTime as DeliveryTime,
                 Attachments as AttachmentNames,
                 Body as Body
            from parse_pst(filename=outlookPSTfile, FolderPath=AttachmentFolder)
          
            SELECT  
               Sender,
               Receiver,
               Subject,
               DeliveryTime,
               AttachmentNames,
               Message 
            FROM PSTInfo
</code></pre>

