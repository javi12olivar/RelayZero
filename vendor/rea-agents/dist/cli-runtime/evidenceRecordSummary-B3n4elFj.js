import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, init_analysisErrorCore, init_localPath, init_sha256Hex, localPathStringSchema, sha256Hex } from "./jsonSerialization-DAF9DVXC.js";
import { evidenceFileTarget, evidenceSchema, init_evidence, init_nativeValueFlow, nativeValueFlowMetadataSchema } from "./nativeValueFlow-13oOEkkJ.js";
import { init_canonicalOrdering, uniqueSorted } from "./canonicalOrdering-C7Yzy62j.js";
import { digestSchema, init_digests, prefixedDigestSchema } from "./targetIdentity-rKLLVwEj.js";
import { init_evidenceBundle, parseEvidenceBundle, referencedEvidenceIds, serializeEvidenceBundle } from "./evidenceBundle-CWOVHJ6o.js";
import { z } from "zod";

//#region dist/domain/comparisonStatus.js
var comparisonStatusSchema;
function init_comparisonStatus() {
	return (init_comparisonStatus = __esmMin((() => {
		comparisonStatusSchema = z.enum([
			"unchanged",
			"changed",
			"unknown"
		]);
	})))();
}

//#endregion
//#region dist/domain/bundleComparison.js
var evidenceIdSchema, classificationSchema, bundleComparisonInputSchema, bundleChangeSchema, bundleComparisonResultSchema, compareBundles, compareRecords, recordPairFailure, compareUnknowns, unknownChange, histories, historyEvidenceIds, bundleDigest, same, isPrefix, ascii, compareChanges;
function init_bundleComparison() {
	return (init_bundleComparison = __esmMin((() => {
		init_evidenceBundle();
		init_analysisErrorCore();
		init_digests();
		init_comparisonStatus();
		init_localPath();
		init_sha256Hex();
		evidenceIdSchema = prefixedDigestSchema("ev");
		classificationSchema = z.enum([
			"added",
			"removed",
			"changed",
			"unknown",
			"history_advanced",
			"history_diverged"
		]);
		bundleComparisonInputSchema = z.strictObject({
			left_bundle_path: localPathStringSchema,
			right_bundle_path: localPathStringSchema,
			record_pairs: z.array(z.object({
				left_evidence_id: evidenceIdSchema,
				right_evidence_id: evidenceIdSchema
			})).default([])
		});
		bundleChangeSchema = z.object({
			entity: z.enum(["evidence", "residual_unknown"]),
			key: z.string().min(1),
			classification: classificationSchema,
			conclusion_kind: z.enum([
				"observed_change",
				"contradiction",
				"unresolved_branch"
			]),
			left_evidence_ids: z.array(evidenceIdSchema),
			right_evidence_ids: z.array(evidenceIdSchema),
			left_digest: digestSchema.nullable(),
			right_digest: digestSchema.nullable(),
			limitations: z.array(z.string())
		});
		bundleComparisonResultSchema = z.object({
			status: comparisonStatusSchema,
			left_bundle_sha256: digestSchema,
			right_bundle_sha256: digestSchema,
			summary: z.object({
				records_unchanged: z.int().min(0),
				records_added: z.int().min(0),
				records_removed: z.int().min(0),
				records_changed: z.int().min(0),
				unknowns_unchanged: z.int().min(0),
				unknowns_added: z.int().min(0),
				unknowns_removed: z.int().min(0),
				unknowns_advanced: z.int().min(0),
				unknowns_diverged: z.int().min(0),
				unresolved: z.int().min(0)
			}),
			changes: z.array(bundleChangeSchema),
			limitations: z.array(z.string())
		});
		compareBundles = (leftInput, rightInput, recordPairs = []) => {
			const left = parseEvidenceBundle(leftInput);
			const right = parseEvidenceBundle(rightInput);
			const leftDigest = bundleDigest(left);
			const rightDigest = bundleDigest(right);
			const recordResult = compareRecords(left, right, recordPairs);
			const unknownResult = compareUnknowns(left, right);
			const changes = [...recordResult.changes, ...unknownResult.changes].sort(compareChanges);
			const unresolved = changes.filter(({ conclusion_kind: kind }) => kind !== "observed_change").length;
			return bundleComparisonResultSchema.parse({
				status: unresolved > 0 ? "unknown" : changes.length > 0 ? "changed" : "unchanged",
				left_bundle_sha256: leftDigest,
				right_bundle_sha256: rightDigest,
				summary: {
					...recordResult.summary,
					...unknownResult.summary,
					unresolved
				},
				changes,
				limitations: changes.some(({ limitations }) => limitations.length > 0) ? ["EvidenceBundle has no inventory completeness marker; one-sided membership remains unknown."] : []
			});
		};
		compareRecords = (left, right, pairs) => {
			const leftIds = new Set(left.records.map(({ evidence_id: id }) => id));
			const rightIds = new Set(right.records.map(({ evidence_id: id }) => id));
			const pairedLeft = new Set();
			const pairedRight = new Set();
			const changes = [];
			let changed = 0;
			for (const [index, pair] of pairs.entries()) {
				if (!leftIds.has(pair.left_evidence_id)) throw recordPairFailure(index, "left_evidence_id", `Explicit pair references missing left evidence ${pair.left_evidence_id}`);
				if (!rightIds.has(pair.right_evidence_id)) throw recordPairFailure(index, "right_evidence_id", `Explicit pair references missing right evidence ${pair.right_evidence_id}`);
				if (pairedLeft.has(pair.left_evidence_id)) throw recordPairFailure(index, "left_evidence_id", "Explicit evidence pairs must be one-to-one");
				if (pairedRight.has(pair.right_evidence_id)) throw recordPairFailure(index, "right_evidence_id", "Explicit evidence pairs must be one-to-one");
				pairedLeft.add(pair.left_evidence_id);
				pairedRight.add(pair.right_evidence_id);
				if (pair.left_evidence_id === pair.right_evidence_id) continue;
				changed += 1;
				changes.push({
					entity: "evidence",
					key: `pair:${pair.left_evidence_id}:${pair.right_evidence_id}`,
					classification: "changed",
					conclusion_kind: "observed_change",
					left_evidence_ids: [pair.left_evidence_id],
					right_evidence_ids: [pair.right_evidence_id],
					left_digest: pair.left_evidence_id.slice(3),
					right_digest: pair.right_evidence_id.slice(3),
					limitations: []
				});
			}
			const common = [...leftIds].filter((id) => rightIds.has(id) && !pairedLeft.has(id) && !pairedRight.has(id));
			const removed = [...leftIds].filter((id) => !pairedLeft.has(id) && (!rightIds.has(id) || pairedRight.has(id)));
			const added = [...rightIds].filter((id) => !pairedRight.has(id) && (!leftIds.has(id) || pairedLeft.has(id)));
			for (const [ids, side] of [[removed, "left"], [added, "right"]]) for (const id of ids) changes.push({
				entity: "evidence",
				key: id,
				classification: "unknown",
				conclusion_kind: "unresolved_branch",
				left_evidence_ids: side === "left" ? [id] : [],
				right_evidence_ids: side === "right" ? [id] : [],
				left_digest: side === "left" ? id.slice(3) : null,
				right_digest: side === "right" ? id.slice(3) : null,
				limitations: ["EvidenceBundle has no inventory completeness marker; one-sided membership may reflect incomplete capture."]
			});
			return {
				changes,
				summary: {
					records_unchanged: common.length + pairs.length - changed,
					records_added: 0,
					records_removed: 0,
					records_changed: changed
				}
			};
		};
		recordPairFailure = (index, field, message) => new AnalysisInputError("compare_bundles", { userMessage: message }, [{
			path: [
				"record_pairs",
				index,
				field
			],
			reason: "invalid_value",
			message
		}]);
		compareUnknowns = (left, right) => {
			const leftHistories = histories(left.unknowns);
			const rightHistories = histories(right.unknowns);
			const ids = [...new Set([...leftHistories.keys(), ...rightHistories.keys()])];
			const changes = [];
			const summary = {
				unknowns_unchanged: 0,
				unknowns_added: 0,
				unknowns_removed: 0,
				unknowns_advanced: 0,
				unknowns_diverged: 0
			};
			for (const id of ids) {
				const leftHistory = leftHistories.get(id);
				const rightHistory = rightHistories.get(id);
				if (leftHistory === undefined || rightHistory === undefined) {
					changes.push(unknownChange(id, "unknown", leftHistory, rightHistory));
					continue;
				}
				const leftDigests = leftHistory.map(({ revision_digest: digest }) => digest);
				const rightDigests = rightHistory.map(({ revision_digest: digest }) => digest);
				if (same(leftDigests, rightDigests)) {
					summary.unknowns_unchanged += 1;
					continue;
				}
				const advanced = isPrefix(leftDigests, rightDigests) || isPrefix(rightDigests, leftDigests);
				summary[advanced ? "unknowns_advanced" : "unknowns_diverged"] += 1;
				changes.push(unknownChange(id, advanced ? "history_advanced" : "history_diverged", leftHistory, rightHistory));
			}
			return {
				changes,
				summary
			};
		};
		unknownChange = (id, classification, left, right) => ({
			entity: "residual_unknown",
			key: id,
			classification,
			conclusion_kind: classification === "history_diverged" ? "contradiction" : classification === "history_advanced" ? "observed_change" : "unresolved_branch",
			left_evidence_ids: historyEvidenceIds(left ?? []),
			right_evidence_ids: historyEvidenceIds(right ?? []),
			left_digest: left?.at(-1)?.revision_digest ?? null,
			right_digest: right?.at(-1)?.revision_digest ?? null,
			limitations: left === undefined || right === undefined ? ["EvidenceBundle has no inventory completeness marker; one-sided history membership remains unknown."] : []
		});
		histories = (unknowns) => {
			const output = new Map();
			for (const unknown of unknowns) {
				const history = output.get(unknown.unknown_id) ?? [];
				history.push(unknown);
				output.set(unknown.unknown_id, history);
			}
			return output;
		};
		historyEvidenceIds = (history) => [...new Set(history.flatMap(referencedEvidenceIds))].sort(ascii);
		bundleDigest = (bundle) => sha256Hex(serializeEvidenceBundle(bundle));
		same = (left, right) => left.length === right.length && left.every((value, index) => value === right[index]);
		isPrefix = (shorter, longer) => shorter.length < longer.length && shorter.every((value, index) => value === longer[index]);
		ascii = (left, right) => left < right ? -1 : left > right ? 1 : 0;
		compareChanges = (left, right) => ascii([
			left.entity,
			left.key,
			left.classification,
			left.left_digest ?? "",
			left.right_digest ?? ""
		].join("\0"), [
			right.entity,
			right.key,
			right.classification,
			right.left_digest ?? "",
			right.right_digest ?? ""
		].join("\0"));
	})))();
}

