import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, AnalysisResourceConstraintError, AnalysisSnapshotMismatchError, EvidenceIntegrityError, InvalidResidualUnknownGraphError, NoBinaryOpenError, UnknownRegistryError, equalJsonText, freezeJsonSnapshot, init_analysisErrorCore, init_configurationErrors, init_evidenceErrors, init_immutableJson, init_jsonSerialization, init_residualUnknownGraphError, init_unknownRegistryError } from "./jsonSerialization-DAF9DVXC.js";
import { HOST_PLATFORM, init_HostPlatform, init_internalInvariant, invariantViolation } from "./zstandardFrameAllowance-Bw-ySSsA.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { analysisInputErrorFromIssues, init_inputIssueProjection } from "./inputIssueProjection-W-zXU1iH.js";
import { Budget, init_budget } from "./jsonPointer-aolC6MvJ.js";
import { analysisProfilesEqual, createAnalysisProfile, evidenceDisplayMetadataAgree, evidenceFileTarget, evidenceSubject, evidenceSubjectDisplay, evidenceSubjectTarget, init_analysisProfile, init_evidence, init_evidenceValidation, isImmutableEvidence, rebindEvidenceSubjectTargetPath, safeParseImmutableEvidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_targetIdentity, sameTargetIdentity, unknownTarget } from "./targetIdentity-rKLLVwEj.js";
import { createEvidenceBundle, createImmutableEvidenceBundle, createResidualUnknown, init_evidenceBundle, init_residualUnknown, isImmutableEvidenceBundle, safeParseImmutableEvidenceBundle, singleEvidenceRecordIssue, updateResidualUnknown, validateResidualUnknownAddition } from "./evidenceBundle-CWOVHJ6o.js";
import { analysisQueryId, createAnalysisSnapshotEntry, createAnalysisSnapshotWorkflowEntry, estimateJsonArrayScalarEntry, evidenceMatchesEntry, evidenceMatchesWorkflowEntry, immutableAnalysisSnapshot, init_JsonAuthenticationHeadroom, init_analysisSnapshot, parseAnalysisSnapshot, snapshotBinding, snapshotBindingMismatch, snapshotMatchesProfile, snapshotTarget } from "./EvidenceInputResolver-DpJOzfQ9.js";
import { createInvestigationEvidenceClosureChecker, init_InvestigationEvidence } from "./InvestigationEvidence-BFl9Xj1M.js";
import { REA_WORKFLOW_PROVIDER, init_investigationProviders } from "./investigationProviders-TuoKl-Yg.js";
import { analysisExecutionEnvelopeForAdmission, createAnalysisExecutionEvidence, init_analysisObservation } from "./analysisObservation-BSCFvtEd.js";
import { ENHANCED_TOOL_CONTRACTS, OFFICIAL_TOOL_CONTRACTS, init_enhancedToolContracts, init_officialToolContracts } from "./officialToolContracts-7Ov7fJ7b.js";
import { admitInvestigationAuthentication, admitInvestigationRetention, init_InvestigationRetention, investigationMaximumRepresentationBytes, investigationValueBytes } from "./recordEvidenceSources-BFkP6hRB.js";
import { basename } from "node:path";
import { z } from "zod";

//#region dist/application/investigation/admitCompletedAnalysis.js
var admitCompletedAnalysis;
function init_admitCompletedAnalysis() {
	return (init_admitCompletedAnalysis = __esmMin((() => {
		init_analysisObservation();
		init_JsonAuthenticationHeadroom();
		init_InvestigationRetention();
		admitCompletedAnalysis = (operation, parameters, observation, { callerTarget, admit = (input, name, additional) => admitInvestigationAuthentication(input, name, {}, additional) } = {}) => {
			const envelope = analysisExecutionEnvelopeForAdmission(operation, parameters, observation, callerTarget);
			let valueBytes = 0;
			let serializedUtf16Bytes = 0;
			for (const [index, source] of (observation.sourceEvidence ?? []).entries()) {
				const entry = estimateJsonArrayScalarEntry(source.evidence_id, index > 0);
				valueBytes += entry.valueBytes;
				serializedUtf16Bytes += entry.serializedUtf16Bytes;
			}
			const admitted = admit(envelope, operation, {
				valueBytes,
				serializedUtf16Bytes
			});
			if (!admitted.ok) admitted.error.retainSourcePublication({
				kind: "omitted",
				reason: admitted.error._tag === "AnalysisResourceConstraintError" ? "insufficient-authentication-headroom" : "recovery-input-invalid",
				source_closure: "not-established"
			});
			return admitted;
		};
	})))();
}

//#endregion
//#region dist/application/binary/SessionEvidenceReuse.js
var issued, bindSessionEvidenceExecution, sessionEvidenceForExecution, completedOperationEvidence;
function init_SessionEvidenceReuse() {
	return (init_SessionEvidenceReuse = __esmMin((() => {
		init_evidence();
		init_jsonSerialization();
		init_analysisObservation();
		init_result();
		init_admitCompletedAnalysis();
		issued = new WeakMap();
		bindSessionEvidenceExecution = (execution, evidence, callerInputPath) => {
			if (execution.sourceEvidence !== undefined && execution.sourceEvidence.length > 0 || evidence.caller_input_path !== callerInputPath) return execution;
			const selected = execution.subject;
			const display = evidenceSubjectDisplay(evidence);
			if (selected == null ? display !== undefined : display === undefined || display.local_path !== selected.path || display.name !== (basename(selected.path) || "artifact")) return execution;
			const subject = execution.subject === undefined || execution.subject === null ? execution.subject : Object.freeze({ ...execution.subject });
			const result = Object.freeze({
				...execution,
				result: evidence.normalized_result,
				rawResult: evidence.raw_result,
				provider: evidence.provider,
				...evidence.analysis_profile === null ? {} : { analysisProfile: evidence.analysis_profile },
				limitations: evidence.limitations,
				locations: evidence.locations,
				...evidence.relationship_coverage === null ? {} : { relationshipCoverage: evidence.relationship_coverage },
				...subject === undefined ? {} : { subject }
			});
			issued.set(result, evidence);
			return result;
		};
		sessionEvidenceForExecution = (execution, operation, parameters, lookup) => {
			const evidence = issued.get(execution);
			if (evidence === undefined || evidence.operation !== operation || lookup(evidence.evidence_id) !== evidence || !equalJsonText(evidence.parameters, parameters)) return undefined;
			return evidence;
		};
		completedOperationEvidence = (operation, parameters, execution, options) => {
			const reusable = options.evidenceById === undefined ? undefined : sessionEvidenceForExecution(execution, operation, parameters, options.evidenceById);
			if (reusable !== undefined) return ok(reusable);
			const observation = {
				...execution,
				subject: execution.subject === undefined ? options.target : execution.subject
			};
			const admitted = admitCompletedAnalysis(operation, parameters, observation, {
				callerTarget: options.target,
				admit: options.admitRecovery
			});
			if (!admitted.ok) return admitted;
			return ok(createAnalysisExecutionEvidence(operation, parameters, observation, "observed", { callerTarget: options.target }));
		};
	})))();
}

