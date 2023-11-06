---
title: sigma
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## sigma
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
rules|A list of sigma rules to compile.|list of string (required)
log_sources|A log source object as obtained from the sigma_log_sources() VQL function.|Any (required)
field_mapping|A dict containing a mapping between a rule field name and a VQL Lambda to get the value of the field from the event.|ordereddict.Dict
debug|If enabled we emit all match objects with description of what would match.|bool
rule_filter|If specified we use this callback to filter the rules for inclusion.|Lambda
default_details|If specified we use this callback to determine a details column if the sigma rule does not specify it.|Lambda

### Description

Evaluate sigma rules.

