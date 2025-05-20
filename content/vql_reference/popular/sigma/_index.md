---
title: sigma
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## sigma
<span class='vql_type label label-warning pull-right page-header'>Plugin</span>



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

For a full description of this plugin see
* https://docs.velociraptor.app/blog/2023/2023-11-15-sigma_in_velociraptor/
* https://docs.velociraptor.app/blog/2024/2024-05-09-detection-engineering/
* https://docs.velociraptor.app/blog/2025/2025-02-02-sigma/

A Curated set of Sigma Models and rules is maintained at https://sigma.velocidex.com/

## Extensions to the Sigma rule format.

The following extensions are supported by Velociraptor's `sigma()`
plugin:

1. The `vql` field can specify a VQL lambda which will be used to
   construct or enrich the event with additional fields. This
   happens prior to event matching so it applies on all events
   (event ones that do not match). Therefore this section should
   be fairly light weight.

2. The `enrichment` field specifies a VQL lambda which will be
   used to build an enrichment object after a match is made. This
   is used to additional information for the analyst to assess.

3. The `vql` modifier can be used to specify a VQL lambda that
   will be used in a detection clause. The lambda will receive the
   field and should return a boolean value.


