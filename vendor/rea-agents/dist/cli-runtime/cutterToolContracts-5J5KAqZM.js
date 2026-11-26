import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_jsonValue, jsonValueSchema } from "./jsonSerialization-DAF9DVXC.js";
import { evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/domain/cutterDiscovery.js
var cutterBridgeSourceSchema, cutterSessionSchema, cutterDiscoverySchema, NO_LIVE_BRIDGE_LIMITATION, unlistedLimitations, cutterDiscoveryLimitations;
function init_cutterDiscovery() {
	return (init_cutterDiscovery = __esmMin((() => {
		cutterBridgeSourceSchema = z.enum([
			"packaged",
			"modified",
			"unknown"
		]);
		cutterSessionSchema = z.strictObject({
			session_id: z.string().uuid(),
			pid: z.int().positive(),
			document_generation: z.int().nonnegative(),
			current_file: z.string().nullable(),
			cutter_version: z.string().nullable(),
			identity_status: z.literal("partial"),
			bridge_source: cutterBridgeSourceSchema,
			/**
			* How to run the packaged plugin, present when `bridge_source` is not
			* `packaged`: the session's plugin is unknown or differs from this release.
			*/
			bridge_source_recovery: z.string().exactOptional()
		});
		cutterDiscoverySchema = z.strictObject({
			sessions: z.array(cutterSessionSchema),
			bridge_directory: z.string(),
			discovery_status: z.enum([
				"sessions_found",
				"no_live_bridge_found",
				"bridge_directory_unavailable",
				"bridge_directory_insecure",
				"bridge_directory_capacity_exceeded"
			]),
			bridge_directory_security: z.enum([
				"private_verified",
				"not_private",
				"unverified_platform_acl",
				"not_checked"
			]),
			/** What this discovery status cannot establish. */
			limitations: z.array(z.string())
		});
		NO_LIVE_BRIDGE_LIMITATION = "No REA bridge session in bridge_directory answered. Discovery cannot tell whether Cutter is not running, did not load the REA Python plugin, loaded it but could not publish a session (for example, an unwritable or full bridge directory), or uses another REA_CUTTER_BRIDGE_DIR. Cutter's startup log shows whether the plugin loaded; the bridge does not log a publication failure. Official Cutter 2.5.0 builds have been observed to reject Python plugins, including this one (rizinorg/cutter#3659).";
		unlistedLimitations = ({ unreadable, unanswered }) => [...unreadable === 0 ? [] : [`${String(unreadable)} descriptor ${unreadable === 1 ? "candidate" : "candidates"} in bridge_directory could not be read (removed, not a private regular file, unreadable, oversized, malformed, or not matching its file name). Whether ${unreadable === 1 ? "it describes a Cutter session" : "they describe Cutter sessions"} is unknown.`], ...unanswered === 0 ? [] : [`${String(unanswered)} published ${unanswered === 1 ? "session" : "sessions"} in bridge_directory did not return a valid status (stale after Cutter exited, unresponsive, or an incompatible bridge version) and ${unanswered === 1 ? "is" : "are"} not listed.`]];
		cutterDiscoveryLimitations = (status, unlisted = {
			unreadable: 0,
			unanswered: 0
		}) => {
			if (status === "no_live_bridge_found") return [NO_LIVE_BRIDGE_LIMITATION, ...unlistedLimitations(unlisted)];
			return status === "sessions_found" ? unlistedLimitations(unlisted) : [];
		};
	})))();
}

//#endregion
//#region dist/contracts/cutterToolContracts.js
var cutterListInputSchema, cutterCommandInputSchema, cutterCommandResultSchema, CUTTER_TOOL_CONTRACTS;
function init_cutterToolContracts() {
	return (init_cutterToolContracts = __esmMin((() => {
		init_jsonValue();
		init_cutterDiscovery();
		init_toolOutputSchemaPrimitives();
		init_toolEffects();
		cutterListInputSchema = z.strictObject({});
		cutterCommandInputSchema = z.strictObject({
			session_id: z.string().uuid(),
			expected_generation: z.int().nonnegative(),
			command: z.string().min(1).refine((value) => !/[\r\n]/u.test(value), "A single Rizin command line is required"),
			json: z.boolean().default(false)
		});
		cutterCommandResultSchema = z.strictObject({
			command: z.string(),
			output: jsonValueSchema.nullable(),
			execution_state: z.enum([
				"not_started",
				"complete",
				"failed",
				"unknown"
			]),
			error: z.string().nullable(),
			message: z.string().nullable(),
			/** Null when the bridge did not declare whether output was omitted. */
			output_truncated: z.boolean().nullable(),
			cutter_version: z.string().nullable(),
			current_file: z.string().nullable(),
			/** Null when the bridge did not report the generation after the command. */
			document_generation: z.int().nonnegative().nullable(),
			identity_status: z.literal("partial")
		});
		CUTTER_TOOL_CONTRACTS = [{
			name: "list_cutter_sessions",
			cli: true,
			...toolContractMetadata("list_cutter_sessions", toolEffects({ accessesNetwork: true })),
			kind: "native-provider",
			description: "Find live REA bridge sessions in Cutter and return document identity and bridge-directory security status. Examines at most 256 descriptors with up to eight concurrent probes; excess capacity returns bridge_directory_capacity_exceeded, not an empty session list. The fixed discovery budget is separate from REA_BRIDGE_MAX_REQUEST_BYTES and cannot be raised at runtime.",
			inputSchema: cutterListInputSchema,
			outputSchema: cutterDiscoverySchema,
			examples: [{
				title: "List open Cutter instances",
				input: {}
			}]
		}, {
			name: "cutter_command",
			cli: true,
			...toolContractMetadata("cutter_command", toolEffects({
				mutatesTarget: true,
				executesForeignCode: true,
				mutatesSession: true,
				writesFilesystem: true,
				launchesProcess: true,
				accessesNetwork: true,
				changesUiState: true,
				idempotent: false
			})),
			kind: "native-provider",
			description: "Run one arbitrary Rizin command in a selected Cutter session; it may persist edits or execute plugin effects. Reports completion uncertainty as Evidence; do not retry automatically. An admitted command retires shared binary analysis: close active Ghidra explicitly first, then reopen with open_binary after command effects settle. Supply session_id and expected_generation from discovery. REA_BRIDGE_MAX_REQUEST_BYTES bounds authenticated request/response payloads excluding LF (default 16777216, range 7464..536870887); mismatched client/Cutter budgets refuse dispatch. An out-of-band Cutter without this setting uses the default.",
			inputSchema: cutterCommandInputSchema,
			outputSchema: evidenceResultOf(cutterCommandResultSchema),
			examples: [{
				title: "Inspect active binary metadata",
				input: {
					session_id: "00000000-0000-4000-8000-000000000001",
					expected_generation: 0,
					command: "ij",
					json: true
				}
			}]
		}];
	})))();
}

//#endregion
export { CUTTER_TOOL_CONTRACTS, cutterCommandInputSchema, cutterDiscoveryLimitations, cutterSessionSchema, init_cutterDiscovery, init_cutterToolContracts };