import { buildScraperNodeClass } from "../shared/scraperNode";

export class ScraperNodeGlassdoorReviews extends buildScraperNodeClass({
	scraperId: "glassdoor-reviews",
	displayName: "ScraperNode Glassdoor Reviews",
	nodeName: "scraperNodeGlassdoorReviews",
	description: "Extract employee reviews from Glassdoor review pages",
	inputLabel: "Review URLs",
	inputDescription:
		"Glassdoor review page URLs — one per line or comma-separated",
	inputPlaceholder:
		"https://glassdoor.com/Reviews/Acme-Corp-Reviews-E12345.htm",
	creditCost: 5,
	platform: "glassdoor",
	allowedDomains: [
		"glassdoor.com",
		"glassdoor.ca",
		"glassdoor.co.uk",
		"glassdoor.co.in",
		"glassdoor.com.au",
		"glassdoor.de",
		"glassdoor.fr",
	],
}) {}
