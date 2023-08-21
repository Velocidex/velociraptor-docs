# How to increase notebook timeout

In the notebook, VQL queries are limited to 10 minutes. Once the timeout is expired, the query is cancelled.
Regular collections from clients also have a timeout, that timeout can be changed in the new collection wizard GUI to give the query more time.

But there is no similar control for the notebook cells. In the notebook, the time limit serves to limit server load - because the notebook queries are run on the server we don't want them to take too long or make it too easy to extend the timeout too long.

If you find that your cell query is routinely exceeding the timeout, you can use one of the following approaches:

1. Make the query more efficient - for example using multi-threaded queries or the `parallelize()` plugin.

2. Turn the query into a server artifact. Large queries are often very reusable and if you can turn it into an artifact, it might be useful again. Running a server artifact allows the timeout to be increased if needed.

3. As a last resort update the default notebook timeout in the configuration file. Find or add the section called `defaults` and add the following setting:

```yaml
Frontend:
... other settings ...
defaults:
    notebook_cell_timeout_min: 20
```

Tags: #configuration
