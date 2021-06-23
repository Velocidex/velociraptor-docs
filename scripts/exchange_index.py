import json
import yaml
import os

output_data_path = "static/exchange/data.json"

template = """---
title: %s
---

%s

```yaml
%s
```
"""

index = []

for root, dirs, files in os.walk("content/exchange/artifacts"):
  for name in files:
    if not name.endswith(".yaml"):
      continue

    yaml_filename = os.path.join(root, name)
    with open(yaml_filename) as stream:
      content = stream.read()
      data = yaml.safe_load(content)

      base_name = os.path.splitext(yaml_filename)[0]
      index.append({
        "title": data["name"],
        "description": data["description"],
        "link": "/" + os.path.relpath(base_name, "content").replace("\\", "/"),
        "tags": [],
        "author": "",
        "author_link": "",
        "author_avatar": "",
      })

      md_filename = base_name + ".md"
      with open(md_filename, "w") as fd:
         fd.write(template % (data["name"], data["description"], content))
         print("Created file %s" % md_filename)

with open(output_data_path, "w") as fd:
  fd.write(json.dumps(index))

print(index)