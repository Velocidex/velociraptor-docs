---
type: docs-no-toc
menutitle: "Security Advisories"
title: "Security Advisories"
summary: |
    CVEs and other security advisories.
description: |
    CVEs and other security advisories.
weight: 10
no_edit: true
noTitle: true
pre: <i class="fas fa-exclamation-triangle"></i>
outputs:
- html
- RSS
cascade:
  # CVE detail pages: keep the left sidebar but drop the right TOC column
  # so the include-cve widget gets the full content width.
  type: docs-no-toc
---

The following CVEs have been noted.

Please upgrade to [the current release](/downloads/).

Please consider subscribing to our
[Security Advisories RSS feed](/rss/) to receive timely notifications.

{{% children description=false grid-cols=1 %}}


