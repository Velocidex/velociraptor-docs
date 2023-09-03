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
       {{ define "fold_start" }}
       &lt;div role="button" class="btn btn-primary btn-block row collapsible"&gt;View Details&lt;/div&gt;
       &lt;div class="collapse row"&gt;&lt;div class="card card-body overflow-auto"&gt;
       {{end}}
       {{ define "fold_end" }}
       &lt;/div&gt;&lt;/div&gt;
       {{ end }}

       {{ define "hidden_paragraph_start" }}
       {{- if .description -}}
       &lt;div&gt;&lt;a href="#" class="collapsible"&gt;{{ .description }} ...&lt;/a&gt;
       {{- else -}}
       &lt;div&gt;&lt;a href="#" class="collapsible"&gt;More ...&lt;/a&gt;
       {{- end -}}
       &lt;div class="collapse"&gt;
       {{end}}

       {{ define "hidden_paragraph_end" }}
       &lt;/div&gt;&lt;/div&gt;
       {{ end }}


  - type: HTML
    template: |
      {{ import "Reporting.Default" "Templates" }}

      &lt;!doctype html&gt;
       &lt;html lang="en-US"&gt;
         &lt;head&gt;
         {{ $hostinfo := Query "SELECT timestamp(epoch=now()).UTC.String AS Time, \
             OS, Fqdn FROM info()" | Expand }}

           &lt;meta charset="utf-8"&gt;
           &lt;meta http-equiv="X-UA-Compatible" content="IE=edge"&gt;
           &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;

           &lt;!-- Name of the scan --&gt;
           &lt;title&gt;{{ Get $hostinfo "0.Fqdn" }} Artifact Collection&lt;/title&gt;
           &lt;style&gt;
             @charset "UTF-8";
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
               font-family: Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif;
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
           &lt;meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"&gt;

           &lt;!-- Bootstrap core CSS --&gt;
           &lt;link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"&gt;
           &lt;link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css" &gt;

           &lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"&gt;&lt;/script&gt;
           &lt;script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"&gt;&lt;/script&gt;
           &lt;script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"&gt;&lt;/script&gt;
         &lt;/head&gt;
         &lt;body&gt;
           &lt;nav class="header navbar navbar-expand-lg navbar-dark fixed-top"&gt;
             &lt;a class="navbar-brand" href="#" aria-label="CyberCX"&gt;
               &lt;img src="https://www.velocidex.com/images/logos/velo_word_on_side.svg" class="logo"/&gt;
             &lt;/a&gt;
             &lt;button class="navbar-toggler" type="button"
                     data-toggle="collapse"
                     data-target="#navbarSupportedContent"
                     aria-controls="navbarSupportedContent"
                     aria-expanded="false" aria-label="Toggle navigation"&gt;
               &lt;span class="navbar-toggler-icon"&gt;&lt;/span&gt;
             &lt;/button&gt;
             &lt;div class="collapse navbar-collapse" id="navbarSupportedContent"&gt;
               &lt;ul class="navbar-nav mr-auto"&gt;
                 &lt;li class="nav-item active"&gt;
                   &lt;a class="nav-link" href="#"&gt;Top &lt;span class="sr-only"&gt;(top)&lt;/span&gt;&lt;/a&gt;
                 &lt;/li&gt;
                 &lt;li class="nav-item"&gt;
                   &lt;a class="nav-link" href="https://github.com/Velocidex/velociraptor"&gt;GitHub&lt;/a&gt;
                 &lt;/li&gt;
                 &lt;li class="nav-item"&gt;
                   &lt;a class="nav-link" href="#" id="print-button"&gt;Print&lt;/a&gt;
                 &lt;/li&gt;

                 &lt;li class="nav-item dropdown"&gt;
                   &lt;a class="nav-link dropdown-toggle" href="#"
                   id="navbarDropdown" role="button"
                   data-toggle="dropdown"
                   aria-haspopup="true" aria-expanded="false"&gt;
                     Artifacts Collected
                   &lt;/a&gt;
                   &lt;div class="dropdown-menu" aria-labelledby="navbarDropdown"&gt;
                     {{ range .parts }}
                     &lt;a class="dropdown-item" href="#{{- .Artifact.Name -}}"&gt;
                         {{ .Artifact.Name }}
                     &lt;/a&gt;
                     {{ end }}
                   &lt;/div&gt;
                 &lt;/li&gt;
               &lt;/ul&gt;
             &lt;/div&gt;
           &lt;/nav&gt;

           &lt;main role="main" class="container"&gt;
             &lt;div class="row section top-section"&gt;
               &lt;div class="col"&gt;
                 {{ $data := Query "SELECT timestamp(epoch=now()).UTC.String AS Time, OS, Fqdn FROM info()" | Expand }}
                 {{ Get $hostinfo "0.Fqdn" }} Artifact Collection
               &lt;/div&gt;
               &lt;div class="col"&gt;{{- Get $data "0" -}}&lt;/div&gt;
             &lt;/div&gt;

             {{ range .parts }}

             &lt;div class=""&gt;
               &lt;a class="anchor" name="{{- .Artifact.Name -}}"&gt;&lt;/a&gt;
               &lt;!-- If the artifact has its own report, just include it as is --&gt;
               {{ if .HTML }}
                 {{ .HTML }}
               {{ else }}
                 &lt;!-- Default report in case the artifact does not have one --&gt;
                 &lt;h1&gt;{{ .Artifact.Name }}
                     &lt;div class="btn btn-primary-outline float-right"&gt;{{ .Artifact.Author }}
                     &lt;/div&gt;
                 &lt;/h1&gt;

                 {{ $name := .Artifact.Name }}

                 {{ template "hidden_paragraph_start" dict "description" "View Artifact Description" }}
                   {{ Markdown .Artifact.Description }}

                   {{ if .Artifact.Reference }}
                     &lt;h3&gt;References&lt;/h3&gt;
                     &lt;ul&gt;
                       {{ range .Artifact.Reference }}
                       &lt;li&gt;&lt;a href="{{ . }}"&gt;{{ . }}&lt;/a&gt;&lt;/li&gt;
                       {{ end }}
                     &lt;/ul&gt;
                   {{ end }}
                 {{ template "hidden_paragraph_end" }}

                 {{ range .Artifact.Sources }}
                    {{ $source := print "source(\n  source='" .Name "', artifact='" $name "')" }}
                    {{ $query := print "SELECT * FROM " $source " \nLIMIT 100" }}

                    &lt;!-- There could be a huge number of rows just to get the count, so we cap at 10000 --&gt;
                    {{ $count := Get ( Query (print "LET X = SELECT * FROM " $source \
                       " LIMIT 10000 SELECT 1 AS ALL, count() AS Count FROM X Group BY ALL") | Expand ) \
                       "0.Count" }}

                    {{ if $count }}
                      {{ if .Name }}
                        &lt;h3&gt;Source {{ $name }}/{{ .Name }}&lt;/h3&gt;
                        {{ Markdown .Description }}
                      {{ end }}

                      &lt;!-- Show the artifact source if required. --&gt;
                      {{ template "hidden_paragraph_start" dict "description" "Source" }}
                      &lt;div class="row card card-body noprint"&gt;
                        {{ if .Query }}
                          {{ Markdown ( print "```vql\n" .Query  "```\n") }}
                        {{ else }}
                          {{ range .Queries }}
                            {{ Markdown ( print "```vql\n" .  "```\n") }}
                          {{ end }}
                        {{ end }}
                      &lt;/div&gt;
                      {{ template "hidden_paragraph_end" }}

                      &lt;!-- If this is a flow show the parameters. --&gt;
                      {{ $flow := Query "LET X = SELECT Request.Parameters.env AS Env FROM flows(client_id=ClientId, flow_id=FlowId)" \
                      "SELECT * FROM foreach(row=X[0].Env, query={ SELECT Key, Value FROM scope()})" | Expand }}
                      {{ if $flow }}
                        {{ template "hidden_paragraph_start" dict "description" "Parameters" }}
                        &lt;div class="row card card-body noprint"&gt;
                          &lt;h3&gt; Parameters &lt;/h3&gt;

                          &lt;table class="table"&gt;&lt;thead&gt;&lt;th&gt;Key&lt;/th&gt;&lt;th&gt;Value&lt;/th&gt;&lt;/thead&gt;
                            &lt;tbody&gt;
                              {{ range $flow }}
                                &lt;tr&gt;&lt;td&gt;{{ Get . "Key" }}&lt;/td&gt;&lt;td&gt;{{ Get . "Value" }}&lt;/td&gt;&lt;/tr&gt;
                              {{ end }}
                            &lt;/tbody&gt;
                          &lt;/table&gt;
                        &lt;/div&gt;
                        {{ template "hidden_paragraph_end" }}
                      {{ end }}

                      {{ if gt $count 9999 }}
                        &lt;p&gt;The source produced more than {{ $count }} rows.&lt;/p&gt;
                      {{ else }}
                        &lt;p&gt;The source retrieved a total of {{ $count }} rows.&lt;/p&gt;
                      {{ end }}

                      {{ template "fold_start" }}
                      &lt;div class="noprint"&gt;
                        &lt;p&gt; Below you will find a table of the first 100 rows, obtained by the VQL query:
                        &lt;/p&gt;
                        {{ Markdown (print "```vql\n" $query "\n```\n" ) }}
                      &lt;/div&gt;
                      {{ Query $query | Table }}
                      {{ template "fold_end" }}

                    {{ else }}
                      &lt;p&gt;No rows returned&lt;/p&gt;
                    {{ end }}
                 {{ end }}
               {{ end }}
             &lt;/div&gt;

           {{ end }}
           &lt;/main&gt;
           &lt;script&gt;
             $(".collapsible").click(function() {
               $(this).next().toggle("slow");
               try {
                 $("table.table-striped").DataTable().columns.adjust();
               } catch(e) {

               };
             });

             $("#print-button").click(function() {
                $(".collapse").removeClass("collapse");
                $('table.table-striped').DataTable().destroy();
                $(".collapsible").hide();
                $(".noprint").hide();
                setTimeout(function() {
                   window.print();
                   location.reload();
                }, 1000);
             });

             $(document).ready( function () {
                try {
                   $('table.table-striped').DataTable({
                      "scrollY": 400,
                      "scrollX": true,
                      "autoWidth": false,
                   });
                } catch(e) {};
             });
           &lt;/script&gt;
        &lt;/body&gt;
       &lt;/html&gt;

</code></pre>

