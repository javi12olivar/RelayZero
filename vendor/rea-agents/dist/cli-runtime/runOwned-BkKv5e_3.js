import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisCancelledError, AnalysisError, AnalysisTimeoutError, OwnerCancellation, cancelledBy, errorMessage, init_analysisErrorBase, init_analysisErrorCore, init_errorMessage, isAborted, primaryAnalysisError } from "./jsonSerialization-DAF9DVXC.js";
import { ProviderAdapterError, init_providerAdapterError } from "./analysisErrorProjection-bycI20-L.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactReaderFailure, init_AnalysisCleanupLease, init_ArtifactReader, init_resources } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { analysisErrorWithCancellation, init_analysisErrorCancellation } from "./analysisErrorCancellation-Cx6DdHmS.js";

//#region dist/providers/runOwned.js
var keepCompleted, retainCompleted, closeFailure, boundWork, closeWithin, runOwned, finalizedResult;
function init_runOwned() {
	return (init_runOwned = __esmMin((() => {
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCleanup();
		init_analysisErrorCancellation();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_providerCleanupError();
		init_errorMessage();
		keepCompleted = (record, value, replacedBy) => record.partial === undefined ? { diagnostics: record.diagnostics(value, replacedBy) } : { partialObservation: record.partial(value, replacedBy) };
		retainCompleted = (error, kept) => "partialObservation" in kept ? error.retainPartialObservation(kept.partialObservation) : error.retainDiagnostics(kept.diagnostics);
		closeFailure = (cause, options) => {
			if (cause instanceof AnalysisError) return cause;
			const observation = cause instanceof ArtifactReaderFailure ? ArtifactReaderFailure.cleanupObservation(cause, options.fallbackResource ?? `${options.operation} resources`) : {
				reason: errorMessage(cause),
				resources: []
			};
			return new ProviderCleanupError(options.providerId, observation.resources, { reason: observation.reason }, {
				cause,
				operation: options.operation
			});
		};
		boundWork = (signal, deadline) => {
			if (deadline === undefined) return {
				signal,
				elapsed: () => false,
				stop: () => undefined
			};
			const budget = new AbortController();
			if (deadline.expired()) budget.abort(OwnerCancellation.deadlineElapsed);
			const timer = setTimeout(() => budget.abort(OwnerCancellation.deadlineElapsed), deadline.remainingMs());
			return {
				signal: signal === undefined ? budget.signal : AbortSignal.any([signal, budget.signal]),
				elapsed: () => budget.signal.aborted || deadline.expired(),
				stop: () => clearTimeout(timer)
			};
		};
		closeWithin = async (options) => {
			const closing = options.close();
			const deadline = options.deadline;
			if (deadline === undefined) {
				await closing;
				return undefined;
			}
			const finalize = deadline.beginFinalize();
			let timer;
			const expired = new Promise((resolve) => {
				timer = setTimeout(() => resolve("expired"), finalize.remainingMs());
			});
			try {
				if (await Promise.race([closing, expired]) !== "expired") return undefined;
			} finally {
				clearTimeout(timer);
			}
			const supplied = options.cleanupLeases !== undefined && options.cleanupLeases.length > 0 ? options.cleanupLeases : undefined;
			const leases = supplied ?? [new AnalysisCleanupLease(() => closing, [options.fallbackResource ?? `${options.operation} resources`])];
			const resources = leases.flatMap((lease) => lease.cleanupResources ?? []);
			const failure = new ProviderCleanupError(options.providerId, resources.length > 0 ? resources : [options.fallbackResource ?? `${options.operation} resources`], { reason: `Cleanup did not finish within its ${String(finalize.workMs)} ms finalize budget` }, { operation: options.operation });
			new AnalysisCleanupLeaseGroup(failure, leases);
			if (supplied === undefined) {
				let late;
				failure.bindCleanupReleaseClaim({ get cleanupReleased() {
					return late !== undefined && !late.cleanupIncomplete;
				} });
				void leases[0].release().catch((cause) => {
					const rejection = closeFailure(cause, options);
					const readerLeases = cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined ? cause.cleanupLeases : undefined;
					if (readerLeases !== undefined) new AnalysisCleanupLeaseGroup(rejection, readerLeases);
					if (!rejection.carriesCleanup) return;
					late = rejection;
					if (cause instanceof AnalysisError || readerLeases !== undefined) failure.bindCleanupResourceOwner(rejection);
				});
			} else void closing.catch(() => undefined);
			return failure;
		};
		runOwned = async (work, options) => {
			const bound = boundWork(options.signal, options.deadline);
			let primary;
			try {
				primary = await work(bound.signal);
			} catch (cause) {
				primary = {
					ok: false,
					error: cause instanceof AnalysisError ? cause : bound.elapsed() && cause === OwnerCancellation.deadlineElapsed ? cancelledBy(options.operation, OwnerCancellation.deadlineElapsed) : new ProviderAdapterError(options.providerId, options.operation, { cause })
				};
			}
			bound.stop();
			const budgetElapsed = bound.elapsed();
			const workTimedOut = budgetElapsed && !isAborted(options.signal);
			let committed = false;
			const commit = async (value) => {
				try {
					await options.commit(value);
					committed = true;
					return {
						ok: true,
						value
					};
				} catch (cause) {
					const kept = keepCompleted(options, value, "failure");
					return {
						ok: false,
						error: cause instanceof AnalysisError ? retainCompleted(cause, kept) : new ProviderAdapterError(options.providerId, options.operation, {
							cause,
							...kept
						})
					};
				}
			};
			if (primary.ok && options.commit !== undefined && !isAborted(options.signal) && !workTimedOut) primary = await commit(primary.value);
			options.inspectPrimary?.(primary);
			const hadIncompleteCleanup = !primary.ok && primary.error.cleanupIncomplete;
			let cleanup = { kind: "released" };
			try {
				const unfinished = await closeWithin(options);
				if (unfinished !== undefined) cleanup = {
					kind: "retained",
					failure: unfinished
				};
			} catch (cause) {
				const failure = closeFailure(cause, options);
				const leases = options.cleanupLeases ?? (cause instanceof ArtifactReaderFailure && cause.cleanup !== undefined ? cause.cleanupLeases : undefined);
				if (leases !== undefined) new AnalysisCleanupLeaseGroup(failure, leases);
				cleanup = {
					kind: "retained",
					failure
				};
			}
			const signal = options.signal;
			let outcome = primary;
			if (!primary.ok) {
				if (isAborted(signal)) analysisErrorWithCancellation(primary.error, cancelledBy(options.operation, signal));
				const recovered = options.recoverCompleted?.(primary.error, {
					cleanupResolvedByClose: hadIncompleteCleanup && !primary.error.cleanupIncomplete,
					cleanup
				});
				if (recovered !== undefined) outcome = {
					ok: true,
					value: recovered.value,
					...recovered.cancellationDiagnostics === undefined ? {} : { diagnostics: recovered.cancellationDiagnostics }
				};
			}
			if (outcome.ok && !primary.ok && options.commit !== undefined && !isAborted(signal) && !workTimedOut) {
				const publication = await commit(outcome.value);
				if (!publication.ok) {
					outcome = publication;
					if (isAborted(signal)) analysisErrorWithCancellation(publication.error, cancelledBy(options.operation, signal));
				}
			}
			const budgetCancellation = (error) => {
				const primaryError = primaryAnalysisError(error);
				return primaryError instanceof AnalysisCancelledError && primaryError.cause === OwnerCancellation.deadlineElapsed;
			};
			const replacing = (replaced, replacement) => {
				for (const secondary of new Set([...replaced.secondaryFailures, ...primaryAnalysisError(replaced).secondaryFailures])) replacement.retainSecondaryFailure(secondary);
				return replaced.cleanupIncomplete ? analysisErrorWithCleanupDependencies(replacement, replaced, options.operation) : replacement;
			};
			if (budgetElapsed && isAborted(signal)) {
				if (!outcome.ok && budgetCancellation(outcome.error)) outcome = {
					ok: false,
					error: replacing(outcome.error, cancelledBy(options.operation, signal, {
						...outcome.error.partialObservation === undefined ? {} : { partialObservation: outcome.error.partialObservation },
						...outcome.error.diagnostics === undefined ? {} : { diagnostics: outcome.error.diagnostics },
						...outcome.error.capturedOutput === undefined ? {} : { capturedOutput: outcome.error.capturedOutput }
					}))
				};
			} else if (workTimedOut && options.deadline !== undefined) {
				const timeout = (replaced, cause) => {
					const recovery = options.timeoutRecovery ?? {};
					const diagnostics = replaced.diagnostics === undefined || recovery.diagnostics === undefined ? recovery.diagnostics ?? replaced.diagnostics : {
						...replaced.diagnostics,
						...recovery.diagnostics
					};
					return new AnalysisTimeoutError(options.operation, options.deadline.workMs, {
						...recovery,
						...cause === undefined ? {} : { cause },
						...replaced.partialObservation === undefined ? {} : { partialObservation: replaced.partialObservation },
						...diagnostics === undefined ? {} : { diagnostics },
						...replaced.capturedOutput === undefined ? {} : { capturedOutput: replaced.capturedOutput }
					});
				};
				if (outcome.ok && !committed) {
					const kept = keepCompleted(options, outcome.value, "failure");
					outcome = {
						ok: false,
						error: timeout("partialObservation" in kept ? { partialObservation: kept.partialObservation } : { diagnostics: {
							...outcome.diagnostics,
							...kept.diagnostics
						} })
					};
				} else if (!outcome.ok && budgetCancellation(outcome.error)) outcome = {
					ok: false,
					error: replacing(outcome.error, timeout(outcome.error, outcome.error))
				};
			}
			if (cleanup.kind === "released" && !outcome.ok && outcome.error.cleanupIncomplete) cleanup = {
				kind: "retained",
				failure: outcome.error
			};
			let cancelled = !outcome.ok && primaryAnalysisError(outcome.error) instanceof AnalysisCancelledError;
			if (outcome.ok && isAborted(signal)) {
				if (committed && cleanup.kind === "released") return {
					kind: "completed",
					value: outcome.value,
					lateCancellation: signal.reason
				};
				if (!committed) {
					cancelled = true;
					const kept = keepCompleted(options, outcome.value, "cancellation");
					outcome = {
						ok: false,
						error: cancelledBy(options.operation, signal, "partialObservation" in kept ? {
							partialObservation: kept.partialObservation,
							...outcome.diagnostics === undefined ? {} : { diagnostics: outcome.diagnostics }
						} : { diagnostics: {
							...outcome.diagnostics,
							...kept.diagnostics
						} })
					};
				}
			}
			if (cleanup.kind === "retained") {
				if (outcome.ok) return {
					kind: "completed-cleanup-retained",
					value: outcome.value,
					error: retainCompleted(cleanup.failure, keepCompleted(options, outcome.value, "failure"))
				};
				return {
					kind: cancelled ? "cancelled" : "failed",
					error: cleanup.failure === outcome.error ? outcome.error : analysisErrorWithCleanupDependencies(outcome.error, cleanup.failure, options.operation),
					cleanup
				};
			}
			if (outcome.ok) return {
				kind: "completed",
				value: outcome.value
			};
			return {
				kind: cancelled ? "cancelled" : "failed",
				error: outcome.error,
				cleanup
			};
		};
		finalizedResult = (finalized) => finalized.kind === "completed" ? {
			ok: true,
			value: finalized.value
		} : {
			ok: false,
			error: finalized.error
		};
	})))();
}

//#endregion
export { finalizedResult, init_runOwned, runOwned };