---
title: Windows.Sys.PhysicalMemoryRanges
hidden: true
tags: [Client Artifact]
---

List Windows physical memory ranges.

<pre><code class="language-yaml">
name: Windows.Sys.PhysicalMemoryRanges
description: List Windows physical memory ranges.
reference:
  - https://docs.microsoft.com/en-us/windows-hardware/drivers/ddi/content/wdm/ns-wdm-_cm_resource_list

parameters:
  - name: physicalMemoryKey
    default: HKEY_LOCAL_MACHINE\HARDWARE\RESOURCEMAP\System Resources\Physical Memory\.Translated

export: |
  LET Profile = &#x27;&#x27;&#x27;
      [
        [&quot;CM_RESOURCE_LIST&quot;, 0, [
          [&quot;Count&quot;, 0, &quot;uint32&quot;],
          [&quot;List&quot;, 4, &quot;CM_FULL_RESOURCE_DESCRIPTOR&quot;]
        ]],
        [&quot;CM_FULL_RESOURCE_DESCRIPTOR&quot;, 0, [
           [&quot;PartialResourceList&quot;, 8, &quot;CM_PARTIAL_RESOURCE_LIST&quot;]
        ]],

        [&quot;CM_PARTIAL_RESOURCE_LIST&quot;, 0, [
           [&quot;Version&quot;, 0, &quot;uint16&quot;],
           [&quot;Revision&quot;, 2, &quot;uint16&quot;],
           [&quot;Count&quot;, 4, &quot;uint32&quot;],
           [&quot;PartialDescriptors&quot;, 8, &quot;Array&quot;, {
              &quot;type&quot;: &quot;CM_PARTIAL_RESOURCE_DESCRIPTOR&quot;,
              &quot;count&quot;: &quot;x=&gt;x.Count&quot;
           }]
        ]],

        [&quot;CM_PARTIAL_RESOURCE_DESCRIPTOR&quot;, 20, [
           [&quot;Type&quot;, 0, &quot;char&quot;],
           [&quot;ShareDisposition&quot;, 1, &quot;char&quot;],
           [&quot;Flags&quot;,2, &quot;uint16&quot;],
           [&quot;Start&quot;,4, &quot;int64&quot;],
           [&quot;Length&quot;,12, &quot;uint32&quot;]
        ]]
      ]
  &#x27;&#x27;&#x27;

sources:
  - precondition:
      SELECT OS From info() where OS = &#x27;windows&#x27;
    query: |
      SELECT * FROM foreach(
         row={SELECT Data from stat(filename=physicalMemoryKey, accessor=&quot;registry&quot;)},
         query={
            SELECT * FROM foreach(
               row=parse_binary(
                  filename=Data.value,
                  accessor=&quot;data&quot;,
                  profile=Profile,
                  struct=&quot;CM_RESOURCE_LIST&quot;).List.PartialResourceList.PartialDescriptors,
               query={
                  SELECT Type,
                         format(format=&quot;%#0x&quot;, args=Start) AS Start,
                         format(format=&quot;%#0x&quot;, args=Length) AS Length
                  FROM scope()
              })
      })

</code></pre>

