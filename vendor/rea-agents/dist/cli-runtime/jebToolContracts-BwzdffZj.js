import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_coverage, init_localPath, knownCoverageStatusSchema, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/domain/jeb/jebAnalysis.js
var jebInputSchemas, jebRequestSchema, engine, unit, jebResultSchemas;
function init_jebAnalysis() {
	return (init_jebAnalysis = __esmMin((() => {
		init_coverage();
		init_localPath();
		jebInputSchemas = {
			inspect_jeb_client: z.strictObject({}),
			open_jeb_project: z.strictObject({ path: localPathStringSchema.describe("Artifact file or existing .jdb2 project database, resolved by the running JEB client") }),
			list_jeb_units: z.strictObject({
				filter: z.string().optional().describe("Wildcard filter matched against unit paths; '*' allowed"),
				parent_unit_path: z.string().min(1).optional().describe("Restrict results to descendants of this unit path"),
				index: z.number().int().nonnegative().default(0).describe("Zero-based index of the first result to return"),
				count: z.number().int().min(1).max(100).default(100).describe("Maximum results to return; the engine protocol caps pages at 100")
			}),
			decompile_jeb_item: z.strictObject({
				unit_path: z.string().min(1).optional().describe("Target code unit; the engine's first code unit in the project when omitted"),
				item_address: z.string().min(1).describe("Type or method address within the unit, as listed by the engine"),
				item_kind: z.enum(["type", "method"]).describe("Kind of item to decompile")
			})
		};
		jebRequestSchema = z.discriminatedUnion("operation", [
			z.strictObject({
				operation: z.literal("inspect_jeb_client"),
				input: jebInputSchemas.inspect_jeb_client
			}),
			z.strictObject({
				operation: z.literal("open_jeb_project"),
				input: jebInputSchemas.open_jeb_project
			}),
			z.strictObject({
				operation: z.literal("list_jeb_units"),
				input: jebInputSchemas.list_jeb_units
			}),
			z.strictObject({
				operation: z.literal("decompile_jeb_item"),
				input: jebInputSchemas.decompile_jeb_item
			})
		]);
		engine = z.strictObject({
			name: z.string().min(1),
			version: z.string().nullable(),
			endpoint: z.string().min(1),
			gui_client: z.boolean().nullable()
		});
		unit = z.strictObject({
			unit_path: z.string(),
			unit_type: z.string()
		});
		jebResultSchemas = {
			inspect_jeb_client: z.strictObject({
				engine,
				startup_ts: z.number().int().nonnegative().nullable(),
				message: z.string().nullable()
			}),
			open_jeb_project: z.strictObject({
				engine,
				project_name: z.string().nullable(),
				creation_datetime: z.string().nullable(),
				input_files: z.array(z.strictObject({
					file_name: z.string(),
					file_size: z.number().int().nonnegative(),
					contents_sha256_hash: z.string()
				})),
				units: z.array(unit)
			}),
			list_jeb_units: z.strictObject({
				engine,
				filter: z.string().nullable(),
				parent_unit_path: z.string().nullable(),
				index: z.number().int().nonnegative(),
				count: z.number().int().positive(),
				units: z.array(unit),
				coverage: knownCoverageStatusSchema
			}),
			decompile_jeb_item: z.strictObject({
				engine,
				unit_path: z.string().nullable(),
				item_address: z.string(),
				item_kind: z.enum(["type", "method"]),
				text: z.string()
			})
		};
	})))();
}

//#endregion
//#region dist/contracts/jeb/jebToolContracts.js
var JEB_TOOL_CONTRACTS;
function init_jebToolContracts() {
	return (init_jebToolContracts = __esmMin((() => {
		init_jebAnalysis();
		init_toolOutputSchemaPrimitives();
		init_toolEffects();
		JEB_TOOL_CONTRACTS = [
			{
				name: "inspect_jeb_client",
				cli: true,
				...toolContractMetadata("inspect_jeb_client", toolEffects({
					mutatesSession: true,
					accessesNetwork: true
				})),
				description: "Inspect the running JEB client serving MCP: engine version, GUI or headless mode, and startup time. Does not open a target. Requires a caller-started JEB client reachable at REA_JEB_MCP_URL (default http://127.0.0.1:8425/mcp); REA never installs or launches JEB.",
				kind: "jeb-provider",
				inputSchema: jebInputSchemas.inspect_jeb_client,
				outputSchema: evidenceResultOf(jebResultSchemas.inspect_jeb_client),
				examples: [{
					title: "Check the engine",
					input: {}
				}]
			},
			{
				name: "open_jeb_project",
				cli: true,
				...toolContractMetadata("open_jeb_project", toolEffects({
					mutatesSession: true,
					accessesNetwork: true,
					idempotent: false
				})),
				description: "Open or create a JEB project from an artifact file or existing .jdb2 database on the engine host. Returns the project's input-file digests and top-level units. The engine analyzes the target itself; REA does not read the file or execute it. Fails when a project is already open.",
				kind: "jeb-provider",
				inputSchema: jebInputSchemas.open_jeb_project,
				outputSchema: evidenceResultOf(jebResultSchemas.open_jeb_project),
				examples: [{
					title: "Open a target for analysis",
					input: { path: "/tmp/Example.apk" }
				}]
			},
			{
				name: "list_jeb_units",
				cli: true,
				...toolContractMetadata("list_jeb_units", toolEffects({
					mutatesSession: true,
					accessesNetwork: true
				})),
				description: "List project units by stable unit path and type, with optional wildcard filter, parent restriction, and pagination. The engine caps pages at 100 units; a full page reports partial coverage because more units may exist. Read-only.",
				kind: "jeb-provider",
				inputSchema: jebInputSchemas.list_jeb_units,
				outputSchema: evidenceResultOf(jebResultSchemas.list_jeb_units),
				examples: [{
					title: "List units",
					input: {}
				}, {
					title: "Find DEX units",
					input: { filter: "*.dex" }
				}]
			},
			{
				name: "decompile_jeb_item",
				cli: true,
				...toolContractMetadata("decompile_jeb_item", toolEffects({
					mutatesSession: true,
					accessesNetwork: true
				})),
				description: "Decompile one type or method to engine pseudo-code using its decompiler (Dalvik, Java, or native). item_address comes from the engine's code item listing; unit_path defaults to the engine's first code unit and stays unknown when omitted. Read-only with respect to the target file.",
				kind: "jeb-provider",
				inputSchema: jebInputSchemas.decompile_jeb_item,
				outputSchema: evidenceResultOf(jebResultSchemas.decompile_jeb_item),
				examples: [{
					title: "Decompile a method",
					input: {
						item_address: "Lcom/example/Main;->onCreate()V",
						item_kind: "method"
					}
				}]
			}
		];
	})))();
}

//#endregion
export { JEB_TOOL_CONTRACTS, init_jebAnalysis, init_jebToolContracts, jebRequestSchema, jebResultSchemas };