# label



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
client_id|Client ID to label.|string (required)
labels|A list of labels to apply|list of string (required)
op|An operation on the labels (set, check, remove)|string

**Required permissions:** `LABEL_CLIENT`

### Description

Add the labels to the client. If op is 'remove' then remove these labels.

### Example

The following query sets the MyLabel label on all hosts that last
connected from an IP address matching the regular expression (You
can also do a CIDR check using the `cidr_contains()` function)

```vql
SELECT *, label(labels='MyLabel', op='set', client_id=client_id)
FROM clients() WHERE  last_ip =~ "127.+"
```



