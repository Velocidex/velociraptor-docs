+++
title = "Overview"
date = 2021-06-09T02:33:37Z
weight = 5
chapter = false
pre = "<b>1. </b>"
+++

# Velociraptor Installation and overview
### Introducing the little green reptile!

In this chapter we introduce the tool and explain the rationale behind its design.
We will deploy Velociraptor in a cloud environment - We aim to be as close to how one would deploy it on a real deployment as possible.
We will play with the GUI and introduce some of the main concepts


## What is Velociraptor?

Velociraptor is a unique DFIR tool, giving you power and flexibility through the Velociraptor Query Language (VQL)
VQL is used for everything:

* Collecting information from endpoints (also called clients)
* Controlling monitoring and response on endpoints
* Controlling and managing the Velociraptor server.


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
