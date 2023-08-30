---
title: MacOS.Applications.MRU
hidden: true
tags: [Client Artifact]
---

Parse the MRU from MacOS users


<pre><code class="language-yaml">
name: MacOS.Applications.MRU
description: |
   Parse the MRU from MacOS users

reference:
  - https://mac-alias.readthedocs.io/en/latest/bookmark_fmt.html
  - https://github.com/al45tair/mac_alias
  - https://www.mac4n6.com/blog/2016/7/10/new-script-macmru-most-recently-used-plist-parser

type: CLIENT

parameters:
   - name: FinderPlistPath
     default: /Users/*/Library/Preferences/com.apple.finder.plist

export: |
        -- Parser for MAC Bookmark format
        LET type_lookup &lt;= dict(
           `0x100`=&quot;__DataString&quot;,
           `0x200`=&quot;__DataData&quot;,
           `0x300`=&quot;__DataUint32&quot;,
           `0x400`=&quot;__DataDate&quot;,
           `0x500`=&quot;__DataBool&quot;,
           `0x600`=&quot;__DataArray&quot;,
           `0x700`=&quot;__DataDict&quot;,
           `0x800`=&quot;__DataUUID&quot;,
           `0x900`=&quot;__DataURL&quot;
           )

        LET MRULookup &lt;= dict(
           `0x2040`=&quot;Volume Bookmark&quot;,
           `0x2002`=&quot;Volume Path&quot;,
           `0x2020`=&quot;Volume Flags&quot;,
           `0x2030`=&quot;Volume is Root FS&quot;,
           `0x2011`=&quot;Volume UUID&quot;,
           `0x2012`=&quot;Volume Size&quot;,
           `0x2013`=&quot;Volume Creation Date&quot;,
           `0x2005`=&quot;Volume URL&quot;,
           `0x2040`=&quot;Volume Bookmark&quot;,
           `0x2050`=&quot;Volume Mount Point&quot;,
           `0xf080`=&quot;Security Extension&quot;,
           `0xf081`=&quot;Security Extension&quot;,
           `0x1004`=&quot;Target Path&quot;,
           `0x1005`=&quot;Target CNID Path&quot;,
           `0xc001`=&quot;Containing Folder Index&quot;,
           `0x1040`=&quot;Target Creation Date&quot;,
           `0x1010`=&quot;Target Flags&quot;,
           `0x1020`=&quot;Target Filename&quot;,
           `0xc011`=&quot;Creator Username&quot;,
           `0xc012`=&quot;Creator UID&quot;
        )

        LET BookmarkProfile = &#x27;&#x27;&#x27;[
         [&quot;Header&quot;, 0, [
          [&quot;Magic&quot;, 0, &quot;String&quot;, {
              length: 4,
          }],
          [&quot;Size&quot;, 4, &quot;uint32&quot;],
          [&quot;HeaderSize&quot;, 12, &quot;uint32&quot;],
          [&quot;TOCOffset&quot;, &quot;x=&gt;x.HeaderSize&quot;, &quot;uint32&quot;],
          [&quot;TOC&quot;, &quot;x=&gt;x.TOCOffset + x.HeaderSize&quot;, &quot;TOC&quot;]
         ]],
         [&quot;TOC&quot;, 0, [
          [&quot;SizeOfTOC&quot;, 0, &quot;uint32&quot;],
          [&quot;Magic&quot;, 4, &quot;uint32&quot;],
          [&quot;TOCId&quot;, 8, &quot;uint32&quot;],
          [&quot;NextTOC&quot;, 12, &quot;uint32&quot;],
          [&quot;TOCCount&quot;, 16, &quot;uint32&quot;],
          [&quot;Items&quot;, 20, &quot;Array&quot;, {
              type: &quot;TOCItem&quot;,
              count: &quot;x=&gt;x.TOCCount&quot;,
          }]
         ]],
         [&quot;__TOCArrayPtr&quot;, 4, [
          [&quot;Offset&quot;, 0, &quot;uint32&quot;],
          [&quot;Item&quot;, 0, &quot;Profile&quot;, {
            type: &quot;TOCValue&quot;,
            offset: &quot;x=&gt;x.Offset + 48&quot;
           }]
         ]],
         [&quot;TOCValue&quot;, 0, [
           [&quot;MyOffset&quot;, 0, &quot;Value&quot;, {
               value: &quot;x=&gt;x.StartOf&quot;,
           }],
           [&quot;length&quot;, 0, &quot;uint32&quot;],
           [&quot;subtype&quot;, 4, &quot;BitField&quot;, {
               type: &quot;uint32&quot;,
               start_bit: 0,
               end_bit: 8,
            }],
            [&quot;data_type&quot;, 4, &quot;BitField&quot;, {
               type: &quot;uint32&quot;,
               start_bit: 8,
               end_bit: 32,
            }],
            [&quot;data&quot;, 0, &quot;Value&quot;, {
               value: &quot;x=&gt;get(item=x, field=get(item=type_lookup, field=format(format=&#x27;%#x&#x27;, args=x.data_type)))&quot;,
            }],
            [&quot;__DataString&quot;, 8, &quot;String&quot;, {
               length: &quot;x=&gt;x.length&quot;,
               term: &quot;&quot;,
            }],
            [&quot;__DataData&quot;, 0, &quot;Value&quot;, {
               value: &quot;x=&gt;format(format=&#x27;%x&#x27;, args=x.__DataStr)&quot;,
            }],
            [&quot;__DataDateFloat&quot;, 8, &quot;float64be&quot;],
            [&quot;__DataDate&quot;, 0, &quot;Value&quot;, {
               value: &quot;x=&gt;timestamp(cocoatime=x.__DataDateFloat)&quot;,
            }],
            [&quot;__DataUint32&quot;, 8, &quot;uint32&quot;],
            [&quot;__DataBool&quot;, 0, &quot;Value&quot;, {
                value: &quot;x=&gt;if(condition=x.subtype, then=TRUE, else=FALSE)&quot;,
            }],
            [&quot;__DataURL&quot;, 0, &quot;Value&quot;, {
               value: &quot;x=&gt;x.__DataString&quot;,
            }],
            [&quot;__DataArrayOffsets&quot;, 8, &quot;Array&quot;, {
               count: &quot;x=&gt;x.length / 4&quot;,
               type: &quot;__TOCArrayPtr&quot;
            }],
            [&quot;__DataArray&quot;, 0, &quot;Value&quot;, {
               value: &quot;x=&gt;x.__DataArrayOffsets.Item.data&quot;,
            }],
         ]],
         [&quot;TOCItem&quot;, 12, [
           [&quot;ID&quot;, 0, &quot;uint32&quot;],
           [&quot;Offset&quot;, 4, &quot;uint32&quot;],
           [&quot;TOCValue&quot;, &quot;x=&gt;x.Offset + 48 - x.StartOf&quot;, &quot;TOCValue&quot;],
         ]]
        ]
        &#x27;&#x27;&#x27;

        LET ParseBookmark(Bookmark) =
           SELECT _value.name AS Name,
                  get(item=MRULookup, field=format(format=&quot;%#x&quot;, args=ID)) AS Field,
                  format(format=&quot;%#x&quot;, args=ID) AS FieldID,
                  format(format=&quot;%#x&quot;, args=TOCValue.data_type) AS data_type,
                  regex_replace(re=&quot;__Data&quot;, replace=&quot;&quot;,
                        source=get(item=type_lookup,
                        field=format(format=&quot;%#x&quot;,
                              args=TOCValue.data_type))) AS type,
                  TOCValue.data AS data

           FROM foreach(row=parse_binary(
                        accessor=&quot;data&quot;, filename=Bookmark,
                        profile=BookmarkProfile, struct=&quot;Header&quot;).TOC.Items)

sources:
  - query: |
        -- Parse the Plist file
        SELECT * FROM foreach(row={
          SELECT OSPath FROM glob(globs=FinderPlistPath)
        }, query={
          SELECT * FROM foreach(row={
            SELECT FXRecentFolders FROM plist(file=OSPath)
          }, query={
            SELECT *
            FROM foreach(row=FXRecentFolders, query={
               SELECT *, OSPath
               FROM ParseBookmark(Bookmark=_value.`file-bookmark`)
            })
          })
        })

</code></pre>

