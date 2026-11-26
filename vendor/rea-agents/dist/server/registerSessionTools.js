import { runtimeNativeMatchingAllowance } from "../config/runtimeAnalysisSettings.js";
import { ProcessCaptureResourceScope } from "../process/capture/ProcessCaptureLifecycle.js";
import { ProcessCaptureError } from "../process/capture/ProcessCaptureError.js";
import { AnalysisError } from "../domain/analysisErrorBase.js";
import { err, ok } from "../domain/result.js";
import { registerServiceTools } from "./serviceToolBindings.js";
import { sessionAvailabilityPolicy } from "./sessionAvailabilityPolicy.js";
import { withAdmittedAnalysis } from "./analysisAdmission.js";
import { errorMessage } from "../kernel/errorMessage.js";
/** Close, reset and status run outside analysis admission; the session orders them. */
const registerLifecycleTools = (registration) => {
    registerServiceTools(registration.server, { sessionLifecycle: registration, sessionStatus: registration }, { logger: registration.logger });
};
export const registerSessionTools = (server, session, logger, options) => {
    const processResources = new ProcessCaptureResourceScope();
    registerLifecycleTools({
        ...options,
        server,
        session,
        logger,
        startedAt: options.startedAt ?? new Date().toISOString(),
        availabilityPolicy: sessionAvailabilityPolicy(options.availabilityPolicy, {}, options.platform),
        androidAnalysisAvailability: options.androidAnalysisAvailability ?? missingAndroidAvailability,
        closeProcessResources: async () => {
            try {
                await processResources.retryCleanup();
                return ok(null);
            }
            catch (cause) {
                if (cause instanceof AnalysisError)
                    return err(cause);
                return err(new ProcessCaptureError("process capture cleanup remains incomplete", {
                    cause,
                    reason: "cleanup_incomplete",
                    cleanup: {
                        reason: "process capture cleanup remains incomplete",
                        resources: ["process_capture_resources"],
                    },
                    executionFailure: cause instanceof Error
                        ? cause.message || cause.name
                        : String(cause),
                }));
            }
        },
    });
    const closeServer = server.close.bind(server);
    server.close = async () => {
        const results = await Promise.allSettled([
            closeServer(),
            processResources.close(),
        ]);
        const failures = results.flatMap((result) => result.status === "rejected" ? [result.reason] : []);
        if (failures.length > 0)
            throw new AggregateError(failures, "REA session cleanup failed");
    };
    const previousOnclose = server.server.onclose;
    server.server.onclose = () => {
        try {
            previousOnclose?.();
        }
        finally {
            void processResources.close().catch((cause) => {
                logger.error({ error: errorMessage(cause) }, "Process capture cleanup failed during server shutdown");
            });
        }
    };
    registerServiceTools(server, {
        binaryTarget: session,
        analysisContext: {},
        processCapture: {
            session,
            environment: options.environment,
            platform: options.platform,
            resources: processResources,
        },
        sessionDerived: { session, resources: options.artifactResources },
        sessionRecords: { session, resources: options.artifactResources },
    }, {
        logger,
        withAdmittedAnalysis: withAdmittedAnalysis({ kind: "session", session }),
    });
    // Native matching records in the session itself and reads each accepted
    // call's settings snapshot over the launch value.
    registerServiceTools(server, {
        nativeFunctionMatching: {
            session,
            allowance: runtimeNativeMatchingAllowance(options.environment, server.analysisSettings?.read),
        },
    }, {
        logger,
        recordEvidence: (evidence) => session.recordEvidence(evidence),
        withAdmittedAnalysis: withAdmittedAnalysis({ kind: "session", session }),
    });
};
const missingAndroidAvailability = async () => ({
    status: "unavailable",
    code: "not_configured",
    reason: "No Android JADX analysis provider is configured.",
    remediation: "Set REA_JADX_MCP_JAR to the jadx-headless-mcp 0.7.1 release JAR (rea doctor --provider jadx names its download URL and SHA-256) and provide a full JDK on Linux, macOS, or Windows x64 with its matching bundled native controls.",
    diagnostics: { configured: false },
});
