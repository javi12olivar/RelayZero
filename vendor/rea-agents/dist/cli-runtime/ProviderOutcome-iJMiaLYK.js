import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { init_launchFailure, launcherFailureOf } from "./ExecFileOutput-YDVPmL3I.js";
import { OwnedCommandFailure, init_OwnedCommand } from "./OwnedCommand-9zrM5O3T.js";

//#region dist/process/ProviderOutcome.js
function providerOutcomeOf(cause) {
	if (cause instanceof OwnedCommandFailure) return ownedCommandOutcome(cause);
	const failure = launcherFailureOf(cause);
	if (failure === undefined || !(cause instanceof Error)) return undefined;
	return {
		kind: "launch-failed",
		failure,
		cause,
		message: cause.message,
		output: undefined
	};
}
var outputOf, ownedCommandOutcome;
function init_ProviderOutcome() {
	return (init_ProviderOutcome = __esmMin((() => {
		init_launchFailure();
		init_OwnedCommand();
		outputOf = (snapshot) => snapshot === null ? undefined : {
			snapshot,
			truncated: snapshot.diagnosticTruncated === true || snapshot.outputIncomplete === true
		};
		ownedCommandOutcome = (failure) => {
			const facts = {
				cause: failure,
				message: failure.message,
				output: outputOf(failure.snapshot)
			};
			if (failure.reason === "cancelled") return {
				...facts,
				kind: "cancelled",
				reason: failure.cancellation === undefined ? failure : failure.cancellation.reason
			};
			if (failure.snapshot?.memoryLimitReached === true) return {
				...facts,
				kind: "memory-limit"
			};
			const snapshot = failure.snapshot;
			if (snapshot?.runtimeExhaustion !== undefined && !failure.collectionFailure && (failure.reason === "process" || failure.reason === "output-limit")) return {
				...facts,
				kind: "runtime-exhausted",
				exhaustion: snapshot.runtimeExhaustion,
				exitCode: snapshot.exitCode ?? null,
				signal: snapshot.signal ?? null
			};
			if (failure.reason !== "process") return {
				...facts,
				kind: failure.reason
			};
			if (failure.collectionFailure || snapshot === null) return {
				...facts,
				kind: "protocol"
			};
			if (snapshot.signal === "SIGXCPU" || snapshot.signal === "SIGXFSZ") return {
				...facts,
				kind: "resource-signal",
				signal: snapshot.signal
			};
			return {
				...facts,
				kind: "exited",
				exitCode: snapshot.exitCode ?? null,
				signal: snapshot.signal ?? null,
				stopRequested: snapshot.stopRequested === true
			};
		};
	})))();
}

//#endregion
export { init_ProviderOutcome, providerOutcomeOf };