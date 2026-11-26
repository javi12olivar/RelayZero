import { completedOperationEvidence } from "../application/binary/SessionEvidenceReuse.js";
import { retainedSummaryDelivery, withoutDeliveryDetail, } from "./retainedSummaryDelivery.js";
import { ok } from "../domain/result.js";
import { jsonObjectSchema } from "../domain/jsonValue.js";
import { mcpProgressReporter } from "./mcpProgress.js";
import { logToolExecution } from "./toolLogging.js";
import { recordEvidenceSources } from "../application/investigation/recordEvidenceSources.js";
import { createOperationProgress } from "./operationProgress.js";
import { currentMcpToolRequest } from "./McpToolRequest.js";
/**
 * Run one provider operation on the analysis admission grants and deliver its
 * observation as atomic Evidence: the session's reusable record when it
 * already holds the same observation, else a new record admitted against the
 * completed analysis. A `detail: "summary"` request is refused before analysis
 * when nothing retains the complete Evidence, and never reaches the provider
 * of a contract that declares a retained summary.
 */
export const createProviderOperationToolHandler = (server, operation, options, dependencies) => (contract) => {
    const delivery = contract.retainedSummary === undefined
        ? undefined
        : retainedSummaryDelivery(contract.name, dependencies);
    return async (input, context) => {
        const resolved = jsonObjectSchema.parse(input);
        const parameters = currentMcpToolRequest()?.callerParameters(contract.name, input, resolved) ?? resolved;
        const ready = delivery?.preflight(resolved) ?? ok(null);
        if (!ready.ok)
            return server.delivery.toCallToolResult(ready, contract);
        const admitted = await dependencies.withAdmittedAnalysis(contract.name, context.mcpReq.signal, async (admittedAnalysis) => {
            const analysis = options.analysisForAdmission?.(admittedAnalysis) ??
                admittedAnalysis;
            const progress = createOperationProgress(mcpProgressReporter(context), contract.name);
            await progress.start();
            const providerParameters = contract.retainedSummary === undefined
                ? parameters
                : withoutDeliveryDetail(parameters);
            const executionParameters = options.parametersForExecution?.(operation, providerParameters) ??
                providerParameters;
            const execution = await logToolExecution(dependencies.logger, contract.name, () => analysis.execute(operation, executionParameters, {
                signal: context.mcpReq.signal,
                progress,
                isOperationAdvertised: (advertised) => server.advertisesTool(advertised),
            }));
            if (!execution.ok)
                return progress.complete(server.delivery.toCallToolResult(execution, contract));
            const sourceEvidence = execution.value.sourceEvidence ?? [];
            const sourceRecorded = recordEvidenceSources(dependencies.recordEvidence, sourceEvidence);
            if (!sourceRecorded.ok)
                return progress.complete(server.delivery.toCallToolResult(sourceRecorded, contract));
            const evidenceParameters = contract.retainedSummary?.evidenceParameters === "omit-detail"
                ? providerParameters
                : parameters;
            const evidence = completedOperationEvidence(operation, evidenceParameters, execution.value, {
                target: options.activeTarget?.() ?? null,
                admitRecovery: options.admitRecovery,
                evidenceById: dependencies.evidenceById,
            });
            if (!evidence.ok)
                return progress.complete(server.delivery.toCallToolResult(evidence, contract));
            const projected = delivery?.projectEvidence(resolved, evidence.value) ??
                ok(evidence.value);
            if (!projected.ok)
                return progress.complete(server.delivery.toCallToolResult(projected, contract));
            const recorded = dependencies.recordEvidence?.(projected.value);
            return progress.complete(server.delivery.toEvidenceToolResult(projected.value, contract, recorded));
        });
        return admitted.ok
            ? admitted.value
            : server.delivery.toCallToolResult(admitted, contract);
    };
};
