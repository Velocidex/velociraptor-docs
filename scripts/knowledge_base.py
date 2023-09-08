import urllib.request
import json
import yaml
import re
import os

# Where we generate the search index.
commits_url = "https://api.github.com/repos/Velocidex/velociraptor-docs/commits"
output_data_path = "static/kb/data.json"

# The source of the tips - this is where contributed content lives.
kb_root_directory = "content/knowledge_base/tips/"

org = "Velocidex"
project = "velociraptor-docs"

# Each yaml file will be converted to a markdown if needed.
template = """---
title: %s
author: "%s"
author_link: "%s"
author_avatar: "%s"
date: "%s"
tags: %s
hidden: true
noTitle: true
editURL: https://github.com/%s/%s/edit/master/%s
---

%s
"""

previous_data = []
try:
  with open(output_data_path) as fd:
    previous_data = json.loads(fd.read())
except:
  pass

date_regex = re.compile("^[0-9]{4}-[0-9]{2}-[0-9]{2}")
hash_regex = re.compile("#([0-9_a-z]+)", re.I | re.M | re.S)
title_regex = re.compile("^#\\s*(.+?)$", re.I | re.M | re.S)
content_regex = re.compile("^Tags: .+?$", re.I | re.M | re.S)

def ensure_dir_exists(dirname):
    try:
        os.mkdir(dirname)
    except: pass

def cleanDescription(description):
  description = description.replace("\r\n", "\n")
  top_paragraph = description.split("\n\n")[0]
  return top_paragraph

def cleanContent(content):
  return content_regex.sub("", content)

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
  for line in content_regex.finditer(description):
    for m in hash_regex.finditer(line.group(0)):
      result.append(m.group(1))

  return result

def getAuthor(record, yaml_filename):
  # If the record already exists, just keep it the same
  title = record["title"]
  for item in previous_data:
    if item["title"] == title and item.get("author"):
      record["author"] = item["author"]
      record["author_avatar"] = item["author_avatar"]
      record["author_link"] = item["author_link"]
      record["date"] = item["date"]
      return record

  # Get commit details for this file.
  path = yaml_filename.replace("\\", "/")

  commits = None
  try:
    commits = json.loads(urllib.request.urlopen(commits_url + "?path=" + path).read())
  except urllib.error.HTTPError as e:
    print("HTTPError: %s" %e)

  print("Checking commit for %s\n" % path)

  # Commit is not yet know.
  if not commits:
    print("No commits yet\n")
    record["author"] = ""
    record["author_link"] = ""
    record["author_avatar"] = ""
    record["date"] = ""
    return record

  first_commit = commits[-1]
  record["author"] = first_commit["author"]["login"]
  record["author_link"] = first_commit["author"]["html_url"]
  record["author_avatar"] = first_commit["author"]["avatar_url"]
  record["date"] = cleanupDate(first_commit["commit"]["author"]["date"])

  print("Commit by %s\n" % record["author"])
  return record

def build_markdown():
  index = []

  for root, dirs, files in os.walk(kb_root_directory):
    files.sort()

    for name in files:
      if (not name.endswith(".md") or
          name == '_index.md'):
        continue

      md_filename = os.path.join(root, name)
      with open(md_filename) as stream:
        content = stream.read()

        # Find the title.
        m = title_regex.search(content)
        if not m:
          continue

        title = m.group(1)

        # We convert the original kb article into a compiled version
        # in the same directory so it is easier to access images etc.
        base_name = os.path.splitext(md_filename)[0]
        base_name = os.path.relpath(base_name, kb_root_directory)
        dirname = os.path.join(kb_root_directory, base_name)
        filename_name = os.path.join(dirname, "_index.md")

        ensure_dir_exists(dirname)

        record = {
          "title": title,
          "link": os.path.join("/knowledge_base/tips/",
                               base_name.lower()).replace("\\", "/"),
          "tags": getTags(content),
        }
        record_with_author = getAuthor(record, md_filename)
        index.append(record_with_author)

        with open(filename_name, "w") as fd:
           fd.write(template % (
             title,
             record_with_author["author"],
             record_with_author["author_link"],
             record_with_author["author_avatar"],
             record_with_author["date"],
             json.dumps(record_with_author["tags"]),
             org, project, md_filename, cleanContent(content)))

  index = sorted(index, key=lambda x: x["date"],
                 reverse=True)

  with open(output_data_path, "w") as fd:
    fd.write(json.dumps(index, indent=4))
    print("Writing data.json in %s" % output_data_path)

if __name__ == "__main__":
  build_markdown()


if os.getenv('CI'):
   # Remove this file so the site may be pushed correctly.
   os.remove(os.path.dirname(output_data_path) + "/.gitignore")
