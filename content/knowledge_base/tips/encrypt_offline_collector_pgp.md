# Encrypt and decrypt an offline collector using PGP public and private keys

Velociraptor supports three modes for encrypting Offline Collectors: Password, X.509 Secured, and PGP-secured (as [described here](https://docs.velociraptor.app/docs/deployment/offline_collections/#collection-security)).
While X.509 is the standard for automatic server imports, using PGP is a great alternative when you need to decrypt collections independently of the Velociraptor Server.



**The PGP Encryption Workflow:**
When using PGP, Velociraptor follows a "hybrid" encryption approach:

1. **Generation**: Velociraptor generates a high-entropy random password.
2. **Encryption**: The collected data is encrypted with this password.
3. **Envelope**: The password itself is encrypted using your PGP Public Key and stored in the metadata.
4. **Decryption**: To access the data, you must first decrypt the password using your **PGP Private Key**, then decompress the protected zip using the password.


### Step 1: Generate a PGP key-pair

First, generate an RSA key-pair. We will use a batch file for automation, but you can also do this interactively.

```sh
gpg --batch --generate-key <<EOF
    Key-Type: RSA
    Key-Length: 3072
    Subkey-Type: RSA
    Subkey-Length: 3072
    Name-Real: Ilo
    Name-Email: ilo@test.com
    Expire-Date: 1y
    %no-protection
    %commit
EOF

# Export the public key for use in the collector
gpg --armor --export ilo@test.com > key.pub
```

### Step 2: Configure the Collector Spec

 > The easiest way to build the Offline Collector is in the GUI. This approach will generate a Velociraptor Offline Collector and a spec.yaml.

The following will show how to build the offline collector using CLI:

1. Setup a datastore location
2. Setup a artifact location (only needed if external artifacts will be used)
3. Create a template-spec.yaml
4. Create the Velociraptor Offline Collector

**Prepare the CLI environment**
```sh
mkdir datastore artifacts

# Download reference artifacts and the Velociraptor binary
wget https://triage.velocidex.com/artifacts/Velociraptor_Triage_v0.1.zip -P artifacts
7z x artifacts/Velociraptor_Triage_v0.1.zip -oartifacts
wget https://github.com/Velocidex/velociraptor/releases/download/v0.75/velociraptor-v0.75.6-linux-amd64
chmod +x velociraptor-v0.75.6-linux-amd64

# Generate a base template
./velociraptor-v0.75.6-linux-amd64 collector > template-spec.yaml
```

**Update** `template-spec.yaml`

Edit your YAML file to include your public key in the field `public_key`. Ensure the `EncryptionScheme` is set to `PGP`.

```yaml
OS: Windows
Artifacts:
 Windows.Triage.Targets:
   HighLevelTargets: '["_SANS_Triage", "_KapeTriage"]'
   Devices: '["C:","D:","E:"]'
Target: ZIP
EncryptionScheme: PGP
EncryptionArgs:
  public_key: |-
    -----BEGIN PGP PUBLIC KEY BLOCK-----

    REDACTED...
    -----END PGP PUBLIC KEY BLOCK-----
  password: ""
OptVerbose: Y
OptBanner: Y
OptPrompt: N
OptAdmin: Y
OptTempdir: ""
OptLevel: 9
OptConcurrency: 2
OptFilenameTemplate: "Collection-%Hostname%-%TIMESTAMP%"
OptCollectorTemplate: ""
OptFormat: jsonl
OptOutputDirectory: ""
OptCpuLimit: 0
OptProgressTimeout: 1800
OptTimeout: 0
OptVersion: ""
OptDeleteAtExit: N
```

**Step 3: Build the Offline Collector**

Run the following command to "repack" the Velociraptor binary into a standalone collector based on your spec.
```sh
./velociraptor-v0.75.6-linux-amd64 collector --datastore datastore --definitions artifacts template-spec.yaml

[
 {
  "Repacked": {
   "Path": "/REDACTED/datastore/Collector_velociraptor-v0.75.6-windows-amd64.exe",
   "Size": 87421951,
   "UploadId": 0,
   "sha256": "f1487b5686c9616def5c55cd32266b4726162758456d7f5149ebfde51bc3a582",
   "md5": "d46f704b4014dd7a76fa2847b21f813e",
   "Components": [
    "Collector_velociraptor-v0.75.6-windows-amd64.exe"
   ]
  },
  "_Source": "Server.Utils.CreateCollector"
 }
]
```

### Step 4: Decrypt the Results

The Velociraptor Offline Collector will generate a Collector.zip
file. The file structure within the container is documented as
[described
here](https://docs.velociraptor.app/docs/deployment/offline_collections/collection_data/#pgp-or-x509-non-server-cert-encryption-schemes):

- data.zip
- metadata.json

Within the metadata.json file you fill find the encrypted password in the `EncryptedPass` entry:
```json
[
 {
  "EncryptedPass": "REDACTED",
  "Scheme": "PGP",
  "PublicKey": "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\nREDACTED\n-----END PGP PUBLIC KEY BLOCK-----"
 }
]
```

You can decrypt the password and the data using the following commands:
```sh
# 1. Extract the encrypted pass from metadata
# 2. Base64 decode it
# 3. Decrypt with GPG
# 4. Use the result as the password for the data zip
PASS=$(7z e -so Collection.zip metadata.json | jq -r '.[].EncryptedPass' | base64 -d | gpg --decrypt)
7z x Collection.zip "-p$PASS" -y
```
This assumes that the private key is in your gpg vault.

### Working with the data
Working with the Offline Collection data is [described here](https://docs.velociraptor.app/docs/deployment/offline_collections/collection_data/)

Tags: #triage  #uploads #collector
