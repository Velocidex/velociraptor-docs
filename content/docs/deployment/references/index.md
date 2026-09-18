---
title: Configuration File Reference
menutitle: "Config Reference"
weight: 120
no_children: true
type: docs-no-toc
reference_filter: true
description: |
  This is an annotated server.config.yaml with complete explanations for all
  options currently available.
---

<div class="document-comment">

 This is an annotated server.config.yaml with complete explanations
 for all options currently available.
 The values you see are the default values that will be used when the
 option is omitted. If an item is a list, the default list applies
 only when the item is empty. If you want to preserve some of the
 default items in the list, you should copy the entire default list
 and set it.

</div>
<div class="reference-document">
<ul>

<div class="item-comment">

 This is the version of the Velociraptor binary used to generate
 this configuration file. It simply annotates the produced file and
 can not be changed. When Velociraptor loads the configuration file,
 this field will be updated so for example `velociraptor config
 show` will update this to the present version.

</div>
<li class="ref-item ref-container" id="version" data-key="version" data-depth="1">
 <details open>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L17">version</a> <a class="anchorlink" href="#version" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">version</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 Name of the agent - always "velociraptor"

</div>
<li class="ref-item ref-leaf" id="version.name" data-key="version.name" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L17">name</a> <a class="anchorlink" href="#version.name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">version > name</div>
  <div class="reference-value-mapping">velociraptor</div>
</li>

<div class="item-comment">

 The release version on GitHub.

</div>
<li class="ref-item ref-leaf" id="version.version" data-key="version.version" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L20">version</a> <a class="anchorlink" href="#version.version" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">version > version</div>
  <div class="reference-value-mapping">0.74</div>
</li>

<div class="item-comment">

 The commit at which this binary was built. This is more accurate
 than the version for reporting issues etc.

</div>
<li class="ref-item ref-leaf" id="version.commit" data-key="version.commit" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L24">commit</a> <a class="anchorlink" href="#version.commit" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">version > commit</div>
  <div class="reference-value-mapping">f3264824</div>
</li>

<div class="item-comment">

 The time the binary was built.

</div>
<li class="ref-item ref-leaf" id="version.build_time" data-key="version.build_time" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L27">build_time</a> <a class="anchorlink" href="#version.build_time" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">version > build_time</div>
  <div class="reference-value-mapping">2022-04-13T02:24:43+10:00</div>
</li>

<div class="item-comment">

 The URL to the Github Action CI job that built this binary. Not
 all release binaries are built on the Github CI due to signing
 requirements.

</div>
<li class="ref-item ref-leaf" id="version.ci_build_url" data-key="version.ci_build_url" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L32">ci_build_url</a> <a class="anchorlink" href="#version.ci_build_url" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">version > ci_build_url</div>
  <div class="reference-value-mapping">https://github.com/Velocidex/velociraptor/actions/runs/3391188003</div>
</li>

<div class="item-comment">

 The version of the Go compiler that built this binary

</div>
<li class="ref-item ref-leaf" id="version.compiler" data-key="version.compiler" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L35">compiler</a> <a class="anchorlink" href="#version.compiler" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">version > compiler</div>
  <div class="reference-value-mapping">go1.19.2</div>
</li>

<div class="item-comment">

 The time the client was installed (as written in the writeback file).

</div>
<li class="ref-item ref-leaf" id="version.install_time" data-key="version.install_time" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L38">install_time</a> <a class="anchorlink" href="#version.install_time" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">version > install_time</div>
  <div class="reference-value-mapping">1680267359</div>
</li>

<div class="item-comment">

 The operating system this binary is running under.

</div>
<li class="ref-item ref-leaf" id="version.system" data-key="version.system" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L41">system</a> <a class="anchorlink" href="#version.system" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">version > system</div>
  <div class="reference-value-mapping">linux</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="version.architecture" data-key="version.architecture" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L42">architecture</a> <a class="anchorlink" href="#version.architecture" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">version > architecture</div>
  <div class="reference-value-mapping">amd64</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 The Client block will be copied into the client.config.yaml and it
 is expected to be used by clients. It contains no secrets and can
 be embedded into clients. The server must also have this block as
 it needs to refer to client specific information sometimes.

</div>
<li class="ref-item ref-container" id="Client" data-key="Client" data-depth="1">
 <details open>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L51">Client</a> <a class="anchorlink" href="#Client" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Client</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 The Crypto options specifies cryptographic options.

</div>
<li class="ref-item ref-container" id="Client.Crypto" data-key="Client.Crypto" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L56">Crypto</a> <a class="anchorlink" href="#Client.Crypto" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Client > Crypto</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 These are the root CA certs the client will trust. This is
 needed when going through a MITM proxy. Certificates are in PEM
 format one after the next. Certificates do not have to have the
 CA basic constraint!

</div>
<li class="ref-item ref-leaf" id="Client.Crypto.root_certs" data-key="Client.Crypto.root_certs" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L56">root_certs</a> <a class="anchorlink" href="#Client.Crypto.root_certs" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > Crypto > root_certs</div>
  <div class="reference-value-mapping">
<div class="multiline-value">-----BEGIN CERTIFICATE-----
&lt;certificate 1&gt;
-----END CERTIFICATE-----
-----BEGIN CERTIFICATE-----
&lt;certificate 2&gt;
-----END CERTIFICATE-----</div>
</div>
</li>

<div class="item-comment">

 Clients may connect to servers which use a self-signed certificate.
 This list allows to specify a set of certificate thumbprints (SHA256)
 which are used to validate TLS server certificates.

 Fingerprints can be generated with the OpenSSL command line utility:
   openssl s_client -connect www.google.com:443 < /dev/null | openssl x509 -fingerprint -sha256 -noout

 Certificate thumbprints may or may not include colon characters. Capitalization
 of the hex digits is ignored by Velociraptor. A thumbprint of any of the
 forms used below (or combinations thereof) is fine.

</div>
<li class="ref-item ref-container" id="Client.Crypto.certificate_thumbprints" data-key="Client.Crypto.certificate_thumbprints" data-depth="3">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L75">certificate_thumbprints</a> <a class="anchorlink" href="#Client.Crypto.certificate_thumbprints" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Client > Crypto > certificate_thumbprints</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="Client.Crypto.certificate_thumbprints" data-depth="3">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">E6:E2:8B:35:CE:C5:BA:C4:53:C5:AF:BF:2B:76:34:62:40:5C:D0:60:80:E1:30:1A:A7:A5:A9:DA:0C:8B:11:E1</div>
   </span>
   <div class="item-breadcrumb">Client > Crypto > certificate_thumbprints</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="Client.Crypto.certificate_thumbprints" data-depth="3">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">E6E28B35CEC5BAC453C5AFBF2B763462405CD06080E1301AA7A5A9DA0C8B11E1</div>
   </span>
   <div class="item-breadcrumb">Client > Crypto > certificate_thumbprints</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="Client.Crypto.certificate_thumbprints" data-depth="3">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">e6e28b35cec5bac453c5afbf2b763462405cd06080e1301aa7a5a9da0c8b11e1</div>
   </span>
   <div class="item-breadcrumb">Client > Crypto > certificate_thumbprints</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Velociraptor supports several ways of verifying TLS certificates. The
 certificate_verification_mode specifies which of the three modes is applied.
 Currently, three modes are available:

 PKI (the default):
   verify TLS certs against public CA lists, the list of additional root_certs (see above),
   and the built-in CA cert

 PKI_OR_THUMBPRINT:
   the same as PKI with the addition that certificates which have a thumbprint that is
   present in certificate_thumbprints will be accepted as well

 THUMBPRINT_ONLY:
   Velociraptor only accepts certificates which have a matching thumbprint in
   certificate_thumbprints. All other certificates will be rejected. This mode is
   also known as certificate pinning.

</div>
<li class="ref-item ref-leaf" id="Client.Crypto.certificate_verification_mode" data-key="Client.Crypto.certificate_verification_mode" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L95">certificate_verification_mode</a> <a class="anchorlink" href="#Client.Crypto.certificate_verification_mode" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > Crypto > certificate_verification_mode</div>
  <div class="reference-value-mapping">PKI</div>
</li>

<div class="item-comment">

 By default velociraptor uses TLS 1.3 to secure it's
 communications. Some networks use a MITM TLS proxy which does
 not support more secure protocols so this setting can be
 applied to make the server allow lower TLS versions.

</div>
<li class="ref-item ref-leaf" id="Client.Crypto.allow_weak_tls_server" data-key="Client.Crypto.allow_weak_tls_server" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L101">allow_weak_tls_server</a> <a class="anchorlink" href="#Client.Crypto.allow_weak_tls_server" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > Crypto > allow_weak_tls_server</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 If you want to use mTLS to mutually authenticate clients to the
 server, place a pem encoded client certificate here. This
 certificate will be presented to the server before a TLS
 connection can be made.

 This is an additional level of security that controls
 connections between clients and server. It is normally not
 needed as client connections are controlled via the embedded
 nonce. However mTLS authentication allows termination of the
 TLS before the server (e.g. using a reverse proxy).

 To configure this feature you can create a certificate signed
 by the Velociraptor CA:
 velociraptor --config server.config.yaml config api_client --name "Client" api.config.yaml

 This will create an api config file with the key pair encoded
 as PEM strings. You can then copy and paste those into the
 settings below. Only clients configured with these keys can
 talk with the server

 To require the frontend to only talk with mTLS authenticated
 clients, set the Frontend.require_client_certificates to true.

</div>
<li class="ref-item ref-leaf" id="Client.Crypto.client_certificate" data-key="Client.Crypto.client_certificate" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L126">client_certificate</a> <a class="anchorlink" href="#Client.Crypto.client_certificate" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > Crypto > client_certificate</div>
  <div class="reference-value-mapping">-----BEGIN CERTIFICATE----- ...</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.Crypto.client_certificate_private_key" data-key="Client.Crypto.client_certificate_private_key" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L127">client_certificate_private_key</a> <a class="anchorlink" href="#Client.Crypto.client_certificate_private_key" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > Crypto > client_certificate_private_key</div>
  <div class="reference-value-mapping">-----BEGIN RSA PRIVATE KEY----- ...</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 A list of one or more URLs the clients will try to connect
 to. When all connections fail the client will back off for a
 while. Clients will choose one of these at random so it is a good
 way of achieving fault tolerance and load balancing.  As of
 version 0.72, You can choose to use websockets here for a better
 experience by setting the URL to start with wss://

</div>
<li class="ref-item ref-container" id="Client.server_urls" data-key="Client.server_urls" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L136">server_urls</a> <a class="anchorlink" href="#Client.server_urls" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Client > server_urls</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="Client.server_urls" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">wss://192.168.1.1:8000/</div>
   </span>
   <div class="item-breadcrumb">Client > server_urls</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="Client.server_urls" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">https://192.168.1.1:8000/</div>
   </span>
   <div class="item-breadcrumb">Client > server_urls</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="Client.server_urls" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">https://192.168.1.2:8000/</div>
   </span>
   <div class="item-breadcrumb">Client > server_urls</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 When using websockets the server will ping the client every this
 many seconds.

</div>
<li class="ref-item ref-leaf" id="Client.ws_ping_wait_sec" data-key="Client.ws_ping_wait_sec" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L142">ws_ping_wait_sec</a> <a class="anchorlink" href="#Client.ws_ping_wait_sec" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > ws_ping_wait_sec</div>
  <div class="reference-value-mapping">60</div>
</li>

<div class="item-comment">

 A URL to a proxy that will be used to connect to the server. Some
 environments have egress filtering requiring Velociraptor to use
 a proxy to be able to reach the server. NOTE: We do not support
 PAC based proxy configurations or Windows domain authentication -
 you might need to add an allow rule to the proxy config to allow
 the Velociraptor server URL without authentication.

</div>
<li class="ref-item ref-leaf" id="Client.proxy" data-key="Client.proxy" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L150">proxy</a> <a class="anchorlink" href="#Client.proxy" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > proxy</div>
  <div class="reference-value-mapping">https://proxy:3128/</div>
</li>

<div class="item-comment">

 Some proxy configurations are more complex. You can specify a
 more detailed configuration here instead of the proxy parameter
 above.

</div>
<li class="ref-item ref-container" id="Client.proxy_config" data-key="Client.proxy_config" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L157">proxy_config</a> <a class="anchorlink" href="#Client.proxy_config" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Client > proxy_config</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 The proxy configuration for http and https urs.

</div>
<li class="ref-item ref-leaf" id="Client.proxy_config.http" data-key="Client.proxy_config.http" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L157">http</a> <a class="anchorlink" href="#Client.proxy_config.http" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > proxy_config > http</div>
  <div class="reference-value-mapping">&lt;not set&gt;</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.proxy_config.https" data-key="Client.proxy_config.https" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L158">https</a> <a class="anchorlink" href="#Client.proxy_config.https" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > proxy_config > https</div>
  <div class="reference-value-mapping">&lt;not set&gt;</div>
</li>

<div class="item-comment">

 A list of url regexp to match the url and connect to the
 target. Use an empty string to denote direct connection.

</div>
<li class="ref-item ref-container" id="Client.proxy_config.proxy_url_regexp" data-key="Client.proxy_config.proxy_url_regexp" data-depth="3">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L163">proxy_url_regexp</a> <a class="anchorlink" href="#Client.proxy_config.proxy_url_regexp" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Client > proxy_config > proxy_url_regexp</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.proxy_config.proxy_url_regexp.^https://localhost/" data-key="Client.proxy_config.proxy_url_regexp.^https://localhost/" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L163">^https://localhost/</a> <a class="anchorlink" href="#Client.proxy_config.proxy_url_regexp.^https://localhost/" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > proxy_config > proxy_url_regexp > ^https://localhost/</div>
  <div class="reference-value-mapping"></div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Location of a PAC file (overrides the above settings). This can
 be a file:// URL or even a data: url.

</div>
<li class="ref-item ref-leaf" id="Client.proxy_config.pac" data-key="Client.proxy_config.pac" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L167">pac</a> <a class="anchorlink" href="#Client.proxy_config.pac" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > proxy_config > pac</div>
  <div class="reference-value-mapping">&lt;not set&gt;</div>
</li>

<div class="item-comment">

 If this is set we ignore the HTTP_PROXY and HTTPS_PROXY
 environment variables. By default we allow these environment
 variables to override the settings in this file.

</div>
<li class="ref-item ref-leaf" id="Client.proxy_config.ignore_environment" data-key="Client.proxy_config.ignore_environment" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L172">ignore_environment</a> <a class="anchorlink" href="#Client.proxy_config.ignore_environment" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > proxy_config > ignore_environment</div>
  <div class="reference-value-mapping">false</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 The Internal Velociraptor CA certificate used to verify the
 server certificates. Do not change this! This will be generated
 by the config wizard and can not be replaced. It is only used
 internally.

</div>
<li class="ref-item ref-leaf" id="Client.ca_certificate" data-key="Client.ca_certificate" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L178">ca_certificate</a> <a class="anchorlink" href="#Client.ca_certificate" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > ca_certificate</div>
  <div class="reference-value-mapping">
<div class="multiline-value">-----BEGIN CERTIFICATE-----
Generated by the config wizard!!!
-----END CERTIFICATE-----</div>
</div>
</li>

<div class="item-comment">

 This is a shared secret between servers and clients. The server
 will refuse to communicate with clients having the wrong nonce.
 The nonce is used to group clients into Org Groups - so clients
 from different orgs have different nonce.

</div>
<li class="ref-item ref-leaf" id="Client.nonce" data-key="Client.nonce" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L187">nonce</a> <a class="anchorlink" href="#Client.nonce" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > nonce</div>
  <div class="reference-value-mapping">rKNKAYam310=</div>
</li>

<div class="item-comment">

 The following are the locations to write the writeback file -
 this file is used to keep client state. In the default
 configuration, writeback files persist across uninstall/reinstall
 cycles to keep the client id consistent. If you don't want this
 you can change the location of the writeback to be inside the
 tempdir_windows directory (it will be removed on uninstall).

</div>
<li class="ref-item ref-leaf" id="Client.writeback_darwin" data-key="Client.writeback_darwin" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L195">writeback_darwin</a> <a class="anchorlink" href="#Client.writeback_darwin" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > writeback_darwin</div>
  <div class="reference-value-mapping">/etc/velociraptor.writeback.yaml</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.writeback_linux" data-key="Client.writeback_linux" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L196">writeback_linux</a> <a class="anchorlink" href="#Client.writeback_linux" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > writeback_linux</div>
  <div class="reference-value-mapping">/tmp/velociraptor.writeback.yaml</div>
</li>

<div class="item-comment">

 On Windows, if the writeback path starts with HKLM\ the path will
 be interpreted as a registry key that will be used to store the
 writeback instead of files on disk.

</div>
<li class="ref-item ref-leaf" id="Client.writeback_windows" data-key="Client.writeback_windows" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L201">writeback_windows</a> <a class="anchorlink" href="#Client.writeback_windows" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > writeback_windows</div>
  <div class="reference-value-mapping">$ProgramFiles\Velociraptor\velociraptor.writeback.yaml</div>
</li>

<div class="item-comment">

 If this value is specified, Velociraptor will create a level 2
 writeback file. This second file is used as a backup and to write
 more frequently updated content. This scheme should reduce the
 likelihood that the file is corrupted to the point that the client
 id is lost.

</div>
<li class="ref-item ref-leaf" id="Client.level2_writeback_suffix" data-key="Client.level2_writeback_suffix" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L208">level2_writeback_suffix</a> <a class="anchorlink" href="#Client.level2_writeback_suffix" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > level2_writeback_suffix</div>
  <div class="reference-value-mapping">l2</div>
</li>

<div class="item-comment">

 This is the directory Velociraptor will use for temporary
 files. If not specified or not writable, Velociraptor will use
 the $TMP or $TEMP env variable.

</div>
<li class="ref-item ref-leaf" id="Client.tempdir_windows" data-key="Client.tempdir_windows" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L213">tempdir_windows</a> <a class="anchorlink" href="#Client.tempdir_windows" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > tempdir_windows</div>
  <div class="reference-value-mapping">$ProgramFiles\Velociraptor\Tools</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.tempdir_linux" data-key="Client.tempdir_linux" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L214">tempdir_linux</a> <a class="anchorlink" href="#Client.tempdir_linux" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > tempdir_linux</div>
  <div class="reference-value-mapping">/tmp/</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.tempdir_darwin" data-key="Client.tempdir_darwin" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L215">tempdir_darwin</a> <a class="anchorlink" href="#Client.tempdir_darwin" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > tempdir_darwin</div>
  <div class="reference-value-mapping">/tmp/</div>
</li>

<div class="item-comment">

 Number of seconds to wait before polling. Typically Velociraptor
 connections are persistent but will force a re-connection every
 max_poll seconds to refresh the connection. NOTE that typically
 Velociraptor reuses TCP connections so this only applies to the
 HTTP transactions, i.e. The TCP connections are always up.

</div>
<li class="ref-item ref-leaf" id="Client.max_poll" data-key="Client.max_poll" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L222">max_poll</a> <a class="anchorlink" href="#Client.max_poll" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > max_poll</div>
  <div class="reference-value-mapping">60</div>
</li>

<div class="item-comment">

 Standard deviation between polls adds randomness to the poll
 period. This ensures that clients are not synchronized to even up
 the load on the server.

</div>
<li class="ref-item ref-leaf" id="Client.max_poll_std" data-key="Client.max_poll_std" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L227">max_poll_std</a> <a class="anchorlink" href="#Client.max_poll_std" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > max_poll_std</div>
  <div class="reference-value-mapping">30</div>
</li>

<div class="item-comment">

 If this is set, the nanny will exit if we are not able to send
 messages to the server within this many seconds. NOTE - even a
 failed connection will reset the counter, the nanny will only fire
 if the client has failed in some way - e.g. the communicator is
 stopped for some reason

