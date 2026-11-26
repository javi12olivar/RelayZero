import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisError, AnalysisInputError, EvidenceIntegrityError, EvidenceReferenceError, init_analysisErrorBase, init_analysisErrorCore, init_evidenceErrors } from "./jsonSerialization-DAF9DVXC.js";
import { absoluteCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ArtifactResourceScope, init_ArtifactResourceScope, init_resources } from "./resources-B3P64jvH.js";
import { RECREATE_EVIDENCE_GUIDANCE, createEvidence, evidenceSubjectTarget, evidenceTargetIdentity, init_evidence, init_evidenceFormat, init_evidenceValidation, readEvidence, rebindEvidenceToTargetPath } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, sameTargetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand, registerContractDocumentCommand, runOnSessionTarget } from "./contractCommand-Di2ugplH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { init_EvidenceInputResolver, resolveEvidenceInput, resolvePairedEvidenceSources } from "./EvidenceInputResolver-DpJOzfQ9.js";
import { artifactInventorySummaryViewResultSchema, init_analysisViewResult } from "./analysisViewResult-vDCF9Pxo.js";
import { init_AnalysisViewService, inspectAnalysisViewValidated } from "./AnalysisViewService-D_M3W3PD.js";
import { finishAnalysisCommand, init_finishAnalysisCommand } from "./finishAnalysisCommand-TJ8a_9z-.js";
import { ARTIFACT_COMPARISON_PROVIDER, OPEN_BINARY_TOOL_CONTRACT, SESSION_TOOL_CONTRACTS, artifactComparisonInputSchema, compareArtifacts, init_artifactComparison, init_artifactComparisonContracts, init_comparisonEvidenceIdentity, init_sessionToolContracts } from "./sessionToolContracts-D9XcfL6p.js";
import { ARTIFACT_TOOL_CONTRACTS, init_artifactToolContracts } from "./artifactToolContracts-CuhZwra_.js";
import { randomUUID } from "node:crypto";
import { tmpdir } from "node:os";

//#region dist/application/artifacts/ArtifactExtractionDestination.js
var createArtifactExtractionDestination;
function init_ArtifactExtractionDestination() {
	return (init_ArtifactExtractionDestination = __esmMin((() => {
		init_callerPath();
		createArtifactExtractionDestination = (outputRoot) => outputRoot ?? absoluteCallerPath(`${tmpdir()}/rea-extracted-${randomUUID()}`);
	})))();
}