//#endregion
//#region dist/application/binary/SessionProviderPolicy.js
var OFFICIAL_OPERATIONS, ENHANCED_OPERATIONS, routeProviderIdentity, routeAllowsSnapshotReplay;
function init_SessionProviderPolicy() {
	return (init_SessionProviderPolicy = __esmMin((() => {
		init_enhancedToolContracts();
		init_officialToolContracts();
		OFFICIAL_OPERATIONS = new Set(OFFICIAL_TOOL_CONTRACTS.map(({ name }) => name));
		ENHANCED_OPERATIONS = new Set(ENHANCED_TOOL_CONTRACTS.map(({ name }) => name));
		routeProviderIdentity = (route, operation) => {
			let selected = route.binding?.identity ?? route.identity;
			if (operation !== undefined) {
				const exact = route.capabilities.get(operation)?.provider;
				if (exact !== undefined) selected = exact;
				else if (ENHANCED_OPERATIONS.has(operation)) {
					const providers = new Map();
					for (const descriptor of route.capabilities.values()) if (descriptor.available && OFFICIAL_OPERATIONS.has(descriptor.operation)) providers.set(descriptor.provider.id, descriptor.provider);
					if (providers.size === 1) {
						const provider = providers.values().next().value;
						if (provider !== undefined) selected = provider;
					}
				}
			}
			return structuredClone(selected);
		};
		routeAllowsSnapshotReplay = (route, operation) => {
			const descriptor = route?.capabilities.get(operation);
			if (descriptor !== undefined) return descriptor.cachePolicy !== "live";
			return ![...route?.capabilities.values() ?? []].some(({ cachePolicy }) => cachePolicy === "live");
		};
	})))();
}

//#endregion
//#region dist/application/binary/AnalysisSnapshotReplayBinding.js
var snapshotReplayBinding;
function init_AnalysisSnapshotReplayBinding() {
	return (init_AnalysisSnapshotReplayBinding = __esmMin((() => {
		init_InvestigationEvidence();
		snapshotReplayBinding = (evidence, lookup, checkClosure = createInvestigationEvidenceClosureChecker({ evidenceForAnalysis: lookup })) => {
			if (!checkClosure(evidence.evidence_links)) return null;
			const sources = [];
			for (const id of evidence.evidence_links) {
				const source = lookup(id);
				if (source === undefined) return null;
				sources.push(source);
			}
			sources.push(evidence);
			return {
				evidenceId: evidence.evidence_id,
				sourceEvidence: Object.freeze(sources)
			};
		};
	})))();
}

