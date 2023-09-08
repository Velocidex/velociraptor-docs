import urllib.request
import json
import html
import yaml
import re
import os
import argparse

parser = argparse.ArgumentParser(description='Generate artifact documentation.')
parser.add_argument('definition_path',
                    help='Path to the Velociraptor git repo')

# Where we generate the search index.
commits_url = "https://api.github.com/repos/Velocidex/velociraptor-docs/commits"
output_data_path = "static/artifact_reference/data.json"
artifact_page_directory = "content/artifact_references/pages"

org = "Velocidex"
project = "velociraptor-docs"

# Each yaml file will be converted to a markdown if needed.
template = """---
title: %s
hidden: true
tags: [%s]
---

%s

<pre><code class="language-yaml">
%s
</code></pre>

"""

def getTag(t):
  if t == "client":
    return "Client Artifact"
  if t == "server":
    return "Server Artifact"
  if t == "client_event":
    return "Client Event Artifact"
  if t == "server_event":
    return "Server Event Artifact"
  if t == "internal":
    return "Internal Artifact"
  return t

previous_data = []
try:
  with open(output_data_path) as fd:
    previous_data = json.loads(fd.read())
except:
  pass

def cleanDescription(description):
  description = description.replace("\r\n", "\n")
  top_paragraph = description.split("\n\n")[0]
  return top_paragraph

def build_markdown(artifact_root_directory):
  index = []

  for root, dirs, files in os.walk(artifact_root_directory):
    files.sort()

    for name in files:
      if not name.endswith(".yaml"):
        continue

      yaml_filename = os.path.join(root, name)
      with open(yaml_filename) as stream:
        content = stream.read()
        data = yaml.safe_load(content)

        base_name = data["name"]
        filename_name = os.path.join(artifact_page_directory, base_name.lower())

        description = data.get("description", "")

        record = {
          "title": data["name"],
          "description": cleanDescription(description),
          "link": os.path.join("/artifact_references/pages/",
                               base_name.lower()).replace("\\", "/"),
          "type": data.get("type", "client").lower(),
        }
        record["tags"] = [getTag(record["type"])]

        index.append(record)

        md_filename = filename_name + ".md"
        with open(md_filename, "w") as fd:
           fd.write(template % (
             data["name"],
             getTag(record["type"]),
             data.get("description", ""),
             # Escape the content into a html block to avoid bugs in
             # markdown parsing.
             html.escape(content, quote=False)))

  index = sorted(index, key=lambda x: x["title"])

  with open(output_data_path, "w") as fd:
    fd.write(json.dumps(index, indent=4))
    print("Writing data.json in %s" % output_data_path)

if __name__ == "__main__":
  args = parser.parse_args()
  definition_path = os.path.join(args.definition_path, "artifacts/definitions")

  build_markdown(definition_path)
