---
title: Guidelines for prose (written content)
weight: 30
last_reviewed: 2026-04-29
summary:
  This document provides guidance for the writing style in the
  Velociraptor documentation. It specifies some informal standards
  and advice with the goal of ensuring as much consistency as possible
  in our prose content.
description:
  This document provides guidance for the writing style in the
  Velociraptor documentation. It specifies some informal standards
  and advice with the goal of ensuring as much consistency as possible
  in our prose content.
---

This document provides guidance for the writing style in the
Velociraptor documentation. It specifies some informal standards and
advice with the goal of ensuring as much consistency as possible in
our prose content irrespective of author.

The guidance in this document is intended to:
- allow newcomers to quickly familiarize themselves with the writing
  style rules that have been used in the existing content on the
  documentation website.
- centralize style-related decisions for written content.

The advice is intended to be helpful and should not be seen as
a hurdle to contributions. If your contribution doesn't subscribe to
all the guidelines that's perfectly OK - we can fix it up to be more
compliant during future reviews.

This document is also a work-in-progress, and not set-in-stone
"rules".

---

- [Markdown flavor](#markdown-flavor)
- [Text wrapping](#text-wrapping)
- [HTML content](#html-content)
  - [Inline code](#inline-code)
  - [Block code](#block-code)
            - [Example](#example)
  - [Admonitions (notices)](#admonitions-notices)
  - [Unordered lists](#unordered-lists)
  - [Shell commands](#shell-commands)
  - [Internal links](#internal-links)
- [Common page structures](#common-page-structures)
  - [Ordinary documentation pages](#ordinary-documentation-pages)
      - [Page metadata](#page-metadata)
  - [KB articles](#kb-articles)
  - [VQL reference documents](#vql-reference-documents)
  - [Examples](#examples)
  - [UI Elements](#ui-elements)

---

## Markdown flavor

Our docs website is compiled by Hugo which interprets markdown based
on the Commonmark standard. Therefore it's best to avoid using
features from any other flavors of markdown such as GFM, as they may
not be rendered correctly or at all by Hugo.

## Text wrapping

Hard wrap paragraph text at 70 or 80 characters. This makes it easier
to review GitHub pull requests, which display changes side-by-side in
two columns.

Your code editor may provide an auto-wrap option or an extension that
makes this easy. For example, in VSCode you can use
[Rewrap](https://marketplace.visualstudio.com/items?itemName=stkb.rewrap).

Exceptions to hard-wrapping are:
- [long links](#internal-links) (internal or external) where it is
  preferable to have the link on its own line and NOT wrap it.
- markdown tables.

## HTML content

Only use inline HTML when markdown cannot provide the same result, and
even so try to avoid inline HTML except when it's absolutely
necessary. Having as much content as possible in markdown form
simplifies website style changes, as well as automated style checking
and content updates.

When writing content in HTML the same style rules apply as described
in the Markdown flavor section.

### Inline code

Avoid overusing `inline code` or the prose starts to look like
patchwork.

Use `inline code` only for:

- file paths, file names
- CLI commands, keywords, flags
- terms that the user will type
- VQL keywords, variable names and snippets
- Artifact names, artifact parameter/key names and values, field names
  and values

Do not use it for:

- brand names
- defining new terms (use bold text instead)
- names of GUI controls, controls and menu options (use bold text
  instead)

For the last 2 cases above it is recommended to use bold text for
emphasis the first time a term is used. When doing so it is not
necessary to use quotes around the term.

### Block code

We currently support `browser`, `python`, `yaml`, `sql`, `json`,
`bash`, `powershell`, `vql`, `text`, `shell` syntax highlighting via
the `highlight.js` highlighter.

Prefer the `vql` syntax highlighting tag for VQL code blocks over `sql`,
although they are similar.

###### Example

``````text
```vql
SELECT read_file(path="C:/Windows/notepad.exe", accessor="file")
FROM scope()
```
``````

produces this syntax-highlighted code block

```vql
SELECT read_file(path="C:/Windows/notepad.exe", accessor="file")
FROM scope()
```


### Admonitions (notices)

Try not to overuse admonition blocks. In particular, try to avoid
having two or more of them adjacent, especially if they are the same
admonition type.

Try to use them sparingly when the reader's attention needs to be
drawn to something specific. Often the content in an admonition block
can be rewritten as part of the normal text content, and therefore
doesn't need to be wrapped in its own block.

Currently we support 4 admonition types: `note`, `tip`, `info`,
`warning`.

Admonition titles are optional but recommended.

### Unordered lists

Use `-` not `*`. Just for consistency.

### Shell commands

The privilege indicator (e.g. `#` or `$`) depends on future styling
decisions and is TBD.

Use generic file names and omit version numbers and architecture where
possible.

Use platform-appropriate command alternatives where applicable.

When providing command examples, use a consistent order for the command
components: `[binary]` `[command]` `[subcommand]` `[flags]` `[args]`.

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

The same no-line-break rule applies to external links too: avoid
splitting any link text or URL across lines.

## Common page structures

### Ordinary documentation pages

#### Page metadata

Always try to add a meaningful `summary` field to the page metadata.
When using the `children` shortcode, it defaults to creating a summary
if one is not defined, and it does this by grabbing the first few
paragraphs/sentences from the page which is often not ideal. Usually
this "auto-summary" is not very helpful so it's better to carefully
craft one rather than relying on "auto-summary" feature.


### KB articles

Tags are recommended on KB articles. These help users find related
content.

Do not use meaningless tags such as "velociraptor" or "DFIR".

Avoid using tags that are terms which already appear in the page
content, because those can just be found with regular index-based
searches. A tag should ideally be an association with some broader
concept that is not explicitly mentioned in the content itself.

### VQL reference documents (i.e. `vql.yaml`)

Top level section headings should be level-3/H3 (`###`). The reason
for this is that when presented on the website, H1 is already used for
the page title, and H2 is used for the name of each
function/plugin/accessor. So headings within the section for each
function/plugin/accessor need to be H3 or lower.

- Description (heading is autogenerated)
  - Lead
  - Body
- Example (or Examples)
  - one or more examples
- Notes
  - notes or cautions about common considerations or pitfalls
- See also
  - links to other functions that are likely to be related or of
    interest

### Examples

Examples should _always_ use Level-6 headings, regardless of their
position in the heading hierarchy. This ensures a consistent style for
all examples and allows Hugo to create a hyperlink for each example,
which is important for sharing on community support on forums like
Discord.

For example:

```md
###### Example
```

L6 headings also won't appear in TOCs, so this also prevents that from
accidentally happening.

Don't use a colon after the word Example _unless_ there's a subsequent
example title such as "Example: Recursive use case".


### UI Elements

Bold all UI elements (buttons, tabs, menu names) to help users scan
the page quickly.
