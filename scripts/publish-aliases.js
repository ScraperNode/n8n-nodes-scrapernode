const { execFileSync } = require("child_process");
const { readFileSync, writeFileSync, mkdirSync, cpSync } = require("fs");
const { join } = require("path");
const { tmpdir } = require("os");

const ALIASES = ["@scrapernode/n8n-nodes-scrapernode", "n8n-nodes-weld"];

const pkg = JSON.parse(readFileSync(join(__dirname, "..", "package.json"), "utf8"));
const version = pkg.version;

for (const alias of ALIASES) {
	console.log(`Publishing ${alias}@${version}...`);

	const tmp = join(tmpdir(), `publish-${alias.replace("/", "-")}-${Date.now()}`);
	mkdirSync(tmp, { recursive: true });

	// Copy dist directory
	cpSync(join(__dirname, "..", "dist"), join(tmp, "dist"), { recursive: true });

	// Write modified package.json (strip scripts to avoid prepublishOnly in temp dir)
	const { scripts, devDependencies, packageManager, ...rest } = pkg;
	const aliasPkg = { ...rest, name: alias };
	writeFileSync(join(tmp, "package.json"), JSON.stringify(aliasPkg, null, 2));

	try {
		execFileSync("npm", ["publish", "--provenance", "--access", "public"], {
			cwd: tmp,
			stdio: "inherit",
		});
		console.log(`Published ${alias}@${version}`);
	} catch (err) {
		console.error(`Failed to publish ${alias}:`, err.message);
		process.exitCode = 1;
	}
}
