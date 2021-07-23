#!/usr/bin/python3

import argparse
import os
import json
import re
import yaml

pararegex = re.compile(r"^(.+?)\n\n", re.I | re.M | re.S)
parser = argparse.ArgumentParser(description='Generate artifact documentation.')
parser.add_argument('--config', help='config file.', required=True)

parser.add_argument('definition_path',
                    help='A VQL reference definition file as produced by "velociraptor vql export".')

parser.add_argument('--reference_data', help='Path the the reference data.json to write".')

def SaveDefinition(fd, item):
    fd.write("\n\n<div class=\"vql_item\"></div>\n\n");
    fd.write ("\n## %s\n<span class='vql_type pull-right'>%s</span>\n\n" % (item["name"], item["type"]))
    fd.write ("%s\n\n" % item.get("description", ""))
    if not item.get("args"):
        return

    fd.write("\n\n<div class=\"vqlargs\"></div>\n\n");
    fd.write ("Arg | Description | Type\n----|-------------|-----\n")
    for arg in item["args"]:
        name = arg["name"]
        description = arg.get("description", "")
        type = arg["type"].replace("vfilter.", "")
        if type == "":
            type = "string"
        if arg.get("repeated"):
            type = "list of "+type
        if arg.get("required"):
            type = type + " (required)"

        fd.write("%s|%s|%s\n" % (name, description, type))
    fd.write("\n")

def SaveDataJson(definitions):
    summary = []
    for item in definitions:
        item = item.copy()

        # Extract first paragraph
        m = pararegex.search(item.get("description", ""))
        if m:
            item["description"] = m.group(1)

        summary.append(item)

    with open(args.reference_data, "w") as fd:
        fd.write(json.dumps(summary, indent=4))
        print("Writing data.json in %s" % args.reference_data)

if __name__ == "__main__" :
    args = parser.parse_args()

    definitions = yaml.safe_load(open(args.definition_path).read())
    if args.reference_data:
        SaveDataJson(definitions)

    config = yaml.safe_load(open(args.config).read())
    for filename, file_config in config.items():
        with open(filename, "w") as fd:
            fd.write("---\ntitle: %s\nweight: %s\nlinktitle: %s\nindex: true\n---\n\n%s" % (
                file_config["title"], file_config["weight"],
                file_config.get("linktitle", file_config["title"]),
                file_config["description"]))

            for definition in definitions:
                category = definition.get("category", "")
                if category == file_config["category"]:
                    SaveDefinition(fd, definition)
