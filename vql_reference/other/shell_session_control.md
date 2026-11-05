# shell_session_control



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
name|The name of the shell session.|string
stdin|Write this string to the session stdin.|string
close_stdin|If specified we close the stdin of the session. This will usually terminate the session gracefully.|bool
kill|If specified we kill the session.|bool

**Required permissions:** `EXECVE`

### Description

Control a previously created shell session.


