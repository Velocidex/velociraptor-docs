# Rebuild the reference index.
references:
	python3 scripts/vql_reference.py --config scripts/vql_reference_config.yaml ~/projects/velociraptor/docs/references/vql.yaml --reference_data static/reference/data.json

config_references:
	cd ./scripts/config_reference/ && go run . ~/projects/velociraptor/docs/references/server.config.yaml > ../../content/docs/deployment/references/_reference.html

artifact_references:
	python3 scripts/artifact_reference_index.py ~/projects/velociraptor/

exchange:
	python3 scripts/exchange_index.py

kb:
	python3 scripts/knowledge_base.py

blog:
	python3 scripts/blog_index.py


highlight_js:
	cd ../highlight.js && node tools/build.js -t browser python yaml sql json bash powershell vql text
	cp ../highlight.js/build/highlight.min.js static/js/

serve:
	hugo serve
