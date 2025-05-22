---
menutitle: "CLI flags"
title: "Global CLI flags"
date: 2025-05-20
draft: false
weight: 130
Summary: CLI flags that are available for all commands.
---

These CLI flags are available for all commands (but may not be relevant to all).

```text
-h, --[no-]help                Show context-sensitive help (also try --help-long and --help-man).
    --remap=REMAP              A remapping configuration file for dead disk analysis.
    --[no-]nobanner            Suppress the Velociraptor banner
    --[no-]debug               Enables debug and profile server.
    --debug_port=6060          Port for the debug server.
-c, --config=CONFIG            The configuration file.
    --embedded_config=EMBEDDED_CONFIG
                                Extract the embedded configuration from this file.
-a, --api_config=API_CONFIG    The API configuration file.
-o, --config_override=CONFIG_OVERRIDE
                                A json object to override the config.
    --runas=RUNAS              Run as this username's ACLs
    --definitions=DEFINITIONS  A directory containing artifact definitions
    --[no-]nocolor             Disable color output
-v, --[no-]verbose             Enabled verbose logging.
    --profile=PROFILE          Write profiling information to this file.
    --profile_duration=PROFILE_DURATION
                                Generate a profile file for each period in seconds.
    --trace=TRACE              Write trace information to this file.
    --[no-]trace_vql           Enable VQL tracing.
    --logfile=LOGFILE          Write to this file as well
    --tempdir=TEMPDIR          Write all temp files to this directory
    --[no-]prompt              Present a prompt before exit
    --max_wait=10              Maximum time to queue results.
    --timezone=TIMEZONE        Default encoding timezone (e.g. Australia/Brisbane). If not set we use UTC
```
