---
menutitle: "Artifact Writing Tips"
title: "Artifact Writing Tips"
date: 2025-01-25
draft: false
weight: 160
summary: "Advice for writing and testing artifacts"
last_reviewed: 2025-04-30
---

## Development and testing workflow

Typically we have a new idea for a new data collection or anomaly detection. The
following is a suggested workflow for creating and testing the VQL to implement
your idea, and then packaging it into an reusable artifact.

**1. Set up an artifact development environment**

- The first step is to develop the VQL that will achieve your goal by writing
  the VQL in a [notebook]({{< ref "/docs/notebooks/" >}}) on the target
  operating system itself. You can instantly set up such a VQL development
  environment by running `velociraptor gui` on the target operating system.
  This will start a [self-contained Velociraptor server]({{< ref "/docs/deployment/#instant-velociraptor" >}})
  which includes a single built-in client.

- Velociraptor global notebooks are actually a special kind of artifact where
  each cell corresponds to an artifact source. You can create a
  [notebook template]({{< ref "/docs/artifacts/notebook_templates/" >}})
  that defines your parameters, tools, imports and exports - almost anything
  you would need in a normal artifact. Notebooks also support file "uploads"
  if you need to use that function within your VQL.

**2. Develop your VQL**

- While developing the VQL, use VQL's `log()` function liberally to provide
  helpful debugging info.

- Use the `typeof()` function to learn about the data types for values returned
  by your queries.

- You can also add the `EXPLAIN` directive to your `SELECT` statements to
  produce detailed information in the VQL log.

- You can remove the above from your final artifact, but it's probably best to
  keep them in your VQL until _after_ you have moved the VQL into your final
  (non-notebook) artifact and successfully tested it.

**3. Copy the VQL to your final artifact**

- You can also create your final artifact in the same self-contained test
  environment. Just copy the VQL from your notebook cell into a source in your
  artifact.

- When you're ready to test your artifact you can run a collection test against
  the local built-in client (if it's a client artifact) or on the server itself
  (if you're developing a server artifact).

**4. Move your artifact to your deployed Velociraptor server and test**

- It's always crucial to perform limited testing of new artifacts before
  deploying them in a fleet-wide hunt. Always test your artifact by collecting
  it against a small number of clients. If your production environment has a
  diverse set of operating systems or OS versions then try to ensure that your
  test targets are sufficiently representative of your endpoint environment.


## Tips for creating better artifacts

While writing good VQL queries is the main challenge when creating artifacts,
it's worth considering polishing other aspects of your artifacts to make them
more user-friendly, comprehensible, and maintainable. A well-crafted artifact is
one that's easy to understand and improve upon - even if you haven't looked at
it for a year.

Here are a few ideas and things to consider that could improve the quality of
your artifacts.

### Descriptions

- Ensure that your artifacts have sufficient information in the `description`
  field to guide users on it's correct usage, especially if the artifact has
  complicated logic or has many parameters. It's good to explain conditions
  under which the artifact is expected to work, or conditions under which the
  artifact may not work (if there are any).

- Try to start the artifact description with a short **lead sentence** which
  summarizes the purpose of the artifact. For example: _"Reports network
  connections and enriches them with process information"_. This lead sentence
  makes it easy for users to understand the artifact's purpose at a glance and
  quickly find the artifact they are looking for without having to read the
  entire description. Avoid starting the artifact description with "This
  artifact..." because it's superfluous wording when a user has selected it and
  is looking at the artifact in the GUI's artifact viewer - you should rather
  get straight to the point of describing what it does.

- Include relevant **keywords** in your artifact's description since the
  entire field is added to the artifact search index which means users will be
  able to find it by searching for your keywords. For example, if your
  artifact's name is "Windows.Forensics.Shellbags" then make sure you also
  include the word "registry" somewhere in the description. That way users
  searching for registry-related artifacts can search for the word "registry"
  and your artifact will be included in the results.

- If you have included external links in your `description` field then consider
  making them **references** instead. That is unless you need the external links
  to be searchable since the `reference` field is _not_ indexed for GUI artifact
  searches.

- If your artifact was tested against a specific operating system version or
  data from a particular application/API version then it's helpful to include
  those details in the description. This helps others to identify potential
  causes if your artifact unexpectedly stops working in future.

- If your artifact description needs to include URLs that you _don't_ want turned
  into clickable hyperlinks then enclose them in backticks. In addition you
  could also defang those URLs to be even safer.

- Artifacts descriptions are rendered as HTML in various places within the GUI.
  The HTML level 2 heading is used for the artifact name, and level 3 headings
  are used for subsections of the artifact. So if you want to include headings
  in your artifact description markdown (for example "Notes" or Usage"), then it
  is best if you make those headings level 3 (e.g. `### Notes`) or below so that
  they fit in nicely with the other headings.

### References

- If your artifact encompasses complex ideas that cannot be described in the
  `description` field for practical reasons, then consider including links to
  external information sources in the `reference` field.

- It's good etiquette to provide links and credits in the `reference` field if
  the artifact is based on research, processes, or algorithms published by other
  people or projects.

### Author

- If you are planning to make your artifact public then it's a good idea to use
  the `author` field and include some information which will allow others to
  contact you (if you don't mind that). It doesn't need to be your real name -
  it could be you GitHub or social media handle or anonymous email address. If
  other users find issues they may want to report these to you directly.

### Parameters

- If possible, try to ensure that your artifact includes **parameter defaults**
  for all parameters. A well-designed artifact should not fail when it's run
  without any parameter customization. Users have a general expectation that
  just running an artifact, without customizing the parameters, should not
  result in an errored collection. At worst the artifact should possibly return
  no data and then ideally also produce a meaningful log message.

- Make full use of the user-oriented features that are available for parameters.
  For example, use the `description`, `friendly_name`, and `validating_regex`
  fields whenever appropriate. These parameter properties affect how parameters
  are presented in the GUI and are intended to guide users towards making the
  correct choices when customizing artifact parameters.

### Sources

- If you have more than one source it's best to give each source a name.

- If you find that you repeating any of the same VQL queries in multiple
  artifact sources then you might consider consolidating them in the `export`
  section. Remember that VQL in the `export` section is run before VQL in all
  `sources`. Custom functions, variables and query results from `export` are
  available to all sources.

- Well-structured VQL with helpful inline comments is the ideal way to make your
  artifacts comprehensible to others. Try out the
  [Reformat VQL]({{< ref "/docs/gui/artifacts/#editor-preferences-and-vql-reformatting" >}})
  button in the artifact editor.
