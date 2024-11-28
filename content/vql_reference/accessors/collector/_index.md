---
title: collector
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## collector
<span class='vql_type label label-warning pull-right page-header'>Accessor</span>


### Description

Open a collector zip file as if it was a directory - automatically
expand sparse files.

Open an offline collector zip file as if it was a directory. This
is similar to the `zip` accessor (see below) but it automatically
decrypts collections protected using the x509 scheme. Use this
accessor to transparently read inside encrypted collections.

This accessor also automatically expands sparse files by zero
padding them (when possible - if zero padding is unreasonable
large for this file, we do not expand it).


