
---
menutitle: EZ Tools
---

## AmCacheParser

This program is different from other Amcache parsers in that it
does not dump everything available. Rather, it looks at both File
entries and Program entries.


Link: https://github.com/EricZimmerman/AmcacheParser



### Parse the Amcache hive

Use the
[Windows.Forensics.Amcache](https://docs.velociraptor.app/artifact_references/pages/windows.forensics.amcache/)
artifact to parse the Amcache hive.


```text
velociraptor -v -r Windows.Forensics.Amcache -o c:\output\test.zip
```



### Using the registry hunter

The [Registry Hunter](https://registry-hunter.velocidex.com/)
contains several targets to parse the Amcache hive.


```text
velociraptor -v --definitions ./Windows.Registry.Hunter.zip -r Windows.Registry.Hunter --RuleFilter AmCache -o c:\output\test.zip
```

