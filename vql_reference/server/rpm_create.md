# rpm_create



{{< badge >}}Plugin{{< /badge >}}

Arg | Description | Type
----|-------------|-----
target|The name of the target OS to repack (default VelociraptorLinux)|string
version|Velociraptor Version to repack|string
release|Rpm package release version (A)|string
server|Build a server rpm if true, otherwise we build a client rpm|bool
exe|Alternative a path to the executable to repack|OSPath
accessor|The accessor to use to read the file.|string
config|The config to be repacked in the form of a json or yaml string. If not provided we use the current config./|string
service_user|The user to run the service as|string
service_group|The group to run the service as|string
show_spec|If set we only show the spec that would have been used. You can use this to customize the input for package_spec|bool
directory_name|Package files will be created inside this directory. If not specified we use a temporary directory|string
extra_args|Additional command line args to be provided to the service|list of string
package_spec|A Package spec to use instead of the default, for ultimate customization|ordereddict.Dict

**Required permissions:** `COLLECT_SERVER`, `FILESYSTEM_WRITE`, `SERVER_ADMIN`

### Description

Create a deployable RPM package for client or server.


