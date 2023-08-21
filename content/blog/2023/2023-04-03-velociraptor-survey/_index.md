---
title: "The Velociraptor annual community survey"
description: |
   The Velociraptor development team is interested to hear about how the tool is used in the community in order to shape future development direction.

tags:
 - Community
author: "Mike Cohen"
date: 2023-04-01
---

Velociraptor is an open source project led and shaped by the
community. Over the years, Velociraptor has become a real force in the
field of DFIR making it the obvious choice for many operational
situations.

The Velociraptor development team is committed to continue making
Velociraptor the premier open source DFIR and security tool. We are
therefore interested to hear about how the tool is used in the
community and what the community expectations are in regard to
capabilities, features and use cases. We use this information in order
to shape future development direction, set priorities and develop our
road map.

In early 2023, the Velociraptor team distributed a community
survey which was very well received. We are grateful to the community
members who took the time to respond. As an open source project, we
depend on our community to contribute. There are many ways
contributors can help the project, from developing code, to filing
bugs or improving documentation. One of the most important ways users
can contribute is by providing valuable feedback through channels such
as this survey, to help shape the future road map and new features.

In this blog post I wanted to share some of the responses we received.

## Who are the Velociraptor Community?

Overall there were 213 responses. By far the majority of responders
were `Analysts` (57%) and `Managers` (26%) indicating that most of the
respondents are people who know and use Velociraptor frequently.

We wanted to get a feel for the type of companies using
Velociraptor. Users fell pretty evenly into company sizes, with about
30% of responses from small companies (less than 100 employees) and
20% of responses from very large companies of 10,000 employees or
more.

These companies also came from a wide range of industries. While many
were primarily in the information security fields such as Managed
Security Service Providers (MSSP), Consultants and Cybersecurity
businesses, we also saw a large number of responses from the
Government sector, the Aerospace industries, Education,
Banking/Finance, Health care, etc.

With such a wide range of users we were interested in how often users
were using Velociraptor. About a third of users use Velociraptor
frequently, a third use it occasionally and a third are in the process
of evaluating and learning about the tool.

## Velociraptor use cases

Velociraptor is a powerful tool with a wide feature set. We wanted to
glimpse an idea of what features were most popular and how users
prioritize these features. Specifically, we asked about the following
main use cases:

1. **Client monitoring and alerts (Detection).**

    Velociraptor can collect client event queries focused on
    detection. This allows the client to autonomously monitor the
    endpoint and send back high value events when certain conditions
    are met.

    12% of users were actively using this feature to monitor the end
    point.

2. **Proactively hunt for indicators (Threat intelligence)**

    Velociraptor's unique ability to collect artifacts at scale from
    many system can be combined with threat intelligence information
    (such as hashes, etc.) to proactively hunt for compromises by known
    actors. This question was specifically related to hunting for threat
    feed indicators, such as hashes, IP addresses etc.

    16% of users were utilizing this feature

3. **Ongoing forwarding of events to another system**

    Velociraptor's client monitoring queries can be used to simply
    forward events (such as ETW feeds).

    6% of users were utilizing this feature

4. **Collecting bulk files for analysis on another system (Digital
   Forensics)**

   Velociraptor can be used to collect bulk files from the endpoint
   for later analysis by other tools (for example using the
   `Windows.Collection.KapeFiles` artifact).

   20% of users were using this feature regularly.

5. **Parse for indicators on the endpoint (Digital Forensics)**

   Velociraptor's artifacts are used to directly parse files on the
   endpoint, returning actionable high value information quickly
   without the need for lengthy post processing.

   21% of users use these types of queries.

6. **Proactive hunt for indicators across many systems (Incident
   Response)**

   Velociraptor can hunt for artifacts from many endpoints at once.

   21% of users use this capability.

We further asked for the relative importance of these features.

Users valued most the ability to collect bulk files and hunting for
artifacts across many systems, followed by the ability to parse
artifacts directly on the endpoints.

## Backwards compatibility

As developers we need to understand how important backwards
compatibility is to users so we can develop effective update
procedures.

Some users deployed Velociraptor for limited time engagements so they
did not need backwards compatibility for stored data as they wouldn't be
upgrading to major versions within the same deployment.

Other users required more stable data migration but were generally
happy with removing data compatibility if necessary. For example, with
one response stating "I would rather you prioritize improvements over
compatibility even if it breaks things."

Another user explained: "In a typical Incident Response scenario,
Digital Forensics data has a shelf life of a few weeks or months at
best and I am comfortable with the convertibility and portability of
much of the data that Velociraptor collects such that archival data
can still be worked with even if newer versions of the server no
longer support a deprecated format/archive. Just saying that I think
there will be workarounds if this becomes an issue for folks with
mountains of legacy data that hasn’t been exported somewhere more
meaningful for longer term storage and historical data
analytic/intelligence purposes."

