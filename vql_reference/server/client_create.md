# client_create



{{< badge >}}Function{{< /badge >}}

Arg | Description | Type
----|-------------|-----
first_seen_at||time.Time
last_seen_at||time.Time
labels||list of string
os|What type of OS this is (default offline)|string
hostname|The hostname of the system|string
client_id|if set we use this client id otherwise we make a new one|string
mac_addresses||list of string

**Required permissions:** `SERVER_ADMIN`

### Description

Create a new client in the data store.


