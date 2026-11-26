import { __esmMin, __exportAll } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisInputError, AnalysisOutputError, AnalysisSnapshotMismatchError, CallerAbort, EvidenceFileError, UnknownRegistryError, cancelledBy, init_analysisErrorCore, init_evidenceErrors, init_unknownRegistryError } from "./jsonSerialization-DAF9DVXC.js";
import { absoluteCallerPath, compareUnicodeCodePoints, init_callerPath, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_logger, silentLogger } from "./logger-CYsWF45U.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";
import { analysisProfileSchema, committedProviderSchema, createEvidence, evidenceEnvelopeForAdmission, init_analysisProfile, init_evidence, init_evidenceValidation, recognizeEvidence, withEvidenceCallerInputPath } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { init_jsonStringByteLength, jsonStringByteLength } from "./jsonValueByteLength-Dc6A_7fI.js";
import { createImmutableEvidenceBundle, init_evidenceBundle } from "./evidenceBundle-CWOVHJ6o.js";
import { callerAnalysisParameters, init_AnalysisInput, parseAnalysisInput } from "./AnalysisInput-DxRGOYg7.js";
import { estimateJsonStorage, init_JsonAuthenticationHeadroom, init_analysisSnapshot, snapshotBindingMismatch, snapshotEvidenceForQuery } from "./EvidenceInputResolver-DpJOzfQ9.js";
import { collectInvestigationEvidenceClosure, createInvestigationEvidenceClosureChecker, init_InvestigationEvidence } from "./InvestigationEvidence-BFl9Xj1M.js";
import { dispatchQueuedInterrupts, init_queuedInterrupts } from "./queuedInterrupts-gxezF6I5.js";
import { init_nativeOperationFacts, init_nativeProviderOutput, listNamesFact, outputContractDiagnostics } from "./nativeValueTrace-B4vmCxtN.js";
import { REA_WORKFLOW_PROVIDER, init_investigationProviders } from "./investigationProviders-TuoKl-Yg.js";
import { enhancedInputSchemas, init_enhancedInputs } from "./sessionToolContracts-D9XcfL6p.js";
import { createAnalysisExecutionEvidence, init_analysisObservation } from "./analysisObservation-BSCFvtEd.js";
import { completeProviderEvidence, init_ProviderOperationExecution } from "./ProviderOperationExecution-DJuOJe_5.js";
import { OFFICIAL_TOOL_CONTRACTS, init_officialToolContracts } from "./officialToolContracts-7Ov7fJ7b.js";
import { NATIVE_TOOL_CONTRACTS, init_nativeToolContracts } from "./nativeToolContracts-CqgzCixq.js";
import { admitInvestigationAuthentication, init_InvestigationRetention, init_recordEvidenceSources, init_sourcePublicationRecovery, preserveCompletedSourceEvidence, recordEvidenceSources, retainAnalysisResultSources, withEvidenceSources } from "./recordEvidenceSources-BFkP6hRB.js";
import { ARTIFACT_ANALYSIS_OPERATIONS, ARTIFACT_TOOL_CONTRACTS, artifactInventoryInputSchema, init_artifactToolContracts } from "./artifactToolContracts-CuhZwra_.js";
import { init_WorkflowUnknown, workflowUnknownInput } from "./WorkflowUnknown-BKpGE8b9.js";
import { MANAGED_TOOL_CONTRACTS, init_managedToolContracts, isManagedToolName, managedArtifactInputSchema, managedMembersInputSchema } from "./managedToolContracts-DCzEqSx6.js";
import { classifyBinaryTargetFilesystemFailure, init_binaryTargetFilesystemFailure } from "./binaryTargetFilesystemFailure-Jtx2RF9Z.js";
import { init_toolContracts, toolContract } from "./toolContracts-CKzBMbP1.js";
import { BUNDLE_RESOURCE_OPERATIONS, EvidenceLedger, completedOperationEvidence, init_AnalysisSnapshotCache, init_BundleResourceOperations, init_EvidenceLedger, init_ProfilelessNativeWorkflowSnapshot, init_SessionEvidenceReuse, init_SessionProviderPolicy, init_WorkflowAnalysisProfile, profilelessNativeDispatchProfile, requestsStandaloneDecompile, requiresNativeSourceAdmissionBeforeReplay, routeAllowsSnapshotReplay, routeProviderIdentity, workflowAnalysisProfile, workflowAnalysisProfileParameters } from "./BundleResourceOperations-yIwg2B-u.js";
import { directAnalysisCleanupFailure, init_DirectAnalysisCleanup, managedAnalysisCleanupFailure, projectDirectAnalysisFailure, projectInvocationFailure, withSessionCleanup } from "./DirectAnalysisCleanup-DgQNP-nA.js";
import { access, stat } from "node:fs/promises";

//#region dist/application/oneShotOperationInput.js
var schemasByName, schemas, admitOneShotOperation;
function init_oneShotOperationInput() {
	return (init_oneShotOperationInput = __esmMin((() => {
		init_toolContracts();
		init_officialToolContracts();
		init_nativeToolContracts();
		init_artifactToolContracts();
		init_managedToolContracts();
		init_enhancedInputs();
		init_AnalysisInput();
		init_result();
		schemasByName = (contracts) => Object.fromEntries(contracts.map(({ name, inputSchema }) => [name, inputSchema]));
		schemas = {
			...schemasByName(OFFICIAL_TOOL_CONTRACTS),
			...schemasByName(NATIVE_TOOL_CONTRACTS),
			...schemasByName(ARTIFACT_TOOL_CONTRACTS),
			...schemasByName(MANAGED_TOOL_CONTRACTS),
			...enhancedInputSchemas,
			inspect_native_load_image: toolContract("inspect_native_load_image").inputSchema.omit({ detail: true }),
			inspect_managed_artifact: managedArtifactInputSchema.omit({ detail: true }),
			inspect_managed_members: managedMembersInputSchema.omit({ detail: true }),
			inventory_artifact: artifactInventoryInputSchema
		};
		admitOneShotOperation = (name, input, signal) => {
			const parsed = parseAnalysisInput(name, input, schemas[name], signal);
			if (!parsed.ok) return parsed;
			const selected = callerAnalysisParameters(input)(parsed.value);
			return ok({
				name,
				input: selected
			});
		};
	})))();
}

