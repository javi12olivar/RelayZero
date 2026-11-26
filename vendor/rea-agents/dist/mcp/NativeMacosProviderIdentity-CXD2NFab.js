import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { a as primaryAnalysisError, i as init_analysisErrorBase, t as AnalysisError } from "./analysisErrorBase-C0hMa0_b.js";
import { N as localPathStringSchema, j as init_localPath, o as jsonValueSchema, r as init_jsonValue } from "./jsonValue-BIEmjG1z.js";
import { _ as init_analysisErrorCore, i as AnalysisCancelledError, m as cancelledBy, p as OwnerCancellation, u as AnalysisTimeoutError, v as isAborted } from "./analysisErrorCore-CrdY4k0A.js";
import { n as init_errorMessage, t as errorMessage } from "./errorMessage-rfGn5D1_.js";
import { D as nativeCommandTimeoutField, E as init_nativeDeadlines, a as nativeEvidenceEffects, d as toolEffects, i as init_toolEffects, u as toolContractMetadata } from "./toolEffects-2_RvkT6b.js";
import { n as init_strictUtf8, t as decodeStrictUtf8 } from "./strictUtf8-Cx_KgW8Z.js";
import { r as init_providerAdapterError, t as ProviderAdapterError } from "./providerAdapterError-CdFzW4Ag.js";
import { a as init_providerCleanupError, i as ProviderCleanupError } from "./SignalAbort-CPFWtyzs.js";
import { Br as analysisErrorWithCleanupDependencies, Gn as ArtifactReaderFailure, Hn as AnalysisCleanupLeaseGroup, Un as init_AnalysisCleanupLease, Vn as AnalysisCleanupLease, Wr as init_analysisErrorCleanup, Xn as init_ArtifactReader, t as init_resources } from "./resources-C5FMDwcC.js";
import { At as nativeCallObservationInputSchema, Gt as nativeUiScenarioInputSchema, Ht as init_nativeUiObservation, Ot as init_nativeCallObservation, Qp as init_toolOutputSchemaPrimitives, Ut as nativeUiObservationInputSchema, a as init_toolOutputSchemaGroups, c as nativeOutputSchemas, dn as analysisDetailSchema, em as requireOutputSchema, pn as init_analysisDetail } from "./toolOutputSchemaGroups-CDSPEFEc.js";
import { Jt as analysisErrorWithCancellation, Yt as init_analysisErrorCancellation } from "./OwnedCommandCleanup-pq-3btab.js";
import { z } from "zod";

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
//#region dist/contracts/native/nativeToolContracts.js
var examples, native, swiftSymbolsSchema, NATIVE_TOOL_CONTRACTS;
function init_nativeToolContracts() {
	return (init_nativeToolContracts = __esmMin((() => {
		init_toolOutputSchemaPrimitives();
		init_nativeCallObservation();
		init_nativeUiObservation();
		init_toolOutputSchemaGroups();
		init_jsonValue();
		init_localPath();
		init_toolEffects();
		init_analysisDetail();
		init_nativeDeadlines();
		examples = {
			inspect_macho: {},
			inspect_signature: {},
			inspect_plist: {},
			list_architectures: {},
			observe_native_ui: {
				pid: 123,
				window_id: 456
			},
			capture_native_ui_scenario: {
				pid: 123,
				window_id: 456,
				steps: [{
					kind: "wait",
					milliseconds: 100
				}]
			},
			demangle_swift: { symbols: ["$s4Test3fooyyF"] },
			observe_native_calls: {
				breakpoints: [{
					kind: "objc-method",
					class_name: "NSURLSession",
					selector: "dataTaskWithRequest:completionHandler:"
				}, {
					kind: "function",
					name: "open",
					module: "libsystem_kernel.dylib"
				}],
				arguments: ["--help"],
				duration_ms: 5e3,
				backtrace_frames: 4
			}
		};
		native = (name, audit, description, inputSchema, retainedSummary) => {
			const outputSchema = requireOutputSchema(nativeOutputSchemas, name);
			const strictInputSchema = inputSchema.strict();
			return {
				name,
				...toolContractMetadata(name, audit),
				description,
				kind: "native-provider",
				cli: true,
				requiresActiveTarget: true,
				...retainedSummary === undefined ? {} : { retainedSummary },
				inputSchema: strictInputSchema,
				outputSchema,
				examples: [{
					title: `Example ${name.replaceAll("_", " ")} request`,
					input: z.record(z.string(), jsonValueSchema).parse(examples[name] ?? {})
				}]
			};
		};
		swiftSymbolsSchema = z.array(z.string().min(1).regex(/^[^\n]*$/u, "Each Swift symbol must be one line.").regex(/^[^\x00]*$/u, "Swift symbols cannot contain NUL."));
		NATIVE_TOOL_CONTRACTS = [
			native("observe_native_ui", toolEffects({
				mutatesSession: true,
				launchesProcess: true,
				writesFilesystem: true
			}), "Observe one already-running native app window by PID/window ID, bound to the active Mach-O target. Returns a bounded accessibility tree and window screenshot; screenshot or accessibility must be enabled. Permission denial does not broaden capture or launch the target. native_ui_deadline_ms sets this call's deadline independently of output and wait-step limits. Use capture_native_ui_scenario to interact.", nativeUiObservationInputSchema),
			native("capture_native_ui_scenario", toolEffects({
				writesFilesystem: true,
				mutatesTarget: true,
				mutatesSession: true,
				launchesProcess: true,
				accessesNetwork: true,
				changesUiState: true,
				mayDiscardData: true,
				executesForeignCode: true,
				idempotent: false
			}), "Interact with one exact native app window through selected-element press, scroll, AXValue text entry and bounded waits. Returns ordered before/after captures and per-step failures; screenshot or accessibility must be enabled. Actions may change app data, network activity and persistent state; REA leaves that state in place. native_ui_deadline_ms controls the scenario deadline, independently of output allowance and wait-step caps. Use observe_native_ui for observation only.", nativeUiScenarioInputSchema),
			native("observe_native_calls", toolEffects({
				mutatesSession: true,
				writesFilesystem: true,
				launchesProcess: true,
				accessesNetwork: true,
				changesUiState: true,
				executesForeignCode: true,
				idempotent: false
			}), "Launch the active Mach-O under LLDB and record selected function/Objective-C method entries; the owned process is killed at max_events or duration_ms. Target execution uses the caller's permissions and may write files, show UI or use network. Hits auto-continue; REA evaluates no expressions and attaches to no other process. Returns addresses, thread/module/symbol, raw argument registers, selector/receiver facts, optional frames, stdout/stderr and limitations. Hardened-runtime targets need get-task-allow. Set capture_limits before launch; later changes cannot recover omitted observations.", nativeCallObservationInputSchema),
			native("inspect_macho", {
				...nativeEvidenceEffects,
				writesFilesystem: true
			}, "Inspect Mach-O slices, load commands, linkage, build metadata, segments/sections and permissions without launching Hopper. Returns command provenance and explicit coverage; segment and section file offsets are slice-relative, so add selected_architecture.container_file_offset for an input-file offset. detail summary retains complete Evidence for inspect_analysis_view kind macho rather than delivering large symbol lists inline. native_command_timeout_ms bounds each Xcode command, independently of output admission.", z.object({
				detail: analysisDetailSchema.unwrap().optional().describe("Omitted or complete returns the complete inspection Evidence. summary retains that complete Evidence in this session and returns its inspect_analysis_view summary; use normalized_result.parent_evidence_id for macho pages."),
				native_command_timeout_ms: nativeCommandTimeoutField
			}), { evidenceParameters: "omit-detail" }),
			native("inspect_signature", {
				...nativeEvidenceEffects,
				writesFilesystem: true
			}, "Inspect the selected Mach-O slice's signing identity, hashes, authorities, requirement, entitlements and hardened-runtime state from a digest-verified snapshot. Other slices are checked for unsigned state with separate metadata coverage. Returns command provenance; native_command_timeout_ms bounds each codesign command independently of output admission.", z.object({ native_command_timeout_ms: nativeCommandTimeoutField })),
			native("inspect_plist", {
				...nativeEvidenceEffects,
				writesFilesystem: true
			}, "Parse Info.plist from an open binary or bundle-resource session, or select path within that session. Use open_binary or open_bundle_resources first. Returns normalized JSON from a private temporary copy of the selected plist. native_command_timeout_ms bounds each file/plutil command independently of input, decode and nesting limits. XML requires plutil validation and may be refused at a shallower depth.", z.object({
				path: localPathStringSchema.optional().describe("Optional plist selection for an already open binary or bundle-resource session; this does not open a session."),
				native_command_timeout_ms: nativeCommandTimeoutField
			})),
			native("list_architectures", nativeEvidenceEffects, "List thin/universal Mach-O slices with file offsets, sizes, alignment, coverage and native-tool provenance. native_command_timeout_ms bounds lipo, independently of output admission.", z.object({ native_command_timeout_ms: nativeCommandTimeoutField })),
			native("demangle_swift", nativeEvidenceEffects, "Demangle an ordered list of single-line Swift symbols without Hopper. Returns demangled, unchanged or invalid for every input; invalid entries do not discard valid companions. native_command_timeout_ms bounds swift-demangle, independently of output admission.", z.object({
				symbols: swiftSymbolsSchema,
				native_command_timeout_ms: nativeCommandTimeoutField
			}))
		];
	})))();
}

