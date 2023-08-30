---
title: Demo.Plugins.GUI
hidden: true
tags: [Client Artifact]
---

A demo plugin showing some GUI features.

This plugin is also used for tests.


<pre><code class="language-yaml">
name: Demo.Plugins.GUI
description: |
  A demo plugin showing some GUI features.

  This plugin is also used for tests.

resources:
  timeout: 20
  ops_per_second: 60
  max_rows: 213
  max_upload_bytes: 545454

parameters:
  - name: ChoiceSelector
    type: choices
    default: First Choice
    choices:
      - First Choice
      - Second Choice
      - Third Choice

  - name: Hashes
    validating_regex: &#x27;^\s*([A-F0-9]+\s*)+$&#x27;
    description: One or more hashes in hex separated by white space.

  - name: RegularExpression
    type: regex
    default: &quot;.&quot;

  - name: MultipleRegularExpression
    type: regex_array
    default: &#x27;[&quot;.+&quot;]&#x27;

  - name: YaraRule
    type: yara

  - name: Flag
    friendly_name: A Flag with a name
    type: bool
    default: True

  - name: Flag2
    type: bool
    default: Y

  - name: Flag3
    type: bool
    default: Y

  - name: OffFlag
    type: bool

  - name: StartDate
    type: timestamp

  - name: StartDate2
    type: timestamp

  - name: StartDate3
    type: timestamp

  - name: CSVData
    type: csv
    default: |
      Column1,Column2
      A,B
      C,D

  - name: CSVData2
    type: csv
    default: |
      Column1,Column2
      A,B
      C,D

  - name: JSONData
    type: json_array
    default: &quot;[]&quot;

  - name: JSONData2
    type: json_array
    default: |
      [{&quot;foo&quot;: &quot;bar&quot;}]

  - name: FileUpload1
    type: upload
    description: FileUpload1 can receive a file upload. The upload content will be available in this variable when executing on the client.

  - name: ArtifactSelections
    type: artifactset
    description: A selection of artifact
    artifact_type: CLIENT_EVENT
    default: |
      Artifact
      Windows.Detection.PsexecService
      Windows.Events.ProcessCreation
      Windows.Events.ServiceCreation

column_types:
  - name: Base64Hex
    type: base64hex

