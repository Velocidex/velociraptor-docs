---
menutitle: "Sigma rules"
title: "Sigma rules"
date: 2025-05-12
draft: true
weight: 80
---


Detection engineering is an essential discipline for any security team wanting
to maximize their detection capabilities. It involves taking a scientific
approach, examining how we detect threats in our environment and continuously
improving upon it.

In this blog post, we will explore the use of
[Sigma rules](https://github.com/elastic/sigma) with Velociraptor, a powerful
endpoint detection system which can help you identify potential security
incidents more effectively.

## What are Sigma Rules?

[Sigma](https://www.sans.org/security-resources/posters/sigma-rules-sans-securing-the-cloud/PDFs/sigma-rules-sans-securing-the-cloud.pdf)
is an open-source language for detection as a service, allowing you to describe
what constitutes "interesting" events from raw log data.

The Sigma rule format was designed to abstract the specifics of the detection
stack by presenting an abstract rule language. The hope was that rules could be
easily interchanged between different detection stacks and thus can be shared
within the security community more efficiently.

In practice, however, there is a lack of rigor and well-defined taxonomy in
Sigma which makes porting rules between various detection stacks error-prone and
manual.

## How Do You Use Sigma Rules with Velociraptor?

Velociraptor supports the [Sigma rule format](https://github.com/elastic/sigma),
allowing you to leverage pre-built community rules or create custom ones
tailored to your specific environment. Here are some steps for utilizing these
rules effectively:

1. **Identify Relevant Sigma Rules**: Start by reviewing relevant Sigma rules
   that relate directly to known threats in your environment.

2. **Customize Rules For Your Environment**:
   - Modify existing Sigma rule templates.
   - Create new ones from scratch using the defined format.

3. **Test and Refine Detection Logic**: Execute a simulation of detected events
   with test data so as to verify whether the detection logic behaves correctly
   or not, then refine it accordingly.

## Real-Time Alerting & Continuous Monitoring

Velociraptor's [VQL language]({{< ref "/docs/vql/" >}}) is fully asynchronous
and can watch for changes on the endpoint in real-time. By tweaking VQL slightly
to feed real-time events into Sigma rule matching, Velociraptor effectively
creates real-time detection rules.

With this functionality, you can take advantage of continuous monitoring coupled
with near-real-time alerting capabilities. This approach allows quick
identification and response to potential security incidents as they occur or
immediately after the fact.

## Conclusions

Sigma rules provide a way for security teams to create powerful yet
straightforward content-based detectors by utilizing raw log data streams in any
environment. When used effectively, Sigma rules can significantly enhance your
overall detection efficacy.

By employing Velociraptor's Sigma rule support and refining its VQL language
with continuous monitoring features, you too can take advantage of advanced
endpoint detection capabilities. This approach empowers security teams to
identify threats more quickly while minimizing the risk posed by potential
security incidents.

## Resources and Further Exploration

Learn more about the key concepts for creating, managing and using Sigma rules.

{{% children description="true" %}}
