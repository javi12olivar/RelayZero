import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCapabilityUnavailableError, AnalysisResourceConstraintError, EvidenceIntegrityError, freezeJsonSnapshot, init_analysisErrorCore, init_evidenceErrors, init_immutableJson, init_jsonValue, jsonObjectSchema, jsonValueValidationIssue } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { evidenceDisplayMetadataAgree, evidenceSchema, init_evidence, init_evidenceValidation, isImmutableEvidence, safeParseImmutableEvidence } from "./nativeValueFlow-13oOEkkJ.js";
import { init_digests, isDigest } from "./targetIdentity-rKLLVwEj.js";
import { estimateJsonArrayScalarEntry, estimateJsonStorage, init_JsonAuthenticationHeadroom, requireAuthenticationHeadroom } from "./EvidenceInputResolver-DpJOzfQ9.js";
import { createAnalysisExecutionEvidence, init_analysisObservation } from "./analysisObservation-BSCFvtEd.js";
import { ZodError } from "zod";
import { getHeapStatistics } from "node:v8";

//#region dist/application/investigation/InvestigationRetention.js
var investigationMaximumRepresentationBytes, admitInvestigationAuthentication, investigationValueBytes, admitInvestigationRetention;
function init_InvestigationRetention() {
	return (init_InvestigationRetention = __esmMin((() => {
		init_analysisErrorCore();
		init_evidenceErrors();
		init_jsonValue();
		init_result();
		init_JsonAuthenticationHeadroom();
		investigationMaximumRepresentationBytes = (policy) => {
			const maximum = policy.maximumRepresentationBytes ?? Math.floor(getHeapStatistics().total_available_size / 4);
			if (!Number.isSafeInteger(maximum) || maximum < 0) throw new RangeError("Investigation representation allowance must be a nonnegative safe integer");
			return maximum;
		};
		admitInvestigationAuthentication = (input, operation, policy, additional) => {
			const issue = jsonValueValidationIssue(input);
			if (issue !== undefined) return err(new EvidenceIntegrityError("Investigation input is not ordinary JSON", { userMessage: issue }));
			return requireAuthenticationHeadroom(input, {
				operation,
				path: "investigation",
				description: "Insufficient live heap headroom to authenticate investigation records",
				...additional === undefined ? {} : { additional },
				...policy.availableAuthenticationBytes === undefined ? {} : { availableBytes: policy.availableAuthenticationBytes() }
			});
		};
		investigationValueBytes = (input, remainingBytes) => estimateJsonStorage(input, {
			maximumValueBytes: Math.max(0, remainingBytes),
			includeSerialized: false
		}).valueBytes;
		admitInvestigationRetention = (operation, retainedBytes, deltaBytes, maximumBytes) => retainedBytes + deltaBytes <= maximumBytes ? ok(undefined) : err(new AnalysisResourceConstraintError(operation, "capacity", "The investigation's retained representation allowance is exhausted.", {
			retained_representation_bytes: retainedBytes,
			requested_delta_bytes: deltaBytes,
			maximum_representation_bytes: maximumBytes
		}, { remediationAction: "Export the retained investigation and start a new investigation, or increase the parent Node process heap before starting it. Retention never evicts existing Evidence or Unknown history." }));
	})))();
}

