import type { INodeType } from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";
import { describe, expect, it, vi } from "vitest";
import { ScraperNodeCrunchbaseCompanies } from "../../nodes/ScraperNodeCrunchbaseCompanies/ScraperNodeCrunchbaseCompanies.node";
import { ScraperNodeFacebookComments } from "../../nodes/ScraperNodeFacebookComments/ScraperNodeFacebookComments.node";
import { ScraperNodeFacebookCompanyReviews } from "../../nodes/ScraperNodeFacebookCompanyReviews/ScraperNodeFacebookCompanyReviews.node";
import { ScraperNodeFacebookEvents } from "../../nodes/ScraperNodeFacebookEvents/ScraperNodeFacebookEvents.node";
import { ScraperNodeFacebookGroups } from "../../nodes/ScraperNodeFacebookGroups/ScraperNodeFacebookGroups.node";
import { ScraperNodeFacebookMarketplace } from "../../nodes/ScraperNodeFacebookMarketplace/ScraperNodeFacebookMarketplace.node";
import { ScraperNodeFacebookPagesAndProfiles } from "../../nodes/ScraperNodeFacebookPagesAndProfiles/ScraperNodeFacebookPagesAndProfiles.node";
import { ScraperNodeFacebookPersonalProfiles } from "../../nodes/ScraperNodeFacebookPersonalProfiles/ScraperNodeFacebookPersonalProfiles.node";
import { ScraperNodeFacebookPosts } from "../../nodes/ScraperNodeFacebookPosts/ScraperNodeFacebookPosts.node";
import { ScraperNodeFacebookProfiles } from "../../nodes/ScraperNodeFacebookProfiles/ScraperNodeFacebookProfiles.node";
import { ScraperNodeFacebookReels } from "../../nodes/ScraperNodeFacebookReels/ScraperNodeFacebookReels.node";
import { ScraperNodeG2Reviews } from "../../nodes/ScraperNodeG2Reviews/ScraperNodeG2Reviews.node";
import { ScraperNodeGitHubRepositories } from "../../nodes/ScraperNodeGitHubRepositories/ScraperNodeGitHubRepositories.node";
import { ScraperNodeGlassdoorCompanies } from "../../nodes/ScraperNodeGlassdoorCompanies/ScraperNodeGlassdoorCompanies.node";
import { ScraperNodeGlassdoorJobs } from "../../nodes/ScraperNodeGlassdoorJobs/ScraperNodeGlassdoorJobs.node";
import { ScraperNodeGlassdoorReviews } from "../../nodes/ScraperNodeGlassdoorReviews/ScraperNodeGlassdoorReviews.node";
import { ScraperNodeGoogleFlightsSearch } from "../../nodes/ScraperNodeGoogleFlightsSearch/ScraperNodeGoogleFlightsSearch.node";
import { ScraperNodeGoogleHotelsSearch } from "../../nodes/ScraperNodeGoogleHotelsSearch/ScraperNodeGoogleHotelsSearch.node";
import { ScraperNodeGoogleMapsListings } from "../../nodes/ScraperNodeGoogleMapsListings/ScraperNodeGoogleMapsListings.node";
import { ScraperNodeGoogleMapsReviews } from "../../nodes/ScraperNodeGoogleMapsReviews/ScraperNodeGoogleMapsReviews.node";
import { ScraperNodeGoogleSearchAi } from "../../nodes/ScraperNodeGoogleSearchAi/ScraperNodeGoogleSearchAi.node";
import { ScraperNodeGoogleSearchResults } from "../../nodes/ScraperNodeGoogleSearchResults/ScraperNodeGoogleSearchResults.node";
import { ScraperNodeGoogleShoppingProducts } from "../../nodes/ScraperNodeGoogleShoppingProducts/ScraperNodeGoogleShoppingProducts.node";
import { ScraperNodeGoogleShoppingSearch } from "../../nodes/ScraperNodeGoogleShoppingSearch/ScraperNodeGoogleShoppingSearch.node";
import { ScraperNodeIndeedCompanies } from "../../nodes/ScraperNodeIndeedCompanies/ScraperNodeIndeedCompanies.node";
import { ScraperNodeIndeedJobs } from "../../nodes/ScraperNodeIndeedJobs/ScraperNodeIndeedJobs.node";
import { ScraperNodeInstagramComments } from "../../nodes/ScraperNodeInstagramComments/ScraperNodeInstagramComments.node";
import { ScraperNodeInstagramPosts } from "../../nodes/ScraperNodeInstagramPosts/ScraperNodeInstagramPosts.node";
import { ScraperNodeInstagramProfiles } from "../../nodes/ScraperNodeInstagramProfiles/ScraperNodeInstagramProfiles.node";
import { ScraperNodeInstagramReels } from "../../nodes/ScraperNodeInstagramReels/ScraperNodeInstagramReels.node";
import { ScraperNodeLinkedInCompanies } from "../../nodes/ScraperNodeLinkedInCompanies/ScraperNodeLinkedInCompanies.node";
import { ScraperNodeLinkedInJobs } from "../../nodes/ScraperNodeLinkedInJobs/ScraperNodeLinkedInJobs.node";
import { ScraperNodeLinkedInPeopleSearch } from "../../nodes/ScraperNodeLinkedInPeopleSearch/ScraperNodeLinkedInPeopleSearch.node";
import { ScraperNodeLinkedInPosts } from "../../nodes/ScraperNodeLinkedInPosts/ScraperNodeLinkedInPosts.node";
import { ScraperNodeLinkedInProfiles } from "../../nodes/ScraperNodeLinkedInProfiles/ScraperNodeLinkedInProfiles.node";
import { ScraperNodeMartindaleLawyers } from "../../nodes/ScraperNodeMartindaleLawyers/ScraperNodeMartindaleLawyers.node";
import { ScraperNodeOwlerCompanies } from "../../nodes/ScraperNodeOwlerCompanies/ScraperNodeOwlerCompanies.node";
import { ScraperNodePitchBookCompanies } from "../../nodes/ScraperNodePitchBookCompanies/ScraperNodePitchBookCompanies.node";
import { ScraperNodeTikTokComments } from "../../nodes/ScraperNodeTikTokComments/ScraperNodeTikTokComments.node";
import { ScraperNodeTikTokPostsByProfile } from "../../nodes/ScraperNodeTikTokPostsByProfile/ScraperNodeTikTokPostsByProfile.node";
import { ScraperNodeTikTokPostsBySearch } from "../../nodes/ScraperNodeTikTokPostsBySearch/ScraperNodeTikTokPostsBySearch.node";
import { ScraperNodeTikTokPostsByUrl } from "../../nodes/ScraperNodeTikTokPostsByUrl/ScraperNodeTikTokPostsByUrl.node";
import { ScraperNodeTikTokProfiles } from "../../nodes/ScraperNodeTikTokProfiles/ScraperNodeTikTokProfiles.node";
import { ScraperNodeTikTokShop } from "../../nodes/ScraperNodeTikTokShop/ScraperNodeTikTokShop.node";
import { ScraperNodeTikTokShopCategories } from "../../nodes/ScraperNodeTikTokShopCategories/ScraperNodeTikTokShopCategories.node";
import { ScraperNodeTikTokVideos } from "../../nodes/ScraperNodeTikTokVideos/ScraperNodeTikTokVideos.node";
import { ScraperNodeTrustRadiusReviews } from "../../nodes/ScraperNodeTrustRadiusReviews/ScraperNodeTrustRadiusReviews.node";
import { ScraperNodeTrustpilotReviews } from "../../nodes/ScraperNodeTrustpilotReviews/ScraperNodeTrustpilotReviews.node";
import { ScraperNodeTwitterPosts } from "../../nodes/ScraperNodeTwitterPosts/ScraperNodeTwitterPosts.node";
import { ScraperNodeTwitterProfiles } from "../../nodes/ScraperNodeTwitterProfiles/ScraperNodeTwitterProfiles.node";
import { ScraperNodeVentureRadarCompanies } from "../../nodes/ScraperNodeVentureRadarCompanies/ScraperNodeVentureRadarCompanies.node";
import { ScraperNodeXingProfiles } from "../../nodes/ScraperNodeXingProfiles/ScraperNodeXingProfiles.node";
import { ScraperNodeYelpBusinesses } from "../../nodes/ScraperNodeYelpBusinesses/ScraperNodeYelpBusinesses.node";
import { ScraperNodeYelpReviews } from "../../nodes/ScraperNodeYelpReviews/ScraperNodeYelpReviews.node";
import { ScraperNodeYouTubeChannels } from "../../nodes/ScraperNodeYouTubeChannels/ScraperNodeYouTubeChannels.node";
import { ScraperNodeYouTubeComments } from "../../nodes/ScraperNodeYouTubeComments/ScraperNodeYouTubeComments.node";
import { ScraperNodeYouTubeVideos } from "../../nodes/ScraperNodeYouTubeVideos/ScraperNodeYouTubeVideos.node";
import { ScraperNodeZoomInfoCompanies } from "../../nodes/ScraperNodeZoomInfoCompanies/ScraperNodeZoomInfoCompanies.node";
import {
	mockCreateJobResponse,
	mockJobCompleted,
	mockJobProcessing,
	mockResults,
} from "../mocks/mockData";
import {
	createMockExecuteFunctions,
	type MockedExecuteFunctions,
} from "../mocks/mockExecuteFunctions";