sources:
  - query: |
      SELECT base64encode(string=&quot;This should popup in a hex editor&quot;) AS Base64Hex,
             ChoiceSelector, Flag, Flag2, Flag3,
             OffFlag, StartDate, StartDate2, StartDate3,
             CSVData, CSVData2, JSONData, JSONData2,
             len(list=FileUpload1) AS FileUpload1Length
      FROM scope()

    notebook:
      - type: vql_suggestion
        name: Test Suggestion
        template: |
          /*
          # This is a suggestion notebook cell.

          It should be available from the suggestions list.
          */
          SELECT * FROM info()

      - type: md
        template: |
          # GUI Notebook tests

          The following cells are testing the notebook in the flow. To
          run this test simply collect the `Demo.Plugins.GUI` artifact
          and check the output is correct.

          **Each of the below cells should have a H2 heading**

          ## Check that notebook environment variables are populated
          {{ $x := Query &quot;SELECT * FROM items(\
             item=dict(NotebookId=NotebookId, ClientId=ClientId,\
                       FlowId=FlowId, ArtifactName=ArtifactName))&quot; | Expand }}

          {{ range $x }}
          * {{ Get . &quot;_key&quot; }} - {{ Get . &quot;_value&quot; }}
          {{- end -}}

      - type: md
        template: |
          ## Code syntax highlighting for VQL

          ```vql
          SELECT * FROM info()
          ```

      - type: vql
        template: |
          /*
          ## A VQL cell with a heading.
          */
          LET ColumnTypes = dict(
            Time1=&quot;timestamp&quot;,
            Time2=&quot;timestamp&quot;,
            Time3=&quot;timestamp&quot;,
            Time4=&quot;timestamp&quot;,
            FlowId=&quot;flow&quot;,
            ClientId=&quot;client&quot;,
            Data=&quot;hex&quot;,
            URL=&quot;url&quot;,
            SafeURL=&quot;safe_url&quot;, // Present dialog before click.
            Base64Data=&quot;base64hex&quot;
          )

          LET Base64Data = base64encode(string=&quot;\x00\x01\x20\x32\x12\x10&quot;)
          LET URL = &quot;[Google](https://www.google.com)&quot;

          SELECT 1628609690.1 AS Raw,

                 -- float
                 1628609690.1 AS Time1,

                 -- ms as a string
                 &quot;1628609690100&quot; AS Time2,

                 -- ns
                 1628609690100000 AS Time3,

                 -- Standard string form
                 &quot;2021-08-10T15:34:50Z&quot; AS Time4,

                 FlowId, ClientId, URL, URL AS SafeURL, Base64Data,

                 format(format=&quot;%02x&quot;, args=&quot;Hello&quot;) AS Data
          FROM scope()

      - type: Markdown
        template: |
          ## Scatter Chart with a named column

          {{ define &quot;ScatterTest&quot; }}
           SELECT X, Name, Y, Y3
          FROM parse_csv(accessor=&quot;data&quot;, filename=&#x27;&#x27;&#x27;
          X,Name,Y,Y3
          1,Bob,2,3
          2,Frank,4,6
          3,Mike,6,8
          4,Sally,3,2
           &#x27;&#x27;&#x27;)
          {{ end }}
          {{ Query &quot;ScatterTest&quot; | ScatterChart &quot;name_column&quot; &quot;Name&quot; }}

          ## Stacked Bar Chart (Categories are first column)

          {{ define &quot;Test&quot; }}
          SELECT X, Y, Y3
          FROM parse_csv(accessor=&quot;data&quot;, filename=&#x27;&#x27;&#x27;
          X,Y,Y3
          Bob,2,3
          Bill,4,6
          Foo,6,8
          Bar,7,2
          &#x27;&#x27;&#x27;)
          {{ end }}
          {{ Query &quot;Test&quot; | BarChart &quot;type&quot; &quot;stacked&quot; }}

          ## Time chart with timestamp in first column

          {{ define &quot;TimeTest&quot; }}
          SELECT Timestamp, Y, Y3
          FROM parse_csv(accessor=&quot;data&quot;, filename=&#x27;&#x27;&#x27;
          Timestamp,Y,Y3
          2021-10-09,2,3
          2021-10-10,4,6
          2021-10-11,6,8
          2021-10-12,7,2
          &#x27;&#x27;&#x27;)
          {{ end }}
          {{ Query &quot;TimeTest&quot; | TimeChart }}

          ## Line chart

          {{ define &quot;LineTest&quot; }}
          SELECT X, Y, Y3
          FROM parse_csv(accessor=&quot;data&quot;, filename=&#x27;&#x27;&#x27;
          X,Y,Y3
          1,2,3
          2,4,6
          3,6,8
          4,7,2
          &#x27;&#x27;&#x27;)
          {{ end }}
          {{ Query &quot;LineTest&quot; | LineChart }}

      - type: Markdown
        template: |
          ## A Line Chart

          The following should show a CPU load chart of the last 10 min.

          {{ define &quot;Q&quot; }}
            SELECT _ts, CPUPercent
            FROM monitoring(
                  artifact=&quot;Server.Monitor.Health/Prometheus&quot;,
                  start_time=now() - 10 * 60)
            LIMIT 100
          {{ end }}

          {{ Query &quot;Q&quot; | TimeChart }}

      - type: vql
        template: |
          /*
          ## Adding timelines

          Add a timeline from this time series data. (This only works
          for root org because it relies on server health events).

          */
          SELECT timestamp(epoch=_ts) AS Timestamp, CPUPercent
          FROM monitoring(
            source=&quot;Prometheus&quot;,
            artifact=&quot;Server.Monitor.Health&quot;,
            start_time=now() - 10 * 60)

          LET T1 = SELECT
               timestamp(epoch=_ts) AS Timestamp,
               dict(X=CPUPercent, Y=1) AS Dict
          FROM monitoring(
            source=&quot;Prometheus&quot;,
            artifact=&quot;Server.Monitor.Health&quot;,
            start_time=now() - 10 * 60)

          -- Add the time series into the timeline.
          SELECT timeline_add(
              key=&quot;Timestamp&quot;, name=&quot;Time 你好世界 &#x27;line&#x27; &amp;\&quot; &quot;,
              query=T1, timeline=&quot;Test \&quot;Timeline 你好世界\&quot;&quot;),
           timeline_add(
              key=&quot;Timestamp&quot;, name=&quot;2&quot;,
              query=T1, timeline=&quot;Test \&quot;Timeline 你好世界\&quot;&quot;)
          FROM scope()

      - type: Markdown
        env:
          - key: Timeline
            value: Test &quot;Timeline 你好世界&quot;
        template: |
          ## This super timeline should have two timelines.

          Add a timeline manually and hit refresh on this cell to
          check it is being updated.

          {{ Scope &quot;Timeline&quot; | Timeline }}

      - type: VQL
        template: |
          /*
          # Test table scrolling.

          Check both expanded and contracted states of the cell
          */
          LET zalgo = &quot;1̴̣̜̗̰͇͖͖̞̮͈͍̂͜.̸̢̧̨͙̻̜̰̼̔̿̓̄̀̅͌̈́͒͗̈́̒̕̚͜͠e̶̙̞̬̹̥͖̤̟͑͒̂̀̔͠x̵̛̱̠̳͍̦̘̤̙͚̙͈̬́̈́͂̎̽̇̀͝ę̵̯̦̫͖͖͍͈̟̠͉̥͒̑̐̏̕̚̕͜͠&quot;
          LET Test = &quot;Hellothereongline&quot; + zalgo

          SELECT Test AS Test1, Test AS Test2, Test AS Test3,
                 Test AS Test4, Test AS Test5,
                 Test AS Test11, Test AS Test21,
                 Test AS Test13, Test AS Test14, Test AS Test15,
                 Test AS Test21, Test AS Test22,
                 Test AS Test23, Test AS Test24, Test AS Test25
          FROM range(start=0, end=100, step=1)

      - type: VQL
        template: |
          /*
          # Column types set in the artifact&#x27;s `column_types` field

          These apply to notebooks automatically without needing to
          define them again.

          * Hash column should right click to VT
          * upload preview should show the uploaded file.

          */

          LET ColumnTypes = dict(`StartDate`=&#x27;timestamp&#x27;,
                                 Hex=&#x27;hex&#x27;, Upload=&#x27;preview_upload&#x27;)
          LET Hex = &quot;B0 EC 48 5F 18 77&quot;

          SELECT Hex, StartDate, hash(accessor=&quot;data&quot;, path=&quot;Hello&quot;) AS Hash,
                 upload(accessor=&quot;data&quot;, file=&quot;Hello world&quot;,
                        name=&quot;test.txt&quot;) AS Upload
          FROM source()

</code></pre>

