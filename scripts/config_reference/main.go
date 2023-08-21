package main

import (
	"fmt"
	"html"
	"io/ioutil"
	"log"
	"os"
	"regexp"
	"strings"

	yaml "gopkg.in/yaml.v3"

	"github.com/akamensky/argparse"
)

const (
	repository_link = "https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L%d"
)

var (
	comment_regex = regexp.MustCompile(`(?sm)^\s*#*\s*`)
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
<div class="multiline-value">
%s
</div>
`, escape(node.Value))
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
				bullet = `<i class="fa fa-angle-right fa-sm category-icon"></i>`
			}

			result += fmt.Sprintf(`
<div class="item-comment">%s</div>
<li>
   %s
   <div class="reference-value-sequence">%s</div>
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
				bullet = `<i class="fa fa-angle-right fa-sm category-icon"></i>`
			}

			result += fmt.Sprintf(`
<div class="item-comment">%s</div>
<li id="%s">
   %s
   <div class="reference-key">
     <a target="_blank" href="%s">
       %s
     </a>
   </div>
   <a href="#%s" class="anchorlink">
      <i class="fa fa-copy fa-sm category-icon"></i>
   </a>
   <div class="reference-value-mapping">%s</div>
</li>
`, strip_comments(key.HeadComment),
				make_id(next_breadcrumb),
				bullet,
				fmt.Sprintf(repository_link, value.Line),
				escape(key.Value),
				make_id(next_breadcrumb),
				print_node(value, next_breadcrumb))
		}
		result += "</ul>\n"
	}

	return result
}

func print_document(node *yaml.Node) string {
	result := fmt.Sprintf(`
<div class="document-comment">%s</div>
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

	data, err := ioutil.ReadAll(fd)
	if err != nil {
		fmt.Printf("Error: %v\n", err)
		return
	}

	if err := yaml.Unmarshal(data, &node); err != nil {
		log.Fatalf("Unmarshalling failed %s", err)
	}

	fmt.Println(print_document(&node))
}
