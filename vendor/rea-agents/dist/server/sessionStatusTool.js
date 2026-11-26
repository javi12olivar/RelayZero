import { BINARY_SESSION_SUMMARY_OMITTED_FIELDS, } from "../contracts/sessionStatusContract.js";
import { AnalysisError } from "../domain/analysisErrorBase.js";
import { analysisErrorWithCleanupDependencies } from "../domain/analysisErrorCleanup.js";
import { ProviderAdapterError } from "../domain/providerAdapterError.js";
import { buildCapabilityInventory, compactToolAvailability, } from "../application/CapabilityInventory.js";
import { restrictAdvertisedCapabilities } from "../application/binary/BinarySessionStatus.js";
import { toolContract } from "../contracts/toolContracts.js";
import { jsonObjectSchema } from "../domain/jsonValue.js";
import { createServerIdentity } from "../process/ServerIdentity.js";
import { mcpClientMetadata } from "./mcpClientMetadata.js";
import { err, ok } from "../domain/result.js";
import { CURRENT_ENTRYPOINT_PATH } from "../process/CurrentEntrypointPath.js";
/**
 * Probe only families this registration advertises. Scoped-out providers keep
 * the established not-configured shape instead of launching probes whose tools
 * cannot appear in the response.
 */
const probeSessionAvailability = async (probes, signal, advertisesFamily) => {
    const probe = (family, run) => advertisesFamily(family) ? Promise.resolve().then(run) : undefined;
    const pending = [
        probe("android", () => probes.androidAnalysisAvailability(signal)),
        probe("adb", () => probes.adbAnalysisAvailability?.(signal)),
        probe("apktool", () => probes.apktoolAnalysisAvailability?.(signal)),
        probe("jeb", () => probes.jebAnalysisAvailability?.(signal)),
        probe("artifact", () => probes.evmLimiterAvailability?.(signal)),
    ];
    try {
        const [android, adb, apktool, jeb, evmLimiter] = await Promise.all(pending);
        return { android, adb, apktool, jeb, evmLimiter };
    }
    catch (cause) {
        const settled = await Promise.allSettled(pending);
        let failure = cause;
        for (const result of settled) {
            if (result.status !== "rejected" ||
                result.reason === cause ||
                !(result.reason instanceof AnalysisError) ||
                !result.reason.cleanupIncomplete)
                continue;
            const primary = failure instanceof AnalysisError
                ? failure
                : new ProviderAdapterError("rea", "binary_session", {
                    cause: failure,
                });
            failure = analysisErrorWithCleanupDependencies(primary, result.reason, "binary_session");
        }
        throw failure;
    }
};
/** Report provider, target and tool availability for one status request. */
export const readSessionStatus = async (options, input, context) => {
    const { server, session, startedAt, availabilityPolicy } = options;
    const { client, clientFeatures, protocolVersion } = mcpClientMetadata(context, server.server);
    let availabilityResults;
    let status;
    try {
        availabilityResults = await probeSessionAvailability(options, context.mcpReq.signal, (family) => server.advertisesFamily(family));
        status = await session.status({
            signal: context.mcpReq.signal,
            detail: input.detail,
            refreshCandidates: input.refresh_candidates,
        });
    }
    catch (cause) {
        if (!(cause instanceof AnalysisError))
            throw cause;
        return err(cause);
    }
    const statusObject = jsonObjectSchema.parse(status);
    // Availability is derived from the complete provider facts: an
    // advertised composed tool still depends on direct operations the
    // registration hides. Advertisement narrows only the public report.
    const toolAvailability = buildCapabilityInventory(status, {
        ...availabilityPolicy(),
        ...(availabilityResults.android === undefined
            ? {}
            : { androidAnalysisAvailability: availabilityResults.android }),
        ...(availabilityResults.adb === undefined
            ? {}
            : { adbAnalysisAvailability: availabilityResults.adb }),
        ...(availabilityResults.apktool === undefined
            ? {}
            : { apktoolAnalysisAvailability: availabilityResults.apktool }),
        ...(availabilityResults.jeb === undefined
            ? {}
            : { jebAnalysisAvailability: availabilityResults.jeb }),
        ...(availabilityResults.evmLimiter === undefined
            ? {}
            : { evmLimiterAvailability: availabilityResults.evmLimiter }),
    }, (name) => server.advertisesTool(name));
    const serverIdentity = createServerIdentity({
        startedAt,
        commandPath: CURRENT_ENTRYPOINT_PATH,
        catalog: server.catalogIdentity,
        expected: {
            ...(input.expected_package_version === undefined
                ? {}
                : { package_version: input.expected_package_version }),
            ...(input.expected_catalog_digest === undefined
                ? {}
                : { catalog_digest: input.expected_catalog_digest }),
            ...(input.expected_server_path === undefined
                ? {}
                : { server_path: input.expected_server_path }),
        },
        ...(client === undefined ? {} : { client }),
        ...(protocolVersion === undefined ? {} : { protocolVersion }),
    });
    return ok(projectSessionStatus({
        detail: input.detail,
        status: server.advertisedToolFamilies === undefined
            ? statusObject
            : restrictAdvertisedCapabilities(statusObject, (operation) => server.advertisesTool(operation)),
        toolAvailability,
        serverIdentity,
        clientFeatures,
    }));
};
const projectSessionStatus = (options) => jsonObjectSchema.parse({
    ...options.status,
    detail: options.detail,
    ...(options.detail === "summary"
        ? { omitted_fields: [...BINARY_SESSION_SUMMARY_OMITTED_FIELDS] }
        : {}),
    tool_availability: compactToolAvailability(options.toolAvailability, options.detail),
    client_features: options.clientFeatures,
    server_identity: options.serverIdentity,
});
