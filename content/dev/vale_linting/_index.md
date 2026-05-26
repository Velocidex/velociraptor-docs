---
title: "Linting with Vale"
menutitle: "Linting"
date: 2026-05-01
draft: false
weight: 60
last_reviewed: 2026-05-26
---

### What is Vale?

https://vale.sh/docs

> Vale is a command-line tool that brings code-like linting to prose.
> Vale is cross-platform (Windows, macOS, and Linux), written in Go,
> and available on GitHub.

### Vale files and folders

1. `.vale.ini` is the configuration file, located in the project root.

   This file defines what to lint, what linting rules to apply, and
   the global alert threshold that should be reported.

2. The `.github/vale` **folder** contains the linting rules themselves
   (each defined in YAML - much like Velociraptor artifacts), plus
   support files such as dictionaries and "views" definitions that
   allow the rules to operate on non-standard files such as YAML.


The same `.github/vale`
(https://github.com/Velocidex/velociraptor-vale) is used across
projects, thus ensuring consistency, but the `.vale.ini` is specific
to each project since the linting targets vary.

The vale repo is referenced in each project as a git submodule. This
means that a normal clone of any repo will not automatically have
these files. To include these files when cloning you eaither need to
run:

`git clone --recurse-submodules <main-repo-url>`

or else run:

`git submodule update --remote --recursive`

after cloning, to pull in the submodule contents.

Once that's done, you will already have the files and folders
necessary to run all the Vale tests. All you need to do is ensure that
you have the Vale binary in your path on your computer so that you can
actually run it. Vale is a Go program that has no external
dependencies.

### Running Vale locally

1. Install the latest `vale` binary into your path. Test it by running
   `vale --ls-dirs` or `vale version`.

   _NOTE: despite what Vale's documentation says, you DO NOT need to
   run `vale sync` and you shouldn't do so. We don't use external
   styles and therefore don't need anything outside of our own repo.
   Everything you need, except for the Vale binary, is already in the
   repo._

2. `cd` to the project root - when you run Vale it will look for the
   `.vale.ini` file in the `CWD`, which in turn will tell Vale where
   to find the Vale "styles" directory (which is `.github/vale`).

3. **Run `vale .` is all you need to do to perform all the checks.**


### Output templates

Vale's default output is usually fine, but for particular types of
tasks you might want to try the custom output templates in
`vale/config/templates`.

Some templates generate more concise output (useful for feeding into
other CLI apps) and some are just more human-friendly.

Use them with the `--output` flag, for example:

```sh
vale . --output=collate.tmpl
```

Vale also has a native `JSON` output format that you might find
useful because it dumps all fields:

```sh
vale . --output="JSON"
```
