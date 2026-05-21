---
menutitle: RawCopy
description: |
  ## RawCopy
---

## RawCopy

This a console application that copy files off NTFS volumes by
using low level disk reading method.


Link: https://github.com/jschicht/RawCopy



### Copy a single file to a directory

Using the Velociraptor command line `fs cp` command, it is
possible to copy a file bypassing any OS level locks.


```text
velociraptor fs cp c:\Windows\system32\sru\SRUDB.dat c:\output --accessor auto
```



### Copy many files into a collection ZIP

The `Windows.Search.FileFinder` artifact can collect files
regardless of their lock status. The `auto` accessor will
automatically parse the file from the NTFS filesystem if the
usual OS APIs fail to open it.


```text
velociraptor -v -r Windows.Search.FileFinder --Glob 'C:\Windows\System32\sru\*' -o c:\output\test.zip --Upload_File Y
```

