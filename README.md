# n8n-nodes-scrapernode

[![npm version](https://img.shields.io/npm/v/n8n-nodes-scrapernode.svg)](https://www.npmjs.com/package/n8n-nodes-scrapernode)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[n8n](https://n8n.io/) community nodes for [**ScraperNode**](https://scrapernode.com) — extract structured data from LinkedIn, Instagram, TikTok, Twitter/X, YouTube, Facebook, Indeed, Glassdoor, Yelp, GitHub, and Crunchbase directly inside your n8n workflows.

> **58 scraper nodes** | **25 platforms** | **AI Agent compatible** | **Pay-per-scrape credits**

[Website](https://scrapernode.com) | [API Docs](https://scrapernode.com/docs/api) | [Get API Key](https://scrapernode.com/settings) | [npm](https://www.npmjs.com/package/n8n-nodes-scrapernode) | [Report Issues](https://github.com/ScraperNode/n8n-nodes-scrapernode/issues)

---

## Installation

### From the n8n UI (recommended)

1. Open your n8n instance
2. Go to **Settings > Community Nodes**
3. Select **Install a community node**
4. Enter `n8n-nodes-scrapernode`
5. Agree to the risks and click **Install**

After installation, the ScraperNode nodes appear in the node palette when you search "ScraperNode".

### From the command line

```bash
# Inside your n8n installation directory
npm install n8n-nodes-scrapernode
```

Then restart n8n.

### Docker

If you run n8n via Docker, add the package to your `N8N_CUSTOM_EXTENSIONS` or install it in your custom Dockerfile:

```dockerfile
RUN cd /usr/local/lib/node_modules/n8n && npm install n8n-nodes-scrapernode
```

---

## Credentials

You need a ScraperNode API key to use these nodes.

1. Sign up at [scrapernode.com](https://scrapernode.com)
2. Go to **Settings > API Keys** in your [dashboard](https://scrapernode.com/settings)
3. Copy your API key (starts with `sn_...`)
4. In n8n, create a new **ScraperNode API** credential and paste your key

---

## Available Scrapers

### LinkedIn — [scrapernode.com/linkedin](https://scrapernode.com/linkedin)

| Node | Description | Fields | Cost |
|------|-------------|--------|------|
| [**Profiles**](https://scrapernode.com/linkedin/scrapers/profiles) | Extract professional profiles — experience, skills, education, certifications | 42 | 2 credits/row |
| [**Companies**](https://scrapernode.com/linkedin/scrapers/companies) | Extract company data — size, specialties, locations, follower counts | 10 | 2 credits/row |
| [**Posts**](https://scrapernode.com/linkedin/scrapers/posts) | Extract posts with engagement metrics — likes, comments, shares | 10 | 1 credit/row |
| [**Jobs**](https://scrapernode.com/linkedin/scrapers/jobs) | Extract job listings — title, salary, requirements, company details | 27 | 1 credit/row |
| [**People Search**](https://scrapernode.com/linkedin/scrapers/people-search) | Search and extract matching profiles by filters | 7 | 1 credit/row |

### Instagram — [scrapernode.com/instagram](https://scrapernode.com/instagram)

| Node | Description | Fields | Cost |
|------|-------------|--------|------|
| [**Profiles**](https://scrapernode.com/instagram/scrapers/profiles) | Extract profile data — followers, engagement rates, bio, contact info | 31 | 1 credit/row |
| [**Posts**](https://scrapernode.com/instagram/scrapers/posts) | Extract posts with captions, hashtags, engagement, media URLs | 29 | 1 credit/row |
| [**Comments**](https://scrapernode.com/instagram/scrapers/comments) | Extract comments with user details and sentiment data | 10 | 1 credit/row |
| [**Reels**](https://scrapernode.com/instagram/scrapers/reels) | Extract reels with views, engagement, audio, creator info | 27 | 1 credit/row |

### TikTok — [scrapernode.com/tiktok](https://scrapernode.com/tiktok)

| Node | Description | Fields | Cost |
|------|-------------|--------|------|
| [**Profiles**](https://scrapernode.com/tiktok/scrapers/profiles) | Extract creator profiles — followers, likes, video counts | 10 | 1 credit/row |
| [**Videos**](https://scrapernode.com/tiktok/scrapers/posts) | Extract videos with views, likes, shares, captions | 10 | 1 credit/row |
| [**Comments**](https://scrapernode.com/tiktok/scrapers/comments) | Extract comments with engagement and user details | 14 | 1 credit/row |

### Twitter/X — [scrapernode.com/twitter](https://scrapernode.com/twitter)

| Node | Description | Fields | Cost |
|------|-------------|--------|------|
| [**Profiles**](https://scrapernode.com/twitter/scrapers/profiles) | Extract profiles — followers, tweet count, bio, verification | 10 | 1 credit/row |
| [**Posts**](https://scrapernode.com/twitter/scrapers/posts) | Extract tweets with likes, retweets, replies, views | 10 | 1 credit/row |

### YouTube — [scrapernode.com/youtube](https://scrapernode.com/youtube)

| Node | Description | Fields | Cost |
|------|-------------|--------|------|
| [**Channels**](https://scrapernode.com/youtube/scrapers/channels) | Extract channel data — subscribers, views, video counts | 10 | 1 credit/row |
| [**Videos**](https://scrapernode.com/youtube/scrapers/videos) | Extract videos with transcripts, engagement, metadata | 43 | 1 credit/row |
| [**Comments**](https://scrapernode.com/youtube/scrapers/comments) | Extract comments with user details and engagement | 10 | 1 credit/row |

### Facebook — [scrapernode.com/facebook](https://scrapernode.com/facebook)

| Node | Description | Fields | Cost |
|------|-------------|--------|------|
| [**Profiles**](https://scrapernode.com/facebook/scrapers/profiles) | Extract page/profile data — followers, likes, contact info | 10 | 1 credit/row |
| [**Posts**](https://scrapernode.com/facebook/scrapers/posts) | Extract posts with engagement, media, reaction breakdowns | 36 | 1 credit/row |
| [**Comments**](https://scrapernode.com/facebook/scrapers/comments) | Extract comments with user details and replies | 22 | 1 credit/row |
| [**Groups**](https://scrapernode.com/facebook/scrapers/groups) | Extract group data — members, activity, admin details | 10 | 1 credit/row |
| [**Reels**](https://scrapernode.com/facebook/scrapers/reels) | Extract reels with views, engagement, audio data | 27 | 1 credit/row |

### Indeed — [scrapernode.com/indeed](https://scrapernode.com/indeed)

| Node | Description | Fields | Cost |
|------|-------------|--------|------|
| [**Jobs**](https://scrapernode.com/indeed/scrapers/jobs) | Extract job listings — salary, qualifications, company details | 25 | 1 credit/row |
| [**Companies**](https://scrapernode.com/indeed/scrapers/companies) | Extract company profiles — ratings, reviews, size, industry | 15 | 1 credit/row |

### Glassdoor — [scrapernode.com/glassdoor](https://scrapernode.com/glassdoor)

| Node | Description | Fields | Cost |
|------|-------------|--------|------|
| [**Companies**](https://scrapernode.com/glassdoor/scrapers/companies) | Extract company profiles — ratings, culture scores, financials | 49 | 2 credits/row |
| [**Reviews**](https://scrapernode.com/glassdoor/scrapers/reviews) | Extract employee reviews — pros, cons, rating breakdowns | 35 | 1 credit/row |
| [**Jobs**](https://scrapernode.com/glassdoor/scrapers/jobs) | Extract job listings with salary estimates and company ratings | 38 | 1 credit/row |

### Yelp — [scrapernode.com/yelp](https://scrapernode.com/yelp)

| Node | Description | Fields | Cost |
|------|-------------|--------|------|
| [**Businesses**](https://scrapernode.com/yelp/scrapers/businesses) | Extract business listings — ratings, hours, contact, amenities | 29 | 1 credit/row |
| [**Reviews**](https://scrapernode.com/yelp/scrapers/reviews) | Extract customer reviews — ratings, text, responses | 17 | 1 credit/row |

### GitHub — [scrapernode.com/github](https://scrapernode.com/github)

| Node | Description | Fields | Cost |
|------|-------------|--------|------|
| [**Repositories**](https://scrapernode.com/github/scrapers/repositories) | Extract repo data — stars, forks, languages, contributors | 20 | 2 credits/row |

### Crunchbase — [scrapernode.com/crunchbase](https://scrapernode.com/crunchbase)

| Node | Description | Fields | Cost |
|------|-------------|--------|------|
| [**Companies**](https://scrapernode.com/crunchbase/scrapers/companies) | Extract company data — funding rounds, investors, growth metrics | 53 | 2 credits/row |

### TikTok (Extended) — [scrapernode.com/tiktok](https://scrapernode.com/tiktok)

| Node | Description | Cost |
|------|-------------|------|
| [**Posts by URL**](https://scrapernode.com/tiktok/scrapers/posts-by-url) | Extract post data by direct video URL using Fast API | 1 credit/row |
| [**Posts by Profile**](https://scrapernode.com/tiktok/scrapers/posts-by-profile) | Extract all posts from a TikTok profile URL using Fast API | 1 credit/row |
| [**Posts by Search**](https://scrapernode.com/tiktok/scrapers/posts-by-search) | Collect posts matching a search query using Fast API | 1 credit/row |
| [**Shop Products**](https://scrapernode.com/tiktok/scrapers/shop) | Extract TikTok Shop product data including pricing and seller info | 1 credit/row |
| [**Shop Categories**](https://scrapernode.com/tiktok/scrapers/shop-categories) | Extract TikTok Shop products by category with pricing and ratings | 1 credit/row |

### Facebook (Extended) — [scrapernode.com/facebook](https://scrapernode.com/facebook)

| Node | Description | Cost |
|------|-------------|------|
| [**Pages & Profiles**](https://scrapernode.com/facebook/scrapers/pages-and-profiles) | Extract page/profile data including categories, contact info, hours, and ratings | 1 credit/row |
| [**Personal Profiles**](https://scrapernode.com/facebook/scrapers/personal-profiles) | Extract personal profile data including work, education, and photos | 1 credit/row |
| [**Marketplace**](https://scrapernode.com/facebook/scrapers/marketplace) | Extract Marketplace listings with pricing, seller info, and item details | 1 credit/row |
| [**Events**](https://scrapernode.com/facebook/scrapers/events) | Extract event data including date, location, attendees, and host details | 1 credit/row |
| [**Company Reviews**](https://scrapernode.com/facebook/scrapers/company-reviews) | Extract company page reviews with ratings and reviewer details | 1 credit/row |

### Google Maps — [scrapernode.com/google-maps](https://scrapernode.com/google-maps)

| Node | Description | Cost |
|------|-------------|------|
| [**Listings**](https://scrapernode.com/google-maps/scrapers/listings) | Extract business listings with contact info, hours, ratings, and reviews | 1 credit/row |
| [**Reviews**](https://scrapernode.com/google-maps/scrapers/reviews) | Extract customer reviews from Google Maps business listings | 1 credit/row |

### Google Search — [scrapernode.com/google-search](https://scrapernode.com/google-search)

| Node | Description | Cost |
|------|-------------|------|
| [**Search Results**](https://scrapernode.com/google-search/scrapers/results) | Extract up to 100 organic search results from Google SERP by keyword | 1 credit/row |
| [**AI Search**](https://scrapernode.com/google-search/scrapers/ai) | Extract AI-generated search results and citations from Google AI Mode by keyword | 1 credit/row |

### Google Shopping — [scrapernode.com/google-shopping](https://scrapernode.com/google-shopping)

| Node | Description | Cost |
|------|-------------|------|
| [**Products**](https://scrapernode.com/google-shopping/scrapers/products) | Extract product listings from Google Shopping with prices and merchant info | 1 credit/row |
| [**Shopping Search**](https://scrapernode.com/google-shopping/scrapers/search) | Extract Google Shopping search results by keyword with pricing details | 1 credit/row |

### Google Flights — [scrapernode.com/google-flights](https://scrapernode.com/google-flights)

| Node | Description | Cost |
|------|-------------|------|
| [**Flights Search**](https://scrapernode.com/google-flights/scrapers/search) | Extract flight search results and pricing from Google Flights | 1 credit/row |

### Google Hotels — [scrapernode.com/google-hotels](https://scrapernode.com/google-hotels)

| Node | Description | Cost |
|------|-------------|------|
| [**Hotels Search**](https://scrapernode.com/google-hotels/scrapers/search) | Collect hotel listings, pricing, and reviews from Google Hotels | 1 credit/row |

### ZoomInfo — [scrapernode.com/zoominfo](https://scrapernode.com/zoominfo)

| Node | Description | Cost |
|------|-------------|------|
| [**Companies**](https://scrapernode.com/zoominfo/scrapers/companies) | Extract company data including size, revenue, contacts, and tech stack | 2 credits/row |

### Trustpilot — [scrapernode.com/trustpilot](https://scrapernode.com/trustpilot)

| Node | Description | Cost |
|------|-------------|------|
| [**Reviews**](https://scrapernode.com/trustpilot/scrapers/reviews) | Extract business reviews with ratings, reviewer details, and response data | 1 credit/row |

### G2 — [scrapernode.com/g2](https://scrapernode.com/g2)

| Node | Description | Cost |
|------|-------------|------|
| [**Reviews**](https://scrapernode.com/g2/scrapers/reviews) | Extract software product reviews with ratings, pros/cons, and reviewer details | 1 credit/row |

### PitchBook — [scrapernode.com/pitchbook](https://scrapernode.com/pitchbook)

| Node | Description | Cost |
|------|-------------|------|
| [**Companies**](https://scrapernode.com/pitchbook/scrapers/companies) | Extract company funding, investors, valuations, and financial data | 2 credits/row |

### Xing — [scrapernode.com/xing](https://scrapernode.com/xing)

| Node | Description | Cost |
|------|-------------|------|
| [**Profiles**](https://scrapernode.com/xing/scrapers/profiles) | Extract professional profiles from Xing, the European LinkedIn alternative | 1 credit/row |

### Owler — [scrapernode.com/owler](https://scrapernode.com/owler)

| Node | Description | Cost |
|------|-------------|------|
| [**Companies**](https://scrapernode.com/owler/scrapers/companies) | Extract company intelligence including revenue estimates, competitors, and news | 1 credit/row |

### Martindale — [scrapernode.com/martindale](https://scrapernode.com/martindale)

| Node | Description | Cost |
|------|-------------|------|
| [**Lawyers**](https://scrapernode.com/martindale/scrapers/lawyers) | Extract US attorney and law firm data from the Martindale-Hubbell directory | 1 credit/row |

### VentureRadar — [scrapernode.com/ventureradar](https://scrapernode.com/ventureradar)

| Node | Description | Cost |
|------|-------------|------|
| [**Companies**](https://scrapernode.com/ventureradar/scrapers/companies) | Extract startup and emerging company data from VentureRadar | 1 credit/row |

### TrustRadius — [scrapernode.com/trustradius](https://scrapernode.com/trustradius)

| Node | Description | Cost |
|------|-------------|------|
| [**Reviews**](https://scrapernode.com/trustradius/scrapers/reviews) | Extract verified software product reviews with detailed ratings | 1 credit/row |

---

## Job Management

The **ScraperNode Jobs** node handles cross-cutting job management and credits:

| Resource | Operation | Description |
|----------|-----------|-------------|
| Job | **Get** | Get job status and details by ID |
| Job | **Get Results** | Retrieve scraped data from a completed job |
| Job | **List** | List recent scrape jobs with optional status filter |
| Job | **Cancel** | Cancel a pending/processing job and refund credits |
| Credits | **Get Balance** | Check your current credit balance |
| Credits | **Get Transactions** | View your credit transaction history |

---

## How to Use

1. Drag any ScraperNode node onto your workflow canvas
2. Select your **ScraperNode API** credential
3. Configure the inputs (URLs, usernames, search queries, etc.)
4. Execute the node to receive structured JSON data

Each scraper node supports three operations:

| Operation | Description |
|-----------|-------------|
| **Create** | Start a new scrape job — optionally wait for completion |
| **Get** | Check job status and details by ID |
| **Get Results** | Retrieve scraped data from a completed job |

### Wait for Completion

Enable **Wait for Completion** when creating a job to have the node poll until the job finishes, then output each scraped record as a separate n8n item — ready to pipe into the next node.

For long-running jobs, use the **ScraperNode Jobs** node's Get/Get Results operations on a schedule to avoid holding an n8n worker.

### AI Agent Support

All nodes are **AI Agent compatible** with `usableAsTool` enabled. Connect them to n8n's AI Agent node to let your AI agents scrape data on demand.

---

## Features

- **58 dedicated scraper nodes** — one per scraper, each with tailored inputs and platform-specific icons
- **AI Agent compatible** — focused tool descriptions for accurate tool selection by AI agents
- **Per-platform icons** — each scraper node displays its platform icon for easy identification on the canvas
- **Return All toggle** — standard n8n pagination for Get Results and List operations
- **Exponential backoff** — automatic retry on 5xx, 429, and network errors
- **Data provenance** — every output item includes `pairedItem` for n8n's data tracking
- **Dark mode** — icons adapt to n8n's light and dark themes
- **Pay per scrape** — no subscriptions, credits-based usage

---

## Links

| | |
|---|---|
| **Website** | [scrapernode.com](https://scrapernode.com) |
| **API Documentation** | [scrapernode.com/docs/api](https://scrapernode.com/docs/api) |
| **OpenAPI Spec** | [scrapernode.com/openapi.yaml](https://scrapernode.com/openapi.yaml) |
| **npm Package** | [npmjs.com/package/n8n-nodes-scrapernode](https://www.npmjs.com/package/n8n-nodes-scrapernode) |
| **GitHub** | [github.com/ScraperNode/n8n-nodes-scrapernode](https://github.com/ScraperNode/n8n-nodes-scrapernode) |
| **Issues** | [github.com/ScraperNode/n8n-nodes-scrapernode/issues](https://github.com/ScraperNode/n8n-nodes-scrapernode/issues) |

---

## License

[MIT](LICENSE)

---

### Tags

`n8n` `n8n-community-node` `n8n-community-node-package` `web-scraping` `scraping` `data-extraction` `lead-generation` `linkedin-scraper` `instagram-scraper` `tiktok-scraper` `twitter-scraper` `x-scraper` `youtube-scraper` `facebook-scraper` `indeed-scraper` `glassdoor-scraper` `yelp-scraper` `github-scraper` `crunchbase-scraper` `google-maps-scraper` `google-search-scraper` `google-shopping-scraper` `zoominfo-scraper` `trustpilot-scraper` `g2-scraper` `pitchbook-scraper` `xing-scraper` `social-media-scraping` `social-media` `automation` `workflow` `api` `scrapernode` `linkedin` `instagram` `tiktok` `twitter` `youtube` `facebook` `indeed` `glassdoor` `yelp` `crunchbase` `influencer-marketing` `competitor-analysis` `market-research` `talent-sourcing` `job-scraping` `review-scraping` `profile-scraping` `ai-agent` `n8n-ai-agent`
