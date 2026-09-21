import urllib.request
import json
import yaml
import re
import os
import argparse
import subprocess

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
description: %s
type: docs-no-toc
hidden: true
sitemap:
  disable: true
tags: [%s]
build:
  list: never
---

%s

---

%s

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

# Map repo-relative path -> first-commit date (YYYY-MM-DD) for every
# artifact definition file in the Velociraptor git repo.
# Runs a fast batch scan first, then falls back to per-file --follow for
# files whose paths were renamed since their original add commit.
def file_creation_dates(artifact_root_directory, yaml_paths):
  repo_path = os.path.normpath(os.path.join(artifact_root_directory, "..", ".."))
  dates = {}
  try:
    out = subprocess.check_output(
      ["git", "-C", repo_path, "log",
       "--diff-filter=A", "--name-only", "--date=short",
       "--format=date:%ad", "--", "artifacts/definitions/"],
      stderr=subprocess.DEVNULL, text=True)
    current = None
    for line in out.splitlines():
      if line.startswith("date:"):
        current = line.split(":", 1)[1]
      elif line and current:
        dates[line.strip()] = current
  except (subprocess.CalledProcessError, FileNotFoundError):
    pass

  missing = [p for p in yaml_paths if p not in dates]
  for p in missing:
    try:
      out = subprocess.check_output(
        ["git", "-C", repo_path, "log", "--follow", "--diff-filter=A",
         "--date=short", "--format=%ad", "--", p],
        stderr=subprocess.DEVNULL, text=True).splitlines()
    except (subprocess.CalledProcessError, FileNotFoundError):
      out = []
    if out:
      dates[p] = out[-1].strip()
  return dates

def cleanDescription(description):
  description = description.replace("\r\n", "\n")
  top_paragraph = description.split("\n\n")[0]
  return top_paragraph

# Build a fenced code block for YAML content. Uses a fence with more
# backticks than any run found in the content, so lines that consist
# solely of backticks cannot close the fence early.
def yaml_fence(content):
  max_run = max((len(m) for m in re.findall(r"`+", content)), default=0)
  fence = "`" * max(max_run + 1, 4)
  return "%syaml\n%s%s\n" % (fence, content, fence)

# Hugo's shortcode extractor runs before markdown parsing, so
# "{{%" / "{{<" sequences inside fenced code would be expanded as
# shortcodes. Escape them so they render as literal text (Hugo's
# own shortcode-escape syntax round-trips to the original text).
def escape_shortcodes(s):
  s = re.sub(r"\{\{%\s+(.*?)\s*%\}\}", r"{{%/* \1 */%}}", s)
  s = re.sub(r"\{\{<\s+(.*?)\s*>\}\}", r"{{</* \1 */>}}", s)
  return s

def write_page(data, content, index, creation_date=None):
  base_name = data["name"]
  filename_name = os.path.join(artifact_page_directory, base_name.lower())

  description = data.get("description", "")

  record = {
    "title": data["name"],
    "description": cleanDescription(description),
    "link": os.path.join("/artifact_references/pages/",
                         base_name.lower()).replace("\\", "/"),
    "type": data.get("type", "client").lower(),
    "date": creation_date or "",
  }
  record["tags"] = [getTag(record["type"])]

  index.append(record)

  md_filename = filename_name + ".md"
  with open(md_filename, "w") as fd:
     desc = cleanDescription(data.get("description", ""))
     fd.write(template % (
       data["name"],
       json.dumps(desc or data["name"]),
       getTag(record["type"]),
       data.get("description", ""),
       yaml_fence(escape_shortcodes(content))))

def build_markdown(artifact_root_directory):
  index = []

  all_yamls = []
  for root, dirs, files in os.walk(artifact_root_directory):
    for name in files:
      if name.endswith(".yaml"):
        all_yamls.append(os.path.join(root, name))
  all_yamls.sort()

  repo_root = os.path.normpath(os.path.join(artifact_root_directory, "..", ".."))
  yaml_paths = [os.path.relpath(f, repo_root) for f in all_yamls]
  creation_dates = file_creation_dates(artifact_root_directory, yaml_paths)

  for yaml_filename in all_yamls:
    creation_date = creation_dates.get(os.path.relpath(yaml_filename, repo_root))
    with open(yaml_filename) as stream:
      content = stream.read()
      data = yaml.safe_load(content)

      write_page(data, content, index, creation_date)

      # Make copies for all the aliases so they can be easily found
      for alias in data.get("aliases", []):
        data["name"] = alias
        write_page(data, content, index, creation_date)

  index = sorted(index, key=lambda x: x["title"])

  with open(output_data_path, "w") as fd:
    fd.write(json.dumps(index, indent=4))
    print("Writing data.json in %s" % output_data_path)

if __name__ == "__main__":
  args = parser.parse_args()
  definition_path = os.path.join(args.definition_path, "artifacts/definitions")

  build_markdown(definition_path)
