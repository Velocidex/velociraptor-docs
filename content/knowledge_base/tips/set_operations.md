# Set operations in VQL

Set operations are useful in a number of useful scenarios.

## What are sets?

Sets are a mathematical construct that allows `set operations` on
groups of values. In VQL sets are analogous to dictionaries with the
key being the set member and the values ignored (usually just set to
`TRUE`). Set operations are emulated using dict addition and
subtraction.

For example consider the following VQL

```sql

// Convert a list into a dict for set operations
LET SET(LIST) = to_dict(item={
  SELECT _value AS _key, TRUE AS _value FROM foreach(row=LIST)
})

// Convert a dict into a list of keys
LET KEYS(X) = items(item=X)._key

LET X <= SET(LIST=["A", "B"])
LET Y <= SET(LIST=["A", "C"])

SELECT X + Y AS Union,
       KEYS(X=X+Y) AS UnionKeys,
       X - Y AS Intersection,
       KEYS(X=X-Y) AS IntersectionKeys,
       X.A AS Membership,
       get(field="A", item=X) AS Membership2
FROM scope()
```

In the above example, we define a helper function `SET()` to create a
dict from an array by iterating over each element of the array, and
setting the value to TRUE.

A `Set Union` operation is the combination of all keys in the first
set and the second set. This is achieved by adding the
dicts. Similarly a `Set Difference` removes keys present in the second
set from the first set. This is implemented by subtracting the second
set from the first set.

Set membership check can be done by simply checking if the dict
contains the value. This can be done directly when the key name is
known in advance, or by using the `get()` function to access the named
field.

![Set Operations in VQL](set_operations.png)

## Using Set operations in VQL

An example use case is in responding to a number of distinct artifact
collections. For example, for post processing the results of some
collections.

Generally to respond to server events we need to write a
`SERVER_EVENT` artifact that watches for certain events on the
server. In this case we watch for events from the
`System.Flow.Completion` artifact, this artifact emits the flow object
from each flow containing a list of `artifacts_with_results`.

```vql
LET SET(LIST) = to_dict(item={
  SELECT _value AS _key, TRUE AS _value FROM foreach(row=LIST)
})

LET FlowsToWatch <= SET(LIST=["Generic.Client.Info/Users",
   "Generic.Client.Info/WindowsInfo"])

SELECT Flow
FROM watch_monitoring(artifact="System.Flow.Completion")
WHERE any(items=Flow.artifacts_with_results, filter="x=>get(item=FlowsToWatch, field=x)")
```

The above query prepares a set into the variable `FlowsToWatch`. The
query then filters out all flows except those that contain results
from the set of interest.

An alternative to the previous query is to use a regular expression
(This solution is more flexible as it allows matching artifact names
by regular expressions):

```vql
LET FlowsToWatch <= join(array=["Generic.Client.Info/Users",
   "Generic.Client.Info/WindowsInfo"], sep="|")

SELECT Flow
FROM watch_monitoring(artifact="System.Flow.Completion")
WHERE Flow.artifacts_with_results =~ FlowsToWatch
```

This works because a regular expression match on an array is true if
any of the members of the array match.


Tags: #vql
