# How can I clone an organization with all its hunts and artifacts to another instance?

There are a few use cases where you need to migrate data from an instance to another. It could be for educational purpose to provide pre-filled labs, or to provide a third party with the exact insights you had during your investigation. Event for archiving, being able to reload a dataset in Velociraptor to review what was done if something went amiss, being able to export and import an organization dataset could prove useful.

## Exporting

Everything related to an organization is stored in a directory under `<file store>/orgs`. There is:

- A directory with the org ID
- A configuration file `<orgId>.json.db`

We need to transfer both to the destination server.

1. Identify the org ID, either with the [`Server.Orgs.ListOrgs` Artifact](https://docs.velociraptor.app/artifact_references/pages/server.orgs.listorgs/) or scrolling down the Velociraptor *root org* home page.
2. Archive the folder and the `json.db` file (mind the star) 

```bash
tar czf transport-<org name>.tar.gz <file store>/orgs/<org id>* 
```

3. Transfer the resulting archive to the destination Velociraptor server.

## Importing

1. Decompress the archive under the `<file store>/orgs` directory. 

{{% notice tip "No orgs folder" %}}

The `orgs` directory is created with the first organization. After a fresh install of Velociraptor, it doesn't exist until you create an org. You may also simply create the directory.

{{% /notice %}}

2. Verify file ownership and permissions are similar to other directories in the file store
2. Start Velociraptor
2. You should see the organization with all its content as it were on the origin server

{{% notice tip "Can't see the org" %}}

Upon startup, Velociraptor will run the workers linked to the organization, so you can find a trace of it in the logs, but you may only see it in GUI if you are granted permissions on it. Just edit with your favorite text editor: `<file store>/orgs/<org id>/acl/<username>.json.db` to give the access rights to an existing user (or create a user with the name of a user who was allowed to see the org),

{{% /notice %}}

Tags: #archiving #orgs #deployment 
