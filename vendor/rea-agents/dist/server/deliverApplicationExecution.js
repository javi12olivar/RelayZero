import { setImmediate } from "node:timers/promises";
import { inspectAnalysisViewValidated } from "../application/analysisView/AnalysisViewService.js";
import { recordEvidenceSources } from "../application/investigation/recordEvidenceSources.js";
import { cancelledBy } from "../domain/analysisErrorCore.js";
import { jsonValueSchema } from "../domain/jsonValue.js";
import { ok } from "../domain/result.js";
/**
 * Stage an optional caller-selected view against the completed parent, then
 * commit its sources and the parent (with its residual unknown) and deliver.
 * A request cancelled before commit leaves the session unchanged; a delivered
 * view that does not fit names the retained parent and a smaller page
 * instead of its own record.
 */
export const deliverApplicationExecution = async (delivery, records, contract, execution, view, signal) => {
    const parent = execution.evidence;
    const selected = view === undefined
        ? ok(parent)
        : inspectAnalysisViewValidated({
            source: {
                kind: "retained-evidence",
                evidence_id: parent.evidence_id,
            },
            view,
        }, (id) => id === parent.evidence_id ? parent : records.evidenceById?.(id));
    await setImmediate();
    if (signal.aborted)
        return delivery.toErrorToolResult(cancelledBy(contract.name, signal), contract.returnsTargetContent);
    if (!selected.ok)
        return delivery.toCallToolResult(selected, contract);
    const sources = recordEvidenceSources(records.recordEvidence, execution.sources, { evidence: selected.value });
    if (!sources.ok)
        return delivery.toCallToolResult(sources, contract);
    const saved = execution.unknown === undefined
        ? records.recordEvidence?.(parent)
        : records.recordEvidenceWithUnknown?.(parent, execution.unknown);
    if (view === undefined)
        return delivery.toEvidenceToolResult(parent, contract, saved);
    if (saved !== undefined && !saved.ok)
        return delivery.toCallToolResult(saved, contract);
    return delivery.toSelectedViewToolResult(selected.value, { parent, request: jsonValueSchema.parse(view) }, contract, records.recordEvidence?.(selected.value));
};
