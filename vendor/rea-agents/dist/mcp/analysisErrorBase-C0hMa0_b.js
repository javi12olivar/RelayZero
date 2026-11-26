import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";

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
export { primaryAnalysisError as a, sourcePublicationRecoveryOf as c, init_analysisErrorBase as i, ProviderOwnedAnalysisError as n, providerErrorTag as o, domainErrorTag as r, resolvedAnalysisError as s, AnalysisError as t };