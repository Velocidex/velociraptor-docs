---
title: "The Admin GUI"
date: 2021-06-09T04:02:57Z
draft: false
weight: 20
---

The Admin GUI is a web application that can be used to interact and
manage Velociraptor. The GUI allows users to schedule new collections,
edit existing artifacts or write new ones and launch hunts.

Let's take a quick tour of the GUI.

## Themes

Velociraptor offers two major themes: Light mode and Dark mode. You
can change between the two by clicking on the user's avatar at the top
right corner.

![Velociraptor Themes](modes.png?classes=shadow&width=80pc)

Velociraptor remembers each users preferences and will automatically
show the correct theme when logging in.

## The Welcome screen

The Velociraptor landing page offers some links to commonly used tasks
within the application.

Of interest is the link to `View Server Configuration`. This allows
administrators to set server metadata such as secrets to interact with
other systems.

![The Server Metadata editor](server_metadata.png?classes=shadow&width=80pc)

{{% notice info %}}
You can customize the Welcome screen by editing the `Server.Internal.Welcome` artifact.
{{% /notice %}}

## The Dashboard

The Dashboard can be accessed from the Home icon on the sidebar. The
dashboard shows the current state of the deployment at a high level.

![The Server Dashboard](dashboard.png?classes=shadow&width=80pc)

The dashboard is divided into two parts. On the left, the total memory
and CPU used by all frontends is down over the past day. On the right,
the total number of currently connected clients is shown.

{{% notice info %}}

You can customize the Server Dashboard screen by editing the
`Server.Monitor.Health` artifact. The artifact specifies a template
containing markdown and using the Golang Template Language. You can
also run arbitrary VQL in dashboards!

{{% /notice %}}

## Continue on your tour

{{% children %}}
