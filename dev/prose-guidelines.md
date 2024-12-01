# Guidelines for prose (written content)

This document provides guidance for writing style in the Velociraptor
documentation. It specifies some informal standards and advice with the goal of
ensuring as much consistency as possible in our prose content.

The guidance in this document is intended to:
- allow newcomers to quickly familiarize themselves with the writing style rules
  that have been used in the existing content on the documentation website.
- centralize style-related decisions for written content.

This document is WIP.

### HTML content

Only use inline HTML when markdown cannot provide the same result, and even so
try to avoid inline HTML except where absolutely unavoidable. Having as much
content as possible in markdown form simplifies website style changes, as well
as automated style checking and content updates.

When writing content in HTML the same style rules apply as described in the
Markdown Content section.

## Markdown content

Our docs website is compiled by Hugo which interprets markdown based on the
Commonmark standard. Therefore it's best to avoid using features from any other
flavours of markdown such as GFM, as they may not be rendered correctly or at
all by Hugo.

### Inline code

We basically don't want to overuse inline code or else the prose starts to look
like patchwork.

Use only for:

- file paths, file names
- CLI commands, keywords, flags.

Do not use for:

- error messages
- definining terms
- brand names

### Unordered lists

Use `-` not `*`.

### Shell commands

privilege indicator - will depend on future changes to styling. TBD

use generic file names. omit version numbers and arch.

use platform alternatives where applicable

When providing examples commands we should use a consistent order for the
command components: `[binary]` `[command]` `[subcommand]` `[flags]` `[args]`

## Page content structure

### KB articles


### VQL reference documents

- Description
- Examples
- Notes
- See also