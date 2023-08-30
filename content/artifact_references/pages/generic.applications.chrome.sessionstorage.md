---
title: Generic.Applications.Chrome.SessionStorage
hidden: true
tags: [Client Artifact]
---

Session storage allows a web site to store permanent data in the
user's browser.

This artifact parses this data from the browser cache. Each website
has maintains a mapping between keys and values. The data is stored
per website and can vary.


<pre><code class="language-yaml">
name: Generic.Applications.Chrome.SessionStorage
description: |
  Session storage allows a web site to store permanent data in the
  user&#x27;s browser.

  This artifact parses this data from the browser cache. Each website
  has maintains a mapping between keys and values. The data is stored
  per website and can vary.

parameters:
- name: SessionGlobs
  type: csv
  default: |
    Glob
    C:/Users/*/AppData/Local/Google/Chrome/User Data/*/Session Storage
    C:/Users/*/AppData/Local/BraveSoftware/Brave*/User Data/*/Session Storage
    C:/Users/*/AppData/Local/Microsoft/Edge/User Data/*/Session Storage
    /home/*/.config/google-chrome/*/Session Storage
    /home/*/.config/chrome-remote-desktop/chrome-profile/*/Session Storage
    /Users/*/Library/Application Support/BraveSoftware/Brave*/*/Session Storage
    /Users/*/Library/Application Support/Google/Chrome/*/Session Storage
    /Users/*/Library/Application Support/Microsoft Edge/*/Session Storage

- name: Accessor
- name: AlsoUpload
  type: bool
  description: If selected we also upload the Session Storage directory.

sources:
- query: |
    LET _ &lt;= log(message=&quot;Glob %v&quot;, args= [SessionGlobs.Glob, ])
    LET _GetMapping(Data, ID) = to_dict(item={
      SELECT _key AS RawKey,
             parse_string_with_regex(string=_key,
                 regex=&#x27;map-([^-]+)-(?P&lt;Key&gt;.+)&#x27;).Key AS _key,
             utf16(string=_value) AS _value
      FROM items(item=Data)
      WHERE RawKey =~ format(format=&quot;map-%v&quot;, args=ID)
    })

    LET DumpSessionStorate(Data) =
         SELECT parse_string_with_regex(string=_key,
                    regex=&#x27;&#x27;&#x27;namespace-(?P&lt;GUID&gt;[^-]+)-(?P&lt;URL&gt;.+)&#x27;&#x27;&#x27;) AS Parsed,
                _value, _GetMapping(Data=Data, ID=_value) AS Mapping
         FROM items(item=Data)
         WHERE Parsed.URL

    LET hits = SELECT OSPath, to_dict(item={

       -- Load the whole thing into memory since we need to make
       -- several passes on it.
       SELECT Key AS _key, Value  AS _value FROM leveldb(file=OSPath, accessor= Accessor)
    }) AS Data
    FROM glob(globs= SessionGlobs.Glob, accessor= Accessor)

    SELECT * FROM foreach(row={
       SELECT OSPath, Data, if(condition=AlsoUpload, then={
          SELECT upload(file=OSPath) AS Upload
          FROM glob(globs=&quot;*&quot;, root=OSPath, accessor= Accessor)
       }) AS Upload
       FROM hits
       WHERE log(message=&quot;Processing %v&quot;, args=OSPath)

    }, query={
       SELECT OSPath,
              Parsed.GUID AS GUID,
              Parsed.URL AS URL,
              Mapping
       FROM DumpSessionStorate(Data=Data)
    })

</code></pre>

