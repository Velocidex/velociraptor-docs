---
title: How do I get the latest release binary?
---

The Velociraptor release process uses a release branch to prepare a
new release. Releases go through a release candidate (RC) process with
one or more release builds.  Sometimes after the release a new patch
release is made to backport critical bug fixes.

If you need to automate downloading of the latest release binary,
simply use the GitHub API which presents detailed release information
in JSON form. You can use a tool such as `jq` to extract the download
URL:

```bash
WINDOWS_URL=$(curl -s https://api.github.com/repos/velocidex/velociraptor/releases/latest | jq
-r '[.assets | sort_by(.created_at) | reverse | .[] | .browser_download_url | select(test("windows-amd64.exe$"))][0]')
LINUX_URL=$(curl -s https://api.github.com/repos/velocidex/velociraptor/releases/latest | jq
-r '[.assets | sort_by(.created_at) | reverse | .[] | .browser_download_url | select(test("linux-amd64$"))][0]')
MACOS_URL=$(curl -s https://api.github.com/repos/velocidex/velociraptor/releases/latest | jq
-r '[.assets | sort_by(.created_at) | reverse | .[] | .browser_download_url | select(test("darwin-amd64$"))][0]')
```

The above `jq` filter sorts all asserts by creation data and filters
the relevant binaries, then extracts the most recent binary.

Powershell can also be used to download the latest binary for 64 bit Windows as per this example:

```PowerShell
#Get the latest entry from the GitHub API
$VeloLatest = Invoke-WebRequest https://api.github.com/repos/velocidex/velociraptor/releases/latest
#Parse out the url to the binary
$VeloURL = ($VeloLatest.content | convertfrom-json).assets.browser_download_url | select-string windows-amd64.exe | select-object -First 1
#Download and write to a file
Invoke-WebRequest -Uri $VeloURL.tostring() -OutFile velociraptor.exe
#Verify the Authenticode Signature
Get-AuthenticodeSignature .\velociraptor.exe
```

## Verifying signatures

Velociraptor releases are signed using Authenticode on Windows as well
as using GPG. To verify the signatures using gpg:

```
$ gpg --verify velociraptor-v0.6.5-2-linux-amd64.sig
gpg: assuming signed data in 'velociraptor-v0.6.5-2-linux-amd64'
gpg: Signature made Wed Jul 27 02:49:33 2022 AEST
gpg:                using RSA key 0572F28B4EF19A043F4CBBE0B22A7FB19CB6CFA1
gpg: Good signature from "Velociraptor Team (Velociraptor - Dig deeper!  https://docs.velociraptor.app/) <support@velocidex.com>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 0572 F28B 4EF1 9A04 3F4C  BBE0 B22A 7FB1 9CB6 CFA1
```

You may need to import the key first into your keyring:

```
$ gpg --receive-keys 0572F28B4EF19A043F4CBBE0B22A7FB19CB6CFA1
gpg: key B22A7FB19CB6CFA1: public key "Velociraptor Team (Velociraptor - Dig deeper!  https://docs.velociraptor.app/) <support@velocidex.com>" imported
gpg: Total number processed: 1
gpg:               imported: 1
```


{{% notice warning "API limiting" %}}

GitHub limits how many unauthenticated API requests are allowed per IP
address. If you need to increase this limit, create a personal access
token (see
https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

{{% /notice %}}

Tags: #configuration #deployment
