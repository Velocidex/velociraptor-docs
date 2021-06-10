+++
title = "Velociraptor Overview"
date = 2021-06-09T02:33:37Z
weight = 5
chapter = false
#pre = "<b>1. </b>"
+++

## So what is Velociraptor?

Velociraptor is a unique, advanced open-source endpoint monitoring,
digital forensic and cyber response platform.

It was originally developed by DFIR professionals who needed a
powerful and efficient way to hunt and monitor activities across
fleets of endpoints for specific artefacts, in a wide range of digital
forensic and cyber incident response investigations such as:

* Responding to data breaches
* Reconstructing attacker activities through digital forensic analysis
* Hunting for evidence of sophisticated adversaries
* Investigating malware outbreaks and other suspicious network activities
* Continual monitoring for suspicious user activities, such as files
  copies to USB devices
* Disclosure of confidential information outside the network
* Gathering endpoint data over time, for use in threat hunting and
  future investigations.


## VQL - the Velociraptor difference

Velociraptor is a unique DFIR tool, giving you power and flexibility
through the Velociraptor Query Language (VQL) VQL is used for
everything in Velociraptor not only in order to query the endpoint
itself. For example, VQL can be used to create continuous monitoring
rules on the endpoint, as well as automate tasks on the server.

The most powerful feature of Velociraptor is its framework for
creating highly customized **artifacts** which allow a user to
collect, query and monitor almost any aspect of a single endpoint,
groups of endpoints or an entire network.

## Overview

This introduces the tool and covers the basic tasks required in
deploying and using the GUI.


95
The VFS view is similar to many other forensic packages. This makes it easier to use but it is very much less effective than writing artifacts!

129
The Velociraptor Reverse Proxy
Velociraptor has a built in reverse proxy

This allows us to serve other web applications through the Velociraptor server. Velociraptor will take care of authentication and SSL for free.
It is useful to export the filestore so users can just download the files they want.


Export the file store over HTTPS
GUI:
  reverse_proxy:
  - route: /files/
    url: file:///var/tmp/velociraptor/clients/
    require_auth: true


130

131
Browse the internal file store and note the location of different files.

132
Double check your security
It is really important that auth is required!
Test this twice!
Try to get one of the URLs with no authentication using curl - it should redirect to the auth screen.



Conclusions
In this module we introduced Velociraptor - a powerful endpoint visibility solution
We mentioned that Velociraptor is based on VQL - a flexible query language
We installed Velociraptor in a cloud deployment, prepared custom MSI packages and distributed them using group policy to our endpoints.
133

Conclusions
We introduced the Velociraptor GUI
The Virtual Filesystem abstraction (VFS) provides server side caching of the client’s filesystem
We can navigate and refresh our view of the client’s filesystem in a familiar way.
We learned about artifacts as a way of encapsulating VQL queries in a human readable, functionally focused YAML file.
134

Conclusions
We learned how artifacts can be collected from one end point
Exporting the collection into a zip file can archive the files collected and query results as CSV files.
Leveling up, we can collect the same artifact from many systems. This is called a hunt.
Exporting the hunt as a Zip file allows large collections to be archived as a snapshot from the entire deployment.
135


### Velociraptor Overview

# Velociraptor Installation and Overview

![Test](media/image4.png)


Lorem Ipsum.
