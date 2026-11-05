# UnifiedLogHunter regression tests

These integration tests run the actual artifact, VQL engine, and `execve`
plugin against a synthetic `log` executable. They use no host Unified Logs,
server, external service, or third-party Python package.

Requirements: macOS, Python 3, and a local Velociraptor binary. Validation is
on macOS arm64 with Velociraptor 0.77.3. Other platforms raise an explicit
error, not an all-skipped success. The direct Artifact plugin disables
preconditions by default; the platform restriction reflects validation of
this harness, not a requirement imposed by that plugin.

From the repository root:

```sh
VELOCIRAPTOR_BINARY=/absolute/path/to/velociraptor \
  python3 scripts/tests/test_unified_log_hunter.py
```

Each test creates a temporary directory and loads this artifact only. The
child's private PATH contains only the fixture directory, including a Python
symlink; a broken fixture cannot fall back to the host's `log`. Existing
Velociraptor configuration variables are excluded from the child environment.
Invocation receipts verify that every selected predicate ran, with expected
arguments, and finished (except intentional signal termination).

The 25 cases cover successful/empty output, warnings, failed exits, launch
failure, non-executable fixtures, partial output, signals, repeated and
concurrent filters, literal format characters, and stdout/stderr chunking.
Boundary cases check complete JSON exactly at `Length` and the same document
followed by a newline in another chunk. Explicit result values and column
order are checked. The Artifact plugin appends `_Source` as the artifact
identity, so that assertion does not validate the native `source` projection.

Nonzero command status logs ERROR and causes CLI status 1 while preserving
any parsed events. Stderr is logged as WARN. Warning-only output keeps CLI
status 0, but server flows can promote warning text to ERROR using the
server's error regex. A regression prevents the warning template itself from
manufacturing `error:` after a predicate ending in `error`.

Intermediate stdout chunks trigger an ERROR for possible incompleteness.
This is conservative: even a complete JSON array plus trailing whitespace
can cross the buffer boundary. Parsed events are retained; the diagnostic
does not recover split JSON. Increase `Length` and rerun. Buffer diagnostics
request the default logging deduplication window for each formatted predicate
message. Deduplication is best effort: concurrent filters can produce duplicate
buffer messages. Stderr fragments and nonzero statuses are not deduplicated.

To test a different artifact, set `UNIFIED_LOG_HUNTER_ARTIFACT` to its absolute
path. To save per-invocation commands, results, hashes, and fixture receipts,
set `UNIFIED_LOG_HUNTER_EVIDENCE_DIR` to a **new, nonexistent directory**. An
existing directory is rejected to protect earlier evidence. Receipts include
local temporary paths; review them before sharing.

These tests establish CLI behavior for controlled command output. They do
not establish native predicate semantics, server flow transitions, access
to every log source, timeout handling, or collection completeness. They are
manually runnable and are not wired into upstream CI. The static check is:

```sh
/absolute/path/to/velociraptor artifacts verify --nowall \
  content/exchange/artifacts/MacOS.UnifiedLogHunter.yaml
```
