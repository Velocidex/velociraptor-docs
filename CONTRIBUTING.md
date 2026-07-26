# Contributing to the Velociraptor Documentation site

Thank you for your interest in contributing to the Velociraptor
project! This repository hosts the [Velociraptor documentation
website](https://docs.velociraptor.app) as well as the
community-driven [Artifact Exchange](content/exchange/).

There are two main ways to contribute:

1. [**Improve the documentation**](#documentation-contributions) itself.
2. [**Submit an artifact**](#contributing-artifacts-to-the-exchange) to the Artifact Exchange.

Both contribution types use the standard GitHub fork-and-PR workflow,
as described below.

---

## Documentation Contributions

If you want to improve the documentation itself (fix typos, add
content, update screenshots, etc.), you can find a full set of
guidelines in the
[Documentation Development Guidelines](https://docs.velociraptor.app/dev/)
section of the website. This is also accessible in the repository
under [`content/dev/`](content/dev/) and includes:

- **Setting up a Hugo development server** — how to get a local
  live-preview web server running so you can see your changes before
  submitting.
- **Prose style guidelines** — writing and formatting standards,
  markdown flavor tips, page structure conventions, etc.
- **Image guidelines** — advice for creating screenshots and diagrams
  (optionally using Excalidraw), and recommendations for image
  format/size/font/colors/etc.
- **Vale linting** — how to run our automated prose linter locally.

The general workflow for documentation contributions is:

1. [Fork](https://github.com/Velocidex/velociraptor-docs/fork) this
   repository.
2. Clone your fork locally.
3. (Optional) Install Hugo and run `hugo server` for a live preview.
4. Make your changes to the markdown content under `content/`.
5. Run `vale .` from the project root if you have Vale installed
   (optional, CI will catch issues).
6. Commit, push to your fork, and open a Pull Request.


---

## Contributing Artifacts to the Exchange

Velociraptor is an open source community-driven project, and we
welcome contributions from the community. Velociraptor's VQL language
is designed to lower the bar for contributions and make it easier for
non-developers to contribute meaningful improvements in the form of
new [Artifacts](https://docs.velociraptor.app/docs/artifacts/).

> [!TIP]
> Before contributing, consider chatting with us on
> [Discord](https://docs.velociraptor.app/discord/) first. We can help
> you find the right place for your contribution and avoid wasted
> effort.

### Maintaining your own artifacts

Velociraptor's philosophy is to be as flexible as possible to cater
for many different use cases. This means that users usually maintain
their own set of custom artifacts that suit their own particular
workflows, which is perfectly fine!

However, for custom artifacts contributed back into the project we
require that these be useful to the broader Velociraptor community.
Artifacts that handle a very specific or unique task are probably not
that useful broadly and are unlikely to be accepted as Exchange
contributions. On the other hand, if your artifact demonstrates a
solution to an interesting or novel use case that others can learn
from, then it may be accepted on that basis.

### Where should I contribute my artifact?

Velociraptor comes with a large number of built-in artifacts ready to
use when installed. However, there are also hundreds of artifacts
available on the [Artifact Exchange](https://docs.velociraptor.app/exchange/).

The main distinction between the two sources is around quality and
maintainability:

1. **Built-in artifacts** are useful to most people and are
   extensively tested using automated tests. If you wish to contribute
   to the built-in set you should also include tests. These ensure
   that the artifacts are less likely to fail in future and help
   maintain them across releases.

2. **The Artifact Exchange** contains many artifacts that were useful
   at one time but may not have been updated recently. These artifacts
   have no quality assurance and may even break. Since they do not
   have associated CI tests we may not know they are broken unless
   someone reports it. Furthermore, many of these artifacts provide
   integration with third-party systems which we don't have access to,
   which means we can't verify reported issues or create CI tests for
   such artifacts.

   Good candidates for the Exchange are:

   - Artifacts that hunt for specific topical threats which may not be
     more widely useful in general (for example the Log4J
     vulnerability which is now widely patched).
   - Artifacts that demonstrate a unique or reusable solution to a
     general class of problem (for example, interacting with various
     types of external APIs, including LLMs).

If you encounter issues with an Exchange artifact, your best bet is to
try fix it yourself (and then contribute the fixed version back)
and/or try to contact the original author for assistance. We also plan
to review the artifacts in the Exchange periodically and remove
outdated or no-longer-working artifacts. On the other hand, very
useful Exchange artifacts may be graduated to become built-ins if
suitable tests can be devised.

#### Specialized artifact projects

For some common artifact patterns we have dedicated projects that may
be a better home for your contribution:

- **Triage artifacts** (search for files, collect, hash, enrich): use
  the [Triage Artifact
  project](https://github.com/Velocidex/velociraptor-triage-collector)
  instead. See the [Triage Artifacts
  site](https://triage.velocidex.com/) for details.

- **Registry parsing artifacts** (search registry keys, parse binary
  values): use the [Registry
  Hunter](https://registry-hunter.velocidex.com/) project instead.

- **Artifacts targeting web browsers and OS database files** (SQLite,
  LevelDB, ESE): use the
  [SQLiteHunter](https://github.com/Velocidex/SQLiteHunter) project
  instead.

- **Sigma rule-based detections**: contribute to our
  [Sigma Rules](https://github.com/Velocidex/velociraptor-sigma-rules)
  project instead.

### Artifact Exchange Contribution Process

Exchange artifacts are stored in this repository under
`content/exchange/artifacts/`.

GitHub allows you to create a fork, add a single file, and then make a
Pull Request without leaving their website. This is the most common
workflow for contributing a single artifact and doesn't require much
knowledge of git or version control.

The steps are:

1. [Fork](https://github.com/Velocidex/velociraptor-docs/fork) this
   repository.
2. Add your YAML artifact file to `content/exchange/artifacts/` in
   your fork.
3. Submit a Pull Request back to this repository.

For more advanced submissions, the process is the same as for a
documentation contribution (described below), except that for
artifacts you're just adding your YAML file into
`content/exchange/artifacts/` and you don't need Hugo or any of the
steps related to that.

We'll review your contribution and give you feedback in the Pull
Request if anything needs changing.

> [!NOTE]
> We don't guarantee that all artifact submissions will be
> accepted. If you're unsure, please chat with us on
> [Discord](https://docs.velociraptor.app/discord/) first.

### Tips for writing better artifacts

- Use the `velociraptor artifacts verify` command (or the
  `Server.Utils.ArtifactVerifier` server artifact in the GUI) to
  validate your artifact. This runs a static analysis of the
  artifact's VQL to ensure there are no major issues. The CI pipeline
  will run the verifier automatically on submitted artifacts.

- Author your artifacts using the built-in GUI editor to benefit from
  its VQL-aware tools and automatic validation. If you prefer to write
  in an external editor, paste it into the GUI's artifact editor to
  trigger validation. The built-in editor also includes a "Reformat
  VQL" button for consistent VQL formatting.

- Write clear artifact descriptions so that others can understand what
  the artifact does and how to use it without needing to read the VQL.
  See the section
  [Tips for creating better artifacts](https://docs.velociraptor.app/docs/artifacts/tips/#tips-for-creating-better-artifacts)
  in the documentation for more detailed guidance.

---

## License

By contributing, you agree that your contributions will be licensed
under the [Creative Commons
Attribution-NonCommercial-ShareAlike 4.0 International
License](http://creativecommons.org/licenses/by-nc-sa/4.0/).
