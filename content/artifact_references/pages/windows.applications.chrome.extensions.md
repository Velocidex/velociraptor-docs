---
title: Windows.Applications.Chrome.Extensions
hidden: true
tags: [Client Artifact]
---

Fetch Chrome extensions.

Chrome extensions are installed into the user's home directory.  We
search for manifest.json files in a known path within each system
user's home directory. We then parse the manifest file as JSON.

Many extensions use locale packs to resolve strings like name and
description. In this case we detect the default locale and load
those locale files. We then resolve the extension's name and
description from there.

## NOTES:

This artifact is deprecated in favor of
Generic.Forensic.SQLiteHunter and will be removed in future


<pre><code class="language-yaml">
name: Windows.Applications.Chrome.Extensions
description: |
  Fetch Chrome extensions.

  Chrome extensions are installed into the user&#x27;s home directory.  We
  search for manifest.json files in a known path within each system
  user&#x27;s home directory. We then parse the manifest file as JSON.

  Many extensions use locale packs to resolve strings like name and
  description. In this case we detect the default locale and load
  those locale files. We then resolve the extension&#x27;s name and
  description from there.

  ## NOTES:

  This artifact is deprecated in favor of
  Generic.Forensic.SQLiteHunter and will be removed in future


parameters:
  - name: extensionGlobs
    default: \AppData\Local\Google\Chrome\User Data\*\Extensions\*\*\manifest.json
  - name: userRegex
    default: .
    type: regex

sources:
  - precondition: |
      SELECT OS From info() where OS = &#x27;windows&#x27;
    query: |
        /* For each user on the system, search for extension manifests
           in their home directory. */
        LET extension_manifests = SELECT * from foreach(
          row={
             SELECT Uid, Name AS User,
                    expand(path=Directory) as Directory
             FROM Artifact.Windows.Sys.Users()
             WHERE Name =~ userRegex
          },
          query={
             SELECT OSPath, Mtime, Ctime, User, Uid
             FROM glob(root=Directory, globs=extensionGlobs)
          })

        /* If the Manifest declares a default_locale then we
           load and parse the messages file. In this case the
           messages are actually stored in the locale file
           instead of the main manifest.json file.
        */
        LET maybe_read_locale_file =
           SELECT * from if(
              condition={
                 select * from scope() where Manifest.default_locale
              },
              then={
                 SELECT Manifest,
                        Uid, User,
                        Filename as LocaleFilename,
                        ManifestFilename,
                        parse_json(data=Data) AS LocaleManifest
                 FROM read_file(
                         -- Munge the filename to get the messages.json path.
                         filenames=regex_replace(
                           source=ManifestFilename,
                           replace=&quot;\\_locales\\&quot; + Manifest.default_locale +
                                   &quot;\\messages.json&quot;,
                           re=&quot;\\\\manifest.json$&quot;))
              },
              else={
                  -- Just fill in empty Locale results.
                  SELECT Manifest,
                         Uid, User,
                         &quot;&quot; AS LocaleFilename,
                         &quot;&quot; AS ManifestFilename,
                         &quot;&quot; AS LocaleManifest
                  FROM scope()
              })

        LET parse_json_files = SELECT * from foreach(
           row={
             SELECT Filename as ManifestFilename,
                    Uid, User,
                    parse_json(data=Data) as Manifest
             FROM read_file(filenames=OSPath)
           },
           query=maybe_read_locale_file)

        LET parsed_manifest_files = SELECT * from foreach(
          row=extension_manifests,
          query=parse_json_files)

        SELECT Uid, User,

               /* If the manifest name contains __MSG_ then the real
                  name is stored in the locale manifest. This condition
                  resolves the Name column either to the main manifest or
                  the locale manifest.
               */
               if(condition=&quot;__MSG_&quot; in Manifest.name,
                  then=get(item=LocaleManifest,
                     member=regex_replace(
                        source=Manifest.name,
                        replace=&quot;$1&quot;,
                        re=&quot;(?:__MSG_(.+)__)&quot;)).message,
                  else=Manifest.name) as Name,

               if(condition=&quot;__MSG_&quot; in Manifest.description,
                  then=get(item=LocaleManifest,
                     member=regex_replace(
                        source=Manifest.description,
                        replace=&quot;$1&quot;,
                        re=&quot;(?:__MSG_(.+)__)&quot;)).message,
                  else=Manifest.description) as Description,

               /* Get the Identifier and Version from the manifest filename */
               regex_replace(
                 source=ManifestFilename,
                 replace=&quot;$1&quot;,
                 re=&quot;(?:.+Extensions\\\\([^\\\\]+)\\\\([^\\\\]+)\\\\manifest.json)$&quot;) AS Identifier,
               regex_replace(
                 source=ManifestFilename,
                 replace=&quot;$2&quot;,
                 re=&quot;(?:.+Extensions\\\\([^\\\\]+)\\\\([^\\\\]+)\\\\manifest.json)$&quot;) AS Version,

               Manifest.author as Author,
               Manifest.background.persistent AS Persistent,
               regex_replace(
                 source=ManifestFilename,
                 replace=&quot;$1&quot;,
                 re=&quot;(.+Extensions\\\\.+\\\\)manifest.json$&quot;) AS Path,

               Manifest.oauth2.scopes as Scopes,
               Manifest.permissions as Permissions,
               Manifest.key as Key

        FROM parsed_manifest_files

</code></pre>

