import { ProviderOwnedAnalysisError, providerErrorTag, } from "../domain/analysisErrorBase.js";
import { catalogueRow, } from "../domain/analysisErrorClassification.js";
import { providerRetryAction, } from "../domain/providerOperationHealth.js";
import { dialogTimeoutFromDiagnostic, hopperStartupFailure, invalidDialogTimeoutMessage, } from "./HopperStartupFailure.js";
/** Hopper's caller-facing code and category; presentations and the catalogue read it. */
const HOPPER_CLASSIFICATIONS = {
    timeout: { code: "provider_timeout", category: "timeout" },
    cancelled: { code: "cancelled", category: "cancelled" },
    protocol: { code: "unreadable_output", category: "execution_failure" },
    unavailable: { code: "provider_unavailable", category: "unavailable" },
};
/** A remote error's classification follows the bridge's diagnostic type. */
const hopperRemoteClassification = (diagnosticType) => diagnosticType === "invalid_request"
    ? { code: "invalid_request", category: "invalid_input" }
    : {
        code: "execution_failure",
        category: diagnosticType === "authorization"
            ? "unavailable"
            : "execution_failure",
    };
/** Base class for failures produced specifically by the Hopper provider. */
export class HopperError extends ProviderOwnedAnalysisError {
}
/** The Hopper request a failure answered, as recorded by the client. */
const hopperRequestFacts = (operation, requestId) => ({
    ...(operation === undefined ? {} : { operation }),
    ...(requestId === undefined ? {} : { request_id: requestId }),
});
/** Startup-timeout recovery that holds after the calling invocation has ended. */
export const HOPPER_STARTUP_TIMEOUT_REMEDIATION = "Review details.launcher and inspect Hopper for ongoing initial analysis or a pending loader, demo, or license dialog. For a large target, set REA_HOPPER_STARTUP_TIMEOUT_MS higher in the environment of a new REA invocation, then rerun the command; that invocation starts Hopper again. Resolve retained cleanup before rerunning.";
/** Startup-timeout recovery for a caller whose REA runtime keeps running. */
const HOPPER_STARTUP_TIMEOUT_CONTINUING_REMEDIATION = "Review details.launcher and inspect Hopper for ongoing initial analysis or a pending loader, demo, or license dialog. For a large target, use update_analysis_settings with setting hopper.startup_timeout_ms and action set for the next startup attempt without restarting REA, or increase REA_HOPPER_STARTUP_TIMEOUT_MS for future REA processes. Allow at least that long in the MCP client. Resolve retained cleanup before reopening.";
/** Hopper did not respond within the configured operation deadline. */
const RESTART_OWNED_PROVIDER = "Restart the owned provider by calling close_binary, then open the target again and retry.";
const RESTART_UNREACHABLE_HOPPER = `${RESTART_OWNED_PROVIDER} close_binary preserves retained Evidence and Unknown history on this connection; export_evidence_bundle before ending the REA process if you need to resume later.`;
const RERUN_HOPPER_INVOCATION = "Review the reported Hopper state and resolve any incomplete cleanup before rerunning the command.";
/** Hardened-runtime entitlement macOS requires before an Apple Events prompt. */
const HOPPER_APPLE_EVENTS_ENTITLEMENT_ID = "com.apple.security.automation.apple-events";
const HOPPER_APPLE_EVENTS_AUTHORIZATION_MESSAGE = `macOS denied permission to send Apple Events to Hopper. A hardened-runtime application starting REA requires the ${HOPPER_APPLE_EVENTS_ENTITLEMENT_ID} entitlement before macOS will prompt for permission.`;
const HOPPER_APPLE_EVENTS_AUTHORIZATION_REMEDIATION = `Allow the application that macOS identifies as responsible for REA under System Settings > Privacy & Security > Automation. Some MCP clients, including Claude Desktop, disclaim responsibility so macOS attributes the request to the REA runtime (such as node), which cannot be authorized by changing the client's Automation setting. In that case start REA from a client macOS can authorize, such as Claude Code or Terminal. If the responsible client lacks the ${HOPPER_APPLE_EVENTS_ENTITLEMENT_ID} entitlement, ask its developer to add it. Retrying from the same unauthorized client will not succeed until authorization changes.`;
export class HopperTimeoutError extends HopperError {
    timeoutMs;
    operation;
    requestId;
    providerState;
    stage;
    launcherOutcome;
    _tag = providerErrorTag("HopperTimeoutError");
    constructor(timeoutMs, operation, requestId, providerState = "not_started", stage = operation === undefined
        ? "launch"
        : "analysis", launcherOutcome, options = {}) {
        super(`Hopper ${operation === undefined ? "startup" : operation} timed out after ${String(timeoutMs)}ms`, operation === undefined
            ? {
                ...options,
                continuingCallerGuidance: {
                    remediationAction: HOPPER_STARTUP_TIMEOUT_CONTINUING_REMEDIATION,
                },
            }
            : options);
        this.timeoutMs = timeoutMs;
        this.operation = operation;
        this.requestId = requestId;
        this.providerState = providerState;
        this.stage = stage;
        this.launcherOutcome = launcherOutcome;
    }
    providerRequest() {
        return {
            facts: hopperRequestFacts(this.operation, this.requestId),
            reattribute: (operation, options) => new HopperTimeoutError(this.timeoutMs, operation, this.requestId, this.providerState, this.stage, this.launcherOutcome, options),
        };
    }
    ownPresentation() {
        const { operation } = this;
        const continuing = operation === undefined
            ? undefined
            : this.providerState === "busy"
                ? "Check binary_session.analysis_activity, wait for the active Hopper request to finish, then retry."
                : "Check binary_session for Hopper health, then retry the operation.";
        return {
            ...HOPPER_CLASSIFICATIONS.timeout,
            message: operation === undefined
                ? "REA timed out waiting for Hopper bridge readiness, which includes initial analysis. Hopper may still be analyzing the target or waiting for a loader, demo, or license dialog. Review the captured launcher outcome and resolve retained cleanup before retrying."
                : this.providerState === "busy"
                    ? `Hopper timed out during ${operation} while the provider remained busy.`
                    : `Hopper timed out during ${operation} before it started.`,
            ...(continuing === undefined
                ? {}
                : {
                    continuing: {
                        userMessage: continuing,
                        remediationAction: continuing,
                    },
                }),
            remediation: operation === undefined
                ? HOPPER_STARTUP_TIMEOUT_REMEDIATION
                : RERUN_HOPPER_INVOCATION,
            details: {
                stage: operation === undefined ? "startup" : this.stage,
                timeout_ms: this.timeoutMs,
                ...(this.launcherOutcome === undefined
                    ? {}
                    : { launcher: this.launcherOutcome }),
                provider_state: this.providerState,
                retry_action: this.providerState === "busy" ? "wait" : "retry",
                ...(operation === undefined ? {} : { operation }),
                ...(this.requestId === undefined ? {} : { request_id: this.requestId }),
            },
        };
    }
}
/** The caller cancelled a Hopper operation before it completed. */
export class HopperCancelledError extends HopperError {
    _tag = providerErrorTag("HopperCancelledError");
    constructor(...parameters) {
        const errorOptions = { ...parameters[1] };
        // Argument presence matters: an explicit undefined is the caller's reason.
        if (parameters.length > 0)
            Object.defineProperty(errorOptions, "cause", {
                configurable: true,
                enumerable: true,
                value: parameters[0],
                writable: true,
            });
        super("Hopper operation was cancelled", errorOptions);
    }
    ownPresentation() {
        return {
            ...HOPPER_CLASSIFICATIONS.cancelled,
            details: { operation: "hopper", cleanup: "complete" },
        };
    }
}
/**
 * Classify caller cancellation from a signal.
 *
 * An aborted signal keeps its exact reason, including undefined. A signal that
 * has not aborted does not invent a reason.
 */
