---
menutitle: "Parameters"
title: "Artifact Parameters"
date: 2025-01-25
draft: false
weight: 20
summary: "Artifacts parameters and how they work"
last_reviewed: 2025-05-13
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
type specification. The GUI uses type specification to render an
appropriate UI

Artifacts may accept parameters which are added to the
scope prior to execution.


There is no way to make a parameter require a value. You should ensure that your
parameters either have a sensible default value or design your artifact in such
a way that it doesn't fail, or fails gracefully (for example, by providing a
user-friendly log message) if no value is specified. The `validating_regex`
field can be used to indicate to the user that their entered value is not valid.

## Parameter fields

For parameters `name` is the only required field. If nothing else is specified
to further describe tha parameter then it is by default a text field; that is a
simple text string.

However each parameter can optionally have any of several attributes that
specify the parameter type and additional information which is used by the GUI
for displaying and editing the parameter.

[Descriptions of the parameter fields](https://github.com/Velocidex/velociraptor/blob/52dc005b1594723716dc6b3e3a7a719a885b74ef/docs/references/server.config.yaml#L1050)
- name
- description
- default
- type
- friendly_name
- validating_regex (this is just a visual indicator. It will not stop you from running the artifact)
- artifact_type (string: only used for type = artifactset)
- sources (bool: only used for type = artifactset)


### Parameter types

Currently the following parameter types are supported

* **int, integer**: The parameter is an integer
* **timestamp**: The parameter is a timestamp. The GUI will present a time widget to assist you in selecting a timestamp
* **csv**: Parameter appears as a list of dicts formatted as a CSV. The GUI will present a CSV editor to assist in pasting or editing structured CSV data.
* **json**: Parameter is a JSON encoded dict
* **json_array**: The parameter is a list of dicts encoded as a JSON blob (similar to csv)
* **bool**: The parameter is a boolean (TRUE/YES/Y/OK)
* **int**, **in64**, **integer**: The parameter is an integer.
* **float**: The parameter is a float.
* **string**: The parameter is a string (the default type)
* **regex**: The parameter is a Regular Expression. The GUI will present a Regular Expression editor to help you write it.
* **redacted**: The parameter should be redacted. The value of this parameter is redacted in the request or other places where it may be logged.
* **upload**: The parameter contains a string which is uploaded from a file. NOTE- this is limited to 4mb - if you need larger files use `upload_file`. The GUI will present a file upload widget to allow you to upload a file for this request only!
* **upload_file**: The parameter will be the name of a temporary file on the endpoint containing the contents of the uploaded file.
* **server_metadata**: The server will populate this parameter from the server metadata service prior to launching the artifact. The parameter will not be settable in the GUI
* **artifactset**: A set of artifacts. This is probably only useful on server
  artifacts as clients do not have access to arbitrary artifacts. You must also
  include the `artifact_type` parameter which can be `CLIENT`, `SERVER`,
  `CLIENT_EVENT`, `SERVER_EVENT`, `NOTEBOOK`
* **json**, **json_array**, **xml**, **yaml**: This is a data blob encoded as a string.


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

All parameters are defined as strings. The values are then converted to the
specified data type at runtime.

- Demonstrate this:
   - using typeof()
   - by overriding a parameter value with a VQL assignment.

Parameters are essentially VQL variables. That is they are accessible in VQL as
variables, and their data type will correspond to the parameter's type.