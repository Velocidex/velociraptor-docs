import json
import yaml
import os

# Where we generate the search index.
output_data_path = "static/exchange/data.json"
artifact_root_directory = "content/exchange/artifacts"
artifact_page_directory = "content/exchange/artifacts/pages"

# Each yaml file will be converted to a markdown if needed.
template = """---
title: %s
hidden: true
---

%s

```yaml
%s
```
"""

index = []

for root, dirs, files in os.walk(artifact_root_directory):
  for name in files:
    if not name.endswith(".yaml"):
      continue

    yaml_filename = os.path.join(root, name)
    with open(yaml_filename) as stream:
      content = stream.read()
      data = yaml.safe_load(content)


      base_name = os.path.splitext(yaml_filename)[0]
      base_name = os.path.relpath(base_name, artifact_root_directory)
      filename_name = os.path.join(artifact_page_directory, base_name)

      index.append({
        "title": data["name"],
        "description": data["description"],
        "link": os.path.join("/exchange/artifacts/pages/", base_name).replace("\\", "/"),
        "tags": [],
        "author": "",
        "author_link": "",
        "author_avatar": "",
      })

      md_filename = filename_name + ".md"
      with open(md_filename, "w") as fd:
         fd.write(template % (data["name"], data["description"], content))

with open(output_data_path, "w") as fd:
  fd.write(json.dumps(index))
  print("Writing data.json in %s" % output_data_path)


if os.getenv('CI'):
   # Remove this file so the site may be pushed correctly.
   os.remove("static/exchange/.gitignore")
   os.remove(artifact_root_directory + "/.gitignore")
