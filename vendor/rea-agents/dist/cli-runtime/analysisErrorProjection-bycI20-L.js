import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisAccessDeniedError, AnalysisArtifactChangedError, AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisResourceConstraintError, AnalysisSnapshotMismatchError, AnalysisTimeoutError, AnalysisUnsupportedTargetError, ArtifactOperationError, BinaryTargetError, ConfigurationError, EvidenceFileError, EvidenceIntegrityError, EvidenceReferenceError, NoBinaryOpenError, OPENABLE_APPLE_BUNDLE_TYPES_TEXT, ProviderOwnedAnalysisError, ResourceSnapshotMismatchError, UnknownRegistryError, analysisSettingDefinition, cleanupRetryRecovery, cleanupRetryRemediation, describeResidualUnknownGraphConstraint, domainErrorTag, errorMessage, fixedAllowanceRemediation, init_analysisErrorBase, init_analysisErrorCore, init_analysisErrorRecovery, init_analysisSettingDefinitions, init_appleBundleTypes, init_artifactIntegrity, init_artifactOperationError, init_configurationErrors, init_errorMessage, init_evidenceErrors, init_fixedAllowanceRemediation, init_immutableJson, init_inputArgumentGuidance, init_isRecord, init_jsonValue, init_parseFailure, init_residualUnknownGraphError, init_unknownRegistryError, invocationLimit, isImmutableJsonSnapshot, isRecord, jsonValueSchema, knownArgumentMistakeRemediation, primaryAnalysisError, projectArtifactIntegrityDetails, reportedParseLimit, resolvedAnalysisError, sourcePublicationRecoveryOf } from "./jsonSerialization-DAF9DVXC.js";

