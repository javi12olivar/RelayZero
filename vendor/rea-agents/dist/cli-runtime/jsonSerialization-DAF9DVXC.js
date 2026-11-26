import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { isAbsolute, relative, sep } from "node:path";
import { satisfies } from "semver";
import { z } from "zod";
import { toUSVString, types } from "node:util";
import { isProxy } from "node:util/types";
import { constants } from "node:buffer";
import { createHash } from "node:crypto";

//#region dist/domain/runtimeVersion.js
var SUPPORTED_NODE_VERSION_RANGE, SUPPORTED_NODE_VERSION_PROSE, supportsNodeVersion, javaScriptRuntime, supportsJavaScriptRuntime;
function init_runtimeVersion() {
	return (init_runtimeVersion = __esmMin((() => {
		SUPPORTED_NODE_VERSION_RANGE = "^22.23.4 || ^24.22.1 || >=26.12.1";
		SUPPORTED_NODE_VERSION_PROSE = "Node.js 22.x (>=22.23.4), 24.x (>=24.22.1), or 26.12.1+";
		supportsNodeVersion = (version) => satisfies(version, SUPPORTED_NODE_VERSION_RANGE);
		javaScriptRuntime = (versions) => versions.bun === undefined ? {
			id: "node",
			version: versions.node
		} : {
			id: "bun",
			version: versions.bun,
			nodeCompatibilityVersion: versions.node
		};
		supportsJavaScriptRuntime = (runtime) => supportsNodeVersion(runtime.id === "node" ? runtime.version : runtime.nodeCompatibilityVersion);
	})))();
}

