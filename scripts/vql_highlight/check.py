#!/usr/bin/env python3
"""Verify the vql_highlight generation.

Compares the set of vql fence SHA-256 hashes that Hugo actually rendered
(extracted from the temporary VQLDBG instrumentation in
layouts/_markup/render-codeblock.html) against the files present in the
generated/vql directory.

Usage: temporarily add the following line at the top of the render-codeblock
hook and leave it in place while you build once, then run:

    {{- printf "VQLDBG|path=%s|ordinal=%d|lang=%s|sha=%s|" .Page.File.Path .Ordinal $lang (sha256 .Inner) -}}

    python3 scripts/vql_highlight/check.py <public-dir> generated/vql

Hugo renders the same content multiple times when it is pulled into other
pages through shortcodes such as {{% include-page %}}; the include-page
duplicates have different (path, ordinal) but the same content hash, so the
comparison is done on content hashes.
"""
import os
import re
import subprocess
import sys
from collections import defaultdict

VQLDBG_RE = re.compile(
    r"VQLDBG\|path=(?P<path>[^|]*)\|ordinal=(?P<ord>\d+)\|"
    r"lang=(?P<lang>[^|]*)\|sha=(?P<sha>[0-9a-f]{64})"
)


def hugo_vql_fences(public_dir: str) -> dict[str, int]:
    """path -> number of vql fences rendered for that page (any ordinal)."""
    out = subprocess.run(
        ["grep", "-rho", "VQLDBG|[^<]*", public_dir],
        capture_output=True, text=True,
    ).stdout
    counts: dict[str, int] = defaultdict(int)
    for m in VQLDBG_RE.finditer(out):
        if m["lang"].lower() != "vql":
            continue
        counts[m["path"]] += 1
    return dict(counts)


def data_shas(out_dir: str) -> set[str]:
    return {
        name.removesuffix(".html")
        for name in os.listdir(out_dir)
        if name.endswith(".html")
    }


def main() -> None:
    public_dir, out_dir = sys.argv[1], sys.argv[2]
    rendered = hugo_vql_fences(public_dir)
    shas = data_shas(out_dir)

    total = sum(rendered.values())
    missing_by_path: dict[str, list[str]] = defaultdict(list)
    out = subprocess.run(
        ["grep", "-rho", "VQLDBG|[^<]*", public_dir],
        capture_output=True, text=True,
    ).stdout
    for m in VQLDBG_RE.finditer(out):
        if m["lang"].lower() == "vql" and m["sha"] not in shas:
            missing_by_path[m["path"]].append(m["sha"])

    print(f"vql fences rendered by Hugo: {total} across {len(rendered)} pages")
    print(f"generated/vql files present:      {len(shas)}")
    if missing_by_path:
        print(f"FAIL: {sum(len(v) for v in missing_by_path.values())} rendered "
              f"vql fences have no generated/vql file:")
        for path, shas in sorted(missing_by_path.items()):
            print(f"  {path}: {len(shas)} missing")
        sys.exit(1)
    print("OK: every rendered vql fence has a matching generated/vql/<sha>.html")


if __name__ == "__main__":
    main()