---
title: Velocon 2022
menutitle: Velocon 2022
weight: 75
---

On Sept 15, 2022 We held our first VeloCon - a day-long virtual summit
as we DIG DEEPER TOGETHER!

Here are the talks and recordings from the day.

{{< toc >}}

## Velociraptor year in review
By Mike Cohen

<a href="https://present.velocidex.com/presentations/velocon_2022_year_in_review/" target="_blank">
    Slides!
</a>
<p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/ahUMgKZLHLk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Notebook and VQL - data munging your way to victory!
By Matt Green

Velociraptor notebook is a feature that supercharges analysis and speeds up many components of incident response. New users are often intimidated by advanced VQL and don’t know where to start. This talk aims to shed some light on data manipulation in VQL and provide some practical examples that can be taken away for better artifacts and analysis.

<a href="https://docs.google.com/presentation/d/1Ev1o3nDmTyejOj2RDjiscRvV_SeS0E90ygrlZU0wsig" target="_blank">
    Full Screen
</a>
<p>
<iframe src="https://docs.google.com/presentation/d/1Ev1o3nDmTyejOj2RDjiscRvV_SeS0E90ygrlZU0wsig/embed?start=false&loop=false&delayms=3000" frameborder="0" width="560" height="315" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/VoO7y65TOsE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Velocistack: Swiftly Configuring a Streamlined Investigation Environment
By **Wes Lambert** - Principal Engineer, Security Onion Solutions

In this presentation, we’ll discuss Velocistack, a Docker-based, free
and open investigation stack centered around Velociraptor. The project
makes it super easy to spin up a local Velociraptor server with Docker
Compose, tied together with other services that complement
investigation and can benefit analysts or incident responders.

Want to post-process collection or hunt results outside of
Velociraptor?

Maybe it would be beneficial to be able to quickly and easily search
through the data and correlate with other data sets?

How about the ability to build detailed graphs and visualizations
around Velociraptor artifacts or metrics?

Would you like to be able to perform data decoding and transformation
using a variety of recipes, baking your data to perfection?

Want the ability to easily track investigations through native case
management, attaching evidence to cases, associate evidence/IOCs to
assets, and build greater context around collected data?

Want to better understand how to leverage Velociraptor’s “transparent
proxy” feature to host your own additional services behind it?

If you answered yes to any of these questions, then Velocistack may be
for you! To learn more about Velocistack, attend this presentation!

<iframe width="560" height="315" src="https://www.youtube.com/embed/IFChO6ER3_Y" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


