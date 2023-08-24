---
title: timestamp
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## timestamp
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
epoch||Any
cocoatime||int64
mactime|HFS+|int64
winfiletime||int64
string|Guess a timestamp from a string|string
timezone|A default timezone (UTC)|string
format|A format specifier as per the Golang time.Parse|string

### Description

Convert from different types to a time.Time.

This is one of the most important functions in VQL. We need to
convert timestamps very frequently from various
representations. Most commonly from strings, Unix epoch times etc.

This function is pretty smart and tries to do the right thing most
of the time automatically. For example, you can provide the epoch
parameter as an integer representing seconds since the epoch,
milliseconds or microseconds since the epoch.

```vql
SELECT timestamp(epoch=1630414425) AS Time1,
       timestamp(epoch=1630414425000) AS Time2,
       timestamp(epoch=1630414425000000) AS Time3,
FROM scope()
```

You can also provide a string, and `timestamp()` will try to parse
it by guessing what it represents. For example

```vql
SELECT timestamp(string='March 3 2019'),
       timestamp(string='07/25/2019 5pm')
FROM scope()
```

For more control over the parsing of strings, use the `format`
parameter to specify a template which will be used to parse the
timestamp.

The format template uses a constant time as an example of how the
time is layed out. It represents a template for a timestamp that
**must** use the following date constants

* Year: "2006" "06"
* Month: "Jan" "January"
* Textual day of the week: "Mon" "Monday"
* Numeric day of the month: "2" "_2" "02"
* Numeric day of the year: "__2" "002"
* Hour: "15" "3" "03" (PM or AM)
* Minute: "4" "04"
* Second: "5" "05"
* AM/PM mark: "PM"
* "-0700"  ±hhmm
* "-07:00" ±hh:mm
* "-07"    ±hh

```vql
SELECT timestamp(string="8/30/2021 6:01:28 PM",
                 format="1/2/2006 3:04:05 PM")
```


