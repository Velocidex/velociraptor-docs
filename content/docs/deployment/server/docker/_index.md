---
menutitle: Docker
title: Docker deployment
draft: false
weight: 50
date: 2026-06-21
last_reviewed: 2026-06-23
summary: |
  Run the Velociraptor server inside a Docker container, using the
  officially supported image from the GitHub Container Registry.
description: |
  Run the Velociraptor server inside a Docker container, using the
  officially supported image from the GitHub Container Registry.
---

From [Velociraptor 0.77](/blog/2026/2026-05-31-release-notes-0.77/),
an officially supported Docker container is available from the
[GitHub Container Registry](https://ghcr.io/velocidex/velociraptor-server).
You can use it to run the Velociraptor server in a containerized
environment without needing to install packages or manage binaries
directly.

The source files for the container (including the `Dockerfile`,
`compose.yaml`, entrypoint script, and configuration VQL) live in the
main Velociraptor repository under the
[`Docker/`](https://github.com/Velocidex/velociraptor/tree/master/Docker)
directory. That directory's
[README](https://github.com/Velocidex/velociraptor/blob/master/Docker/README.md)
contains the full technical reference and step-by-step instructions.

The CI system builds the container image automatically and publishes
it whenever changes are merged to the main branch. The
`ghcr.io/velocidex/velociraptor-server:latest` tag always points to
the most recent build. Release versions are tagged with their version
number (for example, `ghcr.io/velocidex/velociraptor-server:0.77`).

You will need:

- Docker (or a compatible container runtime, such as Podman)
- `docker-compose` (or `docker compose`)

## Deployment scenarios

The container supports two main scenarios depending on whether you
already have a Velociraptor deployment.

### Fresh deployment

If you don't have an existing Velociraptor server, the container can
create everything from scratch:

1. Copy the
   [`compose.yaml`](https://github.com/Velocidex/velociraptor/blob/master/Docker/compose.yaml)
   and
   [`.env`](https://github.com/Velocidex/velociraptor/blob/master/Docker/.env)
   files from the repository's `Docker/` directory into a new project
   directory.
2. Adjust the `.env` file if needed (hostname, ports, admin password).
3. Run `docker-compose up`.

On first startup, the container:

- Generates a new configuration file with self-signed certificates
- Creates an initial `admin` user with the password from the `.env`
  file (default: `password`)
- Starts the Velociraptor frontend on the configured ports
- Builds client deployment packages (MSI, DEB, RPM)

The container stores the generated configuration file in the `etc/`
directory and keeps the datastore in the `datastore/` directory. Both
directories are mounted as volumes, so data persists across
container restarts.

You can connect to the GUI at `https://localhost:8889/` (or the host
and port you configured).

### Existing deployment with your own configuration

If you already have a Velociraptor deployment, you can point the
container at your existing configuration file:

1. Place your existing `server.config.yaml` in the `etc/` directory.
2. Ensure your `.env` file reflects your server's hostname and ports.
3. Run `docker-compose up`.

The container detects the existing configuration file and skips the
generation step, starting the frontend directly. The datastore volume
gives the container access to your existing data.

## Upgrading

Upgrading a Docker-based deployment is straightforward because all
persistent data is stored on mounted volumes.

{{% notice info "Keep your configuration file" %}}

Your configuration file contains the cryptographic keys that establish
trust between the server and its clients. When upgrading, you must
reuse the same configuration file so that existing clients can
continue to communicate with the server.

Before upgrading, make a backup copy of your configuration file
(located in the `etc/` directory). Keep it somewhere safe.

{{% /notice %}}

To upgrade:

1. Pull the latest image:
   ```bash
   docker pull ghcr.io/velocidex/velociraptor-server:latest
   ```
2. Stop the running container:
   ```bash
   docker-compose down
   ```
3. Start again with the new image:
   ```bash
   docker-compose up
   ```

The new container runs the latest Velociraptor binary using your
existing configuration file and datastore. Clients reconnect using
the same cryptographic keys and continue operating normally.

If you want to pin a specific version, change the image tag in your
`compose.yaml` from `:latest` to a version tag such as
`ghcr.io/velocidex/velociraptor-server:0.77`.

## Environment variables

The following environment variables (set in the `.env` file or passed
directly to the container) control the container's behavior:

| Variable | Default | Description |
|---|---|---|
| `VELOCIRAPTOR_HOSTNAME` | `localhost` | Public hostname or IP that clients use to reach the server |
| `VELOCIRAPTOR_FRONTEND_PORT` | `8000` | Port for client communication |
| `VELOCIRAPTOR_GUI_PORT` | `8889` | Port for the web GUI |
| `VELOCIRAPTOR_DATASTORE_PATH` | `/datastore/` | Path inside the container where the datastore is stored |
| `VELOCIRAPTOR_CONFIG_PATH` | `/etc/velociraptor/server.config.yaml` | Path inside the container for the server config file |
| `VELOCIRAPTOR_INITIAL_ADMIN_PASSWORD` | `password` | Initial password for the admin user |
| `VELOCIRAPTOR_NO_INITIALIZE` | _(not set)_ | Set to `TRUE` to skip building MSI/DEB/RPM packages on first start |
| `VELOCIRAPTOR_LITERAL_CONFIG` | _(not set)_ | If set, uses the value as the literal config instead of reading from a file |

## Customization

You can customize the server's behavior by providing your own
artifacts. The container loads artifacts from the
`/custom_artifacts/` directory inside the container. The
`InitializeServer.yaml` artifact (which runs on first startup to
build client packages) lives there by default. You can override it
by mounting your own directory of custom artifacts over
`/custom_artifacts/`.

See the
[`Docker/`](https://github.com/Velocidex/velociraptor/tree/master/Docker)
directory in the main Velociraptor repository for details about the
entrypoint, initialization VQL, and customization options.
