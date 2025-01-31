---
menutitle: "Parameters"
title: "Artifact Parameters"
date: 2025-01-25
draft: false
weight: 10
---

Artifact parameters allow the user to customize the collection in a
controlled way - without needing to edit the VQL. The GUI will present
a form that allows the user to update the parameters prior to each
collection.

Parameters may define a type. This type will be used to hint to the
GUI how to render the form element. The type also determines how the
parameter is sent to the client and ensures the parameter appears as
that type in the query.

Prior to launching the query on the endpoint, Velociraptor will
populate the scope with the parameters. This allows the VQL query to
directly access the parameters.

Artifact parameters are sent to the client as strings The client
automatically parses them into a VQL type depending on the parameter's
type specification.  The GUI uses type specification to render an
appropriate UI

## Parameter fields

The parameter **name** is the only required field. If nothing else is specified
to further describe tha parameter then it is by default a text field; that is a
simple text string.

However each parameter can optionally have any of several attributes that
specify the parameter type and additional information that is used by the GUI
for displaying and editing the parameter.

[Descriptions of the parameter fields](https://github.com/Velocidex/velociraptor/blob/52dc005b1594723716dc6b3e3a7a719a885b74ef/docs/references/server.config.yaml#L1050)
- name
- description
- default
- type
- friendly_name
- validating_regex (this is just a visual indicator. It will not stop you from running the artifact)
- artifact_type (only used for type = artifactset)




## Parameter types

Currently the following parameter types are supported

- artifactset
- csv
- bool
- choice
- float
- hidden
- int / integer / int64
- json
- json_array / regex_array / multichoice https://github.com/Velocidex/velociraptor/pull/3392
- redacted
- string / regex / yara	- (these types are passed through unparsed)
- server_metadata
- starlark
- timestamp
- upload
- upload_file
- xml
- yaml
- yara_lint?


* **int, integer**: The parameter is an integer
* **timestamp**: The parameter is a timestamp
* **csv**: Parameter appears as a list of dicts formatted as a CSV
* **json**: Parameter is a JSON encoded dict
* **json_array**: The parameter is a list of dicts encoded as a JSON blob (similar to csv)
* **bool**: The parameter is a boolean (TRUE/YES/Y/OK)


## How parameters are processed

Parameters are essentially VQL variables. The values are converted to the
specified data type at runtime.
- Demonstrate this:
   - using typeof()
   - by overriding a parameter value with a VQL assignment.
