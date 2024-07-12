---
menutitle: "Artifact Exchange"
title: "Artifact Exchange"
date: 2021-06-12T14:03:59Z
draft: false
weight: 150
pre: <i class="fas fa-code"></i>
no_edit: true
disableToc: true
no_children: true
rss_data_file: static/exchange/data.json
rss_title: Velociraptor Artifact Exchange
noDisqus: true
outputs:
- html
- RSS
---

The artifact exchange is a place for sharing community contributed
artifacts. Simply search below for an artifact that might address
your need. If you wish to contribute to the exchange, please click the
button to the right.

{{% notice tip "Importing the artifact exchange" %}}

You can automatically import the entire content of the artifact
exchange into your server by running the
`Server.Import.ArtifactExchange` artifact.

Alternatively, download the [artifact
pack](https://github.com/Velocidex/velociraptor-docs/raw/gh-pages/exchange/artifact_exchange_v2.zip),
and manually upload them in the GUI (navigate to `View Artifacts` and
click the `Upload Artifact Pack` button)

{{% /notice %}}


{{% notice warning "Security of the exchange" %}}

The artifact exchange is not officially supported by the Velociraptor
team and contains contributions from the community. The quality,
security and stability of artifacts from the exchange **is not
guaranteed**. Some artifacts from the exchange will fetch external
binaries and run them on your endpoints! These binaries are **not
reviewed or endorsed** by the Velociraptor team or Rapid7!

Contributions to the exchange must meet a lower quality bar than built
in artifacts (for example lacking tests), which means that they may
break at any time or not work as described!

Collecting any of the artifacts in the exchange **is purely at your
own risk!**.

**We strongly suggest users review exchange artifacts
carefully before deploying them on their network!**

{{% /notice %}}


{{% exchange %}}
