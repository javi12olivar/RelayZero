import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_analysisResourceLimits, init_coverage, init_localPath, knownCoverageStatusSchema, localPathStringSchema, timerDurationMsSchema } from "./jsonSerialization-DAF9DVXC.js";
import { digestSchema, init_digests } from "./targetIdentity-rKLLVwEj.js";
import { evidenceResultOf, init_toolEffects, init_toolOutputSchemaPrimitives, toolContractMetadata, toolEffects } from "./sessionToolContracts-D9XcfL6p.js";
import { z } from "zod";

//#region dist/domain/apktool/apktoolResourceAnalysis.js
var DEFAULT_APKTOOL_STRING_LIMIT, MAX_SELECTED_LOCALES, DEFAULT_APKTOOL_TOTAL_STRINGS, DEFAULT_APKTOOL_STRING_TABLE_BYTES, DEFAULT_APKTOOL_TOTAL_STRING_TABLE_BYTES, DEFAULT_APKTOOL_DECODE_TIMEOUT_MS, ANDROID_NON_LOCALE_QUALIFIERS, MAX_ANDROID_LOCALE_SUFFIX, androidLocaleQualifierSchema, androidLocaleDirectorySuffix, classifyAndroidStringsTable, apktoolInputSchemas, apktoolStringTablesRequested, apktoolRequestSchema, client, stringTableSchema, apktoolResultSchemas;
function init_apktoolResourceAnalysis() {
	return (init_apktoolResourceAnalysis = __esmMin((() => {
		init_analysisResourceLimits();
		init_coverage();
		init_localPath();
		init_digests();
		DEFAULT_APKTOOL_STRING_LIMIT = 2e3;
		MAX_SELECTED_LOCALES = 20;
		DEFAULT_APKTOOL_TOTAL_STRINGS = 1e4;
		DEFAULT_APKTOOL_STRING_TABLE_BYTES = 8 * 1024 * 1024;
		DEFAULT_APKTOOL_TOTAL_STRING_TABLE_BYTES = 32 * 1024 * 1024;
		DEFAULT_APKTOOL_DECODE_TIMEOUT_MS = 6e5;
		ANDROID_NON_LOCALE_QUALIFIERS = new Set([
			"car",
			"desk",
			"television",
			"appliance",
			"watch",
			"vrheadset",
			"night",
			"notnight"
		]);
		MAX_ANDROID_LOCALE_SUFFIX = 2 + 3 + (1 + 4) + (1 + 3) + (1 + 8);
		androidLocaleQualifierSchema = z.string().min(2).max(MAX_ANDROID_LOCALE_SUFFIX).regex(/^(?:[a-z]{2,3}(?:-(?:r?[A-Z]{2}|[0-9]{3}))?|b\+[a-z]{2,3}(?:\+[A-Za-z0-9]{2,8})*)$/u, "Locale must look like de, pt-BR, pt-rBR, es-419, or b+zh+Hans+CN").refine((value) => !ANDROID_NON_LOCALE_QUALIFIERS.has(value.toLowerCase()), "Android resource configuration qualifiers are not locales");
		androidLocaleDirectorySuffix = (locale) => locale.replace(/^([a-z]{2,3})-([A-Z]{2})$/u, "$1-r$2").replace(/^([a-z]{2,3})-([0-9]{3})$/u, "b+$1+$2");
		classifyAndroidStringsTable = (suffix) => {
			const parsed = androidLocaleQualifierSchema.safeParse(suffix);
			return parsed.success && androidLocaleDirectorySuffix(parsed.data) === suffix ? {
				kind: "locale",
				locale: parsed.data
			} : {
				kind: "other",
				suffix
			};
		};
		apktoolInputSchemas = {
			inspect_apktool_client: z.strictObject({}),
			decode_android_resources: z.strictObject({
				path: localPathStringSchema.describe("Local APK file to decode"),
				include_strings: z.boolean().default(true).describe("Project res/values/strings.xml entries using the selected string page and read budgets"),
				string_offset: z.int().nonnegative().optional().describe("Zero-based offset into valid parsed strings in each selected table, default 0. Retry the same APK and locale with the returned page.next_offset to retrieve later strings; verify target.sha256 across calls."),
				string_limit: z.int().positive().optional().describe(`Maximum strings returned per selected table, default ${String(DEFAULT_APKTOOL_STRING_LIMIT)}. Applies on this decode; no restart. Independent of XML read and aggregate output budgets.`),
				max_total_strings: z.int().positive().optional().describe(`Aggregate returned string copies, default ${String(DEFAULT_APKTOOL_TOTAL_STRINGS)}. The legacy multi-locale shape charges the primary strings twice; string_tables_only avoids that copy. Raise this or select fewer locales when exhausted.`),
				max_string_table_bytes: z.int().positive().optional().describe(`UTF-8 source byte admission for each strings.xml, default ${String(DEFAULT_APKTOOL_STRING_TABLE_BYTES)}. Raise this and, when necessary, max_total_string_table_bytes to retry an oversized table. Applies on the next decode; no restart.`),
				max_total_string_table_bytes: z.int().positive().optional().describe(`Aggregate XML bytes read across distinct physical string tables, default ${String(DEFAULT_APKTOOL_TOTAL_STRING_TABLE_BYTES)}. Raise this or select fewer locales. Does not raise per-table admission or string output budgets.`),
				string_tables_only: z.boolean().optional().describe("Return selected strings only in string_tables, leaving top-level strings empty. Omit to preserve the primary strings field."),
				locale: androidLocaleQualifierSchema.optional().describe("Project strings from res/values-<locale>/strings.xml instead of the default table"),
				locales: z.array(androidLocaleQualifierSchema).min(1).max(20).optional().describe(`Project multiple localized string tables from res/values-<locale>/strings.xml alongside the default table (up to ${String(20)} locales per call; split larger selections into separate calls and verify target.sha256)`),
				decode_timeout_ms: timerDurationMsSchema.exactOptional().describe(`Decode wall-clock budget in milliseconds (default ${String(DEFAULT_APKTOOL_DECODE_TIMEOUT_MS)}), from apktool d start through process exit. Omitted means ${String(DEFAULT_APKTOOL_DECODE_TIMEOUT_MS)}. Applies on the next decode. Does not raise the fixed output capture allowance or the version probe.`)
			})
		};
		apktoolStringTablesRequested = (input) => input.locales !== undefined || input.string_tables_only === true || input.string_offset !== undefined || input.string_limit !== undefined || input.max_total_strings !== undefined || input.max_string_table_bytes !== undefined || input.max_total_string_table_bytes !== undefined;
		apktoolRequestSchema = z.discriminatedUnion("operation", [z.strictObject({
			operation: z.literal("inspect_apktool_client"),
			input: apktoolInputSchemas.inspect_apktool_client
		}), z.strictObject({
			operation: z.literal("decode_android_resources"),
			input: apktoolInputSchemas.decode_android_resources
		})]);
		client = z.strictObject({
			command: z.string().min(1),
			command_source: z.enum(["environment", "path"]),
			apktool_version: z.string().min(1).nullable()
		});
		stringTableSchema = z.strictObject({
			locale: z.string().nullable().describe("null for default res/values/strings.xml, or the locale qualifier"),
			status: z.enum([
				"present",
				"missing",
				"oversized",
				"malformed",
				"skipped"
			]).describe("Table availability in the decoded workspace: present, missing at the selected path, oversized, malformed XML, or skipped due to limits"),
			strings: z.array(z.strictObject({
				name: z.string().min(1),
				value: z.string()
			})),
			total_count: z.int().nonnegative().nullable().describe("Total valid string entries before output limits, or null if the table was not examined or was malformed"),
			unparsed_count: z.int().nonnegative().nullable().describe("Entries skipped due to nested markup or missing attributes, or null if the table was not examined or was malformed"),
			page: z.strictObject({
				offset: z.int().nonnegative(),
				limit: z.int().positive(),
				returned_count: z.int().nonnegative(),
				next_offset: z.int().nonnegative().nullable()
			}).optional().describe("Selected valid-entry page, present for explicit string selection/budgets when the table was examined. next_offset is null at the end; otherwise retry that offset against the same APK digest and locale. If next_offset equals offset, raise max_total_strings or use string_tables_only before retrying. Table coverage still describes the entire table."),
			coverage: knownCoverageStatusSchema
		});
		apktoolResultSchemas = {
			inspect_apktool_client: z.strictObject({ client }),
			decode_android_resources: z.strictObject({
				client,
				target: z.strictObject({
					path: localPathStringSchema,
					bytes: z.int().nonnegative(),
					sha256: digestSchema
				}),
				metadata: z.strictObject({
					version_name: z.string().nullable(),
					version_code: z.string().nullable().describe("Version code exactly as apktool.yml prints it, e.g. '45' or '45.1'"),
					min_sdk_version: z.string().nullable(),
					target_sdk_version: z.string().nullable(),
					package_name: z.string().nullable()
				}),
				manifest: z.string().nullable(),
				strings: z.array(z.strictObject({
					name: z.string().min(1),
					value: z.string()
				})).describe("Primary string entries; empty when include_strings is false or string_tables_only is true. An unrequested field does not establish an empty table."),
				locale: z.string().nullable(),
				locales: z.array(z.string().min(1)),
				string_tables: z.array(stringTableSchema).optional().describe("Selected decoded table facts, included when locales is supplied, string_tables_only is true, or an explicit string page or budget is requested. Empty when included with include_strings false."),
				decoded_file_count: z.int().nonnegative(),
				coverage: knownCoverageStatusSchema
			})
		};
	})))();
}