export const hopperCancelledBySignal = (signal) => signal?.aborted === true
    ? new HopperCancelledError(signal.reason)
    : new HopperCancelledError();
/** Hopper returned bytes or JSON that do not satisfy the NDJSON RPC contract. */
export class HopperProtocolError extends HopperError {
    _tag = providerErrorTag("HopperProtocolError");
    ownPresentation() {
        return HOPPER_CLASSIFICATIONS.protocol;
    }
}
export class HopperRemoteError extends HopperError {
    code;
    safeMessage;
    _tag = providerErrorTag("HopperRemoteError");
    diagnosticType;
    operation;
    requestId;
    constructor(code, safeMessage, context = {}) {
        super(`Hopper request failed (${String(code)}): ${safeMessage}`, context);
        this.code = code;
        this.safeMessage = safeMessage;
        this.diagnosticType = context.diagnosticType ?? "remote";
        this.operation = context.operation;
        this.requestId = context.requestId;
    }
    providerRequest() {
        return {
            facts: {
                ...hopperRequestFacts(this.operation, this.requestId),
                provider_code: this.code,
                diagnostic_type: this.diagnosticType,
            },
            reattribute: (operation, options) => new HopperRemoteError(this.code, this.safeMessage, {
                ...options,
                operation,
                requestId: this.requestId,
                diagnosticType: this.diagnosticType,
            }),
        };
    }
    ownPresentation() {
        return {
            ...hopperRemoteClassification(this.diagnosticType),
            message: `Hopper ${this.operation ?? "analysis"} failed (${String(this.code)}, ${this.diagnosticType}): ${this.safeMessage}`,
            remediation: this.diagnosticType === "invalid_request"
                ? "Correct the reported address, document, or arguments and retry."
                : "Review the Hopper diagnostic details and correct the request or target; run `rea doctor` if the provider itself is failing. Repeating the unchanged request is not expected to succeed.",
            details: {
                stage: "analysis",
                provider_code: this.code,
                diagnostic_type: this.diagnosticType,
                ...(this.operation === undefined ? {} : { operation: this.operation }),
                ...(this.requestId === undefined ? {} : { request_id: this.requestId }),
            },
        };
    }
}
export class HopperProcessError extends HopperError {
    exitCode;
    _tag = providerErrorTag("HopperProcessError");
    failureCode;
    userMessage;
    providerState;
    stage;
    diagnostic;
    operation;
    requestId;
    launcherFailure;
    constructor(exitCode, context = {}) {
        super(`Hopper bridge stopped unexpectedly with code ${String(exitCode)}`, context);
        this.exitCode = exitCode;
        this.diagnostic = context.diagnostic;
        this.operation = context.operation;
        this.requestId = context.requestId;
        this.launcherFailure = context.launcherFailure;
        const failure = hopperStartupFailure(exitCode);
        this.userMessage =
            failure?.code === "invalid_dialog_timeout"
                ? invalidDialogTimeoutMessage(dialogTimeoutFromDiagnostic(context.diagnostic))
                : failure?.message;
        this.stage =
            context.stage ??
                (failure === undefined
                    ? context.operation === undefined
                        ? "connection"
                        : "analysis"
                    : "launch");
        this.failureCode = failure?.code;
        this.providerState =
            context.providerState ?? (exitCode === null ? "unknown" : "exited");
    }
    get providerWide() {
        return true;
    }
    providerRequest() {
        return {
            facts: hopperRequestFacts(this.operation, this.requestId),
            reattribute: (operation, options) => new HopperProcessError(this.exitCode, {
                ...options,
                operation,
                requestId: this.requestId,
                providerState: this.providerState,
                stage: this.stage,
                ...(this.diagnostic === undefined
                    ? {}
                    : { diagnostic: this.diagnostic }),
                ...(this.launcherFailure === undefined
                    ? {}
                    : { launcherFailure: this.launcherFailure }),
            }),
        };
    }
    ownPresentation() {
        const continuing = this.#continuing();
        return {
            ...HOPPER_CLASSIFICATIONS.unavailable,
            message: this.#message(),
            ...(continuing === undefined ? {} : { continuing }),
            remediation: this.failureCode !== undefined && this.userMessage !== undefined
                ? this.userMessage
                : this.stage === "launch"
                    ? "Review the captured launcher diagnostics and Hopper setup, then retry opening the target."
                    : RERUN_HOPPER_INVOCATION,
            details: {
                exit_code: this.exitCode,
                stage: this.stage,
                provider_state: this.providerState,
                retry_action: providerRetryAction(this.providerState, this.failureCode !== undefined || this.stage === "launch"),
                ...(this.failureCode === undefined
                    ? {}
                    : { failure_code: this.failureCode }),
                ...(this.operation === undefined ? {} : { operation: this.operation }),
                ...(this.requestId === undefined ? {} : { request_id: this.requestId }),
                ...(this.diagnostic === undefined
                    ? {}
                    : { diagnostics: { ...this.diagnostic } }),
                ...(this.launcherFailure === undefined
                    ? {}
                    : { launcher: this.launcherFailure }),
            },
        };
    }
    #message() {
        const where = this.operation ?? this.stage;
        const request = this.requestId === undefined
            ? ""
            : ` Request id ${String(this.requestId)}.`;
        const startup = this.userMessage === undefined ? "" : ` ${this.userMessage}`;
        if (this.providerState === "exited") {
            const signal = this.launcherFailure?.signal;
            const exit = this.exitCode === null
                ? signal === undefined || signal === null
                    ? "no exit code was observed"
                    : `signal ${signal}`
                : `exit code ${String(this.exitCode)}`;
            return `Hopper exited during ${where} (${exit}).${startup}${request}`;
        }
        if (this.providerState === "unreachable")
            return `Hopper became unreachable during ${where}; its process exit was not observed.${startup}${request}`;
        return `Hopper failed during ${where} and REA could not determine whether the provider is busy, exited, or unreachable.${startup}${request}`;
    }
    #continuing() {
        if (this.providerState === "exited" &&
            (this.stage === "launch" || this.failureCode !== undefined))
            return undefined;
        const action = this.providerState === "unreachable"
            ? RESTART_UNREACHABLE_HOPPER
            : providerRetryAction(this.providerState) === "restart_provider"
                ? RESTART_OWNED_PROVIDER
                : "Read binary_session.provider_operation_health for this request before retrying or restarting the owned provider.";
        return {
            userMessage: action,
            ...(this.stage === "launch" ||
                (this.failureCode !== undefined && this.userMessage !== undefined)
                ? {}
                : { remediationAction: action }),
        };
    }
}
/**
 * The one Apple Events denial REA can recognize. The helper does not identify
 * the responsible process, so these facts stay constant for that denial.
 */
