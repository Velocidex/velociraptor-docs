---
title: "Notebooks"
date: 2021-06-11T15:32:04Z
draft: false
weight: 20
---

Notebooks are interactive collaborative documents which can interleave
markdown and VQL queries in to create an interactive report. Notebooks
are typically used to track and post process one or more hunts or
collaborate on an investigation.

Let's create a notebook to see the feature at work.

1. Start the Velociraptor GUI. You can do so easily by running
   `velociraptor.exe gui`. This will create a new server configuration
   and start a new server on the local machine. It will also start a
   local client communicating with the server.

![velociraptor GUI](image5.png)

2. Select Notebooks <i class="fas fa-book"></i> from the sidebar menu then "Add Notebook" <i class="fas fa-plus"></i>.

3. Give the notebook a name and a description and submit. The new
   notebook is created.

![New Notebook](new_notebook.png)

{{% notice tip %}}

A notebook consists of cells which may be edited. However, when not in
focus a cell has no decorations in order to appear as a seamless part
of a larger document. You have to click the cell into focus to be able
to see it's controls.

{{% /notice %}}

4. Click on the cell to give it focus and the cell control toolbar
   will be shown, from here click the `Edit Cell` <i class="fas
   fa-pencil-alt"></i> button to edit the cell contents.

![New Notebook](image13.png)

There are two types of cells: A `Markdown` cell receives markdown text
and renders HTML while a `VQL` cell can receive VQL queries. The cell
type is shown on the right hand side of the cell toolbar. You may
change cells from one type to the other at any time.

5. Lets add a new cell to the notebook. Click the `Add Cell` button <i
   class="fas fa-plus"></i> and a pull down menu appears offering the
   type of Cell that can be added. For now, select a `VQL` cell.

![New Notebook](new_cell.png)

After click the `Edit Cell` button, You can type VQL directory into
the cell. As you type, the GUI offest context sensitive suggestions
about what possible completions can appear at the cursor. Typing "?"
will show all suggestions possible.

{{% notice tip %}}

Suggestions are context sensisive, so VQL plugins which can only
appear after a `FROM` clause will only be suggested when the cursor
appears are FROM.

{{% /notice %}}

![New Notebook](add_cell.png)

Lets type the following VQL query into the VQL cell.

```sql
SELECT * FROM info()
```

![Basic query](basic.png)
