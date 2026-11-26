import { TOOL_CONTRACTS } from "../contracts/toolContracts.js";
import { invariantViolation } from "../domain/internalInvariant.js";
import { err, ok } from "../domain/result.js";
import { optionalProviderUnavailable, } from "../ports/OptionalObservationProviders.js";
import { createAnalysisToolHandler, createApplicationToolHandler, createDerivedToolHandler, createEvidenceToolHandler, createRetainedSummaryToolHandler, createValueToolHandler, } from "./contractToolHandler.js";
import { createProviderOperationToolHandler, } from "./providerOperationToolHandler.js";
import { createExternalMutationToolHandler, } from "./externalMutationToolHandler.js";
import { applicationToolRegistrationOptions, toolRegistrationOptions, } from "./toolRegistrationOptions.js";
/** A session-only derivation acquires nothing; it derives from session-held Evidence. */
const derivedAcquisition = (binding) => {
    if (binding.acquire !== undefined) {
        const { acquire, resources } = binding;
        return (input, sources) => acquire(input, { ...sources, resources });
    }
    const { derive } = binding;
    return async (input, { evidenceForAnalysis, signal }) => ok(() => derive(input, evidenceForAnalysis, signal));
};
/** Refuse every call of an operation whose optional provider failed to load. */
const unavailableToolHandler = (server, contract, failure) => async () => server.delivery.toCallToolResult(err(optionalProviderUnavailable(failure, contract.name)), contract);
/** A provider-backed workflow runs only on the analysis admission grants. */
const requiredAdmission = (admission, name) => {
    if (admission === undefined)
        throw invariantViolation(`MCP tool ${name} runs on admitted analysis, but the server admits none`);
    return admission;
};
/** A query reads the analysis its required admission grants. */
const analysisQuery = (query, name) => (input, request) => {
    if (request.analysis === undefined)
        throw invariantViolation(`MCP tool ${name} reads admitted analysis, but admission granted none`);
    return query(input, request.analysis, request);
};
/** Bind every named operation of one contract service with one admission. */
export const contractServiceBindings = (service, names, admission = "sdk") => Object.fromEntries(names.map((name) => [
    name,
    {
        admission,
        run: (input, options) => service.execute(name, input, options),
    },
]));
/**
 * Register each bound contract from the registry through the shared handler
 * its binding selects. A binding that names no registered contract is refused
 * at startup, so a renamed or removed contract cannot leave a dead handler.
 */
export const registerContractTools = (server, bindings, dependencies) => {
    const { logger, recordEvidence, recordEvidenceWithUnknown, evidenceById, withAdmittedAnalysis, } = dependencies;
    const retention = { recordEvidence, evidenceById };
    const table = bindings;
    const unbound = new Set(Object.keys(table));
    for (const contract of TOOL_CONTRACTS) {
        const binding = table[contract.name];
        if (binding === undefined)
            continue;
        unbound.delete(contract.name);
        if (binding.provider !== undefined &&
            binding.provider.operation !== contract.name)
            throw invariantViolation(`MCP tool ${contract.name} binds provider operation ${binding.provider.operation}`);
        const registration = binding.admission === "sdk"
            ? toolRegistrationOptions(contract)
            : applicationToolRegistrationOptions(contract);
        const handler = binding.run !== undefined && binding.unavailable !== undefined
            ? unavailableToolHandler(server, contract, binding.unavailable)
            : binding.provider !== undefined
                ? createProviderOperationToolHandler(server, binding.provider.operation, binding.provider, {
                    logger,
                    recordEvidence,
                    evidenceById,
                    withAdmittedAnalysis: requiredAdmission(withAdmittedAnalysis, contract.name),
                })(contract)
                : binding.mutation !== undefined
                    ? createExternalMutationToolHandler(server, binding.session, binding.mutation, logger, retention)(contract)
                    : binding.analyze !== undefined
                        ? createAnalysisToolHandler(server, binding.analyze, logger, retention, requiredAdmission(withAdmittedAnalysis, contract.name), {
                            detail: binding.detail,
                            completionProgress: binding.completionProgress,
                        })(contract)
                        : binding.query !== undefined
                            ? createValueToolHandler(server, analysisQuery(binding.query, contract.name), logger, requiredAdmission(withAdmittedAnalysis, contract.name), recordEvidence)(contract)
                            : binding.value !== undefined
                                ? createValueToolHandler(server, binding.value, logger, binding.admitted === true
                                    ? withAdmittedAnalysis
                                    : undefined, recordEvidence)(contract)
                                : binding.workflow !== undefined
                                    ? createApplicationToolHandler(server, binding, logger, {
                                        recordEvidence,
                                        recordEvidenceWithUnknown,
                                        evidenceById,
                                    }, withAdmittedAnalysis)(contract)
                                    : binding.derive !== undefined ||
                                        binding.acquire !== undefined
                                        ? createDerivedToolHandler(server, binding.session, derivedAcquisition(binding), logger)(contract)
                                        : binding.run !== undefined
                                            ? createEvidenceToolHandler(server, binding.run, logger, recordEvidence, withAdmittedAnalysis, binding.viewSource)(contract)
                                            : createRetainedSummaryToolHandler(server, contract, binding, logger, retention, withAdmittedAnalysis);
        const present = binding.value === undefined ? undefined : binding.presentResult;
        server.registerTool(contract.name, registration, present === undefined
            ? handler
            : async (input, context) => present(await handler(input, context)));
    }
    if (unbound.size > 0)
        throw invariantViolation(`MCP tool bindings name no registered contract: ${[...unbound].join(", ")}`);
};