/** Helper to call execute with proper type casts for factory-generated nodes. */
async function exec(node: INodeType, mock: MockedExecuteFunctions) {
	return (await node.execute!.call(mock)) as unknown as {
		json: Record<string, unknown>;
		pairedItem?: unknown;
	}[][];
}

interface ScraperTestCase {
	name: string;
	NodeClass: new () => INodeType;
	scraperId: string;
	sampleUrl: string;
	inputField?: "url" | "keyword";
}

const SCRAPERS: ScraperTestCase[] = [
	{
		name: "ScraperNodeLinkedInProfiles",
		NodeClass: ScraperNodeLinkedInProfiles,
		scraperId: "linkedin-profiles",
		sampleUrl: "https://linkedin.com/in/janedoe",
	},
	{
		name: "ScraperNodeLinkedInCompanies",
		NodeClass: ScraperNodeLinkedInCompanies,
		scraperId: "linkedin-companies",
		sampleUrl: "https://linkedin.com/company/acme",
	},
	{
		name: "ScraperNodeLinkedInPosts",
		NodeClass: ScraperNodeLinkedInPosts,
		scraperId: "linkedin-posts",
		sampleUrl: "https://linkedin.com/in/janedoe",
	},
	{
		name: "ScraperNodeInstagramProfiles",
		NodeClass: ScraperNodeInstagramProfiles,
		scraperId: "instagram-profiles",
		sampleUrl: "https://instagram.com/username",
	},
	{
		name: "ScraperNodeInstagramPosts",
		NodeClass: ScraperNodeInstagramPosts,
		scraperId: "instagram-posts",
		sampleUrl: "https://instagram.com/p/ABC123",
	},
	{
		name: "ScraperNodeInstagramComments",
		NodeClass: ScraperNodeInstagramComments,
		scraperId: "instagram-comments",
		sampleUrl: "https://instagram.com/p/ABC123",
	},
	{
		name: "ScraperNodeTikTokProfiles",
		NodeClass: ScraperNodeTikTokProfiles,
		scraperId: "tiktok-profiles",
		sampleUrl: "https://tiktok.com/@username",
	},
	{
		name: "ScraperNodeTikTokVideos",
		NodeClass: ScraperNodeTikTokVideos,
		scraperId: "tiktok-posts",
		sampleUrl: "https://tiktok.com/@user/video/123",
	},
	{
		name: "ScraperNodeTwitterProfiles",
		NodeClass: ScraperNodeTwitterProfiles,
		scraperId: "twitter-profiles",
		sampleUrl: "https://x.com/username",
	},
	{
		name: "ScraperNodeTwitterPosts",
		NodeClass: ScraperNodeTwitterPosts,
		scraperId: "twitter-posts",
		sampleUrl: "https://x.com/user/status/123",
	},
	{
		name: "ScraperNodeYouTubeChannels",
		NodeClass: ScraperNodeYouTubeChannels,
		scraperId: "youtube-channels",
		sampleUrl: "https://youtube.com/@channel",
	},
	{
		name: "ScraperNodeYouTubeComments",
		NodeClass: ScraperNodeYouTubeComments,
		scraperId: "youtube-comments",
		sampleUrl: "https://youtube.com/watch?v=abc123",
	},
	{
		name: "ScraperNodeFacebookProfiles",
		NodeClass: ScraperNodeFacebookProfiles,
		scraperId: "facebook-profiles",
		sampleUrl: "https://facebook.com/username",
	},
	{
		name: "ScraperNodeFacebookGroups",
		NodeClass: ScraperNodeFacebookGroups,
		scraperId: "facebook-groups",
		sampleUrl: "https://facebook.com/groups/groupname",
	},
	{
		name: "ScraperNodeIndeedJobs",
		NodeClass: ScraperNodeIndeedJobs,
		scraperId: "indeed-jobs",
		sampleUrl: "https://indeed.com/viewjob?jk=abc123",
	},
	{
		name: "ScraperNodeIndeedCompanies",
		NodeClass: ScraperNodeIndeedCompanies,
		scraperId: "indeed-companies",
		sampleUrl: "https://indeed.com/cmp/Acme-Corp",
	},
	{
		name: "ScraperNodeGlassdoorCompanies",
		NodeClass: ScraperNodeGlassdoorCompanies,
		scraperId: "glassdoor-companies",
		sampleUrl: "https://glassdoor.com/Overview/Working-at-Acme-Corp",
	},
	{
		name: "ScraperNodeGlassdoorReviews",
		NodeClass: ScraperNodeGlassdoorReviews,
		scraperId: "glassdoor-reviews",
		sampleUrl: "https://glassdoor.com/Reviews/Acme-Corp-Reviews-E12345.htm",
	},
	{
		name: "ScraperNodeGlassdoorJobs",
		NodeClass: ScraperNodeGlassdoorJobs,
		scraperId: "glassdoor-jobs",
		sampleUrl:
			"https://glassdoor.com/Job/acme-corp-software-engineer-JV12345.htm",
	},
	{
		name: "ScraperNodeYelpBusinesses",
		NodeClass: ScraperNodeYelpBusinesses,
		scraperId: "yelp-businesses",
		sampleUrl: "https://yelp.com/biz/acme-restaurant-new-york",
	},
	{
		name: "ScraperNodeYelpReviews",
		NodeClass: ScraperNodeYelpReviews,
		scraperId: "yelp-reviews",
		sampleUrl: "https://yelp.com/biz/acme-restaurant-new-york",
	},
	{
		name: "ScraperNodeGitHubRepositories",
		NodeClass: ScraperNodeGitHubRepositories,
		scraperId: "github-repositories",
		sampleUrl: "https://github.com/owner/repo",
	},
	{
		name: "ScraperNodeCrunchbaseCompanies",
		NodeClass: ScraperNodeCrunchbaseCompanies,
		scraperId: "crunchbase-companies",
		sampleUrl: "https://crunchbase.com/organization/acme-corp",
	},
	// 8 existing nodes missing from test coverage
	{
		name: "ScraperNodeLinkedInJobs",
		NodeClass: ScraperNodeLinkedInJobs,
		scraperId: "linkedin-jobs",
		sampleUrl: "https://linkedin.com/jobs/view/1234567890",
	},
	{
		name: "ScraperNodeLinkedInPeopleSearch",
		NodeClass: ScraperNodeLinkedInPeopleSearch,
		scraperId: "linkedin-people-search",
		sampleUrl: "https://linkedin.com/search/results/people/",
	},
	{
		name: "ScraperNodeInstagramReels",
		NodeClass: ScraperNodeInstagramReels,
		scraperId: "instagram-reels",
		sampleUrl: "https://instagram.com/reel/ABC123",
	},
	{
		name: "ScraperNodeTikTokComments",
		NodeClass: ScraperNodeTikTokComments,
		scraperId: "tiktok-comments",
		sampleUrl: "https://tiktok.com/@user/video/123456",
	},
	{
		name: "ScraperNodeYouTubeVideos",
		NodeClass: ScraperNodeYouTubeVideos,
		scraperId: "youtube-videos",
		sampleUrl: "https://youtube.com/watch?v=abc123",
	},
	{
		name: "ScraperNodeFacebookComments",
		NodeClass: ScraperNodeFacebookComments,
		scraperId: "facebook-comments",
		sampleUrl: "https://facebook.com/username",
	},
	{
		name: "ScraperNodeFacebookPosts",
		NodeClass: ScraperNodeFacebookPosts,
		scraperId: "facebook-posts",
		sampleUrl: "https://facebook.com/username",
	},
	{
		name: "ScraperNodeFacebookReels",
		NodeClass: ScraperNodeFacebookReels,
		scraperId: "facebook-reels",
		sampleUrl: "https://facebook.com/username",
	},
	// 27 new nodes
	{
		name: "ScraperNodeTikTokPostsByUrl",
		NodeClass: ScraperNodeTikTokPostsByUrl,
		scraperId: "tiktok-posts-by-url",
		sampleUrl: "https://tiktok.com/@user/video/1234567890",
	},
	{
		name: "ScraperNodeTikTokPostsByProfile",
		NodeClass: ScraperNodeTikTokPostsByProfile,
		scraperId: "tiktok-posts-by-profile",
		sampleUrl: "https://tiktok.com/@username",
	},
	{
		name: "ScraperNodeTikTokPostsBySearch",
		NodeClass: ScraperNodeTikTokPostsBySearch,
		scraperId: "tiktok-posts-by-search",
		sampleUrl: "https://tiktok.com/search?q=keyword",
	},
	{
		name: "ScraperNodeTikTokShop",
		NodeClass: ScraperNodeTikTokShop,
		scraperId: "tiktok-shop",
		sampleUrl: "https://tiktok.com/shop/product/123456",
	},
	{
		name: "ScraperNodeTikTokShopCategories",
		NodeClass: ScraperNodeTikTokShopCategories,
		scraperId: "tiktok-shop-categories",
		sampleUrl: "https://tiktok.com/shop/category/123456",
	},
	{
		name: "ScraperNodeFacebookPagesAndProfiles",
		NodeClass: ScraperNodeFacebookPagesAndProfiles,
		scraperId: "facebook-pages-and-profiles",
		sampleUrl: "https://facebook.com/pagename",
	},
	{
		name: "ScraperNodeFacebookPersonalProfiles",
		NodeClass: ScraperNodeFacebookPersonalProfiles,
		scraperId: "facebook-personal-profiles",
		sampleUrl: "https://facebook.com/username",
	},
	{
		name: "ScraperNodeFacebookMarketplace",
		NodeClass: ScraperNodeFacebookMarketplace,
		scraperId: "facebook-marketplace",
		sampleUrl: "https://facebook.com/marketplace/item/123456",
	},
	{
		name: "ScraperNodeFacebookEvents",
		NodeClass: ScraperNodeFacebookEvents,
		scraperId: "facebook-events",
		sampleUrl: "https://facebook.com/events/123456789",
	},
	{
		name: "ScraperNodeFacebookCompanyReviews",
		NodeClass: ScraperNodeFacebookCompanyReviews,
		scraperId: "facebook-company-reviews",
		sampleUrl: "https://facebook.com/company-page",
	},
	{
		name: "ScraperNodeGoogleMapsListings",
		NodeClass: ScraperNodeGoogleMapsListings,
		scraperId: "google-maps-listings",
		sampleUrl: "https://google.com/maps/place/acme-corp",
	},
	{
		name: "ScraperNodeGoogleMapsReviews",
		NodeClass: ScraperNodeGoogleMapsReviews,
		scraperId: "google-maps-reviews",
		sampleUrl: "https://google.com/maps/place/acme-corp",
	},
	{
		name: "ScraperNodeGoogleSearchResults",
		NodeClass: ScraperNodeGoogleSearchResults,
		scraperId: "google-search-results",
		sampleUrl: "best CRM software for startups",
		inputField: "keyword",
	},
	{
		name: "ScraperNodeGoogleSearchAi",
		NodeClass: ScraperNodeGoogleSearchAi,
		scraperId: "google-search-ai",
		sampleUrl: "what is the best project management tool",
		inputField: "keyword",
	},
	{
		name: "ScraperNodeGoogleShoppingProducts",
		NodeClass: ScraperNodeGoogleShoppingProducts,
		scraperId: "google-shopping-products",
		sampleUrl: "https://google.com/shopping/product/123456",
	},
	{
		name: "ScraperNodeGoogleShoppingSearch",
		NodeClass: ScraperNodeGoogleShoppingSearch,
		scraperId: "google-shopping-search",
		sampleUrl: "standing desk adjustable",
		inputField: "keyword",
	},
	{
		name: "ScraperNodeGoogleFlightsSearch",
		NodeClass: ScraperNodeGoogleFlightsSearch,
		scraperId: "google-flights-search",
		sampleUrl: "https://google.com/travel/flights/search?tfs=abc123",
	},
	{
		name: "ScraperNodeGoogleHotelsSearch",
		NodeClass: ScraperNodeGoogleHotelsSearch,
		scraperId: "google-hotels-search",
		sampleUrl: "https://google.com/travel/hotels/search",
	},
	{
		name: "ScraperNodeZoomInfoCompanies",
		NodeClass: ScraperNodeZoomInfoCompanies,
		scraperId: "zoominfo-companies",
		sampleUrl: "https://zoominfo.com/c/acme-corp/123456789",
	},
	{
		name: "ScraperNodeTrustpilotReviews",
		NodeClass: ScraperNodeTrustpilotReviews,
		scraperId: "trustpilot-reviews",
		sampleUrl: "https://trustpilot.com/review/acme.com",
	},
	{
		name: "ScraperNodeG2Reviews",
		NodeClass: ScraperNodeG2Reviews,
		scraperId: "g2-reviews",
		sampleUrl: "https://g2.com/products/acme-crm/reviews",
	},
	{
		name: "ScraperNodePitchBookCompanies",
		NodeClass: ScraperNodePitchBookCompanies,
		scraperId: "pitchbook-companies",
		sampleUrl: "https://pitchbook.com/profiles/company/12345-67",
	},
	{
		name: "ScraperNodeXingProfiles",
		NodeClass: ScraperNodeXingProfiles,
		scraperId: "xing-profiles",
		sampleUrl: "https://xing.com/profile/john_doe",
	},
	{
		name: "ScraperNodeOwlerCompanies",
		NodeClass: ScraperNodeOwlerCompanies,
		scraperId: "owler-companies",
		sampleUrl: "https://owler.com/company/acme-corp",
	},
	{
		name: "ScraperNodeMartindaleLawyers",
		NodeClass: ScraperNodeMartindaleLawyers,
		scraperId: "martindale-lawyers",
		sampleUrl: "https://martindale.com/attorney/john-doe-12345",
	},
	{
		name: "ScraperNodeVentureRadarCompanies",
		NodeClass: ScraperNodeVentureRadarCompanies,
		scraperId: "ventureradar-companies",
		sampleUrl: "https://ventureradar.com/company/acme-corp/123456",
	},
	{
		name: "ScraperNodeTrustRadiusReviews",
		NodeClass: ScraperNodeTrustRadiusReviews,
		scraperId: "trustradius-reviews",
		sampleUrl: "https://trustradius.com/products/acme-crm/reviews",
	},
];

