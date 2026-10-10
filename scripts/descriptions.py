#!/usr/bin/python3

# Add description to page matter if it is missing.

import argparse
import os
import yaml
import re
import textwrap

header_regex = re.compile("^---(.+?)---(.+)$", re.I | re.M | re.S)
paragraph_regex = re.compile("^\\s*(.+?)\\n\\r?\\n\\r?",  re.I | re.M | re.S)
template = """---%sdescription: |
%s
---%s"""

parser = argparse.ArgumentParser(description='Add page descriptions.')
parser.add_argument('contents', metavar='N', type=str, nargs='+',
                    help='directories containing markdown matter.')

def process(md_filename):
    with open(md_filename) as stream:
        content = stream.read()

    m = header_regex.match(content)
    if not m:
        return

    top_matter = m.group(1)
    page = m.group(2)

    data = yaml.safe_load(m.group(1))

    # If there is already a description then leave it.
    if data.get("description"):
        return

    # Try to figure out the description from the first
    # paragraph in the page.
    m = paragraph_regex.match(page)
    if not m:
        return

    desc = m.group(1).strip()

    # Add the description to the end of the top matter
    data = template % (top_matter, textwrap.indent(desc, "  "), page)

    print("Updating %s" % md_filename)
    with open(md_filename, "w") as fd:
        fd.write(data)

def scan(contents):
    for root, dirs, files in os.walk(contents):
        for name in files:
            if not name.endswith(".md"):
                continue
            md_filename = os.path.join(root, name)
            process(md_filename)

if __name__ == "__main__" :
    args = parser.parse_args()

    for content in args.contents:
        if os.path.isdir(content):
            scan(content)
        else:
            process(content)
