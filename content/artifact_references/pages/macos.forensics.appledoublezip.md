---
title: MacOS.Forensics.AppleDoubleZip
hidden: true
tags: [Client Artifact]
---

Search for zip files containing leaked download URLs included by
MacOS users.

MacOS filesystem can represent extended attributes. Similarly to
Windows's ZoneIdentifier, when a file is downloaded on MacOS it also
receives an extended attribute recording where the file was
downloaded from. (See the `Windows.Analysis.EvidenceOfDownload`
artifact)

What makes MacOS different however, is that when a user adds a file
to a Zip file (in Finder, right click the file and select
"compress"), MacOS will also record the extended attributes in the
zip file under the __MACOSX folder.

This is a huge privacy leak because people often do not realize that
the source of downloads for a file is being included inside the zip
file, which they end up sending to other people!

Therefore this artifact can also work on other platforms because Zip
files created by MacOS users can end up on other systems, and
contain sensitive URLs embedded within them.


<pre><code class="language-yaml">
name: MacOS.Forensics.AppleDoubleZip
description: |
  Search for zip files containing leaked download URLs included by
  MacOS users.

  MacOS filesystem can represent extended attributes. Similarly to
  Windows&#x27;s ZoneIdentifier, when a file is downloaded on MacOS it also
  receives an extended attribute recording where the file was
  downloaded from. (See the `Windows.Analysis.EvidenceOfDownload`
  artifact)

  What makes MacOS different however, is that when a user adds a file
  to a Zip file (in Finder, right click the file and select
  &quot;compress&quot;), MacOS will also record the extended attributes in the
  zip file under the __MACOSX folder.

  This is a huge privacy leak because people often do not realize that
  the source of downloads for a file is being included inside the zip
  file, which they end up sending to other people!

  Therefore this artifact can also work on other platforms because Zip
  files created by MacOS users can end up on other systems, and
  contain sensitive URLs embedded within them.

reference:
  - https://opensource.apple.com/source/Libc/Libc-391/darwin/copyfile.c
  - https://datatracker.ietf.org/doc/html/rfc1740

parameters:
  - name: ZipGlob
    description: Where to search for zip files.
    default: /Users/*/Downloads/*.zip

export: |
    -- Offsets are aligned to 4 bytes
    LET Align(value) = value + value - int(int=value / 4) * 4

    LET Profile = &#x27;&#x27;&#x27;[
    [&quot;Header&quot;, 0, [
      [&quot;Magic&quot;, 0, &quot;uint32b&quot;],
      [&quot;Version&quot;, 4, &quot;uint32b&quot;],
      [&quot;Filler&quot;, 8, &quot;String&quot;, {
          length: 16,
      }],
      [&quot;Count&quot;, 24, &quot;uint16b&quot;],
      [&quot;Items&quot;, 26, &quot;Array&quot;, {
          count: &quot;x=&gt;x.Count&quot;,
          type: &quot;Entry&quot;,
      }],
      [&quot;attr_header&quot;, 84, &quot;attr_header&quot;]
    ]],
    [&quot;Entry&quot;, 12, [
      [&quot;ID&quot;, 0, &quot;uint32b&quot;],
      [&quot;Offset&quot;, 4, &quot;uint32b&quot;],
      [&quot;Length&quot;, 8, &quot;uint32b&quot;],
      [&quot;Value&quot;, 0, &quot;Profile&quot;, {
           type: &quot;ASFinderInfo&quot;,
           offset: &quot;x=&gt;x.Offset&quot;,
      }]
    ]],
    [&quot;attr_header&quot;, 0, [

      # Should be ATTR
      [&quot;Magic&quot;, 0, &quot;String&quot;, {
          length: 4,
      }],

      [&quot;total_size&quot;, 8, &quot;uint32b&quot;],
      [&quot;data_start&quot;, 12, &quot;uint32b&quot;],
      [&quot;data_length&quot;,16, &quot;uint32b&quot;],
      [&quot;flags&quot;, 32, &quot;uint16b&quot;],
      [&quot;num_attr&quot;, 34, &quot;uint16b&quot;],
      [&quot;attrs&quot;, 36, &quot;Array&quot;, {
          count: &quot;x=&gt;x.num_attr&quot;,
          type: &quot;attr_t&quot;,
      }]
    ]],
    [&quot;attr_t&quot;, &quot;x=&gt;Align(value=x.name_length + 11)&quot;, [
     [&quot;offset&quot;, 0, &quot;uint32b&quot;],
     [&quot;length&quot;, 4, &quot;uint32b&quot;],
     [&quot;flags&quot;, 8, &quot;uint16b&quot;],
     [&quot;name_length&quot;, 10, &quot;uint8&quot;],
     [&quot;name&quot;, 11, &quot;String&quot;, {
         length: &quot;x=&gt;x.name_length&quot;,
     }],
     [&quot;data&quot;, 0, &quot;Profile&quot;, {
        type: &quot;String&quot;,
        type_options: {
            term: &quot;&quot;,
            length: &quot;x=&gt;x.length&quot;,
        },
        offset: &quot;x=&gt;x.offset&quot;,
     }]
    ]]
    ]
    &#x27;&#x27;&#x27;

    LET ParseData(data) = if(condition=data =~ &quot;^bplist&quot;,
         then=plist(accessor=&quot;data&quot;, file=data), else=data)

    LET ParseAppleDouble(double_data) = SELECT name AS Key, ParseData(data=data) AS Value
       FROM foreach(row=parse_binary(
            filename=double_data, accessor=&quot;data&quot;,
            profile=Profile, struct=&quot;Header&quot;).attr_header.attrs)

sources:
 - query: |
     LET DoubleFiles = SELECT * FROM foreach(row={
        SELECT OSPath AS ZipPath
        FROM glob(globs=ZipGlob)
     }, query={
        SELECT OSPath, pathspec(parse=OSPath) AS PathSpec
        FROM glob(
             globs=&quot;__MACOSX/**&quot;,
             accessor=&quot;zip&quot;,
             root=pathspec(DelegatePath=ZipPath))
     })

     SELECT * FROM foreach(row=DoubleFiles,
     query={
       SELECT PathSpec.DelegatePath AS ZipFile,
              PathSpec.Path AS Member,
              Key, Value
       FROM ParseAppleDouble(double_data=read_file(filename=OSPath, accessor=&quot;zip&quot;))
     })

</code></pre>