//#endregion
//#region dist/ports/AnalysisWorkScope.js
var AnalysisWorkScope;
function init_AnalysisWorkScope() {
	return (init_AnalysisWorkScope = __esmMin((() => {
		AnalysisWorkScope = class {
			#entries = new Map();
			#closed = false;
			get(owner) {
				return this.#entries.get(owner);
			}
			set(owner, value) {
				if (!this.#closed) this.#entries.set(owner, value);
			}
			clear() {
				this.#closed = true;
				this.#entries.clear();
			}
		};
	})))();
}

//#endregion
//#region dist/application/SourceLimitations.js
var sourceLimitationKey, sourceLimitationGroupKey, renderSourceLimitations;
function init_SourceLimitations() {
	return (init_SourceLimitations = __esmMin((() => {
		init_unicodeCodePointOrder();
		sourceLimitationKey = ({ provider, operation, limitation }) => JSON.stringify([
			provider.id,
			provider.name,
			provider.version,
			operation,
			limitation
		]);
		sourceLimitationGroupKey = ({ provider, limitation }) => JSON.stringify([
			provider.id,
			provider.name,
			provider.version,
			limitation
		]);
		renderSourceLimitations = (limitations) => {
			const groups = new Map();
			for (const { provider, operation, limitation } of limitations) {
				const key = sourceLimitationGroupKey({
					provider,
					limitation
				});
				const group = groups.get(key) ?? {
					provider,
					limitation,
					operations: new Set()
				};
				group.operations.add(operation);
				groups.set(key, group);
			}
			return [...groups.values()].map(({ provider, limitation, operations }) => {
				const version = provider.version === null ? "" : ` ${provider.version}`;
				const operationList = [...operations].sort(compareUnicodeCodePoints);
				return `${provider.name} (${provider.id}${version}) ${operationList.join(", ")}: ${limitation}`;
			}).sort(compareUnicodeCodePoints);
		};
	})))();
}

//#endregion
//#region dist/application/WorkflowEvidence.js
var DECOMPILE_ALL_LIMITATIONS, composedLimitationBudget, executeComposedWorkflow, TRACE_FEATURE_REFERENCE_LIMITATION, WORKFLOW_DERIVATION_LIMITATION, workflowLimitations, workflowSubject, createWorkflowEvidence, admitWorkflowRecovery, retainComposedWorkflowSources, retainPartialWorkflowEvidence, batchProcedureLocations, workflowSnapshotRecord, recordWorkflowUnknowns;
function init_WorkflowEvidence() {
	return (init_WorkflowEvidence = __esmMin((() => {
		init_targetIdentity();
		init_AnalysisWorkScope();
		init_unicodeCodePointOrder();
		init_jsonStringByteLength();
		init_analysisObservation();
		init_investigationProviders();
		init_WorkflowAnalysisProfile();
		init_result();
		init_analysisProfile();
		init_evidence();
		init_unknownRegistryError();
		init_EvidenceLedger();
		init_recordEvidenceSources();
		init_sourcePublicationRecovery();
		init_InvestigationRetention();
		init_JsonAuthenticationHeadroom();
		init_WorkflowUnknown();
		init_SourceLimitations();
		DECOMPILE_ALL_LIMITATIONS = {
			perItemOperations: new Set(["procedure_info", "procedure_pseudo_code"]),
			maxDistinct: 8,
			retainedIn: "decompile-index.json keeps the latest record for each function; decompile-journal.jsonl keeps each attempt and its caveats"
		};
		composedLimitationBudget = (operation) => operation === "decompile_all" ? DECOMPILE_ALL_LIMITATIONS : undefined;
		executeComposedWorkflow = async (analysis, execute, budget) => {
			const limitations = new Map();
			const evidenceLinks = new Set();
			const sourceLedger = new EvidenceLedger();
			const perItemGroups = new Set();
			let perItemBytes = 0;
			let omittedObservations = 0;
			let cachePolicy;
			const workScope = new AnalysisWorkScope();
			const observed = {
				resourceScope: analysis.resourceScope,
				execute: async (operation, parameters, options) => {
					let execution = await analysis.execute(operation, parameters, {
						...options,
						workScope
					});
					if (execution.ok && execution.value.sourceEvidence !== undefined) {
						const recorded = recordEvidenceSources((source) => sourceLedger.record(source), execution.value.sourceEvidence);
						if (!recorded.ok) return recorded;
					}
					if (execution.ok && options?.retainEvidence === true && execution.value.evidenceId === undefined) {
						const source = createAnalysisExecutionEvidence(operation, parameters, execution.value, "observed");
						const recorded = recordEvidenceSources((evidence) => sourceLedger.record(evidence), [source]);
						if (!recorded.ok) return recorded;
						execution = ok({
							...execution.value,
							evidenceId: source.evidence_id
						});
					}
					if (execution.ok && execution.value.evidenceId !== undefined) evidenceLinks.add(execution.value.evidenceId);
					if (execution.ok && execution.value.cachePolicy === "live") cachePolicy = "live";
					if (execution.ok) for (const limitation of execution.value.limitations) {
						const fact = {
							provider: execution.value.provider,
							operation,
							limitation
						};
						if (budget?.perItemOperations.has(operation) === true) {
							const maxBytes = budget.maxBytes ?? 8e3;
							const bytes = jsonStringByteLength(limitation, maxBytes);
							if (bytes > maxBytes) {
								omittedObservations += 1;
								continue;
							}
							const group = sourceLimitationGroupKey(fact);
							if (!perItemGroups.has(group)) {
								if (perItemGroups.size >= budget.maxDistinct || perItemBytes + bytes > maxBytes) {
									omittedObservations += 1;
									continue;
								}
								perItemGroups.add(group);
								perItemBytes += bytes;
							}
						}
						limitations.set(sourceLimitationKey(fact), fact);
					}
					return execution;
				}
			};
			const result = await Promise.resolve().then(() => execute(observed)).finally(() => workScope.clear());
			const sources = sourceLedger.recordsForAnalysis();
			if (!result.ok && !("partialResult" in result)) return withEvidenceSources(result, sources);
			for (const source of sources) evidenceLinks.add(source.evidence_id);
			const observation = (value) => ({
				result: value,
				limitations: [...renderSourceLimitations([...limitations.values()]), ...omittedObservations === 0 ? [] : [`${omittedObservations} per-item provider limitation observation${omittedObservations === 1 ? " was" : "s were"} omitted from this answer; ${budget?.retainedIn}.`]],
				...cachePolicy === undefined ? {} : { cachePolicy },
				...evidenceLinks.size === 0 ? {} : { evidenceLinks: [...evidenceLinks].sort(compareUnicodeCodePoints) }
			});
			return withEvidenceSources(result.ok ? ok(observation(result.value)) : {
				ok: false,
				error: result.error,
				partial: observation(result.partialResult)
			}, sources);
		};
		TRACE_FEATURE_REFERENCE_LIMITATION = "Reference queries cover only each matched start address, not interior bytes of strings and procedures. Empty references and truncated: false do not establish complete reference coverage.";
		WORKFLOW_DERIVATION_LIMITATION = "Derived by an REA composed workflow.";
		workflowLimitations = (operation) => operation === "trace_feature" ? [WORKFLOW_DERIVATION_LIMITATION, TRACE_FEATURE_REFERENCE_LIMITATION] : [WORKFLOW_DERIVATION_LIMITATION];
		workflowSubject = (target) => target ?? unknownTarget("derived-from-linked-evidence");
		createWorkflowEvidence = (input) => createEvidence(workflowSubject(input.target), REA_WORKFLOW_PROVIDER, {
			operation: input.operation,
			parameters: input.parameters,
			result: input.result,
			...input.upstreamProfile === undefined ? {} : { analysisProfile: workflowAnalysisProfile(input.upstreamProfile, input.operation) },
			confidence: "derived",
			...input.upstreamEvidenceLinks === undefined ? {} : { evidenceLinks: input.upstreamEvidenceLinks },
			limitations: [...workflowLimitations(input.operation), ...input.upstreamLimitations],
			...input.operation === "batch_decompile" ? { locations: batchProcedureLocations(input.result) } : {}
		}, { callerTarget: input.target });
		admitWorkflowRecovery = (observation, evidenceInput, admitRecovery) => {
			const admissionInput = {
				operation: evidenceInput.operation,
				parameters: evidenceInput.parameters,
				target: evidenceInput.target === undefined ? null : {
					path: evidenceInput.target.path,
					sha256: evidenceInput.target.sha256,
					format: evidenceInput.target.format,
					architecture: evidenceInput.target.architecture ?? null
				},
				profile: evidenceInput.upstreamProfile ?? null,
				result: observation.result,
				limitations: observation.limitations,
				links: observation.evidenceLinks ?? []
			};
			const shell = evidenceEnvelopeForAdmission(workflowSubject(evidenceInput.target), REA_WORKFLOW_PROVIDER, {
				operation: evidenceInput.operation,
				parameters: {},
				result: null,
				...evidenceInput.upstreamProfile === undefined ? {} : { analysisProfile: {
					provider: REA_WORKFLOW_PROVIDER,
					parameters: workflowAnalysisProfileParameters(null, evidenceInput.operation),
					digest: "0".repeat(64)
				} },
				confidence: "derived",
				limitations: workflowLimitations(evidenceInput.operation),
				locations: [],
				evidenceLinks: []
			}, evidenceInput.target);
			const additional = estimateJsonStorage([
				observation.result,
				evidenceInput.upstreamProfile ?? null,
				shell
			]);
			return admitRecovery(admissionInput, evidenceInput.operation, additional);
		};
		retainComposedWorkflowSources = (recordEvidence, result, evidenceInput, evidenceForAnalysis, admitRecovery = (input, operation, additional) => admitInvestigationAuthentication(input, operation, {}, additional)) => {
			const retained = retainAnalysisResultSources(evidenceInput.operation, recordEvidence, result);
			if (result.ok && !retained.ok) {
				const admitted = admitWorkflowRecovery(result.value, evidenceInput, admitRecovery);
				if (!admitted.ok) {
					retained.error.retainSourcePublication({
						kind: "omitted",
						reason: admitted.error._tag === "AnalysisResourceConstraintError" ? "insufficient-authentication-headroom" : "recovery-input-invalid",
						source_closure: "not-established"
					});
					return retained;
				}
				const evidence = createWorkflowEvidence({
					...evidenceInput,
					result: result.value.result,
					upstreamLimitations: result.value.limitations,
					...result.value.evidenceLinks === undefined ? {} : { upstreamEvidenceLinks: result.value.evidenceLinks }
				});
				preserveCompletedSourceEvidence(retained.error, evidence, evidenceForAnalysis);
			}
			return retained;
		};
		retainPartialWorkflowEvidence = (outcome, context, admitRecovery = (input, operation, additional) => admitInvestigationAuthentication(input, operation, {}, additional)) => {
			if (outcome.ok || outcome.partial === undefined || outcome.error.partialObservation !== undefined) return;
			const admitted = admitWorkflowRecovery(outcome.partial, context, admitRecovery);
			if (!admitted.ok) {
				outcome.error.retainPartialObservation({
					kind: "omitted-observation",
					reason: admitted.error._tag === "AnalysisResourceConstraintError" ? "insufficient-authentication-headroom" : "recovery-input-invalid"
				});
				return;
			}
			const evidence = createWorkflowEvidence({
				...context,
				result: outcome.partial.result,
				upstreamLimitations: outcome.partial.limitations,
				...outcome.partial.evidenceLinks === undefined ? {} : { upstreamEvidenceLinks: outcome.partial.evidenceLinks }
			});
			outcome.error.retainPartialObservation(evidence);
		};
		batchProcedureLocations = (result) => {
			if (result === null || typeof result !== "object" || Array.isArray(result) || !Array.isArray(result.items)) return [];
			const addresses = new Set();
			for (const item of result.items) {
				if (item === null || typeof item !== "object" || Array.isArray(item)) continue;
				const procedure = item.procedure;
				if (procedure !== null && typeof procedure === "object" && !Array.isArray(procedure) && procedure.status === "resolved" && typeof procedure.address === "string") addresses.add(procedure.address);
			}
			return [...addresses].map((address) => ({
				kind: "address",
				address
			}));
		};
		workflowSnapshotRecord = (evidence, operation, bindingProfile, cachePolicy) => {
			if (evidence.analysis_profile === null || bindingProfile === undefined || cachePolicy === "live") return undefined;
			return {
				operation,
				bindingProfile,
				parameters: evidence.parameters,
				execution: {
					result: evidence.normalized_result,
					rawResult: evidence.raw_result,
					provider: committedProviderSchema.parse(evidence.provider),
					analysisProfile: analysisProfileSchema.parse(evidence.analysis_profile),
					limitations: evidence.limitations,
					locations: evidence.locations,
					subject: evidence.subject
				}
			};
		};
		recordWorkflowUnknowns = ({ name, result, evidenceId, recordUnknown, evidenceRetained }) => {
			if (![
				"trace_feature",
				"trace_call_path",
				"inspect_native_api"
			].includes(name) || recordUnknown === undefined || typeof result !== "object" || result === null || Array.isArray(result) || !Array.isArray(result.residual_unknowns)) return {
				ok: true,
				value: null
			};
			const questions = result.residual_unknowns;
			const total = questions.reduce((count, value) => count + (typeof value === "string" ? 1 : 0), 0);
			let created = 0;
			let existing = 0;
			const stopped = (error, index) => err(error.retainWorkflowUnknownPublication({
				evidence_id: evidenceId,
				evidence_retention: evidenceRetained === true ? "retained" : "unverified",
				total_questions: total,
				created_questions: created,
				existing_questions: existing,
				next_question_index: index
			}));
			for (let index = 0; index < questions.length; index += 1) {
				const question = questions[index];
				if (typeof question !== "string") continue;
				const input = workflowUnknownInput(evidenceId, {
					question,
					severity: "medium",
					domain: name === "inspect_native_api" ? "native-api" : "control-flow",
					required_authority: "shipped-artifact",
					required_confidence: "observed",
					required_environment: null,
					recommended_probes: [{
						operation: name,
						rationale: name === "inspect_native_api" ? "Confirm the unsupported boundary with a capable provider or ABI probe." : "Continue with a focused query or another available provider."
					}],
					relationships: []
				});
				if (!input.ok) return stopped(input.error, index);
				const recorded = recordUnknown(input.value);
				if (recorded.ok) created += 1;
				else if (recorded.error instanceof UnknownRegistryError && recorded.error.reason === "already-exists") existing += 1;
				else return stopped(recorded.error, index);
			}
			return {
				ok: true,
				value: null
			};
		};
	})))();
}

//#endregion
//#region dist/application/CapabilityFallback.js
var permitsCapabilityFallback;
function init_CapabilityFallback() {
	return (init_CapabilityFallback = __esmMin((() => {
		init_analysisErrorCore();
		permitsCapabilityFallback = (error) => error instanceof AnalysisCapabilityUnavailableError && !error.cleanupIncomplete;
	})))();
}

//#endregion
//#region dist/application/AnalysisOperationFacts.js
var executeFact;
function init_AnalysisOperationFacts() {
	return (init_AnalysisOperationFacts = __esmMin((() => {
		init_analysisObservation();
		init_analysisErrorCore();
		init_nativeProviderOutput();
		init_result();
		executeFact = async (port, contract, parameters, options) => {
			const executed = await port.execute(contract.operation, parameters, options);
			if (!executed.ok) return executed;
			const parsed = contract.schema.safeParse(executed.value.result);
			if (parsed.success) return ok({
				execution: executed.value,
				fact: parsed.data
			});
			return err(new AnalysisOutputError(contract.operation, `Provider returned an invalid ${contract.subject}`, {
				cause: parsed.error,
				diagnostics: outputContractDiagnostics(parsed.error, executed.value.result)
			}).retainPartialObservation(createAnalysisExecutionEvidence(contract.operation, parameters, executed.value, "observed")));
		};
	})))();
}

//#endregion
//#region dist/application/ProcedureAddressResolution.js
var resolveProcedureAddress, parseProcedureAddress;
function init_ProcedureAddressResolution() {
	return (init_ProcedureAddressResolution = __esmMin((() => {
		init_analysisErrorCore();
		init_result();
		resolveProcedureAddress = async (call, procedure, signal) => {
			const result = await call("procedure_address", { procedure }, signal);
			if (!result.ok) return result;
			return parseProcedureAddress(result.value);
		};
		parseProcedureAddress = (value) => typeof value === "string" && value.length > 0 ? ok(value) : err(new AnalysisOutputError("procedure_address", "provider returned no canonical procedure address"));
	})))();
}

//#endregion
//#region dist/application/XrefsAddressResolution.js
var resolveXrefsAddress, resolveXrefsName;
function init_XrefsAddressResolution() {
	return (init_XrefsAddressResolution = __esmMin((() => {
		init_CapabilityFallback();
		init_nativeOperationFacts();
		init_AnalysisOperationFacts();
		init_analysisErrorCore();
		init_result();
		init_ProcedureAddressResolution();
		resolveXrefsAddress = async (analysis, selector, signal) => {
			const named = await resolveXrefsName(analysis, selector, signal);
			if (!named.ok) return named;
			return named.value !== null ? ok(named.value) : err(new AnalysisInputError("xrefs", {
				conformsToInputContract: true,
				remediationAction: "For a function, use rea search --kind procedures to find an analyzed address. For exports, inspect-macho (Mach-O) or inspect-native-exports (PE/ELF) may help; exports can omit local symbols and use different address coordinates. Verify the address in the selected provider, then retry xrefs."
			}, [{
				path: ["address"],
				reason: "invalid_value",
				message: `Unknown analyzed symbol name ${JSON.stringify(selector)}. Use an exact analyzed name or a hexadecimal address.`
			}]));
		};
		resolveXrefsName = async (analysis, selector, signal, operation = "xrefs") => {
			if (signal?.aborted) return err(cancelledBy(operation, signal));
			const inventory = await executeFact(analysis, listNamesFact, {}, signal === undefined ? {} : { signal });
			if (!inventory.ok) {
				if (operation === "xrefs" && permitsCapabilityFallback(inventory.error) && inventory.error.operation === "list_names") return resolveProcedureAddress(async (operation, parameters, signal) => {
					const result = await analysis.execute(operation, parameters, signal === undefined ? {} : { signal });
					return result.ok ? ok(result.value.result) : result;
				}, selector, signal);
				return inventory;
			}
			if (signal?.aborted) return err(cancelledBy(operation, signal));
			const addresses = new Set();
			for (const [index, row] of inventory.value.fact.entries()) {
				if (row.address.length === 0) return err(new AnalysisOutputError("list_names", `Invalid symbol inventory entry at index ${index}`));
				if (row.value === selector) addresses.add(row.address);
			}
			const [address] = addresses;
			if (addresses.size <= 1) return ok(address ?? null);
			return err(new AnalysisInputError(operation, {
				conformsToInputContract: true,
				remediationAction: "Select an exact address from the candidates and call xrefs with that address."
			}, [{
				path: [operation === "xrefs" ? "address" : "name"],
				reason: "invalid_value",
				message: `Analyzed symbol name ${JSON.stringify(selector)} is ambiguous at ${[...addresses].sort().join(", ")}. Select an exact address.`
			}]));
		};
	})))();
}

//#endregion
//#region dist/application/DirectAnalysis.js
var DirectAnalysis_exports = /* @__PURE__ */ __exportAll({
	runDirectAnalysis: () => runDirectAnalysis,
	runManagedProviderEvidence: () => runManagedProviderEvidence,
	runManagedProviderExecution: () => runManagedProviderExecution,
	runProviderAnalysis: () => runProviderAnalysis
});
var NATIVE_INSPECTION_OPERATIONS, ARTIFACT_ANALYSIS_OPERATION_SET, runDirectAnalysis, targetSelection, runProviderAnalysis, runManagedProviderEvidence, managedCallerEvidence, runManagedProviderExecution, runManagedProviderAnalysis, runAnalysis, retainFinalCancellation, executeAnalysisTool, withProcessCancellation, prepareSnapshot, inspectBundleResourceInput, analysisProfileForRoute, nativeDispatchBindingProfile, analysisProfileForEvidence, isWorkflowEvidenceTool, fileExists, cliError;
function init_DirectAnalysis() {
	return (init_DirectAnalysis = __esmMin((() => {
		init_oneShotOperationInput();
		init_SessionEvidenceReuse();
		init_queuedInterrupts();
		init_SessionProviderPolicy();
		init_logger();
		init_evidence();
		init_evidenceBundle();
		init_evidenceValidation();
		init_recordEvidenceSources();
		init_InvestigationEvidence();
		init_artifactToolContracts();
		init_managedToolContracts();
		init_evidenceErrors();
		init_analysisErrorCancellation();
		init_callerPath();
		init_AnalysisSnapshotCache();
		init_analysisSnapshot();
		init_ProfilelessNativeWorkflowSnapshot();
		init_result();
		init_analysisObservation();
		init_investigationProviders();
		init_WorkflowAnalysisProfile();
		init_WorkflowEvidence();
		init_XrefsAddressResolution();
		init_analysisErrorCore();
		init_DirectAnalysisCleanup();
		init_ProviderOperationExecution();
		init_BundleResourceOperations();
		init_binaryTargetFilesystemFailure();
		NATIVE_INSPECTION_OPERATIONS = new Set([
			"inspect_macho",
			"inspect_signature",
			"list_architectures",
			"inspect_plist",
			"demangle_swift"
		]);
		ARTIFACT_ANALYSIS_OPERATION_SET = new Set(ARTIFACT_ANALYSIS_OPERATIONS);
		runDirectAnalysis = async (dependencies, path, tool, arguments_, options = {}) => withProcessCancellation(options.signal, (signal) => {
			const admitted = admitOneShotOperation(tool, arguments_, signal);
			if (!admitted.ok) return Promise.resolve(err(cliError(admitted.error, path)));
			return runAnalysis(dependencies, path, admitted.value.name, admitted.value.input, {
				evidenceParameters: arguments_,
				logger: options.logger ?? silentLogger,
				snapshotPath: options.snapshotPath,
				signal,
				...options.includeEvidenceSources === true ? { includeEvidenceSources: true } : {},
				...targetSelection(options),
				...options.providerId === undefined ? {} : { providerId: options.providerId }
			});
		});
		targetSelection = (options) => ({
			...options.formatHint === undefined ? {} : { formatHint: options.formatHint },
			...options.architecture === undefined ? {} : { architecture: options.architecture },
			...options.entryPoint === undefined ? {} : { entryPoint: options.entryPoint },
			...options.espFlash === undefined ? {} : { espFlash: options.espFlash }
		});
		runProviderAnalysis = async (dependencies, ...[path, tool, arguments_, logger = silentLogger, signal, selection]) => withProcessCancellation(signal, async (operationSignal) => {
			const evidenceParameters = {
				...arguments_,
				input_path: path
			};
			if (isManagedToolName(tool)) {
				const evidence = await managedCallerEvidence(dependencies, path, tool, arguments_, operationSignal);
				return evidence.ok ? evidence : err(cliError(evidence.error, path));
			}
			const admitted = admitOneShotOperation(tool, arguments_, operationSignal);
			if (!admitted.ok) return err(cliError(admitted.error, path));
			return runAnalysis(dependencies, path, admitted.value.name, admitted.value.input, {
				logger,
				snapshotPath: undefined,
				signal: operationSignal,
				evidenceParameters,
				...targetSelection(selection ?? {}),
				...ARTIFACT_ANALYSIS_OPERATION_SET.has(tool) ? { createSession: dependencies.createArtifactBinarySession } : NATIVE_INSPECTION_OPERATIONS.has(tool) ? { createSession: dependencies.createNativeBinarySession } : {}
			});
		});
		runManagedProviderEvidence = (dependencies, path, tool, arguments_, signal) => withProcessCancellation(signal, (operationSignal) => managedCallerEvidence(dependencies, path, tool, arguments_, operationSignal));
		managedCallerEvidence = async (dependencies, path, tool, arguments_, operationSignal) => {
			const original = await runManagedProviderAnalysis(dependencies, path, tool, arguments_, {
				...arguments_,
				input_path: path
			}, operationSignal);
			await dispatchQueuedInterrupts();
			if (!original.ok) return err(retainFinalCancellation(original.error, tool, operationSignal));
			const evidence = withEvidenceCallerInputPath(original.value, path);
			if (operationSignal.aborted) return err(cancelledBy(tool, operationSignal, { partialObservation: evidence }));
			return ok(evidence);
		};
		runManagedProviderExecution = async (dependencies, path, tool, signal, parameters = {}, recoveryParameters) => withProcessCancellation(signal, async (operationSignal) => {
			const admitted = admitOneShotOperation(tool, parameters, operationSignal);
			if (!admitted.ok) return admitted;
			const session = await dependencies.createManagedBinarySession();
			return withSessionCleanup(session, async () => {
				const opened = await session.open(path, { signal: operationSignal });
				if (!opened.ok) return opened;
				return recoveryParameters === undefined || session.executeForDirectObservation === undefined ? await session.execute(admitted.value.name, admitted.value.input, { signal: operationSignal }) : await session.executeForDirectObservation(admitted.value.name, admitted.value.input, recoveryParameters, { signal: operationSignal });
			}, managedAnalysisCleanupFailure);
		});
		runManagedProviderAnalysis = async (dependencies, path, tool, arguments_, evidenceParameters, signal) => {
			const execution = await runManagedProviderExecution(dependencies, path, tool, signal, arguments_, evidenceParameters);
			if (!execution.ok) return execution;
			const value = execution.value;
			return ok(createAnalysisExecutionEvidence(tool, evidenceParameters, value, "observed", { immutable: true }));
		};
		runAnalysis = async (dependencies, path, tool, arguments_, options) => {
			const { logger, signal, snapshotPath } = options;
			const evidenceParameters = options.evidenceParameters ?? arguments_;
			let session;
			if (options.createSession !== undefined) {
				session = await options.createSession();
			} else {
				const config = dependencies.readConfiguration();
				if (!config.ok) return err(cliError(config.error));
				session = await (tool === "inspect_native_dispatch_metadata" && snapshotPath === undefined ? dependencies.createNativeDispatchBinarySession : dependencies.createBinarySession)(config.value, logger);
			}
			let publishedSnapshot;
			let sourceEvidence;
			const captureSources = (evidence, supplied = []) => {
				if (!options.includeEvidenceSources) return ok(null);
				const records = new Map(supplied.map((record) => [record.evidence_id, record]));
				const collected = collectInvestigationEvidenceClosure({ evidenceForAnalysis: (id) => records.get(id) ?? session.evidenceForAnalysis(id) }, evidence.evidence_links);
				sourceEvidence = collected.records;
				return collected.result;
			};
			const execute = async () => {
				let isDirectory = false;
				if (BUNDLE_RESOURCE_OPERATIONS.has(tool)) {
					const inspected = await inspectBundleResourceInput(path);
					if (!inspected.ok) return inspected;
					isDirectory = inspected.value;
				}
				if (BUNDLE_RESOURCE_OPERATIONS.has(tool) && isDirectory) {
					const opened = await session.openBundleResources(path, { signal });
					if (!opened.ok) return opened;
					const execution = await session.execute(tool, arguments_, { signal });
					if (!execution.ok) return execution;
					return ok(withEvidenceCallerInputPath(createAnalysisExecutionEvidence(tool, evidenceParameters, execution.value, "observed"), path));
				}
				const prepared = await prepareSnapshot({
					session,
					path,
					snapshotPath,
					signal,
					...targetSelection(options)
				});
				if (!prepared.ok) return prepared;
				const { snapshot } = prepared.value;
				let resolvedTarget;
				if (snapshot !== undefined && prepared.value.target !== undefined) {
					const preview = await session.previewTarget(prepared.value.target, {
						signal,
						snapshot,
						...targetSelection(options),
						...options.providerId === undefined ? {} : { providerId: options.providerId }
					});
					if (!preview.ok) return preview;
					resolvedTarget = preview.value;
					const route = preview.value.route;
					const bindingProfile = route.profile ?? nativeDispatchBindingProfile(route, tool);
					const evidenceProfile = analysisProfileForRoute(route, tool);
					if (bindingProfile !== undefined && evidenceProfile !== undefined && !requiresNativeSourceAdmissionBeforeReplay(route.binding?.identity.id) && tool !== "trace_native_ui_action" && tool !== "decompile_all" && !requestsStandaloneDecompile(tool, arguments_) && routeAllowsSnapshotReplay(route, tool)) {
						const cached = snapshotEvidenceForQuery(snapshot, {
							target: preview.value.target,
							bindingProfile,
							operation: tool,
							parameters: arguments_,
							provider: isWorkflowEvidenceTool(tool) ? REA_WORKFLOW_PROVIDER : routeProviderIdentity(route, tool),
							evidenceProfile
						});
						if (cached !== undefined) {
							const records = new Map(snapshot.evidence_bundle.records.map((record) => [record.evidence_id, record]));
							const checkClosure = createInvestigationEvidenceClosureChecker({ evidenceForAnalysis: (id) => records.get(id) });
							if (checkClosure(cached.evidence_links)) {
								const evidence = withEvidenceCallerInputPath(cached, path);
								const captured = captureSources(evidence, snapshot.evidence_bundle.records);
								if (!captured.ok) return err(captured.error.retainPartialObservation(evidence));
								return ok(evidence);
							}
						}
					}
				}
				const openOptions = {
					signal,
					...targetSelection(options),
					...snapshot === undefined ? {} : { snapshot },
					...options.providerId === undefined ? {} : { providerId: options.providerId }
				};
				const opened = resolvedTarget === undefined ? await session.open(path, openOptions) : await session.openResolvedTarget(resolvedTarget, openOptions);
				if (!opened.ok) return opened;
				const evidenceProfile = analysisProfileForEvidence(session, tool);
				const executed = await executeAnalysisTool({
					session,
					openedTarget: opened.value,
					tool,
					arguments: arguments_,
					evidenceParameters,
					signal,
					evidenceProfile,
					saveSnapshot: snapshotPath !== undefined
				});
				if (!executed.ok) {
					if (options.includeEvidenceSources) {
						const partial = recognizeEvidence(executed.error.partialObservation);
						if (!partial.ok) executed.error.retainSecondaryFailure(partial.error);
						else if (partial.value !== undefined) {
							const captured = captureSources(partial.value);
							if (!captured.ok) executed.error.retainSecondaryFailure(captured.error);
						}
					}
					return executed;
				}
				const { cachePolicy } = executed.value;
				const evidence = withEvidenceCallerInputPath(executed.value.evidence, path);
				const captured = captureSources(evidence);
				if (!captured.ok) return err(captured.error.retainPartialObservation(evidence));
				const recorded = session.importEvidenceBundle(createImmutableEvidenceBundle([evidence]));
				if (!recorded.ok) return err(recorded.error.retainPartialObservation(evidence));
				if (isWorkflowEvidenceTool(tool)) {
					const unknowns = recordWorkflowUnknowns({
						name: tool,
						result: evidence.normalized_result,
						evidenceId: evidence.evidence_id,
						recordUnknown: (unknown) => session.recordUnknown(unknown),
						evidenceRetained: true
					});
					if (!unknowns.ok) return err(unknowns.error.retainPartialObservation(evidence));
				}
				if (isWorkflowEvidenceTool(tool) && tool !== "trace_native_ui_action" && snapshotPath !== undefined && session.allowsSnapshotReplay(tool)) {
					const workflowRecord = workflowSnapshotRecord(evidence, tool, evidenceProfile, cachePolicy);
					if (workflowRecord !== undefined) {
						const recorded = session.recordWorkflowSnapshot(workflowRecord);
						if (!recorded.ok) return err(recorded.error.retainPartialObservation(evidence));
					}
				}
				if (tool !== "trace_native_ui_action" && tool !== "decompile_all" && snapshotPath !== undefined) {
					const snapshot = session.exportAnalysisSnapshot();
					if (!snapshot.ok) return err(snapshot.error.retainPartialObservation(evidence));
					const written = await session.writeAnalysisSnapshot(snapshot.value, snapshotPath, true);
					if (written.ok) publishedSnapshot = written.value;
					else {
						const published = written.error instanceof EvidenceFileError ? written.error.published : undefined;
						if (published?.path !== undefined) publishedSnapshot = {
							path: published.path,
							bytes: published.bytes
						};
						const released = published !== undefined && (await session.closeFileResources()).ok;
						if (!released || published?.path === undefined) return err(written.error.retainPartialObservation(evidence));
					}
				}
				return ok(evidence);
			};
			const outcome = await withSessionCleanup(session, async () => {
				const result = await execute();
				if (!result.ok && result.error.sourcePublicationRecovery?.completed.kind === "retained-evidence") {
					const retained = session.evidenceForAnalysis(result.error.sourcePublicationRecovery.completed.evidence_id);
					if (retained !== undefined) result.error.sourcePublicationRecovery = {
						...result.error.sourcePublicationRecovery,
						completed: {
							kind: "inline-evidence",
							retention: "one-shot-session",
							source_closure: "not-established",
							evidence: retained
						}
					};
				}
				return { result };
			}, (value, cleanupError) => ({
				...value,
				cleanupError
			}));
			await dispatchQueuedInterrupts();
			const result = outcome.result.ok ? completeProviderEvidence(outcome.result.value, signal) : err(retainFinalCancellation(outcome.result.error, tool, signal));
			if (!result.ok && publishedSnapshot !== undefined) result.error.retainDiagnostics({ analysis_snapshot: { ...publishedSnapshot } });
			if (outcome.cleanupError !== undefined) {
				if (result.ok && publishedSnapshot !== undefined) outcome.cleanupError.retainDiagnostics({ analysis_snapshot: { ...publishedSnapshot } });
				return {
					...err(directAnalysisCleanupFailure(result, outcome.cleanupError, path)),
					...sourceEvidence === undefined ? {} : { sourceEvidence }
				};
			}
			return {
				...result.ok ? ok(result.value) : err(cliError(result.error, path)),
				...sourceEvidence === undefined ? {} : { sourceEvidence }
			};
		};
		retainFinalCancellation = (failure, tool, signal) => signal.aborted ? analysisErrorWithCancellation(failure, cancelledBy(tool, signal)) : failure;
		executeAnalysisTool = async (input) => {
			const { session, tool, signal, evidenceProfile } = input;
			if (tool === "analyze_function") {
				const { executeFunctionAnalysisEvidence } = await import("./application__FunctionAnalysisEvidence-GSFe4ScL.js");
				let result = await executeFunctionAnalysisEvidence(session, input.arguments, input.openedTarget, { signal });
				result = retainAnalysisResultSources(tool, (source) => session.recordEvidence(source), result);
				return result.ok ? ok({ evidence: result.value }) : result;
			}
			if (isWorkflowEvidenceTool(tool)) {
				const { EnhancedTools } = await import("./application__EnhancedTools-EYtHAlQQ.js");
				let result = await executeComposedWorkflow(session, (observed) => new EnhancedTools(observed).execute(tool, input.arguments, signal), composedLimitationBudget(tool));
				retainPartialWorkflowEvidence(result, {
					target: input.openedTarget,
					operation: tool,
					parameters: input.evidenceParameters,
					upstreamProfile: evidenceProfile
				});
				result = retainAnalysisResultSources(tool, (source) => session.recordEvidence(source), result);
				if (!result.ok) return result;
				const evidence = createWorkflowEvidence({
					target: input.openedTarget,
					operation: tool,
					parameters: input.evidenceParameters,
					result: result.value.result,
					upstreamProfile: evidenceProfile,
					upstreamLimitations: result.value.limitations,
					...result.value.evidenceLinks === undefined ? {} : { upstreamEvidenceLinks: result.value.evidenceLinks }
				});
				return ok({
					evidence,
					...result.value.cachePolicy === undefined ? {} : { cachePolicy: result.value.cachePolicy }
				});
			}
			let result = await session.executeForDirectObservation(tool, input.arguments, input.evidenceParameters, {
				signal,
				...input.saveSnapshot && tool === "procedure_pseudo_code" ? { snapshotContext: "one-shot-target" } : {}
			});
			if (tool === "xrefs" && typeof input.arguments.address === "string" && !result.ok && result.error instanceof AnalysisInputError && !result.error.cleanupIncomplete && result.error.issues.length > 0 && result.error.issues.every(({ path, reason }) => path.length === 1 && path[0] === "address" && reason === "invalid_format")) {
				const address = await resolveXrefsAddress(session, input.arguments.address, signal);
				if (!address.ok) return address;
				if (address.value !== input.arguments.address) result = await session.executeForDirectObservation(tool, {
					...input.arguments,
					address: address.value
				}, input.evidenceParameters, { signal });
			}
			if (!result.ok) return result;
			const evidence = completedOperationEvidence(tool, input.evidenceParameters, result.value, {
				target: input.openedTarget,
				admitRecovery: session.admitRecoveryObservation.bind(session),
				evidenceById: (id) => session.evidenceForAnalysis(id)
			});
			return evidence.ok ? ok({ evidence: evidence.value }) : evidence;
		};
		withProcessCancellation = async (suppliedSignal, operation) => {
			if (suppliedSignal !== undefined) return operation(suppliedSignal);
			const controller = new AbortController();
			const interrupt = () => controller.abort(CallerAbort.forProcessSignal("SIGINT"));
			const terminate = () => controller.abort(CallerAbort.forProcessSignal("SIGTERM"));
			process.on("SIGINT", interrupt);
			process.on("SIGTERM", terminate);
			try {
				return await operation(controller.signal);
			} finally {
				process.off("SIGINT", interrupt);
				process.off("SIGTERM", terminate);
			}
		};
		prepareSnapshot = async (options) => {
			const { path, snapshotPath, session } = options;
			if (snapshotPath === undefined || !await fileExists(snapshotPath)) return ok({});
			const loaded = await session.readAnalysisSnapshot(snapshotPath, options.signal);
			if (!loaded.ok) return loaded;
			const target = await session.resolveTarget(path, {
				signal: options.signal,
				...targetSelection(options)
			});
			if (!target.ok) return target;
			const mismatch = snapshotBindingMismatch(loaded.value, target.value, undefined);
			if (mismatch?.target !== undefined) return err(new AnalysisSnapshotMismatchError("Analysis snapshot target does not match the requested binary", mismatch));
			return ok({
				snapshot: loaded.value,
				target: target.value
			});
		};
		inspectBundleResourceInput = async (path) => {
			const callerPath = absoluteCallerPath(path);
			try {
				return ok((await stat(callerPath)).isDirectory());
			} catch (cause) {
				const failure = classifyBinaryTargetFilesystemFailure(callerPath, cause);
				if (failure !== undefined) return err(failure);
				throw cause;
			}
		};
		analysisProfileForRoute = (route, tool) => {
			const profile = route.profile;
			const nativeDispatchProfile = profile === null || profile === undefined ? nativeDispatchBindingProfile(route, tool) : undefined;
			if (profile === null || profile === undefined) {
				if (nativeDispatchProfile === undefined) return undefined;
				return isWorkflowEvidenceTool(tool) ? workflowAnalysisProfile(nativeDispatchProfile, tool) : nativeDispatchProfile;
			}
			if (isWorkflowEvidenceTool(tool)) return workflowAnalysisProfile(profile, tool);
			const provider = routeProviderIdentity(route, tool);
			return provider.id === profile.provider.id ? profile : undefined;
		};
		nativeDispatchBindingProfile = (route, operation) => {
			if (operation !== "inspect_native_dispatch_metadata") return undefined;
			return profilelessNativeDispatchProfile(route);
		};
		analysisProfileForEvidence = (session, tool) => {
			if (!isWorkflowEvidenceTool(tool)) return session.analysisProfile(tool);
			return session.analysisProfile() ?? session.analysisProfile(tool);
		};
		isWorkflowEvidenceTool = (tool) => tool === "binary_overview" || tool === "inspect_native_api" || tool === "inspect_native_dispatch_metadata" || tool === "trace_feature" || tool === "trace_native_values" || tool === "trace_native_ui_action" || tool === "decompile_all";
		fileExists = async (path) => {
			try {
				await access(path);
				return true;
			} catch (cause) {
				if (typeof cause === "object" && cause !== null && "code" in cause && cause.code === "ENOENT") return false;
				throw cause;
			}
		};
		cliError = (error, callerInputPath) => ({
			error: "Analysis failed",
			...callerInputPath === undefined ? projectInvocationFailure(error) : projectDirectAnalysisFailure(error, callerInputPath)
		});
	})))();
}

//#endregion
export { DirectAnalysis_exports, executeFact, init_AnalysisOperationFacts, init_CapabilityFallback, init_DirectAnalysis, init_ProcedureAddressResolution, init_SourceLimitations, init_XrefsAddressResolution, parseProcedureAddress, permitsCapabilityFallback, renderSourceLimitations, resolveProcedureAddress, resolveXrefsName };