</div>
<li class="ref-item ref-leaf" id="Client.nanny_max_connection_delay" data-key="Client.nanny_max_connection_delay" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L234">nanny_max_connection_delay</a> <a class="anchorlink" href="#Client.nanny_max_connection_delay" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > nanny_max_connection_delay</div>
  <div class="reference-value-mapping">0</div>
</li>

<div class="item-comment">

 If this is set, prevent arbitrary code execution on clients. NOTE:
 This will vastly reduce the capabilities of the client.

</div>
<li class="ref-item ref-leaf" id="Client.prevent_execve" data-key="Client.prevent_execve" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L238">prevent_execve</a> <a class="anchorlink" href="#Client.prevent_execve" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > prevent_execve</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 The default max time to wait before we send partial VQL
 results. This setting is used to ensure we don't send too many
 small requests by batching the rows into time batches.

</div>
<li class="ref-item ref-leaf" id="Client.default_max_wait" data-key="Client.default_max_wait" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L243">default_max_wait</a> <a class="anchorlink" href="#Client.default_max_wait" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > default_max_wait</div>
  <div class="reference-value-mapping">60</div>
</li>

<div class="item-comment">

 Maximum number of concurrent queries the client will allow
 (default 2). This ensures we do not overwhelm the client by
 scheduling too many concurrent queries. NOTE: Queries marked as
 URGENT will skip this control and run anyway.

</div>
<li class="ref-item ref-leaf" id="Client.concurrency" data-key="Client.concurrency" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L249">concurrency</a> <a class="anchorlink" href="#Client.concurrency" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > concurrency</div>
  <div class="reference-value-mapping">2</div>
</li>

<div class="item-comment">

 If set the client will hard exit when it uses this much memory (in
 bytes). This is a safety feature to prevent runaway process -
 ensure this is not set too low.

</div>
<li class="ref-item ref-leaf" id="Client.max_memory_hard_limit" data-key="Client.max_memory_hard_limit" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L254">max_memory_hard_limit</a> <a class="anchorlink" href="#Client.max_memory_hard_limit" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > max_memory_hard_limit</div>
  <div class="reference-value-mapping">0</div>
</li>

<div class="item-comment">

 Clients will send a Server.Internal.ClientInfo message to the
 server every this many seconds. This helps to keep the server info
 up to date about each client. This should not be sent too
 frequently. The default is 1 day (86400 seconds).

</div>
<li class="ref-item ref-leaf" id="Client.client_info_update_time" data-key="Client.client_info_update_time" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L260">client_info_update_time</a> <a class="anchorlink" href="#Client.client_info_update_time" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > client_info_update_time</div>
  <div class="reference-value-mapping">86400</div>
</li>

<div class="item-comment">

 When a collection starts on the client, the client writes a
 checkpoint file so it can detect when it crashed previously and
 restarted.  If this option is set we disable client checkpoints
 and so we can not report to the server when the client crashes
 while collecting an artifact.

</div>
<li class="ref-item ref-leaf" id="Client.disable_checkpoints" data-key="Client.disable_checkpoints" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L267">disable_checkpoints</a> <a class="anchorlink" href="#Client.disable_checkpoints" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > disable_checkpoints</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 These settings are used by the `velociraptor service install`
 command. We typically do not use this as we prefer to distribute
 MSI packages via package management systems.

</div>
<li class="ref-item ref-container" id="Client.windows_installer" data-key="Client.windows_installer" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L273">windows_installer</a> <a class="anchorlink" href="#Client.windows_installer" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Client > windows_installer</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.windows_installer.service_name" data-key="Client.windows_installer.service_name" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L273">service_name</a> <a class="anchorlink" href="#Client.windows_installer.service_name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > windows_installer > service_name</div>
  <div class="reference-value-mapping">Velociraptor</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.windows_installer.install_path" data-key="Client.windows_installer.install_path" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L274">install_path</a> <a class="anchorlink" href="#Client.windows_installer.install_path" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > windows_installer > install_path</div>
  <div class="reference-value-mapping">$ProgramFiles\Velociraptor\Velociraptor.exe</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.windows_installer.service_description" data-key="Client.windows_installer.service_description" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L275">service_description</a> <a class="anchorlink" href="#Client.windows_installer.service_description" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > windows_installer > service_description</div>
  <div class="reference-value-mapping">Velociraptor service</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Settings used by the darwin `velociraptor service install` command.

</div>
<li class="ref-item ref-container" id="Client.darwin_installer" data-key="Client.darwin_installer" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L279">darwin_installer</a> <a class="anchorlink" href="#Client.darwin_installer" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Client > darwin_installer</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.darwin_installer.service_name" data-key="Client.darwin_installer.service_name" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L279">service_name</a> <a class="anchorlink" href="#Client.darwin_installer.service_name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > darwin_installer > service_name</div>
  <div class="reference-value-mapping">com.velocidex.velociraptor</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.darwin_installer.install_path" data-key="Client.darwin_installer.install_path" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L280">install_path</a> <a class="anchorlink" href="#Client.darwin_installer.install_path" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > darwin_installer > install_path</div>
  <div class="reference-value-mapping">/usr/local/sbin/velociraptor</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 If this setting is true, Velociraptor will expect the server to
 use self signed TLS certificates. The client will verify the TLS
 connection by checking that the server certificate is signed by
 the Velociraptor internal CA. With this setting it is possible to
 use an IP address for the server URL (not recommended though)

</div>
<li class="ref-item ref-leaf" id="Client.use_self_signed_ssl" data-key="Client.use_self_signed_ssl" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L287">use_self_signed_ssl</a> <a class="anchorlink" href="#Client.use_self_signed_ssl" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > use_self_signed_ssl</div>
  <div class="reference-value-mapping">true</div>
</li>

<div class="item-comment">

 Do not change this!

</div>
<li class="ref-item ref-leaf" id="Client.pinned_server_name" data-key="Client.pinned_server_name" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L290">pinned_server_name</a> <a class="anchorlink" href="#Client.pinned_server_name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > pinned_server_name</div>
  <div class="reference-value-mapping">VelociraptorServer</div>
</li>

<div class="item-comment">

 The maximum size of the POST request the client will send to the
 server. Some proxy servers limit the size of POST messages.

</div>
<li class="ref-item ref-leaf" id="Client.max_upload_size" data-key="Client.max_upload_size" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L294">max_upload_size</a> <a class="anchorlink" href="#Client.max_upload_size" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > max_upload_size</div>
  <div class="reference-value-mapping">5242880</div>
</li>

<div class="item-comment">

 Maximum timeout for connection retry - the length of time we
 try a connection before restarting it (default 5 min).

</div>
<li class="ref-item ref-leaf" id="Client.connection_timeout" data-key="Client.connection_timeout" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L298">connection_timeout</a> <a class="anchorlink" href="#Client.connection_timeout" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > connection_timeout</div>
  <div class="reference-value-mapping">300</div>
</li>

<div class="item-comment">

 Disable client/server compression. Typically no need to change
 this.

</div>
<li class="ref-item ref-leaf" id="Client.disable_compression" data-key="Client.disable_compression" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L302">disable_compression</a> <a class="anchorlink" href="#Client.disable_compression" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > disable_compression</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 It is possible to pre-label clients using the configuration
 file. The server will add these labels to the clients
 automatically upon enrollment. This allows different client
 packages to be distributed in the real world and have them
 automatically identified.

</div>
<li class="ref-item ref-container" id="Client.labels" data-key="Client.labels" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L310">labels</a> <a class="anchorlink" href="#Client.labels" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Client > labels</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="Client.labels" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">Label1</div>
   </span>
   <div class="item-breadcrumb">Client > labels</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="Client.labels" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">Label1</div>
   </span>
   <div class="item-breadcrumb">Client > labels</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 The client normally does not write any logs on the
 endpoint. However this makes it hard to debug any issues so you
 can choose to have the client write its logs in a file on the
 endpoint. The file will be written in an encrypted form which can
 only be decrypted by the Generic.Client.LocalLogsRetrieve
 artifact.
 Path relative to the relevant tmpdir above where client side logs
 are kept. These logs are encrypted client side and need to be
 decrypted on the server to read.

</div>
<li class="ref-item ref-leaf" id="Client.logfile_name" data-key="Client.logfile_name" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L323">logfile_name</a> <a class="anchorlink" href="#Client.logfile_name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > logfile_name</div>
  <div class="reference-value-mapping">logfile.log</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.logfile_size" data-key="Client.logfile_size" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L324">logfile_size</a> <a class="anchorlink" href="#Client.logfile_size" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > logfile_size</div>
  <div class="reference-value-mapping">10000000</div>
</li>

<div class="item-comment">

 On Windows, the client usually runs as a service. If a crash occurs
 while Velociraptor is running as a Windows service the traceback of
 the error is printed to Stderr, however a Windows service discards
 these messages. This means that if Velociraptor crashes we lose the
 panic backtrace which is useful for debugging why it crashed. This
 setting allows us to specify a path to a log file on the client where
 Velociraptor will write stdout and stderr in the event of a crash.
 This feature is currently not implemented for non-Windows platforms
 where this setting will have no effect.

</div>
<li class="ref-item ref-leaf" id="Client.panic_file" data-key="Client.panic_file" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L335">panic_file</a> <a class="anchorlink" href="#Client.panic_file" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > panic_file</div>
  <div class="reference-value-mapping">$TEMP/panic.log</div>
</li>

<div class="item-comment">

 Velociraptor keeps a local buffer file to store query results
 while they are being shipped across the network. There are two
 types of buffers - an in memory buffer and a local file based
 buffer file. When the buffer is exceeded the query is paused so
 it is important to have reasonable size available for the buffer
 file to prevent queries taking too long (and possibly timing
 out).

</div>
<li class="ref-item ref-container" id="Client.local_buffer" data-key="Client.local_buffer" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L350">local_buffer</a> <a class="anchorlink" href="#Client.local_buffer" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Client > local_buffer</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 Maximum size of the in-memory buffer. When this size is
 exhausted the query is paused until the data is sent over the
 network.

</div>
<li class="ref-item ref-leaf" id="Client.local_buffer.memory_size" data-key="Client.local_buffer.memory_size" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L350">memory_size</a> <a class="anchorlink" href="#Client.local_buffer.memory_size" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > local_buffer > memory_size</div>
  <div class="reference-value-mapping">52428800</div>
</li>

<div class="item-comment">

 If the disk size of the local buffer is set to 0, no disk file
 will be used, only a memory buffer will be used.

</div>
<li class="ref-item ref-leaf" id="Client.local_buffer.disk_size" data-key="Client.local_buffer.disk_size" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L354">disk_size</a> <a class="anchorlink" href="#Client.local_buffer.disk_size" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > local_buffer > disk_size</div>
  <div class="reference-value-mapping">1073741824</div>
</li>

<div class="item-comment">

 Where to store the files on the local disk for the various
 operating systems.

</div>
<li class="ref-item ref-leaf" id="Client.local_buffer.filename_linux" data-key="Client.local_buffer.filename_linux" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L358">filename_linux</a> <a class="anchorlink" href="#Client.local_buffer.filename_linux" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > local_buffer > filename_linux</div>
  <div class="reference-value-mapping">/var/tmp/Velociraptor_Buffer.bin</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.local_buffer.filename_windows" data-key="Client.local_buffer.filename_windows" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L359">filename_windows</a> <a class="anchorlink" href="#Client.local_buffer.filename_windows" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > local_buffer > filename_windows</div>
  <div class="reference-value-mapping">$TEMP/Velociraptor_Buffer.bin</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.local_buffer.filename_darwin" data-key="Client.local_buffer.filename_darwin" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L360">filename_darwin</a> <a class="anchorlink" href="#Client.local_buffer.filename_darwin" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > local_buffer > filename_darwin</div>
  <div class="reference-value-mapping">/var/tmp/Velociraptor_Buffer.bin</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Setting this will write clear text network traces to this
 file. This is used for debugging network communications in complex
 scenarios (e.g. in the presence of proxies etc). Do not leave this
 configured in production! This setting will also disable TLS
 verification for the server name so it will be possible to MITM
 the client->server connection.
 NOTE: Velociraptor has 2 layers of encryption - this setting
 bypasses the outer TLS layer to expose the underlying HTTP
 communications. Client->server communication still remain
 encrypted however.

</div>
<li class="ref-item ref-leaf" id="Client.insecure_network_trace_file" data-key="Client.insecure_network_trace_file" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L373">insecure_network_trace_file</a> <a class="anchorlink" href="#Client.insecure_network_trace_file" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > insecure_network_trace_file</div>
  <div class="reference-value-mapping">/tmp/trace.txt</div>
</li>

<div class="item-comment">

 The server that created this config file - this is only a hint.

</div>
<li class="ref-item ref-container" id="Client.server_version" data-key="Client.server_version" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L377">server_version</a> <a class="anchorlink" href="#Client.server_version" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Client > server_version</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Client.server_version.system" data-key="Client.server_version.system" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L377">system</a> <a class="anchorlink" href="#Client.server_version.system" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > server_version > system</div>
  <div class="reference-value-mapping">linux</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 By default when running on a low resource machine we cap the
 CPU use to 50%. This allows to change that - needs to be
 between 0 and 100 (100 disables throttling).

</div>
<li class="ref-item ref-leaf" id="Client.low_resource_max_cpu" data-key="Client.low_resource_max_cpu" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L382">low_resource_max_cpu</a> <a class="anchorlink" href="#Client.low_resource_max_cpu" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > low_resource_max_cpu</div>
  <div class="reference-value-mapping">50</div>
</li>

<div class="item-comment">

 We determine we are running on a low resource machine if the
 system has less than 2 cores. This allows you to increase the
 threshold. Set to a large number to disable.

</div>
<li class="ref-item ref-leaf" id="Client.low_resource_cpu_count" data-key="Client.low_resource_cpu_count" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L387">low_resource_cpu_count</a> <a class="anchorlink" href="#Client.low_resource_cpu_count" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > low_resource_cpu_count</div>
  <div class="reference-value-mapping">1</div>
</li>

<div class="item-comment">

 If greater than 0 we install a local DNS cache. This is usually
 not needed as most operating systems already have local DNS
 caching resolvers. This DNS cache will be refreshed periodically
 from upstream. Note that the ttl of the record is currently
 ignored and we refresh according to this setting.  This setting
 takes effect both on the client and on the server.

</div>
<li class="ref-item ref-leaf" id="Client.dns_cache_refresh_min" data-key="Client.dns_cache_refresh_min" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L395">dns_cache_refresh_min</a> <a class="anchorlink" href="#Client.dns_cache_refresh_min" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Client > dns_cache_refresh_min</div>
  <div class="reference-value-mapping">0</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 This section configures the API service. The API server accepts
 connections from the GUI gRPC gateway, as well as connections from
 the gRPC API clients (e.g. with pyvelociraptor).

</div>
<li class="ref-item ref-container" id="API" data-key="API" data-depth="1">
 <details open>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L405">API</a> <a class="anchorlink" href="#API" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">API</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 This is the hostname used to connect to - it is used here to copy
 into new api client configuration files to assist gRPC API
 connections (e.g. pyvelociraptor).

</div>
<li class="ref-item ref-leaf" id="API.hostname" data-key="API.hostname" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L405">hostname</a> <a class="anchorlink" href="#API.hostname" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">API > hostname</div>
  <div class="reference-value-mapping">192.168.1.11</div>
</li>

<div class="item-comment">

 Interface to bind to - by default only bind to 127.0.0.1 but will
 need to be exposed on 0.0.0.0 for external pyvelociraptor clients
 to connect.

</div>
<li class="ref-item ref-leaf" id="API.bind_address" data-key="API.bind_address" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L410">bind_address</a> <a class="anchorlink" href="#API.bind_address" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">API > bind_address</div>
  <div class="reference-value-mapping">127.0.0.1</div>
</li>

<div class="item-comment">

 The port to listen on.

</div>
<li class="ref-item ref-leaf" id="API.bind_port" data-key="API.bind_port" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L413">bind_port</a> <a class="anchorlink" href="#API.bind_port" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">API > bind_port</div>
  <div class="reference-value-mapping">8001</div>
</li>

<div class="item-comment">

 Usually these do not need to be changed.

</div>
<li class="ref-item ref-leaf" id="API.bind_scheme" data-key="API.bind_scheme" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L416">bind_scheme</a> <a class="anchorlink" href="#API.bind_scheme" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">API > bind_scheme</div>
  <div class="reference-value-mapping">tcp</div>
</li>

<div class="item-comment">

 Do not change this. It is the common name of the certificate that
 will be trusted to be from the GUI. ACL checks will be disabled
 for all connections from this name.

</div>
<li class="ref-item ref-leaf" id="API.pinned_gw_name" data-key="API.pinned_gw_name" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L421">pinned_gw_name</a> <a class="anchorlink" href="#API.pinned_gw_name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">API > pinned_gw_name</div>
  <div class="reference-value-mapping">GRPC_GW</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Configure the GUI admin web application.

</div>
<li class="ref-item ref-container" id="GUI" data-key="GUI" data-depth="1">
 <details open>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L429">GUI</a> <a class="anchorlink" href="#GUI" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 Allows the GUI to start with no encryption - **WARNING** This only
 makes sense if you have TLS proxy in front. In fact the GUI **will
 not work** without a TLS proxy because the CSRF cookie is still
 set to secure only.

</div>
<li class="ref-item ref-leaf" id="GUI.use_plain_http" data-key="GUI.use_plain_http" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L429">use_plain_http</a> <a class="anchorlink" href="#GUI.use_plain_http" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > use_plain_http</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 You can serve Velociraptor at a sub path of the server. All URLs
 will then be formed below the base path.

</div>
<li class="ref-item ref-leaf" id="GUI.base_path" data-key="GUI.base_path" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L433">base_path</a> <a class="anchorlink" href="#GUI.base_path" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > base_path</div>
  <div class="reference-value-mapping">/</div>
</li>

<div class="item-comment">

 The public URL of this server. Change this if you are proxying the
 GUI using a different URL.

</div>
<li class="ref-item ref-leaf" id="GUI.public_url" data-key="GUI.public_url" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L437">public_url</a> <a class="anchorlink" href="#GUI.public_url" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > public_url</div>
  <div class="reference-value-mapping">http://velo.example.com/app/index.html</div>
</li>

<div class="item-comment">

 A list of CIDR addresses from permitted networks. If this is not
 set, permit all connections to the GUI from anywhere. This is
 useful when you want to limit access to the GUI by IP address but
 still allow access to clients from any IP, while running both the
 frontend and GUI on the same port (normally port 443)

</div>
<li class="ref-item ref-container" id="GUI.allowed_cidr" data-key="GUI.allowed_cidr" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L445">allowed_cidr</a> <a class="anchorlink" href="#GUI.allowed_cidr" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > allowed_cidr</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="GUI.allowed_cidr" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">192.168.0.0/16</div>
   </span>
   <div class="item-breadcrumb">GUI > allowed_cidr</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Header defined by the proxy containing the remote address. This
 header will be used in the allowed_cidr matching if specified.
 NOTE: Only use this if you do have a reverse proxy in front of
 the server. Otherwise an attacker can simply send this header
 to pretend to come from any IP address. If this setting is
 specified we take the src address from the header, otherwise
 from the remote IP address. Default is not set.

</div>
<li class="ref-item ref-leaf" id="GUI.forwarded_proxy_header" data-key="GUI.forwarded_proxy_header" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L454">forwarded_proxy_header</a> <a class="anchorlink" href="#GUI.forwarded_proxy_header" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > forwarded_proxy_header</div>
  <div class="reference-value-mapping">X-Forwarded-For</div>
</li>

<div class="item-comment">

 Allows additional links to be defined for site customization.

</div>
<li class="ref-item ref-container" id="GUI.links" data-key="GUI.links" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L458">links</a> <a class="anchorlink" href="#GUI.links" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > links</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-container" data-key="GUI.links.[0]" data-depth="2">
 <details>
 <summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
   <div class="reference-key">
     [0]
   </div>
  </summary>
  <div class="item-breadcrumb">GUI > links > [0]</div>
  <div class="reference-value-sequence"><ul>

