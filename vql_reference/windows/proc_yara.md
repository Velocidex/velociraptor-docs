# proc_yara



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
rules|Yara rules|string (required)
pid|The pid to scan|int (required)
context|Return this many bytes either side of a hit|int
key|If set use this key to cache the  yara rules.|string
namespace|The Yara namespace to use.|string
vars|The Yara variables to use.|ordereddict.Dict
number|Stop after this many hits (1).|int64

**Required permissions:** `MACHINE_STATE`

### Description

Scan processes using yara rules.

This plugin uses yara's own engine to scan process memory for the
signatures.

{{% notice note %}}

Process memory access depends on having the
[SeDebugPrivilege](https://mskb.pkisolutions.com/kb/131065) which
depends on how Velociraptor was started. Even when running as
System, some processes are not accessible.

{{% /notice %}}



