---
menutitle: "config"
title: 'The "config" command group'
date: 2025-05-20
draft: false
weight: 40
summary: "Commands for working with the config"
---

View and manipulate the configuration.

Generally you'll want to use the `--config` (or `-c`) flag with these commands,
so that you know it's working with the correct config.

If the binary you're using has an embedded config then that will be the one
loaded unless you use the `--config` flag.

---

### [ config show ]

```text
config show [<flags>]
    Show the current config.

    --[no-]json              Show the config as JSON
    --merge=MERGE ...        Merge this json config into the generated config (see https://datatracker.ietf.org/doc/html/rfc7396)
    --merge_file=MERGE_FILE  Merge this file containing a json config into the generated config (see https://datatracker.ietf.org/doc/html/rfc7396)
    --patch=PATCH ...        Patch this into the generated config (see http://jsonpatch.com/)
    --patch_file=PATCH_FILE  Patch this file into the generated config (see http://jsonpatch.com/)
```

---

### [ config client ]

```text
config client
    Dump the client's config file.
```

---

### [ config api_client ]

```text
config api_client --name=NAME [<flags>] <output>
    Dump an api_client config file.

    --name=NAME      The common name of the API Client.
    --role=ROLE      Specify the role for this api_client.
    --[no-]password  Protect the certificate with a password.
    --pkcs12=PKCS12  A filename to write the pkcs12 certificate file

Args:
  <output>  The filename to write the config file on.
```

---

### [ config generate ]

```text
config generate [<flags>]
    Generate a new config file to stdout (with new keys).

    -i, --[no-]interactive       Interactively fill in configuration.
        --merge=MERGE ...        Merge this json config into the generated config (see https://datatracker.ietf.org/doc/html/rfc7396)
        --merge_file=MERGE_FILE  Merge this file containing a json config into the generated config (see https://datatracker.ietf.org/doc/html/rfc7396)
        --patch=PATCH ...        Patch this into the generated config (see http://jsonpatch.com/)
        --patch_file=PATCH_FILE  Patch this file into the generated config (see http://jsonpatch.com/)
```

---

### [ config rotate_keys ]

```text
config rotate_keys [<flags>]
    Regenerate server private keys and reissue certificates.

    --validity=VALIDITY  How long should the new certs be valid for in days (default 365).
```

---

### [ config reissue_certs ]

```text
config reissue_certs [<flags>]
    Reissue server certificates for the existing private keys.

    --validity=VALIDITY  How long should the new certs be valid for in days (default 365).
```

---

### [ config frontend ]

```text
config frontend
    Experimental: Create multi-frontend configuration
```

---

### [ config repack ]

```text
config repack [<flags>] <config_file> <output>
    Embed a configuration file inside the binary.

    --exe=EXE                Use an alternative exe.
    --msi=MSI                Use an msi to repack (synonym to --exe).
    --binaries=BINARIES ...  The list of tool names to append to the binary.

Args:
  <config_file>  The filename to write into the binary.
  <output>       The filename to write the repacked binary.
```

