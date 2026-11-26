import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { i as init_configurationErrors, t as BinaryTargetError } from "./configurationErrors-DgUy2JKH.js";
import { A as absoluteLocalPathStringSchema, J as init_schemaConstraints, K as distinctItems, j as init_localPath } from "./jsonValue-BIEmjG1z.js";
import { i as init_toolEffects, r as evidenceEffects, u as toolContractMetadata } from "./toolEffects-2_RvkT6b.js";
import { Qp as init_toolOutputSchemaPrimitives, a as init_toolOutputSchemaGroups, dn as analysisDetailSchema, em as requireOutputSchema, o as managedOutputSchemas, pn as init_analysisDetail } from "./toolOutputSchemaGroups-CDSPEFEc.js";
import { z } from "zod";

//#region dist/domain/managed/managedInspectionLimits.js
var DEFAULT_MANAGED_SNAPSHOT_BYTES, DEFAULT_MANAGED_REPRESENTATION_BYTES, managedRepresentationLimit, managedInspectionBudgetShape;
function init_managedInspectionLimits() {
	return (init_managedInspectionLimits = __esmMin((() => {
		DEFAULT_MANAGED_SNAPSHOT_BYTES = 128 * 1024 * 1024;
		DEFAULT_MANAGED_REPRESENTATION_BYTES = 64 * 1024 * 1024;
		managedRepresentationLimit = (maximumBytes) => ({
			control_kind: "parameter",
			parameter: "max_metadata_representation_bytes",
			effective_value: maximumBytes,
			unit: "bytes",
			minimum: 1,
			maximum: Number.MAX_SAFE_INTEGER,
			default_value: DEFAULT_MANAGED_REPRESENTATION_BYTES,
			applies_at: "next_call"
		});
		managedInspectionBudgetShape = {
			max_snapshot_bytes: z.int().positive().optional().describe(`Maximum eagerly retained PE snapshot bytes; omitted means ${String(DEFAULT_MANAGED_SNAPSHOT_BYTES)}. Raise for the next call to admit the same larger complete file; no restart. This does not raise metadata representation or host memory.`),
			max_metadata_representation_bytes: z.int().positive().optional().describe(`Maximum accounted metadata, CIL and projected JSON bytes; omitted means ${String(DEFAULT_MANAGED_REPRESENTATION_BYTES)}. Raise for the next call after resource-limit coverage, or select fewer type_names for member inspection. No restart; snapshot, transport and host memory limits remain independent.`)
		};
	})))();
}

