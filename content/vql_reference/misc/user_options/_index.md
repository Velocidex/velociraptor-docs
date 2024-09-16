---
title: user_options
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## user_options
<span class='vql_type pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
user|The user to create or update.|string (required)
theme|Set the user's theme.|string
timezone|Set the user's timezone.|string
lang|Set the user's language.|string
org|Set the user's default org id.|string
links|Set the user's default links. This should be a list of dicts with columns: type, text, url, icon_url, new_tab, encode, parameter, method, disabled.|StoredQuery
default_password|Set the user's default password for Zip Exports.|string

### Description

Update and read the user GUI options

Example: The following will set the user language to french, dark
theme and add a sidebar link named Foobar. The default password
for Zip exports will also be set to `foorbar`.

```vql
SELECT user_options(user=whoami(),
       lang="fr",
       theme="veloci-dark",
       links=[dict(
          text="Foobar",
          url="https://www.google.com",
          type="sidebar",
          new_tab=TRUE), ],
        default_password="foobar")
FROM scope()
```