//#endregion
//#region dist/application/artifacts/ArtifactComparisonEvidence.js
var OPERATION, resolveArtifactComparisonSources, compareArtifactEvidence, resolveArtifactComparisonEvidence, mismatch, artifactComparisonExecution, artifactUnknownInput;
function init_ArtifactComparisonEvidence() {
	return (init_ArtifactComparisonEvidence = __esmMin((() => {
		init_EvidenceInputResolver();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_AnalysisViewService();
		init_artifactComparisonContracts();
		init_AnalysisInput();
		init_analysisViewResult();
		init_artifactComparison();
		init_comparisonEvidenceIdentity();
		init_evidenceErrors();
		init_evidence();
		init_evidenceValidation();
		init_evidenceFormat();
		init_result();
		init_targetIdentity();
		OPERATION = "compare_artifacts";
		resolveArtifactComparisonSources = async (input, evidenceById, options = {}) => {
			const request = parseAnalysisInput(OPERATION, input, artifactComparisonInputSchema, options.signal);
			if (!request.ok) return request;
			return resolvePairedEvidenceSources(request.value, evidenceById, {
				...options,
				operation: OPERATION,
				resolveEvidence: (candidate, related, side) => {
					const authenticated = readEvidence(candidate);
					return authenticated.ok ? resolveArtifactComparisonEvidence(authenticated.value, related, [side]) : authenticated;
				}
			});
		};
		compareArtifactEvidence = ({ left, right }) => {
			let comparison;
			try {
				comparison = compareArtifacts(left, right);
			} catch (cause) {
				if (cause instanceof AnalysisError) return err(cause);
				throw cause;
			}
			const leftEvidenceIds = [left.evidence_id];
			const rightEvidenceIds = [right.evidence_id];
			return ok({
				comparison,
				evidence: createEvidence(unknownTarget("derived-from-linked-evidence"), ARTIFACT_COMPARISON_PROVIDER, {
					predicateType: "rea.artifact-comparison",
					operation: OPERATION,
					parameters: {
						left_evidence_ids: leftEvidenceIds,
						right_evidence_ids: rightEvidenceIds
					},
					result: comparison,
					confidence: "derived",
					authority: "analyst-inference",
					limitations: comparison.limitations,
					evidenceLinks: [...leftEvidenceIds, ...rightEvidenceIds]
				})
			});
		};
		resolveArtifactComparisonEvidence = (evidence, evidenceById, path = []) => {
			if (evidence.operation !== "inspect_analysis_view") return ok(evidence);
			const summary = artifactInventorySummaryViewResultSchema.safeParse(evidence.normalized_result);
			if (!summary.success) return err(new AnalysisInputError(OPERATION, undefined, [{
				path: [...path],
				reason: "invalid_value",
				message: "Artifact comparison accepts only an artifact inventory summary from inspect_analysis_view."
			}]));
			const parentId = summary.data.parent_evidence_id;
			const parent = evidenceById?.(parentId);
			if (parent === undefined) return err(new EvidenceReferenceError(parentId, "missing", {
				expected: "retained complete artifact inventory Evidence",
				actual: null
			}));
			const selected = resolveEvidenceInput({
				kind: "retained-evidence",
				evidence_id: parentId
			}, () => parent);
			if (!selected.ok) return selected;
			const authenticated = readEvidence(selected.value);
			if (!authenticated.ok) return authenticated;
			const owner = authenticated.value;
			const identity = evidenceTargetIdentity(evidence);
			const ownerIdentity = evidenceTargetIdentity(owner);
			const target = evidenceSubjectTarget(evidence.subject);
			if (identity === null || ownerIdentity === null || target === undefined || !sameTargetIdentity(identity, ownerIdentity)) return mismatch();
			const { name: _name, ...aliasTarget } = target;
			const presentation = rebindEvidenceToTargetPath(owner, {
				...aliasTarget,
				path: summary.data.artifact.path
			});
			const reprojected = inspectAnalysisViewValidated({
				source: {
					kind: "retained-evidence",
					evidence_id: parentId
				},
				view: { kind: "summary" }
			}, (evidenceId) => evidenceId === parentId ? presentation : undefined);
			if (!reprojected.ok) return reprojected;
			if (reprojected.value.evidence_id !== evidence.evidence_id) return mismatch();
			return ok(owner);
		};
		mismatch = () => err(new EvidenceIntegrityError(`Artifact summary does not match its retained parent inventory. A summary from an earlier Evidence format no longer matches. ${RECREATE_EVIDENCE_GUIDANCE}`));
		artifactComparisonExecution = (sources) => {
			const compared = compareArtifactEvidence(sources);
			if (!compared.ok) return compared;
			const { left, right } = sources;
			const { comparison, evidence } = compared.value;
			return ok({
				evidence,
				sources: [left, right],
				unknown: artifactUnknownInput(left, right, comparison, evidence.evidence_id)
			});
		};
		artifactUnknownInput = (left, right, comparison, comparisonEvidenceId) => {
			const { status } = comparison;
			if (status === "unchanged") return undefined;
			const sourceIds = [...new Set([left.evidence_id, right.evidence_id])];
			const contradictingIds = comparison.integrity_mismatch_evidence_ids ?? [];
			const contentContradictions = status === "changed" && left.evidence_id !== right.evidence_id ? [right.evidence_id] : [];
			const contradictions = contradictingIds.length > 0 ? contradictingIds : contentContradictions;
			return {
				question: `Artifact comparison is ${status} (comparison ${comparisonEvidenceId})`,
				severity: status === "unknown" || status === "truncated" ? "high" : "medium",
				domain: "artifact-comparison",
				supporting_evidence_ids: sourceIds.filter((id) => !contradictions.includes(id)),
				contradicting_evidence_ids: contradictions,
				required_authority: "shipped-artifact",
				required_confidence: "observed",
				required_environment: null,
				recommended_probes: [{
					operation: "inspect_artifact",
					rationale: "Inspect both artifacts and compare their complete graphs."
				}],
				relationships: []
			};
		};
	})))();
}

//#endregion
//#region dist/cli/artifactComparisonCommand.js
var registerArtifactComparisonCommand;
function init_artifactComparisonCommand() {
	return (init_artifactComparisonCommand = __esmMin((() => {
		init_ArtifactComparisonEvidence();
		init_resources();
		init_sessionToolContracts();
		init_comparisonEvidenceIdentity();
		init_contractCliDescription();
		init_contractCommand();
		init_finishAnalysisCommand();
		registerArtifactComparisonCommand = (cli, logger) => registerContractDocumentCommand(cli, logger, contractNamed(SESSION_TOOL_CONTRACTS, "compare_artifacts"), {
			description: "Compare two artifact inventories, including FIT and legacy uImage firmware components, named as {left, right}: complete Evidence or {kind:\"evidence-file\",path,evidence_id?}. A one-shot command retains no session Evidence for retained-evidence references.",
			document: "Inline workflow JSON or JSON file path",
			callerPaths: [["left", "path"], ["right", "path"]]
		}, async (document, { signal, operation }) => {
			const resources = new ArtifactResourceScope();
			const result = await finishAnalysisCommand(async () => {
				const sources = await resolveArtifactComparisonSources(document, undefined, {
					signal,
					resources
				});
				if (!sources.ok) return sources;
				const compared = compareArtifactEvidence(sources.value);
				return compared.ok ? {
					ok: true,
					value: compared.value.evidence
				} : compared;
			}, resources, ARTIFACT_COMPARISON_PROVIDER.id, operation, signal);
			return result.ok ? result.value : {
				error: "Application workflow failed",
				...result.error
			};
		});
	})))();
}