//#endregion
//#region dist/contracts/managed/managedToolContracts.js
var managedTargetInputSchema, managedArtifactInputSchema, managedMembersInputSchema, outputSchema, memberOutputSchema, nativeBoundaryOutputSchema, MANAGED_TOOL_CONTRACTS, isManagedToolName;
function init_managedToolContracts() {
	return (init_managedToolContracts = __esmMin((() => {
		init_toolOutputSchemaPrimitives();
		init_toolOutputSchemaGroups();
		init_toolEffects();
		init_localPath();
		init_schemaConstraints();
		init_analysisDetail();
		init_managedInspectionLimits();
		managedTargetInputSchema = z.strictObject({
			...managedInspectionBudgetShape,
			path: absoluteLocalPathStringSchema.describe("Explicit absolute managed PE/CLI path; omit to reuse the previously selected managed target").optional()
		});
		managedArtifactInputSchema = managedTargetInputSchema.extend({ detail: analysisDetailSchema });
		managedMembersInputSchema = managedArtifactInputSchema.extend({ type_names: distinctItems(z.array(z.string().min(1).describe("Exact declaring-type full_name: namespace-qualified for top-level types (System.Threading.Monitor); nested types report their bare name, so it selects every nested type of that name")).min(1), "type_names must not repeat a name").describe("Inspect only the fields, methods, call edges, and field accesses declared by these exact type full names, and the user strings their method bodies load; omit to inspect every type. Unmatched names are reported in selection.unmatched_type_names.").optional() });
		outputSchema = requireOutputSchema(managedOutputSchemas, "inspect_managed_artifact");
		memberOutputSchema = requireOutputSchema(managedOutputSchemas, "inspect_managed_members");
		nativeBoundaryOutputSchema = requireOutputSchema(managedOutputSchemas, "inspect_managed_native_boundaries");
		MANAGED_TOOL_CONTRACTS = [
			{
				name: "inspect_managed_artifact",
				cli: true,
				retainedSummary: { evidenceParameters: "omit-detail" },
				...toolContractMetadata("inspect_managed_artifact", evidenceEffects),
				description: "Inspect PE/CLI identity, classification and metadata inventories from an explicit path or selected managed target without loading or executing code. Default complete returns all producer facts; detail summary retains them and returns identity, assembly/MVID, frameworks, coverage and counts. Page references/resources/attributes with inspect_analysis_view kind managed and normalized_result.parent_evidence_id. Counts cover returned rows; partial, malformed and unavailable metadata stay explicit. Tokens are build-local. Use inspect_managed_members for methods, signatures and CIL anchors.",
				kind: "managed-provider",
				inputSchema: managedArtifactInputSchema,
				outputSchema,
				examples: [{
					title: "Example inspect managed artifact request",
					input: { path: "/tmp/Example.dll" }
				}, {
					title: "Inspect identity and coverage without unrelated metadata inventories",
					input: {
						path: "/tmp/Example.dll",
						detail: "summary"
					}
				}]
			},
			{
				name: "inspect_managed_members",
				cli: true,
				retainedSummary: { evidenceParameters: "omit-detail" },
				...toolContractMetadata("inspect_managed_members", evidenceEffects),
				description: "Inspect PE/CLI types, members, signatures, CIL hashes/instruction tuples, exception regions, static calls, field accesses and loaded #US strings without executing code. type_names selects exact declaring types and their body literals; assembly-wide member_refs/exported_types are still included. Tokens remain local to artifact SHA-256/MVID; tuple hashes do not resolve them or fully commit control flow. Default complete returns collections; detail summary retains them for inspect_analysis_view kind managed-members using parent_evidence_id. Page types/exported_types/fields/methods/member_refs/call_edges/field_accesses/user_strings or unresolved_definitions for checked rows with failed name columns. Exact names/declaring_types and fields narrow supported rows. Omit body to avoid IL anchors. Unmatched names and incomplete coverage stay explicit.",
				kind: "managed-provider",
				inputSchema: managedMembersInputSchema,
				outputSchema: memberOutputSchema,
				examples: [
					{
						title: "Example inspect managed members request",
						input: {}
					},
					{
						title: "Example inspect selected managed types request",
						input: {
							path: "/tmp/mscorlib.dll",
							type_names: ["System.Threading.Monitor"]
						}
					},
					{
						title: "Summarize selected managed types and retain their members",
						input: {
							path: "/tmp/mscorlib.dll",
							type_names: ["System.Threading.Monitor"],
							detail: "summary"
						}
					}
				]
			},
			{
				name: "inspect_managed_native_boundaries",
				cli: true,
				...toolContractMetadata("inspect_managed_native_boundaries", evidenceEffects),
				description: "Inspect PE/CLI ModuleRef, ImplMap/PInvoke declarations, CLI native-header indicators, and non-IL method implementation flags without loading or executing target code. Results are managed declarations and degraded native-boundary observations, not verified native exports or addresses.",
				kind: "managed-provider",
				inputSchema: managedTargetInputSchema,
				outputSchema: nativeBoundaryOutputSchema,
				examples: [{
					title: "Example inspect managed/native boundary request",
					input: {}
				}]
			}
		];
		isManagedToolName = (name) => MANAGED_TOOL_CONTRACTS.some((contract) => contract.name === name);
	})))();
}

//#endregion
//#region dist/domain/binaryTargetFilesystemFailure.js
var classifyBinaryTargetFilesystemFailure, classifyTargetFilesystemFailure, filesystemErrorCode, targetFailureReason;
function init_binaryTargetFilesystemFailure() {
	return (init_binaryTargetFilesystemFailure = __esmMin((() => {
		init_configurationErrors();
		classifyBinaryTargetFilesystemFailure = (path, cause) => classifyTargetFilesystemFailure(path, cause, "read");
		classifyTargetFilesystemFailure = (path, cause, stage) => {
			if (!(cause instanceof Error)) return undefined;
			const code = filesystemErrorCode(cause);
			return code === undefined ? undefined : new BinaryTargetError(path, targetFailureReason(code, cause.message, stage), { cause });
		};
		filesystemErrorCode = (cause) => {
			const code = Reflect.get(cause, "code");
			return typeof code === "string" ? code : undefined;
		};
		targetFailureReason = (code, detail, stage) => {
			switch (code) {
				case "ENOENT":
				case "ENOTDIR": return `target does not exist or a path component is not a directory: ${detail}`;
				case "EACCES":
				case "EPERM": return `permission denied while reading target: ${detail}`;
				case "EISDIR": return `target is a directory, not a readable file: ${detail}`;
				case "ENOTFILE": return "target is not a regular file";
				case "ELOOP": return stage === "resolve" ? `target path could not be resolved: too many symbolic links or a symbolic link loop: ${detail}` : `target changed while being opened: ${detail}`;
				default: return `target could not be read (${code}): ${detail}`;
			}
		};
	})))();
}

//#endregion
export { init_managedToolContracts as a, managedMembersInputSchema as c, DEFAULT_MANAGED_SNAPSHOT_BYTES as d, init_managedInspectionLimits as f, MANAGED_TOOL_CONTRACTS as i, managedTargetInputSchema as l, classifyTargetFilesystemFailure as n, isManagedToolName as o, managedRepresentationLimit as p, init_binaryTargetFilesystemFailure as r, managedArtifactInputSchema as s, classifyBinaryTargetFilesystemFailure as t, DEFAULT_MANAGED_REPRESENTATION_BYTES as u };