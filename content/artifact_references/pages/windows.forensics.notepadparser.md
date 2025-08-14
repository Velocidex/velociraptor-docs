---
title: Windows.Forensics.NotepadParser
hidden: true
tags: [Client Artifact]
---

Parse the Windows 11 Notepad state files.

Based on the research work published by ogmini. This artifact parses
the TabState and WindowState files and also uploads them for
preservation.


<pre><code class="language-yaml">
name: Windows.Forensics.NotepadParser
description: |
  Parse the Windows 11 Notepad state files.

  Based on the research work published by ogmini. This artifact parses
  the TabState and WindowState files and also uploads them for
  preservation.

reference:
  - https://github.com/ogmini/Notepad-State-Library
  - https://ogmini.github.io/tags.html#Windows-Notepad

author: ogmini https://ogmini.github.io/ and Mike Cohen

parameters:
  - name: WindowStateGlob
    default: C:/Users/*/AppData/Local*/Packages/Microsoft.WindowsNotepad*/LocalState/WindowState/*[01].bin
  - name: TabStateGlob
    default: C:/Users/*/AppData/Local*/Packages/Microsoft.WindowsNotepad*/LocalState/TabState/*.bin

export: |
    LET WinNotepadProfile &lt;= '''[
      [WindowStateHeader, 0, [
        [Signature, 0, String, {
            length: 2,
        }],
        [Sequence, 2, leb128],
        [BytesToCRC, "x=&gt;x.`@Sequence`.EndOf", leb128],
        [NumberTabs, "x=&gt;x.`@BytesToCRC`.EndOf + 1", leb128],
        [Tabs, "x=&gt;x.NumberTabs.EndOf", Array, {
           type: GUID,
           count: "x=&gt;x.NumberTabs.Value",
           sentinel: "x=&gt;x.__D1 = 0 AND x.__D2 = 0",
        }],
        [ActiveTab, "x=&gt;x.Tabs.EndOf", leb128],
      ]],

      ["GUID", 16, [
        ["__D1", 0, "uint32"],
        ["__D2", 4, "uint16"],
        ["__D3", 6, "uint16"],
        ["__D4", 8, "String", {"term": "", "length": 2}],
        ["__D5", 10, "String", {"term": "", "length": 6}],
        ["Value", 0, "Value", { "value": "x=&gt;upcase(string=
            format(format='%08x-%04x-%04x-%02x-%02x',
              args=[x.__D1, x.__D2, x.__D3, x.__D4, x.__D5]))" }],
      ]],

      [TabStateHeader, 0, [
        [Signature, 0, String, {
            length: 2,
        }],
        [Sequence, 2, leb128],
        [Type, "x=&gt;x.Sequence.EndOf", leb128],
        [Header, 0, Union, {
           selector: "x=&gt;x.Type.Value",
           choices: {
             "0": "TabStateHeaderUnsaved",
             "1": "TabStateHeaderSaved",
           },
        }],
      ]],

      [TabStateHeaderUnsaved, 0, [
        [Signature, 0, String, {
            length: 2,
        }],
        [Sequence, 2, leb128],
        [Type, "x=&gt;x.Sequence.EndOf", leb128],

        [CursorPosition, "x=&gt;x.Type.EndOf + 1", CursorPosition],
        [ConfigurationBlock, "x=&gt;x.CursorPosition.EndOf", ConfigurationBlock],
        [ContentLength, "x=&gt;x.ConfigurationBlock.EndOf", leb128],
        [Content, "x=&gt;x.ContentLength.EndOf", String, {
            encoding: "utf16",
            length: "x=&gt;x.ContentLength.Value * 2",
            max_length: 100000,
        }],
        [Unsaved, "x=&gt;x.`@Content`.EndOf", uint8],
        [CRC32, "x=&gt;x.`@Unsaved`.EndOf", uint32],
      ]],

      [TabStateHeaderSaved, 0, [
        [HeaderType, 0, Value, {
          value: "Saved",
        }],
        [Signature, 0, String, {
            length: 2,
        }],
        [Sequence, 2, leb128],
        [Type, "x=&gt;x.Sequence.EndOf", leb128],
        [FilePathLength, "x=&gt;x.Type.EndOf", leb128],
        [FilePath, "x=&gt;x.FilePathLength.EndOf", String, {
            encoding: "utf16",
            length: "x=&gt;x.FilePathLength.Value * 2",
        }],
        [SavedFileContentLength, "x=&gt;x.`@FilePath`.EndOf", leb128],
        [EncodingType, "x=&gt;x.SavedFileContentLength.EndOf", uint8],
        [CarriageReturnType, "x=&gt;x.`@EncodingType`.EndOf", uint8],
        [__Timestamp, "x=&gt;x.`@CarriageReturnType`.EndOf", leb128],
        [Timestamp, 0, Value, {
            value: "x=&gt;timestamp(winfiletime=x.__Timestamp.Value)",
        }],
        [FileHash, "x=&gt;x.__Timestamp.EndOf", String, {
            length: 32, term: "",
        }],
        [CursorPosition, "x=&gt;x.`@FileHash`.EndOf + 2", CursorPosition],
        [ConfigurationBlock, "x=&gt;x.CursorPosition.EndOf", ConfigurationBlock],
        [ContentLength, "x=&gt;x.ConfigurationBlock.EndOf", leb128],
        [Content, "x=&gt;x.ContentLength.EndOf", String, {
            encoding: "utf16",
            length: "x=&gt;x.ContentLength.Value * 2",
            max_length: 100000,
        }],
        [Unsaved, "x=&gt;x.`@Content`.EndOf", uint8],
        [CRC32, "x=&gt;x.`@Unsaved`.EndOf", uint32],
        [UnsavedBuffers, "x=&gt;x.`@CRC32`.EndOf", Array, {
           type: UnsavedBuffer,
           count: 100,
           sentinel: "x=&gt;x.AdditionAction.Value = 0",
        }],
      ]],
      [ConfigurationBlock, "x=&gt;x.MoreOptions.EndOf + x.MoreOptions.Value - x.OffsetOf", [
         ["WordWrap", 0, uint8],
         ["RightToLeft", 1, uint8],
         [ShowUnicode, 2, uint8],
         [MoreOptions, 3, leb128],
      ]],
      [CursorPosition, "x=&gt;x.SelectionEndIndex.EndOf - x.OffsetOf", [
        [SelectionStartIndex, 0, leb128],
        [SelectionEndIndex, "x=&gt;x.`@SelectionStartIndex`.RelEndOf", leb128],
      ]],

      [UnsavedBuffer, "x=&gt;x.`@AddedChars`.EndOf + 4 - x.OffsetOf", [
        [Offset, 0, Value, {
          value: "x=&gt;x.OffsetOf",
        }],
        [CursorPosition, 0, leb128],
        [DeletionAction, "x=&gt;x.`@CursorPosition`.RelEndOf", leb128],
        [AdditionAction, "x=&gt;x.`@DeletionAction`.RelEndOf", leb128],
        [AddedChars, "x=&gt;x.`@AdditionAction`.RelEndOf", String, {
            encoding: "utf16",
            length: "x=&gt;x.AdditionAction.Value * 2",
            max_length: 100000,
        }]
      ]],
    ]
    '''

column_types:
- name: Upload
  type: preview_upload


sources:
- name: TabState
  query:
    LET AllFiles = SELECT OSPath, Mtime, Size,
        upload(file=OSPath, mtime=Mtime) AS Upload
    FROM glob(globs=TabStateGlob)

    LET AllTabState = SELECT *, parse_binary(
      filename=OSPath,
      offset=0,
      profile=WinNotepadProfile,
      struct="TabStateHeader") AS _TabState
    FROM AllFiles
    WHERE _TabState.Header.Signature

    SELECT *,
       _TabState.Header.FilePath AS EditedFile,
       _TabState.Header.Timestamp AS EditTimestamp,
       _TabState.Header.Content AS Content,
       _TabState.Header.UnsavedBuffers.AddedChars AS UnsavedBuffers,
       Upload
    FROM AllTabState

- name: WindowState
  query:
    LET AllFiles = SELECT OSPath, Mtime, Size,
        upload(file=OSPath, mtime=Mtime) AS Upload
    FROM glob(globs=WindowStateGlob)

    LET AllTabState = SELECT *, parse_binary(
      filename=OSPath,
      offset=0,
      profile=WinNotepadProfile,
      struct="WindowStateHeader") AS _WindowState

    FROM AllFiles
    WHERE _WindowState.Signature = "NP"


    SELECT *,
       _WindowState.NumberOfTabs AS NumberOfTabs,
       _WindowState.Tabs.Value.Value AS Tabs,
       _WindowState.ActiveTab AS ActiveTab,
       Upload
    FROM AllTabState

</code></pre>

