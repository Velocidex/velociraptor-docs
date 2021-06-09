---
title: "Clients"
date: 2021-06-09T03:53:38Z
draft: false
weight: 20
---


Now let’s configure some clients.

45
Deploying clients
We typically distribute signed MSI packages which include the client’s config file inside them.
This makes it easier to deploy as there is only one package to install.

We also change name of service/binary etc to make the service a little bit harder to stop.

46
Deploying clients
It is possible to embed the config in the clients using the velociraptor config repack command (more later)
Pros
Only a single binary no need for an additional config file

Cons
You have to sign the binary again since the config alters the binary.

Resigning binaries
After buying a code signing cert you can use a script to sign automatically.
We recommend having a standalone isolated signing machine or VM with FDE
47

48
On your windows machine, Download the latest binary and the source code.
github.com/velocidex/velociraptor/releases

49
Velociraptor’s public directory
It is handy to have somewhere to serve files from. Velociraptor has a public directory where files are served without any authentication requirements

We can use this to distribute third party binaries
We can serve velociraptor MSI files
We can serve various support files (yara rules etc).

Velociraptor’s public directory
Select the Admin.Client.Upgrade artifact and upload the MSI to the tools setup page (We will learn about that in the next few sessions).

This will now produce a random URL you can serve the MSI from.
50

Copy WIX source to desktop.
51

52
Build an MSI using Wix Toolkit
Extract the docs/wix directory from the Velociraptor source tree.
These are the required files to construct a new MSI
The main file we use is custom.xml . This file will embed the config file within the MSI and deploy it to the correct directory.

53
There are many knobs to tweak here
The name of the binary
The location of the files
The name of the service
The name of the config file.

WIX will take the binary and config file from the Output directory, so create it and place the files there.

54

55
The custom msi contains the client config embedded in it.

This is the recommended way to deploy clients.

56
After installing the MSI you should be able to see it immediately in the server’s search screen.

57
Domain deployment
We can deploy the MSI to the entire domain using group policy.

2 Methods
Via scheduled tasks.
Via assigned software.

58
Create a share to serve the MSI from.


59
Ensure everyone has read access from this share - and only administrators have write access!

60
Use the group policy management tool create a new Group Policy Object in the domain (or OU)

61
Edit the new GPO

62

63
Ensure the new scheduled task is run as system


64
Using scheduled tasks you can run any binary - use this method to run interactive collection if you do not have a dedicated Velociraptor server

65
Ensure the new scheduled task is run only once


66
Method 2 - install via assigned software packages in GPO

The main advantage here is that it is possible to upgrade or uninstall Velociraptor easily

67

68
You will need to wait until group policy is updated on the endpoint or until the next reboot. The endpoint must be on the AD LAN
