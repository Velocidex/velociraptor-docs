---
title: "Searching Files"
date: 2021-06-12T23:25:17Z
draft: false
weight: 20
---

One of the most common operations in DFIR is searching for files
efficiently. When searching for a file, we may search by filename,
file content, size or other properties.

Velociraptor has the `glob()` plugin to search for files using a glob
expression. Glob expressions use wildcards to search the filesystem
for matches, and these are the most common tool for searching by
filename. As we will see below, the `glob()` plugin is the foundation
for many other artifacts.

The `glob()` plugin searches the filesystem by glob expression. The
following represent the syntax of the glob expressions:

* A `*` is a wildcard match (e.g. `*.exe` matches all files ending with ".exe")
* Alternatives are expressed as comma separated strings in `{}`. For example, `*.{exe,dll,sys}`
* Velociraptor supports recursive wildcards: A `**` denotes recursive search, e.g. `C:\Users\**\*.exe`

For example, the following quickly searches all users' home
directories for files with ".exe" extension.

```sql
SELECT * FROM glob(globs='C:\\Users\\**\\*.exe')
```

{{% notice warning %}}

VQL strings can include a backslash escape sequence. Since Windows
paths often use backslashes for path separator you will need to escape
the backslashes. Alternatively paths can be written with a forward
slash `/` or a raw VQL string can be used - for example this is a bit
easier to write:

```sql
SELECT * FROM glob(globs='''C:\Users\**\*.exe''')
```

{{% /notice %}}

The `glob()` plugin is optimized to visit files on the filesystem as
quickly as possible. Therefore if multiple glob expressions are
provided, the `glob()` plugin will compbine them into a single
expression automatically to reduce filesystem access. It is always
better to provide multiple glob expressions than to run the `glob()`
plugin multiple times. For example the following will only make a
single pass over the filesystem while searching for both exe and dll
files.

```sql
SELECT * FROM glob(globs=['C:/Users/**/*.exe',
                          'C:/Users/**/*.dll'])
```

