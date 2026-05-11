# Reference list of known VQL DEFAULT-level errors

Many native VQL functions and plugins log errors at level `DEFAULT`
rather than `ERROR`. Some of these should arguably be `WARN` or
`ERROR`, but in many cases it is up to the caller to decide whether
the VQL has failed.

When monitoring errors from event artifacts, you should consider
including some of these `DEFAULT`-level log messages in your alerting
filters. This is done in `IncludeFilter` in the artifacts
[`Server.Monitor.Errors.Alert`](/exchange/artifacts/pages/server.monitor.errors.alert/)
and
[`Server.Monitor.Client.Errors.Alert`](/exchange/artifacts/pages/server.monitor.client.errors.alert/).

See [How to monitor event artifact errors](/knowledge_base/tips/monitoring_artifact_errors/)
for the surrounding setup.

{{% notice tip %}}
Use the configuration setting
[collection_error_regex](/docs/deployment/references/#Frontend.collection_error_regex)
(default "ERROR:") to mark a client collection as failed when log
entries match a regex.
{{% /notice %}}

## Why this is not the artifact's default

In some cases an error from a function is critical, in other cases it
is expected. For example:

- A failing [`read_file`](/vql_reference/popular/read_file/) is fatal
  if the artifact's job is to read that file, but expected if the call
  is a best-effort probe.
- A failing [`parse_json`](/vql_reference/parsers/parse_json/) loses
  data if it is part of the artifact's main parsing step, but is
  harmless on an optional enrichment.
- An [`upload_S3`](/vql_reference/other/upload_s3/) retry exhaustion
  should most likely be considered a serious error. However, it really
  depends on the data you are uploading, and the importance of not
  losing any information.
- A [`glob`](/vql_reference/popular/glob/) permission denial is normal
  during a recursive walk. The same message from a single targeted
  lookup is a real problem.

Severity also varies with the deployment. A
[`splunk_upload`](/vql_reference/other/splunk_upload/) failure could
be `low` for someone forwarding only debug events, and `high` for
someone whose entire detection pipeline depends on it.

For these reasons the alert artifacts ship with a deliberately
conservative default: match `ERROR` and nothing else — so they do not
spam alerts out of the box. Copy the rows whose failure modes matter
to you, adjust artifact and severities to your environment, and place
specific patterns above broader catch-alls (rows are evaluated
top-to-bottom and the first match wins).

## The reference list

```csv
Artifact,Level,Message,Severity,Explanation
.+,ERROR,.+,high,
.+,WARN,.+,medium,
.+,DEFAULT,ERROR:execve: .+,high,Shell command failed to launch or run.
.+,DEFAULT,execve: fork/exec .+: no such file or directory,high,Executable not found.
.+,DEFAULT,execve: Not allowed to execve by configuration,high,Shell execution blocked by client config.
.+,DEFAULT,ERROR:query: Permission required for runas: .+,high,query() denied: caller lacks the IMPERSONATION ACL required for run-as.
.+,DEFAULT,ERROR:query: query should be a string or subquery,high,query() called with wrong argument type: must be a string or stored query.
.+,DEFAULT,ERROR:query: .+,medium,query() failed: VQL syntax error.
.+,DEFAULT,ERROR:mail: .+,medium,Email delivery failed.
.+,DEFAULT,ERROR:pk_encrypt: .+,high,Public-key encryption failed: output data is not protected.
.+,DEFAULT,ERROR:pk_decrypt: .+,medium,Public-key decryption failed: data is unreadable.
.+,DEFAULT,ERROR:sqlite: Unable to create temp file: .+,high,SQLite cannot create working temp file: query returns nothing.
.+,DEFAULT,ERROR:Unable to open sqlite file .+,medium,SQLite file inaccessible.
.+,DEFAULT,ERROR:NewSQLCache can not set (?:desctructor|destructor): .+,low,SQLite cache destructor registration failed: temp files may leak.
.+,DEFAULT,ERROR:upload_gcs: .+,high,GCS upload failed with no retry: file not uploaded.
.+,DEFAULT,ERROR:splunk_upload: all \d+ attempts failed: .+,high,All Splunk upload retries exhausted: data not delivered.
.+,DEFAULT,ERROR:client_repack: .+,high,Client repack operation failed.
.+,DEFAULT,ERROR:parse_json: .+,medium,parse_json failed to parse a value: result is silently dropped.
.+,DEFAULT,ERROR:parse_yaml: .+,medium,parse_yaml failed to parse a value: result is silently dropped.
.+,DEFAULT,ERROR:process_tracker: .+,medium,Process tracker hit a fatal error: process ancestry data may be incomplete.
.+,DEFAULT,ERROR:alert: .+,medium,alert() function failed.
.+,DEFAULT,ERROR:array: .+,medium,array() function failed.
.+,DEFAULT,rm: Retry count exceeded - giving up,low,File deletion permanently failed after all retries (file remains on disk).
.+,DEFAULT,RemoveDirectory: Retry count exceeded - giving up,medium,Directory removal permanently failed after all retries.
.+,DEFAULT,tempfile: Retry count exceeded - giving up,medium,Temporary file cleanup permanently failed: disk space may leak.
.+,DEFAULT,watch_jsonl: unable to get config,high,watch_jsonl watcher cannot read configuration: no events will be produced.
.+,DEFAULT,remap: Failed to apply remapping,high,Remapping failed: artifact yields nothing downstream.
.+,DEFAULT,copy: Failed to (open|copy|create directories).+,medium,File copy operation failed: destination file will be absent or incomplete.
.+,DEFAULT,upload: Unable to open .+,medium,upload() cannot open source file: nothing uploaded to server.
.+,DEFAULT,upload_S3: Unable to open .+,medium,S3 upload source file not found: file not uploaded.
.+,DEFAULT,upload_S3: operation error .+,high,S3 upload failed with no retry: file not uploaded.
.+,DEFAULT,upload_SFTP: Unable to open .+,medium,SFTP upload source file not found: file not archived.
.+,DEFAULT,upload_azure: Unable to open .+,medium,Azure Blob upload source file not found.
.+,DEFAULT,upload_smb: Unable to open .+,medium,SMB upload source file not found.
.+,DEFAULT,upload_webdav: Unable to open .+,medium,WebDAV upload source file not found.
.+,DEFAULT,upload_SFTP: Unable to verify size of uploaded file due to insufficient read permissions,medium,SFTP upload integrity check skipped: transfer may be truncated.
.+,DEFAULT,splunk_upload: attempt \d+ failed: .+,medium,Splunk upload attempt failed and is retrying.
.+,DEFAULT,splunk: cannot get TLS config: .+,medium,Splunk TLS configuration error: upload will likely fail.
.+,DEFAULT,elastic: cannot get TLS config: .+,medium,Elastic TLS configuration error: upload will likely fail.
.+,DEFAULT,yara: Failed to open .+ with accessor .+: .+,medium,YARA cannot open scan target: file skipped silently.
.+,DEFAULT,sigma: Error parsing: .+ in rule '.+',medium,Sigma rule rejected at parse time: rule not evaluated against events.
.+,DEFAULT,sigma: Error parsing rule '.+': no title set,medium,Sigma rule missing required title field: rule silently skipped.
.+,DEFAULT,sigma: Correlation .+: Error in rule .+,medium,Sigma correlation rule contains an error: correlation not evaluated.
.+,DEFAULT,ERROR:sigma_log_sources: .+,high,Sigma log source misconfigured.
.+,DEFAULT,GROUP BY: \d+ bins exceeded,low,GROUP BY memory limit exceeded: query will run significantly slower.
.+,DEFAULT,import_collection: Error copying .+,high,File copy failed during collection import: some files may be missing.
.+,DEFAULT,import_collection: .+,high,import_collection hit an error: collection may be partially imported.
.+,DEFAULT,tracker update query error: .+,medium,Process tracker update query failed: process ancestry data may be stale or missing.
.+,DEFAULT,hunt: expiry time invalid: .+,medium,Hunt expiry time could not be parsed: hunt may never expire.
.+,DEFAULT,hunt: expiry time .+ in the past,medium,Hunt expiry is already in the past: hunt will expire immediately.
.+,DEFAULT,hunt: OS condition invalid .+,medium,Hunt OS condition string is invalid: hunt may run on unintended platforms.
.+,DEFAULT,interfaces: failed to enumerate interfaces: .+,high,Network interface enumeration failed: interface list will be empty.
.+,DEFAULT,parse_usn: Unable to get MFT,medium,USN journal parsed without MFT: FullPath column will be empty for all records.
.+,DEFAULT,ERROR:etw: failed to disable provider; .+,medium,Windows ETW provider could not be disabled cleanly: may affect subsequent traces.
.+,DEFAULT,parse_ntfs: invalid context,high,NTFS parsing context is invalid: all NTFS results suppressed. Check accessor and image path.
.+,DEFAULT,parse_mft: Unable to open file .+,high,MFT file cannot be opened: NTFS file enumeration produces no output.
.+,DEFAULT,watch_ebpf: should provide a policy or a list of events,high,watch_ebpf called without policy or events: nothing is monitored.
.+,DEFAULT,watch_ebpf: Unable to compile regex_prefilter .+,medium,eBPF event pre-filter regex is invalid: all events pass through unfiltered.
.+,DEFAULT,watch_ebpf: .+,medium,watch_ebpf failed to load/attach/run: events not produced.
.+,DEFAULT,audit: .+,medium,Linux audit socket error: audit events may be lost.
.+,DEFAULT,receive failed: .+,medium,Linux audit event receive failed: gap in audit event stream.
.+,DEFAULT,Unable to load timezone from PARSE_TZ .+,low,PARSE_TZ timezone string invalid: timestamps silently converted to UTC.
.+,DEFAULT,Unable to load timezone from TZ .+,low,TZ timezone string invalid: timestamps silently converted to UTC.
.+,DEFAULT,environ: access to env var \S+ is denied,low,Environment variable access blocked by ACL: VQL expression receives an empty string.
.+,DEFAULT,.+: Field \S+ is required,high,Required argument missing: function returns no output.
.+,DEFAULT,.+: Unexpected arg \S+,high,Unknown argument name passed to function (likely a typo in the artifact): argument is silently ignored.
.+,DEFAULT,.+: Field \S+ .+,high,Argument type conversion failed: function returns no output.
.+,DEFAULT,upload_gcs: unable to fetch config,high,GCS upload cannot read client config: file not uploaded.
.+,DEFAULT,parse_csv: separator can only be one character,medium,parse_csv separator parameter is invalid: no rows produced.
.+,DEFAULT,parse_csv: comment can only be one character,medium,parse_csv comment parameter is invalid: no rows produced.
.+,DEFAULT,elastic: action must be either index or create,medium,elastic_upload called with invalid action parameter: rows not indexed.
.+,DEFAULT,sigma: Correlation .+: References missing rule .+,medium,Sigma correlation references a rule that was not loaded: correlation not evaluated.
.+,DEFAULT,netcat: unsupported address type .+,medium,netcat called with unsupported address type: no connection made.
.+,DEFAULT,http_client: must use secrets is enforced.+,medium,http_client URL dropped: server policy requires secrets-managed credentials.
.+,DEFAULT,user_grant: You must provide either roles or a policy object,medium,user_grant called without roles or policy: no permissions granted.
.+,DEFAULT,hunt_delete: '.+' not found,medium,Hunt not found: nothing deleted.
.+,DEFAULT,hunt_add: Hunt id not found .+,medium,Hunt not found: client not added.
.+,DEFAULT,add_client_monitoring: artifact .+ not found,medium,Client monitoring artifact not found: monitoring not configured.
.+,DEFAULT,add_server_monitoring: artifact .+ not found,medium,Server monitoring artifact not found: monitoring not configured.
.+,DEFAULT,proc_dump: failed to dump process: .+,medium,Process memory dump failed.
.+,DEFAULT,parse_pe: .+,medium,PE parsing failed: no rows produced for this file.
.+,DEFAULT,prefetch: file is not seekable .+,low,Prefetch input is not seekable: file skipped.
.+,DEFAULT,prefetch: .+,medium,Prefetch parsing failed: no rows for this file.
.+,DEFAULT,parse_pst: .+,medium,PST parsing failed: messages skipped.
.+,DEFAULT,hashselect option .+ not recognized.+,high,hash() called with unsupported algorithm (only md5/sha1/sha256): file not hashed.
.+,DEFAULT,glob: Rejected glob expression .+,medium,Glob expression rejected by safety check: no files matched.
.+,DEFAULT,read_file: .+,medium,read_file() failed: contents not returned.
.+,DEFAULT,process_tracker_(?:tree|get|callchain|children|all): Initialize a process tracker first .+,high,Process tracker query made before process_tracker_install(): result empty.
.+,DEFAULT,artifact_set: Command can only run on the server,high,artifact_set() called from a non-server context: artifact not added.
.+,DEFAULT,artifact_set: artifact type .+ invalid,high,artifact_set() given an invalid artifact type: not added.
.+,DEFAULT,artifact_set: .+,medium,artifact_set() failed: artifact may not have been written.
.+,DEFAULT,artifact_delete: Artifact '.+' not found,medium,artifact_delete() target missing: nothing deleted.
.+,DEFAULT,artifact_delete: Can only delete custom artifacts.+,medium,artifact_delete() refused: built-in artifact cannot be deleted.
.+,DEFAULT,artifact_delete: .+,medium,artifact_delete() failed.
.+,DEFAULT,unzip: .+,medium,unzip() failed (open/read/walk error): archive contents not produced.
.+,DEFAULT,js(?:_call|_set|_get)?: .+,medium,JavaScript runtime error: js() returned nothing.
.+,DEFAULT,yara_lint: .+,medium,yara_lint() failed to compile/inspect rule: lint output missing.
```

## See also

- [How to monitor event artifact errors](/knowledge_base/tips/monitoring_artifact_errors/)
- [`Server.Monitor.Errors.Alert`](/exchange/artifacts/pages/server.monitor.errors.alert/)
- [`Server.Monitor.Client.Errors.Alert`](/exchange/artifacts/pages/server.monitor.client.errors.alert/)
- [Using alerts in Velociraptor](/knowledge_base/tips/vql_alerts/)


Tags: #alerts #monitoring #notifications #errors #troubleshooting