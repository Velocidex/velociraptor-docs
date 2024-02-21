---
title: "The Admin GUI"
weight: 20
---

The Admin GUI is a web application that can be used to interact and
manage Velociraptor. The GUI allows users to schedule new collections,
edit existing artifacts or write new ones and launch hunts.

## The Welcome screen

The Velociraptor landing page offers some links to commonly used tasks
within the application.

![The Velociraptor Welcome Screen](welcome_screen.png)

{{% notice tip %}}
You can customize the Welcome screen by editing the `Server.Internal.Welcome` artifact.
{{% /notice %}}

### Inspecting Server state

Of interest is the link to `Inspecting Server state`. This allows
administrators to set server metadata such as secrets to interact with
other systems. Placing secrets in a centralized location allows
artifacts to use them without exposing them to non-administrator users
on the server.

![The Server Metadata editor](server_metadata.png?classes=shadow&width=80pc)

## User Preferences

The User can customize their interface by clicking on the user tile at
the top right of the screen. There are a number of aspects of the GUI
application that can be adjusted.

![Adjusting user preferences](user_preferences.png)

* `Org selector`: The Org selector allows a user to switch to a
  different org. See the [Organizations]({{% ref
  "/docs/deployment/orgs/" %}}) section for more information on
  multi-tenancy in Velociraptor.

* `Password`: If the deployment uses `Basic` authentication mode, this
  allows the user to change their own password. See [Basic Authentication]({{% ref "/docs/deployment/security/#basic-authentication" %}}).

* `Theme`: Velociraptor offers a number of themes including several
  dark mode themes, light mode themes and some fun themes too. Find
  the look that fits you best!

* `Downloads Password`: In a number of places in the interface,
  Velociraptor offers the user the opportunity to download collected
  data. However, in many cases this data might contain malware or
  other unwanted software that typically triggers Antivirus or other
  security software. This setting allows you to define a password to
  encrypt the zip files with to avoid triggering such software.

* `Language`: Velociraptor's interface can be switched to a number of
  languages. If your favorite language is not there, consider
  contributing a translation file!

* `Display Timezone`: The GUI shows many timestamps throughout. Times
  are always shown in RFC-3339 / ISO-8601 which makes then unambiguous
  in all timezones. This setting switches the display to show all
  times in a particular timezone. This helps visual inspection but
  does not change the times in any way (just changes their
  representation). Internally all times are always serialized in UTC.


## The Dashboard

The Dashboard can be accessed from the Home icon on the sidebar. The
dashboard shows the current state of the deployment at a high level.

![The Server Dashboard](dashboard.png?classes=shadow&width=80pc)

The dashboard is divided into two parts. On the left, the total memory
and CPU used by all frontends is down over the past day. On the right,
the total number of currently connected clients is shown.

{{% notice tip %}}

You can customize the Server Dashboard screen by editing the
`Server.Monitor.Health` artifact. The artifact specifies a template
containing markdown and using the Golang Template Language. You can
also run arbitrary VQL in dashboards!

{{% /notice %}}

## Continue on your tour

{{% children %}}