//#endregion
//#region dist/contracts/apktool/apktoolToolContracts.js
var APKTOOL_TOOL_CONTRACTS;
function init_apktoolToolContracts() {
	return (init_apktoolToolContracts = __esmMin((() => {
		init_apktoolResourceAnalysis();
		init_toolOutputSchemaPrimitives();
		init_toolEffects();
		APKTOOL_TOOL_CONTRACTS = [{
			name: "inspect_apktool_client",
			cli: true,
			...toolContractMetadata("inspect_apktool_client", toolEffects({
				mutatesSession: true,
				launchesProcess: true
			})),
			description: "Inspect the caller-selected apktool launcher: resolved command, selection source, and version. Decodes nothing. REA never installs Apktool or Java; select a launcher with REA_APKTOOL_COMMAND (absolute) or apktool on PATH.",
			kind: "apktool-provider",
			inputSchema: apktoolInputSchemas.inspect_apktool_client,
			outputSchema: evidenceResultOf(apktoolResultSchemas.inspect_apktool_client),
			examples: [{
				title: "Check the Apktool launcher",
				input: {}
			}]
		}, {
			name: "decode_android_resources",
			cli: true,
			...toolContractMetadata("decode_android_resources", toolEffects({
				mutatesSession: true,
				launchesProcess: true,
				writesFilesystem: true
			})),
			description: "Decode APK resources with apktool d --no-src: readable manifest, version/SDK facts, string resources/locales and decoded file count. Uses a temporary workspace removed after projection; smali/source recovery belongs to JADX. Strings default to 2000 valid entries per table; use string_offset/string_limit and table.page.next_offset for later pages, checking target.sha256 across calls. Per-call string budgets can be raised without restart. decode_timeout_ms controls decoding (default 600000 ms), independently of output capture and version probes.",
			kind: "apktool-provider",
			inputSchema: apktoolInputSchemas.decode_android_resources,
			outputSchema: evidenceResultOf(apktoolResultSchemas.decode_android_resources),
			examples: [
				{
					title: "Decode an APK's resources",
					input: { path: "/targets/Example.apk" }
				},
				{
					title: "Decode one locale's strings",
					input: {
						path: "/targets/Example.apk",
						locale: "de"
					}
				},
				{
					title: "Decode multiple locale string tables in one pass",
					input: {
						path: "/targets/Example.apk",
						locales: ["de", "fr"],
						string_tables_only: true
					}
				},
				{
					title: "Retrieve strings after the default first page",
					input: {
						path: "/targets/Example.apk",
						string_offset: 2e3,
						string_limit: 100,
						string_tables_only: true
					}
				}
			]
		}];
	})))();
}

//#endregion
export { APKTOOL_TOOL_CONTRACTS, DEFAULT_APKTOOL_DECODE_TIMEOUT_MS, DEFAULT_APKTOOL_STRING_LIMIT, DEFAULT_APKTOOL_STRING_TABLE_BYTES, DEFAULT_APKTOOL_TOTAL_STRINGS, DEFAULT_APKTOOL_TOTAL_STRING_TABLE_BYTES, androidLocaleDirectorySuffix, apktoolRequestSchema, apktoolResultSchemas, apktoolStringTablesRequested, classifyAndroidStringsTable, init_apktoolResourceAnalysis, init_apktoolToolContracts };