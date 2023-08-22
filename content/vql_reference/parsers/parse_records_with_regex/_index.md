---
title: parse_records_with_regex
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## parse_records_with_regex
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
file|A list of files to parse.|list of OSPath (required)
regex|A list of regex to apply to the file data.|list of string (required)
accessor|The accessor to use.|string
buffer_size|Maximum size of line buffer (default 64kb).|int

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Parses a file with a set of regexp and yields matches as records.  The
file is read into a large buffer. Then each regular expression is
applied to the buffer, and all matches are emitted as rows.

The regular expressions are specified in the [Go
syntax](https://golang.org/pkg/regexp/syntax/). They are expected to
contain capture variables to name the matches extracted.

For example, consider a HTML file with simple links. The regular
expression might be:

```
regex='<a.+?href="(?P<Link>[^"]+?)"'
```

To produce rows with a column Link.

The aim of this plugin is to split the file into records which can be
further parsed. For example, if the file consists of multiple records,
this plugin can be used to extract each record, while
parse_string_with_regex() can be used to further split each record
into elements. This works better than trying to write a more complex
regex which tries to capture a lot of details in one pass.


### Example

Here is an example of parsing the /var/lib/dpkg/status files. These
files consist of records separated by empty lines:

```
Package: ubuntu-advantage-tools
Status: install ok installed
Priority: important
Section: misc
Installed-Size: 74
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: all
Version: 17
Conffiles:
 /etc/cron.daily/ubuntu-advantage-tools 36de53e7c2d968f951b11c64be101b91
 /etc/update-motd.d/80-esm 6ffbbf00021b4ea4255cff378c99c898
 /etc/update-motd.d/80-livepatch 1a3172ffaa815d12b58648f117ffb67e
Description: management tools for Ubuntu Advantage
 Ubuntu Advantage is the professional package of tooling, technology
 and expertise from Canonical, helping organizations around the world
 manage their Ubuntu deployments.
 .
 Subscribers to Ubuntu Advantage will find helpful tools for accessing
 services in this package.
Homepage: https://buy.ubuntu.com
```

The following query extracts the fields in two passes. The first pass
uses parse_records_with_regex() to extract records in blocks, while
using parse_string_with_regex() to further break the block into
fields.

```vql
SELECT parse_string_with_regex(
   string=Record,
   regex=['Package:\\s(?P<Package>.+)',
     'Installed-Size:\\s(?P<InstalledSize>.+)',
     'Version:\\s(?P<Version>.+)',
     'Source:\\s(?P<Source>.+)',
     'Architecture:\\s(?P<Architecture>.+)']) as Record
   FROM parse_records_with_regex(
     file=linuxDpkgStatus,
     regex='(?sm)^(?P<Record>Package:.+?)\\n\\n')
```


