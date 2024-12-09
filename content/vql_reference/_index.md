---
title: "VQL Reference"
menutitle: VQL Reference
date: 2021-06-12T05:12:26Z
draft: false
weight: 60
noDisqus: true
no_edit: true
disableToc: true
chapter: false
pre: <i class="fas fa-book"></i>
head: <hr>
---

This page lists all the plugins, functions and accessors which are available in
Velociraptor.

- **Plugins** are the data sources of VQL queries. While SQL queries refer to
static tables of data, VQL queries refer to plugins, which generate data rows to
be filtered by the query. Unlike SQL, VQL plugins also receive keyword
arguments. When the plugin is evaluated it simply generates a sequence of rows
which are further filtered by the query. This allows VQL statements to be
chained naturally since plugin args may also be other queries.
- **Functions** are used to transform the data returned by plugins. They
return (transformed) values, not rows.
- **Accessors** are used to access bulk data from various sources using a
standard file-like interface.

{{% notice note %}}

VQL _plugins_ are not the same as VQL _functions_. A helpful 'rule of thumb' is
that plugins always follow the `FROM` keyword because they generate a table
consisting of rows from the data source, while functions (which return a single
value instead of a sequence of rows) are only present in column specifications
(i.e. after `SELECT`) or in condition clauses (i.e. after the `WHERE` keyword).

{{% /notice %}}

{{% notice tip %}}

If you are not exactly sure what you're looking for or just want to browse
what's available, we have also provided listings by general categories [which you
can access in the sidebar](/vql_reference/popular/).

{{% /notice %}}

{{% reference %}}
