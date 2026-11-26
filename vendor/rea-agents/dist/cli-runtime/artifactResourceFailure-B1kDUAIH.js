import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisArtifactChangedError, AnalysisError, AnalysisInputError, AnalysisResourceConstraintError, MAX_NODE_TIMER_DELAY_MS, cancelledBy, carriedReason, errorMessage, fixedAllowanceOptions, fixedProducerInputAllowance, init_analysisErrorBase, init_analysisErrorCore, init_analysisResourceLimits, init_errorMessage, init_fixedAllowanceRemediation } from "./jsonSerialization-DAF9DVXC.js";
import { err, init_result } from "./cliBuiltinArguments-CqSJFnNt.js";
import { ProviderAdapterError, init_analysisErrorProjection, init_providerAdapterError, projectAnalysisError } from "./analysisErrorProjection-bycI20-L.js";
import { AnalysisCleanupLease, AnalysisCleanupLeaseGroup, ArtifactReaderFailure, ArtifactResourceScope, init_AnalysisCleanupLease, init_ArtifactReader, init_ArtifactResourceScope, init_StableArtifactFailure, init_resources, stableArtifactInputRecovery } from "./resources-B3P64jvH.js";
import { ProviderCleanupError, analysisErrorWithCleanupDependencies, init_analysisErrorCleanup, init_providerCleanupError } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { capturedProviderOutput, init_capturedProviderOutput } from "./capturedProviderOutput-DfFM2jt6.js";
import { init_OwnedCommand, ownedCommandResources } from "./OwnedCommand-9zrM5O3T.js";
import { classifyProviderOutcome, init_classifyProviderOutcome } from "./classifyProviderOutcome-BMRoGrMs.js";
import { init_ProviderOutcome, providerOutcomeOf } from "./ProviderOutcome-iJMiaLYK.js";
import { classifyProviderFailure, init_classifyProviderFailure } from "./classifyProviderFailure-BA0K6bTF.js";
import { init_LinuxResourceLimits } from "./LinuxResourceLimits-vLyr_vuV.js";

