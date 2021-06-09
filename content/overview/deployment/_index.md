---
title: "Deployment"
date: 2021-06-09T03:52:24Z
draft: false
weight: 2
---

## Deployment overview

Persistent communications C&C
Velociraptor Server
Web based admin console
Assets
Admin

![Deployment Overview](overview.png?width=80pc&classes=shadow)


## Typical deployments

Velociraptor is very efficient and scalable:
Server simply collects the results of queries - clients do all the heavy lifting.
Client memory and CPU usage is controlled via throttling and active cancellations.
Server is optimized for speed and scalability
Concurrency control ensures stability
Bandwidth limits ensure network stability

## Typical deployments

Current recommendations
10k-15k clients - single server with file based data store (usually cloud VM).
SSL load is the biggest load - TLS offloading helps a lot!
8 GB RAM/8 cores is generous towards the top of the range.
We recommend Ubuntu/Debian server

## Multi-Frontend configuration
Available since 0.5.9 - suitable for > 10k endpoints
Still considered experimental - help us test it!
Master/Minion model
Outside the scope of this course but you can find more information in our blog post


### Deploying Velociraptor


Run Velociraptor on your machine
Download Velociraptor from GitHub (.msi or .exe)

```sh
"C:\program files\Velociraptor\Velociraptor.exe" gui
```

#### Self Signed SSL mode

Frontend served using TLS on port 8000 (connected to clients)
GUI uses basic authentication with usernames/passwords.
GUI Served over loopback port 8889 (127.0.0.1)
By default not exposed to the network
You can use SSH tunneling to forward the GUI

#### Installing a new server

Use the password provided in the Workshop setup to log into the server.
Fetch the latest Velociraptor Windows and Linux release binaries
Create a new configuration

```sh
velociraptor config generate -i
```

Create a new server debian package

```sh
velociraptor.exe --config server.config.yaml debian server  --binary velociraptor-v0.5.5-windows.exe
```


#### Installing a new server

Push the debian package to the server using scp

```sh
scp velociraptor_server*.deb mike@123.45.67.89:/tmp/
```

Install package
```sh
sudo dpkg -i velociraptor_server*.deb
```

### Automating config generation

Some people want to automate the config generation step.
Velociraptor supports a JSON merge for non interactive configuration generation

```sh
velociraptor config generate --merge
    '{"autocert_domain": "domain.com", "autocert_cert_cache": "/foo/bar"}'
```

The service adds a new velociraptor user to run under.
You can now access the Velociraptor server using your browser.

The first time you navigate to the SSL URL the server will obtain a
certificate from Let's Encrypt. There will be a small pause as this
happens.

You will be redirected to Google for authentication - Velociraptor
does not handle any credentials in this configuration. Google will
determine if the user authenticated properly (2 FA etc) and convey
simple info like the user’s email address and avatar.