<div class="item-comment">

 The text of the link (visible in the GUI)

</div>
<li class="ref-item ref-leaf" id="GUI.links.[0].text" data-key="GUI.links.[0].text" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L460">text</a> <a class="anchorlink" href="#GUI.links.[0].text" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > links > [0] > text</div>
  <div class="reference-value-mapping">Google Search</div>
</li>

<div class="item-comment">

 Where the link points to.

</div>
<li class="ref-item ref-leaf" id="GUI.links.[0].url" data-key="GUI.links.[0].url" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L463">url</a> <a class="anchorlink" href="#GUI.links.[0].url" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > links > [0] > url</div>
  <div class="reference-value-mapping">https://www.google.com</div>
</li>

<div class="item-comment">

 should the link be opened in a new tab?

</div>
<li class="ref-item ref-leaf" id="GUI.links.[0].new_tab" data-key="GUI.links.[0].new_tab" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L466">new_tab</a> <a class="anchorlink" href="#GUI.links.[0].new_tab" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > links > [0] > new_tab</div>
  <div class="reference-value-mapping">true</div>
</li>

<div class="item-comment">

 The type of links. Currently:
 sidebar: This link will appear in the sidebar navigation menu
 context: Will appear as part of the context (right click) menu

</div>
<li class="ref-item ref-leaf" id="GUI.links.[0].type" data-key="GUI.links.[0].type" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L471">type</a> <a class="anchorlink" href="#GUI.links.[0].type" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > links > [0] > type</div>
  <div class="reference-value-mapping">sidebar</div>
</li>

<div class="item-comment">

 The icon before the link. This can be a data URL or a link to a png

</div>
<li class="ref-item ref-leaf" id="GUI.links.[0].icon_url" data-key="GUI.links.[0].icon_url" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L474">icon_url</a> <a class="anchorlink" href="#GUI.links.[0].icon_url" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > links > [0] > icon_url</div>
  <div class="reference-value-mapping">data:image/svg+xml;base64,....</div>
</li>

<div class="item-comment">

 For context menu the value in the cell can be relayed to the
 target URL. This setting controls the encoding of the value
 and the parameter to attach it to.

</div>
<li class="ref-item ref-leaf" id="GUI.links.[0].encode" data-key="GUI.links.[0].encode" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L479">encode</a> <a class="anchorlink" href="#GUI.links.[0].encode" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > links > [0] > encode</div>
  <div class="reference-value-mapping">plain</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="GUI.links.[0].parameter" data-key="GUI.links.[0].parameter" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L480">parameter</a> <a class="anchorlink" href="#GUI.links.[0].parameter" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > links > [0] > parameter</div>
  <div class="reference-value-mapping">q</div>
</li>

<div class="item-comment">

 Can be GET (default) or POST

</div>
<li class="ref-item ref-leaf" id="GUI.links.[0].method" data-key="GUI.links.[0].method" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L483">method</a> <a class="anchorlink" href="#GUI.links.[0].method" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > links > [0] > method</div>
  <div class="reference-value-mapping">GET</div>
</li>

<div class="item-comment">

 If set we ignore this entry completely

</div>
<li class="ref-item ref-leaf" id="GUI.links.[0].disabled" data-key="GUI.links.[0].disabled" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L486">disabled</a> <a class="anchorlink" href="#GUI.links.[0].disabled" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > links > [0] > disabled</div>
  <div class="reference-value-mapping">false</div>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Bind the GUI to this port. By default: For self signed SSL the
 GUI will be bound to the localhost only!  For Let's Encrypt
 deployments the GUI will be bound on 0.0.0.0 making it accessible
 from anywhere. NOTE: The **only** valid settings here are 0.0.0.0
 for external access and 127.0.0.1 for localhost - Do not specify
 any other address unless you know what you are doing!

</div>
<li class="ref-item ref-leaf" id="GUI.bind_address" data-key="GUI.bind_address" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L494">bind_address</a> <a class="anchorlink" href="#GUI.bind_address" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > bind_address</div>
  <div class="reference-value-mapping">127.0.0.1</div>
</li>

<div class="item-comment">

 Bind port for the GUI. When using Let's Encrypt the GUI is bound
 to port 443 and this setting is ignored because Let's Encrypt
 only supports port 443.

</div>
<li class="ref-item ref-leaf" id="GUI.bind_port" data-key="GUI.bind_port" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L499">bind_port</a> <a class="anchorlink" href="#GUI.bind_port" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > bind_port</div>
  <div class="reference-value-mapping">8889</div>
</li>

<div class="item-comment">

 The internal certificate for gRPC connections between the gateway
 and the API server. DO NOT Change this!

</div>
<li class="ref-item ref-leaf" id="GUI.gw_certificate" data-key="GUI.gw_certificate" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L503">gw_certificate</a> <a class="anchorlink" href="#GUI.gw_certificate" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > gw_certificate</div>
  <div class="reference-value-mapping">
<div class="multiline-value">-----BEGIN CERTIFICATE-----
Generated by the config wizard!!!
-----END CERTIFICATE-----</div>
</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="GUI.gw_private_key" data-key="GUI.gw_private_key" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L507">gw_private_key</a> <a class="anchorlink" href="#GUI.gw_private_key" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > gw_private_key</div>
  <div class="reference-value-mapping">
<div class="multiline-value">-----BEGIN RSA PRIVATE KEY-----
Generated by the config wizard!!!
-----END RSA PRIVATE KEY-----</div>
</div>
</li>

<div class="item-comment">

 Velociraptor supports a reverse proxy allowing you to place other
 applications behind the Velociraptor Oauth2/TLS server.

</div>
<li class="ref-item ref-container" id="GUI.reverse_proxy" data-key="GUI.reverse_proxy" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L515">reverse_proxy</a> <a class="anchorlink" href="#GUI.reverse_proxy" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > reverse_proxy</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-container" data-key="GUI.reverse_proxy.[0]" data-depth="2">
 <details>
 <summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
   <div class="reference-key">
     [0]
   </div>
  </summary>
  <div class="item-breadcrumb">GUI > reverse_proxy > [0]</div>
  <div class="reference-value-sequence"><ul>

<div class="item-comment">

 Any paths below this route will be forwarded to the given URL
 (and the path copied into the target)

</div>
<li class="ref-item ref-leaf" id="GUI.reverse_proxy.[0].route" data-key="GUI.reverse_proxy.[0].route" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L519">route</a> <a class="anchorlink" href="#GUI.reverse_proxy.[0].route" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > reverse_proxy > [0] > route</div>
  <div class="reference-value-mapping">/CyberChef/</div>
</li>

<div class="item-comment">

 The URL to forward to. This can be a file:// URL which allows
 you to host static files at this location.

</div>
<li class="ref-item ref-leaf" id="GUI.reverse_proxy.[0].url" data-key="GUI.reverse_proxy.[0].url" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L523">url</a> <a class="anchorlink" href="#GUI.reverse_proxy.[0].url" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > reverse_proxy > [0] > url</div>
  <div class="reference-value-mapping">file:///shared/CyberChef/</div>
</li>

<div class="item-comment">

 If this is set to true, the user needs to be authenticated to
 Velociraptor before they are proxied.

</div>
<li class="ref-item ref-leaf" id="GUI.reverse_proxy.[0].require_auth" data-key="GUI.reverse_proxy.[0].require_auth" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L527">require_auth</a> <a class="anchorlink" href="#GUI.reverse_proxy.[0].require_auth" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > reverse_proxy > [0] > require_auth</div>
  <div class="reference-value-mapping">true</div>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 A list of domains that we will trust to send us the CSRF
 token. Use this only when serving the JS from a different domain
 than the API server.

</div>
<li class="ref-item ref-container" id="GUI.trusted_origins" data-key="GUI.trusted_origins" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L533">trusted_origins</a> <a class="anchorlink" href="#GUI.trusted_origins" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > trusted_origins</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="GUI.trusted_origins" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">www.example.com</div>
   </span>
   <div class="item-breadcrumb">GUI > trusted_origins</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 When the Velociraptor server starts for the first time, the
 server can create the following initial user with admin level
 access. This is designed to automate deployment and allow users
 to sign in immediately to the GUI. You can remove these accounts
 or change their ACLs/Roles later.

</div>
<li class="ref-item ref-container" id="GUI.initial_users" data-key="GUI.initial_users" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L541">initial_users</a> <a class="anchorlink" href="#GUI.initial_users" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > initial_users</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-container" data-key="GUI.initial_users.[0]" data-depth="2">
 <details>
 <summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
   <div class="reference-key">
     [0]
   </div>
  </summary>
  <div class="item-breadcrumb">GUI > initial_users > [0]</div>
  <div class="reference-value-sequence"><ul>

<div class="item-comment">

 Username to create

</div>
<li class="ref-item ref-leaf" id="GUI.initial_users.[0].name" data-key="GUI.initial_users.[0].name" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L543">name</a> <a class="anchorlink" href="#GUI.initial_users.[0].name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > initial_users > [0] > name</div>
  <div class="reference-value-mapping">mic</div>
</li>

<div class="item-comment">

 Password hashes - this is only useful for Basic Authenticator
 which uses passwords. They can be left empty for Oauth based
 authenticator.

</div>
<li class="ref-item ref-leaf" id="GUI.initial_users.[0].password_hash" data-key="GUI.initial_users.[0].password_hash" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L548">password_hash</a> <a class="anchorlink" href="#GUI.initial_users.[0].password_hash" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > initial_users > [0] > password_hash</div>
  <div class="reference-value-mapping">aa3a779e09062dea3a46811e0c0624ba7999cf15a2d12dce7489aca339c3deff</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="GUI.initial_users.[0].password_salt" data-key="GUI.initial_users.[0].password_salt" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L549">password_salt</a> <a class="anchorlink" href="#GUI.initial_users.[0].password_salt" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > initial_users > [0] > password_salt</div>
  <div class="reference-value-mapping">f8707a7a9c876a4e6210d4f5bbdee4846adff7465d50efc43a305175aab8f146</div>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 When Velociraptor starts the first time these orgs will be created.

</div>
<li class="ref-item ref-container" id="GUI.initial_orgs" data-key="GUI.initial_orgs" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L553">initial_orgs</a> <a class="anchorlink" href="#GUI.initial_orgs" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > initial_orgs</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-container" data-key="GUI.initial_orgs.[0]" data-depth="2">
 <details>
 <summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
   <div class="reference-key">
     [0]
   </div>
  </summary>
  <div class="item-breadcrumb">GUI > initial_orgs > [0]</div>
  <div class="reference-value-sequence"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="GUI.initial_orgs.[0].org_id" data-key="GUI.initial_orgs.[0].org_id" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L554">org_id</a> <a class="anchorlink" href="#GUI.initial_orgs.[0].org_id" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > initial_orgs > [0] > org_id</div>
  <div class="reference-value-mapping">O1234</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="GUI.initial_orgs.[0].name" data-key="GUI.initial_orgs.[0].name" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L555">name</a> <a class="anchorlink" href="#GUI.initial_orgs.[0].name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > initial_orgs > [0] > name</div>
  <div class="reference-value-mapping">My Company</div>
</li>

<div class="item-comment">

 If this is empty we use the org id. The nonce is a shared
 secret in the client configuration which binds clients to
 this Org. See Client.nonce.

</div>
<li class="ref-item ref-leaf" id="GUI.initial_orgs.[0].nonce" data-key="GUI.initial_orgs.[0].nonce" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L560">nonce</a> <a class="anchorlink" href="#GUI.initial_orgs.[0].nonce" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > initial_orgs > [0] > nonce</div>
  <div class="reference-value-mapping">O1234</div>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 How to authenticate users to the server. Velociraptor comes with
 a large number of authenticators. This section configures the
 authenticator to use.

</div>
<li class="ref-item ref-container" id="GUI.authenticator" data-key="GUI.authenticator" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L568">authenticator</a> <a class="anchorlink" href="#GUI.authenticator" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > authenticator</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 The type of authenticator to use. Currently:
 basic, google, azure, oidc-cognito (prior to v0.75.6), github, saml, oidc, multi

</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.type" data-key="GUI.authenticator.type" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L568">type</a> <a class="anchorlink" href="#GUI.authenticator.type" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > type</div>
  <div class="reference-value-mapping">basic</div>
</li>

<div class="item-comment">

 Used by SAML authenticator

</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.saml_certificate" data-key="GUI.authenticator.saml_certificate" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L571">saml_certificate</a> <a class="anchorlink" href="#GUI.authenticator.saml_certificate" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > saml_certificate</div>
  <div class="reference-value-mapping">
<div class="multiline-value">-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----</div>
</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.saml_private_key" data-key="GUI.authenticator.saml_private_key" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L574">saml_private_key</a> <a class="anchorlink" href="#GUI.authenticator.saml_private_key" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > saml_private_key</div>
  <div class="reference-value-mapping">
<div class="multiline-value">-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----</div>
</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.saml_idp_metadata_url" data-key="GUI.authenticator.saml_idp_metadata_url" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L577">saml_idp_metadata_url</a> <a class="anchorlink" href="#GUI.authenticator.saml_idp_metadata_url" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > saml_idp_metadata_url</div>
  <div class="reference-value-mapping">http://localhost:8080/simplesaml/saml2/idp/metadata.php</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.saml_root_url" data-key="GUI.authenticator.saml_root_url" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L578">saml_root_url</a> <a class="anchorlink" href="#GUI.authenticator.saml_root_url" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > saml_root_url</div>
  <div class="reference-value-mapping">https://localhost:8889</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.saml_user_attribute" data-key="GUI.authenticator.saml_user_attribute" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L579">saml_user_attribute</a> <a class="anchorlink" href="#GUI.authenticator.saml_user_attribute" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > saml_user_attribute</div>
  <div class="reference-value-mapping">email</div>
</li>

<div class="item-comment">

 Allow IdP-initiated SAML flow.

</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.saml_allow_idp_initiated" data-key="GUI.authenticator.saml_allow_idp_initiated" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L582">saml_allow_idp_initiated</a> <a class="anchorlink" href="#GUI.authenticator.saml_allow_idp_initiated" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > saml_allow_idp_initiated</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 This feature allows roles to be set in the SAML claims. It is a
 similar feature to the OIDC Role setting below but less
 flexible. If you need more flexibility, prefer to use the OIDC
 flow.

 When these are configured, any user that authenticated with SAML
 will receive these roles on *all* the orgs. These roles are the
 minimum roles the user can have - you can add more roles via the
 GUI

 NOTE: roles are additive which means you can not revoke the
 roles from the IDP. If you need this use the OIDC flow below
 with the override_acls flag.

</div>
<li class="ref-item ref-container" id="GUI.authenticator.saml_user_roles" data-key="GUI.authenticator.saml_user_roles" data-depth="3">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L598">saml_user_roles</a> <a class="anchorlink" href="#GUI.authenticator.saml_user_roles" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > authenticator > saml_user_roles</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="GUI.authenticator.saml_user_roles" data-depth="3">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">analyst</div>
   </span>
   <div class="item-breadcrumb">GUI > authenticator > saml_user_roles</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="GUI.authenticator.saml_user_roles" data-depth="3">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">investigator</div>
   </span>
   <div class="item-breadcrumb">GUI > authenticator > saml_user_roles</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 URL to OIDC Configuration Document. The configuration should be
 available in the 'oidc_issuer + /.well-known/openid-configuration' endpoint.

</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.oidc_issuer" data-key="GUI.authenticator.oidc_issuer" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L603">oidc_issuer</a> <a class="anchorlink" href="#GUI.authenticator.oidc_issuer" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > oidc_issuer</div>
  <div class="reference-value-mapping"></div>
</li>

<div class="item-comment">

 Name of this authenticator to show in the GUI (e.g company
 name). Note that you can provide many OIDC authenticators as
 part of the multi authenticator so having a name here helps keep
 them recognizable.

</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.oidc_name" data-key="GUI.authenticator.oidc_name" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L609">oidc_name</a> <a class="anchorlink" href="#GUI.authenticator.oidc_name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > oidc_name</div>
  <div class="reference-value-mapping">Company Name</div>
</li>

<div class="item-comment">

 Additional URL parameters that should be added to the OIDC
 redirect URL.

</div>
<li class="ref-item ref-container" id="GUI.authenticator.oidc_auth_url_params" data-key="GUI.authenticator.oidc_auth_url_params" data-depth="3">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L614">oidc_auth_url_params</a> <a class="anchorlink" href="#GUI.authenticator.oidc_auth_url_params" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > authenticator > oidc_auth_url_params</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.oidc_auth_url_params.Key" data-key="GUI.authenticator.oidc_auth_url_params.Key" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L614">Key</a> <a class="anchorlink" href="#GUI.authenticator.oidc_auth_url_params.Key" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > oidc_auth_url_params > Key</div>
  <div class="reference-value-mapping">Value</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.avatar" data-key="GUI.authenticator.avatar" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L616">avatar</a> <a class="anchorlink" href="#GUI.authenticator.avatar" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > avatar</div>
  <div class="reference-value-mapping">http://www.example.com/icon.png</div>
</li>

<div class="item-comment">

 These are required for the oauth flow - get from the OIDC provider.

</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.oauth_client_id" data-key="GUI.authenticator.oauth_client_id" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L619">oauth_client_id</a> <a class="anchorlink" href="#GUI.authenticator.oauth_client_id" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > oauth_client_id</div>
  <div class="reference-value-mapping">C123445</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.oauth_client_secret" data-key="GUI.authenticator.oauth_client_secret" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L620">oauth_client_secret</a> <a class="anchorlink" href="#GUI.authenticator.oauth_client_secret" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > oauth_client_secret</div>
  <div class="reference-value-mapping">X23456</div>
</li>

<div class="item-comment">

 When this is set we emit detailed logging. Turn this on when
 configuring the server initially if you want to debug your OIDC
 setup. You probably do not want this enabled in production.

</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.oidc_debug" data-key="GUI.authenticator.oidc_debug" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L625">oidc_debug</a> <a class="anchorlink" href="#GUI.authenticator.oidc_debug" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > oidc_debug</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 Additional OIDC claims configuration. This is an experimental
 setting and should not be used except for specific situations.

</div>
<li class="ref-item ref-container" id="GUI.authenticator.claims" data-key="GUI.authenticator.claims" data-depth="3">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L635">claims</a> <a class="anchorlink" href="#GUI.authenticator.claims" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > authenticator > claims</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 The name of the claim that represents the username (by default
 this is 'email'). Be careful that this MUST be unique across
 the domain! It is vulnerability to allow something like 'name'
 across a public domain because anyone can set this name in
 their OIDC accounts!

</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.claims.username" data-key="GUI.authenticator.claims.username" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L635">username</a> <a class="anchorlink" href="#GUI.authenticator.claims.username" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > claims > username</div>
  <div class="reference-value-mapping">email</div>
</li>

<div class="item-comment">

 The field that specifies the roles. If this not set (the
 default), we do not allow roles to be set via OIDC. You must
 configure your OIDC server to send specific roles in this
 claim (the claim can be named for example 'roles'). If this is
 configured we use the role map below to assign Velociraptor
 roles based on the OIDC server's roles.

 NOTE: The roles will be assigned to the user in all orgs.

</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.claims.roles" data-key="GUI.authenticator.claims.roles" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L645">roles</a> <a class="anchorlink" href="#GUI.authenticator.claims.roles" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > claims > roles</div>
  <div class="reference-value-mapping"></div>
</li>

<div class="item-comment">

 A mapping between OIDC claim roles and Velociraptor roles.
 For example:

