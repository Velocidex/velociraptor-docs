---
title: yara_lint
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## yara_lint
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
rules|A string containing Yara Rules.|string (required)
clean|Remove metadata to make rules smaller.|bool

### Description

Clean a set of yara rules. This removed invalid or unsupported rules.

Velociraptor's yara implementation does not support all the
modules available in Yara - specifically we do not support modules
that require OpenSSL. Sometimes rules that include conditions that
call these unsupported modules are mixed in with many other
supported rules.

This function lints the rules in a yara rule set and removes rules
which are not supported. The function also automatically adds yara
imports if they are used by any of the rules.

Additionally, providing the clean parameter will also remove all
the metadata from rules to save space and execution memory for
large rule sets.


