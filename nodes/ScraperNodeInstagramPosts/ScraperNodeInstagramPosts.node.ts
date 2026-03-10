import { buildScraperNodeClass } from "../shared/scraperNode";

export class ScraperNodeInstagramPosts extends buildScraperNodeClass({
	scraperId: "instagram-posts",
	displayName: "ScraperNode Instagram Posts",
	nodeName: "scraperNodeInstagramPosts",
	description: "Extract posts with media data from Instagram post URLs",
	inputLabel: "Post URLs",
	inputDescription:
		"Instagram post URLs (instagram.com/p/id or /reel/id) — one per line or comma-separated",
	inputPlaceholder: "https://instagram.com/p/ABC123",
	creditCost: 3,
	platform: "instagram",
	allowedDomains: ["instagram.com"],
}) {}
