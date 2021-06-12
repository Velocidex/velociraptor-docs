#!/usr/bin/python3

import argparse
import re

parser = argparse.ArgumentParser(description='Sort a plugin page.')
parser.add_argument('path', type=str,
                    help='Path to file.')


if __name__ == "__main__" :
    args = parser.parse_args()
    with open(args.path) as fd:
        data = fd.read()

    result = []
    items = {}
    for m in re.finditer(r"\n(## +([^\n]+)\n.+?)(?=\n## |$)", data, re.S):
        if not result:
            result.append( data[:m.start()])
        items[m.group(2)] = m

    for k, v in sorted(items.items()):
        result.append( v.group(1).strip())

    with open(args.path, "w") as fd:
        fd.write("\n\n".join(result))

    with open(args.path + ".idx", "w") as fd:
        fd.write("\n".join(sorted(items)))
