# Manipulating VQL columns and rows

VQL has a very simple syntax inspired by SQL. At the heart of the
language is a `SELECT` query which returns a set of `Rows`. A VQL Row
consists of `Columns` and `Cell Values`.

You can think of the result of a query is simply a list of Dicts -
where a dict contains key/value pairs. This is easiest to see in the
GUI's `Raw JSON` view:

```vql
SELECT * FROM info()
```

This returns a JSON result containing a list of JSON objects, each
representing a single row (in this case only one row is returned):

```json
[
  {
    "Hostname": "WIN-SJE0CKQO83P",
    "Uptime": 776266,
    "BootTime": 1758078331,
    "OS": "windows",
    "Platform": "Microsoft Windows Server 2022 Standard Evaluation",
    "PlatformFamily": "Server",
    "PlatformVersion": "21H2",
    "KernelVersion": "10.0.20348.4052 Build 20348.4052",
    "VirtualizationSystem": "",
    "VirtualizationRole": "",
    "CompilerVersion": "go1.24.7",
    "HostID": "6b65a0af-a752-429a-a65c-83367f882ebe",
    "Exe": "c:\\velociraptor.exe",
    "CWD": "C:\\Users\\Administrator",
    "IsAdmin": true,
    "ClientStart": "2025-09-23T04:12:06.2778472Z",
    "LocalTZ": "PDT",
    "LocalTZOffset": -25200,
    "Fqdn": "WIN-SJE0CKQO83P",
    "Architecture": "amd64"
  }
]
```

We can select specific columns in this using the `Column Specifiers`
following the `SELECT` clause:

```sql
SELECT Hostname FROM info()
```

However, what if we wanted to automatically manipulate the columns in
a more sophisticated way? This is often needed when we dont know the
names of all the columns in advance.

Some use cases are:

1. If we do not know the names of the columns in advance but wanted
   to select only some columns by e.g. a Regular Expression?

2. We want to generate a hash based on a selection of columns?

This post shows how to convert any VQL query into a list of dicts,
thereby providing access to the Columns in a more convenient way. We
then show how to `deconstruct the dict` back into a row.

For the following examples, we use the query `SELECT * FROM info()` as
a substitute for any other query. Typically these techniques are more
useful for generic queries for which we dont know the types of columns
returned. For example `SELECT * FROM source()`, `SELECT * FROM
parse_csv()` etc.

## Step 1: Convert rows into dicts

In order to deal with a row as a dict we need to use the `items()`
plugin:

```vql
SELECT * FROM items(item={ SELECT * FROM info() })
```

```json
[
  {
      "_key": 0,
      "_value": {
          "Hostname": "WIN-SJE0CKQO83P",
              ...
          "Architecture": "amd64"
      }
  }
]
```

When the `items()` plugin operates on another query, it emits two columns:
* `_key` is a counter of row number
* `_value` is the entire row given as a dict.

Once we have the row as a dict, we can manipulate it easily using a
number of dict manipulation tools.

## Step 2: Perform operations on the row dict.

Now that we have the row as a dict we can perform any operations on
it. In the following we see two methods for manipulating dicts:

1. `Set operations`: allow us to add, remove and merge dicts based on
   their keys. See [Set operations]({{< ref
   "/knowledge_base/tips/set_operations/" >}}).

2. `Dict reconstruction`: is a more powerful technique for tearing the
   dict apart and reconstructing it again.

### Example: Select only columns that match a regular expression.

For this example, assume we dont know all the exact columns in advance
but want to match columns based on some regular expression.

The key for this is to transform a dict's columns based on a regular
expression: We need to iterate over all the keys in the dict , only
including some keys based on their name, and then put it back together
into a dict:

```vql
LET FilterKeys(Dict) = to_dict(item={
  SELECT * FROM items(item=Dict)
    WHERE _key =~ "Host|Arch"
})

SELECT _key, FilterKeys(Dict=_value) AS _value
FROM items(item={ SELECT * FROM info() })
```

