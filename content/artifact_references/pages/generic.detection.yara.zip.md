---
title: Generic.Detection.Yara.Zip
hidden: true
tags: [Client Artifact]
---

This artifact enables running Yara on embeded compressed files.

The artifact:

* firstly searches for compressed zip files (PK header)
* then applies yara on files inside.
* files matching ZipFilenameRegex are recursively searched as above.

The artifact is optimised to recursively search through embedded zip,
jar,war and ear files by extracting any discovered containers.
Select UploadHits to upload Discovered file for further analysis.  It is
recommended to increase default artifact timeout for large servers or target
glob.

Some examples of path glob may include:

* Specific container: `/path/here/file.zip`
* Wildcards: `/var/www/*.{jar,war,ear}`
* More wildcards: `/var/www/**/*.jar`
* Windows: `C:/**/*.zip`

NOTE: this artifact runs the glob plugin with the nosymlink switch
turned on.  This will NOT follow any symlinks and may cause
unexpected results if unknowingly targeting a folder with
symlinks. Yara is not applied to the containers, only contained contents
that are not containers.


<pre><code class="language-yaml">
name: Generic.Detection.Yara.Zip
author: &quot;Matt Green - @mgreen27&quot;
description: |
    This artifact enables running Yara on embeded compressed files.

    The artifact:

    * firstly searches for compressed zip files (PK header)
    * then applies yara on files inside.
    * files matching ZipFilenameRegex are recursively searched as above.

    The artifact is optimised to recursively search through embedded zip,
    jar,war and ear files by extracting any discovered containers.
    Select UploadHits to upload Discovered file for further analysis.  It is
    recommended to increase default artifact timeout for large servers or target
    glob.

    Some examples of path glob may include:

    * Specific container: `/path/here/file.zip`
    * Wildcards: `/var/www/*.{jar,war,ear}`
    * More wildcards: `/var/www/**/*.jar`
    * Windows: `C:/**/*.zip`

    NOTE: this artifact runs the glob plugin with the nosymlink switch
    turned on.  This will NOT follow any symlinks and may cause
    unexpected results if unknowingly targeting a folder with
    symlinks. Yara is not applied to the containers, only contained contents
    that are not containers.

parameters:
  - name: TargetGlob
    default: &quot;**/*.{zip,jar,war,ear}&quot;
  - name: ZipFilenameRegex
    default: &quot;.(zip|jar|war|ear)$&quot;
    description: Regex of FileName inside container files we would like to recursively scan.
  - name: MaxRecursions
    description: Number of recursions to allow checking inside archives. Default is 10 layers.
    default: 10
    type: int
  - name: UploadHits
    description: Select to upload hits to server.
    type: bool
  - name: YaraRule
    type: yara
    description: Final Yara option and the default if no other options provided.
    default: |
        rule IsPE:TestRule {
           meta:
              author = &quot;the internet&quot;
              date = &quot;2021-03-04&quot;
              description = &quot;A simple PE rule to test yara features&quot;
          condition:
             uint16(0) == 0x5A4D and
             uint32(uint32(0x3C)) == 0x00004550
        }
  - name: NumberOfHits
    description: THis artifact will stop by default at one hit. This setting allows additional hits
    default: 1
    type: int
  - name: ContextBytes
    description: Include this amount of bytes around hit as context.
    default: 0
    type: int

sources:
  - query: |
      -- this section glob searches and confirms we are looking at zip container
      LET target_files = SELECT *,
            read_file(filename=OSPath,offset=0,length=2) as _Header
        FROM glob(globs=TargetGlob,nosymlink=True)
        WHERE _Header = &#x27;PK&#x27;

      -- recursive search function
      LET Recurse(Container, File, Accessor, RecursionRounds) = SELECT * FROM if(
        condition=RecursionRounds &lt; MaxRecursions,
        then={
           SELECT * FROM foreach(
                row={
                    SELECT *
                    FROM glob(accessor=&#x27;zip&#x27;,
                       root=pathspec(DelegatePath=File, DelegateAccessor=Accessor),
                       globs=&#x27;**&#x27;)
                    WHERE NOT IsDir AND Size &gt; 0
                },
                query={
                    SELECT *
                    FROM if(condition=Name =~ ZipFilenameRegex,
                            then={
                                SELECT *
                                FROM Recurse(
                                    Container = Container,
                                    File=OSPath,
                                    Accessor=&quot;zip&quot;,
                                    RecursionRounds = RecursionRounds + 1)
                            },
                            else={
                              SELECT
                                Container,
                                OSPath.HumanString as ExtractedPath,
                                OSPath.Path as FilePath,
                                hash(accessor=&#x27;zip&#x27;,path=OSPath) as Hash,
                                File.Size AS Size,
                                Mtime, Atime, Ctime, Btime,
                                Rule, Tags, Meta,
                                String.Name as YaraString,
                                String.Offset as HitOffset,
                                upload( accessor=&#x27;scope&#x27;,
                                    file=&#x27;String.Data&#x27;,
                                    name=format(format=&quot;%v_%v&quot;,
                                    args=[ OSPath.HumanString, String.Offset ]
                                        )) as HitContext
                              FROM yara(accessor=&#x27;zip&#x27;,files=OSPath,rules=YaraRule,
                                context=ContextBytes, number=NumberOfHits)
                            })
                    })
          })

      LET hits = SELECT * FROM foreach(row=target_files,
            query={
                SELECT *
                FROM Recurse(Container=OSPath,File=OSPath, Accessor=&quot;auto&quot;, RecursionRounds=0)
            })

      -- upload files that have hit
      LET upload_hits = SELECT *, upload(file=Container) as ContainerUpload FROM hits

      -- display rows
      SELECT * FROM if(condition=UploadHits,
        then= upload_hits,
        else= hits)

column_types:
  - name: HitContext
    type: preview_upload
</code></pre>

