import { describe, it, expect, beforeAll } from "vitest";
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "../..");
const NODES_DIR = join(ROOT, "nodes");
const CREDENTIALS_DIR = join(ROOT, "credentials");

const PLATFORMS = [
	"linkedin",
	"instagram",
	"tiktok",
	"twitter",
	"youtube",
	"facebook",
	"indeed",
	"glassdoor",
	"yelp",
	"github",
	"crunchbase",
];

/** Map platform → node directories that should contain its icons */
function getNodeDirsForPlatform(platform: string): string[] {
	return readdirSync(NODES_DIR, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => join(NODES_DIR, d.name))
		.filter((dir) => {
			const files = readdirSync(dir);
			return files.includes(`${platform}.svg`);
		});
}

describe("generate-icons script", () => {
	beforeAll(() => {
		execFileSync("npx", ["tsx", "scripts/generate-icons.ts"], { cwd: ROOT });
	});

	it("should generate icons for all 11 platforms", () => {
		for (const platform of PLATFORMS) {
			const dirs = getNodeDirsForPlatform(platform);
			expect(dirs.length).toBeGreaterThan(0);

			for (const dir of dirs) {
				expect(existsSync(join(dir, `${platform}.svg`))).toBe(true);
				expect(existsSync(join(dir, `${platform}.dark.svg`))).toBe(true);
			}
		}
	});

	it("should produce valid SVG with correct structure for light variants", () => {
		for (const platform of PLATFORMS) {
			const dir = getNodeDirsForPlatform(platform)[0];
			const svg = readFileSync(join(dir, `${platform}.svg`), "utf-8");

			expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
			expect(svg).toContain('viewBox="0 0 64 64"');
			expect(svg).toContain('rx="12"');
			expect(svg).toContain('fill="white"');
			expect(svg).toContain("<path d=");
			expect(svg).toContain("translate(14, 14) scale(1.5)");
		}
	});

	it("should produce valid SVG with correct structure for dark variants", () => {
		for (const platform of PLATFORMS) {
			const dir = getNodeDirsForPlatform(platform)[0];
			const svg = readFileSync(join(dir, `${platform}.dark.svg`), "utf-8");

			expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
			expect(svg).toContain('viewBox="0 0 64 64"');
			expect(svg).toContain('rx="12"');
			expect(svg).toContain("<path d=");
			expect(svg).toContain("translate(14, 14) scale(1.5)");
			// Dark icons should NOT use white fill
			expect(svg).not.toContain('fill="white"');
		}
	});

	it("should use distinct background colors for light vs dark", () => {
		for (const platform of PLATFORMS) {
			const dir = getNodeDirsForPlatform(platform)[0];
			const light = readFileSync(join(dir, `${platform}.svg`), "utf-8");
			const dark = readFileSync(join(dir, `${platform}.dark.svg`), "utf-8");

			const lightBg = light.match(/rect[^>]*fill="([^"]+)"/)?.[1];
			const darkBg = dark.match(/rect[^>]*fill="([^"]+)"/)?.[1];

			expect(lightBg).toBeTruthy();
			expect(darkBg).toBeTruthy();
			expect(lightBg).not.toBe(darkBg);
		}
	});

	it("should use the same SVG path for light and dark variants", () => {
		for (const platform of PLATFORMS) {
			const dir = getNodeDirsForPlatform(platform)[0];
			const light = readFileSync(join(dir, `${platform}.svg`), "utf-8");
			const dark = readFileSync(join(dir, `${platform}.dark.svg`), "utf-8");

			const lightPath = light.match(/<path d="([^"]+)"/)?.[1];
			const darkPath = dark.match(/<path d="([^"]+)"/)?.[1];

			expect(lightPath).toBeTruthy();
			expect(lightPath).toBe(darkPath);
		}
	});

	it("should write identical icons across all directories for the same platform", () => {
		for (const platform of PLATFORMS) {
			const dirs = getNodeDirsForPlatform(platform);
			if (dirs.length < 2) continue;

			const refLight = readFileSync(join(dirs[0], `${platform}.svg`), "utf-8");
			const refDark = readFileSync(join(dirs[0], `${platform}.dark.svg`), "utf-8");

			for (const dir of dirs.slice(1)) {
				const light = readFileSync(join(dir, `${platform}.svg`), "utf-8");
				const dark = readFileSync(join(dir, `${platform}.dark.svg`), "utf-8");
				expect(light).toBe(refLight);
				expect(dark).toBe(refDark);
			}
		}
	});

	it("should sync scrapernode icons to credentials directory", () => {
		const jobsLight = readFileSync(
			join(NODES_DIR, "ScraperNodeJobs", "scrapernode.svg"),
			"utf-8",
		);
		const jobsDark = readFileSync(
			join(NODES_DIR, "ScraperNodeJobs", "scrapernode.dark.svg"),
			"utf-8",
		);
		const credLight = readFileSync(
			join(CREDENTIALS_DIR, "scrapernode.svg"),
			"utf-8",
		);
		const credDark = readFileSync(
			join(CREDENTIALS_DIR, "scrapernode.dark.svg"),
			"utf-8",
		);

		expect(credLight).toBe(jobsLight);
		expect(credDark).toBe(jobsDark);
	});
});
