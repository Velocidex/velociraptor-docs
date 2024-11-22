---
title: How do I set a proxy for client communications?
---

Many enterprise environments require a proxy to be set before outbound
web communications is allowed. The Velociraptor client uses HTTP to
communicate with the server, and therefore must use a proxy to
connect in such environments.

It is possible to specify the HTTP proxy using the configuration file
or environment variables.

### Environment variables.

Environment variables may be configured using group policy or similar
methods. Setting the `http_proxy` and `https_proxy` environment
variables will force the client to go through the specified proxy.

The rules for environment variables are described
[here](https://go.dev/src/net/http/transport.go#422):

```go
// ProxyFromEnvironment returns the URL of the proxy to use for a
// given request, as indicated by the environment variables
// HTTP_PROXY, HTTPS_PROXY and NO_PROXY (or the lowercase versions
// thereof). HTTPS_PROXY takes precedence over HTTP_PROXY for https
// requests.
//
// The environment values may be either a complete URL or a
// "host[:port]", in which case the "http" scheme is assumed.
// The schemes "http", "https", and "socks5" are supported.
// An error is returned if the value is a different form.
```

### Setting a proxy in the configuration file

You can also hard code the proxy in the configuration file's Client
section:

```yaml
Client:
  proxy: http://proxy.example.com:3128/
  server_urls:
  - https://velo.example.com:8100/
```


Tags: #configuration #deployment
