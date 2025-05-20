---
title: Detection Engineering in Incident Response
menutitle: Auscert 2025 Workshop
weight: 150
---

This workshop was held at the Auscert 2025 Conference, May 20th 2025.

### Abstract

Detection engineering has emerged as the science and art of creating
and managing detection rules in an enterprise. With the time to dwell
of professional ransom groups reducing to hours, the need for
effective and fast detection and response has increased
exponentially. Writing, testing and sharing detection rules with the
community forms an effective skill set in all incident response and
detection teams.

In this workshop you will learn about Sigma - an open source detection
rule format focused on sharing of detection rules between
platforms. Understanding the Sigma standard will give participants
transferable skills to many detection platforms and SIEMs as well as
an understanding of the common pitfalls inter-operating rules between
platforms.

In particular, for this workshop, we examine how Sigma can be utilised
within Velociraptor - a powerful open source endpoint visibility and
detection platform. We start by describing the basics of Sigma and how
to write Sigma rules. We cover single event rules against Windows
event logs and then continue to correlation rules. While we use
Velociraptor as an example, these rules and techniques can be applied
to many other detection platforms.

We then examine some of the unique ways Sigma is extended within
Velociraptor to apply to many more event sources than the traditional
Sysmon event logs (For example ETW on Windows, eBPF on Linux). We will
also learn how Sigma can be extended to the field of Digital Forensics
to enable rapid triage on non-log evidence, such as MFT records,
prefetch records and browser history.

By extending detection capabilities to a variety of detection sources,
we can codify "what looks suspicious" to an experienced DFIR expert,
in order to quickly surface items that require further inspection -
thereby increasing detection efficiency and reducing the time to
triage an incident. By employing rapid triage through Sigma detection
rules you will learn to reduce your investigation time by orders of
magnitude.

While you might have seen Velociraptor presented in previous
conferences and workshops, in this hands-on workshop we will focus
less on the tool and more on how to use Velociraptor to implement
advanced detection rules. After a short introduction to the tool, we
will focus on writing, testing and maintaining detection rules in a
scalable manner. Finally we convert the detection rules we have
written to a real time monitoring artifact for live alerting when an
endpoint is compromised.


### Slides

<iframe src="https://present.velocidex.com/presentations/2025-auscert-detection_workshop/index.html" frameborder="0" width="980px" height="600px" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

[Full Screen](https://present.velocidex.com/presentations/2025-auscert-detection_workshop/index.html)

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/3EBrpFngfd4?si=QU5k6bklhCwRXyTV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
