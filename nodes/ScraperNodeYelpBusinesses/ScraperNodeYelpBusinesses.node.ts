import { buildScraperNodeClass } from "../shared/scraperNode";

export class ScraperNodeYelpBusinesses extends buildScraperNodeClass({
	scraperId: "yelp-businesses",
	displayName: "ScraperNode Yelp Businesses",
	nodeName: "scraperNodeYelpBusinesses",
	description:
		"Extract business profiles with ratings from Yelp business pages",
	inputLabel: "Business URLs",
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