//#endregion
//#region dist/cli/artifactCommands.js
var artifactCommands_exports = /* @__PURE__ */ __exportAll({ registerArtifactCommands: () => registerArtifactCommands });
var registerArtifactCommands, artifactTarget, artifactFields, registerInventoryCommands, registerAppleBundleCommands;
function init_artifactCommands() {
	return (init_artifactCommands = __esmMin((() => {
		init_artifactToolContracts();
		init_sessionToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_ArtifactExtractionDestination();
		init_artifactComparisonCommand();
		registerArtifactCommands = (cli, logger, runProviderAnalysis) => {
			registerInventoryCommands(cli, logger, runProviderAnalysis);
			registerArtifactComparisonCommand(cli, logger);
			registerAppleBundleCommands(cli, logger, runProviderAnalysis);
		};
		artifactTarget = {
			description: "Application or package path",
			open: {
				contract: OPEN_BINARY_TOOL_CONTRACT,
				fields: {
					format: {
						name: "targetFormat",
						values: ["esp-flash-image"],
						description: "Read the target as an ESP flash dump; required with --flash-offset or --partition-table-offset"
					},
					flash_offset: { description: "Flash address (0xhex) of the dump's first byte" },
					partition_table_offset: { description: "Flash address (0xhex, a multiple of 0x1000) of the partition table; disables the table scan" }
				}
			}
		};
		artifactFields = {
			artifact_limits: { description: "JSON artifact producer admissions: bun, dotnet_bundle, node_sea, godot, and expanded_bytes. Omitted fields keep defaults; changes apply on the next call without restart. Independent of summary/paging and client delivery limits." },
			integrity_policy: { description: "Behavior when declared artifact integrity does not match" }
		};
		registerInventoryCommands = (cli, logger, runProviderAnalysis) => {
			const run = runOnSessionTarget(runProviderAnalysis, logger);
			registerContractCommand(cli, logger, contractNamed(ARTIFACT_TOOL_CONTRACTS, "inspect_artifact"), {
				description: "Inspect one artifact and return all available observations and next probes",
				sessionTarget: artifactTarget,
				jsonText: ["artifact_limits"],
				fields: artifactFields,
				evidenceDelivery: true
			}, run);
			registerContractCommand(cli, logger, contractNamed(ARTIFACT_TOOL_CONTRACTS, "extract_artifact"), {
				description: "Extract all or selected regular artifact contents safely; DMG extraction is unavailable",
				sessionTarget: artifactTarget,
				jsonText: ["artifact_limits"],
				fields: {
					...artifactFields,
					occurrence_ids: {
						name: "occurrenceId",
						description: "Inventory occurrence ID to extract (repeatable); omit to extract all regular entries"
					}
				}
			}, (input, context) => run({
				...input,
				output_root: createArtifactExtractionDestination(input.output_root)
			}, context));
		};
		registerAppleBundleCommands = (cli, logger, runProviderAnalysis) => {
			const run = runOnSessionTarget(runProviderAnalysis, logger);
			const contract = (name) => contractNamed(ARTIFACT_TOOL_CONTRACTS, name);
			registerContractCommand(cli, logger, contract("inspect_keyed_archive"), {
				description: "Inspect a Foundation keyed archive as an object-reference graph",
				sessionTarget: { description: "Foundation plist archive or Apple app bundle" },
				positionals: ["path"],
				fields: {
					path: {
						name: "archive",
						description: "Relative archive path when the target is a bundle"
					},
					root: { description: "Named $top archive root" },
					offset: { description: "First original object-table index" },
					limit: { description: "Maximum object-table entries to return" }
				}
			}, run);
			registerContractCommand(cli, logger, contract("trace_dylib_resolution"), {
				description: "Trace dyld load-path resolution for a Mach-O or every executable in an app bundle",
				sessionTarget: { description: "Mach-O file or Apple .app bundle path" },
				fields: {
					roots: {
						name: "root",
						description: "Process root relative to the bundle or the Mach-O's directory (repeatable)"
					},
					architecture: { description: "Trace only this slice of each root" }
				}
			}, run);
			registerContractCommand(cli, logger, contract("inspect_asset_catalog"), {
				description: "Inspect compiled Apple asset catalog metadata",
				sessionTarget: { description: "Apple .app bundle path" },
				fields: {
					offset: { description: "First metadata record" },
					limit: { description: "Maximum records to return" }
				}
			}, run);
			registerContractCommand(cli, logger, contract("decode_interface_builder"), {
				description: "Decode compiled storyboard and nib archives from an app bundle",
				sessionTarget: { description: "Apple .app bundle path" },
				fields: {
					max_documents: { description: "Maximum archives to decode" },
					max_objects: { description: "Maximum graph objects" },
					max_connections: { description: "Maximum decoded connections" }
				},
				omit: { detail: "One-shot output is complete Evidence; this command has no summary delivery" }
			}, run);
		};
	})))();
}

//#endregion
export { artifactCommands_exports, init_artifactCommands };