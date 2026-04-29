import yaml
import os
import argparse

parser = argparse.ArgumentParser(
    description='Generate comparison documentation.')

output_data_path = "static/comparisons/data.json"

header_template = '''
---
menutitle: {title}
---
'''

item_template = '''
## {title}

{description}

Link: {github}

'''

example_template = '''

### {title}

{description}

```text
{cmd}
```

'''

def write_page(data, md_filename, index):
  title = data["title"]
  tools = data.get("tools", [])

  index.append(data)

  with open(md_filename, "w") as fd:
     fd.write(header_template.format(title=title))

     for tool in tools:
         fd.write(item_template.format(**tool))
         examples = tool.get("examples", [])

         for example in examples:
             fd.write(example_template.format(**example))



def build_markdown(definition_path):
  index = []

  for root, dirs, files in os.walk(definition_path):
    files.sort()

    for name in files:
      if not name.endswith(".yaml"):
        continue

      yaml_filename = os.path.join(root, name)
      md_filename = os.path.join(root, "_index.md")
      print("Opening file %s" % yaml_filename)
      with open(yaml_filename) as stream:
        content = stream.read()
        data = yaml.safe_load(content)

        write_page(data, md_filename, index)

if __name__ == "__main__":
  args = parser.parse_args()
  definition_path = "content/training/comparisons/"

  build_markdown(definition_path)
