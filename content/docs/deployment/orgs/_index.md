---
menutitle: "Organizations"
title: Organizations and Muti-Tenancy
weight: 15
---

Velociraptor supports multiple orgs in a fully multi tenancy
configuration. Orgs are light weight and can be added and removed
easily with minimal impact on resource requirements.

This is useful in a number of scenarios:

1. You are a service provider with many customers of varying size
   networks. Multi-Tenancy configuration allows you to onboard a
   smaller customer (with e.g. less than 1000 endpoints) onto the same
   infrastructure without needing to deploy additional resources.

2. You have multiple organizational units within your own company with
   different access control requirements. For example, some units
   require much more controlled access and different set of
   Velociraptor users.

In Velociraptor, multi-tenancy is implemented by dividing the clients into separate `Organizations` or `Orgs`.

Each org is logically completely separate from other orgs:

* Each org contains a different set of clients. A Client is configured
  to access an org by way of a shared secret in its configuration file
  ([Client.nonce]({{% ref "/docs/deployment/references/#Client.nonce"
  %}})). It is not possible for a client to connect to a different org
  without knowing this shared secret.
* Storage for each Org is separated within the data-store directory in
  an org specific sub-directory. This means you can backup, restore or
  delete orgs very easily since data is separate.
* Users have access control lists (ACLs) within the respective
  Org. This means that the same user can have different roles and
  permissions in different orgs. Orgs can have their own administrator
  user which can perform administrative actions on the org without
  affecting other orgs.
* Custom artifacts can be maintained in different Orgs. Users within
  an org can independently create and update custom artifacts without
  affecting other orgs.
* VQL running in notebooks or server artifacts will automatically and
  transparently use the correct org without affecting or being able to
  access other orgs.
* Orgs can be created and destroyed easily at runtime.

### The Root org

While Velociraptor allows creating multiple orgs it is not mandatory!
By default when Velociraptor is first installed, the `root` org is
created and all clients connect to it.

If you choose not to create additional Organizations then you can just
continue using the `root` org as normal for all your clients.

Additional orgs are created as Child orgs of the root org. In a
multi-tenancy deployment the root org has additional privileges that
other orgs do not have:

1. A user with the `Org Administrator` permission within the `Root`
   Org is allowed to manage orgs (e.g. create new Orgs or delete
   Orgs). The `Org Administrator` permission is meaningless within a
   non-root org.

2. Custom artifacts from the root org are automatically visible in all
   child orgs. This supports the use case of multi-tenancy as the root
   org can manage a custom set of artifacts for their tenants.

###  Switching to different orgs

You can switch to other orgs your user account has access to using the
user preferences tile in the GUI.

![Selecting Org](selecting_orgs.png)

Normally in order to see an org in the drop down selector, your
Velociraptor user account needs at least `Reader` level access to that
org. Unless your user is also an `Org Administrator` on the `root`
org, in which case you can switch or see any org.

### Creating a new Org.

You can use the `Server.Orgs.NewOrg` artifact to create a new org

![Creating a new Org](new_org.png)

{{% notice tip "Managing Orgs" %}}

Since the `Org Administrator` permission is only meaningful for the
root org you will need to change to the root org in the GUI first, in
order to create or delete new orgs.

{{% /notice %}}

Once the new org is created you can assign users to the Org using the
[Adding a New User]({{% ref
"/docs/deployment/security/#adding-a-new-user" %}}) procedure.

### Preparing a deployment for the new Org

Clients are configured to connect to one org only. While the
cryptographic keys (e.g. The internal CA Certificate) of clients from
all Orgs are the same, the [Client.nonce]({{% ref
"/docs/deployment/references/#Client.nonce" %}}) is different for each
Org. The server uses this nonce to assign the client into the correct
Org. The nonce is embedded in the client's configuration file and acts
as a shared secret between all the Org clients and the server.

To create an installation package that connects to the new Org, you
need to [build an MSI]({{% ref
"/docs/deployment/clients/#official-release-msi" %}}) within the
target Org:

1. First switch to the relevant Org with the GUI selector
2. Launch the server artifact `Server.Utils.CreateMSI` within the context of the target Org.

The produced MSI will connect to the target Org.

For non-Windows platforms you will currently need to build the
installation packages manually with the Org specific client config
file. You can download the correct Org specific configuration file
from the main dashboard as show below.

![Downloading the Org Specific Configuration File](downloading_org_config.png)


### Auditing User Actions

As described in the [Auditing User actions]({{% ref
"/docs/deployment/security/#auditing-user-actions" %}}) section,
Velociraptor collects auditable events into a central location for
review by the administrators.

When running within an Org context, each Org collects its own audit
log (although you can still forward all logs to a remote syslog
server). This allows an administrator within the Org to only view
relevant auditable events to that Org. It is also possible to install
server monitoring artifacts to automate actions based on auditable
events within the org.
