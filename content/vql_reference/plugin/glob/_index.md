---
title: glob
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## glob
<span class='vql_type pull-right page-header'>Plugin</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
globs|One or more glob patterns to apply to the filesystem.|list of string (required)
root|The root directory to glob from (default '').|OSPath
accessor|An accessor to use.|string
nosymlink|If set we do not follow symlinks.|bool
recursion_callback|A VQL function that determines if a directory should be recursed (e.g. "x=>NOT x.Name =~ 'proc'").|string
one_filesystem|If set we do not follow links to other filesystems.|bool

Required Permissions: 
<i class="linkcolour label pull-right label-success">FILESYSTEM_READ</i>

### Description

Retrieve files based on a list of glob expressions

The `glob()` plugin is one of the most used plugins. It applies a glob
expression in order to search for files by file name. The glob
expression allows for wildcards, alternatives and character
classes. Globs support both forward and backslashes as path
separators. They also support quoting to delimit components.

A glob expression consists of a sequence of components separated by
path separators. If a separator is included within a component it is
possible to quote the component to keep it together. For example, the
windows registry contains keys with forward slash in their
names. Therefore we may use these to prevent the glob from getting
confused:

```
HKEY_LOCAL_MACHINE\Microsoft\Windows\"Some Key With http://www.microsoft.com/"\Some Value
```

Glob expressions are case insensitive and may contain the following wild cards:

* The `*` matches one or more characters.
* The `?` matches a single character.
* Alternatives are denoted by braces and comma delimited: `{a,b}`
* Recursive search is denoted by a `**`. By default this searches 3 directories deep. If you need to increase it you can add a depth number (e.g. `**10`)

By default globs do not expand environment variables. If you need to
expand environment variables use the `expand()` function explicitly:

```sql
glob(globs=expand(string="%SystemRoot%\System32\Winevt\Logs\*"))
```

### Example

The following searches the raw NTFS disk for event logs.

```sql
SELECT FullPath FROM glob(
globs="C:\Windows\System32\Winevt\Logs\*.evtx",
accessor="ntfs")
```

### The root parameter

If the root parameter is specified, we start globbing from this
directory - i.e. the glob pattern is appended to the root
parameter.  The `root` parameter is useful if the directory name
itself may contain glob characters.

## Following symlinks

On Unix like operating systems symlinks are used
extensively. Symlinks complicate the job of the glob() plugin
because they break the assumption that filesystems are
trees. Instead a symlink may form a cycle or create very deep
directories within the filesystem.

By default glob() follows symlinks but also checks for cycles by
checking that a target of a symlink has not been seen before. You
can disable this behavior with `nosymlink=TRUE`

## Setting a recursion callback

Sometimes it is useful to prevent glob() from recursing into a
directory. For example, if we know a directory can not possibly
contain a hit we can avoid descending into it at all. This more
efficient than simply eliminating the matching rows in the WHERE
clause.

You can provide a recursion callback (in the form of a VQL lambda
function) to let glob() know if it should be recursing a
directory. The glob() plugin will call the lambda with current
directory entry and if the lambda returns a `true` value will
recurse into it.

For example consider the following query which searches for pem
files in all directories other than /proc, /sys or /snap

```vql
SELECT * FROM glob(globs='/**/*.pem',
    recursion_callback="x=>NOT x.Name =~ '^/(proc|sys|snap)'")
```