Generally most users indicated they rarely or never needed to go back
to archived data and re-analyze.

## Version compatibility

The Velociraptor [support
policy](https://docs.velociraptor.app/docs/overview/support/)
officially only supports clients and servers on the same release
version. However in reality it usually takes longer to upgrade clients
than servers. While some users are able to upgrade clients promptly,
many users estimate between 10-50% of deployed clients are a version
older than the server.

The Velociraptor team therefore needs to maintain some compatibility
with older clients to allow time for users to upgrade their endpoints.

## The offline collector

The offline collector is a way to use Velociraptor's artifacts without
needing to deploy a server. This feature is used mainly when we need
to rely on another party to run the actual collection or we are not
able to deploy a new agent on the endpoint.

This feature is used exclusively by about 10% of users, while a
further 30% of users use it frequently. It is an important feature for
Velociraptor and the Velociraptor team should devote more time to
making this even more seamless and easy to use.

Most users of the offline collection deploy it manually (50%), while
deploying via another EDR tool, or via Group Policy are also robust
options. Some users have created custom wrappers to deploy the offline
collector in the field.

The Offline collection supports directly uploading the collection to a
cloud server using a number of methods.

The most popular upload method is to an `AWS S3 bucket` (30%) while
the `SFTP connector` in the cloud or a `custom SFTP server` on a VM
are also popular options (20% and 23%). Uploading directly to `Google
Cloud Storage` is the least popular option at about 5%.

Manual copy methods were also popular ranging from EDR based copying
to Zoom file copy.

A commonly requested method was `Azure blob storage` which
Velociraptor currently does not support. Many responses indicate that
`SFTP` is currently a workaround to the lack of direct Azure
support. The Velociraptor team should prioritize supporting Azure blob
storage.

## Data analysis

Velociraptor supports collecting raw files (e.g. Event log files,
`$MFT` etc) for analysis in other tools. Alternatively Velociraptor
already contains extensive parsers for most forensic artifacts that
can be used directly on the endpoint.

Most users do use the built in forensic parsing and analysis artifacts
(55%) but many users also collect raw files (e.g. via the
`Windows.Collection.KapeFiles` artifact).

## VQL artifacts

Velociraptor uses the Velociraptor Query Language to perform
collections and analysis. The VQL is usually shared via an `Artifact`
with the community.

Most users utilize the built in artifacts as well as the [artifact
exchange](https://docs.velociraptor.app/exchange/). A significant
number of users also develop their own artifacts for their own
use. Over 60% of users report that they develop their own artifacts.

For those users who develop their own artifacts, we asked about
limitations and difficulties in this process. A common theme that
arose was around debugging artifacts and the lack of a VQL debugger
and better error reporting.

Training and documentation was also pointed as needing improvements. A
suggestion was made to enhance documentation with a lot more examples
of how each VQL plugin can be used in practice.

Luckily the Velociraptor team is running a training course at
[BlackHat 2023](https://www.blackhat.com/us-23/training/schedule/#digging-deeper-with-velociraptor-30129)
this year so users can learn from the Velociraptor developers detailed information of how to deploy Velociraptor and write effective custom VQL.

## Role based access controls

Velociraptor is a very powerful tool and concentrates a lot of
responsibility in the hands of a few users. To control access to the
tool, Velociraptor has a role based access control mechanism, where
users can be assigned roles from `administrator`, `investigator` to
read-only access provided by the `reader` role.

Users generally found this feature very useful, with 40% of users
finding it `moderately useful` and a further 20% and 15% further
finding it `very useful` and `extremely useful`, respectively.

The main suggestions for improvements include:

1. Easier management through the GUI (as of version 0.6.8 all user
   ACLs are managed through the GUI now).
2. Custom roles with more granular permissions.
3. Better logging and auditing.
4. Some way to allow a specific role to only run a pre-approved subset
   of artifacts. Some way to only run signed/hashed VQL - prevent a
   malicious artifact being dropped on the server.
5. Making it clearer what each permission grants the user.

## Multi-tenant support

In recent versions, Velociraptor offers a fully multi-tenanted mode,
where organizations can be created and destroyed quickly with minimal
resource overheads. This feature is used by 25% of respondents, who
are mainly consultants using it to separate out different
customers. Some companies use multi-tenancies to separate out different
organizations in the same business or subsidiaries.

## Client monitoring and alerting

Velociraptor can run `event queries` on the client. These VQL queries
run continuously and stream results to the server when certain
conditions are met. A common use case for these is to generate alerts
and for enhanced detection.

Some users deploy client monitoring artifacts frequently while others
see it as an alternative to EDR tools, when these are available. The
primary use case breakdown was:

1. Detection (e.g. alert when an anomalous event occurs) - 27% of users
2. Collection of client events (e.g. forward process event logs to an
   external system) - 18% of users
3. Remediation (e.g. quarantine or remove files automatically) - 15% of users

While 30% of users do not use client monitoring at all.

The main pain point with client monitoring seems to be the lack of
integrated alerting capability (an [issue currently being worked
on](https://github.com/Velocidex/velociraptor/issues/1869)). Some
useful feedback on this feature included:

* Better support for integration with business tools - e.g., Teams,
  Slack, etc.
* Easier to manage event data.
* Not having to build a server side artifact for each client_event
  artifact. And a dashboard that lists all alerts. Also, an easier
  way to forward alerts based on severity.
* Lack of pre-built detection rules / packs. In other words, it would
  be easier to tune down, than to build up.

## The Quarantine feature

Velociraptor can quarantine an endpoint by collecting the
`Windows.Remediation.Quarantine` artifact. This artifact tunes the
firewall rules on the endpoint to block all external network
communication while maintaining connectivity to the Velociraptor
host. This allows for an endpoint to be isolated during
investigation.

The feature was "sometimes used" by about 30% of users and "always used"
by 12%, making it a popular feature.

## How is Velociraptor deployed?

Velociraptor is a very light weight solution, typically taking a few
minutes to provision a new deployment. For many of our users,
Velociraptor is used in an Incident Response context on an as-needed
basis (46%). Other users prefer a more permanent deployment (25%).

For larger environments, Velociraptor also supports multi-server
configuration (used by 13% of users), while the more traditional
single server deployment option is used by 70% of users.

While some users deploy very short lived deployments of several days
or less (13%), most users keep their deployment for several weeks
(27%) to months or permanently (44% of users).

Velociraptor is designed to work efficiently with many end points. We
recommend a maximum of 15-20k endpoints on a single server before
switching to a multi-server architecture (although users reported
success with larger deployment sizes on a single server). This level
of performance is adequate in practice for the majority of users.

Many users run deployments of less than 250 endpoints (44%) while a
further 40% of users deploy to less than 5,000 endpoints.

Approximately 10% of users have deployment sizes larger than 25,000
endpoints with 2% of users over 100,000 endpoints.

## Popular operating systems

Among Velociraptor's supported operating systems, Windows 64-bit, is
the most popular (with 82% of users ranking it the most deployed OS
type), while Linux is the next most popular deployed endpoint OS (26%
ranked second, and 48% third). Finally, Mac is the third popular choice
for Velociraptor's users, with 32-bit Windows systems still very
prevalent.

## Resources and references

Velociraptor's web site at https://docs.velociraptor.app/ contains a
wealth of reference material, training courses and presentations. We
also have an active YouTube channel (https://www.youtube.com/@velocidexenterprises8702) with many instructional videos.

While some users ranked the website as `Extremely Useful` (25%) there
is clearly room for improvements with 42% of users only rating it as
`Very Useful` or `Moderately Useful` (28%).

Suggestions for improvements included:

* More in-depth YouTube videos breaking down the tool's features with
  workflows.
* More detailed "how to" with practical examples.
* Improved documentation about functions and plugins with a
  slightly more detailed explanation and a small example.
* Documents seem to be outdated, would like to see updates to the
  documentation to reflect the new versions and features.

## Testimonials

Finally I wanted to share with you some of the testimonials that users
wrote in the survey. We are humbled with the encouraging and positive
words we read, and are excited to be making an impact on the DFIR
field.

* I have to congratulate you and thank you for developing such an
  amazing tool. It's the future of DFIR. I hope Rapid7 won't make it
  very expensive in the future.

* Awesome product, can't wait to use it in prod!

* This is a game changer for the DFIR industry. Keep up the great work.

* Keep the file system based back end, its simplicity makes chain of
  custody/court submissions possible.

* I thoroughly love Velociraptor. The team and community are absolutely
  fantastic. I would go as far as to say that Mike and Matthew Green
  are my favorite infosec gentlemen in the industry.

* Y'all are awesome. I feel like I was pretty critical but that's
  because this is an amazing software, and want to see it continue to
  grow and improve.

* We have been deploying Velociraptor to client environments almost
  since it was released. Our DFIR business model is entirely centered
  around it and it works very well for us. It is a great solution that
  just keeps getting better and better

## Conclusions

This is our first Velociraptor community survey, and it has proven to
be extremely useful. Since Velociraptor is a community-led open source
project, we need an open feedback loop to our users, to understand
where things need to be improved and what features should be
prioritized.

At the same time, since Velociraptor is an open source project, I hope
this survey will inspire contributions from the community. We value
all contributions, from code to documentation, testing and bug reports.

Finally for all our US based users, we hope to see you all in person
at [BlackHat 2023](https://www.blackhat.com/us-23/training/schedule/#digging-deeper-with-velociraptor-30129) this year! Join us for an in depth Velociraptor
training and to geek out with VQL for 4 days, learning practical,
actionable skills and supporting this open source project.
