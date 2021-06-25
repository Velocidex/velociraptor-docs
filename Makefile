# Rebuild the reference index.
references:
	python3 scripts/vql_reference.py --config scripts/vql_reference_config.yaml ~/projects/velociraptor/docs/references/vql.yaml --reference_data static/reference/data.json

exchange:
	python3 scripts/exchange_index.py
