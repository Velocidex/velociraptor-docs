---
title: Guidelines for prose (written content)
weight: 10
---

This document provides guidance for writing style in the Velociraptor
documentation. It specifies some informal standards and advice with the goal of
ensuring as much consistency as possible in our prose content.

The guidance in this document is intended to:
- allow newcomers to quickly familiarize themselves with the writing style rules
  that have been used in the existing content on the documentation website.
- centralize style-related decisions for written content.

This document is a work-in-progress.

* [Markdown content](#markdown-content)
* [Text wrapping](#text-wrapping)
* [HTML content](#html-content)
  * [Inline code](#inline-code)
  * [Block code](#block-code)
  * [Admonitions (notices)](#admonitions-notices)
  * [Unordered lists](#unordered-lists)
  * [Shell commands](#shell-commands)
  * [Internal links](#internal-links)
* [Page content structure](#page-content-structure)
* [Page metadata](#page-metadata)
  * [KB articles](#kb-articles)
  * [VQL reference documents](#vql-reference-documents)
  * [Examples](#examples)
  * [Markdown Links](#markdown-links)
  * [UI Elements](#ui-elements)


## Markdown content

Our docs website is compiled by Hugo which interprets markdown based on the
Commonmark standard. Therefore it's best to avoid using features from any other
flavors of markdown such as GFM, as they may not be rendered correctly or at
all by Hugo.

## Text wrapping

Hard wrap paragraph text at 70 characters. This makes it easier to
review GitHub pull requests, which display changes side-by-side.

Your code editor may provide an auto-wrap option or an extension that
makes this easy. For example, in VSCode you can use
[Rewrap](https://marketplace.visualstudio.com/items?itemName=stkb.rewrap).

Exceptions to hard-wrapping are:
- [long links](#internal-links) (internal or external) where it is
  preferable to have the link on it's own line and NOT wrap it.
- markdown tables.

## HTML content

Only use inline HTML when markdown cannot provide the same result, and
even so try to avoid inline HTML except when it's absolutely
necessary. Having as much content as possible in markdown form
simplifies website style changes, as well as automated style checking
and content updates.

When writing content in HTML the same style rules apply as described
in the Markdown Content section.

### Inline code

We try not to overuse `inline code` or else the prose starts to look like
patchwork.

Use `inline code` only for:

- file paths, file names
- CLI commands, keywords, flags.
- VQL keywords, variable names and snippets
- Artifact names, artifact parameter/key names and values, field names and
  values.

Do not use it for:

- brand names
- terms that the user will type (use quotes instead)
- defining new terms (use bold text instead)
- names of GUI controls, controls and menu options (use bold text instead)

For the last 2 cases above it is recommended to use bold text for emphasis the
first time a term is used. When doing so it is not necessary to use quotes
around the term.

### Block code

Preferably format VQL code blocks with the VQL formatter, for consistency.


### Admonitions (notices)

Try not to overuse them. Especially try not to have two or more of them
together. Try to only use them when the reader's attention need to be drawn to
something specific.

Often the content in an admonition can be rewritten as part of the normal text
body.

### Unordered lists

Use `-` not `*`. Just for consistency.

### Shell commands

privilege indicator - this will depend on future changes to styling. TBD

use generic file names. omit version numbers and arch.

use platform alternatives where applicable

When providing command examples we should use a consistent order for the
command components: `[binary]` `[command]` `[subcommand]` `[flags]` `[args]`

### Internal links

Use markdown links rather than Hugo `ref` or `relref` shortcodes.

Avoid splitting links across lines. Even though this is valid it makes
future link maintenance more complicated. If a link is long:
- start it on a new line, and
- don't hard wrap it.

Hugo will do internal link checking automatically. So always check
your Hugo output for issues before submitting a PR.

When internal links are invalid, Hugo will fail to compile and refuse
to start, but this only happens on dev server start, so do also
remember to check the console output.

## Page content structure

## Page metadata

Always try to add a `summary`. When using the `children` shortcode it defaults
to creating a summary if one is not defined, which means it grabs the first few
paragraphs from the page. Usually this "auto-summary" is unsightly so it's
better to carefully craft one rather than relying on "auto".


### KB articles

Tags are recommended. These help users find related content. Do not use
meaningless tags such as "velociraptor" or "DFIR".

### VQL reference documents

Top level section headings should be level-3.

- Description (heading is autogenerated)
  - Lead
  - Body
- Example (or Examples)
  - one or more examples.
- Notes
  - notes or cautions about common considerations or pitfalls
- See also
  - links to other functions that are likely to be related or of interest.

### Examples

Examples should _always_ use Level-6 headings, regardless of their position in
the heading hierarchy. This ensures a consistent style for all examples and
allows Hugo to create a hyperlink for each example, which is important for
community support on forums like Discord.

For example:

```md
###### Example
```

L6 headings also won't appear in TOCs, so this prevents that from accidentally
happening.

Don't use a colon after the word Example, but use one if it's a lead-in phrase
such as "For example...:"


### Markdown Links

Avoid line breaks in links.

### UI Elements

Bold all UI elements (buttons, tabs, menu names) to help users scan the page
quickly.
