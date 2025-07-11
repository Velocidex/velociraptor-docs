---
menutitle: "query"
title: 'The "query" command'
date: 2025-07-05
draft: false
weight: 70
summary: Run VQL queries on the command line.
---

Run VQL queries on the command line.

For more information, see
[Deployment > Command line investigation tool]({{< ref "/docs/deployment/#command-line-investigation-tool" >}}).


---

## [ query ]

```text
query [<flags>] <queries>...
    Run a VQL query

    -f, --[no-]from_files  Args are actually file names which will contain the VQL query
        --timeout=0        Time collection out after this many seconds.
        --org="root"       The Org ID to target with this query
        --cpu_limit=0      A number between 0 to 100 representing maximum CPU utilization.
        --format=json      Output format to use (text,json,csv,jsonl).
        --dump_dir=""      Directory to dump output files.
        --output=""        A file to store the output.
        --env=ENV ...      Environment for the query.
        --scope_file=""    Load scope from here. Creates a new file if file not found
        --[no-]do_not_update_scope_file
                           Do not update the scope file with the new scope

Args:
  <queries>  The VQL Query to run.
```
