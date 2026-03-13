---
title: Local Documentation
menutitle: Local Docs
date: 2026-03-10
last_reviewed: 2026-03-10
draft: false
weight: 50
summary: Learn how to access and search local documentation in the GUI.
---




The bundled docs are intended for quick documentation lookups, or use
in situations where internet access to the Veliciraptor documentation
website is unavailable, or restricted, or perhaps is just severely
degraded. Such circumstances are common when responding to serious
security incidents. So if you're planning to take your Velociraptor
server into a bunker, you can prepare it with local documentation

## Limitations

- Links within the offline docs will send you to the full documentation
  website, rather than allowing you to navigate within the offline
  docs. Avoid clicking links in the documentation if you don't want to
  be sent to the documentation website.
- Some internal navigation links that you would see on the website
are not shown in the offline docs.

- **Request:** A user submits a search query.

- **Check:** The system checks if the local `DocsIndex` is present and
  matches the version in the `root` org's inventory.

- **Sync:** If outdated, the system downloads the ZIP from the
  inventory and unpacks it.

If a documentation search is done within a non-root
[organization]({{< ref "/docs/deployment/orgs/" >}}) (org), the
search request is redirected to the `root` org. This ensures
that documentation is shared globally across the platform rather than
requiring every sub-org to maintain its own index.


https://blevesearch.com/docs/Query-String-Query/


"title", "text", "url", "tags", "rank", "crumbs"

## Terms vs Phrases

Words separated by spaces are considered **terms** and are searched
for independently of each other. For example the query

## Searching by tag

If you're not sure exactly what keywords to search for you can also
search by tag. Or you can combine tags with your keywords in the
search to improve the ranking of more relevant results.

For example

1. Do a search for your keywords. This will give you a list of all
results, regardless of tags.

2. On the list you can click on one or more tags to add them to your search
   criteria.

