import { buildScraperNodeClass } from "../shared/scraperNode";

export class ScraperNodeGlassdoorCompanies extends buildScraperNodeClass({
	scraperId: "glassdoor-companies",
	displayName: "ScraperNode Glassdoor Companies",
	nodeName: "scraperNodeGlassdoorCompanies",
	description:
		"Extract company profiles with ratings from Glassdoor company pages",
	inputLabel: "Company URLs",
	inputDescription:
		"Glassdoor company page URLs — one per line or comma-separated",
	inputPlaceholder: "https://glassdoor.com/Overview/Working-at-Acme-Corp",
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
