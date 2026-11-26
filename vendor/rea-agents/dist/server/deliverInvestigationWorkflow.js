import { recordEvidenceSources, retainAnalysisResultSources, } from "../application/investigation/recordEvidenceSources.js";
import { recordDerivedEvidence } from "./recordDerivedEvidence.js";
/** Retain workflow sources before delivering the derived Evidence or its failure. */
export const deliverInvestigationWorkflow = (server, session, contract, computed) => {
    const record = session.recordEvidence.bind(session);
    const completed = retainAnalysisResultSources(contract.name, record, computed);
    if (!completed.ok)
        return server.delivery.toPartialErrorToolResult(completed.error, contract.returnsTargetContent, record);
    const { evidence, sources, unknown } = completed.value;
    const retained = recordEvidenceSources(record, sources, {
        evidence,
        evidenceForAnalysis: session.evidenceForAnalysis.bind(session),
    });
    if (!retained.ok)
        return server.delivery.toCallToolResult(retained, contract);
    return server.delivery.toEvidenceToolResult(evidence, contract, recordDerivedEvidence(session, evidence, unknown));
};