//#endregion
//#region dist/application/investigation/sourcePublicationRecovery.js
var preserveCompletedSourceEvidence, recoverProviderSourceFailure, recoverySourceId;
function init_sourcePublicationRecovery() {
	return (init_sourcePublicationRecovery = __esmMin((() => {
		init_analysisObservation();
		init_digests();
		init_evidence();
		init_evidenceValidation();
		init_immutableJson();
		init_jsonValue();
		init_JsonAuthenticationHeadroom();
		init_InvestigationRetention();
		preserveCompletedSourceEvidence = (error, evidence, evidenceForAnalysis) => {
			if (!isImmutableEvidence(evidence)) {
				const headroom = admitInvestigationAuthentication(evidence, evidence.operation, {});
				if (!headroom.ok) {
					error.retainSourcePublication({
						kind: "omitted",
						reason: headroom.error._tag === "AnalysisResourceConstraintError" ? "insufficient-authentication-headroom" : "primary-authentication-failed",
						source_closure: "not-established"
					});
					return;
				}
			}
			const authenticated = safeParseImmutableEvidence(evidence);
			if (!authenticated.ok) {
				error.retainSourcePublication({
					kind: "omitted",
					reason: "primary-authentication-failed",
					source_closure: "not-established"
				});
				return;
			}
			const valid = authenticated.value;
			const retained = evidenceForAnalysis?.(valid.evidence_id);
			error.retainSourcePublication(freezeJsonSnapshot(evidenceForAnalysis === undefined ? {
				kind: "inline-evidence",
				retention: "unknown",
				source_closure: "not-established",
				evidence: valid
			} : retained !== undefined && evidenceDisplayMetadataAgree(retained, valid) ? {
				kind: "retained-evidence",
				source_closure: "not-established",
				evidence_id: valid.evidence_id
			} : {
				kind: "unretained-evidence",
				source_closure: "not-established",
				evidence: valid
			}));
		};
		recoverProviderSourceFailure = (input) => {
			const { error, operation, parameters, execution, admit, evidenceForAnalysis } = input;
			const { sourceEvidence, ...primaryExecution } = execution;
			const shell = Object.fromEntries(Object.keys(evidenceSchema.shape).map((key) => [key, null]));
			shell.evidence_id = `ev_${"0".repeat(64)}`;
			shell.predicate_type = "rea.analysis";
			shell.confidence = "observed";
			shell.authority = "shipped-artifact";
			shell.evidence_links = [];
			const base = estimateJsonStorage(shell);
			let sourceValueBytes = base.valueBytes;
			let sourceSerializedUtf16Bytes = base.serializedUtf16Bytes;
			let validSourceIds = true;
			for (const [index, source] of sourceEvidence.entries()) {
				const id = recoverySourceId(source);
				const entry = estimateJsonArrayScalarEntry(id, index > 0);
				sourceValueBytes += entry.valueBytes;
				sourceSerializedUtf16Bytes += entry.serializedUtf16Bytes;
				validSourceIds &&= id !== null && id.length === 67 && id.startsWith("ev_") && isDigest(id.slice(3));
			}
			const headroom = admit({
				operation,
				parameters,
				execution: primaryExecution,
				subject: execution.subject
			}, operation, {
				valueBytes: sourceValueBytes,
				serializedUtf16Bytes: sourceSerializedUtf16Bytes
			});
			if (!headroom.ok) {
				error.retainSourcePublication({
					kind: "omitted",
					reason: headroom.error._tag === "AnalysisResourceConstraintError" ? "insufficient-authentication-headroom" : "recovery-input-invalid",
					source_closure: "not-established"
				});
				return;
			}
			let evidence;
			if (validSourceIds) {
				try {
					evidence = createAnalysisExecutionEvidence(operation, parameters, execution, "observed", { immutable: true });
				} catch (cause) {
					if (!(cause instanceof ZodError)) throw cause;
				}
			}
			if (evidence !== undefined) {
				preserveCompletedSourceEvidence(error, evidence, evidenceForAnalysis);
				return;
			}
			const observation = jsonObjectSchema.parse({
				operation,
				parameters,
				result: execution.result,
				raw_result: execution.rawResult,
				provider: execution.provider,
				analysis_profile: execution.analysisProfile ?? null,
				subject: execution.subject ?? null,
				limitations: execution.limitations,
				locations: execution.locations,
				relationship_coverage: execution.relationshipCoverage ?? null,
				source_evidence_ids: sourceEvidence.map(recoverySourceId)
			});
			error.retainSourcePublication(freezeJsonSnapshot({
				kind: "unretained-observation",
				source_closure: "not-established",
				observation
			}));
		};
		recoverySourceId = (source) => {
			if (typeof source !== "object" || source === null) return null;
			const property = Object.getOwnPropertyDescriptor(source, "evidence_id");
			return property !== undefined && "value" in property && typeof property.value === "string" ? property.value : null;
		};
	})))();
}

//#endregion
//#region dist/application/investigation/recordEvidenceSources.js
var withEvidenceSources, retainAnalysisResultSources, recordEvidenceSources;
function init_recordEvidenceSources() {
	return (init_recordEvidenceSources = __esmMin((() => {
		init_sourcePublicationRecovery();
		init_result();
		init_analysisErrorCore();
		withEvidenceSources = (result, sources) => sources.length === 0 ? result : {
			...result,
			sourceEvidence: sources
		};
		retainAnalysisResultSources = (operation, recordEvidence, result, options = {}) => {
			const sources = result.sourceEvidence ?? [];
			const retained = sources.length > 0 && recordEvidence === undefined && options.sourceOwner !== "caller" ? err(new AnalysisCapabilityUnavailableError("rea", operation, "Provider source Evidence requires an explicit retention owner.", { userMessage: "Use an analysis session that retains provider source Evidence, or supply an Evidence recorder when registering this adapter." })) : recordEvidenceSources(recordEvidence, sources);
			if (retained.ok) return result;
			if (result.ok) return retained;
			result.error.retainSecondaryFailure(retained.error);
			return result;
		};
		recordEvidenceSources = (recordEvidence, sources, completed) => {
			for (const source of sources) {
				const recorded = recordEvidence?.(source);
				if (recorded !== undefined && !recorded.ok) {
					if (completed !== undefined) preserveCompletedSourceEvidence(recorded.error, completed.evidence, completed.evidenceForAnalysis);
					return recorded;
				}
			}
			return ok(null);
		};
	})))();
}

//#endregion
export { admitInvestigationAuthentication, admitInvestigationRetention, init_InvestigationRetention, init_recordEvidenceSources, init_sourcePublicationRecovery, investigationMaximumRepresentationBytes, investigationValueBytes, preserveCompletedSourceEvidence, recordEvidenceSources, recoverProviderSourceFailure, retainAnalysisResultSources, withEvidenceSources };