---
title: Setting up a Hugo development server
weight: 20
last_reviewed: 2026-04-29
summary: |
  This guide will help you get your local development environment up and
  running with Hugo, which is the open-source static site generator that
  we use.
description: |
  This guide will help you get your local development environment up and
  running with Hugo, which is the open-source static site generator that
  we use.
---

This guide will help you get your local docs development environment
up and running with [Hugo](https://gohugo.io), which is the
open-source static site generator that we use to built this
documentation site.

All the docs are written in markdown and Hugo supports the Commonmark
markdown syntax. The exception to this is community-contributed
[Velociraptor artifacts](/dev/contributing-artifacts/)
which are written in YAML format.

---

The Hugo development server allows you to preview your changes to the
website locally. It features _LiveReload_, meaning any changes you
make to your local files will automatically refresh your browser in
real-time.

## 1. Prerequisites

Before starting, ensure you have a recent version of
[Hugo](https://gohugo.io/installation/)
installed on your machine.
* **Windows:** `choco install hugo-extended`
* **macOS:** `brew install hugo`
* **Linux:** `sudo apt install hugo`

## 2. Create a fork of the velociraptor-docs repo and clone it locally

```bash
# Use the gh CLI tool or else the GitHub website
gh repo fork Velocidex/velociraptor-docs

# then clone from YOUR fork
git clone https://github.com/<your_user>/velociraptor-docs
```

## 3. Launch the Dev Server

To start the Hugo dev server, run the following command in your local
repo's root:

```bash
hugo server
```

During development, you can customize the server behavior using
specific flags:
- `-D` or `--buildDrafts`: Includes posts marked as drafts in the
  preview.
- `--renderToMemory`: Serves the generated pages from memory (which is
  slightly faster) instead of from the `public` folder in the repo
  root.

Alternatively you can run hugo in a docker:

```bash
docker run --rm -it -v $(pwd):/src -p 1313:1313 hugomods/hugo server
```

{{% notice note "Build scripts" %}}

For certain kinds of content, you might need to run one or more of the
Python scripts listed in the Makefile] in the project root using the
`make` tool, although this is not necessary for normal page content
and artifact contributions.

Rebuilding the reference indices with these scripts should clear
`REF_NOT_FOUND` errors if such occur during Hugo server startup. These
scripts need a working Python installation and generally require
`pyyaml`.

{{% /notice %}}

###### What this does

1. Hugo builds the site and performs validation tasks such as checking
   internal links.
2. The terminal output will provide a local URL, by default:
   `http://localhost:1313/`
3. Open that URL in your browser to see your local copy of the site.


## 4. Make your changes to the docs content

And review those changes in the local dev server.

## 5. Lint your changes with Vale (optional)

To check your content against our writing standards you can
[use Vale](/dev/vale_linting/) which also includes a spellcheck.

This is optional though because any serious issues will get picked
up in our GitHub Actions CI pipeline, and you will be informed about
them there in the PR.

## 6. Stop the dev server

To shut down the development server when you're done, go back to your
terminal and press: **`Ctrl + C`**

It's a good idea to start `hugo server` one last time after you're
done in case you overlooked any issues in its output while it was
running. The Hugo dev server will fail to start if there are any
serious issues, so this is a good way to do a final check.

## 7. Submit your contribution!

When you're done, you can then commit your local changes, push them to
_your_ GitHub forked repo, and then open a pull request against the
upstream repo.

