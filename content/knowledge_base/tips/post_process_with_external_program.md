# How to automatically post process flows with an external program.

Sometimes we want to automatically post process a collection using an
external program - for example a Python script. This short article
will illustrate how to launch a python program automatically to post
process a collection.

For our example we will write a Python program to post process the
`Generic.Client.Info` artifact. As soon as the artifact is collected
we want to extract the `Hostname` field from the `BasicInformation`
source and greet the host with a welcome message.

## 1. Finding the result files in a flow.

Velociraptor collects artifacts in `Flows` which are stored as a
collection of files within the VFS. You can see all the files in a
particular flow using the `enumerate_flow()` plugin:

```sql
SELECT * FROM enumerate_flow(client_id=ClientId, flow_id=FlowId)
```

![Enumerating Flow Files](enumerate_flow.png)

You will notice that each file has a `Type` field and the path to the
file is given using the file store path. This allows the file to be
opened using the `fs` accessor in VQL.

However to receive the full file on disk, the `file_store()` function
can be used.

When collecting an artifact, each source query in the artifact is
stored in a single file on disk. In our case we want to know the file
that contains the `BasicInformation` source:

```sql
SELECT file_store(path=Data.VFSPath) AS Path
FROM enumerate_flow(client_id=ClientId, flow_id=FlowId)
WHERE Type = "Result" AND Path =~ "BasicInformation"
```

## 2. Launching the Python program

Now that we can find the path to the correct file, we need to launch
an external program to receive this path.

Let's encapsulate the logic in a VQL function:

```sql
LET _GetPath(ClientId, FlowId) =
  SELECT file_store(path=Data.VFSPath) AS Path
  FROM enumerate_flow(client_id=ClientId, flow_id=FlowId)
  WHERE Type = "Result" AND Path =~ "BasicInformation"

LET GetPath(ClientId, FlowId) = _GetPath(ClientId=ClientId, FlowId=FlowId)[0].Path

SELECT *
FROM execve(argv=["python.exe", "C:/MyScript.py", GetPath(ClientId=ClientId, FlowId=FlowId)])
```

This query will extract the path to the `BasicInformation` source and
launch my python script, while passing it the path to the result set.

While working in a notebook I can iterate on developing my python
script by recalculating the cell all the time.

![Iterating development of the python script](iterating_dev.png)

My goal is to write a python script which reads the result set from
disk (which is just a line separated `JSON` file), then extracts the
`Hostname` column. Finally the python program will emit a `JSON`
object per line into `Stdout`

```python
import sys
import json

if __name__ == "__main__":
    PathName = sys.argv[1]
    with open(PathName, mode="r") as fd:
        for line in fd.readlines():
            try:
                data = json.loads(line)
                response = dict(Greeting = "Hello " + data["Hostname"])
                print(json.dumps(response))
            except Exception as e:
                print("Exception %s" % e)
                continue
```

Now that I have a python program which generates a JSON object per
line, I can expand the JSON object into a row using the `foreach()`
plugin:

```sql
LET _GetPath(ClientId, FlowId) =
  SELECT file_store(path=Data.VFSPath) AS Path
  FROM enumerate_flow(client_id=ClientId, flow_id=FlowId)
  WHERE Type = "Result" AND Path =~ "BasicInformation"

LET GetPath(ClientId, FlowId) = _GetPath(ClientId=ClientId, FlowId=FlowId)[0].Path

SELECT *
FROM foreach(row={
    SELECT parse_json(data=Stdout) AS Row
    FROM execve(argv=["python.exe", "C:/MyScript.py",
                  GetPath(ClientId=ClientId, FlowId=FlowId)])
  },
  column="Row")
```


## 3. Automating post processing.

So far I was working in a notebook, but now I want to write the
artifact that will trigger it automatically. I want the server itself
to monitor when a new `Generic.Client.Info` collection is made and
automatically post process it - So I need a `Server Event Monitor`
artifact.

When a collection is complete, the server emits a
`System.Flow.Completion` event, which I can watch using
`watch_monitoring()`. I can then filter collection by the artifacts
they found to obtain the `ClientId` and `FlowId`.

Putting it all together:

```sql
LET Completions = SELECT FlowId, ClientId
   FROM watch_monitoring(artifact='System.Flow.Completion')
   WHERE Flow.artifacts_with_results =~ "Generic.Client.Info/BasicInformation"

LET PostProcess(ClientId, FlowId) = SELECT *
   FROM foreach(row={
      SELECT parse_json(data=Stdout) AS Row
      FROM execve(argv=["python.exe", "C:/MyScript.py",
                  GetPath(ClientId=ClientId, FlowId=FlowId)])
    },
    column="Row")

LET _GetPath(ClientId, FlowId) =
  SELECT file_store(path=Data.VFSPath) AS Path
  FROM enumerate_flow(client_id=ClientId, flow_id=FlowId)
  WHERE Type = "Result" AND Path =~ "BasicInformation"

LET GetPath(ClientId, FlowId) = _GetPath(ClientId=ClientId, FlowId=FlowId)[0].Path

SELECT * FROM foreach(row=Completions, query={
  SELECT * FROM PostProcess(ClientId=ClientId, FlowId=FlowId)
})
```

I can test this in a notebook and see it works!

## 4. Convert to an artifact and install

My Final artifact looks like this

```yaml
name: Custom.BasicInformation.EnrichPython
type: SERVER_EVENT
sources:
  - query: |
        LET Completions = SELECT FlowId,
                                 ClientId
          FROM watch_monitoring(artifact='System.Flow.Completion')
          WHERE Flow.artifacts_with_results =~ "Generic.Client.Info/BasicInformation"

        LET PostProcess(ClientId, FlowId) = SELECT *
          FROM foreach(row={
            SELECT parse_json(data=Stdout) AS Row
            FROM execve(argv=["python.exe", "C:/MyScript.py",
                          GetPath(ClientId=ClientId, FlowId=FlowId)])
          },
                       column="Row")

        LET _GetPath(ClientId, FlowId) = SELECT file_store(path=Data.VFSPath) AS Path
          FROM enumerate_flow(client_id=ClientId, flow_id=FlowId)
          WHERE Type = "Result"
           AND Path =~ "BasicInformation"

        LET GetPath(ClientId, FlowId) = _GetPath(ClientId=ClientId, FlowId=FlowId)[0].Path

        SELECT *
        FROM foreach(row=Completions,
                     query={
            SELECT *
            FROM PostProcess(ClientId=ClientId, FlowId=FlowId)
          })
```

I can add it and install it as a server event monitor. Then each time I
collect `Generic.Client.Info` the artifact will automatically post
process the results.

![Post processing the collections with Python!](server_event_artifact.png)


This quick example shows how to automatically post process collections
with external programs. You need to be able to shell out to the
external program which will run on the server. We used Python in this
example just for illustration purposes but you can use any language to
write the external program.

You can also use `watch_monitoring()` with the name of the new
artifact to watch for post processed results as well! ... `We need to
go deeper!` - for example use `Elastic.Events.Upload` to upload those
to Elastic.

Tags: #vql
