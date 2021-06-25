import urllib.request
import json
import yaml
import re
import os

# Where we generate the search index.
commits_url = "https://api.github.com/repos/scudette/velociraptor-docs/commits"
output_data_path = "static/exchange/data.json"
artifact_root_directory = "content/exchange/artifacts"
artifact_page_directory = "content/exchange/artifacts/pages"
org = "scudette"
project = "velociraptor-docs"

# Each yaml file will be converted to a markdown if needed.
template = """---
title: %s
hidden: true
editURL: https://github.com/%s/%s/edit/master/%s
---

%s

```yaml
%s
```
"""

date_regex = re.compile("^[0-9]{4}-[0-9]{2}-[0-9]{2}")
hash_regex = re.compile("#([0-9_a-z]+)", re.I | re.M | re.S)

def cleanDescription(description):
  return hash_regex.sub("", description)

def cleanupDate(date):
  try:
    return date.strftime("%Y-%m-%d")
  except AttributeError:
    m = date_regex.match(date)
    if m:
      return m.group(0)
  return date

def getTags(description):
  result = []
  for m in hash_regex.finditer(description):
    result.append(m.group(1))

  return result

def getAuthor(record, yaml_filename):
  # Get commit details for this file.
  path = yaml_filename.replace("\\", "/")
  commits = json.loads(urllib.request.urlopen(commits_url + "?path=" + path).read())
  print("Checking commit for %s\n" % path)

  # Commit is not yet know.
  if not commits:
    record["author"] = ""
    record["author_link"] = ""
    record["author_avatar"] = ""
    record["date"] = ""
    return record

  first_commit = commits[0]
  record["author"] = first_commit["author"]["login"]
  record["author_link"] = first_commit["author"]["html_url"]
  record["author_avatar"] = first_commit["author"]["avatar_url"]
  record["date"] = cleanupDate(first_commit["commit"]["author"]["date"])

  return record

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

      description = data.get("description", "")
      index.append(getAuthor({
        "title": data["name"],
        "description": cleanDescription(description),
        "link": os.path.join("/exchange/artifacts/pages/", base_name).replace("\\", "/"),
        "tags": getTags(description),
      }, yaml_filename))

      md_filename = filename_name + ".md"
      with open(md_filename, "w") as fd:
         fd.write(template % (data["name"], org, project,
                              yaml_filename,
                              data["description"], content))

index = sorted(index, key=lambda x: x["date"],
               reverse=True)

with open(output_data_path, "w") as fd:
  fd.write(json.dumps(index, indent=4))
  print("Writing data.json in %s" % output_data_path)


if os.getenv('CI'):
   # Remove this file so the site may be pushed correctly.
   os.remove(artifact_root_directory + "/.gitignore")
