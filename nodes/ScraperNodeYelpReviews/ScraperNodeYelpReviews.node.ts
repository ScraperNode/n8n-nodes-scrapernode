import { buildScraperNodeClass } from "../shared/scraperNode";

export class ScraperNodeYelpReviews extends buildScraperNodeClass({
	scraperId: "yelp-reviews",
	displayName: "ScraperNode Yelp Reviews",
	nodeName: "scraperNodeYelpReviews",
	description: "Extract customer reviews from Yelp business review pages",
	inputLabel: "Review URLs",
	inputDescription:
		"Yelp business page URLs — one per line or comma-separated",
	inputPlaceholder: "https://yelp.com/biz/acme-restaurant-new-york",
	creditCost: 5,
	platform: "yelp",
	allowedDomains: [
		"yelp.com",
		"yelp.ca",
		"yelp.co.uk",
		"yelp.de",
		"yelp.fr",
		"yelp.com.au",
	],
}) {}
