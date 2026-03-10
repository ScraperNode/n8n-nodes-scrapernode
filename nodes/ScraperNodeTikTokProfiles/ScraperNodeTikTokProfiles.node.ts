import { buildScraperNodeClass } from "../shared/scraperNode";

export class ScraperNodeTikTokProfiles extends buildScraperNodeClass({
	scraperId: "tiktok-profiles",
	displayName: "ScraperNode TikTok Profiles",
	nodeName: "scraperNodeTikTokProfiles",
	description: "Extract creator profile data from TikTok user URLs",
	inputLabel: "Profile URLs",
	inputDescription:
		"TikTok profile URLs (tiktok.com/@username) — one per line or comma-separated",
	inputPlaceholder: "https://tiktok.com/@username",
	creditCost: 4,
	platform: "tiktok",
	allowedDomains: ["tiktok.com"],
}) {}
