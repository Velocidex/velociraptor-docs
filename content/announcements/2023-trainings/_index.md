---
menutitle: "Trainings"
title: "Upcoming Training Events"
description: |
    The Velociraptor team will be at BlackHat this year!

weight: 20
no_edit: true
noTitle: true

---

# Digging Deeper With Velociraptor
## Mike Cohen, Digital Paleontologist, Rapid7 Inc. | August 5-8

This year we will be presenting an extensive, 4 day long, Velociraptor training course
at [BlackHat 2023](https://www.blackhat.com/us-23/training/schedule/#digging-deeper-with-velociraptor-30129)!


### Course Contents

### Installation and introduction to the UI

The old way of performing in-depth forensic analysis and incident
response with your existing tools is clearly not adequate or scalable
to many endpoints. It is just too time consuming to analyze many
machines, acquire large disk images, and memory, let alone actively
hunt for indicators of compromise across your entire network.

You heard that Velociraptor, an advanced open source endpoint
visibility tool, is the ideal tool for effectively investigating,
hunting and monitoring your endpoints with minimal fuss.

You are excited to install Velociraptor and deploy it to your entire
infrastructure. This module is for you! In this module we will deploy
Velociraptor and gain an introduction to the basic operation of the
tool. We will learn the architecture and the unique mindset behind the
tool.

### Exercises:

Installing a typical secure Velociraptor server on a cloud VM.  Deploy
Velociraptor clients on a typical Windows network using group policy.
Introduction to the Velociraptor Query Language (VQL). It is the
workhorse behind the tool and mastering VQL will provide you with the
flexibility you need to adapt to rapidly changing challenges.

### Interactive forensic investigation:

Velociraptor puts the power of experienced digital forensic
investigators at your fingertips! This module will cover at a high
level the basics of modern forensic analysis techniques. You will now
be able to apply these techniques to answer many questions – from
determining evidence of malware execution, detecting persistent
malware to uncovering malicious user activity and determining
ex-filtration of proprietary data.

### Basics of Windows Forensics

#### NTFS Overview

* Data Streams and the $MFT
* Recovering evidence of deleted files from $MFT and USN journal carving

#### Registry
* What is the Windows Registry?
* Inspecting user hives and user profiles.
* Common registry based malware persistence mechanisms

#### Windows Management Instrumentation (WMI)
* What is WMI and what information is exposed with it?
* Lateral movement and privilege escalation using WMI – an attacker's favorite!
* WMI persistence mechanisms (Filter/consumer bindings)

#### Windows Event Logs are the cornerstone of windows auditing
* How are event logs structured?
* What are event Ids and how do they relate to messages?
* Some examples of common event log messages: lateral movement, powershell abuse etc.

#### Interactive investigation – collecting artifacts:
Throughout this module we will use Velociraptor to gain experience in
analysis and searching for the discussed artifacts.

#### Triage and data collection – collecting data without an agent
A remote user is suspected of being compromised. The user is located
in Australia and therefore due to limited bandwidth, can not upload
vast amounts of data quickly. You need to triage their system to
determine if they are compromised. You would like to acquire memory,
critical files and capture as much of system state as
possible. Unfortunately, the user is not command-line savvy – but
luckily they are really good at double clicking a binary!

In this module we learn how to perform offline collection with
Velociraptor. We prepare an automatic collection package which simply
acquires system state when double clicked. The package will
automatically upload the files to a cloud bucket when run.


#### Lateral movement and hunting:
You have discovered evidence of compromise on some of your
systems. Your boss wants to know if the attackers have laterally moved
through your network and the extent of compromise. You would like to
hunt for the indicators.


### Monitoring for events:
You have learned so much in this course about how to detect malware,
lateral movement and compromise. But so far, everything was reactive –
we were looking at forensic evidence left behind after the fact. What
you really want is to design monitoring and alerting that will let you
know when evidence of compromise is found in real-time. Luckily
Velociraptor is a complete endpoint monitoring and response tool!

#### Introduction to Velociraptor's event monitoring framework
Windows Event Log forwarding and classification. Event log enrichment
and prioritization.  Monitoring for changes in system state: New file
executions and High-risk files such as office macros and remote
PowerShell

### Capture the Flag
On the final day of the course you can demonstrate your skills using a
number of live exercises - a friendly game of capture the flag!

## Book now

Reserve your spot on this course by clicking here
https://www.blackhat.com/us-23/training/schedule/#digging-deeper-with-velociraptor-30129