</div>
<li class="ref-item ref-container" id="GUI.authenticator.claims.role_map" data-key="GUI.authenticator.claims.role_map" data-depth="4">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L650">role_map</a> <a class="anchorlink" href="#GUI.authenticator.claims.role_map" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > authenticator > claims > role_map</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-container" id="GUI.authenticator.claims.role_map.Velociraptor.Reader" data-key="GUI.authenticator.claims.role_map.Velociraptor.Reader" data-depth="5">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L651">Velociraptor.Reader</a> <a class="anchorlink" href="#GUI.authenticator.claims.role_map.Velociraptor.Reader" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > authenticator > claims > role_map > Velociraptor.Reader</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-container" id="GUI.authenticator.claims.role_map.Velociraptor.Reader.roles" data-key="GUI.authenticator.claims.role_map.Velociraptor.Reader.roles" data-depth="6">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L652">roles</a> <a class="anchorlink" href="#GUI.authenticator.claims.role_map.Velociraptor.Reader.roles" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > authenticator > claims > role_map > Velociraptor.Reader > roles</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="GUI.authenticator.claims.role_map.Velociraptor.Reader.roles" data-depth="6">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">reader</div>
   </span>
   <div class="item-breadcrumb">GUI > authenticator > claims > role_map > Velociraptor.Reader > roles</div>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Velociraptor usually requires the email_verified claim before
 we can trust the email claim and use it as the
 username. However, some IDP (e.g. Azure) do not set this. If
 you want to ignore this requirement, set the below to true.

</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.claims.allow_unverified_email" data-key="GUI.authenticator.claims.allow_unverified_email" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L658">allow_unverified_email</a> <a class="anchorlink" href="#GUI.authenticator.claims.allow_unverified_email" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > claims > allow_unverified_email</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 When this is set, the OIDC roles override (clear) existing
 velociraptor roles. The default behavior is to ensure the
 user's ACL contains at least the OIDC roles. This is needed if
 you want to be able to **remove** access from the IDP.

</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.claims.override_acls" data-key="GUI.authenticator.claims.override_acls" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L664">override_acls</a> <a class="anchorlink" href="#GUI.authenticator.claims.override_acls" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > claims > override_acls</div>
  <div class="reference-value-mapping">false</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 This is specifically required by the Azure authenticator only.

</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.tenant" data-key="GUI.authenticator.tenant" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L667">tenant</a> <a class="anchorlink" href="#GUI.authenticator.tenant" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > tenant</div>
  <div class="reference-value-mapping">O...</div>
</li>

<div class="item-comment">

 URL to redirect to on Unauthorized API call. If blank we just
 cycle to the logon screen again.

</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.auth_redirect_template" data-key="GUI.authenticator.auth_redirect_template" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L671">auth_redirect_template</a> <a class="anchorlink" href="#GUI.authenticator.auth_redirect_template" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > auth_redirect_template</div>
  <div class="reference-value-mapping">http://www.google.com</div>
</li>

<div class="item-comment">

 Certs authenticator: If a user presents a certificate but does
 not exist in the system, the user will automatically receive a
 default role. If this is not set the user will be rejected and
 you will have to manually add the user to a role before they are
 allowed.

</div>
<li class="ref-item ref-container" id="GUI.authenticator.default_roles_for_unknown_user" data-key="GUI.authenticator.default_roles_for_unknown_user" data-depth="3">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L679">default_roles_for_unknown_user</a> <a class="anchorlink" href="#GUI.authenticator.default_roles_for_unknown_user" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > authenticator > default_roles_for_unknown_user</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="GUI.authenticator.default_roles_for_unknown_user" data-depth="3">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">administrator</div>
   </span>
   <div class="item-breadcrumb">GUI > authenticator > default_roles_for_unknown_user</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 How long to keep the session alive between auth flows - default 24 hours

</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.default_session_expiry_min" data-key="GUI.authenticator.default_session_expiry_min" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L682">default_session_expiry_min</a> <a class="anchorlink" href="#GUI.authenticator.default_session_expiry_min" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > default_session_expiry_min</div>
  <div class="reference-value-mapping">1440</div>
</li>

<div class="item-comment">

 Used by the multi authenticator to provide multiple
 authenticators. NOTE: Sub authenticators must be oauth based
 (i.e. not basic auth).

</div>
<li class="ref-item ref-container" id="GUI.authenticator.sub_authenticators" data-key="GUI.authenticator.sub_authenticators" data-depth="3">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L688">sub_authenticators</a> <a class="anchorlink" href="#GUI.authenticator.sub_authenticators" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">GUI > authenticator > sub_authenticators</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-container" data-key="GUI.authenticator.sub_authenticators.[0]" data-depth="3">
 <details>
 <summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
   <div class="reference-key">
     [0]
   </div>
  </summary>
  <div class="item-breadcrumb">GUI > authenticator > sub_authenticators > [0]</div>
  <div class="reference-value-sequence"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="GUI.authenticator.sub_authenticators.[0].type" data-key="GUI.authenticator.sub_authenticators.[0].type" data-depth="5">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L688">type</a> <a class="anchorlink" href="#GUI.authenticator.sub_authenticators.[0].type" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">GUI > authenticator > sub_authenticators > [0] > type</div>
  <div class="reference-value-mapping">Google</div>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 This is the internal Velociraptor CA configuration. It is needed to
 sign new API keys. Secure deployments can remove this part of the
 config and safely store it offline.

</div>
<li class="ref-item ref-container" id="CA" data-key="CA" data-depth="1">
 <details open>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L696">CA</a> <a class="anchorlink" href="#CA" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">CA</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 CA private key - the public certificate is in
 Client.ca_certificate

</div>
<li class="ref-item ref-leaf" id="CA.private_key" data-key="CA.private_key" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L696">private_key</a> <a class="anchorlink" href="#CA.private_key" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">CA > private_key</div>
  <div class="reference-value-mapping">
<div class="multiline-value">-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----</div>
</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Configuration of the frontend. The Frontend is the service that
 directly talks with clients.

</div>
<li class="ref-item ref-container" id="Frontend" data-key="Frontend" data-depth="1">
 <details open>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L704">Frontend</a> <a class="anchorlink" href="#Frontend" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Frontend</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 Serve the Frontend from this base path instead of "/"

</div>
<li class="ref-item ref-leaf" id="Frontend.base_path" data-key="Frontend.base_path" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L704">base_path</a> <a class="anchorlink" href="#Frontend.base_path" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > base_path</div>
  <div class="reference-value-mapping">/</div>
</li>

<div class="item-comment">

 This allows the frontends to listen on plain HTTP - It is useful
 if you have SSL offloading (e.g. nginx). This is not configured by
 the wizard - you will need to manually configure it. You better
 know what you are doing here!

</div>
<li class="ref-item ref-leaf" id="Frontend.use_plain_http" data-key="Frontend.use_plain_http" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L710">use_plain_http</a> <a class="anchorlink" href="#Frontend.use_plain_http" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > use_plain_http</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 Enabling this requires the clients to present a valid certificate
 (signed by one of the Root CAs listed in Client.Crypto.root_certs
 or the Velociraptor built in CA itself). NOTE: If you use
 configurations that place the Frontend and the GUI on the same
 port then you **MUST** use the ClientCertificate authenticator.
 See further discussions at Client.Crypto.client_certificate.

 If this setting is enabled it becomes more difficult to
 troubleshoot the server since a simple curl command will be
 rejected. To test connectivity with the server you should instead
 provide client cert and key files:

 curl -kv https://localhost:8000/server.pem --cert client.pem --key key.pem