//#endregion
//#region dist/domain/evidenceRecordSummary.js
/** One owner for exact filter semantics, in canonical bundle (Evidence ID) order. */
function* matchingEvidenceRecords(bundle, filters) {
	for (const evidence of bundle.records) {
		if (filters.evidence_id !== undefined && filters.evidence_id !== evidence.evidence_id || filters.operation !== undefined && filters.operation !== evidence.operation || filters.target_sha256 !== undefined && filters.target_sha256 !== evidenceFileTarget(evidence)?.sha256 || filters.analysis_profile_digest !== undefined && filters.analysis_profile_digest !== evidence.analysis_profile?.digest) continue;
		const native = nativeSummary(evidence);
		if (filters.procedure_address !== undefined && (!native.available || filters.procedure_address !== native.procedure_address)) continue;
		yield {
			evidence,
			native
		};
	}
}
var evidenceRecordFiltersSchema, countSchema, nativeMetadataSchema, nativeSummarySchema, evidenceBundleSummarySchema, nativeSummary, selectedFilters, directLinksOf, summarizeEvidenceBundle, EVIDENCE_RECORD_SELECTION_LIMIT, EVIDENCE_RECORD_SELECTION_LIMITATIONS, evidenceRecordSelectionSchema, selectEvidenceRecords, evidenceLinkTraversalSchema, evidenceLinkStatusFilterSchema, EVIDENCE_LINK_INSPECTION_LIMIT, EVIDENCE_LINK_INSPECTION_LIMITATIONS, evidenceLinkInspectionSchema, inspectEvidenceLinks;
function init_evidenceRecordSummary() {
	return (init_evidenceRecordSummary = __esmMin((() => {
		init_canonicalOrdering();
		init_digests();
		init_evidence();
		init_nativeValueFlow();
		evidenceRecordFiltersSchema = z.strictObject({
			evidence_id: prefixedDigestSchema("ev").optional(),
			operation: z.string().min(1).optional(),
			target_sha256: digestSchema.optional(),
			analysis_profile_digest: digestSchema.optional(),
			procedure_address: z.string().min(1).optional()
		});
		countSchema = z.int().nonnegative();
		nativeMetadataSchema = z.object({
			procedure: z.object({
				address: z.string(),
				name: z.string().nullish()
			}),
			native_value_flow: z.unknown().optional()
		});
		nativeSummarySchema = z.discriminatedUnion("available", [z.strictObject({
			available: z.literal(true),
			procedure_address: z.string(),
			procedure_name: z.string().nullable(),
			value_flow: z.discriminatedUnion("status", [
				z.strictObject({
					status: z.literal("observed"),
					truncated: z.boolean(),
					omitted_operations_lower_bound: countSchema,
					known_omitted_inputs: countSchema,
					known_omitted_edges: countSchema
				}),
				z.strictObject({
					status: z.literal("unavailable"),
					reason: z.string()
				}),
				z.strictObject({ status: z.literal("not-recorded") }),
				z.strictObject({
					status: z.literal("unknown"),
					reason: z.string()
				})
			])
		}), z.strictObject({
			available: z.literal(false),
			reason: z.enum(["different-operation", "not-recorded-or-incompatible"])
		})]);
		evidenceBundleSummarySchema = z.strictObject({
			kind: z.literal("evidence-bundle-summary"),
			filters: z.record(z.string(), z.string()),
			total_retained_records: countSchema,
			matching_records: countSchema,
			unknown_revisions: countSchema,
			direct_links: countSchema.describe("Distinct evidence_links of each matching record; detail links names them."),
			missing_direct_links: countSchema.describe("Those direct links whose records this session or bundle does not retain. Zero establishes no transitive closure or analysis coverage."),
			records: z.array(z.strictObject({
				evidence_id: evidenceSchema.shape.evidence_id,
				subject: evidenceSchema.shape.subject,
				provider: evidenceSchema.shape.provider,
				operation: evidenceSchema.shape.operation,
				confidence: evidenceSchema.shape.confidence,
				authority: evidenceSchema.shape.authority,
				analysis_profile_digest: digestSchema.nullable(),
				retention: z.literal("complete-record"),
				limitation_count: countSchema,
				native_dossier: nativeSummarySchema
			}))
		});
		nativeSummary = (evidence) => {
			if (evidence.operation !== "analyze_function") return {
				available: false,
				reason: "different-operation"
			};
			const parsed = nativeMetadataSchema.safeParse(evidence.normalized_result);
			if (!parsed.success) return {
				available: false,
				reason: "not-recorded-or-incompatible"
			};
			const flow = nativeValueFlowMetadataSchema.safeParse(parsed.data.native_value_flow);
			return {
				available: true,
				procedure_address: parsed.data.procedure.address,
				procedure_name: parsed.data.procedure.name ?? null,
				value_flow: parsed.data.native_value_flow == null ? { status: "not-recorded" } : !flow.success ? {
					status: "unknown",
					reason: "Value-flow metadata has an incompatible representation."
				} : flow.data.available ? {
					status: "observed",
					truncated: flow.data.truncated,
					omitted_operations_lower_bound: flow.data.omitted_operations_lower_bound,
					known_omitted_inputs: flow.data.known_omitted_inputs,
					known_omitted_edges: flow.data.known_omitted_edges
				} : {
					status: "unavailable",
					reason: flow.data.reason
				}
			};
		};
		selectedFilters = (filters) => {
			const selected = {};
			for (const [field, value] of Object.entries(filters)) if (value !== undefined) selected[field] = value;
			return selected;
		};
		directLinksOf = ({ evidence_links: links }) => uniqueSorted(links);
		summarizeEvidenceBundle = (bundle, filters = {}) => {
			const records = [];
			const retained = new Set(bundle.records.map(({ evidence_id: id }) => id));
			let directLinks = 0;
			let missingDirectLinks = 0;
			for (const { evidence, native } of matchingEvidenceRecords(bundle, filters)) {
				for (const link of directLinksOf(evidence)) {
					directLinks += 1;
					if (!retained.has(link)) missingDirectLinks += 1;
				}
				records.push({
					evidence_id: evidence.evidence_id,
					subject: evidence.subject,
					provider: evidence.provider,
					operation: evidence.operation,
					confidence: evidence.confidence,
					authority: evidence.authority,
					analysis_profile_digest: evidence.analysis_profile?.digest ?? null,
					retention: "complete-record",
					limitation_count: evidence.limitations.length,
					native_dossier: native
				});
			}
			return {
				kind: "evidence-bundle-summary",
				filters: selectedFilters(filters),
				total_retained_records: bundle.records.length,
				matching_records: records.length,
				unknown_revisions: bundle.unknowns.length,
				direct_links: directLinks,
				missing_direct_links: missingDirectLinks,
				records
			};
		};
		EVIDENCE_RECORD_SELECTION_LIMIT = 8;
		EVIDENCE_RECORD_SELECTION_LIMITATIONS = ["Selected records are retained historical observations; they do not establish current live provider or database state.", "A record selection is not an Evidence bundle: it omits manifests and residual unknowns and cannot be imported. Use export_evidence_bundle for a portable bundle."];
		evidenceRecordSelectionSchema = z.strictObject({
			kind: z.literal("evidence-record-selection"),
			filters: z.record(z.string(), z.string()),
			total_retained_records: countSchema,
			matching_records: countSchema,
			offset: countSchema,
			limit: z.int().positive(),
			next_offset: countSchema.nullable(),
			records: z.array(evidenceSchema),
			missing_evidence_links: z.array(prefixedDigestSchema("ev")).describe("Direct evidence_links of the returned records that this session or bundle does not retain; links are not traversed."),
			limitations: z.array(z.string())
		});
		selectEvidenceRecords = (bundle, filters = {}, page = {}) => {
			const offset = page.offset ?? 0;
			const limit = page.limit ?? 8;
			const records = [];
			let matching = 0;
			for (const { evidence } of matchingEvidenceRecords(bundle, filters)) {
				if (matching >= offset && records.length < limit) records.push(evidence);
				matching += 1;
			}
			const retained = new Set(bundle.records.map(({ evidence_id: id }) => id));
			const missing = records.flatMap(({ evidence_links: links }) => links.filter((link) => !retained.has(link)));
			const end = offset + records.length;
			return {
				kind: "evidence-record-selection",
				filters: selectedFilters(filters),
				total_retained_records: bundle.records.length,
				matching_records: matching,
				offset,
				limit,
				next_offset: end < matching ? end : null,
				records,
				missing_evidence_links: uniqueSorted(missing),
				limitations: [...EVIDENCE_RECORD_SELECTION_LIMITATIONS]
			};
		};
		evidenceLinkTraversalSchema = z.enum(["direct", "retained-closure"]);
		evidenceLinkStatusFilterSchema = z.enum([
			"missing",
			"retained",
			"all"
		]);
		EVIDENCE_LINK_INSPECTION_LIMIT = 64;
		EVIDENCE_LINK_INSPECTION_LIMITATIONS = ["Link status is membership in this session or bundle: missing means absent here, not nonexistent, and neither status describes analysis coverage or a record's meaning."];
		evidenceLinkInspectionSchema = z.strictObject({
			kind: z.literal("evidence-link-inspection"),
			filters: z.record(z.string(), z.string()),
			traversal: evidenceLinkTraversalSchema,
			link_status: evidenceLinkStatusFilterSchema,
			total_retained_records: countSchema,
			matching_records: countSchema,
			examined_records: countSchema.describe("Retained records whose evidence_links were read: the matching records, plus those reached through retained links when traversal is retained-closure."),
			links: z.strictObject({
				total: countSchema,
				retained: countSchema,
				missing: countSchema
			}).describe("Every link read from the examined records, before link_status."),
			retained_closure: z.enum(["complete", "incomplete"]).nullable().describe("With retained-closure traversal, incomplete means a link could not be followed, so what lies beyond it remains unknown. Null for direct traversal or an empty selection, which make no closure claim."),
			offset: countSchema,
			limit: z.int().positive(),
			matching_links: countSchema,
			next_offset: countSchema.nullable(),
			rows: z.array(z.strictObject({
				evidence_id: prefixedDigestSchema("ev"),
				linked_evidence_id: prefixedDigestSchema("ev"),
				status: z.enum(["retained", "missing"])
			})),
			limitations: z.array(z.string())
		});
		inspectEvidenceLinks = (bundle, filters = {}, options = {}) => {
			const traversal = options.traversal ?? "direct";
			const linkStatus = options.linkStatus ?? "missing";
			const offset = options.offset ?? 0;
			const limit = options.limit ?? 64;
			const retained = new Map(bundle.records.map((record) => [record.evidence_id, record]));
			const examined = new Set();
			const pending = [];
			for (const { evidence } of matchingEvidenceRecords(bundle, filters)) pending.push(evidence);
			const matching = pending.length;
			while (pending.length > 0) {
				const record = pending.pop();
				if (record === undefined || examined.has(record.evidence_id)) continue;
				examined.add(record.evidence_id);
				if (traversal === "direct") continue;
				for (const link of record.evidence_links) {
					const linked = retained.get(link);
					if (linked !== undefined && !examined.has(link)) pending.push(linked);
				}
			}
			const rows = [];
			const counts = {
				total: 0,
				retained: 0,
				missing: 0
			};
			let matchingLinks = 0;
			for (const evidence of bundle.records) {
				const id = evidence.evidence_id;
				if (!examined.has(id)) continue;
				for (const link of directLinksOf(evidence)) {
					const status = retained.has(link) ? "retained" : "missing";
					counts.total += 1;
					counts[status] += 1;
					if (linkStatus !== "all" && linkStatus !== status) continue;
					if (matchingLinks >= offset && rows.length < limit) rows.push({
						evidence_id: id,
						linked_evidence_id: link,
						status
					});
					matchingLinks += 1;
				}
			}
			const end = offset + rows.length;
			return {
				kind: "evidence-link-inspection",
				filters: selectedFilters(filters),
				traversal,
				link_status: linkStatus,
				total_retained_records: bundle.records.length,
				matching_records: matching,
				examined_records: examined.size,
				links: counts,
				retained_closure: traversal === "direct" || examined.size === 0 ? null : counts.missing === 0 ? "complete" : "incomplete",
				offset,
				limit,
				matching_links: matchingLinks,
				next_offset: end < matchingLinks ? end : null,
				rows,
				limitations: [...EVIDENCE_LINK_INSPECTION_LIMITATIONS]
			};
		};
	})))();
}

//#endregion
export { bundleComparisonInputSchema, bundleComparisonResultSchema, compareBundles, evidenceBundleSummarySchema, evidenceLinkInspectionSchema, evidenceLinkStatusFilterSchema, evidenceLinkTraversalSchema, evidenceRecordFiltersSchema, evidenceRecordSelectionSchema, init_bundleComparison, init_evidenceRecordSummary, inspectEvidenceLinks, selectEvidenceRecords, summarizeEvidenceBundle };