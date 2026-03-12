import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
	INodeType,
	INodeTypeDescription,
	NodeHint,
} from "n8n-workflow";
import { NodeConnectionTypes, NodeOperationError } from "n8n-workflow";
import { BASE_URL, httpWithRetry } from "./api";
import { inputSchemas } from "./inputSchemas";
import { outputSchemas } from "./outputSchemas";
import { pollForResults } from "./polling";
import type { ScraperNodeConfig } from "./types";

/** Convert snake_case field name to display name: "first_name" → "First Name" */
function toDisplayName(name: string): string {
	return name
		.split("_")
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(" ");
}

/**
 * Build the fixedCollection input property from inputSchemas.
 * All scrapers use fixedCollection with multipleValues for row-based input.
 */
function buildInputProperty(config: ScraperNodeConfig): INodeProperties {
	const fields = inputSchemas[config.scraperId] ?? [
		{
			name: "url",
			type: "string" as const,
			required: true,
			description: config.inputDescription,
			placeholder: config.inputPlaceholder,
		},
	];

	const collectionValues: INodeProperties[] = fields.map((field) => {
		const base = {
			displayName: toDisplayName(field.name),
			name: field.name,
			required: field.required,
			description: field.description,
		};

		if (field.type === "options" && field.options) {
			return {
				...base,
				type: "options" as const,
				default: "",
				options: field.options.map((o) => ({
					name: o.name,
					value: o.value,
				})),
			};
		}

		if (field.type === "number") {
			return {
				...base,
				type: "number" as const,
				default: 0,
				typeOptions: { minValue: 0 },
			};
		}

		if (field.type === "boolean") {
			return {
				...base,
				type: "boolean" as const,
				default: false,
			};
		}

		// Default: string
		return {
			...base,
			type: "string" as const,
			default: "",
			placeholder: field.placeholder,
		};
	});

	return {
		displayName: config.inputLabel,
		name: "inputs",
		type: "fixedCollection",
		typeOptions: { multipleValues: true },
		default: {},
		required: true,
		displayOptions: { show: { operation: ["create"] } },
		description: config.inputDescription,
		options: [
			{
				displayName: "Input",
				name: "input",
				values: collectionValues,
			},
		],
	};
}

/** Build NodeHint[] for output field preview from outputSchemas. */
function buildOutputHints(scraperId: string): NodeHint[] | undefined {
	const fields = outputSchemas[scraperId];
	if (!fields) return undefined;

	const required = fields.filter((f) => f.required);
	const optionalCount = fields.filter((f) => !f.required).length;

	const fieldList = required.map((f) => `\`${f.name}\``).join(", ");
	const optionalSuffix =
		optionalCount > 0 ? ` + ${optionalCount} optional fields` : "";

	return [
		{
			message: `**Output fields:** ${fieldList}${optionalSuffix}`,
			type: "info" as const,
			location: "outputPane" as const,
			whenToDisplay: "beforeExecution" as const,
			displayCondition:
				'={{ $parameter.operation === "getResults" || ($parameter.operation === "create" && $parameter.waitForCompletion === true) }}',
		},
	];
}

