---
title: mock_replay
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## mock_replay
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
plugin|The plugin to mock|string
function|The function to mock|string
expected_calls|How many times plugin should be called|int
clear|This call will clear previous mocks for this plugin|bool

### Description

Replay recorded calls on a mock.

