---
title: The Next Phase of Velociraptor
date: 2021-04-21
---

We’ve made great strides on our journey to make the Velociraptor vision come true. We’ve built an open-source Velociraptor to help users deploy a world-class tool for endpoint monitoring, digital forensics, and incident response. Today, I am happy to announce our new home with Rapid7.

Boston-based **Rapid7,** **provider of security analytics and automation, has acquired the Velociraptor open-source technology and community**. Rapid7 shares our vision and will help us continue to achieve it. We’re gaining a great partner in Rapid7 on this journey.

In the many years I’ve been in cybersecurity — including time at Australian Signals Directorate (currently known as [ACSC](https://www.cyber.gov.au/)), the [Australian Federal Policy](https://www.afp.gov.au/what-we-do/crime-types/cyber-crime), and Google’s DFIR team — I’ve learned that digital forensics and incident response (DFIR) is a unique field. Defenders are typically at a disadvantage for a few reasons:

* **Attackers only need one of the many possible avenues to compromise the network**, while defenders have to cover all avenues effectively.

* **Defenders have to detect more attacks on the endpoint** as organizations expand their environments beyond the network perimeter to interconnected systems on the internet.

* **New vulnerabilities are being discovered almost daily** and attack tools like ransomware are designed to extract maximum damage from victims (in the good old days, the worst an attacker might achieve is a defaced website!).

* **Building out DFIR capabilities requires specialized knowledge and skills** in the intricacies of operating systems, web technologies and networking just to understand the advisories, let alone to detect breaches on the network.

Velociraptor was born from these observations. As an open-source developer and contributor for many years, it became clear to me that the way forward lies in open source and, more importantly, the ability of open source to bring together a community of users and developers. No one person, team or company can cover the entire DFIR field quickly and sufficiently enough. It is clearly a task for a community effort!

I also observed that existing open-source tools required a high-level of development skills to contribute code, and had a long release/deployment cycle. Velociraptor’s unique approach is to provide powerful building blocks accessible through a simple query language called VQL. Having an intermediate query language as the mechanism to write new detection, collection and analysis capabilities in Velociraptor facilitates the following goals:

* **VQL must be simpler to learn than a full-featured programming language** to lower the barrier to entry for prospective contributors. In many cases, VQL can be tweaked from existing queries to cover novel detection or analysis techniques using primitives already available in Velociraptor (like NTFS analysis) but combined in novel ways.

* **VQL must be able to be deployed quickly.** Since VQL queries can be added at runtime without the need to rebuild or re-deploy endpoint software, they can be used instantly to hunt for new indicators in minutes.

The Velociraptor vision is that VQL queries are the medium of information sharing and exchange between DFIR experts, researchers, and the users who are desperately trying to determine if their networks are compromised.

Attack methods are becoming more sophisticated all the time, and the techniques required to detect these go far beyond simple hashes, event log forwarding, and Yara signature of current technology. Techniques such as analysis of evidence of execution, low-level NTFS artifacts, parsing process memory and various artifacts left behind on disk are now required to reconstruct the attack timeline for effective detection and remediation. It is clear that Velociraptor needs to provide access to these advanced analysis techniques to enable sophisticated novel detection at scale on the endpoint.

**A new partnership**

I am very excited that Rapid7 shares our community’s vision and will help us achieve it. The one aspect I was really excited about is Rapid7’s commitment to open source and track record of responsible stewardship. The company created an open-source community of its own with [AttackerKB](https://attackerkb.com/), a community-driven platform where security professionals exchange information about vulnerabilities to better understand the impact and likelihood of being exploited. And Rapid7 has been shepherding and supporting the [Metasploit](https://www.metasploit.com/) Project, which it acquired nearly a dozen years ago.

The Metasploit Project is still one of the most consistently active open-source security projects and communities in the world. Rapid7 recognizes the immense value of ongoing collaboration between the community and the Metasploit open-source team, and the company has continued to invest in and nurture Metasploit. In return, the Metasploit community has built trust with Rapid7. Under Rapid7’s stewardship, the Metasploit Project continues to grow, thrive, and evolve.

There is a great synergy between Metasploit — the standard red team framework — and Velociraptor — the standard blue team platform. When a new vulnerability or exploit is published, the Metasploit project implements a module targeting it within days. Imagine a Velociraptor VQL query being published within a similar timeline! Rapid7 is a natural choice for nurturing and drawing from the collective knowledge of both red and blue teams.

Much like Rapid7 has done for Metasploit, the company is committed to building the Velociraptor community. I will be joining Rapid7 to continue leadership and support of the community — with all of the resources of Rapid7 to back me up — so, together, we may improve the state of blue teaming and defense.

Rapid7 also has a vibrant services team that experiences daily the cybersecurity breaches that we are trying to defend against. Having practical, hands-on exposure to current and emerging threats places Rapid7 in the unique position of contributing and supporting Velociraptor — thereby feeding a lot of the practical, real-world experience to the community in the form of effective, well-tested VQL queries. Additionally, integrating Velociraptor into a large-scale detection capability will provide the impetus to develop a highly scalable Velociraptor server that’s able to serve a large number of endpoints efficiently.

Rapid7’s commitment to the future of the Velociraptor community will ensure that Velociraptor is well-known globally. With conference appearances and community events, Rapid7 will promote the tool, grow the community, increase the types of users, and cater to a wider set of needs. This will benefit the entire community, as Velociraptor’s capabilities are improved.

Rapid7 will enable Velociraptor to graduate to the “next level” in terms of scale, development velocity, stability and capability by drawing on a wide-range of capable and experienced people to support the project. I am very excited to see the Velociraptor vision coming true.

There are no plans to commercialize Velociraptor. However, the Managed Detection and Response teams at Rapid7 will immediately leverage Velociraptor and insights from the community to enhance its incident response capabilities for customers. Further, integration of Velociraptor’s endpoint data collection capabilities with Rapid7’s Insight agent will greatly increase Rapid7’s endpoint visibility and detection capabilities and deliver immediate benefits to its customers.

Finally, dear reader, if you also share our vision for a powerful and free open-source platform to enable blue-teamers to quickly hunt, detect, and remediate novel threats, consider joining our community. Download Velociraptor from [GitHub](https://github.com/Velocidex/velociraptor), kick the tires, and provide feedback.

**Check out the [blog](https://www.rapid7.com/blog/post/2021/04/21/rapid7-and-velociraptor-join-forces) Rapid7 posted** about their commitment to supporting this community.
