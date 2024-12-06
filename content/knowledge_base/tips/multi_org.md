# How do I get a list of hunts across multiple organizations?

Are you looking for a way to generate user metrics across the entire server (like Hunts run per user)?

Orgs are separated out so when you run a query you are running that query within the context of the org. Normally the hunts scheduled in an organization can be accessed using the [hunts()](https://docs.velociraptor.app/vql_reference/server/hunts/) plugin, but that normally acts within a single Org.

To run a query in another org, you can switch org contexts using the [query()](https://docs.velociraptor.app/vql_reference/misc/query/) plugin.

So for example to see all hunts in all orgs:

```sql
SELECT * FROM foreach(
  row={
    SELECT OrgId FROM orgs()
  },
  query={
    SELECT * FROM query(query={
      SELECT * FROM hunts()
    }, org_id=OrgId)
  })
```

This query iterates over all the orgs, then runs the `SELECT * FROM hunts()` query within the org context. 

You can simplify the query using LET stored queries:
```sql
LET MyQuery = SELECT * FROM hunts()
LET AllOrgs = SELECT OrgId FROM orgs()

SELECT * FROM foreach(row=AllOrgs,
  query={
    SELECT * FROM query(query=MyQuery, org_id=OrgId)
  })
```

Of course your user account must have access to the orgs. Each org has a separate ACL for each user, so your user needs to have at least the `READ_RESULTS` permission to be able to see the org.

Some plugins (e.g. [hunt()](https://docs.velociraptor.app/vql_reference/server/hunt/) ) support orgs directly for convenience but generally you should use the above approach. This will also remind you that each such query is running in a separate org context and therefore can not see other data at the same time.

