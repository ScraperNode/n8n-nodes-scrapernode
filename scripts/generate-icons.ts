/**
 * Auto-generate platform SVG icons for n8n nodes from Simple Icons.
 *
 * Each platform gets a light + dark variant written to every node directory
 * that uses that platform, plus the credentials directory for scrapernode.
 *
 * Usage: npx tsx scripts/generate-icons.ts
 */

import { readdirSync, writeFileSync, readFileSync } from "node:fs";
import { join, basename } from "node:path";
import {
	siInstagram,
	siTiktok,
	siX,
	siYoutube,
	siFacebook,
	siIndeed,
	siGlassdoor,
	siYelp,
	siGithub,
	siCrunchbase,
	siGoogle,
	siTrustpilot,
	siG2,
	siXing,
} from "simple-icons";

// LinkedIn was removed from Simple Icons v13+ (trademark). Hardcode the path.
const LINKEDIN_PATH =
	"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

interface PlatformConfig {
	path: string;
	lightBg: string;
	darkBg: string;
	darkIconFill: string;
}

const PLATFORMS: Record<string, PlatformConfig> = {
	linkedin: {
		path: LINKEDIN_PATH,
		lightBg: "#0A66C2",
		darkBg: "#5BA0DB",
		darkIconFill: "#0A2540",
	},
	instagram: {
		path: siInstagram.path,
		lightBg: "#E4405F",
		darkBg: "#F06292",
		darkIconFill: "#0A2540",
	},
	tiktok: {
		path: siTiktok.path,
		lightBg: "#010101",
		darkBg: "#424242",
		darkIconFill: "#E0E0E0",
	},
	twitter: {
		path: siX.path,
		lightBg: "#000000",
		darkBg: "#424242",
		darkIconFill: "#E0E0E0",
	},
	youtube: {
		path: siYoutube.path,
		lightBg: "#FF0000",
		darkBg: "#FF4444",
		darkIconFill: "#0A2540",
	},
	facebook: {
		path: siFacebook.path,
		lightBg: "#1877F2",
		darkBg: "#5BA0DB",
		darkIconFill: "#0A2540",
	},
	indeed: {
		path: siIndeed.path,
		lightBg: "#2164F3",
		darkBg: "#5BA0DB",
		darkIconFill: "#0A2540",
	},
	glassdoor: {
		path: siGlassdoor.path,
		lightBg: "#0CAA41",
		darkBg: "#4CAF50",
		darkIconFill: "#0A2540",
	},
	yelp: {
		path: siYelp.path,
		lightBg: "#FF1A1A",
		darkBg: "#FF4444",
		darkIconFill: "#0A2540",
	},
	github: {
		path: siGithub.path,
		lightBg: "#24292F",
		darkBg: "#5BA0DB",
		darkIconFill: "#0A2540",
	},
	crunchbase: {
		path: siCrunchbase.path,
		lightBg: "#0288D1",
		darkBg: "#4FC3F7",
		darkIconFill: "#0A2540",
	},
	"google-maps": {
		path: siGoogle.path,
		lightBg: "#34A853",
		darkBg: "#4CAF50",
		darkIconFill: "#0A2540",
	},
	"google-search": {
		path: siGoogle.path,
		lightBg: "#4285F4",
		darkBg: "#5BA0DB",
		darkIconFill: "#0A2540",
	},
	"google-shopping": {
		path: siGoogle.path,
		lightBg: "#EA4335",
		darkBg: "#FF4444",
		darkIconFill: "#0A2540",
	},
	"google-flights": {
		path: siGoogle.path,
		lightBg: "#4285F4",
		darkBg: "#5BA0DB",
		darkIconFill: "#0A2540",
	},
	"google-hotels": {
		path: siGoogle.path,
		lightBg: "#FBBC04",
		darkBg: "#FFD740",
		darkIconFill: "#1A1A1A",
	},
	zoominfo: {
		path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z",
		lightBg: "#FF6600",
		darkBg: "#FF9933",
		darkIconFill: "#0A2540",
	},
	trustpilot: {
		path: siTrustpilot.path,
		lightBg: "#00B67A",
		darkBg: "#4CAF50",
		darkIconFill: "#0A2540",
	},
	g2: {
		path: siG2.path,
		lightBg: "#FF492C",
		darkBg: "#FF6F5E",
		darkIconFill: "#0A2540",
	},
	pitchbook: {
		path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
		lightBg: "#004B87",
		darkBg: "#5BA0DB",
		darkIconFill: "#0A2540",
	},
	xing: {
		path: siXing.path,
		lightBg: "#006567",
		darkBg: "#4CAF50",
		darkIconFill: "#0A2540",
	},
	owler: {
		path: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
		lightBg: "#FF4F00",
		darkBg: "#FF6633",
		darkIconFill: "#0A2540",
	},
	martindale: {
		path: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l6 2.67V11c0 3.88-2.62 7.5-6 8.93C8.62 18.5 6 14.88 6 11V7.67L12 5z",
		lightBg: "#1B3A6B",
		darkBg: "#5BA0DB",
		darkIconFill: "#0A2540",
	},
	ventureradar: {
		path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
		lightBg: "#6B21A8",
		darkBg: "#9C4DCC",
		darkIconFill: "#0A2540",
	},
	trustradius: {
		path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
		lightBg: "#FF6B35",
		darkBg: "#FF9066",
		darkIconFill: "#0A2540",
	},
};

