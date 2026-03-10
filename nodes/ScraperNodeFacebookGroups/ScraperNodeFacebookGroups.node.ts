import { buildScraperNodeClass } from "../shared/scraperNode";

export class ScraperNodeFacebookGroups extends buildScraperNodeClass({
	scraperId: "facebook-groups",
	displayName: "ScraperNode Facebook Groups",
	nodeName: "scraperNodeFacebookGroups",
	description: "Extract group posts from Facebook group URLs",
	inputLabel: "Group URLs",
	inputDescription:
		"Facebook group URLs (facebook.com/groups/name) — one per line or comma-separated",
	inputPlaceholder: "https://facebook.com/groups/groupname",
	creditCost: 3,
	platform: "facebook",
	allowedDomains: ["facebook.com", "fb.com"],
}) {}
