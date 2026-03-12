import type { INodeType } from "n8n-workflow";
import { NodeOperationError } from "n8n-workflow";
import { describe, expect, it } from "vitest";
import { ScraperNodeLinkedInProfiles } from "../../nodes/ScraperNodeLinkedInProfiles/ScraperNodeLinkedInProfiles.node";
import { mockCreateJobResponse } from "../mocks/mockData";
import {
	createMockExecuteFunctions,
	type MockedExecuteFunctions,
} from "../mocks/mockExecuteFunctions";

const node: INodeType = new ScraperNodeLinkedInProfiles();

async function run(mock: MockedExecuteFunctions) {
	return (await node.execute!.call(mock)) as unknown as {
		json: Record<string, unknown>;
		pairedItem?: unknown;
	}[][];
}

function createJobMock(inputs: Array<Record<string, unknown>>) {
	return createMockExecuteFunctions({
		nodeParameters: {
			operation: "create",
			"inputs.input": inputs,
			jobName: "",
			waitForCompletion: false,
		},
		httpHandler: () => mockCreateJobResponse,
	});
}

describe("fixedCollection input handling", () => {
	it("should send a single input row", async () => {
		const mock = createJobMock([{ url: "https://linkedin.com/in/alice" }]);

		await run(mock);

		const call = mock.helpers.httpRequestWithAuthentication.mock.calls[0];
		const body = (call[1] as { body: { inputs: { url: string }[] } }).body;
		expect(body.inputs).toEqual([{ url: "https://linkedin.com/in/alice" }]);
	});

	it("should send multiple input rows", async () => {
		const mock = createJobMock([
			{ url: "https://linkedin.com/in/alice" },
			{ url: "https://linkedin.com/in/bob" },
		]);

		await run(mock);

		const call = mock.helpers.httpRequestWithAuthentication.mock.calls[0];
		const body = (call[1] as { body: { inputs: { url: string }[] } }).body;
		expect(body.inputs).toEqual([
			{ url: "https://linkedin.com/in/alice" },
			{ url: "https://linkedin.com/in/bob" },
		]);
	});

	it("should strip empty string fields from input rows", async () => {
		const mock = createJobMock([
			{ url: "https://linkedin.com/in/alice", first_name: "" },
		]);

		await run(mock);

		const call = mock.helpers.httpRequestWithAuthentication.mock.calls[0];
		const body = (call[1] as { body: { inputs: { url: string }[] } }).body;
		expect(body.inputs).toEqual([{ url: "https://linkedin.com/in/alice" }]);
	});

	it("should throw NodeOperationError when no inputs provided", async () => {
		const mock = createJobMock([]);

		await expect(run(mock)).rejects.toThrow(NodeOperationError);
	});

	it("should reject URLs from wrong platform", async () => {
		const mock = createJobMock([{ url: "https://instagram.com/user" }]);

		await expect(run(mock)).rejects.toThrow(NodeOperationError);
	});

	it("should reject URLs without protocol", async () => {
		const mock = createJobMock([{ url: "linkedin.com/in/alice" }]);

		await expect(run(mock)).rejects.toThrow(NodeOperationError);
	});
});