//#region dist/process/ArtifactAnalysisResources.js
var ARTIFACT_PRODUCER_LIMITATION, ArtifactAnalysisResources;
function init_ArtifactAnalysisResources() {
	return (init_ArtifactAnalysisResources = __esmMin((() => {
		init_capturedProviderOutput();
		init_resources();
		init_analysisErrorBase();
		init_analysisErrorCore();
		init_analysisErrorCleanup();
		init_analysisErrorProjection();
		init_fixedAllowanceRemediation();
		init_providerCleanupError();
		init_result();
		init_LinuxResourceLimits();
		init_OwnedCommand();
		init_ProviderOutcome();
		init_classifyProviderOutcome();
		init_analysisResourceLimits();
		ARTIFACT_PRODUCER_LIMITATION = "Linux prlimit enforces the reported per-process address-space, per-file and CPU limits before execution with no core dumps, preserving tighter inherited soft and hard limits. Input, command deadline and retained output budgets are reported in limits; producer_limits can change their requested defaults on the next call without restart. Output overflow fails. Parser and transport bounds remain independent. These are per-process/per-file limits, not aggregate memory or filesystem quotas; caller-supplied tools and the limiter are trusted.";
		ArtifactAnalysisResources = class {
			providerId;
			operation;
			readArtifact;
			readKernelLimits;
			capacity;
			classify;
			#artifacts;
			#pending = new Map();
			#tail = Promise.resolve();
			#busy = false;
			#closed = false;
			constructor(providerId, operation, readArtifact, readKernelLimits, capacity, classify) {
				this.providerId = providerId;
				this.operation = operation;
				this.readArtifact = readArtifact;
				this.readKernelLimits = readKernelLimits;
				this.capacity = capacity;
				this.classify = classify;
				this.#artifacts = {
					scope: new ArtifactResourceScope(),
					operation
				};
			}
			run(work, signal, operation = this.operation) {
				if (this.#closed || signal?.aborted) return Promise.resolve(err(cancelledBy(operation, carriedReason(signal?.aborted ? signal.reason : undefined))));
				if (this.#busy) return Promise.resolve(err(new AnalysisResourceConstraintError(operation, "capacity", this.capacity.message, this.capacity.details, { measuredExhaustion: true })));
				this.#busy = true;
				const running = this.#tail.then(() => this.#artifacts.scope.run(() => {
					this.#artifacts.operation = operation;
					if (signal?.aborted) return Promise.resolve(err(cancelledBy(operation, signal)));
					return work();
				})).catch((cause) => err(this.classify(cause, {
					kind: "resources",
					operation: this.#artifacts.operation
				}))).finally(() => {
					this.#busy = false;
				});
				this.#tail = running.then(() => undefined, () => undefined);
				return running;
			}
			read(path, maximumBytes, signal) {
				return this.readArtifact(path, maximumBytes, signal, undefined, this.#artifacts.scope);
			}
			/** Admit a selected input and classify its physical failure before later stages. */
			async readSelectedArtifact(input) {
				const operation = this.#artifacts.operation;
				try {
					return await this.read(input.path, input.maximumBytes, input.signal);
				} catch (cause) {
					throw this.classify(cause, {
						kind: "selected-input",
						operation,
						input
					});
				}
			}
			/** The read budget and recovery for a selected input larger than it admits. */
			selectedFileSize(input, operation) {
				const { maximumBytes, allowanceName, budgetParameter } = input;
				return (cause, details) => new AnalysisResourceConstraintError(operation, "file-size", cause.message, { input_bytes: maximumBytes }, {
					...details,
					cause,
					...budgetParameter === undefined ? fixedProducerInputAllowance(maximumBytes, allowanceName) : {
						retryable: false,
						remediationAction: `Increase ${budgetParameter} above ${String(maximumBytes)} bytes on the next call to admit the same complete selected artifact; no REA restart is required. Do not truncate required input bytes. Output, parser, transport and inherited OS limits remain independent.`
					}
				});
			}
			readLimits(limits) {
				return this.readKernelLimits(limits, this.#artifacts.scope);
			}
			/** Finish bounded identity reads after output, independently of caller cancellation. */
			async readCommandAfterRun(command, limiter, capturedOutput, operation = this.operation) {
				const read = async (path) => {
					try {
						return await this.read(path, 64 * 1024 * 1024);
					} catch (cause) {
						throw this.classify(cause, {
							kind: "integrity",
							operation,
							path,
							capturedOutput
						});
					}
				};
				const current = await read(command);
				const currentLimiter = await read(limiter.path);
				if (currentLimiter.sha256 !== limiter.sha256) throw new AnalysisArtifactChangedError(operation, limiter.path, "Configured resource limiter changed during analysis.", { capturedOutput });
				return current;
			}
			/** A post-run identity read whose failure shows the file changed. */
			integrityChanged(cause, path, details, operation) {
				return [
					"limit",
					"integrity",
					"path"
				].includes(cause.reason) ? new AnalysisArtifactChangedError(operation, path, `Post-run identity verification failed for ${path}: ${cause.message}`, details) : undefined;
			}
			retain(root, owner) {
				const retained = this.#pending.get(root);
				const resources = () => this.#resourcesFor(root);
				this.#pending.set(root, {
					owner: owner ?? retained?.owner,
					operation: retained?.operation ?? this.#artifacts.operation,
					lease: retained?.lease ?? new AnalysisCleanupLease(() => this.#releaseRoot(root), { get cleanupResources() {
						return resources();
					} })
				});
			}
			get pendingPaths() {
				return [...this.#pending.keys()].map((root) => root.path);
			}
			#resourcesFor(root) {
				const retained = this.#pending.get(root);
				if (retained === undefined) return [];
				const ownership = retained.owner?.launch.ownership;
				return ownership === undefined ? [root.path] : ownedCommandResources(ownership, root.path);
			}
			async release() {
				const failures = [];
				for (const [root, retained] of this.#pending) {
					try {
						await retained.lease.release();
					} catch (cause) {
						const diagnostics = cause instanceof ProviderCleanupError ? cause.diagnostics : undefined;
						const failure = new ProviderCleanupError(this.providerId, this.#resourcesFor(root), {
							...diagnostics,
							reason: cause instanceof ProviderCleanupError ? String(diagnostics?.reason ?? cause.message) : String(cause)
						}, {
							operation: retained.operation,
							cause
						});
						new AnalysisCleanupLeaseGroup(failure, [retained.lease]);
						failures.push(failure);
					}
				}
				if (failures.length === 0) return;
				if (failures.length === 1) throw failures[0];
				throw new ProviderCleanupError(this.providerId, failures.flatMap((failure) => failure.cleanupResources), {
					reason: "One or more analysis runtime resources remain owned.",
					failures: failures.map((failure) => projectAnalysisError(failure))
				}, {
					operation: failures[0]?.operation ?? this.#artifacts.operation,
					cause: new AggregateError(failures, "Analysis runtime cleanup remains incomplete")
				}).bindCleanupDependencies(failures);
			}
			async #releaseRoot(root) {
				const retained = this.#pending.get(root);
				if (retained === undefined) return;
				if (retained.owner !== undefined) {
					const stopped = await retained.owner.stop();
					if (stopped.status === "incomplete") {
						const cleanup = stopped.cleanupResult;
						throw new ProviderCleanupError(this.providerId, this.#resourcesFor(root), {
							reason: stopped.reason,
							...cleanup?.failures === undefined ? {} : { failures: cleanup.failures.map((failure) => ({ ...failure })) },
							...cleanup?.unverified === undefined ? {} : { unverified: cleanup.unverified.map((process) => ({ ...process })) }
						}, { operation: retained.operation });
					}
					this.#pending.set(root, {
						...retained,
						owner: undefined
					});
				}
				if (this.#artifacts.scope.hasPending) throw new ProviderCleanupError(this.providerId, [root.path], { reason: "Artifact resources remain owned; the private runtime root is retained until their cleanup succeeds." }, { operation: retained.operation });
				await root.close();
				this.#pending.delete(root);
			}
			/**
			* This provider's report for a read whose own cleanup failed: its cleanup
			* error, bound to the read's descriptor leases (or to a retained unresolved
			* lease), composed with what the read reports apart from that cleanup.
			*/
			readCleanupFailure(cause, primary, capturedOutput, operation = this.operation) {
				const observation = cause.cleanup;
				const failure = new ProviderCleanupError(this.providerId, observation.resources, {
					reason: observation.reason,
					...capturedOutput === undefined ? {} : { captured_output: { ...capturedOutput } }
				}, {
					operation,
					cause
				});
				let leases = cause.cleanupLeases;
				if (leases === undefined) {
					const unresolved = new AnalysisCleanupLease(async () => {
						throw cause;
					}, observation.resources);
					this.#artifacts.scope.retain({
						kind: "lease",
						resource: observation.resources[0] ?? "Unresolved artifact cleanup",
						lease: unresolved
					});
					leases = [unresolved];
				}
				new AnalysisCleanupLeaseGroup(failure, leases);
				if (cause.partialObservation !== undefined) (primary ?? failure).retainPartialObservation(cause.partialObservation);
				return primary === undefined ? failure : analysisErrorWithCleanupDependencies(primary, failure, operation);
			}
			commandFailure(cause, limits, effectiveLimits, operation = this.operation, budgetParameter) {
				return classifyProviderOutcome(providerOutcomeOf(cause), this.commandContext(limits, effectiveLimits, operation, budgetParameter));
			}
			/** How this provider's owned producer commands report, for the shared classifiers. */
			commandContext(limits, effectiveLimits, operation = this.operation, budgetParameter) {
				return {
					providerId: this.providerId,
					operation,
					capturedOutput: capturedProviderOutput,
					timeout: {
						ms: limits.command_timeout_ms,
						userMessage: `The owned producer command reached its ${String(limits.command_timeout_ms)} ms deadline. This is not a client-side timeout; extending only the MCP client's deadline does not change this budget.`,
						remediationAction: budgetParameter === undefined ? `REA's fixed producer command deadline is ${String(limits.command_timeout_ms)} ms and this release has no runtime override. Inspect any partial output and cleanup before retrying. Repeating the unchanged request reaches the same deadline.` : `${limits.command_timeout_ms < 2147483647 ? `Increase ${budgetParameter}.command_timeout_ms above ${String(limits.command_timeout_ms)} milliseconds on the next call (range 1..${String(MAX_NODE_TIMER_DELAY_MS)}); no restart is required.` : `${budgetParameter}.command_timeout_ms is already at the runtime timer maximum ${String(MAX_NODE_TIMER_DELAY_MS)} milliseconds; no higher deadline is supported. Narrow the selected work if that preserves the required observation.`} Inspect retained observations and confirm cleanup before retrying. This does not raise CPU, memory, output, parser or external client limits.`
					},
					outputLimit: {
						limits: { output_bytes: limits.output_bytes },
						recovery: budgetParameter === undefined ? fixedAllowanceOptions(`The retained command-output allowance of ${String(limits.output_bytes)} bytes (this release has no runtime override)`, "capture", {
							limit: limits.output_bytes,
							unit: "bytes"
						}) : {
							retryable: false,
							remediationAction: `Increase ${budgetParameter}.output_bytes above ${String(limits.output_bytes)} bytes on the next call; no restart is required. Inspect captured output and confirm cleanup before retrying. This controls collection, not parser, transport, host memory or inherited OS limits. Repeating the unchanged request cannot raise it.`
						}
					},
					resourceSignal: (signal) => {
						const reported = effectiveLimits === undefined ? "The effective inherited limit was not reported." : `The effective inherited limits are ${String(effectiveLimits.address_space_bytes)} bytes of address space, ${String(effectiveLimits.file_bytes)} bytes per file, and ${String(effectiveLimits.cpu_seconds)} CPU seconds.`;
						return {
							limits: effectiveLimits === undefined ? null : { ...effectiveLimits },
							recovery: {
								retryable: true,
								remediationAction: `${reported} REA retains the tighter inherited limit. ${budgetParameter === undefined ? "This release has no runtime override for that ceiling." : `Review ${budgetParameter}.${signal === "SIGXFSZ" ? "file_bytes" : "cpu_seconds"} for a new call; a higher requested policy cannot raise a tighter inherited soft or hard limit. No REA restart is needed for a per-call update.`} A smaller artifact may finish inside the retained limit. The signal does not prove that ceiling was exhausted, so an unchanged retry may succeed or may fail the same way.`
							}
						};
					},
					dialect: (_outcome, _details, unclassified) => unclassified()
				};
			}
			close() {
				this.#closed = true;
				const work = this.#tail.then(() => this.#closeResources());
				this.#tail = work.catch(() => undefined);
				return work;
			}
			async #closeResources() {
				let descriptorFailure;
				try {
					await this.#artifacts.scope.close();
				} catch (cause) {
					descriptorFailure = this.classify(cause, {
						kind: "resources",
						operation: this.#artifacts.operation
					});
				}
				try {
					await this.release();
				} catch (cause) {
					if (descriptorFailure !== undefined && cause instanceof AnalysisError) throw analysisErrorWithCleanupDependencies(descriptorFailure, cause, this.#artifacts.operation);
					throw cause;
				}
				if (descriptorFailure !== undefined) throw descriptorFailure;
			}
		};
	})))();
}

