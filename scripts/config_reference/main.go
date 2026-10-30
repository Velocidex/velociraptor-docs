package main

import (
	"fmt"
	"html"
	"io"
	"log"
	"os"
	"regexp"
	"strings"

	yaml "gopkg.in/yaml.v3"

	"github.com/akamensky/argparse"
)

const (
	repository_link = "https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L%d"

	/* Small inline chevron for collapsible sections.  Explicit width/height
	   keep it at 1em regardless of the surrounding CSS context. */
	chevron_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>`

	/* Small inline link icon for the copy-anchor button on each item.
	   Clicking it copies the page URL with the item's #fragment. */
	anchor_icon_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`

	/* Copy-anchor button markup.  The href doubles as a plain anchor link
	   (so the fragment works without JS); the click handler copies the full
	   page URL + fragment to the clipboard. */
	anchor_link = `<a class="anchorlink" href="#%s" title="Copy link to this item" aria-label="Copy link to this item">%s</a>`

	header = `---
title: Configuration File Reference
menutitle: "Config Reference"
weight: 120
no_children: true
type: docs-no-toc
reference_filter: true
description: |
  This is an annotated server.config.yaml with complete explanations for all
  options currently available.
---`
)

var (
	comment_regex = regexp.MustCompile(`(?sm)^\s*#+`)
)

func strip_comments(in string) string {
	return comment_regex.ReplaceAllString(in, "")
}

func dlv_break() {}

func add_breadcrumb(breadcrumb []string, element string) []string {
	result := append([]string{}, breadcrumb...)
	result = append(result, element)
	return result
}

func make_id(breadcrumb []string) string {
	return strings.Join(breadcrumb, ".")
}

func make_display_breadcrumb(breadcrumb []string) string {
	return strings.Join(breadcrumb, " > ")
}

func escape(in string) string {
	return html.EscapeString(in)
}

func is_container(node *yaml.Node) bool {
	switch node.Kind {
	case yaml.SequenceNode, yaml.MappingNode:
		return true
	}
	return false
}

/* A container (mapping/sequence) renders as a collapsible <details>.
   All sections start collapsed so the reader can browse the overview
   and expand only what interests them. */
func details_open() string {
	return ""
}

func print_node(node *yaml.Node, breadcrumb []string) string {
	result := ""

	switch node.Kind {
	case yaml.ScalarNode:
		if strings.Contains(node.Value, "\n") {
			result += fmt.Sprintf(`
<div class="multiline-value">%s</div>
`, strings.TrimSpace(escape(node.Value)))
		} else {
			result += escape(node.Value)
		}

	default:
		dlv_break()

	case yaml.SequenceNode:
		result += "<ul>\n"
		for i, c := range node.Content {
			comment := strip_comments(c.HeadComment)
			depth := len(breadcrumb)

			if is_container(c) {
				/* Sequence item that is itself a mapping/sequence:
				   collapsible, labelled with its index. */
				label := fmt.Sprintf("[%d]", i)
				item_breadcrumb := append([]string{}, breadcrumb...)
				item_breadcrumb = append(item_breadcrumb, label)

				result += fmt.Sprintf(`
<div class="ref-block">
<li class="ref-item ref-container" data-key="%s" data-depth="%d">
 <details%s>
 <summary class="ref-summary">%s
   <div class="reference-key">
     %s
   </div>
<div class="item-comment">

%s

</div>
  </summary>
  <div class="item-breadcrumb">%s</div>
  <div class="reference-value-sequence">%s</div>
 </details>
</li>
</div>
`, make_id(item_breadcrumb),
					depth,
					details_open(),
					chevron_svg,
					label,
					comment,
					make_display_breadcrumb(item_breadcrumb),
					print_node(c, item_breadcrumb))
			} else {
				/* Scalar sequence item: plain value. */
				result += fmt.Sprintf(`
<div class="ref-block">
<li class="ref-item ref-leaf" data-key="%s" data-depth="%d">
   <span class="item-name">%s
     <div class="reference-value-sequence">%s</div>
   </span>
   <div class="item-breadcrumb">%s</div>
</li>
<div class="item-comment">

%s

</div>
</div>
`, make_id(breadcrumb),
					depth,
					`<i class="bullet-placeholder"></i>`,
					print_node(c, breadcrumb),
					make_display_breadcrumb(breadcrumb),
					comment)
			}
		}
		result += "</ul>\n"

	case yaml.MappingNode:
		result += "<ul>\n"
		for i := 0; i < len(node.Content)-1; i += 2 {
			key := node.Content[i]
			value := node.Content[i+1]

			next_breadcrumb := add_breadcrumb(breadcrumb, escape(key.Value))
			id := make_id(next_breadcrumb)
			depth := len(next_breadcrumb)
			comment := strip_comments(key.HeadComment)

			if is_container(value) {
				/* Container value: collapsible <details> section. */
				result += fmt.Sprintf(`
<div class="ref-block">
<li class="ref-item ref-container" id="%s" data-key="%s" data-depth="%d">
 <details%s>
<summary class="ref-summary">%s
    <div class="reference-key">
      <a target="_blank" href="%s">%s</a> %s
    </div>
<div class="item-comment">

%s

</div>
  </summary>
  <div class="item-breadcrumb">%s</div>
  <div class="reference-value-mapping">%s</div>
 </details>
</li>
</div>
`, id,
				id,
				depth,
				details_open(),
				chevron_svg,
				fmt.Sprintf(repository_link, value.Line),
				escape(key.Value),
				fmt.Sprintf(anchor_link, id, anchor_icon_svg),
				comment,
				make_display_breadcrumb(next_breadcrumb),
				print_node(value, next_breadcrumb))
			} else {
				/* Scalar value: plain leaf item. */
				result += fmt.Sprintf(`
<div class="ref-block">
<li class="ref-item ref-leaf" id="%s" data-key="%s" data-depth="%d">
 <span class="item-name">%s
   <div class="reference-key">
     <a target="_blank" href="%s">%s</a> %s
   </div>
  </span>
  <div class="item-breadcrumb">%s</div>
  <div class="reference-value-mapping">%s</div>
</li>
<div class="item-comment">

%s

</div>
</div>
`, id,
				id,
				depth,
				`<i class="bullet-placeholder"></i>`,
				fmt.Sprintf(repository_link, value.Line),
				escape(key.Value),
				fmt.Sprintf(anchor_link, id, anchor_icon_svg),
				make_display_breadcrumb(next_breadcrumb),
				print_node(value, next_breadcrumb),
				comment)
			}
		}
		result += "</ul>\n"
	}

	return result
}

func print_document(node *yaml.Node) string {
	result := fmt.Sprintf(`
<div class="document-comment">

%s

</div>
<div class="reference-document">
`,
		strip_comments(node.HeadComment))

	for _, c := range node.Content {
		result += print_node(c, nil)
	}
	result += `</div>`
	return result
}

func main() {
	var node yaml.Node

	parser := argparse.NewParser("print", "")
	fd := parser.FilePositional(os.O_RDWR, 0666,
		&argparse.Options{
			Required: true,
			Help:     "beep!",
		})

	err := parser.Parse(os.Args)
	if err != nil {
		fmt.Print(parser.Usage(err))
		return
	}
	defer fd.Close()

	data, err := io.ReadAll(fd)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	if err := yaml.Unmarshal(data, &node); err != nil {
		log.Fatalf("Unmarshalling failed %s", err)
	}

	fmt.Println(header)
	fmt.Println(print_document(&node))
}