import { buildScraperNodeClass } from "../shared/scraperNode";

export class ScraperNodeYouTubeChannels extends buildScraperNodeClass({
	scraperId: "youtube-channels",
	displayName: "ScraperNode YouTube Channels",
	nodeName: "scraperNodeYouTubeChannels",
	description: "Extract channel data from YouTube channel URLs",
	inputLabel: "Channel URLs",
	inputDescription: "YouTube channel URLs — one per line or comma-separated",
	inputPlaceholder: "https://youtube.com/@channel",
	creditCost: 4,
	platform: "youtube",
	allowedDomains: ["youtube.com", "youtu.be"],
}) {}
