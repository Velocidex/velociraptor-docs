# shell_session



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
argv|Argv to run the command with.|list of string (required)
env|Environment variables to launch with.|ordereddict.Dict
cwd|If specified we change to this working directory first.|string
secret|The name of a secret to use.|string
name|The name of the shell session. If the session already exists, we just return a handle to it.|string

**Required permissions:** `EXECVE`

### Description

Recreate or retrieve a shell session handle.


