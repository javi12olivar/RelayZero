import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_sha256Hex, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { z } from "zod";

//#region dist/contracts/catalog/catalogDiscovery.js
var HOT_TOOL_NAMES, MAX_DISCOVERY_TOOLS, DEFAULT_DISCOVERY_PAGE_SIZE, pageSize, inputSchema, outputSchema, DISCOVER_TOOLS, digest, progressiveCatalogIdentity;
function init_catalogDiscovery() {
	return (init_catalogDiscovery = __esmMin((() => {
		init_sha256Hex();
		HOT_TOOL_NAMES = new Set([
			"binary_session",
			"open_binary",
			"close_binary",
			"get_evidence_bundle"
		]);
		MAX_DISCOVERY_TOOLS = 20;
		DEFAULT_DISCOVERY_PAGE_SIZE = 3;
		pageSize = z.int().min(1).max(MAX_DISCOVERY_TOOLS).default(DEFAULT_DISCOVERY_PAGE_SIZE);
		inputSchema = z.strictObject({
			query: z.string().trim().optional().describe("Case-insensitive words matched against tool names and descriptions; all words must match. Omit to browse."),
			names: z.array(z.string().min(1)).min(1).max(MAX_DISCOVERY_TOOLS).optional().describe(`At most ${MAX_DISCOVERY_TOOLS} exact tool names to load instead of searching.`),
			offset: z.int().min(0).default(0),
			limit: pageSize.describe(`Search page size 1..${MAX_DISCOVERY_TOOLS} (default ${DEFAULT_DISCOVERY_PAGE_SIZE}); does not apply to exact names.`)
		}).refine((input) => input.names === undefined || input.query === undefined && input.offset === 0, { message: "Use names alone, or query with offset/limit." });
		outputSchema = z.strictObject({
			profile: z.literal("hot-cold"),
			inventory_count: z.int().nonnegative(),
			loaded_count: z.int().nonnegative(),
			total_matches: z.int().nonnegative(),
			next_offset: z.int().nonnegative().nullable(),
			tools: z.array(z.strictObject({
				name: z.string(),
				description: z.string().describe("Abbreviated canonical description; read tools/list for the complete contract."),
				input_schema: z.record(z.string(), z.unknown()).describe("The configured advertised input schema for calling this named tool.")
			})),
			next_step: z.string()
		});
		DISCOVER_TOOLS = {
			name: "discover_tools",
			description: "Find and load REA tools on demand. Search by task keywords (for example javascript, sqlite, strings, imports), or supply exact names. Returned tools become callable with their original names and full schemas after your client refreshes tools/list. Loaded tools remain available for this connection. This only changes catalog visibility; it does not run analysis or grant execution authority. If tools do not appear, enable MCP catalog refresh in your client or use REA_MCP_TOOL_CATALOG_PROFILE=full.",
			inputSchema,
			outputSchema,
			annotations: {
				readOnlyHint: true,
				idempotentHint: true,
				openWorldHint: false
			}
		};
		digest = (value) => sha256Hex(JSON.stringify(value));
		progressiveCatalogIdentity = (base) => {
			const policy = {
				profile: "hot-cold",
				hot: [...HOT_TOOL_NAMES],
				tool: {
					...DISCOVER_TOOLS,
					inputSchema: z.toJSONSchema(inputSchema, { io: "input" }),
					outputSchema: z.toJSONSchema(outputSchema)
				}
			};
			const tools_sha256 = digest({
				base: base.digests.tools_sha256,
				policy
			});
			return {
				counts: {
					...base.counts,
					mcp_tools: base.counts.mcp_tools + 1
				},
				digests: {
					tools_sha256,
					prompts_sha256: base.digests.prompts_sha256,
					combined_sha256: digest({
						base: base.digests.combined_sha256,
						tools_sha256
					})
				}
			};
		};
	})))();
}

//#endregion
export { DISCOVER_TOOLS, HOT_TOOL_NAMES, init_catalogDiscovery, progressiveCatalogIdentity };