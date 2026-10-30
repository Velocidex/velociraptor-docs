---
date: 2018-08-09T04:10:06Z
description:  |
  At Velocidex we have been running open source endpoint monitoring
  tools for our clients in order to detect and respond to incidents.
  This post introduces a new tool called Velociraptor - an advanced
  DFIR tool.

title:  Introducing Velociraptor
linktitle: 20180809 Introducing Velociraptor
categories: ["Blog"]
---

Hunting and responding like a raptor!
=====================================

At Velocidex we have been running open source endpoint monitoring tools
for our clients in order to detect and respond to incidents. One of our
favorite tools is GRR, developed by Google internally and then released
as open source. GRR is a very powerful tool, with a polished UI and good
documentation.

Unfortunately the open source version released by Google suffers from
some shortcomings and so we have decided to develop a new project, built
on the shoulders of giants called Velociraptor.

These are Velociraptor\'s design goals:

 -   **Focus on data collection.** Velociraptor\'s primary use case is to
     collect data and export it to other systems. Velociraptor does no
     analysis itself and therefore has no need for a complex data
     model.
 -   **Flexibility**. Velociraptor can adapt easily to new requirements
     without needing to redeploy either clients or servers. Using VQL
     (Velocidex Query Language) provides flexibility in the type and
     number of queries that are used to rapidly adapt to changing
     requirements. VQL allows us to collect just the information needed
     and no more in an adaptive way.
 -   **Remove abstractions**. Velociraptor aims to be as simple to
     understand as possible. The default data store simply stores files
     in the file system which may be easily inspected by the user. No
     special tooling is required to script or manage Velociraptor.
     Reduce demand on the data store. Rather than increase the data
     store requirements, we want to simplify the design to the point
     that requirements on the data store are so low, one can run a
     medium to large sized deployment with very few resources (down to
     perhaps a single server machine). In fact the default data store
     does not even use a database, but simply uses flat files.
 -   **Simplify everything!** Velociraptor aims to be very simple to run
     and administer. We remove a lot of the GRR functionality that we
     don't find we use often. Velociraptor ships as a single, statically
     linked executable which can perform all actions necessary for
     deployers.

In short we really wanted something like this:

![](image5.png)


Velociraptor is a new end point monitoring and IR
tool built upon GRR\'s groundwork and experience. To be clear, we reused
some of GRR\'s code and some design elements, but Velociraptor is a new
project and is largely a rewrite of GRR\'s codebase. Like GRR,
Velociraptor is released under an open source license and is a community
project hosted on <https://gitlab.com/velocidex/velociraptor>.

It is still very early days and we would love to receive feedback and
suggestions. This is the first technology preview release and we hope to
make a more stable and comprehensive release in the coming months. As
Velociraptor becomes more battle tested we hope the codebase will
stabilize.

The near term roadmap is:

-   Improve support for more operating systems. Especially Windows:
-   Registry based VQL plugins.
-   NTFS support for raw disk access.
-   Memory scanning and rudimentary Memory analysis
-   Design a more efficient client/server communication mechanism - long
    polling is problematic since clients only poll infrequently (e.g.
    every 10 minutes). We want to be able to control all clients
    quickly.
-   Develop a library of VQL expressions which may be reusable. This
    should be similar to GRR\'s idea of Artifacts but be more geared
    towards VQL.

Please play with it and send feedback to
<velociraptor-discuss@googlegroups.com>

![](image11.png)