</div>
<li class="ref-item ref-leaf" id="Frontend.require_client_certificates" data-key="Frontend.require_client_certificates" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L725">require_client_certificates</a> <a class="anchorlink" href="#Frontend.require_client_certificates" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > require_client_certificates</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 A proxy setting to use - Velociraptor needs to connect to download
 tools. This setting will force it to go out over this proxy. NOTE-
 If you don't want to allow outbound connections, just set this to
 an non-existent setting (e.g. http://127.0.0.1:3128).

 SECURITY: This proxy setting and the proxy_config below control
 ALL server-initiated outbound HTTP connections, including tool
 materialization and VQL's http_client() plugin. Without a proxy or
 with a permissive proxy, any user with admin-equivalent
 permissions can make the server fetch arbitrary URLs, including
 internal RFC 1918 addresses and cloud endpoints. Set a restrictive
 proxy or configure proxy_url_regexp to limit outbound destinations

</div>
<li class="ref-item ref-leaf" id="Frontend.proxy" data-key="Frontend.proxy" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L739">proxy</a> <a class="anchorlink" href="#Frontend.proxy" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > proxy</div>
  <div class="reference-value-mapping">http://127.0.0.1:3128</div>
</li>

<div class="item-comment">

 These proxy settings are exactly the same as the
 Cllient.proxy_config settings but apply to the server.

</div>
<li class="ref-item ref-container" id="Frontend.proxy_config" data-key="Frontend.proxy_config" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L744">proxy_config</a> <a class="anchorlink" href="#Frontend.proxy_config" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Frontend > proxy_config</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Frontend.proxy_config.http" data-key="Frontend.proxy_config.http" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L744">http</a> <a class="anchorlink" href="#Frontend.proxy_config.http" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > proxy_config > http</div>
  <div class="reference-value-mapping">&lt;not set&gt;</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Frontend.proxy_config.https" data-key="Frontend.proxy_config.https" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L745">https</a> <a class="anchorlink" href="#Frontend.proxy_config.https" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > proxy_config > https</div>
  <div class="reference-value-mapping">&lt;not set&gt;</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-container" id="Frontend.proxy_config.proxy_url_regexp" data-key="Frontend.proxy_config.proxy_url_regexp" data-depth="3">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L747">proxy_url_regexp</a> <a class="anchorlink" href="#Frontend.proxy_config.proxy_url_regexp" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Frontend > proxy_config > proxy_url_regexp</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Frontend.proxy_config.proxy_url_regexp.^https://localhost/" data-key="Frontend.proxy_config.proxy_url_regexp.^https://localhost/" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L747">^https://localhost/</a> <a class="anchorlink" href="#Frontend.proxy_config.proxy_url_regexp.^https://localhost/" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > proxy_config > proxy_url_regexp > ^https://localhost/</div>
  <div class="reference-value-mapping"></div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Frontend.proxy_config.pac" data-key="Frontend.proxy_config.pac" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L748">pac</a> <a class="anchorlink" href="#Frontend.proxy_config.pac" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > proxy_config > pac</div>
  <div class="reference-value-mapping">&lt;not set&gt;</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Frontend.proxy_config.ignore_environment" data-key="Frontend.proxy_config.ignore_environment" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L749">ignore_environment</a> <a class="anchorlink" href="#Frontend.proxy_config.ignore_environment" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > proxy_config > ignore_environment</div>
  <div class="reference-value-mapping">false</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Velociraptor can attempt to obfuscate artifact names when
 compiling them into raw VQL. If this is set to false this
 obfuscation is removed.

</div>
<li class="ref-item ref-leaf" id="Frontend.do_not_compress_artifacts" data-key="Frontend.do_not_compress_artifacts" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L754">do_not_compress_artifacts</a> <a class="anchorlink" href="#Frontend.do_not_compress_artifacts" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > do_not_compress_artifacts</div>
  <div class="reference-value-mapping">true</div>
</li>

<div class="item-comment">

 The publicly accessible hostname of the frontend.

</div>
<li class="ref-item ref-leaf" id="Frontend.hostname" data-key="Frontend.hostname" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L757">hostname</a> <a class="anchorlink" href="#Frontend.hostname" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > hostname</div>
  <div class="reference-value-mapping">192.168.1.11</div>
</li>

<div class="item-comment">

 Which interface to bind to. Usually the frontend is bound to
 0.0.0.0 to allow all clients to connect from anywhere.

</div>
<li class="ref-item ref-leaf" id="Frontend.bind_address" data-key="Frontend.bind_address" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L761">bind_address</a> <a class="anchorlink" href="#Frontend.bind_address" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > bind_address</div>
  <div class="reference-value-mapping">0.0.0.0</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Frontend.bind_port" data-key="Frontend.bind_port" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L762">bind_port</a> <a class="anchorlink" href="#Frontend.bind_port" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > bind_port</div>
  <div class="reference-value-mapping">8000</div>
</li>

<div class="item-comment">

 These are used to secure the client/server communications - Even
 when using external TLS certificates! This certificate must be
 signed by the Velociraptor root CA in all cases
 (tls_certificate_filename for that). If using an external TLS
 configuration this layer of encryption happens **in addition** to
 the external TLS certificates.

</div>
<li class="ref-item ref-leaf" id="Frontend.certificate" data-key="Frontend.certificate" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L770">certificate</a> <a class="anchorlink" href="#Frontend.certificate" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > certificate</div>
  <div class="reference-value-mapping">
<div class="multiline-value">-----BEGIN CERTIFICATE-----
-----END CERTIFICATE-----</div>
</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Frontend.private_key" data-key="Frontend.private_key" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L773">private_key</a> <a class="anchorlink" href="#Frontend.private_key" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > private_key</div>
  <div class="reference-value-mapping">
<div class="multiline-value">-----BEGIN RSA PRIVATE KEY-----
-----END RSA PRIVATE KEY-----</div>
</div>
</li>

<div class="item-comment">

 If you want to use your own certificates for TLS as an alternative
 to Autocert, then you can set those here. These certificates will
 be used for TLS on both the frontend and GUI. NOTE: We expect
 these to be proper certificates - i.e. NOT self signed. If you
 want to use certificates issued by another CA you will also need
 to add that CA cert to the Client.Crypto.root_certs field.

 Be sure to set Client.use_self_signed_ssl=false when you set this.

</div>
<li class="ref-item ref-leaf" id="Frontend.tls_certificate_filename" data-key="Frontend.tls_certificate_filename" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L785">tls_certificate_filename</a> <a class="anchorlink" href="#Frontend.tls_certificate_filename" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > tls_certificate_filename</div>
  <div class="reference-value-mapping">/etc/cert.pem</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Frontend.tls_private_key_filename" data-key="Frontend.tls_private_key_filename" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L786">tls_private_key_filename</a> <a class="anchorlink" href="#Frontend.tls_private_key_filename" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > tls_private_key_filename</div>
  <div class="reference-value-mapping">/etc/cert.key</div>
</li>

<div class="item-comment">

 If configured, Velociraptor will attempt to update the dynamic
 DNS server with its public IP address. Currently we only support
 a number of providers including noip and cloudflare.

</div>
<li class="ref-item ref-container" id="Frontend.dyn_dns" data-key="Frontend.dyn_dns" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L793">dyn_dns</a> <a class="anchorlink" href="#Frontend.dyn_dns" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Frontend > dyn_dns</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 The type of DynDNS provider (Can be cloudfront or noip)

</div>
<li class="ref-item ref-leaf" id="Frontend.dyn_dns.type" data-key="Frontend.dyn_dns.type" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L793">type</a> <a class="anchorlink" href="#Frontend.dyn_dns.type" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > dyn_dns > type</div>
  <div class="reference-value-mapping">noip</div>
</li>

<div class="item-comment">

 The hostname to update

</div>
<li class="ref-item ref-leaf" id="Frontend.dyn_dns.hostname" data-key="Frontend.dyn_dns.hostname" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L796">hostname</a> <a class="anchorlink" href="#Frontend.dyn_dns.hostname" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > dyn_dns > hostname</div>
  <div class="reference-value-mapping">www.velo.com</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Frontend.dyn_dns.ddns_username" data-key="Frontend.dyn_dns.ddns_username" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L797">ddns_username</a> <a class="anchorlink" href="#Frontend.dyn_dns.ddns_username" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > dyn_dns > ddns_username</div>
  <div class="reference-value-mapping">1234233452</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Frontend.dyn_dns.ddns_password" data-key="Frontend.dyn_dns.ddns_password" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L798">ddns_password</a> <a class="anchorlink" href="#Frontend.dyn_dns.ddns_password" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > dyn_dns > ddns_password</div>
  <div class="reference-value-mapping">2313e2324</div>
</li>

<div class="item-comment">

 The hostname to update - if empty we use Frontend.hostname

</div>
<li class="ref-item ref-leaf" id="Frontend.dyn_dns.ddns_hostname" data-key="Frontend.dyn_dns.ddns_hostname" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L801">ddns_hostname</a> <a class="anchorlink" href="#Frontend.dyn_dns.ddns_hostname" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > dyn_dns > ddns_hostname</div>
  <div class="reference-value-mapping">&lt;not set&gt;</div>
</li>

<div class="item-comment">

 If empty we use Google Domains.

</div>
<li class="ref-item ref-leaf" id="Frontend.dyn_dns.update_url" data-key="Frontend.dyn_dns.update_url" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L804">update_url</a> <a class="anchorlink" href="#Frontend.dyn_dns.update_url" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > dyn_dns > update_url</div>
  <div class="reference-value-mapping">http://dyndns.provider.com/</div>
</li>

<div class="item-comment">

 How often to check for IP assigned

</div>
<li class="ref-item ref-leaf" id="Frontend.dyn_dns.frequency" data-key="Frontend.dyn_dns.frequency" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L807">frequency</a> <a class="anchorlink" href="#Frontend.dyn_dns.frequency" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > dyn_dns > frequency</div>
  <div class="reference-value-mapping">60</div>
</li>

<div class="item-comment">

 The url we will use to check the ip. Should return a plain IP
 address (default is Google Domains)

</div>
<li class="ref-item ref-leaf" id="Frontend.dyn_dns.checkip_url" data-key="Frontend.dyn_dns.checkip_url" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L811">checkip_url</a> <a class="anchorlink" href="#Frontend.dyn_dns.checkip_url" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > dyn_dns > checkip_url</div>
  <div class="reference-value-mapping">http://dyndns.provider.com/checkip</div>
</li>

<div class="item-comment">

 DNS server we query for our own hostname/ip mapping (default
 8.8.8.8:53)

</div>
<li class="ref-item ref-leaf" id="Frontend.dyn_dns.dns_server" data-key="Frontend.dyn_dns.dns_server" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L815">dns_server</a> <a class="anchorlink" href="#Frontend.dyn_dns.dns_server" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > dyn_dns > dns_server</div>
  <div class="reference-value-mapping">8.8.8.8:53</div>
</li>

<div class="item-comment">

 Used by the cloudfront provider

</div>
<li class="ref-item ref-leaf" id="Frontend.dyn_dns.api_token" data-key="Frontend.dyn_dns.api_token" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L818">api_token</a> <a class="anchorlink" href="#Frontend.dyn_dns.api_token" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > dyn_dns > api_token</div>
  <div class="reference-value-mapping">&lt;not set&gt;</div>
</li>

<div class="item-comment">

 The zone to update (dns domain).

</div>
<li class="ref-item ref-leaf" id="Frontend.dyn_dns.zone_name" data-key="Frontend.dyn_dns.zone_name" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L821">zone_name</a> <a class="anchorlink" href="#Frontend.dyn_dns.zone_name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > dyn_dns > zone_name</div>
  <div class="reference-value-mapping">&lt;not set&gt;</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Header defined by the proxy containing the remote address. If this
 is not set we use the remote IP address from the TCP
 connection. This setting is needed if you have a reverse proxy in
 front of the server.

</div>
<li class="ref-item ref-leaf" id="Frontend.proxy_header" data-key="Frontend.proxy_header" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L827">proxy_header</a> <a class="anchorlink" href="#Frontend.proxy_header" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > proxy_header</div>
  <div class="reference-value-mapping">X-Forwarded-For</div>
</li>

<div class="item-comment">

 We have the Server.Monitor.Health enabled always but these are
 any additional artifacts that should be installed by default.

</div>
<li class="ref-item ref-container" id="Frontend.default_server_monitoring_artifacts" data-key="Frontend.default_server_monitoring_artifacts" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L832">default_server_monitoring_artifacts</a> <a class="anchorlink" href="#Frontend.default_server_monitoring_artifacts" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Frontend > default_server_monitoring_artifacts</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="Frontend.default_server_monitoring_artifacts" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">Server.Monitor.Health</div>
   </span>
   <div class="item-breadcrumb">Frontend > default_server_monitoring_artifacts</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 When creating the initial client monitoring artifact table, these
 artifacts will be assigned to all clients.

</div>
<li class="ref-item ref-container" id="Frontend.default_client_monitoring_artifacts" data-key="Frontend.default_client_monitoring_artifacts" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L837">default_client_monitoring_artifacts</a> <a class="anchorlink" href="#Frontend.default_client_monitoring_artifacts" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Frontend > default_client_monitoring_artifacts</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="Frontend.default_client_monitoring_artifacts" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">Generic.Client.Stats</div>
   </span>
   <div class="item-breadcrumb">Frontend > default_client_monitoring_artifacts</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 The user that the frontend should run as. If set we refuse to run
 as a different user. This is normally set by the Ubuntu deb
 package as it is running as a low privilege user called
 "velociraptor". This setting is important as it stops users from
 running velociraptor as root with sudo - doing this will break the
 velociraptor datastore when it creates files only readable by
 root.

</div>
<li class="ref-item ref-leaf" id="Frontend.run_as_user" data-key="Frontend.run_as_user" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L846">run_as_user</a> <a class="anchorlink" href="#Frontend.run_as_user" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > run_as_user</div>
  <div class="reference-value-mapping">velociraptor</div>
</li>

<div class="item-comment">

 When the server is created initially, these server artifacts will
 be collected. You can use this to fire custom initialization
 sequences.

</div>
<li class="ref-item ref-container" id="Frontend.initial_server_artifacts" data-key="Frontend.initial_server_artifacts" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L852">initial_server_artifacts</a> <a class="anchorlink" href="#Frontend.initial_server_artifacts" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Frontend > initial_server_artifacts</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="Frontend.initial_server_artifacts" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">MySpecialArtifact</div>
   </span>
   <div class="item-breadcrumb">Frontend > initial_server_artifacts</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Number of gRPC connections in the pool to use to connect to the
 API server.

</div>
<li class="ref-item ref-leaf" id="Frontend.GRPC_pool_max_size" data-key="Frontend.GRPC_pool_max_size" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L856">GRPC_pool_max_size</a> <a class="anchorlink" href="#Frontend.GRPC_pool_max_size" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > GRPC_pool_max_size</div>
  <div class="reference-value-mapping">100</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Frontend.GRPC_pool_max_wait" data-key="Frontend.GRPC_pool_max_wait" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L857">GRPC_pool_max_wait</a> <a class="anchorlink" href="#Frontend.GRPC_pool_max_wait" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > GRPC_pool_max_wait</div>
  <div class="reference-value-mapping">60</div>
</li>

<div class="item-comment">

 Load artifacts from this directory at startup

</div>
<li class="ref-item ref-leaf" id="Frontend.artifact_definitions_directory" data-key="Frontend.artifact_definitions_directory" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L860">artifact_definitions_directory</a> <a class="anchorlink" href="#Frontend.artifact_definitions_directory" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > artifact_definitions_directory</div>
  <div class="reference-value-mapping">/tmp/</div>
</li>

<div class="item-comment">

 A regular expression that if matches any log messages from the
 client's query represent a failure of the collection. Marking the
 collection as failed can highlight potential problems with the VQL
 so this regex tries to detect common issues (e.g. Symbol not
 found) to draw attention to failures.

</div>
<li class="ref-item ref-leaf" id="Frontend.collection_error_regex" data-key="Frontend.collection_error_regex" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L867">collection_error_regex</a> <a class="anchorlink" href="#Frontend.collection_error_regex" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > collection_error_regex</div>
  <div class="reference-value-mapping">ERROR:</div>
</li>

<div class="item-comment">

 Sets resource limitations on the server. These parameters
 represent the set of tunable parameters you can use to optimize
 performance on loaded servers.

</div>
<li class="ref-item ref-container" id="Frontend.resources" data-key="Frontend.resources" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L874">resources</a> <a class="anchorlink" href="#Frontend.resources" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Frontend > resources</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 Load shed connections faster than this to preserve stability.

</div>
<li class="ref-item ref-leaf" id="Frontend.resources.connections_per_second" data-key="Frontend.resources.connections_per_second" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L874">connections_per_second</a> <a class="anchorlink" href="#Frontend.resources.connections_per_second" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > connections_per_second</div>
  <div class="reference-value-mapping">300</div>
</li>

<div class="item-comment">

 The rate at which we notify clients of new work (e.g. a new hunt
 is started). Slower notification rate helps to slow down the
 swarm effect and reduced load on the server.

</div>
<li class="ref-item ref-leaf" id="Frontend.resources.notifications_per_second" data-key="Frontend.resources.notifications_per_second" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L879">notifications_per_second</a> <a class="anchorlink" href="#Frontend.resources.notifications_per_second" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > notifications_per_second</div>
  <div class="reference-value-mapping">1000</div>
</li>

<div class="item-comment">

 How quickly do we enroll clients (default 100/s, -1 to disable
 enrollments)

</div>
<li class="ref-item ref-leaf" id="Frontend.resources.enrollments_per_second" data-key="Frontend.resources.enrollments_per_second" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L883">enrollments_per_second</a> <a class="anchorlink" href="#Frontend.resources.enrollments_per_second" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > enrollments_per_second</div>
  <div class="reference-value-mapping">100</div>
</li>

<div class="item-comment">

 The maximum number of concurrent client connections we can
 process. Concurrency limits helps to ensure the server is not
 overloaded serving too many clients at the same time.
 Concurrency refers to the actual serving time of a client
 (i.e. time taken to read the response and write to the
 datastore), not the total number of clients served by
 server. Default is number of cores * 2.

</div>
<li class="ref-item ref-leaf" id="Frontend.resources.concurrency" data-key="Frontend.resources.concurrency" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L892">concurrency</a> <a class="anchorlink" href="#Frontend.resources.concurrency" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > concurrency</div>
  <div class="reference-value-mapping">20</div>
</li>

<div class="item-comment">

 The maximum time a client will be waiting for a concurrency slot
 before timing out. A small value will result in many
 reconnections under load and may degrade performance.

</div>
<li class="ref-item ref-leaf" id="Frontend.resources.concurrency_timeout" data-key="Frontend.resources.concurrency_timeout" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L897">concurrency_timeout</a> <a class="anchorlink" href="#Frontend.resources.concurrency_timeout" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > concurrency_timeout</div>
  <div class="reference-value-mapping">600</div>
</li>

<div class="item-comment">

 Increasing this allows the frontend to receive larger POST
 messages lowering crypto overheads but this comes at the
 expense of more memory use.

</div>
<li class="ref-item ref-leaf" id="Frontend.resources.max_upload_size" data-key="Frontend.resources.max_upload_size" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L902">max_upload_size</a> <a class="anchorlink" href="#Frontend.resources.max_upload_size" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > max_upload_size</div>
  <div class="reference-value-mapping">10485760</div>
</li>

<div class="item-comment">

 This setting controls the size of various LRU caches in the
 frontend (e.g. the session key cache, client info cache). This
 number should be larger than the number of actual clients or
 else the system will see high CPU load from cache misses.

</div>
<li class="ref-item ref-leaf" id="Frontend.resources.expected_clients" data-key="Frontend.resources.expected_clients" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L908">expected_clients</a> <a class="anchorlink" href="#Frontend.resources.expected_clients" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > expected_clients</div>
  <div class="reference-value-mapping">10000</div>
</li>

<div class="item-comment">

 Bandwidth control: Per client and global rates in
 bytes/sec. This is useful for low bandwidth deployments where we
 want to ensure Velociraptor does not saturate slow links. The
 bandwidth limitation caps the total bandwidth used by the server
 per client and globally.

</div>
<li class="ref-item ref-leaf" id="Frontend.resources.per_client_upload_rate" data-key="Frontend.resources.per_client_upload_rate" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L916">per_client_upload_rate</a> <a class="anchorlink" href="#Frontend.resources.per_client_upload_rate" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > per_client_upload_rate</div>
  <div class="reference-value-mapping">0</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Frontend.resources.global_upload_rate" data-key="Frontend.resources.global_upload_rate" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L917">global_upload_rate</a> <a class="anchorlink" href="#Frontend.resources.global_upload_rate" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > global_upload_rate</div>
  <div class="reference-value-mapping">0</div>
</li>

<div class="item-comment">

 Wait time for collecting events from clients - smaller means
 less latency to respond to client events but also means more
 TLS handshake and network overheads due to frequent POST.

</div>
<li class="ref-item ref-leaf" id="Frontend.resources.client_event_max_wait" data-key="Frontend.resources.client_event_max_wait" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L922">client_event_max_wait</a> <a class="anchorlink" href="#Frontend.resources.client_event_max_wait" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > client_event_max_wait</div>
  <div class="reference-value-mapping">100</div>
</li>

<div class="item-comment">

 Minions batch updates to the master so as to minimize RPC as
 much as possible, this controls how often these batches are
 flushed to the master (default 10 sec).

</div>
<li class="ref-item ref-leaf" id="Frontend.resources.minion_batch_wait_time_ms" data-key="Frontend.resources.minion_batch_wait_time_ms" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L927">minion_batch_wait_time_ms</a> <a class="anchorlink" href="#Frontend.resources.minion_batch_wait_time_ms" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > minion_batch_wait_time_ms</div>
  <div class="reference-value-mapping">10</div>
</li>

<div class="item-comment">

 Number of seconds before expiring client info cache
 entries. Default (0) means do not expire at all. Expiring
 client info from cache too frequently can result in a lot more
 IO. Default size of this cache is the expected_clients above.

</div>
<li class="ref-item ref-leaf" id="Frontend.resources.client_info_lru_ttl" data-key="Frontend.resources.client_info_lru_ttl" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L933">client_info_lru_ttl</a> <a class="anchorlink" href="#Frontend.resources.client_info_lru_ttl" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > client_info_lru_ttl</div>
  <div class="reference-value-mapping">0</div>
</li>

<div class="item-comment">

 How often to sync client info records (ms) between minion and
 master.

</div>
<li class="ref-item ref-leaf" id="Frontend.resources.client_info_sync_time" data-key="Frontend.resources.client_info_sync_time" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L937">client_info_sync_time</a> <a class="anchorlink" href="#Frontend.resources.client_info_sync_time" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > client_info_sync_time</div>
  <div class="reference-value-mapping">0</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Frontend.resources.client_info_write_time" data-key="Frontend.resources.client_info_write_time" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L938">client_info_write_time</a> <a class="anchorlink" href="#Frontend.resources.client_info_write_time" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > client_info_write_time</div>
  <div class="reference-value-mapping">0</div>
</li>

<div class="item-comment">

 The journal files are used to queue messages between event
 generators and event consumers when the consumer is unable to
 drain these quickly enough. The setting specifies the maximum
 size of the file - when it is exceeded, the file will be
 truncated and events will be lost. Default is 1gb

</div>
<li class="ref-item ref-leaf" id="Frontend.resources.max_journal_buffer_size" data-key="Frontend.resources.max_journal_buffer_size" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L945">max_journal_buffer_size</a> <a class="anchorlink" href="#Frontend.resources.max_journal_buffer_size" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > max_journal_buffer_size</div>
  <div class="reference-value-mapping">1000000000</div>
</li>

<div class="item-comment">

 How often to save an index snapshot to storage (default 600
 sec). Index files are typically 150kb / 1000 clients.

</div>
<li class="ref-item ref-leaf" id="Frontend.resources.index_snapshot_frequency" data-key="Frontend.resources.index_snapshot_frequency" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L949">index_snapshot_frequency</a> <a class="anchorlink" href="#Frontend.resources.index_snapshot_frequency" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Frontend > resources > index_snapshot_frequency</div>
  <div class="reference-value-mapping">10</div>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Velociraptor has a datastore abstraction and can use a number of
 possible data storage engines. This section configures the data
 store implementation.

</div>
<li class="ref-item ref-container" id="Datastore" data-key="Datastore" data-depth="1">
 <details open>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L957">Datastore</a> <a class="anchorlink" href="#Datastore" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Datastore</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 The data store implementation to use. This is usually set to
 FileBaseDataStore.

</div>
<li class="ref-item ref-leaf" id="Datastore.implementation" data-key="Datastore.implementation" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L957">implementation</a> <a class="anchorlink" href="#Datastore.implementation" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > implementation</div>
  <div class="reference-value-mapping">FileBaseDataStore</div>
</li>

<div class="item-comment">

 The directory under which we store small files.

</div>
<li class="ref-item ref-leaf" id="Datastore.location" data-key="Datastore.location" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L960">location</a> <a class="anchorlink" href="#Datastore.location" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > location</div>
  <div class="reference-value-mapping">/mnt/data</div>
</li>

<div class="item-comment">

 Larger result sets and uploads are stored in the
 filestore_directory. This is usually the same as the location
 setting but it can be different to keep larger slower storage
 options away from smaller and faster data.

</div>
<li class="ref-item ref-leaf" id="Datastore.filestore_directory" data-key="Datastore.filestore_directory" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L966">filestore_directory</a> <a class="anchorlink" href="#Datastore.filestore_directory" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > filestore_directory</div>
  <div class="reference-value-mapping">/mnt/data</div>
</li>

<div class="item-comment">

 How long before a write is forced from the pool for delayed writes

</div>
<li class="ref-item ref-leaf" id="Datastore.memcache_write_mutation_max_age" data-key="Datastore.memcache_write_mutation_max_age" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L969">memcache_write_mutation_max_age</a> <a class="anchorlink" href="#Datastore.memcache_write_mutation_max_age" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > memcache_write_mutation_max_age</div>
  <div class="reference-value-mapping">1</div>
</li>

<div class="item-comment">

 Maximum amount of data cached in memory before we force it to be
 flushed to disk. Default 100mb

</div>
<li class="ref-item ref-leaf" id="Datastore.memcache_write_max_memory" data-key="Datastore.memcache_write_max_memory" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L973">memcache_write_max_memory</a> <a class="anchorlink" href="#Datastore.memcache_write_max_memory" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > memcache_write_max_memory</div>
  <div class="reference-value-mapping">100000000</div>
</li>

<div class="item-comment">

 When using a master/minion setup it is necessary to have the
 Master and Minion nodes use different filesystem
 implementations. These more specific parameters can control
 datastore implementations on the master and minion separately.

</div>
<li class="ref-item ref-leaf" id="Datastore.minion_implementation" data-key="Datastore.minion_implementation" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L979">minion_implementation</a> <a class="anchorlink" href="#Datastore.minion_implementation" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > minion_implementation</div>
  <div class="reference-value-mapping">RemoteFileDataStore</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Datastore.master_implementation" data-key="Datastore.master_implementation" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L980">master_implementation</a> <a class="anchorlink" href="#Datastore.master_implementation" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > master_implementation</div>
  <div class="reference-value-mapping">MemcacheFileDataStore</div>
</li>

<div class="item-comment">

 Cap directories to this size after reporting error - this should
 not happen normally but may happen if the deployment has been very
 active or due to a bug!

</div>
<li class="ref-item ref-leaf" id="Datastore.max_dir_size" data-key="Datastore.max_dir_size" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L985">max_dir_size</a> <a class="anchorlink" href="#Datastore.max_dir_size" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > max_dir_size</div>
  <div class="reference-value-mapping">50000</div>
</li>

<div class="item-comment">

 Set to the min required disk space. When we fall below this
 available disk space, we refuse to write files. This avoids the
 possibility of writing corrupted files. Default is 50mb. Set to -1
 to disable disk space monitoring.

</div>
<li class="ref-item ref-leaf" id="Datastore.min_allowed_file_space_mb" data-key="Datastore.min_allowed_file_space_mb" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L991">min_allowed_file_space_mb</a> <a class="anchorlink" href="#Datastore.min_allowed_file_space_mb" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > min_allowed_file_space_mb</div>
  <div class="reference-value-mapping">50</div>
</li>

<div class="item-comment">

 How often to check the disk space (default 10 sec)

</div>
<li class="ref-item ref-leaf" id="Datastore.disk_check_frequency_sec" data-key="Datastore.disk_check_frequency_sec" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L994">disk_check_frequency_sec</a> <a class="anchorlink" href="#Datastore.disk_check_frequency_sec" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > disk_check_frequency_sec</div>
  <div class="reference-value-mapping">10</div>
</li>

<div class="item-comment">

 The following apply to the MemcacheFileDataStore
 How long to expire the memcache (default 10 min)

</div>
<li class="ref-item ref-leaf" id="Datastore.memcache_expiration_sec" data-key="Datastore.memcache_expiration_sec" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L999">memcache_expiration_sec</a> <a class="anchorlink" href="#Datastore.memcache_expiration_sec" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > memcache_expiration_sec</div>
  <div class="reference-value-mapping">6000</div>
</li>

<div class="item-comment">

 How many mutations to queue up ahead of busy writers. By
 default 0 means writes will be blocked until they are handed
 off to a writer thread. Set to -1 to disable asynchronous
 writes.

</div>
<li class="ref-item ref-leaf" id="Datastore.memcache_write_mutation_buffer" data-key="Datastore.memcache_write_mutation_buffer" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1005">memcache_write_mutation_buffer</a> <a class="anchorlink" href="#Datastore.memcache_write_mutation_buffer" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > memcache_write_mutation_buffer</div>
  <div class="reference-value-mapping">100</div>
</li>

<div class="item-comment">

 The MemcacheFileDataStore separates writers into a writing
 pool. These set the number of writer threads in that pool.
 Number of writing threads - increase for high latency
 filesystems (default 100).

</div>
<li class="ref-item ref-leaf" id="Datastore.memcache_write_mutation_writers" data-key="Datastore.memcache_write_mutation_writers" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1011">memcache_write_mutation_writers</a> <a class="anchorlink" href="#Datastore.memcache_write_mutation_writers" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > memcache_write_mutation_writers</div>
  <div class="reference-value-mapping">100</div>
</li>

<div class="item-comment">

 How long to delay writes so they can be combined. This applies for
 writing result sets - we keep the writes in memory for min_age
 seconds in order to combine further writes. If another write
 occurs to the same result sets the TTL is extended and writes are
 delayed. However, once we reach max_age, a write is forced. The aim
 is to keep combining separate writes as much as possible into larger
 writes but at the same time prevent frequently written files from
 never flushing to disk.

</div>
<li class="ref-item ref-leaf" id="Datastore.memcache_write_mutation_min_age" data-key="Datastore.memcache_write_mutation_min_age" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1021">memcache_write_mutation_min_age</a> <a class="anchorlink" href="#Datastore.memcache_write_mutation_min_age" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > memcache_write_mutation_min_age</div>
  <div class="reference-value-mapping">1000</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Datastore.int64 memcache_write_mutation_max_age" data-key="Datastore.int64 memcache_write_mutation_max_age" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1022">int64 memcache_write_mutation_max_age</a> <a class="anchorlink" href="#Datastore.int64 memcache_write_mutation_max_age" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > int64 memcache_write_mutation_max_age</div>
  <div class="reference-value-mapping">5000</div>
</li>

<div class="item-comment">

 MemcacheFileDataStore will cache small files in memory to improve
 efficiency. This is the maximum size of the cache.
 Maximum size of memcache lru (default 10000)

</div>
<li class="ref-item ref-leaf" id="Datastore.memcache_datastore_max_size" data-key="Datastore.memcache_datastore_max_size" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1027">memcache_datastore_max_size</a> <a class="anchorlink" href="#Datastore.memcache_datastore_max_size" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > memcache_datastore_max_size</div>
  <div class="reference-value-mapping">10000</div>
</li>

<div class="item-comment">

 Do not cache large objects in memory - falls back to
 FileBaseDataStore

</div>
<li class="ref-item ref-leaf" id="Datastore.memcache_datastore_max_item_size" data-key="Datastore.memcache_datastore_max_item_size" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1031">memcache_datastore_max_item_size</a> <a class="anchorlink" href="#Datastore.memcache_datastore_max_item_size" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > memcache_datastore_max_item_size</div>
  <div class="reference-value-mapping">1000</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Datastore.memcache_datastore_max_dir_size" data-key="Datastore.memcache_datastore_max_dir_size" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1032">memcache_datastore_max_dir_size</a> <a class="anchorlink" href="#Datastore.memcache_datastore_max_dir_size" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > memcache_datastore_max_dir_size</div>
  <div class="reference-value-mapping">50000</div>
</li>

<div class="item-comment">

 The compression mode for collections. This setting allows
 compressed results to be stored on the server. For performance
 reasons, the client must compress the data into chunks and the
 server simply writes the results to storage. This means it is only
 supported by clients more recent than 0.75.

 Allowed settings:
 - none: No compression - disable compression in client
   transmission. Note that for older clients (prior to 0.75),
   compression is not supported anyway, but this setting will
   disable compression on new clients as well.

 - zlib: Zlib compression enabled on collections. This is the
   default setting when communicating with newer clients.

</div>
<li class="ref-item ref-leaf" id="Datastore.compression" data-key="Datastore.compression" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1049">compression</a> <a class="anchorlink" href="#Datastore.compression" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > compression</div>
  <div class="reference-value-mapping">zlib</div>
</li>

<div class="item-comment">

 The maximum size of stored objects in the datastore. The Datastore
 is assumed to contain smallish objects which are read and written
 atomically. This setting places a limit on the size of these
 objects to maintain efficiency and speed. If you hit this limit it
 means that you need to rethink your approach. See
 https:docs.velociraptor.app/knowledge_base/tips/grpc_errors/ The
 default size is 4Mb.

</div>
<li class="ref-item ref-leaf" id="Datastore.max_object_size" data-key="Datastore.max_object_size" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1058">max_object_size</a> <a class="anchorlink" href="#Datastore.max_object_size" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Datastore > max_object_size</div>
  <div class="reference-value-mapping">4194304</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Configure logging behavior

</div>
<li class="ref-item ref-container" id="Logging" data-key="Logging" data-depth="1">
 <details open>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1063">Logging</a> <a class="anchorlink" href="#Logging" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Logging</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 A directory to write log files in .

</div>
<li class="ref-item ref-leaf" id="Logging.output_directory" data-key="Logging.output_directory" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1063">output_directory</a> <a class="anchorlink" href="#Logging.output_directory" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Logging > output_directory</div>
  <div class="reference-value-mapping">/mnt/data/logs</div>
</li>

<div class="item-comment">

 If this is set the logs will be separated into different
 components (e.g. Frontend, GUI, Audit etc). This makes it easier
 to find the source of the log messages

</div>
<li class="ref-item ref-leaf" id="Logging.separate_logs_per_component" data-key="Logging.separate_logs_per_component" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1068">separate_logs_per_component</a> <a class="anchorlink" href="#Logging.separate_logs_per_component" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Logging > separate_logs_per_component</div>
  <div class="reference-value-mapping">true</div>
</li>

<div class="item-comment">

 If you want to forward events to a remote syslog server, fill this
 server addresss or hostname. If a port is omitted we use port 514.

</div>
<li class="ref-item ref-leaf" id="Logging.remote_syslog_server" data-key="Logging.remote_syslog_server" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1072">remote_syslog_server</a> <a class="anchorlink" href="#Logging.remote_syslog_server" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Logging > remote_syslog_server</div>
  <div class="reference-value-mapping">localhost:514</div>
</li>

<div class="item-comment">

 The protocol to use for remote syslog (default udp).

</div>
<li class="ref-item ref-leaf" id="Logging.remote_syslog_protocol" data-key="Logging.remote_syslog_protocol" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1075">remote_syslog_protocol</a> <a class="anchorlink" href="#Logging.remote_syslog_protocol" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Logging > remote_syslog_protocol</div>
  <div class="reference-value-mapping">udp</div>
</li>

<div class="item-comment">

 The logging components to forward. If not specified we only send
 Audit events.

</div>
<li class="ref-item ref-container" id="Logging.remote_syslog_components" data-key="Logging.remote_syslog_components" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1080">remote_syslog_components</a> <a class="anchorlink" href="#Logging.remote_syslog_components" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Logging > remote_syslog_components</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="Logging.remote_syslog_components" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">VelociraptorAudit</div>
   </span>
   <div class="item-breadcrumb">Logging > remote_syslog_components</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Specific configuration for each log level. If a log level is not
 configured here it is logged as normal.

</div>
<li class="ref-item ref-container" id="Logging.debug" data-key="Logging.debug" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1086">debug</a> <a class="anchorlink" href="#Logging.debug" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Logging > debug</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 How often to rotate the files in seconds.

</div>
<li class="ref-item ref-leaf" id="Logging.debug.rotation_time" data-key="Logging.debug.rotation_time" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1086">rotation_time</a> <a class="anchorlink" href="#Logging.debug.rotation_time" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Logging > debug > rotation_time</div>
  <div class="reference-value-mapping">8000</div>
</li>

<div class="item-comment">

 Maximum age of each file (File will be deleted after this time (1 year).

</div>
<li class="ref-item ref-leaf" id="Logging.debug.max_age" data-key="Logging.debug.max_age" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1089">max_age</a> <a class="anchorlink" href="#Logging.debug.max_age" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Logging > debug > max_age</div>
  <div class="reference-value-mapping">31536000</div>
</li>

<div class="item-comment">

 If this is true this log source is disabled.

</div>
<li class="ref-item ref-leaf" id="Logging.debug.disabled" data-key="Logging.debug.disabled" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1092">disabled</a> <a class="anchorlink" href="#Logging.debug.disabled" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Logging > debug > disabled</div>
  <div class="reference-value-mapping">true</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-container" id="Logging.info" data-key="Logging.info" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1095">info</a> <a class="anchorlink" href="#Logging.info" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Logging > info</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Logging.info.rotation_time" data-key="Logging.info.rotation_time" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1095">rotation_time</a> <a class="anchorlink" href="#Logging.info.rotation_time" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Logging > info > rotation_time</div>
  <div class="reference-value-mapping">8000</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Logging.info.max_age" data-key="Logging.info.max_age" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1096">max_age</a> <a class="anchorlink" href="#Logging.info.max_age" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Logging > info > max_age</div>
  <div class="reference-value-mapping">31536000</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Logging.info.disabled" data-key="Logging.info.disabled" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1097">disabled</a> <a class="anchorlink" href="#Logging.info.disabled" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Logging > info > disabled</div>
  <div class="reference-value-mapping">true</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-container" id="Logging.error" data-key="Logging.error" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1100">error</a> <a class="anchorlink" href="#Logging.error" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Logging > error</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Logging.error.rotation_time" data-key="Logging.error.rotation_time" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1100">rotation_time</a> <a class="anchorlink" href="#Logging.error.rotation_time" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Logging > error > rotation_time</div>
  <div class="reference-value-mapping">8000</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Logging.error.max_age" data-key="Logging.error.max_age" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1101">max_age</a> <a class="anchorlink" href="#Logging.error.max_age" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Logging > error > max_age</div>
  <div class="reference-value-mapping">31536000</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Logging.error.disabled" data-key="Logging.error.disabled" data-depth="3">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1102">disabled</a> <a class="anchorlink" href="#Logging.error.disabled" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Logging > error > disabled</div>
  <div class="reference-value-mapping">true</div>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 This controls the Monitoring server (i.e. Prometheus) If you have a
 monitoring service like Grafana or Data Dog then change this server
 to bind to 0.0.0.0 and point your scraper at it.

</div>
<li class="ref-item ref-container" id="Monitoring" data-key="Monitoring" data-depth="1">
 <details open>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1108">Monitoring</a> <a class="anchorlink" href="#Monitoring" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Monitoring</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Monitoring.bind_address" data-key="Monitoring.bind_address" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1108">bind_address</a> <a class="anchorlink" href="#Monitoring.bind_address" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Monitoring > bind_address</div>
  <div class="reference-value-mapping">127.0.0.1</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="Monitoring.bind_port" data-key="Monitoring.bind_port" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1109">bind_port</a> <a class="anchorlink" href="#Monitoring.bind_port" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Monitoring > bind_port</div>
  <div class="reference-value-mapping">8003</div>
</li>

<div class="item-comment">

 If set we use this in links etc, otherwise we take a guess
  based on bind_address and bind_port above.

</div>
<li class="ref-item ref-leaf" id="Monitoring.metrics_url" data-key="Monitoring.metrics_url" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1113">metrics_url</a> <a class="anchorlink" href="#Monitoring.metrics_url" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Monitoring > metrics_url</div>
  <div class="reference-value-mapping">http://localhost:8003/metrics</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Run these automatically when the binary starts.

</div>
<li class="ref-item ref-container" id="autoexec" data-key="autoexec" data-depth="1">
 <details open>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1122">autoexec</a> <a class="anchorlink" href="#autoexec" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">autoexec</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 When starting without any command line parameters, this argv array
 will be used as if it was typed on the command line. This is a way
 to get Velociraptor to automatically execute a function as
 startup when used without parameters.

</div>
<li class="ref-item ref-container" id="autoexec.argv" data-key="autoexec.argv" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1123">argv</a> <a class="anchorlink" href="#autoexec.argv" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">autoexec > argv</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="autoexec.argv" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">artifacts</div>
   </span>
   <div class="item-breadcrumb">autoexec > argv</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="autoexec.argv" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">collect</div>
   </span>
   <div class="item-breadcrumb">autoexec > argv</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="autoexec.argv" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">Generic.Client.Info</div>
   </span>
   <div class="item-breadcrumb">autoexec > argv</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Load these artifact definitions into the binary at startup. NOTE:
 These definitions are considered "built-in" which will ensure they
 can not be modified at runtime.

 The format of these fields is an artifact definition - so the
 following description also covers artifact definitions more
 generally.

</div>
<li class="ref-item ref-container" id="autoexec.artifact_definitions" data-key="autoexec.artifact_definitions" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1135">artifact_definitions</a> <a class="anchorlink" href="#autoexec.artifact_definitions" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-container" data-key="autoexec.artifact_definitions.[0]" data-depth="2">
 <details>
 <summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
   <div class="reference-key">
     [0]
   </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0]</div>
  <div class="reference-value-sequence"><ul>

<div class="item-comment">

 The name of the artifact. Artifacts are referred to by name
 within the system.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].name" data-key="autoexec.artifact_definitions.[0].name" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1138">name</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > name</div>
  <div class="reference-value-mapping">Generic.Client.InfoXXX</div>
