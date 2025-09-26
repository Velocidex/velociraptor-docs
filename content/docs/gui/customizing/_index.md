---
title: Customizing the GUI
menutitle: Customization
date: 2025-09-26
last_reviewed: 2025-09-26
draft: false
weight: 100
summary: "Customize your GUI experience."
---

Certain pages in the GUI allow for customization. The layout and content of
these pages are defined in corresponding Velociraptor
[artifacts]({{< ref "/docs/artifacts/" >}})
and these use [Go's templating](https://pkg.go.dev/text/template)
language to produce the HTML that the user ultimately sees and interacts with.

{{% notice note "Some web developer experience is required" %}}

Customizing GUI content does require a reasonable degree of understanding of
HTML as well as Go's templating language. Typically customization amounts to
small tweaks where you might make a change to the layout or customize specific
elements that you don't like, although extensive customization can be done if
you really need to.

There are many excellent guides to templating and HTML available on the internet
and for that reason this is not intended to be a tutorial on those topics.

{{% /notice %}}

## What pages can be customized?

- `Server.Internal.Welcome`
- `Server.Monitor.Health`

### Including image content

The GUI is not served from disk, which means that you cannot place images on
disk and expect them to be picked up and served like a typical web server. Image
content that the GUI uses by default are compiled into the binary as static web
assets and then served from memory.

So what do you do if you want to include custom images?

It is possible to include links to images from external locations using the
`<img>` HTML tag, although this may be problematic if there is proxying of
content filtering in your network environment, or if the external image hosting
is unreliable or slow.

If you are doing extensive customization or customization that requires
compiling your own server binary then these images can be included in the source
tree under `gui/velociraptor/src/public` which will then serve these as static
assets.

For inclusion of one or two small images it is probably best to add them to the
artifact itself, which can be done by encoding them and embedding them as data
URIs inside the template section of the artifact. The benefit of doing so is
that the custom artifact is then self-contained and portable. The downside is
that the embedded images may take up a quite a bit of space in the artifact and
therefore might not be very visually pleasing. Here is an example of what that
would look like:

![An image embedded as a data URI](welcome2.png)

![Embedded image rendered](welcome3.png)

As mentioned, this is generally better for small images for example SVGs which
are more compact than their equivalent raster format representations. However
all image formats that modern browsers support should work as data URIs. There
are online tools that will help you create a data URI from an image and wrap it
in an `<imag>` tag.

{{% notice note "HTML security considerations" %}}

For our GUI templates we use Go's text/template package, not the html/template
package. In addition some sanitization is applied to the resultant HTML for
security reasons, so not all HTML tags and features are available.

{{% /notice %}}

## Custom sidebar and context links

## Developing custom themes

We try to provide enough themes so that at least one will satisfy your tastes,
but if you have a very specific requirement we've built Veloiciraptor's GUI in
such a way that adding themes is not too difficult if you have experience with
CSS development.

Each theme is really just CSS stylesheet. The current'y included theme files can
be viewed [here](https://github.com/Velocidex/velociraptor/tree/master/gui/velociraptor/src/themes.)

## Developing custom translations

Velociraptor is designed so that additional languages can be added to the GUI
relatively easily in a modular way.

Each user is able to independently select
their preferred langage in their
[user preferences]({{< ref "/docs/gui/user_preferences/" >}}),
amongst other preferences such as theme and their local time zone.

We already support English, German, Spanish, Portuguese, French, Japanese, and
Vietnamese, but we welcome assistance in supporting other languages that we
haven't got covered yet. If you would like to contribute towards supporting
additional languages then please reach out to us on Discord.