for (const { name, NodeClass, scraperId, sampleUrl, inputField = "url" } of SCRAPERS) {
	describe(name, () => {
		const node = new NodeClass();

		it("should have usableAsTool enabled", () => {
			expect(node.description.usableAsTool).toBe(true);
		});

		it("should have create, get, and getResults operations", () => {
			const opProp = node.description.properties.find(
				(p) => p.name === "operation"
			);
			expect(opProp).toBeDefined();
			const values = (opProp!.options as Array<{ value: string }>).map(
				(o) => o.value
			);
			expect(values).toContain("create");
			expect(values).toContain("get");
			expect(values).toContain("getResults");
		});

		it("should POST to /api/jobs/create with correct scraperId", async () => {
			const mock = createMockExecuteFunctions({
				nodeParameters: {
					operation: "create",
					"inputs.input": [{ [inputField]: sampleUrl }],
					jobName: "",
					waitForCompletion: false,
				},
				httpHandler: () => mockCreateJobResponse,
			});

			await exec(node, mock);

			const call = mock.helpers.httpRequestWithAuthentication.mock.calls[0];
			const request = call[1] as {
				method: string;
				url: string;
				body: { scraperId: string; inputs: Record<string, string>[] };
			};
			expect(request.method).toBe("POST");
			expect(request.url).toContain("/api/jobs/create");
			expect(request.body.scraperId).toBe(scraperId);
			expect(request.body.inputs).toEqual([{ [inputField]: sampleUrl }]);
		});

		it("should handle multiple input rows", async () => {
			const mock = createMockExecuteFunctions({
				nodeParameters: {
					operation: "create",
					"inputs.input": [
						{ [inputField]: sampleUrl },
						{ [inputField]: `${sampleUrl}?v=2` },
					],
					jobName: "",
					waitForCompletion: false,
				},
				httpHandler: () => mockCreateJobResponse,
			});

			await exec(node, mock);

			const call = mock.helpers.httpRequestWithAuthentication.mock.calls[0];
			const body = (call[1] as { body: { inputs: unknown[] } }).body;
			expect(body.inputs).toHaveLength(2);
		});

		it("should throw on empty inputs", async () => {
			const mock = createMockExecuteFunctions({
				nodeParameters: {
					operation: "create",
					"inputs.input": [],
					jobName: "",
					waitForCompletion: false,
				},
			});

			await expect(exec(node, mock)).rejects.toThrow(NodeOperationError);
		});

		if (inputField !== "keyword") {
			it("should reject URLs without http(s) protocol", async () => {
				const mock = createMockExecuteFunctions({
					nodeParameters: {
						operation: "create",
						"inputs.input": [{ url: "not-a-url" }],
						jobName: "",
						waitForCompletion: false,
					},
				});

				await expect(exec(node, mock)).rejects.toThrow(/must start with http/);
			});

			it("should reject URLs from the wrong platform", async () => {
				const wrongUrl = name.includes("LinkedIn")
					? "https://instagram.com/wrong"
					: "https://linkedin.com/in/wrong";
				const mock = createMockExecuteFunctions({
					nodeParameters: {
						operation: "create",
						"inputs.input": [{ url: wrongUrl }],
						jobName: "",
						waitForCompletion: false,
					},
				});

				await expect(exec(node, mock)).rejects.toThrow(/Wrong platform/);
			});

			it("should accept subdomain URLs for the platform", async () => {
				const subdomainUrl = sampleUrl.replace("://", "://www.");
				const mock = createMockExecuteFunctions({
					nodeParameters: {
						operation: "create",
						"inputs.input": [{ [inputField]: subdomainUrl }],
						jobName: "",
						waitForCompletion: false,
					},
					httpHandler: () => mockCreateJobResponse,
				});

				const result = await exec(node, mock);
				expect(result[0][0].json).toHaveProperty("jobId");
			});
		}

		it("should get job by ID", async () => {
			const mockJob = { job: { _id: "j1", status: "completed" } };
			const mock = createMockExecuteFunctions({
				nodeParameters: { operation: "get", jobId: "j1" },
				httpHandler: () => mockJob,
			});

			const result = await exec(node, mock);

			expect(result[0][0].json).toEqual(mockJob.job);
		});

		it("should get results by job ID", async () => {
			const mock = createMockExecuteFunctions({
				nodeParameters: {
					operation: "getResults",
					jobId: "j1",
					returnAll: false,
					limit: 50,
				},
				httpHandler: () => mockResults,
			});

			const result = await exec(node, mock);

			expect(result[0]).toHaveLength(2);
			expect(result[0][0].json).toMatchObject({ name: "Jane Doe" });
		});

		it("should poll and return results when waitForCompletion is true", async () => {
			vi.useFakeTimers({ shouldAdvanceTime: true });

			let pollCount = 0;
			const mock = createMockExecuteFunctions({
				nodeParameters: {
					operation: "create",
					"inputs.input": [{ [inputField]: sampleUrl }],
					jobName: "",
					waitForCompletion: true,
					pollInterval: 1,
					maxWait: 30,
					resultLimit: 1000,
				},
				httpHandler: (req) => {
					if (req.method === "POST") return mockCreateJobResponse;
					if (req.url.includes("/api/jobs/get")) {
						pollCount++;
						if (pollCount <= 1) return mockJobProcessing;
						return mockJobCompleted;
					}
					if (req.url.includes("/api/jobs/results")) return mockResults;
					return {};
				},
			});

			const result = await exec(node, mock);
			vi.useRealTimers();

			expect(result[0].length).toBe(2);
			expect(result[0][0].json).toMatchObject({
				_jobId: "job_abc123",
				_scraperId: scraperId,
			});
		});
	});
}
