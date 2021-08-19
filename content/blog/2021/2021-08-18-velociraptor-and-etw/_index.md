---
title: Event Tracing for Windows
description: |
   This post takes another look at Event Tracing for Windows.

tags:
 - Detection
 - VQL
date: 2021-08-18
noindex: true
---

## Digging into Windows Internals

One of the most important aspects of modern operating systems is
instrumentation of the running software on the system. Instrumentation
provides the visibility to understand what the system is doing at this
moment. This is obviously important for system administrators and
software developers, but increasing visibility into machine state is
being used for security monitoring and response.

In Windows system instrumentation is provided by the Event Tracing For
Windows (ETW), an instrumentation extensive framework.

Much has been written about ETW so I will not cover the details here,
this blog post will examine how we can leverage ETW for security
monitoring using Velociraptor specifically. We will also talk about
some of the limitations of the approach.

### Event tracing for windows.

The Event Tracing for Windows framework is [documented extensively by
Microsoft](https://docs.microsoft.com/en-us/windows-hardware/test/weg/instrumenting-your-code-with-etw). In
a nutshell, the framework is designed to facilitate interaction
between event **Consumers** and event **Providers**.

Velociraptor provides the VQL event plugin `watch_etw()` to register
Velociraptor as a **Consumer**.  If you have not read about
Velociraptor's event queries, check out the
[documentation](https://docs.velociraptor.app/docs/vql/events/). In
Velociraptor, event queries allow us to write real time monitoring
rules on the endpoint, then forward events to the server, enrich the
event with other information or respond to the event autonomously.

In this blog post we will go through some examples to illustrate the
general technique but there are so many possibilities for advanced
detection rules.

### Exploring ETW - Monitoring DNS lookups

In our first example, we will be building a Velociraptor query to
monitor for DNS lookups on the endpoint. We mentioned previously that
ETW connects providers and consumers, so our first task is simply to
find a provider that will provider relevant data.

ETW is designed to be self documented via `manifest` files, so each
provider in the system can describe what it will provide to some
extent. You can see all the providers on your system using the `logman
query providers` command.

There are some public efforts to better document ETW providers, for
example https://github.com/repnz/etw-providers-docs contains a dump of
various manifest files. I like to search that repository to find
likely useful providers.

![](image118.png)
