import { createAnalysisExecutionEvidence } from "../domain/analysisObservation.js";
import { AnalysisOutputError } from "../domain/analysisErrorCore.js";
import { outputContractDiagnostics } from "../domain/native/nativeProviderOutput.js";
import { err, ok } from "../domain/result.js";
/**
 * Run one native operation through `port` and parse its result once against
 * the named contract. The call goes through the port's own `execute`, so a
 * wrapping port observes it as any other call. A mismatch is an
 * `AnalysisOutputError` naming the failed fields, keeping the execution as
 * partial observed Evidence.
 */
export const executeFact = async (port, contract, parameters, options) => {
    const executed = await port.execute(contract.operation, parameters, options);
    if (!executed.ok)
        return executed;
    const parsed = contract.schema.safeParse(executed.value.result);
    if (parsed.success)
        return ok({ execution: executed.value, fact: parsed.data });
    return err(new AnalysisOutputError(contract.operation, `Provider returned an invalid ${contract.subject}`, {
        cause: parsed.error,
        diagnostics: outputContractDiagnostics(parsed.error, executed.value.result),
    }).retainPartialObservation(createAnalysisExecutionEvidence(contract.operation, parameters, executed.value, "observed")));
};
