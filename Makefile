# Rebuild the reference index.
references:
	python3 scripts/vql_reference.py --config scripts/vql_reference_config.yaml ~/projects/velociraptor/docs/references/vql.yaml --reference_data static/reference/data.json
	python3 scripts/descriptions.py content/vql_reference/

config_references:
	cd ./scripts/config_reference/ && go run . ~/projects/velociraptor/docs/references/server.config.yaml > ../../content/docs/deployment/references/_index.md

artifact_references:
	python3 scripts/artifact_reference_index.py ~/projects/velociraptor/
	python scripts/descriptions.py content/

exchange:
	python3 scripts/exchange_index.py

kb:
	python3 scripts/knowledge_base.py

blog:
	python3 scripts/blog_index.py


highlight_js:
	cd ../highlight.js && node tools/build.js -t browser python yaml sql json bash powershell vql text shell
	cp ../highlight.js/build/highlight.min.js static/js/

# Pre-render every ```vql fence to data/vql/<sha256>.html using the VQL
# Chroma lexer in scripts/vql_highlight.  The render-codeblock hook looks the
# file up by content hash; run this after editing marked-up VQL.  Requires Go
# on PATH (see scripts/vql_highlight/vql.go for docs).
vql_highlight:
	cd ./scripts/vql_highlight/ && go run . -content ../../content -out ../../generated/vql

serve: vql_highlight
	hugo serve

clean_all:
	rm -rf ./public/ ./content/artifact_references/pages/*
	find ./content/vql_reference/ -mindepth 1 -maxdepth 1 -type d -exec rm -rf {} \;

clean:
	rm -rf ./public/

build:
	hugo

# Build the Pagefind search index. Requires `bun install` (or `npm install`)
# once, which puts the `pagefind` binary on the PATH for `bunx`.
pagefind:
	bunx pagefind --site public

site: vql_highlight build
	bunx pagefind --site public

index:
	rm -rf /tmp/index/
	cd ./velociraptor-site-search/ && go run ./cmd/ build ../content/ /tmp/index/ && cd -
	cd /tmp/index && zip -r ../index.zip * && cd -
	mkdir -p ./static/docs_index/
	mv /tmp/index.zip ./static/docs_index/docs_index_v1.zip

comparisons:
	python3 scripts/comparisons.py

descriptions:
	python3 scripts/descriptions.py content/

vale:
	vale --output line .