function buildDescription(config: ScraperNodeConfig): INodeTypeDescription {
	return {
		displayName: config.displayName,
		name: config.nodeName,
		icon: {
			light: `file:${config.platform}.svg`,
			dark: `file:${config.platform}.dark.svg`,
		},
		group: ["input"],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: config.description,
		defaults: { name: config.displayName },
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [{ name: "scraperNodeApi", required: true }],
		hints: buildOutputHints(config.scraperId),
		properties: [
			{
				displayName: "Operation",
				name: "operation",
				type: "options",
				noDataExpression: true,
				options: [
					{
						name: "Create",
						value: "create",
						action: `Scrape ${config.inputLabel.toLowerCase()}`,
						description: config.description,
					},
					{
						name: "Get",
						value: "get",
						action: "Get job status",
						description: "Get job status and details by ID",
					},
					{
						name: "Get Results",
						value: "getResults",
						action: "Get scrape results",
						description: "Get results from a completed job",
					},
				],
				default: "create",
			},
			// -- Create fields (fixedCollection) --
			buildInputProperty(config),
			{
				displayName: "Job Name",
				name: "jobName",
				type: "string",
				default: "",
				displayOptions: { show: { operation: ["create"] } },
				description: "Optional name for this job",
			},
			{
				displayName: "Wait for Completion",
				name: "waitForCompletion",
				type: "boolean",
				default: false,
				displayOptions: { show: { operation: ["create"] } },
				description:
					"Whether to wait for the job to finish and return results. WARNING: Holds an n8n worker while polling — use a separate Get node on a schedule for long-running jobs.",
			},
			{
				displayName: "Polling Interval (Seconds)",
				name: "pollInterval",
				type: "number",
				default: 10,
				displayOptions: {
					show: { operation: ["create"], waitForCompletion: [true] },
				},
				description: "How often to check if the job is done",
			},
			{
				displayName: "Max Wait Time (Seconds)",
				name: "maxWait",
				type: "number",
				default: 300,
				displayOptions: {
					show: { operation: ["create"], waitForCompletion: [true] },
				},
				description: "Maximum time to wait before timing out",
			},
			{
				displayName: "Result Limit",
				name: "resultLimit",
				type: "number",
				default: 1000,
				displayOptions: {
					show: { operation: ["create"], waitForCompletion: [true] },
				},
				description: "Maximum number of results to fetch after job completion",
			},
			// -- Get / Get Results fields --
			{
				displayName: "Job ID",
				name: "jobId",
				type: "string",
				default: "",
				required: true,
				displayOptions: { show: { operation: ["get", "getResults"] } },
				description: "The ID of the scrape job",
			},
			{
				displayName: "Return All",
				name: "returnAll",
				type: "boolean",
				default: false,
				displayOptions: { show: { operation: ["getResults"] } },
				description:
					"Whether to return all results or only up to a given limit",
			},
			{
				displayName: "Limit",
				name: "limit",
				type: "number",
				default: 50,
				displayOptions: {
					show: { operation: ["getResults"], returnAll: [false] },
				},
				description: "Max number of results to return",
				typeOptions: { minValue: 1 },
			},
		],
	};
}

export function buildScraperNodeClass(
	config: ScraperNodeConfig
): new () => INodeType {
	const desc = buildDescription(config);

	return class implements INodeType {
		description = desc;

		async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
			const items = this.getInputData();
			const returnData: INodeExecutionData[] = [];
			await this.getCredentials("scraperNodeApi");
			const baseUrl = BASE_URL;

			for (let i = 0; i < items.length; i++) {
				try {
					const operation = this.getNodeParameter("operation", i) as string;
					const results = await executeScraperOperation(
						this,
						operation,
						i,
						baseUrl,
						config.scraperId,
						config.allowedDomains
					);
					for (const item of results) {
						returnData.push({ ...item, pairedItem: { item: i } });
					}
				} catch (error) {
					if (this.continueOnFail()) {
						returnData.push({
							json: {
								error: error instanceof Error ? error.message : "Unknown error",
							},
							pairedItem: { item: i },
						});
					} else {
						throw new NodeOperationError(this.getNode(), error as Error, {
							itemIndex: i,
						});
					}
				}
			}

			return [returnData];
		}
	};
}

