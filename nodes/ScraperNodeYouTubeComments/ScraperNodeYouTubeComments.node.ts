import { buildScraperNodeClass } from "../shared/scraperNode";

export class ScraperNodeYouTubeComments extends buildScraperNodeClass({
	scraperId: "youtube-comments",
	displayName: "ScraperNode YouTube Comments",
	nodeName: "scraperNodeYouTubeComments",
	description: "Extract comments from YouTube video URLs",
	inputLabel: "Video URLs",
	inputDescription:
		"YouTube video URLs to scrape comments from — one per line or comma-separated",
	inputPlaceholder: "https://youtube.com/watch?v=abc123",
	creditCost: 2,
	platform: "youtube",
	allowedDomains: ["youtube.com", "youtu.be"],
}) {}
