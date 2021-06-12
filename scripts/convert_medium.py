#!/usr/bin/python3

import argparse
import os
import re
import requests
import yaml

parser = argparse.ArgumentParser(description='Convert a medium post.')
parser.add_argument('markdown_file', type=str,
                    help='Obtained by mediumexporter .')

gist_regex = re.compile('<iframe src="(https://medium.com/[^"]+)"[^<]+</iframe>', flags=re.S | re.M)
gist_script_tag = re.compile('<script src="https://gist.github.com/[^<]+</script>', flags=re.S | re.M)

def process_gist(match):
    url = match.group(1)

    myfile = requests.get(url)
    m = gist_script_tag.search(myfile.content.decode("utf8"))
    if m:
        print("Including gist from %s" % m.group(0))
        return m.group(0)

    return match.group(1)

def download(match):
    if "gist" in match.group(0):
        return match.group(0)

    caption = match.group(1) or ""
    url = match.group(2)

    filename = os.path.basename(url).replace("*","")
    print("Downloading %s into %s" % (url, filename))

    myfile = requests.get(url)
    open("img/"+filename, 'wb').write(myfile.content)

    result = "../img/" + filename

    return "![%s](%s)" % (caption,  result)

def process(markdown_file):
    data = open(markdown_file).read()
    data = gist_regex.sub(process_gist, data)
    data = re.sub(r'^!\[(.*?)\]\((https://[^\)]+)\)$', download, data, flags=re.S | re.M)

    with open(markdown_file, "w") as fd:
        fd.write(data)

if __name__ == "__main__" :
    args = parser.parse_args()
    process(args.markdown_file)
