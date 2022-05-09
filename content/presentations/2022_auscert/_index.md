---
title: Auscert Workshop 2022
menutitle: Auscert 2022
weight: 35
---

At Auscert 2022, The Velociraptor team gave a 4 hour workshop and a
Presentation. Below you will find the slides.

## Talk: I can see you! - Improving detection efficiency on the endpoint…

With the rise of cybercrime and reduced dwell time before compromise,
the importance of fast and effective incident response and detection
has never been more evident. Much of current detection technology
relies on collecting selected events from the endpoint, forwarding
them to a central SIEM, where data mining techniques are applied on
large volumes of data to detect compromises. This approach is limited
in both scalability and in the limited types of forwarded events
available to the SIEM for detection.

In this talk we explore some less common event sources, in particular,
the Event Tracing for Windows (ETW) providers that go further than
typical process/registry modifications logs. To illustrate, we
describe some case studies, such as process parent spoofing, which is
difficult to detect using traditional methods.

Tapping into ETW providers increases the total volume of forwarded. To
address this problem, the industry is moving towards on-host
detection. Inspecting the events on the endpoint itself reduces the
need to forward all events, whilst increasing the detection
efficiency.

Finally, we cover some of the limitations of ETW as a detection
technology. Like all technologies, ETW can also be used to advantage
the adversaries. We discuss some of the countermeasures to malicious
ETW use and how to detect such use in practice.

For this talk, we look at the Velociraptor open-source endpoint
visibility platform as an illustrative example.

The takeaway for attendees:

1. Industry trend is to move more of the detection and filtering to
   the endpoint instead of simply forwarding large volumes of logs to
   a central SIEM

2. There are many more useful event sources than the traditional
   process/registry modification events available through ETW

3. ETW is not a magic bullet - it has some practical limitations but
   it is useful to understand and apply for modern detection.


<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTsDqy_0Vy1SzV3kQ_j5rfl3S5xL1pwKSLHat73VBFgSe_cNNTo80Ds2cJNad2wt588Al_29Vudtieg/embed?start=false&loop=false&delayms=3000" frameborder="0" width="1280" height="749" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

## Workshop: Digging Deeper with Velociraptor (Half Day)

With an increasingly mobile and remote workforce the old manual
approach to incident response does not scale. The dwell time of
ransomware operators is now measured in days and weeks, making the
need for fast effective response critical.

Welcome to the age of Velociraptor - the new open source DFIR
visibility tool everyone has been talking about! Velociraptor is
powered by a flexible and powerful query language, allowing you to
rapidly go from an advisory or a new hunting idea to getting
actionable data in minutes. Then you can leverage the power of
Velociraptor's remediation and detection capabilities to ensure the
compromise is cleaned up and never happens again!

This workshop is an introduction to hunting and incident response with
Velociraptor for information security professionals. You will download
and install Velociraptor, then deploy a new deployment and become
familiar with the GUI. Experience the power of scaling a hunt across a
large network (over 1,000 endpoints). We then continue to post process
the data to quickly identify anomalies.

We cover some case studies in modern DFIR techniques exposing
artifacts such as hunting memory for Cobalt Strike beacons, detecting
lateral movement through forensic artifacts, and leveraging ETW to
gain deeper visibility of endpoint activity.

This workshop will be hands on and include examples you should run on
your own windows VM. All you need to participate is a Windows VM
(e.g. a cloud instance or local VM).

Participants will learn:
1. How to install Velociraptor locally
2. The basics of the Velociraptor Query Language (VQL)
3. How to apply community queries from the Artifact Exchange
4. Hunting large number of machines for compromise in minutes
5. Create offline collectors for responding to networks without
   installing the Velociraptor agent

This talk was given at the Annual Auscert conference as a long form (4h) workshop
https://conference.auscert.org.au/program/


<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTKbAGMDDAhgTn33FbTXPGY8gYlL1ueCoIn-gERwbxXyRdyadKOcg9ho1Y-RGUmi4MbbwVe1g5Xszr2/embed?start=false&loop=false&delayms=3000" frameborder="0" width="1280" height="749" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