</li>

<div class="item-comment">

 A Human readable description of the artifact. This should have a
 single summary paragraph

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].description" data-key="autoexec.artifact_definitions.[0].description" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1142">description</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].description" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > description</div>
  <div class="reference-value-mapping">Artifact Description</div>
</li>

<div class="item-comment">

 The artifact author

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].author" data-key="autoexec.artifact_definitions.[0].author" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1145">author</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].author" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > author</div>
  <div class="reference-value-mapping">Author</div>
</li>

<div class="item-comment">

 Type of the artifact: CLIENT, SERVER, CLIENT_EVENT, SERVER_EVENT

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].type" data-key="autoexec.artifact_definitions.[0].type" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1148">type</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].type" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > type</div>
  <div class="reference-value-mapping">CLIENT</div>
</li>

<div class="item-comment">

 A list of references

</div>
<li class="ref-item ref-container" id="autoexec.artifact_definitions.[0].reference" data-key="autoexec.artifact_definitions.[0].reference" data-depth="4">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1152">reference</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].reference" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > reference</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="autoexec.artifact_definitions.[0].reference" data-depth="4">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">https://www.google.com</div>
   </span>
   <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > reference</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Artifacts can specify third party tools to load. Velociraptor
 will attempt to fetch these tools when a user wants to collect
 this artifact. Velociraptor will push the tool to the endpoint
 so the artifact may use it.

</div>
<li class="ref-item ref-container" id="autoexec.artifact_definitions.[0].tools" data-key="autoexec.artifact_definitions.[0].tools" data-depth="4">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1159">tools</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].tools" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > tools</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-container" data-key="autoexec.artifact_definitions.[0].tools.[0]" data-depth="4">
 <details>
 <summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
   <div class="reference-key">
     [0]
   </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > tools > [0]</div>
  <div class="reference-value-sequence"><ul>

<div class="item-comment">

 The name of the tool

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].tools.[0].name" data-key="autoexec.artifact_definitions.[0].tools.[0].name" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1161">name</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].tools.[0].name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > tools > [0] > name</div>
  <div class="reference-value-mapping">MyTool</div>
</li>

<div class="item-comment">

 The URL to fetch the tool from when we upload it the first
 time, or when we update.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].tools.[0].url" data-key="autoexec.artifact_definitions.[0].tools.[0].url" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1165">url</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].tools.[0].url" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > tools > [0] > url</div>
  <div class="reference-value-mapping">http://www.google.com</div>
</li>

<div class="item-comment">

 As an alternative to a url we allow scrapping of GitHub
 releases using the github API. NOTE: When this method is
 specified, the file will always be served locally.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].tools.[0].github_project" data-key="autoexec.artifact_definitions.[0].tools.[0].github_project" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1170">github_project</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].tools.[0].github_project" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > tools > [0] > github_project</div>
  <div class="reference-value-mapping">GitHubProject</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].tools.[0].github_asset_regex" data-key="autoexec.artifact_definitions.[0].tools.[0].github_asset_regex" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1171">github_asset_regex</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].tools.[0].github_asset_regex" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > tools > [0] > github_asset_regex</div>
  <div class="reference-value-mapping">GitHubAsset</div>
</li>

<div class="item-comment">

 If set, the tool will be served locally from the filestore
 path - otherwise the endpoint will download the file by
 itself from the url above.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].tools.[0].serve_locally" data-key="autoexec.artifact_definitions.[0].tools.[0].serve_locally" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1176">serve_locally</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].tools.[0].serve_locally" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > tools > [0] > serve_locally</div>
  <div class="reference-value-mapping">true</div>
</li>

<div class="item-comment">

 This is set when an admin explicitly overrides a tool. If
 this is set we will not update the tool definition when
 upgrading server versions.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].tools.[0].admin_override" data-key="autoexec.artifact_definitions.[0].tools.[0].admin_override" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1181">admin_override</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].tools.[0].admin_override" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > tools > [0] > admin_override</div>
  <div class="reference-value-mapping">true</div>
</li>

<div class="item-comment">

 Once the tool is added with the above fields, the following
 fields are used to keep state on it.
 The URL we serve the tool from when we serve locally. If this
 is empty we just let the endpoint download its own tool from
 the url above.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].tools.[0].serve_url" data-key="autoexec.artifact_definitions.[0].tools.[0].serve_url" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1190">serve_url</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].tools.[0].serve_url" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > tools > [0] > serve_url</div>
  <div class="reference-value-mapping">https://www.google.com</div>
</li>

<div class="item-comment">

 Only valid for local dummy inventory.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].tools.[0].serve_path" data-key="autoexec.artifact_definitions.[0].tools.[0].serve_path" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1193">serve_path</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].tools.[0].serve_path" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > tools > [0] > serve_path</div>
  <div class="reference-value-mapping">Where to read the file from the filesystem</div>
</li>

<div class="item-comment">

 A filestore path where the file can be downloaded from - if
 served locally.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].tools.[0].filestore_path" data-key="autoexec.artifact_definitions.[0].tools.[0].filestore_path" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1197">filestore_path</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].tools.[0].filestore_path" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > tools > [0] > filestore_path</div>
  <div class="reference-value-mapping">/public/1234</div>
</li>

<div class="item-comment">

 The name of the cached file on the endpoint. This file will
 persist and can be accessed again if this tool is needed in
 future. If the file is missing (or has the wrong hash), then it
 will be downloaded again.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].tools.[0].filename" data-key="autoexec.artifact_definitions.[0].tools.[0].filename" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1203">filename</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].tools.[0].filename" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > tools > [0] > filename</div>
  <div class="reference-value-mapping">MyTool.exe</div>
</li>

<div class="item-comment">

 Hex encoded sha256 hash of the file. Endpoints will check
 this hash against their fetch file to ensure it was
 correctly transferred.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].tools.[0].expected_hash" data-key="autoexec.artifact_definitions.[0].tools.[0].expected_hash" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1208">expected_hash</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].tools.[0].expected_hash" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > tools > [0] > expected_hash</div>
  <div class="reference-value-mapping">1234</div>
</li>

<div class="item-comment">

 If set on a request we refresh the hash.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].tools.[0].materialize" data-key="autoexec.artifact_definitions.[0].tools.[0].materialize" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1211">materialize</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].tools.[0].materialize" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > tools > [0] > materialize</div>
  <div class="reference-value-mapping">true</div>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 A list of permissions the user needs to possess before they are
 allowed to collect this artifact.

</div>
<li class="ref-item ref-container" id="autoexec.artifact_definitions.[0].required_permissions" data-key="autoexec.artifact_definitions.[0].required_permissions" data-depth="4">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1216">required_permissions</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].required_permissions" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > required_permissions</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="autoexec.artifact_definitions.[0].required_permissions" data-depth="4">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">EXECVE</div>
   </span>
   <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > required_permissions</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-container" id="autoexec.artifact_definitions.[0].resources" data-key="autoexec.artifact_definitions.[0].resources" data-depth="4">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1220">resources</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].resources" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > resources</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 Default timeout for this artifact

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].resources.timeout" data-key="autoexec.artifact_definitions.[0].resources.timeout" data-depth="5">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1220">timeout</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].resources.timeout" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > resources > timeout</div>
  <div class="reference-value-mapping">600</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].resources.ops_per_second" data-key="autoexec.artifact_definitions.[0].resources.ops_per_second" data-depth="5">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1221">ops_per_second</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].resources.ops_per_second" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > resources > ops_per_second</div>
  <div class="reference-value-mapping">100</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].resources.cpu_limit" data-key="autoexec.artifact_definitions.[0].resources.cpu_limit" data-depth="5">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1222">cpu_limit</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].resources.cpu_limit" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > resources > cpu_limit</div>
  <div class="reference-value-mapping">20</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].resources.iops_limit" data-key="autoexec.artifact_definitions.[0].resources.iops_limit" data-depth="5">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1223">iops_limit</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].resources.iops_limit" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > resources > iops_limit</div>
  <div class="reference-value-mapping">20</div>
</li>

<div class="item-comment">

 Default resource use for the entire collection.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].resources.max_rows" data-key="autoexec.artifact_definitions.[0].resources.max_rows" data-depth="5">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1226">max_rows</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].resources.max_rows" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > resources > max_rows</div>
  <div class="reference-value-mapping">1000000</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].resources.max_upload_bytes" data-key="autoexec.artifact_definitions.[0].resources.max_upload_bytes" data-depth="5">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1227">max_upload_bytes</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].resources.max_upload_bytes" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > resources > max_upload_bytes</div>
  <div class="reference-value-mapping">1000000</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 If the artifact specifies a precondition the client will
 evaluate this query before evaluating the main artifact. If the
 precondition returns no rows (ie. FALSE) then the artifact will
 not be collected. You can use the precondition to protect
 incompatible clients from collecting the artifact (usually the
 OS condition).

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].precondition" data-key="autoexec.artifact_definitions.[0].precondition" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1235">precondition</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].precondition" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > precondition</div>
  <div class="reference-value-mapping">SELECT OS FROM info() WHERE OS =~ &#34;windows&#34;</div>
</li>

<div class="item-comment">

 Parameters are provided to the artifact by the user. They can
 change the way the VQL is evaluated.

</div>
<li class="ref-item ref-container" id="autoexec.artifact_definitions.[0].parameters" data-key="autoexec.artifact_definitions.[0].parameters" data-depth="4">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1240">parameters</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].parameters" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > parameters</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-container" data-key="autoexec.artifact_definitions.[0].parameters.[0]" data-depth="4">
 <details>
 <summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
   <div class="reference-key">
     [0]
   </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > parameters > [0]</div>
  <div class="reference-value-sequence"><ul>

