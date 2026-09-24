# audit



{{< badge >}}Plugin{{< /badge >}}


**Required permissions:** `MACHINE_STATE`

### Description

Register as an audit daemon in the kernel.

On Linux the audit subsystem provides real time information about
kernel auditable events. This plugin registers as a consumer and
returns parsed events as rows.

You should configure the audit subsystem using the `auditctl`
binary before using this plugin.



