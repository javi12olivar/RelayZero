import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, init_analysisErrorCore, init_coverage, init_evidenceErrors, joinCoverageStatus } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { init_projectCliAnalysisResult, projectCliAnalysisResult } from "./projectCliAnalysisResult-BSe4oWBn.js";
import { digestCanonicalValue, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { createEvidence, evidenceFileTarget, evidenceSubjectDisplay, evidenceSubjectTarget, getEvidenceInputContract, init_evidence, init_evidenceInputContract, init_evidenceValidation, readEvidence, readEvidencePayload } from "./nativeValueFlow-13oOEkkJ.js";
import { init_binaryTargetTypes, isMachOFormat } from "./binaryTargetTypes-CrE-Muhh.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { contractNamed, init_contractCliDescription, init_contractCommand, registerContractCommand, registerContractDocumentCommand, runOnEvidenceTargets, runOnSessionTarget } from "./contractCommand-Di2ugplH.js";
import { init_EvidenceInputResolver, resolveEvidenceRequest } from "./EvidenceInputResolver-DpJOzfQ9.js";
import { functionDossierSchema, init_functionDossier } from "./functionDossier-Cff5XWxr.js";
import { MANAGED_WORKFLOW_PROVIDER, init_investigationProviders } from "./investigationProviders-TuoKl-Yg.js";
import { init_nativeInspection, inspectMachoSchema } from "./analysisViewResult-vDCF9Pxo.js";
import { init_managedArtifact, init_managedInspectionEvidence, init_managedModuleIdentity, managedInspectionCoverage, managedModuleRow, managedNativeBoundaryInspectionSchema, readManagedInspectionEvidence } from "./managedInspectionEvidence-Cw9u32rc.js";
import { compareManagedMembers, compareManagedMembersRequestSchema, executeManagedReconstructionImport, init_managedApplicationGraph, init_managedMemberComparison, init_managedMemberComparisonMatch, init_managedNativeVerificationSchemas, init_managedReconstruction, managedApplicationGraphReferenceInputSchema, managedNativeVerificationRequestSchema, managedNativeVerificationResultSchema, managedReconstructionImportRequestSchema, projectManagedGraph, readManagedGraphProjection, readManagedMemberEvidence, resolveManagedReconstructionImport } from "./sessionToolContracts-D9XcfL6p.js";
import { evidenceBundleOption, init_evidenceInputCommand, runEvidenceInputCommand } from "./evidenceInputCommand-CWa4Fz9G.js";
import { init_WorkflowUnknown, workflowUnknownInput } from "./WorkflowUnknown-BKpGE8b9.js";
import { init_machoSymbolName, machoRuntimeSymbolName } from "./machoSymbolName-CIrK-Puu.js";
import { MANAGED_TOOL_CONTRACTS, MANAGED_WORKFLOW_TOOL_CONTRACTS, init_managedToolContracts, init_managedWorkflowToolContracts } from "./managedToolContracts-DCzEqSx6.js";

//#region dist/application/managed/ManagedMemberComparisonService.js
var executeManagedMemberComparison, compareManagedMembersExecution, createManagedMemberComparisonEvidence;
function init_ManagedMemberComparisonService() {
	return (init_ManagedMemberComparisonService = __esmMin((() => {
		init_targetIdentity();
		init_EvidenceInputResolver();
		init_managedMemberComparison();
		init_managedMemberComparisonMatch();
		init_analysisErrorCore();
		init_evidence();
		init_result();
		init_investigationProviders();
		init_WorkflowUnknown();
		executeManagedMemberComparison = (input, lookup, options = {}) => {
			const operation = "compare_managed_members";
			const request = resolveEvidenceRequest(operation, input, compareManagedMembersRequestSchema, lookup, options);
			if (!request.ok) return request;
			const left = readManagedMemberEvidence(request.value.input.left, "left");
			if (!left.ok) return left;
			const right = readManagedMemberEvidence(request.value.input.right, "right");
			if (!right.ok) return right;
			if (left.value.evidence.evidence_id === right.value.evidence.evidence_id) return err(new AnalysisInputError(operation, undefined, [{
				path: ["right"],
				reason: "invalid_value",
				message: "Managed member Evidence must be distinct"
			}]));
			const result = compareManagedMembers({
				evidenceId: left.value.evidence.evidence_id,
				result: left.value.result
			}, {
				evidenceId: right.value.evidence.evidence_id,
				result: right.value.result
			});
			const evidence = createManagedMemberComparisonEvidence(left.value.evidence, right.value.evidence, result, options.selection);
			return ok({
				evidence,
				summary: result.summary,
				sources: [left.value.evidence, right.value.evidence]
			});
		};
		compareManagedMembersExecution = (input, lookup, options) => {
			const compared = executeManagedMemberComparison(input, lookup, options);
			if (!compared.ok) return compared;
			const { evidence, sources, summary } = compared.value;
			if (summary.unknown === 0) return ok({
				evidence,
				sources,
				unknown: undefined
			});
			const unknown = workflowUnknownInput(evidence.evidence_id, {
				question: "Which managed members remain unmatched or ambiguous across these versions?",
				severity: "medium",
				domain: "managed-member-comparison",
				required_authority: "shipped-artifact",
				required_confidence: "observed",
				required_environment: null,
				recommended_probes: [{
					operation: "inspect_managed_members",
					rationale: "Review the inspection Evidence coverage and limit diagnostics; this operation has no page override, so unresolved members must remain unknown."
				}],
				relationships: []
			});
			return unknown.ok ? ok({
				evidence,
				sources,
				unknown: unknown.value
			}) : unknown;
		};
		createManagedMemberComparisonEvidence = (left, right, result, selection) => createEvidence(unknownTarget("derived-from-linked-evidence"), MANAGED_WORKFLOW_PROVIDER, {
			predicateType: "rea.managed-member-comparison",
			operation: "compare_managed_members",
			parameters: {
				left_evidence_id: left.evidence_id,
				right_evidence_id: right.evidence_id,
				...selection === undefined ? {} : {
					left_path: selection.leftPath,
					right_path: selection.rightPath,
					...selection.inspection
				}
			},
			result,
			rawResult: null,
			confidence: "inferred",
			authority: "analyst-inference",
			environment: null,
			limitations: result.limitations,
			locations: selection === undefined ? [] : [{
				kind: "artifact-path",
				path: selection.leftPath
			}, {
				kind: "artifact-path",
				path: selection.rightPath
			}],
			evidenceLinks: result.evidence_links
		});
	})))();
}

//#endregion
//#region dist/domain/managed/managedNativeVerificationMatch.js
var collectNativeSymbols, lookupSymbolName, sameSymbolName, moduleFilename, isAbsoluteModulePath, hasModulePathSeparator, unixModuleCandidates, moduleCandidates, plausiblePlatformCandidates, moduleValueCompatibility, moduleCompatibility, candidateNames, pinvokeCandidates, matchPinvoke, pinvokeLimitations, verifyPinvoke, countStatuses, buildVerificationResult;
function init_managedNativeVerificationMatch() {
	return (init_managedNativeVerificationMatch = __esmMin((() => {
		init_managedModuleIdentity();
		init_canonicalDigest();
		init_coverage();
		init_machoSymbolName();
		init_managedArtifact();
		collectNativeSymbols = (observations) => {
			const symbols = [];
			const modulePlatformsByEvidenceId = new Map();
			let accepted = 0;
			let unsupported = 0;
			let partialExports = false;
			const exportLimitations = [];
			for (const observation of observations) {
				modulePlatformsByEvidenceId.set(observation.evidence.evidence_id, observation.platform);
				if (!observation.supported) {
					unsupported += 1;
				} else {
					accepted += 1;
					for (const symbol of observation.symbols) symbols.push(symbol);
					if (observation.exportCoverage !== undefined) {
						if (!observation.exportCoverage.exhaustive) partialExports = true;
						for (const limitation of observation.exportCoverage.limitations) exportLimitations.push(`Native export Evidence ${observation.evidence.evidence_id}: ${limitation}`);
					}
				}
			}
			return {
				symbols,
				accepted,
				unsupported,
				partialExports,
				exportLimitations,
				modulePlatformsByEvidenceId
			};
		};
		lookupSymbolName = (native) => native.source === "macho-export" ? machoRuntimeSymbolName(native.name) : native.name;
		sameSymbolName = (expected, native) => expected === lookupSymbolName(native);
		moduleFilename = (value, caseSensitive, platform) => {
			const separators = platform === "elf" || platform === "mach-o" ? /\//u : /[\\/]/u;
			const filename = value.split(separators).at(-1) ?? value;
			return caseSensitive ? filename : filename.toLowerCase();
		};
		isAbsoluteModulePath = (value, platform) => value.startsWith("/") || platform === "pe" && (/^[a-z]:[\\/]/iu.test(value) || value.startsWith("\\\\"));
		hasModulePathSeparator = (value, platform) => platform === "pe" ? /[\\/]/u.test(value) : value.includes("/");
		unixModuleCandidates = (value, suffix) => {
			const suffixIndex = value.indexOf(suffix);
			const containsSuffix = suffixIndex >= 0 && (suffixIndex + suffix.length === value.length || value[suffixIndex + suffix.length] === ".");
			const hasPath = value.includes("/");
			const libPrefix = (name) => hasPath ? null : `lib${name}`;
			const suffixedName = `${value}${suffix}`;
			const libSuffixedName = libPrefix(suffixedName);
			const libName = libPrefix(value);
			if (containsSuffix) return [
				value,
				...libName === null ? [] : [libName],
				suffixedName,
				...libSuffixedName === null ? [] : [libSuffixedName]
			];
			return [
				suffixedName,
				...libSuffixedName === null ? [] : [libSuffixedName],
				value,
				...libName === null ? [] : [libName]
			];
		};
		moduleCandidates = (value, platform) => {
			if (isAbsoluteModulePath(value, platform)) return [value];
			if (platform === "pe") return /\.(dll|exe)$/iu.test(value) || value.endsWith(".") ? [value] : [value, `${value}.dll`];
			if (platform === "elf") return unixModuleCandidates(value, ".so");
			if (platform === "mach-o") return unixModuleCandidates(value, ".dylib");
			return [value];
		};
		plausiblePlatformCandidates = (value) => {
			return [...new Set([
				...moduleCandidates(value, "pe"),
				...moduleCandidates(value, "elf"),
				...moduleCandidates(value, "mach-o")
			])];
		};
		moduleValueCompatibility = (expected, observed, platform) => {
			const exactCandidates = moduleCandidates(expected, platform);
			const expectedIsAbsolutePath = isAbsoluteModulePath(expected, platform);
			if (expectedIsAbsolutePath) {
				const observedIsAbsolutePath = isAbsoluteModulePath(observed, platform);
				if (!observedIsAbsolutePath) {
					const hasMatchingFilename = exactCandidates.some((candidate) => moduleFilename(candidate, platform !== "pe", platform) === moduleFilename(observed, platform !== "pe", platform));
					return hasMatchingFilename ? "unknown" : "mismatch";
				}
				const fold = platform === "pe";
				const normalize = (path) => fold ? path.replaceAll("\\", "/").toLowerCase() : path;
				return exactCandidates.some((candidate) => normalize(candidate) === normalize(observed)) ? "match" : platform !== "pe" && platform !== "elf" && exactCandidates.some((candidate) => normalize(candidate).toLowerCase() === normalize(observed).toLowerCase()) ? "unknown" : "mismatch";
			}
			if (hasModulePathSeparator(expected, platform)) {
				const isObservedAbsolute = isAbsoluteModulePath(observed, platform);
				if (!isObservedAbsolute && exactCandidates.includes(observed)) return "match";
				const normalizePath = (path) => platform === "pe" ? path.replaceAll("\\", "/").toLowerCase() : path;
				if (!isObservedAbsolute && platform === "pe" && exactCandidates.some((candidate) => normalizePath(candidate) === normalizePath(observed))) return "match";
				if (isObservedAbsolute) {
					if (exactCandidates.some((candidate) => normalizePath(observed).endsWith(`/${normalizePath(candidate)}`))) return "match";
				}
				const sameFilename = exactCandidates.some((candidate) => moduleFilename(candidate, false, platform) === moduleFilename(observed, false, platform));
				return sameFilename ? "unknown" : "mismatch";
			}
			const observedFilename = moduleFilename(observed, true, platform);
			if (exactCandidates.includes(observedFilename)) return "match";
			const caseFoldedCandidates = exactCandidates.map((candidate) => moduleFilename(candidate, false, platform));
			const observedFolded = moduleFilename(observed, false, platform);
			if (!caseFoldedCandidates.includes(observedFolded)) {
				if (platform === null && plausiblePlatformCandidates(expected).map((candidate) => moduleFilename(candidate, false, platform)).includes(observedFolded)) return "unknown";
				return "mismatch";
			}
			if (platform === "elf") return "mismatch";
			if (platform === "pe") return "match";
			return "unknown";
		};
		moduleCompatibility = (scope, symbol, platform) => {
			if (scope === null || scope.trim().length === 0 || moduleFilename(scope, false, platform).length === 0) return "unknown";
			const observedValues = isAbsoluteModulePath(scope, platform) ? [symbol.module_path] : [symbol.module_name, symbol.module_path];
			const values = observedValues.filter((value) => value !== null && moduleFilename(value, false, platform).length > 0);
			if (values.length === 0) return "unknown";
			const results = values.map((value) => moduleValueCompatibility(scope, value, platform));
			if (results.includes("match")) return "match";
			if (results.includes("unknown")) return "unknown";
			return "mismatch";
		};
		candidateNames = (managed, platform) => {
			if (managed.import_name.length === 0) return [];
			const names = new Set([managed.import_name]);
			if (!managed.no_mangle && (platform === "pe" || platform === null)) {
				if (managed.char_set === "unicode" || platform === "pe" && managed.char_set === "auto") names.add(`${managed.import_name}W`);
				if (managed.char_set === "ansi" || platform === "pe" && managed.char_set === "not-specified") names.add(`${managed.import_name}A`);
				if (managed.call_convention === "stdcall") {
					names.add(`_${managed.import_name}`);
					names.add(`_${managed.import_name}@0`);
				}
			}
			return [...names];
		};
		pinvokeCandidates = (managed, symbols, modulePlatformsByEvidenceId) => {
			const namesByPlatform = new Map();
			return symbols.filter((symbol) => {
				const platform = modulePlatformsByEvidenceId.get(symbol.evidence_id) ?? null;
				let names = namesByPlatform.get(platform);
				if (names === undefined) {
					names = candidateNames(managed, platform);
					namesByPlatform.set(platform, names);
				}
				return names.some((name) => sameSymbolName(name, symbol));
			});
		};
		matchPinvoke = (managed, symbols, supportedNativeEvidence, modulePlatformsByEvidenceId) => {
			const allCandidates = pinvokeCandidates(managed, symbols, modulePlatformsByEvidenceId);
			const [first, ...remaining] = allCandidates;
			if (first === undefined) return { match: {
				status: "unresolved",
				basis: supportedNativeEvidence > 0 ? "no-native-candidate" : "unsupported-native-evidence",
				confidence: "unknown",
				matched_native: null,
				candidates: []
			} };
			const candidates = [first, ...remaining];
			const moduleRelation = (symbol) => moduleCompatibility(managed.import_scope_name, symbol, modulePlatformsByEvidenceId.get(symbol.evidence_id) ?? null);
			const exact = candidates.find((symbol) => managed.import_name === lookupSymbolName(symbol) && moduleRelation(symbol) === "match");
			const exactUnknownModule = candidates.find((symbol) => managed.import_name === lookupSymbolName(symbol) && moduleRelation(symbol) === "unknown");
			const unknownModule = exactUnknownModule ?? candidates.find((symbol) => moduleRelation(symbol) === "unknown");
			const decorated = candidates.find((symbol) => moduleRelation(symbol) === "match");
			const selected = exact ?? decorated ?? first;
			if (exact !== undefined) return { match: {
				status: "verified",
				basis: selected.source === "macho-export" ? "exact-export-name" : "exact-function-name",
				confidence: "observed",
				matched_native: selected,
				candidates
			} };
			if (unknownModule !== undefined && (exactUnknownModule !== undefined || decorated === undefined)) return { match: {
				status: "unresolved",
				basis: "module-identity-unknown",
				confidence: "unknown",
				matched_native: unknownModule,
				candidates
			} };
			if (decorated !== undefined) return { match: {
				basis: "decorated-name-candidate",
				status: "inferred",
				confidence: "inferred",
				matched_native: selected,
				candidates
			} };
			return { match: {
				status: "contradicted",
				basis: "module-mismatch",
				confidence: "unknown",
				matched_native: selected,
				candidates
			} };
		};
		pinvokeLimitations = (match, managed) => [
			...managed.import_scope_name === null || managed.import_scope_name.trim().length === 0 ? ["Managed declaration does not name an import scope/module."] : [],
			...match.status === "inferred" ? ["Native symbol matched a decorated candidate rather than the exact declared import name."] : [],
			...match.status === "contradicted" ? ["A symbol name candidate exists, but the supplied native Evidence module identity does not match the managed import scope."] : [],
			...match.status === "unresolved" ? match.basis === "module-identity-unknown" ? ["A native name candidate exists, but a required module identity is unavailable; module correspondence is unknown."] : ["No supplied native export/function Evidence matched this declared import."] : []
		];
		verifyPinvoke = ({ item, managedEvidenceId, native }) => {
			const managed = {
				token: item.token,
				member_token: item.member_token,
				member_name: item.member_name,
				import_name: item.import_name,
				import_scope_name: item.import_scope_name,
				no_mangle: item.no_mangle,
				char_set: item.char_set,
				call_convention: item.call_convention,
				declaration_verification: item.verification
			};
			const selection = matchPinvoke(item, native.symbols, native.accepted, native.modulePlatformsByEvidenceId);
			const limitations = pinvokeLimitations(selection.match, item);
			const context = {
				item_id: `mnv_pinvoke_${digestCanonicalValue({
					managedEvidenceId,
					token: item.token,
					importName: item.import_name,
					importScope: item.import_scope_name,
					candidates: selection.match.candidates
				}, "Managed/native verification")}`,
				managed,
				evidence_links: [managedEvidenceId, ...new Set(selection.match.candidates.map(({ evidence_id: id }) => id))],
				limitations
			};
			return { verification: {
				...context,
				...selection.match
			} };
		};
		countStatuses = (items) => ({
			verified: items.filter(({ status }) => status === "verified").length,
			inferred: items.filter(({ status }) => status === "inferred").length,
			unresolved: items.filter(({ status }) => status === "unresolved").length,
			contradicted: items.filter(({ status }) => status === "contradicted").length
		});
		buildVerificationResult = ({ managedEvidence, managed, native, pinvokeImports, nativeObservationCount, nativeEvidenceIds }) => {
			const counts = countStatuses(pinvokeImports);
			const nativeBodyUnresolved = managed.native_implementations.filter(({ boundary_kind: kind }) => kind !== "pinvoke" && kind !== "runtime-provided").length;
			const status = joinCoverageStatus([managedInspectionCoverage(managed.coverage.state), native.unsupported === 0 && !native.partialExports ? "complete" : "partial"]);
			const coverage = { status: status === "complete" ? "complete-within-inputs" : status };
			return {
				algorithm: {
					name: "rea-managed-native-verification",
					token_identity: "build-local",
					token_to_address_mapping: "not-inferred"
				},
				managed_boundary: {
					evidence_id: managedEvidence.evidence_id,
					artifact_sha256: managed.artifact.sha256,
					artifact_path: managed.artifact.path,
					mvid: managedModuleRow(managed)?.mvid ?? null,
					metadata_status: managed.metadata.status,
					pinvoke_imports_total: managed.pinvoke_imports.length,
					native_implementations_total: managed.native_implementations.length,
					coverage_state: managed.coverage.state
				},
				native_observations: {
					total: nativeObservationCount,
					accepted: native.accepted,
					unsupported: native.unsupported,
					symbols: native.symbols.length
				},
				summary: {
					...counts,
					native_body_unresolved: nativeBodyUnresolved
				},
				pinvoke_imports: [...pinvokeImports],
				native_implementations: {
					runtime_provided: managed.native_implementations.filter(({ boundary_kind }) => boundary_kind === "runtime-provided").length,
					unresolved: nativeBodyUnresolved,
					reason: "Managed metadata tokens and RVAs are not translated to native provider addresses by this workflow; C++/CLI, ReadyToRun, and native-body mappings require explicit provider-supported bridge evidence."
				},
				coverage,
				evidence_links: [managedEvidence.evidence_id, ...nativeEvidenceIds],
				limitations: [
					"P/Invoke verification checks declared import names against supplied native export or function-name Evidence only.",
					"A matching native symbol verifies that a candidate export/function was observed; it does not prove CLR binding, marshaling behavior, call reachability, or runtime loading.",
					"Missing supplied native symbols are reported as unresolved, not proof that a dependency cannot exist.",
					"Managed metadata tokens and method RVAs are not interpreted as native addresses.",
					...managed.coverage.state === "complete" ? [] : ["Managed boundary input is partial or unavailable."],
					...native.unsupported === 0 ? [] : ["Some native Evidence operations were unsupported by this workflow."],
					...native.partialExports ? ["Some native export inventories are not exhaustive."] : [],
					...native.exportLimitations
				]
			};
		};
	})))();
}

//#endregion
//#region dist/domain/managed/managedNativeVerification.js
var verifyManagedNativeVerificationSource, managedNativeVerificationHasUnknowns;
function init_managedNativeVerification() {
	return (init_managedNativeVerification = __esmMin((() => {
		init_canonicalDigest();
		init_managedNativeVerificationSchemas();
		init_managedNativeVerificationMatch();
		verifyManagedNativeVerificationSource = (source) => {
			const { managedEvidence, managed, nativeObservations } = source;
			const native = collectNativeSymbols(nativeObservations);
			const pinvokeImports = managed.pinvoke_imports.map((item) => verifyPinvoke({
				item,
				managedEvidenceId: managedEvidence.evidence_id,
				native
			})).map(({ verification }) => verification);
			const withoutId = buildVerificationResult({
				managedEvidence,
				managed,
				native,
				pinvokeImports,
				nativeObservationCount: nativeObservations.length,
				nativeEvidenceIds: nativeObservations.map(({ evidence }) => evidence.evidence_id)
			});
			return managedNativeVerificationResultSchema.parse({
				...withoutId,
				verification_id: `mnv_${digestCanonicalValue(withoutId, "Managed/native verification")}`
			});
		};
		managedNativeVerificationHasUnknowns = (result) => result.coverage.status !== "complete-within-inputs" || result.summary.unresolved > 0 || result.summary.contradicted > 0 || result.summary.native_body_unresolved > 0;
	})))();
}

//#endregion
//#region dist/domain/managed/managedNativeVerificationSource.js
var OPERATION$3, MANAGED_OPERATION, requestFrameSchema, inputFailure, readNativeObservation, readManagedNativeVerificationSource;
function init_managedNativeVerificationSource() {
	return (init_managedNativeVerificationSource = __esmMin((() => {
		init_binaryTargetTypes();
		init_evidenceInputContract();
		init_managedNativeVerificationSchemas();
		init_evidence();
		init_analysisErrorCore();
		init_evidenceErrors();
		init_inputIssueProjection();
		init_evidenceValidation();
		init_result();
		init_functionDossier();
		init_nativeInspection();
		init_managedArtifact();
		init_managedInspectionEvidence();
		OPERATION$3 = "verify_managed_native_boundaries";
		MANAGED_OPERATION = "inspect_managed_native_boundaries";
		requestFrameSchema = getEvidenceInputContract(managedNativeVerificationRequestSchema).frameSchema;
		inputFailure = (path, message) => new AnalysisInputError(OPERATION$3, { userMessage: message }, [{
			path,
			reason: "invalid_value",
			message
		}]);
		readNativeObservation = (raw) => {
			const read = readEvidence(raw);
			if (!read.ok) return read;
			const evidence = read.value;
			const format = evidenceFileTarget(evidence)?.format;
			const platform = isMachOFormat(format) ? "mach-o" : format === "pe" || format === "elf" ? format : null;
			if (evidence.operation === "inspect_macho") {
				const payload = readEvidencePayload(inspectMachoSchema, evidence.normalized_result, { within: ["normalized_result"] });
				if (!payload.ok) return payload;
				return ok({
					evidence,
					platform,
					supported: true,
					exportCoverage: {
						exhaustive: payload.value.exports.exhaustive,
						limitations: payload.value.exports.limitations
					},
					symbols: payload.value.exports.items.map((symbol) => ({
						evidence_id: evidence.evidence_id,
						operation: evidence.operation,
						name: symbol.name,
						address: symbol.address,
						module_name: evidenceSubjectDisplay(evidence)?.name ?? null,
						module_path: evidenceSubjectDisplay(evidence)?.local_path ?? null,
						source: "macho-export"
					}))
				});
			}
			if (evidence.operation === "analyze_function") {
				const payload = readEvidencePayload(functionDossierSchema, evidence.normalized_result, { within: ["normalized_result"] });
				if (!payload.ok) return payload;
				return ok({
					evidence,
					platform,
					supported: true,
					symbols: [{
						evidence_id: evidence.evidence_id,
						operation: evidence.operation,
						name: payload.value.procedure.name,
						address: payload.value.procedure.address,
						module_name: evidenceSubjectDisplay(evidence)?.name ?? null,
						module_path: evidenceSubjectDisplay(evidence)?.local_path ?? null,
						source: "function-dossier"
					}]
				});
			}
			return ok({
				evidence,
				platform,
				supported: false,
				symbols: []
			});
		};
		readManagedNativeVerificationSource = (rawInput) => {
			const frame = requestFrameSchema.safeParse(rawInput);
			if (!frame.success) return err(analysisInputErrorFromIssues(OPERATION$3, frame.error.issues, rawInput, { cause: frame.error }));
			const managed = readManagedInspectionEvidence(frame.data.managed_boundaries, MANAGED_OPERATION, managedNativeBoundaryInspectionSchema, {
				operation: OPERATION$3,
				path: ["managed_boundaries"]
			});
			if (!managed.ok) return managed;
			const nativeObservations = [];
			const ids = new Set([managed.value.evidence.evidence_id]);
			for (const [index, raw] of frame.data.native_observations.entries()) {
				const native = readNativeObservation(raw);
				if (!native.ok) return native;
				const id = native.value.evidence.evidence_id;
				if (ids.has(id)) return err(inputFailure(["native_observations", index], id === managed.value.evidence.evidence_id ? "Native observation Evidence must be distinct from managed boundary Evidence" : "Native observation Evidence IDs must be unique"));
				ids.add(id);
				nativeObservations.push(native.value);
			}
			return ok({
				managedEvidence: managed.value.evidence,
				managed: managed.value.result,
				nativeObservations
			});
		};
	})))();
}

//#endregion
//#region dist/application/managed/ManagedNativeVerificationService.js
var OPERATION$2, verifyManagedNativeBoundariesExecution, executeManagedNativeBoundaries, createManagedNativeVerificationEvidence;
function init_ManagedNativeVerificationService() {
	return (init_ManagedNativeVerificationService = __esmMin((() => {
		init_targetIdentity();
		init_EvidenceInputResolver();
		init_evidence();
		init_result();
		init_managedNativeVerification();
		init_managedNativeVerificationSource();
		init_managedNativeVerificationSchemas();
		init_investigationProviders();
		init_WorkflowUnknown();
		OPERATION$2 = "verify_managed_native_boundaries";
		verifyManagedNativeBoundariesExecution = (rawInput, lookup, options) => {
			const verified = executeManagedNativeBoundaries(rawInput, lookup, options);
			if (!verified.ok) return verified;
			const { evidence, sourceEvidence: sources, hasUnknowns } = verified.value;
			if (!hasUnknowns) return ok({
				evidence,
				sources,
				unknown: undefined
			});
			const unknown = workflowUnknownInput(evidence.evidence_id, {
				question: "Which managed/native boundaries remain unresolved or contradicted by the supplied native Evidence?",
				severity: "medium",
				domain: "managed-native-verification",
				required_authority: "shipped-artifact",
				required_confidence: "observed",
				required_environment: null,
				recommended_probes: [{
					operation: "inspect_managed_native_boundaries",
					rationale: "Review the inspection Evidence coverage and limit diagnostics; this operation has no page override, so unresolved declarations must remain unknown."
				}, {
					operation: "analyze_function",
					rationale: "Analyze the provider-resolved native function candidate for the declared export."
				}],
				relationships: []
			});
			return unknown.ok ? ok({
				evidence,
				sources,
				unknown: unknown.value
			}) : unknown;
		};
		executeManagedNativeBoundaries = (rawInput, lookup, options = {}) => {
			const request = resolveEvidenceRequest(OPERATION$2, rawInput, managedNativeVerificationRequestSchema, lookup, options);
			if (!request.ok) return request;
			const source = readManagedNativeVerificationSource(request.value.input);
			if (!source.ok) return source;
			const result = verifyManagedNativeVerificationSource(source.value);
			const evidence = createManagedNativeVerificationEvidence(source.value, result);
			return ok({
				evidence,
				summary: result.summary,
				hasUnknowns: managedNativeVerificationHasUnknowns(result),
				sourceEvidence: [source.value.managedEvidence, ...source.value.nativeObservations.map(({ evidence: observation }) => observation)]
			});
		};
		createManagedNativeVerificationEvidence = (source, result) => createEvidence(unknownTarget("derived-from-linked-evidence"), MANAGED_WORKFLOW_PROVIDER, {
			predicateType: "rea.managed-native-verification",
			operation: OPERATION$2,
			parameters: {
				managed_boundaries_evidence_id: source.managedEvidence.evidence_id,
				native_evidence_ids: source.nativeObservations.map(({ evidence }) => evidence.evidence_id)
			},
			result,
			rawResult: null,
			confidence: "inferred",
			authority: "analyst-inference",
			environment: null,
			limitations: result.limitations,
			evidenceLinks: result.evidence_links
		});
	})))();
}

//#endregion
//#region dist/application/managed/ManagedReconstructionService.js
var OPERATION$1, resolveManagedReconstructionEvidenceInput, importManagedReconstructionExecution, importManagedReconstructionEvidence, createManagedReconstructionEvidence;
function init_ManagedReconstructionService() {
	return (init_ManagedReconstructionService = __esmMin((() => {
		init_evidence();
		init_managedReconstruction();
		init_result();
		init_investigationProviders();
		init_EvidenceInputResolver();
		OPERATION$1 = "import_managed_reconstruction";
		resolveManagedReconstructionEvidenceInput = (rawInput, lookup, options = {}) => {
			const parsed = resolveEvidenceRequest(OPERATION$1, rawInput, managedReconstructionImportRequestSchema, lookup, options);
			if (!parsed.ok) return parsed;
			return resolveManagedReconstructionImport(parsed.value.input);
		};
		importManagedReconstructionExecution = (rawInput, lookup, options = {}) => {
			const resolved = resolveManagedReconstructionEvidenceInput(rawInput, lookup, options);
			if (!resolved.ok) return resolved;
			const result = executeManagedReconstructionImport(resolved.value);
			return ok({
				evidence: createManagedReconstructionEvidence(resolved.value.request, result),
				sources: [resolved.value.staticEvidence],
				unknown: undefined
			});
		};
		importManagedReconstructionEvidence = (rawInput, lookup, options = {}) => {
			const imported = importManagedReconstructionExecution(rawInput, lookup, options);
			return imported.ok ? ok(imported.value.evidence) : imported;
		};
		createManagedReconstructionEvidence = (input, result) => createEvidence({
			path: result.static_observation.artifact_path,
			sha256: result.static_observation.artifact_sha256,
			format: "pe"
		}, MANAGED_WORKFLOW_PROVIDER, {
			predicateType: "rea.managed-reconstruction-import",
			operation: OPERATION$1,
			parameters: {
				static_members_evidence_id: result.static_observation.evidence_id,
				decompiler: result.decompiler,
				method_locks: input.methods.map(({ token, signature_sha256, normalized_il_sha256 }) => ({
					token,
					signature_sha256,
					normalized_il_sha256
				})),
				notes: input.notes
			},
			result,
			rawResult: null,
			confidence: "inferred",
			authority: "analyst-inference",
			environment: null,
			limitations: result.limitations,
			locations: [{
				kind: "artifact-path",
				path: result.static_observation.artifact_path
			}],
			evidenceLinks: result.evidence_links
		});
	})))();
}

//#endregion
//#region dist/application/managed/ManagedApplicationGraphService.js
var OPERATION, projectManagedApplicationGraphExecution, projectManagedApplicationGraphEvidence, resolveManagedGraphEvidenceInput, projectManagedGraphEvidence, createManagedApplicationGraphEvidence, subjectTarget;
function init_ManagedApplicationGraphService() {
	return (init_ManagedApplicationGraphService = __esmMin((() => {
		init_targetIdentity();
		init_EvidenceInputResolver();
		init_evidence();
		init_managedApplicationGraph();
		init_result();
		init_investigationProviders();
		OPERATION = "project_managed_application_graph";
		projectManagedApplicationGraphExecution = (rawInput, lookup, options = {}) => {
			const request = resolveManagedGraphEvidenceInput(rawInput, lookup, options);
			if (!request.ok) return request;
			const { artifact, members, boundaries } = request.value.sources;
			return ok({
				evidence: projectManagedGraphEvidence(request.value),
				sources: [
					artifact,
					members,
					boundaries
				].flatMap((source) => source === undefined || source === null ? [] : [source.evidence]),
				unknown: undefined
			});
		};
		projectManagedApplicationGraphEvidence = (rawInput, lookup, options = {}) => {
			const projected = projectManagedApplicationGraphExecution(rawInput, lookup, options);
			return projected.ok ? ok(projected.value.evidence) : projected;
		};
		resolveManagedGraphEvidenceInput = (rawInput, lookup, options = {}) => {
			const request = resolveEvidenceRequest(OPERATION, rawInput, managedApplicationGraphReferenceInputSchema, lookup, options);
			return request.ok ? readManagedGraphProjection(request.value.input) : request;
		};
		projectManagedGraphEvidence = (request) => createManagedApplicationGraphEvidence(request.sources, projectManagedGraph(request));
		createManagedApplicationGraphEvidence = (input, result) => createEvidence(subjectTarget(input) ?? unknownTarget("derived-from-linked-evidence"), MANAGED_WORKFLOW_PROVIDER, {
			predicateType: "rea.managed-application-graph",
			operation: OPERATION,
			parameters: {
				managed_artifact_evidence_id: input.artifact?.evidence.evidence_id ?? null,
				managed_members_evidence_id: input.members?.evidence.evidence_id ?? null,
				managed_native_boundaries_evidence_id: input.boundaries?.evidence.evidence_id ?? null
			},
			result,
			rawResult: null,
			confidence: "inferred",
			authority: "analyst-inference",
			environment: null,
			limitations: result.limitations,
			evidenceLinks: result.evidence_links
		});
		subjectTarget = (input) => {
			const target = [
				input.artifact,
				input.members,
				input.boundaries
			].map((source) => evidenceSubjectTarget(source?.evidence.subject)).find((candidate) => candidate !== undefined);
			return target?.format === "pe" ? target : undefined;
		};
	})))();
}

//#endregion
//#region dist/cli/managedCommands.js
var managedCommands_exports = /* @__PURE__ */ __exportAll({ registerManagedCommands: () => registerManagedCommands });
var registerManagedCommands, managedTarget, registerInspectManagedArtifact, registerInspectManagedMembers, registerInspectManagedNativeBoundaries, registerCompareManagedMembers, MANAGED_WORKFLOWS, registerManagedWorkflowCommands;
function init_managedCommands() {
	return (init_managedCommands = __esmMin((() => {
		init_projectCliAnalysisResult();
		init_ManagedMemberComparisonService();
		init_ManagedNativeVerificationService();
		init_ManagedReconstructionService();
		init_ManagedApplicationGraphService();
		init_managedWorkflowToolContracts();
		init_contractCliDescription();
		init_contractCommand();
		init_result();
		init_evidenceInputCommand();
		init_managedToolContracts();
		registerManagedCommands = (cli, logger, { runProviderAnalysis, runManagedProviderEvidence }) => {
			registerInspectManagedArtifact(cli, logger, runProviderAnalysis);
			registerInspectManagedMembers(cli, logger, runProviderAnalysis);
			registerInspectManagedNativeBoundaries(cli, logger, runProviderAnalysis);
			registerCompareManagedMembers(cli, logger, runManagedProviderEvidence);
			registerManagedWorkflowCommands(cli, logger);
		};
		managedTarget = {
			sessionTarget: { description: "Managed PE executable or assembly path" },
			omit: { path: "The CLI selects the managed target as its first argument" }
		};
		registerInspectManagedArtifact = (cli, logger, runProviderAnalysis) => {
			registerContractCommand(cli, logger, contractNamed(MANAGED_TOOL_CONTRACTS, "inspect_managed_artifact"), {
				description: "Inspect PE/CLI identity without loading target code",
				...managedTarget,
				evidenceDelivery: true
			}, runOnSessionTarget(runProviderAnalysis, logger));
		};
		registerInspectManagedMembers = (cli, logger, runProviderAnalysis) => {
			registerContractCommand(cli, logger, contractNamed(MANAGED_TOOL_CONTRACTS, "inspect_managed_members"), {
				description: "Inspect PE/CLI metadata members, signatures, CIL anchors, and ldstr string literals without loading target code",
				...managedTarget,
				evidenceDelivery: true,
				fields: { type_names: {
					name: "type",
					description: "Inspect only members declared by this exact type full name, and the string literals they load, such as System.Threading.Monitor; a nested type is named by its bare name, which selects every nested type of that name (repeatable)"
				} }
			}, runOnSessionTarget(runProviderAnalysis, logger));
		};
		registerInspectManagedNativeBoundaries = (cli, logger, runProviderAnalysis) => {
			registerContractCommand(cli, logger, contractNamed(MANAGED_TOOL_CONTRACTS, "inspect_managed_native_boundaries"), {
				description: "Inspect PE/CLI PInvoke and native implementation boundary declarations without loading target code",
				...managedTarget
			}, runOnSessionTarget(runProviderAnalysis, logger));
		};
		registerCompareManagedMembers = (cli, logger, runManagedProviderEvidence) => {
			registerContractCommand(cli, logger, contractNamed(MANAGED_WORKFLOW_TOOL_CONTRACTS, "compare_managed_members"), {
				description: "Compare managed PE/CLI member inventories by exact declared type, name, and signature; names alone never form a match",
				evidenceTargets: {
					fields: {
						left: {
							name: "leftPath",
							description: "Baseline managed PE executable or assembly"
						},
						right: {
							name: "rightPath",
							description: "Candidate managed PE executable or assembly"
						}
					},
					source: {
						contract: contractNamed(MANAGED_TOOL_CONTRACTS, "inspect_managed_members"),
						fields: {
							type_names: {
								name: "type",
								description: "Compare only members declared by this exact type full name on both sides, as selected by inspect-managed-members --type; use it when a whole-assembly comparison exceeds capacity (repeatable)"
							},
							max_snapshot_bytes: {},
							max_metadata_representation_bytes: {}
						}
					}
				}
			}, runOnEvidenceTargets((target, parameters, signal) => runManagedProviderEvidence(target, "inspect_managed_members", parameters, signal), (input, { evidenceTargets, opening, signal }) => {
				const pathOf = (side) => evidenceTargets.targets.find(({ field }) => field === side).target;
				const compared = executeManagedMemberComparison(input, undefined, {
					signal,
					selection: {
						leftPath: pathOf("left"),
						rightPath: pathOf("right"),
						inspection: opening
					}
				});
				return Promise.resolve(compared.ok ? ok(compared.value.evidence) : compared);
			}));
		};
		MANAGED_WORKFLOWS = [
			{
				name: "import_managed_reconstruction",
				description: "Import decompiler-produced managed reconstruction against exact static member evidence",
				document: "Inline managed reconstruction JSON or JSON file path",
				workflow: (input, lookup, signal) => importManagedReconstructionEvidence(input, lookup, { signal })
			},
			{
				name: "verify_managed_native_boundaries",
				description: "Verify managed P/Invoke declarations against authenticated native Evidence",
				document: "Inline managed/native verification JSON or JSON file path",
				workflow: (input, lookup, signal) => {
					const result = executeManagedNativeBoundaries(input, lookup, { signal });
					return result.ok ? ok(result.value.evidence) : result;
				}
			},
			{
				name: "project_managed_application_graph",
				description: "Project authenticated managed static Evidence into an application graph",
				document: "Inline managed application graph JSON or JSON file path",
				workflow: (input, lookup, signal) => projectManagedApplicationGraphEvidence(input, lookup, { signal })
			}
		];
		registerManagedWorkflowCommands = (cli, logger) => {
			for (const { name, description, document, workflow } of MANAGED_WORKFLOWS) registerContractDocumentCommand(cli, logger, contractNamed(MANAGED_WORKFLOW_TOOL_CONTRACTS, name), {
				description,
				document,
				cliOptions: { evidenceBundle: evidenceBundleOption }
			}, (input, { signal, operation, frame, cliOptions }) => runEvidenceInputCommand(input, {
				operation,
				signal,
				frame,
				cliOptions
			}, (lookup) => Promise.resolve(workflow(input, lookup, signal))).then(projectCliAnalysisResult));
		};
	})))();
}

//#endregion
export { init_managedCommands, managedCommands_exports };