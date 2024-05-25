---
title: Advances in Detection Engineering
menutitle: Auscert 2024 Talk
weight: 130
---

### Abstract

As defenders, we rely on having an efficient and effective detection
capabilities so we can shut down attacks quickly before the damage is
done. To do this effectively, defenders rely on automated detection,
driven by specific rules. While there are many detection platforms
available with different ways of writing rules, there is a lot of
commonality in the type of rules that are needed for effective
detection - this new discipline is called "Detection Engineering".

This talk gives the technological background to current detection
engineering techniques. How can we write effective detection rules
within the capabilities of our current detection platforms?

Detection capabilities are slowly migrating from a purely centralized
detection engines that process forwarded events from the endpoint, to
a more endpoint focused detection capabilities where the endpoint can
autonomously enrich and respond to detection rules.

The advantage of a fully distributed approach is that detection rules
can now consider many more types of signals from endpoint state in the
detection process. This leads to higher fidelity signals and much
higher accuracy.

As an example of detection engineering, this talk focuses on the Sigma
Detection rule notation - an open source rule interchange
format. Sigma was designed to be vendor agnostic and can be used to
write generic rules which can be applicable to many different
detection engine backends

While traditional centralized detection systems rely on log forwarding
from the endpoint, modern endpoint specific detections can look at
wider signals, such as system configuration, process memory, process
state. As detection capabilities improve, Sigma can be evolved to
accommodate more powerful endpoint detection systems, by incorporating
more powerful sources of information only available on the endpoint.

Finally we discuss how Sigma can be extended to include automated
remediation capabilities for autonomous endpoint response. For
example, killing suspicious processes, placing the system under
quarantine or other mitigation steps.

### Slides

<iframe src="https://present.velocidex.com/presentations/2024-auscert-detection_engineering/index.html" frameborder="0" width="980px" height="600px" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>

[Full Screen](https://present.velocidex.com/presentations/2024-auscert-detection_engineering/index.html)

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/-emRIFYhD60?si=XCGlkZnpVeSNGo_Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
