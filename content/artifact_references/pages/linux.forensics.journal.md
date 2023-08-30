---
title: Linux.Forensics.Journal
hidden: true
tags: [Client Artifact]
---

Parses the binary journal logs. Systemd uses a binary log format to
store logs. You can read these logs using journalctl command:

`journalctl --file /run/log/journal/*/*.journal`

This artifact uses the Velociraptor Binary parser to parse the
binary format. The format is documented
https://www.freedesktop.org/wiki/Software/systemd/journal-files/


<pre><code class="language-yaml">
name: Linux.Forensics.Journal
description: |
  Parses the binary journal logs. Systemd uses a binary log format to
  store logs. You can read these logs using journalctl command:

  `journalctl --file /run/log/journal/*/*.journal`

  This artifact uses the Velociraptor Binary parser to parse the
  binary format. The format is documented
  https://www.freedesktop.org/wiki/Software/systemd/journal-files/

parameters:
- name: JournalGlob
  type: glob
  description: A Glob expression for finding journal files.
  default: /run/log/journal/*/*.journal

- name: OnlyShowMessage
  type: bool
  description: If set we only show the message entry (similar to syslog).

- name: AlsoUpload
  type: bool
  description: If set we also upload the raw files.

export: |
    LET JournalProfile = &#x27;&#x27;&#x27;[
    [&quot;Header&quot;, &quot;x=&gt;x.header_size&quot;, [
      [&quot;Signature&quot;, 0, &quot;String&quot;, {
          &quot;length&quot;: 8,
      }],
      [&quot;header_size&quot;, 88, &quot;uint64&quot;],
      [&quot;arena_size&quot;, 96, &quot;uint64&quot;],
      [&quot;n_objects&quot;, 144, uint64],
      [&quot;n_entries&quot;, 152, uint64],
      [&quot;Objects&quot;, &quot;x=&gt;x.header_size&quot;, &quot;Array&quot;, {
          &quot;type&quot;: &quot;ObjectHeader&quot;,
          &quot;count&quot;: &quot;x=&gt;x.n_objects&quot;,
          &quot;max_count&quot;: 100000
      }]
    ]],

    [&quot;ObjectHeader&quot;, &quot;x=&gt;x.size&quot;, [
     [&quot;Offset&quot;, 0, &quot;Value&quot;, {
        &quot;value&quot;: &quot;x=&gt;x.StartOf&quot;,
     }],
     [&quot;type&quot;, 0, &quot;Enumeration&quot;,{
         &quot;type&quot;: &quot;uint8&quot;,
         &quot;choices&quot;: {
          &quot;0&quot;: OBJECT_UNUSED,
          &quot;1&quot;: OBJECT_DATA,
          &quot;2&quot;: OBJECT_FIELD,
          &quot;3&quot;: OBJECT_ENTRY,
          &quot;4&quot;: OBJECT_DATA_HASH_TABLE,
          &quot;5&quot;: OBJECT_FIELD_HASH_TABLE,
          &quot;6&quot;: OBJECT_ENTRY_ARRAY,
          &quot;7&quot;: OBJECT_TAG,
         }
     }],
     [&quot;flags&quot;, 1, &quot;uint8&quot;],
     [&quot;__real_size&quot;, 8, &quot;uint64&quot;],
     [&quot;__round_size&quot;, 8, &quot;Value&quot;, {
         &quot;value&quot;: &quot;x=&gt;int(int=x.__real_size / 8) * 8&quot;,
     }],
     [&quot;size&quot;, 0, &quot;Value&quot;, {
         &quot;value&quot;: &quot;x=&gt;if(condition=x.__real_size = x.__round_size, then=x.__round_size, else=x.__round_size + 8)&quot;,
     }],
     [&quot;payload&quot;, 16, Union, {
         &quot;selector&quot;: &quot;x=&gt;x.type&quot;,
         &quot;choices&quot;: {
             &quot;OBJECT_DATA&quot;: DataObject,
             &quot;OBJECT_ENTRY&quot;: EntryObject,
         }
     }]
    ]],
    [&quot;DataObject&quot;, 0, [
      [&quot;payload&quot;, 48, String]
    ]],

    # This is basically a single log line -
    # it is really a list of references to data Objects
    [&quot;EntryObject&quot;, 0, [
      [&quot;seqnum&quot;, 0, &quot;uint64&quot;],
      [&quot;realtime&quot;, 8, &quot;uint64&quot;],
      [&quot;monotonic&quot;, 16, &quot;uint64&quot;],
      [&quot;items&quot;, 48, Array, {
          &quot;type&quot;: EntryItem,
          &quot;count&quot;: 50,
          &quot;sentinel&quot;: &quot;x=&gt;x.object.payload = NULL&quot;,
      }]
    ]],
    [&quot;EntryItem&quot;, 16, [
     [&quot;object&quot;, 0, &quot;Pointer&quot;, {
         &quot;type&quot;: &quot;ObjectHeader&quot;,
     }],
    ]]
    ]
    &#x27;&#x27;&#x27;

    -- We make a quick pass over the file to get all the OBJECT_ENTRY
    -- objects which are all we care about. By extracting Just the
    -- offsets of the OBJECT_ENTRY Objects in the first pass we can
    -- free memory we wont need.
    LET Offsets(File) = SELECT Offset
      FROM foreach(row=parse_binary(filename=File, profile=JournalProfile,
         struct=&quot;Header&quot;).Objects)
      WHERE type = &quot;OBJECT_ENTRY&quot;

    -- Now parse the ObjectEntry in each offset
    LET _ParseFile(File) = SELECT Offset,
        parse_binary(
         filename=File, profile=JournalProfile,
         struct=&quot;ObjectHeader&quot;, offset=Offset) AS Parsed
    FROM Offsets(File=File)

    -- Extract the timestamps and all the attributes
    LET ParseFile(File) = SELECT File, Offset,
       timestamp(epoch=Parsed.payload.realtime) AS Timestamp,
       Parsed.payload.items.object.payload.payload AS Data
    FROM _ParseFile(File=File)

sources:
- query: |
    SELECT * FROM foreach(row={
      SELECT OSPath FROM glob(globs=JournalGlob)
    }, query={
      SELECT *, if(condition=OnlyShowMessage,
          then=filter(list=Data, regex=&quot;^MESSAGE=&quot;)[0], else=Data) AS Data,
          if(condition=AlsoUpload, then=upload(file=File)) AS Upload
      FROM ParseFile(File=OSPath)
    })

</code></pre>