<div class="item-comment">

 The name of the parameter. This name will appear in the
 scope during query execution.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].parameters.[0].name" data-key="autoexec.artifact_definitions.[0].parameters.[0].name" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1243">name</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].parameters.[0].name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > parameters > [0] > name</div>
  <div class="reference-value-mapping">Foo</div>
</li>

<div class="item-comment">

 A human friendly name for the parameter (if not specified
 we show the name).

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].parameters.[0].friendly_name" data-key="autoexec.artifact_definitions.[0].parameters.[0].friendly_name" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1247">friendly_name</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].parameters.[0].friendly_name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > parameters > [0] > friendly_name</div>
  <div class="reference-value-mapping">A Foo Variable</div>
</li>

<div class="item-comment">

 A default value for the parameter. NOTE: Parameters are
 always strings so this field needs to be the string
 representation of the type - e.g. "10" rather than 10.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].parameters.[0].default" data-key="autoexec.artifact_definitions.[0].parameters.[0].default" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1252">default</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].parameters.[0].default" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > parameters > [0] > default</div>
  <div class="reference-value-mapping">10</div>
</li>

<div class="item-comment">

 A description of this parameter to be shown in the GUI

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].parameters.[0].description" data-key="autoexec.artifact_definitions.[0].parameters.[0].description" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1255">description</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].parameters.[0].description" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > parameters > [0] > description</div>
  <div class="reference-value-mapping">A parameter</div>
</li>

<div class="item-comment">

 The type of this parameter. Currently one of:
 string, regex, yara, upload, int, int64, integer, timestamp,
 csv, artifactset, json, json_array, bool, choices

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].parameters.[0].type" data-key="autoexec.artifact_definitions.[0].parameters.[0].type" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1260">type</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].parameters.[0].type" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > parameters > [0] > type</div>
  <div class="reference-value-mapping">int</div>
</li>

<div class="item-comment">

 For parameters of type "choices" this is a list of possible
 choices.

</div>
<li class="ref-item ref-container" id="autoexec.artifact_definitions.[0].parameters.[0].choices" data-key="autoexec.artifact_definitions.[0].parameters.[0].choices" data-depth="6">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1265">choices</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].parameters.[0].choices" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > parameters > [0] > choices</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="autoexec.artifact_definitions.[0].parameters.[0].choices" data-depth="6">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">One</div>
   </span>
   <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > parameters > [0] > choices</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="autoexec.artifact_definitions.[0].parameters.[0].choices" data-depth="6">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">Two</div>
   </span>
   <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > parameters > [0] > choices</div>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 A snippet of VQL that can be imported by other artifacts

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].export" data-key="autoexec.artifact_definitions.[0].export" data-depth="4">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1269">export</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].export" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > export</div>
  <div class="reference-value-mapping">VQL here</div>
</li>

<div class="item-comment">

 A list of artifacts that will be imported by this artifact.

</div>
<li class="ref-item ref-container" id="autoexec.artifact_definitions.[0].imports" data-key="autoexec.artifact_definitions.[0].imports" data-depth="4">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1273">imports</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].imports" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > imports</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="autoexec.artifact_definitions.[0].imports" data-depth="4">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">Artifact.Name</div>
   </span>
   <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > imports</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 A list of queries to gather data from.

</div>
<li class="ref-item ref-container" id="autoexec.artifact_definitions.[0].sources" data-key="autoexec.artifact_definitions.[0].sources" data-depth="4">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1277">sources</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].sources" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-container" data-key="autoexec.artifact_definitions.[0].sources.[0]" data-depth="4">
 <details>
 <summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
   <div class="reference-key">
     [0]
   </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0]</div>
  <div class="reference-value-sequence"><ul>

<div class="item-comment">

 An optional name for the query

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].sources.[0].name" data-key="autoexec.artifact_definitions.[0].sources.[0].name" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1279">name</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].sources.[0].name" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0] > name</div>
  <div class="reference-value-mapping">MySource</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].sources.[0].description" data-key="autoexec.artifact_definitions.[0].sources.[0].description" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1280">description</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].sources.[0].description" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0] > description</div>
  <div class="reference-value-mapping">A description for the source</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].sources.[0].query" data-key="autoexec.artifact_definitions.[0].sources.[0].query" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1281">query</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].sources.[0].query" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0] > query</div>
  <div class="reference-value-mapping">SELECT * FROM info()</div>
</li>

<div class="item-comment">

 An internal list of compiled queries. For backwards
 compatibility with very old artifacts.

</div>
<li class="ref-item ref-container" id="autoexec.artifact_definitions.[0].sources.[0].queries" data-key="autoexec.artifact_definitions.[0].sources.[0].queries" data-depth="6">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1286">queries</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].sources.[0].queries" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0] > queries</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="autoexec.artifact_definitions.[0].sources.[0].queries" data-depth="6">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">DO NOT USE</div>
   </span>
   <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0] > queries</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 A precondition applying to this source only.

</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].sources.[0].precondition" data-key="autoexec.artifact_definitions.[0].sources.[0].precondition" data-depth="6">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1289">precondition</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].sources.[0].precondition" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0] > precondition</div>
  <div class="reference-value-mapping">SELECT OS FROM info() WHERE OS =~ &#34;windows&#34;</div>
</li>

<div class="item-comment">

 An artifact source may define multiple notebook cells to be
 used when the artifact is collected or hunted for.

</div>
<li class="ref-item ref-container" id="autoexec.artifact_definitions.[0].sources.[0].notebook" data-key="autoexec.artifact_definitions.[0].sources.[0].notebook" data-depth="6">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1296">notebook</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].sources.[0].notebook" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0] > notebook</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 The type of the notebook cell: e.g. suggestion adds a cell
 to the suggestion button. Also can be vql or markdown.

</div>
<li class="ref-item ref-container" data-key="autoexec.artifact_definitions.[0].sources.[0].notebook.[0]" data-depth="6">
 <details>
 <summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
   <div class="reference-key">
     [0]
   </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0] > notebook > [0]</div>
  <div class="reference-value-sequence"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].sources.[0].notebook.[0].type" data-key="autoexec.artifact_definitions.[0].sources.[0].notebook.[0].type" data-depth="8">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1296">type</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].sources.[0].notebook.[0].type" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0] > notebook > [0] > type</div>
  <div class="reference-value-mapping">suggestion</div>
</li>

<div class="item-comment">

 Parameters to pre-populate in the cell.

</div>
<li class="ref-item ref-container" id="autoexec.artifact_definitions.[0].sources.[0].notebook.[0].env" data-key="autoexec.artifact_definitions.[0].sources.[0].notebook.[0].env" data-depth="8">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1299">env</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].sources.[0].notebook.[0].env" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0] > notebook > [0] > env</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-container" data-key="autoexec.artifact_definitions.[0].sources.[0].notebook.[0].env.[0]" data-depth="8">
 <details>
 <summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
   <div class="reference-key">
     [0]
   </div>
  </summary>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0] > notebook > [0] > env > [0]</div>
  <div class="reference-value-sequence"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].sources.[0].notebook.[0].env.[0].key" data-key="autoexec.artifact_definitions.[0].sources.[0].notebook.[0].env.[0].key" data-depth="10">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1299">key</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].sources.[0].notebook.[0].env.[0].key" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0] > notebook > [0] > env > [0] > key</div>
  <div class="reference-value-mapping">X</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].sources.[0].notebook.[0].env.[0].value" data-key="autoexec.artifact_definitions.[0].sources.[0].notebook.[0].env.[0].value" data-depth="10">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1300">value</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].sources.[0].notebook.[0].env.[0].value" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0] > notebook > [0] > env > [0] > value</div>
  <div class="reference-value-mapping">Y</div>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="autoexec.artifact_definitions.[0].sources.[0].notebook.[0].template" data-key="autoexec.artifact_definitions.[0].sources.[0].notebook.[0].template" data-depth="8">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1301">template</a> <a class="anchorlink" href="#autoexec.artifact_definitions.[0].sources.[0].notebook.[0].template" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autoexec > artifact_definitions > [0] > sources > [0] > notebook > [0] > template</div>
  <div class="reference-value-mapping">Text here</div>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="server_type" data-key="server_type" data-depth="1">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1304">server_type</a> <a class="anchorlink" href="#server_type" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">server_type</div>
  <div class="reference-value-mapping">linux</div>
</li>

<div class="item-comment">

 This is used to obfuscate artifact names when sending to the
 client. NOTE: This is currently not very robust - i.e. it does not
 hide the artifact names very well - you should not name artifacts
 in a sensitive way.

 This value is server-only and is NOT distributed to client
 configuration files. Do not confuse it with Client.nonce,
 which is a different value that IS sent to clients for org
 grouping.

</div>
<li class="ref-item ref-leaf" id="obfuscation_nonce" data-key="obfuscation_nonce" data-depth="1">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1315">obfuscation_nonce</a> <a class="anchorlink" href="#obfuscation_nonce" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">obfuscation_nonce</div>
  <div class="reference-value-mapping">zKJDb3KcWh8=</div>
</li>

<div class="item-comment">

 Path to store autocert certificates.

</div>
<li class="ref-item ref-leaf" id="autocert_cert_cache" data-key="autocert_cert_cache" data-depth="1">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1318">autocert_cert_cache</a> <a class="anchorlink" href="#autocert_cert_cache" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">autocert_cert_cache</div>
  <div class="reference-value-mapping">/tmp/</div>
</li>

<div class="item-comment">

 Various defaults used by various things.

</div>
<li class="ref-item ref-container" id="defaults" data-key="defaults" data-depth="1">
 <details open>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1326">defaults</a> <a class="anchorlink" href="#defaults" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">defaults</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 Normally notebook queries timeout in 10 minutes (can not be
 changed from within the notebook). This is done to reduce load on
 the server. If you want to increase notebook timeout you can
 change this.

</div>
<li class="ref-item ref-leaf" id="defaults.notebook_cell_timeout_min" data-key="defaults.notebook_cell_timeout_min" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1326">notebook_cell_timeout_min</a> <a class="anchorlink" href="#defaults.notebook_cell_timeout_min" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > notebook_cell_timeout_min</div>
  <div class="reference-value-mapping">10</div>
</li>

<div class="item-comment">

 By default new cells only list 50 rows if there is no custom
 cell template. This is to make refreshing the cell
 quick. Usually users need to edit or the limit clause to see
 the full result table in the cell. This setting increases the
 default 50 rows.

</div>
<li class="ref-item ref-leaf" id="defaults.notebook_default_new_cell_rows" data-key="defaults.notebook_default_new_cell_rows" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1333">notebook_default_new_cell_rows</a> <a class="anchorlink" href="#defaults.notebook_default_new_cell_rows" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > notebook_default_new_cell_rows</div>
  <div class="reference-value-mapping">50</div>
</li>

<div class="item-comment">

 When running on a shared server notebook calculations can
 increases memory use and affect other users. The following
 settings control notebook calculations to ensure they do not use
 too much memory. You should set the following in accordance with
 the VM settings of the server with a small margin of safety.
 When calculating a new cell we do not start calculation until the
 process memory is smaller than the low memory mark.

</div>
<li class="ref-item ref-leaf" id="defaults.notebook_memory_low_water_mark" data-key="defaults.notebook_memory_low_water_mark" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1343">notebook_memory_low_water_mark</a> <a class="anchorlink" href="#defaults.notebook_memory_low_water_mark" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > notebook_memory_low_water_mark</div>
  <div class="reference-value-mapping">0</div>
</li>

<div class="item-comment">

 When the process memory exceeds the high water mark, we actively
 cancel in flight notebook cell calculations to bring memory use
 down.

</div>
<li class="ref-item ref-leaf" id="defaults.notebook_memory_high_water_mark" data-key="defaults.notebook_memory_high_water_mark" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1348">notebook_memory_high_water_mark</a> <a class="anchorlink" href="#defaults.notebook_memory_high_water_mark" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > notebook_memory_high_water_mark</div>
  <div class="reference-value-mapping">0</div>
</li>

<div class="item-comment">

 Since Version 0.7.1, notebook queries are run in separate worker
 threads, even on single server configurations. This parameters
 sets the number of workers available.

 Set to -1 to disable local workers. The default is 5 local
 workers. If you want the master to **not** perform any notebook
 computations reduce this to -1 and set
 Minion.notebook_number_of_local_workers to 5.

</div>
<li class="ref-item ref-leaf" id="defaults.notebook_number_of_local_workers" data-key="defaults.notebook_number_of_local_workers" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1358">notebook_number_of_local_workers</a> <a class="anchorlink" href="#defaults.notebook_number_of_local_workers" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > notebook_number_of_local_workers</div>
  <div class="reference-value-mapping">5</div>
</li>

<div class="item-comment">

 Wait this long for a worker to become available before giving
 up. The default is 10 seconds.

</div>
<li class="ref-item ref-leaf" id="defaults.notebook_wait_time_for_worker_ms" data-key="defaults.notebook_wait_time_for_worker_ms" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1362">notebook_wait_time_for_worker_ms</a> <a class="anchorlink" href="#defaults.notebook_wait_time_for_worker_ms" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > notebook_wait_time_for_worker_ms</div>
  <div class="reference-value-mapping">10000</div>
</li>

<div class="item-comment">

 The default priority of notebook processors (Higher priority will
 receive jobs over lower priority).

</div>
<li class="ref-item ref-leaf" id="defaults.notebook_worker_priority" data-key="defaults.notebook_worker_priority" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1366">notebook_worker_priority</a> <a class="anchorlink" href="#defaults.notebook_worker_priority" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > notebook_worker_priority</div>
  <div class="reference-value-mapping">10</div>
</li>

<div class="item-comment">

 When exporting to CSV from the GUI the usual separator is comma
 (`,`). This setting allows to change the default to any single
 character.

</div>
<li class="ref-item ref-leaf" id="defaults.csv_delimiter" data-key="defaults.csv_delimiter" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1371">csv_delimiter</a> <a class="anchorlink" href="#defaults.csv_delimiter" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > csv_delimiter</div>
  <div class="reference-value-mapping">,</div>
</li>

<div class="item-comment">

 By default hunts expire in 7 days but you can change this using
 this setting.

</div>
<li class="ref-item ref-leaf" id="defaults.hunt_expiry_hours" data-key="defaults.hunt_expiry_hours" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1375">hunt_expiry_hours</a> <a class="anchorlink" href="#defaults.hunt_expiry_hours" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > hunt_expiry_hours</div>
  <div class="reference-value-mapping">168</div>
</li>

<div class="item-comment">

 Default value of max_wait and relevant jitter for new event
 queries the GUI creates.

</div>
<li class="ref-item ref-leaf" id="defaults.event_max_wait" data-key="defaults.event_max_wait" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1379">event_max_wait</a> <a class="anchorlink" href="#defaults.event_max_wait" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > event_max_wait</div>
  <div class="reference-value-mapping">100</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="defaults.event_max_wait_jitter" data-key="defaults.event_max_wait_jitter" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1380">event_max_wait_jitter</a> <a class="anchorlink" href="#defaults.event_max_wait_jitter" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > event_max_wait_jitter</div>
  <div class="reference-value-mapping">30</div>
</li>

<div class="item-comment">

 If set we actively notify all clients as soon as event table is
 changed. This causes a lot of load on large deployments so it is
 off by default. It means that you will need to wait for the client
 to reconnect before it receives updates to its event table
 (usually about 5 min). When running `velociraptor gui` we set this
 to true in order to get a responsive GUI.

</div>
<li class="ref-item ref-leaf" id="defaults.event_change_notify_all_clients" data-key="defaults.event_change_notify_all_clients" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1388">event_change_notify_all_clients</a> <a class="anchorlink" href="#defaults.event_change_notify_all_clients" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > event_change_notify_all_clients</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 Additional directories to load artifacts from on start up.

</div>
<li class="ref-item ref-container" id="defaults.artifact_definitions_directories" data-key="defaults.artifact_definitions_directories" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1392">artifact_definitions_directories</a> <a class="anchorlink" href="#defaults.artifact_definitions_directories" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">defaults > artifact_definitions_directories</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="defaults.artifact_definitions_directories" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">/etc/artifacts/</div>
   </span>
   <div class="item-breadcrumb">defaults > artifact_definitions_directories</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 The number of rows to keep in memory during a group by
 operation. Once this is exceeded we switch to disk mode which
 is a lot slower but has no memory limitations. Default 30000

</div>
<li class="ref-item ref-leaf" id="defaults.max_in_memory_group_by" data-key="defaults.max_in_memory_group_by" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1397">max_in_memory_group_by</a> <a class="anchorlink" href="#defaults.max_in_memory_group_by" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > max_in_memory_group_by</div>
  <div class="reference-value-mapping">30000</div>
</li>

<div class="item-comment">

 How long to cache ACL policies (default 60 sec)

</div>
<li class="ref-item ref-leaf" id="defaults.acl_lru_timeout_sec" data-key="defaults.acl_lru_timeout_sec" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1400">acl_lru_timeout_sec</a> <a class="anchorlink" href="#defaults.acl_lru_timeout_sec" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > acl_lru_timeout_sec</div>
  <div class="reference-value-mapping">60</div>
</li>

<div class="item-comment">

 Ignore messages from unauthenticated clients for this long - gives
 them a chance to enrol first (default 10 sec).

</div>
<li class="ref-item ref-leaf" id="defaults.unauthenticated_lru_timeout_sec" data-key="defaults.unauthenticated_lru_timeout_sec" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1404">unauthenticated_lru_timeout_sec</a> <a class="anchorlink" href="#defaults.unauthenticated_lru_timeout_sec" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > unauthenticated_lru_timeout_sec</div>
  <div class="reference-value-mapping">10</div>
</li>

<div class="item-comment">

 Controls how exports work (creating hunt or collection exports to a
 zip file). On slow filesystems, increase the number of worker
 threads to increase parallelism. You can also increase the timeout
 if the filesystem is too slow to build large hunt zip files within
 the default 10 minute timeout.

</div>
<li class="ref-item ref-leaf" id="defaults.export_concurrency" data-key="defaults.export_concurrency" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1411">export_concurrency</a> <a class="anchorlink" href="#defaults.export_concurrency" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > export_concurrency</div>
  <div class="reference-value-mapping">10</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="defaults.export_max_timeout_sec" data-key="defaults.export_max_timeout_sec" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1412">export_max_timeout_sec</a> <a class="anchorlink" href="#defaults.export_max_timeout_sec" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > export_max_timeout_sec</div>
  <div class="reference-value-mapping">600</div>
</li>

<div class="item-comment">

 The server maintains an index of all hunts in order to quickly
 allow the GUI to filter/sort them. This setting controls how often
 to rebuild the hunt index (default 600 sec). You probably don't
 need to change it.

</div>
<li class="ref-item ref-leaf" id="defaults.hunt_dispatcher_refresh_sec" data-key="defaults.hunt_dispatcher_refresh_sec" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1418">hunt_dispatcher_refresh_sec</a> <a class="anchorlink" href="#defaults.hunt_dispatcher_refresh_sec" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > hunt_dispatcher_refresh_sec</div>
  <div class="reference-value-mapping">600</div>
</li>

<div class="item-comment">

 The hunt dispatcher index rebuild is rate limited to reduce load
 on the server. This sets how fast it should go (in flows per
 second). You probably do not want to change this.

</div>
<li class="ref-item ref-leaf" id="defaults.hunt_dispatcher_refresh_rate" data-key="defaults.hunt_dispatcher_refresh_rate" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1423">hunt_dispatcher_refresh_rate</a> <a class="anchorlink" href="#defaults.hunt_dispatcher_refresh_rate" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > hunt_dispatcher_refresh_rate</div>
  <div class="reference-value-mapping">10</div>
</li>

<div class="item-comment">

 Total number of cell versions we keep for undo/redo support.

