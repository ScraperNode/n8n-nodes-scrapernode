import tsParser from "@typescript-eslint/parser";
import n8nPlugin from "eslint-plugin-n8n-nodes-base";

export default [
	{
		files: ["nodes/**/*.ts", "credentials/**/*.ts"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
		plugins: {
			"n8n-nodes-base": n8nPlugin,
		},
		rules: {
			...n8nPlugin.configs["community"].rules,
			...n8nPlugin.configs["credentials"].rules,
			...n8nPlugin.configs["nodes"].rules,
			// The older plugin's doc-url rules conflict with @n8n/eslint-plugin-community-nodes
			// which correctly allows full HTTP URLs for documentationUrl
			"n8n-nodes-base/cred-class-field-documentation-url-miscased": "off",
			"n8n-nodes-base/cred-class-field-documentation-url-not-http-url": "off",
		},
	},
];
