---
title: Linux.Debian.AptSources
hidden: true
tags: [Client Artifact]
---

Parse Debian apt sources.

This Artifact searches for all apt sources files and parses all
fields in both one–line `*.list` files and `*.sources` files
(deb822-style format). The results are presented both in a readable
table and a flattened version for parsing.

`*.list` files contains lines of the form

```
deb http://us.archive.ubuntu.com/ubuntu/ bionic main restricted
deb-src [arch=amd64,i386 signed-by=/usr/share/keyrings/foo.gpg] https://foo.bar.baz/ubuntu/main jammy main restricted universe multiverse # Comment
```

deb indicates a source for binary packages, and deb-src instructs APT where
to find source code for packages.

`*.sources` files (deb822-style format) are in the form of key–value
lines, and as opposed to the one–line format, they can contain
multiple URIs, components and types (deb/deb-src), along with
embedded GPG keys. Example:

```
Types: deb deb-src
URIs: file:/home/apt/debian http://foo.bar.baz/main
Suites: unstable
Components: main contrib non-free
```

The exported function parse_aptsources(OSPath, flatten) parses
both formats and returns a (optionally flattened) table with
 - OSPath
 - Types (deb/deb-src)
 - Components (e.g. main/contrib/non-free/restricted,universe)
 - Suites (e.g. unstable/bookworm/jammy)
 - _URIBase (.e.g us.archive.ubuntu.com/ubuntu/)
 - _Transport (e.g. http/https/file/cdrom/ftp)
 - URIs (e.g. http://us.archive.ubuntu.com/ubuntu/)

Any option is added to an individual column. Typical options are
 - Architectures (e.g. amd64/i386/armel)
 - Signed-By (e.g. /usr/share/keyrings/osquery.gpg)

All known option names are transformed to the plural PascalCase
variants as listed in the sources.list man page. Any undocumented
options will still be included in the results, with names unchanged.
Options in the one-line format of the form "lang+=de"/"arch-=i386"
will be in columns like "Languages-Add"/"Architectures-Remove", matching
the option names having the same effect in deb822.

Entries in deb822 sources files may be disabled by including
"Enabled: no" instead of commenting out all lines. If this field
is not present with a falsly value, the entry is enabled. Use the
exported functions DebTrue()/DebFalse() to correctly parse all
accepted true/false strings, or use the VQL suggestion "Enabled"
to filter on this column (true), if present.

If the GPG key is embedded in a .sources file, the whole GPG key
will be included in the cell. Otherwise the value will be a file
path.

If flatten is False, multi–value fields (like Components) will
be combined in a single-space-separated string in each row.

In addition to the two apt sources tables, a third table correlates
information from InRelease and Release files to provide additional
metadata. The modification timestamps may tell when the package
lists where last updated.


<pre><code class="language-yaml">
name: Linux.Debian.AptSources
description: |
  Parse Debian apt sources.

  This Artifact searches for all apt sources files and parses all
  fields in both one–line `*.list` files and `*.sources` files
  (deb822-style format). The results are presented both in a readable
  table and a flattened version for parsing.

  `*.list` files contains lines of the form

  ```
  deb http://us.archive.ubuntu.com/ubuntu/ bionic main restricted
  deb-src [arch=amd64,i386 signed-by=/usr/share/keyrings/foo.gpg] https://foo.bar.baz/ubuntu/main jammy main restricted universe multiverse # Comment
  ```

  deb indicates a source for binary packages, and deb-src instructs APT where
  to find source code for packages.

  `*.sources` files (deb822-style format) are in the form of key–value
  lines, and as opposed to the one–line format, they can contain
  multiple URIs, components and types (deb/deb-src), along with
  embedded GPG keys. Example:

  ```
  Types: deb deb-src
  URIs: file:/home/apt/debian http://foo.bar.baz/main
  Suites: unstable
  Components: main contrib non-free
  ```

  The exported function parse_aptsources(OSPath, flatten) parses
  both formats and returns a (optionally flattened) table with
   - OSPath
   - Types (deb/deb-src)
   - Components (e.g. main/contrib/non-free/restricted,universe)
   - Suites (e.g. unstable/bookworm/jammy)
   - _URIBase (.e.g us.archive.ubuntu.com/ubuntu/)
   - _Transport (e.g. http/https/file/cdrom/ftp)
   - URIs (e.g. http://us.archive.ubuntu.com/ubuntu/)

  Any option is added to an individual column. Typical options are
   - Architectures (e.g. amd64/i386/armel)
   - Signed-By (e.g. /usr/share/keyrings/osquery.gpg)

  All known option names are transformed to the plural PascalCase
  variants as listed in the sources.list man page. Any undocumented
  options will still be included in the results, with names unchanged.
  Options in the one-line format of the form &quot;lang+=de&quot;/&quot;arch-=i386&quot;
  will be in columns like &quot;Languages-Add&quot;/&quot;Architectures-Remove&quot;, matching
  the option names having the same effect in deb822.

  Entries in deb822 sources files may be disabled by including
  &quot;Enabled: no&quot; instead of commenting out all lines. If this field
  is not present with a falsly value, the entry is enabled. Use the
  exported functions DebTrue()/DebFalse() to correctly parse all
  accepted true/false strings, or use the VQL suggestion &quot;Enabled&quot;
  to filter on this column (true), if present.

  If the GPG key is embedded in a .sources file, the whole GPG key
  will be included in the cell. Otherwise the value will be a file
  path.

  If flatten is False, multi–value fields (like Components) will
  be combined in a single-space-separated string in each row.

  In addition to the two apt sources tables, a third table correlates
  information from InRelease and Release files to provide additional
  metadata. The modification timestamps may tell when the package
  lists where last updated.

reference:
  - https://manpages.debian.org/bookworm/apt/sources.list.5.en.html
  - https://manpages.debian.org/bookworm/dpkg-dev/deb822.5.en.html
  - https://salsa.debian.org/apt-team/apt/-/blob/main/apt-pkg/sourcelist.cc
  - https://wiki.debian.org/DebianRepository/Format#A.22Release.22_files

export: |
        /* Remove whitespace from the beginning and end of a string: */
        LET Trim(string) = regex_transform(source=string, map=dict(
            `(?m)^\\s+`=&#x27;&#x27;,
            `(?m)\\s+$`=&#x27;&#x27;
        ))

        /* Replace any repeating whitespace with a single space: */
        LET Simplify(string) = regex_replace(source=string, re=&#x27;&#x27;&#x27;\s+&#x27;&#x27;&#x27;, replace=&#x27; &#x27;)

        /* The syntax in lists (deb822) and sources (one-line) files varies a bit,
           and deb822 is case-insensitive. Normalise all known fields (as per
           the man page): */
        LET NormaliseOpts(string) = regex_transform(source=string, map=dict(
            `(?i)types|type`=&#x27;Types&#x27;,
            `(?i)uris|uri`=&#x27;URIs&#x27;,
            `(?i)suites|suite`=&#x27;Suites&#x27;,
            `(?i)components|component`=&#x27;Components&#x27;,
            `(?i)architectures$|arch$`=&#x27;Architectures&#x27;,
            `(?i)architectures-add`=&#x27;Architectures-Add&#x27;,
            `(?i)architectures-remove`=&#x27;Architectures-Remove&#x27;,
            `(?i)languages$|lang$`=&#x27;Languages&#x27;,
            `(?i)languages-add`=&#x27;Languages-Add&#x27;,
            `(?i)languages-remove`=&#x27;Languages-Remove&#x27;,
            `(?i)targets$|target$`=&#x27;Targets&#x27;,
            `(?i)targets-add`=&#x27;Targets-Add&#x27;,
            `(?i)targets-remove`=&#x27;Targets-Remove&#x27;,
            `(?i)pdiffs`=&#x27;PDiffs&#x27;,
            `(?i)by-hash`=&#x27;By-Hash&#x27;,
            `(?i)allow-insecure`=&#x27;Allow-Insecure&#x27;,
            `(?i)allow-weak`=&#x27;Allow-Weak&#x27;,
            `(?i)allow-downgrade-to-insecure`=&#x27;Allow-Downgrade-To-Insecure&#x27;,
            `(?i)trusted`=&#x27;Trusted&#x27;,
            `(?i)signed-by`=&#x27;Signed-By&#x27;,
            `(?i)check-valid-until`=&#x27;Check-Valid-Until&#x27;,
            `(?i)valid-until-min`=&#x27;Valid-Until-Min&#x27;,
            `(?i)valid-until-max`=&#x27;Valid-Until-Max&#x27;,
            `(?i)check-date`=&#x27;Check-Date&#x27;,
            `(?i)date-max-future`=&#x27;Date-Max-Future&#x27;,
            `(?i)inrelease-path`=&#x27;InRelease-Path&#x27;,
            `(?i)enabled`=&#x27;Enabled&#x27;
        ))

        LET DebTrue(string) = if(
            condition=string=~&#x27;(?i)^(?:yes|true|with|on|enable)$&#x27;,
            then=true, else=false)
        LET DebFalse(string) = if(
            condition=string=~&#x27;(?i)^(?:no|false|without|off|disable)$&#x27;,
            then=true, else=false)

        /* Extract Key–Value pairs from option string. If assignment is -=/+=,
           the -/+ operator is captured in Op: */
        LET OptStringToKeyValues__(string) = SELECT *
            FROM parse_records_with_regex(
                regex=&#x27;&#x27;&#x27;(?P&lt;Key&gt;[^ ]+?)(?P&lt;Op&gt;-|\+)?=(?P&lt;Value&gt;[^ ]+)&#x27;&#x27;&#x27;,
                accessor=&#x27;data&#x27;, file=string
        )

        /* Since option values may have multiple words, split them and flatten
           the results for further processing: */
        LET OptStringToKeyValues_(string) = SELECT *
            FROM flatten(query={
                SELECT Key,
                    Op,
                    split(sep_string=&#x27;,&#x27;, string=Value) AS Value
                    FROM OptStringToKeyValues__(string=string)
            })

        /* Since options may be repeated, enumerate and group all values
           per key and operation: */
        LET OptStringToKeyValues(string) = SELECT Key,
            Op,
            enumerate(items=Value) AS Value
            FROM OptStringToKeyValues_(string=string)
            GROUP BY Key, Op

        /* When an option is specified with +/-, represent this by appending
           -Add/-Remove to the option name. These names match the syntax in
           the deb822 format (i.e. &quot;arch-=i386&quot; == &quot;Arhitectures-Remove: i386&quot;).
           The purpose of these assignments is to keep the default values
           (rather than overriding them), but add or remove one or several
           values: */
        LET OpName(op) = if(condition=op=&#x27;+&#x27;,then=&#x27;-Add&#x27;,else=
            if(condition=op=&#x27;-&#x27;,then=&#x27;-Remove&#x27;,else=&#x27;&#x27;))

        /* Convert a string of key–value pairs to a dict, and use consistent
           option names: */
        LET OptStringToDict(string, flatten) = to_dict(item={
            SELECT NormaliseOpts(string=Key)+OpName(op=Op) AS _key,
                if(condition=flatten, then=Value,
                    else=join(array=Value, sep=&#x27; &#x27;)) AS _value
            FROM OptStringToKeyValues(string=string)
        })

        /* Parse a one-line deb sources.list file with options as a single string: */
        LET DebOneLine_Opts(OSPath) = SELECT OSPath, Type AS Types,
            Simplify(string=Options) AS Options, URI AS URIs,
            Transport AS _Transport, URIBase AS _URIBase, Suite AS Suites,
            Simplify(string=Trim(string=Components)) AS Components
            FROM parse_records_with_regex(
                file=OSPath,
                /* This regex attemps to cover most of the ways a sources
                   line can be written without being overly complex. Quotes
                   (&quot;&quot; and []) are actually allowed to certain degree by the
                   apt source code, but this is considered obscure syntax and
                   is not expected to be found in the wild. The exception is
                   &quot;cdrom:[word word…]&quot;, which is capture correctly in order
                   to not end up with incorrectly captured words: */
                regex=&#x27;&#x27;&#x27;(?m)^\s*(?P&lt;Type&gt;deb(-src)?)(?:\s+\[(?P&lt;Options&gt;[^\]#]+)(?:#[^\]]+)?\])?\s+&quot;?(?P&lt;URI&gt;(?P&lt;Transport&gt;[^:]+):(?://)?(?P&lt;URIBase&gt;\[.+?\]|\S+?))&quot;?\s+(?P&lt;Suite&gt;\S+)\s+(?P&lt;Components&gt;[^\n#]+)&#x27;&#x27;&#x27;
            )

        /* Parse a one-line deb sources.list file and output a dict: */
        LET DebOneLine_Dict(OSPath, flatten) = SELECT OSPath, *
            FROM foreach(row=DebOneLine_Opts(OSPath=OSPath),
                query={SELECT _value +
                        OptStringToDict(string=Options, flatten=flatten) AS Contents
                    FROM items(item={SELECT Types, URIs, _Transport, _URIBase, Suites,
                        if(condition=flatten, then=split(sep_string=&#x27; &#x27;,
                            string=Components), else=Components) AS Components
                        FROM scope()
                    })
                })

        /* Parse a one-line deb sources.list file with options in individual columns: */
        LET DebOneLine(OSPath) = SELECT OSPath, * FROM foreach(
            row=DebOneLine_Dict(OSPath=OSPath, flatten=false),
            column=&#x27;Contents&#x27;
        )

        /* Parse a one-line deb sources.list file with options in individual
           columns and flatten: */
        LET DebOneLine_Flattened(OSPath) = SELECT OSPath, * FROM flatten(
            query={SELECT * FROM foreach(
                row=DebOneLine_Dict(OSPath=OSPath, flatten=true),
                column=&#x27;Contents&#x27;
                )
            })

        /* Extract the transport/protocol and base from a URI: */
        LET URIComponents(URI) = parse_string_with_regex(
            regex=&#x27;&#x27;&#x27;(?P&lt;Transport&gt;[^:]+):(?://)?(?P&lt;URIBase&gt;[^\s]+)&#x27;&#x27;&#x27;,
            string=URI
        )

        /* Although the documentation says to use whitespace and not comma
           for multi-values in deb822, comma still appears to be supported,
           and this use is seen in the wild. Treat these values correctly.
           Note that this does not affect all keys, like suites and
           components:
        */
        LET MaybeReplaceComma(key, value) = if(
            condition=key=~&#x27;(?i)^(?:arch|lang|targets)&#x27;,
            then=regex_replace(re=&#x27;\s*,\s*&#x27;, source=value, replace=&#x27; &#x27;),
            else=value)

        /* Parse a deb822 sources file section into a series of key–value pairs.
           Notes about the format:
             - Keys must be at the beginning of the line (no whitespace allowed)
             - Keys are case-insensitive
             - Keys may be repeated. Values are not overridden, but combined
             - Special keys that end in -Add/-Remove uses the default values,
               but add or remove individual values. These keys are treated as
               individual option names.
             - Comments may only appear at the beginning of the line
             - Multiple values are separated by whitespace, not comma. However,
               some multi-value fields separated by comma are still split, even
               if this is not mentioned in the documentation.
             - Values may be multi-line (like when containing an embedded GPG key),
               but following lines must be prefixed by whitespace. Multilines
               may contain comments (prefixed by whitespace or not). Empty lines
               part of a multi-line value must be prefixed by whitespace and &quot;.&quot;
             - A file may contain multiple entries, separated by empty lines.
               A file must be split into sections, fed individually to this function
        */
        LET Deb822_KeyValues___(section) = SELECT Key,
            /* Signed-By is special (it could be an embedded GPG key),and
               shouldn&#x27;t be split: */
            if(condition=NormaliseOpts(string=Key)!=&#x27;Signed-By&#x27;,
                then=split(sep_string=&#x27; &#x27;,
                string=MaybeReplaceComma(key=Key,
                    value=Simplify(string=Trim(string=Value)))),
                else=Value) AS Value
            FROM parse_records_with_regex(
                accessor=&#x27;data&#x27;,
                /* A key is anything but whitespace up to a colon
                   Values can continue on several lines, but only if the following
                   lines are indented with whitespace
                */
                regex=&#x27;&#x27;&#x27;(?m)^(?P&lt;Key&gt;[^#:\s]+)\s*:[^\S\n]*(?P&lt;Value&gt;[^\n]*(?:\n[^\S\n]+[^\n]+)*)&#x27;&#x27;&#x27;,
                /* Before parsing the key–values, remove all comments from the file
                   (otherwise forming a regex without lookarounds would be very
                   difficult, if not impossible), Luckily, comments follow strict
                   rules and must start with ^#.
                */
                file=regex_replace(
                    re=&#x27;&#x27;&#x27;(?m)^#.+\n&#x27;&#x27;&#x27;,
                    source=section
                )
            )

        LET Deb822_KeyValues__(section) = SELECT * FROM flatten(query={
            SELECT * FROM Deb822_KeyValues___(section=section)
        })

        LET Deb822_KeyValues_(section) = SELECT Key,
            enumerate(items=Value) AS Value
            FROM Deb822_KeyValues__(section=section)
            GROUP BY Key

        /* Parse a deb822 sources file section into a dict with consistent option
           names: */
        LET Deb822_KeyValues(section, flatten) = SELECT to_dict(
            item={
                SELECT NormaliseOpts(string=Key) as _key,
                    if(condition=flatten, then=Value,
                        else=join(array=Value, sep=&#x27; &#x27;)) AS _value
                FROM Deb822_KeyValues_(section=section)
            }) AS Contents
            FROM scope()

        /* Split paragraphs in a file (separated by one or several empty
           lines) into rows. (&#x27;regex&#x27; is just anything that is illegal in Deb822Sections
           to prevent splitting data into records.): */
        LET Deb822Sections(OSPath) = SELECT OSPath,* FROM split_records(
            filenames=OSPath,
            columns=&#x27;Section&#x27;,
            regex=&#x27;^ #&#x27;, record_regex=&#x27;&#x27;&#x27;\n{2,}&#x27;&#x27;&#x27;
        )
        /* Sections may be empty due to several newlines or comments on their own
           separated by newlines. Ensure that at least one field is present
           (URIs are mandatory): */
        WHERE URIs

        LET Deb822_Flattened_(OSPath) = SELECT * FROM foreach(
            row=Deb822Sections(OSPath=OSPath),
            query={SELECT OSPath, * FROM flatten(query={
                SELECT * FROM foreach(
                    row=Deb822_KeyValues(section=Section, flatten=true),
                    column=&#x27;Contents&#x27;
                )
            })}
        )

        /* Parse a deb822 sources file with options in individual columns.
           Note that, as opposed to DebOneLine and Deb822_Flattened, this
           function does not return the columns _URIBase and _Transport, since
           this format supports mulitple URIs to be specified: */
        LET Deb822(OSPath) = SELECT * FROM foreach(
            row=Deb822Sections(OSPath=OSPath),
            query={SELECT OSPath, * FROM foreach(
                row=Deb822_KeyValues(section=Section, flatten=false),
                column=&#x27;Contents&#x27;
            )}
        )

        /* Parse a deb822 sources file with options in individual columns, flattened: */
        LET Deb822_Flattened(OSPath) = SELECT * FROM flatten(query={
            SELECT OSPath, *, URIComponents(URI=URIs).URIBase AS _URIBase,
                URIComponents(URI=URIs).Transport AS _Transport
            FROM Deb822_Flattened_(OSPath=OSPath)
        })

        /* Parse an apt sources/list file */
        LET parse_aptsources(OSPath, flatten) = if(
            condition=OSPath=~&#x27;.list$&#x27;,
            then=if(condition=flatten,
                then=DebOneLine_Flattened(OSPath=OSPath),
                else=DebOneLine(OSPath=OSPath)
            ),
            else=if(condition=flatten,
                then=Deb822_Flattened(OSPath=OSPath),
                else=Deb822(OSPath=OSPath)
            )
        )

        LET files = SELECT OSPath FROM glob(
           globs=linuxAptSourcesGlobs.ListGlobs)

        LET deb_sources = SELECT * FROM foreach(row=files,
            query={SELECT * FROM parse_aptsources(OSPath=OSPath, flatten=true)}
        )

parameters:
  - name: linuxAptSourcesGlobs
    description: Globs to find apt source *.list and .sources files.
    type: csv
    default: |
        ListGlobs
        /etc/apt/sources.list
        /etc/apt/sources.list.d/*.list
        /etc/apt/sources.list.d/*.sources
  - name: aptCacheDirectory
    description: Location of the apt cache directory.
    default: /var/lib/apt/lists/

precondition:
    SELECT OS From info() where OS = &#x27;linux&#x27;

sources:
  - name: Sources
    query: |
        /* Output sources in a readable format: */
        SELECT * FROM foreach(row=files,
            query={SELECT * FROM parse_aptsources(OSPath=OSPath, flatten=false)}
        )
    notebook:
      - type: vql_suggestion
        name: Only enabled sources
        template: |
            SELECT * FROM source(artifact=&#x27;Custom.Linux.Debian.AptSources/Sources&#x27;)
            WHERE get(field=&#x27;Enabled&#x27;, default=&#x27;yes&#x27;) =~ &#x27;(?i)^(?:yes|true|with|on|enable)$&#x27;

      - type: vql_suggestion
        name: Trusted sources (apt-secure bypassed)
        template: |
            SELECT * FROM source(artifact=&#x27;Custom.Linux.Debian.AptSources/Sources&#x27;)
            WHERE get(field=&#x27;Trusted&#x27;, default=&#x27;&#x27;) =~ &#x27;(?i)^(?:yes|true|with|on|enable)$&#x27;

  - name: SourcesFlattened
    query: |
        /* Output sources flattened for ease of analysis: */
        SELECT * FROM deb_sources

  - name: SourcesCacheFiles
    query: |
        /* We try to get at the Release file in /var/lib/apt/ by munging
           the components and URL.
           Strip the last component off, convert / and space to _ and
           add _Release/_InRelease to get the filename.
        */
        LET parsed_apt_lines = SELECT get(field=&#x27;Architectures&#x27;, default=&#x27;&#x27;) AS Architectures, URIs,
            _URIBase + &quot; &quot; + Suites + &quot; &quot; + Components as Name, Types,
            OSPath as Source, aptCacheDirectory + regex_replace(
              replace=&quot;_&quot;,
              re=&quot;_+&quot;,
              source=regex_replace(
                replace=&quot;_&quot;, re=&quot;[ /]&quot;,
                source=_URIBase + &quot;_dists_&quot; + Suites
              )) as cache_file
        FROM deb_sources
        GROUP BY URIs, Suites

        /* This runs if the file was found. Read the entire file into
            memory and parse the same record using multiple RegExps.
        */
        LET parsed_cache_files(file) = SELECT Name, Architectures, URIs, Types,
            Source, parse_string_with_regex(
                string=regex_replace(source=Record,
                    re=&#x27;(?m)^Version: GnuPG v.+$&#x27;, replace=&#x27;&#x27;
                ),
                regex=[&quot;Codename: (?P&lt;Release&gt;[^\\n]+)&quot;,
                       &quot;Version: (?P&lt;Version&gt;[^\\n]+)&quot;,
                       &quot;Origin: (?P&lt;Origin&gt;[^\\n]+)&quot;,
                       &quot;Architectures: (?P&lt;Architectures&gt;[^\\n]+)&quot;,
                       &quot;Components: (?P&lt;Components&gt;[^\\n]+)&quot;]) as Record
           FROM parse_records_with_regex(file=file, regex=&quot;(?sm)(?P&lt;Record&gt;.+)&quot;)

         // Foreach row in the parsed cache file, collect the FileInfo too.
         LET add_stat_to_parsed_cache_file(file) = SELECT * from foreach(
           query={
             SELECT OSPath, Mtime, Ctime, Atime, Record, Types,
               Name, Architectures, URIs, Source from stat(filename=file)
           }, row=parsed_cache_files(file=file))
           WHERE Record
           GROUP BY OSPath

         /* For each row in the parsed file, run the appropriate query
            depending on if the cache file exists.
            If the cache file is not found, we just copy the lines we
            parsed from the source file and fill in empty values for
            stat.
         */
         LET parse_cache_or_pass = SELECT * from if(
           condition={
              SELECT * from stat(filename=cache_file + &#x27;_InRelease&#x27;)
           },
           then=add_stat_to_parsed_cache_file(file=cache_file + &#x27;_InRelease&#x27;),
           else={SELECT * FROM if(
            condition={
              SELECT * from stat(filename=cache_file + &#x27;_Release&#x27;)
            },
            then=add_stat_to_parsed_cache_file(file=cache_file + &#x27;_Release&#x27;),
            else={
            SELECT Source, NULL AS OSPath, Null as Mtime, Null as Ctime,
               Null as Atime, Types,
               Null as Record, Architectures, URIs, Name from scope()
            })
           })

         -- For each parsed apt .list file line produce some output.
         SELECT * from foreach(
             row={
                 SELECT * FROM parsed_apt_lines
             },
             query={
                SELECT * FROM parse_cache_or_pass
              })

</code></pre>

