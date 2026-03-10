import { buildScraperNodeClass } from "../shared/scraperNode";

export class ScraperNodeCrunchbaseCompanies extends buildScraperNodeClass({
	scraperId: "crunchbase-companies",
	displayName: "ScraperNode Crunchbase Companies",
	nodeName: "scraperNodeCrunchbaseCompanies",
	description:
		"Extract company data with funding information from Crunchbase company pages",
	inputLabel: "Company URLs",
	inputDescription:
		"Crunchbase company page URLs — one per line or comma-separated",
	inputPlaceholder: "https://crunchbase.com/organization/acme-corp",
	creditCost: 5,
	platform: "crunchbase",
	allowedDomains: ["crunchbase.com"],
}) {}
