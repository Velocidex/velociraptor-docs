---
title: Windows.Detection.CryptnetUrlCache
hidden: true
tags: [Client Artifact]
---

This artifact will hunt for evidence of Certutil use as a download cradle.

The CryptnetUrlCache contains both content and metadata of files downloaded by
CertUtil and other Windows Crypto components. The artifact will first look for
content larger than a specified size, then check headers against a whitelist
of common content types. Additional options include a UrlWhitelist and search
of VSS.

NOTE: Expect some false positives and build a whitelist of Urls to add for
regular hunts. Alternatively target specific headers such as PE files by
adding '^MZ' to the HeaderRegex field.


```yaml
name: Windows.Detection.CryptnetUrlCache
description: |
   This artifact will hunt for evidence of Certutil use as a download cradle.

   The CryptnetUrlCache contains both content and metadata of files downloaded by
   CertUtil and other Windows Crypto components. The artifact will first look for
   content larger than a specified size, then check headers against a whitelist
   of common content types. Additional options include a UrlWhitelist and search
   of VSS.

   NOTE: Expect some false positives and build a whitelist of Urls to add for
   regular hunts. Alternatively target specific headers such as PE files by
   adding '^MZ' to the HeaderRegex field.

author: "@mgreen27 - Matt Green"

reference:
  - https://thinkdfir.com/2020/07/30/certutil-download-artefacts/
  - https://lolbas-project.github.io/lolbas/Binaries/Certutil/


parameters:
  - name: GlobLookup
    default: |
      FileGlob
      C:\Windows\*\config\systemprofile\AppData\LocalLow\Microsoft\CryptnetUrlCache\**
      C:\Users\*\AppData\LocalLow\Microsoft\CryptnetUrlCache\**
  - name: SusSize
    description: "Size in bytes for CryptnetUrlCache content to be suspicious"
    default: '10000'
    type: int
  - name: HeaderRegex
    description: 'Regex of content headers.'
    default: '.'
    type: regex
  - name: HeaderWhitelist
    description: 'Whitelist regex of content headers.'
    default: '^(MSCF|0|<|.<|----)'
    type: regex
  - name: UrlWhitelist
    description: 'Regex to whitelist Url field'
    type: regex
  - name: SearchVSS
    description: "Add VSS into query."
    type: bool


sources:
  - precondition:
      SELECT OS From info() where OS = 'windows'

    query: |
      -- file target globs
      LET CryptnetUrlCache <= SELECT FileGlob
            FROM parse_csv(filename=GlobLookup, accessor='data')


      -- expand provided glob into a list of paths on the file system (fs)
      LET fspaths(path) = SELECT * FROM glob(globs=path) WHERE NOT IsDir


      -- function returning list of VSS paths corresponding to path
      LET vsspaths(path) = SELECT *
        FROM Artifact.Windows.Search.VSS(SearchFilesGlob=path)
        WHERE NOT IsDir


      -- determine files in scope from globs
      LET files <= SELECT * FROM foreach(row=CryptnetUrlCache,
            query={
                SELECT * FROM if(condition=SearchVSS,
                    then= {
                       SELECT * FROM vsspaths(path=FileGlob)
                    },
                    else= {
                       SELECT * FROM fspaths(path=FileGlob)
                    })
            })


      -- extract metadata lines
      LET metadata = SELECT * FROM foreach(row=files,
        query={
            SELECT
                FullPath as MetaPath,
                Mtime as MetaMtime,
                Ctime as MetaCtime,
                Atime as MetaAtime,
                parse_string_with_regex(
                    string=utf16(string=Line),
                    regex=['[\\s\\S]*(?P<Url>(http[s]?:|\\\\\\\\|ftp:)[\\s\\S]+)']
                        ).Url as Url
            FROM parse_lines(filename=FullPath)
            WHERE MetaPath =~ '\\\\Microsoft\\\\CryptnetUrlCache\\\\metadata\\\\'
            GROUP BY MetaPath
        })


      -- find suspicious content files and extract headers
      LET hits = SELECT
            FullPath,Name,Size,
            Mtime, Atime, Ctime,
            hash(path=FullPath) as Hash,
            read_file(length=4,filename=FullPath) as Header
        FROM files
        WHERE
            FullPath =~ '\\\\Microsoft\\\\CryptnetUrlCache\\\\Content\\\\'
            AND Size > int(int=SusSize)


      -- output rows
      SELECT * FROM foreach(row=hits,
        query={
            SELECT
                FullPath,Name,Size,Header,
                Mtime, Atime, Ctime,
                Url, Hash,
                if(condition= Header=~ 'MZ',
                    then= parse_pe(file=FullPath).VersionInformation,
                    else= 'N/A' ) as VersionInformation,
                if(condition= Header=~ 'MZ',
                    then= authenticode(filename=FullPath),
                    else= 'N/A' ) as Authenticode,
                MetaPath,
                MetaMtime,MetaAtime,MetaCtime
            FROM metadata
            WHERE
                MetaPath =~ Name
                AND Header =~ HeaderRegex
                AND NOT if(condition= HeaderWhitelist,
                    then= Header =~ HeaderWhitelist,
                    else= FALSE)
                AND NOT if(condition=UrlWhitelist,
                    then= Url =~ UrlWhitelist,
                    else= FALSE)
                AND split(
                    string=FullPath,
                        sep='CryptnetUrlCache')[0] = split(string=MetaPath,
                            sep='CryptnetUrlCache')[0]
        })

```