//#region dist/domain/browserObservationError.js
var browserCleanupObservation, BrowserObservationError, observationFailureMessage;
function init_browserObservationError() {
	return (init_browserObservationError = __esmMin((() => {
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_errorMessage();
		browserCleanupObservation = (cause) => cause instanceof AnalysisError && cause.cleanup !== undefined ? cause.cleanup : {
			reason: errorMessage(cause),
			resources: cause instanceof AnalysisError && cause.cleanupResources.length > 0 ? cause.cleanupResources : ["browser_transport"]
		};
		BrowserObservationError = class BrowserObservationError extends AnalysisError {
			operation;
			reason;
			_tag = "BrowserObservationError";
			userCategory;
			userMessage;
			/** Producer-supplied explanation; undefined selects the operation default. */
			detail;
			remediationAction;
			constructor(operation, reason, options) {
				super(`Browser observation ${operation} failed: ${reason}`, options);
				this.operation = operation;
				this.reason = reason;
				this.detail = options?.detail;
				this.userMessage = options?.detail ?? observationFailureMessage(operation, reason);
				this.remediationAction = options?.remediationAction;
				this.markCleanupIncomplete(this.cleanup !== undefined || reason === "cleanup_failed");
				this.setCleanupResources(this.cleanup?.resources ?? (reason === "cleanup_failed" ? ["browser_transport"] : []));
				this.userCategory = reason === "cancelled" || options?.cause instanceof AnalysisCancelledError || options?.cause instanceof AnalysisError && options.cause.userCategory === "cancelled" ? "cancelled" : undefined;
			}
			/**
			* Attribute this failure to the caller's operation without discarding
			* producer facts; the original cause keeps the primary failure chain intact.
			*/
			forOperation(operation) {
				if (operation === this.operation) return this;
				return new BrowserObservationError(operation, this.reason, {
					cause: this.cause,
					...this.detail === undefined ? {} : { detail: this.detail },
					...this.remediationAction === undefined ? {} : { remediationAction: this.remediationAction },
					cleanupPrimary: this.cleanupPrimary,
					diagnostics: this.diagnostics,
					capturedOutput: this.capturedOutput,
					cleanup: this.cleanup,
					partialObservation: this.partialObservation
				});
			}
		};
		observationFailureMessage = (operation, reason) => {
			if (reason === "cancelled") return `${operation} was cancelled. Collected observations and cleanup status are reported when available.`;
			if (reason === "timeout") return `${operation} exceeded its execution deadline. Review the target's responsiveness and retained observations before retrying.`;
			if (reason === "endpoint_unreachable") return `${operation} could not reach the selected loopback debugging endpoint. Verify that the target process is running with debugging enabled and that the endpoint's port matches it, then retry.`;
			if (reason === "target_not_found") return `${operation} could not find the selected target at the debugging endpoint. Refresh target discovery for that endpoint and retry with a returned target ID.`;
			if (reason === "target_session_detached") return `${operation} lost its debugging session while the target may still exist. Refresh target discovery and attach to the selected target again.`;
			if (reason === "target_changed") return `${operation} could not retain a stable document because the target changed during observation. Retry after navigation settles; refresh target discovery if the selected page was replaced.`;
			if (reason === "service_worker_blocked") return `${operation} refused the selected page because it is controlled by or has a registered service worker while the service-worker policy is block. Set environment.service_workers to allow to permit observation, or remove the service worker registration through the browser.`;
			if (reason === "disconnected") return `${operation} lost its debugging connection. Verify that the target process is still running, refresh target discovery, and retry the observation.`;
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/providerSelectionError.js
var ProviderSelectionError, providerSelectionDiagnostic, requestedProviderRepair, providerAvailabilityOnly, providerSelectionUserMessage;
function init_providerSelectionError() {
	return (init_providerSelectionError = __esmMin((() => {
		init_analysisErrorBase();
		ProviderSelectionError = class extends AnalysisError {
			_tag = "ProviderSelectionError";
			operation;
			reason;
			requestedProviderId;
			candidateIds;
			rejections;
			remediationAction;
			userMessage;
			constructor(options) {
				const operation = options.operation ?? "open_binary";
				super(providerSelectionDiagnostic(options), {
					capturedOutput: options.capturedOutput,
					diagnostics: options.diagnostics,
					partialObservation: options.partialObservation,
					...options.cause === undefined ? {} : { cause: options.cause }
				});
				this.operation = operation;
				this.reason = options.reason;
				this.requestedProviderId = options.requestedProviderId;
				this.candidateIds = [...options.candidateIds];
				this.rejections = [...options.rejections ?? []].map((rejection) => ({
					...rejection,
					diagnostics: structuredClone(rejection.diagnostics)
				}));
				this.remediationAction = options.remediationAction ?? requestedProviderRepair(options);
				this.userMessage = options.userMessage ?? providerSelectionUserMessage(options);
			}
		};
		providerSelectionDiagnostic = (options) => {
			const candidates = options.candidateIds.length === 0 ? "none" : options.candidateIds.join(", ");
			return `Analysis provider selection failed (${options.reason}) for ${options.requestedProviderId}; candidates: ${candidates}`;
		};
		requestedProviderRepair = (options) => options.reason === "provider_unavailable" ? options.rejections?.find(({ providerId, origin }) => providerId === options.requestedProviderId && origin === "availability")?.remediation : undefined;
		providerAvailabilityOnly = (rejections) => rejections !== undefined && rejections.length > 0 && rejections.every(({ origin }) => origin === "availability");
		providerSelectionUserMessage = (options) => {
			switch (options.reason) {
				case "ambiguous": return "Multiple analysis providers support this target. Choose one with provider_id, --provider, or REA_ANALYSIS_PROVIDER.";
				case "unknown_provider": return `The requested analysis provider is unknown. Choose one of: ${options.candidateIds.join(", ") || "no configured providers"}.`;
				case "provider_unavailable": return providerAvailabilityOnly(options.rejections) ? "Provider selection failed local readiness checks. No target-support refusal was reported. Review the local provider diagnostics or run `rea doctor`, then retry." : "The selected analysis provider is unavailable. Review the reported local diagnostics or run `rea doctor`, then retry.";
				case "target_unsupported": return "The selected analysis provider does not support this target. Choose another provider or open a supported extracted binary.";
				case "invalid_options": return "The analysis provider selection or open options are invalid. Correct them and try again.";
			}
		};
	})))();
}

//#endregion
//#region dist/domain/providerAdapterError.js
var ProviderAdapterError, closedAnalysisClientError;
function init_providerAdapterError() {
	return (init_providerAdapterError = __esmMin((() => {
		init_analysisErrorBase();
		ProviderAdapterError = class extends AnalysisError {
			providerId;
			operation;
			_tag = "ProviderAdapterError";
			userMessage;
			remediationAction;
			constructor(providerId, operation, options = {}) {
				super(`Provider ${providerId} adapter failed during ${operation}`, options);
				this.providerId = providerId;
				this.operation = operation;
				this.userMessage = options.userMessage;
				this.remediationAction = options.remediationAction;
			}
			get providerWide() {
				return true;
			}
		};
		closedAnalysisClientError = (providerId, operation) => new ProviderAdapterError(providerId, operation, {
			userMessage: `The ${providerId} analysis client for this session was closed before ${operation} ran.`,
			remediationAction: "Open the target again with open_binary, or rerun the CLI command, then send the request to the new session.",
			diagnostics: { reason: "client_closed" }
		});
	})))();
}

//#endregion
//#region dist/domain/doctorProviderIds.js
var DESKTOP_BUILD_PROVIDER_ID, DOCTOR_PROVIDER_IDS, DOCTOR_PROVIDER_ID_SET, isDoctorProviderId, isDesktopBuildCheck;
function init_doctorProviderIds() {
	return (init_doctorProviderIds = __esmMin((() => {
		DESKTOP_BUILD_PROVIDER_ID = "desktop_build";
		DOCTOR_PROVIDER_IDS = [
			"hopper",
			"ghidra",
			"ida",
			"jadx",
			"kuna",
			DESKTOP_BUILD_PROVIDER_ID
		];
		DOCTOR_PROVIDER_ID_SET = new Set(DOCTOR_PROVIDER_IDS);
		isDoctorProviderId = (providerId) => DOCTOR_PROVIDER_ID_SET.has(providerId);
		isDesktopBuildCheck = (name) => name.startsWith(`${DESKTOP_BUILD_PROVIDER_ID}-`);
	})))();
}

//#endregion
//#region dist/domain/analysisErrorRefusal.js
var analysisErrorRefusal;
function init_analysisErrorRefusal() {
	return (init_analysisErrorRefusal = __esmMin((() => {
		init_analysisErrorCore();
		init_artifactOperationError();
		analysisErrorRefusal = (error) => {
			if (error instanceof AnalysisResourceConstraintError) {
				if (error.fixedAllowance !== undefined) return {
					kind: "fixed_ceiling",
					operation: error.operation,
					ceiling: error.fixedAllowance
				};
				if (error.limit !== undefined && !("control_kind" in error.limit) && !("measuredExhaustion" in error.recovery && error.recovery.measuredExhaustion === true)) return {
					kind: "adjustable_budget",
					operation: error.operation,
					budget: error.limit
				};
				return undefined;
			}
			if (error instanceof ArtifactOperationError && error.fixedAllowance !== undefined) return {
				kind: "fixed_ceiling",
				operation: error.operation,
				ceiling: error.fixedAllowance
			};
			if (error instanceof AnalysisInputError && error.ambiguousSelector !== undefined) return {
				kind: "ambiguous_selector",
				operation: error.operation,
				selector: error.ambiguousSelector
			};
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/analysisErrorClassification.js
var RETRYABLE_CODES, classified, STATIC_ERROR_CLASSIFICATIONS, RETRYABLE_CAPABILITY_UNAVAILABLE, ARTIFACT_OPERATION_CLASSIFICATIONS, ARTIFACT_IDENTITY_MISMATCH, EVIDENCE_FILE_CLASSIFICATIONS, UNKNOWN_REGISTRY_CLASSIFICATIONS, PROVIDER_SELECTION_CLASSIFICATIONS, BINARY_TARGET_CLASSIFICATIONS, binaryTargetClassification, BROWSER_OBSERVATION_CLASSIFICATIONS, CANCELLED, PROCESS_CAPTURE_FAILED, staticClassification, classifyAnalysisError, catalogueRow, reasonRows, analysisErrorCatalogue;
function init_analysisErrorClassification() {
	return (init_analysisErrorClassification = __esmMin((() => {
		init_analysisErrorCore();
		init_analysisErrorBase();
		init_artifactOperationError();
		init_browserObservationError();
		init_configurationErrors();
		init_evidenceErrors();
		init_providerSelectionError();
		init_unknownRegistryError();
		RETRYABLE_CODES = new Set([
			"artifact_changed",
			"provider_timeout",
			"cancelled",
			"revision_conflict",
			"provider_unavailable"
		]);
		classified = (code, category) => ({
			code,
			category
		});
		STATIC_ERROR_CLASSIFICATIONS = {
			AnalysisProtocolError: classified("unreadable_output", "execution_failure"),
			AnalysisOutputError: classified("unreadable_output", "execution_failure"),
			AnalysisInputError: classified("invalid_request", "invalid_input"),
			AnalysisAccessDeniedError: classified("access_denied", "unavailable"),
			AnalysisArtifactChangedError: classified("artifact_changed", "integrity_mismatch"),
			AnalysisCapabilityUnavailableError: classified("capability_unavailable", "unsupported_provider"),
			AnalysisUnsupportedTargetError: classified("unsupported_target", "unsupported_target"),
			AnalysisCancelledError: classified("cancelled", "cancelled"),
			AnalysisTimeoutError: classified("provider_timeout", "timeout"),
			AnalysisResourceConstraintError: classified("resource_constraint", "resource_constraint"),
			ConfigurationError: classified("configuration_invalid", "invalid_input"),
			NoBinaryOpenError: classified("target_unavailable", "unavailable"),
			EvidenceIntegrityError: classified("evidence_integrity_mismatch", "integrity_mismatch"),
			ProviderAdapterError: classified("execution_failure", "execution_failure")
		};
		RETRYABLE_CAPABILITY_UNAVAILABLE = classified("capability_unavailable", "unavailable");
		ARTIFACT_OPERATION_CLASSIFICATIONS = {
			cancelled: classified("cancelled", "cancelled"),
			malformed: classified("invalid_request", "invalid_input"),
			truncated: classified("truncated", "truncated"),
			unsupported: classified("unsupported_target", "unsupported_target"),
			format: classified("artifact_operation_failed", "execution_failure"),
			integrity: classified("artifact_operation_failed", "integrity_mismatch"),
			limit: classified("truncated", "truncated"),
			path: classified("artifact_operation_failed", "execution_failure"),
			unavailable: classified("artifact_operation_failed", "unavailable"),
			io: classified("artifact_operation_failed", "execution_failure")
		};
		ARTIFACT_IDENTITY_MISMATCH = classified("artifact_integrity_mismatch", "integrity_mismatch");
		EVIDENCE_FILE_CLASSIFICATIONS = {
			"not-file": classified("invalid_request", "invalid_input"),
			exists: classified("invalid_request", "invalid_input"),
			"wrong-kind": classified("invalid_request", "invalid_input"),
			missing: classified("invalid_request", "invalid_input"),
			"symlink-traversal": classified("invalid_request", "invalid_input"),
			"invalid-json": classified("evidence_integrity_mismatch", "execution_failure"),
			"path-limit": classified("resource_constraint", "resource_constraint"),
			"storage-limit": classified("resource_constraint", "resource_constraint"),
			io: classified("execution_failure", "execution_failure")
		};
		UNKNOWN_REGISTRY_CLASSIFICATIONS = {
			"not-found": classified("execution_failure", "execution_failure"),
			"already-exists": classified("invalid_request", "invalid_input"),
			"revision-conflict": classified("revision_conflict", "execution_failure"),
			"invalid-transition": classified("execution_failure", "execution_failure"),
			integrity: classified("evidence_integrity_mismatch", "execution_failure"),
			limit: classified("truncated", "execution_failure"),
			constraint: classified("invalid_request", "invalid_input")
		};
		PROVIDER_SELECTION_CLASSIFICATIONS = {
			unknown_provider: classified("capability_unavailable", "unsupported_provider"),
			provider_unavailable: classified("provider_unavailable", "unavailable"),
			target_unsupported: classified("capability_unavailable", "unsupported_provider"),
			ambiguous: classified("capability_unavailable", "unsupported_provider"),
			invalid_options: classified("capability_unavailable", "unsupported_provider")
		};
		BINARY_TARGET_CLASSIFICATIONS = {
			unconstrained: classified("target_unavailable", "unavailable"),
			directory_requires_file: classified("target_unavailable", "unavailable"),
			wasm_requires_static_inspection: classified("target_unavailable", "unsupported_target"),
			file_format_rejected: classified("target_unavailable", "unsupported_target"),
			load_selection_rejected: classified("invalid_request", "invalid_input"),
			bundle_type_unsupported: classified("target_unavailable", "unsupported_target"),
			bundle_info_plist_decode_budget_exceeded: classified("target_unavailable", "unavailable"),
			bundle_info_plist_missing: classified("target_unavailable", "unavailable"),
			bundle_layout_ambiguous: classified("target_unavailable", "unavailable"),
			bundle_executable_undeclared: classified("target_unavailable", "unavailable"),
			bundle_program_missing: classified("target_unavailable", "unavailable"),
			bundle_current_version_missing: classified("target_unavailable", "unavailable"),
			bundle_path_escapes: classified("target_unavailable", "unavailable")
		};
		binaryTargetClassification = (constraint, readPermissionDenied) => {
			const base = BINARY_TARGET_CLASSIFICATIONS[constraint];
			return readPermissionDenied && constraint !== "load_selection_rejected" ? {
				...base,
				code: "access_denied"
			} : base;
		};
		BROWSER_OBSERVATION_CLASSIFICATIONS = {
			endpoint_unreachable: classified("provider_unavailable", "unavailable"),
			invalid_endpoint_response: classified("unreadable_output", "execution_failure"),
			target_not_found: classified("target_unavailable", "unavailable"),
			target_not_allowed: classified("target_unavailable", "unavailable"),
			application_already_running: classified("target_unavailable", "unavailable"),
			service_worker_blocked: classified("target_unavailable", "unavailable"),
			target_changed: classified("target_unavailable", "unavailable"),
			target_session_detached: classified("target_unavailable", "unavailable"),
			protocol_error: classified("unreadable_output", "execution_failure"),
			disconnected: classified("provider_unavailable", "unavailable"),
			payload_limit: classified("truncated", "truncated"),
			window_not_found: classified("unreadable_output", "execution_failure"),
			window_metadata_missing: classified("unreadable_output", "execution_failure"),
			process_ownership_unavailable: classified("unreadable_output", "execution_failure"),
			cleanup_failed: classified("execution_failure", "execution_failure"),
			cancelled: classified("cancelled", "cancelled"),
			timeout: classified("provider_timeout", "timeout")
		};
		CANCELLED = classified("cancelled", "cancelled");
		PROCESS_CAPTURE_FAILED = classified("process_capture_failed", "execution_failure");
		staticClassification = (error) => {
			const tag = domainErrorTag(error);
			if (tag === undefined) throw new TypeError(`Unpresented provider error: ${error._tag}`);
			switch (tag) {
				case "ArtifactOperationError":
				case "BinaryTargetError":
				case "BrowserObservationError":
				case "EvidenceFileError":
				case "ProcessCaptureError":
				case "ProviderSelectionError":
				case "UnknownRegistryError": throw new TypeError(`Unhandled specialized analysis error: ${tag}`);
				default: return STATIC_ERROR_CLASSIFICATIONS[tag];
			}
		};
		classifyAnalysisError = (error) => {
			const owned = error.ownPresentation();
			if (owned !== undefined) return {
				code: owned.code,
				category: owned.category
			};
			if (error instanceof AnalysisCapabilityUnavailableError && error.retryable) return RETRYABLE_CAPABILITY_UNAVAILABLE;
			if (error instanceof ProviderSelectionError) return PROVIDER_SELECTION_CLASSIFICATIONS[error.reason];
			if (error instanceof BrowserObservationError) return error.userCategory === "cancelled" ? CANCELLED : BROWSER_OBSERVATION_CLASSIFICATIONS[error.reason];
			if (error instanceof ArtifactOperationError) return error.reason === "integrity" && error.artifactDetails !== undefined ? ARTIFACT_IDENTITY_MISMATCH : ARTIFACT_OPERATION_CLASSIFICATIONS[error.reason];
			if (error instanceof BinaryTargetError) return binaryTargetClassification(error.constraint ?? "unconstrained", error.systemCode !== undefined);
			if (error instanceof EvidenceFileError) return EVIDENCE_FILE_CLASSIFICATIONS[error.reason];
			if (error instanceof UnknownRegistryError) return UNKNOWN_REGISTRY_CLASSIFICATIONS[error.reason];
			if (error._tag === "ProcessCaptureError") return error.userCategory === "cancelled" ? CANCELLED : PROCESS_CAPTURE_FAILED;
			return staticClassification(error);
		};
		catalogueRow = (tag, discriminant, classification, retryableByDefault = RETRYABLE_CODES.has(classification.code)) => ({
			tag,
			discriminant,
			...classification,
			retryableByDefault
		});
		reasonRows = (tag, table) => Object.entries(table).map(([reason, classification]) => catalogueRow(tag, `reason=${reason}`, classification));
		analysisErrorCatalogue = () => [
			...Object.entries(STATIC_ERROR_CLASSIFICATIONS).map(([tag, classification]) => catalogueRow(tag, "", classification)),
			catalogueRow("AnalysisCapabilityUnavailableError", "retryable=true", RETRYABLE_CAPABILITY_UNAVAILABLE, true),
			...reasonRows("ArtifactOperationError", ARTIFACT_OPERATION_CLASSIFICATIONS),
			catalogueRow("ArtifactOperationError", "reason=integrity; artifact identity reported", ARTIFACT_IDENTITY_MISMATCH),
			...Object.keys(BINARY_TARGET_CLASSIFICATIONS).flatMap((key) => {
				const constraint = key;
				const allowed = binaryTargetClassification(constraint, false);
				const denied = binaryTargetClassification(constraint, true);
				return [catalogueRow("BinaryTargetError", `constraint=${constraint}`, allowed), ...denied.code === allowed.code ? [] : [catalogueRow("BinaryTargetError", `constraint=${constraint}; read permission denied`, denied)]];
			}),
			...reasonRows("BrowserObservationError", BROWSER_OBSERVATION_CLASSIFICATIONS),
			catalogueRow("BrowserObservationError", "caused by cancellation", CANCELLED),
			...reasonRows("EvidenceFileError", EVIDENCE_FILE_CLASSIFICATIONS),
			catalogueRow("ProcessCaptureError", "", PROCESS_CAPTURE_FAILED),
			catalogueRow("ProcessCaptureError", "caused by cancellation", CANCELLED),
			...reasonRows("ProviderSelectionError", PROVIDER_SELECTION_CLASSIFICATIONS),
			...reasonRows("UnknownRegistryError", UNKNOWN_REGISTRY_CLASSIFICATIONS)
		];
	})))();
}

//#endregion
//#region dist/domain/analysisRefusal.js
var fieldName, UNCHANGED, adjustableBudgetRemediation, analysisRefusalRemediation, analysisRefusalMessage, analysisRefusalDetails;
function init_analysisRefusal() {
	return (init_analysisRefusal = __esmMin((() => {
		init_analysisSettingDefinitions();
		init_fixedAllowanceRemediation();
		fieldName = (field) => field.map(String).join(".");
		UNCHANGED = "Repeating the unchanged request is not expected to succeed.";
		adjustableBudgetRemediation = (operation, budget, callerLifetime) => {
			const { unit, minimum, maximum, effective_value: value, required_value: required } = budget;
			const control = budget.parameter ?? budget.setting;
			const range = `${String(minimum)}..${String(maximum)} ${unit}`;
			const effective = value === null ? `The effective ${control} value is unknown` : `${operation} reached its ${control} budget of ${String(value)} ${unit}${budget.source === undefined ? "" : ` (source ${budget.source})`}`;
			if (value !== null && value >= maximum) return `${effective}. ${control} is already at its maximum (${range}); narrow the request or select a smaller input. ${UNCHANGED}`;
			if (required !== undefined && required > maximum) return `${effective}. The request requires ${String(required)} ${unit}, above the ${control} maximum (${range}); narrow the request or select a smaller input. ${UNCHANGED}`;
			const environment = analysisSettingDefinition(budget.setting).environment;
			const change = budget.parameter !== undefined && (budget.update_mode === "parameter" || callerLifetime === "invocation" && environment === undefined) ? `Pass a larger ${budget.parameter} on the next ${operation} call` : callerLifetime === "invocation" ? `Set ${environment ?? budget.setting} for the next invocation` : budget.update_mode === "runtime" ? `Raise ${budget.setting} with update_analysis_settings` : `Set ${environment ?? budget.setting} in the environment that starts REA, then restart REA`;
			const atLeast = required === undefined ? "" : `at least ${String(required)} ${unit}; `;
			return `${effective}. ${change} (${atLeast}range ${range}), then retry.`;
		};
		analysisRefusalRemediation = (refusal, callerLifetime = "continuing") => {
			switch (refusal.kind) {
				case "fixed_ceiling": {
					const { ceiling } = refusal;
					const base = fixedAllowanceRemediation(ceiling.name, ceiling.kind);
					const value = ceiling.limit === undefined || ceiling.unit === undefined ? "" : ` The allowance is ${String(ceiling.limit)} ${ceiling.unit}; this release has no runtime override.`;
					return ceiling.narrowing === undefined ? `${base}${value}` : `${base}${value} ${ceiling.narrowing}`;
				}
				case "adjustable_budget": return adjustableBudgetRemediation(refusal.operation, refusal.budget, callerLifetime);
				case "ambiguous_selector": {
					const { field, candidates } = refusal.selector;
					return `Set ${fieldName(field)} to exactly one of the ${String(candidates.length)} candidates in details.refusal.candidates, then retry ${refusal.operation}. ${UNCHANGED}`;
				}
			}
		};
		analysisRefusalMessage = (refusal) => refusal.kind === "ambiguous_selector" ? `${fieldName(refusal.selector.field)} matches ${String(refusal.selector.candidates.length)} candidates; ${refusal.operation} needs exactly one.` : undefined;
		analysisRefusalDetails = (refusal) => {
			switch (refusal.kind) {
				case "fixed_ceiling": {
					const { ceiling } = refusal;
					return {
						kind: refusal.kind,
						operation: refusal.operation,
						allowance: ceiling.name,
						allowance_kind: ceiling.kind,
						...ceiling.limit === undefined ? {} : { limit: ceiling.limit },
						...ceiling.unit === undefined ? {} : { unit: ceiling.unit },
						...ceiling.narrowing === undefined ? {} : { narrowing: ceiling.narrowing }
					};
				}
				case "adjustable_budget": {
					const { budget } = refusal;
					return {
						kind: refusal.kind,
						operation: refusal.operation,
						control: budget.parameter ?? budget.setting,
						setting: budget.setting,
						effective_value: budget.effective_value,
						unit: budget.unit,
						range: {
							minimum: budget.minimum,
							maximum: budget.maximum
						},
						...budget.required_value === undefined ? {} : { required_value: budget.required_value }
					};
				}
				case "ambiguous_selector": return {
					kind: refusal.kind,
					operation: refusal.operation,
					field: [...refusal.selector.field],
					candidates: [...refusal.selector.candidates]
				};
			}
		};
	})))();
}

//#endregion
//#region dist/domain/analysisErrorPresentation.js
var UNRETAINED_EVIDENCE_EXPORT_GUIDANCE, MCP_TRANSPORT_EVIDENCE_EXPORT, MCP_TRANSPORT_EVIDENCE_DISCOVERY, MCP_TRANSPORT_EVIDENCE_RECORDS, MCP_TRANSPORT_EVIDENCE_LINKS, analysisErrorRemediationAction, measuredResourceRemediation, analysisErrorCategory, analysisErrorUserMessage, analysisErrorUserMessageParts, hasAnalysisContinuingCallerGuidance, hasAuthoredRemediation, composedCallerGuidance, outcomeUserMessage, unclassifiedProviderRemediation, standardErrorMessage, timeoutUserMessage, timeoutRemediation, UNREADABLE_OUTPUT_TAGS, UNSUPPORTED_PROVIDER_TAGS, CANCELLED_TAGS, INTEGRITY_POLICY_OPERATIONS, artifactMessage, mergeRelatedList, presentedRelatedInputs, analysisErrorRelatedInputs, evidenceFileMessage, KNOWN_ERROR_TAGS, assertKnownAnalysisError;
function init_analysisErrorPresentation() {
	return (init_analysisErrorPresentation = __esmMin((() => {
		init_residualUnknownGraphError();
		init_inputArgumentGuidance();
		init_analysisErrorCore();
		init_artifactOperationError();
		init_appleBundleTypes();
		init_configurationErrors();
		init_browserObservationError();
		init_evidenceErrors();
		init_providerSelectionError();
		init_providerAdapterError();
		init_doctorProviderIds();
		init_unknownRegistryError();
		init_analysisErrorRefusal();
		init_analysisErrorClassification();
		init_analysisRefusal();
		init_analysisErrorBase();
		UNRETAINED_EVIDENCE_EXPORT_GUIDANCE = "Unretained Evidence is not included in the exported investigation; if present in this response, save it separately.";
		MCP_TRANSPORT_EVIDENCE_EXPORT = "Export complete retained session evidence through export_evidence_bundle to a caller-selected path, or use complete CLI JSON output. The connection remains usable.";
		MCP_TRANSPORT_EVIDENCE_DISCOVERY = `Discover retained records with get_evidence_bundle and detail: summary, then read selected complete records with detail: records and an exact evidence_id, or inspect compatible records through inspect_analysis_view using an exact Evidence reference. ${MCP_TRANSPORT_EVIDENCE_EXPORT}`;
		MCP_TRANSPORT_EVIDENCE_RECORDS = `Request fewer records with get_evidence_bundle detail: records, a smaller limit or an exact evidence_id filter; inspect compatible records in pages through inspect_analysis_view. A single record larger than one response needs export. ${MCP_TRANSPORT_EVIDENCE_EXPORT}`;
		MCP_TRANSPORT_EVIDENCE_LINKS = "Request fewer rows with get_evidence_bundle detail: links, a smaller limit or an exact evidence_id filter, then follow next_offset.";
		analysisErrorRemediationAction = (error, callerLifetime = "continuing") => {
			error = resolvedAnalysisError(error);
			const continuing = callerLifetime === "continuing" ? error.continuingCallerGuidance?.remediationAction ?? error.ownPresentation()?.continuing?.remediationAction : undefined;
			if (continuing !== undefined) return continuing;
			const owned = error.ownPresentation()?.remediation;
			if (owned !== undefined) return owned;
			if ((error instanceof ProviderAdapterError || error instanceof AnalysisCapabilityUnavailableError) && error.remediationAction !== undefined) return error.remediationAction;
			if (error instanceof ProviderAdapterError && error.userMessage === undefined) return unclassifiedProviderRemediation(error.providerId);
			if (error instanceof BrowserObservationError && error.remediationAction !== undefined) return error.remediationAction;
			if (error instanceof BrowserObservationError && error.reason === "service_worker_blocked") return "Set environment.service_workers to allow to permit this capture, or remove the service worker registration through the browser. REA never removes existing registrations.";
			if (error instanceof AnalysisCapabilityUnavailableError && error.retryable) return "Review details.reason, then retry the same analysis after the condition clears.";
			if (error instanceof AnalysisCapabilityUnavailableError && error.fallbackRemediationAction !== undefined) return error.fallbackRemediationAction;
			if (error instanceof EvidenceFileError && error.published !== undefined) return error.published.path === undefined ? "Resolve the reported staging cleanup failure. Publication completed; its path identity is excluded." : "Use the published file at details.published_path and resolve the reported staging cleanup failure.";
			if (error instanceof ProviderSelectionError && error.remediationAction !== undefined) return error.remediationAction;
			if (error instanceof ResourceSnapshotMismatchError) return error.operation === "export" ? "Call close_binary without snapshot_path to close this resource-only session." : "Open an executable analysis target before importing a binary analysis snapshot.";
			if (error instanceof AnalysisSnapshotMismatchError) return "Select an artifact, provider, and analysis profile matching the snapshot, or run analysis without it and save a fresh snapshot for the intended binding.";
			if (error instanceof AnalysisUnsupportedTargetError) return error.remediationAction ?? "Select a target supported by this operation or choose an operation supporting the reported target format.";
			if (error instanceof AnalysisResourceConstraintError) {
				if (error.remediationAction !== undefined) return error.remediationAction;
				const refusal = analysisErrorRefusal(error);
				return refusal === undefined ? measuredResourceRemediation(error.resource) : analysisRefusalRemediation(refusal, callerLifetime);
			}
			if (error instanceof AnalysisTimeoutError && error.remediationAction !== undefined) return error.remediationAction;
			if (error instanceof AnalysisTimeoutError) return timeoutRemediation(error);
			if (error instanceof ArtifactOperationError && error.remediationAction !== undefined) return error.remediationAction;
			if (error instanceof ArtifactOperationError) {
				const refusal = analysisErrorRefusal(error);
				if (refusal !== undefined) return analysisRefusalRemediation(refusal, callerLifetime);
			}
			if (error instanceof ArtifactOperationError && error.readerLimit !== undefined) return error.userMessage ?? error.detail ?? error.message;
			if (error instanceof ArtifactOperationError && error.reason === "limit" && error.boundary === "capacity") return "Use an artifact within the capacity reported in details.detail. Changing output detail or retrying the unchanged input does not remove this boundary.";
			if (error instanceof EvidenceReferenceError) return error.reason === "missing" && error.referenceScope === "retained-closure" ? "Import the originating Evidence bundle with the selected records and their complete linked sources into the current investigation, or re-run their producers there. Retry after the required records are retained. reset_investigation clears retained records; close_binary preserves them." : "Use an exact Evidence reference available from the selected source, supply the complete inline Evidence, re-run its producer, or select/import its Evidence bundle. reset_investigation clears retained records; close_binary preserves them.";
			if (error instanceof BinaryTargetError && error.remediationAction !== undefined) return error.remediationAction;
			if (error instanceof BinaryTargetError && error.constraint === "directory_requires_file") return `For a JavaScript/Electron application directory, call analyze_javascript_application with input_path. For binary analysis, select its executable file or an Apple bundle directory (${OPENABLE_APPLE_BUNDLE_TYPES_TEXT}).`;
			if (error instanceof BinaryTargetError && error.constraint === "bundle_type_unsupported") return `Select the bundle's program file directly, or open a bundle directory of a supported type (${OPENABLE_APPLE_BUNDLE_TYPES_TEXT}).`;
			if (error instanceof BinaryTargetError && (error.constraint === "bundle_executable_undeclared" || error.constraint === "bundle_program_missing") && error.infoPlist !== undefined) return `Read ${error.infoPlist} with inspect_plist to review its CFBundleExecutable, then select an existing program file directly.`;
			if (error instanceof BinaryTargetError && error.constraint === "bundle_info_plist_decode_budget_exceeded") return `Reduce the Info.plist below the ${16} MiB decoded representation allowance, then retry opening the bundle.`;
			if (error instanceof BinaryTargetError && (error.constraint === "bundle_info_plist_missing" || error.constraint === "bundle_layout_ambiguous" || error.constraint === "bundle_current_version_missing" || error.constraint === "bundle_path_escapes")) return "Review the bundle paths listed in details, then select the bundle's program file directly or repair the bundle layout.";
			if (error instanceof BinaryTargetError && error.constraint === "load_selection_rejected") return "Correct the reported load argument (format, architecture, or entry_point) and retry.";
			if (error instanceof BinaryTargetError && error.constraint === "file_format_rejected") return "Review the reported file-format reason and select a supported, well-formed target.";
			if (error instanceof BinaryTargetError && error.constraint === "wasm_requires_static_inspection") return `For static inspection, call inspect_wasm_artifact with ${JSON.stringify({ path: error.path })}. This separate lane requires caller-supplied WABT 1.0.42 via absolute REA_WABT_BIN_DIRECTORY; check its availability in binary_session. REA does not execute WASM or install tools, and the header alone does not establish that the complete module is valid.`;
			if (error instanceof AnalysisAccessDeniedError || error instanceof BinaryTargetError && error.systemCode !== undefined) return "Check the current process's read access to the selected path. Retry with a readable local file.";
			if (error instanceof AnalysisArtifactChangedError) return "Wait until the selected file is stable. For an active binary session, reopen the target with open_binary before retrying so REA acquires its current identity; for a CLI command or target-free tool, rerun the operation.";
			if (error instanceof ConfigurationError) return error.remediationAction ?? (error.settings.length > 0 ? `Correct ${[...new Set(error.settings.map(({ setting }) => setting))].join(", ")} in the environment that starts REA (your shell or the MCP client's registration), then rerun.` : analysisErrorUserMessage(error));
			if (error instanceof AnalysisInputError) {
				const refusal = analysisErrorRefusal(error);
				if (error.remediationAction === undefined && refusal !== undefined) return analysisRefusalRemediation(refusal, callerLifetime);
				const mistakeRemediation = knownArgumentMistakeRemediation(error.operation, error.issues);
				const baseAction = error.remediationAction ?? `Read the declared input schema or CLI usage for ${error.operation}; if using MCP and the catalog may be stale, call tools/list. Correct the listed fields, then retry. Do not repeat the unchanged call.`;
				return mistakeRemediation === undefined ? baseAction : `${mistakeRemediation} ${baseAction}`;
			}
			if (error instanceof AnalysisOutputError && error.remediationAction !== undefined) return error.remediationAction;
			if (error instanceof UnknownRegistryError && error.reason === "constraint" && error.constraint !== undefined) {
				const suffix = " Do not repeat the unchanged call.";
				switch (error.constraint.kind) {
					case "missing_evidence": return "Use an Evidence ID retained in this session; obtain or import the missing Evidence before referencing it." + suffix;
					case "missing_unknown": return "Use an unknown_id retained in this session; create or import the related unknown before referencing it." + suffix;
					case "resolution_unproven": return "Supply supporting non-mutation Evidence matching the unknown's required authority, confidence and environment, or withdraw the unsupported resolution." + suffix;
					case "contradicting_evidence": return "Reconcile the contradicting Evidence before claiming a verified resolution." + suffix;
					case "dependency_cycle": return "Correct the depends-on relationships to remove the dependency cycle." + suffix;
					case "history_gap":
					case "revision_chain": break;
				}
			}
			if (error instanceof UnknownRegistryError && error.reason === "not-found") return "Check that the unknown_id belongs to this session, then retry.";
			return analysisErrorUserMessage(error);
		};
		measuredResourceRemediation = (resource) => {
			switch (resource) {
				case "capacity": return "Wait for an active analysis to complete, then retry within the reported admission limits.";
				case "transport": return MCP_TRANSPORT_EVIDENCE_DISCOVERY;
				case "cpu": return "Review the reported worker CPU limits and observed signal. Retry with sufficient CPU time or a smaller artifact; REA retains tighter inherited limits.";
				case "file-size": return "Review the reported worker file-size limits and write failure. Retry with a sufficient file-size allowance for the evidence reply; REA retains tighter inherited limits.";
				case "memory": return "Review the reported worker memory limits and available host memory. Retry with sufficient memory or a smaller artifact; REA retains tighter inherited limits.";
			}
		};
		analysisErrorCategory = (error) => classifyAnalysisError(primaryAnalysisError(error)).category;
		analysisErrorUserMessage = (error, callerLifetime = "continuing") => {
			const { outcome, continuing } = analysisErrorUserMessageParts(error);
			return callerLifetime === "invocation" || continuing === undefined ? outcome : `${outcome} ${continuing}`;
		};
		analysisErrorUserMessageParts = (error) => {
			error = resolvedAnalysisError(error);
			const outcome = outcomeUserMessage(error);
			const continuing = error.continuingCallerGuidance?.userMessage ?? error.ownPresentation()?.continuing?.userMessage;
			return continuing === undefined ? { outcome } : {
				outcome,
				continuing
			};
		};
		hasAnalysisContinuingCallerGuidance = (error) => error.continuingCallerGuidance !== undefined || error.ownPresentation()?.continuing !== undefined;
		hasAuthoredRemediation = (error, callerLifetime) => callerLifetime === "continuing" && error.continuingCallerGuidance?.remediationAction !== undefined || "remediationAction" in error && typeof error.remediationAction === "string" || error instanceof AnalysisCapabilityUnavailableError && error.fallbackRemediationAction !== undefined;
		composedCallerGuidance = (sources) => {
			const message = sources.message === undefined ? undefined : analysisErrorUserMessageParts(sources.message);
			const remediationOwner = (lifetime) => hasAuthoredRemediation(sources.remediation, lifetime) ? sources.remediation : sources.message !== undefined && hasAuthoredRemediation(sources.message, lifetime) ? sources.message : sources.remediation;
			const remediationAction = analysisErrorRemediationAction(remediationOwner("invocation"), "invocation");
			const continuingRemediation = analysisErrorRemediationAction(remediationOwner("continuing"));
			const continuingCallerGuidance = {
				...message?.continuing === undefined ? {} : { userMessage: message.continuing },
				...continuingRemediation === remediationAction ? {} : { remediationAction: continuingRemediation }
			};
			return {
				...message === undefined ? {} : { userMessage: message.outcome },
				remediationAction,
				...Object.keys(continuingCallerGuidance).length === 0 ? {} : { continuingCallerGuidance }
			};
		};
		outcomeUserMessage = (error) => {
			if (error instanceof AnalysisSnapshotMismatchError) return error.message;
			if (error instanceof AnalysisUnsupportedTargetError) return error.message;
			if (error instanceof AnalysisResourceConstraintError) return error.reason;
			if (error instanceof AnalysisAccessDeniedError) return "Host filesystem permissions denied read access to the selected path.";
			if (error instanceof AnalysisArtifactChangedError) return "The selected artifact changed during acquisition; no stable snapshot was decoded.";
			if (error instanceof AnalysisInputError) {
				const refusal = analysisErrorRefusal(error);
				return error.userMessage ?? (refusal === undefined ? undefined : analysisRefusalMessage(refusal)) ?? "Analysis input is invalid. Check the arguments and try again.";
			}
			if (error instanceof AnalysisTimeoutError) return error.userMessage ?? timeoutUserMessage(error);
			const ownedMessage = error.ownPresentation()?.message;
			if (ownedMessage !== undefined) return ownedMessage;
			if (error.userMessage !== undefined) return error.userMessage;
			if (error instanceof AnalysisCapabilityUnavailableError && error.retryable) return "Required runtime controls are unavailable for this attempt.";
			if (error instanceof ProviderAdapterError) return `The ${error.providerId} provider could not complete ${error.operation}, and REA did not classify the failure. Any reason the provider reported is in details.diagnostics.`;
			const standardMessage = standardErrorMessage(error);
			if (standardMessage !== undefined) return standardMessage;
			if (error instanceof ArtifactOperationError) return artifactMessage(error);
			if (error instanceof EvidenceReferenceError) return error.reason === "missing" ? error.referenceScope === "retained-closure" ? `Evidence ${error.evidenceId} is missing from the required retained Evidence closure in the current investigation. Import its originating bundle or re-create the required observations before retrying.` : `Evidence ${error.evidenceId} is not available from the selected source. Supply complete inline Evidence, re-run its producer, or select/import its bundle before using this reference.` : `Evidence ${error.evidenceId} does not match the requested reference (${error.reason}). Check the expected and actual identity in the diagnostic details.`;
			if (error instanceof EvidenceIntegrityError) return "Evidence is invalid or has changed. Recreate or re-import it, then try again.";
			if (error instanceof EvidenceFileError) return evidenceFileMessage(error);
			if (error instanceof UnknownRegistryError && error.reason === "already-exists") return "This residual unknown already exists in the session. Reuse it or call update_unknown with its current expected_revision; do not repeat record_unknown.";
			if (error instanceof UnknownRegistryError && error.reason === "not-found") return "The requested residual unknown does not exist in this session. Check the unknown_id and try again.";
			if (error instanceof UnknownRegistryError && error.constraint !== undefined) return describeResidualUnknownGraphConstraint(error.constraint);
			if (error instanceof UnknownRegistryError) return "Evidence state changed before the update completed. Refresh the current state and try again.";
			if (error instanceof ConfigurationError) return error.settings.length === 0 ? "REA configuration is invalid. Run `rea doctor` and fix the reported setting." : `REA configuration is invalid: ${error.settings.map(({ setting, constraint }) => constraint.includes(setting) ? constraint.replace(/\.$/u, "") : `${setting}: ${constraint}`).join("; ")}.`;
			if (error instanceof NoBinaryOpenError) return error.message;
			if (error instanceof BinaryTargetError && error.constraint === "wasm_requires_static_inspection") return `${error.message}. Static WebAssembly inspection uses a separate optional WABT lane, not a native analysis engine.`;
			if (error instanceof BinaryTargetError) return error.constraint === "directory_requires_file" ? `open_binary accepts files and Apple bundle directories (${OPENABLE_APPLE_BUNDLE_TYPES_TEXT}). This target is another directory; JavaScript/Electron application directories can be analyzed directly with analyze_javascript_application.` : error.constraint === undefined ? `${error.message}. Check that the path exists, is readable, and points to a supported file.` : `${error.message}.`;
			if (error._tag === "ProcessCaptureError") return error.userMessage ?? "Process capture could not complete. Review the reported details and capture policy, then try again.";
			return "Analysis could not complete, and REA did not classify the failure. Review the reported details.";
		};
		unclassifiedProviderRemediation = (providerId) => isDoctorProviderId(providerId) ? `Review the reported details. If the ${providerId} installation or configuration may be at fault, run \`rea doctor --provider ${providerId}\` and apply its fixes. Repeating the unchanged request is not expected to succeed.` : "Review the reported details for the provider's reason; REA has no specific recovery for this unclassified failure. Repeating the unchanged request is not expected to succeed.";
		standardErrorMessage = (error) => {
			const tag = error._tag;
			const code = error.ownPresentation()?.code;
			if (UNREADABLE_OUTPUT_TAGS.has(tag) || code === "unreadable_output") return "Analysis returned a result REA could not read. Review the reported details; repeating the unchanged request is not expected to succeed.";
			if (UNSUPPORTED_PROVIDER_TAGS.has(tag)) return "This analysis is unavailable for the current target. Choose another analysis or target.";
			if (CANCELLED_TAGS.has(tag) || code === "cancelled") return "Analysis was cancelled. Start it again when ready.";
			return undefined;
		};
		timeoutUserMessage = (error) => `REA's ${error.operation} operation reached its ${String(error.timeoutMs)}ms server/provider deadline. This is not a client-side timeout; extending only the MCP client's deadline does not change this budget.`;
		timeoutRemediation = (error) => `Inspect any partial Evidence, provider diagnostics and reported session/provider cleanup state for ${error.operation}. Reduce the request if supported, or resolve the reported provider condition before retrying. Do not repeat the unchanged call or retry while work or cleanup may still be active.`;
		UNREADABLE_OUTPUT_TAGS = new Set(["AnalysisProtocolError", "AnalysisOutputError"]);
		UNSUPPORTED_PROVIDER_TAGS = new Set(["AnalysisCapabilityUnavailableError", "ProviderSelectionError"]);
		CANCELLED_TAGS = new Set(["AnalysisCancelledError"]);
		INTEGRITY_POLICY_OPERATIONS = new Set([
			"inventory_artifact",
			"inspect_artifact",
			"extract_artifact",
			"analyze_javascript_application"
		]);
		artifactMessage = ({ operation, reason, artifactDetails: details, detail }) => {
			if (reason === "cancelled") return "Artifact operation was cancelled. Start it again when ready.";
			if (reason === "limit") return detail ?? "Artifact processing reached a resource limit. Select an artifact within the reported limits and retry.";
			if (reason === "unsupported") return "Artifact structure uses an unsupported format or revision. Use a decoder that supports the reported form.";
			if (reason === "truncated") return "A declared artifact structure is truncated. Select a complete copy and retry; do not pad or truncate required bytes.";
			if (reason === "malformed") return "Artifact bytes contain malformed format structure. Review the reported field and select a valid copy.";
			if (reason === "path") return detail ?? "Artifact contains a conflicting internal path. Inspect the reported path before retrying.";
			if (reason === "unavailable" && details?.unpacked === true) return `ASAR unpacked companion bytes are unavailable for ${details.logicalPath}. Select the archive in place with its .unpacked directory beside it, then retry.`;
			if (reason === "unavailable") return "Artifact processing is unavailable. Review the reported availability reason and resolve that condition before retrying.";
			if (reason === "integrity" && details !== undefined && INTEGRITY_POLICY_OPERATIONS.has(operation)) return `${details?.unpacked === true && "calculatedSha256" in details && details.calculatedSha256 !== null ? `Declared ASAR integrity for unpacked entry ${details.logicalPath} contradicts its companion file; packaging tools commonly sign or strip unpacked native binaries after writing the archive.` : "Artifact bytes contradict declared integrity."} If expected, rerun ${operation === "inventory_artifact" ? "inspect_artifact" : operation} with integrity_policy=record-and-continue to retain observed bytes as untrusted; otherwise get a fresh copy.`;
			if (reason === "format" || reason === "integrity") return "Artifact is invalid or has changed. Get a fresh copy and try again.";
			return "Artifact could not be read or written. Check file access and try again.";
		};
		mergeRelatedList = (left, right) => {
			const merged = [...new Set([...left ?? [], ...right ?? []])];
			return merged.length === 0 ? undefined : merged;
		};
		presentedRelatedInputs = (error) => {
			if (error instanceof BinaryTargetError) {
				if (error.constraint === "directory_requires_file") return { operations: ["analyze_javascript_application"] };
				if (error.remediationAction !== undefined) return undefined;
				if ((error.constraint === "bundle_executable_undeclared" || error.constraint === "bundle_program_missing") && error.infoPlist !== undefined) return { operations: ["inspect_plist"] };
				if (error.constraint === "load_selection_rejected") return { parameters: [
					"format",
					"architecture",
					"entry_point"
				] };
				if (error.constraint === "wasm_requires_static_inspection") return { operations: ["inspect_wasm_artifact"] };
			}
			if (error instanceof ArtifactOperationError && error.reason === "integrity" && error.artifactDetails !== undefined && INTEGRITY_POLICY_OPERATIONS.has(error.operation)) return {
				parameters: ["integrity_policy"],
				...error.operation === "inventory_artifact" ? { operations: ["inspect_artifact"] } : {}
			};
			return undefined;
		};
		analysisErrorRelatedInputs = (error) => {
			error = resolvedAnalysisError(error);
			const presented = presentedRelatedInputs(error);
			const parameters = mergeRelatedList(error.related?.parameters, presented?.parameters);
			const operations = mergeRelatedList(error.related?.operations, presented?.operations);
			if (parameters === undefined && operations === undefined) return undefined;
			return {
				...parameters === undefined ? {} : { parameters },
				...operations === undefined ? {} : { operations }
			};
		};
		evidenceFileMessage = ({ operation, reason, published, systemCode }) => {
			if (published !== undefined) return "The output file was published, but staging cleanup remains incomplete.";
			if (reason === "path-limit") return "Filesystem path-length constraints prevented reading or atomic publication at the selected path. Choose a shorter local path.";
			if (reason === "storage-limit") return systemCode === "EFBIG" ? "The host file-size limit prevented Evidence publication. Increase the inherited file-size allowance and retry." : systemCode === undefined ? "A host filesystem resource limit prevented Evidence publication. Check the file-size allowance, filesystem space and quota before retrying." : "The filesystem lacks space or quota for Evidence publication. Free space or increase quota and retry.";
			if (reason === "symlink-traversal") return "The selected path cannot be resolved because its symbolic-link chain loops or exceeds the host traversal limit. Repair the chain or select another path.";
			if (reason === "missing") return operation === "read" ? "Evidence file does not exist at the selected path. Check the path and try again." : "Evidence output directory does not exist. Choose an existing directory and try again.";
			if (reason === "not-file") return "Evidence path does not point to a regular file. Choose a file and try again.";
			if (reason === "exists") return "Evidence file already exists. Choose another path or allow overwrite.";
			if (reason === "invalid-json") return "Evidence file is not valid JSON. Repair or recreate the file and try again.";
			return "Evidence file could not be accessed. Check file permissions and try again.";
		};
		KNOWN_ERROR_TAGS = {
			AnalysisProtocolError: true,
			AnalysisInputError: true,
			AnalysisAccessDeniedError: true,
			AnalysisArtifactChangedError: true,
			AnalysisOutputError: true,
			AnalysisCapabilityUnavailableError: true,
			AnalysisUnsupportedTargetError: true,
			AnalysisCancelledError: true,
			AnalysisTimeoutError: true,
			AnalysisResourceConstraintError: true,
			ProviderSelectionError: true,
			ProviderAdapterError: true,
			BrowserObservationError: true,
			ArtifactOperationError: true,
			ProcessCaptureError: true,
			EvidenceIntegrityError: true,
			EvidenceFileError: true,
			UnknownRegistryError: true,
			ConfigurationError: true,
			NoBinaryOpenError: true,
			BinaryTargetError: true
		};
		assertKnownAnalysisError = (error) => {
			if (error instanceof ProviderOwnedAnalysisError) return;
			const tag = domainErrorTag(error);
			if (tag === undefined || KNOWN_ERROR_TAGS[tag] !== true) throw new TypeError("Unknown analysis error tag");
		};
	})))();
}

//#endregion
//#region dist/domain/analysisErrorProjection.js
/** Enumerate recoveries owned by this projection, including secondary failures. */
function* unretainedEvidenceCandidates(projected, secondaryPath = []) {
	for (const field of ["partial_observation", "completed_observation"]) {
		const value = projected.details?.[field];
		if (isRecord(value) && (value.kind === "unretained-evidence" || value.kind === "unretained-observation" || value.kind === "inline-evidence")) yield {
			field,
			secondaryPath,
			value
		};
	}
	const secondary = projected.details?.secondary_failures;
	if (!Array.isArray(secondary)) return;
	for (const [index, failure] of secondary.entries()) {
		if (typeof failure !== "object" || failure === null || Array.isArray(failure)) continue;
		const remediation = failure.remediation;
		if (typeof remediation !== "object" || remediation === null || Array.isArray(remediation) || typeof remediation.action !== "string") continue;
		yield* unretainedEvidenceCandidates(failure, [...secondaryPath, index]);
	}
}
var relatedInputDetails, projectAnalysisError, projectAnalysisErrorWithoutCapturedOutput, projectAnalysisErrorWithoutPartialObservation, omitUnretainedEvidenceFromError, recoveryOmissionRemediation, childFailureDiagnostics, projectionDependsOnCallerLifetime, projectError, errorRecovery, underlyingErrorCode, errorDetails, requestErrorDetails, artifactStateErrorDetails, providerErrorDetails, primaryBrowserFailureReason, lifecycleErrorDetails;
function init_analysisErrorProjection() {
	return (init_analysisErrorProjection = __esmMin((() => {
		init_artifactIntegrity();
		init_analysisErrorRecovery();
		init_jsonValue();
		init_immutableJson();
		init_analysisErrorPresentation();
		init_analysisErrorCore();
		init_artifactOperationError();
		init_configurationErrors();
		init_browserObservationError();
		init_evidenceErrors();
		init_providerAdapterError();
		init_providerSelectionError();
		init_unknownRegistryError();
		init_analysisErrorBase();
		init_analysisSettingDefinitions();
		init_analysisErrorRefusal();
		init_analysisRefusal();
		init_analysisErrorClassification();
		init_parseFailure();
		relatedInputDetails = (related) => ({
			...related?.parameters === undefined || related.parameters.length === 0 ? {} : { related_parameters: [...related.parameters] },
			...related?.operations === undefined || related.operations.length === 0 ? {} : { related_operations: [...related.operations] }
		});
		projectAnalysisError = (error, callerLifetime = "continuing") => projectError(error, {
			capturedOutput: true,
			partialObservation: true,
			secondary: true
		}, callerLifetime);
		projectAnalysisErrorWithoutCapturedOutput = (error, callerLifetime = "continuing") => projectError(error, {
			capturedOutput: false,
			partialObservation: true,
			secondary: true
		}, callerLifetime);
		projectAnalysisErrorWithoutPartialObservation = (error, callerLifetime = "continuing") => projectError(error, {
			capturedOutput: true,
			partialObservation: false,
			secondary: true
		}, callerLifetime);
		omitUnretainedEvidenceFromError = (projected, limit, candidate) => {
			const { field, secondaryPath } = candidate;
			if (secondaryPath.length > 0) {
				const [index, ...rest] = secondaryPath;
				const secondary = projected.details?.secondary_failures;
				if (!Array.isArray(secondary) || index === undefined) return undefined;
				const failure = secondary[index];
				if (typeof failure !== "object" || failure === null || Array.isArray(failure)) return undefined;
				const omitted = omitUnretainedEvidenceFromError(failure, limit, {
					...candidate,
					secondaryPath: rest
				});
				if (omitted === undefined) return undefined;
				return {
					...projected,
					details: {
						...projected.details,
						secondary_failures: secondary.map((item, i) => i === index ? omitted : item)
					}
				};
			}
			const partial = projected.details?.[field];
			if (typeof partial !== "object" || partial === null || Array.isArray(partial) || partial.kind !== "unretained-evidence" && partial.kind !== "unretained-observation" && partial.kind !== "inline-evidence") {
				return undefined;
			}
			const { [field]: _partial, ...details } = projected.details;
			const evidence = partial.evidence;
			const evidenceId = isRecord(evidence) ? evidence.evidence_id : undefined;
			const retention = partial.kind === "inline-evidence" ? typeof partial.retention === "string" ? partial.retention : "unknown" : "unretained";
			return {
				...projected,
				remediation: { action: `${projected.remediation.action} ${recoveryOmissionRemediation(retention)}` },
				details: {
					...details,
					[`${field}_omitted`]: {
						reason: "mcp-response-limit",
						retention,
						constraint: limit.constraint,
						original_response_bytes_at_least: limit.bytesAtLeast,
						...typeof evidenceId === "string" ? { evidence_id: evidenceId } : {},
						...field === "completed_observation" ? { source_closure: "not-established" } : {}
					}
				}
			};
		};
		recoveryOmissionRemediation = (retention) => retention === "unretained" ? "The omitted observation was not retained and could not fit within MCP delivery limits." : retention === "unknown" ? "The omitted observation's retention is unknown, and it could not fit within MCP delivery limits." : "The observation could not fit within MCP delivery limits.";
		childFailureDiagnostics = (children, diagnostics = {}) => {
			const entries = Object.entries(children);
			const project = ({ error, capturedOutput, omitRecovery }, callerLifetime) => projectError(error, {
				capturedOutput: capturedOutput !== "omit",
				partialObservation: omitRecovery !== true,
				secondary: omitRecovery !== true
			}, callerLifetime);
			const continuing = {
				...diagnostics,
				...Object.fromEntries(entries.map(([key, child]) => [key, project(child, "continuing")]))
			};
			const varying = entries.filter(([, { error, omitRecovery }]) => projectionDependsOnCallerLifetime(error, omitRecovery !== true));
			return varying.length === 0 ? { diagnostics: continuing } : {
				diagnostics: continuing,
				invocationDiagnostics: {
					...continuing,
					...Object.fromEntries(varying.map(([key, child]) => [key, project(child, "invocation")]))
				}
			};
		};
		projectionDependsOnCallerLifetime = (error, includeSecondary) => {
			const chainDepends = (first) => {
				for (let node = first; node !== undefined; node = node.cleanupPrimary) if (node.limit !== undefined || hasAnalysisContinuingCallerGuidance(node) || node.invocationDiagnostics !== undefined || node.workflowUnknownPublication !== undefined) return true;
				return false;
			};
			if (chainDepends(error)) return true;
			if (!includeSecondary) return false;
			for (let node = error; node !== undefined; node = node.cleanupPrimary) if (node.secondaryFailures.some(chainDepends)) return true;
			return false;
		};
		projectError = (error, options, callerLifetime) => {
			const composed = error;
			error = resolvedAnalysisError(error);
			let diagnosticSource = error;
			while (diagnosticSource.diagnostics === undefined && diagnosticSource.cleanupPrimary !== undefined) diagnosticSource = diagnosticSource.cleanupPrimary;
			const diagnostics = diagnosticSource.diagnosticsFor(callerLifetime);
			const cleanupHistory = composed === error ? undefined : composed.diagnosticsFor(callerLifetime);
			const capturedOutput = composed.capturedOutput ?? error.capturedOutput;
			const publication = sourcePublicationRecoveryOf(composed);
			const secondary = new Set();
			for (let owner = composed; owner !== undefined; owner = owner.cleanupPrimary) {
				for (const failure of owner.secondaryFailures) secondary.add(failure);
			}
			let partialObservation = composed.partialObservation ?? error.partialObservation ?? publication?.source;
			for (let owner = composed.cleanupPrimary; partialObservation === undefined && owner !== undefined; owner = owner.cleanupPrimary) partialObservation = owner.partialObservation;
			let argumentObservations = composed.argumentObservations.length > 0 ? composed.argumentObservations : error.argumentObservations;
			for (let owner = composed.cleanupPrimary; argumentObservations.length === 0 && owner !== undefined; owner = owner.cleanupPrimary) argumentObservations = owner.argumentObservations;
			const completedSourceObservation = publication?.completed.kind === "omitted" ? undefined : publication?.completed;
			const completedSourceOmission = publication?.completed.kind === "omitted" ? {
				reason: publication.completed.reason,
				source_closure: publication.completed.source_closure
			} : undefined;
			let cleanupReport = composed.cleanupReport;
			for (let owner = composed.cleanupPrimary; cleanupReport === undefined && owner !== undefined; owner = owner.cleanupPrimary) cleanupReport = owner.cleanupReport;
			assertKnownAnalysisError(error);
			const primary = primaryAnalysisError(error);
			assertKnownAnalysisError(primary);
			const underlyingCode = underlyingErrorCode(primary);
			const code = error.cleanupIncomplete ? "cleanup_incomplete" : underlyingCode;
			const primaryDetails = errorDetails(primary);
			const refusal = analysisErrorRefusal(primary);
			const unknownPublication = composed.workflowUnknownPublication ?? primary.workflowUnknownPublication;
			const details = {
				...primaryDetails,
				...unknownPublication === undefined ? {} : { workflow_unknown_publication: {
					...unknownPublication,
					evidence_retention: callerLifetime === "invocation" && unknownPublication.evidence_retention === "retained" ? "invocation-only" : unknownPublication.evidence_retention
				} },
				...primary.limit === undefined ? {} : { limit: callerLifetime === "invocation" ? { ...invocationLimit(primary.limit) } : { ...primary.limit } },
				...refusal === undefined ? {} : { refusal: analysisRefusalDetails(refusal) },
				...relatedInputDetails(analysisErrorRelatedInputs(primary)),
				...!options.secondary || secondary.size === 0 ? {} : { secondary_failures: [...secondary].map((failure) => projectError(failure, {
					...options,
					secondary: false
				}, callerLifetime)) },
				...cleanupReport === undefined ? {} : { cleanup_report: jsonValueSchema.parse(cleanupReport) },
				...diagnostics === undefined ? {} : {
					diagnostics,
					...primaryDetails?.diagnostics === undefined ? {} : { provider_diagnostics: primaryDetails.diagnostics }
				},
				...cleanupHistory === undefined ? {} : { cleanup_history: cleanupHistory },
				...error.cleanupIncomplete ? {
					cleanup: "incomplete",
					resources: [...error.cleanupResources],
					...error.cleanup === undefined ? {} : { cleanup_reason: error.cleanup.reason },
					execution_failure: primaryDetails?.execution_failure ?? underlyingCode
				} : {},
				...!options.capturedOutput || capturedOutput === undefined ? {} : { captured_output: { ...capturedOutput } },
				...!options.partialObservation || partialObservation === undefined ? {} : { partial_observation: isImmutableJsonSnapshot(partialObservation) ? partialObservation : jsonValueSchema.parse(partialObservation) },
				...!options.partialObservation || argumentObservations.length === 0 ? {} : { argument_observations: argumentObservations.map(({ argument, observation }) => ({
					argument,
					observation: isImmutableJsonSnapshot(observation) ? observation : jsonValueSchema.parse(observation)
				})) },
				...!options.partialObservation || completedSourceObservation === undefined ? {} : { completed_observation: isImmutableJsonSnapshot(completedSourceObservation) ? completedSourceObservation : jsonValueSchema.parse(completedSourceObservation) },
				...!options.partialObservation || completedSourceOmission === undefined ? {} : { completed_observation_omitted: completedSourceOmission }
			};
			const cleanupRetry = error.cleanupRetry;
			const recovery = cleanupRetry === undefined ? errorRecovery(error) : cleanupRetryRecovery(cleanupRetry);
			const remediation = analysisErrorRemediationAction(error, callerLifetime);
			const includesUnretainedEvidence = options.partialObservation && [partialObservation, completedSourceObservation].some((observation) => typeof observation === "object" && observation !== null && "kind" in observation && observation.kind === "unretained-evidence");
			const retentionGuidance = error instanceof AnalysisResourceConstraintError && error.resource === "capacity" && includesUnretainedEvidence ? ` ${UNRETAINED_EVIDENCE_EXPORT_GUIDANCE}` : "";
			const publicationRemediation = callerLifetime === "continuing" && unknownPublication?.evidence_retention === "retained" ? " Use get_evidence_bundle with the Evidence ID in details.workflow_unknown_publication to retrieve the completed result; use list_unknowns to inspect recorded questions. Publication stopped at the reported index; later questions were not checked in this attempt." : "";
			return {
				code,
				category: analysisErrorCategory(error),
				message: analysisErrorUserMessage(error, callerLifetime),
				retryable: RETRYABLE_CODES.has(code) && error.ownPresentation()?.retryable !== false || error instanceof AnalysisCapabilityUnavailableError && error.retryable || error._tag === "ProcessCaptureError" && "retryable" in error && error.retryable === true || error instanceof ArtifactOperationError && error.readerLimit?.can_increase === true && !error.cleanupIncomplete || code === "resource_constraint" && error instanceof AnalysisResourceConstraintError && (error.retryable ?? error.resource === "capacity"),
				remediation: { action: cleanupRetry === undefined ? `${remediation}${retentionGuidance}${publicationRemediation}` : `${remediation}${retentionGuidance} ${cleanupRetryRemediation(cleanupRetry)}${publicationRemediation}` },
				...recovery === undefined ? {} : { recovery },
				...Object.keys(details).length === 0 ? {} : { details }
			};
		};
		errorRecovery = (error) => {
			if (error instanceof AnalysisInputError) return error.conformsToInputContract ? undefined : {
				kind: "inspect_input_contract",
				operation: error.operation
			};
			if (error instanceof AnalysisTimeoutError) return {
				kind: "inspect_timeout_state",
				operation: error.operation,
				timeout_ms: error.timeoutMs
			};
			return undefined;
		};
		underlyingErrorCode = (error) => error._tag === "ProcessCaptureError" && error.cleanupIncomplete ? "cleanup_incomplete" : classifyAnalysisError(error).code;
		errorDetails = (error) => error.ownPresentation()?.details ?? requestErrorDetails(error) ?? artifactStateErrorDetails(error) ?? providerErrorDetails(error) ?? lifecycleErrorDetails(error);
		requestErrorDetails = (error) => {
			if (error instanceof AnalysisUnsupportedTargetError) return {
				operation: error.operation,
				path: error.path,
				reason: error.reason
			};
			if (error instanceof AnalysisResourceConstraintError) return {
				operation: error.operation,
				resource: error.resource,
				reason: error.reason,
				reported_limits: error.reportedLimits,
				...error.requestSent === undefined ? {} : { request_sent: error.requestSent }
			};
			if (error instanceof AnalysisArtifactChangedError) return {
				operation: error.operation,
				path: error.path,
				reason: error.reason,
				boundary: "stable-artifact-read",
				...error.integrityCheck === undefined ? {} : { integrity_check: error.integrityCheck }
			};
			if (error instanceof AnalysisAccessDeniedError) return {
				operation: error.operation,
				path: error.path,
				system_code: error.systemCode,
				boundary: "filesystem-read"
			};
			if (error instanceof AnalysisOutputError) return {
				operation: error.operation,
				reason: error.reason,
				...error.diagnostics === undefined ? {} : { diagnostics: error.diagnostics }
			};
			if (error instanceof AnalysisInputError && error.issues.length > 0) return {
				operation: error.operation,
				issues: error.issues.map((issue) => ({
					path: [...issue.path],
					reason: issue.reason,
					...issue.message === undefined ? {} : { message: issue.message },
					...issue.expected === undefined ? {} : { expected: issue.expected },
					...issue.observed === undefined ? {} : { observed: issue.observed },
					...issue.minimum === undefined ? {} : { minimum: issue.minimum },
					...issue.maximum === undefined ? {} : { maximum: issue.maximum }
				}))
			};
			if (error instanceof EvidenceReferenceError) return {
				evidence_id: error.evidenceId,
				reason: error.reason,
				...typeof error.diagnostics?.operation === "string" ? { operation: error.diagnostics.operation } : {},
				...error.referenceScope === undefined ? {} : { reference_scope: error.referenceScope },
				expected: error.expected,
				actual: error.actual
			};
			if (error instanceof AnalysisSnapshotMismatchError) return {
				reason: error.message,
				...error.bindingMismatch === undefined ? {} : { binding_mismatch: jsonValueSchema.parse(error.bindingMismatch) }
			};
			if (error instanceof EvidenceIntegrityError) return {
				reason: error.message,
				...error.side === undefined ? {} : { side: error.side },
				...error.issuePath === undefined ? {} : { issue_path: [...error.issuePath] },
				...error.constraint === undefined ? {} : { constraint: error.constraint },
				...error.remainingIssueCount === undefined ? {} : { remaining_issue_count: error.remainingIssueCount }
			};
			return undefined;
		};
		artifactStateErrorDetails = (error) => {
			if (error instanceof ArtifactOperationError && error.artifactDetails) return {
				...projectArtifactIntegrityDetails(error.artifactDetails),
				...error.integrityCheck === undefined ? {} : { integrity_check: error.integrityCheck }
			};
			if (error instanceof ArtifactOperationError) return {
				operation: error.operation,
				reason: error.reason,
				...error.reason === "limit" ? { truncated: true } : {},
				...error.detail === undefined ? {} : { detail: error.detail },
				...error.boundary === undefined ? {} : { boundary: error.boundary },
				...error.integrityCheck === undefined ? {} : { integrity_check: error.integrityCheck },
				...error.readerLimit === undefined ? {} : { reader_limit: { ...error.readerLimit } },
				...error.parserLimit === undefined ? {} : { reported_limits: reportedParseLimit(error.parserLimit) },
				...error.admission === undefined ? {} : {
					admission: error.admission.kind,
					...error.admission.kind === "asar-header" ? {
						maximum_header_bytes: error.admission.maximumBytes,
						maximum_header_bytes_source: error.admission.source,
						setting: "REA_ASAR_MAX_HEADER_BYTES"
					} : {
						maximum_listing_bytes: error.admission.maximumBytes,
						maximum_listing_bytes_source: error.admission.source,
						setting: "REA_ASAR_MAX_LISTING_BYTES"
					}
				}
			};
			if (error instanceof UnknownRegistryError) return {
				reason: error.reason,
				...error.constraint === undefined ? {} : { constraint: error.constraint }
			};
			if (error instanceof EvidenceFileError) return {
				operation: error.operation,
				reason: error.reason,
				...error.reason === "path-limit" ? { boundary: "filesystem-path" } : {},
				...error.detectedKind === undefined ? {} : { detected_kind: error.detectedKind },
				...error.systemCode === undefined ? {} : { system_code: error.systemCode },
				...error.path === undefined ? {} : { path: error.path },
				...error.contentIssues === undefined ? {} : { content_issues: error.contentIssues.map((issue) => ({
					...issue,
					path: [...issue.path]
				})) },
				...error.published === undefined ? {} : {
					published: true,
					bytes: error.published.bytes,
					...error.published.path === undefined ? {} : { published_path: error.published.path }
				}
			};
			return undefined;
		};
		providerErrorDetails = (error) => {
			if (error instanceof AnalysisCapabilityUnavailableError) return {
				provider_id: error.providerId,
				operation: error.operation,
				reason: error.reason,
				...error.alternatives.length === 0 ? {} : { alternatives: [...error.alternatives] }
			};
			if (error instanceof ProviderSelectionError) return {
				operation: error.operation,
				selection_reason: error.reason,
				requested_provider_id: error.requestedProviderId,
				candidate_ids: [...error.candidateIds],
				rejections: error.rejections.map((rejection) => ({
					provider_id: rejection.providerId,
					origin: rejection.origin,
					code: rejection.code,
					reason: rejection.reason,
					...rejection.remediation === undefined ? {} : { remediation: rejection.remediation },
					diagnostics: rejection.diagnostics
				}))
			};
			if (error instanceof ProviderAdapterError) return {
				provider_id: error.providerId,
				operation: error.operation,
				...error.cleanupIncomplete ? {
					cleanup: "incomplete",
					resources: [...error.cleanupResources]
				} : {}
			};
			if (error instanceof BrowserObservationError) {
				const primaryReason = primaryBrowserFailureReason(error);
				return {
					operation: error.operation,
					reason: error.reason,
					...error.cleanupIncomplete ? {
						cleanup: "incomplete",
						resources: [...error.cleanupResources],
						...primaryReason === undefined ? {} : { primary_reason: primaryReason }
					} : {}
				};
			}
			return undefined;
		};
		primaryBrowserFailureReason = (error) => {
			const aggregate = error.cause instanceof AggregateError;
			const primary = error.cause instanceof AggregateError ? error.cause.errors[0] : error.cause;
			if (primary instanceof BrowserObservationError) return primary.reason;
			if (primary instanceof AnalysisCancelledError) return "cancelled";
			if (primary instanceof AnalysisTimeoutError) return "timeout";
			if (typeof primary === "object" && primary !== null && "_tag" in primary) return typeof primary._tag === "string" ? primary._tag : "execution_failure";
			return aggregate ? "execution_failure" : undefined;
		};
		lifecycleErrorDetails = (error) => {
			if (error instanceof AnalysisCancelledError) return {
				operation: error.operation,
				cleanup: error.cleanupIncomplete ? "incomplete" : "complete",
				...error.cleanup === undefined || !error.cleanupIncomplete ? {} : {
					cleanup_reason: error.cleanup.reason,
					resources: [...error.cleanup.resources],
					execution_failure: "cancelled"
				}
			};
			if (error instanceof AnalysisTimeoutError) return {
				operation: error.operation,
				timeout_ms: error.timeoutMs,
				...error.cleanup === undefined || !error.cleanupIncomplete ? {} : {
					cleanup: "incomplete",
					cleanup_reason: error.cleanup.reason,
					resources: [...error.cleanup.resources]
				}
			};
			if (error._tag === "ProcessCaptureError" && error.cleanupIncomplete) return {
				cleanup: "incomplete",
				resources: [...error.cleanupResources],
				...error.cleanupReport === undefined ? {} : { cleanup_report: jsonValueSchema.parse(error.cleanupReport) },
				...error.executionFailure === undefined ? {} : { execution_failure: error.executionFailure }
			};
			if (error._tag === "ProcessCaptureError") {
				const details = {
					...error.userCategory === "cancelled" ? {
						operation: "process_capture",
						cleanup: "complete"
					} : {},
					...error.cleanupReport === undefined ? {} : { cleanup_report: jsonValueSchema.parse(error.cleanupReport) },
					...error.executionFailure === undefined ? {} : { execution_failure: error.executionFailure }
				};
				return Object.keys(details).length === 0 ? undefined : details;
			}
			if (error instanceof ConfigurationError && error.settings.length > 0) return { settings: error.settings.map((issue) => ({
				setting: issue.setting,
				constraint: issue.constraint,
				...issue.update_mode === undefined ? {} : { update_mode: issue.update_mode },
				...issue.pending_restart === undefined ? {} : { pending_restart: issue.pending_restart }
			})) };
			if (error instanceof BinaryTargetError) return {
				path: error.path,
				reason: error.reason,
				...error.constraint === undefined ? {} : { constraint: error.constraint },
				...error.infoPlist === undefined ? {} : { info_plist: error.infoPlist },
				...error.probedPaths === undefined ? {} : { probed_paths: [...error.probedPaths] },
				...error.systemCode === undefined ? {} : {
					system_code: error.systemCode,
					boundary: "filesystem-read"
				}
			};
			return undefined;
		};
	})))();
}

//#endregion
export { BrowserObservationError, DESKTOP_BUILD_PROVIDER_ID, DOCTOR_PROVIDER_IDS, ProviderAdapterError, ProviderSelectionError, analysisErrorRemediationAction, analysisErrorUserMessage, browserCleanupObservation, catalogueRow, childFailureDiagnostics, closedAnalysisClientError, composedCallerGuidance, init_analysisErrorClassification, init_analysisErrorPresentation, init_analysisErrorProjection, init_browserObservationError, init_doctorProviderIds, init_providerAdapterError, init_providerSelectionError, isDesktopBuildCheck, isDoctorProviderId, projectAnalysisError, projectAnalysisErrorWithoutCapturedOutput };