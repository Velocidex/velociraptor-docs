# How do I debug the client while it is running?

Sometimes we collect artifacts from clients but for some reason things seem to take longer than expected. Velociraptor has mechanisms to gain visibility into how clients behave and what queries are running.

## Query logs

The first port of call is viewing the query logs in the logs tab of the relevant collection.

![Viewing the query logs](https://user-images.githubusercontent.com/3856546/159195874-ec6c8322-cb70-4254-861a-95888db94201.png)

As the query is running, it will emit a message to let us know that it is waiting for rows. We use this to determine that the query is still running on the client.

## Collecting profiles

The `Generic.Client.Profile` artifact allows us to collect internal state of the client. Simply collect this from the client, while other queries are running

![Client Profile](https://user-images.githubusercontent.com/3856546/159196011-28808471-4111-42ba-bfd3-819381bdf596.png)

The most common thing to collect include:

1. The Goroutine dump shows a stack trace of all currently running goroutines (similar to threads). This helps us understand if there is a deadlock or another bug.
2. The logs delivers a recent dump of client logs. Normally the client does **not** write it's logs to file to avoid information leakage issues. You can see the logs on the console by running the client with the `-v` flag, but each client also keeps the last 1000 messages in a memory buffer so they can be available if needed. This option sends the recent logs to the server.
3. Query logs are a recent log of VQL queries running on the endpoint. This gives us an idea of exactly what the client is doing.
4. Metrics are internal program counters that provide visibility of performance related items.

When asking for help on Discord or our mailing list, we will often ask for the profiles collected from the client (or server). At a minimum we will need the above items to diagnose any issues.

{{% notice tip %}}

The nice thing about collecting profiles is that the client does **not** need to be restarted and we do not need to run a special debug build - all clients are capable of collecting profile information at any time.

{{% /notice %}}

### References

You can read more about ![profiling Velociraptor here](https://docs.velociraptor.app/blog/2020/2020-08-16-profiling-the-beast-58913437fd16/).
Tags: #deployment, #debugging
