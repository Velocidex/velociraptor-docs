---
title: Server.Internal.ArtifactDescription
hidden: true
tags: [Internal Artifact]
---



<pre><code class="language-yaml">
name: Server.Internal.ArtifactDescription

type: INTERNAL

reports:
  - type: INTERNAL
    template: |
      {{ $artifact := Scope "artifact" }}

      ## {{ $artifact.Name }}

      #### Type: {{ $artifact.Type }}

      {{ if $artifact.BuiltIn }}
      {{ else }}
      ##### Custom Artifact
      {{ end }}

      {{ if $artifact.Author }}
      ##### Author: {{ $artifact.Author }}
      {{end}}

      {{ if $artifact.Description }}

      &lt;div class="description-content"&gt;

      {{ $artifact.Description }}

      {{ if $artifact.Reference }}
      ---
      References:
      &lt;ul&gt;
      {{- range $item := $artifact.Reference -}}
      &lt;li&gt;{{ $item }}&lt;/li&gt;
      {{- end -}}
      &lt;/ul&gt;
      {{ end }}
      &lt;/div&gt;

      {{ end }}

      {{ if $artifact.Tools }}
      ### Tools

      {{ range $artifact.Tools -}}
      * &lt;velo-tool-viewer name="{{.Name}}" version="{{.Version}}"&gt;&lt;/velo-tool-viewer&gt;
      {{ end }}

      {{ end }}

      {{ if $artifact.Parameters }}

      ### Parameters

      &lt;table class="table table-striped"&gt;
      &lt;thead&gt;
         &lt;tr&gt;
           &lt;th&gt;Name&lt;/th&gt;
           &lt;th&gt;Type&lt;/th&gt;
           &lt;th&gt;Default&lt;/th&gt;
           &lt;th&gt;Description&lt;/th&gt;
         &lt;/tr&gt;
      &lt;/thead&gt;
      &lt;tbody&gt;
      {{- range $item := $artifact.Parameters -}}
         {{- if not (eq $item.Type "hidden") -}}
           &lt;tr&gt;
             &lt;td&gt;{{ $item.Name }}&lt;/td&gt;
             &lt;td&gt;{{ $item.Type }}&lt;/td&gt;
             &lt;td&gt;&lt;pre&gt;{{ $item.Default }}&lt;/pre&gt;&lt;/td&gt;
             &lt;td&gt;{{ $item.Description }}&lt;/td&gt;
           &lt;/tr&gt;
         {{- end -}}
      {{- end -}}
      &lt;/tbody&gt;&lt;/table&gt;

      {{ end }}

      {{ if $artifact.Imports }}

      &lt;table class="table table-striped"&gt;
      &lt;thead&gt;
         &lt;tr&gt;
           &lt;th&gt;Imports&lt;/th&gt;
         &lt;/tr&gt;
      &lt;/thead&gt;
      &lt;tbody&gt;
      {{- range $item := $artifact.Imports -}}
        &lt;tr&gt;
          &lt;td&gt;{{ $item }}&lt;/td&gt;
        &lt;/tr&gt;
      {{- end -}}
      &lt;/tbody&gt;&lt;/table&gt;

      {{ end }}

      {{ if $artifact.Export }}
      ### Exports

      ```vql
      {{ $artifact.Export }}
      ```
      {{ end }}

      {{ range $source := $artifact.Sources }}

      {{ if or $source.Queries $source.Query $source.Notebook }}

      ### Source {{ $source.Name }}

      {{ if $source.Query }}

      ```vql
      {{ $source.Query }}
      ```

      {{- else if $source.Queries -}}

      ```vql
      {{ range $query := $source.Queries -}}
      {{- $query -}}
      {{ end }}
      ```

      {{ end }}

      {{ if len $source.Notebook }}

      #### Notebook cells

      {{ range $notebook := $source.Notebook }}

      {{ if $notebook.Name }}
      * `{{ $notebook.Type }}`: {{ $notebook.Name }}
      {{ else }}
      * `{{ $notebook.Type }}`
      {{ end }}
      {{ end }}

      {{ end }}

      {{ end }}

      {{ end }}

</code></pre>