//#endregion
//#region dist/domain/apple/appleMachoNames.js
var decodeMachoName, decodeMachoFixedName;
function init_appleMachoNames() {
	return (init_appleMachoNames = __esmMin((() => {
		init_strictUtf8();
		decodeMachoName = (bytes) => {
			try {
				return decodeStrictUtf8(bytes, "preserve");
			} catch {
				return { bytes_base64: bytes.toString("base64") };
			}
		};
		decodeMachoFixedName = (bytes) => {
			const nul = bytes.indexOf(0);
			return bytes.subarray(0, nul < 0 ? bytes.length : nul).toString("latin1");
		};
	})))();
}

//#endregion
//#region dist/native/NativeMacosProviderIdentity.js
var NATIVE_MACOS_PROVIDER_IDENTITY;
function init_NativeMacosProviderIdentity() {
	return (init_NativeMacosProviderIdentity = __esmMin((() => {
		NATIVE_MACOS_PROVIDER_IDENTITY = Object.freeze({
			id: "native-macos",
			name: "macOS native inspection utilities",
			version: null
		});
	})))();
}

//#endregion
export { init_appleMachoNames as a, finalizedResult as c, decodeMachoName as i, init_runOwned as l, init_NativeMacosProviderIdentity as n, NATIVE_TOOL_CONTRACTS as o, decodeMachoFixedName as r, init_nativeToolContracts as s, NATIVE_MACOS_PROVIDER_IDENTITY as t, runOwned as u };