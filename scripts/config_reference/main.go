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

	/* Inline SVG icons that replace the old Font Awesome <i> tags
	   (Font Awesome was purged in the Blowfish migration). */
	chevron_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor" class="category-icon inline h-4 w-4" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>`
	link_svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="category-icon inline h-4 w-4" aria-hidden="true"><path fill="currentColor" d="M172.5 131.1C228.1 75.51 320.5 75.51 376.1 131.1C426.1 181.1 433.5 260.8 392.4 318.3L391.3 319.9C381 334.2 361 337.6 346.7 327.3C332.3 317 328.9 297 339.2 282.7L340.3 281.1C363.2 249 359.6 205.1 331.7 177.2C300.3 145.8 249.2 145.8 217.7 177.2L105.5 289.5C73.99 320.1 73.99 372 105.5 403.5C133.3 431.4 177.3 435 209.3 412.1L210.9 410.1C225.3 400.7 245.3 404 255.5 418.4C265.8 432.8 262.5 452.8 248.1 463.1L246.5 464.2C188.1 505.3 110.2 498.7 60.21 448.8C3.741 392.3 3.741 300.7 60.21 244.3L172.5 131.1zM467.5 380C411 436.5 319.5 436.5 263 380C213 330 206.5 251.2 247.6 193.7L248.7 192.1C258.1 177.8 278.1 174.4 293.3 184.7C307.7 194.1 311.1 214.1 300.8 229.3L299.7 230.9C276.8 262.1 280.4 306.9 308.3 334.8C339.7 366.2 390.8 366.2 422.3 334.8L534.5 222.5C566 191 566 139.1 534.5 108.5C506.7 80.63 462.7 76.99 430.7 99.9L429.1 101C414.7 111.3 394.7 107.1 384.5 93.58C374.2 79.2 377.5 59.21 391.9 48.94L393.5 47.82C451 6.731 529.8 13.25 579.8 63.24C636.3 119.7 636.3 211.3 579.8 267.7L467.5 380z"/></svg>`

	header = `---
title: Configuration file Reference
weight: 120
no_children: true
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
		for _, c := range node.Content {
			bullet := `<i class="bullet-placeholder"></i>`
			if is_container(c) {
				bullet = chevron_svg
			}

			result += fmt.Sprintf(`
<div class="item-comment">

%s

</div>
<li>
   <span class="item-name">%s
     <div class="reference-value-sequence">%s</div>
   </span>
</li>
`, strip_comments(c.HeadComment), bullet,
				print_node(c, breadcrumb))
		}
		result += "</ul>\n"

	case yaml.MappingNode:
		result += "<ul>\n"
		for i := 0; i < len(node.Content)-1; i += 2 {
			key := node.Content[i]
			value := node.Content[i+1]

			next_breadcrumb := add_breadcrumb(breadcrumb, escape(key.Value))

			bullet := `<i class="bullet-placeholder"></i>`
			if is_container(value) {
				bullet = chevron_svg
			}

			result += fmt.Sprintf(`
<div class="item-comment">

%s

</div>
<li id="%s">
 <span class="item-name">%s
   <div class="reference-key">
     <a target="_blank" href="%s">
       %s
     </a>
   </div>
   <a href="#%s" class="anchorlink">
      %s
   </a>
  </span>
  <div class="reference-value-mapping">%s</div>
</li>
`, strip_comments(key.HeadComment),
				make_id(next_breadcrumb),
				bullet,
				fmt.Sprintf(repository_link, value.Line),
				escape(key.Value),
				make_id(next_breadcrumb),
				link_svg,
				print_node(value, next_breadcrumb))
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