//#endregion
//#region dist/providers/artifactResourceFailure.js
var artifactResourceDialect, createArtifactAnalysisResources;
function init_artifactResourceFailure() {
	return (init_artifactResourceFailure = __esmMin((() => {
		init_resources();
		init_analysisErrorCore();
		init_providerAdapterError();
		init_ArtifactAnalysisResources();
		init_classifyProviderFailure();
		init_errorMessage();
		artifactResourceDialect = (resources, context) => {
			const { operation } = context;
			const { providerId } = resources;
			const observedOutput = context.kind === "selected-input" ? context.input.observedOutput : context.kind === "integrity" ? context.capturedOutput : undefined;
			const captured = observedOutput === undefined ? {} : { capturedOutput: observedOutput };
			const shared = {
				providerId,
				operation,
				readCleanup: (read, primary) => resources.readCleanupFailure(read, primary, observedOutput, operation),
				observedOutput
			};
			switch (context.kind) {
				case "selected-input": {
					const { input } = context;
					return {
						...shared,
						file: {
							path: input.path,
							description: "artifact",
							fileSize: resources.selectedFileSize(input, operation),
							retainCompletedIdentity: true
						},
						unclassified: (cause, details) => new AnalysisInputError(operation, {
							...details,
							cause,
							...cause instanceof ArtifactReaderFailure ? stableArtifactInputRecovery(cause) : {}
						}, [{
							path: ["path"],
							reason: "invalid_value",
							message: errorMessage(cause)
						}])
					};
				}
				case "integrity": return {
					...shared,
					recognise: (cause, details) => cause instanceof ArtifactReaderFailure ? resources.integrityChanged(cause, context.path, {
						...details,
						...captured,
						cause
					}, operation) : undefined,
					unclassified: (cause, details) => new ProviderAdapterError(providerId, operation, {
						...details,
						...captured,
						cause,
						diagnostics: {
							stage: "integrity",
							resource_path: context.path,
							reason: errorMessage(cause)
						}
					})
				};
				case "resources": return {
					...shared,
					unclassified: (cause, details) => new ProviderAdapterError(providerId, operation, {
						...details,
						cause,
						diagnostics: {
							stage: "artifact-resources",
							reason: String(cause)
						}
					})
				};
			}
		};
		createArtifactAnalysisResources = (providerId, operation, readArtifact, readKernelLimits, capacity) => {
			const resources = new ArtifactAnalysisResources(providerId, operation, readArtifact, readKernelLimits, capacity, (cause, context) => classifyProviderFailure(cause, artifactResourceDialect(resources, context)));
			return resources;
		};
	})))();
}

//#endregion
export { ARTIFACT_PRODUCER_LIMITATION, artifactResourceDialect, createArtifactAnalysisResources, init_ArtifactAnalysisResources, init_artifactResourceFailure };