# azure_monitor_upload



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
query|Source for rows to upload.|StoredQuery (required)
threads|How many threads to use.|int64
logs_ingestion_endpoint|The Logs Ingestion endpoint URI of the Data Collection Rule (or a Data Collection Endpoint).|string
dcr_immutable_id|The immutable ID of the Data Collection Rule (e.g. dcr-xxxxxxxx).|string
stream_name|The DCR input stream name (e.g. Custom-RawVelociraptorEvents_CL). If empty it is derived from table as 'Custom-<table>'.|string
table|Used to derive stream_name as 'Custom-<table>' when stream_name is not set. Unused otherwise.|string
tenant_id|Azure Service Principal Tenant ID.|string
client_id|Azure Service Principal Client ID.|string
client_secret|Azure Service Principal Client Secret.|string
managed_identity|Use an Azure managed identity instead of a service principal (requires that the server runs in Azure).|bool
managed_identity_client_id|Optional client ID of a user-assigned managed identity.|string
default_credential|Use the Azure SDK DefaultAzureCredential chain (AZURE_* env vars, workload identity, managed identity, Azure CLI).|bool
chunk_size|The number of rows to send at a time.|int64
wait_time|Batch upload at most this long in seconds (default 5).|int64
max_memory_buffer|Max uncompressed request body in bytes; keep under the ~1MB Azure limit (default 900KB).|uint64
skip_verify|Skip TLS verification (default: False).|bool
root_ca|As a better alternative to skip_verify, allows root ca certs to be added here.|string
max_retries|Maximum number of retries for failed uploads (default: 3).|int64
retry_wait|Base wait time in seconds for exponential backoff between retries (default: 2).|int64
secret|Alternatively use a secret from the secrets service. Secret must be of type 'Azure Monitor Creds'.|string

**Required permissions:** `NETWORK`

### Description

Upload rows to Azure Monitor / Log Analytics via the Logs Ingestion API (Data Collection Rule).