To make the filtering operation simpler to understand and reuse, I
extracted it into a VQL function. The `FilterKeys` function builds a
new dict using the `to_dict()` function based on a query. The query we
use uses the `items()` plugin again. But this time, since it is
operating on a dict, the plugin iterates over the dict's keys and
values as the `_key` and `_value` columns.

For this example, we just remove the keys that do not match the
regular expression `Host|Arch`. This results in a smaller dict with
only keys matching the regular expression:

```json
[
  {
    "_key": 0,
    "_value": {
        "Hostname": "WIN-SJE0CKQO83P",
        "HostID": "6b65a0af-a752-429a-a65c-83367f882ebe",
        "Architecture": "amd64"
    }
  }
]
```

### Example: Hash a subset of columns

For this example, suppose we have a set of columns that we consider to
be a representative of the row and we want to generate a hash based on
those. This technique allows us to tag similar rows with a unique
representative ID.

For our example we want to create another dict with the columns
`Hostname`, `Exe` and `Architecture`. We consider those columns to be
fully representative of the row. I.e. we accept that other columns may
vary but as long as those fields are the same, we consider the rows to
be duplicates.

We can quickly extract only those fields by use of [Set
intersection]({{< ref "/knowledge_base/tips/set_operations/" >}}) (In
VQL this is implemented by dict multiplication):

```vql
LET FingerPrint <= dict(Hostname=TRUE, Exe=TRUE, Architecture=TRUE)

SELECT _key, _value * FingerPrint AS _value
FROM items(item={
    SELECT * FROM info()
})
```

```json
[
  {
    "_key": 0,
    "_value": {
        "Hostname": "WIN-SJE0CKQO83P",
        "Exe": "c:\\velociraptor.exe",
        "Architecture": "amd64"
    }
  }
]
```

Now we produce a hash of these fields by serializing the dict into a JSON
object. This hash will be the same for every row with the same set of
values for these specific fields:

```vql
SELECT _key,
    hash(accessor="data", path=serialize(item=_value * FingerPrint) ).MD5 AS _value
FROM items(item={
    SELECT * FROM info()
})
```

Similarly we can use dict subtraction to remove fields from the dict
(e.g. a timestamp field may change all the time so we may want to
remove it).

Now in this example, I will add the new hash into the row dict as an
additional field:

```vql
SELECT _key,
       _value + dict(
         _HashID=hash(accessor="data",
                      path=serialize(item=_value * FingerPrint)).MD5) AS _value
FROM items(item={
    SELECT * FROM info()
})
```

This works using `dict addition`. I create a new dict with a single
key of `_HashID` containing the hash I got earlier. By adding this new
dict to the original row dict, I get a new dict with an additional key.

```json
[
  {
    "_key": 0,
    "_value": {
        "Hostname": "WIN-SJE0CKQO83P",
        "Architecture": "amd64",
            ....
        "_HashID": "ae7b6e78e5fce4b5e18d371be5916472"
    }
  }
]
```

## Step 3: Turn a dict back into a row

The final step is to turn our dict back into a regular VQL `Row`. This
will allow it to be viewed nicely in the GUI as a regular table. The
dict keys will turn back into column headers, and the values will be
table cells.

This operation is done using the `foreach()` plugin with the parameter
`column`:

```vql
LET MyFilteredRow = SELECT
    _key, FilterKeys(Dict=_value) AS _value
FROM items(item={ SELECT * FROM info() })

SELECT * FROM foreach(row=MyFilteredRow, column="_value")
```

To enhance readability, I converted the previous query into a stored
query by naming it `MyFilteredRow`, then I can just use it as an
argument to the `foreach()` plugin. The `column` parameter tells the
`foreach()` plugin to extract the dict found in the column `_value`
into the row itself (with other columns ignored).

![Manipulating VQL Columns and Rows](manipulating_columns.png)

Tags: #vql
