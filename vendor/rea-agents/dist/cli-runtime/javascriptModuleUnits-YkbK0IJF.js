import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { canBorrowParsedJsonSnapshot, freezeOwnedJsonSnapshotSteps, freezeOwnedJsonTreeSnapshot, init_immutableJson, init_isRecord, init_javascriptAnalysisResourceControls, init_localPath, isRecord, javaScriptAnalysisResourceControlsSchema, localPathStringSchema } from "./jsonSerialization-DAF9DVXC.js";
import { compareUnicodeCodePoints, init_unicodeCodePointOrder } from "./unicodeCodePointOrder-_ER9VDIi.js";
import { digestCanonicalValue, init_canonicalDigest } from "./zipEndOfCentralDirectory-Ccc2Xx4F.js";
import { canonicalJson, canonicalJsonDigestSteps, init_canonicalJsonDigestSteps, init_comparisonSemantics } from "./nativeValueFlow-13oOEkkJ.js";
import { init_canonicalOrdering, uniqueSorted } from "./canonicalOrdering-C7Yzy62j.js";
import { digestSchema, init_digests, prefixedDigestSchema } from "./targetIdentity-rKLLVwEj.js";
import { init_artifactGraph, integrityContradictionSchema } from "./artifactGraph-D-c8dgaG.js";
import { JAVASCRIPT_SEMANTIC_RELATION_FAMILIES, JAVASCRIPT_SEMANTIC_RELATION_FAMILY, applicationGraphEvidenceLocationSchema, applicationGraphEvidenceSchema, init_javascriptApplicationEvidenceSchemas, init_javascriptSemanticGraphSchemas, isCompatibleApplicationGraphEvidenceLocation, isValidApplicationGraphEvidenceContext, javaScriptSemanticEvidenceContextSchema, javaScriptSemanticFingerprintInputSchema, javaScriptSemanticGraphInputSchema, javaScriptSemanticGraphRecordSchema, javaScriptSemanticNodeInputSchema, javaScriptSemanticNodeSchema, javaScriptSemanticRelationInputSchema, javaScriptSemanticUnknownInputSchema, qualifyJavaScriptLoaderEvidence } from "./javascriptSemanticGraphSchemas-Cmwji5L9.js";
import { arrayContainerSchema, init_javascriptApplicationGraph, init_javascriptRouteInventory, init_javascriptSourceSelection, init_zodCollectionSteps, isValidatedImmutableJavaScriptApplicationGraph, javaScriptRouteInventorySchema, javaScriptSourcePathsSchema, javaScriptSourceSelectionSchema, javascriptApplicationGraphSchema, parseElementSteps } from "./javascriptSourceSelection-CZ4gLy-b.js";
import { z } from "zod";

