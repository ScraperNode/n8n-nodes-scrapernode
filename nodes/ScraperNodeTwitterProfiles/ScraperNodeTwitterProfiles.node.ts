import { buildScraperNodeClass } from "../shared/scraperNode";

export class ScraperNodeTwitterProfiles extends buildScraperNodeClass({
	scraperId: "twitter-profiles",
	displayName: "ScraperNode Twitter/X Profiles",
	nodeName: "scraperNodeTwitterProfiles",
	description: "Extract profile data from Twitter/X user URLs",
	inputLabel: "Profile URLs",
	inputDescription:
		"Twitter/X profile URLs (x.com/username) — one per line or comma-separated",
	inputPlaceholder: "https://x.com/username",
	creditCost: 4,
	platform: "twitter",
	allowedDomains: ["twitter.com", "x.com"],
}) {}