[Slides](https://drive.google.com/file/d/19Vpf1Wb5CzWEU44PJxz0sTiAbWHAdT_g/view?usp=sharing)

## Machine Learning for DFIR with Velociraptor: From Setting Expectations to a Case Study
By **Christian Hammerschmidt, PhD** - Head of Engineering/ML, APTA Technologies

Machine learning (ML) or artificial intelligence (AI) often comes with
great promise and large marketing budgets for cybersecurity,
especially in monitoring (such as EDR/XDR solutions). Post-breach, it
often turns out that the actual performance falls short of its
promises.

In this talk, we'll briefly look at ML for DFIR: What tasks can ML
solve, generally speaking? What requirements do we have for a useful
ML system in cybersecurity/DFIR contexts, such as reliability,
robustness to attackers, and explainability? What makes ML difficult
to apply in cybersecurity, e.g. when thinking about false alerts or
attackers attempting to circumvent automated systems?

After discussing the basics, we look at ML for velociraptor:

1. How can we process forensic data collected with VQL using machine
   learning (with a typical Python/Jupyter/scikit-learn/PyTorch
   stack)?

2. And how can we build artifacts that run ML directly on each
   endpoint, avoiding central data collection?

The talk concludes with a case study, showing how we significantly
reduced time to analyze EVTX files in incident response cases, saving
thousands of USD in costs and reducing time to resolution.

Bio: Chris Hammerschmidt did his PhD research on machine learning
methods for reverse engineering software systems. Now, he's heading
APTA Technologies, a start-up building machine learning tools to
understand software behavior .

Affiliation: APTA Technologies, https://apta.tech

<iframe width="560" height="315" src="https://www.youtube.com/embed/lFfAam4KLuY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Slides](https://drive.google.com/file/d/1wtHAAi00CMGDj9d5nqcGD67MZR_XIkA2/view?usp=sharing)

## When Dinosaurs Ruled the Blue Team: Retrieving triage images with EDR
By **Dan Banker**
Threat Response Team Lead at Motorola Solutions

With the recent rise in users working remotely, many security-related
processes have had to adapt. One of these is capturing a forensic
image for analysis. Acquiring a bit-for-bit copy of a 500 MB+ disk
over the network can be impractical, and obtaining the physical drive
may introduce unacceptable delays. I will outline a process for using
EDR to deploy the Velociraptor standalone executable and capture a
triage image under 500MB in size. The executable can be deployed and
the image retrieved in under 30 minutes, and will hand your team the
most important forensic artifacts to start the investigation. I'll
also cover using Winpmem in a similar process to retrieve memory, and
an alternate triage image process for Linux machines.

<iframe width="560" height="315" src="https://www.youtube.com/embed/eL2YZ1CoKtQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Slides](https://drive.google.com/file/d/1pmhMxnXwD5VEQ8IyFdxUsMsqCIfpYuvN/view?usp=sharing)

## Using DinoSOARLab to Uncover Adversary Actions and Orchestrate Rapid Response
By **Wes Lambert** - Principal Engineer, Security Onion Solutions

Have you ever worked in a DinoSOAR lab? If not, now’s your chance!

In this presentation, we'll discuss integration of Velociraptor with
Security Onion, a free and open platform for enterprise security
monitoring, intrusion detection, threat hunting, and log management.

Along with other tools, the integration will assist in facilitating
contextual enrichment, orchestration, and automation by tying together
host, network, and other telemetry in an effort to paint a more
accurate picture of adversary activity in a computer network.

While Velociraptor provides excellent insight and the ability to
gather and process forensic evidence quickly and easily, when paired
with passive network analysis from tools like Suricata (NIDS alerts),
Zeek (connection/protocol-specific/transaction logs), Google
Stenographer (full packet capture), we can glean important
associations that otherwise might not have been noticed, more
effectively scope an incident, and potentially come to a conclusion
much more quickly during an investigation. We can pore over, sort, and
create visualizations to correlate activity and build relationships
between artifact/host data from Velociraptor and network data provided
by Security Onion.

To track our investigations, we can create cases, adding observables
and enriching the data made available by Velociraptor and other tools,
or kick off additional hunts as needed. In this way, we’re going
full-circle from Velociraptor to Security Onion and so on, with each
complementing the other to provide additional context and
capability. Attendees will walk away with an understanding of not just
how they can benefit from integration of Velociraptor with Security
Onion, but with other stacks and technologies as well.

<iframe width="560" height="315" src="https://www.youtube.com/embed/5RxFjQc652w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Slides](https://drive.google.com/file/d/15jf6pHkYq5Gu9ih-iAaKKtemyX9Tp4pi/view?usp=sharing)

## Cloud Native Velociraptor
By **Mike Cohen** - Digital Paleontologist

Velociraptor is fast becoming the default choice for a DFIR and
continuous monitoring solution. While Velociraptor was originally
designed for ease of deployment, targeting smaller organizations, as
the tool matures and gains more enterprise ready features there is a
growing need to cater for very large cloud native deployments (in the
millions of endpoints).

This talk introduces a new project based on Velociraptor called "Cloud
Raptor". This experimental new project is an attempt to implement
Velociraptor using cloud native technologies, namely S3 and Opensearch
as well as using AWS Lambda functions. The talk will cover some of the
architectural aspects of the Velociraptor code base that make it
possible to reimplement core functionality easily.

The new architecture makes some Velociraptor features easier to
implement, while other features are more difficult to implement. This
talk will discuss the pros and cons of this approach since it is
currently not a complete feature for feature
implementation. Nevertheless, having an additional, highly scalable
version of Velociraptor that can be used in some situations is very
useful to the Velociraptor ecosystem.

<a href="https://present.velocidex.com/presentations/velocon_2022_cloud_velo/" target="_blank">
    Slides!
</a>
<p>
<iframe width="560" height="315" src="https://www.youtube.com/embed/tdsOrU_fxXE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Velociraptor and Law enforcement
By **Luke Fardell** - Director of DFIR, Control Risks

Dealing with an incident which results in the prosecution of a threat
actor when all the data was gathered using Velociraptor. The talk
focuses on the challenges faced when dealing with the courts and the
police when stepping away from the normal full disk imagery processes
the courts are used to.

I used Velociraptor during a network breach for a client, the attack
resulted in all sys admin accounts being removed from the AD. The
threat actor then disabled the buildings access controls and
specifically the server room door controls. The threat actor then
began to destroy the datacentre by mass deleting files and wiping
systems.  The attack was thwarted mid-way through by the IT staff
using an emergency over-ride to bypass the door controls and used a
metal bar to prise open the door and pull the network cables out. This
sounds like something from a movie but it genuinely happened.

The analysis using velociraptor uncovered an account that was created
3 months prior to the attack in the AD that was used to access the
VPN. Cross checking with HR records a former sys admin was fired on
the same day. The threat actor also failed to log into some systems
and ended up re-enabling the former sys admins account to access the
door controls. During analysis we extracted the AD and obtained the
password hash for the new accounts created, the passwords we relevant
to the former employee. The firewall analysis identified a home
broadband IP address was used and also the IP address of a fishing
club frequented by the former employee.  The case is currently with
the UK courts and police. It would be great to share my experiences
dealing with law enforcement and explaining the deployment of
velociraptor and how it collects data. Specifically having to explain
the lack of a full traditional forensic image which was not possible
in this situation. The client rebuilt the network in haste and we had
to rely on the data we collected via velociraptor.  The case is still
on going and I am giving evidence and statements currently. My main
point of contention is that the lawyers are used to only dealing with
full disk images (e01 with hashes etc.) This case involved thousands
of endpoints during the deployment and the systems we gathered data
from using velociraptor had to be rebuilt over the weekend. Changing
the lawyers mindset was difficult but the process was documented using
the server side telemetry which showed our working processes and we
were able to document the analysis effectively. Also the hashing of
individual files on upload helped massively and gave the law
enforcement comfort.

<iframe width="560" height="315" src="https://www.youtube.com/embed/JvoweIS4c9g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Slides](https://drive.google.com/file/d/1voM5HDWOE4aTrdf0_w1oRzg8YZ5nPi9x/view?usp=sharing)

## Mac Response – The Good, the Bad, and the Ugly
By **Mike Pilkington**

Mac adoption is on the rise. Gartner reported 8.5% market share for
macOS in the enterprise in 2021, and the rate of adoption continues to
rise. With Macs becoming more common across more organizations, it's
important for security teams to have the ability to respond
effectively. Velociraptor offers an excellent opportunity to do that!
However, deploying and using security tooling like Velociraptor comes
with a unique set of challenges on Macs. In particular, features such
as System Integrity Protection (SIP) and Transparency, Consent, and
Control (TCC) make rapid response difficult if responders have not
planned ahead. In this talk, we’ll cover how to prepare to clear these
hurdles so that you have solid visibility when responding to Mac hosts
in your network. We’ll also look at useful areas for analyzing
potential intrusions against Macs, and how Velociraptor can speed up
the triage process at scale.

<iframe width="560" height="315" src="https://www.youtube.com/embed/-ask9Oe6ovo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Slides](https://drive.google.com/file/d/1_Y4IAxxxePV4TrhtamWQXXMZ723z7KUC/view?usp=sharing)

## Purple Teaming with ARTifacts
By **Wes Lambert** - Principal Engineer, Security Onion Solutions

Do you currently engage in purple teaming, or would like to get
started? Would you like a way to make deployment of Atomic Red Team
tests faster, easier, and more streamlined? How about determining
detection efficacy?

All of this and more can be made possible by leveraging Atomic Red
Team tests within Velociraptor artifacts. No kidding, we can implement
these tests within an artifact, then have them run on an endpoint,
without user intervention. Furthermore, we can leverage detection
rules from within Velociraptor to catch the simulated attack activity
and gauge the effectiveness of our detections.

Attendees will walk away from this presentation with several examples
of how they immediately leverage Atomic Red Team tests and catch
execution of those tests through Velociraptor to evaluate their
detection capability and improve the security of their enterprise.

<iframe width="560" height="315" src="https://www.youtube.com/embed/9HmYNDTIsJ0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

[Slides](https://drive.google.com/file/d/1nRqqodiAn1-eGw5RWOIHaI6FxS3EROwb/view?usp=sharing)
