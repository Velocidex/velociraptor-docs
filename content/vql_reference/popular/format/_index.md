---
title: format
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## format
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
format|Format string to use|string (required)
args|An array of elements to apply into the format string.|Any

### Description

Format one or more items according to a format string.

This function is essentially a wrapper around Golang's fmt.Sprintf()
function and uses the same format specifiers, which are documented
[here](https://pkg.go.dev/fmt).

The following format 'verbs' are often useful:

- `%v` the general purpose stringifier and can apply to strings, ints etc.
- `%x` will hex print the string.
- `%T` will reveal the internal type of an object.
- `%d` provides the decimal (base 10) representation.
- `%o` provides the octal (base 8) representation.

If you are passing a single variable in the `args` argument then the array
notation can be omitted. That is `args=my_var` can be specified instead
of `args=[my_var]`.

### Examples

**1. Positional argument interpolation**

Here the arguments are substituted in order.

```vql
LET csv <= '''John,ate,banana
Mary,had,little lamb'''
LET my_words <= SELECT * FROM parse_csv(accessor="data", filename=csv, auto_headers=True)
SELECT format(format="%v %v a %v.", args=[Col0, Col1, Col2]) AS Sentence FROM my_words
```
returns:\
`Sentence: John ate a banana.`\
`Sentence: Mary had a little lamb.`

**2. Indexed argument interpolation**

Here the arguments are substituted according to their positional index number
(1-indexed).

```vql
SELECT format(format='%[2]v %[1]v, or %[3]v %[2]v %[1]v.',
  args=('be', 'to', 'not', )) FROM scope()
```
returns:\
`to be, or not to be.`

Note that the same argument can be used more than once.

**3. Timestamp formatting**

```vql
LET T <= timestamp(epoch="2024-02-02T04:42:00Z")
SELECT format(format="%d-%02d-%02dT%02d:%02d:%06.3fZ", args=[
  T.Year, T.Month, T.Day, T.Hour, T.Minute, T.Nanosecond / 1000000000 ])
FROM scope()
```
returns:\
`2024-02-02T04:42:00.000Z`

Note that the `timestamp_format` function provides the same string
formatting for timestamps using a much simpler syntax, but `format` is available
for advanced use cases.

### See also

- [log](vql_reference/basic/log/): a function which uses the same string
  formatting as the `format` function.
- [timestamp_format](/vql_reference/misc/timestamp_format/): a function
  that simplifies the string formatting of timestamp objects.
- [typeof](/vql_reference/basic/format/): a dedicated function equivalent
  to the special use case: `format(format="%T",args=x)`


