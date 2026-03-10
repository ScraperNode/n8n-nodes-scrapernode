import { buildScraperNodeClass } from "../shared/scraperNode";

export class ScraperNodeInstagramProfiles extends buildScraperNodeClass({
	scraperId: "instagram-profiles",
	displayName: "ScraperNode Instagram Profiles",
	nodeName: "scraperNodeInstagramProfiles",
	description: "Extract profile data from Instagram user URLs",
	inputLabel: "Profile URLs",
	inputDescription:
		"Instagram profile URLs (instagram.com/username) — one per line or comma-separated",
	inputPlaceholder: "https://instagram.com/username",
	creditCost: 4,
	platform: "instagram",
	allowedDomains: ["instagram.com"],
}) {}