//#endregion
//#region dist/application/binary/AnalysisSnapshotCache.js
var RELATIONSHIP_OPERATIONS, RESOURCE_SCOPED_OPERATIONS, STATEFUL_OPERATIONS, CURSOR_DEFAULT_OPERATIONS, DOCUMENT_SCOPED_OPERATIONS, SNAPSHOT_CACHE_ENTRY_CEILING, withoutDisplayName, replayDocumentSelected, isOneShotPseudocode, DOCUMENTLESS_SOURCE_EVIDENCE_OPERATIONS, isSourceEvidenceRetainable, requestsStandaloneDecompile, isSnapshotCacheable, requiresNativeSourceAdmissionBeforeReplay, SNAPSHOT_REPLAY_LIMITATION, AnalysisSnapshotCache;
function init_AnalysisSnapshotCache() {
	return (init_AnalysisSnapshotCache = __esmMin((() => {
		init_HostPlatform();
		init_evidenceErrors();
		init_configurationErrors();
		init_evidence();
		init_targetIdentity();
		init_result();
		init_analysisSnapshot();
		init_officialToolContracts();
		init_unicodeCodePointOrder();
		init_AnalysisSnapshotReplayBinding();
		init_InvestigationEvidence();
		RELATIONSHIP_OPERATIONS = new Set(["procedure_callers", "procedure_callees"]);
		RESOURCE_SCOPED_OPERATIONS = new Set([
			"decode_interface_builder",
			"inspect_asset_catalog",
			"inspect_keyed_archive",
			"trace_dylib_resolution"
		]);
		STATEFUL_OPERATIONS = new Set([
			"health",
			"current_address",
			"current_procedure",
			"current_document",
			"goto_address",
			"list_documents"
		]);
		CURSOR_DEFAULT_OPERATIONS = new Set([
			"address_name",
			"comment",
			"inline_comment",
			"next_address",
			"prev_address",
			"xrefs"
		]);
		DOCUMENT_SCOPED_OPERATIONS = new Set(OFFICIAL_TOOL_CONTRACTS.map(({ name }) => name).filter((name) => name !== "current_document" && name !== "list_documents"));
		SNAPSHOT_CACHE_ENTRY_CEILING = 1e4;
		withoutDisplayName = ({ name: _name, ...target }) => target;
		replayDocumentSelected = (operation, parameters) => !DOCUMENT_SCOPED_OPERATIONS.has(operation) || typeof parameters.document === "string";
		isOneShotPseudocode = (operation, descriptor, context) => context === "one-shot-target" && operation === "procedure_pseudo_code" && descriptor?.provider.id === "ghidra";
		DOCUMENTLESS_SOURCE_EVIDENCE_OPERATIONS = new Set(["procedure_callers", "procedure_callees"]);
		isSourceEvidenceRetainable = (operation, descriptor, parameters, options = {}) => !STATEFUL_OPERATIONS.has(operation) && !RESOURCE_SCOPED_OPERATIONS.has(operation) && (!DOCUMENT_SCOPED_OPERATIONS.has(operation) || typeof parameters.document === "string" || DOCUMENTLESS_SOURCE_EVIDENCE_OPERATIONS.has(operation) || options.requiresSourceEvidence === true || isOneShotPseudocode(operation, descriptor, options.snapshotContext)) && (!CURSOR_DEFAULT_OPERATIONS.has(operation) || typeof parameters.address === "string") && descriptor?.effects.mutatesArtifact === false && (options.requiresSourceEvidence === true || descriptor.cachePolicy === "snapshot" || descriptor.effects.mayWriteFilesystem === false) && descriptor.effects.changesPermissions === false;
		requestsStandaloneDecompile = (operation, parameters) => operation === "procedure_pseudo_code" && (parameters.analysis === "independent_fresh" || parameters.analysis === "call_destination");
		isSnapshotCacheable = (operation, descriptor, parameters, context) => !requestsStandaloneDecompile(operation, parameters) && isSourceEvidenceRetainable(operation, descriptor, parameters, { snapshotContext: context }) && (replayDocumentSelected(operation, parameters) || isOneShotPseudocode(operation, descriptor, context)) && descriptor.cachePolicy !== "live";
		requiresNativeSourceAdmissionBeforeReplay = (providerId) => HOST_PLATFORM.platform === "win32" && providerId === "ghidra";
		SNAPSHOT_REPLAY_LIMITATION = "Loaded from a local REA analysis snapshot; this call did not re-run the provider.";
		AnalysisSnapshotCache = class {
			#entries = new Map();
			#replayBindings = new Map();
			#workflowEntries = new Map();
			#target;
			#binding;
			/** Whether staged entries belong to the supplied target and profile. */
			matches(target, profile) {
				return this.mismatch(target, profile) === undefined;
			}
			/** Explain staged mismatch without treating missing binding facts as absent. */
			mismatch(target, profile) {
				if (this.#target === undefined && this.#binding === undefined) return undefined;
				if (this.#target === undefined || this.#binding === undefined) return { staged_binding: "incomplete" };
				return snapshotBindingMismatch({
					target: this.#target,
					binding: this.#binding
				}, target, profile);
			}
			/** Replace cache state when the target or selected profile changes. */
			select(target, profile) {
				if (!this.matches(target, profile)) this.#clearEntries();
				this.#target = snapshotTarget(target);
				this.#binding = snapshotBinding(profile);
			}
			/** Merge already-validated entries and return the new-entry count. */
			stage(snapshot) {
				snapshot = immutableAnalysisSnapshot(snapshot);
				if (this.#target !== undefined && !sameTargetIdentity(this.#target.identity, snapshot.target.identity) || this.#binding !== undefined && !snapshotMatchesProfile(this.#binding, snapshot.binding.analysis_profile)) this.#clearEntries();
				this.#target = structuredClone(snapshot.target);
				this.#binding = structuredClone(snapshot.binding);
				let imported = 0;
				const stagedQueryIds = new Set();
				for (const entry of snapshot.entries) {
					if (!this.#entries.has(entry.query_id) && !this.#hasCapacity()) continue;
					if (!this.#entries.has(entry.query_id)) imported += 1;
					this.#entries.set(entry.query_id, entry);
					stagedQueryIds.add(entry.query_id);
					this.#replayBindings.delete(entry.query_id);
				}
				const evidenceByQuery = new Map();
				const records = new Map(snapshot.evidence_bundle.records.map((record) => [record.evidence_id, record]));
				const lookup = (id) => records.get(id);
				const checkClosure = createInvestigationEvidenceClosureChecker({ evidenceForAnalysis: lookup });
				const ambiguous = new Set();
				for (const evidence of snapshot.evidence_bundle.records) {
					const queryId = analysisQueryId(snapshot.target, snapshot.binding, evidence.operation, evidence.parameters);
					if (!stagedQueryIds.has(queryId)) continue;
					const entry = this.#entries.get(queryId);
					if (entry === undefined || !evidenceMatchesEntry(evidence, entry, snapshot)) continue;
					const previous = evidenceByQuery.get(queryId);
					if (previous !== undefined && previous.evidence_id !== evidence.evidence_id) ambiguous.add(queryId);
					else evidenceByQuery.set(queryId, evidence);
				}
				for (const [queryId, evidence] of evidenceByQuery) {
					if (ambiguous.has(queryId)) {
						this.#replayBindings.set(queryId, null);
						continue;
					}
					this.#replayBindings.set(queryId, snapshotReplayBinding(evidence, lookup, checkClosure) ?? { pendingEvidenceId: evidence.evidence_id });
				}
				for (const entry of snapshot.workflow_entries) {
					if (!this.#workflowEntries.has(entry.query_id) && !this.#hasCapacity()) continue;
					if (!this.#workflowEntries.has(entry.query_id)) imported += 1;
					this.#workflowEntries.set(entry.query_id, entry);
				}
				return imported;
			}
			/** Refresh subject bindings backed by replaced authenticated metadata. */
			refreshEvidenceMetadata(replacements) {
				if (replacements.length === 0 || this.#target === undefined || this.#binding === undefined) return;
				const currentRecords = new Map(replacements.map(({ current }) => [current.evidence_id, current]));
				for (const [queryId, binding] of this.#replayBindings) {
					if (binding === null || "pendingEvidenceId" in binding || binding.sourceEvidence === undefined) continue;
					const sources = binding.sourceEvidence;
					if (!sources.some((source) => currentRecords.has(source.evidence_id))) continue;
					this.#replayBindings.set(queryId, {
						evidenceId: binding.evidenceId,
						sourceEvidence: Object.freeze(sources.map((source) => currentRecords.get(source.evidence_id) ?? source))
					});
				}
				const header = {
					target: this.#target,
					binding: this.#binding
				};
				for (const { previous, current } of replacements) {
					const display = evidenceSubjectDisplay(current);
					if (display === undefined || evidenceSubjectDisplay(previous)?.local_path === display.local_path) continue;
					const queryId = analysisQueryId(header.target, header.binding, previous.operation, previous.parameters);
					const entry = this.#entries.get(queryId);
					const entryIdentity = entry?.execution.subject.identity;
					if (entry !== undefined && entryIdentity?.kind === "file" && evidenceMatchesEntry(previous, entry, header)) this.#entries.set(queryId, {
						...entry,
						execution: {
							...entry.execution,
							subject: {
								identity: entryIdentity,
								...display
							}
						}
					});
					const workflow = this.#workflowEntries.get(queryId);
					const workflowIdentity = workflow?.execution.subject.identity;
					if (workflow !== undefined && workflowIdentity?.kind === "file" && evidenceMatchesWorkflowEntry(previous, workflow, header)) this.#workflowEntries.set(queryId, {
						...workflow,
						execution: {
							...workflow.execution,
							subject: {
								identity: workflowIdentity,
								...display
							}
						}
					});
				}
			}
			/** Build a complete snapshot for an active target. */
			export(target, profile, evidenceBundle) {
				if (target === undefined || profile === undefined) return err(new NoBinaryOpenError());
				try {
					const persistedTarget = snapshotTarget(target);
					const namesTarget = (subject) => subject.identity.kind === "file" && subject.identity.sha256 === target.sha256;
					const binding = snapshotBinding(profile);
					const entries = [...this.#entries.values()].filter((entry) => namesTarget(entry.execution.subject)).sort((left, right) => compareUnicodeCodePoints(left.query_id, right.query_id));
					const workflows = [...this.#workflowEntries.values()].filter((entry) => namesTarget(entry.execution.subject)).sort((left, right) => compareUnicodeCodePoints(left.query_id, right.query_id));
					return ok(parseAnalysisSnapshot({
						target: persistedTarget,
						binding,
						entries,
						workflow_entries: workflows,
						evidence_bundle: evidenceBundle
					}));
				} catch (cause) {
					return err(new EvidenceIntegrityError("Analysis snapshot validation failed", { cause }));
				}
			}
			/** Validate target identity, merge evidence atomically, then stage entries. */
			import(snapshot, active, mergeEvidence) {
				let validated;
				try {
					validated = immutableAnalysisSnapshot(snapshot);
				} catch (cause) {
					return err(new EvidenceIntegrityError("Analysis snapshot validation failed", { cause }));
				}
				if (active !== undefined) {
					const mismatch = snapshotBindingMismatch(validated, active.target, active.profile);
					if (mismatch !== undefined) return err(new AnalysisSnapshotMismatchError("Analysis snapshot target, provider, or analysis profile does not match the active binary", mismatch));
				}
				const importedEvidence = mergeEvidence(validated.evidence_bundle);
				return importedEvidence.ok ? ok(this.stage(validated)) : importedEvidence;
			}
			/** Return canonical entries for persistence. */
			entries() {
				return [...this.#entries.values()].sort((left, right) => compareUnicodeCodePoints(left.query_id, right.query_id)).map((entry) => structuredClone(entry));
			}
			/** Return canonical composed-workflow entries for persistence. */
			workflowEntries() {
				return [...this.#workflowEntries.values()].sort((left, right) => compareUnicodeCodePoints(left.query_id, right.query_id)).map((entry) => structuredClone(entry));
			}
			/** Record one exact derived workflow result unless the shared cache is full. */
			recordWorkflow(input) {
				this.select(input.target, input.profile);
				const queryId = analysisQueryId(snapshotTarget(input.target), snapshotBinding(input.profile), input.operation, input.parameters);
				if (!this.#workflowEntries.has(queryId) && !this.#hasCapacity()) return;
				const entry = createAnalysisSnapshotWorkflowEntry({
					target: snapshotTarget(input.target),
					binding: snapshotBinding(input.profile),
					operation: input.operation,
					parameters: input.parameters,
					execution: input.execution
				});
				this.#workflowEntries.set(entry.query_id, entry);
			}
			/** Replay an exact provider-specific query, marking its cached provenance. */
			lookup(target, profile, operation, parameters, lookup) {
				const queryId = analysisQueryId(snapshotTarget(target), snapshotBinding(profile), operation, parameters);
				const cached = this.#entries.get(queryId);
				if (cached === undefined) return undefined;
				let binding = this.#replayBindings.get(queryId);
				if (binding === null) return undefined;
				if (binding !== undefined && "pendingEvidenceId" in binding) {
					const parent = lookup?.(binding.pendingEvidenceId);
					if (parent === undefined || lookup === undefined) return undefined;
					const restored = snapshotReplayBinding(parent, lookup);
					if (restored === null) return undefined;
					this.#replayBindings.set(queryId, restored);
					binding = restored;
				}
				const cachedTarget = evidenceSubjectTarget(cached.execution.subject);
				const subject = cachedTarget === undefined ? null : rebindEvidenceSubjectTargetPath(withoutDisplayName(cachedTarget), target);
				const execution = structuredClone({
					...binding === undefined ? {} : { evidenceId: binding.evidenceId },
					result: cached.execution.result,
					rawResult: cached.execution.raw_result,
					provider: cached.execution.provider,
					analysisProfile: structuredClone(profile),
					limitations: [...cached.execution.limitations, SNAPSHOT_REPLAY_LIMITATION],
					...cached.execution.relationship_coverage === null && RELATIONSHIP_OPERATIONS.has(operation) ? { relationshipCoverage: {
						status: "unknown",
						reason: "Snapshot entry does not report relationship coverage."
					} } : cached.execution.relationship_coverage === null ? {} : { relationshipCoverage: cached.execution.relationship_coverage },
					locations: cached.execution.locations,
					subject: subject ?? null
				});
				return binding?.sourceEvidence === undefined ? execution : {
					...execution,
					sourceEvidence: binding.sourceEvidence
				};
			}
			/** Record one successful immutable call unless the cache is full. */
			record(input, lookup) {
				const { target, profile, operation, parameters, execution } = input;
				this.select(target, profile);
				if (execution.referencesTruncated === true || execution.referenceClassifications !== undefined || execution.referenceCoverageGaps !== undefined) return;
				let sourceBinding;
				if ((execution.sourceEvidence?.length ?? 0) > 0) {
					if (execution.evidenceId === undefined || lookup === undefined) return;
					const parent = lookup(execution.evidenceId);
					if (parent === undefined) return;
					const closed = snapshotReplayBinding(parent, lookup);
					if (closed === null) return;
					sourceBinding = closed;
				}
				const queryId = analysisQueryId(snapshotTarget(target), snapshotBinding(profile), operation, parameters);
				if (!this.#entries.has(queryId) && !this.#hasCapacity()) return;
				const entry = createAnalysisSnapshotEntry({
					target: snapshotTarget(target),
					binding: snapshotBinding(profile),
					operation,
					parameters,
					execution: {
						...execution,
						subject: evidenceSubject(execution.subject === undefined ? target : execution.subject ?? unknownTarget("not-observed"))
					}
				});
				this.#entries.set(entry.query_id, entry);
				if (execution.evidenceId === undefined) this.#replayBindings.delete(entry.query_id);
				else this.#replayBindings.set(entry.query_id, sourceBinding ?? {
					evidenceId: execution.evidenceId,
					...input.evidence === undefined ? {} : { sourceEvidence: Object.freeze([input.evidence]) }
				});
			}
			/** Forget all target-bound entries. */
			clear() {
				this.#clearEntries();
				this.#target = undefined;
				this.#binding = undefined;
			}
			#clearEntries() {
				this.#entries.clear();
				this.#replayBindings.clear();
				this.#workflowEntries.clear();
			}
			#hasCapacity() {
				return this.#entries.size + this.#workflowEntries.size < SNAPSHOT_CACHE_ENTRY_CEILING;
			}
		};
	})))();
}

//#endregion
//#region dist/application/WorkflowAnalysisProfile.js
var workflowAnalysisProfile, workflowAnalysisProfileParameters;
function init_WorkflowAnalysisProfile() {
	return (init_WorkflowAnalysisProfile = __esmMin((() => {
		init_analysisProfile();
		init_investigationProviders();
		workflowAnalysisProfile = (upstream, operation) => createAnalysisProfile(REA_WORKFLOW_PROVIDER, workflowAnalysisProfileParameters(upstream, operation));
		workflowAnalysisProfileParameters = (upstream, operation) => ({
			upstream_analysis_profile: upstream,
			source_limitations: "provider-operation-caveats-v1",
			...operation === "trace_native_values" ? {
				value_flow_limitations: "provider-attributed-v1",
				value_flow_absence: "recorded-versus-unavailable-v1"
			} : {},
			...operation === "binary_overview" ? { workflow_revision: 5 } : operation === "batch_decompile" ? { workflow_revision: 4 } : operation === "trace_feature" ? { workflow_revision: 9 } : operation === "get_call_graph" ? { workflow_revision: 3 } : operation === "trace_native_values" ? { workflow_revision: 3 } : operation === "trace_call_path" ? { workflow_revision: 2 } : { workflow_revision: 1 }
		});
	})))();
}

//#endregion
//#region dist/application/binary/ProfilelessNativeWorkflowSnapshot.js
var profilelessNativeDispatchProfile, profilelessSnapshotMismatch, hasOnlyProfilelessNativeDispatchEntries;
function init_ProfilelessNativeWorkflowSnapshot() {
	return (init_ProfilelessNativeWorkflowSnapshot = __esmMin((() => {
		init_analysisProfile();
		init_analysisSnapshot();
		init_WorkflowAnalysisProfile();
		profilelessNativeDispatchProfile = (route) => {
			const descriptor = route.capabilities.get("inspect_native_dispatch_metadata");
			const profile = descriptor?.analysisProfile;
			if (descriptor === undefined || descriptor.operation !== "inspect_native_dispatch_metadata" || !descriptor.available || descriptor.provider.id !== "native-macos" || profile === undefined || profile.provider.id !== descriptor.provider.id || profile.provider.name !== descriptor.provider.name || profile.provider.version.length === 0) return undefined;
			return structuredClone(profile);
		};
		profilelessSnapshotMismatch = (snapshot, target, profile) => {
			const mismatch = snapshotBindingMismatch(snapshot, target, profile);
			if (mismatch !== undefined) return mismatch;
			if (profile === undefined || snapshot.entries.length !== 0 || !hasOnlyProfilelessNativeDispatchEntries(snapshot.workflow_entries, profile)) return { workflow_scope: "incompatible" };
			return undefined;
		};
		hasOnlyProfilelessNativeDispatchEntries = (entries, profile) => entries.length > 0 && entries.every((entry) => entry.operation === "inspect_native_dispatch_metadata" && analysisProfilesEqual(entry.execution.analysis_profile, workflowAnalysisProfile(profile, entry.operation)));
	})))();
}

//#endregion
//#region dist/application/investigation/EvidenceLedger.js
var EvidenceLedger, LEDGER_ENTRY_BYTES, mutationOperation, readLedgerEvidence, unknownRevisionKey;
function init_EvidenceLedger() {
	return (init_EvidenceLedger = __esmMin((() => {
		init_residualUnknownGraphError();
		init_budget();
		init_internalInvariant();
		init_evidenceBundle();
		init_analysisErrorCore();
		init_evidenceErrors();
		init_unknownRegistryError();
		init_evidence();
		init_immutableJson();
		init_evidenceValidation();
		init_residualUnknown();
		init_result();
		init_unicodeCodePointOrder();
		init_inputIssueProjection();
		init_InvestigationRetention();
		EvidenceLedger = class {
			retentionPolicy;
			#records = new Map();
			#unknownRevisions = new Map();
			#unknownHeads = new Map();
			#recordBytes = new Map();
			#retained;
			constructor(retentionPolicy = {}) {
				this.retentionPolicy = retentionPolicy;
				this.#retained = new Budget(investigationMaximumRepresentationBytes(retentionPolicy));
			}
			/** Read committed counts without constructing or hashing a bundle. */
			statistics() {
				return {
					evidenceRecords: this.#records.size,
					unknownRevisions: this.#unknownRevisions.size,
					unknownHeads: this.#unknownHeads.size,
					retainedRepresentationBytes: this.#retained.used,
					maximumRepresentationBytes: this.#retained.maximum
				};
			}
			/** Record evidence idempotently; conflicting content is rejected. */
			record(input) {
				const authenticated = this.#readEvidence(input, "Evidence record validation failed");
				if (!authenticated.ok) return authenticated;
				const evidence = authenticated.value;
				const existing = this.#records.get(evidence.evidence_id);
				if (existing !== undefined) {
					return ok("duplicate");
				}
				const admitted = this.#admitChanges("record_evidence", new Map([[evidence.evidence_id, evidence]]));
				if (!admitted.ok) return err(this.#exposeRefusedEvidence(admitted.error, evidence));
				this.#records.set(evidence.evidence_id, evidence);
				this.#commitAccounting(admitted.value);
				return ok("added");
			}
			/** Validate an entire bundle before atomically merging its records. */
			import(input) {
				if (!isImmutableEvidenceBundle(input)) {
					const headroom = admitInvestigationAuthentication(input, "import_evidence_bundle", this.retentionPolicy);
					if (!headroom.ok) return headroom;
				}
				const parsed = safeParseImmutableEvidenceBundle(input);
				if (!parsed.ok) {
					const { kind, message, cause } = parsed.error;
					if (kind === "single-record") return err(new AnalysisInputError("import_evidence_bundle", {
						cause,
						userMessage: message
					}, [singleEvidenceRecordIssue([], message)]));
					return err(new EvidenceIntegrityError("Evidence bundle validation failed", {
						cause,
						userMessage: message
					}));
				}
				const bundle = parsed.value;
				const recordChanges = new Map();
				let recordsAdded = 0;
				const replacements = [];
				for (const evidence of bundle.records) {
					const existing = this.#records.get(evidence.evidence_id);
					if (existing === undefined) {
						recordChanges.set(evidence.evidence_id, evidence);
						recordsAdded += 1;
						continue;
					}
					if (existing === evidence) continue;
					if (!evidenceDisplayMetadataAgree(existing, evidence)) {
						recordChanges.set(evidence.evidence_id, evidence);
						replacements.push({
							kind: "metadata",
							previous: existing,
							current: evidence
						});
					}
				}
				if (bundle.unknowns.length === 0) {
					const admitted = this.#admitChanges("import_evidence_bundle", recordChanges);
					if (!admitted.ok) return admitted;
					for (const evidence of recordChanges.values()) this.#records.set(evidence.evidence_id, evidence);
					this.#commitAccounting(admitted.value);
					return ok({
						recordsAdded,
						unknownsAdded: 0,
						changed: recordChanges.size > 0,
						replacements
					});
				}
				const unknownChanges = new Map();
				let unknownsAdded = 0;
				for (const unknown of bundle.unknowns) {
					const key = unknownRevisionKey(unknown);
					const existing = this.#unknownRevisions.get(key);
					if (existing !== undefined && existing.revision_digest !== unknown.revision_digest) return err(new EvidenceIntegrityError("Conflicting unknown revision", {
						userMessage: "The incoming residual-unknown history conflicts with a revision retained in this session. Inspect each history in a separate session; importing the unchanged bundle into this session cannot reconcile them.",
						diagnostics: {
							unknown_id: unknown.unknown_id,
							revision: unknown.revision
						}
					}));
					if (existing === undefined) {
						unknownChanges.set(key, unknown);
						unknownsAdded += 1;
					}
				}
				if (recordChanges.size === 0 && unknownChanges.size === 0) return ok({
					recordsAdded: 0,
					unknownsAdded: 0,
					changed: false,
					replacements: []
				});
				const admitted = this.#admitChanges("import_evidence_bundle", recordChanges, [...unknownChanges.values()]);
				if (!admitted.ok) return admitted;
				const pending = new Map(this.#records);
				for (const evidence of recordChanges.values()) pending.set(evidence.evidence_id, evidence);
				const pendingUnknowns = new Map(this.#unknownRevisions);
				for (const [key, unknown] of unknownChanges) pendingUnknowns.set(key, unknown);
				const checked = this.#validateCandidate(pending, pendingUnknowns);
				if (!checked.ok) {
					if (!(checked.error instanceof UnknownRegistryError)) return checked;
					return err(new EvidenceIntegrityError("Evidence bundle unknown registry failed", { cause: checked.error }));
				}
				this.#commit(checked.value);
				this.#commitAccounting(admitted.value);
				return ok({
					recordsAdded,
					unknownsAdded,
					changed: recordChanges.size > 0 || unknownsAdded > 0,
					replacements
				});
			}
			/** Export records in deterministic, semantically irrelevant ID order. */
			export() {
				return structuredClone(createEvidenceBundle([...this.#records.values()], [...this.#unknownRevisions.values()]));
			}
			/** Borrow an authenticated immutable bundle without copying its records. */
			immutableBundle() {
				return createImmutableEvidenceBundle([...this.#records.values()], [...this.#unknownRevisions.values()]);
			}
			/** Borrow immutable source records without constructing or hashing a bundle. */
			recordsForAnalysis() {
				return [...this.#records.values()];
			}
			/** Check whether one immutable Evidence ID is present in this ledger. */
			has(evidenceId) {
				return this.#records.has(evidenceId);
			}
			/** Return a detached immutable Evidence value by semantic ID. */
			get(evidenceId) {
				const evidence = this.#records.get(evidenceId);
				return evidence === undefined ? undefined : structuredClone(evidence);
			}
			/** Borrow authenticated immutable Evidence for read-only analysis without a full clone. */
			forAnalysis(evidenceId) {
				return this.#records.get(evidenceId);
			}
			/** Create one approved unknown and atomically append its mutation evidence. */
			recordUnknown(input, mutationEvidence) {
				const headroom = admitInvestigationAuthentication(input, "record_unknown", this.retentionPolicy);
				if (!headroom.ok) return headroom;
				const authenticated = this.#readEvidence(mutationEvidence, "Unknown mutation evidence is invalid", "record_unknown");
				if (!authenticated.ok) return authenticated;
				const parsedMutation = authenticated.value;
				let unknown;
				try {
					unknown = createResidualUnknown(input, parsedMutation.evidence_id, evidenceFileTarget(parsedMutation)?.sha256 ?? null);
				} catch (cause) {
					if (!(cause instanceof z.ZodError)) throw cause;
					return err(analysisInputErrorFromIssues("record_unknown", cause.issues, input, { cause }));
				}
				if (this.#unknownHeads.has(unknown.unknown_id)) return err(new UnknownRegistryError("already-exists"));
				return this.#appendUnknown(unknown, parsedMutation);
			}
			/** Atomically record derived Evidence and a linked residual unknown. */
			recordWithUnknown(evidenceInput, input, mutationInput) {
				const headroom = admitInvestigationAuthentication(input, "record_unknown", this.retentionPolicy);
				if (!headroom.ok) return headroom;
				const authenticatedEvidence = this.#readEvidence(evidenceInput, "Atomic Evidence validation failed");
				if (!authenticatedEvidence.ok) return authenticatedEvidence;
				const authenticatedMutation = this.#readEvidence(mutationInput, "Atomic Evidence validation failed", "record_unknown");
				if (!authenticatedMutation.ok) return authenticatedMutation;
				const evidence = authenticatedEvidence.value;
				const mutation = authenticatedMutation.value;
				let unknown;
				try {
					unknown = createResidualUnknown(input, mutation.evidence_id, evidenceFileTarget(mutation)?.sha256 ?? null);
				} catch (cause) {
					if (!(cause instanceof z.ZodError)) throw cause;
					return err(new UnknownRegistryError("invalid-transition", { cause }));
				}
				const creationUnknown = this.#unknownRevisions.get(unknownRevisionKey(unknown));
				if (creationUnknown !== undefined) {
					if (creationUnknown.revision_digest !== unknown.revision_digest) return err(new UnknownRegistryError("already-exists"));
					const checked = this.#appendIncremental([evidence]);
					if (!checked.ok) return err(this.#exposeRefusedEvidence(checked.error, evidence));
					return ok(null);
				}
				const checked = this.#appendIncremental([evidence, mutation], unknown);
				if (!checked.ok) return err(this.#exposeRefusedEvidence(checked.error, evidence));
				return ok(structuredClone(unknown));
			}
			/** Report authenticated completed Evidence without inferring membership from this attempt. */
			#exposeRefusedEvidence(error, evidence) {
				if (!(error instanceof AnalysisResourceConstraintError) || error.resource !== "capacity") return error;
				return error.retainPartialObservation(freezeJsonSnapshot(this.#records.has(evidence.evidence_id) ? {
					kind: "retained-evidence",
					evidence_id: evidence.evidence_id
				} : {
					kind: "unretained-evidence",
					evidence
				}));
			}
			/** Apply one approved full-state update using optimistic revision matching. */
			updateUnknown(input, mutationEvidence) {
				const current = this.#unknownHeads.get(input.unknown_id);
				if (current === undefined) return err(new UnknownRegistryError("not-found"));
				if (current.revision !== input.expected_revision) return err(new UnknownRegistryError("revision-conflict"));
				const headroom = admitInvestigationAuthentication(input, "update_unknown", this.retentionPolicy);
				if (!headroom.ok) return headroom;
				let unknown;
				try {
					unknown = updateResidualUnknown(current, input, mutationEvidence.evidence_id);
				} catch (cause) {
					if (!(cause instanceof z.ZodError)) throw cause;
					return err(analysisInputErrorFromIssues("update_unknown", cause.issues, input, { cause }));
				}
				const authenticated = this.#readEvidence(mutationEvidence, "Unknown mutation evidence is invalid", "update_unknown");
				if (!authenticated.ok) return authenticated;
				return this.#appendUnknown(unknown, authenticated.value);
			}
			/** Query current heads in stable ID order. */
			listUnknowns(filters = {}) {
				return this.listUnknownsPage(filters).items;
			}
			/** Select a stable page of current heads before detaching record payloads. */
			listUnknownsPage(query = {}) {
				const offset = query.offset ?? 0;
				const matching = [...this.#unknownHeads.values()].filter((unknown) => (query.status === undefined || unknown.status === query.status) && (query.severity === undefined || unknown.severity === query.severity) && (query.domain === undefined || unknown.domain === query.domain)).sort((left, right) => compareUnicodeCodePoints(left.unknown_id, right.unknown_id));
				const start = Math.min(offset, matching.length);
				const end = query.limit === undefined ? undefined : start + Math.min(query.limit, matching.length - start);
				const page = matching.slice(start, end);
				const nextOffset = offset <= matching.length && start + page.length < matching.length ? start + page.length : null;
				return {
					items: page.map((unknown) => structuredClone(unknown)),
					total: matching.length,
					offset,
					next_offset: nextOffset
				};
			}
			/** Return current resolution validity; imported invalid states are rejected. */
			verifyUnknownResolution(unknownId) {
				const unknown = this.#unknownHeads.get(unknownId);
				if (unknown === undefined) return err(new UnknownRegistryError("not-found"));
				return ok({
					valid: unknown.status === "resolved",
					truthVerified: unknown.resolution?.disposition === "verified",
					unknown: structuredClone(unknown)
				});
			}
			/** Explicit reset/disposal releases records and accounting; the ceiling stays stable. */
			clear() {
				this.#records.clear();
				this.#unknownRevisions.clear();
				this.#unknownHeads.clear();
				this.#retained.restore(0);
				this.#recordBytes.clear();
			}
			#appendUnknown(unknown, mutationEvidence) {
				const checked = this.#appendIncremental([mutationEvidence], unknown);
				if (!checked.ok) return checked;
				return ok(structuredClone(unknown));
			}
			/** Incoming records were authenticated and sealed at the ingestion boundary. */
			#appendIncremental(records, unknown) {
				const additions = new Map();
				for (const evidence of records) {
					const existing = additions.get(evidence.evidence_id) ?? this.#records.get(evidence.evidence_id);
					if (existing !== undefined) {
						continue;
					}
					additions.set(evidence.evidence_id, evidence);
				}
				const unknownKey = unknown === undefined ? undefined : unknownRevisionKey(unknown);
				if (unknownKey !== undefined && this.#unknownRevisions.has(unknownKey)) return err(new UnknownRegistryError("integrity"));
				if (unknown !== undefined) try {
					validateResidualUnknownAddition(unknown, {
						get: (id) => additions.get(id) ?? this.#records.get(id),
						has: (id) => additions.has(id) || this.#records.has(id)
					}, this.#unknownHeads);
				} catch (cause) {
					if (!(cause instanceof InvalidResidualUnknownGraphError)) throw cause;
					return err(new UnknownRegistryError(cause.constraint, { cause }));
				}
				const admitted = this.#admitChanges(unknown === undefined ? "record_evidence" : mutationOperation(unknown), additions, unknown === undefined ? [] : [unknown]);
				if (!admitted.ok) return admitted;
				for (const [id, evidence] of additions) this.#records.set(id, evidence);
				if (unknown !== undefined && unknownKey !== undefined) {
					this.#unknownRevisions.set(unknownKey, unknown);
					this.#unknownHeads.set(unknown.unknown_id, unknown);
				}
				this.#commitAccounting(admitted.value);
				return ok(undefined);
			}
			/** Return the sealed candidate facts that the commit will adopt. */
			#validateCandidate(records, unknowns) {
				const revisions = [...unknowns.values()];
				const headroom = admitInvestigationAuthentication(revisions, "import_evidence_bundle", this.retentionPolicy);
				if (!headroom.ok) return headroom;
				try {
					return ok(createImmutableEvidenceBundle([...records.values()], revisions));
				} catch (cause) {
					if (!(cause instanceof z.ZodError) && !(cause instanceof InvalidResidualUnknownGraphError)) throw cause;
					return err(new UnknownRegistryError(cause instanceof InvalidResidualUnknownGraphError ? cause.constraint : "integrity", { cause }));
				}
			}
			#commit(bundle) {
				const records = new Map(bundle.records.map((evidence) => [evidence.evidence_id, evidence]));
				const unknownRevisions = new Map(bundle.unknowns.map((unknown) => [unknownRevisionKey(unknown), unknown]));
				const unknownHeads = new Map();
				for (const unknown of bundle.unknowns) {
					const head = unknownHeads.get(unknown.unknown_id);
					if (head === undefined || head.revision < unknown.revision) unknownHeads.set(unknown.unknown_id, unknown);
				}
				this.#records = records;
				this.#unknownRevisions = unknownRevisions;
				this.#unknownHeads = unknownHeads;
			}
			#readEvidence(input, message, operation = "record_evidence") {
				if (!isImmutableEvidence(input)) {
					const headroom = admitInvestigationAuthentication(input, operation, this.retentionPolicy);
					if (!headroom.ok) return headroom;
				}
				return readLedgerEvidence(input, message);
			}
			/** Stage all byte-index changes; refused inputs never grow owner metadata. */
			#admitChanges(operation, records, unknowns = []) {
				let delta = 0;
				const recordBytes = new Map();
				for (const id of records.keys()) {
					const previousBytes = this.#recordBytes.get(id);
					if (previousBytes !== undefined) delta -= LEDGER_ENTRY_BYTES + previousBytes;
				}
				for (const record of records.values()) {
					const remaining = this.#retained.remaining - delta;
					const bytes = investigationValueBytes(record, remaining - LEDGER_ENTRY_BYTES);
					delta += LEDGER_ENTRY_BYTES + bytes;
					const admitted = admitInvestigationRetention(operation, this.#retained.used, delta, this.#retained.maximum);
					if (!admitted.ok) return admitted;
					recordBytes.set(record.evidence_id, bytes);
				}
				const newHeads = new Set();
				for (const unknown of unknowns) {
					const key = unknownRevisionKey(unknown);
					const indexBytes = LEDGER_ENTRY_BYTES + 64 + key.length * 2;
					const headBytes = this.#unknownHeads.has(unknown.unknown_id) || newHeads.has(unknown.unknown_id) ? 0 : LEDGER_ENTRY_BYTES;
					newHeads.add(unknown.unknown_id);
					const remaining = this.#retained.remaining - delta;
					delta += indexBytes + headBytes + investigationValueBytes(unknown, remaining - indexBytes - headBytes);
					const admitted = admitInvestigationRetention(operation, this.#retained.used, delta, this.#retained.maximum);
					if (!admitted.ok) return admitted;
				}
				return ok({
					deltaBytes: delta,
					recordBytes
				});
			}
			#commitAccounting(changes) {
				for (const [id, bytes] of changes.recordBytes) this.#recordBytes.set(id, bytes);
				if (changes.deltaBytes < 0) this.#retained.refund(-changes.deltaBytes);
				else this.#retained.charge(changes.deltaBytes, () => invariantViolation("Admitted investigation retention no longer fits"));
			}
		};
		LEDGER_ENTRY_BYTES = 256;
		mutationOperation = (unknown) => unknown.revision === 1 ? "record_unknown" : "update_unknown";
		readLedgerEvidence = (input, message) => {
			const checked = safeParseImmutableEvidence(input);
			return checked.ok ? checked : err(new EvidenceIntegrityError(message, { cause: checked.error }));
		};
		unknownRevisionKey = (unknown) => `${unknown.unknown_id}:${String(unknown.revision)}`;
	})))();
}

//#endregion
//#region dist/ports/BundleResourceOperations.js
var BUNDLE_NATIVE_RESOURCE_OPERATIONS, BUNDLE_ARTIFACT_RESOURCE_OPERATIONS, BUNDLE_RESOURCE_OPERATIONS, isBundleResourceOperation;
function init_BundleResourceOperations() {
	return (init_BundleResourceOperations = __esmMin((() => {
		BUNDLE_NATIVE_RESOURCE_OPERATIONS = new Set(["inspect_plist"]);
		BUNDLE_ARTIFACT_RESOURCE_OPERATIONS = new Set([
			"decode_interface_builder",
			"inspect_asset_catalog",
			"inspect_keyed_archive"
		]);
		BUNDLE_RESOURCE_OPERATIONS = new Set([...BUNDLE_NATIVE_RESOURCE_OPERATIONS, ...BUNDLE_ARTIFACT_RESOURCE_OPERATIONS]);
		isBundleResourceOperation = (name) => {
			for (const operation of BUNDLE_RESOURCE_OPERATIONS) if (operation === name) return true;
			return false;
		};
	})))();
}

//#endregion
export { AnalysisSnapshotCache, BUNDLE_ARTIFACT_RESOURCE_OPERATIONS, BUNDLE_NATIVE_RESOURCE_OPERATIONS, BUNDLE_RESOURCE_OPERATIONS, EvidenceLedger, admitCompletedAnalysis, bindSessionEvidenceExecution, completedOperationEvidence, hasOnlyProfilelessNativeDispatchEntries, init_AnalysisSnapshotCache, init_BundleResourceOperations, init_EvidenceLedger, init_ProfilelessNativeWorkflowSnapshot, init_SessionEvidenceReuse, init_SessionProviderPolicy, init_WorkflowAnalysisProfile, init_admitCompletedAnalysis, isSnapshotCacheable, isSourceEvidenceRetainable, profilelessNativeDispatchProfile, profilelessSnapshotMismatch, requestsStandaloneDecompile, requiresNativeSourceAdmissionBeforeReplay, routeAllowsSnapshotReplay, routeProviderIdentity, workflowAnalysisProfile, workflowAnalysisProfileParameters };