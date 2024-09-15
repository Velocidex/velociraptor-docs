---
title: zip
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## zip
<span class='vql_type pull-right page-header'>Accessor</span>


### Description

Open a zip file as if it was a directory.

Filename is a pathspec with a delegate accessor opening the Zip file,
and the Path representing the file within the zip file.

## Example

```vql
SELECT OSPath, Mtime, Size from glob(
   globs='/**/*.txt',
   root=pathspec(DelegateAccessor='file',
     DelegatePath="File.zip",
     Path='/'),
   accessor='zip')
```


