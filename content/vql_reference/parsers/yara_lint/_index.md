---
title: yara_lint
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## yara_lint
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
rules|A string containing Yara Rules.|string (required)
clean|Remove metadata to make rules smaller.|bool

### Description

Clean a set of yara rules. This removes invalid or unsupported rules.

Velociraptor's yara implementation does not support all the
modules available in Yara - specifically we do not support modules
that require OpenSSL. Sometimes rules that include conditions that
call these unsupported modules are mixed in with many other
supported rules.

This function lints the rules in a yara rule set and removes rules
which are not supported. The function also automatically adds yara
imports if they are used by any of the rules.

Additionally, providing the `clean` parameter will also remove all
the metadata from rules to save space and execution memory for
large rule sets.

You can run this function on the server to produce a smaller rule set
(removing the metadata etc). Alternatively you can modify your yara
artifacts to prefilter the rules with it before loading into the
[yara]({{< ref "/vql_reference/parsers/yara/" >}})
plugin.

### Example

```vql
LET rules <= SELECT OSPath AS rule_file,
                    read_file(filename=OSPath) AS original_rule,
                    yara_lint(rules=read_file(filename=OSPath)) AS linted_rule,
                    yara_lint(rules=read_file(filename=OSPath), clean=TRUE) AS cleaned_rule
  FROM glob(globs="/home/me/code/intezer/yara-rules/*.yar")

-- Show the individually linted rules
SELECT * FROM rules

-- Combine the rules and write to a single yar file.
-- We run yara_lint a 2nd time to get the imports at the beginning of the
-- combined file, although you could combine the rules first and then lint them.
SELECT copy(
        accessor="data",
        filename=yara_lint(
          rules=join(
            array=rules.cleaned_rule,
            sep="\n\n")),
        dest="/tmp/cleaned_rules.yar") AS cleaned_output
FROM scope()
```


