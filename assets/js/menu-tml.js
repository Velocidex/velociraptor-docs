window.menu = [
    {{ if .IsHome }}
      {{- range .Site.Home.Sections.ByWeight}}
      {{- template "section-tree-nav-json" dict "sect" . -}}
      {{end}}
    {{ end }}
];

function findlink(children, link) {
  for(let i=0;i<children.length;i++) {
    let child = children[i];
    if(child.link == link) {
      child.active = true;
      return true;
    }

    if(child.children && findlink(child.children, link)) {
      child.expanded = true;
      return true;
    }
  }

  return false;
}

function unescapeHtml(safe) {
    return $('<div />').html(safe).text();
}

// Expand the node into the dom element.
function addToNode(dom, nodes) {
    nodes.forEach(function(x, i) {
        let cls = "dd-item";
        if(x.active) {
            cls += " active";
        }

        let new_dom = $("<li>").attr("class", cls);
        let children = x.children || [];

        if(children.length > 0) {
            let cls = "fa fa-angle-right fa-sm category-icon";
            if(x.expanded) {
                cls = "fa fa-angle-down fa-sm category-icon";
            }

            let title = $("<div>").append(
                $("<i>").attr( "class", cls));
            title.append($("<a>").attr(
                "href", x.link).append(unescapeHtml(x.title)));
            new_dom.append(title);

            let new_ul = $("<ul>");
            addToNode(new_ul, children);
            new_dom.append(new_ul);

        } else {
            let cls = "fa fa-chevron-right fa-sm category-icon";
            let title = $("<div>").append(
                $("<i>").attr("class", cls));
            title.append($("<a>").attr(
                "href", x.link).append(unescapeHtml(x.title)));
            new_dom.append(title);
        };

        dom.append(new_dom);
    });
}

{{- define "section-tree-nav-json" }}
 {{- with .sect}}
   {{- if and .IsSection (or (not (or .Params.no_menu .Params.hidden)) )}}
      {{- $numberOfPages := (add (len .Pages) (len .Sections)) -}}
{"link": "{{.RelPermalink}}", "title": "{{.Params.Pre | html }}{{or .Params.Menutitle .Title | html }}{{safeHTML .Params.Post | html}}", "children": [
       {{- if not .Params.no_children -}}
        {{- range .Pages }}
          {{- template "section-tree-nav-json" dict "sect" . -}}
        {{- end -}}
       {{- end -}}
      ]},
   {{- else -}}
    {{- if not (or .Params.Hidden .Params.no_menu) -}}
      {"link": "{{.RelPermalink}}", "title": "{{.Params.Pre | html}}{{.LinkTitle | html }}{{.Params.Post | html}}"},
    {{- end -}}
  {{- end -}}
 {{- end -}}
{{- end }}
