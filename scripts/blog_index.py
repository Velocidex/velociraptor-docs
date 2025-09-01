import json
import yaml
import re
import os
import time

# Where we generate the search index.
output_data_path = "static/blog/data.json"
blog_root_directory = "content/blog"

header_regex = re.compile("---(.+?)---", re.I | re.M | re.S)
date_regex = re.compile("^[0-9]{4}-[0-9]{2}-[0-9]{2}")

index = []

for root, dirs, files in os.walk(blog_root_directory):
  for name in files:
    if not name.endswith(".md"):
      continue

    yaml_filename = os.path.join(root, name)
    with open(yaml_filename) as stream:
      content = stream.read()

      m = header_regex.search(content)
      if not m:
        continue

      data = yaml.safe_load(m.group(1))
      if data.get("index_page") or data.get("noindex"):
        continue

      link = yaml_filename.lstrip("contents").replace("\\", "/")
      if link.endswith("_index.md"):
        link = link.rstrip("_index.md")

      if link.endswith(".md"):
        link = link.rstrip(".md") + "/"

      date = data.get("date", "")
      if not date:
        continue

      try:
        date = date.strftime("%Y-%m-%d")
      except AttributeError:
        m = date_regex.match(date)
        if m:
          date = m.group(0)

      index.append({
        "title": data["title"],
        "description": data.get("description", ""),
        "link": link,
        "tags": data.get("tags", []),
        "date": date,
      })

index = sorted(index, key=lambda x: x["date"],
               reverse=True)

with open(output_data_path, "w") as fd:
  fd.write(json.dumps(index, indent=1))
  print("Writing data.json in %s" % output_data_path)

if os.getenv('CI'):
   # Remove this file so the site may be pushed correctly.
   os.remove("static/blog/.gitignore")
