
# How can I make a multipart/form-data POST request in VQL


_NOTE: The technique described in this article should no longer be necessary
since the`http_client` plugin now
[supports multipart uploads]({{< ref "/vql_reference/popular/http_client/#example---uploading-files" >}}).
However this information may still be useful in certain circumstances and for
providing insight into advanced VQL._

---

VQL can be used to make http requests using the `http_client()`
plugin. While `GET` requests are usually pretty straight forward,
sometimes we need to upload using something called
`multipart/form-data` POST. What is it and how can VQL do this?

## What is `multipart/form-data` POST?

This is a standard way of serializing multiple "parts" into a single
request. A "part" here is a value of a parameter or usually a
file. Traditionally this came from a HTML "form" element, but often
these are used for APIs now without a browser interface at all.

The idea is that we define a "boundary" - a special string which is so
unique it might not appear accidentally in the data, then we separate
the parts using this boundary:

```
--boundary
Headers

Data
--boundary
Headers

Data
--boundary--
```


1. Each part starts with "--" followed by the boundary and a line feed.
2. Next come the headers which describe things about this part
   followed by two line feeds.
3. Next come the body of the part
4. Finally after the last part, the end is signaled by "--" followed
   by the boundary and another "--" followed by new line.


The most confusing part of this is that when looking at examples, the
boundary is often something like
`-----------------------------9051914041544843365972754266` making it
virtually impossible to see the extra "--" at the start and end (you
have to carefully count to realize the boundary header adds two
extra dashes!).

## Combining in VQL

Anyway once the whole this is demystified it is really easy to create
this in VQL. Here is an example:

```vql
LET Boundary = "-----------------------------9051914041544843365972754266"

-- A Helper function to make a regular form variable.
LET Data(Name, Value) = format(
  format='--%s\r\nContent-Disposition: form-data; name="%s"\r\n\r\n\r\n%v\r\n',
  args=[Boundary, Name, Value])

-- A Helper function to embed a file content.
LET File(Filename, ParameterName, ContentType, Data) = format(
  format='--%s\r\nContent-Disposition: form-data; name="%s"; filename="%s"\r\nContent-Type: %s\r\n\r\n%v\r\n',
  args=[Boundary, ParameterName, Filename, ContentType, Data])

-- The End boundary signals the last part
LET END = format(format="%s--\r\n", args=Boundary)

-- Now make the HTTP request and post the form
-- Remember the Content-Type header which includes the boundary!
SELECT * FROM http_client(
  method="POST",
  url="http://www.example.com/formhandler",
  headers=dict(`Content-Type`="multipart/form-data; boundary=" + Boundary),
  data=Data(Name="name", Value="Bar") +
       File(Filename="Hello.txt", ParameterName="file_upload", ContentType="text/plain", Data="this is a test") +
       END)
```

In this example I used some utility functions to make it easier to build the
different parts and make sure the encoding structure is always correct.

Tags: #vql