function makeLightSvg(config: PlatformConfig): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="12" fill="${config.lightBg}"/>
  <g transform="translate(14, 14) scale(1.5)" fill="white">
    <path d="${config.path}"/>
  </g>
</svg>
`;
}

function makeDarkSvg(config: PlatformConfig): string {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <rect width="64" height="64" rx="12" fill="${config.darkBg}"/>
  <g transform="translate(14, 14) scale(1.5)" fill="${config.darkIconFill}">
    <path d="${config.path}"/>
  </g>
</svg>
`;
}

const ROOT = join(new URL(".", import.meta.url).pathname, "..");
const NODES_DIR = join(ROOT, "nodes");
const CREDENTIALS_DIR = join(ROOT, "credentials");

// Find all node directories that use a given platform icon
function getNodeDirsForPlatform(platform: string): string[] {
	return readdirSync(NODES_DIR, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => join(NODES_DIR, d.name))
		.filter((dir) => {
			try {
				readdirSync(dir).some((f) => f === `${platform}.svg`);
				return readdirSync(dir).includes(`${platform}.svg`);
			} catch {
				return false;
			}
		});
}

let totalFiles = 0;

// Generate platform icons
for (const [platform, config] of Object.entries(PLATFORMS)) {
	const light = makeLightSvg(config);
	const dark = makeDarkSvg(config);
	const dirs = getNodeDirsForPlatform(platform);

	for (const dir of dirs) {
		writeFileSync(join(dir, `${platform}.svg`), light);
		writeFileSync(join(dir, `${platform}.dark.svg`), dark);
		totalFiles += 2;
	}
}

// Copy scrapernode icon (custom, not from Simple Icons) to ScraperNodeJobs + credentials
// Read the canonical version from ScraperNodeJobs
const scrapernodeLight = readFileSync(
	join(NODES_DIR, "ScraperNodeJobs", "scrapernode.svg"),
	"utf-8",
);
const scrapernodeDark = readFileSync(
	join(NODES_DIR, "ScraperNodeJobs", "scrapernode.dark.svg"),
	"utf-8",
);

writeFileSync(join(CREDENTIALS_DIR, "scrapernode.svg"), scrapernodeLight);
writeFileSync(join(CREDENTIALS_DIR, "scrapernode.dark.svg"), scrapernodeDark);
totalFiles += 2;

// New platform → node directory name mappings (directories don't have existing SVG files)
const NEW_PLATFORM_DIRS: Record<string, string[]> = {
	tiktok: ["ScraperNodeTikTokPostsByUrl", "ScraperNodeTikTokPostsByProfile", "ScraperNodeTikTokPostsBySearch", "ScraperNodeTikTokShop", "ScraperNodeTikTokShopCategories"],
	facebook: ["ScraperNodeFacebookPagesAndProfiles", "ScraperNodeFacebookPersonalProfiles", "ScraperNodeFacebookMarketplace", "ScraperNodeFacebookEvents", "ScraperNodeFacebookCompanyReviews"],
	"google-maps": ["ScraperNodeGoogleMapsListings", "ScraperNodeGoogleMapsReviews"],
	"google-search": ["ScraperNodeGoogleSearchResults", "ScraperNodeGoogleSearchAi"],
	"google-shopping": ["ScraperNodeGoogleShoppingProducts", "ScraperNodeGoogleShoppingSearch"],
	"google-flights": ["ScraperNodeGoogleFlightsSearch"],
	"google-hotels": ["ScraperNodeGoogleHotelsSearch"],
	zoominfo: ["ScraperNodeZoomInfoCompanies"],
	trustpilot: ["ScraperNodeTrustpilotReviews"],
	g2: ["ScraperNodeG2Reviews"],
	pitchbook: ["ScraperNodePitchBookCompanies"],
	xing: ["ScraperNodeXingProfiles"],
	owler: ["ScraperNodeOwlerCompanies"],
	martindale: ["ScraperNodeMartindaleLawyers"],
	ventureradar: ["ScraperNodeVentureRadarCompanies"],
	trustradius: ["ScraperNodeTrustRadiusReviews"],
};

// Generate icons for new platforms (new node directories)
for (const [platform, dirNames] of Object.entries(NEW_PLATFORM_DIRS)) {
	const config = PLATFORMS[platform];
	if (!config) continue;
	const light = makeLightSvg(config);
	const dark = makeDarkSvg(config);
	for (const dirName of dirNames) {
		const dir = join(NODES_DIR, dirName);
		writeFileSync(join(dir, `${platform}.svg`), light);
		writeFileSync(join(dir, `${platform}.dark.svg`), dark);
		totalFiles += 2;
	}
}

console.log(`Generated ${totalFiles} SVG icon files across ${Object.keys(PLATFORMS).length} platforms`);
