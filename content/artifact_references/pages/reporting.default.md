---
title: Reporting.Default
hidden: true
tags: [Server Artifact]
---

A default template for HTML export.  This template will be used to
host html exports such as the notebook and the reporting
templates. Velociraptor will evaluate this template on the following
dict:

  - key main: contains a string with all the results of rendering
              the notebook inside.

## Notes

1. All html elements are allowed in a html template.

2. It is possible to run arbitrary VQL (and therefore arbitrary
   code) inside HTML templates. Therefore to modify this you will
   need the SERVER_ARTIFACT_WRITER permission.


<pre><code class="language-yaml">
name: Reporting.Default

type: SERVER

description: |
  A default template for HTML export.  This template will be used to
  host html exports such as the notebook and the reporting
  templates. Velociraptor will evaluate this template on the following
  dict:

    - key main: contains a string with all the results of rendering
                the notebook inside.

  ## Notes

  1. All html elements are allowed in a html template.

  2. It is possible to run arbitrary VQL (and therefore arbitrary
     code) inside HTML templates. Therefore to modify this you will
     need the SERVER_ARTIFACT_WRITER permission.

reports:
  - name: Templates
    type: TEMPLATES
    template: |
       {{ define &quot;fold_start&quot; }}
       &lt;div role=&quot;button&quot; class=&quot;btn btn-primary btn-block row collapsible&quot;&gt;View Details&lt;/div&gt;
       &lt;div class=&quot;collapse row&quot;&gt;&lt;div class=&quot;card card-body overflow-auto&quot;&gt;
       {{end}}
       {{ define &quot;fold_end&quot; }}
       &lt;/div&gt;&lt;/div&gt;
       {{ end }}

       {{ define &quot;hidden_paragraph_start&quot; }}
       {{- if .description -}}
       &lt;div&gt;&lt;a href=&quot;#&quot; class=&quot;collapsible&quot;&gt;{{ .description }} ...&lt;/a&gt;
       {{- else -}}
       &lt;div&gt;&lt;a href=&quot;#&quot; class=&quot;collapsible&quot;&gt;More ...&lt;/a&gt;
       {{- end -}}
       &lt;div class=&quot;collapse&quot;&gt;
       {{end}}

       {{ define &quot;hidden_paragraph_end&quot; }}
       &lt;/div&gt;&lt;/div&gt;
       {{ end }}


  - type: HTML
    template: |
      {{ import &quot;Reporting.Default&quot; &quot;Templates&quot; }}

      &lt;!doctype html&gt;
       &lt;html lang=&quot;en-US&quot;&gt;
         &lt;head&gt;
         {{ $hostinfo := Query &quot;SELECT timestamp(epoch=now()).UTC.String AS Time, \
             OS, Fqdn FROM info()&quot; | Expand }}

           &lt;meta charset=&quot;utf-8&quot;&gt;
           &lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;&gt;
           &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;&gt;

           &lt;!-- Name of the scan --&gt;
           &lt;title&gt;{{ Get $hostinfo &quot;0.Fqdn&quot; }} Artifact Collection&lt;/title&gt;
           &lt;style&gt;
             @charset &quot;UTF-8&quot;;
           body {
             padding-top: 57px;
           }
           .btn-primary.btn {
              color: #00aa00;
              background-color: #fff;
              border-color: #fff;
           }
           .btn-primary.btn:hover {
              color: #fff;
              background-color: #00911e;
              border-color: #00911e;
           }
           .btn.btn-primary:not(:disabled):not(.disabled):active, .btn.btn-primary:not(:disabled):not(.disabled).active {
              color: #fff;
              background-color: #008773;
              border-color: #008773;
           }
           .btn.btn-primary:focus, .btn.btn-primary.focus {
             color: #fff;
              background-color: #00911e;
              border-color: #00911e;
             box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
           }
           .header {
               background-color: black;
               border-bottom: 1px solid #00aa00;
           }
           .collapse {
             display: none;
           }
           .anchor {
             display: block;
             position: relative;
             top: -57px;
             visibility: hidden;
           }
           .logo {
             margin-top: -17px;
             margin-bottom: -10px;
             margin-left: 20px;
             height: 40px;
           }

           .section {
               color: #FFFFFF;
               font-size: 24px;
               background-color: #00aa00;
               font-family: Gotham, &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif;
               font-variant: normal;
               padding-top: 15px;
               padding-bottom: 15px;
               text-align: center;
           }
           .top-section {
               border-bottom-left-radius: 40px;
               border-bottom-right-radius: 40px;
           }

           /* Error */  .chromaerr { color: #a61717; background-color: #e3d2d2 }
           /* LineTableTD */  .chromalntd { vertical-align: top; padding: 0; margin: 0; border: 0; }
           /* LineTable */  .chromalntable { border-spacing: 0; padding: 0; margin: 0; border: 0; width: auto; overflow: auto; display: block; }
           /* LineHighlight */  .chromahl { display: block; width: 100%; }
           /* LineNumbersTable */  .chromalnt { margin-right: 0.4em; padding: 0 0.4em 0 0.4em; }
           /* LineNumbers */  .chromaln { display: none; margin-right: 0.4em; padding: 0 0.4em 0 0.4em; }
           /* Keyword */  .chromak { color: #000000; font-weight: bold }
           /* KeywordConstant */  .chromakc { color: #000000; font-weight: bold }
           /* KeywordDeclaration */  .chromakd { color: #000000; font-weight: bold }
           /* KeywordNamespace */  .chromakn { color: #000000; font-weight: bold }
           /* KeywordPseudo */  .chromakp { color: #000000; font-weight: bold }
           /* KeywordReserved */  .chromakr { color: #000000; font-weight: bold }
           /* KeywordType */  .chromakt { color: #445588; font-weight: bold }
           /* NameAttribute */  .chromana { color: #008080 }
           /* NameBuiltin */  .chromanb { color: #0086b3 }
           /* NameBuiltinPseudo */  .chromabp { color: #999999 }
           /* NameClass */  .chromanc { color: #445588; font-weight: bold }
           /* NameConstant */  .chromano { color: #008080 }
           /* NameDecorator */  .chromand { color: #3c5d5d; font-weight: bold }
           /* NameEntity */  .chromani { color: #800080 }
           /* NameException */  .chromane { color: #990000; font-weight: bold }
           /* NameFunction */  .chromanf { color: #990000; font-weight: bold }
           /* NameLabel */  .chromanl { color: #990000; font-weight: bold }
           /* NameNamespace */  .chromann { color: #555555 }
           /* NameTag */  .chromant { color: #000080 }
           /* NameVariable */  .chromanv { color: #008080 }
           /* NameVariableClass */  .chromavc { color: #008080 }
           /* NameVariableGlobal */  .chromavg { color: #008080 }
           /* NameVariableInstance */  .chromavi { color: #008080 }
           /* LiteralString */  .chromas { color: #dd1144 }
           /* LiteralStringAffix */  .chromasa { color: #dd1144 }
           /* LiteralStringBacktick */  .chromasb { color: #dd1144 }
           /* LiteralStringChar */  .chromasc { color: #dd1144 }
           /* LiteralStringDelimiter */  .chromadl { color: #dd1144 }
           /* LiteralStringDoc */  .chromasd { color: #dd1144 }
           /* LiteralStringDouble */  .chromas2 { color: #dd1144 }
           /* LiteralStringEscape */  .chromase { color: #dd1144 }
           /* LiteralStringHeredoc */  .chromash { color: #dd1144 }
           /* LiteralStringInterpol */  .chromasi { color: #dd1144 }
           /* LiteralStringOther */  .chromasx { color: #dd1144 }
           /* LiteralStringRegex */  .chromasr { color: #009926 }
           /* LiteralStringSingle */  .chromas1 { color: #dd1144 }
           /* LiteralStringSymbol */  .chromass { color: #990073 }
           /* LiteralNumber */  .chromam { color: #009999 }
           /* LiteralNumberBin */  .chromamb { color: #009999 }
           /* LiteralNumberFloat */  .chromamf { color: #009999 }
           /* LiteralNumberHex */  .chromamh { color: #009999 }
           /* LiteralNumberInteger */  .chromami { color: #009999 }
           /* LiteralNumberIntegerLong */  .chromail { color: #009999 }
           /* LiteralNumberOct */  .chromamo { color: #009999 }
           /* Operator */  .chromao { color: #000000; font-weight: bold }
           /* OperatorWord */  .chromaow { color: #000000; font-weight: bold }
           /* Comment */  .chromac { color: #999988; font-style: italic }
           /* CommentHashbang */  .chromach { color: #999988; font-style: italic }
           /* CommentMultiline */  .chromacm { color: #999988; font-style: italic }
           /* CommentSingle */  .chromac1 { color: #999988; font-style: italic }
           /* CommentSpecial */  .chromacs { color: #999999; font-weight: bold; font-style: italic }
           /* CommentPreproc */  .chromacp { color: #999999; font-weight: bold; font-style: italic }
           /* CommentPreprocFile */  .chromacpf { color: #999999; font-weight: bold; font-style: italic }
           /* GenericDeleted */  .chromagd { color: #000000; background-color: #ffdddd }
           /* GenericEmph */  .chromage { color: #000000; font-style: italic }
           /* GenericError */  .chromagr { color: #aa0000 }
           /* GenericHeading */  .chromagh { color: #999999 }
           /* GenericInserted */  .chromagi { color: #000000; background-color: #ddffdd }
           /* GenericOutput */  .chromago { color: #888888 }
           /* GenericPrompt */  .chromagp { color: #555555 }
           /* GenericStrong */  .chromags { font-weight: bold }
           /* GenericSubheading */  .chromagu { color: #aaaaaa }
           /* GenericTraceback */  .chromagt { color: #aa0000 }
           /* TextWhitespace */  .chromaw { color: #bbbbbb }

           &lt;/style&gt;
           &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, shrink-to-fit=no&quot;&gt;

           &lt;!-- Bootstrap core CSS --&gt;
           &lt;link rel=&quot;stylesheet&quot; href=&quot;https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css&quot; integrity=&quot;sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh&quot; crossorigin=&quot;anonymous&quot;&gt;
           &lt;link rel=&quot;stylesheet&quot; href=&quot;https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css&quot; &gt;

           &lt;script src=&quot;https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js&quot;&gt;&lt;/script&gt;
           &lt;script src=&quot;https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js&quot; integrity=&quot;sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6&quot; crossorigin=&quot;anonymous&quot;&gt;&lt;/script&gt;
           &lt;script src=&quot;https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js&quot;&gt;&lt;/script&gt;
         &lt;/head&gt;
         &lt;body&gt;
           &lt;nav class=&quot;header navbar navbar-expand-lg navbar-dark fixed-top&quot;&gt;
             &lt;a class=&quot;navbar-brand&quot; href=&quot;#&quot; aria-label=&quot;CyberCX&quot;&gt;
               &lt;img src=&quot;https://www.velocidex.com/images/logos/velo_word_on_side.svg&quot; class=&quot;logo&quot;/&gt;
             &lt;/a&gt;
             &lt;button class=&quot;navbar-toggler&quot; type=&quot;button&quot;
                     data-toggle=&quot;collapse&quot;
                     data-target=&quot;#navbarSupportedContent&quot;
                     aria-controls=&quot;navbarSupportedContent&quot;
                     aria-expanded=&quot;false&quot; aria-label=&quot;Toggle navigation&quot;&gt;
               &lt;span class=&quot;navbar-toggler-icon&quot;&gt;&lt;/span&gt;
             &lt;/button&gt;
             &lt;div class=&quot;collapse navbar-collapse&quot; id=&quot;navbarSupportedContent&quot;&gt;
               &lt;ul class=&quot;navbar-nav mr-auto&quot;&gt;
                 &lt;li class=&quot;nav-item active&quot;&gt;
                   &lt;a class=&quot;nav-link&quot; href=&quot;#&quot;&gt;Top &lt;span class=&quot;sr-only&quot;&gt;(top)&lt;/span&gt;&lt;/a&gt;
                 &lt;/li&gt;
                 &lt;li class=&quot;nav-item&quot;&gt;
                   &lt;a class=&quot;nav-link&quot; href=&quot;https://github.com/Velocidex/velociraptor&quot;&gt;GitHub&lt;/a&gt;
                 &lt;/li&gt;
                 &lt;li class=&quot;nav-item&quot;&gt;
                   &lt;a class=&quot;nav-link&quot; href=&quot;#&quot; id=&quot;print-button&quot;&gt;Print&lt;/a&gt;
                 &lt;/li&gt;

                 &lt;li class=&quot;nav-item dropdown&quot;&gt;
                   &lt;a class=&quot;nav-link dropdown-toggle&quot; href=&quot;#&quot;
                   id=&quot;navbarDropdown&quot; role=&quot;button&quot;
                   data-toggle=&quot;dropdown&quot;
                   aria-haspopup=&quot;true&quot; aria-expanded=&quot;false&quot;&gt;
                     Artifacts Collected
                   &lt;/a&gt;
                   &lt;div class=&quot;dropdown-menu&quot; aria-labelledby=&quot;navbarDropdown&quot;&gt;
                     {{ range .parts }}
                     &lt;a class=&quot;dropdown-item&quot; href=&quot;#{{- .Artifact.Name -}}&quot;&gt;
                         {{ .Artifact.Name }}
                     &lt;/a&gt;
                     {{ end }}
                   &lt;/div&gt;
                 &lt;/li&gt;
               &lt;/ul&gt;
             &lt;/div&gt;
           &lt;/nav&gt;

           &lt;main role=&quot;main&quot; class=&quot;container&quot;&gt;
             &lt;div class=&quot;row section top-section&quot;&gt;
               &lt;div class=&quot;col&quot;&gt;
                 {{ $data := Query &quot;SELECT timestamp(epoch=now()).UTC.String AS Time, OS, Fqdn FROM info()&quot; | Expand }}
                 {{ Get $hostinfo &quot;0.Fqdn&quot; }} Artifact Collection
               &lt;/div&gt;
               &lt;div class=&quot;col&quot;&gt;{{- Get $data &quot;0&quot; -}}&lt;/div&gt;
             &lt;/div&gt;

             {{ range .parts }}

             &lt;div class=&quot;&quot;&gt;
               &lt;a class=&quot;anchor&quot; name=&quot;{{- .Artifact.Name -}}&quot;&gt;&lt;/a&gt;
               &lt;!-- If the artifact has its own report, just include it as is --&gt;
               {{ if .HTML }}
                 {{ .HTML }}
               {{ else }}
                 &lt;!-- Default report in case the artifact does not have one --&gt;
                 &lt;h1&gt;{{ .Artifact.Name }}
                     &lt;div class=&quot;btn btn-primary-outline float-right&quot;&gt;{{ .Artifact.Author }}
                     &lt;/div&gt;
                 &lt;/h1&gt;

                 {{ $name := .Artifact.Name }}

                 {{ template &quot;hidden_paragraph_start&quot; dict &quot;description&quot; &quot;View Artifact Description&quot; }}
                   {{ Markdown .Artifact.Description }}

                   {{ if .Artifact.Reference }}
                     &lt;h3&gt;References&lt;/h3&gt;
                     &lt;ul&gt;
                       {{ range .Artifact.Reference }}
                       &lt;li&gt;&lt;a href=&quot;{{ . }}&quot;&gt;{{ . }}&lt;/a&gt;&lt;/li&gt;
                       {{ end }}
                     &lt;/ul&gt;
                   {{ end }}
                 {{ template &quot;hidden_paragraph_end&quot; }}

                 {{ range .Artifact.Sources }}
                    {{ $source := print &quot;source(\n  source=&#x27;&quot; .Name &quot;&#x27;, artifact=&#x27;&quot; $name &quot;&#x27;)&quot; }}
                    {{ $query := print &quot;SELECT * FROM &quot; $source &quot; \nLIMIT 100&quot; }}

                    &lt;!-- There could be a huge number of rows just to get the count, so we cap at 10000 --&gt;
                    {{ $count := Get ( Query (print &quot;LET X = SELECT * FROM &quot; $source \
                       &quot; LIMIT 10000 SELECT 1 AS ALL, count() AS Count FROM X Group BY ALL&quot;) | Expand ) \
                       &quot;0.Count&quot; }}

                    {{ if $count }}
                      {{ if .Name }}
                        &lt;h3&gt;Source {{ $name }}/{{ .Name }}&lt;/h3&gt;
                        {{ Markdown .Description }}
                      {{ end }}

                      &lt;!-- Show the artifact source if required. --&gt;
                      {{ template &quot;hidden_paragraph_start&quot; dict &quot;description&quot; &quot;Source&quot; }}
                      &lt;div class=&quot;row card card-body noprint&quot;&gt;
                        {{ if .Query }}
                          {{ Markdown ( print &quot;```vql\n&quot; .Query  &quot;```\n&quot;) }}
                        {{ else }}
                          {{ range .Queries }}
                            {{ Markdown ( print &quot;```vql\n&quot; .  &quot;```\n&quot;) }}
                          {{ end }}
                        {{ end }}
                      &lt;/div&gt;
                      {{ template &quot;hidden_paragraph_end&quot; }}

                      &lt;!-- If this is a flow show the parameters. --&gt;
                      {{ $flow := Query &quot;LET X = SELECT Request.Parameters.env AS Env FROM flows(client_id=ClientId, flow_id=FlowId)&quot; \
                      &quot;SELECT * FROM foreach(row=X[0].Env, query={ SELECT Key, Value FROM scope()})&quot; | Expand }}
                      {{ if $flow }}
                        {{ template &quot;hidden_paragraph_start&quot; dict &quot;description&quot; &quot;Parameters&quot; }}
                        &lt;div class=&quot;row card card-body noprint&quot;&gt;
                          &lt;h3&gt; Parameters &lt;/h3&gt;

                          &lt;table class=&quot;table&quot;&gt;&lt;thead&gt;&lt;th&gt;Key&lt;/th&gt;&lt;th&gt;Value&lt;/th&gt;&lt;/thead&gt;
                            &lt;tbody&gt;
                              {{ range $flow }}
                                &lt;tr&gt;&lt;td&gt;{{ Get . &quot;Key&quot; }}&lt;/td&gt;&lt;td&gt;{{ Get . &quot;Value&quot; }}&lt;/td&gt;&lt;/tr&gt;
                              {{ end }}
                            &lt;/tbody&gt;
                          &lt;/table&gt;
                        &lt;/div&gt;
                        {{ template &quot;hidden_paragraph_end&quot; }}
                      {{ end }}

                      {{ if gt $count 9999 }}
                        &lt;p&gt;The source produced more than {{ $count }} rows.&lt;/p&gt;
                      {{ else }}
                        &lt;p&gt;The source retrieved a total of {{ $count }} rows.&lt;/p&gt;
                      {{ end }}

                      {{ template &quot;fold_start&quot; }}
                      &lt;div class=&quot;noprint&quot;&gt;
                        &lt;p&gt; Below you will find a table of the first 100 rows, obtained by the VQL query:
                        &lt;/p&gt;
                        {{ Markdown (print &quot;```vql\n&quot; $query &quot;\n```\n&quot; ) }}
                      &lt;/div&gt;
                      {{ Query $query | Table }}
                      {{ template &quot;fold_end&quot; }}

                    {{ else }}
                      &lt;p&gt;No rows returned&lt;/p&gt;
                    {{ end }}
                 {{ end }}
               {{ end }}
             &lt;/div&gt;

           {{ end }}
           &lt;/main&gt;
           &lt;script&gt;
             $(&quot;.collapsible&quot;).click(function() {
               $(this).next().toggle(&quot;slow&quot;);
               try {
                 $(&quot;table.table-striped&quot;).DataTable().columns.adjust();
               } catch(e) {

               };
             });

             $(&quot;#print-button&quot;).click(function() {
                $(&quot;.collapse&quot;).removeClass(&quot;collapse&quot;);
                $(&#x27;table.table-striped&#x27;).DataTable().destroy();
                $(&quot;.collapsible&quot;).hide();
                $(&quot;.noprint&quot;).hide();
                setTimeout(function() {
                   window.print();
                   location.reload();
                }, 1000);
             });

             $(document).ready( function () {
                try {
                   $(&#x27;table.table-striped&#x27;).DataTable({
                      &quot;scrollY&quot;: 400,
                      &quot;scrollX&quot;: true,
                      &quot;autoWidth&quot;: false,
                   });
                } catch(e) {};
             });
           &lt;/script&gt;
        &lt;/body&gt;
       &lt;/html&gt;

</code></pre>

