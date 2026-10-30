---
type: docs
cascade:
  type: docs
menutitle: "Knowledge Base"
title: "Knowledge Base"
date: 2022-03-21
draft: false
weight: 250
no_edit: true
disableToc: false
no_children: true
noDisqus: true
rss_data_file: static/kb/data.json
rss_title: Velociraptor Knowledge Base
outputs:
- html
- RSS
- markdown
description: |
  Velociraptor is a powerful but very flexible tool. Sometimes getting
  up to speed with Velociraptor is challenging and sometimes it can do
  things that you have never even imagined was possible!
---

Velociraptor is a powerful but very flexible tool. Sometimes getting
up to speed with Velociraptor is challenging, and sometimes it can do
things that you never imagined were possible.

This section of the site shares the community's experiences, tips and
tricks for getting specific tasks done. The key is asking a question:
"What task are we trying to achieve?" Each knowledge base article
answers one of those questions, so search the list below for the task
you have in mind.

## Sharing your own tip

{{% expand "[click to expand]" %}}

A knowledge base tip answers one specific question, and should get a
reader through an immediate need quickly, even if they are not familiar
with Velociraptor or DFIR in general. Keep it short, and point readers
at further reading or related articles where that helps.

To contribute, click **Contribute** at the end of this section. You will
be taken to GitHub, where you can create a new article from the template
below. Give the file a descriptive name before you open the pull
request: the article is plain markdown.

Start with a title in the form of a question or task. The site uses the
first heading as the article's title in the knowledge base search.

```markdown
# How do I search for malicious downloads?

A short description of the article.

The rest of the article is normal markdown.
Paste screenshots into the GitHub editor to
include them.

Tags: #deployment, #vql
```

Add a line starting with `Tags:` followed by hashtags, as shown above.
The site removes that line from the article and shows the tags with its
entry in the list below.

When the article is finished, save it to a local branch and open a pull
request.

<div class="not-prose">
  <a href="https://github.com/Velocidex/velociraptor-docs/new/master/content/knowledge_base/tips"
     target="_blank" rel="noopener"
     class="expand-button hx:mt-4 hx:inline-flex hx:items-center hx:gap-2 hx:rounded-md hx:bg-primary-600 hx:px-4 hx:py-2 hx:font-bold hx:text-white hx:hover:bg-primary-500">
    Contribute
  </a>
</div>

{{% /expand %}}

{{< knowledge_base >}}