//#region dist/domain/javascript/javascriptSemanticGraph.js
function* checkCoverageSteps(graph, context) {
	const omittedUnknowns = graph.coverage.omitted_unknown_occurrences ?? [];
	sortedUniqueIssue(omittedUnknowns.map(({ family, reason }) => `${family}:${reason}`), ["coverage", "omitted_unknown_occurrences"], "Unknown omission coverage", context);
	if (omittedUnknowns.length > 0 && (!graph.coverage.truncated || graph.coverage.status !== "partial")) context.addIssue({
		code: "custom",
		path: ["coverage"],
		message: "Omitted unknown occurrences require truncated partial coverage"
	});
	const families = graph.coverage.families.map(({ family }) => family);
	if (canonicalJson(families, "JavaScript semantic graph") !== canonicalJson(JAVASCRIPT_SEMANTIC_RELATION_FAMILIES, "JavaScript semantic graph")) context.addIssue({
		code: "custom",
		path: ["coverage", "families"],
		message: "Coverage must name every semantic relation family once in canonical order"
	});
	if (graph.coverage.status === "complete" && (graph.coverage.truncated || graph.coverage.omitted_nodes !== 0 || graph.coverage.omitted_relations !== 0 || graph.coverage.families.some(({ status }) => status !== "complete"))) context.addIssue({
		code: "custom",
		path: ["coverage"],
		message: "Complete graph coverage cannot omit or truncate semantic facts"
	});
	if (graph.coverage.truncated && graph.coverage.limits.length === 0) context.addIssue({
		code: "custom",
		path: ["coverage", "limits"],
		message: "Truncated graph coverage must identify an effective limit"
	});
	if (graph.coverage.truncated && graph.coverage.status !== "partial") context.addIssue({
		code: "custom",
		path: ["coverage", "status"],
		message: "Truncated semantic graph coverage must be partial"
	});
	if (graph.coverage.truncated && graph.coverage.omitted_nodes === 0 && graph.coverage.omitted_relations === 0 && omittedUnknowns.length === 0) context.addIssue({
		code: "custom",
		path: ["coverage"],
		message: "Truncated semantic graph coverage must acknowledge omitted facts"
	});
	const relationsByFamily = new Map(JAVASCRIPT_SEMANTIC_RELATION_FAMILIES.map((family) => [family, 0]));
	for (const [index, relation] of graph.relations.entries()) {
		if (index % 256 === 0) yield;
		const family = JAVASCRIPT_SEMANTIC_RELATION_FAMILY[relation.relation];
		relationsByFamily.set(family, (relationsByFamily.get(family) ?? 0) + 1);
	}
	const unknownsById = new Map();
	const unknownFamilies = new Set();
	for (const [index, unknown] of graph.unknowns.entries()) {
		if (index % 256 === 0) yield;
		unknownsById.set(unknown.unknown_id, unknown);
		unknownFamilies.add(unknown.family);
	}
	for (const [index, family] of graph.coverage.families.entries()) {
		if (family.retained_relations !== relationsByFamily.get(family.family)) context.addIssue({
			code: "custom",
			path: [
				"coverage",
				"families",
				index,
				"retained_relations"
			],
			message: "Family retained relation count does not match graph content"
		});
		if (family.unknown_ids.some((identifier) => unknownsById.get(identifier)?.family !== family.family)) context.addIssue({
			code: "custom",
			path: [
				"coverage",
				"families",
				index,
				"unknown_ids"
			],
			message: "Family coverage references an unknown from another family"
		});
		if (family.status === "complete" && (family.omitted_relations !== 0 || family.unknown_ids.length > 0 || unknownFamilies.has(family.family) || omittedUnknowns.some((omitted) => omitted.family === family.family))) context.addIssue({
			code: "custom",
			path: [
				"coverage",
				"families",
				index
			],
			message: "Complete family coverage cannot omit or retain unknown facts"
		});
	}
}
function* checkEvidenceContextReferencesSteps(graph, context) {
	const contexts = new Map();
	for (const value of graph.evidence_contexts) {
		const { context_id: _contextId, ...evidenceValue } = value;
		contexts.set(value.context_id, {
			value,
			validContext: isValidApplicationGraphEvidenceContext(evidenceValue)
		});
	}
	const referenced = new Set();
	const validateReferences = function* (entities, entityKind) {
		for (const [index, { evidence }] of entities.entries()) {
			if (index % 256 === 0) yield;
			referenced.add(evidence.context_id);
			const entry = contexts.get(evidence.context_id);
			if (entry === undefined) {
				context.addIssue({
					code: "custom",
					path: [
						entityKind,
						index,
						"evidence",
						"context_id"
					],
					message: "Evidence reference names an absent context"
				});
				continue;
			}
			if (!entry.validContext || !isCompatibleApplicationGraphEvidenceLocation(entry.value, evidence.location)) context.addIssue({
				code: "custom",
				path: [
					entityKind,
					index,
					"evidence"
				],
				message: "Evidence context is incompatible with its fact location"
			});
		}
	};
	yield* validateReferences(graph.nodes, "nodes");
	yield* validateReferences(graph.relations, "relations");
	yield* validateReferences(graph.unknowns, "unknowns");
	yield* validateReferences(graph.fingerprints, "fingerprints");
	for (const [index, evidenceContext] of graph.evidence_contexts.entries()) {
		if (index % 256 === 0) yield;
		const { context_id: identifier, ...value } = evidenceContext;
		if (!validatedSemanticEvidenceContexts.has(evidenceContext) && identifier !== evidenceContextId(value)) context.addIssue({
			code: "custom",
			path: [
				"evidence_contexts",
				index,
				"context_id"
			],
			message: "Evidence context identifier is stale"
		});
		if (!referenced.has(identifier)) context.addIssue({
			code: "custom",
			path: ["evidence_contexts", index],
			message: "Evidence context is not referenced by a graph fact"
		});
	}
}
function* checkNodesSteps(graph, nodes, context) {
	for (const [index, node] of graph.nodes.entries()) {
		if (index % 256 === 0) yield;
		if (!validatedSemanticNodes.has(node) && node.node_id !== javaScriptSemanticNodeId(node)) context.addIssue({
			code: "custom",
			path: [
				"nodes",
				index,
				"node_id"
			],
			message: "Node identifier is stale"
		});
		if (node.function_node_id !== null && nodes.get(node.function_node_id)?.kind !== "function") context.addIssue({
			code: "custom",
			path: [
				"nodes",
				index,
				"function_node_id"
			],
			message: "Function owner must name a function node"
		});
	}
}
function* checkRootsSteps(graph, nodes, context) {
	for (const [index, root] of graph.root_node_ids.entries()) {
		if (index % 256 === 0) yield;
		if (!nodes.has(root)) context.addIssue({
			code: "custom",
			path: ["root_node_ids"],
			message: "Root identifier must name a semantic node"
		});
	}
}
function* checkRelationsSteps(graph, nodes, evidenceContexts, context) {
	for (const [index, relation] of graph.relations.entries()) {
		if (index % 256 === 0) yield;
		if (!validatedSemanticRelations.has(relation)) {
			const { relation_id: identifier, ...semantic } = relation;
			if (identifier !== "jsrg_relation_" + digestCanonicalValue(semantic, "JavaScript semantic graph")) context.addIssue({
				code: "custom",
				path: [
					"relations",
					index,
					"relation_id"
				],
				message: "Relation identifier is stale"
			});
		}
		if (!nodes.has(relation.source_node_id) || !nodes.has(relation.target_node_id)) context.addIssue({
			code: "custom",
			path: ["relations", index],
			message: "Relation endpoints must name semantic nodes"
		});
		if (relation.source_node_id === relation.target_node_id) context.addIssue({
			code: "custom",
			path: ["relations", index],
			message: "Semantic relations cannot be self-referential"
		});
		if (relation.resolution === "candidate" && evidenceContexts.get(relation.evidence.context_id)?.state === "observed") context.addIssue({
			code: "custom",
			path: [
				"relations",
				index,
				"evidence",
				"state"
			],
			message: "Candidate relations cannot claim observed resolution"
		});
	}
}
function* checkUnknownsSteps(graph, nodes, evidenceContexts, context) {
	for (const [index, unknown] of graph.unknowns.entries()) {
		if (index % 256 === 0) yield;
		if (!validatedSemanticUnknowns.has(unknown)) {
			const { unknown_id: identifier, ...semantic } = unknown;
			if (identifier !== "jsrg_unknown_" + digestCanonicalValue(semantic, "JavaScript semantic graph")) context.addIssue({
				code: "custom",
				path: [
					"unknowns",
					index,
					"unknown_id"
				],
				message: "Unknown frontier identifier is stale"
			});
		}
		if (unknown.node_id !== null && !nodes.has(unknown.node_id)) context.addIssue({
			code: "custom",
			path: [
				"unknowns",
				index,
				"node_id"
			],
			message: "Unknown frontier node is absent"
		});
		if (unknown.candidate_node_ids.some((nodeId) => !nodes.has(nodeId))) context.addIssue({
			code: "custom",
			path: [
				"unknowns",
				index,
				"candidate_node_ids"
			],
			message: "Unknown frontier candidate node is absent"
		});
		if (unknown.relation_kinds.some((kind) => JAVASCRIPT_SEMANTIC_RELATION_FAMILY[kind] !== unknown.family)) context.addIssue({
			code: "custom",
			path: [
				"unknowns",
				index,
				"relation_kinds"
			],
			message: "Unknown relation kinds must belong to their declared family"
		});
		const evidenceState = evidenceContexts.get(unknown.evidence.context_id)?.state;
		if (evidenceState !== "unknown" && evidenceState !== "unavailable") context.addIssue({
			code: "custom",
			path: [
				"unknowns",
				index,
				"evidence",
				"state"
			],
			message: "Unknown frontiers require unknown or unavailable evidence"
		});
	}
}
function* checkFingerprintsSteps(graph, nodes, context) {
	for (const [index, fingerprint] of graph.fingerprints.entries()) {
		if (index % 256 === 0) yield;
		if (nodes.get(fingerprint.function_node_id)?.kind !== "function") context.addIssue({
			code: "custom",
			path: [
				"fingerprints",
				index,
				"function_node_id"
			],
			message: "Fingerprint must name a function node"
		});
		if (!validatedSemanticFingerprints.has(fingerprint)) {
			if (fingerprint.fingerprint_sha256 !== digestCanonicalValue(fingerprint.components, "JavaScript semantic graph")) context.addIssue({
				code: "custom",
				path: [
					"fingerprints",
					index,
					"fingerprint_sha256"
				],
				message: "Fingerprint component commitment is stale"
			});
			const expectedIdentifier = "jsrg_fingerprint_" + digestCanonicalValue({
				function_node_id: fingerprint.function_node_id,
				algorithm: fingerprint.algorithm,
				fingerprint_sha256: fingerprint.fingerprint_sha256
			}, "JavaScript semantic graph");
			if (fingerprint.fingerprint_id !== expectedIdentifier) context.addIssue({
				code: "custom",
				path: [
					"fingerprints",
					index,
					"fingerprint_id"
				],
				message: "Fingerprint identifier is stale"
			});
		}
		if (fingerprint.status !== "complete" && fingerprint.limitations.length === 0) context.addIssue({
			code: "custom",
			path: [
				"fingerprints",
				index,
				"limitations"
			],
			message: "Incomplete fingerprints require a limitation"
		});
	}
}
function* checkGraphContentSteps(graph, context) {
	checkCanonicalOrder(graph, context);
	yield* checkEvidenceContextReferencesSteps(graph, context);
	const evidenceContexts = new Map(graph.evidence_contexts.map((evidenceContext) => [evidenceContext.context_id, evidenceContext]));
	const nodes = new Map();
	for (const [index, node] of graph.nodes.entries()) {
		if (index % 256 === 0) yield;
		nodes.set(node.node_id, node);
	}
	yield* checkNodesSteps(graph, nodes, context);
	yield* checkRootsSteps(graph, nodes, context);
	yield* checkRelationsSteps(graph, nodes, evidenceContexts, context);
	yield* checkUnknownsSteps(graph, nodes, evidenceContexts, context);
	checkUnknownReferences(graph, context);
	yield* checkFingerprintsSteps(graph, nodes, context);
	yield* checkCoverageSteps(graph, context);
	if (graph.coverage.status !== "complete" && graph.limitations.length === 0) context.addIssue({
		code: "custom",
		path: ["limitations"],
		message: "Non-complete graph coverage requires a limitation"
	});
}
function* parseAndSealSemanticGraphSteps(container) {
	const issues = [];
	const parsed = {
		...container,
		evidence_contexts: yield* parseElementSteps(semanticGraphShape.evidence_contexts.element, container.evidence_contexts, ["evidence_contexts"], issues, isValidatedSemanticEvidenceContext),
		nodes: yield* parseElementSteps(semanticGraphShape.nodes.element, container.nodes, ["nodes"], issues, isValidatedSemanticNode),
		relations: yield* parseElementSteps(semanticGraphShape.relations.element, container.relations, ["relations"], issues, isValidatedSemanticRelation),
		fingerprints: yield* parseElementSteps(semanticGraphShape.fingerprints.element, container.fingerprints, ["fingerprints"], issues, isValidatedSemanticFingerprint),
		unknowns: yield* parseElementSteps(semanticGraphShape.unknowns.element, container.unknowns, ["unknowns"], issues, isValidatedSemanticUnknown)
	};
	if (issues.length > 0) throw new z.ZodError(issues);
	return yield* validateAndSealSemanticGraphSteps(normalizeGraphInput(parsed));
}
function* validateAndSealSemanticGraphSteps(semantic) {
	const graph = {
		...semantic,
		graph_id: `jsrg_${yield* canonicalJsonDigestSteps(semantic)}`
	};
	const issues = [];
	yield* checkGraphContentSteps(graph, { addIssue: (issue) => {
		issues.push(issue);
	} });
	if (issues.length > 0) throw new z.ZodError(issues);
	yield* freezeOwnedJsonSnapshotSteps(graph);
	validatedImmutableSemanticGraphs.add(graph);
	return graph;
}
var normalizeEvidence, evidenceContextId, hasReusableFrozenContext, EVIDENCE_INPUT_KEYS, hasExactEvidenceKeys, tryInternValidatedInputSymbol, internValidatedEvidenceSymbol, JavaScriptSemanticEvidenceContextRegistry, validatedSemanticEvidenceContexts, validatedSemanticNodes, validatedSemanticRelations, validatedSemanticUnknowns, validatedSemanticFingerprints, isValidatedSemanticNode, isValidatedSemanticRelation, isValidatedSemanticUnknown, isValidatedSemanticFingerprint, isValidatedSemanticEvidenceContext, sealSemanticEvidenceContext, freezeEvidenceLocation, freezeEvidenceReference, freezeProperties, sealSemanticNode, sealSemanticRelation, sealSemanticUnknown, sealSemanticFingerprint, nodeInputWithoutEvidenceSchema, relationInputWithoutEvidenceSchema, unknownInputWithoutEvidenceSchema, fingerprintInputWithoutEvidenceSchema, applicationNodeIdsSchema, javaScriptSemanticNodeId, buildSemanticGraphNode, createJavaScriptSemanticGraphNode, createOwnedJavaScriptSemanticGraphNode, withJavaScriptSemanticNodeApplicationIds, buildSemanticGraphRelation, createJavaScriptSemanticGraphRelation, createOwnedJavaScriptSemanticGraphRelation, buildSemanticGraphUnknown, createJavaScriptSemanticGraphUnknown, createOwnedJavaScriptSemanticGraphUnknown, buildSemanticFingerprint, createJavaScriptSemanticFingerprint, createOwnedJavaScriptSemanticFingerprint, sortedUniqueIssue, checkCanonicalOrder, checkUnknownReferences, checkGraphContent, checkGraph, javaScriptSemanticGraphSchema, normalizeGraphInput, parseElementsSync, createJavaScriptSemanticGraph, validatedImmutableSemanticGraphs, semanticGraphShape, semanticGraphContainerSchema, sealTransferredJavaScriptSemanticGraphSteps, isValidatedImmutableJavaScriptSemanticGraph;
function init_javascriptSemanticGraph() {
	return (init_javascriptSemanticGraph = __esmMin((() => {
		init_comparisonSemantics();
		init_canonicalDigest();
		init_canonicalOrdering();
		init_unicodeCodePointOrder();
		init_canonicalJsonDigestSteps();
		init_immutableJson();
		init_zodCollectionSteps();
		init_javascriptApplicationEvidenceSchemas();
		init_javascriptSemanticGraphSchemas();
		init_digests();
		normalizeEvidence = (evidence) => ({
			...evidence,
			coverage: evidence.coverage.limits.length <= 1 ? {
				...evidence.coverage,
				limits: [...evidence.coverage.limits]
			} : {
				...evidence.coverage,
				limits: [...evidence.coverage.limits].sort((left, right) => compareUnicodeCodePoints(canonicalJson(left, "JavaScript semantic graph"), canonicalJson(right, "JavaScript semantic graph")))
			},
			limitations: evidence.limitations.length <= 1 ? [...evidence.limitations] : uniqueSorted(evidence.limitations),
			evidence_ids: evidence.evidence_ids.length <= 1 ? [...evidence.evidence_ids] : uniqueSorted(evidence.evidence_ids)
		});
		evidenceContextId = (context) => `jsrg_evidence_${digestCanonicalValue(context, "JavaScript semantic evidence context")}`;
		hasReusableFrozenContext = (evidence) => Object.isFrozen(evidence.artifact) && Object.isFrozen(evidence.extractor) && Object.isFrozen(evidence.coverage) && Object.isFrozen(evidence.coverage.limits) && evidence.coverage.limits.length === 0 && Object.isFrozen(evidence.limitations) && evidence.limitations.every((item) => typeof item === "string") && Object.isFrozen(evidence.evidence_ids) && evidence.evidence_ids.length === 0;
		EVIDENCE_INPUT_KEYS = [
			"authority",
			"state",
			"confidence",
			"artifact",
			"location",
			"extractor",
			"coverage",
			"limitations",
			"evidence_ids"
		];
		hasExactEvidenceKeys = (value) => isRecord(value) && Object.keys(value).length === EVIDENCE_INPUT_KEYS.length && EVIDENCE_INPUT_KEYS.every((key) => Object.hasOwn(value, key));
		tryInternValidatedInputSymbol = Symbol("tryInternValidatedInput");
		internValidatedEvidenceSymbol = Symbol("internValidatedEvidence");
		JavaScriptSemanticEvidenceContextRegistry = class {
			#contexts = new Map();
			#idsByCanonicalContext = new Map();
			#frozenEntries = [];
			sourceLoaderCondition;
			/** Fast-path interning when shared context objects match an already-validated frozen entry. */
			[tryInternValidatedInputSymbol](rawEvidence) {
				if (this.sourceLoaderCondition !== undefined || !hasExactEvidenceKeys(rawEvidence)) return undefined;
				const match = this.#frozenEntries.find((entry) => entry.authority === rawEvidence.authority && entry.state === rawEvidence.state && entry.confidence === rawEvidence.confidence && entry.artifact === rawEvidence.artifact && entry.extractor === rawEvidence.extractor && entry.coverage === rawEvidence.coverage && entry.limitations === rawEvidence.limitations && entry.evidenceIds === rawEvidence.evidence_ids);
				if (match === undefined) return undefined;
				const parsedLocation = applicationGraphEvidenceLocationSchema.safeParse(rawEvidence.location);
				if (!parsedLocation.success || !isCompatibleApplicationGraphEvidenceLocation(match, parsedLocation.data)) return undefined;
				return {
					context_id: match.contextId,
					location: parsedLocation.data
				};
			}
			/** Validate and intern non-location provenance at fact construction. */
			intern(evidence) {
				const fast = this[tryInternValidatedInputSymbol](evidence);
				if (fast !== undefined) return fast;
				const parsed = applicationGraphEvidenceSchema.parse(evidence);
				return this[internValidatedEvidenceSymbol](parsed, evidence);
			}
			/** Intern provenance that has already passed applicationGraphEvidenceSchema. */
			[internValidatedEvidenceSymbol](evidence, originalInput) {
				const fast = this[tryInternValidatedInputSymbol](originalInput ?? evidence);
				if (fast !== undefined) return fast;
				const condition = this.sourceLoaderCondition;
				const locationValue = evidence.location.available ? evidence.location.value : undefined;
				const normalized = normalizeEvidence(condition !== undefined && evidence.artifact.available && evidence.artifact.sha256 === condition.sha256 && (locationValue?.kind === "source-range" ? locationValue.source : locationValue?.kind === "artifact-path" ? locationValue.path : undefined) === condition.path ? qualifyJavaScriptLoaderEvidence(evidence, condition.limitation) : evidence);
				const { location, ...context } = normalized;
				const canonicalContext = canonicalJson(context, "JavaScript semantic graph");
				let contextId = this.#idsByCanonicalContext.get(canonicalContext);
				if (contextId === undefined) {
					contextId = evidenceContextId(context);
					if (this.#contexts.has(contextId)) throw new TypeError("JavaScript semantic evidence context digest collision");
					const parsedContext = javaScriptSemanticEvidenceContextSchema.parse({
						...context,
						context_id: contextId
					});
					this.#contexts.set(contextId, sealSemanticEvidenceContext(parsedContext));
					this.#idsByCanonicalContext.set(canonicalContext, contextId);
				}
				const candidate = condition === undefined ? originalInput ?? evidence : normalized;
				if (this.#frozenEntries.length < 16 && hasReusableFrozenContext(candidate) && !this.#frozenEntries.some((entry) => entry.authority === candidate.authority && entry.state === candidate.state && entry.confidence === candidate.confidence && entry.artifact === candidate.artifact && entry.extractor === candidate.extractor && entry.coverage === candidate.coverage && entry.limitations === candidate.limitations && entry.evidenceIds === candidate.evidence_ids)) {
					this.#frozenEntries.push({
						authority: candidate.authority,
						state: candidate.state,
						confidence: candidate.confidence,
						artifact: candidate.artifact,
						extractor: candidate.extractor,
						coverage: candidate.coverage,
						limitations: candidate.limitations,
						evidenceIds: candidate.evidence_ids,
						contextId
					});
				}
				return {
					context_id: contextId,
					location
				};
			}
			/** Resolve one already interned fact reference for derived evidence. */
			resolve(reference) {
				const context = this.#contexts.get(reference.context_id);
				if (context === undefined) throw new TypeError("Semantic evidence reference names an absent context");
				const { context_id: _contextId, ...evidenceContext } = context;
				return {
					...evidenceContext,
					location: reference.location
				};
			}
			/** Return caller-owned copies of this registry's context table. */
			get contexts() {
				return [...this.#contexts.values()].sort((left, right) => compareUnicodeCodePoints(left.context_id, right.context_id)).map((context) => structuredClone(context));
			}
			/** Return sealed contexts for an exclusively owned graph builder. */
			get ownedContexts() {
				return [...this.#contexts.values()].sort((left, right) => compareUnicodeCodePoints(left.context_id, right.context_id));
			}
			/** Release interned contexts after the owning graph is finalized. */
			clear() {
				this.#contexts.clear();
				this.#idsByCanonicalContext.clear();
				this.#frozenEntries.length = 0;
			}
			/** Validate and intern provenance decoded in this realm from an analysis worker. */
			adopt(input) {
				const context = validatedSemanticEvidenceContexts.has(input) ? input : freezeOwnedJsonTreeSnapshot(javaScriptSemanticEvidenceContextSchema.parse(input));
				if (!validatedSemanticEvidenceContexts.has(context)) {
					const { context_id: identifier, ...value } = context;
					if (identifier !== evidenceContextId(value)) throw new TypeError("Transferred semantic evidence context identifier is stale");
					validatedSemanticEvidenceContexts.add(context);
				}
				const { context_id: identifier, ...value } = context;
				const canonical = canonicalJson(value, "JavaScript semantic evidence context");
				const existing = this.#contexts.get(identifier);
				if (existing !== undefined) {
					const { context_id: _existingIdentifier, ...existingValue } = existing;
					if (canonical !== canonicalJson(existingValue, "JavaScript semantic evidence context")) throw new TypeError("Transferred semantic evidence context digest collision");
				}
				this.#contexts.set(identifier, context);
				this.#idsByCanonicalContext.set(canonical, identifier);
			}
		};
		validatedSemanticEvidenceContexts = new WeakSet();
		validatedSemanticNodes = new WeakSet();
		validatedSemanticRelations = new WeakSet();
		validatedSemanticUnknowns = new WeakSet();
		validatedSemanticFingerprints = new WeakSet();
		isValidatedSemanticNode = (value) => typeof value === "object" && value !== null && validatedSemanticNodes.has(value);
		isValidatedSemanticRelation = (value) => typeof value === "object" && value !== null && validatedSemanticRelations.has(value);
		isValidatedSemanticUnknown = (value) => typeof value === "object" && value !== null && validatedSemanticUnknowns.has(value);
		isValidatedSemanticFingerprint = (value) => typeof value === "object" && value !== null && validatedSemanticFingerprints.has(value);
		isValidatedSemanticEvidenceContext = (value) => typeof value === "object" && value !== null && validatedSemanticEvidenceContexts.has(value);
		sealSemanticEvidenceContext = (context) => {
			const sealed = freezeOwnedJsonTreeSnapshot(context);
			validatedSemanticEvidenceContexts.add(sealed);
			return sealed;
		};
		freezeEvidenceLocation = (location) => {
			if (location.available) {
				if (location.value.kind === "source-range") {
					Object.freeze(location.value.start);
					Object.freeze(location.value.end);
				}
				Object.freeze(location.value);
			}
			return Object.freeze(location);
		};
		freezeEvidenceReference = (evidence) => {
			freezeEvidenceLocation(evidence.location);
			return Object.freeze(evidence);
		};
		freezeProperties = (properties) => {
			const keys = Object.keys(properties);
			if (keys.length === 0) return Object.freeze(properties);
			if (keys.every((key) => {
				const item = properties[key];
				return item === null || typeof item !== "object";
			})) return Object.freeze(properties);
			return freezeOwnedJsonTreeSnapshot(properties);
		};
		sealSemanticNode = (node) => {
			if (node.identity.source_range !== null) {
				Object.freeze(node.identity.source_range.start);
				Object.freeze(node.identity.source_range.end);
				Object.freeze(node.identity.source_range);
			}
			Object.freeze(node.identity);
			Object.freeze(node.application_node_ids);
			freezeProperties(node.properties);
			freezeEvidenceReference(node.evidence);
			const sealed = Object.freeze(node);
			validatedSemanticNodes.add(sealed);
			return sealed;
		};
		sealSemanticRelation = (relation) => {
			freezeProperties(relation.properties);
			freezeEvidenceReference(relation.evidence);
			const sealed = Object.freeze(relation);
			validatedSemanticRelations.add(sealed);
			return sealed;
		};
		sealSemanticUnknown = (unknown) => {
			Object.freeze(unknown.relation_kinds);
			Object.freeze(unknown.candidate_node_ids);
			freezeEvidenceReference(unknown.evidence);
			const sealed = Object.freeze(unknown);
			validatedSemanticUnknowns.add(sealed);
			return sealed;
		};
		sealSemanticFingerprint = (fingerprint) => {
			Object.freeze(fingerprint.components.effects);
			Object.freeze(fingerprint.components);
			Object.freeze(fingerprint.limitations);
			freezeEvidenceReference(fingerprint.evidence);
			const sealed = Object.freeze(fingerprint);
			validatedSemanticFingerprints.add(sealed);
			return sealed;
		};
		nodeInputWithoutEvidenceSchema = javaScriptSemanticNodeInputSchema.omit({ evidence: true });
		relationInputWithoutEvidenceSchema = javaScriptSemanticRelationInputSchema.omit({ evidence: true });
		unknownInputWithoutEvidenceSchema = javaScriptSemanticUnknownInputSchema.omit({ evidence: true });
		fingerprintInputWithoutEvidenceSchema = javaScriptSemanticFingerprintInputSchema.omit({ evidence: true });
		applicationNodeIdsSchema = z.array(prefixedDigestSchema("jag_node"));
		javaScriptSemanticNodeId = (node) => `jsrg_node_${digestCanonicalValue({
			kind: node.kind,
			identity: node.identity
		}, "JavaScript semantic graph")}`;
		buildSemanticGraphNode = (input, evidenceContexts) => {
			if (isRecord(input) && Object.hasOwn(input, "evidence")) {
				const fastEvidence = evidenceContexts[tryInternValidatedInputSymbol](input.evidence);
				if (fastEvidence !== undefined) {
					const { evidence: _evidence, ...rest } = input;
					const parsedRest = nodeInputWithoutEvidenceSchema.safeParse(rest);
					if (parsedRest.success) {
						const semantic = {
							...parsedRest.data,
							application_node_ids: parsedRest.data.application_node_ids.length <= 1 ? parsedRest.data.application_node_ids : uniqueSorted(parsedRest.data.application_node_ids),
							evidence: fastEvidence
						};
						return {
							...semantic,
							node_id: javaScriptSemanticNodeId(semantic)
						};
					}
				}
			}
			const rawEvidence = isRecord(input) ? input.evidence : undefined;
			const parsed = javaScriptSemanticNodeInputSchema.parse(input);
			const semantic = {
				...parsed,
				application_node_ids: uniqueSorted(parsed.application_node_ids),
				evidence: evidenceContexts[internValidatedEvidenceSymbol](parsed.evidence, rawEvidence)
			};
			return {
				...semantic,
				node_id: javaScriptSemanticNodeId(semantic)
			};
		};
		createJavaScriptSemanticGraphNode = (input, evidenceContexts) => buildSemanticGraphNode(input, evidenceContexts);
		createOwnedJavaScriptSemanticGraphNode = (input, evidenceContexts) => sealSemanticNode(buildSemanticGraphNode(input, evidenceContexts));
		withJavaScriptSemanticNodeApplicationIds = (node, applicationNodeIds) => {
			const normalized = applicationNodeIds.length === 0 ? [] : uniqueSorted(applicationNodeIdsSchema.parse(applicationNodeIds));
			if (validatedSemanticNodes.has(node) && normalized.length === node.application_node_ids.length && normalized.every((id, index) => id === node.application_node_ids[index])) return node;
			if (!validatedSemanticNodes.has(node)) {
				const parsed = javaScriptSemanticNodeSchema.parse({
					...node,
					application_node_ids: normalized
				});
				if (parsed.node_id !== javaScriptSemanticNodeId(parsed)) throw new z.ZodError([{
					code: "custom",
					path: ["node_id"],
					message: "Node identifier is stale"
				}]);
				return sealSemanticNode(parsed);
			}
			return sealSemanticNode({
				...node,
				application_node_ids: normalized
			});
		};
		buildSemanticGraphRelation = (input, evidenceContexts) => {
			if (isRecord(input) && Object.hasOwn(input, "evidence")) {
				const fastEvidence = evidenceContexts[tryInternValidatedInputSymbol](input.evidence);
				if (fastEvidence !== undefined) {
					const { evidence: _evidence, ...rest } = input;
					const parsedRest = relationInputWithoutEvidenceSchema.safeParse(rest);
					if (parsedRest.success) {
						const semantic = {
							...parsedRest.data,
							evidence: fastEvidence
						};
						return {
							...semantic,
							relation_id: `jsrg_relation_${digestCanonicalValue(semantic, "JavaScript semantic graph")}`
						};
					}
				}
			}
			const rawEvidence = isRecord(input) ? input.evidence : undefined;
			const parsed = javaScriptSemanticRelationInputSchema.parse(input);
			const semantic = {
				...parsed,
				evidence: evidenceContexts[internValidatedEvidenceSymbol](parsed.evidence, rawEvidence)
			};
			return {
				...semantic,
				relation_id: `jsrg_relation_${digestCanonicalValue(semantic, "JavaScript semantic graph")}`
			};
		};
		createJavaScriptSemanticGraphRelation = (input, evidenceContexts) => buildSemanticGraphRelation(input, evidenceContexts);
		createOwnedJavaScriptSemanticGraphRelation = (input, evidenceContexts) => sealSemanticRelation(buildSemanticGraphRelation(input, evidenceContexts));
		buildSemanticGraphUnknown = (input, evidenceContexts) => {
			if (isRecord(input) && Object.hasOwn(input, "evidence")) {
				const fastEvidence = evidenceContexts[tryInternValidatedInputSymbol](input.evidence);
				if (fastEvidence !== undefined) {
					const { evidence: _evidence, ...rest } = input;
					const parsedRest = unknownInputWithoutEvidenceSchema.safeParse(rest);
					if (parsedRest.success) {
						const semantic = {
							...parsedRest.data,
							relation_kinds: uniqueSorted(parsedRest.data.relation_kinds),
							candidate_node_ids: uniqueSorted(parsedRest.data.candidate_node_ids),
							evidence: fastEvidence
						};
						return {
							...semantic,
							unknown_id: `jsrg_unknown_${digestCanonicalValue(semantic, "JavaScript semantic graph")}`
						};
					}
				}
			}
			const rawEvidence = isRecord(input) ? input.evidence : undefined;
			const parsed = javaScriptSemanticUnknownInputSchema.parse(input);
			const semantic = {
				...parsed,
				relation_kinds: uniqueSorted(parsed.relation_kinds),
				candidate_node_ids: uniqueSorted(parsed.candidate_node_ids),
				evidence: evidenceContexts[internValidatedEvidenceSymbol](parsed.evidence, rawEvidence)
			};
			return {
				...semantic,
				unknown_id: `jsrg_unknown_${digestCanonicalValue(semantic, "JavaScript semantic graph")}`
			};
		};
		createJavaScriptSemanticGraphUnknown = (input, evidenceContexts) => buildSemanticGraphUnknown(input, evidenceContexts);
		createOwnedJavaScriptSemanticGraphUnknown = (input, evidenceContexts) => sealSemanticUnknown(buildSemanticGraphUnknown(input, evidenceContexts));
		buildSemanticFingerprint = (input, evidenceContexts) => {
			if (isRecord(input) && Object.hasOwn(input, "evidence")) {
				const fastEvidence = evidenceContexts[tryInternValidatedInputSymbol](input.evidence);
				if (fastEvidence !== undefined) {
					const { evidence: _evidence, ...rest } = input;
					const parsedRest = fingerprintInputWithoutEvidenceSchema.safeParse(rest);
					if (parsedRest.success) {
						const semantic = {
							...parsedRest.data,
							components: {
								...parsedRest.data.components,
								effects: parsedRest.data.components.effects.length <= 1 ? parsedRest.data.components.effects : uniqueSorted(parsedRest.data.components.effects)
							},
							limitations: parsedRest.data.limitations.length <= 1 ? parsedRest.data.limitations : uniqueSorted(parsedRest.data.limitations),
							evidence: fastEvidence
						};
						const fingerprintSha256 = digestCanonicalValue(semantic.components, "JavaScript semantic graph");
						return {
							...semantic,
							fingerprint_sha256: fingerprintSha256,
							fingerprint_id: `jsrg_fingerprint_${digestCanonicalValue({
								function_node_id: semantic.function_node_id,
								algorithm: semantic.algorithm,
								fingerprint_sha256: fingerprintSha256
							}, "JavaScript semantic graph")}`
						};
					}
				}
			}
			const rawEvidence = isRecord(input) ? input.evidence : undefined;
			const parsed = javaScriptSemanticFingerprintInputSchema.parse(input);
			const semantic = {
				...parsed,
				components: {
					...parsed.components,
					effects: uniqueSorted(parsed.components.effects)
				},
				limitations: uniqueSorted(parsed.limitations),
				evidence: evidenceContexts[internValidatedEvidenceSymbol](parsed.evidence, rawEvidence)
			};
			const fingerprintSha256 = digestCanonicalValue(semantic.components, "JavaScript semantic graph");
			return {
				...semantic,
				fingerprint_sha256: fingerprintSha256,
				fingerprint_id: `jsrg_fingerprint_${digestCanonicalValue({
					function_node_id: semantic.function_node_id,
					algorithm: semantic.algorithm,
					fingerprint_sha256: fingerprintSha256
				}, "JavaScript semantic graph")}`
			};
		};
		createJavaScriptSemanticFingerprint = (input, evidenceContexts) => buildSemanticFingerprint(input, evidenceContexts);
		createOwnedJavaScriptSemanticFingerprint = (input, evidenceContexts) => sealSemanticFingerprint(buildSemanticFingerprint(input, evidenceContexts));
		sortedUniqueIssue = (values, path, label, context) => {
			for (let index = 1; index < values.length; index += 1) {
				if (compareUnicodeCodePoints(values[index - 1] ?? "", values[index] ?? "") < 0) continue;
				context.addIssue({
					code: "custom",
					path: [...path, index],
					message: `${label} must be sorted and unique`
				});
				return;
			}
		};
		checkCanonicalOrder = (graph, context) => {
			sortedUniqueIssue(graph.root_node_ids, ["root_node_ids"], "Root nodes", context);
			sortedUniqueIssue(graph.evidence_contexts.map(({ context_id }) => context_id), ["evidence_contexts"], "Evidence contexts", context);
			sortedUniqueIssue(graph.nodes.map(({ node_id }) => node_id), ["nodes"], "Nodes", context);
			sortedUniqueIssue(graph.relations.map(({ relation_id }) => relation_id), ["relations"], "Relations", context);
			sortedUniqueIssue(graph.fingerprints.map(({ fingerprint_id }) => fingerprint_id), ["fingerprints"], "Fingerprints", context);
			sortedUniqueIssue(graph.unknowns.map(({ unknown_id }) => unknown_id), ["unknowns"], "Unknown frontiers", context);
			sortedUniqueIssue(graph.limitations, ["limitations"], "Limitations", context);
		};
		checkUnknownReferences = (graph, context) => {
			const unknownIds = new Set(graph.unknowns.map(({ unknown_id }) => unknown_id));
			for (const [index, family] of graph.coverage.families.entries()) if (family.unknown_ids.some((identifier) => !unknownIds.has(identifier))) context.addIssue({
				code: "custom",
				path: [
					"coverage",
					"families",
					index,
					"unknown_ids"
				],
				message: "Family coverage references an absent unknown frontier"
			});
		};
		checkGraphContent = (graph, context) => {
			const steps = checkGraphContentSteps(graph, context);
			while (!steps.next().done) {}
		};
		checkGraph = (graph, context) => {
			checkGraphContent(graph, context);
			const { graph_id: identifier, ...semantic } = graph;
			if (identifier !== "jsrg_" + digestCanonicalValue(semantic, "JavaScript semantic graph")) context.addIssue({
				code: "custom",
				path: ["graph_id"],
				message: "Graph identifier is stale"
			});
		};
		javaScriptSemanticGraphSchema = javaScriptSemanticGraphRecordSchema.superRefine(checkGraph);
		normalizeGraphInput = (parsed) => ({
			...parsed,
			root_node_ids: uniqueSorted(parsed.root_node_ids),
			evidence_contexts: [...parsed.evidence_contexts].sort((left, right) => compareUnicodeCodePoints(left.context_id, right.context_id)),
			nodes: [...parsed.nodes].sort((left, right) => compareUnicodeCodePoints(left.node_id, right.node_id)),
			relations: [...parsed.relations].sort((left, right) => compareUnicodeCodePoints(left.relation_id, right.relation_id)),
			fingerprints: [...parsed.fingerprints].sort((left, right) => compareUnicodeCodePoints(left.fingerprint_id, right.fingerprint_id)),
			unknowns: [...parsed.unknowns].sort((left, right) => compareUnicodeCodePoints(left.unknown_id, right.unknown_id)),
			coverage: {
				...parsed.coverage,
				limits: [...parsed.coverage.limits].sort((left, right) => compareUnicodeCodePoints(canonicalJson(left, "JavaScript semantic graph"), canonicalJson(right, "JavaScript semantic graph"))),
				...parsed.coverage.omitted_unknown_occurrences === undefined ? {} : { omitted_unknown_occurrences: [...parsed.coverage.omitted_unknown_occurrences].sort((left, right) => compareUnicodeCodePoints(`${left.family}:${left.reason}`, `${right.family}:${right.reason}`)) },
				families: [...parsed.coverage.families].map((family) => ({
					...family,
					unknown_ids: uniqueSorted(family.unknown_ids)
				})).sort((left, right) => compareUnicodeCodePoints(left.family, right.family))
			},
			limitations: uniqueSorted(parsed.limitations)
		});
		parseElementsSync = (element, values, path, issues, isPrevalidated) => {
			const steps = parseElementSteps(element, values, path, issues, isPrevalidated);
			let step = steps.next();
			while (!step.done) step = steps.next();
			return step.value;
		};
		createJavaScriptSemanticGraph = (input) => {
			const container = semanticGraphContainerSchema.parse(input);
			const parseIssues = [];
			const parsed = {
				...container,
				evidence_contexts: parseElementsSync(semanticGraphShape.evidence_contexts.element, container.evidence_contexts, ["evidence_contexts"], parseIssues, isValidatedSemanticEvidenceContext),
				nodes: parseElementsSync(semanticGraphShape.nodes.element, container.nodes, ["nodes"], parseIssues, isValidatedSemanticNode),
				relations: parseElementsSync(semanticGraphShape.relations.element, container.relations, ["relations"], parseIssues, isValidatedSemanticRelation),
				fingerprints: parseElementsSync(semanticGraphShape.fingerprints.element, container.fingerprints, ["fingerprints"], parseIssues, isValidatedSemanticFingerprint),
				unknowns: parseElementsSync(semanticGraphShape.unknowns.element, container.unknowns, ["unknowns"], parseIssues, isValidatedSemanticUnknown)
			};
			if (parseIssues.length > 0) throw new z.ZodError(parseIssues);
			const semantic = normalizeGraphInput(parsed);
			const record = {
				...semantic,
				graph_id: `jsrg_${digestCanonicalValue(semantic, "JavaScript semantic graph")}`
			};
			const issues = [];
			checkGraphContent(record, { addIssue: (issue) => {
				issues.push(issue);
			} });
			if (issues.length > 0) throw new z.ZodError(issues);
			return record;
		};
		validatedImmutableSemanticGraphs = new WeakSet();
		semanticGraphShape = javaScriptSemanticGraphInputSchema.shape;
		semanticGraphContainerSchema = javaScriptSemanticGraphInputSchema.extend({
			evidence_contexts: arrayContainerSchema(semanticGraphShape.evidence_contexts),
			nodes: arrayContainerSchema(semanticGraphShape.nodes),
			relations: arrayContainerSchema(semanticGraphShape.relations),
			fingerprints: arrayContainerSchema(semanticGraphShape.fingerprints),
			unknowns: arrayContainerSchema(semanticGraphShape.unknowns)
		});
		sealTransferredJavaScriptSemanticGraphSteps = (input) => parseAndSealSemanticGraphSteps(semanticGraphContainerSchema.parse(input));
		isValidatedImmutableJavaScriptSemanticGraph = (value) => typeof value === "object" && value !== null && validatedImmutableSemanticGraphs.has(value);
	})))();
}

//#endregion
//#region dist/domain/artifactIntegrityPolicy.js
var artifactIntegrityPolicySchema;
function init_artifactIntegrityPolicy() {
	return (init_artifactIntegrityPolicy = __esmMin((() => {
		artifactIntegrityPolicySchema = z.enum(["fail", "record-and-continue"]).default("fail");
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptApplicationAnalysis.js
function* checkApplicationBindingsSteps(result, context) {
	if (result.semantic_graph.application_graph_id !== result.graph.graph_id) context.addIssue({
		code: "custom",
		path: ["semantic_graph", "application_graph_id"],
		message: "Semantic graph must commit the containing application graph"
	});
	if (result.semantic_graph.root_artifact_sha256 !== result.root_artifact_sha256) context.addIssue({
		code: "custom",
		path: ["semantic_graph", "root_artifact_sha256"],
		message: "Semantic graph must commit the containing root artifact"
	});
	const applicationNodeIds = new Set();
	let examined = 0;
	try {
		for (const node of result.graph.nodes) {
			applicationNodeIds.add(node.node_id);
			if (node.kind === "artifact" && (node.identity.strategy !== "content-digest" || node.identity.sha256 !== result.root_artifact_sha256)) {
				for (const observation of node.observations) {
					if (observation.evidence.extractor.operation === "inventory-root") {
						context.addIssue({
							code: "custom",
							path: ["root_artifact_sha256"],
							message: "Application artifact root must match the declared root SHA-256"
						});
						break;
					}
					if (++examined === 4096) {
						examined = 0;
						yield;
					}
				}
			}
			if (++examined === 4096) {
				examined = 0;
				yield;
			}
		}
		for (const [nodeIndex, node] of result.semantic_graph.nodes.entries()) {
			if (++examined === 4096) {
				examined = 0;
				yield;
			}
			for (const [identifierIndex, identifier] of node.application_node_ids.entries()) {
				if (!applicationNodeIds.has(identifier)) context.addIssue({
					code: "custom",
					path: [
						"semantic_graph",
						"nodes",
						nodeIndex,
						"application_node_ids",
						identifierIndex
					],
					message: "Semantic node references an absent application node"
				});
				if (++examined === 4096) {
					examined = 0;
					yield;
				}
			}
		}
	} finally {
		applicationNodeIds.clear();
	}
}
/** Reuse exact owned graphs while validating metadata and cross-graph bindings. */
function* parseOwnedJavaScriptApplicationAnalysisSteps(input) {
	if (isValidatedImmutableResult(input)) return input;
	const prepared = ownedAnalysisResultShape.safeParse(input);
	if (prepared.success) {
		const issues = [];
		yield* checkApplicationBindingsSteps(prepared.data, { addIssue: (issue) => {
			issues.push(issue);
		} });
		if (issues.length > 0) throw new z.ZodError(issues);
		return prepared.data;
	}
	const result = javascriptApplicationAnalysisResultSchema.parse(input);
	if (canBorrowParsedJsonSnapshot(input, result)) {
		validatedImmutableResults.add(input);
		return input;
	}
	return result;
}
var countSchema, analyzeJavaScriptApplicationInputSchema, electronBoundarySummarySchema, reconstructionStatisticsSchema, applicationAnalysisResultShape, javascriptApplicationAnalysisResultSchema, ownedAnalysisResultShape, validatedImmutableResults, isValidatedImmutableResult;
function init_javascriptApplicationAnalysis() {
	return (init_javascriptApplicationAnalysis = __esmMin((() => {
		init_javascriptRouteInventory();
		init_immutableJson();
		init_javascriptApplicationGraph();
		init_javascriptSemanticGraph();
		init_digests();
		init_artifactGraph();
		init_artifactIntegrityPolicy();
		init_localPath();
		init_javascriptAnalysisResourceControls();
		init_javascriptSourceSelection();
		countSchema = z.int().min(0);
		analyzeJavaScriptApplicationInputSchema = z.strictObject({
			input_path: localPathStringSchema,
			format: z.enum([
				"auto",
				"asar",
				"directory"
			]).default("auto"),
			integrity_policy: artifactIntegrityPolicySchema,
			source_paths: javaScriptSourcePathsSchema.optional(),
			...javaScriptAnalysisResourceControlsSchema.shape
		});
		electronBoundarySummarySchema = z.strictObject({
			browser_windows: countSchema,
			explicit_web_preferences: countSchema,
			preload_entrypoints: countSchema,
			context_bridge_apis: countSchema,
			exposed_api_members: countSchema,
			ipc: z.strictObject({
				operations: countSchema,
				literal_channels: countSchema,
				dynamic_channel_operations: countSchema,
				renderer_transmissions: countSchema,
				renderer_listeners: countSchema,
				main_handlers: countSchema,
				paired_renderer_transmissions: countSchema,
				ambiguous_renderer_transmissions: countSchema,
				unpaired_literal_renderer_transmissions: countSchema
			}),
			sender_validation_observations: countSchema,
			utility_processes: countSchema,
			resolved_utility_entrypoints: countSchema,
			native_addon_bindings: countSchema,
			resolved_native_addon_bindings: countSchema,
			protocol_registrations: countSchema,
			/** `node:vm` compilations whose logic may live in an opaque bytecode cache. */
			v8_cached_data_compilations: countSchema.exactOptional(),
			/**
			* Whether the Electron boundary surface was actually recovered. `empty` means
			* an analyzed source names Electron but no boundary fact was recovered, so the
			* zeroes above are missing coverage and not evidence of absence. `partial`
			* means some boundary facts were recovered while other Electron-loading
			* sources were not fully examined or reported, for example after the result
			* budget ran out; counts from those sources are unknown, not zero.
			*
			* Absent when no retained fact names an Electron module. Absence is unknown
			* rather than proof that the application has no Electron surface: unread
			* sources, failed analysis, and dynamic module names can hide one.
			*/
			electron_semantics: z.enum([
				"recovered",
				"partial",
				"empty"
			]).exactOptional()
		});
		reconstructionStatisticsSchema = z.strictObject({
			relevant_files: countSchema,
			nested_asar_containers: countSchema,
			text_bytes_read: countSchema,
			invalid_utf8_files: countSchema,
			parsed_javascript_files: countSchema,
			skipped_javascript_files: countSchema,
			visited_ast_nodes: countSchema,
			findings: countSchema,
			modules: countSchema,
			parse_failures: countSchema
		});
		applicationAnalysisResultShape = z.strictObject({
			input_path: z.string().min(1),
			format: z.enum(["asar", "directory"]),
			root_artifact_sha256: digestSchema,
			inventory_manifest_id: prefixedDigestSchema("agm"),
			inventory_graph_sha256: digestSchema,
			integrity_contradictions: z.array(integrityContradictionSchema),
			source_selection: javaScriptSourceSelectionSchema.exactOptional(),
			graph: javascriptApplicationGraphSchema,
			summary: electronBoundarySummarySchema,
			statistics: reconstructionStatisticsSchema,
			limitations: z.array(z.string().min(1)),
			semantic_graph: javaScriptSemanticGraphSchema,
			route_inventory: javaScriptRouteInventorySchema.exactOptional()
		});
		javascriptApplicationAnalysisResultSchema = applicationAnalysisResultShape.superRefine((result, context) => {
			const steps = checkApplicationBindingsSteps(result, context);
			while (!steps.next().done) {}
		});
		ownedAnalysisResultShape = applicationAnalysisResultShape.extend({
			graph: z.custom(isValidatedImmutableJavaScriptApplicationGraph),
			semantic_graph: z.custom(isValidatedImmutableJavaScriptSemanticGraph)
		});
		validatedImmutableResults = new WeakSet();
		isValidatedImmutableResult = (input) => typeof input === "object" && input !== null && validatedImmutableResults.has(input);
	})))();
}

//#endregion
//#region dist/domain/javascript/javascriptModuleUnits.js
var isJavaScriptModuleUnit, isJavaScriptSourceModule;
function init_javascriptModuleUnits() {
	return (init_javascriptModuleUnits = __esmMin((() => {
		isJavaScriptModuleUnit = (node) => (node.kind === "javascript-asset" || node.kind === "javascript-module" || node.kind === "source-module") && !node.observations.some(({ properties }) => properties.semantic_role === "export-binding");
		isJavaScriptSourceModule = (node) => node.kind === "source-module" || node.observations.some(({ properties }) => properties.semantic_role === "source-module");
	})))();
}

//#endregion
export { JavaScriptSemanticEvidenceContextRegistry, analyzeJavaScriptApplicationInputSchema, artifactIntegrityPolicySchema, createJavaScriptSemanticGraph, createJavaScriptSemanticGraphNode, createOwnedJavaScriptSemanticFingerprint, createOwnedJavaScriptSemanticGraphNode, createOwnedJavaScriptSemanticGraphRelation, createOwnedJavaScriptSemanticGraphUnknown, init_artifactIntegrityPolicy, init_javascriptApplicationAnalysis, init_javascriptModuleUnits, init_javascriptSemanticGraph, isJavaScriptModuleUnit, isJavaScriptSourceModule, javaScriptSemanticNodeId, javascriptApplicationAnalysisResultSchema, parseOwnedJavaScriptApplicationAnalysisSteps, sealTransferredJavaScriptSemanticGraphSteps, withJavaScriptSemanticNodeApplicationIds };