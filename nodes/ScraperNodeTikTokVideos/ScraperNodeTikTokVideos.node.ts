import { buildScraperNodeClass } from "../shared/scraperNode";

export class ScraperNodeTikTokVideos extends buildScraperNodeClass({
	scraperId: "tiktok-posts",
	displayName: "ScraperNode TikTok Videos",
	nodeName: "scraperNodeTikTokVideos",
	description: "Extract video data from TikTok video URLs",
	inputLabel: "Video URLs",
	inputDescription:
		"TikTok video URLs (tiktok.com/@user/video/id) — one per line or comma-separated",
	inputPlaceholder: "https://tiktok.com/@user/video/123456",
	creditCost: 3,
	platform: "tiktok",
	allowedDomains: ["tiktok.com"],
}) {}
