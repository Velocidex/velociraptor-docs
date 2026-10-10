---
title: grok
sitemap:
  disable: true
no_edit: true
no_children: true
description: |
  Parse a string using a Grok expression.

  This is most useful for parsing syslog style logs (e.g. IIS, Apache logs).

  You can read more about GROK expressions here
  https://www.elastic.co/blog/do-you-grok-grok

build:
  list: never
---



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
grok|Grok pattern.|string (required)
data|String to parse.|string (required)
patterns|Additional patterns.|Any
all_captures|Extract all captures.|bool
### Description

Parse a string using a Grok expression.

This is most useful for parsing syslog style logs (e.g. IIS, Apache logs).

You can read more about GROK expressions here
https://www.elastic.co/blog/do-you-grok-grok


