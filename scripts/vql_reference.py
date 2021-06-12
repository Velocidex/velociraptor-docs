#!/usr/bin/python3

import argparse
import os
import yaml

parser = argparse.ArgumentParser(description='Generate artifact documentation.')
parser.add_argument('--config', help='config file.')

parser.add_argument('definition_path',
                    help='A VQL reference definition file as produced by "velociraptor vql export".')


def SaveDefinition(fd, item):
    fd.write ("\n## %s\n<span class='vql_type pull-right'>%s</span>\n\n" % (item["name"], item["type"]))
    fd.write ("%s\n\n" % item["description"])
    if not item["args"]:
        return

    fd.write ("Arg | Description | Type\n----|-------------|-----\n")
    for arg in item["args"]:
        name = arg["name"]
        description = arg["description"]
        type = arg["type"].replace("vfilter.", "")
        if type == "":
            type = "string"
        if arg["repeated"] == True:
            type = "list of "+type
        if arg["required"] == True:
            type = type + " (required)"

        fd.write("%s|%s|%s\n" % (name, description, type))
    fd.write("\n")


if __name__ == "__main__" :
    args = parser.parse_args()

    definitions = yaml.safe_load(open(args.definition_path).read())

    config = yaml.safe_load(open(args.config).read())
    for filename, file_config in config.items():
        with open(filename, "w") as fd:
            fd.write("---\ntitle: %s\nweight: %s\nlinktitle: %s\nindex: true\n---\n\n%s" % (
                file_config["title"], file_config["weight"],
                file_config.get("linktitle", file_config["title"]),
                file_config["description"]))

            for definition in definitions:
                if definition["category"] == file_config["category"]:
                    SaveDefinition(fd, definition)
