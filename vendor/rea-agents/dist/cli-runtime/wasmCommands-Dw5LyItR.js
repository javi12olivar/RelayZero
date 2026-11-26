import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisArtifactChangedError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, DEFAULT_WASM_COMMAND_TIMEOUT_MS, DEFAULT_WASM_INTERFACE_REPRESENTATION_BYTES, MAX_NODE_TIMER_DELAY_MS, MAX_WASM_ARTIFACT_PATHS, MAX_WASM_INTERFACE_REPRESENTATION_BYTES, WABT_SOURCE_COMMIT, WABT_VERSION, WASM_RESOURCE_DEFAULTS, WASM_RESOURCE_MAXIMUMS, analysisSettingLimit, cancelledBy, errorMessage, hostRangeErrorKind, init_analysisErrorBase, init_analysisErrorCore, init_analysisResourceLimits, init_analysisSettingDefinitions, init_coverage, init_errorMessage, init_parseFailure, init_sha256Hex, init_wasmArtifact, init_wasmInterface, inspectWasmArtifactInputSchema, isAborted, joinCoverageStatus, selectedAnalysisSetting, sha256Hex, wasmArtifactMatchesSubject, wasmArtifactSchema, wasmInterfaceEntryRepresentationBytes, wasmResourceLimits } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, decodeStrictUtf8, init_HostPlatform, init_strictUtf8, isStrictUtf8 } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { absoluteCallerPath, appendCallerPath, init_callerPath } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_snapshotEnvironment, snapshotEnvironment } from "./snapshotEnvironment-ftfZc5dr.js";
import { init_analysisErrorProjection, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { cliCommandFor, init_cliCommandNames } from "./cliCommandNames-DZy9lizl.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactReaderFailure, ArtifactResourceRetryFailure, ArtifactResourceScope, artifactFilePrimaryFacts, bindArtifactFileCleanup, completedStableArtifact, init_AnalysisCleanupLease, init_ArtifactFileOperation, init_ArtifactReader, init_ArtifactResourceScope, init_readStableArtifact, init_resources, readStableArtifact } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { RuntimeControlUnavailableError, init_runtimeControlUnavailableError, runtimeControlCapabilityError } from "./WindowsNativeLoader-CCqowxwW.js";
import { PrivateRuntimeRoot, init_PrivateRuntimeRoot } from "./PrivateRuntimeRoot-Crw0AiAK.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { init_SignalAbort, isAbortOf } from "./SignalAbort-Cf4OmA08.js";
import { createEvidence, evidenceEnvelopeForAdmission, evidenceFileTarget, init_evidence, init_evidenceValidation, safeParseEvidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { init_contractCommand, inspectWithService, registerContractCommand, registerContractDocumentCommand } from "./contractCommand-Di2ugplH.js";
import { init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { init_EvidenceInputResolver, init_JsonAuthenticationHeadroom, requireAuthenticationHeadroom, resolveEvidenceRequest } from "./EvidenceInputResolver-DpJOzfQ9.js";
import { ARTIFACT_COMPARISON_PROVIDER, init_comparisonEvidenceIdentity } from "./sessionToolContracts-D9XcfL6p.js";
import { analysisExecutionEnvelopeForAdmission, createAnalysisExecutionEvidence, init_analysisObservation } from "./analysisObservation-BSCFvtEd.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { init_utf8HeadExcerpt, utf8HeadExcerpt } from "./utf8HeadExcerpt-BO0eOwRw.js";
import { OwnedCommandFailure, init_OwnedCommand, runOwnedCommand } from "./OwnedCommand-9zrM5O3T.js";
import { init_javascriptSemanticTraversal, init_javascriptSourceParser, parseJavaScriptSource, traverseJavaScriptAst } from "./javascriptSourceParser-DNZsD0XO.js";
import { classifyProviderFailure, init_classifyProviderFailure } from "./classifyProviderFailure-BA0K6bTF.js";
import { ULEB32, init_leb128, readLeb128 } from "./leb128-QVew1RrX.js";
import { COMPARE_WASM_INTERFACES_CONTRACT, INSPECT_WASM_ARTIFACT_CONTRACT, compareWasmInterfacesInputSchema, init_wasmComparisonContracts, init_wasmToolContracts, wasmInterfaceComparisonSchema } from "./wasmToolContracts-BdlCpRGM.js";
import { init_recordEvidenceSources, withEvidenceSources } from "./recordEvidenceSources-BFkP6hRB.js";
import { createAnalysisExecution, init_AnalysisProvider } from "./AnalysisProvider-DYXYprX8.js";
import { assertArtifactCommandPath, init_ArtifactCommandPath, selectArtifactCommandPath } from "./ArtifactCommandPath-B5Zuhaxu.js";
import { evidenceBundleOption, init_evidenceInputCommand, runEvidenceInputCommand } from "./evidenceInputCommand-CWa4Fz9G.js";
import { constants } from "node:fs";
import { basename, dirname, isAbsolute, join } from "node:path";
import { satisfies, valid } from "semver";
import { constants as constants$1 } from "node:buffer";
import { randomUUID } from "node:crypto";
import { access, writeFile } from "node:fs/promises";
import { setImmediate } from "node:timers/promises";
import * as t from "@babel/types";

//#region dist/domain/wasm/wasmInterfaceBudget.js
var WasmInterfaceBudget;
function init_wasmInterfaceBudget() {
	return (init_wasmInterfaceBudget = __esmMin((() => {
		init_budget();
		init_analysisErrorCore();
		init_wasmInterface();
		WasmInterfaceBudget = class {
			operation;
			#bytes;
			maximumBytes;
			source;
			constructor(maximumBytes, operation = "inspect_wasm_artifact") {
				this.operation = operation;
				this.maximumBytes = maximumBytes ?? 33554432;
				this.source = maximumBytes === undefined ? "default" : "request";
				this.#bytes = new Budget(this.maximumBytes);
			}
			reserve(bytes) {
				this.#bytes.charge(bytes, () => this.#exhausted());
			}
			#exhausted() {
				return new AnalysisResourceConstraintError(this.operation, "capacity", `Typed WASM interface representation exceeds max_interface_bytes (${String(this.maximumBytes)} bytes)`, {
					maximum_bytes: this.maximumBytes,
					default_bytes: DEFAULT_WASM_INTERFACE_REPRESENTATION_BYTES,
					maximum_supported_bytes: MAX_WASM_INTERFACE_REPRESENTATION_BYTES,
					source: this.source,
					unit: "bytes"
				}, {
					retryable: false,
					remediationAction: `${this.maximumBytes < MAX_WASM_INTERFACE_REPRESENTATION_BYTES ? `Raise max_interface_bytes above ${String(this.maximumBytes)} bytes (maximum ${String(MAX_WASM_INTERFACE_REPRESENTATION_BYTES)}) on the next ${this.operation} call.` : `max_interface_bytes is already at the runtime representation maximum of ${String(MAX_WASM_INTERFACE_REPRESENTATION_BYTES)} bytes; no higher interface allowance is supported. A comparison may select only imports or exports; otherwise report the unsupported complete representation.`} No restart is required. Other output, heap and deadline controls do not raise this allowance. A comparison cannot restore facts omitted from partial producer Evidence; inspect the original module with a larger producer budget first when that budget is below its maximum.`
				});
			}
		};
	})))();
}

//#endregion
//#region dist/application/wasm/WasmInterfaceComparisonService.js
var OPERATION$3, parseInspection, inspectionInputFailure, compareWasmInterfaces;
function init_WasmInterfaceComparisonService() {
	return (init_WasmInterfaceComparisonService = __esmMin((() => {
		init_targetIdentity();
		init_coverage();
		init_wasmInterface();
		init_JsonAuthenticationHeadroom();
		init_comparisonEvidenceIdentity();
		init_wasmComparisonContracts();
		init_evidence();
		init_wasmArtifact();
		init_analysisErrorCore();
		init_wasmInterfaceBudget();
		init_analysisErrorBase();
		init_result();
		init_EvidenceInputResolver();
		init_evidenceValidation();
		init_ProviderOperationExecution();
		init_recordEvidenceSources();
		OPERATION$3 = "compare_wasm_interfaces";
		parseInspection = (raw, side) => {
			const authenticated = safeParseEvidence(raw);
			if (!authenticated.ok) return inspectionInputFailure(authenticated.error, side);
			const evidence = authenticated.value;
			if (evidence.operation !== "inspect_wasm_artifact") return inspectionInputFailure(new TypeError("Expected complete inspect_wasm_artifact Evidence"), side);
			const parsed = wasmArtifactSchema.safeParse(evidence.normalized_result);
			if (!parsed.success) return inspectionInputFailure(parsed.error, side);
			const result = parsed.data;
			if (!wasmArtifactMatchesSubject(result.artifact, evidenceFileTarget(evidence)) || evidence.parameters.path !== result.artifact.path) return inspectionInputFailure(new TypeError("WASM Evidence subject/selection does not match normalized artifact identity"), side);
			return ok({
				evidence,
				result
			});
		};
		inspectionInputFailure = (cause, side) => err(new AnalysisInputError(OPERATION$3, { cause }, [{
			path: [side],
			reason: "invalid_value",
			message: cause.message
		}]));
		compareWasmInterfaces = async (rawInput, options, lookup) => {
			if (options?.signal?.aborted) return err(cancelledBy(OPERATION$3, options.signal));
			const resolved = resolveEvidenceRequest(OPERATION$3, rawInput, compareWasmInterfacesInputSchema, lookup, options);
			if (!resolved.ok) return resolved;
			const assertActive = () => {
				if (options?.signal?.aborted) throw cancelledBy(OPERATION$3, options.signal);
			};
			try {
				await setImmediate();
				assertActive();
				const parsedLeft = parseInspection(resolved.value.input.left, "left");
				if (!parsedLeft.ok) return parsedLeft;
				const parsedRight = parseInspection(resolved.value.input.right, "right");
				if (!parsedRight.ok) return parsedRight;
				const left = parsedLeft.value;
				const right = parsedRight.value;
				const scope = resolved.value.input.scope;
				const selected = (entry) => scope === "both" || entry.direction === (scope === "imports" ? "import" : "export");
				const groups = new Map();
				const budget = new WasmInterfaceBudget(resolved.value.input.max_interface_bytes, OPERATION$3);
				let work = 0;
				for (const [side, inspection] of [["left", left], ["right", right]]) {
					for (const entry of inspection.result.interface?.entries ?? []) {
						if (++work % 256 === 0) {
							await setImmediate();
							assertActive();
						}
						if (!selected(entry)) continue;
						budget.reserve(wasmInterfaceEntryRepresentationBytes(entry));
						const key = JSON.stringify([
							entry.direction,
							entry.module,
							entry.name
						]);
						let group = groups.get(key);
						if (group === undefined) {
							budget.reserve(512);
							group = {
								left: [],
								right: [],
								entry
							};
							groups.set(key, group);
						}
						group[side].push(entry);
					}
				}
				const knownInventory = (inspection) => inspection.result.interface?.state === "complete";
				const changes = [];
				const summary = {
					added: 0,
					removed: 0,
					changed: 0,
					unchanged: 0,
					unknown: 0
				};
				for (const group of groups.values()) {
					if (++work % 256 === 0) {
						await setImmediate();
						assertActive();
					}
					let state;
					let reason = null;
					const l = group.left[0];
					const r = group.right[0];
					if (group.left.length > 1 || group.right.length > 1) {
						state = "unknown";
						reason = "Duplicate interface names are ambiguous; all occurrences retained";
					} else if (!knownInventory(left) || !knownInventory(right)) {
						state = "unknown";
						reason = "Incomplete interface inventories cannot establish per-key uniqueness or absence";
					} else if ([l, r].some((entry) => entry !== undefined && (entry.signature === null || entry.issue !== null || entry.kind === "unknown"))) {
						state = "unknown";
						reason = "Signature/type semantics were not admitted for every present entry";
					} else if (l === undefined) state = "added";
					else if (r === undefined) state = "removed";
					else if (l.kind !== r.kind) state = "changed";
					else state = JSON.stringify(l.signature) === JSON.stringify(r.signature) ? "unchanged" : "changed";
					summary[state]++;
					changes.push({
						direction: group.entry.direction,
						module: group.entry.module,
						name: group.entry.name,
						state,
						left: group.left,
						right: group.right,
						reason
					});
				}
				const compareText = (a, b) => a < b ? -1 : a > b ? 1 : 0;
				changes.sort((a, b) => compareText(a.direction, b.direction) || compareText(a.module ?? "", b.module ?? "") || compareText(a.name, b.name));
				const sideCoverage = (inspection) => inspection.result.interface === undefined ? "unknown" : knownInventory(inspection) ? "complete" : "partial";
				const joined = joinCoverageStatus([
					sideCoverage(left),
					sideCoverage(right),
					summary.unknown > 0 ? "partial" : "complete"
				]);
				const coverage = joined === "complete" ? "complete-within-inputs" : joined;
				const limitations = ["Exact declared interface equality is not runtime/ABI compatibility, successful linking or original-source identity.", "Typed facts come from the selected validated WABT decoding; unsupported signature semantics and duplicate names remain unknown."];
				const observedReport = {
					left: {
						evidence_id: left.evidence.evidence_id,
						artifact: left.result.artifact
					},
					right: {
						evidence_id: right.evidence.evidence_id,
						artifact: right.result.artifact
					},
					scope,
					coverage,
					changes,
					summary,
					limitations
				};
				const observation = {
					operation: OPERATION$3,
					predicateType: "rea.wasm-interface-comparison",
					parameters: {
						left_evidence_id: left.evidence.evidence_id,
						right_evidence_id: right.evidence.evidence_id,
						scope,
						...resolved.value.input.max_interface_bytes === undefined ? {} : { max_interface_bytes: resolved.value.input.max_interface_bytes }
					},
					result: observedReport,
					confidence: "derived",
					authority: "analyst-inference",
					limitations,
					evidenceLinks: [left.evidence.evidence_id, right.evidence.evidence_id]
				};
				const admission = requireAuthenticationHeadroom(evidenceEnvelopeForAdmission(unknownTarget("derived-from-linked-evidence"), ARTIFACT_COMPARISON_PROVIDER, observation), {
					operation: OPERATION$3,
					path: "selected WASM Evidence",
					description: "Complete WASM comparison Evidence cannot be assembled",
					serializedCodeUnitLimit: constants$1.MAX_STRING_LENGTH
				});
				if (!admission.ok) return admission;
				const report = wasmInterfaceComparisonSchema.parse(observedReport);
				const evidence = createEvidence(unknownTarget("derived-from-linked-evidence"), ARTIFACT_COMPARISON_PROVIDER, {
					...observation,
					result: report
				});
				await setImmediate();
				const completed = completeProviderEvidence(evidence, options?.signal);
				const sources = [left.evidence, right.evidence];
				return withEvidenceSources(completed.ok ? ok({
					evidence: completed.value,
					sources
				}) : completed, sources);
			} catch (cause) {
				if (cause instanceof AnalysisError) return err(cause);
				throw cause;
			}
		};
	})))();
}

//#endregion
//#region dist/application/wasm/WasmArtifactService.js
var OPERATION$2, WasmArtifactService;
function init_WasmArtifactService() {
	return (init_WasmArtifactService = __esmMin((() => {
		init_analysisSettingDefinitions();
		init_analysisObservation();
		init_analysisErrorCore();
		init_wasmArtifact();
		init_result();
		init_ProviderOperationExecution();
		init_AnalysisInput();
		init_JsonAuthenticationHeadroom();
		OPERATION$2 = "inspect_wasm_artifact";
		WasmArtifactService = class {
			provider;
			settings;
			constructor(provider, settings) {
				this.provider = provider;
				this.settings = settings;
			}
			/** Join provider cleanup during shutdown or an explicit retry. */
			close() {
				return this.provider.close();
			}
			/** Preserve exact selected artifact identity and validated upstream observations. */
			async inspect(rawInput, options) {
				const input = parseAnalysisInput(OPERATION$2, rawInput, inspectWasmArtifactInputSchema, options?.signal);
				if (!input.ok) return input;
				const maximumPaths = input.value.max_artifact_paths ?? 16;
				for (const field of ["glue_paths", "candidate_paths"]) {
					if (input.value[field].length > maximumPaths) return err(new AnalysisResourceConstraintError(OPERATION$2, "capacity", `${field} exceeds max_artifact_paths (${String(maximumPaths)} paths)`, {
						maximum_paths: maximumPaths,
						default_paths: 16,
						source: input.value.max_artifact_paths === undefined ? "default" : "request",
						selected_paths: input.value[field].length,
						input_field: field
					}, {
						retryable: false,
						remediationAction: `Raise max_artifact_paths to at least ${String(input.value[field].length)} (maximum ${String(MAX_WASM_ARTIFACT_PATHS)}); then retry the same selection. The value applies on the next inspection without restart. File and command byte budgets remain independent.`,
						limit: {
							control_kind: "parameter",
							parameter: "max_artifact_paths",
							effective_value: maximumPaths,
							unit: "count",
							minimum: 1,
							maximum: MAX_WASM_ARTIFACT_PATHS,
							default_value: 16,
							applies_at: "next_call"
						}
					}));
				}
				const timeout = selectedAnalysisSetting(input.value.command_timeout_ms, this.settings?.().overrides["wasm.command_timeout_ms"], DEFAULT_WASM_COMMAND_TIMEOUT_MS);
				const inspected = await this.provider.inspect(input.value, {
					...options,
					commandTimeoutMs: timeout.value,
					commandTimeoutSource: timeout.source
				});
				if (!inspected.ok) return inspected;
				const execution = inspected.value;
				const admission = requireAuthenticationHeadroom(analysisExecutionEnvelopeForAdmission(OPERATION$2, input.value, execution), {
					operation: OPERATION$2,
					path: input.value.path,
					description: "Complete WASM Evidence cannot be assembled",
					serializedCodeUnitLimit: constants$1.MAX_STRING_LENGTH
				});
				if (!admission.ok) return admission;
				const report = wasmArtifactSchema.safeParse(execution.result);
				if (!report.success || report.data.artifact.path !== input.value.path || execution.subject.path !== input.value.path || report.data.tool_profile.timeout_ms !== timeout.value || report.data.tool_profile.output_budget_bytes !== wasmResourceLimits(input.value).outputBytes || !wasmArtifactMatchesSubject(report.data.artifact, execution.subject) || JSON.stringify(report.data.glue.map((item) => item.artifact.path)) !== JSON.stringify(input.value.glue_paths) || JSON.stringify(report.data.candidates.map((item) => item.path)) !== JSON.stringify([...new Set([input.value.path, ...input.value.candidate_paths])])) return err(new AnalysisOutputError(OPERATION$2, "WABT adapter returned malformed data or changed the selected artifact identity."));
				return completeProviderEvidence(createAnalysisExecutionEvidence(OPERATION$2, input.value, {
					...execution,
					result: report.data
				}, "observed"), options?.signal);
			}
		};
	})))();
}

//#endregion
//#region dist/wasm/WabtAdmissionError.js
var WABT_ADMISSION_CODES, WabtAdmissionError;
function init_WabtAdmissionError() {
	return (init_WabtAdmissionError = __esmMin((() => {
		WABT_ADMISSION_CODES = [
			"incomplete_string",
			"unsupported_escape",
			"incomplete_comment",
			"malformed_form",
			"name_missing",
			"incomplete_import",
			"incomplete_export",
			"unsupported_section_header",
			"unrecognized_section_row",
			"blank_custom_name",
			"custom_header_mismatch",
			"incomplete_section_row",
			"section_ranges",
			"custom_inventory_mismatch",
			"section_coverage",
			"incomplete_name_metadata",
			"name_subsection_order",
			"incomplete_module_name",
			"unfinished_module_name",
			"unsupported_module_prefix",
			"unexpected_string",
			"unexpected_second_module",
			"unsupported_custom_name",
			"unsupported_name_payload",
			"unbalanced_output",
			"unexpected_text",
			"incomplete_output",
			"directory_not_absolute",
			"incomplete_tool_profile"
		];
		WabtAdmissionError = class extends Error {
			code;
			detail;
			_tag = "WabtAdmissionError";
			constructor(code, detail, options) {
				super(code, options);
				this.code = code;
				this.detail = detail;
				this.name = "WabtAdmissionError";
			}
		};
	})))();
}

//#endregion
//#region dist/wasm/WabtRuntime.js
var WabtRuntime;
function init_WabtRuntime() {
	return (init_WabtRuntime = __esmMin((() => {
		init_resources();
		init_OwnedCommand();
		WabtRuntime = class {
			lease;
			path;
			#commands = new Map();
			#unknownCommand;
			constructor(root) {
				this.path = root.path;
				this.lease = new AnalysisCleanupLease(async () => {
					const pending = [...this.#commands.values()].filter((lease) => !lease.released);
					if (pending.length > 0 || this.#unknownCommand !== undefined) throw new ArtifactReaderFailure("unavailable", "WABT commands must stop before runtime removal", { cleanup: {
						reason: this.#unknownCommand ?? "WABT command cleanup remains incomplete",
						resources: [...new Set([root.path, ...pending.flatMap((lease) => lease.cleanupResources ?? [])])]
					} });
					await root.close();
				}, [root.path]);
			}
			/** Adopt only the supervisor supplied by the command boundary, never a PID or label. */
			retainCommandFailure(cause, failure, resources) {
				if (!(cause instanceof OwnedCommandFailure) || cause.cleanupFailure === null) return;
				const owner = cause.cleanupOwner;
				if (owner === undefined) {
					this.#unknownCommand = cause.cleanupFailure;
					return;
				}
				let lease = this.#commands.get(owner);
				if (lease === undefined) {
					lease = new AnalysisCleanupLease(async () => {
						const stopped = await owner.stop();
						if (stopped.status === "incomplete") throw new ArtifactReaderFailure("unavailable", stopped.reason, { cleanup: {
							reason: stopped.reason,
							resources: cause.resources
						} });
					}, cause.resources);
					this.#commands.set(owner, lease);
					resources.retain({
						kind: "lease",
						resource: cause.resources[0] ?? this.path,
						lease
					});
				}
				new AnalysisCleanupLeaseGroup(failure, [lease]);
			}
		};
	})))();
}

//#endregion
//#region dist/wasm/WabtRelease.js
var WABT_ACCEPTED_RANGE, WABT_PROVIDER_IDENTITY, wabtReleaseLine, wabtReleaseLimitation, admitWabtVersion;
function init_WabtRelease() {
	return (init_WabtRelease = __esmMin((() => {
		init_wasmArtifact();
		WABT_ACCEPTED_RANGE = `>=${WABT_VERSION} <1.1.0`;
		WABT_PROVIDER_IDENTITY = {
			id: "wabt-artifact",
			name: "REA WABT artifact adapter",
			version: `wabt@${WABT_VERSION}`
		};
		wabtReleaseLine = () => `WABT ${WABT_ACCEPTED_RANGE} (verified with ${WABT_VERSION})`;
		wabtReleaseLimitation = (version) => `This inspection uses caller-supplied WABT ${version}. REA verified the tool arguments and output parsing against ${WABT_VERSION}; other releases in ${WABT_ACCEPTED_RANGE} are admitted and the observed banner is reported.`;
		admitWabtVersion = (banner) => {
			const token = banner.trim();
			if (valid(token) !== token || !satisfies(token, WABT_ACCEPTED_RANGE)) return {
				status: "unsupported",
				message: `Unsupported WABT version ${token.length === 0 ? "banner" : token}; accepted releases are ${wabtReleaseLine()}`
			};
			if (token === "1.0.42") return {
				status: "verified",
				version: token
			};
			return {
				status: "compatible",
				version: token,
				limitation: wabtReleaseLimitation(token)
			};
		};
	})))();
}

//#endregion
//#region dist/wasm/WabtFailures.js
var OUTPUT_LIMIT_EXCERPT_BYTES, OPERATION$1, WASM_BYTE_BUDGETS, byteBudgetRecovery, byteBudgetLimit, wabtConfigurationRecoveryAction, wabtUnavailable, outputLimitExcerpt, wabtCommandTimeout, allocationRefused, wabtFailureDialect;
function init_WabtFailures() {
	return (init_WabtFailures = __esmMin((() => {
		init_analysisResourceLimits();
		init_analysisSettingDefinitions();
		init_resources();
		init_utf8HeadExcerpt();
		init_capturedProviderOutput();
		init_analysisErrorCore();
		init_parseFailure();
		init_runtimeControlUnavailableError();
		init_WabtAdmissionError();
		init_wasmArtifact();
		init_WabtRelease();
		init_errorMessage();
		OUTPUT_LIMIT_EXCERPT_BYTES = 4096;
		OPERATION$1 = "inspect_wasm_artifact";
		WASM_BYTE_BUDGETS = {
			max_input_bytes: "inputBytes",
			max_output_bytes: "outputBytes",
			max_tool_bytes: "toolBytes"
		};
		byteBudgetRecovery = (parameter, value) => {
			const maximum = WASM_RESOURCE_MAXIMUMS[WASM_BYTE_BUDGETS[parameter]];
			return `${parameter} is ${String(value)} bytes. ${value < maximum ? `Raise ${parameter} above ${String(value)} bytes (positive integer, maximum ${String(maximum)}), then retry the same complete input after cleanup settles.` : `This is already the runtime representation maximum of ${String(maximum)} bytes; use a suitable smaller complete input or report this blocker.`} The new value applies to the next inspection without restarting REA. command_timeout_ms, other byte budgets and client delivery settings do not raise this allowance. Do not truncate required bytes. Repeating the unchanged request fails the same way.`;
		};
		byteBudgetLimit = (parameter, value) => {
			const key = WASM_BYTE_BUDGETS[parameter];
			const maximum = WASM_RESOURCE_MAXIMUMS[key];
			return value < maximum ? { limit: {
				control_kind: "parameter",
				parameter,
				effective_value: value,
				unit: "bytes",
				minimum: 1,
				maximum,
				default_value: WASM_RESOURCE_DEFAULTS[key],
				applies_at: "next_call"
			} } : {};
		};
		wabtConfigurationRecoveryAction = (cause) => {
			const code = cause instanceof Error && "code" in cause ? cause.code : undefined;
			const action = code === "EACCES" || code === "EPERM" ? "Check this REA process has read and execute access to the reported caller-supplied tools, or select an accessible trusted copy. " : code === "ENOTDIR" ? "Select the tools' containing directory, not an individual executable. " : code === "ENOENT" ? "The reported configured tool is missing. " : "";
			return `${action}Set absolute REA_WABT_BIN_DIRECTORY to a directory that contains wasm-validate, wasm-objdump and wasm2wat from one WABT installation; each --version must report ${WABT_ACCEPTED_RANGE} on stdout with empty stderr. Releases in that range other than ${WABT_VERSION} are admitted and reported as the observed banner. Correct the reported tool path, access or release before retrying, not the WASM input. Set this in the shell for the next CLI call, or in the MCP server launch environment and restart that server; a shell export does not update a running MCP server. Do not repeat the unchanged call or install tools implicitly.`;
		};
		wabtUnavailable = (message, cause, details) => new AnalysisCapabilityUnavailableError(WABT_PROVIDER_IDENTITY.id, OPERATION$1, message, {
			...details,
			userMessage: `Configured WABT could not start. Check executable/interpreter access and WABT ${WABT_VERSION} profile; inspect retained diagnostics.`,
			remediationAction: wabtConfigurationRecoveryAction(cause)
		});
		outputLimitExcerpt = (snapshot) => ({
			stdout: utf8HeadExcerpt(snapshot.stdout.text, OUTPUT_LIMIT_EXCERPT_BYTES).text,
			stderr: utf8HeadExcerpt(snapshot.stderr.text, OUTPUT_LIMIT_EXCERPT_BYTES).text,
			truncated: true,
			stdout_bytes: snapshot.stdout.bytes,
			stderr_bytes: snapshot.stderr.bytes,
			exit_code: snapshot.exitCode ?? null,
			signal: snapshot.signal ?? null
		});
		wabtCommandTimeout = (execution) => {
			const timeoutMs = execution?.commandTimeoutMs ?? 3e4;
			const timeoutSource = execution?.commandTimeoutMs === undefined ? "default" : execution.commandTimeoutSource;
			return {
				ms: timeoutMs,
				limit: analysisSettingLimit("wasm.command_timeout_ms", timeoutMs, timeoutSource),
				userMessage: `A WABT command reached its ${String(timeoutMs)} ms server/provider deadline (command_timeout_ms), not the whole-inspection or MCP client deadline.`,
				remediationAction: `${timeoutMs < 2147483647 ? `Increase command_timeout_ms above ${String(timeoutMs)} (integer milliseconds, maximum ${String(MAX_NODE_TIMER_DELAY_MS)}).` : `command_timeout_ms is already at the maximum supported ${String(MAX_NODE_TIMER_DELAY_MS)} ms; no higher command deadline is supported. Report this blocker or select another suitable complete artifact with caller approval.`} This is a per-call setting; no server restart is needed. Allow the MCP client deadline to cover all version/analysis commands, file checks, cleanup and delivery; increasing only that client deadline does not change this budget. max_input_bytes, max_tool_bytes and max_output_bytes are independent per-call controls; detail: summary reduces delivery size, not analysis work. Resolve any incomplete cleanup before retrying; do not repeat the unchanged failed call.`
			};
		};
		allocationRefused = (cause) => {
			const physical = artifactFilePrimaryFacts(cause).cause;
			return physical instanceof Error && ("code" in physical && [
				"ENOMEM",
				"ERR_MEMORY_ALLOCATION_FAILED",
				"ERR_BUFFER_TOO_LARGE"
			].includes(String(physical.code)) || hostRangeErrorKind(physical) === "host-capacity" && physical.message === "Array buffer allocation failed");
		};
		wabtFailureDialect = (phase, path, execution) => {
			const versionProbe = execution?.versionProbe;
			const limits = execution?.limits ?? WASM_RESOURCE_DEFAULTS;
			const outputLimitReason = `WABT output exceeded the ${String(limits.outputBytes)}-byte output budget`;
			const observed = execution?.observedOutput === undefined ? {} : { capturedOutput: execution.observedOutput };
			const capturedOutput = (kind) => (snapshot) => kind === "output-limit" ? outputLimitExcerpt(snapshot) : capturedProviderOutput(snapshot);
			return {
				providerId: WABT_PROVIDER_IDENTITY.id,
				operation: OPERATION$1,
				observedOutput: execution?.observedOutput,
				recognise: (unknownCause, details) => {
					if (allocationRefused(unknownCause)) return new AnalysisResourceConstraintError(OPERATION$1, "memory", "The host could not allocate the admitted WABT acquisition buffer", {
						max_input_bytes: limits.inputBytes,
						max_tool_bytes: limits.toolBytes
					}, {
						...details,
						cause: unknownCause,
						...observed,
						retryable: false,
						remediationAction: "Byte admission does not reserve host memory. Free host memory or select a suitable process with sufficient capacity, then retry after cleanup settles. Increasing byte budgets or command_timeout_ms does not repair this allocation failure; do not replace a correctly configured WABT installation for this reason."
					});
					if (unknownCause instanceof RuntimeControlUnavailableError) return runtimeControlCapabilityError(WABT_PROVIDER_IDENTITY.id, OPERATION$1, unknownCause);
					if (phase === "configuration" && unknownCause instanceof ArtifactReaderFailure && unknownCause.reason === "limit" && unknownCause.boundary === "file-size") return new AnalysisCapabilityUnavailableError(WABT_PROVIDER_IDENTITY.id, OPERATION$1, unknownCause.message, {
						...details,
						cause: unknownCause,
						...observed,
						userMessage: `Configured WABT tools exceed the ${String(limits.toolBytes)}-byte tool allowance (max_tool_bytes).`,
						remediationAction: byteBudgetRecovery("max_tool_bytes", limits.toolBytes),
						...byteBudgetLimit("max_tool_bytes", limits.toolBytes)
					});
					return undefined;
				},
				command: (outcome) => ({
					operation: OPERATION$1,
					capturedOutput: capturedOutput(outcome.kind),
					details: versionProbe === undefined ? {} : { diagnostics: versionProbe },
					timeout: wabtCommandTimeout(execution),
					outputLimit: {
						reason: outputLimitReason,
						limits: { max_output_bytes: limits.outputBytes },
						...byteBudgetLimit("max_output_bytes", limits.outputBytes),
						recovery: {
							retryable: false,
							remediationAction: byteBudgetRecovery("max_output_bytes", limits.outputBytes)
						}
					},
					launchUnavailable: (_failure, details) => wabtUnavailable(outcome.message, outcome.cause, details),
					dialect: (exit, details, unclassified) => phase === "configuration" ? wabtUnavailable(exit.message, exit.cause, details) : unclassified()
				}),
				...phase === "artifact" ? { file: {
					path,
					description: "WebAssembly input",
					field: execution?.inputField ?? ["path"],
					fileSize: (limit, details) => new AnalysisResourceConstraintError(OPERATION$1, "file-size", limit.message, { maximum_input_bytes: limits.inputBytes }, {
						...details,
						retryable: false,
						remediationAction: byteBudgetRecovery("max_input_bytes", limits.inputBytes),
						...byteBudgetLimit("max_input_bytes", limits.inputBytes)
					})
				} } : {},
				unclassified: (unrecognised, details) => {
					const reason = errorMessage(unrecognised);
					if (phase === "configuration") {
						const admission = unrecognised instanceof WabtAdmissionError ? unrecognised : undefined;
						return new AnalysisCapabilityUnavailableError(WABT_PROVIDER_IDENTITY.id, OPERATION$1, admission?.code ?? reason, {
							...details,
							cause: unrecognised,
							...observed,
							...admission === undefined ? {} : { diagnostics: {
								code: admission.code,
								...admission.detail
							} },
							userMessage: admission === undefined ? reason : "WABT configuration cannot be used",
							remediationAction: wabtConfigurationRecoveryAction(unrecognised)
						});
					}
					if (phase === "artifact") return new AnalysisInputError(OPERATION$1, {
						...details,
						cause: unrecognised
					}, [{
						path: [...execution?.inputField ?? ["path"]],
						reason: "invalid_value",
						message: reason
					}]);
					return new AnalysisOutputError(OPERATION$1, reason, {
						...details,
						cause: unrecognised,
						...observed
					});
				}
			};
		};
	})))();
}

//#endregion
//#region dist/wasm/WabtOutput.js
var wabtDisplayedName, parseWabtOutput, invalidCustomNameEnd;
function init_WabtOutput() {
	return (init_WabtOutput = __esmMin((() => {
		init_WabtAdmissionError();
		init_leb128();
		init_strictUtf8();
		wabtDisplayedName = (name) => name?.split("\0", 1)[0];
		parseWabtOutput = (text, artifactBytes, customSectionNames, debugModuleNames = [], artifact) => {
			const preamble = "\nmodule.wasm:	file format wasm 0x1\n" + debugModuleNames.map((name) => `module name: <${wabtDisplayedName(name)}>\n`).join("");
			const prefix = `${preamble}\nSections:\n\n`;
			if (!text.startsWith(prefix)) throw new WabtAdmissionError("unsupported_section_header");
			let offset = prefix.length;
			let customIndex = 0;
			const sections = [];
			const invalidNameEnds = new Set();
			while (!text.startsWith("\nSection Details:\n", offset)) {
				const match = /^[ \t]*(\w+) start=0x([\da-f]+) end=0x([\da-f]+) \(size=0x([\da-f]+)\) /u.exec(text.slice(offset));
				if (match === null) throw new WabtAdmissionError("unrecognized_section_row");
				offset += match[0].length;
				let description;
				if (match[1] === "Custom" && !text.startsWith("\"", offset)) {
					const start = Number.parseInt(match[2] ?? "", 16);
					const end = Number.parseInt(match[3] ?? "", 16);
					const invalidEnd = invalidCustomNameEnd(artifact, start, end);
					if (invalidEnd === undefined) throw new WabtAdmissionError("blank_custom_name");
					invalidNameEnds.add(invalidEnd);
					description = "";
					if (text.startsWith("\n", offset) && !text.startsWith("\nSection Details:\n", offset)) offset += 1;
				} else if (match[1] === "Custom") {
					const name = wabtDisplayedName(customSectionNames[customIndex++]);
					if (name === undefined || !text.startsWith(`"${name}"\n`, offset)) throw new WabtAdmissionError("custom_header_mismatch");
					description = `"${name}"`;
					offset += description.length + 1;
				} else {
					const end = text.indexOf("\n", offset);
					if (end < 0) throw new WabtAdmissionError("incomplete_section_row");
					description = text.slice(offset, end).trim();
					offset = end + 1;
				}
				const section = {
					kind: match[1] ?? "",
					start: Number.parseInt(match[2] ?? "", 16),
					end: Number.parseInt(match[3] ?? "", 16),
					bytes: Number.parseInt(match[4] ?? "", 16),
					description
				};
				const sectionHeaderBytes = section.start - (sections.at(-1)?.end ?? 8);
				if (section.end > artifactBytes || section.end - section.start !== section.bytes || sectionHeaderBytes < 2 || sectionHeaderBytes > 6) throw new WabtAdmissionError("section_ranges");
				sections.push(section);
			}
			if (customIndex !== customSectionNames.length) throw new WabtAdmissionError("custom_inventory_mismatch");
			if ((sections.at(-1)?.end ?? 8) !== artifactBytes) throw new WabtAdmissionError("section_coverage");
			const separator = offset + 1;
			return {
				sections,
				headers: text.slice(0, separator),
				details: `${preamble.slice(1)}\n${text.slice(separator)}`,
				invalidNameEnds
			};
		};
		invalidCustomNameEnd = (bytes, start, end) => {
			if (bytes === undefined || end > bytes.length || start >= end) return undefined;
			const read = readLeb128(bytes, start, end, ULEB32);
			if ("failure" in read) return undefined;
			const nameEnd = read.next + Number(read.value);
			if (nameEnd > end) return undefined;
			return isStrictUtf8(bytes.subarray(read.next, nameEnd)) ? undefined : nameEnd;
		};
	})))();
}

//#endregion
//#region dist/wasm/WabtString.js
var watStringEnd, watString;
function init_WabtString() {
	return (init_WabtString = __esmMin((() => {
		init_WabtAdmissionError();
		watStringEnd = (form, start) => {
			for (let end = form.indexOf("\"", start); end !== -1; end = form.indexOf("\"", end + 1)) {
				let escapes = end;
				while (escapes > start && form[escapes - 1] === "\\") escapes--;
				if ((end - escapes) % 2 === 0) return end + 1;
			}
			throw new WabtAdmissionError("incomplete_string");
		};
		watString = (form, start) => {
			const end = watStringEnd(form, start);
			const name = form.slice(start, end - 1);
			const bytes = Buffer.alloc(Buffer.byteLength(name, "utf8"));
			let length = 0;
			for (let index = 0; index < name.length;) {
				if (name[index] !== "\\") {
					const next = name.indexOf("\\", index);
					const end = next < 0 ? name.length : next;
					length += bytes.write(name.slice(index, end), length, "utf8");
					index = end;
					continue;
				}
				const hex = name.slice(index + 1, index + 3);
				if (/^[\da-f]{2}$/iu.test(hex)) {
					bytes[length++] = Number.parseInt(hex, 16);
					index += 3;
				} else {
					const escape = name[index + 1];
					const value = escape === "t" ? 9 : escape === "n" ? 10 : escape === "r" ? 13 : escape === "\"" ? 34 : escape === "\\" ? 92 : undefined;
					if (value === undefined) throw new WabtAdmissionError("unsupported_escape");
					bytes[length++] = value;
					index += 2;
				}
			}
			return {
				bytes: bytes.subarray(0, length),
				end
			};
		};
	})))();
}

//#endregion
//#region dist/wasm/WabtComment.js
var watCommentEnd;
function init_WabtComment() {
	return (init_WabtComment = __esmMin((() => {
		init_WabtAdmissionError();
		watCommentEnd = (text, start) => {
			if (text.startsWith(";;", start)) {
				for (let index = start + 2; index < text.length; index++) {
					if (text[index] === "\n") return index + 1;
					if (text[index] === "\r") return index + (text[index + 1] === "\n" ? 2 : 1);
				}
				return text.length;
			}
			if (!text.startsWith("(;", start)) return undefined;
			let depth = 1;
			for (let index = start + 2; index < text.length - 1; index++) {
				if (text.startsWith("(;", index)) {
					depth++;
					index++;
				} else if (text.startsWith(";)", index)) {
					if (--depth === 0) return index + 2;
					index++;
				}
			}
			throw new WabtAdmissionError("incomplete_comment");
		};
	})))();
}

//#endregion
//#region dist/wasm/WabtInterface.js
var splitParts, name, integer, admittedValues, isValueType, decodeWabtInterface, parseWabtInterface;
function init_WabtInterface() {
	return (init_WabtInterface = __esmMin((() => {
		init_strictUtf8();
		init_WabtAdmissionError();
		init_analysisErrorCore();
		init_wasmInterface();
		init_wasmInterfaceBudget();
		init_WabtString();
		init_WabtComment();
		splitParts = (form, maximumBytes) => {
			const budget = new WasmInterfaceBudget(maximumBytes);
			const items = [];
			let i = 1;
			while (i < form.length - 1) {
				if (/\s/u.test(form[i] ?? "")) {
					i++;
					continue;
				}
				const commentEnd = watCommentEnd(form, i);
				if (commentEnd !== undefined) {
					i = commentEnd;
					continue;
				}
				const start = i;
				if (form[i] === "\"") {
					i = watStringEnd(form, i + 1);
				} else if (form[i] === "(") {
					let depth = 1;
					i++;
					while (i < form.length && depth > 0) {
						const commentEnd = watCommentEnd(form, i);
						if (commentEnd !== undefined) i = commentEnd;
						else if (form[i] === "\"") i = watStringEnd(form, i + 1);
						else {
							if (form[i] === "(") depth++;
							else if (form[i] === ")") depth--;
							i++;
						}
					}
				} else {
					while (i < form.length && !/[\s()]/u.test(form[i] ?? "")) i++;
					const atom = form.slice(start, i);
					if (items[0] === "func" && items.length > 1 && !atom.startsWith("$")) break;
				}
				if (i <= start) throw new WabtAdmissionError("malformed_form");
				budget.reserve(64 + (i - start) * 2);
				items.push(form.slice(start, i));
			}
			return items;
		};
		name = (text) => {
			if (text?.startsWith("\"") !== true) throw new WabtAdmissionError("name_missing");
			return decodeStrictUtf8(watString(text, 1).bytes, "preserve");
		};
		integer = (text) => {
			if (!/^(?:\d+|0x[\da-f]+)$/iu.test(text)) return null;
			return BigInt(text).toString();
		};
		admittedValues = new Set([
			"i32",
			"i64",
			"f32",
			"f64",
			"v128",
			"funcref",
			"externref"
		]);
		isValueType = (type) => admittedValues.has(type);
		decodeWabtInterface = (forms, result, maximumBytes) => {
			const budget = new WasmInterfaceBudget(maximumBytes);
			const parts = (form) => splitParts(form, maximumBytes);
			const head = (form) => parts(form)[0];
			const values = (form, category) => {
				const result = [];
				for (const item of parts(form)) {
					if (!item.startsWith("(")) continue;
					const group = parts(item);
					if (group[0] !== category) continue;
					for (const type of group.slice(1).filter((t) => !t.startsWith("$"))) {
						if (!isValueType(type)) return null;
						result.push(type);
					}
				}
				return result;
			};
			const functionType = (form, kind) => {
				const params = values(form, "param");
				const results = values(form, "result");
				return params === null || results === null ? null : {
					kind,
					params,
					results
				};
			};
			const types = [];
			const typeNames = new Map();
			const definitionNames = new Map();
			const indexLabel = (labels, label, index, space) => {
				const issue = `Ambiguous WABT identifiers in the ${space} index space; named references have unknown identity`;
				if (labels.has(label) && !result.issues.includes(issue)) result.issues.push(issue);
				labels.set(label, labels.has(label) ? null : index);
			};
			const definitions = new Map();
			const typeSpaceUnknown = forms.some((f) => head(f) === "rec");
			for (const form of forms) {
				const p = parts(form);
				if (p[0] !== "type") continue;
				if (p[1]?.startsWith("$") === true) indexLabel(typeNames, p[1], types.length, "type");
				const body = p.find((item) => item.startsWith("("));
				budget.reserve(256 + (body?.length ?? 0) * 6);
				types.push(body !== undefined && head(body) === "func" && !typeSpaceUnknown ? functionType(body, "func") : null);
			}
			const signature = (form) => {
				const p = parts(form);
				const kind = p[0];
				if (kind === "func" || kind === "tag") {
					const use = p.find((t) => t.startsWith("(") && head(t) === "type");
					if (use === undefined) return functionType(form, kind);
					const reference = parts(use)[1];
					const index = reference === undefined ? undefined : reference.startsWith("$") ? typeNames.get(reference) : Number(reference);
					const type = index == null || typeSpaceUnknown ? undefined : types[index];
					return type?.kind === "func" ? {
						...type,
						kind
					} : null;
				}
				if (kind === "memory" || kind === "table") {
					const groups = p.slice(1).filter((t) => t.startsWith("("));
					let pageSize = "65536";
					for (const group of groups) {
						const declaration = parts(group);
						if (kind !== "memory" || declaration[0] !== "pagesize" || declaration.length !== 2) return null;
						const parsedPageSize = integer(declaration[1] ?? "");
						if (parsedPageSize === null) return null;
						pageSize = parsedPageSize;
					}
					const tokens = p.slice(1).filter((t) => !t.startsWith("$") && !t.startsWith("("));
					const address_type = tokens[0] === "i64" ? "i64" : "i32";
					if (tokens[0] === "i64" || tokens[0] === "i32") tokens.shift();
					const minimum = integer(tokens.shift() ?? "");
					const possibleMaximum = tokens[0] === undefined ? null : integer(tokens[0]);
					if (possibleMaximum !== null) tokens.shift();
					const shared = tokens[0] === "shared";
					if (shared) tokens.shift();
					if (minimum === null) return null;
					if (kind === "memory") return tokens.length === 0 ? {
						kind,
						page_size: pageSize,
						address_type,
						minimum,
						maximum: possibleMaximum,
						shared
					} : null;
					const element = tokens.shift();
					return tokens.length === 0 && element !== undefined && (element === "funcref" || element === "externref") ? {
						kind,
						address_type,
						minimum,
						maximum: possibleMaximum,
						shared,
						element
					} : null;
				}
				if (kind === "global") {
					const declaration = p[1]?.startsWith("$") === true ? p[2] : p[1];
					const group = declaration?.startsWith("(") === true ? parts(declaration) : undefined;
					const mutable = group?.[0] === "mut";
					const value_type = mutable ? group?.[1] : declaration;
					return value_type !== undefined && isValueType(value_type) ? {
						kind,
						value_type,
						mutable
					} : null;
				}
				return null;
			};
			const addDefinition = (form) => {
				const p = parts(form);
				const rawKind = p[0] ?? "unknown";
				const kind = [
					"func",
					"table",
					"memory",
					"global",
					"tag"
				].includes(rawKind) ? rawKind : "unknown";
				const space = definitions.get(kind) ?? [];
				const item = { signature: signature(form) };
				const label = p[1]?.startsWith("$") === true ? p[1] : undefined;
				budget.reserve(256);
				const index = space.length;
				space.push(item);
				definitions.set(kind, space);
				if (label !== undefined) {
					const labels = definitionNames.get(kind) ?? new Map();
					indexLabel(labels, label, index, kind);
					definitionNames.set(kind, labels);
				}
				return {
					index,
					kind,
					signature: item.signature
				};
			};
			for (const form of forms) {
				const p = parts(form);
				if (p[0] !== "import") continue;
				const body = p[3];
				if (body === undefined) throw new WabtAdmissionError("incomplete_import");
				const observed = addDefinition(body);
				const entry = {
					direction: "import",
					module: name(p[1]),
					name: name(p[2]),
					...observed,
					wat_form: form,
					issue: observed.signature === null ? "Import type is outside admitted core signature semantics" : null
				};
				budget.reserve(wasmInterfaceEntryRepresentationBytes(entry));
				result.entries.push(entry);
			}
			for (const form of forms) {
				const kind = head(form);
				if (kind !== undefined && [
					"func",
					"table",
					"memory",
					"global",
					"tag"
				].includes(kind)) addDefinition(form);
			}
			for (const form of forms) {
				const p = parts(form);
				if (p[0] !== "export") continue;
				const body = p[2];
				if (body === undefined) throw new WabtAdmissionError("incomplete_export");
				const descriptor = parts(body);
				const rawKind = descriptor[0] ?? "unknown";
				const kind = [
					"func",
					"table",
					"memory",
					"global",
					"tag"
				].includes(rawKind) ? rawKind : "unknown";
				const reference = descriptor[1];
				const space = definitions.get(kind) ?? [];
				const index = reference === undefined ? -1 : reference.startsWith("$") ? definitionNames.get(kind)?.get(reference) ?? -1 : Number(reference);
				const observed = Number.isSafeInteger(index) && index >= 0 ? space[index] : undefined;
				const entry = {
					direction: "export",
					module: null,
					name: name(p[1]),
					kind,
					index: observed === undefined ? null : index,
					signature: observed?.signature ?? null,
					wat_form: form,
					issue: observed?.signature == null ? "Export type/index is outside admitted core signature semantics" : null
				};
				budget.reserve(wasmInterfaceEntryRepresentationBytes(entry));
				result.entries.push(entry);
			}
			return result;
		};
		parseWabtInterface = (forms, maximumBytes) => {
			const result = {
				state: "complete",
				entries: [],
				issues: []
			};
			try {
				return decodeWabtInterface(forms, result, maximumBytes);
			} catch (cause) {
				if (!(cause instanceof AnalysisResourceConstraintError)) throw cause;
				result.state = "partial";
				result.issues.push(cause.message);
				if (cause.remediationAction !== undefined) result.issues.push(cause.remediationAction);
				return result;
			}
		};
	})))();
}

//#endregion
//#region dist/wasm/WabtWat.js
var moduleNames, parseWabtWat;
function init_WabtWat() {
	return (init_WabtWat = __esmMin((() => {
		init_strictUtf8();
		init_WabtAdmissionError();
		init_WabtInterface();
		init_WabtString();
		init_WabtComment();
		init_result();
		moduleNames = (bytes) => {
			const names = [];
			let offset = 0;
			const uint32 = (end) => {
				let value = 0;
				for (let shift = 0; shift <= 28 && offset < end; shift += 7) {
					const byte = bytes[offset++];
					if (byte === undefined) break;
					if (shift === 28 && byte > 15) break;
					value += (byte & 127) * 2 ** shift;
					if (byte < 128) return value;
				}
				throw new WabtAdmissionError("incomplete_name_metadata");
			};
			try {
				let previousType = -1;
				while (offset < bytes.length) {
					const type = uint32(bytes.length);
					if (type <= previousType) throw new WabtAdmissionError("name_subsection_order");
					previousType = type;
					const size = uint32(bytes.length);
					const end = offset + size;
					if (end > bytes.length) throw new WabtAdmissionError("incomplete_name_metadata");
					if (type === 0 && size !== 0) {
						const length = uint32(end);
						const nameEnd = offset + length;
						if (nameEnd > end) throw new WabtAdmissionError("incomplete_module_name");
						names.push(decodeStrictUtf8(bytes.subarray(offset, nameEnd), "preserve"));
						if (nameEnd !== end) throw new WabtAdmissionError("unfinished_module_name");
					}
					offset = end;
				}
			} catch (cause) {
				if (!(cause instanceof Error)) throw cause;
				return err({
					_tag: "WabtNameMetadataFailure",
					reason: cause.message,
					partial: names
				});
			}
			return ok(names);
		};
		parseWabtWat = (text, maximumInterfaceBytes) => {
			if (!/^\(module(?:\s|\))/u.test(text)) throw new WabtAdmissionError("unsupported_module_prefix");
			const forms = [];
			const imports = [];
			const exports = [];
			const customSectionNames = [];
			const debugModuleNames = [];
			let debugNameMetadata = "not-present";
			let depth = 0;
			let start = 0;
			let closed = false;
			const boundaries = /[()";]/gu;
			for (let index = 0; index < text.length; index++) {
				if (depth > 0) {
					boundaries.lastIndex = index;
					const boundary = boundaries.exec(text);
					if (boundary === null) break;
					index = boundary.index;
				}
				const char = text[index];
				const commentEnd = watCommentEnd(text, index);
				if (commentEnd !== undefined) {
					index = commentEnd - 1;
					continue;
				}
				if (char === "\"") {
					if (depth === 0) throw new WabtAdmissionError("unexpected_string");
					index = watStringEnd(text, index + 1) - 1;
					continue;
				}
				if (char === "(") {
					if (closed) throw new WabtAdmissionError("unexpected_second_module");
					depth++;
					if (depth === 2) start = index;
				} else if (char === ")") {
					if (depth === 2) {
						const form = text.slice(start, index + 1);
						if (/^\((?:type|rec|import|export|func|table|memory|global|tag)\s/u.test(form)) forms.push(form);
						if (/^\(import\s/u.test(form)) imports.push(form);
						else if (/^\(export\s/u.test(form)) exports.push(form);
						else if (/^\(@custom\s/u.test(form)) {
							const prefix = /^\(@custom\s+"/u.exec(form);
							if (prefix === null) throw new WabtAdmissionError("unsupported_custom_name");
							const nameString = watString(form, prefix[0].length);
							const name = decodeStrictUtf8(nameString.bytes, "preserve");
							customSectionNames.push(name);
							if (name === "name") {
								const payloadPrefix = /^\s+"/u.exec(form.slice(nameString.end));
								if (payloadPrefix === null) throw new WabtAdmissionError("unsupported_name_payload");
								const payload = watString(form, nameString.end + payloadPrefix[0].length);
								const names = moduleNames(payload.bytes);
								debugModuleNames.push(...names.ok ? names.value : names.error.partial);
								if (!names.ok) {
									debugNameMetadata = "uninterpretable";
								} else if (debugNameMetadata !== "uninterpretable") {
									debugNameMetadata = "complete";
								}
							}
						}
					}
					if (--depth < 0) throw new WabtAdmissionError("unbalanced_output");
					if (depth === 0) closed = true;
				} else if (depth === 0 && char !== undefined && !/\s/u.test(char)) throw new WabtAdmissionError("unexpected_text");
			}
			if (depth !== 0) throw new WabtAdmissionError("incomplete_output");
			return {
				imports,
				exports,
				customSectionNames,
				debugModuleNames,
				debugNameMetadata,
				interface: parseWabtInterface(forms, maximumInterfaceBytes)
			};
		};
	})))();
}

//#endregion
//#region dist/wasm/WasmGlueAdapter.js
var endsWithWasmReference, associateWasmGlue;
function init_WasmGlueAdapter() {
	return (init_WasmGlueAdapter = __esmMin((() => {
		init_javascriptSourceParser();
		init_javascriptSemanticTraversal();
		init_callerPath();
		endsWithWasmReference = (value) => {
			const delimiter = value.search(/[?#]/u);
			return /\.wasm$/iu.test(delimiter < 0 ? value : value.slice(0, delimiter));
		};
		associateWasmGlue = (source, path, candidates) => {
			const file = parseJavaScriptSource(source.startsWith("﻿#!") ? source.slice(1) : source, path);
			const references = [];
			if (file === null) return {
				parse_status: "failed",
				references
			};
			traverseJavaScriptAst(file, { enter(node) {
				const directiveValue = t.isDirectiveLiteral(node) ? node.extra?.expressionValue : undefined;
				const value = t.isStringLiteral(node) ? node.value : typeof directiveValue === "string" ? directiveValue : t.isTemplateLiteral(node) && node.expressions.length === 0 ? node.quasis[0]?.value.cooked : undefined;
				if (value === undefined || value === null || !endsWithWasmReference(value) || node.loc == null) return;
				const stripped = value.split(/[?#]/u)[0] ?? value;
				const local = !/^[a-z][a-z\d+.-]*:|^\/\//iu.test(value) && !value.startsWith("/") && !/[?#]/u.test(value);
				const target = local ? absoluteCallerPath(value, { cwd: dirname(path) }) : undefined;
				const exact = target === undefined ? [] : candidates.filter((candidate) => absoluteCallerPath(candidate) === target);
				const matches = exact.length > 0 ? exact : candidates.filter((candidate) => basename(candidate) === basename(stripped));
				references.push({
					value,
					line: node.loc.start.line,
					column: node.loc.start.column,
					candidate_paths: [...matches],
					association: exact.length > 0 ? "local-path-candidate" : matches.length > 0 ? "basename-candidates" : "unresolved",
					evidence_kind: "static-literal"
				});
			} });
			return {
				parse_status: file.errors.length === 0 ? "complete" : "partial",
				references
			};
		};
	})))();
}

//#endregion
//#region dist/wasm/WabtArtifactProvider.js
var OPERATION, diagnosticNameEnds, WabtArtifactProvider, resourceCleanupFailure;
function init_WabtArtifactProvider() {
	return (init_WabtArtifactProvider = __esmMin((() => {
		init_targetIdentity();
		init_capturedProviderOutput();
		init_strictUtf8();
		init_WabtAdmissionError();
		init_HostPlatform();
		init_callerPath();
		init_AnalysisProvider();
		init_classifyProviderFailure();
		init_resources();
		init_analysisErrorCore();
		init_SignalAbort();
		init_providerCleanupError();
		init_analysisErrorCleanup();
		init_analysisErrorCancellation();
		init_evidence();
		init_analysisObservation();
		init_analysisErrorProjection();
		init_wasmArtifact();
		init_result();
		init_OwnedCommand();
		init_snapshotEnvironment();
		init_PrivateRuntimeRoot();
		init_ArtifactCommandPath();
		init_WabtRuntime();
		init_WabtRelease();
		init_WabtFailures();
		init_WabtOutput();
		init_WabtWat();
		init_WasmGlueAdapter();
		init_errorMessage();
		init_sha256Hex();
		OPERATION = "inspect_wasm_artifact";
		diagnosticNameEnds = (text) => {
			const offsets = new Set();
			if (text === "") return offsets;
			for (const line of text.trimEnd().split("\n")) {
				if (/^\S+: warning: /u.test(line)) continue;
				const offset = /^([\da-f]+): error: invalid utf-8 encoding: section name$/u.exec(line)?.[1];
				if (offset === undefined) return null;
				offsets.add(Number.parseInt(offset, 16));
			}
			return offsets;
		};
		WabtArtifactProvider = class {
			environment;
			launcher;
			createRuntime;
			#resources = new ArtifactResourceScope();
			constructor(environment = process.env, launcher, createRuntime = () => PrivateRuntimeRoot.create({ prefix: "rea-wabt-" })) {
				this.environment = environment;
				this.launcher = launcher;
				this.createRuntime = createRuntime;
			}
			/** Retry retained cleanup without discarding roots that still cannot be removed. */
			async close() {
				try {
					await this.#resources.close();
				} catch (cause) {
					throw resourceCleanupFailure(cause);
				}
			}
			async inspect(input, options) {
				const environment = snapshotEnvironment(this.environment, HOST_PLATFORM.platform);
				try {
					return await this.#resources.run(() => this.#inspect(input, environment, options));
				} catch (cause) {
					if (cause instanceof ArtifactResourceRetryFailure) return err(resourceCleanupFailure(cause));
					if (cause instanceof ArtifactReaderFailure && cause.reason === "unavailable" && cause.cleanup === undefined) return err(this.#closedError());
					return err(classifyProviderFailure(cause, wabtFailureDialect("artifact", input.path)));
				}
			}
			#closedError() {
				return new AnalysisCapabilityUnavailableError(WABT_PROVIDER_IDENTITY.id, OPERATION, "Provider is closing");
			}
			async #inspect(input, environment, options) {
				const limits = wasmResourceLimits(input);
				let runtime;
				let phase = "configuration";
				let result;
				let capturedOutput;
				let versionProbe;
				let artifactInput = {
					path: input.path,
					field: ["path"]
				};
				let toolProfile;
				let admittedVersion = WABT_VERSION;
				let observedRelease;
				let compatibleLimitation;
				let artifact;
				const candidates = [];
				const glue = [];
				let validationState = "unknown";
				const acquiredFacts = () => ({
					...artifact === undefined ? {} : { artifact },
					...toolProfile === undefined ? {} : { tool_profile: toolProfile },
					candidates: [...candidates],
					glue: [...glue]
				});
				const admittedIdentity = () => ({
					...WABT_PROVIDER_IDENTITY,
					version: `wabt@${admittedVersion}`
				});
				const acquiredEvidence = () => toolProfile === undefined ? undefined : createEvidence(artifact === undefined ? unknownTarget("not-observed") : {
					path: artifact.path,
					format: "file",
					sha256: artifact.sha256
				}, admittedIdentity(), {
					operation: OPERATION,
					parameters: input,
					result: {
						...acquiredFacts(),
						validation: validationState
					},
					confidence: "observed",
					locations: [{
						kind: "artifact-path",
						path: input.path
					}],
					limitations: [artifact === undefined ? "The selected WASM byte identity was not acquired. The admitted WABT tool profile does not establish module validity or runtime behavior." : validationState === "valid" ? "WABT validated the selected module, but inspection did not complete. Acquired file identities and glue references do not establish runtime loading or execution." : "WABT validation has no completed result. Acquired file identities and glue references do not establish module validity, runtime loading or execution.", ...compatibleLimitation === undefined ? [] : [compatibleLimitation]]
				});
				const readSelectedInput = async (path, onCompleted) => {
					try {
						const snapshot = await readStableArtifact(path, limits.inputBytes, options?.signal, undefined, this.#resources);
						onCompleted(snapshot);
						return snapshot;
					} catch (cause) {
						const completed = completedStableArtifact(cause);
						if (completed !== undefined) onCompleted(completed);
						throw cause;
					}
				};
				const commandTimeoutMs = input.command_timeout_ms ?? options?.commandTimeoutMs ?? 3e4;
				const commandTimeoutSource = input.command_timeout_ms !== undefined ? "request" : options?.commandTimeoutSource;
				try {
					if (isAborted(options?.signal)) throw cancelledBy(OPERATION, options.signal);
					const directory = environment.REA_WABT_BIN_DIRECTORY;
					if (directory === undefined || !isAbsolute(directory)) throw new WabtAdmissionError("directory_not_absolute", {
						setting: "REA_WABT_BIN_DIRECTORY",
						...directory === undefined ? {} : { configured: directory }
					});
					const commands = [];
					for (const tool of [
						"wasm-validate",
						"wasm-objdump",
						"wasm2wat"
					]) {
						const selection = await selectArtifactCommandPath(appendCallerPath(directory, `${tool}${HOST_PLATFORM.platform === "win32" ? ".exe" : ""}`), options?.signal);
						const path = selection.resolvedPath;
						await access(path, constants.X_OK);
						const binary = await readStableArtifact(path, limits.toolBytes, options?.signal, undefined, this.#resources);
						commands.push({
							tool,
							path,
							selection,
							sha256: binary.sha256,
							version_banner: "",
							arguments: tool === "wasm-objdump" ? [
								"-h",
								"-x",
								"module.wasm"
							] : [
								"--enable-all",
								"--ignore-custom-section-errors",
								"module.wasm"
							]
						});
					}
					const root = await this.createRuntime();
					runtime = new WabtRuntime(root);
					const snapshotPath = join(root.path, "module.wasm");
					let snapshotHash;
					const verifySnapshot = async () => {
						if (snapshotHash === undefined) return;
						const bytes = await readStableArtifact(snapshotPath, limits.inputBytes, options?.signal, undefined, this.#resources);
						if (bytes.sha256 !== snapshotHash) throw new AnalysisArtifactChangedError(OPERATION, input.path, "Private WASM snapshot bytes changed.", { capturedOutput });
					};
					const execute = async (command, args, acceptNonZeroExit = false) => {
						capturedOutput = undefined;
						await assertArtifactCommandPath(command.selection, OPERATION, options);
						await verifySnapshot();
						const snapshot = await runOwnedCommand({
							command: command.selection.invocationPath,
							arguments: args,
							cwd: root.path,
							expectedCommand: null,
							runId: `rea-wabt-${randomUUID()}`,
							hostEnvironment: environment
						}, {
							timeoutMs: commandTimeoutMs,
							diagnosticBytes: limits.outputBytes,
							acceptNonZeroExit
						}, {
							...options?.signal === undefined ? {} : { signal: options.signal },
							...this.launcher === undefined ? {} : { launcher: this.launcher }
						});
						capturedOutput = capturedProviderOutput(snapshot);
						const invalidUtf8Streams = [...snapshot.stdout.invalidUtf8 ? ["stdout"] : [], ...snapshot.stderr.invalidUtf8 ? ["stderr"] : []];
						if (snapshot.exitCode === 0 && invalidUtf8Streams.length > 0) throw new AnalysisOutputError(OPERATION, "WABT output is not valid UTF-8; retained text contains replacement characters.", {
							capturedOutput,
							diagnostics: {
								tool: command.tool,
								invalid_utf8_streams: invalidUtf8Streams
							}
						});
						await assertArtifactCommandPath(command.selection, OPERATION, {
							...options?.signal === undefined ? {} : { signal: options.signal },
							capturedOutput
						});
						const current = await readStableArtifact(command.path, limits.toolBytes, options?.signal, undefined, this.#resources);
						if (current.sha256 !== command.sha256) throw new AnalysisOutputError(OPERATION, "Configured WABT executable changed during inspection.", { capturedOutput });
						await verifySnapshot();
						return snapshot;
					};
					for (const command of commands) {
						versionProbe = {
							configuration_key: "REA_WABT_BIN_DIRECTORY",
							executable_path: command.path,
							tool: command.tool,
							expected_version: WABT_VERSION,
							accepted_releases: wabtReleaseLine()
						};
						const version = await execute(command, ["--version"]);
						const admission = version.exitCode === 0 && version.stderr.text === "" ? admitWabtVersion(version.stdout.text) : undefined;
						function rejectVersion(reason) {
							throw new AnalysisCapabilityUnavailableError(WABT_PROVIDER_IDENTITY.id, OPERATION, reason, {
								userMessage: reason,
								diagnostics: versionProbe,
								capturedOutput: capturedProviderOutput(version),
								remediationAction: wabtConfigurationRecoveryAction()
							});
						}
						if (admission === undefined || admission.status === "unsupported") {
							const reason = `${admission?.message ?? `Unsupported ${command.tool} version banner`}; expected stdout from ${wabtReleaseLine()} with empty stderr.`;
							rejectVersion(reason);
						}
						if (observedRelease === undefined) observedRelease = admission.version;
						if (observedRelease !== admission.version) {
							const reason = `Configured WABT tools report different releases (${observedRelease} and ${admission.version}); select one complete ${wabtReleaseLine()} installation.`;
							rejectVersion(reason);
						}
						if (admission.status === "compatible") compatibleLimitation = admission.limitation;
						admittedVersion = admission.version;
						command.version_banner = version.stdout.text;
						versionProbe = undefined;
					}
					toolProfile = {
						source: "https://github.com/WebAssembly/wabt",
						release: admittedVersion,
						source_commit: admittedVersion === "1.0.42" ? WABT_SOURCE_COMMIT : null,
						commands: commands.map(({ selection: _selection, ...command }) => command),
						timeout_ms: commandTimeoutMs,
						output_budget_bytes: limits.outputBytes
					};
					capturedOutput = undefined;
					phase = "artifact";
					const selected = await readSelectedInput(input.path, (snapshot) => {
						const observed = {
							path: input.path,
							sha256: snapshot.sha256,
							bytes: snapshot.bytes.length
						};
						artifact = observed;
						candidates.push(observed);
					});
					for (const path of new Set([input.path, ...input.candidate_paths])) {
						if (path === input.path) continue;
						artifactInput = {
							path,
							field: ["candidate_paths", input.candidate_paths.indexOf(path)]
						};
						await readSelectedInput(path, (snapshot) => {
							candidates.push({
								path,
								sha256: snapshot.sha256,
								bytes: snapshot.bytes.length
							});
						});
					}
					for (const [index, path] of input.glue_paths.entries()) {
						artifactInput = {
							path,
							field: ["glue_paths", index]
						};
						const glueIndex = glue.length;
						const bytes = await readSelectedInput(path, (snapshot) => {
							glue.push({
								artifact: {
									path,
									sha256: snapshot.sha256,
									bytes: snapshot.bytes.length
								},
								parse_status: "not-performed",
								references: []
							});
						});
						const glueArtifact = {
							path,
							sha256: bytes.sha256,
							bytes: bytes.bytes.length
						};
						try {
							const source = decodeStrictUtf8(bytes.bytes, "preserve");
							glue[glueIndex] = {
								artifact: glueArtifact,
								...associateWasmGlue(source, path, candidates.map((candidate) => candidate.path))
							};
						} catch (cause) {
							glue[glueIndex] = {
								artifact: glueArtifact,
								parse_status: "failed",
								references: []
							};
							throw cause;
						}
					}
					phase = "producer";
					const signal = options?.signal;
					await writeFile(snapshotPath, selected.bytes, {
						flag: "wx",
						mode: 256,
						...signal === undefined ? {} : { signal }
					}).catch((cause) => {
						if (isAbortOf(cause, signal)) throw cancelledBy(OPERATION, signal);
						throw cause;
					});
					snapshotHash = selected.sha256;
					phase = "producer";
					const [validate, objdump, decode] = commands;
					if (validate === undefined || objdump === undefined || decode === undefined) throw new WabtAdmissionError("incomplete_tool_profile");
					const validation = await execute(validate, validate.arguments, true);
					if (validation.exitCode !== 0) {
						const validationOutput = capturedProviderOutput(validation);
						throw new AnalysisInputError(OPERATION, {
							partialObservation: createEvidence({
								path: input.path,
								format: "file",
								sha256: selected.sha256
							}, admittedIdentity(), {
								operation: OPERATION,
								parameters: input,
								result: {
									...acquiredFacts(),
									validation: "rejected-by-selected-profile",
									exit_code: validationOutput.exit_code ?? null,
									stdout: validationOutput.stdout,
									stderr: validationOutput.stderr
								},
								confidence: "observed",
								locations: [{
									kind: "artifact-path",
									path: input.path
								}],
								limitations: ["WABT rejected these exact selected bytes with --enable-all and --ignore-custom-section-errors; no complete inspection or target execution occurred.", ...compatibleLimitation === undefined ? [] : [compatibleLimitation]]
							}),
							capturedOutput: validationOutput
						}, [{
							path: ["path"],
							reason: "invalid_format",
							message: "Selected bytes failed WABT validation with --enable-all and --ignore-custom-section-errors; inspect retained upstream diagnostics."
						}]);
					}
					validationState = "valid";
					const parsedDiagnostics = [];
					const optionalLimitations = [];
					const unexpectedDiagnostics = (output) => new AnalysisOutputError(OPERATION, "Unexpected WABT diagnostic output.", { capturedOutput: capturedProviderOutput(output) });
					const retainWarnings = (tool, output) => {
						const text = output.stderr.text;
						if (text === "") return;
						const nameEnds = diagnosticNameEnds(text);
						if (nameEnds === null) throw unexpectedDiagnostics(output);
						parsedDiagnostics.push({
							tool,
							output,
							nameEnds
						});
					};
					retainWarnings("wasm-validate", validation);
					const dump = await execute(objdump, objdump.arguments);
					retainWarnings("wasm-objdump", dump);
					const wat = await execute(decode, decode.arguments);
					retainWarnings("wasm2wat", wat);
					if (!wat.stdout.text.startsWith("(module")) throw new AnalysisOutputError(OPERATION, "Unexpected WABT decoding output.", { capturedOutput });
					const { imports, exports, customSectionNames, debugModuleNames, debugNameMetadata: decodedNameMetadata, interface: interfaceFacts } = parseWabtWat(wat.stdout.text, input.max_interface_bytes);
					capturedOutput = capturedProviderOutput(dump);
					const { sections, headers, details, invalidNameEnds } = parseWabtOutput(dump.stdout.text, selected.bytes.length, customSectionNames, debugModuleNames, selected.bytes);
					for (const { output, nameEnds } of parsedDiagnostics) for (const offset of nameEnds) if (!invalidNameEnds.has(offset)) throw unexpectedDiagnostics(output);
					const customSectionWarnings = parsedDiagnostics.map(({ tool, output }) => ({
						tool,
						text: output.stderr.text
					}));
					const debugNameMetadata = invalidNameEnds.size > 0 || decodedNameMetadata === "complete" && customSectionWarnings.length > 0 ? "unknown" : decodedNameMetadata;
					if (debugNameMetadata === "uninterpretable") optionalLimitations.push("The optional WebAssembly name custom section could not be fully interpreted; its original payload remains in decoded WAT. Observed module-name displays are retained for producer framing; complete debug-name coverage remains unknown.");
					else if (debugNameMetadata === "unknown") optionalLimitations.push("WABT custom-section warning attribution is unknown, so complete debug-name coverage remains unknown. Observed module-name displays are retained for producer framing.");
					if (customSectionWarnings.length > 0) optionalLimitations.push("WABT reported optional custom-section interpretation warnings; exact warning output is retained in custom_section_warnings.");
					if (invalidNameEnds.size > 0) optionalLimitations.push("An optional custom-section name is invalid UTF-8 and was omitted from decoded WAT. Its original bytes and objdump section range remain available; its identity and debug-name coverage are unknown.");
					const limitations = [
						"WAT is a decoded representation, not original source or proof of runtime behavior. Custom annotations may retain payloads, but WAT does not establish original binary layout or round-trip byte identity. Original bytes and objdump output remain authoritative.",
						"Imports and exports retain exact top-level WABT WAT forms. Names remain escaped producer text; unescaped objdump display names are not parsed as unambiguous identifiers.",
						"JavaScript references are AST-observed static literals only. Candidate matches are associations, not proven data flow, URL-to-file identity or runtime loading. Computed references and aliases are not resolved.",
						"No target execution or implicit fetch. WABT tools are trusted caller-supplied executables; SHA-256 identifies their bytes, not publisher authenticity. No OS memory sandbox is claimed.",
						`Each WABT command has a ${String(commandTimeoutMs)} ms deadline and a ${String(limits.outputBytes)} byte combined output budget (max_output_bytes). The deadline is not a whole-inspection budget. Oversized output fails instead of producing truncated success.`,
						...compatibleLimitation === undefined ? [] : [compatibleLimitation],
						...optionalLimitations
					];
					const report = wasmArtifactSchema.parse({
						artifact,
						validation: "valid",
						sections,
						imports,
						exports,
						interface: interfaceFacts,
						debug_name_metadata: debugNameMetadata,
						custom_section_warnings: customSectionWarnings,
						headers,
						details,
						wat: {
							text: wat.stdout.text,
							sha256: sha256Hex(wat.stdout.text),
							representation: "decoded-wat"
						},
						tool_profile: toolProfile,
						candidates,
						glue,
						runtime_execution: "not-performed",
						network_fetch: "not-performed",
						limitations
					});
					result = ok(createAnalysisExecution(report, admittedIdentity(), {
						subject: {
							path: input.path,
							format: "file",
							sha256: selected.sha256
						},
						locations: [{
							kind: "artifact-path",
							path: input.path
						}],
						limitations
					}));
				} catch (cause) {
					const failure = classifyProviderFailure(cause, wabtFailureDialect(phase, phase === "artifact" ? artifactInput.path : input.path, {
						commandTimeoutMs,
						...commandTimeoutSource === undefined ? {} : { commandTimeoutSource },
						limits,
						inputField: artifactInput.field,
						observedOutput: capturedOutput,
						...versionProbe === undefined ? {} : { versionProbe }
					}));
					if (failure.partialObservation === undefined) {
						const partial = acquiredEvidence();
						if (partial !== undefined) failure.retainPartialObservation(partial);
					}
					runtime?.retainCommandFailure(cause, failure, this.#resources);
					result = err(failure);
				}
				if (runtime !== undefined) {
					const cleanup = await this.#resources.release({
						kind: "lease",
						resource: runtime.path,
						lease: runtime.lease
					});
					let partialObservation = result.ok ? undefined : result.error.partialObservation;
					if (result.ok && (options?.signal?.aborted || cleanup.kind === "failed")) {
						partialObservation = createAnalysisExecutionEvidence(OPERATION, input, result.value, "observed");
					}
					if (isAborted(options?.signal)) {
						result = err(analysisErrorWithCancellation(result.ok ? undefined : result.error, cancelledBy(OPERATION, options.signal, partialObservation === undefined ? {} : { partialObservation })));
					}
					if (cleanup.kind === "failed") {
						const cause = cleanup.cause;
						const retainedObservation = result.ok ? partialObservation : result.error.partialObservation;
						const failure = new ProviderCleanupError(WABT_PROVIDER_IDENTITY.id, [runtime.path], {
							reason: errorMessage(cause),
							previous_error: result.ok ? null : projectAnalysisError(result.error)
						}, {
							operation: OPERATION,
							cause,
							...retainedObservation === undefined ? {} : { partialObservation: retainedObservation }
						});
						new AnalysisCleanupLeaseGroup(failure, [runtime.lease]);
						result = result.ok ? err(failure) : err(analysisErrorWithCleanupDependencies(result.error, failure, OPERATION));
					}
				}
				return result;
			}
		};
		resourceCleanupFailure = (cause) => {
			const cleanup = cause instanceof ArtifactReaderFailure ? cause.cleanup : undefined;
			const failure = new ProviderCleanupError(WABT_PROVIDER_IDENTITY.id, cleanup?.resources ?? ["artifact-resources"], { reason: cleanup?.reason ?? errorMessage(cause) }, {
				operation: OPERATION,
				cause
			});
			bindArtifactFileCleanup(cause, failure);
			return failure;
		};
	})))();
}

//#endregion
//#region dist/composition/wasm.js
var createWasmArtifactService, wasmArtifactModule;
function init_wasm() {
	return (init_wasm = __esmMin((() => {
		init_WasmArtifactService();
		init_WabtArtifactProvider();
		init_wasmToolContracts();
		init_cliCommandNames();
		createWasmArtifactService = (environment = process.env, settings) => new WasmArtifactService(new WabtArtifactProvider(environment), settings);
		wasmArtifactModule = {
			contract: INSPECT_WASM_ARTIFACT_CONTRACT,
			cliCommand: cliCommandFor("inspect_wasm_artifact"),
			create(environment, injected, settings) {
				const service = injected ?? createWasmArtifactService(environment, settings);
				return {
					inspect: service.inspect.bind(service),
					close: service.close.bind(service)
				};
			}
		};
	})))();
}

//#endregion
//#region dist/cli/wasmCommands.js
var wasmCommands_exports = /* @__PURE__ */ __exportAll({ registerWasmCommands: () => registerWasmCommands });
var registerWasmCommands;
function init_wasmCommands() {
	return (init_wasmCommands = __esmMin((() => {
		init_projectCliAnalysisResult();
		init_WasmInterfaceComparisonService();
		init_wasm();
		init_wasmComparisonContracts();
		init_contractCommand();
		init_evidenceInputCommand();
		registerWasmCommands = (cli, logger, environment) => {
			registerContractDocumentCommand(cli, logger, COMPARE_WASM_INTERFACES_CONTRACT, {
				description: "Compare core WASM interfaces from two exact inspection Evidence records",
				document: "Inline JSON or input file containing left/right Evidence or retained references and required scope",
				cliOptions: { evidenceBundle: evidenceBundleOption }
			}, (document, { signal, operation, frame, cliOptions }) => runEvidenceInputCommand(document, {
				operation,
				signal,
				frame,
				cliOptions
			}, async (lookup) => {
				const result = await compareWasmInterfaces(document, { signal }, lookup);
				return result.ok ? {
					ok: true,
					value: result.value.evidence
				} : result;
			}).then(projectCliAnalysisResult));
			const service = wasmArtifactModule.create(environment);
			registerContractCommand(cli, logger, wasmArtifactModule.contract, {
				command: wasmArtifactModule.cliCommand,
				description: "Inspect an explicit local WASM artifact with WABT",
				positionals: ["path"],
				callerPaths: [
					"path",
					"glue_paths",
					"candidate_paths"
				],
				fields: {
					path: { description: "Local WASM artifact" },
					glue_paths: {
						name: "glue_paths",
						description: "Selected local JavaScript glue paths"
					},
					candidate_paths: {
						name: "candidate_paths",
						description: "Explicit local WASM candidates"
					}
				},
				omit: { detail: "One-shot output is complete Evidence; this command has no summary delivery" }
			}, inspectWithService(() => service, "wabt-artifact"));
		};
	})))();
}

//#endregion
export { init_wasmCommands, wasmCommands_exports };