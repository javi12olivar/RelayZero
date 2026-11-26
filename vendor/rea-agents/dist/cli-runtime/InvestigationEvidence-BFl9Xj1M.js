import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { err, init_result, ok } from "./cliBuiltinArguments-CqSJFnNt.js";
import { init_canonicalOrdering, uniqueSorted } from "./canonicalOrdering-C7Yzy62j.js";
import { init_EvidenceInputResolver, resolveEvidenceInput } from "./EvidenceInputResolver-DpJOzfQ9.js";

//#region dist/application/investigation/InvestigationEvidence.js
var visitClosure, collectInvestigationEvidenceClosure, resolveInvestigationEvidenceClosure, createInvestigationEvidenceClosureChecker;
function init_InvestigationEvidence() {
	return (init_InvestigationEvidence = __esmMin((() => {
		init_EvidenceInputResolver();
		init_canonicalOrdering();
		init_result();
		visitClosure = (lookup, seedIds, knownComplete, collect) => {
			const visited = new Set();
			let failure;
			const pending = [...seedIds];
			while (pending.length > 0) {
				const evidenceId = pending.pop();
				if (evidenceId === undefined || visited.has(evidenceId) || knownComplete?.has(evidenceId)) continue;
				const evidence = resolveEvidenceInput({
					kind: "retained-evidence",
					evidence_id: evidenceId
				}, lookup, "retained-closure");
				if (!evidence.ok) {
					if (collect === undefined) return evidence;
					failure ??= evidence.error;
					visited.add(evidenceId);
					continue;
				}
				visited.add(evidenceId);
				collect?.(evidence.value);
				for (const linkedId of evidence.value.evidence_links) pending.push(linkedId);
			}
			return failure === undefined ? ok(visited) : err(failure);
		};
		collectInvestigationEvidenceClosure = (reader, seedIds) => {
			const records = [];
			const visited = visitClosure((id) => reader.evidenceForAnalysis(id), seedIds, undefined, (record) => records.push(record));
			return {
				records,
				result: visited.ok ? ok(null) : visited
			};
		};
		resolveInvestigationEvidenceClosure = (reader, seedIds, sources = []) => {
			const supplied = new Map(sources.map((source) => [source.evidence_id, source]));
			const visited = visitClosure((id) => supplied.get(id) ?? reader.evidenceForAnalysis(id), seedIds);
			return visited.ok ? ok(uniqueSorted([...visited.value])) : visited;
		};
		createInvestigationEvidenceClosureChecker = (reader) => {
			const complete = new Set();
			const incomplete = new Set();
			return (seedIds) => {
				const single = seedIds.length === 1 ? seedIds[0] : undefined;
				if (single !== undefined && incomplete.has(single)) return false;
				const visited = visitClosure((id) => reader.evidenceForAnalysis(id), seedIds, complete);
				if (!visited.ok) {
					if (single !== undefined) incomplete.add(single);
					return false;
				}
				for (const id of visited.value) complete.add(id);
				return true;
			};
		};
	})))();
}

//#endregion
export { collectInvestigationEvidenceClosure, createInvestigationEvidenceClosureChecker, init_InvestigationEvidence, resolveInvestigationEvidenceClosure };