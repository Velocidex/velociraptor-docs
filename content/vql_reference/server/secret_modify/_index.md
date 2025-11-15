---
title: secret_modify
index: true
noTitle: true
no_edit: true
---



<div class="vql_item"></div>


## secret_modify
<span class='vql_type label label-warning pull-right page-header'>Function</span>



<div class="vqlargs"></div>

Arg | Description | Type
----|-------------|-----
name|Name of the secret|string (required)
type|Type of the secret|string (required)
delete|Delete the secret completely|bool
add_users|A list of users to add to the secret|list of string
remove_users|A list of users to remove from the secret|list of string
visible_to_all_orgs|If set we make the secret visible to all orgs|bool
add_orgs|A list of orgs to add to the secret|list of string
remove_orgs|A list of orgs to remove from the secret|list of string

<span class="permission_list vql_type">Required permissions:</span><span class="permission_list linkcolour label label-important">SERVER_ADMIN</span>

### Description

Modify the secret

This function allows you to programmatically modify the secret
metadata. For example, assign the secrets to certain users, orgs
etc.

Note that secrets must be added to specific users to be usable -
this additional requirement extends in addition to the regular
user ACLs. So a user may have NETWORK access to call the
`http_client()` plugin, but will require a specific secret to be
assigned to be able to use that in the `http_client()` call.

# Secret inheritance
Secrets are managed per org. Each org has its own secret manager
and the org admin is able to define new secrets for their org.

In many multi-tenanted deployments it is convenient to have secrets
set at the root org level, and have all child orgs inherit the
secrets. This allows the root org admin to manage access to shared
resources securely.

It is possible to control visibility of secrets at the root org
using the secret_modify() VQL function. The secret may be added to
specific orgs or made visible to all orgs.

NOTE: Making a secret visible to another org allows the secret
manager in that org to **copy** the secret to their org. By
modifying the secret in the child org (i.e. adding or removing
users) the secret is copied into the child org. This means that if
the root org administrator removes access to the org after that
fact, the child org can continue working on the copy of the secret
in their org.

If the root org admin wants to remove access to the secret from all
child orgs they need to use the VQL function
secret_modify(delete=TRUE) to truly delete the secret in the child
org context (see the query() plugin to switch org contexts).