export const hopperAppleEventsAuthorizationRejection = {
    boundary: "apple_events_authorization",
    reason: "not_authorized",
    responsibility: "client_or_disclaimed_runtime",
    settings_pane: "privacy_security_automation",
    entitlement_id: HOPPER_APPLE_EVENTS_ENTITLEMENT_ID,
};
/** Recognize the Apple Events refusal that the same client cannot retry. */
export const hopperAppleEventsAuthorizationDenied = (rejection) => rejection?.boundary === "apple_events_authorization";
/** Hopper or the repository bridge could not be started. */
export class HopperStartError extends HopperError {
    _tag = providerErrorTag("HopperStartError");
    userMessage;
    ownerRunId;
    launcherFailure;
    launchRejection;
    constructor(options) {
        super("Hopper application bridge could not be started", options);
        this.userMessage = options?.userMessage;
        this.ownerRunId = options?.ownerRunId;
        this.launcherFailure = options?.launcherFailure;
        this.launchRejection = options?.launchRejection;
    }
    get providerWide() {
        return true;
    }
    ownPresentation() {
        const denied = hopperAppleEventsAuthorizationDenied(this.launchRejection);
        return {
            ...HOPPER_CLASSIFICATIONS.unavailable,
            message: denied
                ? HOPPER_APPLE_EVENTS_AUTHORIZATION_MESSAGE
                : (this.userMessage ??
                    "Hopper could not start. Check the launcher and target details, then retry opening the target."),
            remediation: denied
                ? HOPPER_APPLE_EVENTS_AUTHORIZATION_REMEDIATION
                : this.ownerRunId === undefined
                    ? "Check the Hopper launcher and target details, then retry opening the target."
                    : `Use the active REA session ${this.ownerRunId} or close it before opening this target again.`,
            ...(denied ? { retryable: false } : {}),
            details: {
                stage: "launch",
                provider_state: "unknown",
                ...(this.launchRejection === undefined
                    ? {}
                    : { launch_rejection: { ...this.launchRejection } }),
                retry_action: this.ownerRunId === undefined && !denied ? "retry" : "unknown",
                ...(this.ownerRunId === undefined
                    ? {}
                    : { owner_run_id: this.ownerRunId }),
                ...(this.launcherFailure === undefined
                    ? {}
                    : { launcher: this.launcherFailure }),
            },
        };
    }
}
const HOPPER_DIAGNOSTIC_TYPES = {
    remote: true,
    authorization: true,
    invalid_request: true,
    capability_unavailable: true,
    bridge_exception: true,
};
/** Hopper's rows in the generated error catalogue. */
export const hopperErrorCatalogue = () => [
    catalogueRow(providerErrorTag("HopperTimeoutError"), "", HOPPER_CLASSIFICATIONS.timeout),
    catalogueRow(providerErrorTag("HopperCancelledError"), "", HOPPER_CLASSIFICATIONS.cancelled),
    catalogueRow(providerErrorTag("HopperProtocolError"), "", HOPPER_CLASSIFICATIONS.protocol),
    ...Object.keys(HOPPER_DIAGNOSTIC_TYPES).map((diagnosticType) => catalogueRow(providerErrorTag("HopperRemoteError"), `diagnostic_type=${diagnosticType}`, hopperRemoteClassification(diagnosticType))),
    catalogueRow(providerErrorTag("HopperProcessError"), "", HOPPER_CLASSIFICATIONS.unavailable),
    catalogueRow(providerErrorTag("HopperStartError"), "", HOPPER_CLASSIFICATIONS.unavailable),
    catalogueRow(providerErrorTag("HopperStartError"), "Apple Events authorization denied", HOPPER_CLASSIFICATIONS.unavailable, false),
];
