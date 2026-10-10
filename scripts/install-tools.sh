#!/usr/bin/env bash
# Install the toolchain used to build the Velociraptor docs site.
#
# Installs:
#   * Hugo (extended) - from official GitHub releases
#   * Go - from the official go.dev distribution
#
# Usage: ./scripts/install-tools.sh [HUGO_VERSION]
#   HUGO_VERSION defaults to the version tested in CI (see .github/workflows/gh-pages.yml).

set -euo pipefail

# These versions must stay in sync with .github/workflows/*.yml
# Hugo must be within Blowfish v3.6.0's declared range [0.162.0, 0.165.0].
HUGO_VERSION="${1:-0.165.0}"
# Latest stable Go as of 2026-09; bump when convenient.
GO_VERSION="go1.27.1"

OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
ARCH="$(uname -m)"
case "$ARCH" in
    x86_64)  ARCH="amd64" ;;
    aarch64) ARCH="arm64" ;;
    armv7l)  ARCH="armv7" ;;
esac

DEST="${DEST:-/usr/local/bin}"

echo "==> Installing Hugo ${HUGO_VERSION} (extended, ${OS}-${ARCH}) to ${DEST}"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
curl -sL -o "$TMP/hugo.tar.gz" \
  "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_${OS}-${ARCH}.tar.gz"
tar -xzf "$TMP/hugo.tar.gz" -C "$TMP" hugo
install -m 0755 "$TMP/hugo" "${DEST}/hugo"
hugo version

echo "==> Installing Go (${GO_VERSION}) to /usr/local/go"
if [ -d /usr/local/go ]; then
  echo "    /usr/local/go already exists; skipping download (remove it to reinstall)."
else
  curl -sL -o "$TMP/go.tar.gz" "https://go.dev/dl/${GO_VERSION}.${OS}-${ARCH}.tar.gz"
  tar -C /usr/local -xzf "$TMP/go.tar.gz"
fi
/usr/local/go/bin/go version

echo
echo "Ensure /usr/local/go/bin and ${DEST} are on your PATH, e.g.:"
echo '  export PATH=/usr/local/go/bin:'"${DEST}:$PATH"