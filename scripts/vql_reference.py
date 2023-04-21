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

def CleanTypes(definitions):
    for item in definitions:
        for arg in item.get("args", []):
            arg["type"] = arg["type"].replace(
                "vfilter.", "").replace("accessors.OSPath", "OSPath")

def EnsureDirExists(dirname):
    try:
        os.mkdir(dirname)
    except: pass

def SaveDefinitions(filename, name, texts):
    with open(filename, "w") as fd:
        fd.write("---\ntitle: %s\nindex: true\nnoTitle: true\nno_edit: true\n---\n\n" % name)
        for text in texts:
            fd.write(text)

def BuildDefinition(filename, item):
    """Returns a pair of filename and text."""
    # Store the text in its own file.
    dirname = os.path.join(os.path.dirname(filename), item["name"])
    EnsureDirExists(dirname)

    filename =  os.path.join(dirname, "_index.md")
    result = "\n\n<div class=\"vql_item\"></div>\n\n"
    result += ("\n## %s\n<span class='vql_type pull-right page-header'>%s</span>\n\n" % (item["name"], item["type"]))

    if item.get("args"):
        result += ("\n\n<div class=\"vqlargs\"></div>\n\n")
        result += ("Arg | Description | Type\n----|-------------|-----\n")
        for arg in item["args"]:
            name = arg["name"]
            description = arg.get("description", "")
            type = arg["type"]
            if type == "":
                type = "string"
            if arg.get("repeated"):
                type = "list of "+type
            if arg.get("required"):
                type = type + " (required)"

            result+=("%s|%s|%s\n" % (name, description, type))

    permissions = item.get("metadata", {}).get("permissions")
    if permissions:
        result += "\nRequired Permissions: \n"
        for p in permissions.split(","):
            result += '<i class="linkcolour label pull-right label-success">%s</i>\n' % p

    result+=("\n")

    if item.get("description", ""):
        result+= ("### Description\n\n%s\n\n" % item.get("description", ""))

    return filename, result

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
    CleanTypes(definitions)

    if args.reference_data:
        SaveDataJson(definitions)

    config = yaml.safe_load(open(args.config).read())
    for filename, file_config in config.items():
        with open(filename, "w") as fd:
            fd.write("---\ntitle: %s\nweight: %s\nlinktitle: %s\nindex: true\nno_edit: true\nno_children: true\n---\n\n%s" % (
                file_config["title"], file_config["weight"],
                file_config.get("linktitle", file_config["title"]),
                file_config["description"]))

            children = []

            # Maps filenames and data
            files = dict()
            filenames = dict()

            for definition in definitions:
                category = definition.get("category", "")
                if category == file_config["category"]:
                    item_filename, text = BuildDefinition(filename, definition)
                    old = files.get(item_filename, [])
                    old.append(text)
                    files[item_filename] = old
                    filenames[item_filename] = definition["name"]
                    children.append(definition)

            for filename, texts in files.items():
                SaveDefinitions(filename, filenames.get(filename), texts)

            fd.write("|Plugin/Function|<span class='vql_type'>Type</span>|Description|\n|-|-|-|\n")
            for definition in sorted(children, key=lambda x: x.get("name")):
                first_description = re.split("\\.|$", definition.get("description", ""), maxsplit=1, flags=re.M)
                if first_description and len(first_description) > 0:
                    first_description = first_description[0]
                fd.write("|[%s](%s)|<span class='vql_type'>%s</span>|%s|\n" % (
                    definition.get("name"),
                    definition.get("name"),
                    definition.get("type", ""),
                    first_description))
