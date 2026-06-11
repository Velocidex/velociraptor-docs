---
title: Creating Your First Notebook
menutitle: Your First Notebook
date: 2021-06-11T15:32:04Z
last_reviewed: 2026-06-11
draft: false
weight: 36
summary: |
  Walk through creating a notebook, adding cells, and running VQL
  queries step by step.
description: |
  Walk through creating a notebook, adding cells, and running VQL
  queries step by step.
---

This walkthrough shows you how to create a notebook, add cells, and
run VQL queries in the Velociraptor GUI.

## Create a notebook

1. Select **Notebooks** <i class="fas fa-book"></i> from the sidebar
   menu, then select **Add Notebook** <i class="fas fa-plus"></i>.

   ![Add Notebook](notebook_add.png)

2. Give the notebook a name and a description, then submit. The new
   notebook appears in the notebook list.

   ![New Notebook](new_notebook.png)

3. Click the notebook to open it. You will see a single markdown cell
   with a welcome message.

## Edit a cell

1. Click the cell to give it focus. When it has focus, the cell
   control toolbar appears above it.

   ![Editing a cell](image13.png)

2. Click the **Edit Cell** <i class="fas fa-pencil-alt"></i> button to
   edit the cell contents.

You can change a cell's type between `Markdown` and `VQL` at any time
using the dropdown on the right side of the cell toolbar. A Markdown
cell displays formatted text. A VQL cell runs a query and shows the
results.

{{% notice tip "Focus and appearance" %}}

A notebook consists of a sequence of cells. When a cell is not in
focus it has no visible decorations, so the document appears as a
seamless whole. You must click a cell to bring it into focus before
you can see its controls.

![Notebook cell without focus - no decorations visible](../notebook_edit1.svg)

{{% /notice %}}

## Add a VQL cell

1. Click the **Add Cell** button <i class="fas fa-plus"></i>.
   A dropdown menu offers the types of cell you can add.

   ![New cell](new_cell.png)

2. Select **VQL**. A new VQL cell appears above the current cell.

   ![Edit cell](new_cell2.png)

3. Click **Edit Cell** <i class="fas fa-pencil-alt"></i> to open the
   cell editor.

As you type, the GUI offers context-sensitive suggestions for VQL
keywords, plugins, and functions. Use the up and down arrow keys to
navigate, and press Enter or Tab to select a suggestion. Press "?" at
any time to see all possible completions.

![VQL auto-suggestions](../autosuggest.png)

## Run a query

Type the following VQL into the cell:

```vql
SELECT * FROM info()
```

![Basic query](basic.png)

The query returns basic information about the Velociraptor server.

{{% notice tip "Context-sensitive suggestions" %}}

VQL suggestions adapt to where you are in the statement. For example,
plugins that only make sense after a `FROM` clause are suggested only
when the cursor is positioned after one.

{{% /notice %}}

## What you have created

The notebook you just created is a **Global Notebook**. It lives in
the notebook list until you delete it. It is visible only to you
unless you share it.

From here you can:

- Add more cells and build a report
- Explore the [templates](/docs/notebooks/templates/) page to learn
  how to create your own notebook templates
- Read about [sharing](/docs/notebooks/sharing/) notebooks with other
  users
- Return to the [notebooks overview](/docs/notebooks/) for a
  conceptual explanation of the notebook system
