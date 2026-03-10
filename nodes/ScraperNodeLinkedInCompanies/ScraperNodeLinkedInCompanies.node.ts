import { buildScraperNodeClass } from "../shared/scraperNode";

export class ScraperNodeLinkedInCompanies extends buildScraperNodeClass({
	scraperId: "linkedin-companies",
	displayName: "ScraperNode LinkedIn Companies",
	nodeName: "scraperNodeLinkedInCompanies",
	description: "Extract company data from LinkedIn company page URLs",
	inputLabel: "Company URLs",
	inputDescription:
		"LinkedIn company URLs (linkedin.com/company/name) — one per line or comma-separated",
	inputPlaceholder: "https://linkedin.com/company/acme",
	creditCost: 5,
	platform: "linkedin",
	allowedDomains: ["linkedin.com"],
}) {}
