import json
import yaml
import os

# Where we generate the search index.
output_data_path = "static/reference/data.json"
input_yaml_file = "scripts/reference.yaml"

with open(input_yaml_file) as stream:
    content = stream.read()
    data = yaml.safe_load(content)

with open(output_data_path, "w") as fd:
  fd.write(json.dumps(data, indent=4))
  print("Writing data.json in %s" % output_data_path)