</div>
<li class="ref-item ref-leaf" id="defaults.notebook_versions" data-key="defaults.notebook_versions" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1426">notebook_versions</a> <a class="anchorlink" href="#defaults.notebook_versions" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > notebook_versions</div>
  <div class="reference-value-mapping">5</div>
</li>

<div class="item-comment">

 Watch plugin frequency sleep time in seconds: How often
 watch_syslog() will check for changes (default 3).

</div>
<li class="ref-item ref-leaf" id="defaults.watch_plugin_frequency" data-key="defaults.watch_plugin_frequency" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1430">watch_plugin_frequency</a> <a class="anchorlink" href="#defaults.watch_plugin_frequency" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > watch_plugin_frequency</div>
  <div class="reference-value-mapping">3</div>
</li>

<div class="item-comment">

 Maximum length of the line that will be parsed (16kb)

</div>
<li class="ref-item ref-leaf" id="defaults.watch_plugin_buffer_size" data-key="defaults.watch_plugin_buffer_size" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1433">watch_plugin_buffer_size</a> <a class="anchorlink" href="#defaults.watch_plugin_buffer_size" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > watch_plugin_buffer_size</div>
  <div class="reference-value-mapping">16384</div>
</li>

<div class="item-comment">

 Period in seconds when to produce a backup. Velociraptor will
 generate a backup of important metadata about the server. By
 default this happens daily but you can change it here (set to -1)
 to disable backups.

</div>
<li class="ref-item ref-leaf" id="defaults.backup_period_seconds" data-key="defaults.backup_period_seconds" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1439">backup_period_seconds</a> <a class="anchorlink" href="#defaults.backup_period_seconds" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > backup_period_seconds</div>
  <div class="reference-value-mapping">86400</div>
</li>

<div class="item-comment">

 The server's client info manager runs housekeeping tasks
 periodically to determine if clients need to be notified. This
 setting controls how often to run the client info's house keeping
 thread in seconds (default 60 sec)

</div>
<li class="ref-item ref-leaf" id="defaults.client_info_housekeeping_period" data-key="defaults.client_info_housekeeping_period" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1445">client_info_housekeeping_period</a> <a class="anchorlink" href="#defaults.client_info_housekeeping_period" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > client_info_housekeeping_period</div>
  <div class="reference-value-mapping">60</div>
</li>

<div class="item-comment">

 Disable unicode usernames. By default Velociraptor allows
 usernames to consist of any Unicode character for i8n support,
 however this opens the possibility for Homoglyph attacks. Setting
 the following to true will restrict usernames to the set a-z and
 0-9

</div>
<li class="ref-item ref-leaf" id="defaults.disable_unicode_usernames" data-key="defaults.disable_unicode_usernames" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1452">disable_unicode_usernames</a> <a class="anchorlink" href="#defaults.disable_unicode_usernames" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > disable_unicode_usernames</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 How often to refresh the search index (default 5 min). This
 rebuilds the search index periodically to avoid inconsistencies.

</div>
<li class="ref-item ref-leaf" id="defaults.reindex_period_seconds" data-key="defaults.reindex_period_seconds" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1456">reindex_period_seconds</a> <a class="anchorlink" href="#defaults.reindex_period_seconds" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > reindex_period_seconds</div>
  <div class="reference-value-mapping">300</div>
</li>

<div class="item-comment">

 The client metadata is an arbitrary key/value store that holds
 user defined information per client. You can normally store
 anything in the client metadata but this information is not
 indexed, making searching on it slow (using VQL each client's
 metadata blob needs to be opened, read and matched).
 This setting allows you to define **some** fields in the client
 metadata that will be indexed. These fields should not be too
 large so as to keep the index size smallish so it is recommended
 to use only small strings. Once fields are defined here, the extra
 data can be searched in the GUI search bar using a verb such as
 <field_name>:match.
 For example, define here:
 indexed_client_metadata:
  - department

 Then a search for `department:accounting` will match all clients
 with the key department and value contains accounting in their
 client metadata.

</div>
<li class="ref-item ref-container" id="defaults.indexed_client_metadata" data-key="defaults.indexed_client_metadata" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1479">indexed_client_metadata</a> <a class="anchorlink" href="#defaults.indexed_client_metadata" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">defaults > indexed_client_metadata</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="defaults.indexed_client_metadata" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">department</div>
   </span>
   <div class="item-breadcrumb">defaults > indexed_client_metadata</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 If this is set we do not actively check the status of in-flight
 collections. This is a new feature to 0.73 and may need to be
 disabled in some large deployments due to additional overheads.

</div>
<li class="ref-item ref-leaf" id="defaults.disable_active_inflight_checks" data-key="defaults.disable_active_inflight_checks" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1484">disable_active_inflight_checks</a> <a class="anchorlink" href="#defaults.disable_active_inflight_checks" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > disable_active_inflight_checks</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 Normally internal event artifacts are not written to disk but
 passed internally. For debugging it is useful to have a written
 record though. Enabling this will also write them to
 disk. Probably only useful for debugging.

</div>
<li class="ref-item ref-leaf" id="defaults.write_internal_events" data-key="defaults.write_internal_events" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1490">write_internal_events</a> <a class="anchorlink" href="#defaults.write_internal_events" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > write_internal_events</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 Defaults for client communication limits. Decrease those if
 your clients are behind a proxy that only accepts very small
 POST messages. If not set we use client defaults.

</div>
<li class="ref-item ref-leaf" id="defaults.max_rows" data-key="defaults.max_rows" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1495">max_rows</a> <a class="anchorlink" href="#defaults.max_rows" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > max_rows</div>
  <div class="reference-value-mapping">0</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="defaults.max_row_buffer_size" data-key="defaults.max_row_buffer_size" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1496">max_row_buffer_size</a> <a class="anchorlink" href="#defaults.max_row_buffer_size" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > max_row_buffer_size</div>
  <div class="reference-value-mapping">0</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" id="defaults.max_batch_wait" data-key="defaults.max_batch_wait" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1497">max_batch_wait</a> <a class="anchorlink" href="#defaults.max_batch_wait" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > max_batch_wait</div>
  <div class="reference-value-mapping">0</div>
</li>

<div class="item-comment">

 Maximum default value for log messages sent by the client for each
 flow. Once this is reached, the client stops sending log messages
 in the current collection.

</div>
<li class="ref-item ref-leaf" id="defaults.max_logs" data-key="defaults.max_logs" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1502">max_logs</a> <a class="anchorlink" href="#defaults.max_logs" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">defaults > max_logs</div>
  <div class="reference-value-mapping">100000</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 The Velociraptor server may be placed into "lockdown" mode. While in
 lockdown mode certain permissions are denied - even for
 administrators. This additional protection mode helps to mitigate
 the case when a Velociraptor administrator's account is
 compromised. The server can be taken out of lockdown mode by setting
 lockdown to false and restarting the server.

</div>
<li class="ref-item ref-leaf" id="lockdown" data-key="lockdown" data-depth="1">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1511">lockdown</a> <a class="anchorlink" href="#lockdown" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">lockdown</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 This will be set when Velociraptor is started with the --debug flag.

</div>
<li class="ref-item ref-leaf" id="debug_mode" data-key="debug_mode" data-depth="1">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1514">debug_mode</a> <a class="anchorlink" href="#debug_mode" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">debug_mode</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 This configuration applies for minions. On minions this will
 override the settings elsewhere in the config file allowing an easy
 way to manage the difference between minions and master nodes.
 This override occurs at config load times so you can see the final configuration using
 velociraptor --minion --config server.config.yaml config show

</div>
<li class="ref-item ref-container" id="Minion" data-key="Minion" data-depth="1">
 <details open>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1523">Minion</a> <a class="anchorlink" href="#Minion" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">Minion</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 Used to override Defaults.notebook_number_of_local_workers

</div>
<li class="ref-item ref-leaf" id="Minion.notebook_number_of_local_workers" data-key="Minion.notebook_number_of_local_workers" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1523">notebook_number_of_local_workers</a> <a class="anchorlink" href="#Minion.notebook_number_of_local_workers" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Minion > notebook_number_of_local_workers</div>
  <div class="reference-value-mapping">4</div>
</li>

<div class="item-comment">

 Used to override Defaults.notebook_worker_priority. By default
 minion workers have higher priority than the master node allowing
 minions to take over notebook calculations most of he time.

</div>
<li class="ref-item ref-leaf" id="Minion.notebook_worker_priority" data-key="Minion.notebook_worker_priority" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1528">notebook_worker_priority</a> <a class="anchorlink" href="#Minion.notebook_worker_priority" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">Minion > notebook_worker_priority</div>
  <div class="reference-value-mapping">10</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-container" id="security" data-key="security" data-depth="1">
 <details open>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1538">security</a> <a class="anchorlink" href="#security" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">security</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">

 A list of path prefixes allowed for the 'file' accessor. If
 this is empty the file accessor will work on all
 directories. If you want to disable access to the server's
 filesystem you can set this to a non existent directory,
 e.g. /nonexistent/ . The below shows the default list, which is used
 if nothing is set here. You should copy and modify the entire list
 to preserve the defaults.

</div>
<li class="ref-item ref-container" id="security.allowed_file_accessor_prefix" data-key="security.allowed_file_accessor_prefix" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1539">allowed_file_accessor_prefix</a> <a class="anchorlink" href="#security.allowed_file_accessor_prefix" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">security > allowed_file_accessor_prefix</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.allowed_file_accessor_prefix" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">/tmp/</div>
   </span>
   <div class="item-breadcrumb">security > allowed_file_accessor_prefix</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Deny takes precedent over allow. The below shows the default list,
 which is used if nothing is set here. You should copy and modify
 the entire list to preserve the defaults.

</div>
<li class="ref-item ref-container" id="security.denied_file_accessor_prefix" data-key="security.denied_file_accessor_prefix" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1545">denied_file_accessor_prefix</a> <a class="anchorlink" href="#security.denied_file_accessor_prefix" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">security > denied_file_accessor_prefix</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.denied_file_accessor_prefix" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">/bin/</div>
   </span>
   <div class="item-breadcrumb">security > denied_file_accessor_prefix</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 A list of prefixes allowed for the fs accessor. All other prefixes
 will be rejected. The below shows the default list, which is used
 if nothing is set here. You should copy and modify the entire list
 to preserve the defaults.

</div>
<li class="ref-item ref-container" id="security.allowed_fs_accessor_prefix" data-key="security.allowed_fs_accessor_prefix" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1552">allowed_fs_accessor_prefix</a> <a class="anchorlink" href="#security.allowed_fs_accessor_prefix" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">security > allowed_fs_accessor_prefix</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.allowed_fs_accessor_prefix" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">artifact_definitions</div>
   </span>
   <div class="item-breadcrumb">security > allowed_fs_accessor_prefix</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.allowed_fs_accessor_prefix" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">clients</div>
   </span>
   <div class="item-breadcrumb">security > allowed_fs_accessor_prefix</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.allowed_fs_accessor_prefix" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">downloads</div>
   </span>
   <div class="item-breadcrumb">security > allowed_fs_accessor_prefix</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.allowed_fs_accessor_prefix" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">notebooks</div>
   </span>
   <div class="item-breadcrumb">security > allowed_fs_accessor_prefix</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.allowed_fs_accessor_prefix" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">public</div>
   </span>
   <div class="item-breadcrumb">security > allowed_fs_accessor_prefix</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.allowed_fs_accessor_prefix" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">temp</div>
   </span>
   <div class="item-breadcrumb">security > allowed_fs_accessor_prefix</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.allowed_fs_accessor_prefix" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">server_artifacts</div>
   </span>
   <div class="item-breadcrumb">security > allowed_fs_accessor_prefix</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.allowed_fs_accessor_prefix" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">server_artifacts_logs</div>
   </span>
   <div class="item-breadcrumb">security > allowed_fs_accessor_prefix</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Deny takes precedent over allow. IMPORTANT: Setting this list replaces
 the built-in deny list (acl, backups, config, orgs, secrets, users)
 rather than merging with it. If you add custom prefixes here, you must
 also include any of the built-in prefixes you want to keep.

</div>
<li class="ref-item ref-container" id="security.denied_fs_accessor_prefix" data-key="security.denied_fs_accessor_prefix" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1566">denied_fs_accessor_prefix</a> <a class="anchorlink" href="#security.denied_fs_accessor_prefix" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">security > denied_fs_accessor_prefix</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.denied_fs_accessor_prefix" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">config</div>
   </span>
   <div class="item-breadcrumb">security > denied_fs_accessor_prefix</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 If these are set we enforce VQL to only have the specified allowed
 VQL plugins and functions. This is a way to harden the server by
 removing potentially sensitive functionality to allow only
 approved VQL plugins to run. The below shows some examples but the
 default is actually an empty list which causes no plugins to be
 restricted.

</div>
<li class="ref-item ref-container" id="security.allowed_plugins" data-key="security.allowed_plugins" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1575">allowed_plugins</a> <a class="anchorlink" href="#security.allowed_plugins" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">security > allowed_plugins</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.allowed_plugins" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">glob</div>
   </span>
   <div class="item-breadcrumb">security > allowed_plugins</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-container" id="security.allowed_functions" data-key="security.allowed_functions" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1577">allowed_functions</a> <a class="anchorlink" href="#security.allowed_functions" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">security > allowed_functions</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.allowed_functions" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">dict</div>
   </span>
   <div class="item-breadcrumb">security > allowed_functions</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-container" id="security.allowed_accessors" data-key="security.allowed_accessors" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1579">allowed_accessors</a> <a class="anchorlink" href="#security.allowed_accessors" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">security > allowed_accessors</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.allowed_accessors" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">auto</div>
   </span>
   <div class="item-breadcrumb">security > allowed_accessors</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Alternatively, it might be easier to deny specific plugins and
 functions and accessors. The below shows some examples but the
 default is actually an empty list which causes no plugins to be
 denied.

</div>
<li class="ref-item ref-container" id="security.denied_plugins" data-key="security.denied_plugins" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1586">denied_plugins</a> <a class="anchorlink" href="#security.denied_plugins" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">security > denied_plugins</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.denied_plugins" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">execve</div>
   </span>
   <div class="item-breadcrumb">security > denied_plugins</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-container" id="security.denied_functions" data-key="security.denied_functions" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1589">denied_functions</a> <a class="anchorlink" href="#security.denied_functions" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">security > denied_functions</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.denied_functions" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">rm</div>
   </span>
   <div class="item-breadcrumb">security > denied_functions</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-container" id="security.denied_accessors" data-key="security.denied_accessors" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1592">denied_accessors</a> <a class="anchorlink" href="#security.denied_accessors" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">security > denied_accessors</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.denied_accessors" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">s3</div>
   </span>
   <div class="item-breadcrumb">security > denied_accessors</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 When the server is in lockdown mode the following permissions will
 be denied (Even for administrators). The below shows the default
 list, which is used if nothing is set here. You should copy and
 modify the entire list to preserve the defaults.

</div>
<li class="ref-item ref-container" id="security.lockdown_denied_permissions" data-key="security.lockdown_denied_permissions" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1599">lockdown_denied_permissions</a> <a class="anchorlink" href="#security.lockdown_denied_permissions" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">security > lockdown_denied_permissions</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.lockdown_denied_permissions" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">ARTIFACT_WRITER</div>
   </span>
   <div class="item-breadcrumb">security > lockdown_denied_permissions</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.lockdown_denied_permissions" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">SERVER_ARTIFACT_WRITER</div>
   </span>
   <div class="item-breadcrumb">security > lockdown_denied_permissions</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.lockdown_denied_permissions" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">EXECVE</div>
   </span>
   <div class="item-breadcrumb">security > lockdown_denied_permissions</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.lockdown_denied_permissions" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">SERVER_ADMIN</div>
   </span>
   <div class="item-breadcrumb">security > lockdown_denied_permissions</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.lockdown_denied_permissions" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">FILESYSTEM_WRITE</div>
   </span>
   <div class="item-breadcrumb">security > lockdown_denied_permissions</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.lockdown_denied_permissions" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">FILESYSTEM_READ</div>
   </span>
   <div class="item-breadcrumb">security > lockdown_denied_permissions</div>
</li>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.lockdown_denied_permissions" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">MACHINE_STATE</div>
   </span>
   <div class="item-breadcrumb">security > lockdown_denied_permissions</div>
</li>
</ul>
</div>
 </details>
</li>

<div class="item-comment">

 Default expiry of certificate issuance (default 365 days). This
 will apply for e.g. rotating certificates or issuing an api cert.

</div>
<li class="ref-item ref-leaf" id="security.certificate_validity_days" data-key="security.certificate_validity_days" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1609">certificate_validity_days</a> <a class="anchorlink" href="#security.certificate_validity_days" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">security > certificate_validity_days</div>
  <div class="reference-value-mapping">365</div>
</li>

<div class="item-comment">

 Normally the inventory service attempts to download tools in
 its own but if this is set, we prevent any external access.

</div>
<li class="ref-item ref-leaf" id="security.disable_inventory_service_external_access" data-key="security.disable_inventory_service_external_access" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1613">disable_inventory_service_external_access</a> <a class="anchorlink" href="#security.disable_inventory_service_external_access" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">security > disable_inventory_service_external_access</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 The Data Encryptions Key to use for protecting the secrets in
 storage. This can take a number of forms:

 1. If it starts with `env://<VAR>` the secret will be taken from an
    Environment variable.
 2. If empty the secret is taken from obfuscation_nonce (which
    by default is the hash of the private key).

 In future further methods may be implemented (e.g. EKMS).

 See the following for more information
 http://docs.velociraptor.app/docs/deployment/security/#protecting-stored-secrets

</div>
<li class="ref-item ref-leaf" id="security.secrets_dek" data-key="security.secrets_dek" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1627">secrets_dek</a> <a class="anchorlink" href="#security.secrets_dek" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">security > secrets_dek</div>
  <div class="reference-value-mapping"></div>
</li>

<div class="item-comment">

 This controls VQL plugins that may accept secrets as well full
 parameters. If this flag is set, those plugins will refuse to
 accept direct parameters, instead only accepting a secret
 name. This allows the admin to control exactly how these
 plugins work without disabling them completely.

</div>
<li class="ref-item ref-leaf" id="security.vql_must_use_secrets" data-key="security.vql_must_use_secrets" data-depth="2">
 <span class="item-name"><i class="bullet-placeholder"></i>
   <div class="reference-key">
     <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1634">vql_must_use_secrets</a> <a class="anchorlink" href="#security.vql_must_use_secrets" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
   </div>
  </span>
  <div class="item-breadcrumb">security > vql_must_use_secrets</div>
  <div class="reference-value-mapping">false</div>
</li>

<div class="item-comment">

 Prevent VQL from having access to these environment
 variables. Environment Vars sometimes may contain secrets and
 confidential information.

</div>
<li class="ref-item ref-container" id="security.shadowed_env_vars" data-key="security.shadowed_env_vars" data-depth="2">
 <details>
<summary class="ref-summary"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="1em" height="1em" fill="currentColor" class="category-icon" aria-hidden="true"><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
    <div class="reference-key">
      <a target="_blank" href="https://github.com/Velocidex/velociraptor/blob/master/docs/references/server.config.yaml#L1640">shadowed_env_vars</a> <a class="anchorlink" href="#security.shadowed_env_vars" title="Copy link to this item" aria-label="Copy link to this item"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></a>
    </div>
  </summary>
  <div class="item-breadcrumb">security > shadowed_env_vars</div>
  <div class="reference-value-mapping"><ul>

<div class="item-comment">



</div>
<li class="ref-item ref-leaf" data-key="security.shadowed_env_vars" data-depth="2">
   <span class="item-name"><i class="bullet-placeholder"></i>
     <div class="reference-value-sequence">VELOCIRAPTOR_CONFIG</div>
   </span>
   <div class="item-breadcrumb">security > shadowed_env_vars</div>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
 </details>
</li>
</ul>
</div>