async function executeScraperOperation(
	ctx: IExecuteFunctions,
	operation: string,
	i: number,
	baseUrl: string,
	scraperId: string,
	allowedDomains: string[]
): Promise<INodeExecutionData[]> {
	switch (operation) {
		case "create": {
			const result = await createScrapeJob(
				ctx,
				i,
				baseUrl,
				scraperId,
				allowedDomains
			);
			return Array.isArray(result) ? result : [result];
		}
		case "get": {
			const jobId = ctx.getNodeParameter("jobId", i) as string;
			const response = await httpWithRetry(ctx, {
				method: "GET",
				url: `${baseUrl}/api/jobs/get?jobId=${encodeURIComponent(jobId)}`,
				json: true,
			});
			return [{ json: (response.job ?? response) as IDataObject }];
		}
		case "getResults": {
			const jobId = ctx.getNodeParameter("jobId", i) as string;
			const returnAll = ctx.getNodeParameter("returnAll", i, false) as boolean;
			const limit = returnAll
				? 10_000
				: (ctx.getNodeParameter("limit", i, 50) as number);
			const response = await httpWithRetry(ctx, {
				method: "GET",
				url: `${baseUrl}/api/jobs/results?jobId=${encodeURIComponent(jobId)}&limit=${limit}`,
				json: true,
			});
			const results = (response.results ?? []) as Array<{ data?: IDataObject }>;
			return results.map((r) => ({
				json: (r.data ?? r) as IDataObject,
			}));
		}
		default:
			return [];
	}
}

function validateUrls(
	urls: string[],
	allowedDomains: string[],
	ctx: IExecuteFunctions,
	itemIndex: number
): void {
	for (const url of urls) {
		if (!/^https?:\/\//i.test(url)) {
			throw new NodeOperationError(
				ctx.getNode(),
				`Invalid URL: "${url}" — must start with http:// or https://`,
				{ itemIndex }
			);
		}
		if (allowedDomains.length > 0) {
			const domainList = allowedDomains.join(", ");
			let hostname: string;
			try {
				hostname = new URL(url).hostname.toLowerCase();
			} catch {
				throw new NodeOperationError(
					ctx.getNode(),
					`Invalid URL: "${url}" — could not parse URL`,
					{ itemIndex }
				);
			}
			const matches = allowedDomains.some(
				(d) => hostname === d || hostname.endsWith(`.${d}`)
			);
			if (!matches) {
				throw new NodeOperationError(
					ctx.getNode(),
					`Wrong platform: "${url}" — expected URLs from ${domainList}`,
					{ itemIndex }
				);
			}
		}
	}
}

async function createScrapeJob(
	ctx: IExecuteFunctions,
	itemIndex: number,
	baseUrl: string,
	scraperId: string,
	allowedDomains: string[]
): Promise<INodeExecutionData | INodeExecutionData[]> {
	const collection = ctx.getNodeParameter(
		"inputs.input",
		itemIndex,
		[]
	) as Array<Record<string, unknown>>;
	const jobName = ctx.getNodeParameter("jobName", itemIndex, "") as string;
	const waitForCompletion = ctx.getNodeParameter(
		"waitForCompletion",
		itemIndex,
		false
	) as boolean;

	const fieldDefs = inputSchemas[scraperId] ?? [
		{ name: "url", type: "string" as const, required: true, description: "" },
	];

	const inputs = collection.map((row) => {
		const input: Record<string, unknown> = {};
		for (const field of fieldDefs) {
			const val = row[field.name];
			if (val !== undefined && val !== "") {
				input[field.name] = val;
			}
		}
		return input;
	});

	if (inputs.length === 0) {
		throw new NodeOperationError(ctx.getNode(), "No inputs provided", {
			itemIndex,
		});
	}

	// Validate URLs from all rows
	const urls = inputs
		.map((i) => i.url as string)
		.filter(Boolean);
	validateUrls(urls, allowedDomains, ctx, itemIndex);

	const createResponse = await ctx.helpers.httpRequestWithAuthentication.call(
		ctx,
		"scraperNodeApi",
		{
			method: "POST",
			url: `${baseUrl}/api/jobs/create`,
			body: {
				scraperId,
				name: jobName || undefined,
				inputs,
			},
			json: true,
		}
	);

	const jobId = createResponse.jobId;

	if (!waitForCompletion) {
		return { json: createResponse };
	}

	return pollForResults(ctx, itemIndex, baseUrl, jobId, scraperId);
}