Velociraptor paths are separated by `/` or `\` into path
components. Internally, paths are considered as made up of a list of
components. Sometimes path component (e.g. a file or directory) can
also contain path separator characters in which case the component is
quoted in the path.

### Glob results

The `glob()` plugin returns rows with several columns. As usual, the
best way to see what a plugin returns is to click the `Raw Reponse JSON`
button on the results table.

![Glob output](image12.png)

Some of the more important columns available are

1. The `FullPath` is the complete path to the matching file, whereas
   the `Name` is just the filename.
2. The `Mtime`, `Atime`, `Ctime` and `Btime` are timestamps of the file.
3. The `Data` column is a free form dictionary containing key/value
   data about the file. This data depends on the accessor used.
4. `IsDir`, `IsLink` and `Mode` indicate what kind of file
   matched. (`Mode.String` can present the mode in a more human
   readable way).

## Filesystem accessors

Glob is a very useful concept to search hierarchical trees because
wild cards are easy to use and powerful. Sometimes we might want to
use a glob expression to look for other things that are not files, but
also have a hierarchical structure. For example, the registry is
organized in a similar way to a filesystem, so maybe we can use a glob
expression to search the registry?

Velociraptor supports direct access to many different such
hierarchical trees via `accessors` (Accessors are essentially
filesystem access drivers). Some common accessors are

* **file** - uses OS APIs to access files.
* **ntfs** - uses raw NTFS parsing to access low level files
* **reg** or **registry** - uses OS APIs to access the windows registry

When no accessor is specified, Velociraptor uses an automatic
accessor: It uses the **file** accessor to attempt to read file using
the OS APIs, but if the file is locked, Velociraptor automatically
falls back to the **ntfs** accessor in order to read the file from raw
disk clusters.

### The registry accessor

To accessor Uses the OS API to access the registry hives. The top
level directory is a list of the common hives (e.g. `HKEY_USERS`). The
accessor creates a registry abstraction to make it appear as a
filesystem:

* Top level consists of the major hives
* Values appear as files, Keys appear as directories
* The Default value in a key is named “@”
* Since reading the registry value is very quick anyway, the registry
  accessor makes the Value's content available inside the Data
  attribute.
* Can escape components with `/` using quotes
`HKEY_LOCAL_MACHINE\Microsoft\Windows\"http://www.microsoft.com/"`

## Raw registry parsing

In the previous section we looked for a key in the HKEY_CURRENT_USER
hive.  Any artifacts looking in HKEY_USERS using the Windows API are
limited to the set of users currently logged in! We need to parse the
raw hive to reliably recover all users.

Raw registry parsing
Each user’s setting is stored in:
      C:\Users\<name>\ntuser.dat

It is a raw registry hive file format. We need to use raw_reg accessor.

The raw reg accessor uses a URL scheme to access the underlying file.



14

15

16
URL notation for accessors
Some accessors need to delegate their access to other accessors
For example registry parser needs to open the file using another accessor. Therefore the path they receive is interpreted as a URL with three parts:
scheme - this is the name of the underlying accessor
path - this will be passed to the underlying accessor to get the file to parse.
fragment - this will be interpreted as a path within the parsed file.

17
URL notation for accessors
Escaping rules for urls are complex. We recommend using the url() VQL function to construct the url from its parts - especially when you dont control the filename itself.

url(scheme='file', path='C:/Users/test/ntuser.dat', fragment='/**/Run/*').String

file:///C:/Users/test/ntuser.dat#/**/Run/*

Exercise: Hash Run keys for users
Repeat the previous exercise but this time extract user’s Run keys from ntuser.dat.
Also calculate the hash of the target binary.
18

The ‘data’ accessor
VQL contains many plugins that work on files.
Sometimes we load data into memory as a string.
It is handy to be able to use all the normal file plugins with literal string data - this is what the data accessor is for.

The data accessor creates an in memory file-like object from the filename data.
19

20

21
Using data accessor as parameter
Sometimes we would like to give an artifact structured data to use.
Humans like to work with CSV files.
We can use parse_csv(accessor='data'.. ) to accept user input.

22
GlobSearch is a user provided CSV formatted string. It is easy for users to add another glob to the list.

Artifact with csv type parameters
If a parameter is specified with a type of CSV, Velociraptor will automatically apply the previous transformation - no need to do this by hand any more.
23

24
Setting a parameter of type csv presents a GUI for the user and automatically parses it from a string.

25
Hash all files provided in the globs
Create an artifact that hashes files found by user provided globs.

Searching data
26

27
Searching data
A powerful DFIR technique is searching bulk data for patterns
Searching for CC data in process memory
Searching for URLs in process memory
Searching binaries for malware signatures
Searching registry for patterns

Bulk searching helps to identify evidence without needing to parse file formats

YARA - The swiss army knife
YARA is a powerful keyword scanner
Uses rules designed to identify binary patterns in bulk data
YARA is optimized to scan for many rules simultaneously.
Velociraptor supports YARA scanning of bulk data (via accessors) and memory.

yara() and proc_yara()
28

YARA rules
rule X {
   strings:
       $a = “hello” nocase
       $b = “Goodbye” wide
       $c = /[a-z]{5,10}[0-9]/i

   condition:
       $a and ($b or $c)
}
29

Exercise: drive by download
You suspect a user was compromised by a drive by download (i.e. they clicked and downloaded malware delivered by mail, ads etc).
You think the user used the Edge browser but you have no idea of the internal structure of the browser cache/history etc.
Write an artifact to extract potential URLs from the Edge browser directory (also where is it?)
30

Step 1: Figure out where to look
31

32
Looks like somewhere in C:\Users\<name>\AppData\Local\Microsoft\Edge\**

Step 2: Recover URLs
We don't exactly understand how Edge stores data but we know roughly what a URL is supposed to look like!
Yara is our sledgehammer !

rule URL {
  strings: $a = /https?:\\/\\/[a-z0-9\\/+&#:\\?.-]+/i
  condition: any of them
}
33

Step 3: Let’s do this!
34

35

36

37
YARA best practice
You can get yara rules from many sources (threat intel, blog posts etc)
YARA is really a first level triage tool:
Depending on signature  many false positives expected
Some signatures are extremely specific so make a great signal
Try to collect additional context around the hits to eliminate false positives.
Yara scanning is relatively expensive! consider more targeted glob expressions and client side throttling since usually YARA scanning is not time critical.


Uploading files
38

Collecting files
Velociraptor can collect file data.
Over the network
Locally to a collection zip file.
Driven by VQL

The upload() VQL function copies a file using an accessor to the relevant container
39

Exercise
Collect all executables in users’ home directory


Write your own VQL by combining glob() and upload()
40

41
