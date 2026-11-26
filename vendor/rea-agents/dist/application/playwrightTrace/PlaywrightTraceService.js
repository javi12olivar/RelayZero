import { primaryAnalysisError, } from "../../domain/analysisErrorBase.js";
import { createEvidence } from "../../domain/evidence.js";
import { inspectPlaywrightTraceInputSchema } from "../../domain/playwrightTrace/playwrightTraceQuery.js";
import { PLAYWRIGHT_TRACE_OPERATION as operation, PLAYWRIGHT_TRACE_PROVIDER, playwrightTraceSchema, } from "../../domain/playwrightTrace/playwrightTrace.js";
import { parseAnalysisInput } from "../AnalysisInput.js";
import { completeProviderEvidence } from "../ProviderOperationExecution.js";
const evidence = (report) => createEvidence({
    path: report.artifact.path,
    format: "file",
    sha256: report.artifact.sha256,
}, PLAYWRIGHT_TRACE_PROVIDER, {
    operation,
    predicateType: "rea.playwright-trace-inventory",
    parameters: {
        path: report.artifact.path,
        decoder_profile: "playwright-trace-v10",
    },
    result: report,
    confidence: "observed",
    limitations: report.limitations,
    locations: [{ kind: "artifact-path", path: report.artifact.path }],
});
/** One Evidence workflow serves CLI and MCP; delivery selection never changes source identity. */
export class PlaywrightTraceService {
    port;
    constructor(port) {
        this.port = port;
    }
    async inspect(raw, signal) {
        const parsed = parseAnalysisInput(operation, raw, inspectPlaywrightTraceInputSchema, signal);
        if (!parsed.ok)
            return parsed;
        const loaded = await this.port.inspect(parsed.value.path, signal);
        if (!loaded.ok) {
            const source = loaded.error.partialObservation ??
                primaryAnalysisError(loaded.error).partialObservation;
            const partial = playwrightTraceSchema.safeParse(source);
            if (partial.success) {
                const projected = evidence(partial.data);
                let current = loaded.error;
                while (current !== undefined) {
                    if (current.partialObservation === source ||
                        current.partialObservation === undefined)
                        current.partialObservation = projected;
                    current = current.cleanupPrimary;
                }
            }
            return loaded;
        }
        return completeProviderEvidence(evidence(loaded.value), signal);
    }
}
