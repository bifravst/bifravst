docs/firmware/schema.md: docs/firmware/schema.json
	npx jsonschema2md -d $< -n -o docs/firmware