//#endregion
//#region dist/domain/analysisErrorBase.js
var ANALYSIS_ERROR_TAGS, DOMAIN_ERROR_TAGS, isAnalysisErrorTag, domainErrorTag, providerErrorTag, AnalysisError, ProviderOwnedAnalysisError, resolvedAnalysisError, primaryAnalysisError, sourcePublicationRecoveryOf;
function init_analysisErrorBase() {
	return (init_analysisErrorBase = __esmMin((() => {
		ANALYSIS_ERROR_TAGS = [
			"AnalysisProtocolError",
			"AnalysisInputError",
			"AnalysisAccessDeniedError",
			"AnalysisArtifactChangedError",
			"AnalysisOutputError",
			"AnalysisCapabilityUnavailableError",
			"AnalysisUnsupportedTargetError",
			"AnalysisCancelledError",
			"AnalysisTimeoutError",
			"AnalysisResourceConstraintError",
			"ProviderSelectionError",
			"ProviderAdapterError",
			"BrowserObservationError",
			"ArtifactOperationError",
			"ProcessCaptureError",
			"EvidenceIntegrityError",
			"EvidenceFileError",
			"UnknownRegistryError",
			"ConfigurationError",
			"NoBinaryOpenError",
			"BinaryTargetError"
		];
		DOMAIN_ERROR_TAGS = new Set(ANALYSIS_ERROR_TAGS);
		isAnalysisErrorTag = (tag) => DOMAIN_ERROR_TAGS.has(tag);
		domainErrorTag = (error) => isAnalysisErrorTag(error._tag) ? error._tag : undefined;
		providerErrorTag = (tag) => tag;
		AnalysisError = class extends Error {
			limit;
			/** Bind the accepted setting at its producing boundary. */
			bindLimit(limit) {
				this.limit = Object.freeze({ ...limit });
				return this;
			}
			#cleanupPrimary;
			#cleanupDependencies;
			#cleanupResourceProjection;
			diagnostics;
			/** Inputs the recovery names, rendered by each adapter. */
			related;
			continuingCallerGuidance;
			invocationDiagnostics;
			#capturedOutput;
			get capturedOutput() {
				return this.#capturedOutput;
			}
			cleanup;
			/**
			* Whether cleanup is still unsettled. Once settled it stays settled; until
			* then completion is read from the owners when asked, never pushed here.
			*/
			#cleanupIncomplete;
			/** Whether this error ever owned cleanup, apart from whether it finished. */
			#carriesCleanup;
			#ownedCleanupResources;
			#cleanupResourceOwner;
			#cleanupCompletionOwner;
			#cleanupReleaseClaims = new Set();
			#cleanupRetry;
			#secondaryFailures = [];
			constructor(message, options) {
				super(message, options);
				this.#cleanupPrimary = options?.cleanupPrimary;
				if (options?.limit !== undefined) this.bindLimit(options.limit);
				this.related = options?.related === undefined ? undefined : Object.freeze({
					...options.related.parameters === undefined ? {} : { parameters: Object.freeze([...options.related.parameters]) },
					...options.related.operations === undefined ? {} : { operations: Object.freeze([...options.related.operations]) }
				});
				this.diagnostics = options?.diagnostics === undefined ? undefined : structuredClone(options.diagnostics);
				this.continuingCallerGuidance = options?.continuingCallerGuidance === undefined ? undefined : Object.freeze({ ...options.continuingCallerGuidance });
				this.invocationDiagnostics = options?.invocationDiagnostics === undefined ? undefined : structuredClone(options.invocationDiagnostics);
				this.#capturedOutput = options?.capturedOutput === undefined ? undefined : { ...options.capturedOutput };
				this.cleanup = options?.cleanup;
				this.#cleanupIncomplete = options?.cleanup !== undefined;
				this.#carriesCleanup = this.#cleanupIncomplete;
				this.#ownedCleanupResources = [...options?.cleanup?.resources ?? []];
				this.partialObservation = options?.partialObservation;
			}
			/** What this error's own module says it means; undefined uses the shared tables. */
			ownPresentation() {
				return undefined;
			}
			/**
			* Whether the provider adapter or its process failed, rather than one
			* request. Session availability treats every operation of that provider as
			* affected until a later success.
			*/
			get providerWide() {
				return false;
			}
			/** The provider request this failure answered; undefined when none. */
			providerRequest() {
				return undefined;
			}
			userMessage = undefined;
			userCategory = undefined;
			executionFailure = undefined;
			partialObservation;
			#argumentObservations = [];
			/** Completed argument observations of a composite request, in retention order. */
			get argumentObservations() {
				return this.#argumentObservations;
			}
			sourcePublicationRecovery;
			workflowUnknownPublication;
			/** Keep the failed source and completed result with their error owner. */
			retainSourcePublication(completed) {
				this.sourcePublicationRecovery = {
					source: this.partialObservation,
					completed
				};
				this.partialObservation = undefined;
				return this;
			}
			get cleanupPrimary() {
				return this.#cleanupPrimary;
			}
			/**
			* Whether owned resources remain unreleased: this error's own record AND
			* every bound dependency's record, each read from its owner when asked.
			* Completion is monotonic, so a later binding cannot reopen it.
			*/
			get cleanupIncomplete() {
				if (!this.#cleanupIncomplete) return false;
				if (this.#ownCleanupPending()) return true;
				for (const dependency of this.#cleanupDependencies ?? []) if (dependency.cleanupIncomplete) return true;
				this.#cleanupIncomplete = false;
				this.#cleanupDependencies?.clear();
				this.#cleanupReleaseClaims.clear();
				return false;
			}
			/**
			* This error's own completion record. A bound release claim is its owner's
			* record; without one, an error composed only of dependencies has no
			* resources of its own, and any other error waits for its owner.
			*/
			#ownCleanupPending() {
				if (this.#cleanupReleaseClaims.size === 0) return this.#cleanupDependencies === undefined;
				for (const claim of this.#cleanupReleaseClaims) if (claim.cleanupReleased) return false;
				return true;
			}
			/**
			* Read completion from a lease owner instead of having it pushed here.
			* Binding the same claim again is a no-op, so retries do not grow it.
			*/
			bindCleanupReleaseClaim(claim) {
				this.#carriesCleanup = true;
				this.#cleanupReleaseClaims.add(claim);
				return this;
			}
			/** A subclass whose own resources are unreleased when it is constructed. */
			markCleanupIncomplete(incomplete) {
				this.#cleanupIncomplete = incomplete;
				if (incomplete) this.#carriesCleanup = true;
			}
			/** Later typed failures retained without changing the primary error cause. */
			get secondaryFailures() {
				return [...this.#secondaryFailures];
			}
			cleanupReport = undefined;
			/**
			* Live owners own current resource attribution; cleanup keeps history. A
			* composed error's own resources usually summarize its dependencies, so
			* pending dependencies attribute; once only the owner's record is pending,
			* its own resources do.
			*/
			get cleanupResources() {
				const own = this.#cleanupResourceOwner?.cleanupResources ?? this.#ownedCleanupResources;
				if (this.#cleanupDependencies === undefined) return own;
				const pending = [...this.#cleanupDependencies].filter((dependency) => dependency.cleanupIncomplete);
				if (pending.length > 0) return this.#cleanupResourceProjection?.cleanupResources ?? [...new Set(pending.flatMap((dependency) => dependency.cleanupResources))];
				return this.#cleanupIncomplete && this.#ownCleanupPending() ? own : [];
			}
			/** Whether cleanup follows an explicit owner or dependent errors. */
			get hasCleanupOwner() {
				return this.#cleanupResourceOwner !== undefined || this.#cleanupCompletionOwner !== undefined || this.#cleanupDependencies !== undefined;
			}
			/**
			* Whether this error owns cleanup at all: its own resources, a release
			* claim, or an owner it follows. Unlike `cleanupIncomplete`, this stays
			* true after that cleanup finished, so a consumer can tell a released
			* owner from a failure (such as a cancellation) that never had one.
			*/
			get carriesCleanup() {
				return this.#carriesCleanup || this.hasCleanupOwner;
			}
			/** Bind attribution only to the producer that owns the complete cleanup set. */
			bindCleanupResourceOwner(owner) {
				this.#cleanupResourceOwner = owner;
				return this;
			}
			/** Observe exact completion without replacing the producer's resource facts. */
			bindCleanupCompletionOwner(owner) {
				this.#cleanupCompletionOwner = owner;
				return this;
			}
			/** Caller retry for the live cleanup; undefined once cleanup completes. */
			get cleanupRetry() {
				return this.cleanupIncomplete ? this.#cleanupRetry : undefined;
			}
			/** Bind only from the owner retaining every reported resource for this retry. */
			bindCleanupRetry(retry) {
				this.#cleanupRetry = Object.freeze({ ...retry });
				return this;
			}
			/** Initialize resource facts supplied by a more specific error producer. */
			setCleanupResources(resources) {
				this.#ownedCleanupResources = [...resources];
			}
			/** Retain diagnostic facts without replacing the original typed error. */
			retainDiagnostics(diagnostics) {
				Object.assign(this, {
					diagnostics: structuredClone({
						...this.diagnostics,
						...diagnostics
					}),
					...this.invocationDiagnostics === undefined ? {} : { invocationDiagnostics: structuredClone({
						...this.invocationDiagnostics,
						...diagnostics
					}) }
				});
				return this;
			}
			/** Retain facts on every primary that cleanup settlement can reveal. */
			retainPrimaryDiagnostics(diagnostics) {
				for (let error = this; error !== undefined; error = error.cleanupPrimary) error.retainDiagnostics(diagnostics);
				return this;
			}
			/** Diagnostics recorded for a caller with this lifetime. */
			diagnosticsFor(callerLifetime) {
				return callerLifetime === "invocation" ? this.invocationDiagnostics ?? this.diagnostics : this.diagnostics;
			}
			retainSecondaryFailure(failure, diagnostics) {
				if (diagnostics !== undefined) this.retainDiagnostics(diagnostics);
				this.#secondaryFailures.push(failure);
				return this;
			}
			/** Keep a composed error incomplete until all explicitly owned source errors resolve. */
			bindCleanupDependencies(dependencies, resourceProjection) {
				if (!this.cleanupIncomplete) this.#cleanupDependencies?.clear();
				const pending = this.#cleanupDependencies ??= new Set();
				if (resourceProjection !== undefined) this.#cleanupResourceProjection = resourceProjection;
				for (const dependency of dependencies) if (dependency.cleanupIncomplete) pending.add(dependency);
				return this;
			}
			/** Retain a completed observation when a later step fails. */
			retainPartialObservation(observation) {
				this.partialObservation ??= observation;
				return this;
			}
			/**
			* Retain a composite argument's completed observation without replacing
			* this failure's own partial observation; the first per argument wins.
			*/
			retainArgumentObservation(argument, observation) {
				if (!this.#argumentObservations.some((kept) => kept.argument === argument)) this.#argumentObservations.push(Object.freeze({
					argument,
					observation
				}));
				return this;
			}
			/** Keep command output observed before this error without replacing the owner. */
			retainCapturedOutput(output) {
				this.#capturedOutput ??= { ...output };
				return this;
			}
			/** Preserve the exact committed prefix when automatic question publication stops. */
			retainWorkflowUnknownPublication(publication) {
				this.workflowUnknownPublication ??= Object.freeze({ ...publication });
				return this;
			}
		};
		ProviderOwnedAnalysisError = class extends AnalysisError {};
		resolvedAnalysisError = (error) => {
			while (!error.cleanupIncomplete && error.cleanupPrimary !== undefined) error = error.cleanupPrimary;
			return error;
		};
		primaryAnalysisError = (error) => {
			while (error.cleanupPrimary !== undefined) error = error.cleanupPrimary;
			return error;
		};
		sourcePublicationRecoveryOf = (error) => {
			for (let owner = error; owner !== undefined; owner = owner.cleanupPrimary) if (owner.sourcePublicationRecovery !== undefined) return owner.sourcePublicationRecovery;
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/configurationErrors.js
var ConfigurationError, NoBinaryOpenError, BinaryTargetError, readPermissionCode;
function init_configurationErrors() {
	return (init_configurationErrors = __esmMin((() => {
		init_analysisErrorBase();
		ConfigurationError = class extends AnalysisError {
			_tag = "ConfigurationError";
			settings;
			remediationAction;
			constructor(message, options) {
				super(message, options);
				this.remediationAction = options?.remediationAction;
				this.settings = (options?.settings ?? []).map((issue) => ({
					setting: issue.setting,
					constraint: issue.constraint,
					...issue.update_mode === undefined ? {} : { update_mode: issue.update_mode },
					...issue.pending_restart === undefined ? {} : { pending_restart: issue.pending_restart }
				}));
			}
		};
		NoBinaryOpenError = class extends AnalysisError {
			_tag = "NoBinaryOpenError";
			constructor() {
				super("No app is open. Ask the user which app to investigate, then call open_binary with its local path.");
			}
		};
		BinaryTargetError = class extends AnalysisError {
			path;
			reason;
			_tag = "BinaryTargetError";
			constraint;
			infoPlist;
			probedPaths;
			remediationAction;
			/** The OS read-permission code of the cause, when the host denied access. */
			systemCode;
			constructor(path, reason, options) {
				super(`Cannot open artifact: ${reason}`, options);
				this.path = path;
				this.reason = reason;
				this.constraint = options?.constraint;
				this.infoPlist = options?.infoPlist;
				this.probedPaths = options?.probedPaths;
				this.remediationAction = options?.remediationAction;
				this.systemCode = readPermissionCode(options?.cause);
			}
		};
		readPermissionCode = (cause) => {
			const code = cause instanceof Error ? Reflect.get(cause, "code") : undefined;
			return code === "EACCES" || code === "EPERM" ? code : undefined;
		};
	})))();
}

//#endregion
//#region dist/config/processStart.js
var processStartConfigurationSchema, blocksProcessStart, parseLogLevel;
function init_processStart() {
	return (init_processStart = __esmMin((() => {
		init_configurationErrors();
		init_result();
		processStartConfigurationSchema = z.object({ REA_LOG_LEVEL: z.enum([
			"trace",
			"debug",
			"info",
			"warn",
			"error",
			"fatal",
			"silent"
		]).default("info") });
		blocksProcessStart = (setting) => Object.hasOwn(processStartConfigurationSchema.shape, setting);
		parseLogLevel = (value) => {
			const parsed = processStartConfigurationSchema.shape.REA_LOG_LEVEL.safeParse(value);
			if (parsed.success) return ok(parsed.data);
			return err(new ConfigurationError("Invalid REA environment configuration", {
				cause: parsed.error,
				settings: parsed.error.issues.map(({ message }) => ({
					setting: "REA_LOG_LEVEL",
					constraint: message
				}))
			}));
		};
	})))();
}

//#endregion
//#region dist/domain/explicitSensitiveValues.js
/**
* Every occurrence of any declared literal in `value`, in order. Overlapping
* occurrences (of one literal or of several) merge into one span, so no part
* of an overlapping declaration survives between two replacements. Spans are
* produced lazily with one cursor per literal, so a caller that stops at a
* budget does no further matching work.
*/
function* explicitValueSpans(value, sensitiveValues) {
	const literals = declaredLiterals(sensitiveValues);
	const next = literals.map((literal) => value.indexOf(literal));
	let pending;
	for (;;) {
		let selected = -1;
		for (let index = 0; index < literals.length; index += 1) if (next[index] >= 0 && (selected < 0 || next[index] < next[selected])) selected = index;
		if (selected < 0) break;
		const start = next[selected];
		const end = start + literals[selected].length;
		next[selected] = value.indexOf(literals[selected], start + 1);
		if (pending !== undefined && start < pending.end) pending = {
			start: pending.start,
			end: Math.max(pending.end, end)
		};
		else {
			if (pending !== undefined) yield pending;
			pending = {
				start,
				end
			};
		}
	}
	if (pending !== undefined) yield pending;
}
var TRANSPORT_CREDENTIAL_HEADERS, isTransportCredentialHeader, declaredLiterals, explicitValuesOccurIn, explicitUtf8Spellings, base64Stable, spellingsOf, explicitTextSpellings, explicitUtf16Spellings, lowercasePercentEscapes, redactExplicitText, redactExplicitOutput, cutOffPrefixLength;
function init_explicitSensitiveValues() {
	return (init_explicitSensitiveValues = __esmMin((() => {
		TRANSPORT_CREDENTIAL_HEADERS = new Set([
			"authorization",
			"proxy-authorization",
			"cookie",
			"set-cookie"
		]);
		isTransportCredentialHeader = (name) => TRANSPORT_CREDENTIAL_HEADERS.has(name.toLowerCase());
		declaredLiterals = (values) => [...new Set(values)].filter((literal) => literal !== "").sort((left, right) => right.length - left.length);
		explicitValuesOccurIn = (value, sensitiveValues) => sensitiveValues.some((literal) => literal !== "" && value.includes(literal));
		explicitUtf8Spellings = (sensitiveValues) => declaredLiterals(sensitiveValues).flatMap((value) => {
			const encoded = Buffer.from(value, "utf8");
			return encoded.toString("utf8") === value ? [encoded] : [];
		});
		base64Stable = (bytes, offset) => {
			const encoded = Buffer.concat([Buffer.alloc(offset), bytes]).toString("base64");
			return encoded.slice(Math.ceil(8 * offset / 6), Math.floor(8 * (offset + bytes.length) / 6));
		};
		spellingsOf = (value, spelling) => {
			const scalar = toUSVString(value);
			switch (spelling) {
				case "uri-component": return [encodeURIComponent(scalar)];
				case "uri-query": return [encodeURIComponent(scalar).replace(/'/gu, "%27")];
				case "uri-plus-space": return [encodeURIComponent(scalar).replaceAll("%20", "+")];
				case "form": return [new URLSearchParams([["value", scalar]]).toString().slice("value=".length)];
				case "json-escaped": return [JSON.stringify(value).slice(1, -1)];
				case "hex": {
					const hex = Buffer.from(value, "utf8").toString("hex");
					return [hex, hex.toUpperCase()];
				}
				case "base64": {
					const bytes = Buffer.from(value, "utf8");
					const aligned = [
						0,
						1,
						2
					].map((offset) => base64Stable(bytes, offset));
					return [...aligned, ...aligned.map((text) => text.replaceAll("+", "-").replaceAll("/", "_"))];
				}
			}
		};
		explicitTextSpellings = (value, spellings) => [...new Set(spellings.flatMap((spelling) => spellingsOf(value, spelling)).filter((text) => text !== "" && text !== value))];
		explicitUtf16Spellings = (value) => {
			const little = Buffer.from(value, "utf16le");
			return [little, Buffer.from(little).swap16()];
		};
		lowercasePercentEscapes = (value) => value.includes("%") ? value.replace(/%[0-9a-f]{2}/giu, (escape) => escape.toLowerCase()) : value;
		redactExplicitText = (value, sensitiveValues, options = {}) => {
			const literals = declaredLiterals(sensitiveValues);
			if (literals.length === 0) return value;
			const replacement = [
				...options.replacement === undefined ? [] : [options.replacement],
				"[REDACTED]",
				"…",
				""
			].find((candidate) => literals.every((literal) => !candidate.includes(literal))) ?? "";
			let result = "";
			let cursor = 0;
			for (const { start, end } of explicitValueSpans(value, literals)) {
				result += value.slice(cursor, start) + replacement;
				cursor = end;
			}
			result += value.slice(cursor);
			if (options.cutOff === true) {
				const tail = cutOffPrefixLength(result, literals);
				if (tail > 0) result = `${result.slice(0, result.length - tail)}${replacement}`;
			}
			return literals.some((literal) => result.includes(literal)) ? "" : result;
		};
		redactExplicitOutput = (output, sensitiveValues, replacement) => redactExplicitText(output.text, sensitiveValues, {
			cutOff: output.observedBytes > output.bytes,
			...replacement === undefined ? {} : { replacement }
		});
		cutOffPrefixLength = (text, literals) => {
			let longest = 0;
			for (const literal of literals) for (let length = Math.min(text.length, literal.length - 1); length > longest; length -= 1) if (text.endsWith(literal.slice(0, length))) {
				longest = length;
				break;
			}
			return longest;
		};
	})))();
}

//#endregion
//#region dist/domain/analysisErrorCore.js
var AnalysisUnsupportedTargetError, ANALYSIS_RESOURCE_KINDS, AnalysisResourceConstraintError, resourceConstraintRecoveryFrom, reattributedResourceConstraint, fixedCeilingConstraint, resourceConstraintRecovery, AnalysisProtocolError, AnalysisInputError, AnalysisOutputError, AnalysisCapabilityUnavailableError, AnalysisCancelledError, OWNER_CANCELLATION_MESSAGES, OwnerCancellation, CALLER_ABORT_MESSAGES, CallerAbort, carriedReason, isAborted, cancellationCause, cancelledBy, AnalysisTimeoutError, AnalysisAccessDeniedError, AnalysisArtifactChangedError;
function init_analysisErrorCore() {
	return (init_analysisErrorCore = __esmMin((() => {
		init_analysisErrorBase();
		AnalysisUnsupportedTargetError = class extends AnalysisError {
			operation;
			path;
			reason;
			_tag = "AnalysisUnsupportedTargetError";
			/** Refusal-specific recovery, when the producer knows an available workflow. */
			remediationAction;
			/** The target holds the content, so unsupported does not make it inapplicable. */
			undecodedContent;
			constructor(operation, path, reason, options) {
				super(`Unsupported target for ${operation} at ${path}: ${reason}`, options);
				this.operation = operation;
				this.path = path;
				this.reason = reason;
				this.remediationAction = options?.remediationAction;
				this.undecodedContent = options?.undecodedContent ?? false;
			}
		};
		ANALYSIS_RESOURCE_KINDS = [
			"memory",
			"cpu",
			"file-size",
			"transport",
			"capacity"
		];
		AnalysisResourceConstraintError = class extends AnalysisError {
			operation;
			resource;
			reason;
			reportedLimits;
			_tag = "AnalysisResourceConstraintError";
			/**
			* The one recovery this refusal carries. A fixed allowance and a separate
			* remediation sentence do not co-occur; retryability belongs to that same
			* object.
			*/
			recovery;
			/**
			* Whether the refused request reached its peer: false when it was refused
			* before anything was sent, true when the peer received it and may have
			* acted on it. Undefined when the producer does not know.
			*/
			requestSent;
			constructor(operation, resource, reason, reportedLimits, options) {
				super(`Resource constraint during ${operation}: ${reason}`, options);
				this.operation = operation;
				this.resource = resource;
				this.reason = reason;
				this.reportedLimits = reportedLimits;
				this.recovery = resourceConstraintRecoveryFrom(options);
				this.requestSent = options?.requestSent;
			}
			/** Projection of `recovery`. Absent when recovery names a fixed allowance. */
			get remediationAction() {
				return this.recovery.remediationAction;
			}
			/**
			* Projection of `recovery`. The fixed format, decoder, or capture allowance
			* that refused the request. Worker limits and host resources do not raise
			* it, so recovery derives from this allowance rather than from `resource`.
			*/
			get fixedAllowance() {
				return this.recovery.fixedAllowance;
			}
			/**
			* Projection of `recovery`. Whether retrying the same request can succeed.
			* A caller-selected bound is deterministic for the same input, so it is not
			* retryable even when its resource kind would otherwise be treated as
			* admission capacity.
			*/
			get retryable() {
				return this.recovery.retryable;
			}
		};
		resourceConstraintRecoveryFrom = (options) => {
			if (options?.fixedAllowance !== undefined) return {
				fixedAllowance: options.fixedAllowance,
				...options.retryable === undefined ? {} : { retryable: options.retryable }
			};
			return {
				...options?.remediationAction === undefined ? {} : { remediationAction: options.remediationAction },
				...options?.measuredExhaustion === undefined ? {} : { measuredExhaustion: options.measuredExhaustion },
				...options?.retryable === undefined ? {} : { retryable: options.retryable }
			};
		};
		reattributedResourceConstraint = (operation, error, options) => new AnalysisResourceConstraintError(operation, error.resource, error.reason, error.reportedLimits, {
			...options,
			...resourceConstraintRecovery(error),
			...error.limit === undefined ? {} : { limit: error.limit },
			...error.related === undefined ? {} : { related: error.related },
			...error.requestSent === undefined ? {} : { requestSent: error.requestSent }
		});
		fixedCeilingConstraint = (operation, resource, reason, ceiling, options) => new AnalysisResourceConstraintError(operation, resource, reason, null, {
			...options,
			retryable: false,
			fixedAllowance: ceiling
		});
		resourceConstraintRecovery = (error, text = (value) => value) => {
			const recovery = error.recovery;
			return recovery.fixedAllowance !== undefined ? {
				fixedAllowance: {
					...recovery.fixedAllowance,
					name: text(recovery.fixedAllowance.name),
					...recovery.fixedAllowance.narrowing === undefined ? {} : { narrowing: text(recovery.fixedAllowance.narrowing) }
				},
				...recovery.retryable === undefined ? {} : { retryable: recovery.retryable }
			} : {
				...recovery.remediationAction === undefined ? {} : { remediationAction: text(recovery.remediationAction) },
				...recovery.measuredExhaustion === undefined ? {} : { measuredExhaustion: recovery.measuredExhaustion },
				...recovery.retryable === undefined ? {} : { retryable: recovery.retryable }
			};
		};
		AnalysisProtocolError = class extends AnalysisError {
			_tag = "AnalysisProtocolError";
		};
		AnalysisInputError = class extends AnalysisError {
			operation;
			issues;
			_tag = "AnalysisInputError";
			userMessage;
			/** Refusal-specific correction, when the generic input-contract advice cannot fix it. */
			remediationAction;
			/**
			* The refused values satisfy the advertised input contract; the selected
			* target lacks the requested fact for them. Re-reading the schema cannot
			* correct such a refusal, so it carries no input-contract recovery.
			*/
			conformsToInputContract;
			/** A schema-valid selector that matched several candidates. */
			ambiguousSelector;
			constructor(operation, options, issues = []) {
				super(`Invalid analysis input for ${operation}`, options);
				this.operation = operation;
				this.issues = issues;
				this.userMessage = options?.userMessage;
				this.remediationAction = options?.remediationAction;
				this.ambiguousSelector = options?.ambiguousSelector;
				this.conformsToInputContract = options?.conformsToInputContract ?? options?.ambiguousSelector !== undefined;
			}
		};
		AnalysisOutputError = class extends AnalysisError {
			operation;
			reason;
			_tag = "AnalysisOutputError";
			userMessage;
			remediationAction;
			cleanupOnly;
			constructor(operation, reason, options) {
				super(`Invalid analysis output for ${operation}: ${reason}`, options);
				this.operation = operation;
				this.reason = reason;
				this.userMessage = options?.userMessage;
				this.remediationAction = options?.remediationAction;
				this.cleanupOnly = options?.cleanupOnly ?? false;
			}
		};
		AnalysisCapabilityUnavailableError = class extends AnalysisError {
			providerId;
			operation;
			reason;
			_tag = "AnalysisCapabilityUnavailableError";
			userMessage;
			remediationAction;
			/** General recovery used only when a consumer has no more specific action. */
			fallbackRemediationAction;
			siblingOperations;
			siblingReasons;
			/** Incomplete cleanup must settle before the operation can be retried. */
			retryable;
			/**
			* Operations the caller can run now that observe part of what this one
			* would answer; the remediation states what they do not establish.
			*/
			alternatives;
			constructor(providerId, operation, reason, options) {
				super(`Provider ${providerId} cannot execute ${operation}: ${reason}`, options);
				this.providerId = providerId;
				this.operation = operation;
				this.reason = reason;
				this.userMessage = options?.userMessage;
				this.remediationAction = options?.remediationAction;
				this.fallbackRemediationAction = options?.fallbackRemediationAction;
				this.siblingOperations = options?.siblingOperations;
				this.siblingReasons = options?.siblingReasons;
				this.retryable = options?.retryable === true && !this.cleanupIncomplete;
				this.alternatives = Object.freeze([...options?.alternatives ?? []]);
			}
		};
		AnalysisCancelledError = class extends AnalysisError {
			operation;
			_tag = "AnalysisCancelledError";
			userMessage;
			constructor(operation, options) {
				super(`Analysis operation was cancelled: ${operation}`, options);
				this.operation = operation;
				this.userMessage = options?.userMessage;
			}
		};
		OWNER_CANCELLATION_MESSAGES = {
			"owner-closed": "REA closed the owner of this operation before it completed",
			"startup-owner-closed": "REA closed the owner of this operation before it completed",
			"deadline-elapsed": "An internal REA bound on this operation elapsed",
			"no-longer-needed": "REA stopped work whose result is no longer needed"
		};
		OwnerCancellation = class OwnerCancellation extends Error {
			kind;
			name = "OwnerCancellation";
			constructor(kind) {
				super(OWNER_CANCELLATION_MESSAGES[kind]);
				this.kind = kind;
			}
			/**
			* One shared reason per kind, so repeated owner cancellations compare equal
			* the way repeated observations of one caller abort do.
			*/
			static ownerClosed = new OwnerCancellation("owner-closed");
			/** Reserved for the owner of a `SharedStartupAttempt`; see its kind. */
			static startupOwnerClosed = new OwnerCancellation("startup-owner-closed");
			/** An internal bound elapsed; see its kind. */
			static deadlineElapsed = new OwnerCancellation("deadline-elapsed");
			/** Work nobody will consume was stopped; see its kind. */
			static noLongerNeeded = new OwnerCancellation("no-longer-needed");
		};
		CALLER_ABORT_MESSAGES = {
			interrupt: "The caller interrupted this operation (SIGINT)",
			terminate: "The caller terminated this operation (SIGTERM)",
			"request-cancelled": "The MCP client cancelled this request",
			"client-disconnected": "The client disconnected before this request settled"
		};
		CallerAbort = class CallerAbort extends DOMException {
			kind;
			clientReason;
			constructor(kind, clientReason) {
				super(CALLER_ABORT_MESSAGES[kind], "AbortError");
				this.kind = kind;
				this.clientReason = clientReason;
			}
			/** The reason for a process signal delivered to a one-shot command. */
			static forProcessSignal(signal) {
				return new CallerAbort(signal === "SIGINT" ? "interrupt" : "terminate");
			}
		};
		carriedReason = (reason) => ({ carried: reason });
		isAborted = (signal) => signal?.aborted === true;
		cancellationCause = (reason) => {
			if (reason instanceof AnalysisCancelledError) return reason.cause;
			if (reason instanceof OwnerCancellation) return reason;
			if ("carried" in reason) return reason.carried;
			return reason.reason;
		};
		cancelledBy = (operation, reason, options) => new AnalysisCancelledError(operation, {
			...options,
			cause: cancellationCause(reason)
		});
		AnalysisTimeoutError = class extends AnalysisError {
			operation;
			timeoutMs;
			_tag = "AnalysisTimeoutError";
			userMessage;
			remediationAction;
			constructor(operation, timeoutMs, options) {
				super(`Analysis operation timed out after ${String(timeoutMs)}ms: ${operation}`, options);
				this.operation = operation;
				this.timeoutMs = timeoutMs;
				this.userMessage = options?.userMessage;
				this.remediationAction = options?.remediationAction;
			}
		};
		AnalysisAccessDeniedError = class extends AnalysisError {
			operation;
			path;
			systemCode;
			_tag = "AnalysisAccessDeniedError";
			constructor(operation, path, systemCode, options) {
				super(`Host filesystem read access denied (${systemCode}) for ${path} during ${operation}`, options);
				this.operation = operation;
				this.path = path;
				this.systemCode = systemCode;
			}
		};
		AnalysisArtifactChangedError = class extends AnalysisError {
			operation;
			path;
			reason;
			_tag = "AnalysisArtifactChangedError";
			/** The consistency check the producing reader named, when it named one. */
			integrityCheck;
			constructor(operation, path, reason, options) {
				super(`Selected artifact changed during acquisition: ${reason}`, options);
				this.operation = operation;
				this.path = path;
				this.reason = reason;
				this.integrityCheck = options?.integrityCheck;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/artifactIntegrity.js
var sha256, md5, crc32, artifactIntegrityClaimSchema, artifactSha256PairSchema, artifactMd5PairSchema, artifactDfuCrc32PairSchema, artifactIntegrityPair, artifactIntegrityPairOf, artifactIntegrityDetails, artifactContainerIntegrityDetails, projectedDigests, projectArtifactIntegrityDetails;
function init_artifactIntegrity() {
	return (init_artifactIntegrity = __esmMin((() => {
		sha256 = z.string().regex(/^[a-f0-9]{64}$/u);
		md5 = z.string().regex(/^[a-f0-9]{32}$/u);
		crc32 = z.string().regex(/^[a-f0-9]{8}$/u);
		artifactIntegrityClaimSchema = z.discriminatedUnion("algorithm", [z.strictObject({
			algorithm: z.literal("sha256"),
			digest: sha256
		}), z.strictObject({
			algorithm: z.literal("md5"),
			digest: md5
		})]);
		artifactSha256PairSchema = z.object({
			declared_sha256: sha256,
			observed_sha256: sha256
		});
		artifactMd5PairSchema = z.object({
			algorithm: z.literal("md5"),
			declared_md5: md5,
			observed_md5: md5
		});
		artifactDfuCrc32PairSchema = z.object({
			algorithm: z.literal("dfu-crc32"),
			declared_crc32: crc32,
			observed_crc32: crc32
		});
		artifactIntegrityPair = (claim, observed) => claim.algorithm === "sha256" ? {
			declared_sha256: claim.digest,
			observed_sha256: observed
		} : {
			algorithm: "md5",
			declared_md5: claim.digest,
			observed_md5: observed
		};
		artifactIntegrityPairOf = (pair) => {
			if ("declared_sha256" in pair) return {
				declared_sha256: pair.declared_sha256,
				observed_sha256: pair.observed_sha256
			};
			return pair.algorithm === "md5" ? {
				algorithm: pair.algorithm,
				declared_md5: pair.declared_md5,
				observed_md5: pair.observed_md5
			} : {
				algorithm: pair.algorithm,
				declared_crc32: pair.declared_crc32,
				observed_crc32: pair.observed_crc32
			};
		};
		artifactIntegrityDetails = (logicalPath, claim, observed, unpacked) => ({
			logicalPath,
			unpacked,
			...claim?.algorithm === "md5" ? {
				algorithm: "md5",
				declaredMd5: claim.digest,
				calculatedMd5: observed
			} : {
				declaredSha256: claim?.digest ?? null,
				calculatedSha256: observed
			}
		});
		artifactContainerIntegrityDetails = (logicalPath, pair) => ({
			logicalPath,
			unpacked: false,
			algorithm: pair.algorithm,
			declaredCrc32: pair.declared_crc32,
			calculatedCrc32: pair.observed_crc32
		});
		projectedDigests = (details) => {
			if ("declaredSha256" in details) return {
				declared_sha256: details.declaredSha256,
				calculated_sha256: details.calculatedSha256
			};
			return details.algorithm === "md5" ? {
				algorithm: details.algorithm,
				declared_md5: details.declaredMd5,
				calculated_md5: details.calculatedMd5
			} : {
				algorithm: details.algorithm,
				declared_crc32: details.declaredCrc32,
				calculated_crc32: details.calculatedCrc32
			};
		};
		projectArtifactIntegrityDetails = (details) => ({
			logical_path: details.logicalPath,
			...projectedDigests(details),
			unpacked: details.unpacked
		});
	})))();
}

//#endregion
//#region dist/domain/analysisErrorRecovery.js
var analysisCleanupRetrySchema, cleanupRetryRecovery, cleanupRetryRemediation, analysisErrorRecoverySchema;
function init_analysisErrorRecovery() {
	return (init_analysisErrorRecovery = __esmMin((() => {
		analysisCleanupRetrySchema = z.object({ operation: z.literal("close_binary") }).strict();
		cleanupRetryRecovery = (retry) => ({
			kind: "retry_cleanup",
			operation: retry.operation
		});
		cleanupRetryRemediation = (retry) => `This connection retains that cleanup. Keep it open; after the reported condition settles or is resolved, call ${retry.operation} without snapshot_path and check its result. That call retries the retained cleanup without rerunning the failed analysis, preserves investigation Evidence and Unknown history, and can report cleanup_incomplete again.`;
		analysisErrorRecoverySchema = z.discriminatedUnion("kind", [
			z.object({
				kind: z.literal("inspect_input_contract"),
				operation: z.string().min(1)
			}).strict(),
			z.object({
				kind: z.literal("inspect_timeout_state"),
				operation: z.string().min(1),
				timeout_ms: z.number().int().positive()
			}).strict(),
			z.object({
				kind: z.literal("retry_cleanup"),
				operation: z.string().min(1)
			}).strict()
		]);
	})))();
}

//#endregion
//#region dist/domain/immutableJson.js
function* ownedTreeChildren(value) {
	if (Array.isArray(value)) {
		for (let index = 0; index < value.length; index++) {
			const descriptor = Object.getOwnPropertyDescriptor(value, index);
			if (descriptor === undefined || !Object.hasOwn(descriptor, "value")) throw new TypeError("Owned JSON trees require dense data arrays");
			yield descriptor.value;
		}
	} else {
		for (const key in value) {
			if (!Object.hasOwn(value, key)) continue;
			const descriptor = Object.getOwnPropertyDescriptor(value, key);
			if (descriptor === undefined || !Object.hasOwn(descriptor, "value")) throw new TypeError("Immutable JSON snapshots cannot contain accessors");
			yield descriptor.value;
		}
	}
}
/**
* Seal exclusively owned JSON in bounded steps, authenticating only completion.
* Abandonment or failure can leave the provisional input partly frozen.
*/
function* freezeOwnedJsonSnapshotSteps(value) {
	const pending = [{
		value,
		exiting: false
	}];
	const visited = new Set();
	const ancestors = new Set();
	let examined = 0;
	try {
		while (pending.length > 0) {
			if (examined++ === 4096) {
				examined = 0;
				yield;
			}
			const entry = pending.pop();
			if (entry === undefined) break;
			const item = entry.value;
			if (entry.exiting && typeof item === "object" && item !== null) {
				ancestors.delete(item);
				visited.add(item);
				continue;
			}
			if (isImmutableJsonSnapshot(item)) continue;
			if (typeof item !== "object" || item === null) throw new TypeError("Immutable JSON snapshots require JSON values");
			if (ancestors.has(item)) throw new TypeError("Immutable JSON snapshots cannot contain circular references");
			if (visited.has(item)) continue;
			ancestors.add(item);
			pending.push({
				value: item,
				exiting: true
			});
			pushSnapshotChildren(item, pending);
			Object.freeze(item);
		}
		if (typeof value === "object" && value !== null) immutableSnapshots.add(value);
		return value;
	} finally {
		pending.length = 0;
		visited.clear();
		ancestors.clear();
	}
}
var immutableSnapshots, isImmutableJsonSnapshot, immutableJsonSnapshotMember, canBorrowParsedJsonSnapshot, freezeJsonSnapshot, freezeOwnedJsonTreeSnapshot, pushSnapshotChildren;
function init_immutableJson() {
	return (init_immutableJson = __esmMin((() => {
		immutableSnapshots = new WeakSet();
		isImmutableJsonSnapshot = (value) => value === null || typeof value === "string" || typeof value === "boolean" || typeof value === "number" && Number.isFinite(value) || typeof value === "object" && immutableSnapshots.has(value);
		immutableJsonSnapshotMember = (snapshot, key) => {
			if (typeof snapshot !== "object" || snapshot === null || !immutableSnapshots.has(snapshot)) return undefined;
			const descriptor = Object.getOwnPropertyDescriptor(snapshot, key);
			if (descriptor === undefined || !Object.hasOwn(descriptor, "value")) return undefined;
			const member = descriptor.value;
			if (typeof member === "object" && member !== null) immutableSnapshots.add(member);
			return member;
		};
		canBorrowParsedJsonSnapshot = (source, parsed) => {
			if (!isImmutableJsonSnapshot(source)) return false;
			if (Object.is(source, parsed)) return true;
			const pending = [source, parsed];
			const compared = new Map();
			const sources = new Map();
			while (pending.length > 0) {
				const right = pending.pop();
				const left = pending.pop();
				if (typeof left !== "object" || left === null || typeof right !== "object" || right === null) {
					if (!Object.is(left, right)) return false;
					continue;
				}
				if (isProxy(right) || Object.getPrototypeOf(left) !== Object.getPrototypeOf(right)) return false;
				const previous = compared.get(left);
				if (previous !== undefined) {
					if (previous !== right) return false;
					continue;
				}
				if (sources.has(right)) return false;
				compared.set(left, right);
				sources.set(right, left);
				const keys = Reflect.ownKeys(left);
				if (keys.length !== Reflect.ownKeys(right).length) return false;
				for (const key of keys) {
					if (typeof key !== "string") return false;
					const a = Object.getOwnPropertyDescriptor(left, key);
					const b = Object.getOwnPropertyDescriptor(right, key);
					if (a === undefined || b === undefined || !Object.hasOwn(a, "value") || !Object.hasOwn(b, "value") || a.enumerable !== b.enumerable) return false;
					pending.push(a.value, b.value);
				}
			}
			return true;
		};
		freezeJsonSnapshot = (value) => {
			const pending = [{
				value,
				exiting: false
			}];
			const visited = new Set();
			const ancestors = new Set();
			const objects = [];
			while (pending.length > 0) {
				const entry = pending.pop();
				if (entry === undefined) break;
				const item = entry.value;
				if (entry.exiting && typeof item === "object" && item !== null) {
					ancestors.delete(item);
					visited.add(item);
					objects.push(item);
					continue;
				}
				if (isImmutableJsonSnapshot(item)) continue;
				if (typeof item !== "object" || item === null) throw new TypeError("Immutable JSON snapshots require JSON values");
				if (ancestors.has(item)) throw new TypeError("Immutable JSON snapshots cannot contain circular references");
				if (visited.has(item)) continue;
				ancestors.add(item);
				pending.push({
					value: item,
					exiting: true
				});
				pushSnapshotChildren(item, pending);
			}
			for (const item of objects) Object.freeze(item);
			if (typeof value === "object" && value !== null) immutableSnapshots.add(value);
			return value;
		};
		freezeOwnedJsonTreeSnapshot = (value) => {
			const frames = [];
			const ancestors = new Set();
			const enter = (item) => {
				if (isImmutableJsonSnapshot(item)) return;
				if (typeof item !== "object" || item === null) throw new TypeError("Immutable JSON snapshots require JSON values");
				if (isProxy(item)) throw new TypeError("Immutable JSON snapshots cannot contain proxies");
				if (ancestors.has(item)) throw new TypeError("Immutable JSON snapshots cannot contain circular references");
				const prototype = Object.getPrototypeOf(item);
				if (!Array.isArray(item) && prototype !== Object.prototype && prototype !== null) throw new TypeError("Immutable JSON snapshots require ordinary objects");
				ancestors.add(item);
				frames.push({
					value: item,
					children: ownedTreeChildren(item)
				});
			};
			enter(value);
			while (frames.length > 0) {
				const frame = frames[frames.length - 1];
				const next = frame.children.next();
				if (!next.done) enter(next.value);
				else {
					Object.freeze(frame.value);
					ancestors.delete(frame.value);
					frames.pop();
				}
			}
			if (typeof value === "object" && value !== null) immutableSnapshots.add(value);
			return value;
		};
		pushSnapshotChildren = (item, pending) => {
			if (isProxy(item)) throw new TypeError("Immutable JSON snapshots cannot contain proxies");
			const prototype = Object.getPrototypeOf(item);
			if (!Array.isArray(item) && prototype !== Object.prototype && prototype !== null) throw new TypeError("Immutable JSON snapshots require ordinary objects");
			if (Array.isArray(item)) {
				for (let index = 0; index < item.length; index += 1) if (!Object.hasOwn(item, index)) throw new TypeError("Immutable JSON snapshots cannot contain sparse arrays");
			}
			for (const key of Object.getOwnPropertyNames(item)) {
				const descriptor = Object.getOwnPropertyDescriptor(item, key);
				if (descriptor === undefined || !Object.hasOwn(descriptor, "value")) throw new TypeError("Immutable JSON snapshots cannot contain accessors");
				const child = descriptor.value;
				pending.push({
					value: child,
					exiting: false
				});
			}
		};
	})))();
}

//#endregion
//#region dist/kernel/isRecord.js
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function init_isRecord() {
	return (init_isRecord = __esmMin((() => {})))();
}

//#endregion
//#region dist/domain/jsonValue.js
function* ownEnumerableKeys(value) {
	for (const key in value) if (Object.hasOwn(value, key)) yield key;
}
function* jsonObjectValues(record) {
	for (const key of ownEnumerableKeys(record)) yield record[key];
}
/** Validate JSON in bounded steps; cache only authenticated immutable roots. */
function* jsonValueValidationSteps(root) {
	const immutable = typeof root === "object" && root !== null && isImmutableJsonSnapshot(root) ? root : undefined;
	if (immutable !== undefined && immutableValidation.has(immutable)) return immutableValidation.get(immutable);
	const finish = (issue) => {
		if (immutable !== undefined) immutableValidation.set(immutable, issue);
		return issue;
	};
	const pending = [];
	let value = root;
	let depth = 0;
	let inspect = true;
	let examined = 0;
	for (;;) {
		if (inspect) {
			if (examined++ === 4096) {
				examined = 0;
				yield;
			}
			if (depth > 1e3) return finish(`JSON value exceeds maximum nesting depth of ${MAX_JSON_DEPTH}. This release has no runtime override.`);
			if (typeof value === "object" && value !== null && types.isProxy(value)) return finish("JSON values cannot contain proxies");
			if (value === null || typeof value === "string" || typeof value === "boolean") {
				inspect = false;
			} else if (typeof value === "number") {
				if (!Number.isFinite(value)) return finish("JSON numbers must be finite");
				inspect = false;
			} else if (Array.isArray(value)) {
				pending.push({
					kind: "array",
					value,
					depth,
					index: 0
				});
				inspect = false;
			} else if (isRecord(value)) {
				const prototype = Object.getPrototypeOf(value);
				if (prototype !== Object.prototype && prototype !== null) return finish("JSON objects require ordinary data properties");
				for (const key of Object.getOwnPropertySymbols(value)) if (Object.getOwnPropertyDescriptor(value, key)?.enumerable === true) return finish("JSON object keys must be strings");
				pending.push({
					kind: "object",
					value,
					depth,
					keys: ownEnumerableKeys(value)
				});
				inspect = false;
			} else return finish("Invalid JSON value");
			continue;
		}
		const frame = pending[pending.length - 1];
		if (frame === undefined) return finish(undefined);
		if (frame.kind === "array") {
			if (frame.index >= frame.value.length) {
				pending.pop();
				continue;
			}
			const index = frame.index++;
			const descriptor = Object.getOwnPropertyDescriptor(frame.value, index);
			if (descriptor === undefined || !Object.hasOwn(descriptor, "value")) return finish("JSON arrays require dense data properties without accessors");
			value = descriptor.value;
			depth = frame.depth + 1;
			inspect = true;
			continue;
		}
		const next = frame.keys.next();
		if (next.done) {
			pending.pop();
			continue;
		}
		const descriptor = Object.getOwnPropertyDescriptor(frame.value, next.value);
		if (descriptor?.enumerable !== true) continue;
		if (!Object.hasOwn(descriptor, "value")) return finish("JSON objects cannot contain accessors");
		value = descriptor.value;
		depth = frame.depth + 1;
		inspect = true;
	}
}
var MAX_JSON_DEPTH, equalJsonValues, immutableValidation, jsonValueValidationIssue, jsonValueExceedsDepth, preserveJsonValue, validatedJsonValue, jsonValueSchema, ownedJsonValueSchema, objectValidation, objectProjection, jsonObjectSchema, ownedJsonObjectSchema;
function init_jsonValue() {
	return (init_jsonValue = __esmMin((() => {
		init_immutableJson();
		MAX_JSON_DEPTH = 1e3;
		equalJsonValues = (left, right) => {
			if (left === right) return true;
			if (left === null || right === null || typeof left !== "object" || typeof right !== "object") return false;
			if (Array.isArray(left)) {
				if (!Array.isArray(right) || left.length !== right.length) return false;
				for (let index = 0; index < left.length; index++) if (!equalJsonValues(left[index], right[index])) return false;
				return true;
			}
			if (Array.isArray(right)) return false;
			const keys = Object.keys(left);
			if (keys.length !== Object.keys(right).length) return false;
			for (const key of keys) if (!Object.prototype.propertyIsEnumerable.call(right, key) || !equalJsonValues(left[key], right[key])) return false;
			return true;
		};
		immutableValidation = new WeakMap();
		jsonValueValidationIssue = (root) => {
			const steps = jsonValueValidationSteps(root);
			for (;;) {
				const step = steps.next();
				if (step.done) return step.value;
			}
		};
		jsonValueExceedsDepth = (root, limit) => {
			const levels = [[root].values()];
			for (let level = levels.at(-1); level !== undefined; level = levels.at(-1)) {
				const next = level.next();
				if (next.done === true) levels.pop();
				else if (levels.length - 1 > limit) return true;
				else if (Array.isArray(next.value)) levels.push(next.value.values());
				else if (isRecord(next.value)) levels.push(jsonObjectValues(next.value));
			}
			return false;
		};
		preserveJsonValue = (value) => {
			const immutableCandidate = value;
			if (isImmutableJsonSnapshot(immutableCandidate)) return value;
			if (Array.isArray(value)) {
				const copy = [];
				for (let index = 0; index < value.length; index += 1) copy.push(preserveJsonValue(value[index]));
				return copy;
			}
			if (value !== null && typeof value === "object") {
				const copy = {};
				for (const key of ownEnumerableKeys(value)) Object.defineProperty(copy, key, {
					value: preserveJsonValue(value[key]),
					enumerable: true,
					configurable: true,
					writable: true
				});
				return copy;
			}
			return value;
		};
		validatedJsonValue = z.unknown().superRefine((value, context) => {
			const issue = jsonValueValidationIssue(value);
			if (issue !== undefined) context.addIssue({
				code: "custom",
				message: issue,
				continue: false
			});
		}).transform((value) => value);
		validatedJsonValue._zod.toJSONSchema = () => ({});
		jsonValueSchema = z.unknown().nonoptional().pipe(validatedJsonValue).transform(preserveJsonValue);
		jsonValueSchema._zod.toJSONSchema = () => ({});
		ownedJsonValueSchema = z.unknown().nonoptional().pipe(validatedJsonValue);
		ownedJsonValueSchema._zod.toJSONSchema = () => ({});
		objectValidation = z.custom(isRecord, "Expected JSON object");
		objectProjection = () => ({
			type: "object",
			additionalProperties: {}
		});
		objectValidation._zod.toJSONSchema = objectProjection;
		jsonObjectSchema = jsonValueSchema.pipe(objectValidation);
		jsonObjectSchema._zod.toJSONSchema = objectProjection;
		ownedJsonObjectSchema = ownedJsonValueSchema.pipe(objectValidation);
		ownedJsonObjectSchema._zod.toJSONSchema = objectProjection;
	})))();
}

//#endregion
//#region dist/domain/residualUnknownGraphError.js
var describeResidualUnknownGraphConstraint, InvalidResidualUnknownGraphError;
function init_residualUnknownGraphError() {
	return (init_residualUnknownGraphError = __esmMin((() => {
		describeResidualUnknownGraphConstraint = (constraint) => {
			switch (constraint.kind) {
				case "history_gap": return `Residual unknown ${constraint.unknown_id} revision history has a gap`;
				case "revision_chain": return `Residual unknown ${constraint.unknown_id} revision chain is broken`;
				case "missing_evidence": return `Residual unknown references missing evidence ${constraint.evidence_id}`;
				case "missing_unknown": return `Residual unknown references missing unknown ${constraint.related_unknown_id}`;
				case "contradicting_evidence": return `Residual unknown ${constraint.unknown_id} retains contradicting evidence`;
				case "resolution_unproven": return `Residual unknown ${constraint.unknown_id} has no qualifying resolution evidence`;
				case "dependency_cycle": return "Residual unknown dependency graph contains a cycle";
			}
		};
		InvalidResidualUnknownGraphError = class extends TypeError {
			constraint;
			constructor(constraint) {
				super(describeResidualUnknownGraphConstraint(constraint));
				this.constraint = constraint;
				this.name = "InvalidResidualUnknownGraphError";
			}
		};
	})))();
}

//#endregion
//#region dist/domain/inputArgumentGuidance.js
var PROCEDURE_OPERATIONS, ADDRESS_OPERATIONS, PATTERN_OPERATIONS, QUERY_OPERATIONS, PROCEDURE_INSTEAD_OF_ADDRESS, ADDRESS_INSTEAD_OF_PROCEDURE, PATTERN_INSTEAD_OF_QUERY, QUERY_INSTEAD_OF_PATTERN, knownArgumentMistakeGuidance, knownArgumentMistakeRemediation, knownViewMistakeGuidance;
function init_inputArgumentGuidance() {
	return (init_inputArgumentGuidance = __esmMin((() => {
		PROCEDURE_OPERATIONS = new Set([
			"analyze_function",
			"annotate_native_function",
			"inspect_native_api",
			"procedure_address",
			"procedure_assembly",
			"procedure_callees",
			"procedure_callers",
			"procedure_info",
			"procedure_pseudo_code",
			"procedure_references",
			"read_function_instructions",
			"trace_native_values"
		]);
		ADDRESS_OPERATIONS = new Set([
			"address_name",
			"address_to_file_offset",
			"comment",
			"get_call_graph",
			"goto_address",
			"inline_comment",
			"inspect_address_context",
			"inspect_native_instruction",
			"next_address",
			"prev_address",
			"read_bytes",
			"resolve_containing_procedure",
			"resolve_native_call_targets",
			"set_address_name",
			"set_bookmark",
			"set_comment",
			"set_inline_comment",
			"unset_bookmark",
			"xrefs"
		]);
		PATTERN_OPERATIONS = new Set([
			"analyze_swift_types",
			"get_objc_classes",
			"search_bytes",
			"search_procedures",
			"search_strings"
		]);
		QUERY_OPERATIONS = new Set(["search_guidance", "trace_feature"]);
		PROCEDURE_INSTEAD_OF_ADDRESS = {
			expected: "procedure",
			message: "Unrecognized argument 'address'; did you mean 'procedure'?",
			remediation: "Use 'procedure' (a procedure name or address) instead of 'address'."
		};
		ADDRESS_INSTEAD_OF_PROCEDURE = {
			expected: "address",
			message: "Unrecognized argument 'procedure'; did you mean 'address'?",
			remediation: "Use 'address' instead of 'procedure'."
		};
		PATTERN_INSTEAD_OF_QUERY = {
			expected: "pattern",
			message: "Unrecognized argument 'query'; did you mean 'pattern'?",
			remediation: "Use 'pattern' instead of 'query'."
		};
		QUERY_INSTEAD_OF_PATTERN = {
			expected: "query",
			message: "Unrecognized argument 'pattern'; did you mean 'query'?",
			remediation: "Use 'query' instead of 'pattern'."
		};
		knownArgumentMistakeGuidance = (operation, argumentName) => {
			if (operation === undefined) return undefined;
			if (argumentName === "address" && PROCEDURE_OPERATIONS.has(operation)) return PROCEDURE_INSTEAD_OF_ADDRESS;
			if (argumentName === "procedure" && ADDRESS_OPERATIONS.has(operation)) return ADDRESS_INSTEAD_OF_PROCEDURE;
			if (argumentName === "query" && PATTERN_OPERATIONS.has(operation)) return PATTERN_INSTEAD_OF_QUERY;
			if (argumentName === "pattern" && QUERY_OPERATIONS.has(operation)) return QUERY_INSTEAD_OF_PATTERN;
			return undefined;
		};
		knownArgumentMistakeRemediation = (operation, issues) => {
			const hints = [];
			const seen = new Set();
			for (const issue of issues) {
				if (issue.reason !== "unknown_argument" || issue.path.length !== 1) continue;
				const key = issue.path[0];
				if (typeof key !== "string") continue;
				const guidance = knownArgumentMistakeGuidance(operation, key);
				if (guidance !== undefined && issue.expected === guidance.expected && !seen.has(guidance.remediation)) {
					seen.add(guidance.remediation);
					hints.push(guidance.remediation);
				}
			}
			return hints.length === 0 ? undefined : hints.join(" ");
		};
		knownViewMistakeGuidance = (operation, input, path) => {
			if (operation !== "inspect_analysis_view") return undefined;
			const isViewProjection = path.length >= 2 && path[path.length - 2] === "view" && path[path.length - 1] === "projection";
			if (!isViewProjection) return undefined;
			const rawView = typeof input === "object" && input !== null ? input.view ?? input.input?.view : undefined;
			if (typeof rawView !== "object" || rawView === null) return undefined;
			const viewRecord = rawView;
			if (viewRecord.kind === "javascript" && viewRecord.collection === "modules" && viewRecord.projection === undefined) {
				return {
					message: "To page modules, use view: { kind: 'page', collection: 'modules' }. For module references, specify projection: 'references'.",
					remediation: "Use view: { kind: 'page', collection: 'modules' } to page modules, or set projection: 'references'."
				};
			}
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/artifactOperationError.js
var ARTIFACT_INTEGRITY_CHECKS, ArtifactOperationError, artifactDetailsMessage;
function init_artifactOperationError() {
	return (init_artifactOperationError = __esmMin((() => {
		init_artifactIntegrity();
		init_analysisErrorBase();
		ARTIFACT_INTEGRITY_CHECKS = [
			"foreign-entry",
			"entry-metadata",
			"container-identity",
			"unpacked-entry-identity",
			"member-identity",
			"image-checksum",
			"read-coverage",
			"declared-size",
			"reader-ownership",
			"declared-digest",
			"layout-consistency",
			"reconstruction",
			"inventory-node",
			"output-readback",
			"output-lifecycle",
			"traversal-coverage"
		];
		ArtifactOperationError = class extends AnalysisError {
			operation;
			reason;
			artifactDetails;
			detail;
			_tag = "ArtifactOperationError";
			userMessage;
			remediationAction;
			admission;
			boundary;
			readerLimit;
			parserLimit;
			/** For a `limit` reason, the release-fixed allowance that refused the input. */
			fixedAllowance;
			/** For an `integrity` reason, the check the producing reader named. */
			integrityCheck;
			constructor(operation, reason, artifactDetails, detail, options) {
				super(artifactDetails === undefined ? `Artifact ${operation} failed: ${reason}` : artifactDetailsMessage(operation, reason, artifactDetails), options);
				this.operation = operation;
				this.reason = reason;
				this.artifactDetails = artifactDetails;
				this.detail = detail;
				this.admission = options?.admission;
				this.boundary = options?.boundary;
				this.readerLimit = options?.readerLimit;
				this.parserLimit = options?.parserLimit;
				this.fixedAllowance = options?.fixedAllowance;
				this.integrityCheck = options?.integrityCheck;
				this.remediationAction = options?.remediationAction;
				this.userMessage = options?.userMessage ?? (options?.admission === undefined ? undefined : detail);
			}
		};
		artifactDetailsMessage = (operation, reason, details) => {
			const { logical_path, ...facts } = projectArtifactIntegrityDetails(details);
			const description = Object.entries(facts).map(([key, value]) => `${key}=${String(value ?? "unavailable")}`).join(", ");
			return `Artifact ${operation} failed: ${reason} at ${logical_path} (${description})`;
		};
	})))();
}

//#endregion
//#region dist/domain/apple/appleBundleTypes.js
var APPLE_BUNDLE_EXTENSION, OPENABLE_APPLE_BUNDLE_EXTENSIONS, openableAppleBundleExtension, UNOPENED_APPLE_BUNDLE_EXTENSIONS, isUnopenedAppleBundleExtension, OPENABLE_APPLE_BUNDLE_TYPES_TEXT, INFO_PLIST_DECODE_MIB;
function init_appleBundleTypes() {
	return (init_appleBundleTypes = __esmMin((() => {
		APPLE_BUNDLE_EXTENSION = /\.(?:app|appex|xpc|framework|systemextension|dext|bundle|plugin|qlgenerator|mdimporter)$/iu;
		OPENABLE_APPLE_BUNDLE_EXTENSIONS = [
			".app",
			".appex",
			".framework",
			".xpc",
			".systemextension",
			".bundle",
			".plugin"
		];
		openableAppleBundleExtension = (extension) => {
			const lower = extension.toLowerCase();
			return OPENABLE_APPLE_BUNDLE_EXTENSIONS.find((candidate) => candidate === lower);
		};
		UNOPENED_APPLE_BUNDLE_EXTENSIONS = [
			".dext",
			".kext",
			".qlgenerator",
			".mdimporter"
		];
		isUnopenedAppleBundleExtension = (extension) => UNOPENED_APPLE_BUNDLE_EXTENSIONS.includes(extension.toLowerCase());
		OPENABLE_APPLE_BUNDLE_TYPES_TEXT = OPENABLE_APPLE_BUNDLE_EXTENSIONS.join(", ");
		INFO_PLIST_DECODE_MIB = 16;
	})))();
}

//#endregion
//#region dist/kernel/errorMessage.js
var errorMessage;
function init_errorMessage() {
	return (init_errorMessage = __esmMin((() => {
		errorMessage = (cause) => cause instanceof Error ? cause.message : String(cause);
	})))();
}

//#endregion
//#region dist/domain/evidenceErrors.js
var EvidenceIntegrityError, AnalysisSnapshotMismatchError, ResourceSnapshotMismatchError, EvidenceReferenceError, EvidenceFileError;
function init_evidenceErrors() {
	return (init_evidenceErrors = __esmMin((() => {
		init_analysisErrorBase();
		EvidenceIntegrityError = class extends AnalysisError {
			_tag = "EvidenceIntegrityError";
			userMessage;
			/** For a two-sided comparison input, the side whose Evidence failed. */
			side;
			/** The first failing location inside that Evidence or its result, when schema-located. */
			issuePath;
			/** The constraint a schema refinement named on that first issue. */
			constraint;
			/** Schema issues after the first, which the message only summarizes. */
			remainingIssueCount;
			constructor(message, options) {
				super(message, options);
				this.userMessage = options?.userMessage;
				this.side = options?.side;
				this.issuePath = options?.issuePath;
				this.constraint = options?.constraint;
				this.remainingIssueCount = options?.remainingIssueCount;
			}
		};
		AnalysisSnapshotMismatchError = class extends EvidenceIntegrityError {
			bindingMismatch;
			constructor(message, bindingMismatch) {
				super(message);
				this.bindingMismatch = bindingMismatch;
			}
		};
		ResourceSnapshotMismatchError = class extends AnalysisSnapshotMismatchError {
			operation;
			constructor(operation) {
				super("Analysis snapshots do not apply to a resource-only app session because it has no executable identity or replay binding.");
				this.operation = operation;
			}
		};
		EvidenceReferenceError = class extends EvidenceIntegrityError {
			evidenceId;
			reason;
			expected;
			actual;
			/** Set when the consuming workflow requires retained closure. */
			referenceScope;
			constructor(evidenceId, reason, options) {
				super(`Evidence reference ${reason}: ${evidenceId}`, options);
				this.evidenceId = evidenceId;
				this.reason = reason;
				this.expected = options.expected;
				this.actual = options.actual;
				this.referenceScope = options.referenceScope;
			}
		};
		EvidenceFileError = class extends AnalysisError {
			operation;
			reason;
			_tag = "EvidenceFileError";
			userMessage;
			/** Caller-selected path that failed, resolved against the working directory. */
			path;
			/** Present only when a write committed before cleanup failed. */
			published;
			/** Schema issues relative to the selected file's JSON root, never the request envelope. */
			contentIssues;
			systemCode;
			/** For `wrong-kind`: the recognized kind the file holds instead, when known. */
			detectedKind;
			constructor(operation, reason, options) {
				super(`Evidence bundle ${operation} failed: ${reason}`, options);
				this.operation = operation;
				this.reason = reason;
				this.path = options?.path;
				this.published = options?.published;
				this.userMessage = options?.userMessage;
				this.contentIssues = options?.contentIssues;
				this.systemCode = options?.systemCode;
				this.detectedKind = options?.detectedKind;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/unknownRegistryError.js
var UnknownRegistryError;
function init_unknownRegistryError() {
	return (init_unknownRegistryError = __esmMin((() => {
		init_analysisErrorBase();
		UnknownRegistryError = class extends AnalysisError {
			_tag = "UnknownRegistryError";
			constraint;
			reason;
			constructor(failure, options) {
				const reason = typeof failure === "string" ? failure : failure.kind === "history_gap" || failure.kind === "revision_chain" ? "integrity" : "constraint";
				super(`Residual unknown registry mutation failed: ${reason}`, options);
				this.reason = reason;
				this.constraint = typeof failure === "string" ? undefined : failure;
			}
		};
	})))();
}

//#endregion
//#region dist/domain/analysisResourceLimits.js
var DEFAULT_ASAR_MAX_HEADER_BYTES, MAXIMUM_ASAR_MAX_HEADER_BYTES, DEFAULT_ASAR_MAX_LISTING_BYTES, MAXIMUM_ASAR_MAX_LISTING_BYTES, DEFAULT_GHIDRA_VALUE_FLOW_MAX_OPERATIONS, DEFAULT_GHIDRA_VALUE_FLOW_MAX_INPUTS_PER_OPERATION, DEFAULT_GHIDRA_VALUE_FLOW_MAX_EDGES, MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS, MAXIMUM_GHIDRA_DECOMPILE_PAYLOAD_MIB, DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES, MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES, DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES, MAXIMUM_NATIVE_MATCHING_REPRESENTATION_BYTES, DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS, DEFAULT_HOPPER_STARTUP_TIMEOUT_MS, DEFAULT_HOPPER_CALLER_SCAN_BUDGET_MS, MINIMUM_HOPPER_CALLER_SCAN_BUDGET_MS, MAX_NODE_TIMER_DELAY_MS, deadlineParameterLimit, TIMER_DURATION_MINIMUM_MS, timerDurationMsSchema, MAX_GHIDRA_DECOMPILE_TIMEOUT_SECONDS, DEFAULT_REGEX_MATCHING_DEADLINE_MS, DEFAULT_REGEX_WORKER_HEAP_REQUEST_MIB, MINIMUM_REGEX_WORKER_HEAP_REQUEST_MIB, MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB, DEFAULT_CAPTURE_DECODER_OLD_GENERATION_MIB, CAPTURE_DECODER_SEMI_SPACE_MIB, MAXIMUM_CAPTURE_DECODER_OLD_GENERATION_MIB, DEFAULT_JADX_OPERATION_TIMEOUT_MS, DEFAULT_DEBUGGER_COMMAND_DEADLINE_MS, MINIMUM_DEBUGGER_COMMAND_DEADLINE_MS, DEFAULT_DEBUGGER_MAX_SESSIONS, MINIMUM_DEBUGGER_MAX_SESSIONS, MAXIMUM_DEBUGGER_MAX_SESSIONS, DEFAULT_DEBUGGER_MAX_PENDING_COMMANDS, MINIMUM_DEBUGGER_MAX_PENDING_COMMANDS, MAXIMUM_DEBUGGER_MAX_PENDING_COMMANDS, DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, NODE_MAX_STRING_LENGTH, DEBUGGER_OUTPUT_JSON_ESCAPE_CODE_UNITS, DEBUGGER_OUTPUT_EVIDENCE_ENVELOPE_CODE_UNITS, MINIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, MAXIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, DEBUGGER_CONTROL_REPLY_BYTES, DEFAULT_BRIDGE_MAX_REQUEST_BYTES, MINIMUM_BRIDGE_MAX_REQUEST_BYTES, MAXIMUM_BRIDGE_MAX_REQUEST_BYTES, DEFAULT_BRIDGE_MAX_REPLY_BYTES, MINIMUM_BRIDGE_MAX_REPLY_BYTES, MAXIMUM_BRIDGE_MAX_REPLY_BYTES, DEFAULT_JEB_MCP_TIMEOUT_MS, DEFAULT_KUNA_PROJECT_TIMEOUT_MS, DEFAULT_KUNA_FUNCTION_TIMEOUT_MS, DEFAULT_PWNTOOLS_MAX_INPUT_BYTES, MAXIMUM_PWNTOOLS_MAX_INPUT_BYTES, DEFAULT_CAPTURE_PACKET_JSON_EXPANSION_BYTES, MINIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES, MAXIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES, DEFAULT_WINDOWS_CHANGE_TIME_DRIFT_MS, MAXIMUM_WINDOWS_CHANGE_TIME_DRIFT_MS, DEFAULT_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS, MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS, DEFAULT_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS, MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS, DEFAULT_ZSTD_MAX_FRAMES, MINIMUM_ZSTD_MAX_FRAMES, MAXIMUM_ZSTD_MAX_FRAMES;
function init_analysisResourceLimits() {
	return (init_analysisResourceLimits = __esmMin((() => {
		DEFAULT_ASAR_MAX_HEADER_BYTES = 16 * 1024 * 1024;
		MAXIMUM_ASAR_MAX_HEADER_BYTES = 256 * 1024 * 1024;
		DEFAULT_ASAR_MAX_LISTING_BYTES = 64 * 1024 * 1024;
		MAXIMUM_ASAR_MAX_LISTING_BYTES = Number.MAX_SAFE_INTEGER;
		DEFAULT_GHIDRA_VALUE_FLOW_MAX_OPERATIONS = 3e3;
		DEFAULT_GHIDRA_VALUE_FLOW_MAX_INPUTS_PER_OPERATION = 64;
		DEFAULT_GHIDRA_VALUE_FLOW_MAX_EDGES = 12e3;
		MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS = 2147483647;
		MAXIMUM_GHIDRA_DECOMPILE_PAYLOAD_MIB = 2047;
		DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES = 524288;
		MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES = 8388608;
		DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES = 96 * 1024 * 1024;
		MAXIMUM_NATIVE_MATCHING_REPRESENTATION_BYTES = 1024 * 1024 * 1024;
		DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS = 33e4;
		DEFAULT_HOPPER_STARTUP_TIMEOUT_MS = 12e4;
		DEFAULT_HOPPER_CALLER_SCAN_BUDGET_MS = 2e3;
		MINIMUM_HOPPER_CALLER_SCAN_BUDGET_MS = 1;
		MAX_NODE_TIMER_DELAY_MS = 2147483647;
		deadlineParameterLimit = (parameter, timeoutMs, defaultMs) => ({
			control_kind: "parameter",
			parameter,
			effective_value: timeoutMs,
			unit: "ms",
			minimum: 1,
			maximum: MAX_NODE_TIMER_DELAY_MS,
			default_value: defaultMs,
			applies_at: "next_call"
		});
		TIMER_DURATION_MINIMUM_MS = 1;
		timerDurationMsSchema = z.int().min(1).max(MAX_NODE_TIMER_DELAY_MS);
		MAX_GHIDRA_DECOMPILE_TIMEOUT_SECONDS = Math.floor(MAX_NODE_TIMER_DELAY_MS / 1e3);
		DEFAULT_REGEX_MATCHING_DEADLINE_MS = 5e3;
		DEFAULT_REGEX_WORKER_HEAP_REQUEST_MIB = 128;
		MINIMUM_REGEX_WORKER_HEAP_REQUEST_MIB = 7;
		MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB = 16384;
		DEFAULT_CAPTURE_DECODER_OLD_GENERATION_MIB = 192;
		CAPTURE_DECODER_SEMI_SPACE_MIB = 8;
		MAXIMUM_CAPTURE_DECODER_OLD_GENERATION_MIB = 16384;
		DEFAULT_JADX_OPERATION_TIMEOUT_MS = 12e4;
		DEFAULT_DEBUGGER_COMMAND_DEADLINE_MS = 12e4;
		MINIMUM_DEBUGGER_COMMAND_DEADLINE_MS = 1;
		DEFAULT_DEBUGGER_MAX_SESSIONS = 8;
		MINIMUM_DEBUGGER_MAX_SESSIONS = 1;
		MAXIMUM_DEBUGGER_MAX_SESSIONS = 64;
		DEFAULT_DEBUGGER_MAX_PENDING_COMMANDS = 16;
		MINIMUM_DEBUGGER_MAX_PENDING_COMMANDS = 1;
		MAXIMUM_DEBUGGER_MAX_PENDING_COMMANDS = 256;
		DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES = 16 * 1024 * 1024;
		NODE_MAX_STRING_LENGTH = 536870888;
		DEBUGGER_OUTPUT_JSON_ESCAPE_CODE_UNITS = 6;
		DEBUGGER_OUTPUT_EVIDENCE_ENVELOPE_CODE_UNITS = 1024 * 1024;
		MINIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES = 1;
		MAXIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES = Math.floor((NODE_MAX_STRING_LENGTH - DEBUGGER_OUTPUT_EVIDENCE_ENVELOPE_CODE_UNITS) / DEBUGGER_OUTPUT_JSON_ESCAPE_CODE_UNITS);
		DEBUGGER_CONTROL_REPLY_BYTES = 16 * 1024 * 1024;
		DEFAULT_BRIDGE_MAX_REQUEST_BYTES = 16 * 1024 * 1024;
		MINIMUM_BRIDGE_MAX_REQUEST_BYTES = 7464;
		MAXIMUM_BRIDGE_MAX_REQUEST_BYTES = 536870888 - 1;
		DEFAULT_BRIDGE_MAX_REPLY_BYTES = 256 * 1024 * 1024;
		MINIMUM_BRIDGE_MAX_REPLY_BYTES = 1024 * 1024;
		MAXIMUM_BRIDGE_MAX_REPLY_BYTES = NODE_MAX_STRING_LENGTH;
		DEFAULT_JEB_MCP_TIMEOUT_MS = 6e4;
		DEFAULT_KUNA_PROJECT_TIMEOUT_MS = 30 * 60 * 1e3;
		DEFAULT_KUNA_FUNCTION_TIMEOUT_MS = 12e4;
		DEFAULT_PWNTOOLS_MAX_INPUT_BYTES = 32 * 1024 * 1024;
		MAXIMUM_PWNTOOLS_MAX_INPUT_BYTES = 1024 * 1024 * 1024;
		DEFAULT_CAPTURE_PACKET_JSON_EXPANSION_BYTES = 128 * 1024 ** 3;
		MINIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES = 1024 * 1024;
		MAXIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES = 128 * 1024 ** 3;
		DEFAULT_WINDOWS_CHANGE_TIME_DRIFT_MS = 2e3;
		MAXIMUM_WINDOWS_CHANGE_TIME_DRIFT_MS = 6e4;
		DEFAULT_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS = 25;
		MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS = 1e3;
		DEFAULT_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS = 40;
		MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS = 1e3;
		DEFAULT_ZSTD_MAX_FRAMES = 4096;
		MINIMUM_ZSTD_MAX_FRAMES = 1;
		MAXIMUM_ZSTD_MAX_FRAMES = 65536;
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptSemanticPrecision.js
var JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS, work, javaScriptSemanticPrecisionSchema, resolveJavaScriptSemanticPrecision;
function init_javascriptSemanticPrecision() {
	return (init_javascriptSemanticPrecision = __esmMin((() => {
		JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS = {
			primitive_candidates: 256,
			primitive_bytes: 1048576,
			expression_depth: 256,
			getter_expansions: 512,
			alias_selections: 512,
			wrapper_visits: 1e6,
			wrapper_depth: 128
		};
		work = z.number().int().min(1).max(Number.MAX_SAFE_INTEGER);
		javaScriptSemanticPrecisionSchema = z.strictObject({
			primitive_candidates: work.exactOptional(),
			primitive_bytes: work.exactOptional().describe(`Conservative JSON string-payload allowance per evaluated candidate set; default ${String(JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS.primitive_bytes)}. Admission charges six bytes per UTF-16 code unit plus quotes before creating concatenated strings, so ordinary ASCII can exhaust this estimate before its actual JSON encoding reaches the selected byte count. Independent of graph, checkpoint and worker-transfer budgets.`),
			expression_depth: work.exactOptional(),
			getter_expansions: work.exactOptional(),
			alias_selections: work.exactOptional(),
			wrapper_visits: work.exactOptional(),
			wrapper_depth: work.exactOptional()
		});
		resolveJavaScriptSemanticPrecision = (input) => input === undefined ? JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS : {
			...JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS,
			...input
		};
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptAnalysisResourceControls.js
var JAVASCRIPT_STATIC_FACT_BYTES, JAVASCRIPT_ANALYSIS_TRANSFER_RECORD_BYTES, JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS, JAVASCRIPT_WORKER_HEAP_MIB_MINIMUM, JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM, JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM, HEAP_DOES_NOT_RAISE, javaScriptWorkerHeapRemediation, JAVASCRIPT_PARENT_HEAP_NODE_OPTIONS, JAVASCRIPT_PARENT_RESULT_BUDGET_REMEDIATION, JAVASCRIPT_PARENT_CHECKPOINT_HEAP_REMEDIATION, javaScriptWorkerHeapExhaustionRecovery, semanticControl, semanticAdjustment, semanticCeilingControl, javaScriptSemanticCeilingCoverage, javaScriptAnalysisCoverageLimits, javaScriptAnalysisResourceControlsSchema;
function init_javascriptAnalysisResourceControls() {
	return (init_javascriptAnalysisResourceControls = __esmMin((() => {
		init_analysisResourceLimits();
		init_javascriptSemanticPrecision();
		JAVASCRIPT_STATIC_FACT_BYTES = 8 * 1024 * 1024;
		JAVASCRIPT_ANALYSIS_TRANSFER_RECORD_BYTES = 8 * 1024 * 1024;
		JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS = {
			heapMb: 1024,
			timeoutMs: 3e5,
			semanticNodes: 1e5,
			semanticNodesPerFile: 2e4,
			semanticUnknowns: 1e5,
			semanticUnknownsPerFile: 2e4
		};
		JAVASCRIPT_WORKER_HEAP_MIB_MINIMUM = 128;
		JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM = 16384;
		JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM = 1e6;
		HEAP_DOES_NOT_RAISE = "Raising max_heap_mb does not raise the parent result budget, transfer record or transfer file byte ceilings, the CLI/MCP process heap, or fixed parser limits.";
		javaScriptWorkerHeapRemediation = (heapMb) => {
			const bounds = `an integer from ${String(128)} to ${String(JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM)} (default ${String(JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS.heapMb)} MiB)`;
			const adjustment = heapMb >= 16384 ? `max_heap_mb is already ${String(heapMb)} MiB, the maximum ${String(JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM)}. Do not increase it further.` : `Increase max_heap_mb, ${bounds}.`;
			return `${adjustment} The effective worker heap for this analysis is ${String(heapMb)} MiB. A changed max_heap_mb applies on the next analysis, which starts a new worker. It does not change a worker that is already running, and it does not require restarting the REA server. ${HEAP_DOES_NOT_RAISE} On Bun, V8 heap flags are ignored: Windows limits the analyzer's committed memory to max_heap_mb plus a 512 MiB reserve, and other Bun hosts enforce no analyzer heap limit.`;
		};
		JAVASCRIPT_PARENT_HEAP_NODE_OPTIONS = "On Node, set NODE_OPTIONS (for example --max-old-space-size=<MiB>) in the environment that starts the CLI or MCP server, then restart that process,";
		JAVASCRIPT_PARENT_RESULT_BUDGET_REMEDIATION = `This limit belongs to the parent result budget. That budget follows the parent V8 heap limit. Increasing max_heap_mb does not raise it. ${JAVASCRIPT_PARENT_HEAP_NODE_OPTIONS} to raise the parent heap and this budget. Use the retained static facts or analyze fewer source files.`;
		JAVASCRIPT_PARENT_CHECKPOINT_HEAP_REMEDIATION = `This limit belongs to the parent process heap. Increasing max_heap_mb does not raise it. max_heap_mb changes only the isolated analyzer, on the next analysis, by starting a new worker. ${JAVASCRIPT_PARENT_HEAP_NODE_OPTIONS} to raise the parent heap and admit this checkpoint.`;
		javaScriptWorkerHeapExhaustionRecovery = (input) => {
			if (input.heapFlagsEnforced) return {
				reason: `Owned JavaScript worker exhausted its ${String(input.heapMb)} MiB V8 old-space heap (max_heap_mb) while analyzing ${input.path} during ${input.phase}`,
				remediationAction: javaScriptWorkerHeapRemediation(input.heapMb)
			};
			return {
				reason: `Owned JavaScript worker ran out of memory while analyzing ${input.path} during ${input.phase}. Bun ignores the V8 old-space flag, so this exit is not the configured max_heap_mb limit of ${String(input.heapMb)} MiB.`,
				remediationAction: "Bun ignores V8 heap flags, so raising max_heap_mb does not change this exit. Windows limits the analyzer's committed memory to max_heap_mb plus a 512 MiB reserve and reports that separately as a process memory limit. Other Bun hosts enforce no analyzer heap limit. Reduce the analysis instead of increasing max_heap_mb."
			};
		};
		semanticControl = {
			nodes: {
				total: "max_semantic_nodes",
				perFile: "max_semantic_nodes_per_file",
				ceiling: "semantic_graph_node_ceiling",
				fileCeiling: "semantic_graph_file_node_ceiling",
				totalDefault: JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS.semanticNodes,
				perFileDefault: JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS.semanticNodesPerFile,
				doesNotRaise: "max_semantic_unknowns, max_heap_mb, transfer ceilings, or the parent result budget"
			},
			unknowns: {
				total: "max_semantic_unknowns",
				perFile: "max_semantic_unknowns_per_file",
				ceiling: "semantic_graph_unknown_ceiling",
				fileCeiling: "semantic_graph_file_unknown_ceiling",
				totalDefault: JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS.semanticUnknowns,
				perFileDefault: JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS.semanticUnknownsPerFile,
				doesNotRaise: "max_semantic_nodes, max_heap_mb, transfer ceilings, or the parent result budget"
			}
		};
		semanticAdjustment = (name, value, fallback) => value >= 1e6 ? `${name} is already ${String(value)}, the maximum ${String(JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM)}. Do not increase it further.` : `${name} is ${String(value)} (default ${String(fallback)}; an integer from 1 to ${String(JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM)})`;
		semanticCeilingControl = (parameter, value, fallback) => ({
			control_kind: "parameter",
			parameter,
			effective_value: value,
			unit: "count",
			minimum: 1,
			maximum: JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM,
			default_value: fallback,
			applies_at: "next_call"
		});
		javaScriptSemanticCeilingCoverage = (kind, total, perFile, reached) => {
			const control = semanticControl[kind];
			const limits = [
				{
					name: control.ceiling,
					value: total,
					unit: "items"
				},
				{
					name: control.fileCeiling,
					value: perFile,
					unit: "items"
				},
				{
					name: control.total,
					value: total,
					unit: "items"
				},
				{
					name: control.perFile,
					value: perFile,
					unit: "items"
				}
			];
			const reachedControls = [...reached.total ? [{
				name: control.total,
				value: total,
				fallback: control.totalDefault
			}] : [], ...reached.perFile ? [{
				name: control.perFile,
				value: perFile,
				fallback: control.perFileDefault
			}] : []];
			if (reachedControls.length === 0) throw new RangeError("Semantic ceiling coverage requires a ceiling that stopped retention");
			const reachedText = reachedControls.map((item) => semanticAdjustment(item.name, item.value, item.fallback)).join(" and ");
			const names = reachedControls.map((item) => item.name).join(" and ");
			const raising = reachedControls.length === 1 ? "Raising it" : "Raising them";
			const limitation = `Semantic ${kind === "nodes" ? "node" : "unknown"} retention reached ${reachedText}. Set ${names} on the next analyze_javascript_application call; coverage.controls records ${reachedControls.length === 1 ? "it" : "them"}. The change applies to that next analysis and does not restart the worker or the REA server. ${raising} does not raise ${control.doesNotRaise}. Coverage reports the same effective values as ${control.ceiling} and ${control.fileCeiling}.`;
			const controls = reachedControls.map((item) => semanticCeilingControl(item.name, item.value, item.fallback));
			return {
				limits,
				controls,
				limitation
			};
		};
		javaScriptAnalysisCoverageLimits = (limits) => {
			const result = [];
			for (const key of [
				"worker_heap_limit_bytes",
				"worker_process_memory_limit_bytes",
				"worker_timeout_ms",
				"parent_result_budget_bytes",
				"parent_available_result_budget_bytes",
				"semantic_result_budget_bytes",
				"transfer_record_bytes",
				"transfer_file_bytes"
			]) {
				const value = limits?.[key];
				if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) continue;
				result.push({
					name: `javascript_analysis_${key}`,
					value,
					unit: key.endsWith("_ms") ? "milliseconds" : "bytes"
				});
			}
			return result;
		};
		javaScriptAnalysisResourceControlsSchema = z.strictObject({
			semantic_precision: javaScriptSemanticPrecisionSchema.optional().describe(`Per-source evaluator budgets. Omitted fields preserve defaults: ${Object.entries(JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS).map(([name, value]) => `${name} ${String(value)}`).join(", ")}. Raising these does not raise graph retention, worker memory, transfer or parent result budgets; cyclic and unsupported values remain unknown.`),
			max_semantic_nodes: z.number().int().min(1).max(JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM).optional().describe("Maximum retained semantic nodes across the application; defaults to 100000. Worker heap and parent result admission remain enforced."),
			max_semantic_nodes_per_file: z.number().int().min(1).max(JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM).optional().describe("Maximum retained semantic nodes per source file; defaults to 20000, additionally bounded by max_semantic_nodes and memory/transfer limits."),
			max_semantic_unknowns: z.number().int().min(1).max(JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM).optional().describe("Maximum retained semantic unknown records across the application; defaults to 100000. Omitted emission occurrences are counted by family and reason."),
			max_semantic_unknowns_per_file: z.number().int().min(1).max(JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM).optional().describe("Maximum retained semantic unknown records per source file; defaults to 20000, additionally bounded by max_semantic_unknowns and memory/transfer limits."),
			max_heap_mb: z.number().int().min(128).max(JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM).optional().describe("Maximum V8 old-space heap in MiB for the isolated JavaScript source analyzer; defaults to 1024. This does not change the CLI/MCP process heap. When REA runs on Bun, which ignores V8 heap flags, Windows instead limits the analyzer's committed memory to this budget plus a 512 MiB runtime reserve; other Bun hosts enforce no limit."),
			analysis_timeout_ms: timerDurationMsSchema.optional().describe("Maximum startup, analysis and transfer time per JavaScript source, in milliseconds; defaults to 300000. On timeout, return collected partial Evidence and stop the analysis.")
		});
	})))();
}

//#endregion
//#region dist/domain/coverage.js
var coverageStatusSchema, knownCoverageStatusSchema, completeOrUnknownCoverageSchema, joinCoverageStatus;
function init_coverage() {
	return (init_coverage = __esmMin((() => {
		coverageStatusSchema = z.enum([
			"complete",
			"partial",
			"unknown"
		]);
		knownCoverageStatusSchema = coverageStatusSchema.exclude(["unknown"]);
		completeOrUnknownCoverageSchema = coverageStatusSchema.exclude(["partial"]);
		joinCoverageStatus = (parts) => parts.includes("unknown") ? "unknown" : parts.includes("partial") ? "partial" : "complete";
	})))();
}

//#endregion
//#region dist/domain/wasm/wasmInterface.js
var kind, valueType, limit, signature, wasmInterfaceSchema, DEFAULT_WASM_INTERFACE_REPRESENTATION_BYTES, MAX_WASM_INTERFACE_REPRESENTATION_BYTES, wasmInterfaceByteBudgetSchema, wasmInterfaceEntryRepresentationBytes;
function init_wasmInterface() {
	return (init_wasmInterface = __esmMin((() => {
		init_coverage();
		kind = z.enum([
			"func",
			"table",
			"memory",
			"global",
			"tag",
			"unknown"
		]);
		valueType = z.enum([
			"i32",
			"i64",
			"f32",
			"f64",
			"v128",
			"funcref",
			"externref"
		]);
		limit = z.string().regex(/^(?:0|[1-9][0-9]*)$/u);
		signature = z.discriminatedUnion("kind", [
			z.object({
				kind: z.literal("func"),
				params: z.array(valueType),
				results: z.array(valueType)
			}),
			z.object({
				kind: z.literal("tag"),
				params: z.array(valueType),
				results: z.array(valueType)
			}),
			z.object({
				kind: z.literal("table"),
				element: z.enum(["funcref", "externref"]),
				address_type: z.enum(["i32", "i64"]),
				minimum: limit,
				maximum: limit.nullable(),
				shared: z.boolean()
			}),
			z.object({
				kind: z.literal("memory"),
				page_size: limit,
				address_type: z.enum(["i32", "i64"]),
				minimum: limit,
				maximum: limit.nullable(),
				shared: z.boolean()
			}),
			z.object({
				kind: z.literal("global"),
				value_type: valueType,
				mutable: z.boolean()
			})
		]);
		wasmInterfaceSchema = z.object({
			state: knownCoverageStatusSchema,
			entries: z.array(z.object({
				direction: z.enum(["import", "export"]),
				module: z.string().nullable(),
				name: z.string(),
				kind,
				index: z.int().nonnegative().max(4294967295).nullable(),
				signature: signature.nullable(),
				wat_form: z.string(),
				issue: z.string().nullable()
			}).superRefine((entry, context) => {
				if (entry.direction === "export" && entry.module !== null || entry.direction === "import" && entry.module === null) context.addIssue({
					code: "custom",
					message: "Interface direction does not match module-name presence"
				});
				if (entry.signature !== null && entry.signature.kind !== entry.kind) context.addIssue({
					code: "custom",
					message: "Interface kind does not match its typed signature"
				});
			})),
			issues: z.array(z.string())
		});
		DEFAULT_WASM_INTERFACE_REPRESENTATION_BYTES = 32 * 1024 * 1024;
		MAX_WASM_INTERFACE_REPRESENTATION_BYTES = constants.MAX_STRING_LENGTH;
		wasmInterfaceByteBudgetSchema = z.number().int().min(1).max(MAX_WASM_INTERFACE_REPRESENTATION_BYTES).exactOptional().describe(`Typed interface representation admission in bytes (default ${String(DEFAULT_WASM_INTERFACE_REPRESENTATION_BYTES)}, range 1..${String(MAX_WASM_INTERFACE_REPRESENTATION_BYTES)}; maximum follows the runtime string ceiling). Applies on the next inspection or comparison without restart. Raising this does not restore facts omitted from previously produced partial Evidence; inspect again with a larger producer budget first.`);
		wasmInterfaceEntryRepresentationBytes = (entry) => {
			let bytes = 1024 + [
				entry.module,
				entry.name,
				entry.wat_form,
				entry.issue
			].reduce((sum, value) => sum + (value?.length ?? 0) * 6, 0);
			const signature = entry.signature;
			if (signature?.kind === "func" || signature?.kind === "tag") bytes += (signature.params.length + signature.results.length) * 16;
			else if (signature !== null) {
				for (const value of Object.values(signature)) if (typeof value === "string") bytes += value.length * 6;
			}
			return bytes;
		};
	})))();
}

//#endregion
//#region dist/domain/schemaAnnotations.js
var annotations, schemaAnnotations, presentRootDiscriminator, presentCompleteObservation, annotatePatternDeclaration, presentObjectRoot;
function init_schemaAnnotations() {
	return (init_schemaAnnotations = __esmMin((() => {
		annotations = z.registry();
		schemaAnnotations = (schema) => annotations.get(schema);
		presentRootDiscriminator = (schema, discriminator) => {
			annotations.add(schema, {
				...annotations.get(schema),
				rootDiscriminator: discriminator
			});
			return schema;
		};
		presentCompleteObservation = (schema) => {
			const annotated = schema.clone();
			annotations.add(annotated, { completeObservation: true });
			return annotated;
		};
		annotatePatternDeclaration = (schema, relation) => {
			annotations.add(schema, {
				...annotations.get(schema),
				patternDeclaration: relation
			});
			return schema;
		};
		presentObjectRoot = (schema) => {
			annotations.add(schema, {
				...annotations.get(schema),
				objectRoot: true
			});
			return schema;
		};
	})))();
}

//#endregion
//#region dist/domain/schemaConstraints.js
var distinctItems, excludedValues, maxCodePoints, declarePresence, requirePresence, declaredPattern, declaredTokenPattern, declaredByPatterns, jsonDocumentText;
function init_schemaConstraints() {
	return (init_schemaConstraints = __esmMin((() => {
		init_schemaAnnotations();
		distinctItems = (schema, message) => schema.refine((items) => new Set(items).size === items.length, { message }).meta({ uniqueItems: true });
		excludedValues = (schema, values, message) => schema.refine((value) => !values.includes(value), { message }).meta({ not: { enum: [...values] } });
		maxCodePoints = (schema, maximum, message) => schema.refine((value) => {
			const characters = value[Symbol.iterator]();
			for (let count = 0; count <= maximum; count += 1) if (characters.next().done) return true;
			return false;
		}, {
			message,
			abort: true
		}).meta({ maxLength: maximum });
		declarePresence = (rules) => {
			const dependentRequired = {};
			const conditionals = [];
			for (const rule of rules) {
				if (rule.equals === undefined && rule.requiresValue === undefined) {
					(dependentRequired[rule.when] ??= []).push(rule.requires);
					continue;
				}
				conditionals.push({
					if: {
						...rule.equals === undefined ? {} : { properties: { [rule.when]: { const: rule.equals } } },
						required: [rule.when]
					},
					then: {
						required: [rule.requires],
						...rule.requiresValue === undefined ? {} : { properties: { [rule.requires]: { const: rule.requiresValue } } }
					}
				});
			}
			return {
				...Object.keys(dependentRequired).length === 0 ? {} : { dependentRequired },
				...conditionals.length === 1 ? conditionals[0] : conditionals.length > 1 ? { allOf: conditionals } : {}
			};
		};
		requirePresence = (schema, rules) => schema.superRefine((parsed, context) => {
			const value = parsed;
			for (const rule of rules) {
				const trigger = value[rule.when];
				if (trigger === undefined || rule.equals !== undefined && trigger !== rule.equals || (rule.requiresValue === undefined ? value[rule.requires] !== undefined : value[rule.requires] === rule.requiresValue)) continue;
				context.addIssue({
					code: "custom",
					path: [rule.path ?? rule.when],
					message: rule.message
				});
			}
		}).meta(declarePresence(rules));
		declaredPattern = (expression) => {
			if (expression.flags !== "" && expression.flags !== "u") throw new TypeError(`Pattern /${expression.source}/${expression.flags} has flags JSON Schema cannot declare`);
			return expression.source;
		};
		declaredTokenPattern = (schema, pattern) => schema.meta({ pattern: declaredPattern(pattern) });
		declaredByPatterns = (schema, predicate, declaration, check) => {
			const allOf = [...(declaration.matches ?? []).map((expression) => ({ pattern: declaredPattern(expression) })), ...(declaration.excludes ?? []).map((expression) => ({ not: { pattern: declaredPattern(expression) } }))];
			if (allOf.length === 0) throw new TypeError("A pattern declaration needs at least one pattern");
			return annotatePatternDeclaration(schema.refine(predicate, check).meta({ allOf }), declaration.relation);
		};
		jsonDocumentText = (schema, contentSchema) => schema.meta({
			contentMediaType: "application/json",
			...contentSchema === undefined ? {} : { contentSchema }
		});
	})))();
}

//#endregion
//#region dist/domain/stringPatterns.js
var IDENTIFIER_PATTERN, STABLE_IDENTIFIER_PATTERN, BASE64_QUARTET_LENGTH_PATTERN, INVALID_BASE64_CHARACTER_PATTERN, INVALID_BASE64_PADDING_PATTERN, INVALID_CANONICAL_BASE64_PAD_BITS_PATTERN, UNPAIRED_SURROGATE_PATTERN, rejectUnpairedSurrogates, isPaddedBase64, isCanonicalBase64, canonicalBase64Schema;
function init_stringPatterns() {
	return (init_stringPatterns = __esmMin((() => {
		init_schemaConstraints();
		IDENTIFIER_PATTERN = /^[A-Za-z][A-Za-z0-9._\x2d]*$/u;
		STABLE_IDENTIFIER_PATTERN = /^[A-Za-z][A-Za-z0-9._:\x2f\x2d]*$/u;
		BASE64_QUARTET_LENGTH_PATTERN = /^(?:....)*$/;
		INVALID_BASE64_CHARACTER_PATTERN = /[^A-Za-z0-9+\x2f=]/;
		INVALID_BASE64_PADDING_PATTERN = /(?:=[^=]|===)/;
		INVALID_CANONICAL_BASE64_PAD_BITS_PATTERN = /(?:[^AQgw]==$|[BCDFGHJKLNOPRSTVWXZabdefhijlmnpqrtuvxyz1235679+\x2f]=$)/;
		UNPAIRED_SURROGATE_PATTERN = /[\uD800-\uDFFF]/u;
		rejectUnpairedSurrogates = (schema, message) => schema.superRefine((value, context) => {
			if (UNPAIRED_SURROGATE_PATTERN.test(value)) context.addIssue({
				code: "invalid_format",
				format: "regex",
				message,
				input: value
			});
		});
		isPaddedBase64 = (value) => value.length % 4 === 0 && !INVALID_BASE64_CHARACTER_PATTERN.test(value) && !INVALID_BASE64_PADDING_PATTERN.test(value);
		isCanonicalBase64 = (value) => isPaddedBase64(value) && !INVALID_CANONICAL_BASE64_PAD_BITS_PATTERN.test(value);
		canonicalBase64Schema = declaredByPatterns(z.string(), isCanonicalBase64, {
			matches: [BASE64_QUARTET_LENGTH_PATTERN],
			excludes: [
				INVALID_BASE64_CHARACTER_PATTERN,
				INVALID_BASE64_PADDING_PATTERN,
				INVALID_CANONICAL_BASE64_PAD_BITS_PATTERN
			],
			relation: "exact"
		}, {
			message: "Expected canonical padded base64",
			abort: true
		});
	})))();
}

//#endregion
//#region dist/domain/localPath.js
var nulFreeStringSchema, localPathStringSchema, windowsAbsolutePathPattern, absoluteLocalPathStringSchema, isPathWithinRoot;
function init_localPath() {
	return (init_localPath = __esmMin((() => {
		init_stringPatterns();
		nulFreeStringSchema = z.string().regex(/^[^\x00]*$/u, "Local filesystem paths cannot contain NUL");
		localPathStringSchema = rejectUnpairedSurrogates(nulFreeStringSchema.min(1), "Local filesystem paths must contain well-formed Unicode");
		windowsAbsolutePathPattern = /^(?:[\x5C\x2F]|[A-Za-z]:[\x5C\x2F])/u;
		absoluteLocalPathStringSchema = localPathStringSchema.regex(windowsAbsolutePathPattern, {
			message: "must be an absolute local filesystem path",
			abort: true
		}).superRefine((value, context) => {
			if (!isAbsolute(value)) context.addIssue({
				code: "invalid_format",
				format: "regex",
				message: "must be an absolute local filesystem path",
				input: value
			});
		});
		isPathWithinRoot = (root, path) => {
			const value = relative(root, path);
			return value === "" || value !== ".." && !value.startsWith(`..${sep}`) && !isAbsolute(value);
		};
	})))();
}

//#endregion
//#region dist/kernel/sha256Hex.js
var sha256Hex;
function init_sha256Hex() {
	return (init_sha256Hex = __esmMin((() => {
		sha256Hex = (data, encoding) => (typeof data === "string" && encoding !== undefined ? createHash("sha256").update(data, encoding) : createHash("sha256").update(data)).digest("hex");
	})))();
}

//#endregion
//#region dist/domain/wasm/wasmArtifact.js
var WABT_VERSION, WABT_MINIMUM_PATCH, WABT_SOURCE_COMMIT, wabtReleaseBanner, digest, artifact, DEFAULT_WASM_COMMAND_TIMEOUT_MS, DEFAULT_WASM_ARTIFACT_PATHS, MAX_WASM_ARTIFACT_PATHS, WASM_RESOURCE_DEFAULTS, WASM_RESOURCE_MAXIMUMS, byteBudget, wasmArtifactPathsSchema, inspectWasmArtifactInputSchema, wasmResourceLimits, wasmArtifactSchema, wasmArtifactMatchesSubject;
function init_wasmArtifact() {
	return (init_wasmArtifact = __esmMin((() => {
		init_analysisResourceLimits();
		init_wasmInterface();
		init_coverage();
		init_localPath();
		init_sha256Hex();
		WABT_VERSION = "1.0.42";
		WABT_MINIMUM_PATCH = Number(WABT_VERSION.split(".")[2]);
		WABT_SOURCE_COMMIT = "ff0ef7e0009402740c805a9744c09b05be063e48";
		wabtReleaseBanner = z.string().regex(/^1\.0\.\d+$/u).refine((release) => Number(release.split(".")[2]) >= WABT_MINIMUM_PATCH, { message: `Expected one admitted WABT banner (^1.0.${String(WABT_MINIMUM_PATCH)})` });
		digest = z.string().regex(/^[a-f0-9]{64}$/);
		artifact = z.strictObject({
			path: z.string().min(1),
			sha256: digest,
			bytes: z.int().nonnegative()
		});
		DEFAULT_WASM_COMMAND_TIMEOUT_MS = 3e4;
		DEFAULT_WASM_ARTIFACT_PATHS = 16;
		MAX_WASM_ARTIFACT_PATHS = 4294967295;
		WASM_RESOURCE_DEFAULTS = {
			inputBytes: 8 * 1024 * 1024,
			toolBytes: 64 * 1024 * 1024,
			outputBytes: 32 * 1024 * 1024
		};
		WASM_RESOURCE_MAXIMUMS = {
			inputBytes: Math.min(constants.MAX_LENGTH, constants.MAX_STRING_LENGTH),
			toolBytes: constants.MAX_LENGTH,
			outputBytes: constants.MAX_STRING_LENGTH
		};
		byteBudget = (name, defaultValue, maximum) => z.number().int().min(1).max(maximum).exactOptional().describe(`${name} in bytes (default ${String(defaultValue)}; maximum ${String(maximum)}, the runtime representation limit). Applies to the next inspection; no restart. Does not raise the other byte budgets, command deadline, client receive budget or available host memory.`);
		wasmArtifactPathsSchema = (pathSchema = absoluteLocalPathStringSchema) => z.array(pathSchema);
		inspectWasmArtifactInputSchema = z.strictObject({
			path: absoluteLocalPathStringSchema.describe("Absolute selected local WASM artifact path"),
			glue_paths: wasmArtifactPathsSchema().default([]),
			candidate_paths: wasmArtifactPathsSchema().default([]),
			max_artifact_paths: z.number().int().min(1).max(MAX_WASM_ARTIFACT_PATHS).exactOptional().describe(`Maximum paths in each auxiliary glue/candidate selection (default ${String(16)}, range 1..${String(MAX_WASM_ARTIFACT_PATHS)}, the runtime Array-length ceiling). Admission occurs before reading files or starting WABT. Applies to the next inspection without restart; byte budgets remain independent.`),
			max_interface_bytes: wasmInterfaceByteBudgetSchema,
			max_input_bytes: byteBudget("Maximum bytes per selected module, candidate or glue file", WASM_RESOURCE_DEFAULTS.inputBytes, WASM_RESOURCE_MAXIMUMS.inputBytes),
			max_tool_bytes: byteBudget("Maximum bytes per caller-supplied WABT executable", WASM_RESOURCE_DEFAULTS.toolBytes, WASM_RESOURCE_MAXIMUMS.toolBytes),
			max_output_bytes: byteBudget("Combined retained stdout/stderr per WABT command", WASM_RESOURCE_DEFAULTS.outputBytes, WASM_RESOURCE_MAXIMUMS.outputBytes),
			command_timeout_ms: timerDurationMsSchema.exactOptional().describe(`Deadline in milliseconds for each WABT version/analysis command (default ${String(DEFAULT_WASM_COMMAND_TIMEOUT_MS)}), not the whole inspection. Allow additional client time for all commands, file checks and cleanup. Does not raise max_input_bytes, max_tool_bytes or max_output_bytes.`)
		});
		wasmResourceLimits = (input) => ({
			inputBytes: input.max_input_bytes ?? WASM_RESOURCE_DEFAULTS.inputBytes,
			toolBytes: input.max_tool_bytes ?? WASM_RESOURCE_DEFAULTS.toolBytes,
			outputBytes: input.max_output_bytes ?? WASM_RESOURCE_DEFAULTS.outputBytes
		});
		wasmArtifactSchema = z.strictObject({
			artifact,
			validation: z.literal("valid"),
			sections: z.array(z.strictObject({
				kind: z.string().min(1),
				start: z.int().nonnegative(),
				end: z.int().nonnegative(),
				bytes: z.int().nonnegative(),
				description: z.string()
			})),
			interface: wasmInterfaceSchema.exactOptional(),
			imports: z.array(z.string()),
			exports: z.array(z.string()),
			debug_name_metadata: z.enum([
				"unknown",
				"not-present",
				"complete",
				"uninterpretable"
			]).default("unknown"),
			custom_section_warnings: z.array(z.strictObject({
				tool: z.enum([
					"wasm-validate",
					"wasm-objdump",
					"wasm2wat"
				]),
				text: z.string().min(1)
			})).nullable().default(null),
			headers: z.string(),
			details: z.string(),
			wat: z.strictObject({
				text: z.string().min(1),
				sha256: digest,
				representation: z.literal("decoded-wat")
			}),
			tool_profile: z.strictObject({
				source: z.literal("https://github.com/WebAssembly/wabt"),
				release: wabtReleaseBanner,
				/**
				* Names the verified upstream revision only when that release is what
				* ran; a caller-supplied newer 1.0.x build has no revision REA knows, so
				* the field is null rather than a claim about a build that did not run.
				*/
				source_commit: z.literal(WABT_SOURCE_COMMIT).nullable(),
				commands: z.array(z.strictObject({
					tool: z.enum([
						"wasm-validate",
						"wasm-objdump",
						"wasm2wat"
					]),
					path: z.string().min(1),
					sha256: digest,
					version_banner: z.string(),
					arguments: z.array(z.string())
				})).length(3),
				timeout_ms: z.int().positive(),
				output_budget_bytes: z.int().positive()
			}),
			candidates: z.array(artifact),
			glue: z.array(z.strictObject({
				artifact,
				parse_status: z.enum([...knownCoverageStatusSchema.options, "failed"]),
				references: z.array(z.strictObject({
					value: z.string(),
					line: z.int().positive(),
					column: z.int().nonnegative(),
					candidate_paths: z.array(z.string()),
					association: z.enum([
						"local-path-candidate",
						"basename-candidates",
						"unresolved"
					]),
					evidence_kind: z.literal("static-literal")
				}))
			})),
			runtime_execution: z.literal("not-performed"),
			network_fetch: z.literal("not-performed"),
			limitations: z.array(z.string())
		}).superRefine((value, context) => {
			if (sha256Hex(value.wat.text) !== value.wat.sha256) context.addIssue({
				code: "custom",
				path: ["wat", "sha256"],
				message: "Decoded WAT digest does not match its UTF-8 text."
			});
			const selected = value.candidates[0];
			if (selected?.path !== value.artifact.path || selected.sha256 !== value.artifact.sha256 || selected.bytes !== value.artifact.bytes) context.addIssue({
				code: "custom",
				path: ["candidates"],
				message: "Selected candidate does not match artifact identity."
			});
			const tolerantCustomSections = value.tool_profile.commands[0]?.arguments.includes("--ignore-custom-section-errors");
			const releaseVersion = value.tool_profile.release;
			if (value.tool_profile.source_commit !== null && releaseVersion !== "1.0.42") context.addIssue({
				code: "custom",
				path: ["tool_profile", "source_commit"],
				message: "The known WABT source revision applies only to its verified release; other releases require an unknown source commit."
			});
			for (const [index, command] of value.tool_profile.commands.entries()) {
				const expected = [
					"wasm-validate",
					"wasm-objdump",
					"wasm2wat"
				][index];
				const argumentsExpected = command.tool === "wasm-objdump" ? [
					"-h",
					"-x",
					"module.wasm"
				] : tolerantCustomSections ? [
					"--enable-all",
					"--ignore-custom-section-errors",
					"module.wasm"
				] : ["--enable-all", "module.wasm"];
				if (command.tool !== expected || command.version_banner.trim() !== releaseVersion || JSON.stringify(command.arguments) !== JSON.stringify(argumentsExpected)) context.addIssue({
					code: "custom",
					path: [
						"tool_profile",
						"commands",
						index
					],
					message: "Unexpected WABT command profile."
				});
			}
			for (const [index, section] of value.sections.entries()) if (section.end > value.artifact.bytes || section.end - section.start !== section.bytes) context.addIssue({
				code: "custom",
				path: ["sections", index],
				message: "Section range does not match selected artifact bytes."
			});
		});
		wasmArtifactMatchesSubject = (artifact, subject) => subject != null && subject.sha256 === artifact.sha256 && subject.format === "file";
	})))();
}

//#endregion
//#region dist/domain/analysisSettingDefinitions.js
var timer, ghidraDecompileOperations, windowsChangeTimeOperations, hopperAndGhidraBridgeOperations, ANALYSIS_SETTINGS, analysisSettingIds, analysisSettingIdSchema, analysisSettingLimitSchema, analysisParameterLimitSchema, analysisResultLimitSchema, recordedControlSchemas, analysisSettingDefinition, analysisSettingValueSchema, selectedAnalysisSetting, analysisSettingLimit, invocationLimit, invocationSettingLimit;
function init_analysisSettingDefinitions() {
	return (init_analysisSettingDefinitions = __esmMin((() => {
		init_analysisResourceLimits();
		init_javascriptAnalysisResourceControls();
		init_wasmArtifact();
		timer = {
			minimum: 1,
			maximum: MAX_NODE_TIMER_DELAY_MS,
			unit: "ms",
			appliesAt: "next_operation"
		};
		ghidraDecompileOperations = [
			"procedure_pseudo_code",
			"analyze_function",
			"inspect_native_api",
			"decompile_all",
			"trace_native_values"
		];
		windowsChangeTimeOperations = [
			"open_binary",
			"export_web_scripts",
			"capture_process_scenario",
			"compare_process_captures",
			"inspect_analysis_view",
			"compare_bundles",
			"import_evidence_bundle",
			"inspect_android_package",
			"search_android_classes",
			"inspect_android_class",
			"inspect_android_method",
			"trace_android_references",
			"inventory_artifact",
			"inspect_artifact",
			"extract_artifact",
			"inspect_binary_layout",
			"inspect_recorded_crash"
		];
		hopperAndGhidraBridgeOperations = [
			"open_binary",
			"address_name",
			"comment",
			"current_address",
			"current_procedure",
			"current_document",
			"goto_address",
			"inline_comment",
			"list_bookmarks",
			"list_documents",
			"list_names",
			"list_procedures",
			"list_segments",
			"list_strings",
			"next_address",
			"prev_address",
			"procedure_address",
			"procedure_assembly",
			"procedure_callees",
			"procedure_callers",
			"procedure_info",
			"read_function_instructions",
			"read_bytes",
			"address_to_file_offset",
			"procedure_references",
			"procedure_pseudo_code",
			"resolve_containing_procedure",
			"search_procedures",
			"search_strings",
			"set_address_name",
			"set_addresses_names",
			"set_bookmark",
			"set_comment",
			"set_inline_comment",
			"unset_bookmark",
			"xrefs",
			"analyze_function",
			"binary_overview",
			"inspect_native_load_image",
			"search_bytes",
			"annotate_native_function",
			"inspect_native_data_type",
			"inspect_native_instruction",
			"resolve_native_call_targets"
		];
		ANALYSIS_SETTINGS = {
			"ghidra.decompile_max_payload_mib": {
				updateMode: "runtime",
				environment: "REA_GHIDRA_DECOMPILE_MAX_PAYLOAD_MIB",
				defaultValue: null,
				minimum: 1,
				maximum: MAXIMUM_GHIDRA_DECOMPILE_PAYLOAD_MIB,
				unit: "MiB",
				appliesAt: "next_operation",
				provider: "ghidra",
				operations: ghidraDecompileOperations
			},
			"asar.max_listing_bytes": {
				updateMode: "runtime",
				environment: "REA_ASAR_MAX_LISTING_BYTES",
				defaultValue: DEFAULT_ASAR_MAX_LISTING_BYTES,
				minimum: 1,
				maximum: MAXIMUM_ASAR_MAX_LISTING_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "rea-artifact-graph",
				relatedProviders: [
					"rea-javascript-application",
					"rea-cdp-electron",
					"rea-v8-inspector"
				],
				operations: [
					"open_binary",
					"inspect_artifact",
					"inventory_artifact",
					"extract_artifact",
					"analyze_javascript_application",
					"inspect_electron_page",
					"observe_javascript_runtime"
				]
			},
			"ghidra.value_flow_max_operations": {
				updateMode: "runtime",
				environment: "REA_GHIDRA_VALUE_FLOW_MAX_OPERATIONS",
				defaultValue: DEFAULT_GHIDRA_VALUE_FLOW_MAX_OPERATIONS,
				minimum: 1,
				maximum: MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS,
				unit: "count",
				appliesAt: "next_operation",
				provider: "ghidra",
				operations: [
					"analyze_function",
					"inspect_native_api",
					"trace_native_values"
				]
			},
			"ghidra.value_flow_max_inputs_per_operation": {
				updateMode: "runtime",
				environment: "REA_GHIDRA_VALUE_FLOW_MAX_INPUTS_PER_OPERATION",
				defaultValue: 64,
				minimum: 1,
				maximum: MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS,
				unit: "count",
				appliesAt: "next_operation",
				provider: "ghidra",
				operations: [
					"analyze_function",
					"inspect_native_api",
					"trace_native_values"
				]
			},
			"ghidra.value_flow_max_edges": {
				updateMode: "runtime",
				environment: "REA_GHIDRA_VALUE_FLOW_MAX_EDGES",
				defaultValue: DEFAULT_GHIDRA_VALUE_FLOW_MAX_EDGES,
				minimum: 1,
				maximum: MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS,
				unit: "count",
				appliesAt: "next_operation",
				provider: "ghidra",
				operations: [
					"analyze_function",
					"inspect_native_api",
					"trace_native_values"
				]
			},
			"asar.max_header_bytes": {
				updateMode: "runtime",
				environment: "REA_ASAR_MAX_HEADER_BYTES",
				defaultValue: DEFAULT_ASAR_MAX_HEADER_BYTES,
				minimum: 1,
				maximum: MAXIMUM_ASAR_MAX_HEADER_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "rea-artifact-graph",
				relatedProviders: [
					"rea-javascript-application",
					"rea-cdp-electron",
					"rea-v8-inspector"
				],
				operations: [
					"open_binary",
					"inspect_artifact",
					"inventory_artifact",
					"extract_artifact",
					"analyze_javascript_application",
					"inspect_electron_page",
					"observe_javascript_runtime"
				]
			},
			"ghidra.startup_timeout_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_GHIDRA_STARTUP_TIMEOUT_MS",
				defaultValue: DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS,
				appliesAt: "next_startup",
				provider: "ghidra",
				operations: [
					"open_binary",
					"binary_overview",
					"list_documents",
					"list_procedures",
					"search_procedures",
					"list_strings",
					"search_strings",
					"procedure_pseudo_code",
					"procedure_assembly",
					"analyze_function",
					"decompile_all",
					"trace_native_values"
				]
			},
			"hopper.startup_timeout_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_HOPPER_STARTUP_TIMEOUT_MS",
				defaultValue: DEFAULT_HOPPER_STARTUP_TIMEOUT_MS,
				appliesAt: "next_startup",
				provider: "hopper",
				operations: [
					"open_binary",
					"binary_overview",
					"list_documents",
					"list_procedures",
					"search_procedures",
					"list_strings",
					"search_strings",
					"procedure_pseudo_code",
					"procedure_assembly",
					"analyze_function",
					"decompile_all",
					"trace_native_values"
				]
			},
			"ghidra.decompile_timeout_seconds": {
				updateMode: "runtime",
				environment: "REA_GHIDRA_DECOMPILE_TIMEOUT_SECONDS",
				defaultValue: null,
				minimum: 1,
				maximum: MAX_GHIDRA_DECOMPILE_TIMEOUT_SECONDS,
				unit: "seconds",
				appliesAt: "next_operation",
				provider: "ghidra",
				operations: ghidraDecompileOperations
			},
			"jadx.operation_timeout_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_JADX_OPERATION_TIMEOUT_MS",
				defaultValue: DEFAULT_JADX_OPERATION_TIMEOUT_MS,
				provider: "jadx",
				operations: [
					"inspect_android_package",
					"search_android_classes",
					"inspect_android_class",
					"inspect_android_method",
					"trace_android_references"
				]
			},
			"regex.matching_deadline_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_REGEX_MATCHING_DEADLINE_MS",
				defaultValue: DEFAULT_REGEX_MATCHING_DEADLINE_MS,
				maximum: MAX_NODE_TIMER_DELAY_MS,
				provider: "regex",
				relatedProviders: [
					"ida",
					"hopper",
					"kuna"
				],
				operations: ["search_strings", "search_procedures"]
			},
			"regex.worker_heap_request_mib": {
				updateMode: "runtime",
				environment: "REA_REGEX_WORKER_HEAP_REQUEST_MIB",
				defaultValue: 128,
				minimum: 7,
				maximum: MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB,
				unit: "MiB",
				appliesAt: "next_worker",
				provider: "regex",
				relatedProviders: [
					"ida",
					"hopper",
					"kuna"
				],
				operations: ["search_strings", "search_procedures"]
			},
			"capture.decoder_old_generation_mib": {
				updateMode: "runtime",
				environment: "REA_CAPTURE_DECODER_OLD_GENERATION_MIB",
				defaultValue: 192,
				minimum: 8,
				maximum: MAXIMUM_CAPTURE_DECODER_OLD_GENERATION_MIB,
				unit: "MiB",
				appliesAt: "next_worker",
				provider: "capture",
				operations: ["inspect_web_network_capture"]
			},
			"capture.packet_json_expansion_bytes": {
				updateMode: "runtime",
				environment: "REA_CAPTURE_PACKET_JSON_EXPANSION_BYTES",
				defaultValue: DEFAULT_CAPTURE_PACKET_JSON_EXPANSION_BYTES,
				minimum: MINIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES,
				maximum: MAXIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "tshark-capture",
				operations: ["inspect_packet_capture"]
			},
			"javascript.analysis_timeout_ms": {
				updateMode: "runtime",
				...timer,
				defaultValue: JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS.timeoutMs,
				provider: "rea-javascript-application",
				operations: ["analyze_javascript_application"],
				parameter: "analysis_timeout_ms"
			},
			"javascript.max_heap_mb": {
				updateMode: "runtime",
				defaultValue: JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS.heapMb,
				minimum: 128,
				maximum: JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM,
				unit: "MiB",
				appliesAt: "next_worker",
				provider: "rea-javascript-application",
				operations: ["analyze_javascript_application"],
				parameter: "max_heap_mb"
			},
			"javascript.member_mutation_alias_states": {
				updateMode: "runtime",
				environment: "REA_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES",
				defaultValue: DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES,
				minimum: 1,
				maximum: MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES,
				unit: "count",
				appliesAt: "next_operation",
				provider: "rea-javascript-application",
				relatedProviders: ["web-bundle-static-analysis"],
				operations: ["analyze_javascript_application", "analyze_web_bundle"]
			},
			"wasm.command_timeout_ms": {
				updateMode: "runtime",
				...timer,
				defaultValue: DEFAULT_WASM_COMMAND_TIMEOUT_MS,
				maximum: MAX_NODE_TIMER_DELAY_MS,
				provider: "wabt-artifact",
				operations: ["inspect_wasm_artifact"],
				parameter: "command_timeout_ms"
			},
			"native.matching_representation_bytes": {
				updateMode: "runtime",
				environment: "REA_NATIVE_MATCHING_REPRESENTATION_BYTES",
				defaultValue: DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES,
				minimum: 1,
				maximum: MAXIMUM_NATIVE_MATCHING_REPRESENTATION_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "rea-function-comparison",
				operations: ["match_native_functions"]
			},
			"bridge.max_request_bytes": {
				updateMode: "runtime",
				environment: "REA_BRIDGE_MAX_REQUEST_BYTES",
				defaultValue: DEFAULT_BRIDGE_MAX_REQUEST_BYTES,
				minimum: MINIMUM_BRIDGE_MAX_REQUEST_BYTES,
				maximum: MAXIMUM_BRIDGE_MAX_REQUEST_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "hopper",
				relatedProviders: ["ghidra", "cutter"],
				operations: [
					...hopperAndGhidraBridgeOperations,
					"list_cutter_sessions",
					"cutter_command"
				]
			},
			"bridge.max_reply_bytes": {
				updateMode: "runtime",
				environment: "REA_BRIDGE_MAX_REPLY_BYTES",
				defaultValue: DEFAULT_BRIDGE_MAX_REPLY_BYTES,
				minimum: MINIMUM_BRIDGE_MAX_REPLY_BYTES,
				maximum: MAXIMUM_BRIDGE_MAX_REPLY_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "hopper",
				relatedProviders: ["ghidra"],
				operations: hopperAndGhidraBridgeOperations
			},
			"debugger.command_deadline_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_DEBUGGER_COMMAND_DEADLINE_MS",
				defaultValue: DEFAULT_DEBUGGER_COMMAND_DEADLINE_MS,
				minimum: 1,
				maximum: MAX_NODE_TIMER_DELAY_MS,
				provider: "gdb",
				relatedProviders: ["rizin"],
				operations: [
					"start_gdb_session",
					"gdb_console",
					"close_gdb_session",
					"start_rizin_debug_session",
					"rizin_debug_command",
					"close_rizin_debug_session"
				]
			},
			"debugger.max_command_output_bytes": {
				updateMode: "runtime",
				environment: "REA_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES",
				defaultValue: DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES,
				minimum: 1,
				maximum: MAXIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "gdb",
				relatedProviders: ["rizin"],
				operations: ["gdb_console", "rizin_debug_command"]
			},
			"hopper.caller_scan_budget_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_HOPPER_CALLER_SCAN_BUDGET_MS",
				defaultValue: DEFAULT_HOPPER_CALLER_SCAN_BUDGET_MS,
				minimum: 1,
				provider: "hopper",
				operations: [
					"procedure_callers",
					"analyze_function",
					"procedure_references"
				]
			},
			"jeb.mcp_timeout_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_JEB_MCP_TIMEOUT_MS",
				defaultValue: DEFAULT_JEB_MCP_TIMEOUT_MS,
				provider: "jeb",
				operations: [
					"inspect_jeb_client",
					"open_jeb_project",
					"list_jeb_units",
					"decompile_jeb_item"
				]
			},
			"kuna.project_timeout_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_KUNA_PROJECT_TIMEOUT_MS",
				defaultValue: DEFAULT_KUNA_PROJECT_TIMEOUT_MS,
				provider: "kuna",
				operations: [
					"list_strings",
					"search_strings",
					"list_procedures",
					"search_procedures",
					"xrefs",
					"procedure_callers",
					"procedure_callees",
					"procedure_pseudo_code",
					"procedure_assembly",
					"analyze_function"
				]
			},
			"kuna.function_timeout_ms": {
				updateMode: "runtime",
				...timer,
				environment: "REA_KUNA_TIMEOUT_MS",
				defaultValue: DEFAULT_KUNA_FUNCTION_TIMEOUT_MS,
				provider: "kuna",
				operations: [
					"procedure_pseudo_code",
					"procedure_assembly",
					"analyze_function",
					"list_procedures"
				]
			},
			"pwntools.max_input_bytes": {
				updateMode: "runtime",
				environment: "REA_PWNTOOLS_MAX_INPUT_BYTES",
				defaultValue: DEFAULT_PWNTOOLS_MAX_INPUT_BYTES,
				minimum: 1,
				maximum: MAXIMUM_PWNTOOLS_MAX_INPUT_BYTES,
				unit: "bytes",
				appliesAt: "next_operation",
				provider: "pwntools",
				operations: ["inspect_binary_layout", "inspect_recorded_crash"],
				parameter: "producer_limits.input_bytes"
			},
			"windows.change_time_drift_ms": {
				updateMode: "runtime",
				environment: "REA_WINDOWS_CHANGE_TIME_DRIFT_MS",
				defaultValue: DEFAULT_WINDOWS_CHANGE_TIME_DRIFT_MS,
				minimum: 1,
				maximum: MAXIMUM_WINDOWS_CHANGE_TIME_DRIFT_MS,
				unit: "ms",
				appliesAt: "next_operation",
				provider: "rea-artifact-graph",
				relatedProviders: ["jadx"],
				operations: windowsChangeTimeOperations
			},
			"windows.change_time_settle_poll_ms": {
				updateMode: "runtime",
				environment: "REA_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS",
				defaultValue: 25,
				minimum: 1,
				maximum: MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS,
				unit: "ms",
				appliesAt: "next_operation",
				provider: "rea-artifact-graph",
				relatedProviders: ["jadx"],
				operations: windowsChangeTimeOperations
			},
			"windows.change_time_settle_max_polls": {
				updateMode: "runtime",
				environment: "REA_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS",
				defaultValue: 40,
				minimum: 1,
				maximum: MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS,
				unit: "count",
				appliesAt: "next_operation",
				provider: "rea-artifact-graph",
				relatedProviders: ["jadx"],
				operations: windowsChangeTimeOperations
			},
			"zstd.max_frames": {
				updateMode: "runtime",
				environment: "REA_ZSTD_MAX_FRAMES",
				defaultValue: DEFAULT_ZSTD_MAX_FRAMES,
				minimum: 1,
				maximum: MAXIMUM_ZSTD_MAX_FRAMES,
				unit: "count",
				appliesAt: "next_operation",
				provider: "rea-artifact-graph",
				relatedProviders: [
					"gpu-code-objects",
					"rea-dwarf-units",
					"rea-elf-notes",
					"rea-binary-hardening",
					"rea-elf-unwind-ranges",
					"rea-native-exports",
					"rea-native-initializers",
					"rea-kernel-module",
					"rea-elf-debug-link",
					"go-build-info",
					"rust-auditable",
					"il2cpp-metadata",
					"jadx"
				],
				operations: [
					"inspect_artifact",
					"extract_artifact",
					"inspect_gpu_code_objects",
					"inspect_dwarf_units",
					"inspect_elf_notes",
					"inspect_binary_hardening",
					"inspect_elf_unwind_ranges",
					"inspect_native_exports",
					"inspect_native_initializers",
					"inspect_kernel_module",
					"inspect_elf_debug_link",
					"inspect_go_binary",
					"inspect_rust_binary",
					"inspect_il2cpp_metadata",
					"inspect_android_jni_bindings"
				]
			}
		};
		analysisSettingIds = Object.keys(ANALYSIS_SETTINGS);
		analysisSettingIdSchema = z.enum(analysisSettingIds);
		analysisSettingLimitSchema = z.strictObject({
			setting: analysisSettingIdSchema,
			effective_value: z.number().nullable(),
			unit: z.enum([
				"bytes",
				"ms",
				"seconds",
				"MiB",
				"count"
			]),
			minimum: z.number(),
			maximum: z.number(),
			source: z.enum([
				"default",
				"setting",
				"runtime",
				"request"
			]).exactOptional(),
			applies_at: z.enum([
				"next_operation",
				"next_worker",
				"next_startup"
			]),
			agent_editable: z.literal(true),
			scope: z.literal("rea-runtime"),
			update_mode: z.enum([
				"runtime",
				"restart",
				"parameter"
			]),
			pending_restart: z.literal(false),
			required_value: z.number().exactOptional(),
			parameter: z.string().exactOptional()
		});
		analysisParameterLimitSchema = z.strictObject({
			control_kind: z.literal("parameter"),
			parameter: z.string(),
			effective_value: z.number(),
			unit: z.enum([
				"bytes",
				"ms",
				"seconds",
				"MiB",
				"count"
			]),
			minimum: z.number(),
			maximum: z.number(),
			default_value: z.number(),
			applies_at: z.literal("next_call")
		});
		analysisResultLimitSchema = z.union([analysisSettingLimitSchema, analysisParameterLimitSchema]);
		recordedControlSchemas = z.registry();
		recordedControlSchemas.add(analysisSettingLimitSchema, { recordedControl: true });
		recordedControlSchemas.add(analysisParameterLimitSchema, { recordedControl: true });
		analysisSettingDefinition = (id) => ANALYSIS_SETTINGS[id];
		analysisSettingValueSchema = (id) => {
			const definition = analysisSettingDefinition(id);
			const number = z.number().int().min(definition.minimum).max(definition.maximum);
			return id === "ghidra.decompile_timeout_seconds" || id === "ghidra.decompile_max_payload_mib" ? number.nullable() : number;
		};
		selectedAnalysisSetting = (request, override, fallback) => {
			if (request !== undefined) return {
				value: request,
				source: "request"
			};
			if (override !== undefined) return {
				value: override,
				source: "runtime"
			};
			return {
				value: fallback,
				source: "default"
			};
		};
		analysisSettingLimit = (setting, effective_value, source) => {
			const definition = analysisSettingDefinition(setting);
			return {
				setting,
				effective_value,
				...source === undefined ? {} : { source },
				unit: definition.unit,
				minimum: definition.minimum,
				maximum: definition.maximum,
				applies_at: definition.appliesAt,
				agent_editable: true,
				scope: "rea-runtime",
				update_mode: source === "request" ? "parameter" : definition.updateMode,
				pending_restart: false,
				...definition.parameter === undefined ? {} : { parameter: definition.parameter }
			};
		};
		invocationLimit = (limit) => {
			if (!("control_kind" in limit)) return invocationSettingLimit(limit);
			return limit.control_kind === "environment" ? {
				...limit,
				applies_at: "next_invocation"
			} : { ...limit };
		};
		invocationSettingLimit = ({ applies_at: _appliesAt, scope: _scope, ...facts }) => {
			const environment = analysisSettingDefinition(facts.setting).environment;
			return {
				...facts,
				applies_at: "next_invocation",
				scope: "rea-invocation",
				...environment === undefined ? {} : { environment }
			};
		};
	})))();
}

//#endregion
//#region dist/domain/fixedAllowanceRemediation.js
var FIXED_ALLOWANCE_KINDS, unchangedRequest, fixedAllowanceRemediation, fixedAllowanceOptions, fixedProducerInputAllowance;
function init_fixedAllowanceRemediation() {
	return (init_fixedAllowanceRemediation = __esmMin((() => {
		FIXED_ALLOWANCE_KINDS = [
			"parser",
			"count",
			"bytes",
			"report",
			"input",
			"capture",
			"live",
			"work"
		];
		unchangedRequest = "Repeating the unchanged request fails the same way.";
		fixedAllowanceRemediation = (allowance, kind) => {
			switch (kind) {
				case "parser": return `${allowance} is a fixed allowance. Worker memory limits, inherited limits, and additional host memory do not raise it. Select another complete input within the allowance when that preserves the needed observation. ${unchangedRequest}`;
				case "count": return `${allowance} is a fixed count. Waiting for an active analysis to finish does not raise it. ${unchangedRequest}`;
				case "bytes": return `${allowance} is a fixed byte allowance. Waiting for an active analysis to finish does not raise it. ${unchangedRequest}`;
				case "report": return `${allowance} is a fixed report allowance. This refusal does not leave a completed report or Evidence record to retrieve, and complete CLI JSON does not raise it. ${unchangedRequest}`;
				case "input": return `Select a suitable complete artifact within ${allowance}. Increasing an evidence-reply file-size allowance does not admit this input. Do not truncate required bytes. ${unchangedRequest}`;
				case "capture": return `${allowance} is a fixed capture allowance. Worker memory limits, inherited limits, and additional host memory do not raise it. ${unchangedRequest}`;
				case "live": return `${allowance} is a fixed capture allowance. Worker memory limits, inherited limits, and additional host memory do not raise it. Capturing the same output exceeds the allowance again; live output may change between requests.`;
				case "work": return `${allowance} is a fixed work allowance. Worker CPU limits and additional CPU time do not raise it. Select another complete artifact within the allowance. ${unchangedRequest}`;
			}
		};
		fixedAllowanceOptions = (allowance, kind, facts = {}) => ({
			retryable: false,
			fixedAllowance: {
				name: allowance,
				kind,
				...facts
			}
		});
		fixedProducerInputAllowance = (bytes, allowance) => fixedAllowanceOptions(allowance, "input", {
			limit: bytes,
			unit: "bytes"
		});
	})))();
}

//#endregion
//#region dist/domain/parseFailure.js
var reportedParseLimit, ParseFailureError, failureWith, malformedInput, truncatedInput, unsupportedInput, decodeLimit, HOST_CAPACITY_MESSAGES, HOST_CAPACITY_CODES, hostRangeErrorKind, isHostLimitFailure, parseFailureFromCause;
function init_parseFailure() {
	return (init_parseFailure = __esmMin((() => {
		reportedParseLimit = ({ name, maximum, required }) => ({
			boundary: name,
			maximum,
			...required === undefined ? {} : { required: typeof required === "bigint" ? String(required) : required }
		});
		ParseFailureError = class extends Error {
			failure;
			_tag = "ParseFailureError";
			constructor(failure, options) {
				super(failure.detail, options);
				this.failure = failure;
				this.name = "ParseFailureError";
			}
			get kind() {
				return this.failure.kind;
			}
		};
		failureWith = (failure, cause) => new ParseFailureError(failure, cause === undefined ? undefined : { cause });
		malformedInput = (format, detail, { cause, ...at } = {}) => failureWith({
			kind: "malformed",
			format,
			detail,
			...at
		}, cause);
		truncatedInput = (format, detail, { cause, ...at } = {}) => failureWith({
			kind: "truncated",
			format,
			detail,
			...at
		}, cause);
		unsupportedInput = (format, detail, { cause, undecodedContent = false, ...at } = {}) => failureWith({
			kind: "unsupported",
			format,
			detail,
			...at,
			undecodedContent
		}, cause);
		decodeLimit = (format, detail, limit, { cause, ...at } = {}) => failureWith({
			kind: "limit",
			format,
			detail,
			...at,
			limit
		}, cause);
		HOST_CAPACITY_MESSAGES = new Set([
			"Invalid string length",
			"Array buffer allocation failed",
			"Invalid array length"
		]);
		HOST_CAPACITY_CODES = new Set(["ERR_STRING_TOO_LONG", "ERR_BUFFER_TOO_LARGE"]);
		hostRangeErrorKind = (cause) => {
			if (!(cause instanceof Error)) return undefined;
			const code = "code" in cause ? String(cause.code) : undefined;
			if (code !== undefined && HOST_CAPACITY_CODES.has(code)) return "host-capacity";
			if (!(cause instanceof RangeError)) return undefined;
			if (cause.message === "Maximum call stack size exceeded") return "stack-overflow";
			if (HOST_CAPACITY_MESSAGES.has(cause.message) || cause.message.startsWith("Invalid typed array length")) return "host-capacity";
			return undefined;
		};
		isHostLimitFailure = (cause) => {
			const kind = hostRangeErrorKind(cause);
			return kind === "stack-overflow" || kind === "host-capacity";
		};
		parseFailureFromCause = (cause) => {
			if (cause instanceof ParseFailureError) return cause;
			return undefined;
		};
	})))();
}

//#endregion
//#region dist/domain/jsonSerialization.js
/** Encode ordinary JSON as bounded string parts without a document-sized allocation. */
function* jsonParts(value, pretty = false) {
	yield* encodeValue(value, pretty, false);
}
/** Encode validated JSON with canonical key ordering without allocating the whole document. */
function* canonicalJsonParts(value) {
	yield* encodeValue(value, false, true);
}
/** Buffer JSON parts while preserving complete UTF-16 surrogate pairs. */
function* bufferedJsonParts(parts) {
	let buffer = "";
	for (const part of parts) {
		if (buffer.length + part.length > 64 * 1024 && buffer !== "") {
			yield buffer;
			buffer = "";
		}
		buffer += part;
	}
	if (buffer !== "") yield buffer;
}
function* encodeString(value) {
	if (value.length <= 8192) {
		yield JSON.stringify(value);
		return;
	}
	yield "\"";
	for (let start = 0; start < value.length;) {
		let end = Math.min(start + 8192, value.length);
		const last = value.charCodeAt(end - 1);
		const next = value.charCodeAt(end);
		if (end < value.length && last >= 55296 && last <= 56319 && next >= 56320 && next <= 57343) end -= 1;
		yield JSON.stringify(value.slice(start, end)).slice(1, -1);
		start = end;
	}
	yield "\"";
}
/**
* Encode iteratively into bounded parts. Recursive `yield*` delegation passed
* every token through one generator frame per nesting level, which dominated
* the cost of writing large nested results.
*/
function* encodeValue(root, pretty, canonical) {
	const ancestors = new Set();
	const stack = [];
	let buffer = "";
	let pending = root;
	let hasPending = true;
	while (true) {
		if (hasPending) {
			hasPending = false;
			const text = scalarText(pending);
			if (text !== undefined) buffer += text;
			else if (typeof pending === "string") {
				if (buffer !== "") yield buffer;
				buffer = "";
				yield* encodeString(pending);
			} else {
				const frame = openContainer(pending, stack.length, ancestors, canonical);
				stack.push(frame);
				buffer += frame.array ? "[" : "{";
			}
		}
		if (buffer.length >= PART_CHARACTERS) {
			yield buffer;
			buffer = "";
		}
		const frame = stack.at(-1);
		if (frame === undefined) break;
		const member = nextMember(frame);
		if (member !== undefined && frame.written > 0) buffer += ",";
		if (pretty && (member !== undefined || frame.written > 0)) {
			if (buffer.length === PART_CHARACTERS) {
				yield buffer;
				buffer = "";
			}
			buffer += "\n";
			let spaces = 2 * (frame.depth + (member === undefined ? 0 : 1));
			while (buffer.length + spaces >= PART_CHARACTERS) {
				const available = PART_CHARACTERS - buffer.length;
				yield buffer + INDENT_SPACES.slice(0, available);
				buffer = "";
				spaces -= available;
			}
			buffer += INDENT_SPACES.slice(0, spaces);
		}
		if (member === undefined) {
			buffer += frame.array ? "]" : "}";
			ancestors.delete(frame.value);
			stack.pop();
			continue;
		}
		if (member.key !== undefined) {
			const key = scalarText(member.key);
			if (key !== undefined) buffer += key;
			else {
				if (buffer !== "") yield buffer;
				buffer = "";
				yield* encodeString(member.key);
			}
			buffer += pretty ? ": " : ":";
		}
		frame.written += 1;
		pending = member.item;
		hasPending = true;
	}
	if (buffer !== "") yield buffer;
}
var jsonStringCodeUnits, jsonByteLength, jsonTextCodeUnits, equalJsonText, PART_CHARACTERS, INDENT_SPACES, scalarText, openContainer, nextMember;
function init_jsonSerialization() {
	return (init_jsonSerialization = __esmMin((() => {
		jsonStringCodeUnits = (value) => {
			let length = value.length + 2;
			for (let index = 0; index < value.length; index += 1) {
				const code = value.charCodeAt(index);
				if (code === 34 || code === 92) length += 1;
				else if (code < 32) length += code === 8 || code === 9 || code === 10 || code === 12 || code === 13 ? 1 : 5;
				else if (code >= 55296 && code <= 57343) {
					const next = value.charCodeAt(index + 1);
					if (code <= 56319 && next >= 56320 && next <= 57343) index += 1;
					else length += 5;
				}
			}
			return length;
		};
		jsonByteLength = (value) => {
			let bytes = 0;
			for (const part of jsonParts(value)) bytes += Buffer.byteLength(part, "utf8");
			return bytes;
		};
		jsonTextCodeUnits = (value) => {
			let length = 0;
			for (const part of jsonParts(value)) length += part.length;
			return length;
		};
		equalJsonText = (left, right) => {
			const a = jsonParts(left);
			const b = jsonParts(right);
			let x = a.next();
			let y = b.next();
			let i = 0;
			let j = 0;
			try {
				while (!x.done && !y.done) {
					const length = Math.min(x.value.length - i, y.value.length - j);
					if (x.value.slice(i, i + length) !== y.value.slice(j, j + length)) return false;
					i += length;
					j += length;
					if (i === x.value.length) {
						x = a.next();
						i = 0;
					}
					if (j === y.value.length) {
						y = b.next();
						j = 0;
					}
				}
				return x.done === true && y.done === true;
			} finally {
				a.return(undefined);
				b.return(undefined);
			}
		};
		PART_CHARACTERS = 16 * 1024;
		INDENT_SPACES = " ".repeat(PART_CHARACTERS);
		scalarText = (value) => {
			if (typeof value === "string") return value.length <= 8192 ? JSON.stringify(value) : undefined;
			if (value === null) return "null";
			if (typeof value === "boolean") return String(value);
			if (typeof value === "number" && Number.isFinite(value)) return String(value);
			return undefined;
		};
		openContainer = (value, depth, ancestors, canonical) => {
			if (typeof value !== "object" || value === null) throw new TypeError("JSON output requires ordinary JSON values");
			if (ancestors.has(value)) throw new TypeError("JSON output contains a circular reference");
			const array = Array.isArray(value);
			if (!array && Object.prototype.toString.call(value) !== "[object Object]") throw new TypeError("JSON output requires ordinary JSON objects");
			ancestors.add(value);
			const keys = array ? undefined : Object.keys(value);
			if (canonical) keys?.sort();
			const count = array ? value.length : keys?.length ?? 0;
			return {
				value,
				array,
				keys,
				count,
				depth,
				index: 0,
				written: 0
			};
		};
		nextMember = (frame) => {
			while (frame.index < frame.count) {
				const index = frame.index;
				frame.index += 1;
				if (frame.array) return {
					key: undefined,
					item: Reflect.get(frame.value, index)
				};
				const key = frame.keys?.[index];
				if (key === undefined) throw new TypeError("JSON object changed during serialization");
				const item = Reflect.get(frame.value, key);
				if (item !== undefined && typeof item !== "function" && typeof item !== "symbol") return {
					key,
					item
				};
			}
			return undefined;
		};
	})))();
}

//#endregion
export { ANALYSIS_RESOURCE_KINDS, ANALYSIS_SETTINGS, APPLE_BUNDLE_EXTENSION, ARTIFACT_INTEGRITY_CHECKS, AnalysisAccessDeniedError, AnalysisArtifactChangedError, AnalysisCancelledError, AnalysisCapabilityUnavailableError, AnalysisError, AnalysisInputError, AnalysisOutputError, AnalysisProtocolError, AnalysisResourceConstraintError, AnalysisSnapshotMismatchError, AnalysisTimeoutError, AnalysisUnsupportedTargetError, ArtifactOperationError, BinaryTargetError, CallerAbort, ConfigurationError, DEBUGGER_CONTROL_REPLY_BYTES, DEFAULT_ASAR_MAX_HEADER_BYTES, DEFAULT_ASAR_MAX_LISTING_BYTES, DEFAULT_BRIDGE_MAX_REPLY_BYTES, DEFAULT_BRIDGE_MAX_REQUEST_BYTES, DEFAULT_CAPTURE_PACKET_JSON_EXPANSION_BYTES, DEFAULT_DEBUGGER_COMMAND_DEADLINE_MS, DEFAULT_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, DEFAULT_GHIDRA_STARTUP_TIMEOUT_MS, DEFAULT_GHIDRA_VALUE_FLOW_MAX_EDGES, DEFAULT_GHIDRA_VALUE_FLOW_MAX_OPERATIONS, DEFAULT_HOPPER_CALLER_SCAN_BUDGET_MS, DEFAULT_HOPPER_STARTUP_TIMEOUT_MS, DEFAULT_JADX_OPERATION_TIMEOUT_MS, DEFAULT_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES, DEFAULT_JEB_MCP_TIMEOUT_MS, DEFAULT_KUNA_FUNCTION_TIMEOUT_MS, DEFAULT_KUNA_PROJECT_TIMEOUT_MS, DEFAULT_NATIVE_MATCHING_REPRESENTATION_BYTES, DEFAULT_PWNTOOLS_MAX_INPUT_BYTES, DEFAULT_REGEX_MATCHING_DEADLINE_MS, DEFAULT_WASM_COMMAND_TIMEOUT_MS, DEFAULT_WASM_INTERFACE_REPRESENTATION_BYTES, DEFAULT_WINDOWS_CHANGE_TIME_DRIFT_MS, DEFAULT_ZSTD_MAX_FRAMES, EvidenceFileError, EvidenceIntegrityError, EvidenceReferenceError, FIXED_ALLOWANCE_KINDS, IDENTIFIER_PATTERN, INVALID_BASE64_CHARACTER_PATTERN, INVALID_BASE64_PADDING_PATTERN, INVALID_CANONICAL_BASE64_PAD_BITS_PATTERN, InvalidResidualUnknownGraphError, JAVASCRIPT_ANALYSIS_RESOURCE_DEFAULTS, JAVASCRIPT_ANALYSIS_TRANSFER_RECORD_BYTES, JAVASCRIPT_PARENT_CHECKPOINT_HEAP_REMEDIATION, JAVASCRIPT_PARENT_HEAP_NODE_OPTIONS, JAVASCRIPT_PARENT_RESULT_BUDGET_REMEDIATION, JAVASCRIPT_SEMANTIC_ITEM_MAXIMUM, JAVASCRIPT_SEMANTIC_PRECISION_DEFAULTS, JAVASCRIPT_STATIC_FACT_BYTES, JAVASCRIPT_WORKER_HEAP_MIB_MAXIMUM, MAXIMUM_ASAR_MAX_HEADER_BYTES, MAXIMUM_ASAR_MAX_LISTING_BYTES, MAXIMUM_BRIDGE_MAX_REPLY_BYTES, MAXIMUM_BRIDGE_MAX_REQUEST_BYTES, MAXIMUM_CAPTURE_DECODER_OLD_GENERATION_MIB, MAXIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES, MAXIMUM_DEBUGGER_MAX_COMMAND_OUTPUT_BYTES, MAXIMUM_GHIDRA_DECOMPILE_PAYLOAD_MIB, MAXIMUM_GHIDRA_VALUE_FLOW_RECORDS, MAXIMUM_JAVASCRIPT_MEMBER_MUTATION_ALIAS_STATES, MAXIMUM_NATIVE_MATCHING_REPRESENTATION_BYTES, MAXIMUM_PWNTOOLS_MAX_INPUT_BYTES, MAXIMUM_REGEX_WORKER_HEAP_REQUEST_MIB, MAXIMUM_WINDOWS_CHANGE_TIME_DRIFT_MS, MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_MAX_POLLS, MAXIMUM_WINDOWS_CHANGE_TIME_SETTLE_POLL_MS, MAXIMUM_ZSTD_MAX_FRAMES, MAX_GHIDRA_DECOMPILE_TIMEOUT_SECONDS, MAX_JSON_DEPTH, MAX_NODE_TIMER_DELAY_MS, MAX_WASM_ARTIFACT_PATHS, MAX_WASM_INTERFACE_REPRESENTATION_BYTES, MINIMUM_BRIDGE_MAX_REPLY_BYTES, MINIMUM_BRIDGE_MAX_REQUEST_BYTES, MINIMUM_CAPTURE_PACKET_JSON_EXPANSION_BYTES, NoBinaryOpenError, OPENABLE_APPLE_BUNDLE_TYPES_TEXT, OwnerCancellation, ParseFailureError, ProviderOwnedAnalysisError, ResourceSnapshotMismatchError, STABLE_IDENTIFIER_PATTERN, SUPPORTED_NODE_VERSION_PROSE, SUPPORTED_NODE_VERSION_RANGE, TRANSPORT_CREDENTIAL_HEADERS, UnknownRegistryError, WABT_SOURCE_COMMIT, WABT_VERSION, WASM_RESOURCE_DEFAULTS, WASM_RESOURCE_MAXIMUMS, absoluteLocalPathStringSchema, analysisCleanupRetrySchema, analysisErrorRecoverySchema, analysisParameterLimitSchema, analysisResultLimitSchema, analysisSettingDefinition, analysisSettingIdSchema, analysisSettingIds, analysisSettingLimit, analysisSettingValueSchema, artifactContainerIntegrityDetails, artifactDfuCrc32PairSchema, artifactIntegrityClaimSchema, artifactIntegrityDetails, artifactIntegrityPair, artifactIntegrityPairOf, artifactMd5PairSchema, artifactSha256PairSchema, blocksProcessStart, bufferedJsonParts, canBorrowParsedJsonSnapshot, cancelledBy, canonicalBase64Schema, canonicalJsonParts, carriedReason, cleanupRetryRecovery, cleanupRetryRemediation, completeOrUnknownCoverageSchema, coverageStatusSchema, deadlineParameterLimit, declaredByPatterns, declaredTokenPattern, decodeLimit, describeResidualUnknownGraphConstraint, distinctItems, domainErrorTag, equalJsonText, equalJsonValues, errorMessage, excludedValues, explicitTextSpellings, explicitUtf16Spellings, explicitUtf8Spellings, explicitValueSpans, explicitValuesOccurIn, fixedAllowanceOptions, fixedAllowanceRemediation, fixedCeilingConstraint, fixedProducerInputAllowance, freezeJsonSnapshot, freezeOwnedJsonSnapshotSteps, freezeOwnedJsonTreeSnapshot, hostRangeErrorKind, immutableJsonSnapshotMember, init_analysisErrorBase, init_analysisErrorCore, init_analysisErrorRecovery, init_analysisResourceLimits, init_analysisSettingDefinitions, init_appleBundleTypes, init_artifactIntegrity, init_artifactOperationError, init_configurationErrors, init_coverage, init_errorMessage, init_evidenceErrors, init_explicitSensitiveValues, init_fixedAllowanceRemediation, init_immutableJson, init_inputArgumentGuidance, init_isRecord, init_javascriptAnalysisResourceControls, init_javascriptSemanticPrecision, init_jsonSerialization, init_jsonValue, init_localPath, init_parseFailure, init_processStart, init_residualUnknownGraphError, init_runtimeVersion, init_schemaAnnotations, init_schemaConstraints, init_sha256Hex, init_stringPatterns, init_unknownRegistryError, init_wasmArtifact, init_wasmInterface, inspectWasmArtifactInputSchema, invocationLimit, isAborted, isCanonicalBase64, isHostLimitFailure, isImmutableJsonSnapshot, isPaddedBase64, isPathWithinRoot, isRecord, isTransportCredentialHeader, isUnopenedAppleBundleExtension, javaScriptAnalysisCoverageLimits, javaScriptAnalysisResourceControlsSchema, javaScriptRuntime, javaScriptSemanticCeilingCoverage, javaScriptSemanticPrecisionSchema, javaScriptWorkerHeapExhaustionRecovery, javaScriptWorkerHeapRemediation, joinCoverageStatus, jsonByteLength, jsonDocumentText, jsonObjectSchema, jsonParts, jsonStringCodeUnits, jsonTextCodeUnits, jsonValueExceedsDepth, jsonValueSchema, jsonValueValidationIssue, jsonValueValidationSteps, knownArgumentMistakeGuidance, knownArgumentMistakeRemediation, knownCoverageStatusSchema, knownViewMistakeGuidance, localPathStringSchema, lowercasePercentEscapes, malformedInput, maxCodePoints, nulFreeStringSchema, openableAppleBundleExtension, ownedJsonObjectSchema, ownedJsonValueSchema, parseFailureFromCause, parseLogLevel, presentCompleteObservation, presentObjectRoot, presentRootDiscriminator, primaryAnalysisError, processStartConfigurationSchema, projectArtifactIntegrityDetails, providerErrorTag, reattributedResourceConstraint, recordedControlSchemas, redactExplicitOutput, redactExplicitText, rejectUnpairedSurrogates, reportedParseLimit, requirePresence, resolveJavaScriptSemanticPrecision, resolvedAnalysisError, resourceConstraintRecovery, schemaAnnotations, selectedAnalysisSetting, sha256Hex, sourcePublicationRecoveryOf, supportsJavaScriptRuntime, supportsNodeVersion, timerDurationMsSchema, truncatedInput, unsupportedInput, wasmArtifactMatchesSubject, wasmArtifactSchema, wasmInterfaceByteBudgetSchema, wasmInterfaceEntryRepresentationBytes, wasmInterfaceSchema, wasmResourceLimits };